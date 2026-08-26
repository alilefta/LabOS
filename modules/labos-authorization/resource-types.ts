/** Trusted resource families that LabOS target resolvers may register. */
export const LABOS_RESOURCE_TYPES = [
	'case',
	'clinic',
	'dentist',
	'patient',
	'catalog.category',
	'catalog.worktype',
	'catalog.product',
	'catalog.addon',
	'catalog.pricing_plan',
	'staff',
	'invoice',
	'payout',
	'member',
] as const

export type LabOSResourceType = (typeof LABOS_RESOURCE_TYPES)[number]

export const LABOS_CATALOG_RESOURCE_TYPES = [
	'catalog.category',
	'catalog.worktype',
	'catalog.product',
	'catalog.addon',
	'catalog.pricing_plan',
] as const satisfies readonly LabOSResourceType[]
