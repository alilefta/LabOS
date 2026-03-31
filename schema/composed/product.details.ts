import * as z from "zod";
import { ProductBaseSchema } from "../base/product.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { WorkTypeBaseSchema } from "../base/worktype.base";
import { CasePricingPlanBaseSchema } from "../base/case-pricing-plan.base";
import { emptyToUndefinedTransformer } from "../base/utils.base";
import { CreateCaseItemPricingPlanInputSchema } from "./case-pricing-plan.details";

export const ProductDetailsSchema = ProductBaseSchema.extend({
	lab: LabBaseSchema,
	caseWorkItems: z.array(CaseWorkItemBaseSchema),
	workType: WorkTypeBaseSchema,
	casePricingPlans: z.array(CasePricingPlanBaseSchema),
});

export type ProductDetails = z.infer<typeof ProductDetailsSchema>;

export const ProductDetailsUISchema = ProductBaseSchema.extend({
	lab: LabBaseSchema.optional(),
	caseWorkItems: z.array(CaseWorkItemBaseSchema).optional(),
	workType: WorkTypeBaseSchema.optional(),
	casePricingPlans: z.array(CasePricingPlanBaseSchema).optional(),
});

export type ProductDetailsUI = z.infer<typeof ProductDetailsUISchema>;

export const CreateProductInputSchema = z.object({
	name: z.string().trim().min(1, "Product name is required"),
	description: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	imageUrl: z
		.union([z.literal(""), z.string().trim().url("Please enter a valid image URL")])
		.transform(emptyToUndefinedTransformer)
		.optional(),
	workTypeId: z.string(),
	// casePricingPlan: CreateCaseItemPricingPlanInputSchema, // independent
});
export type CreateProductInput = z.infer<typeof CreateProductInputSchema>;

export const GetWorkTypesByCategoryInputSchema = z.object({
	caseCategoryId: z.string(),
	limit: z.number().default(10),
});

export type GetWorkTypesByCategoryInput = z.infer<typeof GetWorkTypesByCategoryInputSchema>;
