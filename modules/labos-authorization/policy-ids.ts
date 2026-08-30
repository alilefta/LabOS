/**
 * Stable identifiers for mandatory LabOS policies. Implementations and fact
 * loaders are added in the adapters slice; missing registration fails closed.
 */
export const LABOS_POLICY_IDS = [
	'case.list.scope',
	'case.read',
	'case.archive',
	'case.assign',
	'case.transition',
	'case.financials.update',
	'clinic.archive',
	'dentist.archive',
	'patient.archive',
	'catalog.archive',
	'catalog.delete',
	'staff.deactivate',
	'staff.assign',
	'staff.analytics.self_or_management',
	'staff.workbench.self_or_management',
	'staff.access.target',
	'staff.access.self_target',
	'staff.access.role_target',
	'staff.access.invitation_state',
	'staff.access.linkage',
	'staff.compensation.update',
	'invoice.update',
	'invoice.cancel',
	'invoice.delete_draft',
	'invoice.payment.record',
	'payout.issue',
	'payout.void',
	'membership.non_owner_target',
	'membership.self_target',
	'membership.unlinked_staff_target',
	'membership.role_assignment',
	'membership.invitation.role_assignment',
] as const

export type LabOSPolicyId = (typeof LABOS_POLICY_IDS)[number]
