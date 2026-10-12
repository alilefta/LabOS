import { describe, expect, it, vi } from 'vitest'
import { createCaseClinicalCallbackHandoff } from '@/modules/labos-files/case-clinical-callback'
import { createCaseClinicalCallbackRepository } from '@/modules/labos-files/case-clinical-callback.repository'
import { UPLOAD_GRANT_ERROR_CODES } from '@/modules/labos-files/upload-grants'

const grantId = '11111111-1111-4111-8111-111111111111'
const caseId = '22222222-2222-4222-8222-222222222222'
const clock = new Date('2026-09-30T12:00:00.000Z')

function fixture() {
  const grant = {
    id: grantId, organizationId: 'org-a', labId: 'lab-a', createdByMemberId: 'member-a',
    boundaryId: 'N-FILE-110', purpose: 'case.asset.add.stage', targetType: 'case', targetId: caseId,
    status: 'PENDING', provider: 'UPLOADTHING', providerFileKey: null as string | null,
    caseClinicalValidatedSuffix: 'JPG' as 'JPG' | 'JPEG' | null,
    providerFileUrl: null, uploadedAt: null, providerDeletedAt: null,
    expiresAt: new Date('2026-09-30T12:15:00.000Z'),
  }
  const tx = {
    $queryRaw: vi.fn().mockResolvedValueOnce([{ id: grantId }]).mockResolvedValueOnce([{ now: clock }]),
    fileUploadGrant: {
      findUnique: vi.fn().mockImplementation(async () => grant),
      updateMany: vi.fn().mockResolvedValue({ count: 1 }),
    },
    member: { findFirst: vi.fn().mockResolvedValue({ id: 'member-a', userId: 'user-a', role: 'owner' }) },
    lab: { findFirst: vi.fn().mockResolvedValue({ id: 'lab-a' }) },
    case: {
      findFirst: vi.fn().mockResolvedValue({ id: caseId, labId: 'lab-a', lab: { id: 'lab-a', organizationId: 'org-a' }, staffAssignments: [] }),
      findUnique: vi.fn().mockResolvedValue({ id: caseId, labId: 'lab-a', lab: { id: 'lab-a', organizationId: 'org-a' } }),
    },
  }
  const prisma = { $transaction: vi.fn(async (callback: (transaction: typeof tx) => Promise<void>) => callback(tx)) }
  const repository = createCaseClinicalCallbackRepository(prisma as unknown as Parameters<typeof createCaseClinicalCallbackRepository>[0])
  const handoff = createCaseClinicalCallbackHandoff(repository)
  const callback = { metadata: { uploadGrantId: grantId }, file: { key: 'opaque-provider-key' } }
  return { grant, tx, prisma, handoff, callback }
}

