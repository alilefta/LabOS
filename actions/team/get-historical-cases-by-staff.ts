// actions/team/get-historical-cases-by-staff.ts
"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { ERRORS } from "@/lib/errors";
import { resolveDatePreset } from "@/schema/composed/shared/date-preset"; // Adjust path to your date helper
import { ClinicHistoricalCaseDTO, ClinicHistoricalWorkItemDTO } from "@/schema/composed/clinics/clinic-cases.dtos"; // Re-use the existing DTOs!
import { CaseStaffAssignmentWhereInput, CaseWhereInput } from "@/generated/prisma/models";
import { CasesFiltersSchema } from "@/schema/composed/cases/cases-filters";
import { GetStaffHistoricalCasesResult, StaffHistoricalCaseDTO, StaffHistoricalWorkItemDTO } from "@/schema/composed/team/staff-historical-cases.dtos";
import { createLabOSAuthorizationActor } from "@/modules/labos-authorization/actor";
import { labosAuthorizationService } from "@/modules/labos-authorization/service";

export const getHistoricalCasesByStaffAction = actionClientWithLab
	.metadata({
		actionName: "Get-Historical-Cases-By-Staff-Action", // Fixed name for audit logs
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
				isOverdueOnly: false,
			}),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { staffId, cursor, take, search, filters } = parsedInput;
		const decision = await labosAuthorizationService.can({
			actor: createLabOSAuthorizationActor(ctx),
			permission: "staff.workbench.read",
			target: { type: "staff", id: staffId },
		});

		if (!decision.allowed) {
			throw ERRORS.MISSING_PERMISSIONS;
		}

		const prisma = await tenantPrisma(labId);

		// ── 1. SECURITY GATES ───────────────────────────────────────────────
		const staffExists = await prisma.labStaff.findUnique({
			where: { id: staffId, labId },
			select: { id: true },
		});

		if (!staffExists) {
			throw ERRORS.NOT_FOUND;
		}

		// ── 2. DYNAMIC PRISMA FILTERS (N+1 PROOF) ───────────────────────────
		const caseFilters: CaseWhereInput = {
			// Base Historical Constraint: Only show finalized/closed stages
			status: {
				in: filters.statuses.length > 0 ? filters.statuses : ["COMPLETED", "DELIVERED", "FAILED"],
			},
		};

		if (filters.categoryId) caseFilters.caseCategoryId = filters.categoryId;
		if (filters.clinicId) caseFilters.clinicId = filters.clinicId;
		if (filters.isRemakeOnly) caseFilters.isRemake = true;

		// Text Search (Fuzzy search matching Patient Name or Case Number)
		if (search?.trim()) {
			caseFilters.OR = [{ caseNumber: { contains: search.trim(), mode: "insensitive" } }, { patient: { name: { contains: search.trim(), mode: "insensitive" } } }];
		}

		// Date Range Resolver
		if (filters.dateRange) {
			const range = resolveDatePreset(filters.dateRange.preset, filters.dateRange.from, filters.dateRange.to);
			if (range) {
				caseFilters[filters.dateRange.field] = range;
			}
		}

		// Scope the query strictly to this staff member's assignments
		const whereClause: CaseStaffAssignmentWhereInput = {
			staffId,
			labId,
			dentalCase: caseFilters, // Corrected schema relation
		};

		// ── 3. DATABASE FETCH (Cursor Pagination on Junction ID) ───────────
		const [rawAssignments, totalCount] = await Promise.all([
			prisma.caseStaffAssignment.findMany({
				where: whereClause,
				take: take + 1,
				...(cursor && { cursor: { id: cursor }, skip: 1 }),
				select: {
					id: true, // Needed for infinite scroll cursor mapping
					roleCategory: true,
					dentalCase: {
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
							clinic: {
								select: {
									name: true,
								},
							},
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
					},
				},
				orderBy: [{ createdAt: "desc" }], // Show most recently finished work first
			}),
			prisma.caseStaffAssignment.count({ where: whereClause }),
		]);

		// ── 4. MAP TO CLINIC HISTORICAL DTO (O(1) Memory Mapping) ──────────
		const hasNextPage = rawAssignments.length > take;
		const page = hasNextPage ? rawAssignments.slice(0, -1) : rawAssignments;

		const cases: StaffHistoricalCaseDTO[] = page.map((ra) => {
			const c = ra.dentalCase;

			// Resolve the active "Resolution Date" based on standard clinical milestones
			const resolvedDate = c.status === "DELIVERED" && c.deliveredAt ? c.deliveredAt : c.status === "COMPLETED" && c.completedAt ? c.completedAt : c.updatedAt;

			// Map work items to their lightweight summaries
			const workItems: StaffHistoricalWorkItemDTO[] = c.caseItems.map((ci) => ({
				id: ci.id,
				productName: ci.product?.name ?? "Unknown Product",
				workTypeName: ci.workType?.name ?? "General",
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
				clinicName: c.clinic?.name ?? "N/A",
			};
		});

		return {
			cases,
			nextCursor: hasNextPage ? page[page.length - 1].id : null, // Safely maps junction ID as the next cursor
			totalCount,
		} as GetStaffHistoricalCasesResult;
	});
