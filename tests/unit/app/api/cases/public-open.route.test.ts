import { describe, expect, it, vi } from 'vitest'

const { open } = vi.hoisted(() => {
  vi.stubEnv('NODE_ENV', 'development')
  vi.stubEnv('LABOS_CASE_IMAGE_LOCAL_ENABLED', '1')
  vi.stubEnv('LABOS_LOCAL_OBJECT_ORIGIN', 'http://127.0.0.1:3000')
  return { open: vi.fn() }
})
vi.mock('@/modules/labos-files/case-public-open', () => ({
  createCasePublicOpen: () => open,
  CasePublicOpenUnavailableError: class CasePublicOpenUnavailableError extends Error {},
}))
import { GET } from '@/app/api/cases/[caseId]/assets/[assetId]/open/route'
import { CasePublicOpenUnavailableError } from '@/modules/labos-files/case-public-open'
import { isConfiguredCaseLocalOrigin } from '@/modules/labos-files/case-object-storage-activation'

const params = Promise.resolve({ caseId: 'case-1', assetId: 'asset-1' })
const request = () => new Request('https://lab.example/api/cases/case-1/assets/asset-1/open')

describe('public Case asset open route', () => {
  it('uses browser Host when Next normalizes Request.url to localhost', () => {
    expect(isConfiguredCaseLocalOrigin(new Request('http://localhost:3000/open',
      { headers: { Host: '127.0.0.1:3000' } }))).toBe(true)
    expect(isConfiguredCaseLocalOrigin(new Request('http://localhost:3000/open',
      { headers: { Host: 'localhost:3000' } }))).toBe(false)
  })
  it('redirects with no-store only after the server operation returns an access path', async () => {
    open.mockResolvedValueOnce('https://public.example/file')
    const response = await GET(request(), { params })
    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('https://public.example/file')
    expect(response.headers.get('cache-control')).toBe('private, no-store')
    expect(response.headers.get('referrer-policy')).toBe('no-referrer')
    expect(open).toHaveBeenCalledWith({ caseId: 'case-1', assetId: 'asset-1' })
  })
  it('keeps the local read capability out of the redirect URL and scopes its cookie', async () => {
    const id = 'a'.repeat(64)
    const token = `${'b'.repeat(40)}.${'c'.repeat(43)}`
    open.mockResolvedValueOnce(`http://127.0.0.1:3000/api/local-case-objects/${id}#${token}`)
    const response = await GET(new Request('http://127.0.0.1:3000/api/cases/case-1/assets/asset-1/open'), { params })
    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe(`http://127.0.0.1:3000/api/local-case-objects/${id}`)
    expect(response.headers.get('set-cookie')).toContain(`labos_local_read_${id}=${token}`)
    expect(response.headers.get('set-cookie')).toContain(`Path=/api/local-case-objects/${id}`)
    expect(response.headers.get('set-cookie')).toContain('HttpOnly')
    expect(response.headers.get('set-cookie')).toContain('SameSite=Strict')
  })
  it('denies a local read when the browser origin differs from the configured origin', async () => {
    const id = 'a'.repeat(64)
    open.mockResolvedValueOnce(`http://127.0.0.1:3000/api/local-case-objects/${id}#${'b'.repeat(40)}.${'c'.repeat(43)}`)
    const response = await GET(request(), { params })
    expect(response.status).toBe(404)
    expect(response.headers.get('set-cookie')).toBeNull()
  })
  it('returns generic 404 with no key or URL on unavailable state', async () => {
    open.mockRejectedValueOnce(new CasePublicOpenUnavailableError())
    const response = await GET(request(), { params })
    expect(response.status).toBe(404)
    expect(await response.text()).not.toContain('https://public.example')
    expect(response.headers.get('location')).toBeNull()
  })
  it('returns a generic retryable response for unexpected runtime failure', async () => {
    open.mockRejectedValueOnce(new Error('private provider detail'))
    const response = await GET(request(), { params })
    expect(response.status).toBe(503)
    expect(await response.text()).not.toContain('private provider detail')
  })
  it('passes query presence to the strict open operation for rejection after tenant resolution', async () => {
    open.mockClear()
    open.mockRejectedValueOnce(new CasePublicOpenUnavailableError())
    const response = await GET(new Request(request().url + '?providerObjectKey=other'), { params })
    expect(response.status).toBe(404)
    expect(open).toHaveBeenCalledWith({ caseId: 'case-1', assetId: 'asset-1', unsupportedQuery: true })
  })
})
