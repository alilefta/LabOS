import * as z from "zod";
import { PatientGenderSchema } from "./enums.base";
export const PatientBaseSchema = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	notes: z.string().nullable(),
	age: z.number().int().nullable(),
	gender: PatientGenderSchema.nullable(),
	labId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type PatientBase = z.infer<typeof PatientBaseSchema>;
