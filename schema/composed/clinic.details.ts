import * as z from "zod";
import { ClinicBaseSchema } from "../base/clinic.base";
import { LabBaseSchema } from "../base/lab.base";
import { CaseBaseSchema } from "../base/case.base";
import { CasePricingPlanBaseSchema } from "../base/case-pricing-plan.base";
import { DentistBaseSchema } from "../base/dentist.base";
import { ClinicStatusSchema, ClinicTypeSchema, JawTypeSchema, PaymentMethodSchema } from "../base/enums.base";
import { CreatePrimaryDentistInputSchema } from "./dentist.details";
import { emptyToUndefinedTransformer } from "../base/utils.base";
import { InvoiceBaseSchema } from "../base/invoice.base";

export const ClinicDetailsSchema = ClinicBaseSchema.extend({
	lab: LabBaseSchema,
	cases: z.array(CaseBaseSchema),
	dentists: z.array(DentistBaseSchema),
	casePricingPlans: z.array(CasePricingPlanBaseSchema),
	invoices: z.array(InvoiceBaseSchema),
});

export type ClinicDetails = z.infer<typeof ClinicDetailsSchema>;

export const ClinicDetailsUISchema = ClinicBaseSchema.extend({
	lab: LabBaseSchema.optional(),
	cases: z.array(CaseBaseSchema).optional(),
	dentists: z.array(DentistBaseSchema).optional(),
	casePricingPlans: z.array(CasePricingPlanBaseSchema).optional(),
	invoices: z.array(InvoiceBaseSchema).optional(),
});

export type ClinicDetailsUI = z.infer<typeof ClinicDetailsUISchema>;

const optionalEmail = z
	.string()
	.trim()
	.transform(emptyToUndefinedTransformer)
	.optional()
	.pipe(z.email({ message: "Please enter a valid email address." }).optional());

// ========================= Create Clinic Schema For Register Quick Clinic Sheet
export const CreateQuickClinicInputSchema = z.object({
	name: z.string().trim().min(2, "Clinic name must be at least 2 characters."),

	description: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	website: z.string().trim().transform(emptyToUndefinedTransformer).optional().pipe(z.string().url("Please enter a valid website URL.").optional()),

	notes: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	status: ClinicStatusSchema,

	type: ClinicTypeSchema,

	city: z.string().trim().min(2, "City is required."),

	zipcode: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	address1: z.string().trim().min(3, "Address is required."),

	address2: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	email: z.string().trim().email("Please enter a valid email address."),

	phoneNumber: z.string().trim().min(7, "Please enter a valid phone number."),

	billingEmail: optionalEmail,

	billingPhoneNumber: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	taxNumber: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	discount: z.number().min(0, "Discount cannot be negative.").max(100, "Discount cannot exceed 100%.").optional(),

	creditLimit: z.number().min(0, "Credit limit cannot be negative.").optional(),

	currentBalance: z.number().min(0, "Current balance cannot be negative."),
	primaryDentist: CreatePrimaryDentistInputSchema,
});

export type CreateQuickClinicInput = z.infer<typeof CreateQuickClinicInputSchema>;

// ============================= Create Complete Clinic Form Page Schema =======================
// ========================= Create Clinic Schema For Register Quick Clinic Sheet
export const CreateClinicInputSchema = z.object({
	name: z.string().trim().min(2, "Clinic name must be at least 2 characters."),

	description: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	website: z.string().trim().transform(emptyToUndefinedTransformer).optional().pipe(z.string().url("Please enter a valid website URL.").optional()),

	notes: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	status: ClinicStatusSchema,

	type: ClinicTypeSchema,

	city: z.string().trim().min(2, "City is required."),

	zipcode: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	address1: z.string().trim().min(3, "Address is required."),

	address2: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	email: z.string().trim().email("Please enter a valid email address."),

	phoneNumber: z.string().trim().min(7, "Please enter a valid phone number."),

	billingEmail: optionalEmail,

	billingPhoneNumber: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	taxNumber: z.string().trim().transform(emptyToUndefinedTransformer).optional(),

	discount: z.number().min(0, "Discount cannot be negative.").max(100, "Discount cannot exceed 100%.").optional(),

	creditLimit: z.number().min(0, "Credit limit cannot be negative.").optional(),

	currentBalance: z.number().min(0, "Current balance cannot be negative."),
	primaryDentist: CreatePrimaryDentistInputSchema,
});

export type CreateClinicInput = z.infer<typeof CreateClinicInputSchema>;

// ======================================== Get Clinics =====================================
// ─────────────────────────────────────────────────────────────────────────────
// 1. DTO: The Clinic List Item
// ─────────────────────────────────────────────────────────────────────────────
// Lean projection — heavily optimized for the Virtualized Table.
// Aggregates nested data (Dentists, Uninvoiced Cases) so the frontend
// doesn't have to do any heavy lifting.

