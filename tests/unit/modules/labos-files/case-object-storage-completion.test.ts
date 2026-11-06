import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  resolve: vi.fn(), jpeg: vi.fn(), image: vi.fn(), jpegFinalize: vi.fn(),
  imageFinalize: vi.fn(), rejectJpeg: vi.fn(),
}))
vi.mock('@/platform/organizations', () => ({ requireTenantContext: async () => ({
  userId: 'user', memberId: 'member', organizationId: 'org', labId: 'lab',
}) }))
vi.mock('@/modules/labos-files/jpeg-r001/grant', () => ({ resolveReservedClinicalGrant: mocks.resolve }))
vi.mock('@/modules/labos-files/jpeg-s001/validate', () => ({
  validateReservedObjectStorageClinicalJpegS001: mocks.jpeg,
  DefinitiveCaseS001Rejection: class extends Error {},
}))
vi.mock('@/modules/labos-files/jpeg-s001/finalize', () => ({ finalizeValidatedClinicalJpegS001: mocks.jpegFinalize }))
vi.mock('@/modules/labos-files/jpeg-s001/reject-case', () => ({ rejectDefinitiveCaseS001: mocks.rejectJpeg }))
vi.mock('@/modules/labos-files/case-image-v1/object-storage', () => ({
  validateReservedObjectStorageCaseImageV1: mocks.image,
}))
vi.mock('@/modules/labos-files/case-image-v1/finalize', () => ({ finalizeValidatedCaseImageV1: mocks.imageFinalize }))

import { completeCaseObjectStorageUpload } from '@/modules/labos-files/case-object-storage-completion'
import { CaseImageV1Rejected, CaseImageV1Unavailable } from '@/modules/labos-files/case-image-v1/validate'

const id = '11111111-1111-4111-8111-111111111111'
const storage = {} as never

beforeEach(() => {
  for (const mock of Object.values(mocks)) mock.mockReset()
  mocks.resolve.mockResolvedValue({ uploadGrantId: id, caseId: 'case', checkedSuffix: 'JPG',
    provider: 'OBJECT_STORAGE' })
  mocks.jpeg.mockResolvedValue({ jpeg: true })
  mocks.image.mockResolvedValue({ image: true })
})

describe('Case object-storage format dispatch', () => {
  it('keeps JPEG on the unchanged S001 finalization path', async () => {
    await expect(completeCaseObjectStorageUpload(id, storage)).resolves.toEqual({ uploadGrantId: id })
    expect(mocks.jpeg).toHaveBeenCalledOnce()
    expect(mocks.jpegFinalize).toHaveBeenCalledWith({ jpeg: true })
    expect(mocks.image).not.toHaveBeenCalled()
  })

  it.each(['PNG', 'WEBP'])('routes %s to original-byte validation and image evidence', async suffix => {
    const grant = { uploadGrantId: id, caseId: 'case', checkedSuffix: suffix, provider: 'OBJECT_STORAGE' }
    mocks.resolve.mockResolvedValue(grant)
    await expect(completeCaseObjectStorageUpload(id, storage, undefined, 'case'))
      .resolves.toEqual({ uploadGrantId: id })
    expect(mocks.resolve).toHaveBeenCalledWith(id, undefined, expect.objectContaining({
      provider: 'OBJECT_STORAGE', allowCaseImageV1: true,
    }))
    expect(mocks.image).toHaveBeenCalledWith(grant, storage, undefined)
    expect(mocks.imageFinalize).toHaveBeenCalledWith({ image: true })
    expect(mocks.jpeg).not.toHaveBeenCalled()
  })

  it.each([new CaseImageV1Rejected(), new CaseImageV1Unavailable()])(
    'does not finalize after PNG validation failure', async error => {
      mocks.resolve.mockResolvedValue({ uploadGrantId: id, caseId: 'case', checkedSuffix: 'PNG' })
      mocks.image.mockRejectedValue(error)
      await expect(completeCaseObjectStorageUpload(id, storage)).rejects.toBe(error)
      expect(mocks.imageFinalize).not.toHaveBeenCalled()
      expect(mocks.rejectJpeg).not.toHaveBeenCalled()
    },
  )

  it('denies a wrong Case before provider work', async () => {
    await expect(completeCaseObjectStorageUpload(id, storage, undefined, 'other')).rejects.toThrow()
    expect(mocks.jpeg).not.toHaveBeenCalled()
    expect(mocks.image).not.toHaveBeenCalled()
  })
})
