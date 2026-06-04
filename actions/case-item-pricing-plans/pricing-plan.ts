'use server'

import { normalizePricingPlan } from '@/lib/mappers'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import {
	GetPricingPlansByClinicIdInputSchema,
	GetPricingPlansByProductIdInputSchema,
} from '@/schema/composed/case-pricing-plan.details'
import { SearchInputSchema } from '@/schema/composed/shared-schema'
import { APIError } from 'better-auth'

export const getPricingPlanBySearchQueryAction = actionClientWithLab
	.metadata({
		actionName: 'Get-PricingPlans-By-Search-Query-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery, limit } = parsedInput
		const { labId } = ctx

		try {
			const pricings = await (
				await tenantPrisma(labId)
			).casePricingPlan.findMany({
				where: {
					labId: labId,
					name: {
						startsWith: searchQuery,
					},
				},
				orderBy: {
					createdAt: 'desc',
				},
				take: limit,
			})

			return {
				pricings: pricings.map(normalizePricingPlan),
			}
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error(
					'[Get-PricingPlans-By-Search-Query-Action] Error',
					e.message,
				)
			}
			throw e
		}
	})

export const getPricingPlansByProductAction = actionClientWithLab
	.metadata({
		actionName: 'Get-PricingPlans-By-ProductId-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(GetPricingPlansByProductIdInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { limit, productId } = parsedInput
		const { labId } = ctx

		try {
			const pricings = await (
				await tenantPrisma(labId)
			).casePricingPlan.findMany({
				where: {
					labId: labId,
					productId: productId,
				},
				orderBy: {
					createdAt: 'desc',
				},
				take: limit,
				include: {
					product: true,
				},
			})

			return {
				pricings: pricings.map(normalizePricingPlan),
			}
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error('[Get-PricingPlans-By-ProductId-Action] Error', e.message)
			}
			throw e
		}
	})

export const getPricingPlansByClinicAction = actionClientWithLab
	.metadata({
		actionName: 'Get-PricingPlans-By-ClinicId-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(GetPricingPlansByClinicIdInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { limit, clinicId } = parsedInput
		const { labId } = ctx

		try {
			const pricings = await (
				await tenantPrisma(labId)
			).casePricingPlan.findMany({
				where: {
					labId: labId,
					clinicId,
				},
				orderBy: {
					createdAt: 'desc',
				},
				take: limit,
				include: {
					lab: true,
					clinic: true,
				},
			})

			return {
				pricings: pricings.map(normalizePricingPlan),
			}
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error('[Get-PricingPlans-By-ClinicId-Action] Error', e.message)
			}
			throw e
		}
	})

// function pricingPlansNormalizer(pricingPlan: CasePricingPlanModel[] | CasePricingPlanModel): CasePricingPlanDetailsUI[] | CasePricingPlanDetailsUI {
// 	if (Array.isArray(pricingPlan)) {
// 		return pricingPlan.map((p) => ({
// 			...p,
// 			additionalToothPrice: p.additionalToothPrice === null ? null : Number(p.additionalToothPrice),
// 			bulkPrice: p.bulkPrice === null ? null : Number(p.bulkPrice),
// 			firstToothPrice: p.firstToothPrice === null ? null : Number(p.firstToothPrice),
// 			teethCountToApplyBulkPrice: p.teethCountToApplyBulkPrice === null ? null : Number(p.teethCountToApplyBulkPrice),
// 			toothPrice: p.toothPrice === null ? null : Number(p.toothPrice),
// 		}));
// 	} else {
// 		return {
// 			...pricingPlan,
// 			additionalToothPrice: pricingPlan.additionalToothPrice === null ? null : Number(pricingPlan.additionalToothPrice),
// 			bulkPrice: pricingPlan.bulkPrice === null ? null : Number(pricingPlan.bulkPrice),
// 			firstToothPrice: pricingPlan.firstToothPrice === null ? null : Number(pricingPlan.firstToothPrice),
// 			teethCountToApplyBulkPrice: pricingPlan.teethCountToApplyBulkPrice === null ? null : Number(pricingPlan.teethCountToApplyBulkPrice),
// 			toothPrice: pricingPlan.toothPrice === null ? null : Number(pricingPlan.toothPrice),
// 		};
// 	}
// }
