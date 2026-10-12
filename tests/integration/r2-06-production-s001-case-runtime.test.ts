import { createHash, randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { config as loadEnvironment } from 'dotenv'
import { Prisma } from '@/generated/prisma/client'
import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'
import { getS001CodecIdentity } from '@/modules/labos-files/jpeg-s001/identity'
import { recordCaseFileAccessAudit } from '@/modules/labos-files/case-file-access-audit'
import { GET as openRoute } from '@/app/api/cases/[caseId]/assets/[assetId]/open/route'

loadEnvironment({ path: process.env.LABOS_R2_ENV_FILE ?? '.env.local', quiet: true })
const target = 'postgresql://postgres@r206-pg:5432/postgres?schema=public'
const enabled = process.env.LABOS_R2_CONFORMANCE_RUN === '1' &&
  process.env.LABOS_R2_NON_PRODUCTION === '1' &&
  process.platform === 'linux' && process.arch === 'x64' &&
  process.versions.node.startsWith('24.') && process.versions.napi === '10' &&
  process.env.DATABASE_URL === target && process.env.DIRECT_URL === target

const tenant = { userId: 'r206-user', memberId: 'r206-member', memberRole: 'owner',
  staffId: null, organizationId: 'r206-org', labId: 'r206-lab',
  lab: { id: 'r206-lab', title: 'Synthetic Lab', slug: null } }
vi.mock('@/platform/organizations/tenant-context', async original => ({
  ...(await original<object>()), requireTenantContext: async () => tenant,
}))
vi.mock('@/platform/organizations', async original => ({
  ...(await original<object>()), requireTenantContext: async () => tenant,
}))

import { generalPrisma } from '@/lib/prisma'
import { createConfiguredObjectStorage } from '@/modules/labos-files/object-storage/config'
import { createCaseObjectStorageIntent, issueCaseObjectStorageWrite } from '@/modules/labos-files/case-object-storage-upload'
import { completeCaseObjectStorageUpload } from '@/modules/labos-files/case-object-storage-completion'
import { createCaseClinicalFirstAttachment } from '@/modules/labos-files/case-clinical-first-attachment'
import { createCasePublicOpen } from '@/modules/labos-files/case-public-open'
import { normalizeAssetFile } from '@/lib/mappers/normalizers'

const caseId = '77777777-7777-4777-8777-777777777779'
const bytes = readFileSync('tests/unit/modules/labos-files/jpeg-s001/fixtures/baseline.jpg')
const sha = createHash('sha256').update(bytes).digest('hex')
const storage = enabled ? createConfiguredObjectStorage() : undefined

beforeAll(async () => {
  if (!enabled) return
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "AuthUser" (id,name,email,"updatedAt")
    VALUES ('r206-user','Synthetic','r206@example.invalid',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO organization (id,name,slug,"createdAt")
    VALUES ('r206-org','Synthetic','r206-org',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Lab" (id,title,"organizationId","updatedAt")
    VALUES ('r206-lab','Synthetic','r206-org',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO member (id,"organizationId","userId",role,"createdAt")
    VALUES ('r206-member','r206-org','r206-user','owner',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Patient" (id,name,"labId","updatedAt")
    VALUES ('r206-patient','Synthetic','r206-lab',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Case" (id,"patientId","labId","caseNumber","status","updatedAt")
    VALUES ('77777777-7777-4777-8777-777777777779','r206-patient','r206-lab',
      '77777777-7777-4777-8777-777777777779','DRAFT',now()) ON CONFLICT DO NOTHING`)
})
afterAll(async () => { await generalPrisma.$disconnect() })

describe.skipIf(!enabled)('R2-06 production S001 real-provider Case composition', () => {
  it('runs unmocked production S001 through the exact Case/R2 chain', async () => {
    if (!storage) throw new Error('R2-06 target unavailable')
    let key: string | undefined
    let latestExpiry = 0
    let signedReadUrl: string | undefined
    const traceLog = vi.spyOn(console, 'log').mockImplementation(() => {})
    const traceInfo = vi.spyOn(console, 'info').mockImplementation(() => {})
    const traceWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const traceError = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      const created = await createCaseObjectStorageIntent({
        caseId, filename: `synthetic-r206-${randomUUID()}.jpg`,
      }, storage)
      latestExpiry = created.upload.expiresAt.getTime()
      const grant = await generalPrisma.fileUploadGrant.findUniqueOrThrow({
        where: { id: created.uploadGrantId },
      })
      key = grant.providerFileKey!
      expect(key).toMatch(/^objects\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
      expect(grant.status).toBe('PENDING')
      expect(grant.provider).toBe('OBJECT_STORAGE')
      expect(grant.providerFileUrl).toBeNull()
      const reissued = await issueCaseObjectStorageWrite(created.uploadGrantId, tenant, storage)
      latestExpiry = Math.max(created.upload.expiresAt.getTime(), reissued.expiresAt.getTime())
      const fence = await generalPrisma.$queryRaw<Array<{ sourceUploadGrantId: string; epochMs: bigint }>>(Prisma.sql`
        SELECT "sourceUploadGrantId",
          floor(extract(epoch FROM "latestWriteCapabilityExpiresAt")*1000)::bigint AS "epochMs"
        FROM "ObjectStorageKeyAllocation" WHERE "objectKey"=${key}
      `)
      expect(fence).toHaveLength(1)
      expect(fence[0]!.sourceUploadGrantId).toBe(created.uploadGrantId)
      expect(Number(fence[0]!.epochMs)).toBeGreaterThanOrEqual(latestExpiry)
      expect(await storage.classifyPresence(key)).toEqual({ ok: true, value: 'ABSENT' })

      const put = (capability: typeof created.upload) => fetch(capability.url, {
        method: 'PUT', headers: capability.headers, body: bytes,
      })
      const firstPut = await put(created.upload)
      expect([200, 201]).toContain(firstPut.status)
      expect((await put(created.upload)).status).toBe(412)
      expect((await put(reissued)).status).toBe(412)

      expect(await storage.inspect(key)).toEqual({ ok: true,
        value: { presence: 'PRESENT', bytes: bytes.length } })
      const exact = await storage.retrieve({ key, maxBytes: bytes.length })
      expect(exact.ok).toBe(true)
      if (!exact.ok) throw new Error('Exact retrieval unavailable')
      expect(createHash('sha256').update(exact.value).digest('hex')).toBe(sha)
      await expect(completeCaseObjectStorageUpload(created.uploadGrantId, storage, undefined, caseId))
        .resolves.toEqual({ uploadGrantId: created.uploadGrantId })
      await expect(issueCaseObjectStorageWrite(created.uploadGrantId, tenant, storage)).rejects.toThrow()
      const evidence = await generalPrisma.caseClinicalUploadEvidence.findUniqueOrThrow({
        where: { uploadGrantId: created.uploadGrantId },
      })
      expect(evidence.provider).toBe('OBJECT_STORAGE')
      expect(evidence.providerObjectKey).toBe(key)
      expect(evidence.contentSha256).toBe(sha)
      expect(evidence.measuredSizeBytes).toBe(BigInt(bytes.length))
      expect(evidence.validationProfile).toBe(S001_CODEC_MANIFEST.profile)
      expect(evidence.validatorVersion).toBe(S001_CODEC_MANIFEST.validatorVersion)
      expect(evidence.codecBackend).toBe(S001_CODEC_MANIFEST.backend)
      expect(evidence.codecPackageVersion).toBe(S001_CODEC_MANIFEST.packageVersion)
      expect(evidence.codecLibraryVersion).toBe(S001_CODEC_MANIFEST.libraryVersion)
      expect(evidence.codecRuntimeSha256).toBe(S001_CODEC_MANIFEST.librarySha256)
      const identity = await getS001CodecIdentity()
      expect(identity.runtimeSha256).toBe(S001_CODEC_MANIFEST.librarySha256)
      process.stdout.write(JSON.stringify({ marker: 'R206_SAME_PROCESS_IDENTITY',
        processId: process.pid, platform: process.platform, arch: process.arch,
        node: process.version, napi: process.versions.napi,
        codecBackend: S001_CODEC_MANIFEST.backend, runtimeHashMatch: true }) + '\n')
      console.info('R206_PRODUCTION_IDENTITY', { platform: process.platform,
        arch: process.arch, node: process.version, napi: process.versions.napi,
        processId: process.pid, runtimeHashMatch: true })
      expect((await generalPrisma.fileUploadGrant.findUniqueOrThrow({
        where: { id: created.uploadGrantId },
      })).status).toBe('UPLOADED')

      const attach = createCaseClinicalFirstAttachment(generalPrisma,
        async () => { throw new Error('Legacy provider must not run') }, () => storage)
      await attach(created.uploadGrantId)
      const file = await generalPrisma.storedFile.findUniqueOrThrow({
        where: { sourceUploadGrantId: created.uploadGrantId },
      })
      expect(file.provider).toBe('OBJECT_STORAGE')
      expect(file.providerAccess).toBe('PRIVATE')
      expect(file.providerObjectKey).toBe(key)
      const asset = await generalPrisma.caseAssetFile.findFirstOrThrow({
        where: { currentVersion: { storedFileId: file.id } },
        include: { currentVersion: true },
      })
      expect(asset.storageMode).toBe('MANAGED_PRIVATE')
      expect(asset.currentVersion?.storedFileId).toBe(file.id)
      expect((await generalPrisma.fileUploadGrant.findUniqueOrThrow({
        where: { id: created.uploadGrantId },
      })).status).toBe('CONSUMED')
      const dto = normalizeAssetFile(asset as never)
      expect(dto.storageMode).toBe('MANAGED_PRIVATE')
      expect(JSON.stringify(dto)).not.toMatch(/https:|objects\/|provider|signature|url/i)

      const open = createCasePublicOpen({ objectStorage: () => storage })
      signedReadUrl = await open({ caseId, assetId: asset.id })
      const read = await fetch(signedReadUrl)
      expect(read.status).toBe(200)
      expect(Buffer.from(await read.arrayBuffer()).equals(bytes)).toBe(true)
      const denied = createCasePublicOpen({
        objectStorage: () => storage,
        authorize: async () => { throw new Error('Denied') },
      })
      await expect(denied({ caseId, assetId: asset.id })).rejects.toThrow()
      const foreign = createCasePublicOpen({
        objectStorage: () => storage,
        tenant: async () => ({ ...tenant, organizationId: 'foreign' }) as never,
      })
      await expect(foreign({ caseId, assetId: asset.id })).rejects.toThrow()
      const audit = await generalPrisma.caseFileAccessAudit.findFirstOrThrow({
        where: { caseAssetFileId: asset.id, issuanceOutcome: 'ISSUED' },
      })
      expect(audit.issuedAt).not.toBeNull()
      expect(audit.expiresAt).not.toBeNull()
      expect(audit.authorizationOutcome).toBe('ALLOWED')
      expect(audit.reason).toBe('AUTHORIZED')
      const auditSerialized = JSON.stringify(audit)
      expect(auditSerialized).not.toContain(key)
      expect(auditSerialized).not.toContain(signedReadUrl)
      expect(auditSerialized).not.toContain(created.upload.url)

      const absentId = '88888888-8888-4888-8888-888888888888'
      const routeRequest = (targetAssetId: string, targetCaseId = caseId) =>
        new Request(`https://lab.example/api/cases/${targetCaseId}/assets/${targetAssetId}/open`)
      const missingAsset = await openRoute(routeRequest(absentId), {
        params: Promise.resolve({ caseId, assetId: absentId }),
      })
      const foreignCase = await openRoute(routeRequest(asset.id, absentId), {
        params: Promise.resolve({ caseId: absentId, assetId: asset.id }),
      })
      expect(missingAsset.status).toBe(404)
      expect(foreignCase.status).toBe(404)
      expect(missingAsset.headers.get('location')).toBeNull()
      expect(foreignCase.headers.get('location')).toBeNull()
      expect(missingAsset.headers.get('cache-control')).toBe('private, no-store')
      expect(foreignCase.headers.get('cache-control')).toBe('private, no-store')
      expect(await missingAsset.text()).toBe('{"error":"Case asset unavailable"}')
      expect(await foreignCase.text()).toBe('{"error":"Case asset unavailable"}')
      await expect(recordCaseFileAccessAudit({ caseId: absentId,
        caseAssetFileId: asset.id, issuance: { outcome: 'NOT_ATTEMPTED' },
      })).rejects.toThrow()
      const deniedAudit = await generalPrisma.caseFileAccessAudit.findFirstOrThrow({
        where: { authorizationOutcome: 'DENIED', actorMemberId: tenant.memberId },
        orderBy: { createdAt: 'desc' },
      })
      expect(deniedAudit.issuanceOutcome).toBe('NOT_ATTEMPTED')
      expect(deniedAudit.caseId).toBeNull()
      expect(deniedAudit.caseAssetFileId).toBeNull()
      const captured = [...traceLog.mock.calls, ...traceInfo.mock.calls, ...traceWarn.mock.calls, ...traceError.mock.calls]
      const text = JSON.stringify(captured)
      expect(text).not.toContain(created.upload.url)
      expect(text).not.toContain(signedReadUrl)
      expect(text).not.toContain(key)
      expect(text).not.toMatch(/X-Amz-|Signature=|AccessKeyId|bucket|endpoint/i)
      const decisions = captured.flatMap(args => args).filter((value): value is {
        schemaVersion: number; payload: Record<string, unknown>
      } => !!value && typeof value === 'object' &&
        'schemaVersion' in value && 'payload' in value)
      expect(decisions.length).toBeGreaterThan(0)
      const allowed = new Set(['event','boundaryId','permission','sensitivity',
        'unknownRoleCount','targetType','correlationId','outcome','severity','reason','durationMs'])
      for (const decision of decisions)
        expect(Object.keys(decision.payload).every(field => allowed.has(field))).toBe(true)

    } finally {
      traceLog.mockRestore()
      traceInfo.mockRestore()
      traceWarn.mockRestore()
      traceError.mockRestore()
      const runGrants = await generalPrisma.fileUploadGrant.findMany({
        where: { targetId: caseId, provider: 'OBJECT_STORAGE' },
        select: { providerFileKey: true },
      })
      const runKeys = [...new Set(runGrants.map(grant => grant.providerFileKey).filter((value): value is string => !!value))]
      if (key && !runKeys.includes(key)) runKeys.push(key)
      for (const runKey of runKeys) {
        const fence = await generalPrisma.$queryRaw<Array<{ epochMs: bigint }>>(Prisma.sql`
          SELECT floor(extract(epoch FROM "latestWriteCapabilityExpiresAt")*1000)::bigint AS "epochMs"
          FROM "ObjectStorageKeyAllocation" WHERE "objectKey"=${runKey}
        `)
        if (fence.length !== 1 || fence[0]?.epochMs == null)
          throw new Error(`R2-06 missing durable write expiry fence: ${runKey}`)
        const expiry = Math.max(latestExpiry, Number(fence[0].epochMs))
        // Every attempted PUT is potentially successful until exact inspection resolves it.
        await new Promise(resolve => setTimeout(resolve,
          Math.max(0, expiry + 60_000 - Date.now())))
        if (signedReadUrl) {
          const expiredRead = await fetch(signedReadUrl)
          if (expiredRead.status === 200) throw new Error('Signed read did not expire')
        }
        const deleted = await storage.deleteExact(runKey)
        const absent = await storage.classifyPresence(runKey)
        if (!deleted.ok || !absent.ok || absent.value !== 'ABSENT')
          throw new Error(`R2-06 run-owned object cleanup unconfirmed: ${runKey}`)
      }
    }
  }, 700_000)
})
