"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";
import { CreateCaseInputSchema } from "@/schema/composed/case.details";
import { SearchInputSchema } from "@/schema/composed/shared-schema";
import { APIError } from "better-auth";

export const createDentalCaseAction = actionClientWithLab
	.metadata({
		actionName: "Create-New-Dental-Case-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(CreateCaseInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { patientId, clinicId, caseCategoryId, grandTotal, status, deadline, caseAssetFiles, caseWorkItems, staffAssignments, notes } = parsedInput;
		const { labId } = ctx;

		try {
			const dentalCase = await (
				await tenantPrisma(labId)
			).case.create({
				data: {
					patientId,
					clinicId: clinicId,
					caseCategoryId,
					grandTotal,
					status,
					caseNumber: "x",
					deadline,
					// transaction!
					// caseAssetFiles,
					// caseItems: caseWorkItems,
					// staffAssignments,
					notes,
					labId: labId,
				},
				include: {
					lab: true,
				},
			});

			return {
				dentalCase,
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Create-Product-Action] Error", e.message);
			}
			throw e;
		}
	});
