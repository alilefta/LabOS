import { afterEach, describe, expect, it, vi } from 'vitest'

import { actionClientWithAuthorizationShadow } from '@/lib/safe-action'
import type { LabOSActionBoundaryId } from '@/modules/labos-authorization/action-boundaries'

describe('permission-aware safe-action shadow client registry', () => {
	afterEach(() => vi.restoreAllMocks())

	it('exposes separate fully configured clients only for approved boundaries', () => {
		expect(actionClientWithAuthorizationShadow('A-124')).toBeDefined()
		expect(actionClientWithAuthorizationShadow('A-125')).toBeDefined()
	})

	it('fails closed and emits sanitized high-severity telemetry for an unknown boundary', () => {
		const record = vi.spyOn(console, 'error').mockImplementation(() => {})

		expect(() =>
			actionClientWithAuthorizationShadow(
				'A-unknown' as LabOSActionBoundaryId,
			),
		).toThrowError(
			expect.objectContaining({ code: 'AUTHZ_BOUNDARY_NOT_REGISTERED' }),
		)
		expect(record).toHaveBeenCalledWith(
			expect.objectContaining({
				event: 'labos.authorization.shadow_configuration_failure',
				boundaryId: 'A-unknown',
				failureReason: 'AUTHZ_BOUNDARY_NOT_REGISTERED',
				severity: 'high',
				enforcementSource: 'legacy',
			}),
		)
	})
})
