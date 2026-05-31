// actions/team/issue-payout.ts
"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";

export const issueStaffPayoutAction = actionClientWithLab
	.metadata({
		actionName: "Issue-Staff-Payout-Action",
		// SECURITY GUARD 1: Only Owners or Managers can authorize payroll payouts [1]
		requiredLabRole: "MANAGER",
	})
	.inputSchema(
		z.object({
			staffId: z.string().uuid("Invalid Staff ID format"),
			assignmentIds: z.array(z.string().uuid()).min(1, "Select at least one assignment to pay."),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { staffId, assignmentIds } = parsedInput;

		try {
			const prisma = await tenantPrisma(labId);

			// ── THE ATOMIC HANDSHAKE TRANSACTION ─────────────────────────────
			const transactionResult = await prisma.$transaction(
				async (tx) => {
					// 1. Fetch and verify the assignments exist, belong to this lab,
					// belong to this staff member, and are CURRENTLY UNPAID [2].
					const unpaidAssignments = await tx.caseStaffAssignment.findMany({
						where: {
							id: { in: assignmentIds },
							staffId,
							labId,
							isPaid: false, // Must be unpaid
						},
						select: {
							id: true,
							commissionTotal: true,
						},
					});

					// 2. CONCURRENCY GUARD (Double-Spending Prevention) [2]
					// If the counts do not match, someone else settled these accounts a millisecond ago.
					// Abort the transaction and rollback to prevent double-spending.
					if (unpaidAssignments.length !== assignmentIds.length) {
						throw new Error("One or more selected assignments have already been paid or are invalid.");
					}

					const now = new Date();

					// 3. Perform the Batch Update
					await tx.caseStaffAssignment.updateMany({
						where: {
							id: { in: assignmentIds },
							staffId,
							labId,
							isPaid: false,
						},
						data: {
							isPaid: true,
							paidAt: now, // Lock the payment date!
						},
					});

					// Calculate the total disbursed amount for auditing
					const totalDisbursed = unpaidAssignments.reduce((sum, item) => sum + Number(item.commissionTotal), 0);

					return {
						totalDisbursed,
						count: unpaidAssignments.length,
					};
				},
				{
					maxWait: 5000,
					timeout: 10000, // 10s to complete the write
				},
			);

			return {
				success: true,
				totalDisbursed: transactionResult.totalDisbursed,
				count: transactionResult.count,
			};
		} catch (error) {
			console.error("[Issue-Staff-Payout-Action] Error:", error);
			if (error instanceof Error) throw error;
			throw ERRORS.OPERATION_NOT_ALLOWED;
		}
	});
