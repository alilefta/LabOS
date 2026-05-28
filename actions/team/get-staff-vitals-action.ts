// actions/team/get-staff-vitals.ts
"use server";

import { subDays, startOfDay, differenceInHours } from "date-fns";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { StaffVitalsDTO } from "@/schema/composed/team/team.dtos";

export const getStaffVitalsAction = actionClientWithLab
	.metadata({
		actionName: "Get-Staff-Vitals-Action",
		requiredLabRole: "STAFF", // Managers and Admin need this for operational overviews
	})
	.action(async ({ ctx }) => {
		const { labId } = ctx;

		try {
			const prisma = await tenantPrisma(labId);

			const now = new Date();
			const thirtyDaysAgo = subDays(startOfDay(now), 30);
			const sixtyDaysAgo = subDays(startOfDay(now), 60);

			// ── RUN ALL AGGREGATIONS IN PARALLEL ──────────────────────────────
			const [activeStaffCount, pendingInviteCount, activeAssignmentsCount, currentCompletedCases, previousCompletedCases] = await Promise.all([
				// 1. Total Active Workers
				prisma.labStaff.count({
					where: { labId, isActive: true },
				}),

				// 2. Pending Software Invites
				prisma.labInvitation.count({
					where: { labId, expiresAt: { gte: now } },
				}),

				// 3. Active Case Assignments on the Floor
				// Only count assignments on cases that are actually in production
				prisma.caseStaffAssignment.count({
					where: {
						labId,
						dentalCase: { status: { in: ["ASSIGNED", "PROCESSING"] } },
					},
				}),

				// 4. Current 30-Day Turnaround Cases (Completed/Delivered)
				prisma.case.findMany({
					where: {
						labId,
						status: { in: ["COMPLETED", "DELIVERED"] },
						completedAt: { gte: thirtyDaysAgo },
					},
					select: { createdAt: true, completedAt: true },
				}),

				// 5. Previous 30-Day Turnaround Cases (for delta comparison)
				prisma.case.findMany({
					where: {
						labId,
						status: { in: ["COMPLETED", "DELIVERED"] },
						completedAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
					},
					select: { createdAt: true, completedAt: true },
				}),
			]);

			// ── CALCULATE CAPACITY UTILIZATION ───────────────────────────────
			// Assume 15 active assigned cases is the standard peak capacity per technician
			const MAX_CAPACITY_PER_TECH = 15;
			const totalAvailableCapacity = activeStaffCount * MAX_CAPACITY_PER_TECH;

			const labCapacityPct = totalAvailableCapacity > 0 ? Math.min(Math.round((activeAssignmentsCount / totalAvailableCapacity) * 100), 100) : 0;

			// ── CALCULATE TURNAROUND VELOCITY (In-Memory Date-Math) ──────────
			const calculateAverageDays = (casesList: typeof currentCompletedCases) => {
				if (casesList.length === 0) return 0;

				const totalHours = casesList.reduce((sum, c) => {
					if (!c.completedAt) return sum;
					// Calculate hours for maximum precision before converting to days
					return sum + differenceInHours(new Date(c.completedAt), new Date(c.createdAt));
				}, 0);

				const avgHours = totalHours / casesList.length;
				return Math.round((avgHours / 24) * 10) / 10; // Convert to days (e.g. 3.2)
			};

			const avgCurrent = calculateAverageDays(currentCompletedCases);
			const avgPrevious = calculateAverageDays(previousCompletedCases);

			// Calculate Velocity Growth Delta (Negative delta is good = faster)
			let turnaroundDeltaPercent = 0;
			if (avgPrevious > 0) {
				turnaroundDeltaPercent = Math.round(((avgCurrent - avgPrevious) / avgPrevious) * 100 * 10) / 10;
			} else if (avgCurrent > 0) {
				turnaroundDeltaPercent = 100; // 100% change if previous period had no cases
			}

			return {
				totalActiveStaff: activeStaffCount,
				pendingInviteCount,
				labCapacityPct,
				totalActiveCases: activeAssignmentsCount,
				avgTurnaroundDays: avgCurrent,
				turnaroundDeltaPercent,
			} as StaffVitalsDTO;
		} catch (error) {
			console.error("[Get-Staff-Vitals-Action] Error:", error);
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}
	});
