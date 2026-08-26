// actions/team/staff-settings/update-staff-identity.ts
'use server'

import { ERRORS } from '@/lib/errors'
import { normalizeLabStaff } from '@/lib/mappers'
import { generalPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { UpdateStaffIdentityInputSchema } from '@/schema/composed/team/staff-settings.schema'

/**
 * Updates tenant-scoped operational identity only.
 *
 * Employment status and digital access are intentionally excluded. They have
 * different permissions and invariants, so this action must never remove an
 * Organization Member, cancel an invitation, or change `LabStaff.isActive`.
 */
export const updateStaffIdentityAction = actionClientWithLab
	.metadata({
		actionName: 'Update-Staff-Identity-Action',
		requiredLabRole: 'MANAGER',
	})
	.inputSchema(UpdateStaffIdentityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const {
			staffId,
			firstName,
			lastName,
			phoneNumber,
			jobTitle,
			specialization,
			roleCategory,
		} = parsedInput

		const updatedStaff = await generalPrisma.labStaff.updateManyAndReturn({
			where: { id: staffId, labId: ctx.labId },
			data: {
				firstName,
				lastName,
				phoneNumber,
				jobTitle: jobTitle || null,
				specialization: specialization || null,
				roleCategory,
			},
		})
		const staff = updatedStaff[0]
		if (!staff || updatedStaff.length !== 1) throw ERRORS.NOT_FOUND

		return { success: true, staff: normalizeLabStaff(staff) }
	})
