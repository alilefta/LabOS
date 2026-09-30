import 'server-only'

import { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import {
	createCaseReadFactLoader,
	type CaseReadFactRepository,
} from '@/modules/labos-authorization/fact-loaders/operational-facts'
import { createOperationalPolicies } from '@/modules/labos-authorization/policies/operational.policies'
import { createLabOSAuthorizationService } from '@/modules/labos-authorization/service'
import { createOrganizationBoundaryResolver } from '@/modules/labos-authorization/target-resolvers/organization-boundary-resolver'
import type { TenantContext } from '@/platform/organizations'

import {
	UPLOAD_GRANT_ERROR_CODES,
	UploadGrantError,
	type UploadGrantProviderMetadata,
} from './upload-grants'

const CASE_ASSET_STAGE_BOUNDARY_ID = 'N-FILE-110'
const CASE_ASSET_STAGE_PURPOSE = 'case.asset.add.stage'

export type CaseAssetStageCreation = Readonly<{
	tenant: TenantContext
	caseId: string
	correlationId: string
}>

export interface CaseAssetStageRepository {
	create(input: CaseAssetStageCreation): Promise<UploadGrantProviderMetadata>
}

function rejectCanonicalContext(): never {
	throw new UploadGrantError(UPLOAD_GRANT_ERROR_CODES.CANONICAL_CONTEXT_REJECTED)
}

function createTransactionCaseFactRepository(
	transaction: Prisma.TransactionClient,
): CaseReadFactRepository {
	return {
		async findCaseReadFacts({ organizationId, caseId, memberId }) {
			const dentalCase = await transaction.case.findFirst({
				where: { id: caseId, lab: { organizationId } },
				select: {
					id: true,
					labId: true,
					lab: { select: { id: true, organizationId: true } },
					staffAssignments: {
						where: { staff: { memberId } },
						select: {
							caseId: true,
							labId: true,
							staffId: true,
							staff: {
								select: {
									labId: true,
									isActive: true,
									memberId: true,
									member: {
										select: { id: true, organizationId: true },
									},
								},
							},
						},
					},
				},
			})
			if (!dentalCase?.lab.organizationId) return null

			const hasActiveMemberAssignment = dentalCase.staffAssignments.some(
				(assignment) =>
					assignment.caseId === dentalCase.id &&
					assignment.labId === dentalCase.labId &&
					assignment.staff.labId === dentalCase.labId &&
					assignment.staff.isActive &&
					assignment.staff.memberId === memberId &&
					assignment.staff.member?.id === memberId &&
					assignment.staff.member.organizationId === organizationId,
			)

			return Object.freeze({
				caseId: dentalCase.id,
				labId: dentalCase.labId,
				organizationId: dentalCase.lab.organizationId,
				relationshipsConsistent:
					dentalCase.lab.id === dentalCase.labId &&
					dentalCase.lab.organizationId === organizationId,
				hasActiveMemberAssignment,
			})
		},
	}
}

function createTransactionStageAuthorizer(transaction: Prisma.TransactionClient) {
	const caseReadFacts = createCaseReadFactLoader(
		createTransactionCaseFactRepository(transaction),
	)
	const policies = createOperationalPolicies({
		caseReadFacts,
		dentistReadFacts: { async load() { return null } },
	})
	return createLabOSAuthorizationService({
		targetResolvers: {
			case: createOrganizationBoundaryResolver('case', {
				async findOrganizationBoundary(caseId) {
					const dentalCase = await transaction.case.findUnique({
						where: { id: caseId },
						select: {
							labId: true,
							lab: { select: { id: true, organizationId: true } },
						},
					})
					return dentalCase?.lab.organizationId &&
						dentalCase.lab.id === dentalCase.labId
						? { organizationId: dentalCase.lab.organizationId }
						: null
				},
			}),
		},
		policies,
	})
}

/**
 * The Case-only staging writer deliberately does not use the generic grant
 * creator: it must lock and authorize the saved DRAFT Case in this transaction.
 */
export function createCaseAssetStageRepository(
	prisma: typeof generalPrisma = generalPrisma,
	now: () => Date = () => new Date(),
): CaseAssetStageRepository {
	return Object.freeze({
		async create(input: CaseAssetStageCreation) {
			return prisma.$transaction(
				async (transaction) => {
					const lockedCases = await transaction.$queryRaw<
						ReadonlyArray<Readonly<{ id: string }>>
					>(Prisma.sql`
						SELECT "Case"."id"
						FROM "Case"
						INNER JOIN "Lab" ON "Lab"."id" = "Case"."labId"
						WHERE "Case"."id" = ${input.caseId}
							AND "Case"."labId" = ${input.tenant.labId}
							AND "Lab"."organizationId" = ${input.tenant.organizationId}
							AND "Case"."status" = 'DRAFT'
						FOR UPDATE OF "Case"
					`)
					if (lockedCases.length !== 1) rejectCanonicalContext()

					const [member, lab] = await Promise.all([
						transaction.member.findFirst({
							where: {
								id: input.tenant.memberId,
								organizationId: input.tenant.organizationId,
							},
							select: { id: true, role: true },
						}),
						transaction.lab.findFirst({
							where: {
								id: input.tenant.labId,
								organizationId: input.tenant.organizationId,
							},
							select: { id: true },
						}),
					])
					if (!member || !lab) rejectCanonicalContext()

					try {
						await createTransactionStageAuthorizer(transaction).require({
							actor: createLabOSAuthorizationActor({
								...input.tenant,
								memberRole: member.role,
							}),
							boundaryId: CASE_ASSET_STAGE_BOUNDARY_ID,
							permission: 'case.asset.add',
							target: { type: 'case', id: input.caseId },
							correlationId: input.correlationId,
						})
					} catch {
						rejectCanonicalContext()
					}

					const createdAt = now()
					const grant = await transaction.fileUploadGrant.create({
						data: {
							organizationId: input.tenant.organizationId,
							labId: input.tenant.labId,
							createdByMemberId: input.tenant.memberId,
							boundaryId: CASE_ASSET_STAGE_BOUNDARY_ID,
							purpose: CASE_ASSET_STAGE_PURPOSE,
							targetType: 'case',
							targetId: input.caseId,
							// Migration 49 requires a server-owned provider label for Case grants.
							provider: 'UPLOADTHING',
							correlationId: input.correlationId,
							createdAt,
							expiresAt: new Date(createdAt.getTime() + 15 * 60_000),
						},
						select: { id: true },
					})
					return Object.freeze({ uploadGrantId: grant.id })
				},
				{
					maxWait: 5_000,
					timeout: 10_000,
					isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
				},
			)
		},
	})
}

export const prismaCaseAssetStageRepository = createCaseAssetStageRepository()
