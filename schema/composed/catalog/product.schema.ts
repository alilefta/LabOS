import { z } from 'zod'

export const BaseProductAddonInputSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, 'Accessory name must be at least 2 characters.'),

	// Price must be 0 or positive. (Some addons might be $0 if they are just tracking markers)
	price: z.coerce.number<number>().min(0, 'Price cannot be negative.'),

	isArchived: z.boolean().default(false).optional(),
})

export const CreateProductAddonInputSchema = BaseProductAddonInputSchema.extend(
	{
		productId: z.string().uuid('Product ID is required'),
	},
)

export type CreateProductAddonInput = z.infer<
	typeof CreateProductAddonInputSchema
>

// Update (Requires ID)
export const UpdateProductAddonInputSchema = BaseProductAddonInputSchema.extend(
	{
		addonId: z.string().uuid('Addon ID is required'),
	},
)
export type UpdateProductAddonInput = z.infer<
	typeof UpdateProductAddonInputSchema
>

// Helper to convert empty strings to undefined
const emptyToUndefinedTransformer = (val: string | null | undefined) =>
	val?.trim() === '' ? undefined : val

// ── 1. CREATE SCHEMA ────────────────────────────────────────────────────────
export const CreateProductInputSchema = z.object({
	name: z.string().trim().min(2, 'Product name must be at least 2 characters.'),
	description: z
		.string()
		.trim()
		.transform(emptyToUndefinedTransformer)
		.optional(),
	imageUrl: z.string().url().transform(emptyToUndefinedTransformer).optional(),
	workTypeId: z.string().uuid('Invalid Work Type assignment.'),
})

export type CreateProductInput = z.infer<typeof CreateProductInputSchema>

// ── 2. UPDATE SCHEMA ────────────────────────────────────────────────────────
// Notice we require `productId` here to ensure safe database mutations.
export const UpdateProductInputSchema = z.object({
	productId: z.string().uuid('Invalid Product ID'),
	name: z.string().trim().min(2, 'Product name must be at least 2 characters.'),
	description: z.string().trim().optional(),
	imageUrl: z.string().url().optional(),
	workTypeId: z.string().uuid('Invalid Work Type assignment.'),
})

export type UpdateProductInput = z.infer<typeof UpdateProductInputSchema>

// ── 3. HYDRATION DTO ────────────────────────────────────────────────────────
// This is the shape `getProductByIdAction` will return to the Sheet
export interface ProductDetailsDTO {
	id: string
	name: string
	description: string | null
	imageUrl: string | null
	workTypeId: string
}
