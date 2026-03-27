import * as z from "zod";
export const WorkTypeBaseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	imageUrl: z.string().nullable(),
	labId: z.string(),
	caseCategoryId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type WorktypeBase = z.infer<typeof WorkTypeBaseSchema>;
