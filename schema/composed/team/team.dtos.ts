// schema/composed/team/team.dtos.ts
import { CommissionType, LabRole, StaffRoleCategory, StaffRoleCategorySchema } from "@/schema/base/enums.base";
import { z } from "zod";
import { CapacityBand, QualityRiskBand } from "./team-filters";

export type SystemAccessState = "ACTIVE_USER" | "PENDING_INVITE" | "NO_ACCESS";

export interface StaffMemberDTO {
	id: string;
	firstName: string;
	lastName: string;
	phoneNumber?: string;
	avatarUrl: string | null;
	roleCategory: StaffRoleCategory;
	jobTitle: string | null;

	// Commission Info
	commissionType?: CommissionType;
	commissionValue?: number | null;

	// The Unified Identity State
	accessState?: SystemAccessState;
	systemRole?: LabRole | null; // e.g. "MANAGER", only present if ACTIVE or PENDING
	inviteEmail?: string | null; // To display where the pending invite was sent

	// Operational Metrics (Preventing N+1)
	activeCaseCount?: number; // Cases currently ASSIGNED or PROCESSING
	isActive: boolean;

	capacityBand?: CapacityBand;
	qualityBand?: QualityRiskBand;
	remakeRate?: number;
}

// Filter Schema for the Client Wrapper
export const TeamFiltersSchema = z.object({
	roleCategories: z.array(StaffRoleCategorySchema).default([]),
	accessStates: z.array(z.enum(["ACTIVE_USER", "PENDING_INVITE", "NO_ACCESS"])).default([]),
	isActive: z.boolean().default(true), // Toggle to see archived/fired staff
});

export type TeamFilters = z.infer<typeof TeamFiltersSchema>;

export const DEFAULT_TEAM_FILTERS: TeamFilters = {
	roleCategories: [],
	accessStates: [],
	isActive: true,
};

export interface StaffVitalsDTO {
	// Group 1: Identity (Total counts)
	totalActiveStaff: number;
	pendingInviteCount: number;

	// Group 2: Workload (Prisma sum of assigned cases across active staff)
	labCapacityPct: number; // e.g. 82 (%) - average capacity utilization
	totalActiveCases: number;

	// Group 3: Velocity (Prisma avg of `completedAt - createdAt` on Cases)
	avgTurnaroundDays: number; // e.g. 3.2
	turnaroundDeltaPercent: number; // compared to last month (e.g. -15.4%)
}
