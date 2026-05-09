"use server";

import { ERRORS } from "@/lib/errors";
import { normalizeDentist } from "@/lib/mappers";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { APIError } from "better-auth";
import { z } from "zod";

export const getDentistByIdAction = actionClientWithLab
	.metadata({
		actionName: "Get-Dentist-By-Id-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			clinicId: z.string().uuid(),
			dentistId: z.string().uuid(),
		}),
	)
	.action(async ({ ctx, parsedInput }) => {
		const { labId } = ctx;
		const { clinicId, dentistId } = parsedInput;
		try {
			const prisma = await tenantPrisma(labId);

			const clinic = await prisma.clinic.findUnique({
				where: { id: clinicId, labId },
				select: { id: true },
			});
			if (!clinic) throw ERRORS.CLIENT_NOT_FOUND;

			const dentist = await prisma.dentist.findUnique({
				where: { id: dentistId, clinicId, labId },
			});
			if (!dentist) throw ERRORS.NOT_FOUND;

			return { dentist: normalizeDentist(dentist) };
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Dentist-By-Id-Action] Error", e.message);
			}
			throw e;
		}
	});
