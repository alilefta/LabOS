import { describe, expect, it } from 'vitest'

import { actionClientWithAuthorization } from '@/lib/safe-action'

describe('registered V1 safe-action clients', () => {
	it('exposes the reviewed A-086 boundary and fails closed for unknown IDs', () => {
		expect(actionClientWithAuthorization('A-086')).toBeDefined()
		expect(() =>
			actionClientWithAuthorization('A-999' as 'A-086'),
		).toThrowError(
			expect.objectContaining({ code: 'AUTHZ_BOUNDARY_NOT_REGISTERED' }),
		)
	})
})
