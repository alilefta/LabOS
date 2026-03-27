import * as z from "zod";
import { ClinicStatusSchema, ClinicTypeSchema } from "./enums.base";

export const ClinicBaseSchema = z.object({
	id: z.string(),
	labId: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	website: z.string().nullable(),
	notes: z.string().nullable(),
	status: ClinicStatusSchema,
	type: ClinicTypeSchema,
	city: z.string(),
	zipcode: z.string().nullable(),
	address1: z.string(),
	address2: z.string().nullable(),
	email: z.string(),
	phoneNumber: z.string(),
	billingEmail: z.string().nullable(),
	billingPhoneNumber: z.string().nullable(),
	taxNumber: z.string().nullable(),
	discount: z.number().nullable(),
	creditLimit: z.number().nullable(),
	currentBalance: z.number(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ClinicBase = z.infer<typeof ClinicBaseSchema>;
