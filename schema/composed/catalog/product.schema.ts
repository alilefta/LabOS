import { z } from 'zod'

export const CreateProductAddonInputSchema = z.object({
	// The parent product this accessory belongs to
	productId: z.string().uuid('Parent product is required'),

	name: z
		.string()
		.trim()
		.min(2, 'Accessory name must be at least 2 characters.'),

	// Price must be 0 or positive. (Some addons might be $0 if they are just tracking markers)
	price: z.coerce.number<number>().min(0, 'Price cannot be negative.'),

	isArchived: z.boolean().default(false).optional(),
})

export type CreateProductAddonInput = z.infer<
	typeof CreateProductAddonInputSchema
>
