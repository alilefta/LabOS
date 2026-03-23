import z from "zod";

export const TechnicianBaseSchema = z.object({
	id: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	city: z.string(),
	zipcode: z.string(),
	address1: z.string(),
	address2: z.string().nullable(),
	labId: z.string(),
	email: z.string(),
	phoneNumber: z.string(),
	avatarUrl: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type TechnicianBase = z.infer<typeof TechnicianBaseSchema>;
