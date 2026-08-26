'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

import { actionClientWithMembershipAuthorization } from '@/lib/safe-action'
import { membershipAdministrationService } from '@/modules/labos-membership'

/**
 * Removes a non-Owner, non-self, Member-only Organization account. A Member
 * linked to LabStaff is denied here and must use A-125 so access removal,
 * unlinking, and reconciliation remain one protected operation. Ownership and
 * self-departure remain separate, unavailable operations.
 */
export const removeOrganizationMemberAction =
	actionClientWithMembershipAuthorization('M-003').action(
		async ({ parsedInput, ctx }) => {
			const result = await membershipAdministrationService.remove(parsedInput, {
				tenant: ctx,
				requestHeaders: await headers(),
				correlationId: ctx.membershipAuthorizationCorrelationId,
			})
			revalidatePath('/settings/team')
			return result
		},
	)
