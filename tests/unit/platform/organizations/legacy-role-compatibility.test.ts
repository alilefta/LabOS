import { describe, expect, it } from 'vitest'

import { toLegacyLabRole } from '@/platform/organizations/legacy-role-compatibility'

describe('toLegacyLabRole', () => {
	it.each([
		['owner', 'OWNER'],
		['admin', 'ADMIN'],
		['manager', 'MANAGER'],
		['member', 'STAFF'],
		['staff', 'STAFF'],
	] as const)('maps Better Auth role %s to %s', (memberRole, expected) => {
		expect(toLegacyLabRole(memberRole)).toBe(expected)
	})

	it('selects the highest known role from a multi-role membership', () => {
		expect(toLegacyLabRole('member,admin')).toBe('ADMIN')
	})

	it('fails closed to the least privileged legacy role', () => {
		expect(toLegacyLabRole('custom-unknown-role')).toBe('STAFF')
	})
})
