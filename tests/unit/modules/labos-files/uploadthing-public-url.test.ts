import { describe, expect, it, vi } from 'vitest'

const { getFileUrls } = vi.hoisted(() => ({ getFileUrls: vi.fn() }))
vi.mock('uploadthing/server', () => ({ UTApi: class { getFileUrls = getFileUrls } }))
import { resolveUploadThingPublicUrl } from '@/modules/labos-files/uploadthing-public-url'

describe('UploadThing public URL translation', () => {
  it('uses the SDK lookup for the trusted key', async () => {
    getFileUrls.mockResolvedValueOnce({ data: [{ key: 'trusted', url: 'https://public.example/file' }] })
    await expect(resolveUploadThingPublicUrl('trusted')).resolves.toBe('https://public.example/file')
    expect(getFileUrls).toHaveBeenCalledWith('trusted')
  })
  it.each([
    { data: [] },
    { data: [{ key: 'foreign', url: 'https://public.example/file' }] },
    { data: [{ key: 'trusted', url: 'http://public.example/file' }] },
    { data: [{ key: 'trusted', url: 'https://user:pass@public.example/file' }] },
  ])('rejects a missing, mismatched, or unsafe URL', async result => {
    getFileUrls.mockResolvedValueOnce(result)
    await expect(resolveUploadThingPublicUrl('trusted')).rejects.toThrow('Case asset unavailable')
  })
})
