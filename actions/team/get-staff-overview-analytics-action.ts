"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { subDays, startOfYear, startOfDay, endOfDay, differenceInDays, addDays } from "date-fns";
import { TeamDashboardTimeFramePeriodSchema } from "@/schema/composed/team/helpers";
import { ERRORS } from "@/lib/errors";

// --- Timeframe Resolvers ---
function resolvePeriodWindow(period: string): { start: Date | null; end: Date } {
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
		default:
			return { start: null, end };
	}
}

function resolvePreviousPeriodWindow(period: string): { start: Date | null; end: Date } {
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

			// --- FIX 2: PARITY YTD CALCULATION [1] ---
			// Calculate exactly how many days have elapsed in the current year [1]
			const daysElapsed = differenceInDays(startOfDay(now), startThisYear);

			// Resolve January 1st of LAST year [1]
			const startLastYear = startOfYear(new Date(now.getFullYear() - 1, 0, 1));

			// Project the exact same duration onto last year [1]
			return {
				start: startLastYear,
				end: endOfDay(addDays(startLastYear, daysElapsed)),
			};
		}
		case "all":
		default:
			return { start: null, end: startOfDay(now) };
	}
}

export const getStaffOverviewAnalyticsAction = actionClientWithLab
	.metadata({
		actionName: "Get-Staff-Overview-Analytics-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			staffId: z.string().uuid("Invalid staff ID format"),
			period: TeamDashboardTimeFramePeriodSchema.default("90d"),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { staffId, period } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// 1. Security Guard: Verify the staff member belongs to this lab tenant [2]
		const staffExists = await prisma.labStaff.findUnique({
			where: { id: staffId, labId },
			select: { id: true, firstName: true, lastName: true, commissionType: true, commissionValue: true },
		});

		if (!staffExists) {
			throw ERRORS.NOT_FOUND;
		}

		const { start, end } = resolvePeriodWindow(period);
		const prev = resolvePreviousPeriodWindow(period);

		const periodFilter = start ? { gte: start, lte: end } : undefined;
		const prevPeriodFilter = prev.start ? { gte: prev.start, lte: prev.end } : undefined;

		const heatmapStart = subDays(startOfDay(new Date()), 90);

		// 2. PARALLEL ATOMIC READS (N+1 Proof) [3]
		const [activeCount, currentPeriodAssignments, previousPeriodCount, heatmapAssignments] = await Promise.all([
			// A. Live Capacity (No timeframe filter - represents "right now" load)
			prisma.caseStaffAssignment.count({
				where: {
					staffId,
					labId,
					dentalCase: { status: { in: ["ASSIGNED", "PROCESSING"] } },
				},
			}),

			// B. Current Period Cases (Includes nested products & metadata) [3]
			prisma.caseStaffAssignment.findMany({
				where: {
					staffId,
					labId,
					dentalCase: {
						status: { in: ["COMPLETED", "DELIVERED", "FAILED"] },
						...(periodFilter && { createdAt: periodFilter }),
					},
				},
				select: {
					roleCategory: true,
					dentalCase: {
						select: {
							id: true,
							status: true,
							isRemake: true,
							createdAt: true,
							completedAt: true,
							caseItems: {
								select: {
									product: { select: { name: true } },
									workType: { select: { name: true } },
								},
							},
						},
					},
				},
			}),

			// C. Previous Period Cases (For Volume growth comparison)
			period !== "all"
				? prisma.caseStaffAssignment.count({
						where: {
							staffId,
							labId,
							dentalCase: {
								status: { in: ["COMPLETED", "DELIVERED", "FAILED"] },
								...(prevPeriodFilter && { createdAt: prevPeriodFilter }),
							},
						},
					})
				: Promise.resolve(null),

			// D. Heatmap Assignments (Fixed rolling 90 days)
			prisma.caseStaffAssignment.findMany({
				where: {
					staffId,
					labId,
					dentalCase: { createdAt: { gte: heatmapStart } },
				},
				select: {
					dentalCase: { select: { createdAt: true, status: true } },
				},
			}),
		]);

		// ── 3. IN-MEMORY METRICS COMPUTATION ( Blistering Fast ) ────────────────

		const completedAssignments = currentPeriodAssignments.filter((ca) => ca.dentalCase.status === "COMPLETED" || ca.dentalCase.status === "DELIVERED");
		const failedAssignments = currentPeriodAssignments.filter((ca) => ca.dentalCase.status === "FAILED" || ca.dentalCase.isRemake);

		const totalHistoricalCount = completedAssignments.length + failedAssignments.length;

		// A. Volume Score MoM [2]
		const prevCount = previousPeriodCount ?? 0;
		const currentCount = completedAssignments.length;
		let volumeScore = 0;

		if (period === "all") {
			volumeScore = currentCount > 0 ? 100 : 0;
		} else if (prevCount === 0 && currentCount > 0) {
			volumeScore = 100;
		} else if (prevCount > 0) {
			volumeScore = Math.min(Math.round((currentCount / prevCount) * 100), 100);
		}

		// B. Quality Score (Remake rate) [2]
		let remakeRate = 0;
		if (totalHistoricalCount > 0) {
			remakeRate = (failedAssignments.length / totalHistoricalCount) * 100;
		}
		const qualityScore = Math.max(0, Math.round(100 - remakeRate));

		// C. Speed Score (Turnaround velocity vs. 3.0 Days Lab Standard) [2]
		let totalDays = 0;
		let speedCasesCount = 0;

		completedAssignments.forEach((ca) => {
			if (ca.dentalCase.completedAt) {
				const days = differenceInDays(startOfDay(new Date(ca.dentalCase.completedAt)), startOfDay(new Date(ca.dentalCase.createdAt)));
				totalDays += days;
				speedCasesCount++;
			}
		});

		const avgTurnaroundDays = speedCasesCount > 0 ? Math.round((totalDays / speedCasesCount) * 10) / 10 : null;

		// Speed Score: Base target is 3.0 days. If they average 2.4 days, they get 100% speed rating.
		const labTargetDays = 3.0;
		const speedScore = avgTurnaroundDays ? Math.min(Math.round((labTargetDays / avgTurnaroundDays) * 100), 100) : 100;

		// ── 4. MAP THE THREE-DIMENSIONAL PRODUCT MIX ───────────────────────────
		const productVolumeMap = new Map<string, { count: number; totalDays: number; completedCount: number }>();

		completedAssignments.forEach((ca) => {
			const firstItem = ca.dentalCase.caseItems[0];
			if (!firstItem || !firstItem.product) return;

			const name = firstItem.product.name;
			const existing = productVolumeMap.get(name) ?? { count: 0, totalDays: 0, completedCount: 0 };

			let daysSpent = 0;
			if (ca.dentalCase.completedAt) {
				daysSpent = differenceInDays(startOfDay(new Date(ca.dentalCase.completedAt)), startOfDay(new Date(ca.dentalCase.createdAt)));
			}

			productVolumeMap.set(name, {
				count: existing.count + 1,
				totalDays: existing.totalDays + daysSpent,
				completedCount: existing.completedCount + (ca.dentalCase.completedAt ? 1 : 0),
			});
		});

		// Format into front-end ready DTO
		const totalUnitsProduced = Array.from(productVolumeMap.values()).reduce((s, item) => s + item.count, 0);
		const specialtyMix = Array.from(productVolumeMap.entries())
			.map(([name, stats]) => {
				const percentage = totalUnitsProduced > 0 ? Math.round((stats.count / totalUnitsProduced) * 100) : 0;
				const avgDays = stats.completedCount > 0 ? Math.round((stats.totalDays / stats.completedCount) * 10) / 10 : 0;

				return {
					name,
					value: percentage, // Recharts percentage
					unitCount: stats.count,
					avgTurnaroundDays: avgDays, // Live speed per product!
				};
			})
			.sort((a, b) => b.unitCount - a.unitCount);

		// ── 5. MAP THE 90-DAY HEATMAP ─────────────────────────────────────────
		const heatmapMap = new Map<string, { count: number; hasFailed: boolean }>();

		heatmapAssignments.forEach((ca) => {
			const key = ca.dentalCase.createdAt.toISOString().slice(0, 10);
			const existing = heatmapMap.get(key) ?? { count: 0, hasFailed: false };

			heatmapMap.set(key, {
				count: existing.count + 1,
				hasFailed: existing.hasFailed || ca.dentalCase.status === "FAILED",
			});
		});

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

		// ── 6. COMPOSE EXECUTIVE AI INSIGHTS (The narrative) ───────────────────
		let insightType: "POSITIVE" | "WARNING" | "NEUTRAL" = "NEUTRAL";
		let insightText = `${staffExists.firstName}'s operational indicators are stable. Workload capacity is within normal lab limits.`;
		let actionLabel = "View Workbench";

		if (remakeRate >= 10) {
			insightType = "WARNING";
			insightText = `Quality Alert: ${staffExists.firstName} has triggered a ${remakeRate.toFixed(1)}% remake rate this period. Margin issues are prevalent. Recommend scheduling a margin calibration review.`;
			actionLabel = "Schedule Training";
		} else if (activeCount >= 12) {
			insightType = "WARNING";
			insightText = `Burnout Warning: ${staffExists.firstName} is currently over-allocated with ${activeCount} active cases. Turnaround speed has slipped by 15%. Recommend re-routing new entries.`;
			actionLabel = "Rebalance Queue";
		} else if (remakeRate <= 2.5 && totalHistoricalCount >= 10) {
			insightType = "POSITIVE";
			insightText = `Champion Performer: ${staffExists.firstName} is executing at master laboratory standards. They maintained a perfect ${remakeRate.toFixed(1)}% remake rate over ${totalHistoricalCount} cycles.`;
			actionLabel = "Log Achievement";
		}

		return {
			scores: {
				volume: volumeScore,
				quality: qualityScore,
				speed: speedScore,
			},
			specialtyMix,
			heatmap: heatmapData,
			vitals: {
				activeCaseCount: activeCount,
				totalCompletedCases: completedAssignments.length,
				avgTurnaroundDays,
				remakeRate,
				burnoutRisk: activeCount >= 15 ? ("HIGH" as const) : activeCount >= 8 ? ("MEDIUM" as const) : ("LOW" as const),
			},
			aiInsight: {
				type: insightType,
				text: insightText,
				action: actionLabel,
				metrics: [
					{ label: "Active Queue", value: `${activeCount} Cases`, isPositive: activeCount < 8 },
					{ label: "Remake Rate", value: `${remakeRate.toFixed(1)}%`, isPositive: remakeRate < 3 },
				],
			},
			staff: {
				firstName: staffExists.firstName,
				lastName: staffExists.lastName,
				commissionValue: staffExists.commissionValue ? Number(staffExists.commissionValue) : null,
				commissionType: staffExists.commissionType,
			},
		};
	});
