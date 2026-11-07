import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const auth = vi.hoisted(() => vi.fn())
vi.mock('@/modules/labos-files/case-asset-stage.repository', () => ({
  createTransactionStageAuthorizer: () => ({ require: auth }),
}))

import { validateReservedObjectStorageCaseImageV1 } from '@/modules/labos-files/case-image-v1/object-storage'
import { createCaseImageV1EvidenceFinalizer } from '@/modules/labos-files/case-image-v1/finalize'
import { CaseImageV1Rejected, CaseImageV1Unavailable } from '@/modules/labos-files/case-image-v1/validate'
import type { ReservedClinicalGrant } from '@/modules/labos-files/jpeg-r001/grant'

const grant: ReservedClinicalGrant = Object.freeze({
  uploadGrantId: '11111111-1111-4111-8111-111111111111', organizationId: 'org',
  labId: 'lab', caseId: '22222222-2222-4222-8222-222222222222', memberId: 'member',
  provider: 'OBJECT_STORAGE', providerFileKey: 'objects/33333333-3333-4333-8333-333333333333',
  checkedSuffix: 'PNG',
})
const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')
const image = () => sharp({ create: { width: 3, height: 2, channels: 4,
  background: { r: 12, g: 34, b: 56, alpha: 0.5 } } })

function harness(bytes: Buffer, checkedSuffix: 'PNG' | 'WEBP') {
  const retainedGrant = Object.freeze({ ...grant, checkedSuffix })
  const storage = {
    inspect: vi.fn(async () => ({ ok: true as const,
      value: { presence: 'PRESENT' as const, bytes: bytes.length } })),
    retrieve: vi.fn(async () => ({ ok: true as const, value: bytes })),
  }
  const row = {
    id: grant.uploadGrantId, organizationId: 'org', labId: 'lab', createdByMemberId: 'member',
    boundaryId: 'N-FILE-110', purpose: 'case.asset.add.stage', targetType: 'case',
    targetId: grant.caseId, status: 'PENDING', provider: 'OBJECT_STORAGE',
    providerFileKey: grant.providerFileKey, providerFileUrl: null,
    caseClinicalValidatedSuffix: checkedSuffix,
    createdAt: new Date(Date.now() - 60_000), expiresAt: new Date(Date.now() + 600_000),
    uploadedAt: null, consumedAt: null, expiredAt: null, failedAt: null, providerDeletedAt: null,
  }
  const tx = {
    $queryRaw: vi.fn(async (sql: { strings: readonly string[] }) => {
      const text = sql.strings.join(' ')
      if (text.includes('FROM "FileUploadGrant"')) return [{ id: grant.uploadGrantId }]
      if (text.includes('FROM "Case"')) return [{ id: grant.caseId }]
      return [{ now: new Date() }]
    }),
    $executeRaw: vi.fn(async (sql: unknown) => { void sql; return 1 }),
    fileUploadGrant: { findUnique: vi.fn(async () => row),
      updateMany: vi.fn(async () => ({ count: 1 })) },
    member: { findFirst: vi.fn(async () => ({ id: 'member', userId: 'user', role: 'owner' })) },
    objectStorageKeyAllocation: { findUnique: vi.fn(async () => ({
      sourceUploadGrantId: grant.uploadGrantId,
      latestWriteCapabilityExpiresAt: new Date(Date.now() + 120_000),
    })) },
    caseClinicalUploadEvidence: { findUnique: vi.fn(async () => null) },
  }
  const prisma = { $transaction: vi.fn(async (work: (value: typeof tx) => Promise<void>) => work(tx)) }
  const validate = () => validateReservedObjectStorageCaseImageV1(retainedGrant, storage as never)
  const finalize = createCaseImageV1EvidenceFinalizer(prisma as never)
  return { storage, row, tx, validate, finalize }
}

beforeEach(() => auth.mockReset().mockResolvedValue(undefined))

