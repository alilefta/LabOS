// schema/composed/invoices/invoice-details.dtos.ts

import { z } from "zod";
import { InvoiceStatusSchema, PaymentMethodSchema, JawTypeSchema } from "@/schema/base/enums.base"; // Adjust paths to your base enums

// ── 1. THE PAYMENT TIMELINE DTO ──────────────────────────────────────────
export const InvoicePaymentSchema = z.object({
	id: z.uuid(),
	amount: z.number(),
	method: PaymentMethodSchema,
	reference: z.string().nullable(),
	paidAt: z.coerce.date<Date>(), // Coerce safely handles ISO date strings from JSON
});

export type InvoicePaymentDTO = z.infer<typeof InvoicePaymentSchema>;

// ── 2. THE BILLED CASES (LINE ITEMS) DTO ─────────────────────────────────
export const InvoiceCaseItemSchema = z.object({
	productName: z.string(),
	workTypeName: z.string(),
	jawType: JawTypeSchema,
	teethCount: z.number().int(),
});

export const BilledCaseLineItemSchema = z.object({
	id: z.string().uuid(),
	caseNumber: z.string(),
	patientName: z.string(),
	dentistName: z.string().nullable(),

	// CRITICAL: This is the SNAPSHOTTED price from InvoiceCase,
	// NOT the live grandTotal from the Case table.
	caseTotal: z.number(),

	workItems: z.array(InvoiceCaseItemSchema),
	isRemake: z.boolean(),
});

export type BilledCaseLineItemDTO = z.infer<typeof BilledCaseLineItemSchema>;

// ── 3. THE MASTER INVOICE DETAILS DTO (FULL PAGE STATE) ───────────────────
export const InvoiceDetailsDTOSchema = z.object({
	id: z.string().uuid(),
	invoiceNumber: z.string(),
	status: InvoiceStatusSchema,
	notes: z.string().nullable(),

	// Ledger Totals
	subtotal: z.number(),
	discountAmount: z.number(),
	total: z.number(),
	amountPaid: z.number(),
	amountDue: z.number(),

	// Discounts Metadata
	appliedDiscountPercentage: z.number().nullable(),
	discountReason: z.string().nullable(),

	// Timestamps
	issuedAt: z.coerce.date().nullable(),
	dueDate: z.coerce.date().nullable(),
	createdAt: z.coerce.date(),
	updatedAt: z.coerce.date(),

	// Nested Clinic Metadata (Direct, flattened lookup)
	clinic: z.object({
		id: z.string().uuid(),
		name: z.string(),
		city: z.string(),
		address1: z.string(),
		phoneNumber: z.string(),
		email: z.string(),
		type: z.string(),
	}),

	// Nested Lab Metadata
	lab: z.object({
		title: z.string(),
		subtitle: z.string().nullable(),
		brandAvatarUrl: z.string().nullable(),
	}),

	// Billed cases list
	cases: z.array(BilledCaseLineItemSchema),

	// Payment history timeline
	payments: z.array(InvoicePaymentSchema),

	// ── DYNAMIC METRICS (PRE-COMPUTED ON THE SERVER) ───────────────────────
	// calculated: true IF amountDue > 0 AND dueDate < Today
	isOverdue: z.boolean(),
	// percentage: Math.round((amountPaid / total) * 100)
	paymentProgressPct: z.number().min(0).max(100),
	// number of days past due (null if paid or not yet due)
	agingDays: z.number().int().nullable(),
});

export type InvoiceDetailsDTO = z.infer<typeof InvoiceDetailsDTOSchema>;
