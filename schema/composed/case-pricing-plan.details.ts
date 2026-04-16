import * as z from "zod";
import { LabBaseSchema } from "../base/lab.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { ProductBaseSchema } from "../base/product.base";
import { ClinicBaseSchema } from "../base/clinic.base";
import { PricingStrategySchema } from "../base/enums.base";
import { CasePricingPlanBaseSchema } from "../base/case-pricing-plan.base";

export const CasePricingPlanDetailsSchema = CasePricingPlanBaseSchema.extend({
	lab: LabBaseSchema,
	caseWorkItem: z.array(CaseWorkItemBaseSchema),
	product: ProductBaseSchema,
	clinic: ClinicBaseSchema,
});

export type CasePricingPlanDetails = z.infer<typeof CasePricingPlanDetailsSchema>;

export const CasePricingPlanDetailsUISchema = CasePricingPlanBaseSchema.extend({
	lab: LabBaseSchema.optional(),
	caseWorkItem: z.array(CaseWorkItemBaseSchema).optional(),
	product: ProductBaseSchema.optional(),
	clinic: ClinicBaseSchema.optional(),
});

export type CasePricingPlanDetailsUI = z.infer<typeof CasePricingPlanDetailsUISchema>;

export const CreateCaseItemPricingPlanInputSchema = z
	.object({
		name: z.string().trim().min(1, "Pricing plan name is required"),

		isDefault: z.boolean(),

		pricingStrategy: PricingStrategySchema,

		firstToothPrice: z.coerce.number<number>().min(0, "").optional(),
		bulkPrice: z.coerce.number<number>().min(0, "").optional(),
		additionalToothPrice: z.coerce.number<number>().min(0, "").optional(),
		teethCountToApplyBulkPrice: z.coerce.number<number>().min(0, "").optional(),
		toothPrice: z.coerce.number<number>().min(0, "").optional(),

		productId: z.string().trim().min(1),
		clinicId: z.string().trim().min(1).optional(),
	})
	.superRefine((data, ctx) => {
		if (data.pricingStrategy === "PERTOOTH") {
			if (data.toothPrice === null) {
				ctx.addIssue({
					code: "invalid_type",
					message: "Tooth price is required",
					path: ["toothPrice"],
					expected: "number",
				});
			}
		}

		if (data.pricingStrategy === "BULK") {
			// Only require bulkPrice. The teethCount is irrelevant for a pure flat rate!
			if (data.bulkPrice === null || data.bulkPrice === undefined) {
				ctx.addIssue({
					code: "invalid_type",
					message: "Flat Arch/Case price is required for Bulk strategy.",
					path: ["bulkPrice"],
					expected: "number",
				});
			}
		}
		if (data.pricingStrategy === "CUSTOM") {
			if (data.firstToothPrice === null) {
				ctx.addIssue({
					code: "invalid_type",
					message: "First tooth price is required",
					path: ["firstToothPrice"],
					expected: "number",
				});
			}

			if (data.additionalToothPrice === null) {
				ctx.addIssue({
					code: "invalid_type",
					message: "Additional tooth price is required",
					path: ["additionalToothPrice"],
					expected: "number",
				});
			}
		}
	});

export type CreateCaseItemPricingPlanInput = z.infer<typeof CreateCaseItemPricingPlanInputSchema>;

export const GetPricingPlansByProductIdInputSchema = z.object({
	productId: z.string().trim().min(1),
	limit: z.number().default(10),
});

export type GetPricingPlansByProductIdInput = z.infer<typeof GetPricingPlansByProductIdInputSchema>;

export const GetPricingPlansByClinicIdInputSchema = z.object({
	clinicId: z.string().trim().min(1),
	limit: z.number().default(10),
});

export type GetPricingPlansByClinicIdInput = z.infer<typeof GetPricingPlansByClinicIdInputSchema>;
