import { z } from "zod";
import { StaffRoleCategorySchema } from "@/schema/base/enums.base";

// ── 1. GRANULAR ENUMS FOR ADVANCED FILTERING ────────────────────────────

export const SystemAccessStateSchema = z.enum([
	"ACTIVE_USER", // Logged in, fully onboarded
	"PENDING_INVITE", // Sent invite, hasn't accepted
	"NO_ACCESS", // Operational only (e.g. Courier with no app seat)
]);
export type SystemAccessState = z.infer<typeof SystemAccessStateSchema>;

// Represents the current "Stress Level" of the employee based on active cases
export const CapacityBandSchema = z.enum([
	"AVAILABLE", // 0-3 active cases
	"OPTIMAL", // 4-8 active cases
	"HEAVY", // 9-14 active cases
	"OVERLOADED", // 15+ active cases (Burnout risk)
]);
export type CapacityBand = z.infer<typeof CapacityBandSchema>;

// Represents the Lifetime Quality metric of the employee
export const QualityRiskBandSchema = z.enum([
	"EXCELLENT", // < 2% remake rate
	"AVERAGE", // 2% - 5% remake rate
	"ELEVATED", // 6% - 10% remake rate
	"CRITICAL", // > 10% remake rate
]);
export type QualityRiskBand = z.infer<typeof QualityRiskBandSchema>;

// ── 2. THE MASTER TEAM FILTER SCHEMA ─────────────────────────────────────

export const TeamFiltersSchema = z.object({
	// Identity & HR Status
	roleCategories: z.array(StaffRoleCategorySchema).default([]),
	accessStates: z.array(SystemAccessStateSchema).default([]),
	isActive: z.boolean().default(true), // false = Fired/Archived staff

	// Operational Workload (The "Right Now" Filters)
	capacityBands: z.array(CapacityBandSchema).default([]),

	// Clinical Quality (The "Historical" Filters)
	qualityBands: z.array(QualityRiskBandSchema).default([]),

	// Specific Assignments (e.g. "Show me everyone who works on Implants")
	// This would map to the `specialization` field in your LabStaff model
	specializationSearch: z.string().nullable().default(null),
});

export type TeamFilters = z.infer<typeof TeamFiltersSchema>;

// ── 3. DEFAULT STATE ──────────────────────────────────────────────────────

export const DEFAULT_TEAM_FILTERS: TeamFilters = {
	roleCategories: [],
	accessStates: [],
	isActive: true, // Always default to active employees
	capacityBands: [],
	qualityBands: [],
	specializationSearch: null,
};
