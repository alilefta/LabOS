"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { authorize } from "@/lib/permissions/access-control";
import { revalidatePath } from "next/cache";
import { buildLogEntry, resolveActorName } from "@/data/activity-logs/build-activity-log";

export const recalculateCaseFinancialsAction = actionClientWithLab
	.metadata({
		actionName: "Recalculate-Case-Financials-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(
		z.object({
			caseId: z.string().min(1),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { caseId } = parsedInput;
		const { labId, labUser } = ctx;

		// 1. Initialize the Gatekeeper
		// Since labUser is lightweight, we verify financials based on the LabRole
		const gate = authorize({ role: labUser.role });
		gate.throwIfCannot("canViewDetailedFinancials");

		const prisma = await tenantPrisma(labId);

		// 2. Fetch the current state of the case
		// We pull the grandTotal (to calculate diff) and the caseItems (to re-sum)
		const dentalCase = await prisma.case.findUnique({
			where: { id: caseId, labId },
			include: {
				caseItems: {
					select: { totalPrice: true },
				},
			},
		});

		if (!dentalCase) throw ERRORS.NOT_FOUND;

		// 3. Re-run the summation logic from the work item snapshots
		const newGrandTotal = dentalCase.caseItems.reduce((sum, item) => sum + Number(item.totalPrice || 0), 0);

		// 4. Resolve the Actor Name for the Audit Trail (Human or System)
		const actorName = await resolveActorName(labUser.id, labId);

		// 5. Atomic Transaction: Update Case + Create Activity Log
		const [updatedCase] = await prisma.$transaction([
			prisma.case.update({
				where: { id: caseId, labId },
				data: { grandTotal: newGrandTotal },
				select: { id: true, caseNumber: true, grandTotal: true },
			}),
			prisma.caseActivityLog.create({
				data: buildLogEntry({
					caseId,
					labId,
					actorId: labUser.id,
					actorName,
					type: "CASE_PRICING_RECALCULATED",
					summary: "Case financials were recalculated to ensure ledger accuracy.",
					payload: {
						previousTotal: Number(dentalCase.grandTotal || 0),
						newTotal: newGrandTotal,
					},
				}),
			}),
		]);

		// 6. Purge cache for this dossier
		revalidatePath(`/cases/${caseId}`);

		return { updatedCase: { ...updatedCase, grandTotal: updatedCase.grandTotal ? Number(updatedCase.grandTotal) : 0 } };
	});
