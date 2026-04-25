// data/cases/get-cases.ts
// ─────────────────────────────────────────────────────────────────────────────
// Three data functions for the cases page:
//
//   getCasesList   — paginated, filtered list for the table (infinite scroll)
//   getCasesPulse  — 5 parallel counts for the pulse strip cards
//   getCasesRevenue — aggregated revenue totals (owner/manager only)
//
// None of these touch auth. labId is injected by the action middleware.
// All Decimal fields are normalized to number via normalizeCase / inline Number().
// ─────────────────────────────────────────────────────────────────────────────

import { CaseStatus } from "@/generated/prisma/client";
import { DAResult, daSuccess, toDAError } from "@/lib/data-access-errors";
import { tenantPrisma } from "@/lib/prisma";
import { CaseListDTO, CasesFilters, DateRangeFilter, PulseFilter, PulseStats, RevenueStats } from "@/schema/composed/case.details";

// ─────────────────────────────────────────────────────────────────────────────
// CaseListDTO
// ─────────────────────────────────────────────────────────────────────────────
// Lean projection — only what the table columns need.
// Not reusing CaseDetailsUI deliberately: the list view is a different read
// model. Pulling full case details for 30+ rows at once would be wasteful.

// ─────────────────────────────────────────────────────────────────────────────
// 1. getCasesList
// ─────────────────────────────────────────────────────────────────────────────

type GetCasesListParams = {
	labId: string;
	cursor?: string;
	take?: number;
	search?: string;
	filters: CasesFilters;
};

type GetCasesListResult = {
	cases: CaseListDTO[];
	nextCursor: string | null;
	totalCount: number;
};

// Statuses that represent active operational cases.
// DRAFT and terminal statuses are excluded from pulse filter counts.
const ACTIVE_STATUSES: CaseStatus[] = ["NEW", "ASSIGNED", "PROCESSING"];
const TERMINAL_STATUSES: CaseStatus[] = ["COMPLETED", "DELIVERED", "FAILED"];

