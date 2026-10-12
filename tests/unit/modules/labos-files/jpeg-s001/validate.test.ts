import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  order: [] as string[],
  resolve: vi.fn(),
  identity: vi.fn(),
  retrieve: vi.fn(),
  core: vi.fn(),
}))
vi.mock('@/modules/labos-files/jpeg-r001/grant', () => ({ resolveReservedClinicalGrant: mocks.resolve }))
vi.mock('@/modules/labos-files/jpeg-r001/retrieve', () => ({ retrieveReservedUploadThingBytes: mocks.retrieve }))
vi.mock('@/modules/labos-files/jpeg-s001/identity', async importOriginal => {
  const original = await importOriginal<typeof import('@/modules/labos-files/jpeg-s001/identity')>()
  return { ...original, getS001CodecIdentity: mocks.identity }
})
vi.mock('@/modules/labos-files/jpeg-s001/core', async importOriginal => {
  const original = await importOriginal<typeof import('@/modules/labos-files/jpeg-s001/core')>()
  return { ...original, validateClinicalJpegS001Bytes: mocks.core }
})
vi.mock('@/modules/labos-files/jpeg-s001/admission', async importOriginal => {
  const original = await importOriginal<typeof import('@/modules/labos-files/jpeg-s001/admission')>()
  return { ...original, acquireS001Admission: () => {
    mocks.order.push('admit')
    return original.acquireS001Admission()
  } }
})

import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'
import { getRetainedS001Context, validateReservedClinicalJpegS001, validateReservedObjectStorageClinicalJpegS001 } from '@/modules/labos-files/jpeg-s001/validate'
import { createS001ClinicalEvidenceFinalizer } from '@/modules/labos-files/jpeg-s001/finalize'
import { inspectR001 } from '@/modules/labos-files/jpeg-r001/inspect'

const grantId = '11111111-1111-4111-8111-111111111111'
const grant = Object.freeze({ uploadGrantId: grantId, organizationId: 'org', labId: 'lab',
  caseId: 'case', memberId: 'member', provider: 'UPLOADTHING' as const, providerFileKey: 'opaque-provider-key', checkedSuffix: 'JPEG' as const })
const fixture = () => readFileSync(new URL('./fixtures/baseline.jpg', import.meta.url))
const sha = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')
const bytes = fixture()

function mockResult(original: Buffer) {
  const structure = inspectR001(original)
  return Object.freeze({ validationProfile: S001_CODEC_MANIFEST.profile,
    validatorVersion: S001_CODEC_MANIFEST.validatorVersion, codecBackend: S001_CODEC_MANIFEST.backend,
    codecPackageVersion: S001_CODEC_MANIFEST.packageVersion, codecLibraryVersion: S001_CODEC_MANIFEST.libraryVersion,
    codecRuntimeSha256: S001_CODEC_MANIFEST.librarySha256, encodedBytes: original.length,
    sha256: sha(original), width: structure.width, height: structure.height,
    sourceComponents: structure.components, isProgressive: structure.progressive })
}

beforeEach(() => {
  mocks.order.length = 0
  mocks.resolve.mockReset().mockImplementation(async () => { mocks.order.push('authorize'); return grant })
  mocks.identity.mockReset().mockImplementation(async () => { mocks.order.push('identity'); return { runtimeSha256: S001_CODEC_MANIFEST.librarySha256 } })
  mocks.retrieve.mockReset().mockImplementation(async (key: string) => {
    expect(key).toBe(grant.providerFileKey); mocks.order.push('retrieve'); return bytes
  })
  mocks.core.mockReset().mockImplementation(async (original: Buffer) => {
    expect(original).toBe(bytes); mocks.order.push('core'); return mockResult(original)
  })
})

