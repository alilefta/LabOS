import 'server-only'

import type { AuthorizationActor } from '@/platform/authorization'

import {
	projectLabOSActionBoundary,
	type LabOSActionBoundaryId,
} from './action-boundaries'
import type { LabOSAuthorizationRequest } from './operation-intents'
import type { LabOSPermission } from './permissions'
import {
	labosAuthorizationService,
	type LabOSAuthorizationService,
} from './service'

/**
 * Authorizes a schema-validated action through its trusted registry entry.
 * The action handler supplies no permission, target type, policy, tenant, or
 * domain fact. Adding a boundary requires a reviewed registry definition.
 */
export async function authorizeRegisteredLabOSAction(input: {
	boundaryId: LabOSActionBoundaryId
	parsedInput: unknown
	actor: AuthorizationActor
	correlationId: string
	authorizationService?: LabOSAuthorizationService
}): Promise<void> {
	const projection = projectLabOSActionBoundary(
		input.boundaryId,
		input.parsedInput,
	)
	const request = {
		actor: input.actor,
		boundaryId: projection.boundaryId,
		permission: projection.permission,
		correlationId: input.correlationId,
		...('target' in projection && { target: projection.target }),
		...('operation' in projection && { operation: projection.operation }),
	} as LabOSAuthorizationRequest<LabOSPermission>

	await (input.authorizationService ?? labosAuthorizationService).require(request)
}

/** Executes protected work only after the registered V1 requirement succeeds. */
export async function executeRegisteredLabOSAction<Result>(input: {
	boundaryId: LabOSActionBoundaryId
	parsedInput: unknown
	actor: AuthorizationActor
	correlationId: string
	handler: () => Promise<Result> | Result
	authorizationService?: LabOSAuthorizationService
}): Promise<Result> {
	await authorizeRegisteredLabOSAction(input)
	return input.handler()
}
