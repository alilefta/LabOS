import z from "zod";
import { LabBaseSchema } from "../base/lab.base";
import { ClinicBaseSchema } from "../base/clinic.base";
import { CaseBaseSchema } from "../base/case.base";
import { DentistBaseSchema } from "../base/dentist.base";
import { emptyToUndefinedTransformer } from "../base/utils.base";
import { sanitizeDentistName } from "@/lib/formatters/names-formatters";

export const DentistDetailsSchema = DentistBaseSchema.extend({
	lab: LabBaseSchema,
	clinic: ClinicBaseSchema,
	cases: z.array(CaseBaseSchema),
});

export type DentistDetails = z.infer<typeof DentistDetailsSchema>;

export const DentistDetailsUISchema = DentistBaseSchema.extend({
	lab: LabBaseSchema,
	clinic: ClinicBaseSchema,
	cases: z.array(CaseBaseSchema),
});

export type DentistDetailsUI = z.infer<typeof DentistDetailsUISchema>;

const optionalEmail = z
	.string()
	.trim()
	.transform(emptyToUndefinedTransformer)
	.optional()
	.pipe(z.email({ message: "Please enter a valid email address." }).optional());

export const CreatePrimaryDentistInputSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Dentist name must be at least 2 characters.")
		.transform((val) => sanitizeDentistName(val)),

	email: optionalEmail,

	phoneNumber: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	// --- NEW COMPLIANCE FIELDS ---
	speciality: z.string().trim().optional(),
	licenseNumber: z.string().trim().optional(),

	isOwner: z.boolean().default(true).optional(),

	isDefault: z.boolean().default(true).optional(),

	notes: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
});

export type CreatePrimaryDentistInput = z.infer<typeof CreatePrimaryDentistInputSchema>;

export const CreateDentistInputSchema = z.object({
	clinicId: z.string().uuid("Invalid clinic context."),
	name: z
		.string()
		.trim()
		.min(2, "Dentist name must be at least 2 characters.")
		.transform((val) => sanitizeDentistName(val)),

	email: z.string().email("Invalid email address.").optional().or(z.literal("")),
	phoneNumber: z.string().trim().optional(),

	// --- NEW COMPLIANCE FIELDS ---
	speciality: z.string().trim().optional(),
	licenseNumber: z.string().trim().optional(),
	avatarUrl: z
		.union([z.literal(""), z.string().trim().url("Please enter a valid image URL")])
		.transform(emptyToUndefinedTransformer)
		.optional(),

	isOwner: z.boolean(),
	isDefault: z.boolean(),
	notes: z.string().trim().optional(),
});

export type CreateDentistInput = z.infer<typeof CreateDentistInputSchema>;

export const UpdateDentistInputSchema = CreateDentistInputSchema.extend({
	dentistId: z.string().uuid(),
});

export type UpdateDentistInput = z.infer<typeof UpdateDentistInputSchema>;
