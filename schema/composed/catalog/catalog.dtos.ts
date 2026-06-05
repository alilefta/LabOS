import { PricingStrategy } from '@/schema/base/enums.base'

// ── 1. COMPLETED & RECONCILED DTOs ──────────────────────────────────────────
export type CatalogTreeDTO = {
	id: string
	name: string
	imageUrl: string | null
	isArchived: boolean
	workTypes: {
		id: string
		name: string
		productCount: number
		isArchived: boolean
		casesCount: number // Active production volume for this department [3]
	}[]
}[]

export type CatalogProductDTO = {
	id: string
	name: string
	description: string | null
	imageUrl: string | null
	defaultPricingPlan: {
		id: string
		strategy: PricingStrategy
		toothPrice: number | null
		bulkPrice: number | null
		firstToothPrice: number | null
		additionalToothPrice: number | null
		teethCountToApplyBulkPrice: number | null
	} | null
	customClinicDealsCount: number
	workTypeName: string
	activeCasesCount: number
	isArchived: boolean
}
export type CatalogWorkTypeProductsDTO = {
	workTypeName: string
	products: CatalogProductDTO[]
}
