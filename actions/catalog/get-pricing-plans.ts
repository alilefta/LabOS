// actions/pricing-plan.ts
'use server'

import { z } from 'zod'
import { actionClientWithLab } from '@/lib/safe-action'
import { tenantPrisma } from '@/lib/prisma'
import { APIError } from 'better-auth'
import { d } from '@/lib/mappers/normalizers' // Your decimal utility
import { PricingPlanDTO } from '@/schema/composed/catalog/pricing-plans.dtos'
import { GetPricingPlansByProductIdInputSchema } from '@/schema/composed/case-pricing-plan.details'

export const getPricingPlansByProductAction = actionClientWithLab
	.metadata({
		actionName: 'Get-PricingPlans-By-ProductId-Action',
		requiredLabRole: 'ADMIN', // Ensure this matches your security needs
	})
	.inputSchema(GetPricingPlansByProductIdInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { limit, productId } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// --- OPTIMIZED QUERY ---
			// We only select the specific columns needed by the PricingTierManagerSheet.
			const rawPlans = await prisma.casePricingPlan.findMany({
				where: {
					labId: labId,
					productId: productId,
				},
				// Sort by default first (to keep the Master Rate at top), then alphabetically by Clinic Name
				orderBy: [{ isDefault: 'desc' }, { clinic: { name: 'asc' } }],
				take: limit,
				select: {
					id: true,
					name: true,
					isDefault: true,
					pricingStrategy: true,
					toothPrice: true,
					bulkPrice: true,
					firstToothPrice: true,
					additionalToothPrice: true,
					teethCountToApplyBulkPrice: true,

					// N+1 Prevention & Payload Minimization: Fetch ONLY clinic id and name
					clinic: {
						select: {
							id: true,
							name: true,
						},
					},
				},
			})

			// --- MAP TO DTO & NORMALIZE DECIMALS ---
			const pricings: PricingPlanDTO[] = rawPlans.map((plan) => ({
				id: plan.id,
				name: plan.name,
				isDefault: plan.isDefault,
				pricingStrategy: plan.pricingStrategy,

				// Using your existing decimal normalizers
				toothPrice: d(plan.toothPrice),
				bulkPrice: d(plan.bulkPrice),
				firstToothPrice: d(plan.firstToothPrice),
				additionalToothPrice: d(plan.additionalToothPrice),
				teethCountToApplyBulkPrice: d(plan.teethCountToApplyBulkPrice),

				clinic: plan.clinic
					? {
							id: plan.clinic.id,
							name: plan.clinic.name,
						}
					: null,
			}))

			return { pricings }
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error('[Get-PricingPlans-By-ProductId-Action] Error', e.message)
			}
			throw e
		}
	})
