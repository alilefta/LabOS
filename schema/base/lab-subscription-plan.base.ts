import * as z from "zod";
import { SubscriptionTierSchema } from "./enums.base";

export const LabSubscriptionPlanBaseSchema = z.object({
	id: z.string(),
	labId: z.string(),
	tier: SubscriptionTierSchema,
	maxMembers: z.number().int(),
	maxCasesMonth: z.number().int(),
	stripeCustomerId: z.string().nullable(),
	stripeSubscriptionId: z.string().nullable(),
	stripePriceId: z.string().nullable(),
	subscriptionNextRenewal: z.date().nullable(),
	isCancelled: z.boolean(),
	cancellationDate: z.date().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type LabSubscriptionPlanBase = z.infer<typeof LabSubscriptionPlanBaseSchema>;
