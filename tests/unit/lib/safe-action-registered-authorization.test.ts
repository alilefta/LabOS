import { describe, expect, it } from 'vitest'

import { actionClientWithAuthorization } from '@/lib/safe-action'

describe('registered V1 safe-action clients', () => {
	it('exposes the reviewed registered boundaries and fails closed for unknown IDs', () => {
		expect(actionClientWithAuthorization('A-086')).toBeDefined()
		expect(actionClientWithAuthorization('A-089')).toBeDefined()
		expect(actionClientWithAuthorization('A-097')).toBeDefined()
		expect(actionClientWithAuthorization('N-FIN-PL-001')).toBeDefined()
		expect(() =>
			actionClientWithAuthorization('A-999' as 'A-086'),
		).toThrowError(
			expect.objectContaining({ code: 'AUTHZ_BOUNDARY_NOT_REGISTERED' }),
		)
	})
})
