"use server";

import { ERRORS } from "@/lib/errors";
import { CheckLabIsolation } from "@/lib/get-session";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithSession } from "@/lib/safe-action";
import { CreatePatientInputSchema } from "@/schema/composed/patient.details";
import { APIError } from "better-auth";

export const createPatientAction = actionClientWithSession
	.metadata({
		actionName: "Create-New-Patient-Action",
	})
	.inputSchema(CreatePatientInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { name, address1, address2, city, description, email, labId, phoneNumber, zipcode } = parsedInput;

		const { user } = ctx;

		if (!user) {
			throw ERRORS.UNAUTHORIZED;
		}

		const isolationStatus = await CheckLabIsolation(labId);

		if (isolationStatus !== "OK") {
			throw ERRORS.UNAUTHORIZED;
		}

		try {
			// maybe there is a lab user but the lab ID is not set to that user
			const patient = await (
				await tenantPrisma(labId)
			).patient.create({
				data: {
					name,
					address1,
					city,
					email,
					phoneNumber,
					zipcode,
					address2,
					labId,
					description,
				},
			});

			return {
				patient,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Patient-Action] Error", e.message);
			}
			throw e;
		}
	});
