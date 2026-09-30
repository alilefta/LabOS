import { beforeEach, describe, expect, it, vi } from 'vitest'

import { projectCaseAssetStage, stageCaseAsset } from '@/modules/labos-files/case-asset-stage.contract'
import { createCaseAssetStageRepository } from '@/modules/labos-files/case-asset-stage.repository'
import { UPLOAD_GRANT_ERROR_CODES } from '@/modules/labos-files/upload-grants'
import type { TenantContext } from '@/platform/organizations'

const resolveTenant = vi.fn()
vi.mock('@/platform/organizations', async (importOriginal) => ({
	...(await importOriginal<object>()),
	requireTenantContext: () => resolveTenant(),
}))

const caseId = '43f10da4-58d8-4e06-bf87-a26b40281405'
const tenant: TenantContext = {
	userId: 'user-a', memberId: 'member-a', memberRole: 'owner', staffId: null,
	organizationId: 'org-a', labId: 'lab-a',
	lab: { id: 'lab-a', title: 'Lab A', slug: 'lab-a' },
}
const createdAt = new Date('2026-09-28T12:00:00.000Z')

function fixture() {
	const facts = {
		id: caseId, labId: 'lab-a',
		lab: { id: 'lab-a', organizationId: 'org-a' },
		staffAssignments: [] as Array<unknown>,
	}
	const tx = {
		$queryRaw: vi.fn().mockResolvedValue([{ id: caseId }]),
		case: {
			findUnique: vi.fn().mockResolvedValue(facts),
			findFirst: vi.fn().mockResolvedValue(facts),
		},
		member: { findFirst: vi.fn().mockResolvedValue({ id: 'member-a', role: 'owner' }) },
		lab: { findFirst: vi.fn().mockResolvedValue({ id: 'lab-a' }) },
		fileUploadGrant: { create: vi.fn().mockResolvedValue({ id: 'grant-a' }) },
	}
	const prisma = {
		$transaction: vi.fn(async (callback: (transaction: typeof tx) => Promise<unknown>) => callback(tx)),
	}
	const repository = createCaseAssetStageRepository(
		prisma as unknown as Parameters<typeof createCaseAssetStageRepository>[0],
		() => createdAt,
	)
	return { tx, prisma, repository, facts }
}

beforeEach(() => resolveTenant.mockReset().mockResolvedValue(tenant))

