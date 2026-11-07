import 'server-only'

import { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { createTransactionStageAuthorizer } from '../case-asset-stage.repository'
import { isCaseClinicalCheckedSuffix } from '../case-clinical-suffix'
import type { ReservedClinicalGrant } from '../jpeg-r001/grant'
import { S001Unavailable } from './identity'

/**
 * A structural rejection is recorded only after the caller has retrieved the
 * exact object and inspected its bytes. This transaction revalidates the Case,
 * tenant, allocation and grant before its private DB transition function runs.
 */
export async function rejectDefinitiveCaseS001(
  retained: ReservedClinicalGrant,
  prisma: typeof generalPrisma = generalPrisma,
): Promise<void> {
  try {
    if (retained.provider !== 'OBJECT_STORAGE' ||
      !isCaseClinicalCheckedSuffix(retained.checkedSuffix)) throw new S001Unavailable()
    await prisma.$transaction(async (tx) => {
      const locked = await tx.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
        SELECT "id" FROM "FileUploadGrant"
        WHERE "id" = ${retained.uploadGrantId} FOR UPDATE
      `)
      if (locked.length !== 1) throw new S001Unavailable()
      const [grant, clock] = await Promise.all([
        tx.fileUploadGrant.findUnique({ where: { id: retained.uploadGrantId }, select: {
          id: true, organizationId: true, labId: true, createdByMemberId: true,
          boundaryId: true, purpose: true, targetType: true, targetId: true,
          provider: true, providerFileKey: true, providerFileUrl: true,
          caseClinicalValidatedSuffix: true, status: true, expiresAt: true,
          uploadedAt: true, consumedAt: true, failedAt: true, expiredAt: true,
          providerDeletedAt: true,
        } }),
        tx.$queryRaw<ReadonlyArray<{ now: Date }>>(Prisma.sql`
          SELECT (clock_timestamp() AT TIME ZONE 'UTC') AS "now"
        `),
      ])
      const now = clock[0]?.now
      if (!grant || !now || grant.id !== retained.uploadGrantId ||
        grant.organizationId !== retained.organizationId ||
        grant.labId !== retained.labId || grant.targetId !== retained.caseId ||
        grant.createdByMemberId !== retained.memberId ||
        grant.provider !== 'OBJECT_STORAGE' ||
        grant.providerFileKey !== retained.providerFileKey ||
        grant.caseClinicalValidatedSuffix !== retained.checkedSuffix ||
        grant.boundaryId !== 'N-FILE-110' ||
        grant.purpose !== 'case.asset.add.stage' ||
        grant.targetType !== 'case' || grant.status !== 'PENDING' ||
        grant.expiresAt <= now || grant.providerFileUrl !== null ||
        grant.uploadedAt !== null || grant.consumedAt !== null ||
        grant.failedAt !== null || grant.expiredAt !== null ||
        grant.providerDeletedAt !== null) throw new S001Unavailable()

      const caseRows = await tx.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
        SELECT "Case"."id" FROM "Case"
        JOIN "Lab" ON "Lab"."id" = "Case"."labId"
        WHERE "Case"."id" = ${retained.caseId}
          AND "Case"."labId" = ${retained.labId}
          AND "Lab"."organizationId" = ${retained.organizationId}
          AND "Case"."status" = 'DRAFT'
        FOR UPDATE OF "Case"
      `)
      if (caseRows.length !== 1) throw new S001Unavailable()
      const [allocation, member, existingEvidence, existingFile] = await Promise.all([
        tx.objectStorageKeyAllocation.findUnique({
          where: { objectKey: retained.providerFileKey },
          select: { sourceUploadGrantId: true, latestWriteCapabilityExpiresAt: true },
        }),
        tx.member.findFirst({ where: {
          id: retained.memberId, organizationId: retained.organizationId,
        }, select: { id: true, userId: true, role: true } }),
        tx.caseClinicalUploadEvidence.findUnique({
          where: { uploadGrantId: retained.uploadGrantId },
          select: { uploadGrantId: true },
        }),
        tx.storedFile.findFirst({ where: { OR: [
          { sourceUploadGrantId: retained.uploadGrantId },
          { provider: 'OBJECT_STORAGE', providerObjectKey: retained.providerFileKey },
        ] }, select: { id: true } }),
      ])
      if (allocation?.sourceUploadGrantId !== retained.uploadGrantId ||
        !allocation.latestWriteCapabilityExpiresAt || !member ||
        existingEvidence || existingFile) throw new S001Unavailable()
      await createTransactionStageAuthorizer(tx).require({
        actor: createLabOSAuthorizationActor({
          userId: member.userId, memberId: member.id,
          organizationId: retained.organizationId, memberRole: member.role,
        }),
        boundaryId: 'N-FILE-110', permission: 'case.asset.add',
        target: { type: 'case', id: retained.caseId },
        correlationId: crypto.randomUUID(),
      })
      const transitioned = await tx.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
        SELECT id FROM labos_cleanup_private.reject_case_s001(${retained.uploadGrantId})
      `)
      if (transitioned.length !== 1 || transitioned[0].id !== retained.uploadGrantId)
        throw new S001Unavailable()
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 5_000, timeout: 10_000 })
  } catch { throw new S001Unavailable() }
}
