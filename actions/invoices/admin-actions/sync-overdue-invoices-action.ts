// actions/invoices/sync-ledger.ts
"use server";

import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";

export const syncOverdueInvoicesAction = actionClientWithLab
	.metadata({
		actionName: "Sync-Overdue-Invoices-Action",
		// Security: Only accountants and managers can alter database ledger states
		requiredLabRole: "MANAGER",
	})
	.action(async ({ ctx }) => {
		const { labId } = ctx;
		const prisma = await tenantPrisma(labId);

		const now = new Date();

		// Atomic bulk update: marks SENT/PARTIAL invoices past their due date as OVERDUE [2]
		const result = await prisma.invoice.updateMany({
			where: {
				labId,
				status: { in: ["SENT", "PARTIAL"] },
				amountDue: { gt: 0 },
				dueDate: { lt: now }, // Due date is in the past
			},
			data: {
				status: "OVERDUE",
			},
		});

		return { updatedCount: result.count };
	});
