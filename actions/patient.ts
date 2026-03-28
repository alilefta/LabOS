"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { CaseBase } from "@/schema/base/case.base";
import { CreatePatientInputSchema } from "@/schema/composed/patient.details";
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { APIError } from "better-auth";

export const createPatientAction = actionClientWithLab
	.metadata({
		actionName: "Create-New-Patient-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(CreatePatientInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, age, notes, description, gender } = parsedInput;

		const { labId } = ctx;

		try {
			// maybe there is a lab user but the lab ID is not set to that user
			const patient = await (
				await tenantPrisma(labId)
			).patient.create({
				data: {
					name,
					age: age ?? null,
					gender: gender ?? null,
					notes: notes ?? null,
					description: description ?? null,
					labId: labId,
				},
				include: {
					lab: true,
				},
			});

			return {
				patient: { ...patient, cases: [] as CaseBase[] },
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Patient-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getPatientsBySearchQueryAction = actionClientWithLab
	.metadata({
		actionName: "Get-Patients-By-Search-Query-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery } = parsedInput;
		const { labId } = ctx;

		try {
			const patients = await (
				await tenantPrisma(labId)
			).patient.findMany({
				where: {
					labId: labId,
					name: {
						startsWith: searchQuery,
					},
				},
				orderBy: {
					createdAt: "desc",
				},
				take: 10,
				include: {
					lab: true,
					cases: true,
				},
			});

			return {
				patients: patients.map((p) => ({
					...p,
					cases: p.cases.map((c) => ({
						...c,
						grandTotal: Number(c.grandTotal),
					})),
				})),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Patients-By-Search-Query-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getPatientsForListAction = actionClientWithLab
	.metadata({
		actionName: "Get-Patients-For-List-Action",
		requiredLabRole: "ADMIN",
	})
	.action(async ({ ctx }) => {
		const { labId } = ctx;

		try {
			const patients = await (
				await tenantPrisma(labId)
			).patient.findMany({
				where: {
					labId: labId,
				},
				orderBy: {
					createdAt: "desc",
				},
				take: 10,
				include: {
					cases: true,
				},
			});

			return {
				patients,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Patients-Action] Error", e.message);
			}
			throw e;
		}
	});
