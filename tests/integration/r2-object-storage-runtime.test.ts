import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { createR2ObjectStorage } from '@/modules/labos-files/object-storage/r2'

const enabled = process.env.LABOS_R2_CONFORMANCE_RUN === '1' && process.env.LABOS_R2_NON_PRODUCTION === '1'
const required = ['LABOS_R2_ACCOUNT_ID', 'LABOS_R2_BUCKET', 'LABOS_R2_ACCESS_KEY_ID', 'LABOS_R2_SECRET_ACCESS_KEY'] as const
const configured = required.every((name) => Boolean(process.env[name]))

/** Explicit, synthetic, non-production gate. Never print a capability URL or credential. */
describe.skipIf(!enabled || !configured)('R2 private object conformance', () => {
  it('proves direct exact create-only PUT, private operations and absence', async () => {
    const storage = createR2ObjectStorage({
      accountId: process.env.LABOS_R2_ACCOUNT_ID!, bucket: process.env.LABOS_R2_BUCKET!,
      accessKeyId: process.env.LABOS_R2_ACCESS_KEY_ID!, secretAccessKey: process.env.LABOS_R2_SECRET_ACCESS_KEY!,
    })
    const key = `r2-01-conformance/${randomUUID()}`
    const first = Uint8Array.of(1, 3, 5, 7)
    const replacement = Uint8Array.of(2, 4, 6, 8)
    const origin = process.env.LABOS_R2_CORS_ORIGIN
    let latestExpiry = 0
    let writeAttempted = false
    try {
      expect(await storage.classifyPresence(key)).toEqual({ ok: true, value: 'ABSENT' })
      const issued = await storage.issueCreateOnlyWrite({ key, lifetimeSeconds: 30 })
      expect(issued.ok).toBe(true)
      if (!issued.ok) return
      latestExpiry = issued.value.expiresAt.getTime()
      if (origin) {
        const preflight = await fetch(issued.value.url, {
          method: 'OPTIONS', headers: {
            Origin: origin, 'Access-Control-Request-Method': 'PUT',
            'Access-Control-Request-Headers': 'if-none-match',
          },
        })
        expect([200, 204]).toContain(preflight.status)
        expect(preflight.headers.get('access-control-allow-origin')).toBe(origin)
        expect(preflight.headers.get('access-control-allow-headers')?.toLowerCase()).toContain('if-none-match')
      }
      const put = (body: Uint8Array, headers: Record<string, string>) => fetch(issued.value.url, {
        method: 'PUT', headers: { ...headers, ...(origin ? { Origin: origin } : {}) }, body: Buffer.from(body),
      })
      writeAttempted = true
      expect((await put(replacement, {})).status).toBe(403)
      expect((await put(replacement, { 'If-None-Match': 'not-star' })).status).toBe(403)
      expect(await storage.classifyPresence(key)).toEqual({ ok: true, value: 'ABSENT' })
      const initial = await put(first, issued.value.headers as Record<string, string>)
      expect([200, 201]).toContain(initial.status)

      expect((await put(replacement, issued.value.headers as Record<string, string>)).status).toBe(412)
      const omitted = await put(replacement, {})
      expect(omitted.ok).toBe(false)
      const second = await storage.issueCreateOnlyWrite({ key, lifetimeSeconds: 30 })
      expect(second.ok).toBe(true)
      if (!second.ok) return
      latestExpiry = Math.max(latestExpiry, second.value.expiresAt.getTime())
      const again = await fetch(second.value.url, {
        method: 'PUT', headers: { ...second.value.headers, ...(origin ? { Origin: origin } : {}) }, body: Buffer.from(replacement),
      })
      expect(again.status).toBe(412)
      expect(await storage.inspect(key)).toEqual({ ok: true, value: { presence: 'PRESENT', bytes: first.length } })
      expect(await storage.retrieve({ key, maxBytes: first.length - 1 })).toEqual({ ok: false, error: { code: 'TOO_LARGE' } })
      expect(await storage.retrieve({ key, maxBytes: first.length })).toEqual({ ok: true, value: first })
      expect(await storage.retrieve({ key: `r2-01-conformance/${randomUUID()}`, maxBytes: first.length })).toEqual({ ok: false, error: { code: 'UNAVAILABLE' } })
      const read = await storage.issuePrivateRead({ key, lifetimeSeconds: 30 })
      expect(read.ok).toBe(true)
      if (!read.ok) return
      const privateResponse = await fetch(read.value.url, { method: 'GET' })
      expect(privateResponse.status).toBe(200)
      expect(new Uint8Array(await privateResponse.arrayBuffer())).toEqual(first)
      // No deletion while either signed write capability may still be valid.
      await new Promise((resolve) => setTimeout(resolve, Math.max(0, latestExpiry + 60_000 - Date.now())))
      const expiredReplay = await put(replacement, issued.value.headers as Record<string, string>)
      expect(expiredReplay.ok).toBe(false)
      expect((await fetch(read.value.url, { method: 'GET' })).ok).toBe(false)
      expect(await storage.deleteExact(key)).toEqual({ ok: true, value: undefined })
      expect(await storage.classifyPresence(key)).toEqual({ ok: true, value: 'ABSENT' })
      expect((await put(replacement, issued.value.headers as Record<string, string>)).ok).toBe(false)
      expect(await storage.classifyPresence(key)).toEqual({ ok: true, value: 'ABSENT' })
      writeAttempted = false
    } finally {
      if (writeAttempted) {
        await new Promise((resolve) => setTimeout(resolve, Math.max(0, latestExpiry + 60_000 - Date.now())))
        const removed = await storage.deleteExact(key)
        const absence = await storage.classifyPresence(key)
        if (!removed.ok || !absence.ok || absence.value !== 'ABSENT') throw new Error('R2 run-owned fixture cleanup unconfirmed')
      }
    }
  }, 180_000)
})
