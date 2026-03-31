import { z } from "zod";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";
import { ProductBaseSchema } from "../base/product.base";
import { CasePricingPlanBaseSchema } from "../base/case-pricing-plan.base";

import { SelectedToothBaseSchema } from "../base/selected-tooth.base";
import { JawTypeSchema } from "../base/enums.base";
import { WorkTypeBaseSchema } from "../base/worktype.base";
import { CreateSelectedToothInputSchema } from "./selected-tooth.details";
import { CreateCaseItemPricingPlanInputSchema } from "./case-pricing-plan.details";

export const CaseWorkItemDetailsSchema = CaseWorkItemBaseSchema.extend({
	product: ProductBaseSchema.nullable(),
	Lab: LabBaseSchema,
	casePricingPlan: CasePricingPlanBaseSchema,
	dentalCase: CaseBaseSchema,
	selectedTeeth: z.array(SelectedToothBaseSchema),
	workType: WorkTypeBaseSchema.nullable(),
});

export type CaseWorkItemDetails = z.infer<typeof CaseWorkItemDetailsSchema>;

export const CaseWorkItemDetailsUISchema = CaseWorkItemBaseSchema.extend({
	product: ProductBaseSchema.optional(),
	Lab: LabBaseSchema,
	casePricingPlan: CasePricingPlanBaseSchema.optional(),
	dentalCase: CaseBaseSchema.optional(),
	selectedTeeth: z.array(SelectedToothBaseSchema).optional(),
	workType: WorkTypeBaseSchema.optional(),
});

export type CaseWorkItemDetailsUI = z.infer<typeof CaseWorkItemDetailsUISchema>;

export const CreateCaseWorkItemInputSchema = z
	.object({
		productId: z.string().trim().min(1).optional(),
		workTypeId: z.string().trim().min(1).optional(),

		totalPrice: z.number().min(0, "Total price must be >= 0"),

		// casePricingPlan: CreateCaseItemPricingPlanInputSchema, // creation of pricing plan belongs to Product so it is removed from here

		casePricingPlanId: z.string().optional(), // selecting exisitng

		selectedTeeth: z.array(CreateSelectedToothInputSchema).optional(),

		jawType: JawTypeSchema,
	})
	.superRefine((data, ctx) => {
		const requiresTeeth = data.jawType !== "OTHER";

		if (requiresTeeth) {
			if (!data.selectedTeeth || data.selectedTeeth.length === 0) {
				ctx.addIssue({
					code: "custom",
					message: "At least one tooth must be selected",
					path: ["selectedTeeth"],
				});
			}
		}

		if (data.selectedTeeth) {
			const positions = data.selectedTeeth.map((t) => t.toothPosition);

			const unique = new Set(positions);

			if (unique.size !== positions.length) {
				ctx.addIssue({
					code: "custom",
					message: "Duplicate teeth are not allowed",
					path: ["selectedTeeth"],
				});
			}
		}
	});

export type CreateCaseWorkItemInput = z.infer<typeof CreateCaseWorkItemInputSchema>;
