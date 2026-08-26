import {
	AUTHORIZATION_DENIAL_REASONS,
	normalizeRoles,
} from '@/platform/authorization'
import type {
	AuthorizationPolicy,
	AuthorizationPolicyContext,
	AuthorizationPolicyResult,
} from '@/platform/authorization'

import type {
	MembershipAdministrationFactLoader,
	StaffAccessFactLoader,
} from '../fact-loaders/membership-access-facts'
import type { LabOSAuthorizationOperationMap } from '../operation-intents'
import type { LabOSPermission } from '../permissions'
import type { LabOSPolicyId } from '../policy-ids'
import type { LabOSResourceType } from '../resource-types'
import {
	LABOS_ORGANIZATION_ROLES,
	type LabOSOrganizationRole,
} from '../roles'

type MembershipAccessPolicyId = Extract<
	LabOSPolicyId,
	| 'staff.access.target'
	| 'staff.access.self_target'
	| 'staff.access.role_target'
	| 'staff.access.invitation_state'
	| 'staff.access.linkage'
	| 'membership.non_owner_target'
	| 'membership.self_target'
	| 'membership.unlinked_staff_target'
	| 'membership.role_assignment'
	| 'membership.invitation.role_assignment'
>

type LabOSPolicy = AuthorizationPolicy<
	LabOSPermission,
	LabOSResourceType,
	LabOSAuthorizationOperationMap
>

type LabOSPolicyContext = AuthorizationPolicyContext<
	LabOSPermission,
	LabOSResourceType,
	LabOSAuthorizationOperationMap
>

const ALLOW = Object.freeze({ allowed: true } as const)
const DENY = Object.freeze({
	allowed: false,
	reason: AUTHORIZATION_DENIAL_REASONS.POLICY_DENIED,
} as const)
const FACT_MISSING = Object.freeze({
	allowed: false,
	reason: AUTHORIZATION_DENIAL_REASONS.POLICY_FACT_MISSING,
} as const)
const OWNER_INVARIANT = Object.freeze({
	allowed: false,
	reason: AUTHORIZATION_DENIAL_REASONS.OWNER_INVARIANT,
} as const)

type NonOwnerRole = Exclude<LabOSOrganizationRole, 'owner'>

/**
 * Approved actor-to-target ceiling. The Sets stay private and immutable to
 * consumers; both invitation and revocation consult this evaluator rather
 * than duplicating role conditionals in actions.
 */
const STAFF_ACCESS_ROLE_TARGETS: Readonly<
	Record<LabOSOrganizationRole, ReadonlySet<NonOwnerRole>>
> = {
	owner: new Set<NonOwnerRole>(['admin', 'manager', 'staff']),
	admin: new Set<NonOwnerRole>(['staff']),
	manager: new Set<NonOwnerRole>(),
	staff: new Set<NonOwnerRole>(),
}

type MembershipAccessPolicyDependencies = {
	staffAccessFacts: StaffAccessFactLoader
	membershipAdministrationFacts: MembershipAdministrationFactLoader
	now?: () => Date
}

function parseRoles(rawRoles: unknown) {
	if (!Array.isArray(rawRoles)) return null
	const normalized = normalizeRoles(rawRoles, LABOS_ORGANIZATION_ROLES)
	return normalized.roles.length > 0 && normalized.unknownRoleCount === 0
		? normalized.roles
		: null
}

function parseMemberRole(role: string) {
	return parseRoles(role.split(','))
}

function canTargetRoles(
	actorRawRoles: readonly string[],
	targetRoles: readonly LabOSOrganizationRole[],
) {
	const actorRoles = parseRoles(actorRawRoles)
	if (!actorRoles) return false

	return targetRoles.every(
		(targetRole) =>
			targetRole !== 'owner' &&
			actorRoles.some((actorRole) =>
				STAFF_ACCESS_ROLE_TARGETS[actorRole].has(targetRole),
			),
	)
}

