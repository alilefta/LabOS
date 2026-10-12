import { createHash } from 'node:crypto'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({ requireStage: vi.fn() }))
vi.mock('@/modules/labos-files/case-asset-stage.repository', () => ({
  createTransactionStageAuthorizer: () => ({ require: mocks.requireStage }),
}))

import { createCaseClinicalFirstAttachment } from '@/modules/labos-files/case-clinical-first-attachment'
import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'

const id = '11111111-1111-4111-8111-111111111111'
const caseId = '22222222-2222-4222-8222-222222222222'
const bytes = Buffer.from('synthetic JPEG fixture identity')
const digest = createHash('sha256').update(bytes).digest('hex')
const now = new Date('2026-10-04T12:02:00Z')

function harness() {
  const grant = {
    id, organizationId: 'org', labId: 'lab', createdByMemberId: 'member',
    boundaryId: 'N-FILE-110', purpose: 'case.asset.add.stage', targetType: 'case', targetId: caseId,
    status: 'UPLOADED', provider: 'UPLOADTHING', providerFileKey: 'opaque-key', providerFileUrl: null,
    caseClinicalValidatedSuffix: 'JPG', expiresAt: new Date('2026-10-04T12:15:00Z'),
    uploadedAt: new Date('2026-10-04T12:01:00Z'), consumedAt: null,
    expiredAt: null, failedAt: null, providerDeletedAt: null,
  }
  const evidence = {
    uploadGrantId: id, organizationId: 'org', labId: 'lab', caseId,
    provider: 'UPLOADTHING', providerObjectKey: 'opaque-key', clinicalPurpose: 'CLINICAL_REFERENCE_PHOTOGRAPH',
    verifiedFormat: 'JPEG', validatedSuffix: 'JPG', measuredSizeBytes: BigInt(bytes.length),
    width: 10, height: 8, contentSha256: digest,
    validationProfile: S001_CODEC_MANIFEST.profile, validatorVersion: S001_CODEC_MANIFEST.validatorVersion,
    codecBackend: S001_CODEC_MANIFEST.backend, codecPackageVersion: S001_CODEC_MANIFEST.packageVersion,
    codecLibraryVersion: S001_CODEC_MANIFEST.libraryVersion, codecRuntimeSha256: S001_CODEC_MANIFEST.librarySha256,
    sourceComponents: 3, isProgressive: false, validatedAt: new Date('2026-10-04T12:00:30Z'),
  }
  const order: string[] = []
  const tx = {
    $queryRaw: vi.fn(async (sql: { strings: readonly string[] }) => {
      const statement = sql.strings.join(' ')
      if (statement.includes('FROM "FileUploadGrant"')) { order.push('lock-grant'); return [{ id }] }
      if (statement.includes('FROM "Case"')) { order.push('lock-case'); return [{ id: caseId }] }
      return [{ now }]
    }),
    fileUploadGrant: {
      findUnique: vi.fn(async () => grant),
      updateMany: vi.fn(async () => { order.push('consume'); return { count: 1 } }),
    },
    caseClinicalUploadEvidence: { findUnique: vi.fn(async () => evidence) },
    member: { findFirst: vi.fn(async () => ({ id: 'member', userId: 'user', role: 'owner' })) },
    lab: { findFirst: vi.fn(async () => ({ id: 'lab' })) },
    case: { findFirst: vi.fn(async () => ({ id: caseId })) },
    storedFile: {
      findFirst: vi.fn(async () => null),
      create: vi.fn(async () => { order.push('file'); return { id: 'file' } }),
    },
    caseAssetFile: {
      create: vi.fn(async () => { order.push('asset'); return { id: 'asset' } }),
      update: vi.fn(async () => { order.push('pointer'); return { id: 'asset' } }),
    },
    caseAssetFileVersion: { create: vi.fn(async () => { order.push('version'); return { id: 'version' } }) },
  }
  const prisma = { $transaction: vi.fn(async (fn: (value: typeof tx) => Promise<unknown>) => fn(tx)) }
  const retrieve = vi.fn(async () => bytes)
  const attach = createCaseClinicalFirstAttachment(prisma as never, retrieve)
  return { grant, evidence, tx, prisma, retrieve, attach, order }
}

beforeEach(() => mocks.requireStage.mockReset().mockResolvedValue(undefined))

