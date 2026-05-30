"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { GetStaffActiveCasesResult, StaffActiveCaseDTO } from "@/schema/composed/team/staff-active-cases.dtos";
import { startOfDay, addDays } from "date-fns";
import { CaseStaffAssignmentWhereInput, CaseWhereInput } from "@/generated/prisma/models";
import { CasesFiltersSchema } from "@/schema/composed/cases/cases-filters";
import { resolveDatePreset } from "@/schema/composed/shared/date-preset";

export const getActiveCasesByStaffAction = actionClientWithLab
	.metadata({
		actionName: "Get-Active-Cases-By-Staff",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			staffId: z.string().uuid("Invalid staff ID"),
			cursor: z.string().optional(),
			take: z.number().default(20),
			search: z.string().optional(),
			filters: CasesFiltersSchema.default({
				statuses: [],
				clinicId: null,
				staffId: null,
				categoryId: null,
				isRushOnly: false,
				dateRange: null,
				pulseFilter: "all",
			}),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { staffId, cursor, take, search, filters } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// ── 1. SECURITY CHECK ───────────────────────────────────────────────
		const staffExists = await prisma.labStaff.findUnique({
			where: { id: staffId, labId },
			select: { id: true },
		});

		if (!staffExists) {
			throw ERRORS.NOT_FOUND;
		}

		// ── 2. DYNAMIC PRISMA FILTERS (N+1 PROOF) ───────────────────────────
		const caseFilters: CaseWhereInput = {
			// Base Operational Constraint: Only show active production stages
			status: {
				in: filters.statuses.length > 0 ? filters.statuses : ["ASSIGNED", "PROCESSING"],
			},
		};

		if (filters.categoryId) caseFilters.caseCategoryId = filters.categoryId;
		if (filters.clinicId) caseFilters.clinicId = filters.clinicId;

		// Rush Logic: Deadline is less than 3 days away
		if (filters.isRushOnly) {
			const rushLimit = addDays(startOfDay(new Date()), 3);
			caseFilters.deadline = { lte: rushLimit, gte: startOfDay(new Date()) };
		}

		// Text Search (Fuzzy search matching Patient Name or Case Number)
		if (search?.trim()) {
			caseFilters.OR = [{ caseNumber: { contains: search.trim(), mode: "insensitive" } }, { patient: { name: { contains: search.trim(), mode: "insensitive" } } }];
		}

		// Date range filter
		if (filters.dateRange) {
			const range = resolveDatePreset(filters.dateRange.preset, filters.dateRange.from, filters.dateRange.to);
			if (range) {
				caseFilters[filters.dateRange.field] = range;
			}
		}

		const whereClause: CaseStaffAssignmentWhereInput = {
			staffId,
			labId,
			dentalCase: caseFilters,
		};

		// ── 3. HIGH-PERFORMANCE DATABASE READ ─────────────────────────────
		const [rawAssignments, totalCount] = await Promise.all([
			prisma.caseStaffAssignment.findMany({
				where: whereClause,
				take: take + 1,
				...(cursor && { cursor: { id: cursor }, skip: 1 }), // Fixed cursor logic!
				select: {
					// FIX: We must explicitly select the junction table ID for the cursor!
					id: true,
					roleCategory: true,
					dentalCase: {
						select: {
							id: true,
							caseNumber: true,
							status: true,
							createdAt: true,
							deadline: true,
							isRemake: true,
							grandTotal: true,
							patient: { select: { name: true } },
							clinic: { select: { name: true } },
							dentist: { select: { name: true } },
							caseCategory: { select: { name: true } },
							caseItems: {
								select: {
									product: { select: { name: true } },
								},
								take: 1,
							},
						},
					},
				},
				orderBy: { createdAt: "asc" }, // Oldest assignments first
			}),
			prisma.caseStaffAssignment.count({ where: whereClause }),
		]);

		// ── 4. MAP TO FLAT READ DTO ────────────────────────────────────────
		const hasNextPage = rawAssignments.length > take;
		const page = hasNextPage ? rawAssignments.slice(0, -1) : rawAssignments;

		const cases: StaffActiveCaseDTO[] = page.map((ra) => {
			const c = ra.dentalCase;
			return {
				id: c.id,
				caseNumber: c.caseNumber,
				patientName: c.patient.name,
				clinicName: c.clinic?.name ?? "Direct Intake",
				dentistName: c.dentist?.name ?? null,
				primaryProduct: c.caseItems[0]?.product?.name ?? null,
				caseCategory: c.caseCategory?.name ?? null,
				isRemake: c.isRemake,
				deadline: c.deadline,
				createdAt: c.createdAt,
				status: c.status as "ASSIGNED" | "PROCESSING", // Typecast to active statuses
				assignedRole: ra.roleCategory,
			};
		});

		return {
			cases,
			nextCursor: hasNextPage ? page[page.length - 1].id : null,
			totalCount,
		} as GetStaffActiveCasesResult;
	});
