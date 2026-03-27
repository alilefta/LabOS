import * as z from "zod";

export const ProductBaseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	imageUrl: z.string().nullable(),
	labId: z.string(),
	workTypeId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ProductBase = z.infer<typeof ProductBaseSchema>;
