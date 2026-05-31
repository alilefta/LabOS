// actions/team/get-pending-commissions.ts
"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";

export const getPendingCommissionsAction = actionClientWithLab
	.metadata({
		actionName: "Get-Pending-Commissions-Action",
		requiredLabRole: "MANAGER", // Security Guard
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
			select: { id: true },
		});

		if (!staffExists) {
			throw ERRORS.NOT_FOUND;
		}

		// 2. Fetch Pending Case Assignments (N+1 Proof Query) [3]
		const pendingAssignments = await prisma.caseStaffAssignment.findMany({
			where: {
				labId,
				staffId,
				isPaid: false,
				dentalCase: {
					status: { in: ["COMPLETED", "DELIVERED"] },
				},
			},
			select: {
				id: true,
				commissionType: true,
				commissionValue: true,
				commissionTotal: true,
				createdAt: true,

				// N+1 Prevention: Flattening the Case relations inside the single JOIN
				dentalCase: {
					select: {
						id: true,
						caseNumber: true,
						grandTotal: true,
						createdAt: true,
						patient: { select: { name: true } },
					},
				},
			},
			// Order oldest first so accountants resolve aged debts first
			orderBy: { createdAt: "asc" },
		});

		// 3. Map to clean, flat, serializable Client DTO [4]
		const mappedCommissions = pendingAssignments.map((assignment) => ({
			assignmentId: assignment.id,
			caseId: assignment.dentalCase.id,
			caseNumber: assignment.dentalCase.caseNumber,
			patientName: assignment.dentalCase.patient.name,
			caseTotal: Number(assignment.dentalCase.grandTotal ?? 0),
			commissionTotal: Number(assignment.commissionTotal),
			assignedAt: assignment.createdAt, // When this person was assigned
			caseCreatedAt: assignment.dentalCase.createdAt, // When the case was registered
		}));

		return {
			pendingCommissions: mappedCommissions,
			totalCount: mappedCommissions.length,
		};
	});
