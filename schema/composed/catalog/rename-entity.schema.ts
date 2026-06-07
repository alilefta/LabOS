import { z } from 'zod'

export const RenameEntityInputSchema = z.object({
	name: z.string().trim().min(2, 'Name must be at least 2 characters.'),
})

export type RenameEntityInput = z.infer<typeof RenameEntityInputSchema>
export type CatalogEntityType =
	| 'CATEGORY'
	| 'WORKTYPE'
	| 'PRODUCT'
	| 'PRICING_PLAN'
