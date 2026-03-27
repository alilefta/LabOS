import * as z from "zod";
export const DentistBaseSchema = z.object({
	id: z.string(),
	clinicId: z.string(),
	labId: z.string(),
	name: z.string(),
	email: z.string().nullable(),
	phoneNumber: z.string().nullable(),
	isOwner: z.boolean(),
	isDefault: z.boolean(),
	notes: z.string().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type DentistBase = z.infer<typeof DentistBaseSchema>;
