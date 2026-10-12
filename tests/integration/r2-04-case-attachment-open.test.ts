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

const root = 'postgresql://postgres@127.0.0.1:55493/postgres?schema=public'
if (process.env.DATABASE_URL !== root || process.env.DIRECT_URL !== root)
  throw new Error('R2-03 disposable target mismatch')

const tenant = { userId: 'r204-user', memberId: 'r204-member', memberRole: 'owner',
  staffId: null, organizationId: 'r204-org', labId: 'r204-lab',
  lab: { id: 'r204-lab', title: 'Synthetic Lab', slug: null } }
vi.mock('@/platform/organizations/tenant-context', async original => ({
  ...(await original<object>()), requireTenantContext: async () => tenant,
}))
vi.mock('@/platform/organizations', async original => ({
  ...(await original<object>()), requireTenantContext: async () => tenant,
}))

import { generalPrisma } from '@/lib/prisma'
import { createCaseObjectStorageIntent, issueCaseObjectStorageWrite } from '@/modules/labos-files/case-object-storage-upload'
import { completeCaseObjectStorageUpload } from '@/modules/labos-files/case-object-storage-completion'
import { createCaseClinicalFirstAttachment } from '@/modules/labos-files/case-clinical-first-attachment'
import { createCasePublicOpen } from '@/modules/labos-files/case-public-open'
import { prismaCaseFileAccessAuditRepository } from '@/modules/labos-files/case-file-access-audit'
import type { ObjectStorage, ObjectCapability, StorageResult, ObjectInspection } from '@/modules/labos-files/object-storage/contract'

const caseId = '55555555-5555-4555-8555-555555555555'
const bytes = readFileSync('tests/unit/modules/labos-files/jpeg-s001/fixtures/baseline.jpg')
const objects = new Map<string, Uint8Array>()
const issued: string[] = []
let retrievals = 0
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
    retrievals++
    const value = objects.get(key)
    if (!value) return { ok: false, error: { code: 'UNAVAILABLE' } }
    if (value.length > maxBytes) return { ok: false, error: { code: 'TOO_LARGE' } }
    return { ok: true, value }
  },
  async issuePrivateRead({ key }) { return { ok: true, value: { url: 'https://private.example/signed', method: 'GET', headers: {}, expiresAt: new Date(Date.now() + 120_000) } } },
  async deleteExact() { return { ok: false, error: { code: 'UNAVAILABLE' } } },
  async classifyPresence() { return { ok: false, error: { code: 'UNAVAILABLE' } } },
}

