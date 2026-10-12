import 'server-only'

import { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import type { TenantContext } from '@/platform/organizations'
import { requireTenantContext } from '@/platform/organizations'
import { createTransactionStageAuthorizer } from './case-asset-stage.repository'
import { stageCaseObjectStorageAsset } from './case-asset-stage.contract'
import { parseCaseClinicalCheckedSuffix } from './case-clinical-suffix'
import type { ObjectCapability, ObjectStorage } from './object-storage/contract'

export class CaseObjectStorageUploadUnavailable extends Error {
	constructor() { super('Case clinical upload unavailable') }
}
function reject(): never { throw new CaseObjectStorageUploadUnavailable() }
const uuid = (value: unknown): value is string => typeof value === 'string' &&
	/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)

type PendingGrant = Readonly<{ id: string; key: string }>

/** Locks the exact grant and Case, then rechecks the session Member and policy. */
async function requirePendingGrant(
	tx: Prisma.TransactionClient,
	grantId: string,
	tenant: TenantContext,
): Promise<PendingGrant> {
	const locked = await tx.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
		SELECT "id" FROM "FileUploadGrant" WHERE "id" = ${grantId} FOR UPDATE
	`)
	if (locked.length !== 1) reject()
	const grant = await tx.fileUploadGrant.findUnique({ where: { id: grantId }, select: {
		id: true, organizationId: true, labId: true, createdByMemberId: true,
		boundaryId: true, purpose: true, targetType: true, targetId: true,
		status: true, provider: true, providerFileKey: true, providerFileUrl: true,
		caseClinicalValidatedSuffix: true, expiresAt: true, uploadedAt: true,
		consumedAt: true, expiredAt: true, failedAt: true, providerDeletedAt: true,
	} })
	// FileUploadGrant timestamps are UTC wall-clock TIMESTAMP values. Converting
	// the absolute database clock before Prisma maps it avoids a session-TZ shift.
	const clock = await tx.$queryRaw<ReadonlyArray<{ now: Date }>>(Prisma.sql`
		SELECT (clock_timestamp() AT TIME ZONE 'UTC') AS "now"
	`)
	const now = clock[0]?.now
	if (!grant || !now || grant.organizationId !== tenant.organizationId ||
		grant.labId !== tenant.labId || grant.createdByMemberId !== tenant.memberId ||
		grant.boundaryId !== 'N-FILE-110' || grant.purpose !== 'case.asset.add.stage' ||
		grant.targetType !== 'case' || !grant.targetId || grant.status !== 'PENDING' ||
		grant.provider !== 'OBJECT_STORAGE' || !grant.providerFileKey ||
		!/^objects\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/.test(grant.providerFileKey) ||
		!grant.caseClinicalValidatedSuffix || grant.providerFileUrl !== null ||
		grant.uploadedAt !== null || grant.consumedAt !== null ||
		grant.expiredAt !== null || grant.failedAt !== null ||
		grant.providerDeletedAt !== null || grant.expiresAt <= now) reject()
	const lockedCase = await tx.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
		SELECT "Case"."id" FROM "Case" JOIN "Lab" ON "Lab"."id" = "Case"."labId"
		WHERE "Case"."id" = ${grant.targetId} AND "Case"."labId" = ${grant.labId}
		AND "Lab"."organizationId" = ${grant.organizationId} AND "Case"."status" = 'DRAFT'
		FOR UPDATE OF "Case"
	`)
	if (lockedCase.length !== 1) reject()
	const [member, allocation] = await Promise.all([
		tx.member.findFirst({ where: { id: tenant.memberId, organizationId: tenant.organizationId,
			userId: tenant.userId }, select: { id: true, role: true } }),
		tx.objectStorageKeyAllocation.findUnique({ where: { objectKey: grant.providerFileKey },
			select: { sourceUploadGrantId: true } }),
	])
	if (!member || allocation?.sourceUploadGrantId !== grant.id) reject()
	try {
		await createTransactionStageAuthorizer(tx).require({
			actor: createLabOSAuthorizationActor({ ...tenant, memberRole: member.role }),
			boundaryId: 'N-FILE-110', permission: 'case.asset.add',
			target: { type: 'case', id: grant.targetId }, correlationId: crypto.randomUUID(),
		})
	} catch { reject() }
	return { id: grant.id, key: grant.providerFileKey }
}

