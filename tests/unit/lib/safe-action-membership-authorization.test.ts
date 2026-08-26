import { describe, expect, it } from 'vitest'

import { actionClientWithMembershipAuthorization } from '@/lib/safe-action'

describe('V1-enforcing membership safe-action clients', () => {
	it('registers only the approved mutation boundaries', () => {
		expect(actionClientWithMembershipAuthorization('M-002')).toBeDefined()
		expect(actionClientWithMembershipAuthorization('M-003')).toBeDefined()
		expect(actionClientWithMembershipAuthorization('M-004')).toBeDefined()
	})

	it('fails closed for a missing or read-only boundary', () => {
		expect(() =>
			actionClientWithMembershipAuthorization('M-001' as 'M-002'),
		).toThrowError(
			expect.objectContaining({
				name: 'LabOSMembershipOperationBoundaryError',
				code: 'AUTHZ_MEMBERSHIP_BOUNDARY_NOT_REGISTERED',
			}),
		)
	})
})
