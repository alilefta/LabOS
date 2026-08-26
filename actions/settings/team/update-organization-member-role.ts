'use server'

import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

import { actionClientWithMembershipAuthorization } from '@/lib/safe-action'
import { membershipAdministrationService } from '@/modules/labos-membership'

/**
 * Updates a non-Owner Organization Member through two independent authorities.
 * The safe-action boundary requires V1 before this handler; the command service
 * revalidates V1 immediately before Better Auth performs its own permission
 * check and mutation. The approved Team settings UI is a convenience consumer;
 * it cannot override the trusted boundary, target facts, or role ceiling.
 */
export const updateOrganizationMemberRoleAction =
	actionClientWithMembershipAuthorization('M-002').action(
		async ({ parsedInput, ctx }) => {
			const result = await membershipAdministrationService.updateRole(parsedInput, {
				tenant: ctx,
				requestHeaders: await headers(),
				correlationId: ctx.membershipAuthorizationCorrelationId,
			})
			revalidatePath('/settings/team')
			return result
		},
	)
