import { describe, expect, it, vi } from 'vitest'

import {
	createAxiomLabOSAuthorizationDecisionTelemetrySink,
	createStructuredLabOSAuthorizationDecisionMonitor,
	type LabOSAuthorizationDecisionAxiomClient,
	type StructuredLabOSAuthorizationDecisionRecord,
} from '@/modules/labos-authorization/decision-telemetry'

const record: StructuredLabOSAuthorizationDecisionRecord = Object.freeze({
	schemaVersion: 1,
	service: 'labos',
	source: 'authorization-v1-decisions',
	environment: 'test',
	emittedAt: '2026-09-03T00:00:00.000Z',
	payload: Object.freeze({
		event: 'platform.authorization.decision',
		boundaryId: 'A-086',
		permission: 'invoice.overdue.sync',
		sensitivity: 'critical',
		organizationId: 'organization-a',
		roles: Object.freeze(['owner'] as const),
		unknownRoleCount: 0,
		correlationId: 'correlation-1',
		outcome: 'allowed',
		severity: 'info',
		reason: 'ROLE_PERMISSION',
		durationMs: 1,
	}),
})

describe('LabOS authorization decision telemetry', () => {
	it('reconstructs an exact allowlisted event and discards runtime extras', () => {
		const write = vi.fn()
		const monitor = createStructuredLabOSAuthorizationDecisionMonitor({
			sink: { write },
			now: () => new Date('2026-09-03T00:00:00.000Z'),
			environment: 'test',
		})

		monitor.record({
			...record.payload,
			roles: ['owner'],
			amount: 999,
			email: 'private@example.com',
			token: 'secret-token',
			error: new Error('provider detail'),
		} as never)

		expect(write).toHaveBeenCalledWith(record)
		expect(JSON.stringify(write.mock.calls[0][0])).not.toContain('private')
		expect(JSON.stringify(write.mock.calls[0][0])).not.toContain('999')
		expect(JSON.stringify(write.mock.calls[0][0])).not.toContain('secret-token')
		expect(JSON.stringify(write.mock.calls[0][0])).not.toContain('provider detail')
	})

	it('submits the sanitized record to Axiom', async () => {
		const ingest = vi
			.fn<LabOSAuthorizationDecisionAxiomClient['ingest']>()
			.mockResolvedValue({})
		const scheduled: Promise<void>[] = []
		const sink = createAxiomLabOSAuthorizationDecisionTelemetrySink({
			client: { ingest },
			dataset: 'labos-authorization',
			schedule: (delivery) => scheduled.push(delivery),
		})

		sink.write(record)
		await Promise.all(scheduled)
		expect(ingest).toHaveBeenCalledWith('labos-authorization', record)
	})

	it('isolates rejected ingestion and rejects invalid datasets', async () => {
		const onDeliveryFailure = vi.fn()
		const scheduled: Promise<void>[] = []
		const sink = createAxiomLabOSAuthorizationDecisionTelemetrySink({
			client: { ingest: vi.fn().mockRejectedValue(new Error('provider secret')) },
			dataset: 'labos-authorization',
			schedule: (delivery) => scheduled.push(delivery),
			onDeliveryFailure,
		})
		expect(() => sink.write(record)).not.toThrow()
		await Promise.all(scheduled)
		expect(onDeliveryFailure).toHaveBeenCalledOnce()

		expect(() =>
			createAxiomLabOSAuthorizationDecisionTelemetrySink({
				client: { ingest: vi.fn() },
				dataset: '   ',
			}),
		).toThrow('Axiom telemetry dataset is required')
	})
})
