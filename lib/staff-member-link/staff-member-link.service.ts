import 'server-only'

import {
	consoleStaffMemberLinkMonitor,
	type StaffMemberLinkMonitor,
	type StaffMemberLinkMonitorEvent,
} from './staff-member-link.monitor'
import {
	prismaStaffMemberLinkRepository,
	type StaffMemberLinkRepository,
} from './staff-member-link.repository'
import {
	STAFF_MEMBER_LINK_ERROR_CODES,
	StaffMemberLinkError,
	type StaffMemberLinkResult,
	type StaffMemberLinkState,
	type StaffMemberLinkTenant,
} from './staff-member-link.types'

export type StaffMemberLinkDependencies = {
	repository: StaffMemberLinkRepository
	monitor: StaffMemberLinkMonitor
	now: () => number
}

const defaultDependencies: StaffMemberLinkDependencies = {
	repository: prismaStaffMemberLinkRepository,
	monitor: consoleStaffMemberLinkMonitor,
	now: () => performance.now(),
}

function requireStaff(state: StaffMemberLinkState) {
	if (!state.staff) {
		throw new StaffMemberLinkError(
			STAFF_MEMBER_LINK_ERROR_CODES.STAFF_NOT_FOUND,
			'Lab staff record was not found in the active tenant',
		)
	}
	return state.staff
}

function requireMember(state: StaffMemberLinkState) {
	if (!state.member) {
		throw new StaffMemberLinkError(
			STAFF_MEMBER_LINK_ERROR_CODES.MEMBER_NOT_FOUND,
			'Organization member was not found in the active tenant',
		)
	}
	return state.member
}

function monitorBase(input: {
	operation: 'link' | 'unlink'
	tenant: StaffMemberLinkTenant
	staffId: string
	memberId?: string
}): Pick<
	StaffMemberLinkMonitorEvent,
	'event' | 'operation' | 'organizationId' | 'labId' | 'staffId' | 'memberId'
> {
	return {
		event: 'labos.staff_member_link',
		operation: input.operation,
		organizationId: input.tenant.organizationId,
		labId: input.tenant.labId,
		staffId: input.staffId,
		memberId: input.memberId,
	}
}

/**
 * Links one tenant-scoped operational LabStaff record to one Better Auth
 * Member. The caller must authorize staff-account management before invoking
 * this function; this service owns tenant integrity and one-to-one invariants.
 *
 * The operation is idempotent for an existing exact link. If a concurrent
 * writer wins the unique memberId race, authoritative state is re-read: the
 * exact link is accepted, while every other outcome becomes a stable conflict.
 */
export async function linkLabStaffToMember(
	input: {
		tenant: StaffMemberLinkTenant
		staffId: string
		memberId: string
	},
	dependencies: StaffMemberLinkDependencies = defaultDependencies,
): Promise<StaffMemberLinkResult> {
	const startedAt = dependencies.now()
	const base = monitorBase({ operation: 'link', ...input })
	dependencies.monitor.record({ ...base, outcome: 'started' })

	try {
		let state = await dependencies.repository.readState(input)
		const staff = requireStaff(state)
		const member = requireMember(state)

		if (staff.memberId === member.id && member.linkedStaffId === staff.id) {
			dependencies.monitor.record({
				...base,
				outcome: 'existing',
				durationMs: Math.round(dependencies.now() - startedAt),
			})
			return { status: 'existing', staffId: staff.id, memberId: member.id }
		}

		if (staff.memberId && staff.memberId !== member.id) {
			throw new StaffMemberLinkError(
				STAFF_MEMBER_LINK_ERROR_CODES.STAFF_ALREADY_LINKED,
				'Lab staff is already linked to another member',
			)
		}

		if (member.linkedStaffId && member.linkedStaffId !== staff.id) {
			throw new StaffMemberLinkError(
				STAFF_MEMBER_LINK_ERROR_CODES.MEMBER_ALREADY_LINKED,
				'Organization member is already linked to another staff record',
			)
		}

		try {
			await dependencies.repository.setMember({
				tenant: input.tenant,
				staffId: input.staffId,
				expectedMemberId: staff.memberId,
				memberId: input.memberId,
			})
		} catch (cause) {
			state = await dependencies.repository.readState(input)
			if (
				state.staff?.memberId !== input.memberId ||
				state.member?.linkedStaffId !== input.staffId
			) {
				throw new StaffMemberLinkError(
					STAFF_MEMBER_LINK_ERROR_CODES.CONCURRENT_CONFLICT,
					'Concurrent staff-member linking conflict',
					{ cause },
				)
			}
		}

		dependencies.monitor.record({
			...base,
			outcome: 'linked',
			durationMs: Math.round(dependencies.now() - startedAt),
		})
		return { status: 'linked', staffId: input.staffId, memberId: input.memberId }
	} catch (cause) {
		const error =
			cause instanceof StaffMemberLinkError
				? cause
				: new StaffMemberLinkError(
						STAFF_MEMBER_LINK_ERROR_CODES.PERSISTENCE_FAILED,
						'Staff-member link operation failed',
						{ cause },
					)
		dependencies.monitor.record({
			...base,
			outcome: 'failed',
			durationMs: Math.round(dependencies.now() - startedAt),
			errorCode: error.code,
		})
		throw error
	}
}

/**
 * Removes a LabStaff-to-Member link while preserving both records and all
 * operational history. An already-unlinked staff record is a successful,
 * idempotent result.
 */
export async function unlinkLabStaffFromMember(
	input: { tenant: StaffMemberLinkTenant; staffId: string },
	dependencies: StaffMemberLinkDependencies = defaultDependencies,
): Promise<StaffMemberLinkResult> {
	const startedAt = dependencies.now()
	const base = monitorBase({ operation: 'unlink', ...input })
	dependencies.monitor.record({ ...base, outcome: 'started' })

	try {
		const state = await dependencies.repository.readState(input)
		const staff = requireStaff(state)

		if (!staff.memberId) {
			dependencies.monitor.record({
				...base,
				outcome: 'existing',
				durationMs: Math.round(dependencies.now() - startedAt),
			})
			return { status: 'existing', staffId: staff.id, memberId: null }
		}

		await dependencies.repository.setMember({
			tenant: input.tenant,
			staffId: input.staffId,
			expectedMemberId: staff.memberId,
			memberId: null,
		})

		dependencies.monitor.record({
			...base,
			memberId: staff.memberId,
			outcome: 'unlinked',
			durationMs: Math.round(dependencies.now() - startedAt),
		})
		return { status: 'unlinked', staffId: staff.id, memberId: null }
	} catch (cause) {
		const error =
			cause instanceof StaffMemberLinkError
				? cause
				: new StaffMemberLinkError(
						STAFF_MEMBER_LINK_ERROR_CODES.PERSISTENCE_FAILED,
						'Staff-member unlink operation failed',
						{ cause },
					)
		dependencies.monitor.record({
			...base,
			outcome: 'failed',
			durationMs: Math.round(dependencies.now() - startedAt),
			errorCode: error.code,
		})
		throw error
	}
}
