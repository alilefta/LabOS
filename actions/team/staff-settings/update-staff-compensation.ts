// actions/team/staff-settings/update-staff-compensation.ts
'use server'

import { actionClientWithLab } from '@/lib/safe-action'
import { tenantPrisma } from '@/lib/prisma'
import { ERRORS } from '@/lib/errors'
import { Prisma } from '@/generated/prisma/client'
import { UpdateStaffCompensationInputSchema } from '@/schema/composed/team/staff-settings.schema'

export const updateStaffCompensationAction = actionClientWithLab
	.metadata({
		actionName: 'Update-Staff-Compensation-Action',
		// Security: Handled by safe-action middleware. Only the Lab Owner can execute [3].
		requiredLabRole: 'OWNER',
	})
	.inputSchema(UpdateStaffCompensationInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { staffId, commissionType, commissionValue } = parsedInput
		const { labId } = ctx // Scoped securely by safe-action context [3]

		try {
			const prisma = await tenantPrisma(labId)

			// ── DATABASE MUTATION ────────────────────────────────────────────
			const updatedStaff = await prisma.labStaff.update({
				where: { id: staffId, labId },
				data: {
					commissionType,
					// FIX: Safely convert JS float to native Prisma Decimal using portable constructor [1]
					commissionValue:
						commissionValue !== undefined && commissionValue !== null
							? new Prisma.Decimal(commissionValue)
							: null,
				},
				select: {
					id: true,
					commissionType: true,
					commissionValue: true,
				},
			})

			return {
				success: true,
				// FIX: Returned key renamed to "payoutBasis" to match the Client onSuccess handler [2]
				payoutBasis: {
					id: updatedStaff.id,
					commissionType: updatedStaff.commissionType,
					// Safely serialize the Decimal back to a number before shipping to client
					commissionValue: updatedStaff.commissionValue
						? Number(updatedStaff.commissionValue)
						: null,
				},
			}
		} catch (error: any) {
			console.error('[Update-Staff-Compensation-Action] Error:', error.message)
			if (error instanceof Error) throw error
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
