import 'server-only'

import type { AuthorizationActor } from '@/platform/authorization'

import {
	labosAuthorizationService,
	type LabOSAuthorizationService,
} from './service'

export class CaseDetailReadAuthorizationError extends Error {
	readonly code = 'AUTHZ_CASE_DETAIL_READ_ACCESS_DENIED'

	constructor() {
		super('Case detail access denied')
		this.name = 'CaseDetailReadAuthorizationError'
	}
}

/** Authorizes the existing Case-detail reader against a fixed read boundary. */
export async function authorizeCaseDetailRead(input: {
	actor: AuthorizationActor
	caseId: string
	authorizationService?: LabOSAuthorizationService
	generateCorrelationId?: () => string
}): Promise<Readonly<{ correlationId: string }>> {
	const authorization = input.authorizationService ?? labosAuthorizationService
	const correlationId = (input.generateCorrelationId ?? (() => crypto.randomUUID()))()

	try {
		await authorization.require({
			actor: input.actor,
			boundaryId: 'C1-CASE-DETAIL-READ',
			permission: 'case.read',
			target: { type: 'case', id: input.caseId },
			correlationId,
		})
	} catch {
		throw new CaseDetailReadAuthorizationError()
	}

	return Object.freeze({ correlationId })
}
