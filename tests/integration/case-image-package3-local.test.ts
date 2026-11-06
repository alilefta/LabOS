import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import sharp from 'sharp'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { Prisma } from '@/generated/prisma/client'
import * as turbo from '@julusian/jpeg-turbo'
import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'

const identityMock = vi.hoisted(() => vi.fn())
vi.mock('@/modules/labos-files/jpeg-s001/identity', async original => ({
	...(await original<object>()), getS001CodecIdentity: identityMock,
}))

vi.hoisted(() => {
	vi.stubEnv('NODE_ENV', 'development')
	process.env.LABOS_CASE_IMAGE_LOCAL_ENABLED = '1'
	process.env.LABOS_LOCAL_OBJECT_SECRET = 'disposable-route-secret-20261028-abcdefgh'
	process.env.LABOS_LOCAL_OBJECT_ORIGIN = 'http://127.0.0.1:3000'
	process.env.AXIOM_TOKEN = ''
	process.env.AXIOM_DATASET = ''
	process.env.AXIOM_EDGE = ''
})

const url = process.env.P3_DISPOSABLE_DATABASE_URL ?? 'postgresql://postgres@127.0.0.1:55493/postgres?schema=public'
const database = new URL(url)
if (process.env.DATABASE_URL !== url || process.env.DIRECT_URL !== url ||
	database.hostname !== '127.0.0.1' || database.port !== '55493' ||
	database.username !== 'postgres' || database.pathname !== '/postgres' ||
	database.search !== '?schema=public') throw new Error('Package 3 disposable target mismatch')

const tenant = { userId: 'p3-user', memberId: 'p3-member', memberRole: 'owner', staffId: null,
	organizationId: 'p3-org', labId: 'p3-lab', lab: { id: 'p3-lab', title: 'Synthetic', slug: null } }
let activeTenant = tenant
vi.mock('@/platform/organizations', async original => ({
	...(await original<object>()), requireTenantContext: async () => activeTenant,
}))
vi.mock('@/platform/organizations/tenant-context', async original => ({
	...(await original<object>()), requireTenantContext: async () => activeTenant,
}))

import { generalPrisma } from '@/lib/prisma'
import { POST as intent } from '@/app/api/cases/[caseId]/clinical-upload/intent/route'
import { POST as complete } from '@/app/api/cases/[caseId]/clinical-upload/complete/route'
import { POST as attach } from '@/app/api/cases/[caseId]/clinical-upload/attach/route'
import { GET as open } from '@/app/api/cases/[caseId]/assets/[assetId]/open/route'
import { PUT as putObject, GET as getObject } from '@/app/api/local-case-objects/[id]/route'

const caseId = '66666666-6666-4666-8666-666666666666'
const ctx = { params: Promise.resolve({ caseId }) }
const endpoint = `http://127.0.0.1:3000/api/cases/${caseId}/clinical-upload`
const jpeg = readFileSync('tests/unit/modules/labos-files/jpeg-s001/fixtures/baseline.jpg')
const picture = () => sharp({ create: { width: 4, height: 3, channels: 4,
	background: { r: 12, g: 34, b: 56, alpha: 0.5 } } })
const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')

async function post(handler: typeof intent | typeof complete | typeof attach, path: string, body: object) {
	return handler(new Request(`${endpoint}/${path}`, { method: 'POST',
		headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }), ctx)
}

async function start(filename: string) {
	const response = await post(intent, 'intent', { filename })
	expect(response.status).toBe(201)
	return response.json() as Promise<{ uploadGrantId: string; upload: { url: string; headers: Record<string,string>; expiresAt: string } }>
}

async function upload(grant: Awaited<ReturnType<typeof start>>, bytes: Buffer) {
	const id = new URL(grant.upload.url).pathname.split('/').pop()!
	const response = await putObject(new Request(grant.upload.url, { method: 'PUT',
		headers: { ...grant.upload.headers, 'Content-Length': String(bytes.length) },
		body: Uint8Array.from(bytes).buffer as ArrayBuffer }),
		{ params: Promise.resolve({ id }) })
	expect(response.status).toBe(201)
}