function normalizeEmail(email: unknown) {
	if (typeof email !== 'string') return null
	const normalized = email.trim().toLowerCase()
	return normalized && normalized.includes('@') ? normalized : null
}

async function loadStaffFacts(
	context: LabOSPolicyContext,
	loader: StaffAccessFactLoader,
) {
	if (!context.target || context.target.type !== 'staff') return null
	return loader.load({
		actor: context.actor,
		target: { type: 'staff', id: context.target.id },
		facts: context.facts,
	})
}

async function loadMemberFacts(
	context: LabOSPolicyContext,
	loader: MembershipAdministrationFactLoader,
) {
	if (!context.target || context.target.type !== 'member') return null
	return loader.load({
		actor: context.actor,
		target: { type: 'member', id: context.target.id },
		facts: context.facts,
	})
}

/**
 * Creates the concrete V1 policies for Staff access and Member administration.
 * Every policy reloads tenant-scoped facts through its typed loader; operation
 * intent can describe only the two approved role-changing commands.
 */
export function createMembershipAccessPolicies({
	staffAccessFacts,
	membershipAdministrationFacts,
	now = () => new Date(),
}: MembershipAccessPolicyDependencies): Readonly<
	Record<MembershipAccessPolicyId, LabOSPolicy>
> {
	return Object.freeze({
		'staff.access.target': {
			async evaluate(context) {
				const facts = await loadStaffFacts(context, staffAccessFacts)
				if (!facts) return FACT_MISSING
				if (
					!facts.isActive ||
					facts.organizationId !== context.actor.organizationId ||
					(facts.member &&
						facts.member.organizationId !== context.actor.organizationId)
				) {
					return DENY
				}
				if (context.permission === 'staff.access.invite' && facts.member) {
					return DENY
				}
				return ALLOW
			},
		},

		'staff.access.self_target': {
			async evaluate(context) {
				const facts = await loadStaffFacts(context, staffAccessFacts)
				if (!facts) return FACT_MISSING
				if (
					facts.member &&
					(facts.member.id === context.actor.memberId ||
						facts.member.userId === context.actor.userId)
				) {
					return DENY
				}
				return ALLOW
			},
		},

		'staff.access.role_target': {
			async evaluate(context) {
				const facts = await loadStaffFacts(context, staffAccessFacts)
				if (!facts) return FACT_MISSING

				let targetRoles: readonly LabOSOrganizationRole[] | null = null
				if (context.permission === 'staff.access.invite') {
					if (
						!context.operation ||
						context.operation.kind !== 'staff.access.invite'
					) {
						return FACT_MISSING
					}
					targetRoles = parseRoles([context.operation.requestedRole])
				} else if (context.permission === 'staff.access.revoke') {
					if (Boolean(facts.member) === Boolean(facts.invitation)) {
						return FACT_MISSING
					}
					targetRoles = facts.member
						? parseMemberRole(facts.member.role)
						: facts.invitation?.role
							? parseMemberRole(facts.invitation.role)
							: null
				} else {
					return FACT_MISSING
				}

				if (!targetRoles) return FACT_MISSING
				if (targetRoles.includes('owner')) return OWNER_INVARIANT
				return canTargetRoles(context.actor.memberRoles, targetRoles)
					? ALLOW
					: DENY
			},
		},

		'staff.access.invitation_state': {
			async evaluate(context) {
				if (
					context.permission !== 'staff.access.invite' ||
					!context.operation ||
					context.operation.kind !== 'staff.access.invite' ||
					!normalizeEmail(context.operation.recipientEmail)
				) {
					return FACT_MISSING
				}

				const facts = await loadStaffFacts(context, staffAccessFacts)
				if (!facts) return FACT_MISSING
				if (facts.member) return DENY
				if (!facts.invitation) return ALLOW

				const requestedEmail = normalizeEmail(
					context.operation.recipientEmail,
				)!
				const invitationEmail = normalizeEmail(facts.invitation.email)
				const invitationRoles = facts.invitation.role
					? parseMemberRole(facts.invitation.role)
					: null
				if (
					facts.invitation.organizationId !== context.actor.organizationId ||
					facts.invitation.intentLabId !== facts.labId ||
					!invitationEmail ||
					!invitationRoles ||
					!facts.invitation.status.trim() ||
					Number.isNaN(facts.invitation.expiresAt.getTime())
				) {
					return DENY
				}

				// Pending exact intent is an idempotent resend. Changed, expired, or
				// completed intent is a replacement/cleanup path in the mutation
				// service; all remain authorized only after the role ceiling passed.
				const isExactPendingIntent =
					facts.invitation.status === 'pending' &&
					facts.invitation.expiresAt > now() &&
					invitationEmail === requestedEmail &&
					invitationRoles.length === 1 &&
					invitationRoles[0] === context.operation.requestedRole
				if (isExactPendingIntent) return ALLOW
				return ALLOW
			},
		},

		'staff.access.linkage': {
			async evaluate(context) {
				const facts = await loadStaffFacts(context, staffAccessFacts)
				if (!facts) return FACT_MISSING
				if (Boolean(facts.member) === Boolean(facts.invitation)) return DENY

				if (facts.member) {
					return facts.member.organizationId === context.actor.organizationId
						? ALLOW
						: DENY
				}
				return facts.invitation?.organizationId ===
						context.actor.organizationId &&
					facts.invitation.intentLabId === facts.labId
					? ALLOW
					: DENY
			},
		},

		'membership.non_owner_target': {
			async evaluate(context) {
				const facts = await loadMemberFacts(
					context,
					membershipAdministrationFacts,
				)
				if (!facts) return FACT_MISSING
				if (facts.organizationId !== context.actor.organizationId) return DENY
				const targetRoles = parseMemberRole(facts.role)
				if (!targetRoles) return FACT_MISSING
				return targetRoles.includes('owner') ? OWNER_INVARIANT : ALLOW
			},
		},

		'membership.self_target': {
			async evaluate(context) {
				const facts = await loadMemberFacts(
					context,
					membershipAdministrationFacts,
				)
				if (!facts) return FACT_MISSING
				return facts.memberId === context.actor.memberId ||
					facts.userId === context.actor.userId
					? DENY
					: ALLOW
			},
		},

		'membership.unlinked_staff_target': {
			async evaluate(context) {
				if (context.permission !== 'membership.remove') return FACT_MISSING
				const facts = await loadMemberFacts(
					context,
					membershipAdministrationFacts,
				)
				if (!facts) return FACT_MISSING

				// A linked operational Staff identity must use A-125 so its stricter
				// Staff target-role ceiling and unlink/reconciliation path cannot be
				// bypassed through generic Member administration.
				return facts.staffId ? DENY : ALLOW
			},
		},

		'membership.role_assignment': {
			async evaluate(context): Promise<AuthorizationPolicyResult> {
				if (
					context.permission !== 'membership.role.update' ||
					!context.operation ||
					context.operation.kind !== 'membership.role.update'
				) {
					return FACT_MISSING
				}

				const requestedRoles = parseRoles(context.operation.requestedRoles)
				if (!requestedRoles) return FACT_MISSING
				if (requestedRoles.includes('owner')) return OWNER_INVARIANT
				return canTargetRoles(context.actor.memberRoles, requestedRoles)
					? ALLOW
					: DENY
			},
		},

		'membership.invitation.role_assignment': {
			evaluate(context): AuthorizationPolicyResult {
				if (
					context.permission !== 'membership.invite' ||
					!context.operation ||
					context.operation.kind !== 'membership.invite' ||
					!normalizeEmail(context.operation.recipientEmail)
				) {
					return FACT_MISSING
				}

				const requestedRoles = parseRoles([
					context.operation.requestedRole,
				])
				if (!requestedRoles) return FACT_MISSING
				if (requestedRoles.includes('owner')) return OWNER_INVARIANT
				return canTargetRoles(context.actor.memberRoles, requestedRoles)
					? ALLOW
					: DENY
			},
		},
	})
}
