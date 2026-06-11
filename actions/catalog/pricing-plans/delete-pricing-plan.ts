'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'

const DeleteEntityInputSchema = z.object({
	id: z.string().uuid('Invalid Pricing Plan ID'),
})

export const deletePricingPlanAction = actionClientWithLab
	.metadata({
		actionName: 'Hard-Delete-Pricing-Plan-Action',
		requiredLabRole: 'OWNER', // Only Owners should delete financial structures
	})
	.inputSchema(DeleteEntityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id } = parsedInput
		const { labId } = ctx

		const prisma = await tenantPrisma(labId)

		// ── 1. SECURITY & USAGE VERIFICATION ──────────────────────────────
		const plan = await prisma.casePricingPlan.findUnique({
			where: { id, labId },
			include: {
				_count: {
					select: { caseWorkItem: true }, // Check historical usage
				},
			},
		})

		if (!plan) throw ERRORS.NOT_FOUND

		// ── 2. THE DEFAULT LOCKOUT GUARD ──────────────────────────────────
		if (plan.isDefault) {
			throw new Error(
				'Cannot delete the Default Catalog Rate. Please set another plan as the default first.',
			)
		}

		// ── 3. THE PRODUCTION LOCKOUT GUARD ───────────────────────────────
		const usageCount = plan._count.caseWorkItem

		if (usageCount > 0) {
			throw new Error(
				`DATABASE LOCKOUT: This Pricing Plan is tied to ${usageCount} historical case records. You cannot delete it. Please 'Archive' it instead to preserve traceability.`,
			)
		}

		// ── 4. SAFE DELETION ──────────────────────────────────────────────
		await prisma.casePricingPlan.delete({
			where: { id },
		})

		return { success: true }
	})
