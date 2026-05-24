// schema/composed/invoices/new-invoice.schema.ts

import { z } from "zod";

// Helper to convert empty strings to undefined
const emptyToUndefined = (val: string | null | undefined) => (val?.trim() === "" ? undefined : val);

// ── 1. METADATA FORM SCHEMA (Left Pane) ──────────────────────────────────
export const InvoiceMetadataSchema = z
	.object({
		billingTerms: z.enum(["RECEIPT", "NET15", "NET30", "CUSTOM"]),
		customDueDate: z.date().optional(), // Added field for the custom date
		// Coerce handles parsing HTML string inputs into strict numbers
		discountPercentage: z.coerce.number<number>().min(0, "Discount cannot be negative.").max(100, "Discount cannot exceed 100%."),

		discountReason: z.string().trim().optional(),

		notes: z.string().trim().optional(),
	})
	.superRefine((data, ctx) => {
		// --- CRITICAL B2B AUDIT RULE --- [1]
		// If a discount is applied, a reason MUST be documented [1]
		if (data.discountPercentage > 0 && !data.discountReason) {
			ctx.addIssue({
				code: "custom",
				message: "Please specify why this discount is being applied.",
				path: ["discountReason"],
			});
		}

		// Ensure they actually pick a date if they select CUSTOM
		if (data.billingTerms === "CUSTOM" && !data.customDueDate) {
			ctx.addIssue({
				code: "custom",
				message: "A specific due date is required for custom terms.",
				path: ["customDueDate"],
			});
		}
	});

export type InvoiceMetadataInput = z.infer<typeof InvoiceMetadataSchema>;

// ── 2. MASTER SUBMISSION SCHEMA (Atomic Action Input) ──────────────────────
// This schema merges the form metadata with the active "Cart" selections
export const CreateInvoiceInputSchema = InvoiceMetadataSchema.extend({
	clinicId: z.string().uuid("Please select a clinic partner."),

	// Accountant must select at least 1 case to build a valid statement
	caseIds: z.array(z.string().uuid()).min(1, "You must select at least one completed case to invoice."),

	status: z.enum(["DRAFT", "SENT"]).default("DRAFT"),
});

export type CreateInvoiceInput = z.infer<typeof CreateInvoiceInputSchema>;
