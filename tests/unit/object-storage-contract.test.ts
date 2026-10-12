import { describe, expect, it } from 'vitest'
import type { ObjectStorage, StorageResult } from '@/modules/labos-files/object-storage/contract'

const ok = <T>(value: T): StorageResult<T> => ({ ok: true, value })

describe('ObjectStorage semantic contract', () => {
  it('can be consumed without a provider dependency and respects a caller byte limit', async () => {
    const bytes = Uint8Array.of(1, 2, 3)
    const fake: ObjectStorage = {
      issueCreateOnlyWrite: async () => ok({ url: 'opaque', method: 'PUT', headers: {}, expiresAt: new Date(1000) }),
      inspect: async () => ok({ presence: 'PRESENT', bytes: 3 }),
      retrieve: async ({ maxBytes, signal }) => signal?.aborted ? { ok: false, error: { code: 'CANCELLED' } } : maxBytes < 3 ? { ok: false, error: { code: 'TOO_LARGE' } } : ok(bytes),
      issuePrivateRead: async () => ok({ url: 'opaque', method: 'GET', headers: {}, expiresAt: new Date(1000) }),
      deleteExact: async () => ok(undefined),
      classifyPresence: async () => ok('PRESENT'),
    }
    expect(await fake.inspect('owned-key')).toEqual(ok({ presence: 'PRESENT', bytes: 3 }))
    expect(await fake.retrieve({ key: 'owned-key', maxBytes: 2 })).toEqual({ ok: false, error: { code: 'TOO_LARGE' } })
    expect(await fake.retrieve({ key: 'owned-key', maxBytes: 3 })).toEqual(ok(bytes))
    expect(await fake.retrieve({ key: 'owned-key', maxBytes: 3, signal: AbortSignal.abort() })).toEqual({ ok: false, error: { code: 'CANCELLED' } })
  })
})
