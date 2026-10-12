import { createHash, randomUUID } from 'node:crypto'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { Client } from 'pg'
import { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createCaseClinicalFirstAttachment } from '@/modules/labos-files/case-clinical-first-attachment'
import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'

const expected = 'postgresql://postgres@127.0.0.1:45671/attach_final?schema=public'
if (process.env.DATABASE_URL !== expected || process.env.DIRECT_URL !== expected) throw new Error('Disposable target mismatch')
const bytes = Buffer.from('run-owned synthetic JPEG evidence equality bytes')
const sha = (b: Buffer) => createHash('sha256').update(b).digest('hex')
const org = 'attach-org', lab = 'attach-lab', member = 'attach-member', caseId = 'attach-case'
const attach = (retrieve: (key: string) => Promise<Buffer> = async () => bytes, prisma = generalPrisma) =>
  createCaseClinicalFirstAttachment(prisma, retrieve)

beforeAll(async () => {
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "AuthUser" (id,name,email,"updatedAt") VALUES ('attach-user','Synthetic','attach@example.invalid',now())`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO organization (id,name,slug,"createdAt") VALUES (${org},'Synthetic',${org},now())`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Lab" (id,title,"organizationId","updatedAt") VALUES (${lab},'Synthetic',${org},now())`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO member (id,"organizationId","userId",role,"createdAt") VALUES (${member},${org},'attach-user','owner',now())`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Patient" (id,name,"labId","updatedAt") VALUES ('attach-patient','Synthetic',${lab},now())`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Case" (id,"patientId","labId","caseNumber","updatedAt") VALUES (${caseId},'attach-patient',${lab},'ATTACH-1',now())`)
})
afterAll(async () => { await generalPrisma.$disconnect() })

async function finalized(suffix: 'JPG' | 'JPEG' = 'JPG', ttlSeconds = 3600) {
  const id = randomUUID(), key = `synthetic-${id}`
  const createdAt = new Date(Date.now() - 60_000)
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000)
  await generalPrisma.fileUploadGrant.create({ data: {
    id, organizationId: org, labId: lab, createdByMemberId: member,
    boundaryId: 'N-FILE-110', purpose: 'case.asset.add.stage', targetType: 'case', targetId: caseId,
    provider: 'UPLOADTHING', providerFileKey: key, caseClinicalValidatedSuffix: suffix,
    correlationId: id, createdAt, expiresAt,
  } })
  await generalPrisma.$transaction(async tx => {
    await tx.caseClinicalUploadEvidence.create({ data: {
      uploadGrantId: id, organizationId: org, labId: lab, caseId,
      provider: 'UPLOADTHING', providerObjectKey: key,
      clinicalPurpose: 'CLINICAL_REFERENCE_PHOTOGRAPH', verifiedFormat: 'JPEG', validatedSuffix: suffix,
      measuredSizeBytes: BigInt(bytes.length), width: 16, height: 16, contentSha256: sha(bytes),
      validationProfile: S001_CODEC_MANIFEST.profile, validatorVersion: S001_CODEC_MANIFEST.validatorVersion,
      codecBackend: S001_CODEC_MANIFEST.backend, codecPackageVersion: S001_CODEC_MANIFEST.packageVersion,
      codecLibraryVersion: S001_CODEC_MANIFEST.libraryVersion, codecRuntimeSha256: S001_CODEC_MANIFEST.librarySha256,
      sourceComponents: 3, isProgressive: false, validatedAt: new Date(),
    } })
    await tx.fileUploadGrant.update({ where: { id }, data: { status: 'UPLOADED', uploadedAt: new Date() } })
  })
  return { id, key }
}
async function state(id: string) {
  const [grant, files, versions, assets, orphanAssets, evidence] = await Promise.all([
    generalPrisma.fileUploadGrant.findUnique({ where: { id }, select: { status: true, consumedAt: true } }),
    generalPrisma.storedFile.findMany({ where: { sourceUploadGrantId: id }, select: { id: true } }),
    generalPrisma.caseAssetFileVersion.count({ where: { storedFile: { sourceUploadGrantId: id } } }),
    generalPrisma.caseAssetFile.count({ where: { currentVersion: { storedFile: { sourceUploadGrantId: id } } } }),
    generalPrisma.caseAssetFile.count({ where: { dentalCaseId: caseId, currentVersionId: null } }),
    generalPrisma.caseClinicalUploadEvidence.findUniqueOrThrow({ where: { uploadGrantId: id } }),
  ])
  return { grant, files, versions, assets, orphanAssets, evidence }
}
function noNewState(value: Awaited<ReturnType<typeof state>>) {
  expect(value.grant?.status).toBe('UPLOADED')
  expect(value.grant?.consumedAt).toBeNull()
  expect(value.files).toHaveLength(0)
  expect(value.versions).toBe(0)
  expect(value.assets).toBe(0)
  expect(value.orphanAssets).toBe(0)
}

