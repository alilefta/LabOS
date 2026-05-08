import { CaseStatus, JawType } from "@/schema/base/enums.base";
import z from "zod";
import { CasesFiltersSchema } from "../cases/cases-filters";

/**
 * The DTO represents the flattened case data returned by
 * the getClinicActivePipelineAction.
 */
export interface ClinicActiveCaseDTO {
	id: string;
	caseNumber: string;
	status: CaseStatus;
	patientName: string;
	products: string[];
	assignedTechs: {
		name: string;
		avatar: string | null;
		jobTitle: string | null;
	}[];
	deadline: Date | null;
	isRush: boolean;
	isRemake: boolean;
}

// ============== historical cases for a clinic =====================

// ── 1. The Work Item Summary DTO ──────────────────────────────────────────
// Extremely lightweight. Only carries enough data to render the UI tooltip/badge.
export type ClinicHistoricalWorkItemDTO = {
	id: string;
	productName: string; // e.g., "Zirconia Multi-Layer"
	workTypeName: string; // e.g., "Crowns & Bridges"
	jawType: JawType; // e.g., "UPPER"
	teethCount: number; // e.g., 3
};

// ── 2. The Case Row DTO ───────────────────────────────────────────────────
// Omits redundant data like `clinicName` since we are already inside the Clinic Terminal.
export type ClinicHistoricalCaseDTO = {
	id: string;
	caseNumber: string;
	status: CaseStatus;

	// The date the case reached its historical status (COMPLETED, DELIVERED, or FAILED)
	// We will use  or completedAt, delievredAt, or updatedAt depending on what's available
	resolvedDate: Date;

	patientName: string;
	dentistName: string | null;
	grandTotal: number | null;

	// Crucial for FAILED cases so we can show the warning inline
	isRemake: boolean;
	failureReason: string | null;

	// The array of items to provide "Immediate Clinical Context"
	workItems: ClinicHistoricalWorkItemDTO[];
};

// ── 3. The Server Action Result DTO ───────────────────────────────────────
export type GetClinicHistoricalCasesResult = {
	cases: ClinicHistoricalCaseDTO[];
	nextCursor: string | null;
	totalCount: number;
};
// ── 4. The Input Schema for the Server Action ─────────────────────────────
export const GetClinicHistoricalCasesInputSchema = z.object({
	clinicId: z.uuid(),
	cursor: z.string().optional(),
	take: z.number().default(20),
	search: z.string().optional(),
	filters: CasesFiltersSchema,
});

export type GetClinicHistoricalCasesInput = z.infer<typeof GetClinicHistoricalCasesInputSchema>;
