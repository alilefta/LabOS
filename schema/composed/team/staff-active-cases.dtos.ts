// schema/composed/team/staff-active-cases.dtos.ts

import { z } from "zod";
import { CaseStatusSchema, StaffRoleCategory, StaffRoleCategorySchema } from "@/schema/base/enums.base"; // Adjust paths

// ── 1. THE ROW DTO (EXHAUSTIVE PROJECTION FOR WORKBENCH TABLE) ─────────────
export const StaffActiveCaseDTOSchema = z.object({
	id: z.string().uuid(),
	caseNumber: z.string(),
	patientName: z.string(),
	clinicName: z.string(),
	dentistName: z.string().nullable(),

	// Clinical Specs
	primaryProduct: z.string().nullable(), // first work item's product name
	caseCategory: z.string().nullable(), // e.g. "Fixed Prosthetics"
	isRemake: z.boolean(),

	// Logistics
	deadline: z.date().nullable(),
	createdAt: z.date(),
	status: CaseStatusSchema, // e.g. "PROCESSING"

	// ── THE CRITICAL ROLE SNAPSHOT ──
	// What is this specific employee's job on this specific case?
	// Derived from the CaseStaffAssignment junction table at query time!
	assignedRole: StaffRoleCategorySchema,
});

export type StaffActiveCaseDTO = z.infer<typeof StaffActiveCaseDTOSchema>;

// ── 2. THE SERVER ACTION RESULT DTO ─────────────────────────────────────────
export const GetStaffActiveCasesResultSchema = z.object({
	cases: z.array(StaffActiveCaseDTOSchema),
	nextCursor: z.string().nullable(),
	totalCount: z.number().int(),
});

export type GetStaffActiveCasesResult = z.infer<typeof GetStaffActiveCasesResultSchema>;

export type ActiveStaffCasesDTO = {
	id: string;
	firstName: string;
	lastName: string;
	roleCategory: StaffRoleCategory;
	jobTitle: string | null;
	avatarUrl: string | null;
	isActive: boolean;
	activeCaseCount: number;
};
