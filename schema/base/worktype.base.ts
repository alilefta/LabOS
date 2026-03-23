import * as z from "zod";

export const WorkTypeBaseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
	imageUrl: z.string(),
	labId: z.string(),
	caseCategoryId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type WorktypeBase = z.infer<typeof WorkTypeBaseSchema>;
