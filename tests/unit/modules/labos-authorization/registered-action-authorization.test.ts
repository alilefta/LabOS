import { describe, expect, it, vi } from 'vitest'

import {
	authorizeRegisteredLabOSAction,
	executeRegisteredLabOSAction,
} from '@/modules/labos-authorization/registered-action-authorization'
import {
	createLabOSAuthorizationService,
	type LabOSAuthorizationService,
} from '@/modules/labos-authorization/service'

const actor = Object.freeze({
	userId: 'user-1',
	memberId: 'member-1',
	organizationId: 'organization-a',
	memberRoles: Object.freeze(['owner']),
})

describe('registered LabOS action authorization', () => {
	it.each([
		['owner', true],
		['admin', true],
		['manager', true],
		['staff', false],
		['unknown-role', false],
	] as const)('enforces the approved A-086 %s role result', async (role, allowed) => {
		const service = createLabOSAuthorizationService({
			monitor: { record: vi.fn() },
		})
		const result = authorizeRegisteredLabOSAction({
			boundaryId: 'A-086',
			parsedInput: undefined,
			actor: { ...actor, memberRoles: [role] },
			correlationId: 'correlation-role-matrix',
			authorizationService: service,
		})

		if (allowed) await expect(result).resolves.toBeUndefined()
		else await expect(result).rejects.toMatchObject({ name: 'AuthorizationError' })
	})

	it('derives the A-086 request entirely from the registry', async () => {
		const requireAuthorization = vi.fn().mockResolvedValue(undefined)
		const service = {
			require: requireAuthorization,
		} as unknown as LabOSAuthorizationService

		await authorizeRegisteredLabOSAction({
			boundaryId: 'A-086',
			parsedInput: undefined,
			actor,
			correlationId: 'correlation-1',
			authorizationService: service,
		})

		expect(requireAuthorization).toHaveBeenCalledWith({
			actor,
			boundaryId: 'A-086',
			permission: 'invoice.overdue.sync',
			correlationId: 'correlation-1',
		})
	})

	it('fails closed when canonical membership identity is missing', async () => {
		const service = createLabOSAuthorizationService({
			monitor: { record: vi.fn() },
		})
		await expect(
			authorizeRegisteredLabOSAction({
				boundaryId: 'A-086',
				parsedInput: undefined,
				actor: { ...actor, memberId: '' },
				correlationId: 'correlation-missing-membership',
				authorizationService: service,
			}),
		).rejects.toMatchObject({
			name: 'AuthorizationError',
			reason: 'AUTHZ_ACTOR_INVALID',
		})
	})

	it('fails before the service when validated-input wiring is stale', async () => {
		const requireAuthorization = vi.fn()
		const service = {
			require: requireAuthorization,
		} as unknown as LabOSAuthorizationService

		await expect(
			authorizeRegisteredLabOSAction({
				boundaryId: 'A-086',
				parsedInput: { permission: 'invoice.create' },
				actor,
				correlationId: 'correlation-2',
				authorizationService: service,
			}),
		).rejects.toMatchObject({
			code: 'AUTHZ_BOUNDARY_VALIDATED_INPUT_INVALID',
		})
		expect(requireAuthorization).not.toHaveBeenCalled()
	})

	it('never invokes protected work after an authorization denial', async () => {
		const handler = vi.fn()
		const service = {
			require: vi.fn().mockRejectedValue(new Error('denied')),
		} as unknown as LabOSAuthorizationService

		await expect(
			executeRegisteredLabOSAction({
				boundaryId: 'A-086',
				parsedInput: undefined,
				actor,
				correlationId: 'correlation-denied',
				handler,
				authorizationService: service,
			}),
		).rejects.toThrow('denied')
		expect(handler).not.toHaveBeenCalled()
	})
})
