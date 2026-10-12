import 'server-only'

import { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { createTransactionStageAuthorizer } from '../case-asset-stage.repository'
import { isCaseClinicalCheckedSuffix } from '../case-clinical-suffix'
import { type ReservedClinicalGrant } from '../jpeg-r001/grant'
import { getRetainedS001Context } from './validate'
import { S001Unavailable } from './identity'
import { S001_CODEC_MANIFEST } from './manifest'
import type { ValidatedClinicalJpegS001 } from './core'

function reject(): never { throw new S001Unavailable() }

function requireAcceptedResult(result: ValidatedClinicalJpegS001): void {
  if (!result || result.validationProfile !== S001_CODEC_MANIFEST.profile ||
    result.validatorVersion !== S001_CODEC_MANIFEST.validatorVersion ||
    result.codecBackend !== S001_CODEC_MANIFEST.backend ||
    result.codecPackageVersion !== S001_CODEC_MANIFEST.packageVersion ||
    result.codecLibraryVersion !== S001_CODEC_MANIFEST.libraryVersion ||
    result.codecRuntimeSha256 !== S001_CODEC_MANIFEST.librarySha256 ||
    !Number.isSafeInteger(result.encodedBytes) || result.encodedBytes <= 0 ||
    !Number.isSafeInteger(result.width) || result.width <= 0 ||
    !Number.isSafeInteger(result.height) || result.height <= 0 ||
    (result.sourceComponents !== 1 && result.sourceComponents !== 3) ||
    typeof result.isProgressive !== 'boolean' ||
    !/^[0-9a-f]{64}$/.test(result.sha256)) reject()
}

function sameGrantIdentity(grant: {
  id: string
  organizationId: string
  labId: string
  targetId: string | null
  createdByMemberId: string | null
  provider: string | null
  providerFileKey: string | null
  caseClinicalValidatedSuffix: string | null
}, retained: ReservedClinicalGrant): boolean {
  return grant.id === retained.uploadGrantId &&
    grant.organizationId === retained.organizationId &&
    grant.labId === retained.labId &&
    grant.targetId === retained.caseId &&
    grant.createdByMemberId === retained.memberId &&
    grant.provider === retained.provider &&
    grant.providerFileKey === retained.providerFileKey &&
    grant.caseClinicalValidatedSuffix === retained.checkedSuffix
}

/**
 * Atomically records successful S001 evidence and moves the exact PENDING
 * Case grant to UPLOADED. This module never accesses a provider or creates an
 * asset. The only eligibility token is the private outer-validator WeakMap.
 */
export function createS001ClinicalEvidenceFinalizer(prisma: typeof generalPrisma = generalPrisma) {
  return async (result: ValidatedClinicalJpegS001): Promise<void> => {
    try {
      requireAcceptedResult(result)
      const context = getRetainedS001Context(result)
      const validatedAt = new Date(context.validatedAtEpochMs)
      if (!Number.isFinite(validatedAt.getTime()) ||
        !isCaseClinicalCheckedSuffix(context.grant.checkedSuffix)) reject()

      await prisma.$transaction(async (tx) => {
        const lockedGrant = await tx.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
          SELECT "id" FROM "FileUploadGrant"
          WHERE "id" = ${context.grant.uploadGrantId}
          FOR UPDATE
        `)
        if (lockedGrant.length !== 1) reject()

        const [grant, clock] = await Promise.all([
          tx.fileUploadGrant.findUnique({ where: { id: context.grant.uploadGrantId }, select: {
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
        if (!grant || !now || !sameGrantIdentity(grant, context.grant) ||
          grant.boundaryId !== 'N-FILE-110' || grant.purpose !== 'case.asset.add.stage' ||
          grant.targetType !== 'case' || !grant.targetId || !grant.createdByMemberId ||
          grant.status !== 'PENDING' ||
          (grant.provider !== 'UPLOADTHING' && grant.provider !== 'OBJECT_STORAGE') ||
          !grant.providerFileKey || !isCaseClinicalCheckedSuffix(grant.caseClinicalValidatedSuffix) ||
          grant.providerFileUrl !== null || grant.uploadedAt !== null ||
          grant.consumedAt !== null || grant.expiredAt !== null || grant.failedAt !== null ||
          grant.providerDeletedAt !== null || grant.expiresAt <= now ||
          validatedAt < grant.createdAt || validatedAt >= grant.expiresAt ||
          validatedAt > now) reject()

        // Case status and its Lab/Organization relationship cannot change
        // before this transaction commits.
        const lockedCase = await tx.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
          SELECT "Case"."id" FROM "Case"
          JOIN "Lab" ON "Lab"."id" = "Case"."labId"
          WHERE "Case"."id" = ${grant.targetId}
            AND "Case"."labId" = ${grant.labId}
            AND "Lab"."organizationId" = ${grant.organizationId}
            AND "Case"."status" = 'DRAFT'
          FOR UPDATE OF "Case"
        `)
        if (lockedCase.length !== 1) reject()

        const [member, lab, existingEvidence] = await Promise.all([
          tx.member.findFirst({ where: {
            id: grant.createdByMemberId, organizationId: grant.organizationId,
          }, select: { id: true, userId: true, role: true } }),
          tx.lab.findFirst({ where: {
            id: grant.labId, organizationId: grant.organizationId,
          }, select: { id: true } }),
          tx.caseClinicalUploadEvidence.findUnique({
            where: { uploadGrantId: grant.id }, select: { uploadGrantId: true },
          }),
        ])
        if (!member || !lab || existingEvidence) reject()
        try {
          await createTransactionStageAuthorizer(tx).require({
            actor: createLabOSAuthorizationActor({
              userId: member.userId, memberId: member.id,
              organizationId: grant.organizationId, memberRole: member.role,
            }),
            boundaryId: 'N-FILE-110', permission: 'case.asset.add',
            target: { type: 'case', id: grant.targetId },
            correlationId: crypto.randomUUID(),
          })
        } catch { reject() }

        if (grant.provider === 'OBJECT_STORAGE') {
          // validatedAt is a timestamptz instant. PrismaPg's Date binding
          // applies the session offset, so bind an explicit UTC-offset value.
          await tx.$executeRaw(Prisma.sql`
            INSERT INTO "CaseClinicalUploadEvidence" (
              "uploadGrantId", "organizationId", "labId", "caseId", "provider",
              "providerObjectKey", "clinicalPurpose", "verifiedFormat",
              "validatedSuffix", "measuredSizeBytes", "width", "height",
              "contentSha256", "validationProfile", "validatorVersion",
              "codecBackend", "codecPackageVersion", "codecLibraryVersion",
              "codecRuntimeSha256", "sourceComponents", "isProgressive", "validatedAt"
            ) VALUES (
              ${grant.id}, ${grant.organizationId}, ${grant.labId}, ${grant.targetId},
              ${grant.provider}::"StoredFileProvider", ${grant.providerFileKey},
              'CLINICAL_REFERENCE_PHOTOGRAPH'::"CaseClinicalPurpose",
              'JPEG'::"CaseClinicalVerifiedFormat",
              ${grant.caseClinicalValidatedSuffix}::"CaseClinicalValidatedSuffix",
              ${BigInt(result.encodedBytes)}, ${result.width}, ${result.height},
              ${result.sha256}, ${result.validationProfile}, ${result.validatorVersion},
              ${result.codecBackend}::"CaseClinicalCodecBackend",
              ${result.codecPackageVersion}, ${result.codecLibraryVersion},
              ${result.codecRuntimeSha256}, ${result.sourceComponents},
              ${result.isProgressive}, ${validatedAt.toISOString()}::timestamptz
            )
          `)
        } else await tx.caseClinicalUploadEvidence.create({
          data: {
            uploadGrantId: grant.id,
            organizationId: grant.organizationId,
            labId: grant.labId,
            caseId: grant.targetId,
            provider: grant.provider,
            providerObjectKey: grant.providerFileKey,
            clinicalPurpose: 'CLINICAL_REFERENCE_PHOTOGRAPH',
            verifiedFormat: 'JPEG',
            validatedSuffix: grant.caseClinicalValidatedSuffix,
            measuredSizeBytes: BigInt(result.encodedBytes),
            width: result.width,
            height: result.height,
            contentSha256: result.sha256,
            validationProfile: result.validationProfile,
            validatorVersion: result.validatorVersion,
            codecBackend: result.codecBackend,
            codecPackageVersion: result.codecPackageVersion,
            codecLibraryVersion: result.codecLibraryVersion,
            codecRuntimeSha256: result.codecRuntimeSha256,
            sourceComponents: result.sourceComponents,
            isProgressive: result.isProgressive,
            validatedAt,
          },
          select: { uploadGrantId: true },
        })
        const transitioned = await tx.fileUploadGrant.updateMany({
          where: {
            id: grant.id, organizationId: grant.organizationId, labId: grant.labId,
            createdByMemberId: grant.createdByMemberId,
            boundaryId: 'N-FILE-110', purpose: 'case.asset.add.stage',
            targetType: 'case', targetId: grant.targetId,
            provider: grant.provider, providerFileKey: grant.providerFileKey,
            caseClinicalValidatedSuffix: grant.caseClinicalValidatedSuffix,
            providerFileUrl: null, providerDeletedAt: null,
            status: 'PENDING', uploadedAt: null, consumedAt: null,
            expiredAt: null, failedAt: null, expiresAt: { gt: now },
          },
          data: { status: 'UPLOADED', uploadedAt: now },
        })
        if (transitioned.count !== 1) reject()
      }, {
        maxWait: 5_000, timeout: 10_000,
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      })
    } catch {
      reject()
    }
  }
}

/** Grant-backed server entrypoint; direct byte-core results lack retained context. */
export const finalizeValidatedClinicalJpegS001 = createS001ClinicalEvidenceFinalizer()
