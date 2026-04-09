"use server";

import { LabStaffModel } from "@/generated/prisma/models";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { CreateLabStaffInputSchema, GetLabStaffByRoleAndSearchQueryInputSchema, LabStaffDetailsUI } from "@/schema/composed/lab-staff.details";
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { APIError } from "better-auth";

export const createLabStaffAction = actionClientWithLab
	.metadata({
		actionName: "Register-New-Lab-Staff-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(CreateLabStaffInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { firstName, lastName, email, phoneNumber, roleCategory, specialization, jobTitle, isActive, avatarUrl, commissionType, commissionValue } = parsedInput;
		const { labId } = ctx;

		try {
			const staff = await (
				await tenantPrisma(labId)
			).labStaff.create({
				data: {
					firstName,
					lastName,
					phoneNumber,
					email: email ?? null,
					avatarUrl: avatarUrl ?? null,
					roleCategory,
					specialization: specialization ?? null,
					jobTitle: jobTitle ?? null,
					isActive,
					commissionType,
					commissionValue: commissionValue ?? null,
					labId: labId,
				},
				include: {
					lab: true,
				},
			});

			return {
				staff: { ...staff, commissionValue: staff.commissionValue === null ? null : Number(staff.commissionValue) },
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
		requiredLabRole: "ADMIN",
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery, limit } = parsedInput;
		const { labId } = ctx;

		try {
			const staffMembers = await (
				await tenantPrisma(labId)
			).labStaff.findMany({
				where: {
					labId: labId,

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
					isActive: true,
				},
				orderBy: {
					createdAt: "desc",
				},
				take: limit,
				include: {
					lab: true,
				},
			});

			return {
				staff: normalizeStaffMembers(staffMembers),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Active-Lab-Staff-By-Search-Query-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getLabStaffByRoleAndSearchAction = actionClientWithLab
	.metadata({
		actionName: "Get-Lab-Staff-By-Role-And-Search-Action",
		requiredLabRole: "ADMIN",
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
				include: {
					lab: true,
				},
			});

			return {
				staff: normalizeStaffMembers(staffMembers),
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
		requiredLabRole: "ADMIN",
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
				include: {
					lab: true,
				},
			});

			return {
				staff: normalizeStaffMembers(staffMembers),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Active-Lab-Staff-Action] Error", e.message);
			}
			throw e;
		}
	});

// ========================== Helpers ===============================
function normalizeStaffMembers(labStaff: LabStaffModel[]): LabStaffDetailsUI[] {
	return labStaff.map((s) => ({
		...s,
		commissionValue: s.commissionValue === null ? null : Number(s.commissionValue),
	}));
}
