import { CaseStatusSchema } from "@/schema/base/enums.base";
import z from "zod";

export const CaseFilterModeSchema = z.enum(["GLOBAL", "CLINIC_HISTORY", "STAFF_DASHBOARD"]);
export type CaseFilterMode = z.infer<typeof CaseFilterModeSchema>;

// ── DATE LOGIC (Universal) ──────────────────────────────────────────────────
// We include ALL possible date fields here. The UI mode will determine
// which ones are selectable in the dropdown.
export const CaseDateFilterFieldSchema = z.enum(["createdAt", "deadline", "deliveredAt"]);
export type CaseDateFilterField = z.infer<typeof CaseDateFilterFieldSchema>;

export const DatePresetSchema = z.enum(["this_month", "last_month", "last_3_months", "last_6_months", "custom"]);
export type DatePreset = z.infer<typeof DatePresetSchema>;

export const DateRangeFilterSchema = z.object({
	field: CaseDateFilterFieldSchema,
	preset: DatePresetSchema,
	from: z.date().nullable(),
	to: z.date().nullable(),
});

export const PulseFilterSchema = z.enum(["overdue", "due_today", "unassigned", "processing", "all"]);
export type PulseFilter = z.infer<typeof PulseFilterSchema>;

// ── THE MASTER FILTER DTO ───────────────────────────────────────────────────
// This schema serves as the "Super-set" for all case-related filtering.
export const CasesFiltersSchema = z.object({
	// Primary Lists
	statuses: z.array(CaseStatusSchema),

	// Scoped IDs
	clinicId: z.string().nullable(),
	staffId: z.string().nullable(),
	categoryId: z.string().nullable(),

	// Date Logic
	dateRange: DateRangeFilterSchema.nullable(),

	// Boolean Flags
	isRushOnly: z.boolean(),
	isRemakeOnly: z.boolean().optional(), // Specific to Clinical History

	// UI Context
	pulseFilter: PulseFilterSchema.default("all"), // Specific to Global Dashboard ("all" | "processing" etc)
});

export type CasesFilters = z.infer<typeof CasesFiltersSchema>;

// ── DEFAULTS ─────────────────────────────────────────────────────────────────

export const DEFAULT_CASES_FILTERS: CasesFilters = {
	statuses: [],
	clinicId: null,
	staffId: null,
	categoryId: null,
	isRushOnly: false,
	isRemakeOnly: false,
	dateRange: null,
	pulseFilter: "all",
};
