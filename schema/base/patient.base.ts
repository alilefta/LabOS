import * as z from "zod";
export const PatientBaseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	city: z.string(),
	zipcode: z.string(),
	address1: z.string(),
	address2: z.string().nullable(),
	email: z.string(),
	phoneNumber: z.string(),
	labId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type PatientBase = z.infer<typeof PatientBaseSchema>;
