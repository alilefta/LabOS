import { randomUUID, createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { Prisma } from '@/generated/prisma/client'

import * as turbo from '@julusian/jpeg-turbo'
import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'
const identityMock = vi.hoisted(() => vi.fn())
vi.mock('@/modules/labos-files/jpeg-s001/identity', async original => ({
  ...(await original<object>()), getS001CodecIdentity: identityMock,
}))

const root = 'postgresql://postgres@127.0.0.1:55492/postgres?schema=public'
if (process.env.DATABASE_URL !== root || process.env.DIRECT_URL !== root)
  throw new Error('R2-03 disposable target mismatch')

const tenant = { userId: 'r203-user', memberId: 'r203-member', memberRole: 'owner',
  staffId: null, organizationId: 'r203-org', labId: 'r203-lab',
  lab: { id: 'r203-lab', title: 'Synthetic Lab', slug: null } }
vi.mock('@/platform/organizations', async original => ({
  ...(await original<object>()), requireTenantContext: async () => tenant,
}))

import { generalPrisma } from '@/lib/prisma'
import { createCaseObjectStorageIntent, issueCaseObjectStorageWrite } from '@/modules/labos-files/case-object-storage-upload'
import { completeCaseObjectStorageUpload } from '@/modules/labos-files/case-object-storage-completion'
import type { ObjectStorage, ObjectCapability, StorageResult, ObjectInspection } from '@/modules/labos-files/object-storage/contract'

const caseId = '44444444-4444-4444-8444-444444444444'
const bytes = readFileSync('tests/unit/modules/labos-files/jpeg-s001/fixtures/baseline.jpg')
const objects = new Map<string, Uint8Array>()
const issued: string[] = []
const storage: ObjectStorage = {
  async issueCreateOnlyWrite({ key }): Promise<StorageResult<ObjectCapability>> {
    issued.push(key)
    return { ok: true, value: { url: 'opaque-synthetic-bearer',
      method: 'PUT', headers: { 'If-None-Match': '*' },
      expiresAt: new Date(Date.now() + 120_000) } }
  },
  async inspect(key): Promise<StorageResult<ObjectInspection>> {
    const value = objects.get(key)
    return { ok: true, value: value
      ? { presence: 'PRESENT', bytes: value.length } : { presence: 'ABSENT' } }
  },
  async retrieve({ key, maxBytes }) {
    const value = objects.get(key)
    if (!value) return { ok: false, error: { code: 'UNAVAILABLE' } }
    if (value.length > maxBytes) return { ok: false, error: { code: 'TOO_LARGE' } }
    return { ok: true, value }
  },
  async issuePrivateRead() { return { ok: false, error: { code: 'UNAVAILABLE' } } },
  async deleteExact() { return { ok: false, error: { code: 'UNAVAILABLE' } } },
  async classifyPresence() { return { ok: false, error: { code: 'UNAVAILABLE' } } },
}

beforeAll(async () => {
  identityMock.mockResolvedValue({ codec: turbo, runtimeSha256: S001_CODEC_MANIFEST.librarySha256 })
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "AuthUser" (id,name,email,"updatedAt")
    VALUES ('r203-user','Synthetic','r203@example.invalid',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO organization (id,name,slug,"createdAt")
    VALUES ('r203-org','Synthetic','r203-org',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Lab" (id,title,"organizationId","updatedAt")
    VALUES ('r203-lab','Synthetic','r203-org',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO member (id,"organizationId","userId",role,"createdAt")
    VALUES ('r203-member','r203-org','r203-user','owner',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Patient" (id,name,"labId","updatedAt")
    VALUES ('r203-patient','Synthetic','r203-lab',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Case" (id,"patientId","labId","caseNumber","status","updatedAt")
    VALUES ('44444444-4444-4444-8444-444444444444','r203-patient','r203-lab','44444444-4444-4444-8444-444444444444','DRAFT',now()) ON CONFLICT DO NOTHING`)
})
afterAll(async () => { await generalPrisma.$disconnect() })

async function intent() {
  return createCaseObjectStorageIntent({ caseId, filename: `synthetic-${randomUUID()}.jpg` }, storage)
}
async function row(id: string) {
  return generalPrisma.fileUploadGrant.findUniqueOrThrow({ where: { id },
    select: { status: true, provider: true, providerFileKey: true, providerFileUrl: true } })
}

async function fenceEpochMs(key: string): Promise<number> {
  const rows = await generalPrisma.$queryRaw<Array<{ epochMs: bigint }>>(Prisma.sql`
    SELECT floor(extract(epoch FROM "latestWriteCapabilityExpiresAt") * 1000)::bigint AS "epochMs"
    FROM "ObjectStorageKeyAllocation" WHERE "objectKey" = ${key}
  `)
  return Number(rows[0]!.epochMs)
}
describe('R2-03 disposable PostgreSQL composition', () => {
  it('atomically allocates key and commits capability fence before returning bearer', async () => {
    const created = await intent()
    const grant = await row(created.uploadGrantId)
    expect(grant).toMatchObject({ status: 'PENDING', provider: 'OBJECT_STORAGE', providerFileUrl: null })
    expect(grant.providerFileKey).toMatch(/^objects\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    const ledger = await generalPrisma.objectStorageKeyAllocation.findUniqueOrThrow({
      where: { objectKey: grant.providerFileKey! } })
    expect(ledger.sourceUploadGrantId).toBe(created.uploadGrantId)

    const fence = await generalPrisma.$queryRaw<Array<{ epochMs: bigint }>>(Prisma.sql`
      SELECT floor(extract(epoch FROM "latestWriteCapabilityExpiresAt") * 1000)::bigint AS "epochMs"
      FROM "ObjectStorageKeyAllocation" WHERE "objectKey" = ${grant.providerFileKey!}
    `)
    expect(Number(fence[0]!.epochMs)).toBeGreaterThanOrEqual(created.upload.expiresAt.getTime())
    expect(Number(fence[0]!.epochMs)).toBe(created.upload.expiresAt.getTime())
    expect(created.upload.headers).toEqual({ 'If-None-Match': '*' })
  })

  it('completes from exact provider bytes into S001 evidence and one UPLOADED transition', async () => {
    const created = await intent()
    const grant = await row(created.uploadGrantId)
    objects.set(grant.providerFileKey!, bytes)
    const beforeCompletion = Date.now()
    await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId))
      .resolves.toEqual({ uploadGrantId: created.uploadGrantId })
    const afterCompletion = Date.now()
    const evidenceClock = await generalPrisma.$queryRaw<Array<{ epochMs: bigint }>>(Prisma.sql`
      SELECT floor(extract(epoch FROM "validatedAt") * 1000)::bigint AS "epochMs"
      FROM "CaseClinicalUploadEvidence" WHERE "uploadGrantId" = ${created.uploadGrantId}
    `)
    expect(Number(evidenceClock[0]!.epochMs)).toBeGreaterThanOrEqual(beforeCompletion)
    expect(Number(evidenceClock[0]!.epochMs)).toBeLessThanOrEqual(afterCompletion)
    const evidence = await generalPrisma.caseClinicalUploadEvidence.findUniqueOrThrow({
      where: { uploadGrantId: created.uploadGrantId } })
    expect(evidence).toMatchObject({ provider: 'OBJECT_STORAGE',
      providerObjectKey: grant.providerFileKey, validatedSuffix: 'JPG',
      measuredSizeBytes: BigInt(bytes.length),
      contentSha256: createHash('sha256').update(bytes).digest('hex') })
    expect((await row(created.uploadGrantId)).status).toBe('UPLOADED')
    await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId))
      .rejects.toThrow()
    expect(await generalPrisma.caseClinicalUploadEvidence.count({
      where: { uploadGrantId: created.uploadGrantId } })).toBe(1)
    expect(await generalPrisma.storedFile.count({ where: { sourceUploadGrantId: created.uploadGrantId } })).toBe(0)
  }, 30000)

  it('denies wrong Case before provider access, oversized bytes and invalid JPEG', async () => {
    const created = await intent()
    const grant = await row(created.uploadGrantId)
    objects.set(grant.providerFileKey!, bytes)
    await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, 'other'))
      .rejects.toThrow()
    objects.set(grant.providerFileKey!, new Uint8Array(33_554_433))
    await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId))
      .rejects.toThrow()
    objects.set(grant.providerFileKey!, Buffer.from('invalid-jpeg'))
    await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId))
      .rejects.toThrow()
    expect((await row(created.uploadGrantId)).status).toBe('PENDING')
    expect(await generalPrisma.caseClinicalUploadEvidence.count({
      where: { uploadGrantId: created.uploadGrantId } })).toBe(0)
  }, 30000)

  it('never returns another write capability after grant leaves PENDING', async () => {
    const created = await intent()
    await generalPrisma.fileUploadGrant.update({ where: { id: created.uploadGrantId },
      data: { status: 'FAILED', failedAt: new Date() } })
    const count = issued.length
    await expect(issueCaseObjectStorageWrite(created.uploadGrantId, tenant, storage))
      .rejects.toThrow()
    expect(issued.length).toBe(count)
  })
})


describe('R2-03 disposable replay and mutable authority', () => {
  it('keeps the durable fence monotone across repeated PENDING issuance', async () => {
    const created = await intent()
    const grant = await row(created.uploadGrantId)
    const before = await fenceEpochMs(grant.providerFileKey!)
    const replay = await issueCaseObjectStorageWrite(created.uploadGrantId, tenant, storage)
    const after = await fenceEpochMs(grant.providerFileKey!)
    expect(after).toBeGreaterThanOrEqual(before)
    expect(after).toBeGreaterThanOrEqual(replay.expiresAt.getTime())
  })

  it('denies changed Member role and non-DRAFT Case before provider inspection', async () => {
    const created = await intent()
    const grant = await row(created.uploadGrantId)
    objects.set(grant.providerFileKey!, bytes)
    await generalPrisma.$executeRaw(Prisma.sql`UPDATE member SET role='unsupported' WHERE id='r203-member'`)
    try {
      await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId))
        .rejects.toThrow()
      expect((await row(created.uploadGrantId)).status).toBe('PENDING')
    } finally {
      await generalPrisma.$executeRaw(Prisma.sql`UPDATE member SET role='owner' WHERE id='r203-member'`)
    }
    await generalPrisma.$executeRaw(Prisma.sql`UPDATE "Case" SET status='PROCESSING'
      WHERE id='44444444-4444-4444-8444-444444444444'`)
    try {
      await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId))
        .rejects.toThrow()
      expect((await row(created.uploadGrantId)).status).toBe('PENDING')
    } finally {
      await generalPrisma.$executeRaw(Prisma.sql`UPDATE "Case" SET status='DRAFT'
        WHERE id='44444444-4444-4444-8444-444444444444'`)
    }
    expect(await generalPrisma.caseClinicalUploadEvidence.count({
      where: { uploadGrantId: created.uploadGrantId } })).toBe(0)
  })

  it('permits one completion winner and one immutable evidence row', async () => {
    const created = await intent()
    const grant = await row(created.uploadGrantId)
    objects.set(grant.providerFileKey!, bytes)
    const attempts = await Promise.allSettled([
      completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId),
      completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId),
    ])
    expect(attempts.filter(x => x.status === 'fulfilled')).toHaveLength(1)
    expect(attempts.filter(x => x.status === 'rejected')).toHaveLength(1)
    expect((await row(created.uploadGrantId)).status).toBe('UPLOADED')
    expect(await generalPrisma.caseClinicalUploadEvidence.count({
      where: { uploadGrantId: created.uploadGrantId } })).toBe(1)
  }, 30000)
})
