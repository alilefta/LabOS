import * as z from "zod";
import { PatientBaseSchema } from "../base/patient.base";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";
import { PatientGenderSchema } from "../base/enums.base";

export const PatientDetailsSchema = PatientBaseSchema.extend({
	cases: z.array(CaseBaseSchema),
	lab: LabBaseSchema,
});

export type PatientDetails = z.infer<typeof PatientDetailsSchema>;

export const PatientDetailsUISchema = PatientBaseSchema.extend({
	cases: z.array(CaseBaseSchema),
	lab: LabBaseSchema.nullable(),
});

export type PatientDetailsUI = z.infer<typeof PatientDetailsUISchema>;

const emptyToUndefined = (v: string) => (v === "" ? undefined : v); // used inside transform(emptyToUndefined)

const optionalEmail = z
	.string()
	.trim()
	.transform(emptyToUndefined)
	.optional()
	.pipe(z.email({ message: "Please enter a valid email address." }).optional());

// on creation schemas we replace the nullable with optional either v | undefined

export const CreatePatientInputSchema = z.object({
	name: z.string().trim().min(3, "Full name is required."),
	description: z.string().transform(emptyToUndefined).optional(),
	// zipcode: z.string().transform(emptyToUndefined).optional(),

	// address1: z.string().min(2, "Address is required"),
	// address2: z.string().transform(emptyToUndefined).optional(),
	// email: optionalEmail,
	// phoneNumber: z.string().transform(emptyToUndefined).optional(),

	notes: z.string().optional(),
	age: z.number().int().optional(),
	gender: PatientGenderSchema.optional(),
});

export type CreatePatientInput = z.infer<typeof CreatePatientInputSchema>;
