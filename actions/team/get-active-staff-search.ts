// actions/team/get-active-staff-search.ts
"use server";

import { actionClientWithLab } from "@/lib/safe-action";
import { tenantPrisma } from "@/lib/prisma";
import { LabStaffWhereInput } from "@/generated/prisma/models";
import { ActiveStaffCasesDTO } from "@/schema/composed/team/staff-active-cases.dtos";
import { SearchInputSchema } from "@/schema/composed/shared-schema";

export const getActiveLabStaffBySearchQueryAction = actionClientWithLab
	.metadata({
		actionName: "Get-Lab-Staff-By-Search-Query-Action",
		requiredLabRole: "STAFF", // Adjust role gates as per your security guidelines
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery, limit } = parsedInput;
		const { labId } = ctx;

		const prisma = await tenantPrisma(labId);

		// ── 1. BUILD EFFICIENT SEARCH FILTER ──────────────────────────────
		const whereClause: LabStaffWhereInput = {
			labId,
			isActive: true, // Only fetch currently employed team members
		};

		if (searchQuery.trim().length > 0) {
			const cleanSearch = searchQuery.trim();
			whereClause.OR = [
				// UX FIX: Using 'contains' with 'mode: "insensitive"' is vastly superior
				// to 'startsWith' because it handles typos and middle/last names perfectly.
				{ firstName: { contains: cleanSearch, mode: "insensitive" } },
				{ lastName: { contains: cleanSearch, mode: "insensitive" } },
				{ jobTitle: { contains: cleanSearch, mode: "insensitive" } },
			];
		}

		// ── 2. ATOMIC DATABASE FETCH (N+1 PROOF) ──────────────────────────
		const staffMembers = await prisma.labStaff.findMany({
			where: whereClause,
			select: {
				id: true,
				firstName: true,
				lastName: true,
				roleCategory: true,
				jobTitle: true,
				avatarUrl: true,
				isActive: true,

				// N+1 Prevention: Sum up only ASSIGNED/PROCESSING cases in a single SQL join!
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
			orderBy: {
				createdAt: "desc",
			},
			take: limit,
		});

		// ── 3. MAP TO FLAT DTO ─────────────────────────────────────────────
		const mappedStaff = staffMembers.map((staff) => ({
			id: staff.id,
			firstName: staff.firstName,
			lastName: staff.lastName,
			roleCategory: staff.roleCategory,
			jobTitle: staff.jobTitle,
			avatarUrl: staff.avatarUrl,
			isActive: staff.isActive,
			// Map the nested count to a flat property for the UI
			activeCaseCount: staff._count.caseAssignments,
		})) as ActiveStaffCasesDTO[];

		return {
			staff: mappedStaff,
		};
	});
