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
import { d } from '@/lib/mappers/normalizers'

// --- QUERIES ---

export async function getCatalogTree(
	labId: string,
): Promise<DAResult<CatalogTreeDTO>> {
	try {
		const prisma = await tenantPrisma(labId)

		const categories = await prisma.caseCategory.findMany({
			where: { labId }, // We pull archived folders too if URL params request them [4]
			select: {
				id: true,
				name: true,
				imageUrl: true,
				isArchived: true,
				workTypes: {
					select: {
						id: true,
						name: true,
						isArchived: true,
						_count: {
							select: {
								products: true, // Product count
								// N+1 Prevention: Calculate active cases on the floor [3]
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
				},
			},
			orderBy: { name: 'asc' },
		})

		const tree: CatalogTreeDTO = categories.map((cat) => ({
			id: cat.id,
			name: cat.name,
			imageUrl: cat.imageUrl,
			isArchived: cat.isArchived,
			workTypes: cat.workTypes.map((wt) => ({
				id: wt.id,
				name: wt.name,
				productCount: wt._count.products,
				isArchived: wt.isArchived,
				casesCount: wt._count.caseWorkItems,
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
	showArchived = false,
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
			where: {
				workTypeId,
				labId,
				// If showArchived is false, strictly omit archived products [4]
				...(!showArchived && { isArchived: false }),
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
				// Grab the standard default base price
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
				_count: {
					select: {
						casePricingPlans: {
							where: { clinicId: { not: null } }, // Custom overrides count
						},
						// Calculate active cases on the floor for this specific product [3]
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

		const products: CatalogProductDTO[] = rawProducts.map((p) => ({
			id: p.id,
			name: p.name,
			description: p.description,
			imageUrl: p.imageUrl,
			isArchived: p.isArchived,
			workTypeName: p.workType.name,
			activeCasesCount: p._count.caseWorkItems, // Map live volume [3]
			customClinicDealsCount: p._count.casePricingPlans,

			// Pluck default pricing and safely normalize decimals
			defaultPricingPlan: p.casePricingPlans[0]
				? {
						id: p.casePricingPlans[0].id,
						strategy: p.casePricingPlans[0].pricingStrategy,
						toothPrice: d(p.casePricingPlans[0].toothPrice),
						bulkPrice: d(p.casePricingPlans[0].bulkPrice),
						firstToothPrice: d(p.casePricingPlans[0].firstToothPrice),
						additionalToothPrice: d(p.casePricingPlans[0].additionalToothPrice),
						teethCountToApplyBulkPrice: p.casePricingPlans[0]
							.teethCountToApplyBulkPrice
							? Number(p.casePricingPlans[0].teethCountToApplyBulkPrice)
							: null,
					}
				: null,
		}))

		return daSuccess(products)
	} catch (e) {
		return toDAError(e)
	}
}
