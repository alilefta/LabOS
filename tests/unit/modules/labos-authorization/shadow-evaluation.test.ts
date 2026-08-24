import { describe, expect, it, vi } from 'vitest'

import type { AuthorizationActor } from '@/platform/authorization'
import { projectLabOSActionBoundary } from '@/modules/labos-authorization/action-boundaries'
import {
	evaluateLabOSAuthorizationShadow,
	LABOS_SHADOW_ERROR_CODES,
	LabOSShadowLegacyEvaluationError,
	type LabOSShadowMonitor,
} from '@/modules/labos-authorization/shadow-evaluation'
import type { LabOSAuthorizationService } from '@/modules/labos-authorization/service'

const actor: AuthorizationActor = Object.freeze({
	userId: 'user-1',
	memberId: 'member-1',
	organizationId: 'organization-1',
	memberRoles: Object.freeze(['owner']),
})

const revokeProjection = projectLabOSActionBoundary('A-125', {
	staffId: 'staff-1',
})

function serviceDecision(
	allowed: boolean,
): LabOSAuthorizationService {
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

function monitor() {
	const record = vi.fn()
	return { record, monitor: { record } satisfies LabOSShadowMonitor }
}

describe('LabOS authorization shadow coordinator', () => {
	it.each([
		[true, true, 'MATCH_ALLOW'],
		[false, false, 'MATCH_DENY'],
		[true, false, 'LEGACY_ALLOW_V1_DENY'],
		[false, true, 'LEGACY_DENY_V1_ALLOW'],
	] as const)(
		'classifies legacy=%s and V1=%s as %s while enforcing legacy',
		async (legacyAllowed, v1Allowed, comparison) => {
			const { monitor: testMonitor, record } = monitor()
			const result = await evaluateLabOSAuthorizationShadow(
				{
					actor,
					projection: revokeProjection,
					evaluateLegacy: () => legacyAllowed,
				},
				{
					authorizationService: serviceDecision(v1Allowed),
					monitor: testMonitor,
					now: () => 10,
					generateCorrelationId: () => 'correlation-1',
				},
			)

			expect(result).toEqual({
				boundaryId: 'A-125',
				correlationId: 'correlation-1',
				comparison,
				legacyDecision: { allowed: legacyAllowed },
				v1Decision: {
					status: 'completed',
					allowed: v1Allowed,
					reason: v1Allowed ? 'POLICY_ALLOWED' : 'AUTHZ_POLICY_DENIED',
				},
				enforcement: { source: 'legacy', allowed: legacyAllowed },
			})
			expect(record).toHaveBeenCalledWith(
					expect.objectContaining({
					comparison,
					enforcementSource: 'legacy',
					correlationId: 'correlation-1',
					reviewPriority:
						comparison === 'LEGACY_DENY_V1_ALLOW'
							? 'highest'
							: comparison === 'LEGACY_ALLOW_V1_DENY'
								? 'review'
								: 'routine',
				}),
			)
		},
	)

	it.each([
		['A-124', projectLabOSActionBoundary('A-124', {
			staffId: 'staff-1',
			email: 'staff@example.com',
			roleToGrant: 'STAFF',
		})],
		['A-125', revokeProjection],
	] as const)(
		'records the approved Manager restriction for %s without blocking legacy',
		async (_boundaryId, projection) => {
			const managerActor = { ...actor, memberRoles: ['manager'] }
			const result = await evaluateLabOSAuthorizationShadow({
				actor: managerActor,
				projection,
				evaluateLegacy: () => true,
			})

			expect(result.comparison).toBe('LEGACY_ALLOW_V1_DENY')
			expect(result.v1Decision).toEqual({
				status: 'completed',
				allowed: false,
				reason: 'AUTHZ_PERMISSION_NOT_GRANTED',
			})
			expect(result.enforcement).toEqual({ source: 'legacy', allowed: true })
		},
	)

	it('contains and records a V1 exception when legacy allows', async () => {
		const sensitiveMessage = 'database failed for staff@example.com'
		const failingService = serviceDecision(true)
		vi.mocked(failingService.can).mockImplementation(() => {
			throw new Error(sensitiveMessage)
		})
		const { monitor: testMonitor, record } = monitor()

		const result = await evaluateLabOSAuthorizationShadow(
			{
				actor,
				projection: revokeProjection,
				evaluateLegacy: () => true,
			},
			{ authorizationService: failingService, monitor: testMonitor },
		)

		expect(result).toEqual({
			boundaryId: 'A-125',
			correlationId: expect.any(String),
			comparison: 'LEGACY_ALLOW_V1_DENY',
			legacyDecision: { allowed: true },
			v1Decision: {
				status: 'failed',
				allowed: false,
				reason: LABOS_SHADOW_ERROR_CODES.V1_EVALUATION_FAILED,
			},
			enforcement: { source: 'legacy', allowed: true },
		})
		expect(record).toHaveBeenCalledWith(
			expect.objectContaining({
				v1Outcome: 'failed',
				severity: 'high',
			}),
		)
		expect(JSON.stringify(record.mock.calls)).not.toContain(sensitiveMessage)
	})

	it('evaluates V1 even when legacy denies and never permits the handler', async () => {
		const service = serviceDecision(true)
		const result = await evaluateLabOSAuthorizationShadow(
			{
				actor,
				projection: revokeProjection,
				evaluateLegacy: () => false,
			},
			{ authorizationService: service },
		)

		expect(service.can).toHaveBeenCalledOnce()
		expect(result.comparison).toBe('LEGACY_DENY_V1_ALLOW')
		expect(result.enforcement.allowed).toBe(false)
	})

	it('emits only allowlisted fields with normalized roles and trusted boundary metadata', async () => {
		const { monitor: testMonitor, record } = monitor()
		const sensitiveActor = {
			...actor,
			userId: 'secret-user-id',
			memberId: 'secret-member-id',
			memberRoles: [' OWNER ', 'unknown-provider-role', 'owner'],
		}
		const sensitiveProjection = projectLabOSActionBoundary('A-124', {
			staffId: 'secret-staff-id',
			email: 'private@example.com',
			roleToGrant: 'STAFF',
		})

		await evaluateLabOSAuthorizationShadow(
			{
				actor: sensitiveActor,
				projection: sensitiveProjection,
				evaluateLegacy: () => true,
			},
			{
				authorizationService: serviceDecision(true),
				monitor: testMonitor,
				generateCorrelationId: () => 'server-correlation-id',
			},
		)

		const event = record.mock.calls[0]?.[0]
		expect(event).toEqual({
			event: 'labos.authorization.shadow_comparison',
			boundaryId: 'A-124',
			actionName: 'Grant-Staff-System-Access',
			permission: 'staff.access.invite',
			organizationId: 'organization-1',
			actorRoles: ['owner'],
			unknownRoleCount: 1,
			legacyRequiredRole: 'ADMIN',
			correlationId: 'server-correlation-id',
			legacyOutcome: 'allowed',
			v1Outcome: 'allowed',
			v1Reason: 'POLICY_ALLOWED',
			comparison: 'MATCH_ALLOW',
			enforcementSource: 'legacy',
			severity: 'info',
			reviewPriority: 'routine',
			durationMs: expect.any(Number),
		})
		const serialized = JSON.stringify(event)
		for (const forbidden of [
			'secret-user-id',
			'secret-member-id',
			'secret-staff-id',
			'private@example.com',
			'unknown-provider-role',
		]) {
			expect(serialized).not.toContain(forbidden)
		}
	})

	it('fails closed with a sanitized error if the enforcing legacy gate fails', async () => {
		const { monitor: testMonitor, record } = monitor()
		const evaluation = evaluateLabOSAuthorizationShadow(
			{
				actor,
				projection: revokeProjection,
				evaluateLegacy: () => {
					throw new Error('secret legacy failure')
				},
			},
			{ authorizationService: serviceDecision(true), monitor: testMonitor },
		)

		await expect(evaluation).rejects.toEqual(
			expect.objectContaining({
				name: 'LabOSShadowLegacyEvaluationError',
				code: LABOS_SHADOW_ERROR_CODES.LEGACY_EVALUATION_FAILED,
				message: 'Authorization evaluation failed',
			}),
		)
		await expect(
			Promise.reject(new LabOSShadowLegacyEvaluationError()),
		).rejects.toBeInstanceOf(LabOSShadowLegacyEvaluationError)
		expect(record).toHaveBeenCalledWith(
			expect.objectContaining({ legacyOutcome: 'failed', severity: 'high' }),
		)
		expect(JSON.stringify(record.mock.calls)).not.toContain(
			'secret legacy failure',
		)
	})

	it('does not let monitoring failure alter the legacy enforcement result', async () => {
		const result = await evaluateLabOSAuthorizationShadow(
			{
				actor,
				projection: revokeProjection,
				evaluateLegacy: () => true,
			},
			{
				authorizationService: serviceDecision(false),
				monitor: { record: () => { throw new Error('monitor unavailable') } },
			},
		)

		expect(result.enforcement).toEqual({ source: 'legacy', allowed: true })
	})

	it('returns deeply immutable comparison and enforcement results', async () => {
		const result = await evaluateLabOSAuthorizationShadow(
			{
				actor,
				projection: revokeProjection,
				evaluateLegacy: () => true,
			},
			{ authorizationService: serviceDecision(true) },
		)

		expect(Object.isFrozen(result)).toBe(true)
		expect(Object.isFrozen(result.legacyDecision)).toBe(true)
		expect(Object.isFrozen(result.v1Decision)).toBe(true)
		expect(Object.isFrozen(result.enforcement)).toBe(true)
	})
})
