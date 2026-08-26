import { describe, expect, it } from 'vitest'

import {
	getLabOSAuthorizationMode,
	isLabOSAuthorizationV1Enforced,
} from '@/modules/labos-authorization/enforcement-mode'

describe('LabOS authorization enforcement mode', () => {
	it('defaults safely to shadow', () => {
		expect(getLabOSAuthorizationMode({})).toBe('shadow')
		expect(isLabOSAuthorizationV1Enforced({})).toBe(false)
	})

	it.each([
		['shadow', 'shadow'],
		['v1', 'v1'],
		['legacy-rollback', 'legacy-rollback'],
		[' V1 ', 'v1'],
	] as const)('normalizes the deployment value %s', (value, expected) => {
		expect(getLabOSAuthorizationMode({ LABOS_AUTHORIZATION_MODE: value })).toBe(
			expected,
		)
	})

	it('fails safe for unknown deployment values', () => {
		expect(
			getLabOSAuthorizationMode({ LABOS_AUTHORIZATION_MODE: 'production' }),
		).toBe('shadow')
	})
})

