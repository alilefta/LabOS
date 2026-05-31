// schema/composed/team/payroll-ledger.dtos.ts

import { z } from "zod";
import { CommissionTypeSchema } from "@/schema/base/enums.base"; // Adjust path to your enums

// ── 1. THE COMPENSATION VITALS DTO ──────────────────────────────────────────
// Powers the 3-card bento grid (Zone A) at the top of the Ledger
export const StaffPayrollVitalsDTOSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),

	// Current Rate Config
	commissionType: CommissionTypeSchema,
	commissionValue: z.number().min(0),

	// Unpaid Debt (Pending cases)
	totalPending: z.number().min(0),
	pendingCasesCount: z.number().int().min(0),

	// Total Paid this Calendar Year
	totalYtdEarnings: z.number().min(0),
});

export type StaffPayrollVitalsDTO = z.infer<typeof StaffPayrollVitalsDTOSchema>;

// ── 2. THE PENDING COMMISSION ITEM DTO ──────────────────────────────────────
// Powers the individual row details inside the Pending Payout queue (Zone B)
export const PendingCommissionItemDTOSchema = z.object({
	assignmentId: z.string().uuid(), // ID of the specific CaseStaffAssignment
	caseId: z.string().uuid(), // ID of the target Case for routing/deep-linking
	caseNumber: z.string(), // e.g. "LAB-0012"
	patientName: z.string(), // Patient name for clinical context

	caseTotal: z.number().min(0), // Total bill value of the case (historical snapshot)
	commissionTotal: z.number().min(0), // Calculated commission earned by this employee for this case

	assignedAt: z.coerce.date(), // When this technician was assigned to the case
	caseCreatedAt: z.coerce.date(), // When the case was originally registered in the lab
});

export type PendingCommissionItemDTO = z.infer<typeof PendingCommissionItemDTOSchema>;

// ── 3. THE PENDING COMMISSIONS RESULT DTO ───────────────────────────────────
export const GetPendingCommissionsResultDTOSchema = z.object({
	pendingCommissions: z.array(PendingCommissionItemDTOSchema),
	totalCount: z.number().int().min(0),
});

export type GetPendingCommissionsResultDTO = z.infer<typeof GetPendingCommissionsResultDTOSchema>;
