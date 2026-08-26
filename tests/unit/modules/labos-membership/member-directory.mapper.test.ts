import { describe, expect, it } from 'vitest'

import { mapOrganizationMemberDirectoryPage } from '@/modules/labos-membership/member-directory.mapper'

describe('Organization Member directory DTO mapper', () => {
	it('separates account, membership, and optional Staff identities', () => {
		const result = mapOrganizationMemberDirectoryPage({
			pageSize: 25,
			offset: 0,
			records: [
				{
					id: 'member-owner',
					role: 'owner',
					createdAt: new Date('2026-08-20T10:00:00.000Z'),
					authuser: {
						name: 'Ali Owner',
						email: 'ali@example.test',
						emailVerified: true,
						image: null,
					},
					labStaff: null,
				},
				{
					id: 'member-manager',
					role: 'manager',
					createdAt: new Date('2026-08-21T10:00:00.000Z'),
					authuser: {
						name: 'Ahmed Account',
						email: 'ahmed@example.test',
						emailVerified: false,
						image: 'https://images.example.test/ahmed.png',
					},
					labStaff: {
						id: 'staff-ahmed',
						firstName: 'Ahmed',
						lastName: 'Manager',
						avatarUrl: null,
						isActive: true,
						roleCategory: 'MANAGER',
						jobTitle: 'Operations Manager',
					},
				},
			],
		})

		expect(result.items).toEqual([
			{
				memberId: 'member-owner',
				roles: ['owner'],
				unknownRoleCount: 0,
				joinedAt: '2026-08-20T10:00:00.000Z',
				account: {
					name: 'Ali Owner',
					email: 'ali@example.test',
					emailVerified: true,
					imageUrl: null,
				},
				staff: null,
			},
			{
				memberId: 'member-manager',
				roles: ['manager'],
				unknownRoleCount: 0,
				joinedAt: '2026-08-21T10:00:00.000Z',
				account: {
					name: 'Ahmed Account',
					email: 'ahmed@example.test',
					emailVerified: false,
					imageUrl: 'https://images.example.test/ahmed.png',
				},
				staff: {
					staffId: 'staff-ahmed',
					firstName: 'Ahmed',
					lastName: 'Manager',
					avatarUrl: null,
					isActive: true,
					roleCategory: 'MANAGER',
					jobTitle: 'Operations Manager',
				},
			},
		])
		expect(Object.isFrozen(result)).toBe(true)
		expect(Object.isFrozen(result.items)).toBe(true)
		expect(Object.isFrozen(result.items[0].account)).toBe(true)
		expect(Object.isFrozen(result.items[1].staff)).toBe(true)
	})

	it('canonicalizes known multiple roles and does not expose unknown values', () => {
		const result = mapOrganizationMemberDirectoryPage({
			pageSize: 25,
			offset: 0,
			records: [
				{
					id: 'member-1',
					role: 'OWNER,unexpected,admin,owner',
					createdAt: new Date('2026-08-20T10:00:00.000Z'),
					authuser: {
						name: 'Multiple Roles',
						email: 'roles@example.test',
						emailVerified: true,
						image: null,
					},
					labStaff: null,
				},
			],
		})

		expect(result.items[0].roles).toEqual(['owner', 'admin'])
		expect(result.items[0].unknownRoleCount).toBe(1)
		expect(JSON.stringify(result)).not.toContain('unexpected')
	})

	it('uses the extra record only to produce a bounded next offset', () => {
		const record = (id: string) => ({
			id,
			role: 'staff',
			createdAt: new Date('2026-08-20T10:00:00.000Z'),
			authuser: {
				name: id,
				email: `${id}@example.test`,
				emailVerified: true,
				image: null,
			},
			labStaff: null,
		})
		const result = mapOrganizationMemberDirectoryPage({
			pageSize: 2,
			offset: 4,
			records: [record('member-1'), record('member-2'), record('member-3')],
		})

		expect(result.items.map((item) => item.memberId)).toEqual([
			'member-1',
			'member-2',
		])
		expect(result.nextOffset).toBe(6)
	})
})
