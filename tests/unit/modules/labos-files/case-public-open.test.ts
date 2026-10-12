import { describe, expect, it, vi } from 'vitest'
import { createCasePublicOpen, CasePublicOpenUnavailableError } from '@/modules/labos-files/case-public-open'

const caseId = '11111111-1111-4111-8111-111111111111'
const assetId = '22222222-2222-4222-8222-222222222222'
const tenant = { userId: 'u', memberId: 'm', memberRole: 'owner', staffId: null, organizationId: 'org', labId: 'lab', lab: { id: 'lab', title: 'Lab', slug: null } }
const selector = { caseId, assetId }

function row() {
  return { id: caseId, labId: 'lab', caseAssetFiles: [{
    id: assetId, dentalCaseId: caseId, labId: 'lab', storageMode: 'MANAGED_PUBLIC',
    clinicalPurpose: 'CLINICAL_REFERENCE_PHOTOGRAPH', documentUrl: null, fileExtension: null, currentVersionId: 'v',
    currentVersion: { id: 'v', caseAssetFileId: assetId, organizationId: 'org', labId: 'lab', storedFileId: 'f',
      storedFile: { id: 'f', organizationId: 'org', labId: 'lab', provider: 'UPLOADTHING', providerObjectKey: 'key',
        providerAccess: 'PUBLIC_READ', purpose: 'CASE_CLINICAL_ASSET', sourceUploadGrantId: 'g',
        sourceGrant: { id: 'g', organizationId: 'org', labId: 'lab', provider: 'UPLOADTHING', providerFileKey: 'key',
          targetType: 'case', targetId: caseId, status: 'CONSUMED',
          clinicalUploadEvidence: { uploadGrantId: 'g', organizationId: 'org', labId: 'lab', caseId,
            provider: 'UPLOADTHING', providerObjectKey: 'key', clinicalPurpose: 'CLINICAL_REFERENCE_PHOTOGRAPH' },
        },
      },
    },
  }] }
}

function harness(value: unknown = row()) {
  const authorize = vi.fn().mockResolvedValue({ correlationId: 'c' })
  const find = vi.fn().mockResolvedValue(value)
  const publicUrl = vi.fn().mockResolvedValue('https://public.example/file')
  const open = createCasePublicOpen({ tenant: vi.fn().mockResolvedValue(tenant), authorize, find, publicUrl } as unknown as Parameters<typeof createCasePublicOpen>[0])
  return { open, authorize, find, publicUrl }
}