describe('disposable PostgreSQL first attachment', () => {
  it('JPG and JPEG each commit exact file, first version, pointer, and CONSUMED atomically', async () => {
    for (const suffix of ['JPG', 'JPEG'] as const) {
      const { id, key } = await finalized(suffix)
      const retrieve = vi.fn(async () => bytes)
      await expect(attach(retrieve)(id)).resolves.toBeUndefined()
      expect(retrieve).toHaveBeenCalledExactlyOnceWith(key)
      const s = await state(id)
      expect(s.grant?.status).toBe('CONSUMED')
      expect(s.grant?.consumedAt).toBeInstanceOf(Date)
      expect(s.files).toHaveLength(1)
      expect(s.versions).toBe(1)
      expect(s.assets).toBe(1)
      const file = await generalPrisma.storedFile.findUniqueOrThrow({ where: { sourceUploadGrantId: id } })
      expect(file).toMatchObject({ organizationId: org, labId: lab, provider: 'UPLOADTHING', providerObjectKey: key,
        providerAccess: 'PUBLIC_READ', purpose: 'CASE_CLINICAL_ASSET', detectedMimeType: 'image/jpeg',
        sizeBytes: BigInt(bytes.length), checksumAlgorithm: 'SHA-256', checksumValue: sha(bytes),
        uploaderMemberId: member, uploaderMemberIdSnapshot: member })
      const version = await generalPrisma.caseAssetFileVersion.findUniqueOrThrow({ where: { storedFileId: file.id }, include: { asset: true } })
      expect(version.versionNumber).toBe(1)
      expect(version.asset).toMatchObject({ dentalCaseId: caseId, labId: lab, assetFileType: 'IMAGE',
        storageMode: 'MANAGED_PUBLIC', clinicalPurpose: 'CLINICAL_REFERENCE_PHOTOGRAPH',
        documentUrl: null, fileExtension: null, currentVersionId: version.id })
      expect(s.evidence.contentSha256).toBe(sha(bytes))
      await expect(attach()(id)).rejects.toThrow('Case asset unavailable')
      expect((await state(id)).files).toHaveLength(1)
    }
  }, 30000)

  it('size and SHA mismatch leave finalized evidence unattached and retry refetches', async () => {
    const a = await finalized(), b = await finalized()
    const wrongSize = vi.fn(async () => Buffer.from('short'))
    await expect(attach(wrongSize)(a.id)).rejects.toThrow('Case asset unavailable')
    noNewState(await state(a.id))
    const changed = Buffer.from(bytes); changed[0] ^= 1
    await expect(attach(async () => changed)(b.id)).rejects.toThrow('Case asset unavailable')
    noNewState(await state(b.id))
    await expect(attach(wrongSize.mockImplementation(async () => bytes))(a.id)).resolves.toBeUndefined()
    expect(wrongSize).toHaveBeenCalledTimes(2)
  }, 30000)

  it('post-retrieval Case or creator authority changes reject with no attachment', async () => {
    const a = await finalized()
    await expect(attach(async () => {
      await generalPrisma.case.update({ where: { id: caseId }, data: { status: 'PROCESSING' } })
      return bytes
    })(a.id)).rejects.toThrow('Case asset unavailable')
    noNewState(await state(a.id))
    await generalPrisma.case.update({ where: { id: caseId }, data: { status: 'DRAFT' } })
    const b = await finalized()
    await expect(attach(async () => {
      await generalPrisma.member.update({ where: { id: member }, data: { role: 'unrecognized-role' } })
      return bytes
    })(b.id)).rejects.toThrow('Case asset unavailable')
    noNewState(await state(b.id))
    await generalPrisma.member.update({ where: { id: member }, data: { role: 'owner' } })
  }, 30000)

  it('expiry and preexisting inconsistent StoredFile fail before provider retrieval', async () => {
    const a = await finalized('JPG', 1)
    await new Promise(resolve => setTimeout(resolve, 1200))
    const retrieve = vi.fn(async () => bytes)
    await expect(attach(retrieve)(a.id)).rejects.toThrow('Case asset unavailable')
    expect(retrieve).not.toHaveBeenCalled()
    noNewState(await state(a.id))
    const b = await finalized()
    await generalPrisma.storedFile.create({ data: { organizationId: org, labId: lab,
      sourceUploadGrantId: b.id, provider: 'UPLOADTHING', providerObjectKey: b.key,
      providerAccess: 'PUBLIC_READ', purpose: 'CASE_CLINICAL_ASSET', detectedMimeType: 'image/jpeg',
      sizeBytes: BigInt(bytes.length), checksumAlgorithm: 'SHA-256', checksumValue: sha(bytes),
      uploaderMemberId: member, uploaderMemberIdSnapshot: member } })
    await expect(attach(retrieve)(b.id)).rejects.toThrow('Case asset unavailable')
    expect(retrieve).not.toHaveBeenCalled()
    expect((await state(b.id)).files).toHaveLength(1)
  }, 30000)

  it('write failure after file/asset/version/pointer rolls back all writes', async () => {
    for (const stage of ['file', 'asset', 'version', 'pointer', 'transition', 'after'] as const) {
      const { id } = await finalized()
      const wrapper = { $transaction: async (callback: (tx: Prisma.TransactionClient) => Promise<unknown>, options: { isolationLevel?: Prisma.TransactionIsolationLevel; maxWait?: number; timeout?: number }) =>
        generalPrisma.$transaction(async tx => {
          const intercept = new Proxy(tx, { get(target, key) {
            if (key === 'storedFile' && stage === 'file') return new Proxy(tx.storedFile, { get(obj, method) { return method === 'create' ? async () => { throw new Error('fault') } : Reflect.get(obj, method) } })
            if (key === 'caseAssetFile' && (stage === 'asset' || stage === 'pointer')) return new Proxy(tx.caseAssetFile, { get(obj, method) { return method === (stage === 'asset' ? 'create' : 'update') ? async () => { throw new Error('fault') } : Reflect.get(obj, method) } })
            if (key === 'caseAssetFileVersion' && stage === 'version') return new Proxy(tx.caseAssetFileVersion, { get(obj, method) { return method === 'create' ? async () => { throw new Error('fault') } : Reflect.get(obj, method) } })
            if (key === 'fileUploadGrant' && stage === 'transition') return new Proxy(tx.fileUploadGrant, { get(obj, method) { return method === 'updateMany' ? async () => ({ count: 0 }) : Reflect.get(obj, method) } })
            return Reflect.get(target, key)
          } })
          await callback(intercept as typeof tx)
          if (stage === 'after') throw new Error('post-write fault')
        }, options),
      } as unknown as typeof generalPrisma
      await expect(attach(async () => bytes, wrapper)(id)).rejects.toThrow('Case asset unavailable')
      noNewState(await state(id))
    }
  }, 60000)

  it('installed deferred managed-state trigger rejects a missing final pointer and rolls back the chain', async () => {
    const { id } = await finalized()
    let invocation = 0
    const wrapper = { $transaction: async (callback: (tx: Prisma.TransactionClient) => Promise<unknown>, options: { isolationLevel?: Prisma.TransactionIsolationLevel; maxWait?: number; timeout?: number }) =>
      generalPrisma.$transaction(async tx => {
        invocation++
        await callback(tx)
        if (invocation === 2) {
          const file = await tx.storedFile.findUniqueOrThrow({ where: { sourceUploadGrantId: id } })
          const version = await tx.caseAssetFileVersion.findUniqueOrThrow({ where: { storedFileId: file.id } })
          await tx.caseAssetFile.update({ where: { id: version.caseAssetFileId }, data: { currentVersionId: null } })
        }
      }, options),
    } as unknown as typeof generalPrisma
    await expect(attach(async () => bytes, wrapper)(id)).rejects.toThrow('Case asset unavailable')
    noNewState(await state(id))
  }, 30000)
  it('real concurrent same-grant transactions overlap; one commits and one rejects', async () => {
    const { id } = await finalized()
    const blocker = new Client({ connectionString: expected })
    await blocker.connect(); await blocker.query('BEGIN')
    await blocker.query('SELECT id FROM "FileUploadGrant" WHERE id=$1 FOR UPDATE', [id])
    try {
      const first = attach()(id), second = attach()(id)
      let waiters = 0
      for (let i = 0; i < 40; i++) {
        await new Promise(resolve => setTimeout(resolve, 50))
        const rows = await blocker.query<{ n: string }>(`SELECT count(*)::text AS n FROM pg_stat_activity WHERE datname=current_database() AND wait_event_type='Lock' AND pid<>pg_backend_pid()`)
        waiters = Number(rows.rows[0].n)
        if (waiters >= 2) break
      }
      expect(waiters).toBeGreaterThanOrEqual(2)
      await blocker.query('COMMIT')
      const settled = await Promise.allSettled([first, second])
      console.log('ATTACH_RACE', JSON.stringify({ overlappingLockWaiters: waiters, fulfilled: settled.filter(x => x.status === 'fulfilled').length, rejected: settled.filter(x => x.status === 'rejected').length }))
      expect(settled.filter(x => x.status === 'fulfilled')).toHaveLength(1)
      expect(settled.filter(x => x.status === 'rejected')).toHaveLength(1)
      const s = await state(id)
      expect(s.grant?.status).toBe('CONSUMED'); expect(s.files).toHaveLength(1); expect(s.versions).toBe(1); expect(s.assets).toBe(1)
    } finally { await blocker.query('ROLLBACK').catch(() => undefined); await blocker.end() }
  }, 60000)

  it('successful evidence remains immutable', async () => {
    const { id } = await finalized()
    await expect(attach()(id)).resolves.toBeUndefined()
    await expect(generalPrisma.caseClinicalUploadEvidence.update({ where: { uploadGrantId: id }, data: { width: 1 } })).rejects.toThrow()
    await expect(generalPrisma.caseClinicalUploadEvidence.delete({ where: { uploadGrantId: id } })).rejects.toThrow()
    expect((await state(id)).evidence.width).toBe(16)
  }, 30000)
})