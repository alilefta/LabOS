'use server'

import { z } from 'zod'
import { subDays, startOfDay } from 'date-fns'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'

const GetWorkTypesByCategoryInputSchema = z.object({
	caseCategoryId: z.string().uuid('Invalid Category ID'),
	limit: z.number().default(50),
	requireTeethSelection: z.boolean().optional(),
	showArchived: z.boolean().default(false), // Support soft deletes!
})

export const getWorkTypesByCategoryAction = actionClientWithLab
	.metadata({
		actionName: 'Get-WorkTypes-By-CategoryId-Action',
		requiredLabRole: 'STAFF',
	})
	.inputSchema(GetWorkTypesByCategoryInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { limit, caseCategoryId, requireTeethSelection, showArchived } =
			parsedInput
		const { labId } = ctx

		const thirtyDaysAgo = subDays(startOfDay(new Date()), 30)

		try {
			const prisma = await tenantPrisma(labId)

			const rawWorkTypes = await prisma.workType.findMany({
				where: {
					labId,
					caseCategoryId,
					...(requireTeethSelection !== undefined && { requireTeethSelection }),
					...(!showArchived && { isArchived: false }), // Ensure soft-deleted items are hidden by default
				},
				orderBy: { name: 'asc' }, // Alphabetical is better for catalogs than createdAt
				take: limit,

				// 🔥 THE FIX: Use _count instead of include!
				select: {
					id: true,
					name: true,
					description: true,
					requireTeethSelection: true,
					isArchived: true,
					_count: {
						select: {
							products: true,
							caseWorkItems: true, // Lifetime cases
						},
					},
					// We can't do a conditional count inside _count in Prisma yet,
					// so we do a tiny nested select for L30D cases
					caseWorkItems: {
						where: { createdAt: { gte: thirtyDaysAgo } },
						select: { id: true },
					},
				},
			})

			// Map the data into the exact flat shape the Card expects
			const workTypes = rawWorkTypes.map((wt) => ({
				id: wt.id,
				name: wt.name,
				description: wt.description,
				requireTeethSelection: wt.requireTeethSelection,
				isArchived: wt.isArchived,
				_count: {
					products: wt._count.products,
					caseWorkItems: wt._count.caseWorkItems,
				},
				casesL30D: wt.caseWorkItems.length, // Calculate the array length on the server
			}))

			return { workTypes }
		} catch (e) {
			console.error('[Get-WorkTypes-By-CategoryId-Action] Error', e)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
