import { describe, expect, it, vi } from 'vitest'

import { evaluateN001TeamDirectoryAuthorization } from '@/modules/labos-authorization/non-action-shadow-adapter'
import type { LabOSShadowMonitorEvent } from '@/modules/labos-authorization/shadow-evaluation'

function tenant(memberRole: string, organizationId = 'organization-a') {
	return {
		userId: 'user-secret',
		memberId: 'member-secret',
		organizationId,
		memberRole,
	}
}

function options(
	events: LabOSShadowMonitorEvent[],
	enforcementSource: 'legacy' | 'v1' = 'legacy',
) {
	return {
		monitor: { record: (event: LabOSShadowMonitorEvent) => events.push(event) },
		now: () => 10,
		generateCorrelationId: () => 'correlation-n-001',
		enforcementSource,
	}
}

describe('N-001 Team directory shadow adapter', () => {
	it.each(['owner', 'admin'])(
		'keeps legacy authoritative and matches V1 allow for %s',
		async (role) => {
			const events: LabOSShadowMonitorEvent[] = []
			const result = await evaluateN001TeamDirectoryAuthorization(
				{ tenant: tenant(role) },
				options(events),
			)

			expect(result).toMatchObject({
				boundaryId: 'N-001',
				comparison: 'MATCH_ALLOW',
				v1Decision: { status: 'completed', allowed: true, reason: 'ROLE_PERMISSION' },
				enforcement: { source: 'legacy', allowed: true },
			})
			expect(events[0]).toMatchObject({
				event: 'labos.authorization.shadow_comparison',
				boundaryId: 'N-001',
				actionName: 'Team-And-Roles-Directory',
				permission: 'membership.list',
				organizationId: 'organization-a',
				actorRoles: [role],
				legacyRequiredRole: null,
				correlationId: 'correlation-n-001',
				comparison: 'MATCH_ALLOW',
			})
		},
	)

	it.each(['manager', 'staff'])(
		'records the approved verified-member versus V1 restriction for %s',
		async (role) => {
			const events: LabOSShadowMonitorEvent[] = []
			const result = await evaluateN001TeamDirectoryAuthorization(
				{ tenant: tenant(role) },
				options(events),
			)

			expect(result).toMatchObject({
				comparison: 'LEGACY_ALLOW_V1_DENY',
				v1Decision: {
					status: 'completed',
					allowed: false,
					reason: 'AUTHZ_PERMISSION_NOT_GRANTED',
				},
				enforcement: { source: 'legacy', allowed: true },
			})
			expect(events[0]).toMatchObject({
				severity: 'warning',
				reviewPriority: 'review',
			})
		},
	)

	it.each(['owner', 'admin'])(
		'enforces the V1 membership.list allow for %s',
		async (role) => {
			const events: LabOSShadowMonitorEvent[] = []
			const result = await evaluateN001TeamDirectoryAuthorization(
				{ tenant: tenant(role) },
				options(events, 'v1'),
			)

			expect(result.enforcement).toEqual({ source: 'v1', allowed: true })
			expect(events[0]).toMatchObject({
				enforcementSource: 'v1',
				v1Outcome: 'allowed',
			})
		},
	)

	it.each(['manager', 'staff'])(
		'enforces the V1 membership.list denial for %s',
		async (role) => {
			const events: LabOSShadowMonitorEvent[] = []
			const result = await evaluateN001TeamDirectoryAuthorization(
				{ tenant: tenant(role) },
				options(events, 'v1'),
			)

			expect(result).toMatchObject({
				comparison: 'LEGACY_ALLOW_V1_DENY',
				v1Decision: {
					status: 'completed',
					allowed: false,
					reason: 'AUTHZ_PERMISSION_NOT_GRANTED',
				},
				enforcement: { source: 'v1', allowed: false },
			})
			expect(events[0]).toMatchObject({ enforcementSource: 'v1' })
		},
	)

	it('counts unknown roles without exposing raw role values', async () => {
		const events: LabOSShadowMonitorEvent[] = []
		await evaluateN001TeamDirectoryAuthorization(
			{ tenant: tenant('unknown-provider-role') },
			options(events),
		)

		expect(events[0]).toMatchObject({ actorRoles: [], unknownRoleCount: 1 })
		expect(JSON.stringify(events[0])).not.toContain('unknown-provider-role')
	})

	it('contains V1 infrastructure failure and preserves a legacy allow', async () => {
		const events: LabOSShadowMonitorEvent[] = []
			const result = await evaluateN001TeamDirectoryAuthorization(
			{ tenant: tenant('owner') },
			{
				...options(events),
				authorizationService: {
					can: vi.fn().mockRejectedValue(new Error('provider secret')),
				} as never,
			},
		)

		expect(result).toMatchObject({
			comparison: 'LEGACY_ALLOW_V1_DENY',
			v1Decision: {
				status: 'failed',
				allowed: false,
				reason: 'AUTHZ_SHADOW_V1_EVALUATION_FAILED',
			},
			enforcement: { source: 'legacy', allowed: true },
		})
		expect(JSON.stringify(events[0])).not.toContain('provider secret')
	})

	it('fails closed on a V1 infrastructure failure when V1 is authoritative', async () => {
		const events: LabOSShadowMonitorEvent[] = []
			const result = await evaluateN001TeamDirectoryAuthorization(
			{ tenant: tenant('owner') },
			{
				...options(events, 'v1'),
				authorizationService: {
					can: vi.fn().mockRejectedValue(new Error('provider secret')),
				} as never,
			},
		)

		expect(result).toMatchObject({
			v1Decision: {
				status: 'failed',
				allowed: false,
				reason: 'AUTHZ_SHADOW_V1_EVALUATION_FAILED',
			},
			enforcement: { source: 'v1', allowed: false },
		})
		expect(events[0]).toMatchObject({
			enforcementSource: 'v1',
			severity: 'high',
		})
	})

	it('propagates correlation and Organization identity but redacts identity details', async () => {
		const events: LabOSShadowMonitorEvent[] = []
		await evaluateN001TeamDirectoryAuthorization(
			{ tenant: tenant('owner', 'organization-b') },
			options(events),
		)

		const serialized = JSON.stringify(events[0])
		expect(events[0]).toMatchObject({
			organizationId: 'organization-b',
			correlationId: 'correlation-n-001',
		})
		expect(serialized).not.toContain('user-secret')
		expect(serialized).not.toContain('member-secret')
		expect(serialized).not.toContain('labId')
		expect(serialized).not.toContain('email')
	})

	it('fails closed when the enforcing legacy boundary cannot decide', async () => {
		const events: LabOSShadowMonitorEvent[] = []
		await expect(
			evaluateN001TeamDirectoryAuthorization(
				{
					tenant: tenant('owner'),
					evaluateLegacy: () => {
						throw new Error('legacy details')
					},
				},
				options(events),
			),
		).rejects.toMatchObject({
			name: 'LabOSShadowLegacyEvaluationError',
			code: 'AUTHZ_SHADOW_LEGACY_EVALUATION_FAILED',
			message: 'Authorization evaluation failed',
		})
		expect(JSON.stringify(events[0])).not.toContain('legacy details')
	})

	it('keeps a legacy failure observational when V1 allows', async () => {
		const events: LabOSShadowMonitorEvent[] = []
		const result = await evaluateN001TeamDirectoryAuthorization(
			{
				tenant: tenant('owner'),
				evaluateLegacy: () => {
					throw new Error('legacy details')
				},
			},
			options(events, 'v1'),
		)

		expect(result).toMatchObject({
			comparison: 'LEGACY_DENY_V1_ALLOW',
			legacyDecision: { allowed: false },
			v1Decision: { status: 'completed', allowed: true },
			enforcement: { source: 'v1', allowed: true },
		})
		expect(events[0]).toMatchObject({
			legacyOutcome: 'failed',
			enforcementSource: 'v1',
			severity: 'high',
		})
		expect(JSON.stringify(events[0])).not.toContain('legacy details')
	})
})
