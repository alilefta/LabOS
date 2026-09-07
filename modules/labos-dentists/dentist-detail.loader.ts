import 'server-only'

import type { AuthorizationActor } from '@/platform/authorization'
import { requireTenantContext, type TenantContext } from '@/platform/organizations'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import {
	projectNApi002DentistDetailBoundary,
	type NApi002DentistDetailBoundaryProjection,
} from '@/modules/labos-authorization/non-action-boundaries'
import {
	labosAuthorizationService,
	type LabOSAuthorizationService,
} from '@/modules/labos-authorization/service'

import type { DentistEditDTO } from './dentist-detail.dto'

export type DentistDetailRepository = Readonly<{
	findDentistDetail(input: {
		labId: string
		clinicId: string
		dentistId: string
	}): Promise<DentistEditDTO | null>
}>

export class NApi002DentistAuthorizationError extends Error {
	readonly code = 'AUTHZ_N_API_002_ACCESS_DENIED'

	constructor() {
		super('Dentist detail access denied')
		this.name = 'NApi002DentistAuthorizationError'
	}
}

export async function authorizeNApi002DentistDetail(input: {
	actor: AuthorizationActor
	projection: NApi002DentistDetailBoundaryProjection
	authorizationService?: LabOSAuthorizationService
	generateCorrelationId?: () => string
}): Promise<Readonly<{ correlationId: string }>> {
	const authorization = input.authorizationService ?? labosAuthorizationService
	const correlationId = (input.generateCorrelationId ?? (() => crypto.randomUUID()))()

	try {
		await authorization.require({
			actor: input.actor,
			boundaryId: input.projection.boundaryId,
			permission: input.projection.permission,
			target: input.projection.target,
			operation: input.projection.operation,
			correlationId,
		})
	} catch {
		throw new NApi002DentistAuthorizationError()
	}

	return Object.freeze({ correlationId })
}

export type NApi002DentistLoaderDependencies = Readonly<{
	resolveTenant?: () => Promise<TenantContext>
	authorize?: (input: {
		actor: AuthorizationActor
		projection: NApi002DentistDetailBoundaryProjection
	}) => Promise<Readonly<{ correlationId: string }>>
	repository: DentistDetailRepository
}>

/** Enforces `validated route -> canonical tenant -> V1 -> tenant repository`. */
export function createNApi002DentistDetailLoader(
	dependencies: NApi002DentistLoaderDependencies,
) {
	const resolveTenant = dependencies.resolveTenant ?? requireTenantContext
	const authorize = dependencies.authorize ?? authorizeNApi002DentistDetail

	return async function loadDentistDetail(input: {
		dentistId: string
		clinicId: string
	}): Promise<DentistEditDTO | null> {
		const projection = projectNApi002DentistDetailBoundary(input)
		const tenant = await resolveTenant()

		try {
			await authorize({
				actor: createLabOSAuthorizationActor(tenant),
				projection,
			})
		} catch {
			throw new NApi002DentistAuthorizationError()
		}

		return dependencies.repository.findDentistDetail({
			labId: tenant.labId,
			clinicId: projection.operation.routeClinicId,
			dentistId: projection.target.id,
		})
	}
}
