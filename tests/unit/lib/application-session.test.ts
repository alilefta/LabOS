import { describe, expect, it } from 'vitest'

import { projectApplicationSession } from '@/lib/application-session'

describe('projectApplicationSession', () => {
	it('returns only the application-owned identity and tenant fields', () => {
		const projected = projectApplicationSession({
			user: {
				id: 'user-1',
				name: 'Owner',
				email: 'owner@example.com',
				role: 'LAB_USER',
			},
			session: {
				id: 'session-1',
				token: 'credential-bearing-value',
				activeOrganizationId: 'organization-1',
				ipAddress: '127.0.0.1',
				userAgent: 'test-agent',
			},
		})

		expect(projected).toEqual({
			user: { id: 'user-1', name: 'Owner' },
			session: { activeOrganizationId: 'organization-1' },
		})
		expect(JSON.stringify(projected)).not.toContain('token')
		expect(JSON.stringify(projected)).not.toContain('session-1')
		expect(Object.isFrozen(projected)).toBe(true)
		expect(Object.isFrozen(projected.user)).toBe(true)
		expect(Object.isFrozen(projected.session)).toBe(true)
	})

	it('normalizes a missing active organization to null', () => {
		const projected = projectApplicationSession({
			user: { id: 'user-1', name: 'Owner' },
			session: {},
		})

		expect(projected.session.activeOrganizationId).toBeNull()
	})
})
