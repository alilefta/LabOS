import { describe, expect, it } from 'vitest'

import { dashboardWorkspaceSwitcherInternals } from '@/components/dashboard/dashboard-workspace-switcher'

describe('dashboard workspace switcher', () => {
	it.each([
		['Alpha Lab', 'AL'],
		['one', 'O'],
		['  Smile   Arts Dental  ', 'SA'],
		['', 'WS'],
	])('derives safe display initials for %j', (name, expected) => {
		expect(
			dashboardWorkspaceSwitcherInternals.organizationInitials(name),
		).toBe(expected)
	})
})