describe('Case Image V1 exact-object completion', () => {
  it.each([
    ['PNG', false], ['WEBP', false], ['WEBP', true],
  ] as const)('persists verified %s with lossless=%s only after full decode', async (format, lossless) => {
    const bytes = format === 'PNG' ? await image().png().toBuffer()
      : await image().webp({ lossless }).toBuffer()
    const h = harness(bytes, format)
    const result = await h.validate()
    expect(result.sha256).toBe(digest(bytes))
    await h.finalize(result)
    expect(h.storage.retrieve).toHaveBeenCalledWith({
      key: grant.providerFileKey, maxBytes: 33_554_432, signal: undefined,
    })
    const insert = h.tx.$executeRaw.mock.calls[0]?.[0] as { strings: string[]; values: unknown[] }
    expect(insert.strings.join(' ')).toContain('CaseClinicalUploadEvidence')
    expect(insert.values).toEqual(expect.arrayContaining([
      format, BigInt(bytes.length), digest(bytes), format === 'PNG'
        ? 'CASE_PNG_V1_SHARP_1' : 'CASE_WEBP_V1_SHARP_1',
    ]))
    expect(h.tx.fileUploadGrant.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ status: 'UPLOADED' }),
    }))
  })

  it('rejects wrong suffix and never writes evidence', async () => {
    const bytes = await image().png().toBuffer()
    const h = harness(bytes, 'WEBP')
    await expect(h.validate()).rejects.toBeInstanceOf(CaseImageV1Rejected)
    expect(h.tx.$executeRaw).not.toHaveBeenCalled()
  })

  it('keeps retrieval uncertainty and decoder failure out of evidence', async () => {
    const bytes = await image().png().toBuffer()
    const h = harness(bytes, 'PNG')
    h.storage.inspect.mockResolvedValueOnce({ ok: true, value: { presence: 'PRESENT',
      bytes: bytes.length + 1 } } as never)
    await expect(h.validate()).rejects.toBeInstanceOf(CaseImageV1Unavailable)
    expect(h.tx.$executeRaw).not.toHaveBeenCalled()
  })

  it('rechecks grant, allocation and authorization before evidence', async () => {
    const bytes = await image().png().toBuffer()
    const h = harness(bytes, 'PNG')
    const result = await h.validate()
    h.tx.objectStorageKeyAllocation.findUnique.mockResolvedValueOnce(null as never)
    await expect(h.finalize(result)).rejects.toBeInstanceOf(CaseImageV1Unavailable)
    expect(h.tx.$executeRaw).not.toHaveBeenCalled()
  })

  it.each([
    ['organization', { organizationId: 'foreign' }],
    ['laboratory', { labId: 'foreign' }],
    ['Case', { targetId: 'foreign' }],
    ['status', { status: 'UPLOADED' }],
    ['object key', { providerFileKey: 'objects/replaced' }],
  ])('denies changed %s before evidence', async (_name, change) => {
    const bytes = await image().png().toBuffer()
    const h = harness(bytes, 'PNG')
    const result = await h.validate()
    Object.assign(h.row, change)
    await expect(h.finalize(result)).rejects.toBeInstanceOf(CaseImageV1Unavailable)
    expect(h.tx.$executeRaw).not.toHaveBeenCalled()
  })

  it('denies authorization failure and preexisting evidence', async () => {
    const bytes = await image().png().toBuffer()
    const h = harness(bytes, 'PNG')
    const result = await h.validate()
    auth.mockRejectedValueOnce(new Error('denied'))
    await expect(h.finalize(result)).rejects.toBeInstanceOf(CaseImageV1Unavailable)
    expect(h.tx.$executeRaw).not.toHaveBeenCalled()
    h.tx.caseClinicalUploadEvidence.findUnique.mockResolvedValueOnce({ uploadGrantId: grant.uploadGrantId } as never)
    await expect(h.finalize(result)).rejects.toBeInstanceOf(CaseImageV1Unavailable)
    expect(h.tx.$executeRaw).not.toHaveBeenCalled()
  })

  it('fails the atomic transition when the conditional update loses', async () => {
    const bytes = await image().png().toBuffer()
    const h = harness(bytes, 'PNG')
    const result = await h.validate()
    h.tx.fileUploadGrant.updateMany.mockResolvedValueOnce({ count: 0 })
    await expect(h.finalize(result)).rejects.toBeInstanceOf(CaseImageV1Unavailable)
    expect(h.tx.$executeRaw).toHaveBeenCalledOnce()
  })
})
