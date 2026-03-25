import * as z from "zod";
export const LabSubscriptionPlanBaseSchema = z.object({
	id: z.string(),
	labId: z.string(),
	subscriptionNextRenewal: z.date().nullable(),
	isCancelled: z.boolean(),
	cancellationDate: z.date().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type LabSubscriptionPlanBase = z.infer<typeof LabSubscriptionPlanBaseSchema>;
