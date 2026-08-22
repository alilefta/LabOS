import 'server-only'

import {
	betterAuthStaffInvitationGateway,
	type StaffInvitationGateway,
} from './staff-invitation.gateway'
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
	type CreateStaffInvitationInput,
	type CreateStaffInvitationResult,
	type OrganizationStaffInvitationRole,
} from './staff-invitation.types'

export type CreateStaffInvitationDependencies = {
	repository: StaffInvitationRepository
	gateway: StaffInvitationGateway
	monitor: StaffInvitationMonitor
	now: () => number
	currentDate: () => Date
}

const defaultDependencies: CreateStaffInvitationDependencies = {
	repository: prismaStaffInvitationRepository,
	gateway: betterAuthStaffInvitationGateway,
	monitor: consoleStaffInvitationMonitor,
	now: () => performance.now(),
	currentDate: () => new Date(),
}

function toOrganizationRole(
	role: CreateStaffInvitationInput['role'],
): OrganizationStaffInvitationRole {
	if (role === 'OWNER') {
		throw new StaffInvitationError(
			STAFF_INVITATION_ERROR_CODES.OWNER_ROLE_FORBIDDEN,
			'Owner access cannot be granted through a staff invitation',
		)
	}
	return role.toLowerCase() as OrganizationStaffInvitationRole
}

/**
 * Creates or resends a Better Auth Organization invitation and attaches the
 * optional LabStaff intent. The caller's session headers let Better Auth apply
 * its own Organization invitation permissions. Exact retries are idempotent;
 * changed email/role requests cancel the previous pending invitation first.
 */
export async function createStaffOrganizationInvitation(
	input: CreateStaffInvitationInput,
	dependencies: CreateStaffInvitationDependencies = defaultDependencies,
): Promise<CreateStaffInvitationResult> {
	const startedAt = dependencies.now()
	const email = input.email.trim().toLowerCase()
	const base = {
		event: 'labos.staff_invitation' as const,
		operation: 'create' as const,
		organizationId: input.tenant.organizationId,
		labId: input.tenant.labId,
		staffId: input.staffId,
	}
	dependencies.monitor.record({ ...base, outcome: 'started' })

	try {
		const role = toOrganizationRole(input.role)
		const state = await dependencies.repository.findState(input)
		if (!state.staff) {
			throw new StaffInvitationError(
				STAFF_INVITATION_ERROR_CODES.STAFF_NOT_FOUND,
				'Lab staff record was not found in the active tenant',
			)
		}
		if (state.staff.memberId) {
			throw new StaffInvitationError(
				STAFF_INVITATION_ERROR_CODES.STAFF_ALREADY_LINKED,
				'Lab staff already has an Organization member',
			)
		}

		const existing = state.intent?.invitation
		const pending =
			existing?.status === 'pending' &&
			existing.expiresAt > dependencies.currentDate()
		const exact =
			pending &&
			existing.organizationId === input.tenant.organizationId &&
			existing.email.toLowerCase() === email &&
			existing.role.toLowerCase() === role

		if (existing && !exact) {
			if (pending) {
				await dependencies.gateway.cancel({
					invitationId: existing.id,
					requestHeaders: input.requestHeaders,
				})
			}
			await dependencies.repository.deleteIntent(existing.id)
		}

		let invitation
		try {
			invitation = await dependencies.gateway.create({
				email,
				role,
				organizationId: input.tenant.organizationId,
				resend: Boolean(exact),
				requestHeaders: input.requestHeaders,
			})
		} catch (cause) {
			throw new StaffInvitationError(
				STAFF_INVITATION_ERROR_CODES.CREATE_FAILED,
				'Organization invitation creation failed',
				{ cause },
			)
		}

		try {
			await dependencies.repository.saveIntent({
				tenant: input.tenant,
				staffId: input.staffId,
				invitationId: invitation.id,
			})
		} catch (cause) {
			try {
				await dependencies.gateway.cancel({
					invitationId: invitation.id,
					requestHeaders: input.requestHeaders,
				})
			} catch {
				// Reconciliation can clean an invitation if compensation also fails.
			}
			throw new StaffInvitationError(
				STAFF_INVITATION_ERROR_CODES.INTENT_PERSISTENCE_FAILED,
				'Lab staff invitation intent could not be persisted',
				{ cause },
			)
		}

		const status = exact ? 'resent' : 'created'
		dependencies.monitor.record({
			...base,
			invitationId: invitation.id,
			outcome: status,
			durationMs: Math.round(dependencies.now() - startedAt),
		})
		return { status, invitation }
	} catch (cause) {
		const error =
			cause instanceof StaffInvitationError
				? cause
				: new StaffInvitationError(
						STAFF_INVITATION_ERROR_CODES.CREATE_FAILED,
						'Unexpected staff invitation failure',
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
