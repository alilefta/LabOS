import { createHash, randomUUID } from 'node:crypto'
import sharp from 'sharp'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { Prisma } from '@/generated/prisma/client'

const url = 'postgresql://postgres@127.0.0.1:55495/postgres?schema=public'
if (process.env.DATABASE_URL !== url || process.env.DIRECT_URL !== url) {
  throw new Error('Case PNG/WebP disposable target mismatch')
}

const tenant = { userId: 'imagev1-user', memberId: 'imagev1-member', memberRole: 'owner',
  staffId: null, organizationId: 'imagev1-org', labId: 'imagev1-lab',
  lab: { id: 'imagev1-lab', title: 'Synthetic Lab', slug: null } }
vi.mock('@/platform/organizations', async original => ({
  ...(await original<object>()), requireTenantContext: async () => tenant,
}))

import { generalPrisma } from '@/lib/prisma'
import { createCaseObjectStorageIntent } from '@/modules/labos-files/case-object-storage-upload'
import { completeCaseObjectStorageUpload } from '@/modules/labos-files/case-object-storage-completion'
import { createCaseClinicalFirstAttachment } from '@/modules/labos-files/case-clinical-first-attachment'
import { resolveReservedClinicalGrant } from '@/modules/labos-files/jpeg-r001/grant'
import type { ObjectStorage } from '@/modules/labos-files/object-storage/contract'

const caseId = '55555555-5555-4555-8555-555555555555'
const objects = new Map<string, Uint8Array>()
const storage: ObjectStorage = {
  async issueCreateOnlyWrite() { return { ok: true, value: { url: 'synthetic-disposable-only',
    method: 'PUT', headers: { 'If-None-Match': '*' },
    expiresAt: new Date(Date.now() + 120_000) } } },
  async inspect(key) { const value = objects.get(key)
    return { ok: true, value: value ? { presence: 'PRESENT', bytes: value.length } : { presence: 'ABSENT' } } },
  async retrieve({ key, maxBytes }) { const value = objects.get(key)
    return value && value.length <= maxBytes ? { ok: true, value }
      : { ok: false, error: { code: 'UNAVAILABLE' } } },
  async issuePrivateRead() { return { ok: false, error: { code: 'UNAVAILABLE' } } },
  async deleteExact() { return { ok: false, error: { code: 'UNAVAILABLE' } } },
  async classifyPresence() { return { ok: false, error: { code: 'UNAVAILABLE' } } },
}
const attach = createCaseClinicalFirstAttachment(generalPrisma, undefined, () => storage)
const digest = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex')
const picture = () => sharp({ create: { width: 4, height: 3, channels: 4,
  background: { r: 12, g: 34, b: 56, alpha: 0.5 } } })

async function intent(extension: string) {
  const created = await createCaseObjectStorageIntent({ caseId, filename: `clinical.${extension}` }, storage)
  const grant = await generalPrisma.fileUploadGrant.findUniqueOrThrow({ where: { id: created.uploadGrantId } })
  return { ...created, key: grant.providerFileKey! }
}

