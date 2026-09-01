'use server'

import {
	getCasesList,
	getCasesPulse,
	getCasesRevenue,
} from '@/data/cases/get-cases'
import { ActionError, ERRORS } from '@/lib/errors'
import { actionClientWithLab } from '@/lib/safe-action'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { labosAuthorizationService } from '@/modules/labos-authorization/service'
import { GetCasesListInputSchema } from '@/schema/composed/case.details'

export const getCasesListAction = actionClientWithLab
	.metadata({ actionName: 'Get-Cases-Action', requiredLabRole: 'STAFF' }) // all roles
	.inputSchema(GetCasesListInputSchema)
	.action(async ({ ctx, parsedInput }) => {
		const financialDecision = await labosAuthorizationService.can({
			actor: createLabOSAuthorizationActor(ctx),
			permission: 'case.financials.list',
		})
		const result = await getCasesList({
			labId: ctx.labId,
			includeFinancials: financialDecision.allowed,
			...parsedInput,
		})
		if (!result.success)
			throw new ActionError(
				result.error.message,
				result.error.code,
				result.error.statusCode,
			)
		return result.data
	})

// actions/cases/get-cases-pulse-action.ts
export const getCasesPulseAction = actionClientWithLab
	.metadata({ actionName: 'Get-Cases-Pulse-Action', requiredLabRole: 'STAFF' })
	.action(async ({ ctx }) => {
		const result = await getCasesPulse(ctx.labId)
		if (!result.success)
			throw new ActionError(
				result.error.message,
				result.error.code,
				result.error.statusCode,
			)
		return result.data
	})

// actions/cases/get-cases-revenue-action.ts
export const getCasesRevenueAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Cases-Revenue-Action',
		// Membership compatibility only. Authorization V1 below is authoritative.
		requiredLabRole: 'STAFF',
	})
	.action(async ({ ctx }) => {
		const decision = await labosAuthorizationService.can({
			actor: createLabOSAuthorizationActor(ctx),
			permission: 'case.financials.list',
		})
		if (!decision.allowed) throw ERRORS.MISSING_PERMISSIONS

		const result = await getCasesRevenue(ctx.labId)
		if (!result.success)
			throw new ActionError(
				result.error.message,
				result.error.code,
				result.error.statusCode,
			)
		return result.data
	})
