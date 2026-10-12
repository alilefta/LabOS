import { createHash, randomUUID } from 'node:crypto'
import { execFile } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { config as loadEnvironment } from 'dotenv'
import { Prisma } from '@/generated/prisma/client'
import * as turbo from '@julusian/jpeg-turbo'
import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'

loadEnvironment({ path: '.env.local', quiet: true })
const target = 'postgresql://postgres@127.0.0.1:55494/postgres?schema=public'
const enabled = process.env.LABOS_R2_CONFORMANCE_RUN === '1' &&
  process.env.LABOS_R2_NON_PRODUCTION === '1' &&
  process.env.LABOS_R2_CORS_ORIGIN === 'http://localhost:3000' &&
  process.env.DATABASE_URL === target && process.env.DIRECT_URL === target

const identityMock = vi.hoisted(() => vi.fn())
vi.mock('@/modules/labos-files/jpeg-s001/identity', async original => ({
  ...(await original<object>()), getS001CodecIdentity: identityMock,
}))
const tenant = { userId: 'r205-user', memberId: 'r205-member', memberRole: 'owner',
  staffId: null, organizationId: 'r205-org', labId: 'r205-lab',
  lab: { id: 'r205-lab', title: 'Synthetic Lab', slug: null } }
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

const caseId = '66666666-6666-4666-8666-666666666666'
const bytes = readFileSync('tests/unit/modules/labos-files/jpeg-s001/fixtures/baseline.jpg')
const sha = createHash('sha256').update(bytes).digest('hex')
const storage = enabled ? createConfiguredObjectStorage() : undefined

beforeAll(async () => {
  if (!enabled) return
  identityMock.mockResolvedValue({ codec: turbo, runtimeSha256: S001_CODEC_MANIFEST.librarySha256 })
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "AuthUser" (id,name,email,"updatedAt")
    VALUES ('r205-user','Synthetic','r205@example.invalid',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO organization (id,name,slug,"createdAt")
    VALUES ('r205-org','Synthetic','r205-org',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Lab" (id,title,"organizationId","updatedAt")
    VALUES ('r205-lab','Synthetic','r205-org',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO member (id,"organizationId","userId",role,"createdAt")
    VALUES ('r205-member','r205-org','r205-user','owner',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Patient" (id,name,"labId","updatedAt")
    VALUES ('r205-patient','Synthetic','r205-lab',now()) ON CONFLICT DO NOTHING`)
  await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Case" (id,"patientId","labId","caseNumber","status","updatedAt")
    VALUES ('66666666-6666-4666-8666-666666666666','r205-patient','r205-lab',
      '66666666-6666-4666-8666-666666666666','DRAFT',now()) ON CONFLICT DO NOTHING`)
})
afterAll(async () => { await generalPrisma.$disconnect() })

type BrowserReport = { origin: string; statuses: number[]; failed: boolean }

describe.skipIf(!enabled)('R2-05 real provider Case composition with synthetic bytes', () => {
  it('runs intent, browser conditional PUT, completion, attachment and private open', async () => {
    if (!storage) throw new Error('R2-05 target unavailable')
    let key: string | undefined
    let latestExpiry = 0
    let signedReadUrl: string | undefined
    let server: ReturnType<typeof createServer> | undefined
    let pageServed = false
    let browserProfile: string | undefined
    try {
      const created = await createCaseObjectStorageIntent({
        caseId, filename: `synthetic-r205-${randomUUID()}.jpg`,
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

      const first = JSON.stringify({ url: created.upload.url, headers: created.upload.headers })
      const second = JSON.stringify({ url: reissued.url, headers: reissued.headers })
      let resolveReport!: (value: BrowserReport) => void
      const report = new Promise<BrowserReport>(resolve => { resolveReport = resolve })
      server = createServer(async (request, response) => {
        response.setHeader('Cache-Control', 'private, no-store')
        response.setHeader('Referrer-Policy', 'no-referrer')
        if (request.url === '/' && request.method === 'GET') {
          pageServed = true
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(`<!doctype html><html><body><main id="result">running</main><script>
const first=${first};const second=${second};const bytes=${JSON.stringify([...bytes])};
(async()=>{let statuses=[],failed=false;
try{const put=(cap,payload)=>fetch(cap.url,{method:'PUT',mode:'cors',headers:cap.headers,body:new Uint8Array(payload)});
statuses.push((await put(first,bytes)).status);
statuses.push((await put(first,bytes)).status);
statuses.push((await put(second,bytes)).status);}
catch{failed=true}
document.getElementById('result').textContent='origin='+location.origin+' statuses='+statuses.join(',')+' failed='+failed;
try{await fetch('/result',{method:'POST',headers:{'Content-Type':'application/json'},
body:JSON.stringify({origin:location.origin,statuses,failed})})}catch{}
})();
</script></body></html>`)
          return
        }
        if (request.url === '/result' && request.method === 'POST') {
          let body = ''
          for await (const chunk of request) {
            body += chunk.toString()
            if (body.length > 1024) { response.writeHead(413).end(); return }
          }
          try {
            const parsed = JSON.parse(body) as BrowserReport
            if (typeof parsed.origin === 'string' && Array.isArray(parsed.statuses) &&
              typeof parsed.failed === 'boolean') resolveReport(parsed)
          } catch {}
          response.writeHead(204).end()
          return
        }
        response.writeHead(404).end()
      })
      await new Promise<void>((resolve, reject) => {
        server!.once('error', reject)
        server!.listen(3000, '::1', resolve)
      })
      browserProfile = mkdtempSync(join(tmpdir(), 'labos-r205-edge-'))
      execFile('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
        ['--headless=new', '--disable-gpu', '--no-first-run',
          '--virtual-time-budget=20000', '--user-data-dir=' + browserProfile,
          '--dump-dom', 'http://localhost:3000'],
        { windowsHide: true, maxBuffer: 1024 * 1024 }, () => {})
      console.log('R205_BROWSER_LAUNCHED origin=http://localhost:3000')
      const timer = setTimeout(() => resolveReport({ origin: '', statuses: [], failed: true }), 70_000)
      const browser = await report
      clearTimeout(timer)
      expect(browser.origin).toBe('http://localhost:3000')
      expect(browser.failed).toBe(false)
      expect([200, 201]).toContain(browser.statuses[0])
      expect(browser.statuses.slice(1)).toEqual([412, 412])

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
    } finally {
      server?.closeAllConnections()
      server?.close()
      if (browserProfile?.startsWith(join(tmpdir(), 'labos-r205-edge-')))
        try { rmSync(browserProfile, { recursive: true, force: true }) } catch {}
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
          throw new Error(`R2-05 missing durable write expiry fence: ${runKey}`)
        const expiry = Math.max(latestExpiry, Number(fence[0].epochMs))
        // A browser PUT may have succeeded even if its report was lost.
        await new Promise(resolve => setTimeout(resolve,
          Math.max(0, expiry + 60_000 - Date.now())))
        if (signedReadUrl) {
          const expiredRead = await fetch(signedReadUrl)
          if (expiredRead.status === 200) throw new Error('Signed read did not expire')
        }
        const deleted = await storage.deleteExact(runKey)
        const absent = await storage.classifyPresence(runKey)
        if (!deleted.ok || !absent.ok || absent.value !== 'ABSENT')
          throw new Error(`R2-05 run-owned object cleanup unconfirmed: ${runKey}`)
      }
    }
  }, 700_000)
})