describe('Case public opening', () => {
  it('authorizes before lookup and resolves only the persisted key', async () => {
    const h = harness()
    await expect(h.open(selector)).resolves.toBe('https://public.example/file')
    expect(h.find).toHaveBeenCalledWith(caseId, assetId, 'org', 'lab')
    expect(h.publicUrl).toHaveBeenCalledWith('key')
    expect(h.authorize.mock.invocationCallOrder[0]).toBeLessThan(h.find.mock.invocationCallOrder[0])
    expect(h.find.mock.invocationCallOrder[0]).toBeLessThan(h.publicUrl.mock.invocationCallOrder[0])
  })

  it('never looks up the asset or provider after Case-read denial', async () => {
    const h = harness()
    h.authorize.mockRejectedValueOnce(new Error('denied'))
    await expect(h.open(selector)).rejects.toBeInstanceOf(CasePublicOpenUnavailableError)
    expect(h.find).not.toHaveBeenCalled()
    expect(h.publicUrl).not.toHaveBeenCalled()
  })

  it.each([
    ['missing Case', () => null],
    ['missing asset', () => ({ ...row(), caseAssetFiles: [] })],
    ['foreign asset', () => { const r = row(); r.caseAssetFiles[0].dentalCaseId = 'foreign'; return r }],
    ['private mode', () => { const r = row(); r.caseAssetFiles[0].storageMode = 'MANAGED_PRIVATE'; return r }],
    ['null access', () => { const r = row(); r.caseAssetFiles[0].currentVersion.storedFile.providerAccess = null as unknown as string; return r }],
    ['private access', () => { const r = row(); r.caseAssetFiles[0].currentVersion.storedFile.providerAccess = 'PRIVATE'; return r }],
    ['missing version', () => { const r = row(); r.caseAssetFiles[0].currentVersion = null as unknown as typeof r.caseAssetFiles[0]['currentVersion']; return r }],
    ['missing key', () => { const r = row(); r.caseAssetFiles[0].currentVersion.storedFile.providerObjectKey = ''; return r }],
    ['wrong grant', () => { const r = row(); r.caseAssetFiles[0].currentVersion.storedFile.sourceGrant.id = 'foreign'; return r }],

    ['wrong Case evidence', () => { const r = row(); r.caseAssetFiles[0].currentVersion.storedFile.sourceGrant.clinicalUploadEvidence.caseId = 'foreign'; return r }],
    ['wrong key evidence', () => { const r = row(); r.caseAssetFiles[0].currentVersion.storedFile.sourceGrant.clinicalUploadEvidence.providerObjectKey = 'foreign'; return r }],
    ['foreign file tenant', () => { const r = row(); r.caseAssetFiles[0].currentVersion.storedFile.organizationId = 'foreign'; return r }],
    ['legacy URL retained', () => { const r = row(); r.caseAssetFiles[0].documentUrl = 'https://legacy.example' as unknown as null; return r }],
  ])('rejects %s without provider lookup', async (_name, makeRow) => {
    const h = harness(makeRow())
    await expect(h.open(selector)).rejects.toBeInstanceOf(CasePublicOpenUnavailableError)
    expect(h.publicUrl).not.toHaveBeenCalled()
  })

  it.each(['UPLOADED', 'PENDING', 'EXPIRED', 'FAILED', 'CLEANED'] as const)('rejects %s source grants', async (status) => {
    const r = row()
    r.caseAssetFiles[0].currentVersion.storedFile.sourceGrant.status = status
    const h = harness(r)
    await expect(h.open(selector)).rejects.toBeInstanceOf(CasePublicOpenUnavailableError)
    expect(h.publicUrl).not.toHaveBeenCalled()
  })
  it('rejects additional client authority fields', async () => {
    const h = harness()
    await expect(h.open({ ...selector, providerObjectKey: 'other' } as typeof selector)).rejects.toBeInstanceOf(CasePublicOpenUnavailableError)
    expect(h.authorize).toHaveBeenCalledOnce()
    expect(h.find).not.toHaveBeenCalled()
  })
})


describe('public open uses the existing C1 Case-read policy', () => {
  it.each([
    ['owner', true, true],
    ['admin', true, true],
    ['manager', true, true],
    ['staff', true, true],
    ['staff', false, false],
  ])('%s with assignment=%s is allowed=%s', async (role, assigned, allowed) => {
    const { createLabOSAuthorizationService } = await import('@/modules/labos-authorization/service')
    const { createOperationalPolicies } = await import('@/modules/labos-authorization/policies/operational.policies')
    const { authorizeCaseDetailRead } = await import('@/modules/labos-authorization/case-detail-read.authorization')
    const service = createLabOSAuthorizationService({
      targetResolvers: { case: { resolveOrganizationId: vi.fn().mockResolvedValue('org') } },
      policies: createOperationalPolicies({
        caseReadFacts: { load: vi.fn().mockResolvedValue({
          caseId, labId: 'lab', organizationId: 'org', relationshipsConsistent: true, hasActiveMemberAssignment: assigned,
        }) },
        dentistReadFacts: { load: vi.fn() },
      }),
      monitor: { record: vi.fn() },
    })
    const h = harness()
    const open = createCasePublicOpen({
      tenant: vi.fn().mockResolvedValue({ ...tenant, memberRole: role }),
      authorize: (input: Parameters<typeof authorizeCaseDetailRead>[0]) =>
        authorizeCaseDetailRead({ ...input, authorizationService: service }),
      find: h.find,
      publicUrl: h.publicUrl,
    } as Parameters<typeof createCasePublicOpen>[0])
    if (allowed) {
      await expect(open(selector)).resolves.toBe('https://public.example/file')
    } else {
      await expect(open(selector)).rejects.toBeInstanceOf(CasePublicOpenUnavailableError)
      expect(h.find).not.toHaveBeenCalled()
      expect(h.publicUrl).not.toHaveBeenCalled()
    }
  })

  it('denies a cross-tenant Case before provider lookup', async () => {
    const { createLabOSAuthorizationService } = await import('@/modules/labos-authorization/service')
    const { authorizeCaseDetailRead } = await import('@/modules/labos-authorization/case-detail-read.authorization')
    const service = createLabOSAuthorizationService({
      targetResolvers: { case: { resolveOrganizationId: vi.fn().mockResolvedValue('foreign-org') } },
      policies: { 'case.read': { evaluate: vi.fn().mockResolvedValue({ allowed: true }) } },
      monitor: { record: vi.fn() },
    })
    const h = harness()
    const open = createCasePublicOpen({
      tenant: vi.fn().mockResolvedValue(tenant),
      authorize: (input: Parameters<typeof authorizeCaseDetailRead>[0]) =>
        authorizeCaseDetailRead({ ...input, authorizationService: service }),
      find: h.find,
      publicUrl: h.publicUrl,
    } as Parameters<typeof createCasePublicOpen>[0])
    await expect(open(selector)).rejects.toBeInstanceOf(CasePublicOpenUnavailableError)
    expect(h.find).not.toHaveBeenCalled()
  })
})



