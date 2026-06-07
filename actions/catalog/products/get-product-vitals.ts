'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { ProductVitalsDTO } from '@/schema/composed/catalog/product.dtos'

const GetProductVitalsInputSchema = z.object({
	productId: z.string().uuid('Invalid Product ID'),
})

export const getProductVitalsAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Product-Vitals-Action',
		requiredLabRole: 'STAFF', // View access is available to all staff
	})
	.inputSchema(GetProductVitalsInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { productId } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// ── OPTIMIZED AGGREGATION QUERY ─────────────────────────────────────────
			// We fetch the scalar data, the relation name (WorkType), and run 4
			// independent counts directly in PostgreSQL using `_count` [1].
			const product = await prisma.product.findUnique({
				where: {
					id: productId,
					labId, // Security Guard: Ensure product belongs to this lab
				},
				select: {
					id: true,
					name: true,
					description: true,
					imageUrl: true,
					isArchived: true,
					workType: {
						select: { name: true },
					},
					_count: {
						select: {
							// 1. Total addons attached to this product
							addons: {
								where: { isArchived: false },
							},
							// 2. Count of custom pricing deals (clinicId is NOT null)
							casePricingPlans: {
								where: { clinicId: { not: null } },
							},
							// 3. Lifetime Cases (Total times used)
							caseWorkItems: true,
							// 4. Active Cases (Currently in the pipeline)
							// Prisma limitation: We can't do conditional sub-counts in _count easily,
							// but since caseWorkItems maps to dentalCase, we can filter!
						},
					},
				},
			})

			if (!product) {
				throw ERRORS.NOT_FOUND
			}

			// ── MANUAL ACTIVE CASES COUNT ──────────────────────────────────────────
			// To get cases actively in production, we do a quick focused query.
			const activeCasesCount = await prisma.caseWorkItem.count({
				where: {
					productId,
					labId,
					dentalCase: {
						status: { in: ['NEW', 'ASSIGNED', 'PROCESSING'] },
					},
				},
			})

			// ── MAP TO STRICT DTO ──────────────────────────────────────────────────
			const vitalsDto: ProductVitalsDTO = {
				id: product.id,
				name: product.name,
				description: product.description,
				imageUrl: product.imageUrl,
				isArchived: product.isArchived,
				workTypeName: product.workType.name,
				stats: {
					activeCases: activeCasesCount,
					lifetimeCases: product._count.caseWorkItems,
					totalAddons: product._count.addons,
					customDeals: product._count.casePricingPlans,
				},
			}

			return { product: vitalsDto }
		} catch (error) {
			console.error('[Get-Product-Vitals] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
