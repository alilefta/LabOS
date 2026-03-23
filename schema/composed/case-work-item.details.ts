import { z } from "zod";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";
import { ProductBaseSchema } from "../base/product.base";
import { CasePricingPlanBaseSchema } from "../base/case-pricing-plan.base";

export const CaseWorkItemDetailsSchema = CaseWorkItemBaseSchema.extend({
	product: ProductBaseSchema.nullable(),
	Lab: LabBaseSchema,
	casePricingPlan: CasePricingPlanBaseSchema,
	case: CaseBaseSchema,
});

export type CaseWorkItemBase = z.infer<typeof CaseWorkItemBaseSchema>;
