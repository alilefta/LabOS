import { describe, expect, it } from 'vitest'

import { getDataTenantContext } from '@/lib/data-tenant-context'
import {
	TENANT_CONTEXT_ERROR_CODES,
	TenantContextError,
} from '@/platform/organizations/tenant-context'

const tenant = {
	userId: 'user-1',
	memberId: 'member-1',
	memberRole: 'owner',
	staffId: null,
	organizationId: 'organization-1',
	labId: 'lab-1',
	lab: { id: 'lab-1', title: 'Example Lab', slug: 'example-lab' },
}

describe('getDataTenantContext', () => {
	it('returns the canonical tenant context unchanged', async () => {
		await expect(
			getDataTenantContext(async () => tenant),
		).resolves.toEqual({
			success: true,
			data: tenant,
		})
	})

	it.each([
		[TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED, 'UNAUTHORIZED'],
		[TENANT_CONTEXT_ERROR_CODES.MEMBERSHIP_REQUIRED, 'NOT_MEMBER'],
		[TENANT_CONTEXT_ERROR_CODES.ACTIVE_ORGANIZATION_REQUIRED, 'LAB_NOT_FOUND'],
		[TENANT_CONTEXT_ERROR_CODES.ORGANIZATION_NOT_FOUND, 'LAB_NOT_FOUND'],
		[TENANT_CONTEXT_ERROR_CODES.LAB_NOT_LINKED, 'LAB_NOT_FOUND'],
	])('maps %s to the existing safe data error %s', async (tenantCode, dataCode) => {
		const resolveRejectedTenant = async () => {
			throw new TenantContextError(tenantCode, 'safe test failure')
		}

		await expect(getDataTenantContext(resolveRejectedTenant)).resolves.toMatchObject({
			success: false,
			error: { code: dataCode },
		})
	})

	it('rethrows unexpected failures for normal server diagnostics', async () => {
		const error = new Error('database unavailable')
		const resolveFailedTenant = async () => {
			throw error
		}
		const caught = await getDataTenantContext(resolveFailedTenant).catch(
			(reason: unknown) => reason,
		)
		expect(caught).toBe(error)
	})
})
