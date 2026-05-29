"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { SystemAccessState, TeamFiltersSchema, CapacityBand, QualityRiskBand } from "@/schema/composed/team/team-filters";
import { LabStaffWhereInput } from "@/generated/prisma/models";
import { StaffMemberDTO } from "@/schema/composed/team/team.dtos";

export const getStaffRosterAction = actionClientWithLab
	.metadata({
		actionName: "Get-Staff-Roster-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			searchQuery: z.string().optional(),
			filters: TeamFiltersSchema.default({
				roleCategories: [],
				accessStates: [],
				isActive: true,
				capacityBands: [],
				qualityBands: [],
				specializationSearch: null,
			}),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { searchQuery, filters } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// ── 1. BUILD PRIMITIVE DATABASE FILTERS ───────────────────────────
		const whereClause: LabStaffWhereInput = {
			labId,
			isActive: filters.isActive,
		};

		if (filters.roleCategories.length > 0) {
			whereClause.roleCategory = { in: filters.roleCategories };
		}

		if (filters.specializationSearch) {
			whereClause.specialization = {
				contains: filters.specializationSearch,
				mode: "insensitive",
			};
		}

		if (searchQuery) {
			whereClause.OR = [
				{ firstName: { contains: searchQuery, mode: "insensitive" } },
				{ lastName: { contains: searchQuery, mode: "insensitive" } },
				{ jobTitle: { contains: searchQuery, mode: "insensitive" } },
			];
		}

		// ── 2. OPTIMIZED DATABASE FETCH ───────────────────────────────────
		const rawStaff = await prisma.labStaff.findMany({
			where: whereClause,
			select: {
				id: true,
				firstName: true,
				lastName: true,
				phoneNumber: true,
				avatarUrl: true,
				roleCategory: true,
				jobTitle: true,
				commissionType: true,
				commissionValue: true,
				isActive: true,

				// Relation 1: System Access
				labUser: { select: { role: true } },

				// Relation 2: The Invitation System
				labInvitation: {
					select: { email: true, roleToGrant: true, expiresAt: true },
				},

				// Operational N+1 Prevention: Aggregated active case count
				_count: {
					select: {
						caseAssignments: {
							where: {
								dentalCase: { status: { in: ["ASSIGNED", "PROCESSING"] } },
							},
						},
					},
				},

				// Quality N+1 Prevention
				caseAssignments: {
					where: {
						dentalCase: { status: { in: ["COMPLETED", "DELIVERED", "FAILED"] } },
					},
					select: {
						dentalCase: { select: { status: true, isRemake: true } },
					},
				},
			},
			orderBy: [{ roleCategory: "asc" }, { firstName: "asc" }],
		});

		// ── 3. MAP TO DTO & IN-MEMORY FILTERING ────────────────────────────
		const now = new Date();

		let mappedStaff: StaffMemberDTO[] = rawStaff.map((staff) => {
			// --- Determine Unified Identity State ---
			let accessState: SystemAccessState = "NO_ACCESS";
			let systemRole = null;
			let inviteEmail = null;

			if (staff.labUser) {
				accessState = "ACTIVE_USER";
				systemRole = staff.labUser.role;
			} else if (staff.labInvitation && staff.labInvitation.expiresAt > now) {
				// The invite is active and hasn't expired yet!
				accessState = "PENDING_INVITE";
				systemRole = staff.labInvitation.roleToGrant;
				inviteEmail = staff.labInvitation.email;
			}

			// --- Determine Capacity Band ---
			const activeCases = staff._count.caseAssignments;
			let capacityBand: CapacityBand = "AVAILABLE";
			if (activeCases >= 15) capacityBand = "OVERLOADED";
			else if (activeCases >= 9) capacityBand = "HEAVY";
			else if (activeCases >= 4) capacityBand = "OPTIMAL";

			// --- Determine Quality Risk Band ---
			const totalHistoricalCases = staff.caseAssignments.length;
			const failedCases = staff.caseAssignments.filter((ca) => ca.dentalCase.status === "FAILED" || ca.dentalCase.isRemake).length;

			let remakeRate = 0;
			if (totalHistoricalCases > 0) {
				remakeRate = (failedCases / totalHistoricalCases) * 100;
			}

			let qualityBand: QualityRiskBand = "EXCELLENT";
			if (remakeRate > 10) qualityBand = "CRITICAL";
			else if (remakeRate >= 6) qualityBand = "ELEVATED";
			else if (remakeRate >= 2) qualityBand = "AVERAGE";

			return {
				id: staff.id,
				firstName: staff.firstName,
				lastName: staff.lastName,
				phoneNumber: staff.phoneNumber,
				avatarUrl: staff.avatarUrl,
				roleCategory: staff.roleCategory,
				jobTitle: staff.jobTitle,
				commissionType: staff.commissionType,
				commissionValue: staff.commissionValue ? Number(staff.commissionValue) : null,

				accessState,
				systemRole,
				inviteEmail,
				isActive: staff.isActive,
				activeCaseCount: activeCases,

				capacityBand,
				qualityBand,
				remakeRate,
			} as StaffMemberDTO;
		});

		// ── 4. APPLY COMPLEX IN-MEMORY FILTERS ──────────────────────────────
		if (filters.accessStates.length > 0) {
			mappedStaff = mappedStaff.filter((staff) => filters.accessStates.includes(staff.accessState));
		}
		if (filters.capacityBands.length > 0) {
			mappedStaff = mappedStaff.filter((staff) => filters.capacityBands.includes(staff.capacityBand));
		}
		if (filters.qualityBands.length > 0) {
			mappedStaff = mappedStaff.filter((staff) => filters.qualityBands.includes(staff.qualityBand));
		}

		return { staff: mappedStaff, totalCount: mappedStaff.length };
	});
