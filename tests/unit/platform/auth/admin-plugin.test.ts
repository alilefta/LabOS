import { describe, expect, it } from 'vitest'

import { authUserAdminPlugin } from '@/platform/auth/admin-plugin'

describe('Better Auth Admin plugin AuthUser role compatibility', () => {
	it('creates ordinary accounts with the Prisma-compatible LAB_USER role', async () => {
		const beforeCreate =
			authUserAdminPlugin.init().options.databaseHooks.user.create.before
		const user = {
			id: 'user-1',
			name: 'Invited User',
			email: 'invitee@example.test',
			emailVerified: false,
			createdAt: new Date('2026-08-24T00:00:00.000Z'),
			updatedAt: new Date('2026-08-24T00:00:00.000Z'),
		}

		await expect(beforeCreate(user)).resolves.toMatchObject({
			data: {
				id: user.id,
				role: 'LAB_USER',
			},
		})
	})

	it('recognizes only SYSTEM_USER as an application-level admin role', () => {
		expect(authUserAdminPlugin.options).toMatchObject({
			defaultRole: 'LAB_USER',
			adminRoles: ['SYSTEM_USER'],
		})
		expect(Object.keys(authUserAdminPlugin.options.roles ?? {})).toEqual([
			'LAB_USER',
			'SYSTEM_USER',
		])
	})
})
