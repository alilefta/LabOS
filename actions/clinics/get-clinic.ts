"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { z } from "zod";
import { ERRORS } from "@/lib/errors";
import { composeClinicQuickOverviewDTO } from "@/lib/mappers/composers";
import { APIError } from "better-auth";
import { normalizeClinic } from "@/lib/mappers";
import { startOfMonth, subMonths, startOfDay, endOfDay, differenceInDays } from "date-fns";
import { ClinicActiveCaseDTO } from "@/schema/composed/clinics/clinic-cases.dtos";
import { GetClinicHistoricalCasesInputSchema, GetClinicHistoricalCasesResult, ClinicHistoricalCaseDTO, ClinicHistoricalWorkItemDTO } from "@/schema/composed/clinics/clinic-cases.dtos";
import { Prisma } from "@/generated/prisma/client";
import { DatePreset } from "@/schema/composed/cases/cases-filters";

export const getClinicQuickOverviewAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinic-Quick-Overview-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(z.object({ clinicId: z.string().min(1) }))
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },

				select: {
					id: true,
					name: true,
					type: true,
					status: true,
					city: true,
					address1: true,
					phoneNumber: true,
					email: true,
					createdAt: true,
					currentBalance: true,
					creditLimit: true,
					invoices: {
						select: {
							payments: {
								take: 3,
								orderBy: { paidAt: "desc" },
								select: {
									id: true,
									amount: true,
									paidAt: true,
									method: true,
								},
							},
						},
					},
					dentists: {
						orderBy: { isDefault: "desc" },
						select: { id: true, name: true, isDefault: true },
					},
					cases: {
						take: 3,
						orderBy: { createdAt: "desc" },
						select: {
							id: true,
							deadline: true,
							patientId: true,
							status: true,
							caseNumber: true,
							caseItems: {
								take: 2,
								select: { product: { select: { name: true } }, jawType: true },
							},
							invoiceCase: { select: { invoiceId: true } },
							caseCategory: {
								select: {
									name: true,
								},
							},
							patient: {
								select: {
									name: true,
								},
							},
						},
					},
				},
			});

			if (!clinic) throw ERRORS.NOT_FOUND;

			// Calculate Uninvoiced Cases Count (Completed/Delivered with no InvoiceCase)
			// Note: For extreme performance at 5k+ clinics, consider moving this to a dedicated `count`
			const uninvoicedCount = await prisma.case.count({
				where: {
					clinicId,
					labId,
					status: { in: ["COMPLETED", "DELIVERED"] },
					invoiceCase: null,
				},
			});

			// payments is calculated inside the composer
			return composeClinicQuickOverviewDTO(clinic, uninvoicedCount);
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-New-Dental-Case-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getClinicDetailsAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinic-Details-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(z.object({ clinicId: z.string().min(1) }))
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: {
					id: true,
					name: true,
					type: true,
					status: true,
					city: true,
					address1: true,
					address2: true,
					zipcode: true,
					email: true,
					phoneNumber: true,
					billingEmail: true,
					billingPhoneNumber: true,
					taxNumber: true,
					website: true,
					description: true,
					notes: true,
					currentBalance: true,
					creditLimit: true,
					discount: true,
					createdAt: true,
					updatedAt: true,
					labId: true,
				},
			});

			if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

			return { clinic: normalizeClinic(clinic) };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-New-Dental-Case-Action] Error", e.message);
			}
			throw e;
		}
	});

// ========================= Get Data for Active Pipline Kanban Board =============================

export const getClinicActivePipelineAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinic-Active-Pipeline-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			clinicId: z.string().min(1),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			// 1. Fetch all cases in "Active" statuses
			const raw = await prisma.case.findMany({
				where: {
					clinicId,
					labId,
					status: { in: ["NEW", "ASSIGNED", "PROCESSING", "COMPLETED"] },
				},
				orderBy: [{ deadline: "asc" }, { createdAt: "asc" }],
				select: {
					id: true,
					caseNumber: true,
					status: true,
					deadline: true,
					isRemake: true,
					patient: { select: { name: true } },
					caseItems: {
						select: {
							product: { select: { name: true } },
						},
					},
					staffAssignments: {
						where: {
							roleCategory: { in: ["TECHNICIAN", "SENIOR_TECHNICIAN"] },
						},
						select: {
							staff: {
								select: {
									firstName: true,
									lastName: true,
									avatarUrl: true,
									jobTitle: true,
								},
							},
						},
					},
				},
			});

			// 2. Transform into DTO with UX helper flags (like isRush)
			const today = startOfDay(new Date());

			const cases: ClinicActiveCaseDTO[] = raw.map((c) => {
				const daysUntilDeadline = c.deadline ? differenceInDays(startOfDay(c.deadline), today) : null;

				return {
					id: c.id,
					caseNumber: c.caseNumber,
					status: c.status as ClinicActiveCaseDTO["status"],
					patientName: c.patient.name,
					products: c.caseItems.map((ci) => ci.product?.name).filter((n): n is string => n != null),
					assignedTechs: c.staffAssignments
						.filter((sa) => sa.staff != null)
						.map((sa) => ({
							name: `${sa.staff!.firstName} ${sa.staff!.lastName}`,
							avatar: sa.staff!.avatarUrl,
							jobTitle: sa.staff!.jobTitle,
						})),
					deadline: c.deadline,
					isRush: daysUntilDeadline !== null && daysUntilDeadline <= 3,
					isRemake: c.isRemake,
				};
			});

			// 3. Group by Status for the Kanban Columns
			const pipeline = {
				NEW: cases.filter((c) => c.status === "NEW"),
				ASSIGNED: cases.filter((c) => c.status === "ASSIGNED"),
				PROCESSING: cases.filter((c) => c.status === "PROCESSING"),
				COMPLETED: cases.filter((c) => c.status === "COMPLETED"),
			};

			return {
				pipeline,
				totalActive: cases.length,
				rushCount: cases.filter((c) => c.isRush).length,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-New-Dental-Case-Action] Error", e.message);
			}
			throw e;
		}
	});

