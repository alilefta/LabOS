import * as z from "zod";
import { CaseActivityTypeSchema } from "./enums.base";
export const CaseActivityLogBaseSchema = z.object({
	id: z.string(),
	caseId: z.string(),
	labId: z.string(),
	actorId: z.string().nullable(),
	actorName: z.string(),
	type: CaseActivityTypeSchema,
	summary: z.string(),
	payload: z.unknown().nullable(), // parsed at readtime!
	createdAt: z.date(),
});

export type CaseActivityLogBase = z.infer<typeof CaseActivityLogBaseSchema>;
