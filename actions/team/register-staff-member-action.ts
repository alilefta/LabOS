'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithAuthorizationShadow } from '@/lib/safe-action'
import { normalizeLabStaff } from '@/lib/mappers'
import { buildOperationalStaffCreateData } from '@/modules/labos-staff/operational-staff-creation'

/**
 * A-123 creates only the tenant-scoped operational Staff identity.
 *
 * Digital access is granted separately by A-124 after this command returns a
 * Staff ID. Compensation also has its own resource-scoped command. The
 * explicit zero-value defaults prevent basic Staff creation from silently
 * creating a payable entitlement.
 */
export const createLabStaffAction = actionClientWithAuthorizationShadow('A-123')
	.action(async ({ parsedInput, ctx }) => {
		const prisma = await tenantPrisma(ctx.labId)

		const staff = await prisma.labStaff.create({
			data: buildOperationalStaffCreateData(parsedInput, ctx.labId),
		})

		return {
			staff: {
				...normalizeLabStaff(staff),
				labInvitation: null,
			},
		}
	})
