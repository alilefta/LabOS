import 'server-only'

import type { AuthorizationActor } from '@/platform/authorization'
import type { TenantContext } from '@/platform/organizations'
import { requireTenantContext } from '@/platform/organizations'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import {
	projectN002PaystubBoundary,
	type N002PaystubBoundaryProjection,
} from '@/modules/labos-authorization/non-action-boundaries'
import {
	labosAuthorizationService,
	type LabOSAuthorizationService,
} from '@/modules/labos-authorization/service'

import type { StaffPaystubDTO } from './paystub.dto'

export type PaystubRepository = Readonly<{
	findPaystub(input: {
		labId: string
		staffId: string
		payoutId: string
	}): Promise<StaffPaystubDTO | null>
}>

export const N002_PAYSTUB_ERROR_CODES = Object.freeze({
	ACCESS_DENIED: 'AUTHZ_N002_ACCESS_DENIED',
} as const)

export class N002PaystubAuthorizationError extends Error {
	readonly code = N002_PAYSTUB_ERROR_CODES.ACCESS_DENIED

	constructor() {
		super('Paystub access denied')
		this.name = 'N002PaystubAuthorizationError'
	}
}

export type N002PaystubAuthorizationResult = Readonly<{
	permission: 'payout.read' | 'payout.self.read'
	correlationId: string
}>

/** Selects only a registry-approved payout read from canonical actor roles. */
export async function authorizeN002Paystub(input: {
	actor: AuthorizationActor
	projection: N002PaystubBoundaryProjection
	authorizationService?: LabOSAuthorizationService
	generateCorrelationId?: () => string
}): Promise<N002PaystubAuthorizationResult> {
	const authorization = input.authorizationService ?? labosAuthorizationService
	const capabilities = await authorization.roleCapabilities(input.actor, [
		'payout.read',
		'payout.self.read',
	])
	const permission = capabilities['payout.read']
		? 'payout.read'
		: 'payout.self.read'
	const correlationId = (input.generateCorrelationId ?? (() => crypto.randomUUID()))()

	await authorization.require({
		actor: input.actor,
		boundaryId: input.projection.boundaryId,
		permission,
		target: input.projection.target,
		operation: input.projection.operation,
		correlationId,
	})

	return Object.freeze({ permission, correlationId })
}

export type N002PaystubLoaderDependencies = Readonly<{
	resolveTenant?: () => Promise<TenantContext>
	authorize?: (input: {
		actor: AuthorizationActor
		projection: N002PaystubBoundaryProjection
	}) => Promise<N002PaystubAuthorizationResult>
	repository: PaystubRepository
}>

/** Enforces `input -> canonical tenant -> V1 -> tenant repository`. */
export function createN002PaystubLoader(
	dependencies: N002PaystubLoaderDependencies,
) {
	const resolveTenant = dependencies.resolveTenant ?? requireTenantContext
	const authorize = dependencies.authorize ?? authorizeN002Paystub

	return async function loadN002Paystub(input: {
		staffId: string
		payoutId: string
	}): Promise<StaffPaystubDTO | null> {
		const projection = projectN002PaystubBoundary(input)
		const tenant = await resolveTenant()

		try {
			await authorize({
				actor: createLabOSAuthorizationActor(tenant),
				projection,
			})
		} catch {
			throw new N002PaystubAuthorizationError()
		}

		return dependencies.repository.findPaystub({
			labId: tenant.labId,
			staffId: projection.operation.routeStaffId,
			payoutId: projection.target.id,
		})
	}
}
