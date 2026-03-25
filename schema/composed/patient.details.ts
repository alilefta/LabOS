import * as z from "zod";
import { PatientBaseSchema } from "../base/patient.base";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";

export const PatientDetailsSchema = PatientBaseSchema.extend({
	case: z.array(CaseBaseSchema),
	lab: LabBaseSchema,
});

export type PatientDetails = z.infer<typeof PatientDetailsSchema>;

export const CreatePatientInputSchema = z.object({
	name: z.string(),
	description: z.string().nullable(),
	city: z.string(),
	zipcode: z.string(),
	address1: z.string(),
	address2: z.string().nullable(),
	email: z.string(),
	phoneNumber: z.string(),
	labId: z.string(),
});

export type CreatePatientInput = z.infer<typeof CreatePatientInputSchema>;
