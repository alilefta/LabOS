import { describe, expect, it, vi } from 'vitest'

import {
	createAxiomUploadGrantTelemetrySink,
	createStructuredUploadGrantMonitor,
	type UploadGrantAxiomClient,
	type UploadGrantTelemetrySink,
} from '@/modules/labos-files/upload-grants'

const safeEvent = {
	event: 'labos.file_upload_grant',
	boundaryId: 'N-FILE-TEST',
	purpose: 'catalog.image.create.stage',
	targetType: 'category',
	correlationId: 'correlation-1',
	phase: 'creation',
	outcome: 'completed',
	reason: 'UPLOAD_GRANT_CREATED',
	durationMs: 4,
} as const

describe('Upload grant telemetry', () => {
	it('reconstructs an allowlisted record and removes unsafe runtime extras', () => {
		const write = vi.fn<UploadGrantTelemetrySink['write']>()
		const monitor = createStructuredUploadGrantMonitor({
			sink: { write },
			now: () => new Date('2026-09-04T12:00:00.000Z'),
			environment: 'test',
		})

		monitor.record({
			...safeEvent,
			uploadGrantId: 'grant-secret',
			providerFileKey: 'provider-secret',
			providerFileUrl: 'https://provider.example/secret',
			memberId: 'member-secret',
			labId: 'lab-secret',
			fileName: 'patient-name.scan',
			providerError: new Error('raw provider failure'),
		} as unknown as Parameters<typeof monitor.record>[0])

		const record = write.mock.calls[0][0]
		expect(record).toEqual({
			schemaVersion: 1,
			service: 'labos',
			source: 'authorization-v1-file-upload-grants',
			environment: 'test',
			emittedAt: '2026-09-04T12:00:00.000Z',
			payload: { ...safeEvent, severity: 'info' },
		})
		expect(JSON.stringify(record)).not.toMatch(
			/grant-secret|provider-secret|patient-name|member-secret|lab-secret|raw provider/i,
		)
	})

	it('isolates a synchronous sink failure', () => {
		const monitor = createStructuredUploadGrantMonitor({
			sink: { write: () => { throw new Error('sink failed') } },
		})

		expect(() => monitor.record(safeEvent)).not.toThrow()
	})

	it('emits only allowlisted fields for callback and consumption lifecycle records', () => {
		const write = vi.fn<UploadGrantTelemetrySink['write']>()
		const monitor = createStructuredUploadGrantMonitor({
			sink: { write },
			environment: 'test',
		})

		for (const event of [
			{
				...safeEvent,
				phase: 'provider_completion' as const,
				reason: 'UPLOAD_GRANT_PROVIDER_COMPLETED' as const,
			},
			{
				...safeEvent,
				phase: 'consumption' as const,
				reason: 'UPLOAD_GRANT_CONSUMED' as const,
			},
		]) {
			const adversarialEvent = {
				...event,
				uploadGrantId: 'grant-secret',
				providerFileUrl: 'https://provider.example/secret',
				memberId: 'member-secret',
			}
			monitor.record(adversarialEvent)
		}

		for (const emitted of write.mock.calls.map(([value]) => value)) {
			expect(Object.keys(emitted.payload)).toEqual([
				'event',
				'boundaryId',
				'purpose',
				'targetType',
				'correlationId',
				'phase',
				'outcome',
				'reason',
				'durationMs',
				'severity',
			])
			expect(JSON.stringify(emitted)).not.toMatch(
				/grant-secret|provider\.example|member-secret/i,
			)
		}
	})

	it('starts Axiom ingestion and isolates rejected delivery', async () => {
		const ingest = vi
			.fn<UploadGrantAxiomClient['ingest']>()
			.mockRejectedValue(new Error('axiom unavailable'))
		const scheduled: Promise<void>[] = []
		const onDeliveryFailure = vi.fn()
		const sink = createAxiomUploadGrantTelemetrySink({
			client: { ingest },
			dataset: 'labos-events',
			schedule: (delivery) => scheduled.push(delivery),
			onDeliveryFailure,
		})
		const monitor = createStructuredUploadGrantMonitor({ sink })

		expect(() => monitor.record(safeEvent)).not.toThrow()
		expect(ingest).toHaveBeenCalledOnce()
		await Promise.all(scheduled)
		expect(onDeliveryFailure).toHaveBeenCalledOnce()
	})

	it('rejects an empty Axiom dataset', () => {
		expect(() =>
			createAxiomUploadGrantTelemetrySink({
				client: { ingest: vi.fn() },
				dataset: '  ',
			}),
		).toThrow('Axiom telemetry dataset is required')
	})
})

