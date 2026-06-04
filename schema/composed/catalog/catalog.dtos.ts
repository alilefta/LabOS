import { PricingStrategy } from '@/schema/base/enums.base'

// --- DTOs ---
export type CatalogTreeDTO = {
	id: string
	name: string
	imageUrl: string | null
	workTypes: {
		id: string
		name: string
		productCount: number
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
}
export type CatalogWorkTypeProductsDTO = {
	workTypeName: string
	products: CatalogProductDTO[]
}