export async function getCasesList(params: GetCasesListParams): Promise<DAResult<GetCasesListResult>> {
	try {
		const { labId, cursor, take = 30, search, filters } = params;
		const prisma = await tenantPrisma(labId);

		const today = startOfDay(new Date());
		const tomorrow = addDays(today, 1);

		// ── Where clause ──────────────────────────────────────────────────────────
		// Pulse filter and advanced filters compose together.
		// Pulse filter takes precedence on status/date constraints.

		const baseWhere = {
			// Search across case number, patient name, clinic name
			...(search?.trim() && {
				OR: [
					{ caseNumber: { contains: search.trim(), mode: "insensitive" as const } },
					{ patient: { name: { contains: search.trim(), mode: "insensitive" as const } } },
					{ clinic: { name: { contains: search.trim(), mode: "insensitive" as const } } },
				],
			}),

			// Advanced filters — applied on top of pulse filter
			...(filters.clinicId && { clinicId: filters.clinicId }),
			...(filters.categoryId && { caseCategoryId: filters.categoryId }),

			// staffId filter — cases where this staff member is assigned in any role
			...(filters.staffId && {
				staffAssignments: {
					some: { staffId: filters.staffId },
				},
			}),
			...(filters.dateRange &&
				(() => {
					const { gte, lte } = resolveDateRange(filters.dateRange);
					return {
						[filters.dateRange.field]: { gte, lte },
					};
				})()),
			labId,
		};

		const pulseWhere = buildPulseWhere(filters.pulseFilter, today, tomorrow);

		// Status filter from the advanced filters sheet.
		// Only applied when NOT using a pulse filter that enforces its own status constraint.
		const statusWhere = filters.statuses.length > 0 && filters.pulseFilter === "all" ? { status: { in: filters.statuses } } : {};

		// Rush-only: deadline is today or tomorrow, case is still active
		const rushWhere =
			filters.isRushOnly && filters.pulseFilter === "all"
				? {
						deadline: { gte: today, lt: tomorrow },
						status: { in: ACTIVE_STATUSES },
					}
				: {};

		const where = {
			...baseWhere,
			...pulseWhere,
			...statusWhere,
			...rushWhere,
		};

		// ── Query ─────────────────────────────────────────────────────────────────
		const [rawCases, totalCount] = await Promise.all([
			prisma.case.findMany({
				where,
				take: take + 1, // fetch one extra to determine if there's a next page
				...(cursor && { cursor: { id: cursor }, skip: 1 }),
				orderBy: [
					// Nulls sort last in Postgres by default for ASC — deadlines always surface first
					{ deadline: "asc" },
					{ createdAt: "desc" },
				],
				select: {
					id: true,
					caseNumber: true,
					status: true,
					deadline: true,
					grandTotal: true,
					patient: {
						select: { name: true },
					},
					clinic: {
						select: { name: true },
					},
					dentist: {
						select: { name: true },
					},
					caseCategory: {
						select: { name: true },
					},
					// Only the first work item — used as "primary product" label in the table
					caseItems: {
						take: 1,
						orderBy: { createdAt: "asc" },
						select: {
							product: { select: { name: true } },
						},
					},
					// Lead technician = first TECHNICIAN or SENIOR_TECHNICIAN assignment by createdAt
					staffAssignments: {
						where: {
							roleCategory: { in: ["TECHNICIAN", "SENIOR_TECHNICIAN"] },
						},
						take: 1,
						orderBy: { createdAt: "asc" },
						select: {
							roleCategory: true,
							staff: {
								select: {
									id: true,
									firstName: true,
									lastName: true,
									avatarUrl: true,
								},
							},
						},
					},
					_count: {
						select: { staffAssignments: true },
					},
				},
			}),
			prisma.case.count({ where }),
		]);

		const hasNextPage = rawCases.length > take;
		const page = hasNextPage ? rawCases.slice(0, -1) : rawCases;
		const cases: CaseListDTO[] = page.map((c) => {
			const leadTechAssignment = c.staffAssignments.find((sa) => sa.roleCategory === "TECHNICIAN" || sa.roleCategory === "SENIOR_TECHNICIAN");

			return {
				id: c.id,
				caseNumber: c.caseNumber,
				status: c.status,
				deadline: c.deadline,
				grandTotal: c.grandTotal !== null ? Number(c.grandTotal) : null,
				patientName: c.patient.name,
				clinicName: c.clinic?.name ?? null,
				dentistName: c.dentist?.name ?? null,
				caseCategory: c.caseCategory?.name ?? null,
				primaryProduct: c.caseItems[0]?.product?.name ?? null,
				leadTechnician: leadTechAssignment?.staff ?? null,
				staffCount: c._count.staffAssignments,
				assignedRoles: c.staffAssignments.map((s) => s.roleCategory),
			};
		});

		return daSuccess<GetCasesListResult>({
			cases,
			nextCursor: hasNextPage ? page[page.length - 1].id : null,
			totalCount,
		});
	} catch (e) {
		return toDAError(e);
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. getCasesPulse
// ─────────────────────────────────────────────────────────────────────────────
// Five parallel count() calls — powers the pulse strip cards.
// Each count is a simple indexed scan. Fast at scale with the indexes added
// in the migration (labId+deadline, labId+status, caseId+roleCategory).

export async function getCasesPulse(labId: string): Promise<DAResult<PulseStats>> {
	try {
		const prisma = await tenantPrisma(labId);

		const today = startOfDay(new Date());
		const tomorrow = addDays(today, 1);

		const [overdue, dueToday, unassigned, processing, total] = await Promise.all([
			// Overdue: past deadline, not yet completed or delivered
			prisma.case.count({
				where: {
					deadline: { lt: today },
					status: { in: ACTIVE_STATUSES },
					labId,
				},
			}),

			// Due today: deadline falls within today's window, still active
			prisma.case.count({
				where: {
					deadline: { gte: today, lt: tomorrow },
					status: { in: ACTIVE_STATUSES },
					labId,
				},
			}),

			// Unassigned: no TECHNICIAN or SENIOR_TECHNICIAN assigned, still active
			prisma.case.count({
				where: {
					status: { in: ACTIVE_STATUSES },
					staffAssignments: {
						none: {
							roleCategory: { in: ["TECHNICIAN", "SENIOR_TECHNICIAN"] },
						},
					},
					labId,
				},
			}),

			// In production: status is PROCESSING
			prisma.case.count({
				where: { status: "PROCESSING", labId },
			}),

			// Total: everything except drafts
			prisma.case.count({
				where: {
					status: { notIn: ["DRAFT"] },
					labId,
				},
			}),
		]);

		return daSuccess<PulseStats>({
			overdue,
			dueToday,
			unassigned,
			processing,
			total,
		});
	} catch (e) {
		return toDAError(e);
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. getCasesRevenue
// ─────────────────────────────────────────────────────────────────────────────
// Three aggregate() calls — powers the owner revenue strip.
// Only called when role is OWNER or MANAGER. The action enforces this —
// the data function itself has no role awareness.

export async function getCasesRevenue(labId: string): Promise<DAResult<RevenueStats>> {
	try {
		const prisma = await tenantPrisma(labId);

		const today = startOfDay(new Date());
		const tomorrow = addDays(today, 1);
		const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);

		const [dueTodayAgg, overdueAgg, mtdAgg] = await Promise.all([
			// Cases due today — any status except DRAFT
			// Represents revenue at risk if not dispatched
			prisma.case.aggregate({
				where: {
					deadline: { gte: today, lt: tomorrow },
					status: { notIn: ["DRAFT"] },
					labId,
				},
				_sum: { grandTotal: true },
			}),

			// Overdue active cases — revenue not yet captured
			prisma.case.aggregate({
				where: {
					deadline: { lt: today },
					status: { in: ACTIVE_STATUSES },
					labId,
				},
				_sum: { grandTotal: true },
			}),

			// Completed this calendar month — actual realized revenue
			// Uses updatedAt as the completion timestamp proxy.
			// If you add a completedAt field later, switch to that.
			prisma.case.aggregate({
				where: {
					status: { in: ["COMPLETED", "DELIVERED"] },
					updatedAt: { gte: monthStart },
					labId,
				},
				_sum: { grandTotal: true },
			}),
		]);

		return daSuccess<RevenueStats>({
			dueTodayTotal: Number(dueTodayAgg._sum.grandTotal ?? 0),
			overdueTotal: Number(overdueAgg._sum.grandTotal ?? 0),
			monthToDateTotal: Number(mtdAgg._sum.grandTotal ?? 0),
		});
	} catch (e) {
		return toDAError(e);
	}
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────────────────────────────────────

// Avoid importing date-fns at the data layer — these are trivial enough inline.
// If you already use date-fns elsewhere at the server level, replace with imports.

function startOfDay(date: Date): Date {
	const d = new Date(date);
	d.setHours(0, 0, 0, 0);
	return d;
}

function addDays(date: Date, days: number): Date {
	const d = new Date(date);
	d.setDate(d.getDate() + days);
	return d;
}

// Translates a PulseFilter value into a Prisma where clause fragment.
// Keeps the getCasesList function clean — all pulse logic in one place.
function buildPulseWhere(filter: PulseFilter, today: Date, tomorrow: Date): object {
	switch (filter) {
		case "overdue":
			return {
				deadline: { lt: today },
				status: { in: ACTIVE_STATUSES },
			};

		case "due_today":
			return {
				deadline: { gte: today, lt: tomorrow },
				status: { in: ACTIVE_STATUSES },
			};

		case "unassigned":
			return {
				status: { in: ACTIVE_STATUSES },
				staffAssignments: {
					none: {
						roleCategory: { in: ["TECHNICIAN", "SENIOR_TECHNICIAN"] },
					},
				},
			};

		case "processing":
			return { status: "PROCESSING" };

		case "all":
		default:
			// No additional constraint — let the advanced filters drive the query
			return { status: { notIn: ["DRAFT"] as CaseStatus[] } };
	}
}

function resolveDateRange(filter: DateRangeFilter): { gte: Date; lte: Date } {
	const now = new Date();
	const startOfToday = startOfDay(now);

	switch (filter.preset) {
		case "this_month":
			return {
				gte: new Date(now.getFullYear(), now.getMonth(), 1),
				lte: now,
			};
		case "last_month": {
			const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
			const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
			return { gte: start, lte: end };
		}
		case "last_3_months":
			return {
				gte: new Date(now.getFullYear(), now.getMonth() - 3, 1),
				lte: now,
			};
		case "last_6_months":
			return {
				gte: new Date(now.getFullYear(), now.getMonth() - 6, 1),
				lte: now,
			};
		case "custom":
			return {
				gte: filter.from ?? startOfDay(new Date(0)), // epoch fallback
				lte: filter.to ?? now,
			};
	}
}
