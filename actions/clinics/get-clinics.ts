"use server";

import { ClinicWhereInput } from "@/generated/prisma/models";
import { composeClinicListDTO } from "@/lib/mappers/composers";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { ClinicListDTO, ClinicPulseStats, ClinicRevenueStats, GetClinicsListInputSchema, GetClinicsListResult } from "@/schema/composed/clinic.details";
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { APIError } from "better-auth";
import { differenceInWeeks, startOfDay, subDays } from "date-fns";

const sixWeeksAgo = new Date();
sixWeeksAgo.setDate(sixWeeksAgo.getDate() - 42); // 6 weeks of data

export const getClinicsListAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinics-List-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(GetClinicsListInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		try {
			const { labId } = ctx;
			const { cursor, take = 30, search, filters } = parsedInput;
			const prisma = await tenantPrisma(labId);

			const today = new Date();
			const sixWeeksAgo = subDays(startOfDay(today), 42);

			// ── 1. WHERE CLAUSE CONSTRUCTION ──────────────────────────────────────────
			const baseWhere: ClinicWhereInput = {
				labId,
				...(search?.trim() && {
					OR: [
						{ name: { contains: search.trim(), mode: "insensitive" } },
						{ city: { contains: search.trim(), mode: "insensitive" } },
						{ phoneNumber: { contains: search.trim(), mode: "insensitive" } },
						{ dentists: { some: { name: { contains: search.trim(), mode: "insensitive" } } } },
					],
				}),
				...(filters.statuses.length > 0 && { status: { in: filters.statuses } }),
				...(filters.types.length > 0 && { type: { in: filters.types } }),
				...(filters.hasOutstandingBalance && { currentBalance: { gt: 0 } }),
			};

			const pulseWhere: ClinicWhereInput = (() => {
				switch (filters.pulseFilter) {
					case "suspended":
						return { status: "SUSPENDED" };
					case "uninvoiced":
						return { cases: { some: { invoiceCase: null, status: { in: ["COMPLETED", "DELIVERED"] } } } };
					case "dormant":
						return { NOT: { cases: { some: { status: { in: ["NEW", "ASSIGNED", "PROCESSING"] } } } } };
					case "credit_risk":
						return { creditLimit: { not: null }, currentBalance: { gt: 0 } };
					default:
						return {};
				}
			})();

			const where: ClinicWhereInput = { ...baseWhere, ...pulseWhere };

			// ── 2. DATA FETCHING ───────────────────────────────────────────────────────
			const [rawClinics, totalCount] = await Promise.all([
				prisma.clinic.findMany({
					where,
					take: take + 1,
					...(cursor && { cursor: { id: cursor }, skip: 1 }),
					orderBy: [{ currentBalance: "desc" }, { createdAt: "desc" }],
					select: {
						id: true,
						name: true,
						type: true,
						city: true,
						status: true,
						phoneNumber: true,
						currentBalance: true,
						creditLimit: true,
						email: true,
						dentists: {
							where: { isOwner: true },
							select: { id: true, name: true, isOwner: true },
							take: 1,
						},
						_count: {
							select: {
								dentists: true,
								// Total cases for the production badge
								cases: { where: { status: { in: ["NEW", "ASSIGNED", "PROCESSING"] } } },
								// // All time cases for remake rate math
								// allCases: true,
							},
						},
						// Fetch recent case history for Trend and Remake Rate logic
						cases: {
							where: { createdAt: { gte: sixWeeksAgo } },
							select: { id: true, createdAt: true, status: true, invoiceCase: { select: { invoiceId: true } }, _count: true },
						},
					},
				}),
				prisma.clinic.count({ where }),
			]);

			// ── 3. POST-QUERY: CREDIT RISK & ANALYTICS ────────────────────────────────
			const filteredClinics = filters.pulseFilter === "credit_risk" ? rawClinics.filter((c) => c.creditLimit && Number(c.currentBalance) >= Number(c.creditLimit) * 0.8) : rawClinics;

			const hasNextPage = filteredClinics.length > take;
			const page = hasNextPage ? filteredClinics.slice(0, -1) : filteredClinics;

			// ── 4. MAP TO DTO WITH MATH ───────────────────────────────────────────────
			const clinics: ClinicListDTO[] = page.map((c) => {
				// --- CALC: TREND DATA (6 WEEK BUCKETS) ---
				const trendBuckets = [0, 0, 0, 0, 0, 0];
				c.cases.forEach((caseRec) => {
					const weeksAgo = differenceInWeeks(today, caseRec.createdAt);
					if (weeksAgo >= 0 && weeksAgo < 6) {
						trendBuckets[5 - weeksAgo]++; // Reverse so index 5 is "current week"
					}
				});

				// --- CALC: HEALTH SCORE ---
				let score = 100;

				// Risk 1: Financial Exposure (-25 points if maxed out)
				if (c.creditLimit && Number(c.currentBalance) >= Number(c.creditLimit)) score -= 25;
				else if (c.creditLimit && Number(c.currentBalance) >= Number(c.creditLimit) * 0.8) score -= 15;

				// Risk 2: Quality Issues (-10 points per recent FAILED case)
				const recentFailures = c.cases.filter((cr) => cr.status === "FAILED").length;
				score -= recentFailures * 10;

				// Risk 3: Dormancy (-15 points if no cases in 2 weeks)
				const totalRecentCases = trendBuckets[5] + trendBuckets[4];
				if (totalRecentCases === 0 && c.status === "ACTIVE") score -= 15;

				// --- CALC: UNINVOICED COUNT ---
				const uninvoicedCount = c.cases.filter((cr) => cr.invoiceCase === null && ["COMPLETED", "DELIVERED"].includes(cr.status)).length;

				return composeClinicListDTO(c, uninvoicedCount, score, trendBuckets);
				// return {
				// 	id: c.id,
				// 	name: c.name,
				// 	type: c.type,
				// 	city: c.city,
				// 	status: c.status,
				// 	phoneNumber: c.phoneNumber,
				// 	currentBalance: Number(c.currentBalance),
				// 	creditLimit: c.creditLimit ? Number(c.creditLimit) : null,
				// 	uninvoicedCasesCount: uninvoicedCount,
				// 	ownerDentist: c.dentists[0] ?? null,
				// 	totalDentists: c._count.dentists,
				// 	activeCases: c._count.cases,
				// 	// Analytics
				// 	healthScore: Math.max(score, 0),
				// 	trendData: trendBuckets,
				// };
			});

			return {
				clinics,
				nextCursor: hasNextPage ? page[page.length - 1].id : null,
				totalCount,
			} as GetClinicsListResult;
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-New-Dental-Case-Action] Error", e.message);
			}
			throw e;
		}
	});

