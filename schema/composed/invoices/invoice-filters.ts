import { z } from "zod";
import { InvoiceStatusSchema } from "@/schema/base/enums.base"; // Adjust path to your Enums
import { DatePresetSchema } from "@/schema/composed/shared/date-preset";

// ── DATE LOGIC (Invoice Specific) ───────────────────────────────────────────
// For invoices, the most critical dates are when it was issued and when it is due.
export const InvoiceDateFilterFieldSchema = z.enum(["createdAt", "issuedAt", "dueDate"]);
export type InvoiceDateFilterField = z.infer<typeof InvoiceDateFilterFieldSchema>;

export const InvoicePulseFilterSchema = z.enum(["all", "outstanding", "overdue", "collected"]);
export type InvoicePulseFilter = z.infer<typeof InvoicePulseFilterSchema>;

export const InvoiceDateRangeFilterSchema = z.object({
	field: InvoiceDateFilterFieldSchema,
	preset: DatePresetSchema,
	from: z.date().nullable(),
	to: z.date().nullable(),
});

export type InvoiceDateRangeFilter = z.infer<typeof InvoiceDateRangeFilterSchema>;

// ── THE MASTER INVOICE FILTER DTO ───────────────────────────────────────────
export const InvoiceFiltersSchema = z.object({
	// Primary Lists
	statuses: z.array(InvoiceStatusSchema),

	// Scoped IDs
	clinicId: z.string().nullable(), // Nullable so it works on Global Billing Dashboard too

	// Date Logic
	dateRange: InvoiceDateRangeFilterSchema.nullable(),

	// Boolean Flags (Quick Filters)
	isUnpaidOnly: z.boolean().default(false),

	pulseFilter: InvoicePulseFilterSchema,
});

export type InvoiceFilters = z.infer<typeof InvoiceFiltersSchema>;

// ── DEFAULTS ─────────────────────────────────────────────────────────────────
export const DEFAULT_INVOICE_FILTERS: InvoiceFilters = {
	statuses: [],
	clinicId: null,
	isUnpaidOnly: false,
	dateRange: null,
	pulseFilter: "all",
};

// export const DEFAULT_INVOICES_FILTERS: InvoicesFilters = {
// 	pulseFilter: "all",
// 	statuses: [],
// 	clinicId: null,
// 	dateRange: null,
// };