beforeAll(async () => {
  identityMock.mockResolvedValue({ codec: turbo, runtimeSha256: S001_CODEC_MANIFEST.librarySha256 })
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "AuthUser" (id,name,email,"updatedAt")
    VALUES ('r204-user','Synthetic','r204@example.invalid',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO organization (id,name,slug,"createdAt")
    VALUES ('r204-org','Synthetic','r204-org',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Lab" (id,title,"organizationId","updatedAt")
    VALUES ('r204-lab','Synthetic','r204-org',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO member (id,"organizationId","userId",role,"createdAt")
    VALUES ('r204-member','r204-org','r204-user','owner',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Patient" (id,name,"labId","updatedAt")
    VALUES ('r204-patient','Synthetic','r204-lab',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Case" (id,"patientId","labId","caseNumber","status","updatedAt")
    VALUES ('55555555-5555-4555-8555-555555555555','r204-patient','r204-lab','55555555-5555-4555-8555-555555555555','DRAFT',now()) ON CONFLICT DO NOTHING`)
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

describe('R2-04 disposable private attachment and open', () => {
  async function uploaded() {
    const created = await intent()
    const grant = await row(created.uploadGrantId)
    objects.set(grant.providerFileKey!, bytes)
    await completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId)
    return { created, key: grant.providerFileKey! }
  }
  const attach = createCaseClinicalFirstAttachment(generalPrisma,
    async () => { throw new Error('legacy provider must not run') }, () => storage)

  it('uses a second bounded retrieval and commits exact PRIVATE asset chain with CONSUMED', async () => {
    const { created, key } = await uploaded()
    const before = retrievals
    await expect(attach(created.uploadGrantId)).resolves.toBeUndefined()
    expect(retrievals).toBe(before + 1)
    const grant = await row(created.uploadGrantId)
    expect(grant.status).toBe('CONSUMED')
    const file = await generalPrisma.storedFile.findUniqueOrThrow({
      where: { sourceUploadGrantId: created.uploadGrantId },
    })
    expect(file).toMatchObject({ provider: 'OBJECT_STORAGE', providerObjectKey: key,
      providerAccess: 'PRIVATE', purpose: 'CASE_CLINICAL_ASSET' })
    const asset = await generalPrisma.caseAssetFile.findFirstOrThrow({
      where: { currentVersion: { storedFileId: file.id } },
      include: { currentVersion: true },
    })
    expect(asset.storageMode).toBe('MANAGED_PRIVATE')
    expect(asset.currentVersion?.storedFileId).toBe(file.id)
    expect(asset.currentVersion?.versionNumber).toBe(1)
  }, 30000)

  it('denies second-retrieval SHA and length mismatch without a file or consumption', async () => {
    for (const changed of [Buffer.from('x'.repeat(bytes.length)), bytes.subarray(1)]) {
      const { created, key } = await uploaded()
      objects.set(key, changed)
      await expect(attach(created.uploadGrantId)).rejects.toThrow()
      expect((await row(created.uploadGrantId)).status).toBe('UPLOADED')
      expect(await generalPrisma.storedFile.count({ where: { sourceUploadGrantId: created.uploadGrantId } })).toBe(0)
      expect(await generalPrisma.caseAssetFileVersion.count({
        where: { storedFile: { sourceUploadGrantId: created.uploadGrantId } },
      })).toBe(0)
    }
  }, 30000)

  it('rolls back file, asset, version and pointer when conditional consume loses', async () => {
    const { created } = await uploaded()
    const rollbackPrisma = {
      $transaction: (callback: (tx: unknown) => Promise<unknown>, options: unknown) =>
        generalPrisma.$transaction(async tx => {
          const wrapped = new Proxy(tx, { get(target, property) {
            if (property === 'fileUploadGrant') return new Proxy(tx.fileUploadGrant, {
              get(delegate, method) {
                if (method === 'updateMany') return async () => ({ count: 0 })
                return Reflect.get(delegate, method)
              },
            })
            return Reflect.get(target, property)
          } })
          return callback(wrapped)
        }, options as never),
    }
    const losingAttach = createCaseClinicalFirstAttachment(
      rollbackPrisma as never, async () => { throw new Error('legacy provider must not run') },
      () => storage,
    )
    await expect(losingAttach(created.uploadGrantId)).rejects.toThrow()
    expect((await row(created.uploadGrantId)).status).toBe('UPLOADED')
    expect(await generalPrisma.storedFile.count({ where: { sourceUploadGrantId: created.uploadGrantId } })).toBe(0)
    expect(await generalPrisma.caseAssetFileVersion.count({
      where: { storedFile: { sourceUploadGrantId: created.uploadGrantId } },
    })).toBe(0)
  }, 30000)

  it('permits one concurrent attachment winner and rolls back the loser', async () => {
    const { created } = await uploaded()
    const attempts = await Promise.allSettled([attach(created.uploadGrantId), attach(created.uploadGrantId)])
    expect(attempts.filter(x => x.status === 'fulfilled')).toHaveLength(1)
    expect(attempts.filter(x => x.status === 'rejected')).toHaveLength(1)
    expect((await row(created.uploadGrantId)).status).toBe('CONSUMED')
    expect(await generalPrisma.storedFile.count({ where: { sourceUploadGrantId: created.uploadGrantId } })).toBe(1)
  }, 30000)

  it('opens only the current consumed private asset and persists no bearer URL', async () => {
    const { created } = await uploaded()
    await attach(created.uploadGrantId)
    const asset = await generalPrisma.caseAssetFile.findFirstOrThrow({
      where: { currentVersion: { storedFile: { sourceUploadGrantId: created.uploadGrantId } } },
    })
    const open = createCasePublicOpen({ objectStorage: () => storage })
    await expect(open({ caseId, assetId: asset.id })).resolves.toBe('https://private.example/signed')
    expect(await generalPrisma.caseFileAccessAudit.count({
      where: { caseAssetFileId: asset.id, issuanceOutcome: 'ISSUED' },
    })).toBe(1)
    const file = await generalPrisma.storedFile.findUniqueOrThrow({
      where: { sourceUploadGrantId: created.uploadGrantId },
    })
    expect(JSON.stringify(file)).not.toContain('https://private.example/signed')
    await expect(open({ caseId, assetId: randomUUID() })).rejects.toThrow()
  }, 30000)

  it('stores audited issuance instants without session-timezone shift or bearer material', async () => {
    const { created } = await uploaded()
    await attach(created.uploadGrantId)
    const asset = await generalPrisma.caseAssetFile.findFirstOrThrow({
      where: { currentVersion: { storedFile: { sourceUploadGrantId: created.uploadGrantId } } },
    })
    const issuedAt = new Date()
    const expiresAt = new Date(issuedAt.getTime() + 120_000)
    const correlationId = randomUUID()
    await prismaCaseFileAccessAuditRepository.append({
      organizationId: tenant.organizationId, labId: tenant.labId,
      actorMemberId: tenant.memberId, caseId, caseAssetFileId: asset.id,
      authorizationOutcome: 'ALLOWED', issuanceOutcome: 'ISSUED',
      reason: 'AUTHORIZED', correlationId, issuedAt, expiresAt,
    })
    const clock = await generalPrisma.$queryRaw<Array<{ issuedMs: bigint; expiresMs: bigint }>>(Prisma.sql`
      SELECT floor(extract(epoch FROM "issuedAt") * 1000)::bigint AS "issuedMs",
        floor(extract(epoch FROM "expiresAt") * 1000)::bigint AS "expiresMs"
      FROM "CaseFileAccessAudit" WHERE "correlationId" = ${correlationId}
    `)
    expect(Number(clock[0]!.issuedMs)).toBe(issuedAt.getTime())
    expect(Number(clock[0]!.expiresMs)).toBe(expiresAt.getTime())
  }, 30000)
})
