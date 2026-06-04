import z from 'zod'
export const ProductAddonBaseSchema = z.object({
	id: z.string(),
	productId: z.string(),
	labId: z.string(),
	name: z.string(),
	price: z.number(),
	isArchived: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
})

export type ProductAddonBase = z.infer<typeof ProductAddonBaseSchema>
