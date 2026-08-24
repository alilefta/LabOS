import { describe, expect, it, vi } from 'vitest'

import type {
	LabOSShadowComparisonMonitorEvent,
	LabOSShadowConfigurationFailureEvent,
} from '@/modules/labos-authorization/shadow-evaluation'
import {
	createLabOSShadowTelemetryAggregator,
	createStructuredLabOSShadowMonitor,
	type LabOSShadowTelemetrySink,
	type LabOSStructuredShadowTelemetryRecord,
} from '@/modules/labos-authorization/shadow-telemetry'

function comparison(
	overrides: Partial<LabOSShadowComparisonMonitorEvent> = {},
): LabOSShadowComparisonMonitorEvent {
	return {
		event: 'labos.authorization.shadow_comparison',
		boundaryId: 'A-124',
		actionName: 'Grant-Staff-System-Access',
		permission: 'staff.access.invite',
		organizationId: 'organization-1',
		actorRoles: ['owner'],
		unknownRoleCount: 0,
		legacyRequiredRole: 'ADMIN',
		correlationId: 'correlation-1',
		legacyOutcome: 'allowed',
		v1Outcome: 'allowed',
		v1Reason: 'POLICY_ALLOWED',
		comparison: 'MATCH_ALLOW',
		enforcementSource: 'legacy',
		severity: 'info',
		reviewPriority: 'routine',
		durationMs: 10,
		...overrides,
	}
}

function configurationFailure(): LabOSShadowConfigurationFailureEvent {
	return {
		event: 'labos.authorization.shadow_configuration_failure',
		boundaryId: 'A-124',
		actionName: 'Grant-Staff-System-Access',
		permission: 'staff.access.invite',
		organizationId: 'organization-1',
		correlationId: 'correlation-1',
		failureReason: 'AUTHZ_BOUNDARY_PROJECTOR_FAILED',
		enforcementSource: 'legacy',
		severity: 'high',
		reviewPriority: 'review',
	}
}

type TelemetryWrite = (record: LabOSStructuredShadowTelemetryRecord) => void

function fixture(options: { maxSeries?: number; sink?: LabOSShadowTelemetrySink } = {}) {
	const aggregator = createLabOSShadowTelemetryAggregator({
		maxSeries: options.maxSeries,
	})
	const write = vi.fn<TelemetryWrite>()
	const monitor = createStructuredLabOSShadowMonitor({
		sink: options.sink ?? { write },
		aggregator,
		now: () => new Date('2026-08-24T12:00:00.000Z'),
		environment: 'test',
	})
	return { aggregator, monitor, write }
}

describe('structured LabOS shadow telemetry', () => {
	it('emits a versioned immutable envelope with an exact sanitized payload', () => {
		const { monitor, write } = fixture()
		const unsafe = {
			...comparison(),
			targetId: 'secret-staff-id',
			email: 'private@example.com',
			providerError: 'provider exploded',
			financialValue: 99_999,
		}

		monitor.record(unsafe)

		const record = write.mock.calls[0]?.[0] as LabOSStructuredShadowTelemetryRecord
		expect(record).toEqual({
			schemaVersion: 1,
			service: 'labos',
			source: 'authorization-v1-shadow',
			environment: 'test',
			emittedAt: '2026-08-24T12:00:00.000Z',
			payload: comparison(),
		})
		expect(Object.isFrozen(record)).toBe(true)
		expect(Object.isFrozen(record.payload)).toBe(true)
		expect(record.payload.event).toBe(
			'labos.authorization.shadow_comparison',
		)
		if (record.payload.event === 'labos.authorization.shadow_comparison') {
			expect(Object.isFrozen(record.payload.actorRoles)).toBe(true)
		}
		const serialized = JSON.stringify(record)
		for (const forbidden of [
			'secret-staff-id',
			'private@example.com',
			'provider exploded',
			'99999',
		]) {
			expect(serialized).not.toContain(forbidden)
		}
	})

	it('aggregates safe low-cardinality dimensions and latency across Organizations', () => {
		const { monitor, aggregator } = fixture()
		monitor.record(comparison({
			organizationId: 'organization-a',
			correlationId: 'correlation-a',
			actorRoles: ['manager', 'owner'],
			durationMs: 10,
		}))
		monitor.record(comparison({
			organizationId: 'organization-b',
			correlationId: 'correlation-b',
			actorRoles: ['owner', 'manager'],
			durationMs: 30,
		}))

		expect(aggregator.snapshot()).toEqual({
			totalEvents: 2,
			droppedEvents: 0,
			deliveryFailures: 0,
			series: [
				expect.objectContaining({
					kind: 'comparison',
					boundaryId: 'A-124',
					actorRoles: ['manager', 'owner'],
					count: 2,
					totalDurationMs: 40,
					maxDurationMs: 30,
					averageDurationMs: 20,
				}),
			],
		})
		const serialized = JSON.stringify(aggregator.snapshot())
		expect(serialized).not.toContain('organization-a')
		expect(serialized).not.toContain('correlation-a')
	})

	it('separates divergence/failure series and bounds cardinality', () => {
		const { monitor, aggregator } = fixture({ maxSeries: 2 })
		monitor.record(comparison())
		monitor.record(comparison({
			legacyOutcome: 'denied',
			v1Outcome: 'allowed',
			comparison: 'LEGACY_DENY_V1_ALLOW',
			severity: 'high',
			reviewPriority: 'highest',
		}))
		monitor.record(configurationFailure())

		const snapshot = aggregator.snapshot()
		expect(snapshot.totalEvents).toBe(3)
		expect(snapshot.series).toHaveLength(2)
		expect(snapshot.droppedEvents).toBe(1)
		expect(snapshot.series).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					comparison: 'LEGACY_DENY_V1_ALLOW',
					reviewPriority: 'highest',
				}),
			]),
		)
	})

	it('isolates sink failures and exposes their aggregate count', () => {
		const write = vi.fn<TelemetryWrite>(() => {
			throw new Error('monitor provider unavailable')
		})
		const { monitor, aggregator } = fixture({ sink: { write } })

		expect(() => monitor.record(comparison())).not.toThrow()
		expect(aggregator.snapshot()).toEqual(
			expect.objectContaining({ totalEvents: 1, deliveryFailures: 1 }),
	)
	})

	it('resets process-local aggregate state without affecting the sink', () => {
		const { monitor, aggregator, write } = fixture()
		monitor.record(configurationFailure())
		aggregator.reset()

		expect(aggregator.snapshot()).toEqual({
			totalEvents: 0,
			droppedEvents: 0,
			deliveryFailures: 0,
			series: [],
		})
		expect(write).toHaveBeenCalledOnce()
	})
})
