import z from "zod";
import { LabBaseSchema } from "../base/lab.base";
import { ClinicBaseSchema } from "../base/clinic.base";
import { CaseBaseSchema } from "../base/case.base";
import { DentistBaseSchema } from "../base/dentist.base";
import { emptyToUndefinedTransformer } from "../base/utils.base";

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
	name: z.string().trim().min(2, "Dentist name is required"),
	email: optionalEmail,
	phoneNumber: z.string().trim().optional(),
	isOwner: z.boolean().default(true).optional(),
	isDefault: z.boolean().default(true).optional(),
	notes: z.string().optional(),
});

export type CreatePrimaryDentistInput = z.infer<typeof CreatePrimaryDentistInputSchema>;
