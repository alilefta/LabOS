import * as z from "zod";
import { LabBaseSchema } from "../base/lab.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
export const CasePricingPlanDetailsSchema = z.object({
	lab: LabBaseSchema,
	caseWorkItem: z.array(CaseWorkItemBaseSchema),
});

export type CasePricingPlanDetails = z.infer<typeof CasePricingPlanDetailsSchema>;
