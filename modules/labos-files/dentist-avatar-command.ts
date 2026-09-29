import 'server-only'

import type { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { labosAuthorizationService, type LabOSAuthorizationService } from '@/modules/labos-authorization/service'
import type { TenantContext } from '@/platform/organizations'

import { labOSUploadGrantService } from './upload-grants'

const DENTIST_AVATAR_CREATE_GRANT = Object.freeze({ boundaryId: 'N-FILE-108' as const, purpose: 'dentist.avatar.create.stage' as const, target: null })
const DENTIST_AVATAR_UPDATE_GRANT = Object.freeze({ boundaryId: 'N-FILE-109' as const, purpose: 'dentist.avatar.update.stage' as const })

const DENTIST_SELECT = {
	id: true, clinicId: true, labId: true, name: true, email: true, phoneNumber: true,
	specialty: true, licenseNumber: true, avatarUrl: true, isOwner: true, isDefault: true,
	notes: true, isActive: true, createdAt: true, updatedAt: true,
} as const

type DentistClient = Pick<Prisma.TransactionClient, 'clinic' | 'dentist'>
type DentistRootClient = Pick<
	typeof generalPrisma,
	'clinic' | 'dentist' | '$transaction'
>
type GrantConsumer = Pick<typeof labOSUploadGrantService, 'consumeTransactionally'>

export type DentistAvatarCommandDependencies = Readonly<{
	authorizationService?: Pick<LabOSAuthorizationService, 'require'>
	grantConsumer?: GrantConsumer
	prisma?: DentistRootClient
	generateCorrelationId?: () => string
}>

type DentistFields = Readonly<{ clinicId: string; name: string; email?: string; phoneNumber?: string; speciality?: string; licenseNumber?: string; isOwner: boolean; isDefault: boolean; notes?: string }>
export type DentistAvatarCreateCommand = DentistFields & Readonly<{ imageUploadGrantId?: string }>
export type DentistAvatarUpdateCommand = DentistFields & Readonly<{ dentistId: string; imageUploadGrantId?: string }>

export class DentistClinicNotFoundError extends Error { constructor() { super('Dentist clinic was not found'); this.name = 'DentistClinicNotFoundError' } }
export class DentistNotFoundError extends Error { constructor() { super('Dentist was not found'); this.name = 'DentistNotFoundError' } }
export class DentistMutationNotAllowedError extends Error { constructor() { super('Dentist mutation is not allowed'); this.name = 'DentistMutationNotAllowedError' } }

function dependenciesFor(dependencies: DentistAvatarCommandDependencies) {
	return { authorizationService: dependencies.authorizationService ?? labosAuthorizationService, grantConsumer: dependencies.grantConsumer ?? labOSUploadGrantService, prisma: dependencies.prisma ?? generalPrisma, correlationId: dependencies.generateCorrelationId?.() ?? crypto.randomUUID() }
}

async function requireMutableClinic(
	prisma: DentistClient,
	clinicId: string,
	labId: string,
	rejectSolo: boolean,
) {
	const clinic = await prisma.clinic.findFirst({ where: { id: clinicId, labId }, select: { id: true, type: true } })
	if (!clinic) throw new DentistClinicNotFoundError()
	if (rejectSolo && clinic.type === 'SOLO') throw new DentistMutationNotAllowedError()
}

function dentistData(input: DentistFields, avatarUrl: string | null) {
	return { clinicId: input.clinicId, name: input.name, email: input.email || null, phoneNumber: input.phoneNumber || null, specialty: input.speciality || null, licenseNumber: input.licenseNumber || null, avatarUrl, isOwner: input.isOwner, isDefault: input.isDefault, notes: input.notes || null }
}

function dentistUpdateData(input: DentistFields, avatarUrl?: string) {
	return {
		name: input.name, email: input.email || null, phoneNumber: input.phoneNumber || null,
		specialty: input.speciality || null, licenseNumber: input.licenseNumber || null,
		isOwner: input.isOwner, isDefault: input.isDefault, notes: input.notes || null,
		...(avatarUrl !== undefined && { avatarUrl }),
	}
}

async function createDentist(prisma: DentistClient, input: DentistAvatarCreateCommand, labId: string, avatarUrl: string | null) {
	await requireMutableClinic(prisma, input.clinicId, labId, true)
	if (input.isDefault) await prisma.dentist.updateMany({ where: { clinicId: input.clinicId, labId, isDefault: true }, data: { isDefault: false } })
	if (input.isOwner) await prisma.dentist.updateMany({ where: { clinicId: input.clinicId, labId, isOwner: true }, data: { isOwner: false } })
	return prisma.dentist.create({ data: { ...dentistData(input, avatarUrl), labId, isActive: true }, select: DENTIST_SELECT })
}

async function updateDentist(prisma: DentistClient, input: DentistAvatarUpdateCommand, labId: string, avatarUrl?: string) {
	await requireMutableClinic(prisma, input.clinicId, labId, false)
	const dentist = await prisma.dentist.findFirst({ where: { id: input.dentistId, clinicId: input.clinicId, labId }, select: { id: true, isActive: true } })
	if (!dentist) throw new DentistNotFoundError()
	if (!dentist.isActive) throw new DentistMutationNotAllowedError()
	if (input.isDefault) await prisma.dentist.updateMany({ where: { clinicId: input.clinicId, labId, isDefault: true, NOT: { id: input.dentistId } }, data: { isDefault: false } })
	if (input.isOwner) await prisma.dentist.updateMany({ where: { clinicId: input.clinicId, labId, isOwner: true, NOT: { id: input.dentistId } }, data: { isOwner: false } })
	const updated = await prisma.dentist.updateMany({ where: { id: input.dentistId, clinicId: input.clinicId, labId }, data: dentistUpdateData(input, avatarUrl) })
	if (updated.count !== 1) throw new DentistNotFoundError()
	const result = await prisma.dentist.findFirst({ where: { id: input.dentistId, clinicId: input.clinicId, labId }, select: DENTIST_SELECT })
	if (!result) throw new DentistNotFoundError()
	return result
}

export async function executeDentistAvatarCreate(tenant: TenantContext, input: DentistAvatarCreateCommand, dependencies: DentistAvatarCommandDependencies = {}) {
	const { authorizationService, grantConsumer, prisma, correlationId } = dependenciesFor(dependencies)
	await authorizationService.require({ actor: createLabOSAuthorizationActor(tenant), boundaryId: DENTIST_AVATAR_CREATE_GRANT.boundaryId, permission: 'dentist.create', operation: { kind: 'dentist.avatar.create.commit' }, correlationId })
	if (!input.imageUploadGrantId) return prisma.$transaction((transaction) => createDentist(transaction, input, tenant.labId, null))
	return grantConsumer.consumeTransactionally({ tenant, uploadGrantId: input.imageUploadGrantId, ...DENTIST_AVATAR_CREATE_GRANT, correlationId }, (transaction, file) => createDentist(transaction, input, tenant.labId, file.providerFileUrl))
}

export async function executeDentistAvatarUpdate(tenant: TenantContext, input: DentistAvatarUpdateCommand, dependencies: DentistAvatarCommandDependencies = {}) {
	const { authorizationService, grantConsumer, prisma, correlationId } = dependenciesFor(dependencies)
	const target = Object.freeze({ type: 'dentist' as const, id: input.dentistId })
	await authorizationService.require({ actor: createLabOSAuthorizationActor(tenant), boundaryId: DENTIST_AVATAR_UPDATE_GRANT.boundaryId, permission: 'dentist.update', target, operation: { kind: 'dentist.avatar.update.commit' }, correlationId })
	if (!input.imageUploadGrantId) return prisma.$transaction((transaction) => updateDentist(transaction, input, tenant.labId))
	return grantConsumer.consumeTransactionally({ tenant, uploadGrantId: input.imageUploadGrantId, ...DENTIST_AVATAR_UPDATE_GRANT, target, correlationId }, (transaction, file) => updateDentist(transaction, input, tenant.labId, file.providerFileUrl))
}
