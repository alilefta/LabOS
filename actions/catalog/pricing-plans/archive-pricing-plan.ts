'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { ToggleArchiveEntityInputSchema } from '@/schema/composed/catalog/archive-entity.schema'

// ── ARCHIVE / RESTORE PRICING PLAN ─────────────────────────────────────────
export const toggleArchivePricingPlanAction = actionClientWithLab
	.metadata({
		actionName: 'Toggle-Archive-PricingPlan-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(ToggleArchiveEntityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id, isArchived } = parsedInput
		const { labId } = ctx

		const prisma = await tenantPrisma(labId)

		const plan = await prisma.casePricingPlan.findUnique({
			where: { id, labId },
			select: { id: true, isDefault: true },
		})

		if (!plan) throw ERRORS.NOT_FOUND

		// 🔥 CRITICAL SAFETY GUARD
		// A Lab must always have a global baseline price.
		// You cannot archive the 'Default' pricing plan.
		if (isArchived && plan.isDefault) {
			throw new Error(
				'Cannot archive the Default Catalog Rate. Please set another plan as the default first.',
			)
		}

		await prisma.casePricingPlan.update({
			where: { id },
			data: { isArchived },
		})

		return { success: true, isArchived }
	})
