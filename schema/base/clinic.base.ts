import * as z from "zod";
export const ClinicBaseSchema = z.object({
	id: z.string(),
	labId: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	city: z.string(),
	zipcode: z.string(),
	address1: z.string(),
	address2: z.string().nullable(),
	email: z.string(),
	phoneNumber: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ClinicBase = z.infer<typeof ClinicBaseSchema>;
