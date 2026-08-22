import 'server-only'

import { auth } from '@/lib/auth'
import { unlinkLabStaffFromMember } from '@/lib/staff-member-link'

export type StaffAccessRevocationInput = {
	tenant: { organizationId: string; labId: string }
	staffId: string
	memberId: string
	requestHeaders: Headers
}

export type StaffAccessRevocationResult = {
	status: 'membership_removed'
	staffLinkStatus: 'unlinked' | 'already_unlinked' | 'pending_reconciliation'
}

export type StaffAccessRevocationMonitorEvent = {
	event: 'labos.staff_access_revocation'
	outcome: 'started' | 'completed' | 'partial' | 'failed'
	organizationId: string
	labId: string
	staffId: string
	memberId: string
	phase?: 'membership_removal' | 'staff_unlink'
	durationMs?: number
}

export interface StaffAccessRevocationMonitor {
	record(event: StaffAccessRevocationMonitorEvent): void
}

export type StaffAccessRevocationDependencies = {
	removeMembership(input: {
		organizationId: string
		memberId: string
		requestHeaders: Headers
	}): Promise<void>
	unlinkStaff: typeof unlinkLabStaffFromMember
	monitor: StaffAccessRevocationMonitor
	now: () => number
}

const consoleStaffAccessRevocationMonitor: StaffAccessRevocationMonitor = {
	record(event) {
		const writer =
			event.outcome === 'failed' || event.outcome === 'partial'
				? console.warn
				: console.info
		writer(event)
	},
}

const defaultDependencies: StaffAccessRevocationDependencies = {
	async removeMembership({ organizationId, memberId, requestHeaders }) {
		await auth.api.removeMember({
			body: { memberIdOrEmail: memberId, organizationId },
			headers: requestHeaders,
		})
	},
	unlinkStaff: unlinkLabStaffFromMember,
	monitor: consoleStaffAccessRevocationMonitor,
	now: () => performance.now(),
}

function hasOrganizationRole(roleList: string, expectedRole: string) {
	return roleList
		.split(',')
		.map((role) => role.trim().toLowerCase())
		.includes(expectedRole)
}

/**
 * Applies invariant revocation protections shared by explicit access removal
 * and operational staff deactivation. Better Auth still performs the final
 * Organization permission check when membership removal is requested.
 */
export function assertStaffAccessRevocationAllowed(input: {
	actorUserId: string
	actorMemberRole: string
	targetUserId: string
	targetMemberRole: string
}) {
	if (input.targetUserId === input.actorUserId) {
		throw new Error(
			'Self-lockout prevented. You cannot revoke your own Organization access.',
		)
	}
	if (
		hasOrganizationRole(input.targetMemberRole, 'owner') &&
		!hasOrganizationRole(input.actorMemberRole, 'owner')
	) {
		throw new Error(
			"Permission denied. Only an Organization owner can revoke another owner's access.",
		)
	}
}

/**
 * Revokes a staff account's tenant access in security-first order.
 *
 * Better Auth membership removal is authoritative and runs first. Its Member
 * deletion applies `LabStaff.memberId = null` through the database foreign key.
 * The existing idempotent unlink service then verifies that tenant-scoped
 * staff state and emits the normal staff-link monitoring event.
 *
 * If verification cannot run after membership removal, access remains revoked
 * and a partial result is returned for reconciliation. Request headers and
 * identity data beyond safe resource IDs are never recorded by this service.
 */
export async function revokeStaffOrganizationAccess(
	input: StaffAccessRevocationInput,
	dependencies: StaffAccessRevocationDependencies = defaultDependencies,
): Promise<StaffAccessRevocationResult> {
	const startedAt = dependencies.now()
	const base = {
		event: 'labos.staff_access_revocation' as const,
		organizationId: input.tenant.organizationId,
		labId: input.tenant.labId,
		staffId: input.staffId,
		memberId: input.memberId,
	}
	dependencies.monitor.record({ ...base, outcome: 'started' })

	try {
		await dependencies.removeMembership({
			organizationId: input.tenant.organizationId,
			memberId: input.memberId,
			requestHeaders: input.requestHeaders,
		})
	} catch (cause) {
		dependencies.monitor.record({
			...base,
			outcome: 'failed',
			phase: 'membership_removal',
			durationMs: Math.round(dependencies.now() - startedAt),
		})
		throw cause
	}

	try {
		const unlink = await dependencies.unlinkStaff({
			tenant: input.tenant,
			staffId: input.staffId,
		})
		const staffLinkStatus =
			unlink.status === 'unlinked' ? 'unlinked' : 'already_unlinked'

		dependencies.monitor.record({
			...base,
			outcome: 'completed',
			phase: 'staff_unlink',
			durationMs: Math.round(dependencies.now() - startedAt),
		})
		return { status: 'membership_removed', staffLinkStatus }
	} catch {
		// Better Auth membership removal already committed. The database FK is
		// the integrity backstop; retain a visible reconciliation signal rather
		// than presenting the access revocation itself as failed.
		dependencies.monitor.record({
			...base,
			outcome: 'partial',
			phase: 'staff_unlink',
			durationMs: Math.round(dependencies.now() - startedAt),
		})
		return {
			status: 'membership_removed',
			staffLinkStatus: 'pending_reconciliation',
		}
	}
}
