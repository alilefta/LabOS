import { InvoiceStatus, PaymentMethodSchema } from "@/schema/base/enums.base";
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

export const RecordPaymentInputSchema = z.object({
	invoiceId: z.uuid(),
	amount: z.coerce.number<number>().min(0.01, "Amount must be greater than zero."),
	method: PaymentMethodSchema,
	reference: z.string().trim().optional(),
	notes: z.string().trim().optional(),
	paidAt: z.date(),
});

export type RecordPaymentInput = z.infer<typeof RecordPaymentInputSchema>;

export type RiskClinicDTO = {
	id: string;
	name: string;
	city: string;
	currentBalance: number;
	creditLimit: number;
	overdueInvoiceCount: number;
	phoneNumber: string;
};

export interface UninvoicedClinicsSummary {
	clinics: {
		id: string;
		name: string;
		unbilledCount: number;
	}[];
	totalUnbilledCases: number;
}

// ── 1. THE PUBLIC-SAFE DTO (NO SENSITIVE DATA LEAKS) ──────────────────────
export type PublicInvoiceDTO = {
	invoiceNumber: string;
	status: InvoiceStatus;
	notes: string | null;
	subtotal: number;
	discountAmount: number;
	total: number;
	amountPaid: number;
	amountDue: number;
	issuedAt: Date | null;
	dueDate: Date | null;

	lab: {
		title: string;
		subtitle: string | null;
		brandAvatarUrl: string | null;
	};

	clinic: {
		name: string;
		city: string;
		address1: string;
		phoneNumber: string;
		email: string;
	};

	cases: {
		id: string;
		caseNumber: string;
		patientName: string;
		patientAge: number | null;
		patientGender: string | null;
		dentistName: string | null;
		caseTotal: number;
		workItems: {
			productName: string;
			workTypeName: string;
			jawType: string;
			teethCount: number;
		}[];
	}[];
};
