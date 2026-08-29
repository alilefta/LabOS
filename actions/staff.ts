"use server";

import { LabStaffWhereInput } from "@/generated/prisma/models";
import { normalizeLabStaff } from "@/lib/mappers";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { CreateLabStaffInputSchema, GetLabStaffByRoleAndSearchQueryInputSchema } from "@/schema/composed/lab-staff.details";
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { APIError } from "better-auth";
import type { LabStaffModel } from "@/generated/prisma/models";

// Read actions intentionally omit phone numbers, invitation relations, and
// other contact/access fields. Consumers of these legacy selectors only need
// assignment identity and (where authorized by the caller) compensation.
const SAFE_STAFF_READ_SELECT = {
	id: true,
	labId: true,
	firstName: true,
	lastName: true,
	avatarUrl: true,
	isActive: true,
	city: true,
	address1: true,
	address2: true,
	zipcode: true,
	roleCategory: true,
	jobTitle: true,
	specialization: true,
	commissionType: true,
	commissionValue: true,
	workingDays: true,
	createdAt: true,
	updatedAt: true,
} as const;

export const createLabStaffAction = actionClientWithLab
	.metadata({
		actionName: "Register-New-Lab-Staff-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(CreateLabStaffInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { firstName, lastName, phoneNumber, roleCategory, specialization, jobTitle, isActive, avatarUrl, commissionType, commissionValue, address1, city, address2, zipcode } = parsedInput;
		const { labId } = ctx;

		try {
			const staff = await (
				await tenantPrisma(labId)
			).labStaff.create({
				data: {
					firstName,
					lastName,
					phoneNumber,
					address1: address1 ?? null,

					address2: address2 ?? null,
					city: city ?? null,
					zipcode: zipcode ?? null,
					avatarUrl: avatarUrl ?? null,
					roleCategory,
					specialization: specialization ?? null,
					jobTitle: jobTitle ?? null,
					isActive,
					commissionType,
					commissionValue: commissionValue ?? null,
					labId: labId,
				},
			});

			return {
				staff: { ...normalizeLabStaff(staff), labInvitation: null },
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Lab-Staff-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getActiveLabStaffBySearchQueryAction = actionClientWithLab
	.metadata({
		actionName: "Get-Lab-Staff-By-Search-Query-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery, limit } = parsedInput;
		const { labId } = ctx;

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

		const staffMembers = await (
			await tenantPrisma(labId)
		).labStaff.findMany({
			where: whereClause,
			select: SAFE_STAFF_READ_SELECT,

			orderBy: {
				createdAt: "desc",
			},
			take: limit,
		});

		return {
			staff: staffMembers.map((staff) => normalizeLabStaff(staff as LabStaffModel)),
		};
	});

export const getLabStaffByRoleAndSearchAction = actionClientWithLab
	.metadata({
		actionName: "Get-Lab-Staff-By-Role-And-Search-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(GetLabStaffByRoleAndSearchQueryInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery, limit, role } = parsedInput;
		const { labId } = ctx;

		try {
			const staffMembers = await (
				await tenantPrisma(labId)
			).labStaff.findMany({
				where: {
					labId: labId,
					AND: [
						{
							OR: [
								{
									firstName: {
										startsWith: searchQuery,
									},
									lastName: {
										startsWith: searchQuery,
									},
								},
							],
						},
						{
							roleCategory: role,
						},
					],
					isActive: true,
				},
				orderBy: {
					createdAt: "desc",
				},
				take: limit,
				select: SAFE_STAFF_READ_SELECT,
			});

			return {
				staff: staffMembers.map((staff) => normalizeLabStaff(staff as LabStaffModel)),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Lab-Staff-By-Role-And-Search-Query-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getActiveLabStaffAction = actionClientWithLab
	.metadata({
		actionName: "Get-Active-Lab-Staff-Action",
		requiredLabRole: "STAFF",
	})
	.action(async ({ ctx }) => {
		const { labId } = ctx;

		try {
			const staffMembers = await (
				await tenantPrisma(labId)
			).labStaff.findMany({
				where: {
					labId: labId,
					isActive: true,
				},
				orderBy: {
					createdAt: "desc",
				},
				select: SAFE_STAFF_READ_SELECT,
			});

			return {
				staff: staffMembers.map((staff) => normalizeLabStaff(staff as LabStaffModel)),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Active-Lab-Staff-Action] Error", e.message);
			}
			throw e;
		}
	});
