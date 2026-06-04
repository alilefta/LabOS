// schema/composed/pricing-plan.dtos.ts

import { PricingStrategy } from '@/schema/base/enums.base'

export type PricingPlanDTO = {
	id: string
	name: string
	isDefault: boolean
	pricingStrategy: PricingStrategy

	// Normalized Decimals
	toothPrice: number | null
	bulkPrice: number | null
	firstToothPrice: number | null
	additionalToothPrice: number | null
	teethCountToApplyBulkPrice: number | null

	// Minimized Relations
	clinic: {
		id: string
		name: string
	} | null
}
