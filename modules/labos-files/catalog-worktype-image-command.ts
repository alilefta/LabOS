import 'server-only'

import type { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { labosAuthorizationService, type LabOSAuthorizationService } from '@/modules/labos-authorization/service'
import type { TenantContext } from '@/platform/organizations'

import { labOSUploadGrantService } from './upload-grants'

const WORKTYPE_SELECT = {
	id: true,
	name: true,
	description: true,
	imageUrl: true,
	requireTeethSelection: true,
	caseCategoryId: true,
	labId: true,
	isArchived: true,
	createdAt: true,
	updatedAt: true,
} as const

const WORKTYPE_IMAGE_CREATE_GRANT = Object.freeze({
	boundaryId: 'N-FILE-104' as const,
	purpose: 'catalog.worktype.image.create.stage' as const,
	target: null,
})
const WORKTYPE_IMAGE_UPDATE_GRANT = Object.freeze({
	boundaryId: 'N-FILE-105' as const,
	purpose: 'catalog.worktype.image.update.stage' as const,
})

type WorkTypeClient = Pick<Prisma.TransactionClient, 'workType' | 'caseCategory'>
type GrantConsumer = Pick<typeof labOSUploadGrantService, 'consumeTransactionally'>

export type CatalogWorkTypeCommandDependencies = Readonly<{
	authorizationService?: Pick<LabOSAuthorizationService, 'require'>
	grantConsumer?: GrantConsumer
	prisma?: WorkTypeClient
	generateCorrelationId?: () => string
}>

export type CatalogWorkTypeCreateCommand = Readonly<{
	name: string
	description?: string
	requireTeethSelection?: boolean
	caseCategoryId: string
	/** Opaque handoff only; provider URLs and keys are never command input. */
	imageUploadGrantId?: string
}>
export type CatalogWorkTypeUpdateCommand = CatalogWorkTypeCreateCommand & Readonly<{ workTypeId: string }>

export class CatalogWorkTypeNotFoundError extends Error {
	constructor() {
		super('Catalog work type was not found')
		this.name = 'CatalogWorkTypeNotFoundError'
	}
}

export class CatalogWorkTypeParentCategoryNotFoundError extends Error {
	constructor() {
		super('Catalog parent category was not found')
		this.name = 'CatalogWorkTypeParentCategoryNotFoundError'
	}
}

function dependenciesFor(dependencies: CatalogWorkTypeCommandDependencies) {
	return {
		authorizationService: dependencies.authorizationService ?? labosAuthorizationService,
		grantConsumer: dependencies.grantConsumer ?? labOSUploadGrantService,
		prisma: dependencies.prisma ?? generalPrisma,
		correlationId: dependencies.generateCorrelationId?.() ?? crypto.randomUUID(),
	}
}

async function requireParentCategory(prisma: WorkTypeClient, categoryId: string, labId: string) {
	const category = await prisma.caseCategory.findFirst({
		where: { id: categoryId, labId },
		select: { id: true },
	})
	if (!category) throw new CatalogWorkTypeParentCategoryNotFoundError()
}

function createData(input: CatalogWorkTypeCreateCommand, imageUrl: string | null) {
	return {
		name: input.name,
		description: input.description ?? null,
		requireTeethSelection: input.requireTeethSelection ?? true,
		caseCategoryId: input.caseCategoryId,
		imageUrl,
	}
}

function updateData(input: CatalogWorkTypeUpdateCommand, imageUrl?: string) {
	return {
		name: input.name,
		description: input.description !== undefined ? input.description ?? null : undefined,
		requireTeethSelection: input.requireTeethSelection !== undefined ? input.requireTeethSelection : undefined,
		caseCategoryId: input.caseCategoryId,
		...(imageUrl !== undefined && { imageUrl }),
	}
}

async function updateWorkType(prisma: WorkTypeClient, input: CatalogWorkTypeUpdateCommand, labId: string, imageUrl?: string) {
	await requireParentCategory(prisma, input.caseCategoryId, labId)
	const updated = await prisma.workType.updateMany({
		where: { id: input.workTypeId, labId },
		data: updateData(input, imageUrl),
	})
	if (updated.count !== 1) throw new CatalogWorkTypeNotFoundError()
	const workType = await prisma.workType.findFirst({
		where: { id: input.workTypeId, labId },
		select: WORKTYPE_SELECT,
	})
	if (!workType) throw new CatalogWorkTypeNotFoundError()
	return workType
}

export async function executeCatalogWorkTypeCreate(tenant: TenantContext, input: CatalogWorkTypeCreateCommand, dependencies: CatalogWorkTypeCommandDependencies = {}) {
	const { authorizationService, grantConsumer, prisma, correlationId } = dependenciesFor(dependencies)
	await authorizationService.require({
		actor: createLabOSAuthorizationActor(tenant),
		boundaryId: WORKTYPE_IMAGE_CREATE_GRANT.boundaryId,
		permission: 'catalog.create',
		operation: { kind: 'catalog.worktype.image.create.commit' },
		correlationId,
	})
	if (!input.imageUploadGrantId) {
		await requireParentCategory(prisma, input.caseCategoryId, tenant.labId)
		return prisma.workType.create({
			data: { ...createData(input, null), labId: tenant.labId },
			select: WORKTYPE_SELECT,
		})
	}
	return grantConsumer.consumeTransactionally(
		{ tenant, uploadGrantId: input.imageUploadGrantId, ...WORKTYPE_IMAGE_CREATE_GRANT, correlationId },
		async (transaction, file) => {
			await requireParentCategory(transaction, input.caseCategoryId, tenant.labId)
			return transaction.workType.create({ data: { ...createData(input, file.providerFileUrl), labId: tenant.labId }, select: WORKTYPE_SELECT })
		},
	)
}

export async function executeCatalogWorkTypeUpdate(tenant: TenantContext, input: CatalogWorkTypeUpdateCommand, dependencies: CatalogWorkTypeCommandDependencies = {}) {
	const { authorizationService, grantConsumer, prisma, correlationId } = dependenciesFor(dependencies)
	const target = Object.freeze({ type: 'catalog.worktype' as const, id: input.workTypeId })
	await authorizationService.require({
		actor: createLabOSAuthorizationActor(tenant),
		boundaryId: WORKTYPE_IMAGE_UPDATE_GRANT.boundaryId,
		permission: 'catalog.update',
		target,
		operation: { kind: 'catalog.worktype.image.update.commit' },
		correlationId,
	})
	if (!input.imageUploadGrantId) return updateWorkType(prisma, input, tenant.labId)
	return grantConsumer.consumeTransactionally(
		{ tenant, uploadGrantId: input.imageUploadGrantId, boundaryId: WORKTYPE_IMAGE_UPDATE_GRANT.boundaryId, purpose: WORKTYPE_IMAGE_UPDATE_GRANT.purpose, target, correlationId },
		(transaction, file) => updateWorkType(transaction, input, tenant.labId, file.providerFileUrl),
	)
}
