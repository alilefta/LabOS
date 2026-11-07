import 'server-only'

import { createHash, createHmac, timingSafeEqual } from 'node:crypto'
import { mkdir, open, readFile, stat, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import type { ObjectCapability, ObjectStorage, StorageResult } from './contract'
import { CASE_OBJECT_STORAGE_UPLOAD_ACTIVE, isConfiguredCaseLocalOrigin } from '../case-object-storage-activation'

const MAX_BYTES = 33_554_432
const keyPattern = /^objects\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
const idPattern = /^[0-9a-f]{64}$/
const mimeTypes = ['image/jpeg', 'image/png', 'image/webp'] as const
type Mime = typeof mimeTypes[number]
type Claims = { id: string; method: 'PUT' | 'GET'; expires: number; mime?: Mime }
const ok = <T>(value: T): StorageResult<T> => ({ ok: true, value })
const fail = <T>(code: 'INVALID_REQUEST' | 'UNAVAILABLE' | 'CANCELLED' | 'TOO_LARGE' | 'INTEGRITY'): StorageResult<T> => ({ ok: false, error: { code } })

function settings() {
	if (!CASE_OBJECT_STORAGE_UPLOAD_ACTIVE) throw new Error('Local Case storage unavailable')
	const secret = process.env.LABOS_LOCAL_OBJECT_SECRET ?? ''
	const origin = process.env.LABOS_LOCAL_OBJECT_ORIGIN ?? ''
	const url = new URL(origin)
	if (secret.length < 32 || url.protocol !== 'http:' ||
		!['127.0.0.1', 'localhost'].includes(url.hostname) || url.username || url.password ||
		url.pathname !== '/' || url.search || url.hash || url.port === '') {
		throw new Error('Invalid local Case storage configuration')
	}
	return { secret, origin: url.origin, directory: join(process.cwd(), '.tmp', 'labos-local-case-objects') }
}

function idForKey(key: string): string | null {
	return keyPattern.test(key) ? createHash('sha256').update(key).digest('hex') : null
}

function signedToken(claims: Claims, secret: string): string {
	const payload = Buffer.from(JSON.stringify(claims)).toString('base64url')
	const mac = createHmac('sha256', secret).update(payload).digest('base64url')
	return `${payload}.${mac}`
}

function parseToken(token: string, method: 'PUT' | 'GET', secret: string): Claims | null {
	if (!/^[A-Za-z0-9_-]{1,512}\.[A-Za-z0-9_-]{43}$/.test(token)) return null
	const [payload, mac] = token.split('.')
	const expected = createHmac('sha256', secret).update(payload).digest()
	const actual = Buffer.from(mac, 'base64url')
	if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null
	try {
		const claims: unknown = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
		if (!claims || typeof claims !== 'object') return null
		const c = claims as Partial<Claims>
		if (!idPattern.test(c.id ?? '') || c.method !== method || !Number.isSafeInteger(c.expires) ||
			c.expires! <= Date.now() || c.expires! > Date.now() + 300_000 ||
			(method === 'GET' && !mimeTypes.includes(c.mime as Mime))) return null
		return c as Claims
	} catch { return null }
}

async function boundedRead(path: string, maxBytes: number): Promise<StorageResult<Uint8Array>> {
	try {
		const info = await stat(path)
		if (!info.isFile() || !Number.isSafeInteger(info.size)) return fail('INTEGRITY')
		if (info.size > maxBytes) return fail('TOO_LARGE')
		const bytes = await readFile(path)
		return bytes.length === info.size && bytes.length <= maxBytes ? ok(bytes) : fail('INTEGRITY')
	} catch { return fail('UNAVAILABLE') }
}

export function createLocalCaseObjectStorage(): ObjectStorage {
	const config = settings()
	// The local runtime directory is never a build input or deployment artifact.
	const pathFor = (id: string) => join(/* turbopackIgnore: true */ config.directory, id)
	const capability = (key: string, method: 'PUT' | 'GET', lifetimeSeconds: number, mime?: Mime): StorageResult<ObjectCapability> => {
		const id = idForKey(key)
		if (!id || !Number.isInteger(lifetimeSeconds) || lifetimeSeconds < 1 || lifetimeSeconds > 300 ||
			(method === 'GET' && !mimeTypes.includes(mime as Mime))) return fail('INVALID_REQUEST')
		const expiresAt = new Date(Date.now() + lifetimeSeconds * 1000)
		const token = signedToken({ id, method, expires: expiresAt.getTime(), ...(mime ? { mime } : {}) }, config.secret)
		const headers: Readonly<Record<string, string>> = method === 'PUT' ? { 'If-None-Match': '*' } : {}
		return ok({ url: `${config.origin}/api/local-case-objects/${id}${method === 'GET' ? `#${token}` : ''}`,
			method, headers: method === 'PUT'
				? { ...headers, 'X-LabOS-Local-Capability': token } : headers, expiresAt })
	}
	return {
		async issueCreateOnlyWrite({ key, lifetimeSeconds }) { return capability(key, 'PUT', lifetimeSeconds) },
		async issuePrivateRead({ key, lifetimeSeconds, mimeType }) { return capability(key, 'GET', lifetimeSeconds, mimeType) },
		async inspect(key, signal) {
			const id = idForKey(key)
			if (!id) return fail('INVALID_REQUEST')
			if (signal?.aborted) return fail('CANCELLED')
			try { const info = await stat(pathFor(id)); return info.isFile() ? ok({ presence: 'PRESENT' as const, bytes: info.size }) : fail('INTEGRITY') }
			catch (error) { return (error as NodeJS.ErrnoException).code === 'ENOENT' ? ok({ presence: 'ABSENT' as const }) : fail('UNAVAILABLE') }
		},
		async retrieve({ key, maxBytes, signal }) {
			const id = idForKey(key)
			if (!id || !Number.isSafeInteger(maxBytes) || maxBytes < 1 || maxBytes > 50 * 1024 * 1024) return fail('INVALID_REQUEST')
			if (signal?.aborted) return fail('CANCELLED')
			return boundedRead(pathFor(id), maxBytes)
		},
		async deleteExact(key, signal) {
			const id = idForKey(key)
			if (!id) return fail('INVALID_REQUEST')
			if (signal?.aborted) return fail('CANCELLED')
			try { await unlink(pathFor(id)); return ok(undefined) }
			catch (error) { return (error as NodeJS.ErrnoException).code === 'ENOENT' ? ok(undefined) : fail('UNAVAILABLE') }
		},
		async classifyPresence(key, signal) {
			const result = await this.inspect(key, signal)
			return result.ok ? ok(result.value.presence) : result
		},
	}
}

/** Local capability endpoint. The URL contains only the opaque object digest. */
export async function serveLocalCaseObject(request: Request, id: string): Promise<Response> {
	let config: ReturnType<typeof settings>
	try { config = settings() } catch { return new Response(null, { status: 404 }) }
	if (!isConfiguredCaseLocalOrigin(request)) return new Response(null, { status: 404 })
	const method = request.method === 'PUT' || request.method === 'GET' ? request.method : null
	const cookie = request.headers.get('cookie') ?? ''
	const name = `labos_local_read_${id}`
	const readToken = cookie.split(';').map(part => part.trim()).find(part => part.startsWith(`${name}=`))?.slice(name.length + 1)
	const token = method === 'PUT' ? request.headers.get('x-labos-local-capability') : readToken
	const claims = method && idPattern.test(id) && token ? parseToken(token, method, config.secret) : null
	const headers = { 'Cache-Control': 'private, no-store', 'Referrer-Policy': 'no-referrer',
		'X-Content-Type-Options': 'nosniff' }
	if (!claims || claims.id !== id) return new Response(null, { status: 404, headers })
	const path = join(/* turbopackIgnore: true */ config.directory, claims.id)
	if (method === 'GET') {
		const found = await boundedRead(path, MAX_BYTES)
		return found.ok ? new Response(Buffer.from(found.value), { headers: { ...headers,
			'Content-Type': claims.mime!, 'Content-Disposition': 'inline', 'Content-Length': String(found.value.length),
			'Set-Cookie': `${name}=; Path=/api/local-case-objects/${id}; Max-Age=0; HttpOnly; SameSite=Strict` } })
			: new Response(null, { status: 404, headers })
	}
	if (request.headers.get('if-none-match') !== '*') return new Response(null, { status: 412, headers })
	const announced = Number(request.headers.get('content-length'))
	if (!Number.isSafeInteger(announced) || announced < 1 || announced > MAX_BYTES) return new Response(null, { status: 413, headers })
	const reader = request.body?.getReader()
	if (!reader) return new Response(null, { status: 400, headers })
	if (request.signal.aborted) return new Response(null, { status: 400, headers })
	const chunks: Uint8Array[] = []
	let total = 0
	try {
		for (;;) {
			const { done, value } = await reader.read()
			if (done) break
			total += value.byteLength
			if (request.signal.aborted) return new Response(null, { status: 400, headers })
			if (total > MAX_BYTES) return new Response(null, { status: 413, headers })
			chunks.push(value)
		}
		if (total !== announced || request.signal.aborted) return new Response(null, { status: 400, headers })
		await mkdir(config.directory, { recursive: true })
		const handle = await open(path, 'wx', 0o600)
		try { await handle.writeFile(Buffer.concat(chunks, total)) }
		catch { await handle.close(); await unlink(path).catch(() => {}); throw new Error('Local object write failed') }
		await handle.close()
		return new Response(null, { status: 201, headers })
	} catch (error) {
		return new Response(null, { status: (error as NodeJS.ErrnoException).code === 'EEXIST' ? 412 : 503, headers })
	}
}
