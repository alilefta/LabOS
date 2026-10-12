import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import { createR2ObjectStorage } from '@/modules/labos-files/object-storage/r2'

const enabled = process.env.LABOS_R2_CONFORMANCE_RUN === '1' && process.env.LABOS_R2_NON_PRODUCTION === '1' && !!process.env.LABOS_R2_CORS_ORIGIN

describe.skipIf(!enabled)('R2 CORS read-only preflight', () => {
  it('reports the allowed origin, method and conditional header without uploading', async () => {
    const storage = createR2ObjectStorage({
      accountId: process.env.LABOS_R2_ACCOUNT_ID!, bucket: process.env.LABOS_R2_BUCKET!,
      accessKeyId: process.env.LABOS_R2_ACCESS_KEY_ID!, secretAccessKey: process.env.LABOS_R2_SECRET_ACCESS_KEY!,
    })
    const issued = await storage.issueCreateOnlyWrite({ key: `r2-01-conformance/${randomUUID()}`, lifetimeSeconds: 30 })
    expect(issued.ok).toBe(true)
    if (!issued.ok) return
    const response = await fetch(issued.value.url, { method: 'OPTIONS', headers: {
      Origin: process.env.LABOS_R2_CORS_ORIGIN!,
      'Access-Control-Request-Method': 'PUT',
      'Access-Control-Request-Headers': 'if-none-match',
    } })
    expect([200, 204]).toContain(response.status)
    expect(response.headers.get('access-control-allow-origin')).toBe(process.env.LABOS_R2_CORS_ORIGIN)
    expect(response.headers.get('access-control-allow-headers')?.toLowerCase()).toContain('if-none-match')
  }, 20_000)
})
