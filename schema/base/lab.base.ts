// No import for LabModelSchema! because it imports the prisma client and it crashes the app because of using Decimals in Case!
import { z } from "zod";

export const LabBaseSchema = z.object({
	id: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
	title: z.string(),
	slug: z.string().nullable(),
	brandAvatarUrl: z.string().nullable(),
	subtitle: z.string().nullable(),
});

export type LabBase = z.infer<typeof LabBaseSchema>;

export const CreateLabInputSchema = z.object({
	title: z.string({ error: "Please enter your lab name." }).min(2, { message: "Lab name must be at least 2 characters long." }),
	slug: z
		.string({ error: "A workspace URL slug is required." })
		.min(2, { message: "Slug must contain at least 2 characters." })
		.regex(/^[a-z0-9-_]+$/, {
			message: "Slug can only contain lowercase letters, numbers, and hyphens.",
		}),
	brandAvatarUrl: z.url({ message: "Please upload a valid lab logo." }),
	subtitle: z.string().max(120, { message: "Subtitle cannot exceed 120 characters." }).optional(),
});
export type CreateLabInput = z.infer<typeof CreateLabInputSchema>;
