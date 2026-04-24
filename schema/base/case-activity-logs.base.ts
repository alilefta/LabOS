import * as z from "zod";
import { CaseActivityTypeSchema } from "./enums.base";

export const CaseActivityLogBaseSchema = z.object({
	id: z.string(),
	caseId: z.string(),
	labId: z.string(),
	actorId: z.string().nullable(),
	actorName: z.string(),
	type: CaseActivityTypeSchema,
	payload: z.unknown().nullable(),
	summary: z.string(),
	createdAt: z.date(),
});

export type CaseActivityLogBase = z.infer<typeof CaseActivityLogBaseSchema>;
