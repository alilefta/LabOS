import { describe, expect, it } from 'vitest'

import {
	ACTIVE_ORGANIZATION_CHANGE_KEY,
	isActiveOrganizationChangeEvent,
} from '@/lib/active-organization-browser'

describe('active Organization browser signal', () => {
	it('recognizes only the application-owned storage key', () => {
		expect(isActiveOrganizationChangeEvent(ACTIVE_ORGANIZATION_CHANGE_KEY)).toBe(
			true,
		)
		expect(isActiveOrganizationChangeEvent('another-key')).toBe(false)
		expect(isActiveOrganizationChangeEvent(null)).toBe(false)
	})
})
