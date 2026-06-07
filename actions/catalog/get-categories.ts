'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import z from 'zod'

export const getCatalogCategoriesAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Catalog-Categories-Action',
		// Everyone needs to be able to read categories (e.g. Receptionists making cases)
		requiredLabRole: 'STAFF',
	})
	.inputSchema(
		z.object({
			showArchivedCategories: z.boolean().nullable().default(false),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx
		const { showArchivedCategories } = parsedInput

		try {
			const prisma = await tenantPrisma(labId)

			// ── OPTIMIZED FLAT QUERY ─────────────────────────────────────────
			// We only fetch active categories, and we ONLY select the ID and Name.
			// This keeps the JSON payload under 1KB, ensuring the dropdown loads instantly.
			const categories = await prisma.caseCategory.findMany({
				where: {
					labId,
					// If showArchived is true, omit the filter entirely.
					// If false, strictly require isArchived to be false.
					...(showArchivedCategories ? {} : { isArchived: false }),
				},
				select: {
					id: true,
					name: true,
					imageUrl: true,
					isActive: true,
					isArchived: true,
				},
				orderBy: {
					name: 'asc', // Alphabetical for easy scanning
				},
			})

			return { categories }
		} catch (error) {
			console.error('[Get-Catalog-Categories-Action] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
