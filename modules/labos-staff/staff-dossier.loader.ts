import type { AuthorizationActor } from '@/platform/authorization'

import type { StaffDossierDTO } from '@/schema/composed/team/staff-dossier.dtos'
import type { LabOSAuthorizationService } from '@/modules/labos-authorization/service'

export type StaffDossierIdentity = Omit<
	StaffDossierDTO,
	'compensation' | 'access'
>

export type StaffDossierCompensation = NonNullable<
	StaffDossierDTO['compensation']
>

export type StaffDossierAccess = NonNullable<StaffDossierDTO['access']>

export type StaffDossierRepository = Readonly<{
	findIdentity(input: {
		labId: string
		staffId: string
	}): Promise<StaffDossierIdentity | null>
	findCompensation(input: {
		labId: string
		staffId: string
	}): Promise<StaffDossierCompensation | null>
	findAccess(input: {
		labId: string
		staffId: string
	}): Promise<StaffDossierAccess | null>
}>

export const STAFF_DOSSIER_ERROR_CODES = Object.freeze({
	FORBIDDEN: 'STAFF_DOSSIER_FORBIDDEN',
} as const)

export class StaffDossierAuthorizationError extends Error {
	readonly code = STAFF_DOSSIER_ERROR_CODES.FORBIDDEN

	constructor() {
		super('Staff dossier access denied')
		this.name = 'StaffDossierAuthorizationError'
	}
}

export type LoadStaffDossierInput = Readonly<{
	actor: AuthorizationActor
	labId: string
	staffId: string
}>

/**
 * Loads an A-118 Staff dossier through independent disclosure boundaries.
 *
 * `staff.read` is authoritative for the ordinary identity section. Protected
 * repositories are invoked only after their own permission decision allows
 * access: compensation uses `staff.compensation.read`, while system access
 * uses the Organization-scoped `membership.list` permission. This makes DTO
 * redaction a query-level property rather than a client-side presentation rule.
 */
export function createStaffDossierLoader(
	authorization: LabOSAuthorizationService,
	repository: StaffDossierRepository,
) {
	return async function loadStaffDossier(
		input: LoadStaffDossierInput,
	): Promise<StaffDossierDTO | null> {
		const target = Object.freeze({ type: 'staff' as const, id: input.staffId })
		const identityDecision = await authorization.can({
			actor: input.actor,
			permission: 'staff.read',
			target,
		})

		if (!identityDecision.allowed) {
			throw new StaffDossierAuthorizationError()
		}

		const [identity, compensationDecision, accessDecision] = await Promise.all([
			repository.findIdentity({ labId: input.labId, staffId: input.staffId }),
			authorization.can({
				actor: input.actor,
				permission: 'staff.compensation.read',
				target,
			}),
			authorization.can({
				actor: input.actor,
				permission: 'membership.list',
			}),
		])

		if (!identity) return null

		const [compensation, access] = await Promise.all([
			compensationDecision.allowed
				? repository.findCompensation({
						labId: input.labId,
						staffId: input.staffId,
					})
				: Promise.resolve(null),
			accessDecision.allowed
				? repository.findAccess({
						labId: input.labId,
						staffId: input.staffId,
					})
				: Promise.resolve(null),
		])

		return Object.freeze({
			...identity,
			compensation,
			access,
		})
	}
}
