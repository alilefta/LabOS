import { describe, expect, it } from 'vitest'

import {
	LABOS_CATALOG_RESOURCE_TYPES,
	LABOS_PERMISSION_DEFINITIONS,
	LABOS_PERMISSION_DEFINITION_REGISTRY,
	LABOS_PERMISSIONS,
	LABOS_POLICY_IDS,
	LABOS_RESOURCE_TYPES,
} from '@/modules/labos-authorization'

const ORGANIZATION_SCOPED_PERMISSIONS = new Set([
	'case.list',
	'case.analytics.read',
	'case.create',
	'case.financials.list',
	'clinic.list',
	'clinic.analytics.list',
	'clinic.financials.list',
	'clinic.create',
	'dentist.list',
	'dentist.create',
	'patient.list',
	'patient.create',
	'catalog.list',
	'catalog.create',
	'staff.list',
	'staff.contact.list',
	'staff.analytics.list',
	'staff.compensation.list',
	'staff.create',
	'invoice.list',
	'invoice.analytics.read',
	'invoice.create',
	'invoice.overdue.sync',
	'payout.list',
	'lab.settings.read',
	'lab.settings.update',
	'membership.list',
	'membership.invite',
	'billing.read',
	'billing.manage',
])

describe('LabOS permission-definition catalog', () => {
	it('defines every permission exactly once', () => {
		const configured = LABOS_PERMISSION_DEFINITIONS.map(
			(definition) => definition.permission,
		)

		expect(configured).toHaveLength(LABOS_PERMISSIONS.length)
		expect(new Set(configured).size).toBe(configured.length)
		expect(new Set(configured)).toEqual(new Set(LABOS_PERMISSIONS))
		expect(LABOS_PERMISSION_DEFINITION_REGISTRY.list()).toHaveLength(
			LABOS_PERMISSIONS.length,
		)
	})

	it('freezes collection and supporting-command permissions at Organization scope', () => {
		for (const definition of LABOS_PERMISSION_DEFINITIONS) {
			expect(definition.scope).toBe(
				ORGANIZATION_SCOPED_PERMISSIONS.has(definition.permission)
					? 'organization'
					: 'resource',
			)
		}
	})

	it('uses only registered resource types and policy IDs', () => {
		const knownTargets = new Set(LABOS_RESOURCE_TYPES)
		const knownPolicies = new Set(LABOS_POLICY_IDS)

		for (const definition of LABOS_PERMISSION_DEFINITIONS) {
			if (definition.scope === 'resource') {
				for (const targetType of definition.targetTypes) {
					expect(knownTargets.has(targetType)).toBe(true)
				}
			}
			for (const policyId of definition.requiredPolicies) {
				expect(knownPolicies.has(policyId)).toBe(true)
			}
		}
	})

	it('references every declared policy ID from at least one permission', () => {
		const referenced = new Set(
			LABOS_PERMISSION_DEFINITIONS.flatMap(
				(definition) => definition.requiredPolicies,
			),
		)

		expect(referenced).toEqual(new Set(LABOS_POLICY_IDS))
	})

	it('allows Catalog family reads and mutations only for explicit Catalog targets', () => {
		for (const permission of [
			'catalog.read',
			'catalog.update',
			'catalog.archive',
			'catalog.delete',
		] as const) {
			expect(LABOS_PERMISSION_DEFINITION_REGISTRY.get(permission)).toMatchObject({
				scope: 'resource',
				targetTypes: LABOS_CATALOG_RESOURCE_TYPES,
			})
		}
		expect(
			LABOS_PERMISSION_DEFINITION_REGISTRY.get('catalog.analytics.read'),
		).toMatchObject({
			scope: 'resource',
			targetTypes: ['catalog.product'],
		})
	})

	it('marks every financial disclosure as at least sensitive', () => {
		const financialPermissions = LABOS_PERMISSION_DEFINITIONS.filter(
			(definition) =>
				definition.permission.includes('financials') ||
				definition.permission.startsWith('invoice.') ||
				definition.permission.startsWith('payout.') ||
				definition.permission.startsWith('billing.') ||
				definition.permission.includes('compensation'),
		)

		for (const definition of financialPermissions) {
			expect(definition.sensitivity).not.toBe('ordinary')
		}
	})

	it('makes access and membership mutations critical and policy-required', () => {
		for (const permission of [
			'staff.access.invite',
			'staff.access.revoke',
			'membership.role.update',
			'membership.remove',
		] as const) {
			const definition =
				LABOS_PERMISSION_DEFINITION_REGISTRY.get(permission)
			expect(definition).toMatchObject({
				scope: 'resource',
				sensitivity: 'critical',
			})
			expect(definition?.requiredPolicies.length).toBeGreaterThan(0)
		}
		const invitation =
			LABOS_PERMISSION_DEFINITION_REGISTRY.get('membership.invite')
		expect(invitation).toMatchObject({
			scope: 'organization',
			sensitivity: 'critical',
			requiredPolicies: ['membership.invitation.role_assignment'],
		})
	})

	it('encodes Staff-access and membership safeguards in trusted metadata', () => {
		expect(
			LABOS_PERMISSION_DEFINITION_REGISTRY.get('staff.access.invite')
				?.requiredPolicies,
		).toEqual([
			'staff.access.target',
			'staff.access.self_target',
			'staff.access.role_target',
			'staff.access.invitation_state',
		])
		expect(
			LABOS_PERMISSION_DEFINITION_REGISTRY.get('staff.access.revoke')
				?.requiredPolicies,
		).toEqual([
			'staff.access.target',
			'staff.access.self_target',
			'staff.access.role_target',
			'staff.access.linkage',
		])
		expect(
			LABOS_PERMISSION_DEFINITION_REGISTRY.get('membership.role.update')
				?.requiredPolicies,
		).toEqual([
			'membership.non_owner_target',
			'membership.self_target',
			'membership.role_assignment',
		])
	})

	it('requires assignment-aware policy for Staff-capable Case collection and detail reads', () => {
		expect(
			LABOS_PERMISSION_DEFINITION_REGISTRY.get('case.list')?.requiredPolicies,
		).toEqual(['case.list.scope'])
		expect(
			LABOS_PERMISSION_DEFINITION_REGISTRY.get('case.read')?.requiredPolicies,
		).toEqual(['case.read'])
	})

	it('limits detailed Staff analytics to self or management', () => {
		expect(
			LABOS_PERMISSION_DEFINITION_REGISTRY.get('staff.analytics.read')
				?.requiredPolicies,
		).toEqual(['staff.analytics.self_or_management'])
	})

	it('limits Staff dossier reads to self or management', () => {
		expect(
			LABOS_PERMISSION_DEFINITION_REGISTRY.get('staff.read')
				?.requiredPolicies,
		).toEqual(['staff.read.self_or_management'])
	})

	it('limits Staff workbench reads to self or management', () => {
		expect(
			LABOS_PERMISSION_DEFINITION_REGISTRY.get('staff.workbench.read')
				?.requiredPolicies,
		).toEqual(['staff.workbench.self_or_management'])
	})

	it('does not expose deferred ownership or self-departure operations', () => {
		expect(LABOS_PERMISSIONS).not.toContain('membership.leave')
		expect(LABOS_PERMISSIONS).not.toContain('membership.owner.promote')
		expect(LABOS_PERMISSIONS).not.toContain('membership.owner.demote')
	})
})
