'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'

const DeleteEntityInputSchema = z.object({
	id: z.string().uuid('Invalid Product ID'),
})

export const deleteProductAction = actionClientWithLab
	.metadata({
		actionName: 'Hard-Delete-Product-Action',
		requiredLabRole: 'OWNER',
	})
	.inputSchema(DeleteEntityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// ── 1. SECURITY & DEEP USAGE VERIFICATION ────────────────────────
			const product = await prisma.product.findUnique({
				where: { id, labId },
				include: {
					// Check direct product usage
					_count: {
						select: { caseWorkItems: true },
					},
					// Check if any child addons were ever used
					addons: {
						select: {
							_count: { select: { caseWorkItemAddons: true } },
						},
					},
				},
			})

			if (!product) throw ERRORS.NOT_FOUND

			// ── 2. THE PRODUCTION LOCKOUT GUARD ──────────────────────────────
			const directUsageCount = product._count.caseWorkItems
			const addonUsageCount = product.addons.reduce(
				(sum, addon) => sum + addon._count.caseWorkItemAddons,
				0,
			)
			const totalUsageCount = directUsageCount + addonUsageCount

			if (totalUsageCount > 0) {
				throw new Error(
					`DATABASE LOCKOUT: This Product (or its Accessories) is tied to ${totalUsageCount} historical production records. You cannot delete it. Please 'Archive' it instead to preserve financial ledgers.`,
				)
			}

			// ── 3. SAFE DELETION (CASCADE) ───────────────────────────────────
			// Since totalUsageCount === 0, it is 100% safe to let Prisma Cascade-Delete:
			// - The Product
			// - The CasePricingPlans attached to it
			// - The ProductAddons attached to it
			await prisma.product.delete({
				where: { id },
			})

			return { success: true }
		} catch (error) {
			console.error('[Delete-Product] Error:', error)
			if (error instanceof Error) throw error
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
