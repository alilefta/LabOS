import { beforeEach, describe, expect, it, vi } from 'vitest'

const prisma = vi.hoisted(() => ({
	case: { findFirst: vi.fn() },
	caseAssetFile: { findFirst: vi.fn() },
	caseFileAccessAudit: { create: vi.fn() },
}))
vi.mock('@/lib/prisma', () => ({ generalPrisma: prisma }))

import {
	CaseFileAccessAuditWriteError,
	CaseFileAccessUnavailableError,
	createCaseFileAccessAuditService,
	prismaCaseFileAccessAuditRepository,
} from '@/modules/labos-files/case-file-access-audit'
import type { TenantContext } from '@/platform/organizations/tenant-context'

const caseId = '11111111-1111-4111-8111-111111111111'
const assetId = '22222222-2222-4222-8222-222222222222'
const tenant: TenantContext = {
	userId: 'user-a', memberId: 'member-a', memberRole: 'owner', staffId: null,
	organizationId: 'organization-a', labId: 'lab-a',
	lab: { id: 'lab-a', title: 'Lab A', slug: null },
}
const request = { caseId, caseAssetFileId: assetId } as const

function harness(options: {
	allowed?: boolean
	resolvedCaseId?: string | null
	resolvedAssetId?: string | null
	appendFailure?: boolean
} = {}) {
	const can = vi.fn().mockResolvedValue({ allowed: options.allowed ?? true })
	const findCase = vi.fn().mockResolvedValue(
		options.resolvedCaseId === undefined ? caseId : options.resolvedCaseId,
	)
	const findManagedAsset = vi.fn().mockResolvedValue(
		options.resolvedAssetId === undefined ? assetId : options.resolvedAssetId,
	)
	const append = options.appendFailure
		? vi.fn().mockRejectedValue(new Error('database unavailable'))
		: vi.fn().mockResolvedValue(undefined)
	const record = createCaseFileAccessAuditService({
		resolveTenant: vi.fn().mockResolvedValue(tenant), authorization: { can },
		repository: { findCase, findManagedAsset, append },
		generateCorrelationId: () => 'correlation-a',
		now: () => new Date('2026-09-27T10:00:30.000Z'),
	})
	return { record, can, findCase, findManagedAsset, append }
}

