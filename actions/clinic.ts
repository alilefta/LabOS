"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { CreateClinicInputSchema } from "@/schema/composed/clinic.details";
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { APIError } from "better-auth";

export const createClinicAction = actionClientWithLab
	.metadata({
		actionName: "Create-New-Clinic-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(CreateClinicInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, address1, address2, city, description, email, phoneNumber, zipcode, currentBalance, primaryDentist, status, type } = parsedInput;
		const { labId } = ctx;

		try {
			const clinic = await (
				await tenantPrisma(labId)
			).clinic.create({
				data: {
					name,
					address1,
					city,
					email,
					phoneNumber,
					zipcode: zipcode ?? null,
					address2: address2 ?? null,
					description: description ?? null,
					labId: labId,
					currentBalance: currentBalance ?? 0,
					status: status ?? "ACTIVE",
					type: type ?? "CLINIC",
					dentists: {
						create: {
							name: primaryDentist.name,
							email: primaryDentist.email ?? null,
							phoneNumber: primaryDentist.phoneNumber ?? null,
							isOwner: primaryDentist.isOwner ?? true,
							isDefault: primaryDentist.isDefault ?? true,
							notes: primaryDentist.email ?? null,
							labId: labId,
						},
					},
				},
				include: {
					dentists: true,
					lab: true,
				},
			});

			return {
				clinic: {
					...clinic,
					currentBalance: Number(clinic.currentBalance),
					discount: clinic.discount === null ? null : Number(clinic.discount),
					creditLimit: clinic.creditLimit === null ? null : Number(clinic.creditLimit),
				},
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Clinic-Action] Error", e.message);
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
			throw e;
		}
	});
