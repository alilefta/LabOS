export interface ProductVitalsDTO {
	id: string
	name: string
	description: string | null
	imageUrl: string | null
	isArchived: boolean
	workTypeName: string // Needed for the breadcrumb context

	// Operational Metrics
	stats: {
		activeCases: number // e.g., NEW, ASSIGNED, PROCESSING
		lifetimeCases: number // All-time usage
		totalAddons: number
		customDeals: number // Count of clinic-specific pricing plans
	}
}

export interface ProductAddonDTO {
	id: string
	name: string
	price: number
	isArchived: boolean
}
