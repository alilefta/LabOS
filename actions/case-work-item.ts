"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";

import z from "zod/v3";
import { ERRORS } from "@/lib/errors";
import { normalizeWorkItem } from "@/lib/mappers";

export const getCaseWorkItemByCase = actionClientWithLab
	.metadata({
		actionName: "Get-Case-Work-Items-By-Case-Action",
		requiredLabRole: "ADMIN",
	})
	.inputSchema(
		z.object({
			caseId: z.string().optional(),
			caseNumber: z.string().optional(),
		}),
	)
	.action(async ({ parsedInput, ctx }) => {
		const { caseId, caseNumber } = parsedInput;
		const { labId } = ctx;

		if (!caseId && !caseNumber) {
			throw ERRORS.BAD_REQUEST;
		}

		const caseWorkItems = await (
			await tenantPrisma(labId)
		).caseWorkItem.findMany({
			where: {
				dentalCaseId: caseId,

				labId,
				dentalCase: caseNumber
					? {
							caseNumber: caseNumber,
						}
					: undefined,
			},
		});

		return {
			caseWorkItems: caseWorkItems.map(normalizeWorkItem),
		};
	});
