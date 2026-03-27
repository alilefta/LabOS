"use server";

import { ERRORS } from "@/lib/errors";
import { CheckLabIsolation } from "@/lib/get-session";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithSession } from "@/lib/safe-action";
import { CaseBase } from "@/schema/base/case.base";
import { ClinicDetailsUI, CreateClinicInputSchema } from "@/schema/composed/clinic.details";
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { APIError } from "better-auth";

export const createClinicAction = actionClientWithSession
	.metadata({
		actionName: "Create-New-Clinic-Action",
	})
	.inputSchema(CreateClinicInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, address1, address2, city, description, email, phoneNumber, zipcode, currentBalance, primaryDentist, status, type } = parsedInput;

		const { user } = ctx;

		if (!user) {
			throw ERRORS.UNAUTHORIZED;
		}

		if (!user.labId) {
			throw ERRORS.UNAUTHORIZED;
		}

		// const isolationStatus = await CheckLabIsolation();

		// if (isolationStatus !== "OK") {
		// 	throw ERRORS.UNAUTHORIZED;
		// }

		try {
			// maybe there is a lab user but the lab ID is not set to that user
			const results = await (
				await tenantPrisma(user.labId)
			).$transaction(async (tx) => {
				const createdClinic = await tx.clinic.create({
					data: {
						name,
						address1,
						city,
						email,
						phoneNumber,
						zipcode,
						address2,
						description,
						labId: user.labId!,
					},
					include: {
						dentists: true,
					},
				});

				const createdDentist = await tx.dentist.create({
					data: {
						name: primaryDentist.name,
						email: primaryDentist.email,
						phoneNumber: primaryDentist.phoneNumber,
						isOwner: primaryDentist.isOwner,
						isDefault: primaryDentist.isDefault,
						notes: primaryDentist.email,
						clinicId: createdClinic.id,
						labId: user.labId!,
					},
				});

				return { createdClinic, createdDentist };
			});

			return {
				clinic: results.createdClinic as ClinicDetailsUI,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Clinic-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getClinicsAction = actionClientWithSession
	.metadata({
		actionName: "Get-Clinics-Action",
	})
	.inputSchema(SearchInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { searchQuery } = parsedInput;
		const { user } = ctx;

		if (!user) {
			throw ERRORS.UNAUTHORIZED;
		}

		if (!user.labId) {
			throw ERRORS.UNAUTHORIZED;
		}

		// const isolationStatus = await CheckLabIsolation();

		// if (isolationStatus !== "OK") {
		// 	throw ERRORS.UNAUTHORIZED;
		// }

		try {
			const clinics = await (
				await tenantPrisma(user.labId)
			).clinic.findMany({
				where: {
					labId: user.labId,
					name: {
						startsWith: searchQuery,
					},
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
				clinics,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Clinics-Action] Error", e.message);
			}
			throw e;
		}
	});
