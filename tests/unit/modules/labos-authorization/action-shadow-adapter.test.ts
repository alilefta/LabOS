import { describe, expect, it, vi } from 'vitest'

import type { AuthorizationActor } from '@/platform/authorization'
import {
	authorizeLabOSActionInShadow,
	evaluateLegacyLabRole,
} from '@/modules/labos-authorization/action-shadow-adapter'
import type { LabOSShadowMonitor } from '@/modules/labos-authorization/shadow-evaluation'
import type { LabOSAuthorizationService } from '@/modules/labos-authorization/service'

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