describe('Case file access audit service', () => {
	it('records an issued result and only then permits delivery', async () => {
		const { record, can, findCase, findManagedAsset, append } = harness()
		const issuedAt = new Date('2026-09-27T10:00:00.000Z')
		const expiresAt = new Date('2026-09-27T10:05:00.000Z')
		await expect(record({ ...request, issuance: { outcome: 'ISSUED', issuedAt, expiresAt } }))
			.resolves.toEqual({ correlationId: 'correlation-a', deliveryPermitted: true })
		expect(can).toHaveBeenCalledWith(expect.objectContaining({
			permission: 'case.read', target: { type: 'case', id: caseId },
			actor: expect.objectContaining({ memberId: 'member-a', organizationId: 'organization-a' }),
		}))
		expect(can.mock.invocationCallOrder[0]).toBeLessThan(findCase.mock.invocationCallOrder[0])
		expect(findManagedAsset).toHaveBeenCalledWith({
			caseId, caseAssetFileId: assetId, labId: 'lab-a', organizationId: 'organization-a',
		})
		expect(append).toHaveBeenCalledExactlyOnceWith({
			organizationId: 'organization-a', labId: 'lab-a', actorMemberId: 'member-a',
			caseId, caseAssetFileId: assetId, authorizationOutcome: 'ALLOWED',
			issuanceOutcome: 'ISSUED', reason: 'AUTHORIZED', correlationId: 'correlation-a',
			issuedAt, expiresAt,
		})
	})

	it('records denied attempts without candidate resource identities or a resource read', async () => {
		const { record, findCase, append } = harness({ allowed: false })
		await expect(record({ ...request, issuance: { outcome: 'NOT_ATTEMPTED' } }))
			.rejects.toBeInstanceOf(CaseFileAccessUnavailableError)
		expect(findCase).not.toHaveBeenCalled()
		expect(append).toHaveBeenCalledWith(expect.objectContaining({
			caseId: null, caseAssetFileId: null, authorizationOutcome: 'DENIED',
			issuanceOutcome: 'NOT_ATTEMPTED', reason: 'ACCESS_DENIED',
		}))
	})

	it('does not turn a denied attempted issuance into DENIED + ISSUED', async () => {
		const { record, append } = harness({ allowed: false })
		await expect(record({ ...request, issuance: {
			outcome: 'ISSUED', issuedAt: new Date('2026-09-27T10:00:00Z'),
			expiresAt: new Date('2026-09-27T10:01:00Z'),
		} })).rejects.toBeInstanceOf(CaseFileAccessUnavailableError)
		expect(append).toHaveBeenCalledWith(expect.objectContaining({
			authorizationOutcome: 'DENIED', issuanceOutcome: 'NOT_ATTEMPTED',
			issuedAt: null, expiresAt: null,
		}))
	})

	it('uses the same error for a foreign Case and an unavailable asset', async () => {
		const foreign = harness({ resolvedCaseId: null })
		const unavailable = harness({ resolvedAssetId: null })
		const input = { ...request, issuance: { outcome: 'NOT_ATTEMPTED' as const } }
		await expect(foreign.record(input)).rejects.toBeInstanceOf(CaseFileAccessUnavailableError)
		await expect(unavailable.record(input)).rejects.toBeInstanceOf(CaseFileAccessUnavailableError)
		expect(foreign.findManagedAsset).not.toHaveBeenCalled()
		expect(foreign.append).toHaveBeenCalledWith(expect.objectContaining({
			caseId: null, caseAssetFileId: null, reason: 'RESOURCE_UNAVAILABLE',
		}))
		expect(unavailable.append).toHaveBeenCalledWith(expect.objectContaining({
			caseId, caseAssetFileId: null, reason: 'RESOURCE_UNAVAILABLE',
		}))
	})

	it.each([
		['NOT_ATTEMPTED', 'AUTHORIZED'], ['FAILED', 'PROVIDER_FAILURE'],
	] as const)('records %s without delivery or timestamps', async (outcome, reason) => {
		const { record, append } = harness()
		await expect(record({ ...request, issuance: { outcome } })).resolves.toEqual({
			correlationId: 'correlation-a', deliveryPermitted: false,
		})
		expect(append).toHaveBeenCalledWith(expect.objectContaining({
			issuanceOutcome: outcome, reason, issuedAt: null, expiresAt: null,
		}))
	})

	it.each([-1, 0, 300_001])('rejects issued lifetime %i ms', async (offset) => {
		const { record, append } = harness()
		const issuedAt = new Date('2026-09-27T10:00:00.000Z')
		await expect(record({ ...request, issuance: {
			outcome: 'ISSUED', issuedAt,
			expiresAt: new Date(issuedAt.getTime() + offset),
		} })).rejects.toBeInstanceOf(CaseFileAccessUnavailableError)
		expect(append).not.toHaveBeenCalled()
	})

	it.each([
		['expired', '2026-09-27T10:00:29.999Z'],
		['exact expiry', '2026-09-27T10:00:30.000Z'],
	])('rejects an issued capability at %s', async (_label, expiry) => {
		const { record, append } = harness()
		await expect(record({ ...request, issuance: {
			outcome: 'ISSUED',
			issuedAt: new Date('2026-09-27T10:00:00.000Z'),
			expiresAt: new Date(expiry),
		} })).rejects.toBeInstanceOf(CaseFileAccessUnavailableError)
		expect(append).not.toHaveBeenCalled()
	})

	it.each([
		{ signedUrl: 'https://private.example/signed' },
		{ documentUrl: 'https://private.example/raw' },
		{ accessToken: 'secret' }, { providerObjectKey: 'key' },
		{ providerPayload: { clinical: 'content' } }, { metadata: { arbitrary: true } },
		{ organizationId: 'forged' }, { actorMemberId: 'forged' },
	])('rejects forbidden fields %j', async (extra) => {
		const { record, can, append } = harness()
		await expect(record({ ...request, issuance: { outcome: 'NOT_ATTEMPTED' }, ...extra }))
			.rejects.toBeInstanceOf(CaseFileAccessUnavailableError)
		expect(can).not.toHaveBeenCalled()
		expect(append).not.toHaveBeenCalled()
	})

	it('rejects nested provider data', async () => {
		const { record, append } = harness()
		await expect(record({ ...request, issuance: {
			outcome: 'FAILED', signedUrl: 'https://private.example/signed',
		} } as never)).rejects.toBeInstanceOf(CaseFileAccessUnavailableError)
		expect(append).not.toHaveBeenCalled()
	})

	it('propagates append failure without a deliverable result', async () => {
		const { record } = harness({ appendFailure: true })
		await expect(record({ ...request, issuance: {
			outcome: 'ISSUED', issuedAt: new Date('2026-09-27T10:00:00Z'),
			expiresAt: new Date('2026-09-27T10:01:00Z'),
		} })).rejects.toBeInstanceOf(CaseFileAccessAuditWriteError)
	})
})

describe('Prisma Case file audit repository', () => {
	beforeEach(() => vi.clearAllMocks())
	it('uses tenant-aware facts and append-only allowlisted columns', async () => {
		prisma.case.findFirst.mockResolvedValue({ id: caseId })
		prisma.caseAssetFile.findFirst.mockResolvedValue({ id: assetId })
		prisma.caseFileAccessAudit.create.mockResolvedValue({ id: 'audit-a' })
		await prismaCaseFileAccessAuditRepository.findCase({
			caseId, labId: 'lab-a', organizationId: 'organization-a',
		})
		await prismaCaseFileAccessAuditRepository.findManagedAsset({
			caseId, caseAssetFileId: assetId, labId: 'lab-a', organizationId: 'organization-a',
		})
		expect(prisma.case.findFirst).toHaveBeenCalledWith({
			where: { id: caseId, labId: 'lab-a', lab: { organizationId: 'organization-a' } },
			select: { id: true },
		})
		expect(prisma.caseAssetFile.findFirst).toHaveBeenCalledWith({
			where: expect.objectContaining({
				id: assetId, dentalCaseId: caseId, labId: 'lab-a',
				lab: { organizationId: 'organization-a' },
				storageMode: 'MANAGED_PRIVATE', currentVersionId: { not: null },
			}), select: { id: true },
		})
		await prismaCaseFileAccessAuditRepository.append({
			organizationId: 'organization-a', labId: 'lab-a', actorMemberId: 'member-a',
			caseId, caseAssetFileId: assetId, authorizationOutcome: 'ALLOWED',
			issuanceOutcome: 'NOT_ATTEMPTED', reason: 'AUTHORIZED',
			correlationId: 'correlation-a', issuedAt: null, expiresAt: null,
		})
		expect(prisma.caseFileAccessAudit.create).toHaveBeenCalledWith({
			data: expect.objectContaining({
				organizationId: 'organization-a', labId: 'lab-a', actorMemberId: 'member-a',
				caseId, caseAssetFileId: assetId, issuedAt: null, expiresAt: null,
			}), select: { id: true },
		})
		expect(Object.keys(prisma.caseFileAccessAudit)).toEqual(['create'])
	})
})
