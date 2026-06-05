// actions/product.ts
'use server'

import { actionClientWithLab } from '@/lib/safe-action'
import { tenantPrisma } from '@/lib/prisma'
import { ERRORS } from '@/lib/errors'
import { d } from '@/lib/mappers/normalizers'
import { CatalogProductDTO } from '@/schema/composed/catalog/catalog.dtos'
import z from 'zod'

const GetProductsByWorkTypeInputSchema = z.object({
	workTypeId: z.string().uuid('Invalid Work Type ID'),
	showArchived: z.boolean().default(false).optional(), // <-- FIX 1
})
export const getProductsByWorkTypeAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Products-By-WorkType',
		requiredLabRole: 'STAFF',
	})
	.inputSchema(GetProductsByWorkTypeInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { workTypeId, showArchived = false } = parsedInput // <-- FIX 1
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// 1. SECURITY: Verify this Work Type belongs to this lab tenant
			const isValid = await prisma.workType.findUnique({
				where: { id: workTypeId, labId },
				select: { id: true },
			})

			if (!isValid) {
				throw ERRORS.NOT_FOUND
			}

			// 2. HIGH PERFORMANCE QUERY
			const rawProducts = await prisma.product.findMany({
				where: {
					workTypeId,
					labId,
					// --- FIX 1: If showArchived is false, exclude them at the DB level! [1]
					...(!showArchived && { isArchived: false }),
				},
				select: {
					id: true,
					name: true,
					description: true,
					imageUrl: true,
					isArchived: true,
					casePricingPlans: {
						where: { isDefault: true },
						select: {
							id: true,
							pricingStrategy: true,
							toothPrice: true,
							bulkPrice: true,
							firstToothPrice: true,
							additionalToothPrice: true,
							teethCountToApplyBulkPrice: true,
							isArchived: true,
						},
						take: 1,
					},
					workType: {
						select: {
							name: true,
						},
					},
					_count: {
						select: {
							casePricingPlans: {
								where: { clinicId: { not: null } },
							},
							// --- FIX 2: Aggregate active production cases in one SQL join! [3]
							caseWorkItems: {
								where: {
									dentalCase: {
										status: { in: ['NEW', 'ASSIGNED', 'PROCESSING'] },
									},
								},
							},
						},
					},
				},
				orderBy: { name: 'asc' },
			})

			// 3. MAP TO NORMALIZED DTO
			const products: CatalogProductDTO[] = rawProducts.map((p) => ({
				id: p.id,
				name: p.name,
				description: p.description,
				imageUrl: p.imageUrl,
				defaultPricingPlan: p.casePricingPlans[0]
					? {
							id: p.casePricingPlans[0].id,
							strategy: p.casePricingPlans[0].pricingStrategy,
							toothPrice: d(p.casePricingPlans[0].toothPrice),
							bulkPrice: d(p.casePricingPlans[0].bulkPrice),
							firstToothPrice: d(p.casePricingPlans[0].firstToothPrice),
							additionalToothPrice: d(
								p.casePricingPlans[0].additionalToothPrice,
							),
							teethCountToApplyBulkPrice: d(
								p.casePricingPlans[0].teethCountToApplyBulkPrice,
							),
						}
					: null,
				customClinicDealsCount: p._count.casePricingPlans,
				workTypeName: p.workType.name,
				isArchived: p.isArchived,
				// --- FIX 2: Map the aggregated count to the DTO [3]
				activeCasesCount: p._count.caseWorkItems,
			}))

			return { products }
		} catch (error) {
			console.error('[Get-Products-By-WorkType] Error:', error)
			throw error
		}
	})
