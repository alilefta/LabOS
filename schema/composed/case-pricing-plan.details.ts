import * as z from "zod";
import { LabBaseSchema } from "../base/lab.base";
import { CaseWorkItemBaseSchema } from "../base/case-work-item.base";
import { ProductBaseSchema } from "../base/product.base";
import { ClinicBaseSchema } from "../base/clinic.base";

export const CasePricingPlanDetailsSchema = z.object({
	lab: LabBaseSchema,
	caseWorkItem: z.array(CaseWorkItemBaseSchema),
	product: ProductBaseSchema.nullable(),
	clinic: ClinicBaseSchema.nullable(),
});

export type CasePricingPlanDetails = z.infer<typeof CasePricingPlanDetailsSchema>;

export const CasePricingPlanDetailsUISchema = z.object({
	lab: LabBaseSchema.nullable(),
	caseWorkItem: z.array(CaseWorkItemBaseSchema),
	product: ProductBaseSchema.nullable(),
	clinic: ClinicBaseSchema.nullable(),
});

export type CasePricingPlanDetailsUI = z.infer<typeof CasePricingPlanDetailsUISchema>;
