"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { ArVitalsDTO } from "@/schema/composed/invoices/invoices.dtos";
import { subDays, startOfDay } from "date-fns";

export const getArVitalsAction = actionClientWithLab
	.metadata({
		actionName: "Get-AR-Vitals-Invoices-Action",
		requiredLabRole: "STAFF",
	})
	.action(async ({ ctx }) => {
		const { labId } = ctx;
		const prisma = await tenantPrisma(labId);

		const now = new Date();
		const thirtyDaysAgo = subDays(startOfDay(now), 30);
		const sixtyDaysAgo = subDays(startOfDay(now), 60);

		const [outstandingAgg, overdueAgg, currentPeriodCollected, previousPeriodCollected] = await Promise.all([
			// Outstanding: any invoice with amountDue > 0
			prisma.invoice.aggregate({
				where: {
					labId,
					amountDue: { gt: 0 },
					status: { in: ["SENT", "PARTIAL", "OVERDUE"] },
				},
				_sum: { amountDue: true },
				_count: { id: true },
			}),

			// Overdue: amountDue > 0 AND dueDate is in the past — live computation
			prisma.invoice.aggregate({
				where: {
					labId,
					amountDue: { gt: 0 },
					dueDate: { lt: now },
				},
				_sum: { amountDue: true },
				_count: { id: true },
			}),

			// Collected last 30 days
			prisma.invoicePayment.aggregate({
				where: {
					labId,
					paidAt: { gte: thirtyDaysAgo },
				},
				_sum: { amount: true },
			}),

			// Collected previous 30 days (for growth comparison)
			prisma.invoicePayment.aggregate({
				where: {
					labId,
					paidAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
				},
				_sum: { amount: true },
			}),
		]);

		const currentCollected = Number(currentPeriodCollected._sum.amount ?? 0);
		const prevCollected = Number(previousPeriodCollected._sum.amount ?? 0);

		const collectedGrowthPercent = prevCollected > 0 ? Math.round(((currentCollected - prevCollected) / prevCollected) * 100 * 10) / 10 : currentCollected > 0 ? 100 : 0;

		return {
			totalOutstanding: Number(outstandingAgg._sum.amountDue ?? 0),
			outstandingInvoiceCount: outstandingAgg._count.id,
			totalOverdue: Number(overdueAgg._sum.amountDue ?? 0),
			overdueInvoiceCount: overdueAgg._count.id,
			collectedLast30Days: currentCollected,
			collectedGrowthPercent,
		} as ArVitalsDTO;
	});
