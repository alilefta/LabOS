import type { StaffMemberLinkErrorCode } from './staff-member-link.types'

export type StaffMemberLinkMonitorEvent = {
	event: 'labos.staff_member_link'
	operation: 'link' | 'unlink'
	outcome: 'started' | 'linked' | 'unlinked' | 'existing' | 'failed'
	organizationId: string
	labId: string
	staffId: string
	memberId?: string
	durationMs?: number
	errorCode?: StaffMemberLinkErrorCode
}

export interface StaffMemberLinkMonitor {
	record(event: StaffMemberLinkMonitorEvent): void
}

/**
 * Emits structured bridge telemetry without names, email addresses, tokens,
 * request headers, database error messages, or stack traces.
 */
export const consoleStaffMemberLinkMonitor: StaffMemberLinkMonitor = {
	record(event) {
		const writer = event.outcome === 'failed' ? console.warn : console.info
		writer(event)
	},
}
