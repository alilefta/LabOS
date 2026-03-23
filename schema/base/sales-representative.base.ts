import * as z from "zod";
export const SalesRepresentativeBaseSchema = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	city: z.string(),
	zipcode: z.string(),
	address1: z.string(),
	address2: z.string().nullable(),
	labId: z.string(),
	phoneNumber: z.string(),
	email: z.string(),
	avatarUrl: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type SalesRepresentativeBase = z.infer<typeof SalesRepresentativeBaseSchema>;
