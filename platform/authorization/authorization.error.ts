import type { AuthorizationDenialReason } from './authorization.types'

/** Public-safe error thrown by AuthorizationService.require(). */
export class AuthorizationError extends Error {
	readonly code = 'AUTHORIZATION_DENIED' as const

	constructor(readonly reason: AuthorizationDenialReason) {
		super('You are not authorized to perform this operation.')
		this.name = 'AuthorizationError'
	}
}
