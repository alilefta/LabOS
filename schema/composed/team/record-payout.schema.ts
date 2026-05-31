// schema/composed/team/record-payout.schema.ts

import { z } from "zod";
import { PaymentMethodSchema } from "@/schema/base/enums.base"; // Re-uses the exact same payment methods as Invoices!

// Helper to convert empty strings to undefined
const emptyToUndefined = (val: string | null | undefined) => (val?.trim() === "" ? undefined : val);

export const RecordPayoutInputSchema = z.object({
	// The target human being receiving the money
	staffId: z.string().uuid("Invalid staff ID context."),

	// An array of the specific CaseStaffAssignment IDs we are settling
	assignmentIds: z.array(z.string().uuid()).min(1, "You must select at least one active assignment to disburse payments."),

	// Regional Payment Methods (Cash, Zain Cash, etc.)
	method: PaymentMethodSchema,

	// Optional Transaction Reference (e.g., Zain Cash receipt number)
	reference: z
		.string()
		.trim()
		.transform(emptyToUndefined)
		.transform((value) => (value === null ? undefined : value))
		.optional(),

	// Optional Accountant Notes (e.g., "Handed cash directly in the lunchroom")
	notes: z
		.string()
		.trim()
		.transform(emptyToUndefined)
		.transform((value) => (value === null ? undefined : value))
		.optional(),

	// The actual date the payment was handed over (defaults to today)
	paidAt: z.date({ error: "Payment date is mandatory." }),
});

export type RecordPayoutInput = z.infer<typeof RecordPayoutInputSchema>;
