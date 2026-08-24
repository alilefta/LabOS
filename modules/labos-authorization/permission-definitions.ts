import {
	createPermissionDefinitionRegistry,
	type PermissionDefinition,
} from '@/platform/authorization'

import { LABOS_PERMISSIONS, type LabOSPermission } from './permissions'
import type { LabOSPolicyId } from './policy-ids'
import {
	LABOS_CATALOG_RESOURCE_TYPES,
	type LabOSResourceType,
} from './resource-types'

type LabOSPermissionDefinition = PermissionDefinition<
	LabOSPermission,
	LabOSResourceType,
	LabOSPolicyId
>

const organization = (
	permission: LabOSPermission,
	sensitivity: LabOSPermissionDefinition['sensitivity'],
	requiredPolicies: readonly LabOSPolicyId[] = [],
): LabOSPermissionDefinition =>
	Object.freeze({
		permission,
		scope: 'organization',
		requiredPolicies: Object.freeze([...requiredPolicies]),
		sensitivity,
	})

const resource = (
	permission: LabOSPermission,
	targetTypes: readonly LabOSResourceType[],
	sensitivity: LabOSPermissionDefinition['sensitivity'],
	requiredPolicies: readonly LabOSPolicyId[] = [],
): LabOSPermissionDefinition =>
	Object.freeze({
		permission,
		scope: 'resource',
		targetTypes: Object.freeze([...targetTypes]),
		requiredPolicies: Object.freeze([...requiredPolicies]),
		sensitivity,
	})

/**
 * Authoritative LabOS enforcement metadata. Callers select only a permission
 * and identifier-only target; scope, accepted target types, required policies,
 * and sensitivity always come from this catalog.
 */
export const LABOS_PERMISSION_DEFINITIONS = Object.freeze([
	organization('case.list', 'sensitive', ['case.list.scope']),
	resource('case.read', ['case'], 'sensitive', ['case.read']),
	organization('case.analytics.read', 'sensitive'),
	organization('case.create', 'sensitive'),
	resource('case.update', ['case'], 'sensitive'),
	resource('case.archive', ['case'], 'critical', ['case.archive']),
	resource('case.assign', ['case'], 'sensitive', ['case.assign']),
	resource('case.transition', ['case'], 'sensitive', ['case.transition']),
	organization('case.financials.list', 'sensitive'),
	resource('case.financials.read', ['case'], 'sensitive'),
	resource('case.financials.update', ['case'], 'critical', [
		'case.financials.update',
	]),

	organization('clinic.list', 'sensitive'),
	resource('clinic.read', ['clinic'], 'sensitive'),
	organization('clinic.analytics.list', 'sensitive'),
	resource('clinic.analytics.read', ['clinic'], 'sensitive'),
	organization('clinic.financials.list', 'sensitive'),
	resource('clinic.financials.read', ['clinic'], 'sensitive'),
	organization('clinic.create', 'sensitive'),
	resource('clinic.update', ['clinic'], 'sensitive'),
	resource('clinic.archive', ['clinic'], 'sensitive', ['clinic.archive']),

	organization('dentist.list', 'sensitive'),
	resource('dentist.read', ['dentist'], 'sensitive'),
	organization('dentist.create', 'sensitive'),
	resource('dentist.update', ['dentist'], 'sensitive'),
	resource('dentist.archive', ['dentist'], 'sensitive', ['dentist.archive']),

	organization('patient.list', 'sensitive'),
	resource('patient.read', ['patient'], 'sensitive'),
	organization('patient.create', 'sensitive'),
	resource('patient.update', ['patient'], 'sensitive'),
	resource('patient.archive', ['patient'], 'sensitive', ['patient.archive']),

	organization('catalog.list', 'ordinary'),
	resource(
		'catalog.read',
		LABOS_CATALOG_RESOURCE_TYPES,
		'ordinary',
	),
	resource('catalog.analytics.read', ['catalog.product'], 'ordinary'),
	organization('catalog.create', 'sensitive'),
	resource(
		'catalog.update',
		LABOS_CATALOG_RESOURCE_TYPES,
		'sensitive',
	),
	resource('catalog.archive', LABOS_CATALOG_RESOURCE_TYPES, 'sensitive', [
		'catalog.archive',
	]),
	resource('catalog.delete', LABOS_CATALOG_RESOURCE_TYPES, 'critical', [
		'catalog.delete',
	]),

	organization('staff.list', 'sensitive'),
	resource('staff.read', ['staff'], 'sensitive'),
	organization('staff.analytics.list', 'sensitive'),
	resource('staff.analytics.read', ['staff'], 'sensitive'),
	organization('staff.create', 'sensitive'),
	resource('staff.update', ['staff'], 'sensitive'),
	resource('staff.deactivate', ['staff'], 'critical', ['staff.deactivate']),
	resource('staff.schedule.update', ['staff'], 'sensitive'),
	resource('staff.assign', ['staff'], 'sensitive', ['staff.assign']),
	resource('staff.access.invite', ['staff'], 'critical', [
		'staff.access.target',
		'staff.access.self_target',
		'staff.access.role_target',
		'staff.access.invitation_state',
	]),
	resource('staff.access.revoke', ['staff'], 'critical', [
		'staff.access.target',
		'staff.access.self_target',
		'staff.access.role_target',
		'staff.access.linkage',
	]),
	resource('staff.compensation.read', ['staff'], 'sensitive'),
	resource('staff.compensation.update', ['staff'], 'critical', [
		'staff.compensation.update',
	]),

	organization('invoice.list', 'sensitive'),
	resource('invoice.read', ['invoice'], 'sensitive'),
	organization('invoice.analytics.read', 'sensitive'),
	organization('invoice.create', 'critical'),
	resource('invoice.update', ['invoice'], 'critical', ['invoice.update']),
	resource('invoice.cancel', ['invoice'], 'critical', ['invoice.cancel']),
	resource('invoice.delete_draft', ['invoice'], 'critical', [
		'invoice.delete_draft',
	]),
	resource('invoice.payment.record', ['invoice'], 'critical', [
		'invoice.payment.record',
	]),
	organization('invoice.overdue.sync', 'critical'),

	organization('payout.list', 'sensitive'),
	resource('payout.read', ['payout'], 'sensitive'),
	resource('payout.issue', ['staff'], 'critical', ['payout.issue']),
	resource('payout.void', ['payout'], 'critical', ['payout.void']),

	organization('lab.settings.read', 'ordinary'),
	organization('lab.settings.update', 'sensitive'),

	organization('membership.list', 'sensitive'),
	resource('membership.read', ['member'], 'sensitive'),
	resource('membership.role.update', ['member'], 'critical', [
		'membership.non_owner_target',
		'membership.self_target',
		'membership.role_assignment',
	]),
	resource('membership.remove', ['member'], 'critical', [
		'membership.non_owner_target',
		'membership.self_target',
	]),

	organization('billing.read', 'sensitive'),
	organization('billing.manage', 'critical'),
] satisfies readonly LabOSPermissionDefinition[])

function assertCompleteCatalog() {
	const configured = new Set(
		LABOS_PERMISSION_DEFINITIONS.map((definition) => definition.permission),
	)
	const missing = LABOS_PERMISSIONS.filter(
		(permission) => !configured.has(permission),
	)

	if (missing.length > 0) {
		throw new Error(
			`Missing LabOS permission definitions: ${missing.join(', ')}`,
		)
	}
}

assertCompleteCatalog()

export const LABOS_PERMISSION_DEFINITION_REGISTRY =
	createPermissionDefinitionRegistry(LABOS_PERMISSION_DEFINITIONS)
