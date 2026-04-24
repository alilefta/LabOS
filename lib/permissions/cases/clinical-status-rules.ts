// lib/permissions/clinical-rules.ts

import { CaseStaffAssignmentDetailsUI } from "@/schema/composed/case-staff-assignment.details";
import { CaseStatus } from "@/schema/base/enums.base";

export const VALID_TRANSITIONS: Record<CaseStatus, CaseStatus[]> = {
	DRAFT: ["NEW"],
	NEW: ["ASSIGNED", "PROCESSING", "FAILED"],
	ASSIGNED: ["PROCESSING", "FAILED"],
	PROCESSING: ["COMPLETED", "FAILED"],
	COMPLETED: ["DELIVERED"],
	DELIVERED: [],
	FAILED: [],
};

export function getStatusTransitionWarning(toStatus: CaseStatus, assignments: CaseStaffAssignmentDetailsUI[]): string | null {
	const hasTech = assignments.some((s) => s.roleCategory === "TECHNICIAN" || s.roleCategory === "SENIOR_TECHNICIAN");
	const hasCourier = assignments.some((s) => s.roleCategory === "COURIER");
	const hasQC = assignments.some((s) => s.roleCategory === "QC_INSPECTOR");

	// If moving to PROCESSING without a tech assigned yet
	if (toStatus === "PROCESSING" && !hasTech) return "No technician assigned. This case will move to active production without a lead technician tracked in the system.";

	// If completing a case but nobody checked QC (Optional strict rule you can disable)
	if (toStatus === "COMPLETED" && !hasQC) return "No QC Inspector assigned. Ensure quality checks have been verified before packaging.";

	// If trying to deliver without a courier
	if (toStatus === "DELIVERED" && !hasCourier) return "No courier assigned. The case is ready for delivery, but the system doesn't know who is taking it.";

	return null;
}
