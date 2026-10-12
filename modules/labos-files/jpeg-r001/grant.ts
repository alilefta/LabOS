import 'server-only'

import { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { createTransactionStageAuthorizer } from '../case-asset-stage.repository'
import { R001Unavailable } from './inspect'
import { isCaseClinicalCheckedSuffix } from '../case-clinical-suffix'
import type { CaseClinicalValidatedSuffix } from '@/generated/prisma/client'
import type { TenantContext } from '@/platform/organizations'

export type ReservedClinicalGrant = Readonly<{
	uploadGrantId: string
	organizationId: string
	labId: string
	caseId: string
	memberId: string
	provider: 'UPLOADTHING' | 'OBJECT_STORAGE'
	providerFileKey: string
	checkedSuffix: CaseClinicalValidatedSuffix
}>

function reject(): never { throw new R001Unavailable() }

/** Read-only, transaction-fresh Case/tenant/Member/assignment gate before any provider call. */
export async function resolveReservedClinicalGrant(uploadGrantId: string,
	prisma: typeof generalPrisma = generalPrisma,
	expected?: Readonly<{ provider: 'UPLOADTHING' | 'OBJECT_STORAGE'; tenant: TenantContext }>,
): Promise<ReservedClinicalGrant> {
	if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uploadGrantId)) reject()
	try {
		return await prisma.$transaction(async (tx) => {
			const [grant, clock] = await Promise.all([
				tx.fileUploadGrant.findUnique({ where: { id: uploadGrantId }, select: {
					id: true, organizationId: true, labId: true, createdByMemberId: true,
					boundaryId: true, purpose: true, targetType: true, targetId: true,
					status: true, provider: true, providerFileKey: true, providerFileUrl: true,
					caseClinicalValidatedSuffix: true,
					uploadedAt: true, providerDeletedAt: true, expiresAt: true,
				} }),
				tx.$queryRaw<ReadonlyArray<{ now: Date }>>(Prisma.sql`
					SELECT (clock_timestamp() AT TIME ZONE 'UTC') AS "now"
				`),
			])
			const now = clock[0]?.now
			if (!grant || !now || grant.boundaryId !== 'N-FILE-110' ||
				grant.purpose !== 'case.asset.add.stage' || grant.targetType !== 'case' ||
					!grant.targetId || !grant.createdByMemberId ||
					grant.provider !== (expected?.provider ?? 'UPLOADTHING') ||
					!isCaseClinicalCheckedSuffix(grant.caseClinicalValidatedSuffix) ||
				grant.status !== 'PENDING' || grant.expiresAt <= now ||
				!grant.providerFileKey || grant.providerFileUrl !== null ||
				grant.uploadedAt !== null || grant.providerDeletedAt !== null ||
				(expected && (grant.organizationId !== expected.tenant.organizationId ||
					grant.labId !== expected.tenant.labId ||
					grant.createdByMemberId !== expected.tenant.memberId))) reject()
			if (grant.provider === 'OBJECT_STORAGE') {
				const allocation = await tx.objectStorageKeyAllocation.findUnique({
					where: { objectKey: grant.providerFileKey },
					select: { sourceUploadGrantId: true, latestWriteCapabilityExpiresAt: true },
				})
				if (allocation?.sourceUploadGrantId !== grant.id ||
					!allocation.latestWriteCapabilityExpiresAt) reject()
			}
			const [member, lab, dentalCase] = await Promise.all([
				tx.member.findFirst({ where: { id: grant.createdByMemberId, organizationId: grant.organizationId },
					select: { id: true, userId: true, role: true } }),
				tx.lab.findFirst({ where: { id: grant.labId, organizationId: grant.organizationId }, select: { id: true } }),
				tx.case.findFirst({ where: { id: grant.targetId, labId: grant.labId,
					lab: { organizationId: grant.organizationId }, status: 'DRAFT' }, select: { id: true } }),
			])
			if (!member || !lab || !dentalCase ||
				(expected && member.userId !== expected.tenant.userId)) reject()
			await createTransactionStageAuthorizer(tx).require({
				actor: createLabOSAuthorizationActor({ userId: member.userId, memberId: member.id,
					organizationId: grant.organizationId, memberRole: member.role }),
				boundaryId: 'N-FILE-110', permission: 'case.asset.add',
				target: { type: 'case', id: grant.targetId }, correlationId: crypto.randomUUID(),
			})
			return Object.freeze({ uploadGrantId: grant.id, organizationId: grant.organizationId,
				labId: grant.labId, caseId: grant.targetId, memberId: member.id,
				provider: grant.provider, providerFileKey: grant.providerFileKey,
				checkedSuffix: grant.caseClinicalValidatedSuffix })
		}, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, maxWait: 5_000, timeout: 10_000 })
	} catch { reject() }
}
