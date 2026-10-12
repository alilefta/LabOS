import { beforeEach, describe, expect, it, vi } from 'vitest'

const { stageCaseAsset, handoffVerifiedCaseClinicalCallback } = vi.hoisted(() => ({
  stageCaseAsset: vi.fn(),
  handoffVerifiedCaseClinicalCallback: vi.fn(),
}))
vi.mock('@/modules/labos-files/case-asset-stage.contract', async importOriginal => ({
  ...(await importOriginal<object>()),
  stageCaseAsset,
}))
vi.mock('@/modules/labos-files/case-clinical-callback', () => ({ handoffVerifiedCaseClinicalCallback }))

import { caseClinicalJpegRoute } from '@/app/api/uploadthing/case-clinical-route'
import { labOSUploadRouter } from '@/app/api/uploadthing/core'

const caseId = '22222222-2222-4222-8222-222222222222'
const grantId = '11111111-1111-4111-8111-111111111111'
const input = { caseId }
const jpeg = { name: 'clinical.jpg', size: 1024, type: 'image/jpeg' }

describe('inactive Case clinical UploadThing route candidate', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    stageCaseAsset.mockResolvedValue({ uploadGrantId: grantId })
    handoffVerifiedCaseClinicalCallback.mockResolvedValue({ uploadGrantId: grantId })
  })

  it('accepts only one declared JPEG within the early transport ceiling', async () => {
    expect(Object.keys(caseClinicalJpegRoute.routerConfig)).toEqual(['image/jpeg'])
    expect(caseClinicalJpegRoute.routeOptions.presignedURLTTL).toBe('15m')
    const seed = caseClinicalJpegRoute.routeOptions.getFileHashParts?.(jpeg)
    expect(seed).toHaveLength(1)
    expect(seed?.[0]).toMatch(/^[0-9a-f-]{36}$/)
    expect(seed).not.toContain(jpeg.name)
    expect(caseClinicalJpegRoute.routeOptions.getFileHashParts?.(jpeg)).not.toEqual(seed)
    expect((caseClinicalJpegRoute.routerConfig as Record<string, unknown>)['image/jpeg']).toMatchObject({ maxFileSize: '32MB', maxFileCount: 1 })
    expect((caseClinicalJpegRoute.routerConfig as Record<string, unknown>)['image/jpeg']).not.toHaveProperty('acl')
    await expect(caseClinicalJpegRoute.middleware({ input, files: [jpeg] })).resolves.toEqual({ uploadGrantId: grantId })
    expect(stageCaseAsset).toHaveBeenCalledWith(input, 'JPG')
    expect(Object.keys(labOSUploadRouter)).not.toContain('caseClinicalJpegRoute')
  })

  it.each([
    { files: [] },
    { files: [jpeg, jpeg] },
    { files: [{ ...jpeg, name: 'clinical.png' }] },
    { files: [{ ...jpeg, name: 'clinical' }] },
    { files: [{ ...jpeg, name: 'clinical.jpg.png' }] },
    { files: [{ ...jpeg, name: 'clinical.jpg', type: 'image/png' }] },
    { files: [{ ...jpeg, size: 0 }] },
    { files: [{ ...jpeg, size: 33_554_433 }] },
  ])('rejects invalid early transport metadata without staging', async ({ files }) => {
    await expect(caseClinicalJpegRoute.middleware({ input, files })).rejects.toThrow()
    expect(stageCaseAsset).not.toHaveBeenCalled()
  })

  it.each([['clinical.jpeg', 'JPEG'], ['clinical.JPEG', 'JPEG'], ['clinical.JPG', 'JPG'], ['clinical.v2.JpEg', 'JPEG']])('normalizes %s', async (name, suffix) => {
    await caseClinicalJpegRoute.middleware({ input, files: [{ ...jpeg, name }] })
    expect(stageCaseAsset).toHaveBeenCalledWith(input, suffix)
    expect(JSON.stringify(stageCaseAsset.mock.calls)).not.toContain(name)
  })

  it('uses strict saved Case ID input', async () => {
    const parser = caseClinicalJpegRoute.inputParser as { parseAsync(value: unknown): Promise<unknown> }
    await expect(parser.parseAsync({ caseId, organizationId: 'forged' })).rejects.toThrow()
    await expect(parser.parseAsync({ caseId, validatedSuffix: 'JPG' })).rejects.toThrow()
    await expect(parser.parseAsync({ caseId: 'not-a-uuid' })).rejects.toThrow()
  })

  it('passes only server metadata and opaque provider key to the reservation boundary', async () => {
    const metadata = { uploadGrantId: grantId }
    const file = { key: 'opaque-key', ufsUrl: 'https://ufs.sh/f/opaque-key', name: 'patient.jpg', type: 'image/jpeg', size: 1024, fileHash: 'untrusted' }
    await expect(caseClinicalJpegRoute.onUploadComplete({ metadata, file })).resolves.toEqual({ uploadGrantId: grantId })
    expect(handoffVerifiedCaseClinicalCallback).toHaveBeenCalledWith({ metadata, file: { key: 'opaque-key' } })
    expect(JSON.stringify(handoffVerifiedCaseClinicalCallback.mock.calls)).not.toContain('https://ufs.sh')
    expect(JSON.stringify(handoffVerifiedCaseClinicalCallback.mock.calls)).not.toContain('patient.jpg')
  })

  it('never returns callback provider URL or key to the LabOS completion response', async () => {
    handoffVerifiedCaseClinicalCallback.mockResolvedValueOnce({ uploadGrantId: grantId })
    const result = await caseClinicalJpegRoute.onUploadComplete({
      metadata: { uploadGrantId: grantId },
      file: { key: 'opaque-key', ufsUrl: 'https://ufs.sh/f/opaque-key' },
    })
    expect(result).toEqual({ uploadGrantId: grantId })
  })
})
