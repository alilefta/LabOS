import { z } from "zod";

export const AdjustInvoiceInputSchema = z
	.object({
		invoiceId: z.uuid("Invalid Invoice ID"),

		// Logistics (Editable in SENT, OVERDUE)
		dueDate: z.date().optional().nullable(),

		// Financials (Editable in SENT, OVERDUE)
		discountPercentage: z.coerce.number<number>().min(0).max(100).optional(),
		discountReason: z.string().trim().optional().nullable(),

		// Metadata (Editable in SENT, OVERDUE, PARTIAL, PAID)
		notes: z.string().trim().optional().nullable(),
	})
	.superRefine((data, ctx) => {
		// Business Rule: If they apply a discount, they must provide a reason
		if (data.discountPercentage && data.discountPercentage > 0 && (!data.discountReason || data.discountReason.trim() === "")) {
			ctx.addIssue({
				code: "custom",
				message: "A reason is required when applying a post-issuance discount.",
				path: ["discountReason"],
			});
		}
	});

export type AdjustInvoiceInput = z.infer<typeof AdjustInvoiceInputSchema>;