describe('Case clinical first attachment', () => {
  it('uses the exact reserved key and creates one canonical first asset chain before consumption', async () => {
    const h = harness()
    await expect(h.attach(id)).resolves.toBeUndefined()
    expect(h.retrieve).toHaveBeenCalledExactlyOnceWith('opaque-key')
    expect(h.order).toEqual(['lock-grant', 'lock-case', 'file', 'asset', 'version', 'pointer', 'consume'])
    expect(h.tx.storedFile.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({
      sourceUploadGrantId: id, providerObjectKey: 'opaque-key', providerAccess: 'PUBLIC_READ',
      purpose: 'CASE_CLINICAL_ASSET', sizeBytes: BigInt(bytes.length), checksumValue: digest,
      checksumAlgorithm: 'SHA-256', detectedMimeType: 'image/jpeg', uploaderMemberIdSnapshot: 'member',
    }) }))
    expect(h.tx.caseAssetFile.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({
      dentalCaseId: caseId, storageMode: 'MANAGED_PUBLIC', documentUrl: null, fileExtension: null,
    }) }))
    expect(h.tx.caseAssetFileVersion.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ versionNumber: 1, storedFileId: 'file' }) }))
    expect(h.tx.caseAssetFile.update).toHaveBeenCalledWith(expect.objectContaining({ data: { currentVersionId: 'version' } }))
    expect(h.tx.fileUploadGrant.updateMany).toHaveBeenCalledWith(expect.objectContaining({ data: { status: 'CONSUMED', consumedAt: now } }))
    expect(mocks.requireStage).toHaveBeenCalledTimes(2)
  })

  it.each([
    ['wrong boundary', (h: ReturnType<typeof harness>) => { h.grant.boundaryId = 'other' }],
    ['wrong purpose', (h: ReturnType<typeof harness>) => { h.grant.purpose = 'other' }],
    ['wrong target', (h: ReturnType<typeof harness>) => { h.grant.targetType = 'other' }],
    ['wrong provider', (h: ReturnType<typeof harness>) => { h.grant.provider = 'OTHER' }],
    ['missing uploadedAt', (h: ReturnType<typeof harness>) => { h.grant.uploadedAt = null as never }],
    ['consumed marker', (h: ReturnType<typeof harness>) => { h.grant.consumedAt = now as never }],
    ['expired marker', (h: ReturnType<typeof harness>) => { h.grant.expiredAt = now as never }],
    ['failed marker', (h: ReturnType<typeof harness>) => { h.grant.failedAt = now as never }],
    ['missing evidence', (h: ReturnType<typeof harness>) => { h.tx.caseClinicalUploadEvidence.findUnique.mockResolvedValue(null as never) }],
    ['missing Case', (h: ReturnType<typeof harness>) => { h.tx.case.findFirst.mockResolvedValue(null as never) }],
    ['missing Lab', (h: ReturnType<typeof harness>) => { h.tx.lab.findFirst.mockResolvedValue(null as never) }],
    ['not uploaded', (h: ReturnType<typeof harness>) => { h.grant.status = 'PENDING' }],
    ['missing suffix', (h: ReturnType<typeof harness>) => { h.grant.caseClinicalValidatedSuffix = null as never }],
    ['missing key', (h: ReturnType<typeof harness>) => { h.grant.providerFileKey = null as never }],
    ['unexpected URL', (h: ReturnType<typeof harness>) => { h.grant.providerFileUrl = 'https://wrong' as never }],
    ['deleted provider', (h: ReturnType<typeof harness>) => { h.grant.providerDeletedAt = now as never }],
    ['expired', (h: ReturnType<typeof harness>) => { h.grant.expiresAt = now }],
    ['wrong evidence key', (h: ReturnType<typeof harness>) => { h.evidence.providerObjectKey = 'wrong' }],
    ['wrong S001 identity', (h: ReturnType<typeof harness>) => { h.evidence.codecPackageVersion = 'wrong' as never }],
    ['existing file', (h: ReturnType<typeof harness>) => { h.tx.storedFile.findFirst.mockResolvedValue({ id: 'old' } as never) }],
    ['removed creator', (h: ReturnType<typeof harness>) => { h.tx.member.findFirst.mockResolvedValue(null as never) }],
  ] as const)('rejects %s before provider access', async (_name, mutate) => {
    const h = harness()
    mutate(h)
    await expect(h.attach(id)).rejects.toThrow('Case asset unavailable')
    expect(h.retrieve).not.toHaveBeenCalled()
  })

  it('rejects malformed and missing grant selectors before provider access', async () => {
    const h = harness()
    await expect(h.attach('not-a-uuid')).rejects.toThrow('Case asset unavailable')
    expect(h.prisma.$transaction).not.toHaveBeenCalled()
    h.tx.fileUploadGrant.findUnique.mockResolvedValue(null as never)
    await expect(h.attach(id)).rejects.toThrow('Case asset unavailable')
    expect(h.retrieve).not.toHaveBeenCalled()
  })

  it('rejects a changed evidence identity after retrieval', async () => {
    const h = harness()
    const original = h.evidence.contentSha256
    h.retrieve.mockImplementation(async () => {
      h.tx.caseClinicalUploadEvidence.findUnique.mockResolvedValueOnce({ ...h.evidence, contentSha256: original } as never)
      h.evidence.contentSha256 = 'b'.repeat(64)
      return bytes
    })
    await expect(h.attach(id)).rejects.toThrow('Case asset unavailable')
    expect(h.tx.storedFile.create).not.toHaveBeenCalled()
  })
  it('rejects a wrong size before persistence', async () => {
    const h = harness()
    h.evidence.measuredSizeBytes += BigInt(1)
    await expect(h.attach(id)).rejects.toThrow('Case asset unavailable')
    expect(h.tx.storedFile.create).not.toHaveBeenCalled()
  })
  it('rejects same-size changed bytes', async () => {
    const h = harness()
    h.retrieve.mockResolvedValue(Buffer.from('x'.repeat(bytes.length)))
    await expect(h.attach(id)).rejects.toThrow('Case asset unavailable')
    expect(h.tx.storedFile.create).not.toHaveBeenCalled()
  })
  it('rechecks after network work and fails closed on a stale grant', async () => {
    const h = harness()
    h.retrieve.mockImplementation(async () => { h.grant.status = 'CONSUMED'; return bytes })
    await expect(h.attach(id)).rejects.toThrow('Case asset unavailable')
    expect(h.tx.storedFile.create).not.toHaveBeenCalled()
  })
  it('rejects a different reserved key or checked suffix after retrieval', async () => {
    for (const change of [{ providerFileKey: 'changed-key' }, { caseClinicalValidatedSuffix: 'JPEG' }]) {
      const h = harness()
      h.retrieve.mockImplementation(async () => {
        h.tx.fileUploadGrant.findUnique.mockResolvedValueOnce({ ...h.grant, ...change } as never)
        return bytes
      })
      await expect(h.attach(id)).rejects.toThrow('Case asset unavailable')
      expect(h.tx.storedFile.create).not.toHaveBeenCalled()
    }
  })

  it('rejects a Case that leaves DRAFT after retrieval', async () => {
    const h = harness()
    h.retrieve.mockImplementation(async () => {
      h.tx.case.findFirst.mockResolvedValueOnce(null as never)
      return bytes
    })
    await expect(h.attach(id)).rejects.toThrow('Case asset unavailable')
    expect(h.tx.storedFile.create).not.toHaveBeenCalled()
  })
  it('fails generically when conditional grant consumption loses', async () => {
    const h = harness()
    h.tx.fileUploadGrant.updateMany.mockResolvedValue({ count: 0 })
    await expect(h.attach(id)).rejects.toThrow('Case asset unavailable')
  })
})