// =============== Get Clinic Historical Cases Action ======================

// ── Date preset resolver ──────────────────────────────────────────────────────
function resolveDatePreset(preset: DatePreset, from: Date | null, to: Date | null): { gte: Date; lte: Date } | null {
	const now = new Date();

	switch (preset) {
		case "this_month":
			return { gte: startOfMonth(now), lte: endOfDay(now) };
		case "last_month": {
			const start = startOfMonth(subMonths(now, 1));
			const end = endOfDay(new Date(now.getFullYear(), now.getMonth(), 0));
			return { gte: start, lte: end };
		}
		case "last_3_months":
			return { gte: startOfDay(subMonths(now, 3)), lte: endOfDay(now) };
		case "last_6_months":
			return { gte: startOfDay(subMonths(now, 6)), lte: endOfDay(now) };
		case "custom":
			if (!from || !to) return null;
			return { gte: startOfDay(from), lte: endOfDay(to) };
	}
}

export const getClinicHistoricalCasesAction = actionClientWithLab
	.metadata({
		actionName: "Get-Clinic-Historical-Cases-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(GetClinicHistoricalCasesInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId, cursor, take, search, filters } = parsedInput;

		const prisma = await tenantPrisma(labId);

		const clinic = await prisma.clinic.findUnique({
			where: { id: clinicId, labId },
			select: { id: true },
		});
		if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

		// ── Where clause ─────────────────────────────────────────────────────────
		const where: Prisma.CaseWhereInput = {
			clinicId,
			labId,

			// Default to all historical statuses if none specified
			status: {
				in: filters.statuses.length > 0 ? filters.statuses : ["COMPLETED", "DELIVERED", "FAILED"],
			},

			// Remake-only filter
			...(filters.isRemakeOnly && { isRemake: true }),

			// Category filter
			...(filters.categoryId && { caseCategoryId: filters.categoryId }),

			// Staff filter — any role
			...(filters.staffId && {
				staffAssignments: { some: { staffId: filters.staffId } },
			}),

			// Search across case number and patient name
			...(search?.trim() && {
				OR: [{ caseNumber: { contains: search.trim(), mode: "insensitive" } }, { patient: { name: { contains: search.trim(), mode: "insensitive" } } }],
			}),

			// Date range filter
			...(filters.dateRange &&
				(() => {
					const range = resolveDatePreset(filters.dateRange!.preset, filters.dateRange!.from, filters.dateRange!.to);
					if (!range) return {};
					return { [filters.dateRange!.field]: range };
				})()),
		};

		// ── Query ─────────────────────────────────────────────────────────────────
		const [rawCases, totalCount] = await Promise.all([
			prisma.case.findMany({
				where,
				take: take + 1,
				...(cursor && { cursor: { id: cursor }, skip: 1 }),
				orderBy: [{ deliveredAt: "desc" }, { completedAt: "desc" }, { updatedAt: "desc" }],
				select: {
					id: true,
					caseNumber: true,
					status: true,
					grandTotal: true,
					isRemake: true,
					failureReason: true,
					completedAt: true,
					deliveredAt: true,
					updatedAt: true,
					patient: { select: { name: true } },
					dentist: { select: { name: true } },
					caseItems: {
						select: {
							id: true,
							jawType: true,
							product: { select: { name: true } },
							workType: { select: { name: true } },
							selectedTeeth: { select: { id: true } },
						},
					},
				},
			}),
			prisma.case.count({ where }),
		]);

		const hasNextPage = rawCases.length > take;
		const page = hasNextPage ? rawCases.slice(0, -1) : rawCases;

		const cases: ClinicHistoricalCaseDTO[] = page.map((c) => {
			// Resolve resolvedDate based on status
			const resolvedDate = c.status === "DELIVERED" && c.deliveredAt ? c.deliveredAt : c.status === "COMPLETED" && c.completedAt ? c.completedAt : c.updatedAt;

			const workItems: ClinicHistoricalWorkItemDTO[] = c.caseItems.map((ci) => ({
				id: ci.id,
				productName: ci.product?.name ?? "No product",
				workTypeName: ci.workType?.name ?? "No work type",
				jawType: ci.jawType,
				teethCount: ci.selectedTeeth.length,
			}));

			return {
				id: c.id,
				caseNumber: c.caseNumber,
				status: c.status,
				resolvedDate,
				patientName: c.patient.name,
				dentistName: c.dentist?.name ?? null,
				grandTotal: c.grandTotal !== null ? Number(c.grandTotal) : null,
				isRemake: c.isRemake,
				failureReason: c.failureReason,
				workItems,
			};
		});

		return {
			cases,
			nextCursor: hasNextPage ? page[page.length - 1].id : null,
			totalCount,
		} as GetClinicHistoricalCasesResult;
	});
