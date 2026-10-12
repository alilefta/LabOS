import 'server-only'

import {
	DeleteObjectCommand, GetObjectCommand, HeadObjectCommand, PutObjectCommand, S3Client,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import type { ObjectCapability, ObjectInspection, ObjectStorage, StorageResult } from './contract'

const MAX_CAPABILITY_SECONDS = 300
const MAX_RETRIEVAL_BYTES = 50 * 1024 * 1024
const ok = <T>(value: T): StorageResult<T> => ({ ok: true, value })
const fail = <T>(code: 'INVALID_REQUEST' | 'UNAVAILABLE' | 'FORBIDDEN' | 'CANCELLED' | 'TOO_LARGE' | 'INTEGRITY'): StorageResult<T> => ({ ok: false, error: { code } })
const validKey = (key: string): boolean => typeof key === 'string' && key.length > 0 && key.length <= 1024 && !/[\u0000-\u001f\u007f]/.test(key)
const validLifetime = (seconds: number): boolean => Number.isInteger(seconds) && seconds >= 1 && seconds <= MAX_CAPABILITY_SECONDS

function signedExpiry(url: string, requestedSeconds: number): Date | null {
	const params = new URL(url).searchParams
	const stamp = params.get('X-Amz-Date')
	const duration = params.get('X-Amz-Expires')
	if (!stamp || !/^\d{8}T\d{6}Z$/.test(stamp) || duration !== String(requestedSeconds)) return null
	const instant = Date.UTC(Number(stamp.slice(0, 4)), Number(stamp.slice(4, 6)) - 1,
		Number(stamp.slice(6, 8)), Number(stamp.slice(9, 11)), Number(stamp.slice(11, 13)), Number(stamp.slice(13, 15)))
	if (!Number.isFinite(instant) || new Date(instant).toISOString().replace(/[-:]/g, '').replace('.000', '') !== stamp) return null
	return new Date(instant + requestedSeconds * 1000)
}

function normalizedError(error: unknown): 'UNAVAILABLE' | 'FORBIDDEN' | 'CANCELLED' {
	if (error && typeof error === 'object') {
		const record = error as { name?: unknown; $metadata?: { httpStatusCode?: unknown } }
		if (record.name === 'AbortError') return 'CANCELLED'
		if (record.$metadata?.httpStatusCode === 403) return 'FORBIDDEN'
	}
	return 'UNAVAILABLE'
}

function isAbsent(error: unknown): boolean {
	if (!error || typeof error !== 'object') return false
	const record = error as { name?: unknown; $metadata?: { httpStatusCode?: unknown } }
	return record.$metadata?.httpStatusCode === 404 &&
		(record.name === 'NotFound' || record.name === 'NoSuchKey' || record.name === 'NotFoundException')
}

/** R2 physical configuration stays here. Do not pass bucket/endpoint to Files. */
export type R2PrivateConfig = Readonly<{
	accountId: string
	bucket: string
	accessKeyId: string
	secretAccessKey: string
}>

export function createR2ObjectStorage(config: R2PrivateConfig): ObjectStorage {
	if (!/^[a-f0-9]{32}$/i.test(config.accountId) || !/^[a-z0-9][a-z0-9.-]{1,61}[a-z0-9]$/.test(config.bucket) ||
		!config.accessKeyId || !config.secretAccessKey) throw new Error('Invalid private object-storage configuration')
	const client = new S3Client({
		region: 'auto', endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
		credentials: { accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey },
		forcePathStyle: true, maxAttempts: 1,
	})
	return new R2ObjectStorage(client, config.bucket)
}

export class R2ObjectStorage implements ObjectStorage {
	constructor(private readonly client: S3Client, private readonly bucket: string) {}

	async issueCreateOnlyWrite(input: Readonly<{ key: string; lifetimeSeconds: number }>): Promise<StorageResult<ObjectCapability>> {
		if (!validKey(input.key) || !validLifetime(input.lifetimeSeconds)) return fail('INVALID_REQUEST')
		try {
			const command = new PutObjectCommand({ Bucket: this.bucket, Key: input.key, IfNoneMatch: '*' })
			const url = await getSignedUrl(this.client, command, { expiresIn: input.lifetimeSeconds })
			const signedHeaders = new URL(url).searchParams.get('X-Amz-SignedHeaders')?.toLowerCase().split(';') ?? []
			const expiresAt = signedExpiry(url, input.lifetimeSeconds)
			// Never issue an overwrite-capable browser capability if presigning drops the condition.
			if (!signedHeaders.includes('if-none-match') || !expiresAt) return fail('UNAVAILABLE')
			return ok({ url, method: 'PUT', headers: { 'If-None-Match': '*' },
				expiresAt })
		} catch (error) { return fail(normalizedError(error)) }
	}

	async inspect(key: string, signal?: AbortSignal): Promise<StorageResult<ObjectInspection>> {
		if (!validKey(key)) return fail('INVALID_REQUEST')
		if (signal?.aborted) return fail('CANCELLED')
		try {
			const response = await this.client.send(new HeadObjectCommand({ Bucket: this.bucket, Key: key }), { abortSignal: signal })
			const bytes = response.ContentLength
			if (!Number.isSafeInteger(bytes) || bytes === undefined || bytes < 0) return fail('INTEGRITY')
			return ok({ presence: 'PRESENT', bytes })
		} catch (error) {
			if (isAbsent(error)) return ok({ presence: 'ABSENT' })
			return fail(signal?.aborted ? 'CANCELLED' : normalizedError(error))
		}
	}

	async retrieve(input: Readonly<{ key: string; maxBytes: number; signal?: AbortSignal }>): Promise<StorageResult<Uint8Array>> {
		if (!validKey(input.key) || !Number.isSafeInteger(input.maxBytes) || input.maxBytes < 1 || input.maxBytes > MAX_RETRIEVAL_BYTES) return fail('INVALID_REQUEST')
		if (input.signal?.aborted) return fail('CANCELLED')
		const controller = new AbortController()
		const cancel = () => controller.abort()
		input.signal?.addEventListener('abort', cancel, { once: true })
		try {
			const response = await this.client.send(new GetObjectCommand({ Bucket: this.bucket, Key: input.key }), { abortSignal: controller.signal })
			if (!response.Body) return fail('INTEGRITY')
			const body = response.Body as AsyncIterable<Uint8Array> & {
				on?: (event: string, listener: (error: unknown) => void) => unknown
			}
			// A Node provider stream can emit a late socket error after an early
			// size-triggered abort, when no async iterator has started yet.
			body.on?.('error', () => {})
			if (response.ContentLength !== undefined && (!Number.isSafeInteger(response.ContentLength) || response.ContentLength < 0)) { controller.abort(); return fail('INTEGRITY') }
			if (response.ContentLength !== undefined && response.ContentLength > input.maxBytes) { controller.abort(); return fail('TOO_LARGE') }
			const chunks: Uint8Array[] = []
			let length = 0
			for await (const raw of body) {
				if (controller.signal.aborted) return fail('CANCELLED')
				const chunk = new Uint8Array(raw)
				length += chunk.byteLength
				if (length > input.maxBytes) { controller.abort(); return fail('TOO_LARGE') }
				chunks.push(chunk)
			}
			if (controller.signal.aborted) return fail('CANCELLED')
			if (response.ContentLength !== undefined && response.ContentLength !== length) return fail('INTEGRITY')
			const bytes = new Uint8Array(length)
			let offset = 0
			for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
			return ok(bytes)
		} catch (error) { return fail(controller.signal.aborted ? 'CANCELLED' : normalizedError(error)) }
		finally { input.signal?.removeEventListener('abort', cancel) }
	}

	async issuePrivateRead(input: Readonly<{ key: string; lifetimeSeconds: number }>): Promise<StorageResult<ObjectCapability>> {
		if (!validKey(input.key) || !validLifetime(input.lifetimeSeconds)) return fail('INVALID_REQUEST')
		try {
			const url = await getSignedUrl(this.client,
				new GetObjectCommand({ Bucket: this.bucket, Key: input.key }), { expiresIn: input.lifetimeSeconds })
			const expiresAt = signedExpiry(url, input.lifetimeSeconds)
			if (!expiresAt) return fail('UNAVAILABLE')
			return ok({ url, method: 'GET', headers: {}, expiresAt })
		} catch (error) { return fail(normalizedError(error)) }
	}

	async deleteExact(key: string, signal?: AbortSignal): Promise<StorageResult<void>> {
		if (!validKey(key)) return fail('INVALID_REQUEST')
		if (signal?.aborted) return fail('CANCELLED')
		try {
			await this.client.send(new DeleteObjectCommand({ Bucket: this.bucket, Key: key }), { abortSignal: signal })
			return ok(undefined)
		} catch (error) { return fail(signal?.aborted ? 'CANCELLED' : normalizedError(error)) }
	}

	async classifyPresence(key: string, signal?: AbortSignal): Promise<StorageResult<'PRESENT' | 'ABSENT'>> {
		const result = await this.inspect(key, signal)
		return result.ok ? ok(result.value.presence) : result
	}
}
