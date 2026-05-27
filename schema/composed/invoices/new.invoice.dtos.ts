import { z } from "zod";
import { CaseStatusSchema, JawTypeSchema } from "@/schema/base/enums.base";
import { ClinicBaseSchema } from "@/schema/base/clinic.base";

// ── 1. UNBILLED CASE DTO ────────────────────────────────────────────────
export const UnbilledCaseDTOSchema = z.object({
	id: z.string(),
	caseNumber: z.string(),
	patientName: z.string(),
	dentistName: z.string().nullable(),
	grandTotal: z.number(),
	status: CaseStatusSchema,
	createdAt: z.date(),
	workItems: z.array(
		z.object({
			productName: z.string(),
			jawType: JawTypeSchema,
			teethCount: z.number(),
		}),
	),
});

export type UnbilledCaseDTO = z.infer<typeof UnbilledCaseDTOSchema>;

// ── 2. ELIGIBLE CLINIC DTO ──────────────────────────────────────────────
export const EligibleClinicDTOSchema = ClinicBaseSchema.omit({
	address1: true,
	address2: true,
	createdAt: true,
	updatedAt: true,
	billingPhoneNumber: true,
	creditLimit: true,
	currentBalance: true,
	description: true,
	discount: true,
	zipcode: true,
	notes: true,
	taxNumber: true,
	billingEmail: true,
});
export type EligibleClinicDTO = z.infer<typeof EligibleClinicDTOSchema>;

// ── 3. MASTER ONBOARDING DTO ────────────────────────────────────────────
export const NewInvoiceOnboardingDataSchema = z.object({
	prefetchedCases: z.array(UnbilledCaseDTOSchema),
	eligibleClinics: z.array(EligibleClinicDTOSchema),
	selectedClinicName: z.string().nullable(),
});

export type NewInvoiceOnboardingData = z.infer<typeof NewInvoiceOnboardingDataSchema>;
