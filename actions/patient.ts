"use server";

import { ERRORS } from "@/lib/errors";
import { CheckLabIsolation } from "@/lib/get-session";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithSession } from "@/lib/safe-action";
import { CaseBase } from "@/schema/base/case.base";
import { CreatePatientInputSchema, PatientDetails, SearchPatientsInputSchema } from "@/schema/composed/patient.details";
import { APIError } from "better-auth";

export const createPatientAction = actionClientWithSession
	.metadata({
		actionName: "Create-New-Patient-Action",
	})
	.inputSchema(CreatePatientInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, address1, address2, city, description, email, phoneNumber, zipcode } = parsedInput;

		const { user } = ctx;

		if (!user) {
			throw ERRORS.UNAUTHORIZED;
		}

		if (!user.labId) {
			throw ERRORS.UNAUTHORIZED;
		}

		const isolationStatus = await CheckLabIsolation();

		if (isolationStatus !== "OK") {
			throw ERRORS.UNAUTHORIZED;
		}

		try {
			// maybe there is a lab user but the lab ID is not set to that user
			const patient = await (
				await tenantPrisma(user.labId)
			).patient.create({
				data: {
					name,
					address1,
					city,
					email,
					phoneNumber,
					zipcode,
					address2,
					description,
					labId: user.labId,
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

export const getPatientsAction = actionClientWithSession
	.metadata({
		actionName: "Get-Patients-Action",
	})
	.inputSchema(SearchPatientsInputSchema)
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
			const patients = await (
				await tenantPrisma(user.labId)
			).patient.findMany({
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
				patients,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Patients-Action] Error", e.message);
			}
			throw e;
		}
	});

export const getPatientsForListAction = actionClientWithSession
	.metadata({
		actionName: "Get-Patients-For-List-Action",
	})
	.action(async ({ ctx }) => {
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
			const patients = await (
				await tenantPrisma(user.labId)
			).patient.findMany({
				where: {
					labId: user.labId,
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

export const seatchPatientsAction = actionClientWithSession
	.metadata({
		actionName: "Search-Patients-Action",
	})
	.inputSchema(SearchPatientsInputSchema)
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
			const patients = await (
				await tenantPrisma(user.labId)
			).patient.findMany({
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
				patients,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Patients-For-List-Action] Error", e.message);
			}
			throw e;
		}
	});
