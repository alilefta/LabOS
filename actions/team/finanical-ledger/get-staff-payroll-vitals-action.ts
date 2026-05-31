// actions/team/get-staff-payroll-vitals.ts
"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { startOfYear } from "date-fns";

export const getStaffPayrollVitalsAction = actionClientWithLab
	.metadata({
		actionName: "Get-Staff-Payroll-Vitals-Action",
		// Security Guard: Only Managers or Owners can view financial ledger cards [1]
		requiredLabRole: "MANAGER",
	})
	.inputSchema(
		z.object({
			staffId: z.string().uuid("Invalid Staff ID format"),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { staffId } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// 1. Security Check: Verify staff belongs to this lab tenant [2]
		const staffExists = await prisma.labStaff.findUnique({
			where: { id: staffId, labId },
			select: { id: true, commissionType: true, commissionValue: true, firstName: true, lastName: true },
		});

		if (!staffExists) {
			throw ERRORS.NOT_FOUND;
		}

		const today = new Date();
		const startOfCurrentYear = startOfYear(today);

		// 2. Parallel Database Aggregations (N+1 Prevention) [2]
		const [pendingAgg, ytdAgg] = await Promise.all([
			// Query 1: Calculate Pending Debt
			// Sum commissionTotal where isPaid = false and case status is COMPLETED or DELIVERED
			prisma.caseStaffAssignment.aggregate({
				where: {
					labId,
					staffId,
					isPaid: false,
					dentalCase: {
						status: { in: ["COMPLETED", "DELIVERED"] },
					},
				},
				_sum: {
					commissionTotal: true,
				},
				_count: {
					id: true,
				},
			}),

			// Query 2: Calculate YTD Earnings [2]
			// Sum commissionTotal where isPaid = true within the current calendar year
			prisma.caseStaffAssignment.aggregate({
				where: {
					labId,
					staffId,
					isPaid: true,
					paidAt: { gte: startOfCurrentYear },
				},
				_sum: {
					commissionTotal: true,
				},
			}),
		]);

		return {
			firstName: staffExists.firstName,
			lastName: staffExists.lastName,

			// Card 1: Current Basis DTO
			commissionType: staffExists.commissionType,
			commissionValue: staffExists.commissionValue ? Number(staffExists.commissionValue) : 0,

			// Card 2: Pending Payout
			totalPending: Number(pendingAgg._sum.commissionTotal ?? 0),
			pendingCasesCount: pendingAgg._count.id,

			// Card 3: YTD Earnings
			totalYtdEarnings: Number(ytdAgg._sum.commissionTotal ?? 0),
		};
	});
