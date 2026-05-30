"use server";

import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { CommissionType, StaffRoleCategory } from "@/schema/base/enums.base";
import { buildLogEntry, resolveActorName } from "@/data/activity-logs/build-activity-log";
import { ReassignCasesStaffSchema } from "@/schema/composed/team/staff.schema";

export const reassignCasesStaffAction = actionClientWithLab
	.metadata({
		actionName: "Reassign-Cases-Staff",
		requiredLabRole: "ADMIN", // Adjust as per your permission gates
	})
	.inputSchema(ReassignCasesStaffSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId, labUser } = ctx;
		const { caseIds, originalStaffId, targetStaffId, roleCategory } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// ── 2. PRE-FLIGHT VALIDATION & SECURITY CHECKS (Parallel) ──────────────
		const [originalStaff, targetStaff, casesToReassign] = await Promise.all([
			// Verify original staff exists and belongs to this lab
			prisma.labStaff.findUnique({
				where: { id: originalStaffId, labId },
				select: { id: true, firstName: true, lastName: true },
			}),

			// Verify target staff exists, is active, and belongs to this lab
			prisma.labStaff.findUnique({
				where: { id: targetStaffId, labId, isActive: true },
				select: { id: true, firstName: true, lastName: true, commissionType: true, commissionValue: true },
			}),

			// Verify cases exist, belong to this lab, and are NOT in terminal status
			prisma.case.findMany({
				where: {
					id: { in: caseIds },
					labId,
					status: { notIn: ["COMPLETED", "DELIVERED", "FAILED"] },
				},
				select: { id: true, caseNumber: true, status: true },
			}),
		]);

		if (!originalStaff || !targetStaff) {
			throw ERRORS.NOT_FOUND;
		}

		if (casesToReassign.length !== caseIds.length) {
			throw new Error("One or more selected cases are completed, delivered, or failed.");
		}

		// Resolve actor name for the database logs
		const actorName = await resolveActorName(labUser.id, labId);

		// ── 3. ATOMIC TRANSACTION ──────────────────────────────────────────
		await prisma.$transaction(async (tx) => {
			// A. DELETE the old assignments [Junction table removal]
			await tx.caseStaffAssignment.deleteMany({
				where: {
					caseId: { in: caseIds },
					staffId: originalStaffId,
					roleCategory: roleCategory as StaffRoleCategory,
				},
			});

			// B. CREATE the new assignments (Batch insert)
			// This is highly performant and bypasses N+1 looping [3]
			await tx.caseStaffAssignment.createMany({
				data: caseIds.map((caseId) => ({
					caseId,
					staffId: targetStaffId,
					labId,
					roleCategory: roleCategory as StaffRoleCategory,
					// THE COMMISSION SNAPSHOT RULE: We lock the target staff's rates here
					commissionType: targetStaff.commissionType as CommissionType,
					commissionValue: targetStaff.commissionValue ?? 0,
					commissionTotal: 0, // Computed on case completion
				})),
			});

			// C. CREATE THE HISTORY LOGS (Batch insert)
			// Generates a neat "Reassigned" track record on each case's timeline
			await tx.caseActivityLog.createMany({
				data: casesToReassign.map((c) =>
					buildLogEntry({
						caseId: c.id,
						labId,
						actorId: labUser.id,
						actorName,
						type: "STAFF_ASSIGNED",
						summary: `Reassigned ${roleCategory.toLowerCase().replace(/_/g, " ")} task from ${originalStaff.firstName} to ${targetStaff.firstName}`,
						payload: {
							staffId: targetStaff.id,
							staffName: `${targetStaff.firstName} ${targetStaff.lastName}`,
							roleCategory,
							reassignedFrom: `${originalStaff.firstName} ${originalStaff.lastName}`,
						},
					}),
				),
			});
		});

		// ── 4. REVALIDATE PATHS ────────────────────────────────────────────
		// Instantly flushes Next.js route caches so the UI reflects the change on refresh
		// revalidatePath("/team/[staffId]", "layout");
		// revalidatePath("/cases");

		return { success: true };
	});
