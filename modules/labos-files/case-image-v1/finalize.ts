import 'server-only'

import { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { createTransactionStageAuthorizer } from '../case-asset-stage.repository'
import { getRetainedCaseImageV1Context } from './object-storage'
import { CaseImageV1Unavailable, type VerifiedCaseImageV1 } from './validate'

function reject(): never { throw new CaseImageV1Unavailable() }

/** Uses only a privately retained, fully decoded result from exact object retrieval. */
export function createCaseImageV1EvidenceFinalizer(prisma: typeof generalPrisma = generalPrisma) {
  return async (result: VerifiedCaseImageV1): Promise<void> => {
    try {
      const context = getRetainedCaseImageV1Context(result)
      const { grant } = context
      const suffix = result.verifiedFormat
      const release = suffix === 'PNG' ? 'CASE_PNG_V1_SHARP_1' : 'CASE_WEBP_V1_SHARP_1'
      const validatedAt = new Date(context.validatedAtEpochMs)
      if (grant.provider !== 'OBJECT_STORAGE' || grant.checkedSuffix !== suffix ||
        result.validatedSuffix !== (suffix === 'PNG' ? '.png' : '.webp') ||
        result.verifiedMime !== (suffix === 'PNG' ? 'image/png' : 'image/webp') ||
        result.validatorRelease !== release || result.decoder !== 'SHARP_LIBVIPS' ||
        result.sharpVersion !== '0.35.4' || result.libvipsVersion !== '8.18.6' ||
        !Number.isSafeInteger(result.encodedBytes) || result.encodedBytes <= 0 ||
        !Number.isSafeInteger(result.width) || result.width <= 0 ||
        !Number.isSafeInteger(result.height) || result.height <= 0 ||
        !/^[0-9a-f]{64}$/.test(result.sha256) || !Number.isFinite(validatedAt.getTime())) reject()

      await prisma.$transaction(async tx => {
        const locked = await tx.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
          SELECT "id" FROM "FileUploadGrant" WHERE "id" = ${grant.uploadGrantId} FOR UPDATE
        `)
        if (locked.length !== 1) reject()
        const [current, clock] = await Promise.all([
          tx.fileUploadGrant.findUnique({ where: { id: grant.uploadGrantId }, select: {
            id: true, organizationId: true, labId: true, createdByMemberId: true,
            boundaryId: true, purpose: true, targetType: true, targetId: true,
            status: true, provider: true, providerFileKey: true, providerFileUrl: true,
            caseClinicalValidatedSuffix: true, createdAt: true, expiresAt: true,
            uploadedAt: true, consumedAt: true, expiredAt: true, failedAt: true,
            providerDeletedAt: true,
          } }),
          tx.$queryRaw<ReadonlyArray<{ now: Date }>>(Prisma.sql`
            SELECT (clock_timestamp() AT TIME ZONE 'UTC') AS "now"
          `),
        ])
        const now = clock[0]?.now
        if (!current || !now || current.id !== grant.uploadGrantId ||
          current.organizationId !== grant.organizationId || current.labId !== grant.labId ||
          current.targetId !== grant.caseId || current.createdByMemberId !== grant.memberId ||
          current.provider !== 'OBJECT_STORAGE' || current.providerFileKey !== grant.providerFileKey ||
          current.caseClinicalValidatedSuffix !== suffix ||
          current.boundaryId !== 'N-FILE-110' || current.purpose !== 'case.asset.add.stage' ||
          current.targetType !== 'case' || current.status !== 'PENDING' ||
          current.providerFileUrl !== null || current.uploadedAt !== null ||
          current.consumedAt !== null || current.expiredAt !== null ||
          current.failedAt !== null || current.providerDeletedAt !== null ||
          current.expiresAt <= now || validatedAt < current.createdAt ||
          validatedAt >= current.expiresAt || validatedAt > now) reject()
        const caseRows = await tx.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
          SELECT "Case"."id" FROM "Case" JOIN "Lab" ON "Lab"."id" = "Case"."labId"
          WHERE "Case"."id" = ${grant.caseId} AND "Case"."labId" = ${grant.labId}
            AND "Lab"."organizationId" = ${grant.organizationId} AND "Case"."status" = 'DRAFT'
          FOR UPDATE OF "Case"
        `)
        if (caseRows.length !== 1) reject()
        const [member, allocation, existingEvidence] = await Promise.all([
          tx.member.findFirst({ where: { id: grant.memberId, organizationId: grant.organizationId },
            select: { id: true, userId: true, role: true } }),
          tx.objectStorageKeyAllocation.findUnique({ where: { objectKey: grant.providerFileKey },
            select: { sourceUploadGrantId: true, latestWriteCapabilityExpiresAt: true } }),
          tx.caseClinicalUploadEvidence.findUnique({ where: { uploadGrantId: grant.uploadGrantId },
            select: { uploadGrantId: true } }),
        ])
        if (!member || allocation?.sourceUploadGrantId !== grant.uploadGrantId ||
          !allocation.latestWriteCapabilityExpiresAt || existingEvidence) reject()
        try {
          await createTransactionStageAuthorizer(tx).require({
            actor: createLabOSAuthorizationActor({ userId: member.userId, memberId: member.id,
              organizationId: grant.organizationId, memberRole: member.role }),
            boundaryId: 'N-FILE-110', permission: 'case.asset.add',
            target: { type: 'case', id: grant.caseId }, correlationId: crypto.randomUUID(),
          })
        } catch { reject() }

        await tx.$executeRaw(Prisma.sql`
          INSERT INTO "CaseClinicalUploadEvidence" (
            "uploadGrantId", "organizationId", "labId", "caseId", "provider",
            "providerObjectKey", "clinicalPurpose", "verifiedFormat", "validatedSuffix",
            "measuredSizeBytes", "width", "height", "contentSha256", "validationProfile",
            "validatorVersion", "codecBackend", "codecPackageVersion", "codecLibraryVersion",
            "codecRuntimeSha256", "sourceComponents", "isProgressive", "validatedAt"
          ) VALUES (
            ${grant.uploadGrantId}, ${grant.organizationId}, ${grant.labId}, ${grant.caseId},
            'OBJECT_STORAGE'::"StoredFileProvider", ${grant.providerFileKey},
            'CLINICAL_REFERENCE_PHOTOGRAPH'::"CaseClinicalPurpose",
            ${suffix}::"CaseClinicalVerifiedFormat", ${suffix}::"CaseClinicalValidatedSuffix",
            ${BigInt(result.encodedBytes)}, ${result.width}, ${result.height}, ${result.sha256},
            ${release}, ${release}, 'SHARP_LIBVIPS'::"CaseClinicalCodecBackend",
            ${result.sharpVersion}, ${result.libvipsVersion}, NULL, NULL, NULL,
            ${validatedAt.toISOString()}::timestamptz
          )
        `)
        const transitioned = await tx.fileUploadGrant.updateMany({ where: {
          id: grant.uploadGrantId, organizationId: grant.organizationId, labId: grant.labId,
          createdByMemberId: grant.memberId, boundaryId: 'N-FILE-110',
          purpose: 'case.asset.add.stage', targetType: 'case', targetId: grant.caseId,
          provider: 'OBJECT_STORAGE', providerFileKey: grant.providerFileKey,
          caseClinicalValidatedSuffix: suffix, providerFileUrl: null, providerDeletedAt: null,
          status: 'PENDING', uploadedAt: null, consumedAt: null, expiredAt: null, failedAt: null,
          expiresAt: { gt: now },
        }, data: { status: 'UPLOADED', uploadedAt: now } })
        if (transitioned.count !== 1) reject()
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5_000, timeout: 10_000 })
    } catch { reject() }
  }
}

export const finalizeValidatedCaseImageV1 = createCaseImageV1EvidenceFinalizer()