describe('S001 grant/provider orchestration', () => {
  it('exposes only grant ID and optional signal, then resolves grant, admits, verifies identity, retrieves exact key, and invokes core', async () => {
    const result = await validateReservedClinicalJpegS001(grantId)
    expect(validateReservedClinicalJpegS001.length).toBe(2)
    expect(mocks.order).toEqual(['authorize', 'admit', 'identity', 'retrieve', 'core'])
    expect(mocks.core.mock.calls[0][0]).toBe(bytes)
    expect(getRetainedS001Context(result)).toEqual({ grant, original: bytes, validatedAtEpochMs: expect.any(Number) })
    expect(JSON.stringify(result)).not.toMatch(/opaque-provider-key|providerFileKey|original|url/i)
  })

  it('records completion time only after the byte core succeeds and keeps the checked suffix private', async () => {
    const completion = 1_780_000_000_000
    const now = vi.spyOn(Date, 'now').mockReturnValue(completion)
    try {
      mocks.core.mockImplementationOnce(async (original: Buffer) => {
        expect(now).not.toHaveBeenCalled()
        return mockResult(original)
      })
      const result = await validateReservedClinicalJpegS001(grantId)
      expect(getRetainedS001Context(result)).toMatchObject({ grant: { checkedSuffix: 'JPEG' }, validatedAtEpochMs: completion })
      expect(JSON.stringify(result)).not.toContain('validatedAtEpochMs')
    } finally { now.mockRestore() }
  })

  it('does not retain a cancelled result or fabricate a completion timestamp', async () => {
    const controller = new AbortController()
    const unretained = mockResult(bytes)
    mocks.core.mockImplementationOnce(async () => { controller.abort(); return unretained })
    await expect(validateReservedClinicalJpegS001(grantId, controller.signal)).rejects.toThrow('Clinical JPEG unavailable')
    expect(() => getRetainedS001Context(unretained)).toThrow('Clinical JPEG unavailable')
  })

  it('allows one active request, no waiter, and releases admission', async () => {
    let complete!: (value: Buffer) => void
    mocks.retrieve.mockImplementationOnce(() => new Promise(resolve => { complete = resolve }))
    const first = validateReservedClinicalJpegS001(grantId)
    await vi.waitFor(() => expect(mocks.retrieve).toHaveBeenCalledTimes(1))
    await expect(validateReservedClinicalJpegS001(grantId)).rejects.toThrow('Clinical JPEG unavailable')
    expect(mocks.retrieve).toHaveBeenCalledTimes(1)
    complete(bytes)
    await first
    await expect(validateReservedClinicalJpegS001(grantId)).resolves.toBeDefined()
  })

  it('rejects grant failure before admission or provider access', async () => {
    mocks.resolve.mockRejectedValueOnce(new Error('secret grant'))
    await expect(validateReservedClinicalJpegS001(grantId)).rejects.toThrow('Clinical JPEG unavailable')
    expect(mocks.identity).not.toHaveBeenCalled()
    expect(mocks.retrieve).not.toHaveBeenCalled()
  })

  it('rejects identity failure or mismatch before provider access', async () => {
    mocks.identity.mockRejectedValueOnce(new Error('/native/path'))
    await expect(validateReservedClinicalJpegS001(grantId)).rejects.toThrow('Clinical JPEG unavailable')
    mocks.identity.mockResolvedValueOnce({ runtimeSha256: '0'.repeat(64) })
    await expect(validateReservedClinicalJpegS001(grantId)).rejects.toThrow('Clinical JPEG unavailable')
    expect(mocks.retrieve).not.toHaveBeenCalled()
  })

  for (const stage of ['provider', 'core'] as const) it('releases admission after ' + stage + ' failure', async () => {
    if (stage === 'provider') mocks.retrieve.mockRejectedValueOnce(new Error('secret URL'))
    if (stage === 'core') mocks.core.mockRejectedValueOnce(new Error('native data'))
    await expect(validateReservedClinicalJpegS001(grantId)).rejects.toThrow('Clinical JPEG unavailable')
    await expect(validateReservedClinicalJpegS001(grantId)).resolves.toBeDefined()
  })

  it('does not retain an unreturned core result after core failure', async () => {
    const unreturned = mockResult(bytes)
    mocks.core.mockRejectedValueOnce(new Error('core failure'))
    await expect(validateReservedClinicalJpegS001(grantId)).rejects.toThrow('Clinical JPEG unavailable')
    expect(() => getRetainedS001Context(unreturned)).toThrow('Clinical JPEG unavailable')
  })

  it('rejects retained length mismatch before finalization database access', async () => {
    const bad = Object.freeze({ ...mockResult(bytes), encodedBytes: bytes.length + 1 })
    mocks.core.mockResolvedValueOnce(bad)
    const result = await validateReservedClinicalJpegS001(grantId)
    const prisma = { $transaction: vi.fn() }
    const finalize = createS001ClinicalEvidenceFinalizer(prisma as unknown as Parameters<typeof createS001ClinicalEvidenceFinalizer>[0])
    await expect(finalize(result)).rejects.toThrow('Clinical JPEG unavailable')
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it('detects retained bytes changed after successful orchestration', async () => {
    const original = Buffer.from(bytes)
    mocks.retrieve.mockResolvedValueOnce(original)
    mocks.core.mockResolvedValueOnce(mockResult(original))
    const result = await validateReservedClinicalJpegS001(grantId)
    original[0] ^= 1
    expect(() => getRetainedS001Context(result)).toThrow('Clinical JPEG unavailable')
    const prisma = { $transaction: vi.fn() }
    const finalize = createS001ClinicalEvidenceFinalizer(prisma as unknown as Parameters<typeof createS001ClinicalEvidenceFinalizer>[0])
    await expect(finalize(result)).rejects.toThrow('Clinical JPEG unavailable')
    expect(prisma.$transaction).not.toHaveBeenCalled()
  })

  it('has no persistence, fallback, or exported dependency-injection argument', () => {
    const source = readFileSync(new URL('../../../../../modules/labos-files/jpeg-s001/validate.ts', import.meta.url), 'utf8')
    expect(source).not.toMatch(/sharp|caseClinicalUploadEvidence|generalPrisma|S001ValidationDependencies/i)
  })
})

describe('R2-03 object-storage S001 composition', () => {
  const tenant = { userId: 'user', memberId: 'member', memberRole: 'owner', staffId: null,
    organizationId: 'org', labId: 'lab', lab: { id: 'lab', title: 'Lab', slug: null } }
  const objectGrant = { ...grant, provider: 'OBJECT_STORAGE' as const,
    providerFileKey: 'objects/33333333-3333-4333-8333-333333333333' }
  function storage(size = bytes.length, payload: Uint8Array = bytes) {
    return { inspect: vi.fn(async () => ({ ok: true as const, value: { presence: 'PRESENT' as const, bytes: size } })),
      retrieve: vi.fn(async () => ({ ok: true as const, value: payload })) }
  }
  it('authorizes and retrieves only the exact grant key within the hard bound', async () => {
    mocks.resolve.mockResolvedValueOnce(objectGrant)
    mocks.core.mockImplementationOnce(async (original: Buffer) => mockResult(original))
    const provider = storage()
    const result = await validateReservedObjectStorageClinicalJpegS001(grantId, tenant,
      provider as never, undefined, objectGrant.caseId)
    expect(provider.inspect).toHaveBeenCalledWith(objectGrant.providerFileKey, undefined)
    expect(provider.retrieve).toHaveBeenCalledWith({ key: objectGrant.providerFileKey,
      maxBytes: 33_554_432, signal: undefined })
    expect(getRetainedS001Context(result).grant).toEqual(objectGrant)
  })
  it('denies a mismatched Case before provider retrieval', async () => {
    mocks.resolve.mockResolvedValueOnce(objectGrant)
    const provider = storage()
    await expect(validateReservedObjectStorageClinicalJpegS001(grantId, tenant,
      provider as never, undefined, 'other')).rejects.toThrow('Clinical JPEG unavailable')
    expect(provider.inspect).not.toHaveBeenCalled()
  })
  it('rejects oversized HEAD and mismatched exact retrieval before S001', async () => {
    mocks.resolve.mockResolvedValueOnce(objectGrant)
    const oversized = storage(33_554_433)
    await expect(validateReservedObjectStorageClinicalJpegS001(grantId, tenant,
      oversized as never)).rejects.toThrow('Clinical JPEG unavailable')
    expect(oversized.retrieve).not.toHaveBeenCalled()
    mocks.resolve.mockResolvedValueOnce(objectGrant)
    const mismatch = storage(bytes.length + 1)
    await expect(validateReservedObjectStorageClinicalJpegS001(grantId, tenant,
      mismatch as never)).rejects.toThrow('Clinical JPEG unavailable')
  })
})
