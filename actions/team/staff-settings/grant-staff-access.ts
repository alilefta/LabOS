'use server'

import { headers } from 'next/headers'

import { createStaffOrganizationInvitation } from '@/lib/staff-invitation'
import { actionClientWithAuthorizationCutover } from '@/lib/safe-action'

/**
 * Creates or resends Better Auth Organization access for an existing LabStaff
 * record. Better Auth owns invitation status and expiry; LabOS stores only the
 * optional staff-link intent consumed after acceptance.
 */
export const grantStaffSystemAccessAction =
	actionClientWithAuthorizationCutover('A-124')
	.action(async ({ parsedInput, ctx }) => {
		const result = await createStaffOrganizationInvitation({
			tenant: {
				organizationId: ctx.organizationId,
				labId: ctx.labId,
			},
			staffId: parsedInput.staffId,
			email: parsedInput.email,
			role: parsedInput.roleToGrant,
			requestHeaders: await headers(),
		})

		return {
			success: true,
			status: result.status,
			invite: {
				email: result.invitation.email,
				// Transitional DTO name: this is Better Auth's opaque invitation ID.
				token: result.invitation.id,
				expiresAt: result.invitation.expiresAt,
			},
		}
	})
