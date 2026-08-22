import type { StaffInvitationErrorCode } from './staff-invitation.types'

export type StaffInvitationMonitorEvent = {
	event: 'labos.staff_invitation'
	operation: 'create' | 'accept' | 'cleanup'
	outcome:
		| 'started'
		| 'created'
		| 'existing'
		| 'resent'
		| 'linked'
		| 'no_intent'
		| 'cleaned'
		| 'failed'
	organizationId?: string
	labId?: string
	staffId?: string
	invitationId?: string
	memberId?: string
	durationMs?: number
	errorCode?: StaffInvitationErrorCode
}

export interface StaffInvitationMonitor {
	record(event: StaffInvitationMonitorEvent): void
}

/** Emits invitation lifecycle telemetry without email, headers, or tokens. */
export const consoleStaffInvitationMonitor: StaffInvitationMonitor = {
	record(event) {
		const writer = event.outcome === 'failed' ? console.warn : console.info
		writer(event)
	},
}
