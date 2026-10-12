import { createHash } from 'node:crypto'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  retained: new WeakMap<object, unknown>(),
  requireStage: vi.fn(),
}))
vi.mock('@/modules/labos-files/jpeg-s001/validate', () => ({
  getRetainedS001Context: (result: object) => {
    const value = mocks.retained.get(result)
    if (!value) throw new Error('unretained')
    return value
  },
}))
vi.mock('@/modules/labos-files/case-asset-stage.repository', () => ({
  createTransactionStageAuthorizer: () => ({ require: mocks.requireStage }),
}))

import { createS001ClinicalEvidenceFinalizer } from '@/modules/labos-files/jpeg-s001/finalize'
import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'
import type { ValidatedClinicalJpegS001 } from '@/modules/labos-files/jpeg-s001/core'

const grantId = '11111111-1111-4111-8111-111111111111'
const caseId = '22222222-2222-4222-8222-222222222222'
const original = Buffer.from('synthetic encoded bytes')
const digest = createHash('sha256').update(original).digest('hex')
const completion = new Date('2026-10-04T12:01:00.000Z')
const now = new Date('2026-10-04T12:02:00.000Z')

function fixture(suffix: 'JPG' | 'JPEG' = 'JPG') {
  const result: ValidatedClinicalJpegS001 = Object.freeze({
    validationProfile: S001_CODEC_MANIFEST.profile,
    validatorVersion: S001_CODEC_MANIFEST.validatorVersion,
    codecBackend: S001_CODEC_MANIFEST.backend,
    codecPackageVersion: S001_CODEC_MANIFEST.packageVersion,
    codecLibraryVersion: S001_CODEC_MANIFEST.libraryVersion,
    codecRuntimeSha256: S001_CODEC_MANIFEST.librarySha256,
    encodedBytes: original.length, sha256: digest, width: 16, height: 12,
    sourceComponents: 3, isProgressive: false,
  })
  const retainedGrant = Object.freeze({
    uploadGrantId: grantId, organizationId: 'org', labId: 'lab', caseId,
    memberId: 'member', provider: 'UPLOADTHING' as const,
    providerFileKey: 'opaque-key', checkedSuffix: suffix,
  })
  mocks.retained.set(result, Object.freeze({
    grant: retainedGrant, original, validatedAtEpochMs: completion.getTime(),
  }))
  const grant = {
    id: grantId, organizationId: 'org', labId: 'lab', createdByMemberId: 'member',
    boundaryId: 'N-FILE-110', purpose: 'case.asset.add.stage', targetType: 'case',
    targetId: caseId, status: 'PENDING', provider: 'UPLOADTHING',
    providerFileKey: 'opaque-key', providerFileUrl: null,
    caseClinicalValidatedSuffix: suffix as 'JPG' | 'JPEG' | null,
    createdAt: new Date('2026-10-04T12:00:00.000Z'),
    expiresAt: new Date('2026-10-04T12:15:00.000Z'),
    uploadedAt: null, consumedAt: null, expiredAt: null, failedAt: null,
    providerDeletedAt: null,
  }
  const order: string[] = []
  const tx = {
    $executeRaw: vi.fn(async () => { order.push('evidence'); return 1 }),
    $queryRaw: vi.fn(async (sql: { strings: readonly string[] }) => {
      const text = sql.strings.join(' ')
      if (text.includes('FROM "FileUploadGrant"')) { order.push('grant-lock'); return [{ id: grantId }] }
      if (text.includes('clock_timestamp()')) { order.push('clock'); return [{ now }] }
      if (text.includes('FROM "Case"')) { order.push('case-lock'); return [{ id: caseId }] }
      throw new Error('unexpected SQL')
    }),
    fileUploadGrant: {
      findUnique: vi.fn(async () => { order.push('grant-read'); return grant }),
      updateMany: vi.fn(async () => { order.push('transition'); return { count: 1 } }),
    },
    caseClinicalUploadEvidence: {
      findUnique: vi.fn(async () => null),
      create: vi.fn(async () => { order.push('evidence'); return { uploadGrantId: grantId } }),
    },
    member: { findFirst: vi.fn(async () => ({ id: 'member', userId: 'user', role: 'owner' })) },
    lab: { findFirst: vi.fn(async () => ({ id: 'lab' })) },
  }
  const prisma = { $transaction: vi.fn(async (fn: (t: typeof tx) => Promise<void>) => fn(tx)) }
  const finalize = createS001ClinicalEvidenceFinalizer(prisma as unknown as Parameters<typeof createS001ClinicalEvidenceFinalizer>[0])
  return { result, retainedGrant, grant, tx, prisma, finalize, order }
}

