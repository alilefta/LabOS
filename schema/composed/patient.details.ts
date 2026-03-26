import * as z from "zod";
import { PatientBaseSchema } from "../base/patient.base";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";

export const PatientDetailsSchema = PatientBaseSchema.extend({
	cases: z.array(CaseBaseSchema),
	lab: LabBaseSchema.nullable(),
});

export type PatientDetails = z.infer<typeof PatientDetailsSchema>;

const emptyToUndefined = (v: string) => (v === "" ? undefined : v); // used inside transform(emptyToUndefined)

const optionalEmail = z
	.string()
	.trim()
	.transform(emptyToUndefined)
	.optional()
	.pipe(z.email({ message: "Please enter a valid email address." }).optional());

export const CreatePatientInputSchema = z.object({
	name: z.string().trim().min(3, "Full name is required."),
	description: z.string().transform(emptyToUndefined).optional().nullable(),
	city: z.string().trim().min(2, "City is required"),
	zipcode: z.string().transform(emptyToUndefined).optional().nullable(),

	address1: z.string().min(2, "Address is required"),
	address2: z.string().transform(emptyToUndefined).optional().nullable(),
	email: optionalEmail,
	phoneNumber: z.string().transform(emptyToUndefined).optional().nullable(),
	// labId: z.string(),
});

export type CreatePatientInput = z.infer<typeof CreatePatientInputSchema>;

export const SearchPatientsInputSchema = z.object({
	searchQuery: z.string(),
});
export type SearchPatientsInput = z.infer<typeof SearchPatientsInputSchema>;
