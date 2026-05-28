// schema/composed/team.dtos.ts
import { z } from "zod";
import { StaffRoleCategory, LabRole, CommissionType } from "../base/enums.base";

export type SystemAccessState = "ACTIVE_USER" | "PENDING_INVITE" | "NO_ACCESS";

export interface StaffMemberDTO {
	id: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	avatarUrl: string | null;
	roleCategory: StaffRoleCategory;
	jobTitle: string | null;

	// Commission Info
	commissionType: CommissionType;
	commissionValue: number | null;

	// The Unified Identity State
	accessState: SystemAccessState;
	systemRole: LabRole | null; // e.g. "MANAGER", only present if ACTIVE or PENDING
	inviteEmail: string | null; // To display where the pending invite was sent

	// Operational Metrics (Preventing N+1)
	activeCaseCount: number; // Cases currently ASSIGNED or PROCESSING
}

// Filter Schema for the Client Wrapper
export const TeamFiltersSchema = z.object({
	roleCategories: z.array(z.nativeEnum(StaffRoleCategory)).default([]),
	accessStates: z.array(z.enum(["ACTIVE_USER", "PENDING_INVITE", "NO_ACCESS"])).default([]),
	isActive: z.boolean().default(true), // Toggle to see archived/fired staff
});

export type TeamFilters = z.infer<typeof TeamFiltersSchema>;

export const DEFAULT_TEAM_FILTERS: TeamFilters = {
	roleCategories: [],
	accessStates: [],
	isActive: true,
};
