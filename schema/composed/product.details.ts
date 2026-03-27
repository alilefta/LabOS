import * as z from "zod";
import { ProductBaseSchema } from "../base/product.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { WorkTypeBaseSchema } from "../base/worktype.base";
import { CasePricingPlanBaseSchema } from "../base/case-pricing-plan.base";

export const ProductDetailsSchema = ProductBaseSchema.extend({
	lab: LabBaseSchema,
	caseWorkItems: z.array(CaseWorkItemBaseSchema),
	workType: WorkTypeBaseSchema,
	casePricingPlans: z.array(CasePricingPlanBaseSchema),
});

export type ProductDetails = z.infer<typeof ProductDetailsSchema>;

export const ProductDetailsUISchema = ProductBaseSchema.extend({
	lab: LabBaseSchema.nullable(),
	caseWorkItems: z.array(CaseWorkItemBaseSchema).nullable(),
	workType: WorkTypeBaseSchema.nullable(),
	casePricingPlans: z.array(CasePricingPlanBaseSchema).nullable(),
});

export type ProductDetailsUI = z.infer<typeof ProductDetailsUISchema>;