beforeEach(() => { mocks.requireStage.mockReset().mockResolvedValue(undefined) })

describe('S001 clinical evidence finalizer', () => {
  it('requires private retained context before database access', async () => {
    const h = fixture()
    const forged = Object.freeze({ ...h.result })
    await expect(h.finalize(forged)).rejects.toThrow('Clinical JPEG unavailable')
    expect(h.prisma.$transaction).not.toHaveBeenCalled()
  })

  it('locks and freshly authorizes, inserts exact S001 evidence, then conditionally transitions', async () => {
    const h = fixture('JPEG')
    await expect(h.finalize(h.result)).resolves.toBeUndefined()
    expect(h.order).toEqual(['grant-lock', 'grant-read', 'clock', 'case-lock', 'evidence', 'transition'])
    expect(mocks.requireStage).toHaveBeenCalledWith(expect.objectContaining({
      boundaryId: 'N-FILE-110', permission: 'case.asset.add', target: { type: 'case', id: caseId },
    }))
    const data = (h.tx.caseClinicalUploadEvidence.create.mock.calls as unknown as Array<[{ data: Record<string, unknown> }]>)[0]![0].data
    expect(data).toEqual({
      uploadGrantId: grantId, organizationId: 'org', labId: 'lab', caseId,
      provider: 'UPLOADTHING', providerObjectKey: 'opaque-key',
      clinicalPurpose: 'CLINICAL_REFERENCE_PHOTOGRAPH', verifiedFormat: 'JPEG',
      validatedSuffix: 'JPEG', measuredSizeBytes: BigInt(original.length),
      width: 16, height: 12, contentSha256: digest,
      validationProfile: 'JPEG_CLINICAL_V1_S001',
      validatorVersion: 'LABOS_S001_JULUSIAN_V1',
      codecBackend: 'JULUSIAN_TURBOJPEG', codecPackageVersion: '3.0.1',
      codecLibraryVersion: '3.1.3', codecRuntimeSha256: S001_CODEC_MANIFEST.librarySha256,
      sourceComponents: 3, isProgressive: false, validatedAt: completion,
    })
    expect(Object.keys(data).join(',')).not.toMatch(/providerFileUrl|filename|diagnostic|nativePath/)
    expect(h.tx.fileUploadGrant.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: grantId, status: 'PENDING',
        providerFileKey: 'opaque-key', caseClinicalValidatedSuffix: 'JPEG' }),
      data: { status: 'UPLOADED', uploadedAt: now },
    }))
  })

  it.each([
    ['missing grant', (h: ReturnType<typeof fixture>) => h.tx.fileUploadGrant.findUnique.mockResolvedValue(null as never)],
    ['wrong boundary', (h: ReturnType<typeof fixture>) => { h.grant.boundaryId = 'other' }],
    ['wrong purpose', (h: ReturnType<typeof fixture>) => { h.grant.purpose = 'other' }],
    ['wrong target', (h: ReturnType<typeof fixture>) => { h.grant.targetId = 'other' }],
    ['wrong tenant', (h: ReturnType<typeof fixture>) => { h.grant.organizationId = 'other' }],
    ['wrong Lab', (h: ReturnType<typeof fixture>) => { h.grant.labId = 'other' }],
    ['wrong creator', (h: ReturnType<typeof fixture>) => { h.grant.createdByMemberId = 'other' }],
    ['wrong provider', (h: ReturnType<typeof fixture>) => { h.grant.provider = 'other' }],
    ['wrong provider key', (h: ReturnType<typeof fixture>) => { h.grant.providerFileKey = 'other' }],
    ['null suffix', (h: ReturnType<typeof fixture>) => { h.grant.caseClinicalValidatedSuffix = null }],
    ['changed suffix', (h: ReturnType<typeof fixture>) => { h.grant.caseClinicalValidatedSuffix = 'JPEG' }],
    ['already uploaded', (h: ReturnType<typeof fixture>) => { h.grant.status = 'UPLOADED' }],
    ['expired', (h: ReturnType<typeof fixture>) => { h.grant.expiresAt = now }],
    ['ineligible Case', (h: ReturnType<typeof fixture>) => { h.tx.$queryRaw.mockImplementation(async () => []) }],
    ['missing member', (h: ReturnType<typeof fixture>) => h.tx.member.findFirst.mockResolvedValue(null as never)],
    ['missing Lab', (h: ReturnType<typeof fixture>) => h.tx.lab.findFirst.mockResolvedValue(null as never)],
    ['conflicting evidence', (h: ReturnType<typeof fixture>) => h.tx.caseClinicalUploadEvidence.findUnique.mockResolvedValue({ uploadGrantId: grantId } as never)],
  ] as const)('rejects %s before evidence insert', async (_name, mutate) => {
    const h = fixture()
    mutate(h)
    await expect(h.finalize(h.result)).rejects.toThrow('Clinical JPEG unavailable')
    expect(h.tx.caseClinicalUploadEvidence.create).not.toHaveBeenCalled()
    expect(h.tx.fileUploadGrant.updateMany).not.toHaveBeenCalled()
  })

  it('rejects revoked transaction-fresh authorization before evidence', async () => {
    const h = fixture()
    mocks.requireStage.mockRejectedValueOnce(new Error('sensitive authorization detail'))
    await expect(h.finalize(h.result)).rejects.toThrow('Clinical JPEG unavailable')
    expect(h.tx.caseClinicalUploadEvidence.create).not.toHaveBeenCalled()
  })

  it('rejects an evidence insert, transition loss, or transaction exception generically', async () => {
    const h1 = fixture(); h1.tx.caseClinicalUploadEvidence.create.mockRejectedValueOnce(new Error('database secret'))
    await expect(h1.finalize(h1.result)).rejects.toThrow('Clinical JPEG unavailable')
    expect(h1.tx.fileUploadGrant.updateMany).not.toHaveBeenCalled()
    const h2 = fixture(); h2.tx.fileUploadGrant.updateMany.mockResolvedValueOnce({ count: 0 })
    await expect(h2.finalize(h2.result)).rejects.toThrow('Clinical JPEG unavailable')
    const h3 = fixture(); h3.prisma.$transaction.mockRejectedValueOnce(new Error('database secret'))
    await expect(h3.finalize(h3.result)).rejects.toThrow('Clinical JPEG unavailable')
  })
})


