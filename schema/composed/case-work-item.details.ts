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
import { ToothPositionSchema } from "../base/tooth-position.base";
import { emptyToUndefinedTransformer } from "../base/utils.base";
// import { emptyToUndefinedTransformer } from "../base/utils.base";

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

export const CreateCaseWorkItemInputSchema = CaseWorkItemBaseSchema.omit({
	labId: true,
	id: true,
	dentalCaseId: true,
	createdAt: true,
	updatedAt: true,
	additionalToothPrice: true,
	bulkPrice: true,
	firstToothPrice: true,
	toothPrice: true,
	teethCountToApplyBulkPrice: true,
	pricingStrategy: true,
})
	.extend({
		productId: z.string().trim().min(1, "Product is required"), // ← remove optional, product is required for a work item
		workTypeId: z.string().trim().min(1, "Work type is required"), // ← same
		casePricingPlanId: z.string().min(1, "Pricing plan is required"), // ← add min(1)
		totalPrice: z.number().min(0, "Total price must be >= 0"),
		jawType: JawTypeSchema,
		selectedTeeth: z.array(CreateSelectedToothInputSchema).optional(),

		// Shade fields — all optional, no validation needed beyond string
		notes: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
		shadeSystem: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
		baseShade: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
		stumpShade: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
		shadeNotes: z.string().trim().transform(emptyToUndefinedTransformer).optional(),
	})
	.superRefine((data, ctx) => {
		if (data.jawType !== "OTHER" && data.selectedTeeth && data.selectedTeeth.length === 0) {
			ctx.addIssue({
				code: "custom",
				message: "At least one tooth must be selected for upper/lower jaw items.",
				path: ["selectedTeeth"],
			});
		}

		// Duplicate teeth check
		if (data.selectedTeeth && data.selectedTeeth.length > 0) {
			const positions = data.selectedTeeth.map((t) => t.toothPosition);
			if (new Set(positions).size !== positions.length) {
				ctx.addIssue({
					code: "custom",
					message: "Duplicate tooth positions are not allowed.",
					path: ["selectedTeeth"],
				});
			}
		}

		// Upper jaw teeth should not contain lower jaw positions and vice versa
		if (data.jawType === "UPPER" && data.selectedTeeth && data.selectedTeeth.length > 0) {
			const hasLowerTeeth = data.selectedTeeth.some((t) => t.toothPosition.startsWith("Lower"));
			if (hasLowerTeeth) {
				ctx.addIssue({
					code: "custom",
					message: "Upper jaw work items cannot contain lower jaw teeth.",
					path: ["selectedTeeth"],
				});
			}
		}

		if (data.jawType === "LOWER" && data.selectedTeeth && data.selectedTeeth.length > 0) {
			const hasUpperTeeth = data.selectedTeeth.some((t) => t.toothPosition.startsWith("Upper"));
			if (hasUpperTeeth) {
				ctx.addIssue({
					code: "custom",
					message: "Lower jaw work items cannot contain upper jaw teeth.",
					path: ["selectedTeeth"],
				});
			}
		}
	});

export type CreateCaseWorkItemInput = z.infer<typeof CreateCaseWorkItemInputSchema>;

export const CreateCaseWorkItemInputSchemaPure = CaseWorkItemDetailsUISchema.omit({
	id: true,
	dentalCaseId: true,
	labId: true,
	createdAt: true,
	updatedAt: true,
	Lab: true,
}).extend({
	selectedTeeth: z.array(
		z.object({
			toothPosition: ToothPositionSchema,
		}),
	),
});

export type CreateCaseWorkItemInputSchemaPure = z.infer<typeof CreateCaseWorkItemInputSchemaPure>;
