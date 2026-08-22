import type { LabRole } from '@/schema/base/enums.base'

export type OrganizationStaffInvitationRole = 'admin' | 'manager' | 'staff'

export type StaffInvitationTenant = {
	organizationId: string
	labId: string
}

export type OrganizationInvitationRecord = {
	id: string
	organizationId: string
	email: string
	role: string
	status: string
	expiresAt: Date
}

export type StaffInvitationState = {
	staff: {
		id: string
		labId: string
		memberId: string | null
	} | null
	intent: {
		invitationId: string
		invitation: OrganizationInvitationRecord
	} | null
}

export type CreateStaffInvitationInput = {
	tenant: StaffInvitationTenant
	staffId: string
	email: string
	role: LabRole
	requestHeaders: Headers
}

export type CreateStaffInvitationResult = {
	status: 'created' | 'existing' | 'resent'
	invitation: OrganizationInvitationRecord
}

export const STAFF_INVITATION_ERROR_CODES = {
	STAFF_NOT_FOUND: 'STAFF_INVITATION_STAFF_NOT_FOUND',
	STAFF_ALREADY_LINKED: 'STAFF_INVITATION_STAFF_ALREADY_LINKED',
	OWNER_ROLE_FORBIDDEN: 'STAFF_INVITATION_OWNER_ROLE_FORBIDDEN',
	CREATE_FAILED: 'STAFF_INVITATION_CREATE_FAILED',
	INTENT_PERSISTENCE_FAILED: 'STAFF_INVITATION_INTENT_PERSISTENCE_FAILED',
	ACCEPTANCE_LINK_FAILED: 'STAFF_INVITATION_ACCEPTANCE_LINK_FAILED',
	TENANT_MISMATCH: 'STAFF_INVITATION_TENANT_MISMATCH',
} as const

export type StaffInvitationErrorCode =
	(typeof STAFF_INVITATION_ERROR_CODES)[keyof typeof STAFF_INVITATION_ERROR_CODES]

/** Stable error boundary for Better Auth invitation + LabStaff intent flows. */
export class StaffInvitationError extends Error {
	constructor(
		readonly code: StaffInvitationErrorCode,
		message: string,
		options?: ErrorOptions,
	) {
		super(message, options)
		this.name = 'StaffInvitationError'
	}
}
