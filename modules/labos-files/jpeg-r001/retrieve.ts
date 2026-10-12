import 'server-only'

import { lookup } from 'node:dns/promises'
import { request } from 'node:https'
import { BlockList, isIP } from 'node:net'
import { UTApi } from 'uploadthing/server'

import { R001_LIMITS, R001Unavailable } from './inspect'

const APPROVED_HOST = 'fyylnhrlmu.ufs.sh'
const APPROVED_ORIGIN = `https://${APPROVED_HOST}`
const TRANSFER_TIMEOUT_MS = 10_000

const blockedV4 = new BlockList()
for (const [address, prefix] of [
	['0.0.0.0', 8], ['10.0.0.0', 8], ['100.64.0.0', 10], ['127.0.0.0', 8],
	['169.254.0.0', 16], ['172.16.0.0', 12], ['192.0.0.0', 24],
	['192.0.2.0', 24], ['192.88.99.0', 24], ['192.168.0.0', 16],
	['198.18.0.0', 15], ['198.51.100.0', 24], ['203.0.113.0', 24],
	['224.0.0.0', 4], ['240.0.0.0', 4],
] as const) blockedV4.addSubnet(address, prefix, 'ipv4')
const blockedV6 = new BlockList()
for (const [address, prefix] of [
	['2001::', 32], ['2001:2::', 48], ['2001:10::', 28], ['2001:20::', 28],
	['2001:db8::', 32], ['2002::', 16], ['3fff::', 20],
] as const) blockedV6.addSubnet(address, prefix, 'ipv6')

export function isPublicProviderAddress(address: string): boolean {
	const family = isIP(address)
	if (family === 4) return !blockedV4.check(address, 'ipv4')
	if (family !== 6 || !/^[23]/i.test(address)) return false
	return !blockedV6.check(address, 'ipv6')
}

function reject(): never { throw new R001Unavailable() }

export function validateProviderDestination(raw: string, key: string, appId: string): URL {
	if (!/^[A-Za-z0-9_-]{1,1024}$/.test(key) || appId !== 'fyylnhrlmu') reject()
	let url: URL
	try { url = new URL(raw) } catch { reject() }
	if (url.protocol !== 'https:' || url.origin !== APPROVED_ORIGIN ||
		url.hostname !== `${appId}.ufs.sh` || url.port || url.username ||
		url.password || url.search || url.hash ||
		url.pathname !== `/f/${encodeURIComponent(key)}`) reject()
	return url
}

export interface ProviderKeyLookup { lookup(key: string): Promise<ReadonlyArray<{ key: string; url: string }>> }

function developmentProvider(): ProviderKeyLookup {
	const token = process.env.UPLOADTHING_DEVELOPMENT_TOKEN
	if (!token) reject()
	let appId: string
	try {
		const claims = JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as { appId?: unknown }
		appId = typeof claims.appId === 'string' ? claims.appId : ''
	} catch { reject() }
	if (appId !== 'fyylnhrlmu') reject()
	const api = new UTApi({ token, logLevel: 'None' })
	return { async lookup(key) {
		// UploadThing 7.7.4: deprecated; upgrade requires reviewed replacement.
		const result = await api.getFileUrls(key, { keyType: 'fileKey' })
		return result.data
	} }
}

export type ProviderLookupAndTransport = Readonly<{
	lookup: ProviderKeyLookup
	resolve: typeof lookup
	request: typeof request
	appId: string
}>

function streamExact(url: URL, address: { address: string; family: number },
	transport: ProviderLookupAndTransport, signal?: AbortSignal): Promise<Buffer> {
	return new Promise((resolveBytes, rejectBytes) => {
		let settled = false
		let completeBody: Buffer | null = null
		const fail = () => {
			if (settled) return
			settled = true
			rejectBytes(new R001Unavailable())
		}
		const succeed = (bytes: Buffer) => {
			if (settled) return
			settled = true
			resolveBytes(bytes)
		}
		const req = transport.request(url, {
			method: 'GET', agent: false, rejectUnauthorized: true,
			servername: APPROVED_HOST,
			headers: { 'Accept-Encoding': 'identity', Connection: 'close' },
			lookup: (_hostname, options, callback) => {
				if (options.all) callback(null, [address])
				else callback(null, address.address, address.family)
			},
		}, (response) => {
			if (response.statusCode !== 200 || response.headers.location ||
				(response.headers['content-encoding'] && response.headers['content-encoding'] !== 'identity')) {
				response.destroy()
				return fail()
			}
			const declaredRaw = response.headers['content-length']
			let declared: number | null = null
			if (declaredRaw !== undefined) {
				if (typeof declaredRaw !== 'string' || !/^(0|[1-9]\d*)$/.test(declaredRaw)) {
					response.destroy(); return fail()
				}
				declared = Number(declaredRaw)
				if (!Number.isSafeInteger(declared) || declared === 0 || declared > R001_LIMITS.encodedBytes) {
					response.destroy(); return fail()
				}
			}
			const chunks: Buffer[] = []
			let length = 0
			response.on('data', (chunk: Buffer) => {
				length += chunk.length
				if (length > R001_LIMITS.encodedBytes) { req.destroy(); return fail() }
				chunks.push(chunk)
			})
			response.on('end', () => {
				if (!response.complete || length === 0 ||
					(declared !== null && declared !== length)) return fail()
				// Wait for the socket/request close as well: a false short HTTP
				// Content-Length can surface as a parser error after body end.
				completeBody = Buffer.concat(chunks, length)
			})
			response.on('aborted', fail)
			response.on('error', fail)
		})
		const timeout = setTimeout(() => { req.destroy(); fail() }, TRANSFER_TIMEOUT_MS)
		const aborted = () => { req.destroy(); fail() }
		signal?.addEventListener('abort', aborted, { once: true })
		req.on('error', fail)
		req.on('close', () => {
			clearTimeout(timeout)
			signal?.removeEventListener('abort', aborted)
			if (completeBody && !settled) succeed(completeBody)
			else if (!settled) fail()
		})
		if (signal?.aborted) aborted()
		else req.end()
	})
}

/** Never pass a browser/callback URL here. The input is the persisted reserved key. */
export async function retrieveReservedUploadThingBytes(key: string, signal?: AbortSignal,
	injected?: ProviderLookupAndTransport): Promise<Buffer> {
	try {
		if (signal?.aborted || !/^[A-Za-z0-9_-]{1,1024}$/.test(key)) reject()
		const token = process.env.UPLOADTHING_DEVELOPMENT_TOKEN
		const appId = injected?.appId ?? (token ? (JSON.parse(Buffer.from(token, 'base64url').toString('utf8')) as { appId?: string }).appId : '')
		const transport = injected ?? { lookup: developmentProvider(), resolve: lookup, request, appId: appId ?? '' }
		const rows = await transport.lookup.lookup(key)
		if (rows.length !== 1 || rows[0]?.key !== key) reject()
		const url = validateProviderDestination(rows[0].url, key, transport.appId)
		const answers = await transport.resolve(url.hostname, { all: true })
		if (!answers.length || answers.some((answer) => !isPublicProviderAddress(answer.address))) reject()
		const chosen = answers.find((answer) => answer.family === 4) ?? answers[0]
		return await streamExact(url, chosen, transport, signal)
	} catch { reject() }
}
