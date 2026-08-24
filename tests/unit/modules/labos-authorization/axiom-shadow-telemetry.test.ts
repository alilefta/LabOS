import { describe, expect, it, vi } from 'vitest'

import {
	createAxiomLabOSShadowTelemetrySink,
	type AxiomShadowIngestClient,
} from '@/modules/labos-authorization/axiom-shadow-telemetry'
import type { LabOSStructuredShadowTelemetryRecord } from '@/modules/labos-authorization/shadow-telemetry'

const record: LabOSStructuredShadowTelemetryRecord = Object.freeze({
	schemaVersion: 1,
	service: 'labos',
	source: 'authorization-v1-shadow',
	environment: 'test',
	emittedAt: '2026-08-24T12:00:00.000Z',
	payload: Object.freeze({
		event: 'labos.authorization.shadow_configuration_failure',
		boundaryId: 'A-124',
		correlationId: 'correlation-1',
		failureReason: 'AUTHZ_BOUNDARY_NOT_REGISTERED',
		enforcementSource: 'legacy',
		severity: 'high',
		reviewPriority: 'review',
	}),
})

describe('Axiom LabOS shadow telemetry sink', () => {
	it('submits the exact sanitized envelope to the configured dataset', async () => {
		const ingest = vi.fn<AxiomShadowIngestClient['ingest']>().mockResolvedValue({})
		const scheduled: Promise<void>[] = []
		const sink = createAxiomLabOSShadowTelemetrySink({
			client: { ingest },
			dataset: 'labos-authorization-shadow',
			schedule: (delivery) => scheduled.push(delivery),
		})

		sink.write(record)
		await Promise.all(scheduled)

		expect(ingest).toHaveBeenCalledOnce()
		expect(ingest).toHaveBeenCalledWith(
			'labos-authorization-shadow',
			record,
		)
	})

	it('isolates asynchronous provider failures and reports only failure state', async () => {
		const ingest = vi
			.fn<AxiomShadowIngestClient['ingest']>()
			.mockRejectedValue(new Error('secret provider response'))
		const onDeliveryFailure = vi.fn()
		const scheduled: Promise<void>[] = []
		const sink = createAxiomLabOSShadowTelemetrySink({
			client: { ingest },
			dataset: 'labos-authorization-shadow',
			schedule: (delivery) => scheduled.push(delivery),
			onDeliveryFailure,
		})

		expect(() => sink.write(record)).not.toThrow()
		await Promise.all(scheduled)

		expect(onDeliveryFailure).toHaveBeenCalledOnce()
	})

	it('rejects an empty dataset before accepting records', () => {
		expect(() =>
			createAxiomLabOSShadowTelemetrySink({
				client: { ingest: vi.fn() },
				dataset: '   ',
			}),
		).toThrow('Axiom telemetry dataset is required')
	})
})
