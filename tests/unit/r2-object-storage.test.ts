import { describe, expect, it, vi } from 'vitest'
import { PassThrough } from 'node:stream'
import type { S3Client } from '@aws-sdk/client-s3'
import { createR2ObjectStorage, R2ObjectStorage } from '@/modules/labos-files/object-storage/r2'

const config = {
  accountId: '0123456789abcdef0123456789abcdef', bucket: 'synthetic-private-bucket',
  accessKeyId: 'synthetic', secretAccessKey: 'synthetic',
}

describe('R2 adapter local contract', () => {
  it('binds create-only condition into a signed browser request or refuses issuance', async () => {
    const storage = createR2ObjectStorage(config)
    const result = await storage.issueCreateOnlyWrite({ key: 'objects/synthetic', lifetimeSeconds: 60 })
    expect(result.ok).toBe(true)
    if (!result.ok) throw new Error('Presigner did not bind If-None-Match')
    expect(result.value.method).toBe('PUT')
    expect(result.value.headers).toEqual({ 'If-None-Match': '*' })
    expect(new URL(result.value.url).searchParams.get('X-Amz-SignedHeaders')?.split(';')).toContain('if-none-match')
    const signed = new URL(result.value.url).searchParams
    const stamp = signed.get('X-Amz-Date')!
    const signedAt = Date.UTC(Number(stamp.slice(0, 4)), Number(stamp.slice(4, 6)) - 1, Number(stamp.slice(6, 8)), Number(stamp.slice(9, 11)), Number(stamp.slice(11, 13)), Number(stamp.slice(13, 15)))
    expect(result.value.expiresAt.getTime()).toBe(signedAt + 60_000)
    expect(await storage.issueCreateOnlyWrite({ key: '', lifetimeSeconds: 60 })).toEqual({ ok: false, error: { code: 'INVALID_REQUEST' } })
    const read = await storage.issuePrivateRead({ key: 'objects/synthetic', lifetimeSeconds: 60 })
    expect(read.ok).toBe(true)
    if (!read.ok) throw new Error('Private read signing failed')
    expect(read.value.method).toBe('GET')
    expect(read.value.headers).toEqual({})
    const readStamp = new URL(read.value.url).searchParams.get('X-Amz-Date')!
    const readSignedAt = Date.UTC(Number(readStamp.slice(0, 4)), Number(readStamp.slice(4, 6)) - 1, Number(readStamp.slice(6, 8)), Number(readStamp.slice(9, 11)), Number(readStamp.slice(11, 13)), Number(readStamp.slice(13, 15)))
    expect(read.value.expiresAt.getTime()).toBe(readSignedAt + 60_000)
  })

  it('bounds streamed bytes and aborts an oversized provider response', async () => {
    const send = vi.fn().mockResolvedValue({
      Body: (async function* () { yield Uint8Array.of(1, 2); yield Uint8Array.of(3, 4) })(),
    })
    const storage = new R2ObjectStorage({ send } as unknown as S3Client, config.bucket)
    expect(await storage.retrieve({ key: 'objects/synthetic', maxBytes: 3 })).toEqual({ ok: false, error: { code: 'TOO_LARGE' } })
    expect(await storage.retrieve({ key: 'objects/synthetic', maxBytes: 0 })).toEqual({ ok: false, error: { code: 'INVALID_REQUEST' } })
  })

  it('handles late provider-stream errors after a declared-size abort', async () => {
    const body = new PassThrough()
    const send = vi.fn().mockImplementation(async (_command, options: { abortSignal: AbortSignal }) => {
      options.abortSignal.addEventListener('abort', () => setImmediate(() => {
        body.emit('error', new Error('aborted'))
        body.destroy()
      }), { once: true })
      return { ContentLength: 4, Body: body }
    })
    const storage = new R2ObjectStorage({ send } as unknown as S3Client, config.bucket)
    expect(await storage.retrieve({ key: 'objects/synthetic', maxBytes: 3 })).toEqual({ ok: false, error: { code: 'TOO_LARGE' } })
    await new Promise<void>((resolve) => setImmediate(resolve))
  })
  it('normalizes in-flight cancellation without returning partial bytes', async () => {
    const controller = new AbortController()
    const send = vi.fn().mockResolvedValue({
      Body: (async function* () {
        yield Uint8Array.of(1)
        controller.abort()
        yield Uint8Array.of(2)
      })(),
    })
    const storage = new R2ObjectStorage({ send } as unknown as S3Client, config.bucket)
    expect(await storage.retrieve({ key: 'objects/synthetic', maxBytes: 2, signal: controller.signal })).toEqual({ ok: false, error: { code: 'CANCELLED' } })
  })
  it('classifies only an unambiguous direct 404 as absent', async () => {
    const send = vi.fn().mockRejectedValueOnce({ name: 'NotFound', $metadata: { httpStatusCode: 404 } })
      .mockRejectedValueOnce({ name: 'AccessDenied', $metadata: { httpStatusCode: 403 } })
    const storage = new R2ObjectStorage({ send } as unknown as S3Client, config.bucket)
    expect(await storage.classifyPresence('objects/synthetic')).toEqual({ ok: true, value: 'ABSENT' })
    expect(await storage.classifyPresence('objects/synthetic')).toEqual({ ok: false, error: { code: 'FORBIDDEN' } })
  })
	  it('forwards optional S3 session credentials without changing permanent credentials', async () => {
	    const permanent = createR2ObjectStorage(config)
	    const temporary = createR2ObjectStorage({ ...config, sessionToken: 'synthetic-session-token' })
	    const key = 'objects/00000000-0000-4000-8000-000000000002'
	    const oldRead = await permanent.issuePrivateRead({ key, lifetimeSeconds: 60 })
	    const newRead = await temporary.issuePrivateRead({ key, lifetimeSeconds: 60 })
	    expect(oldRead.ok).toBe(true)
	    expect(newRead.ok).toBe(true)
	    if (!oldRead.ok || !newRead.ok) return
	    expect(new URL(oldRead.value.url).searchParams.has('X-Amz-Security-Token')).toBe(false)
	    expect(new URL(newRead.value.url).searchParams.get('X-Amz-Security-Token'))
	      .toBe('synthetic-session-token')
	    expect(() => createR2ObjectStorage({ ...config, sessionToken: '' })).toThrow()
	    expect(() => createR2ObjectStorage({ ...config, sessionToken: '  ' })).toThrow()
	    expect(() => createR2ObjectStorage({ ...config, accessKeyId: '' })).toThrow()
	    expect(() => createR2ObjectStorage({ ...config, secretAccessKey: '' })).toThrow()
	  })
})
