import { describe, expect, it, vi } from 'vitest'

import type { AuthorizationActor } from '@/platform/authorization'
import {
	authorizeLabOSActionInShadow,
	evaluateLegacyLabRole,
	executeLegacyAuthorizedShadowHandler,
} from '@/modules/labos-authorization/action-shadow-adapter'
import type { LabOSShadowMonitor } from '@/modules/labos-authorization/shadow-evaluation'
import type { LabOSAuthorizationService } from '@/modules/labos-authorization/service'
import { createLabOSAuthorizationService } from '@/modules/labos-authorization/service'

const actor: AuthorizationActor = {
	userId: 'user-1',
	memberId: 'member-1',
	organizationId: 'organization-1',
	memberRoles: ['owner'],
}

function service(allowed: boolean): LabOSAuthorizationService {
	return {
		can: vi.fn().mockResolvedValue(
			allowed
				? { allowed: true, reason: 'POLICY_ALLOWED' }
				: { allowed: false, reason: 'AUTHZ_POLICY_DENIED' },
		),
		require: vi.fn(),
		roleCapabilities: vi.fn(),
	}
}

describe('LabOS shadow action adapter', () => {
	it('preserves the exact legacy hierarchy decision', () => {
		expect(evaluateLegacyLabRole('OWNER', 'ADMIN')).toBe(true)
		expect(evaluateLegacyLabRole('MANAGER', 'ADMIN')).toBe(true)
		expect(evaluateLegacyLabRole('ADMIN', 'ADMIN')).toBe(true)
		expect(evaluateLegacyLabRole('STAFF', 'ADMIN')).toBe(false)
	})

	it('returns legacy allow even when V1 denies', async () => {
		const result = await authorizeLabOSActionInShadow({
			boundaryId: 'A-125',
			parsedInput: { staffId: 'staff-1' },
			actor,
			legacyActorRole: 'MANAGER',
			correlationId: 'correlation-1',
			authorizationService: service(false),
		})

		expect(result.status).toBe('evaluated')
		expect(result.legacyAllowed).toBe(true)
		if (result.status === 'evaluated') {
			expect(result.shadow.enforcement).toEqual({
				source: 'legacy',
				allowed: true,
			})
		}
	})

	it.each(['OWNER', 'ADMIN', 'MANAGER'] as const)(
		'observes A-123 MATCH_ALLOW for legacy-allowed %s',
		async (legacyActorRole) => {
			const result = await authorizeLabOSActionInShadow({
				boundaryId: 'A-123',
				parsedInput: { firstName: 'Private' },
				actor: {
					...actor,
					memberRoles: [legacyActorRole.toLowerCase()],
				},
				legacyActorRole,
				correlationId: 'staff-create-correlation',
			})

			expect(result).toMatchObject({
				status: 'evaluated',
				legacyAllowed: true,
				shadow: {
					comparison: 'MATCH_ALLOW',
					enforcement: { source: 'legacy', allowed: true },
				},
			})
		},
	)

	it('keeps A-123 Staff denial aligned across legacy and V1', async () => {
		const result = await authorizeLabOSActionInShadow({
			boundaryId: 'A-123',
			parsedInput: { firstName: 'Private' },
			actor: { ...actor, memberRoles: ['staff'] },
			legacyActorRole: 'STAFF',
			correlationId: 'staff-create-denied-correlation',
		})

		expect(result).toMatchObject({
			status: 'evaluated',
			legacyAllowed: false,
			shadow: {
				comparison: 'MATCH_DENY',
				enforcement: { source: 'legacy', allowed: false },
			},
		})
	})

	it('keeps legacy denial authoritative when V1 allows', async () => {
		const result = await authorizeLabOSActionInShadow({
			boundaryId: 'A-125',
			parsedInput: { staffId: 'staff-1' },
			actor,
			legacyActorRole: 'STAFF',
			correlationId: 'correlation-1',
			authorizationService: service(true),
		})

		expect(result.legacyAllowed).toBe(false)
		if (result.status === 'evaluated') {
			expect(result.shadow.comparison).toBe('LEGACY_DENY_V1_ALLOW')
			expect(result.shadow.enforcement.allowed).toBe(false)
		}
	})

	it('never invokes the handler when legacy denies', async () => {
		const handler = vi.fn()
		const denied = {
			status: 'v1_configuration_failed' as const,
			legacyAllowed: false,
		}

		await expect(
			executeLegacyAuthorizedShadowHandler({
				authorization: denied,
				handler,
				onDenied: () => {
					throw new Error('legacy denied')
				},
			}),
		).rejects.toThrow('legacy denied')
		expect(handler).not.toHaveBeenCalled()
	})

	it.each([
		[
			'A-124' as const,
			{
				staffId: 'staff-organization-b',
				email: 'staff@example.com',
				roleToGrant: 'STAFF',
			},
		],
		['A-125' as const, { staffId: 'staff-organization-b' }],
	] as const)(
		'denies an Organization B target in Organization A shadow context for %s',
		async (boundaryId, parsedInput) => {
			const authorizationService = createLabOSAuthorizationService({
				targetResolvers: {
					staff: {
						resolveOrganizationId: vi
							.fn()
							.mockResolvedValue('organization-b'),
					},
				},
			})
			const result = await authorizeLabOSActionInShadow({
				boundaryId,
				parsedInput,
				actor,
				legacyActorRole: 'OWNER',
				correlationId: 'two-organization-correlation',
				authorizationService,
			})

			expect(result.legacyAllowed).toBe(true)
			if (result.status === 'evaluated') {
				expect(result.shadow.comparison).toBe('LEGACY_ALLOW_V1_DENY')
				expect(result.shadow.v1Decision).toEqual({
					status: 'completed',
					allowed: false,
					reason: 'AUTHZ_TENANT_MISMATCH',
				})
			}
		},
	)

	it('records malformed projected intent as high severity but preserves legacy allow', async () => {
		const record = vi.fn()
		const result = await authorizeLabOSActionInShadow({
			boundaryId: 'A-124',
			parsedInput: {
				staffId: 'secret-staff-id',
				email: 'private@example.com',
				roleToGrant: 'STALE_ROLE',
			},
			actor,
			legacyActorRole: 'ADMIN',
			correlationId: 'server-correlation-id',
			monitor: { record } satisfies LabOSShadowMonitor,
		})

		expect(result).toEqual({
			status: 'v1_configuration_failed',
			legacyAllowed: true,
		})
		expect(record).toHaveBeenCalledWith({
			event: 'labos.authorization.shadow_configuration_failure',
			boundaryId: 'A-124',
			actionName: 'Grant-Staff-System-Access',
			permission: 'staff.access.invite',
			organizationId: 'organization-1',
			correlationId: 'server-correlation-id',
			failureReason: 'AUTHZ_BOUNDARY_VALIDATED_INPUT_INVALID',
			enforcementSource: 'legacy',
			severity: 'high',
			reviewPriority: 'review',
		})
		const serialized = JSON.stringify(record.mock.calls)
		expect(serialized).not.toContain('secret-staff-id')
		expect(serialized).not.toContain('private@example.com')
	})
})