async function pendingTransaction<T>(
	prisma: typeof generalPrisma,
	grantId: string,
	tenant: TenantContext,
	work: (tx: Prisma.TransactionClient, grant: PendingGrant) => Promise<T>,
): Promise<T> {
	return prisma.$transaction(async (tx) => work(tx, await requirePendingGrant(tx, grantId, tenant)), {
		isolationLevel: Prisma.TransactionIsolationLevel.Serializable, maxWait: 5_000, timeout: 10_000,
	})
}

/** No bearer capability is returned until the exact PENDING ledger fence commits. */
export async function issueCaseObjectStorageWrite(
	grantId: string,
	tenant: TenantContext,
	storage: ObjectStorage,
	prisma: typeof generalPrisma = generalPrisma,
): Promise<ObjectCapability> {
	if (!uuid(grantId)) reject()
	try {
		const grant = await pendingTransaction(prisma, grantId, tenant, async (_tx, current) => current)
		const signed = await storage.issueCreateOnlyWrite({ key: grant.key, lifetimeSeconds: 120 })
		if (!signed.ok || signed.value.method !== 'PUT' ||
			signed.value.headers['If-None-Match'] !== '*' ||
			!Number.isFinite(signed.value.expiresAt?.getTime()) ||
			typeof signed.value.url !== 'string' || !signed.value.url) reject()
		const capability = signed.value
		const capabilityExpiryUtc = capability.expiresAt.toISOString()
		await pendingTransaction(prisma, grantId, tenant, async (tx, current) => {
			if (current.key !== grant.key) reject()
			// PrismaPg maps Date <-> timestamptz through the session timezone.
			// Compare and write the absolute instant in PostgreSQL with an explicit
			// UTC-offset value; never use the model Date for this monotone fence.
			const bounds = await tx.$queryRaw<ReadonlyArray<{ sourceUploadGrantId: string; covers: boolean }>>(Prisma.sql`
				SELECT "sourceUploadGrantId",
					COALESCE("latestWriteCapabilityExpiresAt" >= ${capabilityExpiryUtc}::timestamptz, false) AS "covers"
				FROM "ObjectStorageKeyAllocation" WHERE "objectKey" = ${grant.key}
			`)
			if (bounds.length !== 1 || bounds[0]?.sourceUploadGrantId !== grantId) reject()
			if (!bounds[0].covers) {
				const updated = await tx.$executeRaw(Prisma.sql`
					UPDATE "ObjectStorageKeyAllocation"
					SET "latestWriteCapabilityExpiresAt" = ${capabilityExpiryUtc}::timestamptz
					WHERE "objectKey" = ${grant.key} AND "sourceUploadGrantId" = ${grantId}
						AND ("latestWriteCapabilityExpiresAt" IS NULL OR
							"latestWriteCapabilityExpiresAt" < ${capabilityExpiryUtc}::timestamptz)
				`)
				if (updated !== 1) reject()
			}
			const confirmed = await tx.$queryRaw<ReadonlyArray<{ covers: boolean }>>(Prisma.sql`
				SELECT "latestWriteCapabilityExpiresAt" >= ${capabilityExpiryUtc}::timestamptz AS "covers"
				FROM "ObjectStorageKeyAllocation"
				WHERE "objectKey" = ${grant.key} AND "sourceUploadGrantId" = ${grantId}
			`)
			if (confirmed.length !== 1 || !confirmed[0]?.covers) reject()
			const clock = await tx.$queryRaw<ReadonlyArray<{ now: Date }>>(Prisma.sql`
				SELECT (clock_timestamp() AT TIME ZONE 'UTC') AS "now"
			`)
			if (!clock[0] || capability.expiresAt <= clock[0].now) reject()
		})
		return capability
	} catch { reject() }
}

/** Inactive N-FILE-110 command. Only the checked filename suffix comes from the client. */
export async function createCaseObjectStorageIntent(
	input: Readonly<{ caseId: string; filename: string }>,
	storage: ObjectStorage,
): Promise<Readonly<{ uploadGrantId: string; upload: ObjectCapability }>> {
	const checkedSuffix = parseCaseClinicalCheckedSuffix(input.filename)
	if (!checkedSuffix) reject()
	const tenant = await requireTenantContext()
	const staged = await stageCaseObjectStorageAsset({ caseId: input.caseId }, checkedSuffix)
	const upload = await issueCaseObjectStorageWrite(staged.uploadGrantId, tenant, storage)
	return Object.freeze({ uploadGrantId: staged.uploadGrantId, upload })
}
