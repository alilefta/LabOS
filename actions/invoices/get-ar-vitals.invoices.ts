"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { ArVitalsDTO } from "@/schema/composed/invoices/invoices.dtos";
import { GlobalTimeFramePeriod, GlobalTimeFramePeriodSchema } from "@/schema/composed/shared/date-preset";
import { subDays, startOfDay, startOfYear, endOfDay } from "date-fns";
import z from "zod";

// Helper to resolve current collected window [1]
function resolveCollectedWindow(period: GlobalTimeFramePeriod): { start: Date | null; end: Date } {
	const now = new Date();
	const end = endOfDay(now);
	switch (period) {
		case "30d":
			return { start: subDays(startOfDay(now), 30), end };
		case "90d":
			return { start: subDays(startOfDay(now), 90), end };
		case "ytd":
			return { start: startOfYear(now), end };
		case "all":
			return { start: null, end };
	}
}

// Helper to resolve previous collected window (for growth delta) [1]
function resolvePreviousCollectedWindow(period: GlobalTimeFramePeriod): { start: Date | null; end: Date } {
	const now = new Date();
	switch (period) {
		case "30d":
			return {
				start: subDays(startOfDay(now), 60),
				end: subDays(startOfDay(now), 30),
			};
		case "90d":
			return {
				start: subDays(startOfDay(now), 180),
				end: subDays(startOfDay(now), 90),
			};
		case "ytd": {
			const startThisYear = startOfYear(now);
			const startLastYear = startOfYear(new Date(now.getFullYear() - 1, 0, 1));
			return {
				start: startLastYear,
				end: subDays(startThisYear, 1),
			};
		}
		case "all":
			return { start: null, end: startOfDay(now) };
	}
}

export const getArVitalsAction = actionClientWithLab
	.metadata({
		actionName: "Get-AR-Vitals-Invoices-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			period: GlobalTimeFramePeriodSchema,
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { period } = parsedInput;
		const prisma = await tenantPrisma(labId);

		const now = new Date();

		const currentWindow = resolveCollectedWindow(period);
		const prevWindow = resolvePreviousCollectedWindow(period);

		const currentPeriodFilter = currentWindow.start ? { gte: currentWindow.start } : undefined;
		const prevPeriodFilter = prevWindow.start ? { gte: prevWindow.start, lt: prevWindow.end } : undefined;

		const [outstandingAgg, overdueAgg, currentPeriodCollected, previousPeriodCollected] = await Promise.all([
			// Outstanding (A/R): remains live (independent of timeframe)
			prisma.invoice.aggregate({
				where: {
					labId,
					amountDue: { gt: 0 },
					status: { in: ["SENT", "PARTIAL", "OVERDUE"] },
				},
				_sum: { amountDue: true },
				_count: { id: true },
			}),

			// Overdue: remains live (independent of timeframe)
			prisma.invoice.aggregate({
				where: {
					labId,
					amountDue: { gt: 0 },
					dueDate: { lt: now },
				},
				_sum: { amountDue: true },
				_count: { id: true },
			}),

			// Collected within selected period [1]
			prisma.invoicePayment.aggregate({
				where: {
					labId,
					...(currentPeriodFilter && { paidAt: currentPeriodFilter }),
				},
				_sum: { amount: true },
			}),

			// Collected during previous comparable period (only if period !== "all") [1]
			period !== "all"
				? prisma.invoicePayment.aggregate({
						where: {
							labId,
							...(prevPeriodFilter && { paidAt: prevPeriodFilter }),
						},
						_sum: { amount: true },
					})
				: Promise.resolve(null),
		]);

		const currentCollected = Number(currentPeriodCollected._sum.amount ?? 0);
		const prevCollected = previousPeriodCollected ? Number(previousPeriodCollected._sum.amount ?? 0) : 0;

		// Calculate dynamic growth delta [1]
		let collectedGrowthPercent = 0;
		if (period !== "all") {
			collectedGrowthPercent = prevCollected > 0 ? Math.round(((currentCollected - prevCollected) / prevCollected) * 100 * 10) / 10 : currentCollected > 0 ? 100 : 0;
		}
		return {
			totalOutstanding: Number(outstandingAgg._sum.amountDue ?? 0),
			outstandingInvoiceCount: outstandingAgg._count.id,
			totalOverdue: Number(overdueAgg._sum.amountDue ?? 0),
			overdueInvoiceCount: overdueAgg._count.id,
			collectedLast30Days: currentCollected, // Map the selected collected amount
			collectedGrowthPercent,
		} as ArVitalsDTO;
	});
