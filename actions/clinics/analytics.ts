"use server";

import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { ClinicDashboardTimeFramePeriod, ClinicDashboardTimeFramePeriodSchema } from "@/schema/composed/clinics/helpers";
import { subDays, startOfYear, startOfDay, endOfDay } from "date-fns";
import z from "zod";

// ── Period schema (mirrors the URL param) ─────────────────────────────────────

function resolvePeriodWindow(period: ClinicDashboardTimeFramePeriod): { start: Date | null; end: Date } {
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

// For volume we need the previous period window (same length, immediately before)
function resolvePreviousPeriodWindow(period: ClinicDashboardTimeFramePeriod): { start: Date | null; end: Date } {
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
			// const daysPassed = Math.floor((now.getTime() - startThisYear.getTime()) / 86400000);
			const startLastYear = startOfYear(new Date(now.getFullYear() - 1, 0, 1));
			return {
				start: startLastYear,
				end: subDays(startThisYear, 1),
			};
		}
		// "all" has no meaningful previous period — handled in score computation
		case "all":
			return { start: null, end: startOfDay(now) };
	}
}

export const getClinicOverviewAnalyticsAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinic-Overview-Stats-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			clinicId: z.string().min(1),
			period: ClinicDashboardTimeFramePeriodSchema.default("90d"),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId, period } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// Verify clinic belongs to lab
		const clinic = await prisma.clinic.findUnique({
			where: { id: clinicId, labId },
			select: { id: true },
		});
		if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

		const { start, end } = resolvePeriodWindow(period);
		const prev = resolvePreviousPeriodWindow(period);

		const periodFilter = start ? { gte: start, lte: end } : undefined;
		const prevFilter = prev.start ? { gte: prev.start, lte: prev.end } : undefined;

		// ── Fixed 90-day window for heatmap (independent of period filter) ────────
		const heatmapStart = subDays(startOfDay(new Date()), 120);

		// ── Run all queries in parallel ───────────────────────────────────────────
		const [currentCases, previousCases, caseMixRaw, heatmapCases, invoices] = await Promise.all([
			// Volume: current period case count
			prisma.case.count({
				where: {
					clinicId,
					labId,
					...(periodFilter && { createdAt: periodFilter }),
				},
			}),

			// Volume: previous period case count
			period !== "all"
				? prisma.case.count({
						where: {
							clinicId,
							labId,
							...(prevFilter && { createdAt: prevFilter }),
						},
					})
				: Promise.resolve(null),

			// Case mix: grandTotal grouped by caseCategory, exclude FAILED + DRAFT
			prisma.case.findMany({
				where: {
					clinicId,
					labId,
					status: { in: ["PROCESSING", "COMPLETED", "DELIVERED"] },
					...(periodFilter && { createdAt: periodFilter }),
				},
				select: {
					grandTotal: true,
					caseCategory: { select: { name: true } },
					// We fetch workType and product names from the nested items
					caseItems: {
						select: {
							workType: { select: { name: true } },
							product: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			}),

			// Heatmap: fixed rolling 90 days
			prisma.case.findMany({
				where: {
					clinicId,
					labId,
					createdAt: { gte: heatmapStart },
				},
				select: {
					createdAt: true,
					status: true,
				},
			}),

			// Logic: invoices where dueDate falls within period

			// take: 1,  This is fine for PAID invoices, but if an invoice has multiple partial payments,
			// you are only checking the most recent one.
			// If the first payment was on time but the final one was late, your logic considers it "Late" (0.5 points).
			// This is usually the correct business interpretation for "paid on time," but make sure that aligns with your Lab's policy!

			prisma.invoice.findMany({
				where: {
					clinicId,
					labId,
					status: { in: ["PAID", "OVERDUE", "PARTIAL"] },
					...(periodFilter && { dueDate: periodFilter }),
				},
				select: {
					status: true,
					dueDate: true,
					payments: {
						select: { paidAt: true },
						orderBy: { paidAt: "desc" },
						take: 1,
					},
				},
			}),
		]);

		// ── Volume Score ──────────────────────────────────────────────────────────
		const prev30 = previousCases ?? 0;
		let volumeScore: number;

		if (period === "all") {
			// No meaningful previous period — score based on whether they have any cases
			volumeScore = currentCases > 0 ? 100 : 0;
		} else if (prev30 === 0 && currentCases > 0) {
			volumeScore = 100;
		} else if (prev30 === 0 && currentCases === 0) {
			volumeScore = 0;
		} else {
			volumeScore = Math.min(Math.round((currentCases / prev30) * 100), 100);
		}

		// ── Quality Score ─────────────────────────────────────────────────────────
		// We need total + failed within period separately
		const [totalCasesInPeriod, labFaultRemakes, clinicFaultRemakes] = await Promise.all([
			prisma.case.count({
				where: {
					clinicId,
					labId,
					status: { notIn: ["DRAFT"] },
					...(periodFilter && { createdAt: periodFilter }),
				},
			}),
			// FIX: Using OR to handle "LAB" or null
			prisma.case.count({
				where: {
					clinicId,
					labId,
					isRemake: true,
					OR: [{ failureFault: "LAB" }, { failureFault: null }],
					...(periodFilter && { createdAt: periodFilter }),
				},
			}),
			prisma.case.count({
				where: {
					clinicId,
					labId,
					isRemake: true,
					failureFault: "CLINIC",
					...(periodFilter && { createdAt: periodFilter }),
				},
			}),
		]);

		const weightedFailures = labFaultRemakes * 1.0 + clinicFaultRemakes * 0.5;
		const qualityScore = totalCasesInPeriod === 0 ? 100 : Math.max(0, Math.round((1 - weightedFailures / totalCasesInPeriod) * 100));
		// ── Logic Score ───────────────────────────────────────────────────────────
		let logicScore: number;

		if (invoices.length === 0) {
			logicScore = 100; // No invoices due = no evidence of bad behavior
		} else {
			const totalPoints = invoices.reduce((sum, inv) => {
				if (inv.status === "OVERDUE") return sum + 0;

				const lastPayment = inv.payments[0];
				if (!lastPayment || !inv.dueDate) return sum + 0;

				const paidOnTime = lastPayment.paidAt <= inv.dueDate;
				return sum + (paidOnTime ? 1.0 : 0.5);
			}, 0);

			logicScore = Math.round((totalPoints / invoices.length) * 100);
		}

		// ── Heatmap ───────────────────────────────────────────────────────────────
		// Build a map of dateString → { count, hasFailed }
		const heatmapMap = new Map<string, { count: number; hasFailed: boolean }>();

		heatmapCases.forEach((c) => {
			const key = c.createdAt.toISOString().slice(0, 10); // "2026-05-01"
			const existing = heatmapMap.get(key) ?? { count: 0, hasFailed: false };
			heatmapMap.set(key, {
				count: existing.count + 1,
				hasFailed: existing.hasFailed || c.status === "FAILED",
			});
		});

		// Fill all 90 days so the frontend gets a complete grid with zero-days included
		const heatmapData = Array.from({ length: 90 }, (_, i) => {
			const date = subDays(new Date(), 89 - i);
			const key = date.toISOString().slice(0, 10);
			const entry = heatmapMap.get(key);
			return {
				date: key,
				count: entry?.count ?? 0,
				hasFailed: entry?.hasFailed ?? false,
			};
		});

		// ── PROCCESSING THREE-DIMENSIONAL CASE MIX ─────────────────────────────

		const categoryRevenueMap = new Map<string, number>();
		const workTypeVolumeMap = new Map<string, number>();
		const productVolumeMap = new Map<string, number>();

		caseMixRaw.forEach((c) => {
			// A. Category Logic (Sum of Revenue)
			const catName = c.caseCategory?.name ?? "Uncategorized";
			const rev = Number(c.grandTotal ?? 0);
			categoryRevenueMap.set(catName, (categoryRevenueMap.get(catName) ?? 0) + rev);

			// B. WorkType & Product Logic (Count of Units)
			c.caseItems.forEach((item) => {
				const wtName = item.workType?.name ?? "Unknown Type";
				const prodName = item.product?.name ?? "Unknown Product";

				workTypeVolumeMap.set(wtName, (workTypeVolumeMap.get(wtName) ?? 0) + 1);
				productVolumeMap.set(prodName, (productVolumeMap.get(prodName) ?? 0) + 1);
			});
		});

		// Helper to transform maps to sorted arrays for Recharts
		const sortAndFormat = (map: Map<string, number>) =>
			Array.from(map.entries())
				.map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
				.sort((a, b) => b.value - a.value);

		const categoriesByRevenue = sortAndFormat(categoryRevenueMap);
		const workTypesByVolume = sortAndFormat(workTypeVolumeMap);
		const productsByVolume = sortAndFormat(productVolumeMap);

		return {
			scores: {
				volume: volumeScore,
				quality: qualityScore,
				logic: logicScore,
			},
			heatmap: heatmapData,
			productMix: {
				categories: categoriesByRevenue,
				workTypes: workTypesByVolume,
				products: productsByVolume,
			},
			meta: {
				period,
				currentCases,
				previousCases: prev30,
				totalCasesInPeriod,
				labFaultRemakes,
				clinicFaultRemakes,
				invoicesEvaluated: invoices.length,
			},
		};
	});
