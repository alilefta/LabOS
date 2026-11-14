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
	const createInput = {
		clinicId: '9a58f4c9-f112-4479-af03-6d3991ad7849',
		caseIds: ['9a58f4c9-f112-4479-af03-6d3991ad7850'],
		status: 'SENT' as const, billingTerms: 'RECEIPT' as const, discountPercentage: 0,
	}
	it.each([
		['owner', true], ['admin', true], ['manager', true],
		['staff', false], ['unknown-role', false],
	] as const)('enforces A-089 for %s before protected work', async (role, allowed) => {
		const service = createLabOSAuthorizationService({ monitor: { record: vi.fn() } })
		const handler = vi.fn().mockResolvedValue('created')
		const result = executeRegisteredLabOSAction({
			boundaryId: 'A-089', parsedInput: createInput,
			actor: { ...actor, memberRoles: [role] }, correlationId: 'a089-role',
			authorizationService: service, handler,
		})
		if (allowed) await expect(result).resolves.toBe('created')
		else await expect(result).rejects.toMatchObject({ name: 'AuthorizationError' })
		expect(handler).toHaveBeenCalledTimes(allowed ? 1 : 0)
	})
	it('rejects invalid A-089 identity and projection without domain work', async () => {
		const service = createLabOSAuthorizationService({ monitor: { record: vi.fn() } })
		const handler = vi.fn()
		for (const invalid of [
			{ ...createInput, caseIds: [createInput.caseIds[0], createInput.caseIds[0]] },
			{ ...createInput, clinicId: 'foreign-format' },
			{ ...createInput, caseIds: ['bad'] },
		]) {
			await expect(executeRegisteredLabOSAction({
				boundaryId: 'A-089', parsedInput: invalid, actor,
				correlationId: 'a089-invalid', authorizationService: service, handler,
			})).rejects.toBeDefined()
		}
		for (const invalidActor of [
			{ ...actor, organizationId: '' },
			{ ...actor, memberId: '' },
		]) {
			await expect(executeRegisteredLabOSAction({
				boundaryId: 'A-089', parsedInput: createInput,
				actor: invalidActor, correlationId: 'a089-tenant',
				authorizationService: service, handler,
			})).rejects.toMatchObject({ name: 'AuthorizationError' })
		}
		expect(handler).not.toHaveBeenCalled()
	})
	it('sends only server-owned A-089 permission and identifier intent', async () => {
		const requireAuthorization = vi.fn().mockResolvedValue(undefined)
		await authorizeRegisteredLabOSAction({
			boundaryId: 'A-089', parsedInput: createInput, actor,
			correlationId: 'a089',
			authorizationService: { require: requireAuthorization } as unknown as LabOSAuthorizationService,
		})
		expect(requireAuthorization).toHaveBeenCalledWith({
			actor, boundaryId: 'A-089', permission: 'invoice.create',
			operation: { kind: 'invoice.create', clinicId: createInput.clinicId, caseIds: createInput.caseIds },
			correlationId: 'a089',
		})
	})
	const publicLinkInput = { invoiceId: '9a58f4c9-f112-4479-af03-6d3991ad7848' }
	it.each([
		['owner', true], ['admin', true], ['manager', true],
		['staff', false], ['unknown-role', false],
	] as const)('enforces public-link sharing for %s', async (role, allowed) => {
		const service = createLabOSAuthorizationService({
			targetResolvers: { invoice: { resolveOrganizationId: vi.fn().mockResolvedValue(actor.organizationId) } },
			policies: { 'invoice.public_link.share': { evaluate: vi.fn().mockResolvedValue({ allowed: true }) } },
			monitor: { record: vi.fn() },
		})
		const result = authorizeRegisteredLabOSAction({
			boundaryId: 'N-FIN-PL-001', parsedInput: publicLinkInput,
			actor: { ...actor, memberRoles: [role] }, correlationId: 'share-role', authorizationService: service,
		})
		if (allowed) await expect(result).resolves.toBeUndefined()
		else await expect(result).rejects.toMatchObject({ name: 'AuthorizationError' })
	})

	it('denies foreign Invoice, invalid identity, and invalid projection before protected work', async () => {
		const policy = { evaluate: vi.fn().mockResolvedValue({ allowed: true }) }
		const service = createLabOSAuthorizationService({
			targetResolvers: { invoice: { resolveOrganizationId: vi.fn().mockResolvedValue('foreign-org') } },
			policies: { 'invoice.public_link.share': policy }, monitor: { record: vi.fn() },
		})
		const handler = vi.fn()
		await expect(executeRegisteredLabOSAction({
			boundaryId: 'N-FIN-PL-001', parsedInput: publicLinkInput, actor,
			correlationId: 'foreign', authorizationService: service, handler,
		})).rejects.toMatchObject({ name: 'AuthorizationError' })
		expect(policy.evaluate).not.toHaveBeenCalled()
		expect(handler).not.toHaveBeenCalled()
		await expect(executeRegisteredLabOSAction({
			boundaryId: 'N-FIN-PL-001', parsedInput: { invoiceId: 'bad' }, actor,
			correlationId: 'invalid', authorizationService: service, handler,
		})).rejects.toBeDefined()
		expect(handler).not.toHaveBeenCalled()
		const localService = createLabOSAuthorizationService({
			targetResolvers: { invoice: { resolveOrganizationId: vi.fn().mockResolvedValue(actor.organizationId) } },
			policies: { 'invoice.public_link.share': policy }, monitor: { record: vi.fn() },
		})
		await expect(executeRegisteredLabOSAction({
			boundaryId: 'N-FIN-PL-001', parsedInput: publicLinkInput,
			actor: { ...actor, memberId: '' }, correlationId: 'missing-member',
			authorizationService: localService, handler,
		})).rejects.toMatchObject({ name: 'AuthorizationError' })
		expect(handler).not.toHaveBeenCalled()
	})
	const draftInput = {
		invoiceId: '9a58f4c9-f112-4479-af03-6d3991ad7848',
		clinicId: '9a58f4c9-f112-4479-af03-6d3991ad7849',
		caseIds: ['9a58f4c9-f112-4479-af03-6d3991ad7850'],
		status: 'DRAFT' as const,
		billingTerms: 'RECEIPT' as const,
		discountPercentage: 0,
	}

	it.each([
		['owner', true], ['admin', true], ['manager', true],
		['staff', false], ['unknown-role', false],
	] as const)('enforces the A-097 %s role result', async (role, allowed) => {
		const service = createLabOSAuthorizationService({
			targetResolvers: { invoice: { resolveOrganizationId: vi.fn().mockResolvedValue(actor.organizationId) } },
			policies: { 'invoice.update': { evaluate: vi.fn().mockResolvedValue({ allowed: true }) } },
			monitor: { record: vi.fn() },
		})
		const result = authorizeRegisteredLabOSAction({
			boundaryId: 'A-097', parsedInput: draftInput,
			actor: { ...actor, memberRoles: [role] }, correlationId: 'a097-role',
			authorizationService: service,
		})
		if (allowed) await expect(result).resolves.toBeUndefined()
		else await expect(result).rejects.toMatchObject({ name: 'AuthorizationError' })
	})

	it('denies a foreign A-097 Invoice before its policy runs', async () => {
		const policy = { evaluate: vi.fn().mockResolvedValue({ allowed: true }) }
		const service = createLabOSAuthorizationService({
			targetResolvers: { invoice: { resolveOrganizationId: vi.fn().mockResolvedValue('foreign-organization') } },
			policies: { 'invoice.update': policy }, monitor: { record: vi.fn() },
		})
		await expect(authorizeRegisteredLabOSAction({
			boundaryId: 'A-097', parsedInput: draftInput, actor,
			correlationId: 'a097-foreign', authorizationService: service,
		})).rejects.toMatchObject({ name: 'AuthorizationError' })
		expect(policy.evaluate).not.toHaveBeenCalled()
	})

	it.each([
		{ memberId: '', organizationId: actor.organizationId },
		{ memberId: actor.memberId, organizationId: '' },
	])('denies A-097 with invalid membership or tenant context', async (identity) => {
		const service = createLabOSAuthorizationService({
			targetResolvers: { invoice: { resolveOrganizationId: vi.fn().mockResolvedValue(actor.organizationId) } },
			policies: { 'invoice.update': { evaluate: vi.fn().mockResolvedValue({ allowed: true }) } },
			monitor: { record: vi.fn() },
		})
		await expect(authorizeRegisteredLabOSAction({
			boundaryId: 'A-097', parsedInput: draftInput,
			actor: { ...actor, ...identity }, correlationId: 'a097-identity',
			authorizationService: service,
		})).rejects.toMatchObject({ name: 'AuthorizationError' })
	})

	it('binds A-097 authorization to the registry target and operation', async () => {
		const requireAuthorization = vi.fn().mockResolvedValue(undefined)
		await authorizeRegisteredLabOSAction({
			boundaryId: 'A-097', parsedInput: draftInput, actor,
			correlationId: 'a097',
			authorizationService: { require: requireAuthorization } as unknown as LabOSAuthorizationService,
		})
		expect(requireAuthorization).toHaveBeenCalledWith({
			actor, boundaryId: 'A-097', permission: 'invoice.update',
			target: { type: 'invoice', id: draftInput.invoiceId },
			operation: { kind: 'invoice.draft.update', clinicId: draftInput.clinicId, caseIds: draftInput.caseIds },
			correlationId: 'a097',
		})
	})

	it('denies A-097 projection failure before protected work', async () => {
		const handler = vi.fn()
		const requireAuthorization = vi.fn()
		await expect(executeRegisteredLabOSAction({
			boundaryId: 'A-097', parsedInput: { ...draftInput, caseIds: ['malformed'] },
			actor, correlationId: 'a097-invalid', handler,
			authorizationService: { require: requireAuthorization } as unknown as LabOSAuthorizationService,
		})).rejects.toBeDefined()
		expect(requireAuthorization).not.toHaveBeenCalled()
		expect(handler).not.toHaveBeenCalled()
	})
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