describe('R2-03 object-storage finalization binding', () => {
  it('uses the stable OBJECT_STORAGE provider and exact key for evidence and one-winner transition', async () => {
    const h = fixture('JPEG')
    const key = 'objects/33333333-3333-4333-8333-333333333333'
    h.grant.provider = 'OBJECT_STORAGE'
    h.grant.providerFileKey = key
    mocks.retained.set(h.result, Object.freeze({ grant: Object.freeze({
      ...h.retainedGrant, provider: 'OBJECT_STORAGE', providerFileKey: key,
    }), original, validatedAtEpochMs: completion.getTime() }))
    await expect(h.finalize(h.result)).resolves.toBeUndefined()
    expect(h.tx.caseClinicalUploadEvidence.create).not.toHaveBeenCalled()
    const insert = (h.tx.$executeRaw.mock.calls as unknown as Array<[{ strings: readonly string[]; values: readonly unknown[] }]>)[0]![0]
    expect(insert.strings.join(' ')).toContain('::timestamptz')
    expect(insert.values).toContain('OBJECT_STORAGE')
    expect(insert.values).toContain(key)
    expect(insert.values).toContain(completion.toISOString())
    expect(insert.values).toContain(digest)
    expect(h.tx.fileUploadGrant.updateMany).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ provider: 'OBJECT_STORAGE', providerFileKey: key,
        status: 'PENDING' }),
    }))
  })
})
