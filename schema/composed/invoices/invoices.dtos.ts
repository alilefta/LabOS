import { InvoiceStatus } from "@/schema/base/enums.base";
import z from "zod";
import { InvoiceFiltersSchema } from "./invoice-filters";

// ── 1. The Table Row DTO ────────────────────────────────────────────────
export type InvoiceListDTO = {
	id: string;
	invoiceNumber: string;
	clinicName: string;

	issuedAt: Date | null;
	dueDate: Date | null;

	// Financial Snapshots
	total: number;
	amountPaid: number;
	amountDue: number;

	// The DB Status
	status: InvoiceStatus;

	// Aggregated/Calculated properties for UI (Computed in Server Action)
	isOverdue: boolean; // true IF amountDue > 0 AND dueDate < Today
	progressPct: number; // Math.round((amountPaid / total) * 100)

	// For the WhatsApp action
	publicToken: string | null;
};

// ── 3. The Server Action Result  ─────────────────────────────────────────

export const GetInvoicsListSchema = z.object({
	cursor: z.string().optional(),
	take: z.number().default(20),
	search: z.string().optional(),
	filters: InvoiceFiltersSchema,
});

export type GetInvoicesListResult = {
	invoices: InvoiceListDTO[];
	nextCursor: string | null;
	totalCount: number;
	totalAmountDue: number; // Aggregate sum for the current filtered view
};

export interface ArVitalsDTO {
	totalOutstanding: number;
	outstandingInvoiceCount: number;

	totalOverdue: number;
	overdueInvoiceCount: number;

	collectedLast30Days: number;
	collectedGrowthPercent: number; // vs previous 30 days
}
