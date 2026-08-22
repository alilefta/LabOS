import 'server-only'

import { linkLabStaffToMember } from '@/lib/staff-member-link'

import {
	consoleStaffInvitationMonitor,
	type StaffInvitationMonitor,
} from './staff-invitation.monitor'
import {
	prismaStaffInvitationRepository,
	type StaffInvitationRepository,
} from './staff-invitation.repository'
import {
	STAFF_INVITATION_ERROR_CODES,
	StaffInvitationError,
} from './staff-invitation.types'

export type AcceptedStaffInvitationInput = {
	invitationId: string
	organizationId: string
	memberId: string
}

export type AcceptedStaffInvitationDependencies = {
	repository: StaffInvitationRepository
	monitor: StaffInvitationMonitor
	linkStaff: typeof linkLabStaffToMember
	now: () => number
}

const defaultDependencies: AcceptedStaffInvitationDependencies = {
	repository: prismaStaffInvitationRepository,
	monitor: consoleStaffInvitationMonitor,
	linkStaff: linkLabStaffToMember,
	now: () => performance.now(),
}

/**
 * Consumes optional LabStaff intent after Better Auth creates the Member.
 * Invitations without LabOS intent remain valid Organization invitations.
 * The link service re-verifies both tenant sides and is idempotent on retries.
 */
export async function processAcceptedStaffInvitation(
	input: AcceptedStaffInvitationInput,
	dependencies: AcceptedStaffInvitationDependencies = defaultDependencies,
): Promise<{ status: 'linked' | 'no_intent'; staffId: string | null }> {
	const startedAt = dependencies.now()
	const requestBase = {
		event: 'labos.staff_invitation' as const,
		operation: 'accept' as const,
		organizationId: input.organizationId,
		invitationId: input.invitationId,
		memberId: input.memberId,
	}
	dependencies.monitor.record({ ...requestBase, outcome: 'started' })
	let labId: string | undefined
	let staffId: string | undefined

	try {
		const state = await dependencies.repository.resolveAcceptance(input)
		if (!state.intent) {
			dependencies.monitor.record({
				...requestBase,
				outcome: 'no_intent',
				durationMs: Math.round(dependencies.now() - startedAt),
			})
			return { status: 'no_intent', staffId: null }
		}
		labId = state.intent.labId
		staffId = state.intent.staffId

		if (state.organizationLabId !== state.intent.labId) {
			throw new StaffInvitationError(
				STAFF_INVITATION_ERROR_CODES.TENANT_MISMATCH,
				'Invitation Organization does not own the intended LabStaff tenant',
			)
		}

		await dependencies.linkStaff({
			tenant: {
				organizationId: input.organizationId,
				labId: state.intent.labId,
			},
			staffId: state.intent.staffId,
			memberId: input.memberId,
		})
		await dependencies.repository.deleteIntent(input.invitationId)

		dependencies.monitor.record({
			...requestBase,
			labId,
			staffId,
			outcome: 'linked',
			durationMs: Math.round(dependencies.now() - startedAt),
		})
		return { status: 'linked', staffId: state.intent.staffId }
	} catch (cause) {
		const error =
			cause instanceof StaffInvitationError
				? cause
				: new StaffInvitationError(
						STAFF_INVITATION_ERROR_CODES.ACCEPTANCE_LINK_FAILED,
						'Organization membership exists but LabStaff linking failed',
						{ cause },
					)
		dependencies.monitor.record({
			...requestBase,
			labId,
			staffId,
			outcome: 'failed',
			durationMs: Math.round(dependencies.now() - startedAt),
			errorCode: error.code,
		})
		throw error
	}
}

/** Deletes LabOS intent after Better Auth cancels or rejects an invitation. */
export async function cleanupStaffInvitationIntent(
	invitationId: string,
	repository: StaffInvitationRepository = prismaStaffInvitationRepository,
	monitor: StaffInvitationMonitor = consoleStaffInvitationMonitor,
) {
	await repository.deleteIntent(invitationId)
	monitor.record({
		event: 'labos.staff_invitation',
		operation: 'cleanup',
		outcome: 'cleaned',
		invitationId,
	})
}
