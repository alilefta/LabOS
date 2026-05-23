import { z } from "zod";
import { CaseStatusSchema, JawTypeSchema } from "@/schema/base/enums.base";

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
export const EligibleClinicDTOSchema = z.object({
	id: z.string(),
	name: z.string(),
	city: z.string(),
	type: z.string(),
});

export type EligibleClinicDTO = z.infer<typeof EligibleClinicDTOSchema>;

// ── 3. MASTER ONBOARDING DTO ────────────────────────────────────────────
export const NewInvoiceOnboardingDataSchema = z.object({
	prefetchedCases: z.array(UnbilledCaseDTOSchema),
	eligibleClinics: z.array(EligibleClinicDTOSchema),
	selectedClinicName: z.string().nullable(),
});

export type NewInvoiceOnboardingData = z.infer<typeof NewInvoiceOnboardingDataSchema>;
