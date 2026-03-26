import { z } from "zod";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";
import { ProductBaseSchema } from "../base/product.base";
import { CasePricingPlanBaseSchema } from "../base/case-pricing-plan.base";
import { PricingStrategySchema } from "../base/pricing-strategy.base";
import { JawTypeSchema } from "../base/jaw-type.base";
import { SelectedToothBaseSchema } from "../base/selected-tooth.base";

export const CaseWorkItemDetailsSchema = CaseWorkItemBaseSchema.extend({
	product: ProductBaseSchema.nullable(),
	Lab: LabBaseSchema,
	casePricingPlan: CasePricingPlanBaseSchema,
	dentalCase: CaseBaseSchema,
	selectedTeeth: z.array(SelectedToothBaseSchema),
});

export type CaseWorkItemBase = z.infer<typeof CaseWorkItemBaseSchema>;

export const CreateCaseWorkItemInputSchema = z.object({
	productId: z.string().nullable(),
	labId: z.string(),
	// caseId: z.string(),
	casePricingPlanId: z.string(),
	totalPrice: z.number(),
	pricingStrategy: PricingStrategySchema,
	firstToothPrice: z.number().nullable(),
	bulkPrice: z.number().nullable(),
	additionalToothPrice: z.number().nullable(),
	bulkPriceThreshold: z.number().nullable(),
	jawType: JawTypeSchema,
});

export type CreateWorkItemInput = z.infer<typeof CreateCaseWorkItemInputSchema>;