describe('Case provider callback key reservation', () => {
  it('reserves only an exact key on the PENDING grant and returns only the grant ID', async () => {
    const h = fixture()
    await expect(h.handoff(h.callback)).resolves.toEqual({ uploadGrantId: grantId })
    expect(h.tx.fileUploadGrant.updateMany).toHaveBeenCalledWith({
      where: expect.objectContaining({
        id: grantId, organizationId: 'org-a', labId: 'lab-a',
        createdByMemberId: 'member-a', boundaryId: 'N-FILE-110', purpose: 'case.asset.add.stage',
        targetType: 'case', targetId: caseId, status: 'PENDING', provider: 'UPLOADTHING',
        providerFileKey: null, providerFileUrl: null, uploadedAt: null,
        caseClinicalValidatedSuffix: 'JPG',
      }),
      data: { providerFileKey: 'opaque-provider-key' },
    })
    expect(h.prisma.$transaction).toHaveBeenCalledWith(expect.any(Function), expect.objectContaining({ isolationLevel: 'Serializable' }))
    const lockSql = (h.tx.$queryRaw.mock.calls[0][0] as { strings: readonly string[] }).strings.join(' ')
    expect(lockSql).toContain('FOR UPDATE')
    expect(h.tx.case.findFirst).toHaveBeenCalledWith(expect.objectContaining({
      where: expect.objectContaining({ id: caseId, labId: 'lab-a', status: 'DRAFT' }),
    }))
    expect(Object.keys(h.tx)).not.toContain('caseClinicalUploadEvidence')
    expect(Object.keys(h.tx)).not.toContain('storedFile')
    expect(Object.keys(h.tx)).not.toContain('caseAssetFile')
  })

  it('acknowledges only same-key replay while live without another mutation', async () => {
    const h = fixture()
    h.grant.providerFileKey = 'opaque-provider-key'
    await expect(h.handoff(h.callback)).resolves.toEqual({ uploadGrantId: grantId })
    expect(h.tx.fileUploadGrant.updateMany).not.toHaveBeenCalled()
  })

  it.each([false, true])('rejects historical null suffix before reservation/replay: %s', async replay => {
    const h = fixture()
    h.grant.caseClinicalValidatedSuffix = null
    if (replay) h.grant.providerFileKey = 'opaque-provider-key'
    await expect(h.handoff(h.callback)).rejects.toMatchObject({ code: UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED })
    expect(h.tx.fileUploadGrant.updateMany).not.toHaveBeenCalled()
  })

  it.each([
    ['expired', (h: ReturnType<typeof fixture>) => { h.grant.expiresAt = clock }],
    ['wrong purpose', (h: ReturnType<typeof fixture>) => { h.grant.purpose = 'catalog.image.create.stage' }],
    ['wrong boundary', (h: ReturnType<typeof fixture>) => { h.grant.boundaryId = 'N-FILE-102' }],
    ['wrong target', (h: ReturnType<typeof fixture>) => { h.grant.targetType = 'dentist' }],
    ['foreign grant', (h: ReturnType<typeof fixture>) => { h.grant.organizationId = 'foreign'; h.tx.member.findFirst.mockResolvedValue(null) }],
    ['missing member', (h: ReturnType<typeof fixture>) => { h.grant.createdByMemberId = null as unknown as string }],
    ['missing Case', (h: ReturnType<typeof fixture>) => { h.tx.case.findFirst.mockResolvedValue(null) }],
    ['wrong Lab', (h: ReturnType<typeof fixture>) => { h.tx.lab.findFirst.mockResolvedValue(null) }],
    ['terminal state', (h: ReturnType<typeof fixture>) => { h.grant.status = 'CONSUMED' }],
    ['different-key replay', (h: ReturnType<typeof fixture>) => { h.grant.providerFileKey = 'other-key' }],
    ['unexpected URL', (h: ReturnType<typeof fixture>) => { h.grant.providerFileUrl = 'https://public.example' as unknown as null }],
  ])('rejects %s without marking UPLOADED', async (_name, mutate) => {
    const h = fixture()
    mutate(h)
    await expect(h.handoff(h.callback)).rejects.toMatchObject({ code: UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED })
    expect(h.tx.fileUploadGrant.updateMany).not.toHaveBeenCalled()
  })

  it('rejects a missing or malformed server metadata envelope before database lookup', async () => {
    const h = fixture()
    for (const input of [
      { metadata: {}, file: { key: 'opaque-provider-key' } },
      { metadata: { uploadGrantId: grantId, organizationId: 'forged' }, file: { key: 'opaque-provider-key' } },
      { metadata: { uploadGrantId: grantId }, file: { key: 'https://public.example/file' } },
      { metadata: { uploadGrantId: grantId }, file: { key: 'opaque-provider-key', url: 'https://public.example' } },
      { metadata: { uploadGrantId: grantId, validatedSuffix: 'JPEG' }, file: { key: 'opaque-provider-key' } },
      { metadata: { uploadGrantId: grantId }, file: { key: 'opaque-provider-key', name: 'clinical.jpeg' } },
      { metadata: { uploadGrantId: grantId }, file: { key: 'opaque-provider-key', type: 'image/jpeg' } },
    ]) {
      await expect(h.handoff(input)).rejects.toMatchObject({ code: UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED })
    }
    expect(h.tx.$queryRaw).not.toHaveBeenCalled()
  })


  it('rejects a revoked Staff assignment before key reservation', async () => {
    const h = fixture()
    h.tx.member.findFirst.mockResolvedValue({ id: 'member-a', userId: 'user-a', role: 'staff' })
    await expect(h.handoff(h.callback)).rejects.toMatchObject({ code: UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED })
    expect(h.tx.fileUploadGrant.updateMany).not.toHaveBeenCalled()
  })

  it('allows a still-assigned Staff member under the same transaction-bound policy', async () => {
    const h = fixture()
    h.tx.member.findFirst.mockResolvedValue({ id: 'member-a', userId: 'user-a', role: 'staff' })
    h.tx.case.findFirst.mockResolvedValue({
      id: caseId, labId: 'lab-a', lab: { id: 'lab-a', organizationId: 'org-a' },
      staffAssignments: [{
        caseId, labId: 'lab-a', staffId: 'staff-a',
        staff: { labId: 'lab-a', isActive: true, memberId: 'member-a',
          member: { id: 'member-a', organizationId: 'org-a' } },
      }],
    })
    await expect(h.handoff(h.callback)).resolves.toEqual({ uploadGrantId: grantId })
    expect(h.tx.fileUploadGrant.updateMany).toHaveBeenCalledOnce()
  })

  it('rejects concurrent reservation loss without clinical evidence or attachment', async () => {
    const h = fixture()
    h.tx.fileUploadGrant.updateMany.mockResolvedValue({ count: 0 })
    await expect(h.handoff(h.callback)).rejects.toMatchObject({ code: UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED })
  })
})
