"use server";

import { tenantPrisma } from "@/lib/prisma";
import { actionClientWithLab } from "@/lib/safe-action";

import { APIError } from "better-auth";
import z from "zod/v3";
import { ERRORS } from "@/lib/errors";
import { caseWorkItemServerToFrontDTO } from "@/lib/server-only-helpers";

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

		try {
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
				include: {
					lab: true,
				},
			});

			return {
				caseWorkItems: caseWorkItemServerToFrontDTO(caseWorkItems),
			};
		} catch (e) {
			if (e instanceof APIError || e instanceof Error) {
				console.error("[Get-Case-Work-Items-By-Case-Action] Error", e.message);
			}
			throw e;
		}
	});
