import { describe, expect, it } from 'vitest'

import {
	createRolePermissionBundles,
	normalizeRoles,
	resolveRolePermissions,
} from '@/platform/authorization'

const ROLES = ['owner', 'admin', 'manager', 'staff'] as const
const PERMISSIONS = ['record.read', 'record.update', 'record.delete'] as const

describe('authorization roles', () => {
	it('normalizes, trims, lower-cases, and deduplicates known roles', () => {
		expect(
			normalizeRoles([' ADMIN ', 'admin', 'StAfF'], ROLES),
		).toEqual({
			roles: ['admin', 'staff'],
			unknownRoleCount: 0,
		})
	})

	it('counts unknown roles without mapping Better Auth member to staff', () => {
		expect(normalizeRoles(['member', 'custom'], ROLES)).toEqual({
			roles: [],
			unknownRoleCount: 2,
		})
	})

	it('unions explicit bundles without applying a role hierarchy', () => {
		const bundles = createRolePermissionBundles({
			roles: ROLES,
			permissions: PERMISSIONS,
			bundles: {
				owner: ['record.delete'],
				admin: ['record.update'],
				manager: ['record.read'],
				staff: [],
			},
		})

		expect([...resolveRolePermissions(['admin', 'manager'], bundles)]).toEqual([
			'record.update',
			'record.read',
		])
		expect([...resolveRolePermissions(['owner'], bundles)]).toEqual([
			'record.delete',
		])
	})

	it('copies source bundle arrays before use', () => {
		const ownerPermissions: (typeof PERMISSIONS)[number][] = ['record.read']
		const bundles = createRolePermissionBundles({
			roles: ROLES,
			permissions: PERMISSIONS,
			bundles: {
				owner: ownerPermissions,
				admin: [],
				manager: [],
				staff: [],
			},
		})

		ownerPermissions.push('record.delete')

		expect(bundles.permissionsFor('owner')).toEqual(['record.read'])
	})

	it('rejects unknown permissions in bundle configuration', () => {
		expect(() =>
			createRolePermissionBundles({
				roles: ROLES,
				permissions: PERMISSIONS,
				bundles: {
					owner: ['not.configured' as (typeof PERMISSIONS)[number]],
					admin: [],
					manager: [],
					staff: [],
				},
			}),
		).toThrow('Unknown permission')
	})
})
