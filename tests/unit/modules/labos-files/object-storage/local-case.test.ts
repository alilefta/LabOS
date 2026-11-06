import { createHash } from 'node:crypto'
import { unlink } from 'node:fs/promises'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

const key = 'objects/aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
const id = createHash('sha256').update(key).digest('hex')
const path = join(process.cwd(), '.tmp', 'labos-local-case-objects', id)
let local: typeof import('@/modules/labos-files/object-storage/local-case')

beforeAll(async () => {
	vi.stubEnv('NODE_ENV', 'development')
	vi.stubEnv('LABOS_CASE_IMAGE_LOCAL_ENABLED', '1')
	vi.stubEnv('LABOS_LOCAL_OBJECT_SECRET', 'disposable-local-object-secret-20261028-abcdefgh')
	vi.stubEnv('LABOS_LOCAL_OBJECT_ORIGIN', 'http://127.0.0.1:3000')
	vi.resetModules()
	local = await import('@/modules/labos-files/object-storage/local-case')
})
afterAll(async () => { await unlink(path).catch(() => {}); vi.unstubAllEnvs() })

describe('local Case object-storage adapter', () => {
	it('accepts only one original write and serves a short-lived private image capability', async () => {
		const storage = local.createLocalCaseObjectStorage()
		const issued = await storage.issueCreateOnlyWrite({ key, lifetimeSeconds: 120 })
		if (!issued.ok) throw new Error('write capability unavailable')
		expect(issued.value.url).not.toContain(key)
		const id = new URL(issued.value.url).pathname.split('/').pop()!
		const body = Buffer.from([1, 2, 3, 4])
		const request = () => new Request(issued.value.url, { method: 'PUT',
			headers: { ...issued.value.headers, 'Content-Length': String(body.length) }, body })
		expect((await local.serveLocalCaseObject(request(), id)).status).toBe(201)
		expect((await local.serveLocalCaseObject(request(), id)).status).toBe(412)
		const retrieved = await storage.retrieve({ key, maxBytes: 4 })
		expect(retrieved.ok && Buffer.from(retrieved.value).equals(body)).toBe(true)
		const read = await storage.issuePrivateRead({ key, lifetimeSeconds: 120, mimeType: 'image/png' })
		if (!read.ok) throw new Error('read capability unavailable')
		const readUrl = new URL(read.value.url)
		const response = await local.serveLocalCaseObject(new Request(readUrl.origin + readUrl.pathname,
			{ headers: { Cookie: `labos_local_read_${id}=${readUrl.hash.slice(1)}` } }), id)
		expect(response.status).toBe(200)
		expect(response.headers.get('content-type')).toBe('image/png')
		expect(response.headers.get('x-content-type-options')).toBe('nosniff')
		expect(response.headers.get('set-cookie')).toContain('Max-Age=0')
		expect(Buffer.from(await response.arrayBuffer()).equals(body)).toBe(true)
	})

	it('denies tampering, oversized body, and missing write precondition', async () => {
		const storage = local.createLocalCaseObjectStorage()
		const issued = await storage.issueCreateOnlyWrite({ key, lifetimeSeconds: 120 })
		if (!issued.ok) throw new Error('write capability unavailable')
		const id = new URL(issued.value.url).pathname.split('/').pop()!
		const request = (headers: Record<string, string>) => new Request(issued.value.url,
			{ method: 'PUT', headers, body: Buffer.from([5]) })
		expect((await local.serveLocalCaseObject(request({ 'Content-Length': '1' }), id)).status).toBe(404)
		expect((await local.serveLocalCaseObject(request({ ...issued.value.headers, 'Content-Length': '33554433' }), id)).status).toBe(413)
		expect((await local.serveLocalCaseObject(request({ ...issued.value.headers, 'Content-Length': '1' }), `${id}x`)).status).toBe(404)
		expect((await local.serveLocalCaseObject(new Request(issued.value.url, { method: 'PUT',
			headers: { ...issued.value.headers, 'Content-Length': '1', Host: 'attacker.example' },
			body: Buffer.from([5]) }), id)).status).toBe(404)
	})

	it('rejects expired and cancelled writes without creating an object', async () => {
		const anotherKey = 'objects/bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb'
		const storage = local.createLocalCaseObjectStorage()
		const issued = await storage.issueCreateOnlyWrite({ key: anotherKey, lifetimeSeconds: 1 })
		if (!issued.ok) throw new Error('write capability unavailable')
		const id = new URL(issued.value.url).pathname.split('/').pop()!
		const controller = new AbortController()
		controller.abort()
		const cancelled = new Request(issued.value.url, { method: 'PUT',
			headers: { ...issued.value.headers, 'Content-Length': '1' },
			body: Buffer.from([1]), signal: controller.signal })
		expect((await local.serveLocalCaseObject(cancelled, id)).status).toBe(400)
		await new Promise(resolve => setTimeout(resolve, 1050))
		const expired = new Request(issued.value.url, { method: 'PUT',
			headers: { ...issued.value.headers, 'Content-Length': '1' }, body: Buffer.from([1]) })
		expect((await local.serveLocalCaseObject(expired, id)).status).toBe(404)
		expect(await storage.inspect(anotherKey)).toEqual({ ok: true, value: { presence: 'ABSENT' } })
	})
})
