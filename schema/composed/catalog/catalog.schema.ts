import z from 'zod'

export const GetProductsInputSchema = z.object({
	workTypeId: z.string().uuid('Invalid Work Type ID'),
})
