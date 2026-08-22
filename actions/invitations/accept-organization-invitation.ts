'use server'

import { headers } from 'next/headers'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { actionClientWithSession } from '@/lib/safe-action'
import { processAcceptedStaffInvitation } from '@/lib/staff-invitation'

export const AcceptOrganizationInvitationInputSchema = z.object({
	invitationId: z.string().trim().min(1).max(128),
})

/**
 * Accepts a Better Auth Organization invitation for the authenticated user.
 * Better Auth verifies pending status, expiry, and recipient email, creates the
 * Member, and selects the Organization. LabStaff intent is then retried
 * explicitly in addition to the global post-accept hook.
 */
export const acceptOrganizationInvitationAction = actionClientWithSession
	.metadata({
		actionName: 'Accept-Organization-Invitation',
		requiredLabRole: null,
	})
	.inputSchema(AcceptOrganizationInvitationInputSchema)
	.action(async ({ parsedInput }) => {
		const result = await auth.api.acceptInvitation({
			body: { invitationId: parsedInput.invitationId },
			headers: await headers(),
		})

		let staffIntentStatus: 'completed' | 'pending_reconciliation' = 'completed'
		try {
			await processAcceptedStaffInvitation({
				invitationId: result.invitation.id,
				organizationId: result.invitation.organizationId,
				memberId: result.member.id,
			})
		} catch {
			// Better Auth membership is valid. The retained intent and monitor
			// permit safe reconciliation without denying the user their access.
			staffIntentStatus = 'pending_reconciliation'
		}

		return {
			organizationId: result.invitation.organizationId,
			memberId: result.member.id,
			staffIntentStatus,
		}
	})