export const ClinicListDTOSchema = z.object({
	id: z.string(),
	name: z.string(),
	type: ClinicTypeSchema,
	city: z.string(),
	status: ClinicStatusSchema,
	phoneNumber: z.string(),

	// --- Financial Health ---
	currentBalance: z.number(),
	creditLimit: z.number().nullable(),
	uninvoicedCasesCount: z.number(), // Critical for Lab Admin action

	// --- Human Resources ---
	ownerDentist: z
		.object({
			id: z.string(),
			name: z.string(),
			// avatarUrl: z.string().nullable().optional(),
		})
		.nullable(),
	totalDentists: z.number(),

	// --- Operational Health ---
	activeCases: z.number(), // Cases currently IN PRODUCTION for this clinic
	remakeRate: z.number().optional(), // Optional V2 AI Feature: (Failed / Total) %

	// --- Operational Health (New) ---
	healthScore: z.number().min(0).max(100),
	trendData: z.array(z.number()), // Weekly volume for sparkline
});

export type ClinicListDTO = z.infer<typeof ClinicListDTOSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// 2. FILTERS: The Pulse Strip & Advanced Filters
// ─────────────────────────────────────────────────────────────────────────────

// The 5 clickable cards at the top of the dashboard
export const ClinicPulseFilterSchema = z.enum([
	"all", // Baseline
	"credit_risk", // currentBalance >= (creditLimit * 0.8)
	"uninvoiced", // uninvoicedCasesCount > 0
	"suspended", // status === "SUSPENDED"
	"dormant", // activeCases === 0 AND no recent activity
]);
export type ClinicPulseFilter = z.infer<typeof ClinicPulseFilterSchema>;

// The complete filter state for the Data Table
export const ClinicsFiltersSchema = z.object({
	pulseFilter: ClinicPulseFilterSchema,

	// Advanced Filters (from the slide-out sheet)
	statuses: z.array(ClinicStatusSchema),
	types: z.array(ClinicTypeSchema),
	hasOutstandingBalance: z.boolean().default(false),
});

export type ClinicsFilters = z.infer<typeof ClinicsFiltersSchema>;

export const DEFAULT_CLINICS_FILTERS: ClinicsFilters = {
	pulseFilter: "all",
	statuses: [],
	types: [],
	hasOutstandingBalance: false,
};

// ─────────────────────────────────────────────────────────────────────────────
// 3. SERVER ACTION INPUTS
// ─────────────────────────────────────────────────────────────────────────────

export const GetClinicsListInputSchema = z.object({
	cursor: z.string().optional(),
	take: z.number().optional().default(30),
	search: z.string().optional(),
	filters: ClinicsFiltersSchema,
});

export type GetClinicsListInput = z.infer<typeof GetClinicsListInputSchema>;
export type GetClinicsListResult = {
	clinics: ClinicListDTO[];
	nextCursor: string | null;
	totalCount: number;
};
// Data shape for the 5 Pulse Strip cards
export type ClinicPulseStats = {
	all: number;
	credit_risk: number;
	uninvoiced: number;
	suspended: number;
	dormant: number;
};

export type ClinicRevenueStats = {
	totalAccountsReceivable: number; // Sum of all clinic.currentBalance
	totalUnbilled: number; // Sum of cases completed/delivered but not invoiced
	totalOverdueInvoices: number; // Sum of invoice.amountDue where status is OVERDUE
};

// ============================== Preview DTOs ======================
export const ClinicQuickOverviewDTOSchema = z.object({
	id: z.string(),
	name: z.string(),
	type: ClinicTypeSchema,
	status: ClinicStatusSchema,
	city: z.string(),
	address1: z.string(),
	phoneNumber: z.string(),
	email: z.string(),
	createdAt: z.date(),

	// Financials
	currentBalance: z.number(),
	creditLimit: z.number().nullable(),
	uninvoicedCasesCount: z.number(),

	// Nested Dentists
	dentists: z.array(
		DentistBaseSchema.pick({
			id: true,
			name: true,
			isDefault: true,
		}),
	),

	// Last 5 Cases
	recentCases: z.array(
		CaseBaseSchema.pick({
			id: true,
			caseNumber: true,
			status: true,
			deadline: true,
			patientId: true,
		}).extend({
			caseItems: z.array(
				z.object({
					productName: z.string(),
					jawType: JawTypeSchema,
				}),
			),
			patientName: z.string(),
		}),
	),

	// Last 3 Payments
	recentPayments: z.array(
		z.object({
			id: z.string(),
			amount: z.number(),
			paidAt: z.date(),
			method: PaymentMethodSchema,
		}),
	),
});

export type ClinicQuickOverviewDTO = z.infer<typeof ClinicQuickOverviewDTOSchema>;
