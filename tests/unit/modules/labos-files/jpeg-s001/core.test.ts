import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as turbo from '@julusian/jpeg-turbo'

const identityMock = vi.hoisted(() => vi.fn())
vi.mock('@/modules/labos-files/jpeg-s001/identity', async importOriginal => {
  const original = await importOriginal<typeof import('@/modules/labos-files/jpeg-s001/identity')>()
  return { ...original, getS001CodecIdentity: identityMock }
})

import { validateClinicalJpegS001Bytes } from '@/modules/labos-files/jpeg-s001/core'
import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'
import { getRetainedS001Context } from '@/modules/labos-files/jpeg-s001/validate'
import { createS001ClinicalEvidenceFinalizer } from '@/modules/labos-files/jpeg-s001/finalize'

const fixture = (name: string) => readFileSync(new URL('./fixtures/' + name + '.jpg', import.meta.url))
const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')

beforeEach(() => {
  identityMock.mockReset()
  identityMock.mockResolvedValue({ codec: turbo, runtimeSha256: S001_CODEC_MANIFEST.librarySha256 })
})

describe('production S001 byte core', () => {
  for (const [name, components, progressive] of [
    ['baseline', 3, false], ['progressive', 3, true], ['grayscale', 1, false],
  ] as const) it('fully decodes ' + name + ' and returns narrow structural facts', async () => {
    const bytes = fixture(name)
    const result = await validateClinicalJpegS001Bytes(bytes)
    expect(identityMock).toHaveBeenCalledTimes(1)
    expect(result).toMatchObject({ validationProfile: 'JPEG_CLINICAL_V1_S001',
      validatorVersion: 'LABOS_S001_JULUSIAN_V1', codecBackend: 'JULUSIAN_TURBOJPEG',
      codecPackageVersion: '3.0.1', codecLibraryVersion: '3.1.3',
      codecRuntimeSha256: S001_CODEC_MANIFEST.librarySha256, encodedBytes: bytes.length,
      sha256: sha(bytes), sourceComponents: components, isProgressive: progressive })
    expect(Object.isFrozen(result)).toBe(true)
    expect(Object.keys(result)).toHaveLength(12)
    expect(() => getRetainedS001Context(result)).toThrow('Clinical JPEG unavailable')
  })

  it('does not let a direct synthetic byte-core result enter finalization', async () => {
    const result = await validateClinicalJpegS001Bytes(fixture('baseline'))
    const prisma = { $transaction: vi.fn() }
    const finalize = createS001ClinicalEvidenceFinalizer(prisma as unknown as Parameters<typeof createS001ClinicalEvidenceFinalizer>[0])
    await expect(finalize(result)).rejects.toThrow('Clinical JPEG unavailable')
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it('rejects missing or mismatched runtime identity', async () => {
    identityMock.mockRejectedValueOnce(new Error('/native/private/path'))
    await expect(validateClinicalJpegS001Bytes(fixture('baseline'))).rejects.toThrow('Clinical JPEG unavailable')
    identityMock.mockResolvedValueOnce({ codec: turbo, runtimeSha256: '0'.repeat(64) })
    await expect(validateClinicalJpegS001Bytes(fixture('baseline'))).rejects.toThrow('Clinical JPEG unavailable')
  })

  for (const bytes of [null, Buffer.alloc(0), Buffer.alloc(33_554_433)])
    it('rejects non-Buffer, empty or oversized original bytes', async () => {
      await expect(validateClinicalJpegS001Bytes(bytes as Buffer)).rejects.toThrow('Clinical JPEG unavailable')
      expect(identityMock).not.toHaveBeenCalled()
    })

  it('rejects structural failure', async () => {
    const bytes = Buffer.concat([fixture('baseline'), Buffer.from([1])])
    await expect(validateClinicalJpegS001Bytes(bytes)).rejects.toThrow('Clinical JPEG unavailable')
  })

  it('rejects decoder failure without fallback', async () => {
    const codec = { ...turbo, decompressSync: vi.fn(() => { throw new Error('native diagnostics') }) }
    identityMock.mockResolvedValueOnce({ codec, runtimeSha256: S001_CODEC_MANIFEST.librarySha256 })
    await expect(validateClinicalJpegS001Bytes(fixture('baseline'))).rejects.toThrow('Clinical JPEG unavailable')
  })

  for (const mismatch of ['width', 'height', 'format', 'reportedSize', 'outputLength'] as const)
    it('rejects decoded ' + mismatch + ' mismatch', async () => {
      const codec = { ...turbo, decompressSync: vi.fn((bytes: Buffer, options: Parameters<typeof turbo.decompressSync>[1]) => {
        const value = turbo.decompressSync(bytes, options)
        if (mismatch === 'width') return { ...value, width: value.width + 1 }
        if (mismatch === 'height') return { ...value, height: value.height + 1 }
        if (mismatch === 'format') return { ...value, format: -1 }
        if (mismatch === 'reportedSize') return { ...value, size: value.size - 1 }
        return { ...value, data: value.data.subarray(0, value.data.length - 1) }
      }) }
      identityMock.mockResolvedValueOnce({ codec, runtimeSha256: S001_CODEC_MANIFEST.librarySha256 })
      await expect(validateClinicalJpegS001Bytes(fixture('baseline'))).rejects.toThrow('Clinical JPEG unavailable')
    })

  it('rejects post-decode mutation of the same original Buffer', async () => {
    const codec = { ...turbo, decompressSync: vi.fn((bytes: Buffer, options: Parameters<typeof turbo.decompressSync>[1]) => {
      const result = turbo.decompressSync(bytes, options)
      bytes[0] ^= 1
      return result
    }) }
    identityMock.mockResolvedValueOnce({ codec, runtimeSha256: S001_CODEC_MANIFEST.librarySha256 })
    await expect(validateClinicalJpegS001Bytes(fixture('baseline'))).rejects.toThrow('Clinical JPEG unavailable')
  })

  it('uses only the approved package/backend/profile and no persistence or Sharp fallback', () => {
    expect(S001_CODEC_MANIFEST).toMatchObject({ profile: 'JPEG_CLINICAL_V1_S001',
      validatorVersion: 'LABOS_S001_JULUSIAN_V1', backend: 'JULUSIAN_TURBOJPEG',
      packageVersion: '3.0.1', libraryVersion: '3.1.3' })
    const source = readFileSync(new URL('../../../../../modules/labos-files/jpeg-s001/core.ts', import.meta.url), 'utf8')
    expect(source).not.toMatch(/sharp|caseClinicalUploadEvidence|generalPrisma/i)
  })
})
