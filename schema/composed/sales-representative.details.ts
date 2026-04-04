import * as z from "zod";
import { SalesRepresentativeBaseSchema } from "../base/sales-representative.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";
import { emptyToUndefinedTransformer } from "../base/utils.base";
export const SalesRepresentativeDetailsSchema = SalesRepresentativeBaseSchema.extend({
	lab: LabBaseSchema,
	cases: z.array(CaseBaseSchema),
});

export type SalesRepresentativeDetails = z.infer<typeof SalesRepresentativeDetailsSchema>;

export const CreateSalesRepresentativeInputSchema = z.object({
	firstName: z.string().trim().min(2, "First name must be at least 2 characters."),
	lastName: z.string().trim().min(2, "Last name must be at least 2 characters."),
	city: z.string().trim().min(2, "City is required."),
	zipcode: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	address1: z.string(),
	address2: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	phoneNumber: z.string().trim().min(7, "Please enter a valid phone number."),
	email: z.string().trim().email("Please enter a valid email address."),
	avatarUrl: z
		.union([z.literal(""), z.string().trim().url("Please enter a valid image URL")])
		.transform(emptyToUndefinedTransformer)
		.optional(),
});

export type CreateSalesRepresentativeInput = z.infer<typeof CreateSalesRepresentativeInputSchema>;
