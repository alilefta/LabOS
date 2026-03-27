import { z } from "zod";
import { CaseStatusSchema } from "./enums.base";

export const CaseBaseSchema = z.object({
	id: z.string(),
	patientId: z.string(),
	caseNumber: z.string(),
	labId: z.string(),
	salesRepsId: z.string().nullable(),
	caseCategoryId: z.string().nullable(),
	status: CaseStatusSchema,
	grandTotal: z.number(),
	clinicId: z.string().nullable(),
	dentistId: z.string().nullable(),
	technicianId: z.string().nullable(),
	deadline: z.date(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CaseBase = z.infer<typeof CaseBaseSchema>;
