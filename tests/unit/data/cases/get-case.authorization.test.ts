import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => {
	class CaseDetailReadAuthorizationError extends Error {
		readonly code = 'AUTHZ_CASE_DETAIL_READ_ACCESS_DENIED'
	}

	return {
		getDataTenantContext: vi.fn(),
		tenantPrisma: vi.fn(),
		authorizeCaseDetailRead: vi.fn(),
		CaseDetailReadAuthorizationError,
	}
})

vi.mock('@/lib/data-tenant-context', () => ({
	getDataTenantContext: mocks.getDataTenantContext,
}))
vi.mock('@/lib/prisma', () => ({ tenantPrisma: mocks.tenantPrisma }))
vi.mock('@/modules/labos-authorization/case-detail-read.authorization', () => ({
	authorizeCaseDetailRead: mocks.authorizeCaseDetailRead,
	CaseDetailReadAuthorizationError: mocks.CaseDetailReadAuthorizationError,
}))

import { getDentalCaseById } from '@/data/cases/get-case'

const tenant = {
	userId: 'user-a',
	memberId: 'member-a',
	memberRole: 'staff',
	staffId: 'staff-a',
	organizationId: 'organization-a',
	labId: 'lab-a',
	lab: { id: 'lab-a', title: 'Lab A', slug: null },
}

describe('getDentalCaseById authorization', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		mocks.getDataTenantContext.mockResolvedValue({ success: true, data: tenant })
	})

	it('denies before opening the Case DTO repository', async () => {
		mocks.authorizeCaseDetailRead.mockRejectedValue(
			new mocks.CaseDetailReadAuthorizationError(),
		)

		await expect(getDentalCaseById('case-a')).resolves.toMatchObject({
			success: false,
		})
		expect(mocks.authorizeCaseDetailRead).toHaveBeenCalledWith({
			actor: expect.objectContaining({
				memberId: 'member-a',
				organizationId: 'organization-a',
			}),
			caseId: 'case-a',
		})
		expect(mocks.tenantPrisma).not.toHaveBeenCalled()
	})

	it('returns the same generic result for missing and foreign Case denials', async () => {
		mocks.authorizeCaseDetailRead.mockRejectedValue(
			new mocks.CaseDetailReadAuthorizationError(),
		)

		const missing = await getDentalCaseById('missing-case')
		const foreign = await getDentalCaseById('foreign-case')

		expect(foreign).toEqual(missing)
		expect(mocks.tenantPrisma).not.toHaveBeenCalled()
	})
})
