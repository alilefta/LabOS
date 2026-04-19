"use server";

import { getCasesList, getCasesPulse, getCasesRevenue } from "@/data/cases/get-cases";
import { ActionError } from "@/lib/errors";
import { actionClientWithLab } from "@/lib/safe-action";
import { GetCasesListInputSchema } from "@/schema/composed/case.details";

export const getCasesListAction = actionClientWithLab
	.metadata({ actionName: "Get-Cases-Action", requiredLabRole: null }) // all roles
	.inputSchema(GetCasesListInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const result = await getCasesList({ labId: ctx.labId, ...parsedInput });
		if (!result.success) throw new ActionError(result.error.message, result.error.code, result.error.statusCode);
		return result.data;
	});

// actions/cases/get-cases-pulse-action.ts
export const getCasesPulseAction = actionClientWithLab.metadata({ actionName: "Get-Cases-Pulse-Action", requiredLabRole: null }).action(async ({ ctx }) => {
	const result = await getCasesPulse(ctx.labId);
	if (!result.success) throw new ActionError(result.error.message, result.error.code, result.error.statusCode);
	return result.data;
});

// actions/cases/get-cases-revenue-action.ts
export const getCasesRevenueAction = actionClientWithLab
	.metadata({ actionName: "Get-Cases-Revenue-Action", requiredLabRole: "MANAGER" }) // OWNER and MANAGER only
	.action(async ({ ctx }) => {
		const result = await getCasesRevenue(ctx.labId);
		if (!result.success) throw new ActionError(result.error.message, result.error.code, result.error.statusCode);
		return result.data;
	});
