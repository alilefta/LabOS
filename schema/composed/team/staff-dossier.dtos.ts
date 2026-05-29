// schema/composed/team/staff-dossier.dtos.ts

import { z } from "zod";
import { StaffRoleCategorySchema, CommissionTypeSchema, LabRoleSchema } from "@/schema/base/enums.base"; // Adjust paths to your base enums

// ── 1. THE SYSTEM ACCESS STATUS ENUM ────────────────────────────────────────
// Represents the unified software credential state of this employee
export const SystemAccessStateSchema = z.enum([
	"ACTIVE_USER", // Logged in, currently active account
	"PENDING_INVITE", // Invitation sent, awaiting clinic activation
	"NO_ACCESS", // Pure bench/logistics worker (No login account)
]);
export type SystemAccessState = z.infer<typeof SystemAccessStateSchema>;

// ── 2. THE PERFORMANCE VITALS SCHEMAS ───────────────────────────────────────
// These are mathematically calculated on the server to prevent client lag
export const StaffBurnoutRiskSchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
export type StaffBurnoutRisk = z.infer<typeof StaffBurnoutRiskSchema>;

export const StaffPerformanceVitalsSchema = z.object({
	// Workload (Active Assignments)
	activeCaseCount: z.number().int().min(0),
	burnoutRisk: StaffBurnoutRiskSchema,

	// Quality (Lifetime Records)
	totalCompletedCases: z.number().int().min(0),
	remakeRate: z.number().min(0).max(100), // e.g. 4.5 (%)

	// Speed (Calculated from completedAt - createdAt)
	avgTurnaroundDays: z.number().nullable(), // null if no completed cases exist
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

	// Operational Metadata
	roleCategory: StaffRoleCategorySchema,
	jobTitle: z.string().trim().nullable(),
	specialization: z.string().trim().nullable(),

	// Compensation Structure (Role Guarded on read)
	commissionType: CommissionTypeSchema,
	commissionValue: z.number().nullable(), // Null if flat salary with no commission

	// Unified Software Access State
	accessState: SystemAccessStateSchema,
	systemRole: LabRoleSchema.nullable(), // Null if no access
	inviteEmail: z.string().email().nullable(), // Target email for pending invitations
	inviteToken: z.string().nullable(), // Cryptographic token for copying registration links

	// Immutable Performance Metrics (Computed dynamically)
	vitals: StaffPerformanceVitalsSchema,
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

	// Security Identity State
	accessState: SystemAccessStateSchema,
	systemRole: LabRoleSchema.nullable(),
	inviteEmail: z.string().email().nullable(),
});
export type StaffHeaderDTO = z.infer<typeof StaffHeaderDTOSchema>;
