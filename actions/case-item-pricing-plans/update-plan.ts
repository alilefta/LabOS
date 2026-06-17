'use server'

import { ERRORS } from '@/lib/errors'
import { normalizePricingPlan } from '@/lib/mappers'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { UpdateCaseItemPricingPlanInputSchema } from '@/schema/composed/case-pricing-plan.details'
import { APIError } from 'better-auth'

export const updatePricingPlanAction = actionClientWithLab
	.metadata({
		actionName: 'Update-PricingPlan-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(UpdateCaseItemPricingPlanInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const {
			planId,
			name,
			isDefault,
			pricingStrategy,
			additionalToothPrice,
			bulkPrice,
			clinicId,
			firstToothPrice,
			productId,
			teethCountToApplyBulkPrice,
			toothPrice,
		} = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// ── Ownership verification ────────────────────────────────────────────────
			const existing = await prisma.casePricingPlan.findUnique({
				where: { id: planId, labId },
				select: { id: true, clinicId: true },
			})
			if (!existing) throw ERRORS.NOT_FOUND

			// If plan is clinic-scoped, verify the clinic belongs to this lab
			if (existing.clinicId) {
				const clinic = await prisma.clinic.findUnique({
					where: { id: existing.clinicId, labId },
					select: { id: true },
				})
				if (!clinic) throw ERRORS.CLIENT_NOT_FOUND
			}
			const resolvedIsDefault = clinicId ? false : isDefault
			const updated = await prisma.$transaction(async (tx) => {
				// ── THE "HIGHLANDER" RULE
				if (resolvedIsDefault) {
					await tx.casePricingPlan.updateMany({
						where: {
							labId,
							productId,
							clinicId: null,
							isDefault: true,
							NOT: { id: planId }, // Don't update the one we are currently saving
						},
						data: { isDefault: false },
					})
				}

				return tx.casePricingPlan.update({
					where: { id: planId, labId },
					data: {
						name,
						isDefault: resolvedIsDefault,
						pricingStrategy,
						productId,
						clinicId: clinicId ?? null,
						toothPrice: toothPrice ?? null,
						firstToothPrice: firstToothPrice ?? null,
						additionalToothPrice: additionalToothPrice ?? null,
						bulkPrice: bulkPrice ?? null,
						teethCountToApplyBulkPrice: teethCountToApplyBulkPrice ?? null,
					},
				})
			})

			return { pricingPlan: normalizePricingPlan(updated) }
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error('[Update-PricingPlan-Action] Error', e.message)
			}
			throw e
		}
	})
