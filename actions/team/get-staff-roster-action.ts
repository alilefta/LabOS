// actions/team/get-staff-roster.ts
"use server";

import { z } from "zod";
import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { StaffMemberDTO, SystemAccessState, TeamFiltersSchema } from "@/schema/composed/team/team.dtos";
import { LabStaffWhereInput } from "@/generated/prisma/models";

export const getStaffRosterAction = actionClientWithLab
	.metadata({
		actionName: "Get-Staff-Roster-Action",
		requiredLabRole: "STAFF", // Adjust based on who can view the directory ["OWNER" | "MANAGER" | "ADMIN" | "STAFF" | null]
	})
	.inputSchema(
		z.object({
			searchQuery: z.string().optional(),
			filters: TeamFiltersSchema.default({ roleCategories: [], accessStates: [], isActive: true }),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx;
		const { searchQuery, filters } = parsedInput;

		const prisma = await tenantPrisma(labId);

		// ── 1. BUILD QUERY FILTERS ────────────────────────────────────────
		const whereClause: LabStaffWhereInput = {
			labId,
			isActive: filters.isActive,
		};

		if (filters.roleCategories.length > 0) {
			whereClause.roleCategory = { in: filters.roleCategories };
		}

		if (searchQuery) {
			whereClause.OR = [
				{ firstName: { contains: searchQuery, mode: "insensitive" } },
				{ lastName: { contains: searchQuery, mode: "insensitive" } },
				{ jobTitle: { contains: searchQuery, mode: "insensitive" } },
			];
		}

		// We fetch ALL matching staff (usually < 100), then apply the `accessState`
		// filter in-memory since it relies on checking relations.

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
				labUser: {
					select: { role: true },
				},

				// Relation 2: Pending Invite
				labInvitation: {
					select: { email: true, roleToGrant: true, expiresAt: true },
				},

				// N+1 Prevention: Aggregated active case count
				_count: {
					select: {
						caseAssignments: {
							where: {
								dentalCase: { status: { in: ["ASSIGNED", "PROCESSING"] } },
							},
						},
					},
				},
			},
			orderBy: [{ roleCategory: "asc" }, { firstName: "asc" }],
		});

		// ── 3. MAP TO DTO & IN-MEMORY FILTERING ────────────────────────────
		const now = new Date();

		let mappedStaff: StaffMemberDTO[] = rawStaff.map((staff) => {
			// Determine Unified Identity State
			let accessState: SystemAccessState = "NO_ACCESS";
			let systemRole = null;
			let inviteEmail = null;

			if (staff.labUser) {
				accessState = "ACTIVE_USER";
				systemRole = staff.labUser.role;
			} else if (staff.labInvitation && staff.labInvitation.expiresAt > now) {
				accessState = "PENDING_INVITE";
				systemRole = staff.labInvitation.roleToGrant;
				inviteEmail = staff.labInvitation.email;
			}

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

				activeCaseCount: staff._count.caseAssignments,
			};
		});

		// Apply the Access State filter if requested by the client
		if (filters.accessStates.length > 0) {
			mappedStaff = mappedStaff.filter((staff) => filters.accessStates.includes(staff.accessState));
		}

		return { staff: mappedStaff, totalCount: mappedStaff.length };
	});
