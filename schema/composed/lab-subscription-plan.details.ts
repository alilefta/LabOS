import * as z from "zod";
import { LabSubscriptionPlanBaseSchema } from "../base/lab-subscription-plan.base";
import { LabBaseSchema } from "../base/lab.base";
export const LabSubscriptionPlanDetailsSchema = LabSubscriptionPlanBaseSchema.extend({
	lab: LabBaseSchema,
});

export type LabSubscriptionPlanDetails = z.infer<typeof LabSubscriptionPlanDetailsSchema>;