describe('N-FILE-110 saved-DRAFT staging', () => {
	it('accepts only an identifier; browser authority fields are rejected', () => {
		expect(projectCaseAssetStage({ caseId })).toMatchObject({
			boundaryId: 'N-FILE-110', permission: 'case.asset.add',
			purpose: 'case.asset.add.stage', target: { type: 'case', id: caseId },
		})
		for (const field of ['organizationId', 'labId', 'memberId', 'role', 'targetType', 'purpose', 'expiresAt', 'provider', 'providerFileKey', 'mime', 'size', 'filename', 'clinicalPurpose']) {
			expect(() => projectCaseAssetStage({ caseId, [field]: 'forged' })).toThrow()
		}
	})

	it('derives tenant from the session and returns only the opaque ID', async () => {
		const { repository } = fixture()
		await expect(stageCaseAsset({ caseId }, { repository, generateCorrelationId: () => 'corr-a' }))
			.resolves.toEqual({ uploadGrantId: 'grant-a' })
		expect(resolveTenant).toHaveBeenCalledOnce()
	})

	it.each(['owner', 'admin', 'manager'])('authorizes %s and writes only the fixed PENDING grant', async (role) => {
		const { repository, tx, prisma } = fixture()
		tx.member.findFirst.mockResolvedValue({ id: 'member-a', role })
		await expect(repository.create({ tenant: { ...tenant, memberRole: role }, caseId, correlationId: 'corr-a' }))
			.resolves.toEqual({ uploadGrantId: 'grant-a' })
		expect(prisma.$transaction).toHaveBeenCalledWith(expect.any(Function), expect.objectContaining({ isolationLevel: 'Serializable' }))
		expect(tx.$queryRaw).toHaveBeenCalledOnce()
		const lockSql = (tx.$queryRaw.mock.calls[0][0] as { strings: readonly string[] }).strings.join(' ')
		expect(lockSql).toContain('"Case"."status" = \'DRAFT\'')
		expect(lockSql).toContain('"Case"."labId" = ')
		expect(lockSql).toContain('"Lab"."organizationId" = ')
		expect(lockSql).toContain('FOR UPDATE OF "Case"')
		expect(tx.fileUploadGrant.create).toHaveBeenCalledWith({
			data: {
				organizationId: 'org-a', labId: 'lab-a', createdByMemberId: 'member-a',
				boundaryId: 'N-FILE-110', purpose: 'case.asset.add.stage',
				targetType: 'case', targetId: caseId, provider: 'UPLOADTHING',
				correlationId: 'corr-a', createdAt,
				expiresAt: new Date('2026-09-28T12:15:00.000Z'),
			},
			select: { id: true },
		})
	})

	it('authorizes assigned Staff against exact active same-Lab Member-linked Case', async () => {
		const { repository, tx, facts } = fixture()
		tx.member.findFirst.mockResolvedValue({ id: 'member-a', role: 'staff' })
		facts.staffAssignments = [{
			caseId, labId: 'lab-a', staffId: 'staff-a',
			staff: { labId: 'lab-a', isActive: true, memberId: 'member-a', member: { id: 'member-a', organizationId: 'org-a' } },
		}]
		await expect(repository.create({ tenant: { ...tenant, memberRole: 'staff' }, caseId, correlationId: 'corr-a' }))
			.resolves.toEqual({ uploadGrantId: 'grant-a' })
		expect(tx.fileUploadGrant.create).toHaveBeenCalledOnce()
	})

	it.each(['unassigned', 'other-case', 'other-lab', 'inactive', 'unlinked'])('denies Staff: %s', async (variant) => {
		const { repository, tx, facts } = fixture()
		tx.member.findFirst.mockResolvedValue({ id: 'member-a', role: 'staff' })
		if (variant !== 'unassigned') facts.staffAssignments = [{
			caseId: variant === 'other-case' ? 'case-b' : caseId,
			labId: 'lab-a', staffId: 'staff-a',
			staff: {
				labId: variant === 'other-lab' ? 'lab-b' : 'lab-a',
				isActive: variant !== 'inactive',
				memberId: variant === 'unlinked' ? null : 'member-a',
				member: variant === 'unlinked' ? null : { id: 'member-a', organizationId: 'org-a' },
			},
		}]
		await expect(repository.create({ tenant: { ...tenant, memberRole: 'staff' }, caseId, correlationId: 'corr-a' }))
			.rejects.toMatchObject({ code: UPLOAD_GRANT_ERROR_CODES.CANONICAL_CONTEXT_REJECTED })
		expect(tx.fileUploadGrant.create).not.toHaveBeenCalled()
	})

	it.each(['missing Case', 'foreign Organization', 'foreign Lab', 'non-DRAFT Case'])('denies %s before grant creation', async () => {
		const { repository, tx } = fixture()
		tx.$queryRaw.mockResolvedValue([])
		await expect(repository.create({ tenant, caseId, correlationId: 'corr-a' }))
			.rejects.toMatchObject({ code: UPLOAD_GRANT_ERROR_CODES.CANONICAL_CONTEXT_REJECTED })
		expect(tx.case.findUnique).not.toHaveBeenCalled()
		expect(tx.fileUploadGrant.create).not.toHaveBeenCalled()
	})

	it('denies a missing canonical Member without creating a grant', async () => {
		const { repository, tx } = fixture()
		tx.member.findFirst.mockResolvedValue(null)
		await expect(repository.create({ tenant, caseId, correlationId: 'corr-a' }))
			.rejects.toMatchObject({ code: UPLOAD_GRANT_ERROR_CODES.CANONICAL_CONTEXT_REJECTED })
		expect(tx.fileUploadGrant.create).not.toHaveBeenCalled()
	})

	it('uses the transaction-fresh Member role, not a stale elevated session role', async () => {
		const { repository, tx } = fixture()
		tx.member.findFirst.mockResolvedValue({ id: 'member-a', role: 'staff' })
		await expect(repository.create({ tenant, caseId, correlationId: 'corr-a' }))
			.rejects.toMatchObject({ code: UPLOAD_GRANT_ERROR_CODES.CANONICAL_CONTEXT_REJECTED })
		expect(tx.fileUploadGrant.create).not.toHaveBeenCalled()
	})

	it('an unsupported transaction-fresh role denies even when session claimed Staff', async () => {
		const { repository, tx } = fixture()
		tx.member.findFirst.mockResolvedValue({ id: 'member-a', role: 'unsupported' })
		await expect(repository.create({ tenant: { ...tenant, memberRole: 'staff' }, caseId, correlationId: 'corr-a' }))
			.rejects.toMatchObject({ code: UPLOAD_GRANT_ERROR_CODES.CANONICAL_CONTEXT_REJECTED })
		expect(tx.fileUploadGrant.create).not.toHaveBeenCalled()
	})
})
