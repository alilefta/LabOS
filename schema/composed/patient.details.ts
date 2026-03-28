import * as z from "zod";
import { PatientBaseSchema } from "../base/patient.base";
import { CaseBaseSchema } from "../base/case.base";
import { LabBaseSchema } from "../base/lab.base";
import { PatientGenderSchema } from "../base/enums.base";
import { emptyToUndefinedTransformer } from "../base/utils.base";

export const PatientDetailsSchema = PatientBaseSchema.extend({
	cases: z.array(CaseBaseSchema),
	lab: LabBaseSchema,
});

export type PatientDetails = z.infer<typeof PatientDetailsSchema>;

export const PatientDetailsUISchema = PatientBaseSchema.extend({
	cases: z.array(CaseBaseSchema).optional(),
	lab: LabBaseSchema.nullable(),
});

export type PatientDetailsUI = z.infer<typeof PatientDetailsUISchema>;

export const CreatePatientInputSchema = z.object({
	name: z.string().trim().min(3, "Full name is required."),
	description: z.string().transform(emptyToUndefinedTransformer).optional(),
	notes: z.string().optional(),
	age: z.number().int().optional(),
	gender: PatientGenderSchema.optional(),
});

export type CreatePatientInput = z.infer<typeof CreatePatientInputSchema>;
