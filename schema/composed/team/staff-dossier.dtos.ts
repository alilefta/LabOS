// schema/composed/team/staff-dossier.dtos.ts

import { z } from "zod";
import { StaffRoleCategorySchema, CommissionTypeSchema, LabRoleSchema, WeekdaySchema } from "@/schema/base/enums.base"; // Adjust paths to your base enums

// ── 1. THE SYSTEM ACCESS STATUS ENUM ────────────────────────────────────────
// Represents the unified software credential state of this employee
export const SystemAccessStateSchema = z.enum([
	"ACTIVE_USER", // Logged in, currently active account
	"PENDING_INVITE", // Invitation sent, awaiting clinic activation
	"NO_ACCESS", // Pure bench/logistics worker (No login account)
]);
export type SystemAccessState = z.infer<typeof SystemAccessStateSchema>;

// Performance analytics have a separate action/permission boundary. They are
// intentionally not embedded in StaffDossierDTO.
export const StaffBurnoutRiskSchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
export type StaffBurnoutRisk = z.infer<typeof StaffBurnoutRiskSchema>;

export const StaffPerformanceVitalsSchema = z.object({
	activeCaseCount: z.number().int().min(0),
	burnoutRisk: StaffBurnoutRiskSchema,
	totalCompletedCases: z.number().int().min(0),
	remakeRate: z.number().min(0).max(100),
	avgTurnaroundDays: z.number().nullable(),
});

export type StaffPerformanceVitals = z.infer<typeof StaffPerformanceVitalsSchema>;

// ── 3. THE MASTER DOSSIER DTO (FULL PAGE STATE) ─────────────────────────────
export const StaffDossierDTOSchema = z.object({
	// Primary HR Identity (Scalar Fields)
	id: z.string().uuid(),
	firstName: z.string().trim().min(1, "First name is required."),
	lastName: z.string().trim().min(1, "Last name is required."),
	phoneNumber: z.string().trim(),
	avatarUrl: z.string().url().nullable(),
	isActive: z.boolean(),
	workingDays: z.array(WeekdaySchema),

	// Operational Metadata
	roleCategory: StaffRoleCategorySchema,
	jobTitle: z.string().trim().nullable(),
	specialization: z.string().trim().nullable(),

	// Independently authorized disclosure sections. A null section means the
	// actor was not permitted to query it; it is not a client-side hiding hint.
	compensation: z
		.object({
			commissionType: CommissionTypeSchema,
			commissionValue: z.number().nullable(),
		})
		.nullable(),
	access: z
		.object({
			accessState: SystemAccessStateSchema,
			systemRole: LabRoleSchema.nullable(),
			inviteEmail: z.string().email().nullable(),
		})
		.nullable(),
});

export type StaffDossierDTO = z.infer<typeof StaffDossierDTOSchema>;

// ── 1. LEAN METADATA DTO (For generateMetadata) ─────────────────────────────
export const StaffMetadataDTOSchema = z.object({
	id: z.string().uuid(),
	firstName: z.string(),
	lastName: z.string(),
});
export type StaffMetadataDTO = z.infer<typeof StaffMetadataDTOSchema>;

// ── 2. LEAN HEADER DTO (For Sticky Header) ──────────────────────────────────
export const StaffHeaderDTOSchema = z.object({
	id: z.string().uuid(),
	firstName: z.string(),
	lastName: z.string(),
	phoneNumber: z.string(),
	avatarUrl: z.string().nullable(),
	isActive: z.boolean(),
	roleCategory: StaffRoleCategorySchema,
	jobTitle: z.string().nullable(),
	specialization: z.string().nullable(),

});
export type StaffHeaderDTO = z.infer<typeof StaffHeaderDTOSchema>;
