import { z } from "zod";
import { CaseCategoryBaseSchema } from "../base/case-category.base";
import { LabBaseSchema } from "../base/lab.base";
import { WorkTypeBaseSchema } from "../base/worktype.base";
import { CaseBaseSchema } from "../base/case.base";

export const CaseCategoryDetailsSchema = CaseCategoryBaseSchema.extend({
	lab: LabBaseSchema,
	workTypes: z.array(WorkTypeBaseSchema),
	cases: z.array(CaseBaseSchema),
});

export type CaseCategoryDetails = z.infer<typeof CaseCategoryDetailsSchema>;
