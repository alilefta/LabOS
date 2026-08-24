import { describe, expect, it } from 'vitest'

import {
	LABOS_ORGANIZATION_ROLES,
	LABOS_PERMISSIONS,
	LABOS_ROLE_PERMISSION_BUNDLES,
	roleBundleHasPermission,
} from '@/modules/labos-authorization'

describe('LabOS Authorization V1 fixed bundles', () => {
	it('defines four explicit product roles', () => {
		expect(LABOS_ORGANIZATION_ROLES).toEqual([
			'owner',
			'admin',
			'manager',
			'staff',
		])
	})

	it('grants every reviewed permission to Owner', () => {
		expect(LABOS_ROLE_PERMISSION_BUNDLES.permissionsFor('owner')).toEqual(
			LABOS_PERMISSIONS,
		)
	})

	it('keeps Admin access/configuration authority out of ownership powers', () => {
		const denied = new Set([
			'catalog.delete',
			'staff.compensation.update',
			'payout.issue',
			'payout.void',
			'billing.manage',
		])

		for (const permission of LABOS_PERMISSIONS) {
			expect(roleBundleHasPermission('admin', permission)).toBe(
				!denied.has(permission),
			)
		}
	})

	it('gives Manager operational and financial authority without access administration', () => {
		const denied = new Set([
			'catalog.delete',
			'staff.access.invite',
			'staff.access.revoke',
			'lab.settings.update',
			'membership.list',
			'membership.read',
			'membership.role.update',
			'membership.remove',
			'billing.manage',
		])

		for (const permission of LABOS_PERMISSIONS) {
			expect(roleBundleHasPermission('manager', permission)).toBe(
				!denied.has(permission),
			)
		}
	})

	it('limits Staff to basic reads and policy-scoped Case work', () => {
		expect(LABOS_ROLE_PERMISSION_BUNDLES.permissionsFor('staff')).toEqual([
			'case.read',
			'case.list',
			'case.transition',
			'clinic.read',
			'clinic.list',
			'clinic.analytics.read',
			'clinic.analytics.list',
			'dentist.read',
			'dentist.list',
			'patient.read',
			'patient.list',
			'catalog.read',
			'catalog.list',
			'catalog.analytics.read',
			'staff.read',
			'staff.list',
			'staff.analytics.read',
			'staff.analytics.list',
			'invoice.read',
			'invoice.list',
			'invoice.analytics.read',
		])
		expect(roleBundleHasPermission('staff', 'case.update')).toBe(false)
		expect(roleBundleHasPermission('staff', 'case.financials.read')).toBe(false)
	})

	it('does not model roles as a hierarchy', () => {
		expect(roleBundleHasPermission('admin', 'membership.remove')).toBe(true)
		expect(roleBundleHasPermission('manager', 'membership.remove')).toBe(false)
		expect(roleBundleHasPermission('manager', 'payout.issue')).toBe(true)
		expect(roleBundleHasPermission('admin', 'payout.issue')).toBe(false)
	})

	it('contains no duplicate permission in any bundle', () => {
		for (const role of LABOS_ORGANIZATION_ROLES) {
			const permissions = LABOS_ROLE_PERMISSION_BUNDLES.permissionsFor(role)
			expect(new Set(permissions).size).toBe(permissions.length)
		}
	})
})
