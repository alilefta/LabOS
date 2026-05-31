// actions/team/get-payout-history.ts
"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { GetStaffPayoutHistoryResultDTO } from "@/schema/composed/team/payroll-history.dtos";

export const getStaffPayoutHistoryAction = actionClientWithLab
	.metadata({
		actionName: "Get-Staff-Payout-History-Action",
		requiredLabRole: "MANAGER", // Security: Only managers can view past payroll files
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

		// 1. Security Check: Verify staff belongs to this lab tenant
		const staffExists = await prisma.labStaff.findUnique({
			where: { id: staffId, labId },
			select: { id: true },
		});

		if (!staffExists) {
			throw ERRORS.NOT_FOUND;
		}

		// 2. Fetch Paid Assignments (High-Performance Query)
		const paidAssignments = await prisma.caseStaffAssignment.findMany({
			where: {
				labId,
				staffId,
				isPaid: true,
			},
			select: {
				id: true,
				commissionTotal: true,
				paidAt: true,
			},
			// Order by payment date descending (Most recent paychecks first)
			orderBy: { paidAt: "desc" },
		});

		// 3. IN-MEMORY BATCH GROUPING (The "Virtual Paystub" Engine) [1]
		// Build a map of "YYYY-MM-DD" → Payout Metrics
		const payoutMap = new Map<string, { date: Date; total: number; count: number }>();

		paidAssignments.forEach((sa) => {
			if (!sa.paidAt) return; // Safety check

			// Extract date without hours/minutes
			const dateKey = sa.paidAt.toISOString().slice(0, 10); // "2026-05-24"

			const existing = payoutMap.get(dateKey) ?? {
				date: sa.paidAt,
				total: 0,
				count: 0,
			};

			payoutMap.set(dateKey, {
				date: existing.date,
				total: existing.total + Number(sa.commissionTotal),
				count: existing.count + 1,
			});
		});

		// 4. Map to strict GetStaffPayoutHistoryResultDTO DTO [2]
		const payouts = Array.from(payoutMap.entries()).map(([key, data]) => ({
			id: key, // Date string is the ID
			payoutDate: data.date,
			casesCount: data.count,
			totalPaid: Math.round(data.total * 100) / 100, // Safe rounding
			status: "SETTLED" as const,
		}));

		return {
			payouts,
			totalCount: payouts.length,
		} as GetStaffPayoutHistoryResultDTO;
	});
