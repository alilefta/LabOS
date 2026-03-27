import * as z from "zod";

export const CaseCategoryBaseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	imageUrl: z.string().nullable(),
	isActive: z.boolean(),
	labId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CaseCategoryBase = z.infer<typeof CaseCategoryBaseSchema>;
