export type StaffMemberLinkTenant = {
	organizationId: string
	labId: string
}

export type StaffMemberLinkState = {
	staff: {
		id: string
		labId: string
		memberId: string | null
		isActive: boolean
	} | null
	member: {
		id: string
		organizationId: string
		linkedStaffId: string | null
	} | null
}

export type StaffMemberLinkResult = {
	status: 'linked' | 'unlinked' | 'existing'
	staffId: string
	memberId: string | null
}

export const STAFF_MEMBER_LINK_ERROR_CODES = {
	STAFF_NOT_FOUND: 'STAFF_MEMBER_LINK_STAFF_NOT_FOUND',
	MEMBER_NOT_FOUND: 'STAFF_MEMBER_LINK_MEMBER_NOT_FOUND',
	STAFF_ALREADY_LINKED: 'STAFF_MEMBER_LINK_STAFF_ALREADY_LINKED',
	MEMBER_ALREADY_LINKED: 'STAFF_MEMBER_LINK_MEMBER_ALREADY_LINKED',
	CONCURRENT_CONFLICT: 'STAFF_MEMBER_LINK_CONCURRENT_CONFLICT',
	PERSISTENCE_FAILED: 'STAFF_MEMBER_LINK_PERSISTENCE_FAILED',
} as const

export type StaffMemberLinkErrorCode =
	(typeof STAFF_MEMBER_LINK_ERROR_CODES)[keyof typeof STAFF_MEMBER_LINK_ERROR_CODES]

/**
 * Stable application error for the LabStaff-to-Member bridge. Raw database
 * errors are retained as causes for server diagnostics and must not be sent to
 * clients.
 */
export class StaffMemberLinkError extends Error {
	constructor(
		readonly code: StaffMemberLinkErrorCode,
		message: string,
		options?: ErrorOptions,
	) {
		super(message, options)
		this.name = 'StaffMemberLinkError'
	}
}
