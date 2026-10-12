import { randomUUID } from 'node:crypto'
import { createServer } from 'node:http'
import { describe, expect, it } from 'vitest'
import { createR2ObjectStorage } from '@/modules/labos-files/object-storage/r2'

const enabled = process.env.LABOS_R2_CONFORMANCE_RUN === '1' && process.env.LABOS_R2_NON_PRODUCTION === '1' && process.env.LABOS_R2_CORS_ORIGIN === 'http://localhost:3000'

type BrowserReport = { origin: string; statuses: number[]; failed: boolean }

/** Browser page stays on the approved localhost origin. Bearer URLs exist only in memory and its no-store response. */
describe.skipIf(!enabled)('R2 actual browser-origin conformance', () => {
  it('enforces conditional create from browser fetch and verifies bytes privately', async () => {
    const storage = createR2ObjectStorage({
      accountId: process.env.LABOS_R2_ACCOUNT_ID!, bucket: process.env.LABOS_R2_BUCKET!,
      accessKeyId: process.env.LABOS_R2_ACCESS_KEY_ID!, secretAccessKey: process.env.LABOS_R2_SECRET_ACCESS_KEY!,
    })
    const key = `r2-01-conformance/${randomUUID()}`
    const original = Uint8Array.of(11, 22, 33, 44)
    let latestExpiry = 0
    let pageServed = false
    let server: ReturnType<typeof createServer> | undefined
    try {
      expect(await storage.classifyPresence(key)).toEqual({ ok: true, value: 'ABSENT' })
      const first = await storage.issueCreateOnlyWrite({ key, lifetimeSeconds: 120 })
      const second = await storage.issueCreateOnlyWrite({ key, lifetimeSeconds: 120 })
      expect(first.ok && second.ok).toBe(true)
      if (!first.ok || !second.ok) return
      latestExpiry = Math.max(first.value.expiresAt.getTime(), second.value.expiresAt.getTime())
      const firstCapability = JSON.stringify({ url: first.value.url, headers: first.value.headers })
      const secondCapability = JSON.stringify({ url: second.value.url, headers: second.value.headers })
      let resolveReport!: (report: BrowserReport) => void
      const report = new Promise<BrowserReport>((resolve) => { resolveReport = resolve })
      server = createServer(async (request, response) => {
        response.setHeader('Cache-Control', 'no-store')
        response.setHeader('Referrer-Policy', 'no-referrer')
        if (request.url === '/' && request.method === 'GET') {
          pageServed = true // any browser PUT from this page may have succeeded
          response.setHeader('Content-Type', 'text/html; charset=utf-8')
          response.end(`<!doctype html><html><body><main id="result">running</main><script>
const first = ${firstCapability}; const second = ${secondCapability};
(async () => {
  let statuses = []; let failed = false;
  try {
    const put = (cap, bytes) => fetch(cap.url, { method: 'PUT', mode: 'cors', headers: cap.headers, body: new Uint8Array(bytes) });
    statuses.push((await put(first, [11,22,33,44])).status);
    statuses.push((await put(first, [99,88,77,66])).status);
    statuses.push((await put(second, [99,88,77,66])).status);
  } catch { failed = true; }
  document.getElementById('result').textContent = 'origin=' + location.origin + ' statuses=' + statuses.join(',') + ' failed=' + failed;
  try { await fetch('/result', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ origin: location.origin, statuses, failed }) }); } catch {}
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
            const value = JSON.parse(body) as BrowserReport
            if (typeof value.origin === 'string' && Array.isArray(value.statuses) && typeof value.failed === 'boolean') resolveReport(value)
          } catch {}
          response.writeHead(204).end()
          return
        }
        response.writeHead(404).end()
      })
      await new Promise<void>((resolve, reject) => { server!.once('error', reject); server!.listen(3000, '::1', resolve) })
      console.log('R2_BROWSER_READY origin=http://localhost:3000')
      const timer = setTimeout(() => resolveReport({ origin: '', statuses: [], failed: true }), 70_000)
      const browser = await report
      clearTimeout(timer)
      expect(browser.origin).toBe('http://localhost:3000')
      expect(browser.failed).toBe(false)
      expect([200, 201]).toContain(browser.statuses[0])
      expect(browser.statuses.slice(1)).toEqual([412, 412])
      expect(await storage.inspect(key)).toEqual({ ok: true, value: { presence: 'PRESENT', bytes: original.length } })
      expect(await storage.retrieve({ key, maxBytes: original.length })).toEqual({ ok: true, value: original })
    } finally {
      server?.closeAllConnections()
      server?.close()
      if (pageServed) {
        await new Promise((resolve) => setTimeout(resolve, Math.max(0, latestExpiry + 60_000 - Date.now())))
        const deleted = await storage.deleteExact(key)
        const absence = await storage.classifyPresence(key)
        if (!deleted.ok || !absence.ok || absence.value !== 'ABSENT') throw new Error(`R2 browser fixture cleanup unconfirmed: ${key}`)
      }
    }
  }, 300_000)
})
