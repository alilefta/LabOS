import 'server-only'

import type { TenantContext } from '@/platform/organizations'

import { createLabOSAuthorizationActor } from './actor'
import {
	projectLabOSMembershipOperationBoundary,
	type LabOSMembershipOperationBoundaryId,
	type LabOSMembershipOperationBoundaryProjection,
} from './membership-operation-boundaries'
import {
	labosAuthorizationService,
	type LabOSAuthorizationService,
} from './service'

export type AuthorizeLabOSMembershipOperationInput = Readonly<{
	boundaryId: LabOSMembershipOperationBoundaryId
	parsedInput: unknown
	tenant: TenantContext
	correlationId?: string
}>

export type LabOSMembershipOperationAuthorizationDependencies = Readonly<{
	authorizationService?: LabOSAuthorizationService
	generateCorrelationId?: () => string
}>

/**
 * Authoritatively evaluates a new membership operation with Authorization V1.
 *
 * Unlike the A-xxx pilot, these M-xxx boundaries have no legacy decision and
 * therefore never run in legacy-authoritative shadow mode. Projection happens
 * from schema-validated input, the canonical TenantContext creates the actor,
 * and `require()` fails closed before any repository or Better Auth mutation.
 */
export async function authorizeLabOSMembershipOperation(
	input: AuthorizeLabOSMembershipOperationInput,
	dependencies: LabOSMembershipOperationAuthorizationDependencies = {},
): Promise<LabOSMembershipOperationBoundaryProjection> {
	const authorizationService =
		dependencies.authorizationService ?? labosAuthorizationService
	const correlationId =
		input.correlationId ??
		(dependencies.generateCorrelationId ?? (() => crypto.randomUUID()))()
	const actor = createLabOSAuthorizationActor(input.tenant)

	switch (input.boundaryId) {
		case 'M-001': {
			const projection = projectLabOSMembershipOperationBoundary(
				'M-001',
				input.parsedInput,
			)
			await authorizationService.require({
				actor,
				permission: projection.permission,
				target: projection.target,
				correlationId,
			})
			return projection
		}
		case 'M-002': {
			const projection = projectLabOSMembershipOperationBoundary(
				'M-002',
				input.parsedInput,
			)
			await authorizationService.require({
				actor,
				permission: projection.permission,
				target: projection.target,
				operation: projection.operation,
				correlationId,
			})
			return projection
		}
		case 'M-003': {
			const projection = projectLabOSMembershipOperationBoundary(
				'M-003',
				input.parsedInput,
			)
			await authorizationService.require({
				actor,
				permission: projection.permission,
				target: projection.target,
				correlationId,
			})
			return projection
		}
		case 'M-004': {
			const projection = projectLabOSMembershipOperationBoundary(
				'M-004',
				input.parsedInput,
			)
			await authorizationService.require({
				actor,
				permission: projection.permission,
				operation: projection.operation,
				correlationId,
			})
			return projection
		}
	}
}