describe('R2-04 object-storage first attachment', () => {
  function objectHarness() {
    const h = harness()
    const key = 'objects/33333333-3333-4333-8333-333333333333'
    h.grant.provider = 'OBJECT_STORAGE'
    h.grant.providerFileKey = key
    h.evidence.provider = 'OBJECT_STORAGE'
    h.evidence.providerObjectKey = key
    const storage = { retrieve: vi.fn(async () => ({ ok: true as const, value: bytes })) }
    const attach = createCaseClinicalFirstAttachment(h.prisma as never, h.retrieve,
      () => storage as never)
    return { ...h, key, storage, attach }
  }

  it('uses the semantic bounded second retrieval and writes PRIVATE/MANAGED_PRIVATE atomically', async () => {
    const h = objectHarness()
    await expect(h.attach(id)).resolves.toBeUndefined()
    expect(h.storage.retrieve).toHaveBeenCalledExactlyOnceWith({
      key: h.key, maxBytes: 33_554_432,
    })
    expect(h.retrieve).not.toHaveBeenCalled()
    expect(h.order).toEqual(['lock-grant', 'lock-case', 'file', 'asset', 'version', 'pointer', 'consume'])
    expect(h.tx.storedFile.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        provider: 'OBJECT_STORAGE', providerObjectKey: h.key,
        providerAccess: 'PRIVATE', sourceUploadGrantId: id,
      }),
    }))
    expect(h.tx.caseAssetFile.create).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ storageMode: 'MANAGED_PRIVATE' }),
    }))
    expect(h.tx.fileUploadGrant.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ provider: 'OBJECT_STORAGE', providerFileKey: h.key }),
      data: { status: 'CONSUMED', consumedAt: now },
    }))
  })

  it('fails closed on unavailable, wrong length, wrong SHA and changed grant before writes', async () => {
    for (const mutate of [
      (h: ReturnType<typeof objectHarness>) => h.storage.retrieve.mockResolvedValue({ ok: false, error: { code: 'UNAVAILABLE' } } as never),
      (h: ReturnType<typeof objectHarness>) => h.storage.retrieve.mockResolvedValue({ ok: true, value: bytes.subarray(1) } as never),
      (h: ReturnType<typeof objectHarness>) => h.storage.retrieve.mockResolvedValue({ ok: true, value: Buffer.from('x'.repeat(bytes.length)) } as never),
      (h: ReturnType<typeof objectHarness>) => h.storage.retrieve.mockImplementation(async () => {
        h.grant.status = 'CONSUMED'; return { ok: true as const, value: bytes }
      }),
    ]) {
      const h = objectHarness()
      mutate(h)
      await expect(h.attach(id)).rejects.toThrow('Case asset unavailable')
      expect(h.tx.storedFile.create).not.toHaveBeenCalled()
      expect(h.retrieve).not.toHaveBeenCalled()
    }
  })
})