describe('tenant prerequisite', () => {
  it('does not authorize or query files when the actor is unauthenticated', async () => {
    const h = harness()
    const open = createCasePublicOpen({
      tenant: vi.fn().mockRejectedValue(new Error('unauthenticated')),
      authorize: h.authorize, find: h.find, publicUrl: h.publicUrl,
    } as Parameters<typeof createCasePublicOpen>[0])
    await expect(open(selector)).rejects.toThrow('unauthenticated')
    expect(h.authorize).not.toHaveBeenCalled()
    expect(h.find).not.toHaveBeenCalled()
    expect(h.publicUrl).not.toHaveBeenCalled()
  })
})


describe('R2-04 private Case opening', () => {
  function privateRow() {
    const r = row()
    const asset = r.caseAssetFiles[0]
    asset.storageMode = 'MANAGED_PRIVATE'
    const file = asset.currentVersion.storedFile
    file.provider = 'OBJECT_STORAGE'
    file.providerAccess = 'PRIVATE'
    file.providerObjectKey = 'objects/33333333-3333-4333-8333-333333333333'
    file.sourceGrant.provider = 'OBJECT_STORAGE'
    file.sourceGrant.providerFileKey = file.providerObjectKey
    file.sourceGrant.clinicalUploadEvidence.provider = 'OBJECT_STORAGE'
    file.sourceGrant.clinicalUploadEvidence.providerObjectKey = file.providerObjectKey
    return r
  }
  function privateHarness(value: unknown = privateRow()) {
    const authorize = vi.fn().mockResolvedValue({ correlationId: 'c' })
    const find = vi.fn().mockResolvedValue(value)
    const publicUrl = vi.fn().mockResolvedValue('https://public.example/file')
    const read = vi.fn().mockImplementation(async () => ({
      ok: true, value: { url: 'https://private.example/signed',
        method: 'GET', headers: {}, expiresAt: new Date(Date.now() + 120_000) },
    }))
    const audit = vi.fn().mockResolvedValue({ correlationId: 'audit', deliveryPermitted: true })
    const open = createCasePublicOpen({
      tenant: vi.fn().mockResolvedValue(tenant), authorize, find, publicUrl,
      objectStorage: () => ({ issuePrivateRead: read }) as never, audit,
    } as Parameters<typeof createCasePublicOpen>[0])
    return { open, authorize, find, publicUrl, read, audit }
  }

  it('authorizes and binds exact current key before signed read, then audits before delivery', async () => {
    const h = privateHarness()
    await expect(h.open(selector)).resolves.toBe('https://private.example/signed')
    expect(h.read).toHaveBeenCalledExactlyOnceWith({
      key: 'objects/33333333-3333-4333-8333-333333333333', lifetimeSeconds: 120,
    })
    expect(h.audit).toHaveBeenCalledWith(expect.objectContaining({
      caseId, caseAssetFileId: assetId,
      issuance: expect.objectContaining({ outcome: 'ISSUED', expiresAt: expect.any(Date) }),
    }))
    expect(h.authorize.mock.invocationCallOrder[0]).toBeLessThan(h.find.mock.invocationCallOrder[0])
    expect(h.find.mock.invocationCallOrder[0]).toBeLessThan(h.read.mock.invocationCallOrder[0])
    expect(h.read.mock.invocationCallOrder[0]).toBeLessThan(h.audit.mock.invocationCallOrder[0])
    expect(h.publicUrl).not.toHaveBeenCalled()
  })

  it('drops a signed capability if audit fails', async () => {
    const h = privateHarness()
    h.audit.mockRejectedValueOnce(new Error('audit detail'))
    await expect(h.open(selector)).rejects.toBeInstanceOf(CasePublicOpenUnavailableError)
    expect(h.publicUrl).not.toHaveBeenCalled()
  })

  it.each([
    ['authorization', (h: ReturnType<typeof privateHarness>) => h.authorize.mockRejectedValueOnce(new Error('denied'))],
    ['current pointer', (_h: ReturnType<typeof privateHarness>, r: ReturnType<typeof privateRow>) => { r.caseAssetFiles[0].currentVersionId = 'foreign' }],
    ['tenant', (_h: ReturnType<typeof privateHarness>, r: ReturnType<typeof privateRow>) => { r.caseAssetFiles[0].currentVersion.storedFile.organizationId = 'foreign' }],
    ['evidence key', (_h: ReturnType<typeof privateHarness>, r: ReturnType<typeof privateRow>) => { r.caseAssetFiles[0].currentVersion.storedFile.sourceGrant.clinicalUploadEvidence.providerObjectKey = 'foreign' }],
    ['grant not consumed', (_h: ReturnType<typeof privateHarness>, r: ReturnType<typeof privateRow>) => { r.caseAssetFiles[0].currentVersion.storedFile.sourceGrant.status = 'UPLOADED' }],
    ['public access', (_h: ReturnType<typeof privateHarness>, r: ReturnType<typeof privateRow>) => { r.caseAssetFiles[0].currentVersion.storedFile.providerAccess = 'PUBLIC_READ' }],
  ])('denies private %s before provider or audit', async (_name, mutate) => {
    const r = privateRow()
    const h = privateHarness(r)
    mutate(h, r)
    await expect(h.open(selector)).rejects.toBeInstanceOf(CasePublicOpenUnavailableError)
    expect(h.read).not.toHaveBeenCalled()
    expect(h.audit).not.toHaveBeenCalled()
    expect(h.publicUrl).not.toHaveBeenCalled()
  })

  it.each([
    ['provider failure', () => ({ ok: false, error: { code: 'UNAVAILABLE' } })],
    ['wrong method', () => ({ ok: true, value: { url: 'https://private.example/signed', method: 'PUT', headers: {}, expiresAt: new Date(Date.now() + 120_000) } })],
    ['expired', () => ({ ok: true, value: { url: 'https://private.example/signed', method: 'GET', headers: {}, expiresAt: new Date(Date.now() - 1000) } })],
    ['excess lifetime', () => ({ ok: true, value: { url: 'https://private.example/signed', method: 'GET', headers: {}, expiresAt: new Date(Date.now() + 301_000) } })],
    ['required headers', () => ({ ok: true, value: { url: 'https://private.example/signed', method: 'GET', headers: { authorization: 'secret' }, expiresAt: new Date(Date.now() + 120_000) } })],
  ])('rejects %s capability without disclosure or audit', async (_name, value) => {
    const h = privateHarness()
    h.read.mockImplementationOnce(async () => value())
    await expect(h.open(selector)).rejects.toBeInstanceOf(CasePublicOpenUnavailableError)
    expect(h.audit).not.toHaveBeenCalled()
    expect(h.publicUrl).not.toHaveBeenCalled()
  })
})
