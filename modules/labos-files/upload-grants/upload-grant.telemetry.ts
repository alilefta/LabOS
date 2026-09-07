import 'server-only'

import { after } from 'next/server'

import {
	createImmediateAxiomServerClient,
	readAxiomServerConfig,
} from '@/lib/axiom/axiom'

import type { UploadGrantLifecycleEvent } from './upload-grant.types'

export const UPLOAD_GRANT_TELEMETRY_SCHEMA_VERSION = 1 as const

export interface UploadGrantMonitor {
	record(event: UploadGrantLifecycleEvent): void
}

export type StructuredUploadGrantTelemetryRecord = Readonly<{
	schemaVersion: typeof UPLOAD_GRANT_TELEMETRY_SCHEMA_VERSION
	service: 'labos'
	source: 'authorization-v1-file-upload-grants'
	environment: 'development' | 'test' | 'production'
	emittedAt: string
	payload: UploadGrantLifecycleEvent & Readonly<{ severity: 'info' | 'high' }>
}>

export interface UploadGrantTelemetrySink {
	write(record: StructuredUploadGrantTelemetryRecord): void
}

export type UploadGrantAxiomClient = Readonly<{
	ingest(
		dataset: string,
		record: StructuredUploadGrantTelemetryRecord,
	): Promise<unknown>
}>

type DeliveryScheduler = (delivery: Promise<void>) => void

function scheduleAfterResponse(delivery: Promise<void>): void {
	try {
		after(delivery)
	} catch {
		// Delivery has already started outside a Next.js request.
	}
}

function sanitizeUploadGrantEvent(
	event: UploadGrantLifecycleEvent,
): StructuredUploadGrantTelemetryRecord['payload'] {
	return Object.freeze({
		event: 'labos.file_upload_grant',
		boundaryId: event.boundaryId,
		purpose: event.purpose,
		...(event.targetType && { targetType: event.targetType }),
		correlationId: event.correlationId,
		phase: event.phase,
		outcome: event.outcome,
		reason: event.reason,
		durationMs: Math.max(0, event.durationMs),
		severity: event.outcome === 'failed' ? 'high' : 'info',
	})
}

export function createStructuredUploadGrantMonitor(options: {
	sink: UploadGrantTelemetrySink
	now?: () => Date
	environment?: StructuredUploadGrantTelemetryRecord['environment']
}): UploadGrantMonitor {
	const now = options.now ?? (() => new Date())
	return Object.freeze({
		record(event: UploadGrantLifecycleEvent) {
			const record = Object.freeze({
				schemaVersion: UPLOAD_GRANT_TELEMETRY_SCHEMA_VERSION,
				service: 'labos' as const,
				source: 'authorization-v1-file-upload-grants' as const,
				environment: options.environment ?? 'production',
				emittedAt: now().toISOString(),
				payload: sanitizeUploadGrantEvent(event),
			})
			try {
				options.sink.write(record)
			} catch {
				// Monitoring cannot change a grant lifecycle decision.
			}
		},
	})
}

export function createAxiomUploadGrantTelemetrySink(options: {
	client: UploadGrantAxiomClient
	dataset: string
	schedule?: DeliveryScheduler
	onDeliveryFailure?: () => void
}): UploadGrantTelemetrySink {
	const dataset = options.dataset.trim()
	if (!dataset) throw new Error('Axiom telemetry dataset is required')
	const schedule = options.schedule ?? scheduleAfterResponse

	return Object.freeze({
		write(record: StructuredUploadGrantTelemetryRecord) {
			const delivery = options.client
				.ingest(dataset, record)
				.then(() => undefined)
				.catch(() => options.onDeliveryFailure?.())
			schedule(delivery)
		},
	})
}

export const consoleUploadGrantTelemetrySink: UploadGrantTelemetrySink = {
	write(record) {
		const writer = record.payload.severity === 'high' ? console.warn : console.info
		writer(record)
	},
}

function createDefaultUploadGrantSink(): UploadGrantTelemetrySink {
	if (process.env.NODE_ENV === 'test') return consoleUploadGrantTelemetrySink
	try {
		const config = readAxiomServerConfig()
		if (!config) return consoleUploadGrantTelemetrySink
		return createAxiomUploadGrantTelemetrySink({
			client: createImmediateAxiomServerClient(config),
			dataset: config.dataset,
			onDeliveryFailure: () =>
				console.error('[Observability] Upload grant telemetry delivery failed'),
		})
	} catch {
		console.error('[Observability] Upload grant telemetry is misconfigured')
		return consoleUploadGrantTelemetrySink
	}
}

export const structuredUploadGrantMonitor = createStructuredUploadGrantMonitor({
	sink: createDefaultUploadGrantSink(),
	environment:
		process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
			? process.env.NODE_ENV
			: 'production',
})
