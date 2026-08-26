'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

import { actionClientWithMembershipAuthorization } from '@/lib/safe-action'
import { membershipAdministrationService } from '@/modules/labos-membership'

/**
 * Invites a Member without creating or linking an operational LabStaff record.
 * Authorization V1 and Better Auth must independently allow the request. The
 * response deliberately excludes the invitation ID, email, and provider data.
 */
export const inviteOrganizationMemberAction =
	actionClientWithMembershipAuthorization('M-004').action(
		async ({ parsedInput, ctx }) => {
			const result = await membershipAdministrationService.invite(parsedInput, {
				tenant: ctx,
				requestHeaders: await headers(),
				correlationId: ctx.membershipAuthorizationCorrelationId,
			})
			revalidatePath('/settings/team')
			return {
				status: result.status,
				// Local development currently has no email delivery. Keep this
				// one-time handoff unavailable in production and out of telemetry.
				developmentInviteToken:
					process.env.NODE_ENV === 'development'
						? result.invitationId
						: null,
			}
		},
	)