beforeAll(async () => {
	identityMock.mockResolvedValue({ codec: turbo, runtimeSha256: S001_CODEC_MANIFEST.librarySha256 })
	await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "AuthUser" (id,name,email,"updatedAt")
		VALUES ('p3-user','Synthetic','p3@example.invalid',now()) ON CONFLICT DO NOTHING`)
	await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO organization (id,name,slug,"createdAt")
		VALUES ('p3-org','Synthetic','p3-org',now()) ON CONFLICT DO NOTHING`)
	await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Lab" (id,title,"organizationId","updatedAt")
		VALUES ('p3-lab','Synthetic','p3-org',now()) ON CONFLICT DO NOTHING`)
	await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO member (id,"organizationId","userId",role,"createdAt")
		VALUES ('p3-member','p3-org','p3-user','owner',now()) ON CONFLICT DO NOTHING`)
	await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Patient" (id,name,"labId","updatedAt")
		VALUES ('p3-patient','Synthetic','p3-lab',now()) ON CONFLICT DO NOTHING`)
	await generalPrisma.$executeRaw(Prisma.sql`INSERT INTO "Case" (id,"patientId","labId","caseNumber","status","updatedAt")
		VALUES (${caseId},'p3-patient','p3-lab',${caseId},'DRAFT',now()) ON CONFLICT DO NOTHING`)
})
afterAll(async () => { await generalPrisma.$disconnect() })

describe('Package 3 local Case routes and private object adapter', () => {
	it('rejects nonconfigured Host before completion or attachment work', async () => {
		const body = JSON.stringify({ uploadGrantId: '11111111-1111-4111-8111-111111111111' })
		const request = (operation: string) => new Request(`${endpoint}/${operation}`, {
			method: 'POST', headers: { 'Content-Type': 'application/json', Host: 'attacker.example' }, body,
		})
		expect((await complete(request('complete'), ctx)).status).toBe(404)
		expect((await attach(request('attach'), ctx)).status).toBe(404)
	})

	it.each([
		['photo.jpg', async () => jpeg, 'image/jpeg'],
		['photo.png', () => picture().png().toBuffer(), 'image/png'],
		['lossy.webp', () => picture().webp().toBuffer(), 'image/webp'],
		['lossless.webp', () => picture().webp({ lossless: true }).toBuffer(), 'image/webp'],
	])('uploads, attaches and opens %s with exact original bytes', async (filename, produce, mime) => {
		const bytes = await produce()
		const grant = await start(filename)
		await upload(grant, bytes)
		expect((await post(complete, 'complete', { uploadGrantId: grant.uploadGrantId })).status).toBe(200)
		expect((await post(attach, 'attach', { uploadGrantId: grant.uploadGrantId })).status).toBe(200)
		const evidence = await generalPrisma.caseClinicalUploadEvidence.findUniqueOrThrow({ where: { uploadGrantId: grant.uploadGrantId } })
		expect(evidence.contentSha256).toBe(sha(bytes))
		const stored = await generalPrisma.storedFile.findUniqueOrThrow({ where: { sourceUploadGrantId: grant.uploadGrantId } })
		expect(stored.detectedMimeType).toBe(mime)
		const asset = await generalPrisma.caseAssetFile.findFirstOrThrow({ where: { currentVersion: { storedFileId: stored.id } } })
		const opened = await open(new Request(`http://127.0.0.1:3000/api/cases/${caseId}/assets/${asset.id}/open`),
			{ params: Promise.resolve({ caseId, assetId: asset.id }) })
		expect(opened.status).toBe(302)
		const location = opened.headers.get('location')!
		expect(location).not.toContain(stored.providerObjectKey)
		const id = new URL(location).pathname.split('/').pop()!
		const cookie = opened.headers.get('set-cookie')?.split(';')[0]
		expect(cookie).toContain(`labos_local_read_${id}=`)
		const viewed = await getObject(new Request(location, { headers: { Cookie: cookie! } }),
			{ params: Promise.resolve({ id }) })
		expect(viewed.status).toBe(200)
		expect(viewed.headers.get('content-type')).toBe(mime)
		expect(sha(Buffer.from(await viewed.arrayBuffer()))).toBe(sha(bytes))
		activeTenant = { ...tenant, organizationId: 'other-org' }
		try {
			const denied = await open(new Request(`http://127.0.0.1:3000/api/cases/${caseId}/assets/${asset.id}/open`),
				{ params: Promise.resolve({ caseId, assetId: asset.id }) })
			expect(denied.status).toBe(404)
		} finally { activeTenant = tenant }
	}, 30000)

	it('rejects mismatched content without evidence or attachment', async () => {
		const grant = await start('wrong.png')
		await upload(grant, await picture().webp().toBuffer())
		expect((await post(complete, 'complete', { uploadGrantId: grant.uploadGrantId })).status).toBe(404)
		expect(await generalPrisma.caseClinicalUploadEvidence.count({ where: { uploadGrantId: grant.uploadGrantId } })).toBe(0)
		expect(await generalPrisma.storedFile.count({ where: { sourceUploadGrantId: grant.uploadGrantId } })).toBe(0)
	})

	it('denies foreign tenant completion and private open', async () => {
		const grant = await start('foreign.png')
		await upload(grant, await picture().png().toBuffer())
		activeTenant = { ...tenant, organizationId: 'other-org' }
		try { expect((await post(complete, 'complete', { uploadGrantId: grant.uploadGrantId })).status).toBe(404) }
		finally { activeTenant = tenant }
	})

	it('denies foreign tenant and wrong Case attachment and prevents a duplicate', async () => {
		const grant = await start('ownership.png')
		await upload(grant, await picture().png().toBuffer())
		expect((await post(complete, 'complete', { uploadGrantId: grant.uploadGrantId })).status).toBe(200)
		activeTenant = { ...tenant, organizationId: 'other-org' }
		try { expect((await post(attach, 'attach', { uploadGrantId: grant.uploadGrantId })).status).toBe(404) }
		finally { activeTenant = tenant }
		const wrong = await attach(new Request(`${endpoint}/attach`, { method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ uploadGrantId: grant.uploadGrantId }) }),
			{ params: Promise.resolve({ caseId: '77777777-7777-4777-8777-777777777777' }) })
		expect(wrong.status).toBe(404)
		const outcomes = await Promise.all([
			post(attach, 'attach', { uploadGrantId: grant.uploadGrantId }),
			post(attach, 'attach', { uploadGrantId: grant.uploadGrantId }),
		])
		expect(outcomes.map(x => x.status).sort()).toEqual([200, 404])
		expect(await generalPrisma.storedFile.count({ where: { sourceUploadGrantId: grant.uploadGrantId } })).toBe(1)
	}, 30000)
})
