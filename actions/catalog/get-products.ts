// actions/product.ts
'use server'

import { actionClientWithLab } from '@/lib/safe-action'
import { tenantPrisma } from '@/lib/prisma'
import { ERRORS } from '@/lib/errors'
import { d } from '@/lib/mappers/normalizers'
import { GetProductsInputSchema } from '@/schema/composed/catalog/catalog.schema'
import { CatalogProductDTO } from '@/schema/composed/catalog/catalog.dtos'

export const getProductsByWorkTypeAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Products-By-WorkType',
		requiredLabRole: 'STAFF', // Staff can read the catalog, only Admin/Manager can write
	})
	.inputSchema(GetProductsInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { workTypeId } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// 1. SECURITY: Verify this Work Type belongs to this lab tenant [1]
			const isValid = await prisma.workType.findUnique({
				where: { id: workTypeId, labId },
				select: { id: true },
			})

			if (!isValid) {
				throw ERRORS.NOT_FOUND
			}

			// 2. HIGH PERFORMANCE QUERY
			// Selective projection to minimize memory and payload [2]
			const rawProducts = await prisma.product.findMany({
				where: { workTypeId, labId },
				select: {
					id: true,
					name: true,
					description: true,
					imageUrl: true,
					// Fetch ONLY the standard default base price
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
						},
						take: 1,
					},
					workType: {
						select: {
							name: true,
						},
					},
					// Count custom clinic overrides in a single SQL step (N+1 Prevention)
					_count: {
						select: {
							casePricingPlans: {
								where: { clinicId: { not: null } },
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
			}))

			return { products }
		} catch (error) {
			console.error('[Get-Products-By-WorkType] Error:', error)
			throw error
		}
	})
