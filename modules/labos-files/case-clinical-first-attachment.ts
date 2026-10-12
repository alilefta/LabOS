import 'server-only'

import { createHash, randomUUID } from 'node:crypto'
import { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { createTransactionStageAuthorizer } from './case-asset-stage.repository'
import { isCaseClinicalCheckedSuffix } from './case-clinical-suffix'
import { retrieveReservedUploadThingBytes } from './jpeg-r001/retrieve'
import { S001_CODEC_MANIFEST } from './jpeg-s001/manifest'
import type { ObjectStorage } from './object-storage/contract'

export class CaseClinicalAttachmentUnavailable extends Error {
  constructor() { super('Case asset unavailable'); this.name = 'CaseClinicalAttachmentUnavailable' }
}

function reject(): never { throw new CaseClinicalAttachmentUnavailable() }
const grantIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

type Db = typeof generalPrisma
type Tx = Prisma.TransactionClient

const grantSelect = {
  id: true, organizationId: true, labId: true, createdByMemberId: true,
  boundaryId: true, purpose: true, targetType: true, targetId: true,
  status: true, provider: true, providerFileKey: true, providerFileUrl: true,
  caseClinicalValidatedSuffix: true, expiresAt: true, uploadedAt: true,
  consumedAt: true, expiredAt: true, failedAt: true, providerDeletedAt: true,
} as const

const evidenceSelect = {
  uploadGrantId: true, organizationId: true, labId: true, caseId: true,
  provider: true, providerObjectKey: true, clinicalPurpose: true,
  verifiedFormat: true, validatedSuffix: true, measuredSizeBytes: true,
  width: true, height: true, contentSha256: true, validationProfile: true,
  validatorVersion: true, codecBackend: true, codecPackageVersion: true,
  codecLibraryVersion: true, codecRuntimeSha256: true,
  sourceComponents: true, isProgressive: true, validatedAt: true,
} as const

async function qualify(tx: Tx, id: string, lock: boolean) {
  if (lock) {
    const rows = await tx.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
      SELECT "id" FROM "FileUploadGrant" WHERE "id" = ${id} FOR UPDATE
    `)
    if (rows.length !== 1) reject()
  }
  const [grant, clock] = await Promise.all([
    tx.fileUploadGrant.findUnique({ where: { id }, select: grantSelect }),
    tx.$queryRaw<ReadonlyArray<{ now: Date }>>(Prisma.sql`SELECT (clock_timestamp() AT TIME ZONE 'UTC') AS "now"`),
  ])
  const now = clock[0]?.now
  if (!grant || !now || grant.boundaryId !== 'N-FILE-110' ||
    grant.purpose !== 'case.asset.add.stage' || grant.targetType !== 'case' ||
    !grant.targetId || !grant.createdByMemberId ||
    (grant.provider !== 'UPLOADTHING' && grant.provider !== 'OBJECT_STORAGE') ||
    !grant.providerFileKey || grant.providerFileUrl !== null ||
    !isCaseClinicalCheckedSuffix(grant.caseClinicalValidatedSuffix) ||
    grant.providerDeletedAt !== null || grant.status !== 'UPLOADED' ||
    grant.uploadedAt === null || grant.consumedAt !== null ||
    grant.expiredAt !== null || grant.failedAt !== null || grant.expiresAt <= now) reject()

  if (lock) {
    const cases = await tx.$queryRaw<ReadonlyArray<{ id: string }>>(Prisma.sql`
      SELECT "Case"."id" FROM "Case"
      JOIN "Lab" ON "Lab"."id" = "Case"."labId"
      WHERE "Case"."id" = ${grant.targetId}
        AND "Case"."labId" = ${grant.labId}
        AND "Lab"."organizationId" = ${grant.organizationId}
        AND "Case"."status" = 'DRAFT'
      FOR UPDATE OF "Case"
    `)
    if (cases.length !== 1) reject()
  }

  const [evidence, member, lab, dentalCase, existingFile] = await Promise.all([
    tx.caseClinicalUploadEvidence.findUnique({ where: { uploadGrantId: id }, select: evidenceSelect }),
    tx.member.findFirst({ where: { id: grant.createdByMemberId, organizationId: grant.organizationId },
      select: { id: true, userId: true, role: true } }),
    tx.lab.findFirst({ where: { id: grant.labId, organizationId: grant.organizationId }, select: { id: true } }),
    tx.case.findFirst({ where: { id: grant.targetId, labId: grant.labId,
      lab: { organizationId: grant.organizationId }, status: 'DRAFT' }, select: { id: true } }),
    tx.storedFile.findFirst({ where: { OR: [
      { sourceUploadGrantId: id },
      { provider: grant.provider, providerObjectKey: grant.providerFileKey },
    ] }, select: { id: true } }),
  ])
  if (!evidence || !member || !lab || !dentalCase || existingFile ||
    evidence.uploadGrantId !== grant.id || evidence.organizationId !== grant.organizationId ||
    evidence.labId !== grant.labId || evidence.caseId !== grant.targetId ||
    evidence.provider !== grant.provider || evidence.providerObjectKey !== grant.providerFileKey ||
    evidence.validatedSuffix !== grant.caseClinicalValidatedSuffix ||
    evidence.clinicalPurpose !== 'CLINICAL_REFERENCE_PHOTOGRAPH' ||
    evidence.verifiedFormat !== 'JPEG' ||
    evidence.validationProfile !== S001_CODEC_MANIFEST.profile ||
    evidence.validatorVersion !== S001_CODEC_MANIFEST.validatorVersion ||
    evidence.codecBackend !== S001_CODEC_MANIFEST.backend ||
    evidence.codecPackageVersion !== S001_CODEC_MANIFEST.packageVersion ||
    evidence.codecLibraryVersion !== S001_CODEC_MANIFEST.libraryVersion ||
    evidence.codecRuntimeSha256 !== S001_CODEC_MANIFEST.librarySha256 ||
    (evidence.sourceComponents !== 1 && evidence.sourceComponents !== 3) ||
    typeof evidence.isProgressive !== 'boolean' ||
    evidence.measuredSizeBytes <= BigInt(0) || evidence.measuredSizeBytes > BigInt(33_554_432) ||
    !/^[0-9a-f]{64}$/.test(evidence.contentSha256)) reject()
  try {
    await createTransactionStageAuthorizer(tx).require({
      actor: createLabOSAuthorizationActor({ userId: member.userId,
        memberId: member.id, organizationId: grant.organizationId, memberRole: member.role }),
      boundaryId: 'N-FILE-110', permission: 'case.asset.add',
      target: { type: 'case', id: grant.targetId }, correlationId: randomUUID(),
    })
  } catch { reject() }
  return { grant, evidence, member }
}

function sameSnapshot(a: Awaited<ReturnType<typeof qualify>>, b: Awaited<ReturnType<typeof qualify>>) {
  const g = a.grant, h = b.grant, e = a.evidence, f = b.evidence
  return g.id === h.id && g.organizationId === h.organizationId && g.labId === h.labId &&
    g.targetId === h.targetId && g.createdByMemberId === h.createdByMemberId &&
    g.provider === h.provider && g.providerFileKey === h.providerFileKey &&
    g.caseClinicalValidatedSuffix === h.caseClinicalValidatedSuffix &&
    g.status === h.status && g.expiresAt.getTime() === h.expiresAt.getTime() &&
    g.uploadedAt?.getTime() === h.uploadedAt?.getTime() &&
    e.uploadGrantId === f.uploadGrantId && e.organizationId === f.organizationId &&
    e.labId === f.labId && e.caseId === f.caseId && e.provider === f.provider &&
    e.providerObjectKey === f.providerObjectKey && e.validatedSuffix === f.validatedSuffix &&
    e.clinicalPurpose === f.clinicalPurpose && e.verifiedFormat === f.verifiedFormat &&
    e.validationProfile === f.validationProfile && e.validatorVersion === f.validatorVersion &&
    e.codecBackend === f.codecBackend && e.codecPackageVersion === f.codecPackageVersion &&
    e.codecLibraryVersion === f.codecLibraryVersion && e.codecRuntimeSha256 === f.codecRuntimeSha256 &&
    e.sourceComponents === f.sourceComponents && e.isProgressive === f.isProgressive &&
    e.measuredSizeBytes === f.measuredSizeBytes && e.contentSha256 === f.contentSha256 &&
    e.width === f.width && e.height === f.height &&
    e.validatedAt.getTime() === f.validatedAt.getTime()
}

/** Server-only writer. The injectable transport exists for focused/disposable verification. */
export function createCaseClinicalFirstAttachment(
  prisma: Db = generalPrisma,
  retrieve: typeof retrieveReservedUploadThingBytes = retrieveReservedUploadThingBytes,
  objectStorage?: () => ObjectStorage,
) {
  return async (uploadGrantId: string): Promise<void> => {
    if (typeof uploadGrantId !== 'string' || !grantIdPattern.test(uploadGrantId)) reject()
    try {
      const before = await prisma.$transaction((tx) => qualify(tx, uploadGrantId, false), {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable, maxWait: 5_000, timeout: 10_000,
      })
      const original = before.grant.provider === 'OBJECT_STORAGE'
        ? await (async () => {
          if (!objectStorage) reject()
          const result = await objectStorage().retrieve({
            key: before.grant.providerFileKey!, maxBytes: 33_554_432,
          })
          if (!result.ok) reject()
          return Buffer.from(result.value)
        })()
        : await retrieve(before.grant.providerFileKey!)
      if (!Buffer.isBuffer(original) || BigInt(original.length) !== before.evidence.measuredSizeBytes) reject()
      const digest = createHash('sha256').update(original).digest('hex')
      if (digest !== before.evidence.contentSha256) reject()
      // No asynchronous work intervenes between this integrity check and opening the write transaction.
      if (BigInt(original.length) !== before.evidence.measuredSizeBytes ||
        createHash('sha256').update(original).digest('hex') !== digest) reject()

      await prisma.$transaction(async (tx) => {
        const fresh = await qualify(tx, uploadGrantId, true)
        if (!sameSnapshot(before, fresh) ||
          BigInt(original.length) !== fresh.evidence.measuredSizeBytes ||
          createHash('sha256').update(original).digest('hex') !== fresh.evidence.contentSha256) reject()
        const { grant, evidence, member } = fresh
        const stored = await tx.storedFile.create({ data: {
          organizationId: grant.organizationId, labId: grant.labId,
          sourceUploadGrantId: grant.id, provider: grant.provider!,
          providerObjectKey: grant.providerFileKey!,
          providerAccess: grant.provider === 'OBJECT_STORAGE' ? 'PRIVATE' : 'PUBLIC_READ',
          purpose: 'CASE_CLINICAL_ASSET', detectedMimeType: 'image/jpeg',
          sizeBytes: evidence.measuredSizeBytes, checksumAlgorithm: 'SHA-256',
          checksumValue: evidence.contentSha256, uploaderMemberId: member.id,
          uploaderMemberIdSnapshot: member.id,
        }, select: { id: true } })
        const asset = await tx.caseAssetFile.create({ data: {
          dentalCaseId: grant.targetId!, labId: grant.labId, assetFileType: 'IMAGE',
          storageMode: grant.provider === 'OBJECT_STORAGE' ? 'MANAGED_PRIVATE' : 'MANAGED_PUBLIC',
          clinicalPurpose: evidence.clinicalPurpose,
          documentUrl: null, fileExtension: null, currentVersionId: null,
        }, select: { id: true } })
        const version = await tx.caseAssetFileVersion.create({ data: {
          caseAssetFileId: asset.id, organizationId: grant.organizationId, labId: grant.labId,
          storedFileId: stored.id, versionNumber: 1, createdByMemberId: member.id,
          createdByMemberIdSnapshot: member.id,
        }, select: { id: true } })
        await tx.caseAssetFile.update({ where: { id: asset.id }, data: { currentVersionId: version.id } })
        const clock = await tx.$queryRaw<ReadonlyArray<{ now: Date }>>(Prisma.sql`SELECT (clock_timestamp() AT TIME ZONE 'UTC') AS "now"`)
        const now = clock[0]?.now
        if (!now) reject()
        const consumed = await tx.fileUploadGrant.updateMany({ where: {
          id: grant.id, organizationId: grant.organizationId, labId: grant.labId,
          createdByMemberId: member.id, boundaryId: 'N-FILE-110', purpose: 'case.asset.add.stage',
          targetType: 'case', targetId: grant.targetId,
          provider: grant.provider, providerFileKey: grant.providerFileKey,
          caseClinicalValidatedSuffix: grant.caseClinicalValidatedSuffix,
          status: 'UPLOADED', consumedAt: null, expiredAt: null, failedAt: null,
          providerDeletedAt: null, expiresAt: { gt: now },
        }, data: { status: 'CONSUMED', consumedAt: now } })
        if (consumed.count !== 1) reject()
      }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, maxWait: 5_000, timeout: 10_000 })
    } catch { reject() }
  }
}

export const attachFirstCaseClinicalAsset = createCaseClinicalFirstAttachment()
