"use server";

import { ERRORS } from "@/lib/errors";
import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { APIError } from "better-auth";
import z from "zod";

export const getDentistsByClinicAction = actionClientWithLab
	.metadata({
		actionName: "Get-Dentists-By-Clinic-ID-Action",
		requiredLabRole: "STAFF",
	})
	.inputSchema(
		z.object({
			clinicId: z.string({ error: "Case Id is required." }).min(2),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { clinicId } = parsedInput;
		const { labId } = ctx;

		try {
			const prisma = await tenantPrisma(labId);

			const existingClinic = await prisma.clinic.findUnique({
				where: { labId, id: clinicId, status: "ACTIVE" },
				select: {
					status: true,
					id: true,
					type: true,
					dentists: {
						select: {
							id: true,
							isDefault: true,
							isOwner: true,
							name: true,
							email: true,
						},
					},
				},
			});

			if (!existingClinic) {
				throw ERRORS.NOT_FOUND;
			}

			if (existingClinic?.status === "INACTIVE" || existingClinic?.status === "SUSPENDED") {
				// do something
				throw ERRORS.CLINIC_IS_INACTIVE;
			}

			return {
				dentists: existingClinic.dentists,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Dentists-By-Clinic-ID-Action] Error", e.message);
			}
			throw e;
		}
	});
