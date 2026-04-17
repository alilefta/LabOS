import { z } from "zod";
import { CaseStatusSchema } from "./enums.base";

export const CaseBaseSchema = z.object({
	id: z.string(),
	patientId: z.string(),
	caseNumber: z.string(),
	labId: z.string(),
	caseCategoryId: z.string().nullable(),
	status: CaseStatusSchema,
	grandTotal: z.number().nullable(),
	clinicId: z.string().nullable(),
	dentistId: z.string().nullable(),
	notes: z.string().nullable(),
	deadline: z.date().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CaseBase = z.infer<typeof CaseBaseSchema>;
