'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { WorktypeDetailsDTO } from '@/schema/composed/catalog/worktype.dtos'

export const getWorktypeByIdAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Worktype-By-Id-Action',
		requiredLabRole: 'STAFF', // View access is generally safe for staff
	})
	.inputSchema(
		z.object({
			workTypeId: z.string().uuid(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { workTypeId } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// Strict tenant-isolated read [1]
			const worktype = await prisma.workType.findUnique({
				where: { id: workTypeId, labId },
				select: {
					id: true,
					name: true,
					description: true,
					imageUrl: true,
					caseCategoryId: true,
					requireTeethSelection: true,
				},
			})

			if (!worktype) {
				throw ERRORS.NOT_FOUND
			}

			// Map to flat DTO [1]
			const worktypeDto: WorktypeDetailsDTO = {
				id: worktype.id,
				name: worktype.name,
				description: worktype.description,
				imageUrl: worktype.imageUrl,
				caseCategoryId: worktype.caseCategoryId,
				requireTeethSelection: worktype.requireTeethSelection,
			}

			return { workType: worktypeDto }
		} catch (error) {
			console.error('[Get-worktype-By-Id] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
