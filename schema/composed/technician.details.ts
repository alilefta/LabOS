import { z } from "zod";
import { TechnicianBaseSchema } from "../base/technician.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";
import { emptyToUndefinedTransformer } from "../base/utils.base";

export const TechnicianDetailsSchema = TechnicianBaseSchema.extend({
	lab: LabBaseSchema,
	cases: z.array(CaseBaseSchema),
});

export type TechnicianDetails = z.infer<typeof TechnicianDetailsSchema>;

export const TechnicianDetailsUISchema = TechnicianBaseSchema.extend({
	lab: LabBaseSchema.optional(),
	cases: z.array(CaseBaseSchema).optional(),
});

export type TechnicianDetailsUI = z.infer<typeof TechnicianDetailsUISchema>;

// name: z.string().trim().min(2, "Dentist name must be at least 2 characters."),

// 	email: optionalEmail,

// 	phoneNumber: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

// 	isOwner: z.boolean().default(true).optional(),

// 	isDefault: z.boolean().default(true).optional(),

// 	notes: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

export const CreateTechnicianInputSchema = z.object({
	firstName: z.string().trim().min(2, "First name must be at least 2 characters."),
	lastName: z.string().trim().min(2, "Last name must be at least 2 characters."),
	city: z.string().trim().min(2, "City is required."),
	zipcode: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	address1: z.string(),
	address2: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	email: z.string().trim().email("Please enter a valid email address."),
	phoneNumber: z.string().trim().min(7, "Please enter a valid phone number."),
	avatarUrl: z
		.union([z.literal(""), z.string().trim().url("Please enter a valid image URL")])
		.transform(emptyToUndefinedTransformer)
		.optional(),
});

export type CreateTechnicianInput = z.infer<typeof CreateTechnicianInputSchema>;
