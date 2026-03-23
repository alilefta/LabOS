import * as z from "zod";
export const ProductBaseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	imageUrl: z.string(),
	labId: z.string(),
	workTypeId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ProductBase = z.infer<typeof ProductBaseSchema>;