// ======================= Stats ===========================
export const getClinicsPulseAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinics-Pulse-Action",
		requiredLabRole: "STAFF",
	})
	.action(async ({ ctx }) => {
		try {
			const { labId } = ctx;
			const prisma = await tenantPrisma(labId);

			const [all, suspended, uninvoiced, dormant, potentialCreditRisks] = await Promise.all([
				// 1. All Clinics
				prisma.clinic.count({ where: { labId } }),

				// 2. Suspended Clinics
				prisma.clinic.count({ where: { labId, status: "SUSPENDED" } }),

				// 3. Uninvoiced Clinics (Has at least one COMPLETED/DELIVERED case not tied to an invoice)
				prisma.clinic.count({
					where: {
						labId,
						cases: {
							some: {
								invoiceCase: null,
								status: { in: ["COMPLETED", "DELIVERED"] },
							},
						},
					},
				}),

				// 4. Dormant Clinics (Has NO active cases in production)
				prisma.clinic.count({
					where: {
						labId,
						NOT: {
							cases: {
								some: {
									status: { in: ["NEW", "ASSIGNED", "PROCESSING"] },
								},
							},
						},
					},
				}),

				// 5. Credit Risks (Fetch minimal data to do math in JS)
				prisma.clinic.findMany({
					where: {
						labId,
						creditLimit: { not: null },
						currentBalance: { gt: 0 },
					},
					select: { currentBalance: true, creditLimit: true },
				}),
			]);

			// Post-query calculation for credit risk (Balance >= 80% of Limit)
			const credit_risk = potentialCreditRisks.filter((c) => {
				if (!c.creditLimit) return false;
				return Number(c.currentBalance) >= Number(c.creditLimit) * 0.8;
			}).length;

			return {
				all,
				credit_risk,
				uninvoiced,
				suspended,
				dormant,
			} as ClinicPulseStats;
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-New-Dental-Case-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getClinicsRevenueAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinics-Revenue-Action",
		requiredLabRole: "MANAGER", // Protect this route!
	})
	.action(async ({ ctx }) => {
		try {
			const { labId } = ctx;
			const prisma = await tenantPrisma(labId);

			const [arAgg, unbilledAgg, overdueAgg] = await Promise.all([
				// 1. Total outstanding balance across all clinics
				prisma.clinic.aggregate({
					where: { labId },
					_sum: { currentBalance: true },
				}),

				// 2. Money sitting on the floor (Completed/Delivered but no invoice generated)
				prisma.case.aggregate({
					where: {
						labId,
						status: { in: ["COMPLETED", "DELIVERED"] },
						invoiceCase: null, // No invoice linked
					},
					_sum: { grandTotal: true },
				}),

				// 3. Official invoices that have passed their due date
				prisma.invoice.aggregate({
					where: {
						labId,
						status: "OVERDUE",
					},
					_sum: { amountDue: true },
				}),
			]);

			return {
				totalAccountsReceivable: Number(arAgg._sum.currentBalance ?? 0),
				totalUnbilled: Number(unbilledAgg._sum.grandTotal ?? 0),
				totalOverdueInvoices: Number(overdueAgg._sum.amountDue ?? 0),
			} as ClinicRevenueStats;
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-New-Dental-Case-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getClinicsBySearchQueryAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinics-By-Search-Query-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery, limit } = parsedInput;
		const { labId } = ctx;

		try {
			const clinics = await (
				await tenantPrisma(labId)
			).clinic.findMany({
				where: {
					labId: labId,
					name: {
						startsWith: searchQuery,
					},
				},
				orderBy: {
					createdAt: "desc",
				},
				take: limit,
				include: {
					lab: true,
					dentists: true,
				},
			});

			return {
				clinics: clinics.map((c) => ({
					...c,
					currentBalance: c.currentBalance === null ? null : Number(c.currentBalance),
					discount: c.discount === null ? null : Number(c.discount),
					creditLimit: c.creditLimit === null ? null : Number(c.creditLimit),
				})),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Clinics-By-Search-Query-Action] Error", e.message);
			}
			console.error(e);
			throw e;
		}
	});
