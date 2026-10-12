import 'server-only'

import { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { createTransactionStageAuthorizer } from './case-asset-stage.repository'
import { UPLOAD_GRANT_ERROR_CODES, UploadGrantError } from './upload-grants'
import { isCaseClinicalCheckedSuffix } from './case-clinical-suffix'

export type CaseClinicalKeyReservation = Readonly<{
	uploadGrantId: string
	providerObjectKey: string
}>

export interface CaseClinicalCallbackRepository {
	reserve(input: CaseClinicalKeyReservation): Promise<void>
}

function reject(): never {
	throw new UploadGrantError(UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED)
}

/**
 * A verified UploadThing callback reserves its exact object key on the
 * Case-targeted grant. PENDING remains PENDING until R001 evidence is committed.
 */
export function createCaseClinicalCallbackRepository(
	prisma: typeof generalPrisma = generalPrisma,
): CaseClinicalCallbackRepository {
	return Object.freeze({
		async reserve(input: CaseClinicalKeyReservation) {
			try {
				await prisma.$transaction(async (transaction) => {
					const locked = await transaction.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
						SELECT "id" FROM "FileUploadGrant"
						WHERE "id" = ${input.uploadGrantId}
						FOR UPDATE
					`)
						if (locked.length !== 1) reject()

					const [grant, databaseClock] = await Promise.all([
						transaction.fileUploadGrant.findUnique({
							where: { id: input.uploadGrantId },
							select: {
								id: true, organizationId: true, labId: true, createdByMemberId: true,
								boundaryId: true, purpose: true, targetType: true, targetId: true,
								status: true, provider: true, providerFileKey: true, providerFileUrl: true,
								caseClinicalValidatedSuffix: true,
								uploadedAt: true, providerDeletedAt: true, expiresAt: true,
							},
						}),
						transaction.$queryRaw<ReadonlyArray<{ now: Date }>>(Prisma.sql`SELECT clock_timestamp() AS "now"`),
					])
					const now = databaseClock[0]?.now
					if (!grant || !now || grant.boundaryId !== 'N-FILE-110' ||
						grant.purpose !== 'case.asset.add.stage' || grant.targetType !== 'case' ||
						!isCaseClinicalCheckedSuffix(grant.caseClinicalValidatedSuffix) ||
						!grant.targetId || !grant.createdByMemberId || grant.provider !== 'UPLOADTHING' ||
						grant.status !== 'PENDING' || grant.expiresAt <= now ||
						grant.providerFileUrl !== null || grant.uploadedAt !== null ||
						grant.providerDeletedAt !== null ||
						(grant.providerFileKey !== null && grant.providerFileKey !== input.providerObjectKey)
					) reject()

					const [member, lab, dentalCase] = await Promise.all([
						transaction.member.findFirst({
							where: { id: grant.createdByMemberId, organizationId: grant.organizationId },
							select: { id: true, userId: true, role: true },
						}),
						transaction.lab.findFirst({
							where: { id: grant.labId, organizationId: grant.organizationId },
							select: { id: true },
						}),
						transaction.case.findFirst({
							where: {
								id: grant.targetId, labId: grant.labId,
								lab: { organizationId: grant.organizationId }, status: 'DRAFT',
							},
							select: { id: true },
						}),
					])
					if (!member || !lab || !dentalCase) reject()
					try {
						await createTransactionStageAuthorizer(transaction).require({
							actor: createLabOSAuthorizationActor({
								userId: member.userId,
								memberId: member.id,
								organizationId: grant.organizationId,
								memberRole: member.role,
							}),
							boundaryId: 'N-FILE-110',
							permission: 'case.asset.add',
							target: { type: 'case', id: grant.targetId },
							correlationId: crypto.randomUUID(),
						})
					} catch {
						reject()
					}
					if (grant.providerFileKey === input.providerObjectKey) return

					const updated = await transaction.fileUploadGrant.updateMany({
						where: {
							id: grant.id, organizationId: grant.organizationId, labId: grant.labId,
							createdByMemberId: grant.createdByMemberId, boundaryId: 'N-FILE-110',
							purpose: 'case.asset.add.stage', targetType: 'case', targetId: grant.targetId,
							provider: 'UPLOADTHING', status: 'PENDING', providerFileKey: null,
							caseClinicalValidatedSuffix: grant.caseClinicalValidatedSuffix,
							providerFileUrl: null, uploadedAt: null, expiresAt: { gt: now },
						},
						data: { providerFileKey: input.providerObjectKey },
					})
					if (updated.count !== 1) reject()
				}, {
					maxWait: 5_000,
					timeout: 10_000,
					isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
				})
			} catch {
				reject()
			}
		},
	})
}

export const prismaCaseClinicalCallbackRepository = createCaseClinicalCallbackRepository()