beforeAll(async () => {
  const state = await generalPrisma.$queryRaw<Array<{ version: string; who: string; count: bigint }>>(Prisma.sql`
    SELECT current_setting('server_version_num') AS version, current_user AS who,
      (SELECT count(*) FROM pg_catalog.pg_constraint
        WHERE conname = 'CaseClinicalUploadEvidence_format_identity') AS count
  `)
  expect(state[0]).toMatchObject({ version: '170011', who: 'postgres', count: BigInt(1) })
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "AuthUser" (id,name,email,"updatedAt")
    VALUES ('imagev1-user','Synthetic','imagev1@example.invalid',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO organization (id,name,slug,"createdAt")
    VALUES ('imagev1-org','Synthetic','imagev1-org',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Lab" (id,title,"organizationId","updatedAt")
    VALUES ('imagev1-lab','Synthetic','imagev1-org',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO member (id,"organizationId","userId",role,"createdAt")
    VALUES ('imagev1-member','imagev1-org','imagev1-user','owner',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Patient" (id,name,"labId","updatedAt")
    VALUES ('imagev1-patient','Synthetic','imagev1-lab',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Case" (id,"patientId","labId","caseNumber","status","updatedAt")
    VALUES (${caseId},'imagev1-patient','imagev1-lab',${caseId},'DRAFT',now()) ON CONFLICT DO NOTHING`)
})
afterAll(async () => { await generalPrisma.$disconnect() })

describe('Case PNG/WebP V1 disposable PostgreSQL composition', () => {
  it.each([
    ['png', 'PNG', 'image/png', false],
    ['webp', 'WEBP', 'image/webp', false],
    ['webp', 'WEBP', 'image/webp', true],
  ] as const)('completes and attaches %s lossless=%s atomically', async (extension, format, mime, lossless) => {
    const bytes = extension === 'png' ? await picture().png().toBuffer()
      : await picture().webp({ lossless }).toBuffer()
    const created = await intent(extension)
    objects.set(created.key, bytes)
    await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId))
      .resolves.toEqual({ uploadGrantId: created.uploadGrantId })
    const evidence = await generalPrisma.caseClinicalUploadEvidence.findUniqueOrThrow({
      where: { uploadGrantId: created.uploadGrantId } })
    expect(evidence).toMatchObject({ verifiedFormat: format, validatedSuffix: format,
      measuredSizeBytes: BigInt(bytes.length), contentSha256: digest(bytes),
      codecBackend: 'SHARP_LIBVIPS' })
    expect((await generalPrisma.fileUploadGrant.findUniqueOrThrow({
      where: { id: created.uploadGrantId } })).status).toBe('UPLOADED')
    await expect(attach(created.uploadGrantId)).resolves.toBeUndefined()
    const stored = await generalPrisma.storedFile.findUniqueOrThrow({
      where: { sourceUploadGrantId: created.uploadGrantId } })
    expect(stored).toMatchObject({ provider: 'OBJECT_STORAGE', providerAccess: 'PRIVATE',
      detectedMimeType: mime, sizeBytes: BigInt(bytes.length), checksumValue: digest(bytes) })
    expect((await generalPrisma.fileUploadGrant.findUniqueOrThrow({
      where: { id: created.uploadGrantId } })).status).toBe('CONSUMED')
    expect(await generalPrisma.caseAssetFileVersion.count({ where: { storedFileId: stored.id } })).toBe(1)
  }, 30000)

  it('rejects a suffix/content mismatch without evidence or transition', async () => {
    const created = await intent('png')
    objects.set(created.key, await picture().webp().toBuffer())
    await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId)).rejects.toThrow()
    expect(await generalPrisma.caseClinicalUploadEvidence.count({
      where: { uploadGrantId: created.uploadGrantId } })).toBe(0)
    expect((await generalPrisma.fileUploadGrant.findUniqueOrThrow({
      where: { id: created.uploadGrantId } })).status).toBe('PENDING')
  })

  it('rejects replaced bytes at first attachment without a canonical file', async () => {
    const created = await intent('png')
    objects.set(created.key, await picture().png().toBuffer())
    await completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId)
    objects.set(created.key, await picture().png({ compressionLevel: 0 }).toBuffer())
    await expect(attach(created.uploadGrantId)).rejects.toThrow()
    expect(await generalPrisma.storedFile.count({ where: { sourceUploadGrantId: created.uploadGrantId } })).toBe(0)
  })

  it('denies a wrong tenant, Lab, Member or Case before object access', async () => {
    const created = await intent('png')
    for (const change of [
      { organizationId: 'foreign' }, { labId: 'foreign' },
      { memberId: 'foreign' }, { userId: 'foreign' },
    ]) {
      await expect(resolveReservedClinicalGrant(created.uploadGrantId, generalPrisma,
        { provider: 'OBJECT_STORAGE', tenant: { ...tenant, ...change }, allowCaseImageV1: true }))
        .rejects.toThrow()
    }
    await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, 'foreign-case'))
      .rejects.toThrow()
    expect(await generalPrisma.caseClinicalUploadEvidence.count({
      where: { uploadGrantId: created.uploadGrantId } })).toBe(0)
  })

  it('keeps a decoder failure retryable with no evidence', async () => {
    const created = await intent('png')
    const bytes = await picture().png().toBuffer()
    const invalid = Buffer.from(bytes)
    const at = invalid.indexOf(Buffer.from('IDAT'))
    invalid.fill(0, at + 4, at + 10)
    objects.set(created.key, invalid)
    await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId))
      .rejects.toThrow()
    expect(await generalPrisma.caseClinicalUploadEvidence.count({
      where: { uploadGrantId: created.uploadGrantId } })).toBe(0)
    expect((await generalPrisma.fileUploadGrant.findUniqueOrThrow({
      where: { id: created.uploadGrantId } })).status).toBe('PENDING')
  })

  it('retains one canonical attachment under concurrent attempts', async () => {
    const created = await intent('png')
    objects.set(created.key, await picture().png().toBuffer())
    await completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId)
    const outcomes = await Promise.allSettled([attach(created.uploadGrantId), attach(created.uploadGrantId)])
    expect(outcomes.filter(x => x.status === 'fulfilled')).toHaveLength(1)
    expect(outcomes.filter(x => x.status === 'rejected')).toHaveLength(1)
    expect(await generalPrisma.storedFile.count({ where: { sourceUploadGrantId: created.uploadGrantId } })).toBe(1)
    expect(await generalPrisma.caseAssetFileVersion.count({
      where: { storedFile: { sourceUploadGrantId: created.uploadGrantId } } })).toBe(1)
  }, 30000)

  it('enforces format, suffix and decoder constraints while preserving historical JPEG evidence', async () => {
    const png = await intent('png')
    const invalid = (suffix: 'PNG' | 'WEBP', backend: 'SHARP_LIBVIPS' | 'JULUSIAN_TURBOJPEG') =>
      generalPrisma.$executeRaw(Prisma.sql`
        INSERT INTO "CaseClinicalUploadEvidence" (
          "uploadGrantId", "organizationId", "labId", "caseId", "provider", "providerObjectKey",
          "clinicalPurpose", "verifiedFormat", "validatedSuffix", "measuredSizeBytes",
          "width", "height", "contentSha256", "validationProfile", "validatorVersion",
          "codecBackend", "codecPackageVersion", "codecLibraryVersion", "validatedAt"
        ) VALUES (${png.uploadGrantId}, 'imagev1-org', 'imagev1-lab', ${caseId},
          'OBJECT_STORAGE', ${png.key}, 'CLINICAL_REFERENCE_PHOTOGRAPH', 'PNG',
          ${suffix}::"CaseClinicalValidatedSuffix", 1, 1, 1, ${'a'.repeat(64)},
          'CASE_PNG_V1_SHARP_1', 'CASE_PNG_V1_SHARP_1',
          ${backend}::"CaseClinicalCodecBackend", '0.35.4', '8.18.6', now())
      `)
    await expect(invalid('WEBP', 'SHARP_LIBVIPS')).rejects.toThrow()
    await expect(invalid('PNG', 'JULUSIAN_TURBOJPEG')).rejects.toThrow()
    expect(await generalPrisma.caseClinicalUploadEvidence.count({
      where: { uploadGrantId: png.uploadGrantId } })).toBe(0)

    const jpeg = await intent('jpg')
    await generalPrisma.$transaction(async tx => {
      await tx.$executeRaw(Prisma.sql`
        INSERT INTO "CaseClinicalUploadEvidence" (
          "uploadGrantId", "organizationId", "labId", "caseId", "provider", "providerObjectKey",
          "clinicalPurpose", "verifiedFormat", "validatedSuffix", "measuredSizeBytes",
          "width", "height", "contentSha256", "validationProfile", "validatedAt"
        ) VALUES (${jpeg.uploadGrantId}, 'imagev1-org', 'imagev1-lab', ${caseId},
          'OBJECT_STORAGE', ${jpeg.key}, 'CLINICAL_REFERENCE_PHOTOGRAPH', 'JPEG', 'JPG',
          1, 1, 1, ${'b'.repeat(64)}, 'JPEG_CLINICAL_V1_R001', now())
      `)
      await tx.$executeRaw(Prisma.sql`
        UPDATE "FileUploadGrant" SET "status" = 'UPLOADED',
          "uploadedAt" = clock_timestamp() AT TIME ZONE 'UTC'
        WHERE "id" = ${jpeg.uploadGrantId}
      `)
    })
    expect((await generalPrisma.caseClinicalUploadEvidence.findUniqueOrThrow({
      where: { uploadGrantId: jpeg.uploadGrantId } })).codecBackend).toBeNull()
  })

  it('denies wrong MIME at the StoredFile trigger and then attaches correctly', async () => {
    const bytes = await picture().png().toBuffer()
    const created = await intent('png')
    objects.set(created.key, bytes)
    await completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId)
    await expect(generalPrisma.$executeRaw(Prisma.sql`
      INSERT INTO "StoredFile" (
        "id", "organizationId", "labId", "sourceUploadGrantId", "provider",
        "providerObjectKey", "providerAccess", "purpose", "detectedMimeType", "sizeBytes",
        "checksumAlgorithm", "checksumValue", "uploaderMemberIdSnapshot"
      ) VALUES (${randomUUID()}, 'imagev1-org', 'imagev1-lab', ${created.uploadGrantId},
        'OBJECT_STORAGE', ${created.key}, 'PRIVATE', 'CASE_CLINICAL_ASSET',
        'image/jpeg', ${BigInt(bytes.length)}, 'SHA-256', ${digest(bytes)}, 'imagev1-member')
    `)).rejects.toThrow()
    expect(await generalPrisma.storedFile.count({ where: { sourceUploadGrantId: created.uploadGrantId } })).toBe(0)
    await attach(created.uploadGrantId)
    expect((await generalPrisma.storedFile.findUniqueOrThrow({
      where: { sourceUploadGrantId: created.uploadGrantId } })).detectedMimeType).toBe('image/png')
  })

  it('rolls back evidence when the grant transition fails after insert', async () => {
    const created = await intent('png')
    objects.set(created.key, await picture().png().toBuffer())
    await generalPrisma.$executeRaw(Prisma.sql`
      CREATE FUNCTION public.case_image_v1_test_fail_transition() RETURNS trigger
      LANGUAGE plpgsql AS $body$ BEGIN
        IF NEW."status" = 'UPLOADED' THEN
          RAISE EXCEPTION 'synthetic transition failure' USING ERRCODE = '23514';
        END IF;
        RETURN NEW;
      END $body$
    `)
    try {
      await generalPrisma.$executeRaw(Prisma.sql`
        CREATE TRIGGER case_image_v1_test_fail_transition BEFORE UPDATE ON "FileUploadGrant"
        FOR EACH ROW EXECUTE FUNCTION public.case_image_v1_test_fail_transition()
      `)
      await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId))
        .rejects.toThrow()
      expect(await generalPrisma.caseClinicalUploadEvidence.count({
        where: { uploadGrantId: created.uploadGrantId } })).toBe(0)
      expect((await generalPrisma.fileUploadGrant.findUniqueOrThrow({
        where: { id: created.uploadGrantId } })).status).toBe('PENDING')
    } finally {
      await generalPrisma.$executeRaw(Prisma.sql`
        DROP TRIGGER IF EXISTS case_image_v1_test_fail_transition ON "FileUploadGrant"
      `)
      await generalPrisma.$executeRaw(Prisma.sql`
        DROP FUNCTION IF EXISTS public.case_image_v1_test_fail_transition()
      `)
    }
  }, 30000)
})
