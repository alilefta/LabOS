import { describe, expect, it, vi } from 'vitest'

const { open } = vi.hoisted(() => ({ open: vi.fn() }))
vi.mock('@/modules/labos-files/case-public-open', () => ({
  createCasePublicOpen: () => open,
  CasePublicOpenUnavailableError: class CasePublicOpenUnavailableError extends Error {},
}))
import { GET } from '@/app/api/cases/[caseId]/assets/[assetId]/open/route'
import { CasePublicOpenUnavailableError } from '@/modules/labos-files/case-public-open'

const params = Promise.resolve({ caseId: 'case-1', assetId: 'asset-1' })
const request = () => new Request('https://lab.example/api/cases/case-1/assets/asset-1/open')

describe('public Case asset open route', () => {
  it('redirects with no-store only after the server operation returns an access path', async () => {
    open.mockResolvedValueOnce('https://public.example/file')
    const response = await GET(request(), { params })
    expect(response.status).toBe(302)
    expect(response.headers.get('location')).toBe('https://public.example/file')
    expect(response.headers.get('cache-control')).toBe('private, no-store')
    expect(response.headers.get('referrer-policy')).toBe('no-referrer')
    expect(open).toHaveBeenCalledWith({ caseId: 'case-1', assetId: 'asset-1' })
  })
  it('returns generic 404 with no key or URL on unavailable state', async () => {
    open.mockRejectedValueOnce(new CasePublicOpenUnavailableError())
    const response = await GET(request(), { params })
    expect(response.status).toBe(404)
    expect(await response.text()).not.toContain('https://public.example')
    expect(response.headers.get('location')).toBeNull()
  })
  it('passes query presence to the strict open operation for rejection after tenant resolution', async () => {
    open.mockClear()
    open.mockRejectedValueOnce(new CasePublicOpenUnavailableError())
    const response = await GET(new Request(request().url + '?providerObjectKey=other'), { params })
    expect(response.status).toBe(404)
    expect(open).toHaveBeenCalledWith({ caseId: 'case-1', assetId: 'asset-1', unsupportedQuery: true })
  })
})
