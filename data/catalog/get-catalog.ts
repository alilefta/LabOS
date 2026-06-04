import { tenantPrisma } from '@/lib/prisma'
import { ERRORS } from '@/lib/errors'
import {
	daError,
	daSuccess,
	toDAError,
	DAResult,
} from '@/lib/data-access-errors'
import {
	CatalogProductDTO,
	CatalogTreeDTO,
} from '@/schema/composed/catalog/catalog.dtos'

// --- QUERIES ---

export async function getCatalogTree(
	labId: string,
): Promise<DAResult<CatalogTreeDTO>> {
	try {
		const prisma = await tenantPrisma(labId)

		const categories = await prisma.caseCategory.findMany({
			where: { labId, isActive: true },
			select: {
				id: true,
				name: true,
				imageUrl: true,
				workTypes: {
					select: {
						id: true,
						name: true,
						_count: {
							select: { products: true }, // N+1 prevention: Count products without fetching them
						},
					},
					orderBy: { name: 'asc' },
				},
			},
			orderBy: { name: 'asc' },
		})

		const tree: CatalogTreeDTO = categories.map((cat) => ({
			id: cat.id,
			name: cat.name,
			imageUrl: cat.imageUrl,
			workTypes: cat.workTypes.map((wt) => ({
				id: wt.id,
				name: wt.name,
				productCount: wt._count.products,
			})),
		}))

		return daSuccess(tree)
	} catch (e) {
		return toDAError(e)
	}
}

export async function getWorkTypeProducts(
	labId: string,
	workTypeId: string,
): Promise<DAResult<CatalogProductDTO[]>> {
	try {
		const prisma = await tenantPrisma(labId)

		// Verify work type belongs to this lab
		const isValid = await prisma.workType.findUnique({
			where: { id: workTypeId, labId },
			select: { id: true },
		})

		if (!isValid) return daError(ERRORS.NOT_FOUND.toJSON())

		const rawProducts = await prisma.product.findMany({
			where: { workTypeId, labId },
			select: {
				id: true,
				name: true,
				description: true,
				imageUrl: true,
				casePricingPlans: {
					where: { isDefault: true },
					select: {
						id: true,
						pricingStrategy: true,
						toothPrice: true,
						bulkPrice: true,
						firstToothPrice: true,
						teethCountToApplyBulkPrice: true,
						additionalToothPrice: true,
					},
					take: 1, // Enforce single default plan
				},
				workType: {
					select: {
						name: true,
					},
				},
				_count: {
					select: {
						casePricingPlans: {
							where: { clinicId: { not: null } }, // Count custom clinic overrides
						},
					},
				},
			},
			orderBy: { name: 'asc' },
		})

		const products: CatalogProductDTO[] = rawProducts.map((p) => ({
			id: p.id,
			name: p.name,
			description: p.description,
			imageUrl: p.imageUrl,
			defaultPricingPlan: p.casePricingPlans[0]
				? {
						id: p.casePricingPlans[0].id,
						strategy: p.casePricingPlans[0].pricingStrategy,
						toothPrice: p.casePricingPlans[0].toothPrice
							? Number(p.casePricingPlans[0].toothPrice)
							: null,
						bulkPrice: p.casePricingPlans[0].bulkPrice
							? Number(p.casePricingPlans[0].bulkPrice)
							: null,
						firstToothPrice: p.casePricingPlans[0].firstToothPrice
							? Number(p.casePricingPlans[0].firstToothPrice)
							: null,
						additionalToothPrice: p.casePricingPlans[0].additionalToothPrice
							? Number(p.casePricingPlans[0].additionalToothPrice)
							: null,
						teethCountToApplyBulkPrice: p.casePricingPlans[0]
							.teethCountToApplyBulkPrice
							? Number(p.casePricingPlans[0].teethCountToApplyBulkPrice)
							: null,
					}
				: null,
			customClinicDealsCount: p._count.casePricingPlans,
			workTypeName: p.workType.name,
		}))

		return daSuccess(products)
	} catch (e) {
		return toDAError(e)
	}
}
