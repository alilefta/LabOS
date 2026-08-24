import { describe, expect, it } from 'vitest'

import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import type { TenantContext } from '@/platform/organizations'

function tenant(overrides: Partial<TenantContext> = {}): TenantContext {
	return {
		userId: 'user-1',
		memberId: 'member-1',
		memberRole: 'staff',
		staffId: 'staff-1',
		organizationId: 'organization-1',
		labId: 'lab-1',
		lab: { id: 'lab-1', title: 'Lab One', slug: 'lab-one' },
		...overrides,
	}
}

describe('createLabOSAuthorizationActor', () => {
	it('copies only platform identity and Organization membership fields', () => {
		const result = createLabOSAuthorizationActor(tenant())

		expect(result).toEqual({
			userId: 'user-1',
			memberId: 'member-1',
			organizationId: 'organization-1',
			memberRoles: ['staff'],
		})
		expect(result).not.toHaveProperty('labId')
		expect(result).not.toHaveProperty('staffId')
		expect(result).not.toHaveProperty('lab')
	})

	it('splits multiple Better Auth roles without interpreting their values', () => {
		const result = createLabOSAuthorizationActor(
			tenant({ memberRole: ' OWNER, admin ,Unexpected-Role, STAFF ' }),
		)

		expect(result.memberRoles).toEqual([
			'OWNER',
			'admin',
			'Unexpected-Role',
			'STAFF',
		])
	})

	it('preserves empty and unknown tokens for fail-closed normalization telemetry', () => {
		const result = createLabOSAuthorizationActor(
			tenant({ memberRole: 'owner,,unknown,' }),
		)

		expect(result.memberRoles).toEqual(['owner', '', 'unknown', ''])
	})

	it('does not apply the temporary member-to-staff compatibility mapping', () => {
		const result = createLabOSAuthorizationActor(
			tenant({ memberRole: 'member' }),
		)

		expect(result.memberRoles).toEqual(['member'])
	})

	it('produces immutable actor and role snapshots', () => {
		const result = createLabOSAuthorizationActor(tenant())

		expect(Object.isFrozen(result)).toBe(true)
		expect(Object.isFrozen(result.memberRoles)).toBe(true)
	})

	it('fails closed to no roles for malformed runtime role data', () => {
		const malformed = {
			...tenant(),
			memberRole: null,
		} as unknown as TenantContext

		const result = createLabOSAuthorizationActor(malformed)

		expect(result.memberRoles).toEqual([])
	})
})
