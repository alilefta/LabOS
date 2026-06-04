'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'

export const getActiveCategoriesAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Active-Categories-Action',
		// Everyone needs to be able to read categories (e.g. Receptionists making cases)
		requiredLabRole: 'STAFF',
	})
	.action(async ({ ctx }) => {
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// ── OPTIMIZED FLAT QUERY ─────────────────────────────────────────
			// We only fetch active categories, and we ONLY select the ID and Name.
			// This keeps the JSON payload under 1KB, ensuring the dropdown loads instantly.
			const categories = await prisma.caseCategory.findMany({
				where: {
					labId,
					isActive: true, // Only allow assigning to active categories
				},
				select: {
					id: true,
					name: true,
				},
				orderBy: {
					name: 'asc', // Alphabetical for easy scanning
				},
			})

			return { categories }
		} catch (error) {
			console.error('[Get-Active-Categories-Action] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
