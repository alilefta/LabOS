import 'server-only'

import { auth } from '@/lib/auth'

import type {
	OrganizationInvitationRecord,
	OrganizationStaffInvitationRole,
} from './staff-invitation.types'

export interface StaffInvitationGateway {
	create(input: {
		email: string
		role: OrganizationStaffInvitationRole
		organizationId: string
		resend: boolean
		requestHeaders: Headers
	}): Promise<OrganizationInvitationRecord>
	cancel(input: {
		invitationId: string
		requestHeaders: Headers
	}): Promise<void>
}

/** Better Auth server-API adapter; session headers establish the inviter. */
export const betterAuthStaffInvitationGateway: StaffInvitationGateway = {
	async create({ requestHeaders, ...body }) {
		return auth.api.createInvitation({ body, headers: requestHeaders })
	},
	async cancel({ invitationId, requestHeaders }) {
		await auth.api.cancelInvitation({
			body: { invitationId },
			headers: requestHeaders,
		})
	},
}
