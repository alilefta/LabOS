import 'server-only'

import { after } from 'next/server'

import {
	createImmediateAxiomServerClient,
	readAxiomServerConfig,
} from '@/lib/axiom/axiom'

import type {
	LabOSShadowTelemetrySink,
	LabOSStructuredShadowTelemetryRecord,
} from './shadow-telemetry'

export type AxiomShadowIngestClient = Readonly<{
	ingest(
		dataset: string,
		record: LabOSStructuredShadowTelemetryRecord,
	): Promise<unknown>
}>

type DeliveryScheduler = (delivery: Promise<void>) => void

function scheduleAfterResponse(delivery: Promise<void>): void {
	try {
		after(delivery)
	} catch {
		// Outside a Next.js request (for example a local script), ingestion has
		// already started and remains safely detached from authorization.
	}
}

/**
 * Creates a fail-open observability adapter: the sanitized record is submitted
 * immediately, while Next.js keeps the request lifetime open long enough for
 * delivery. Provider failures are reduced to a generic callback and can never
 * change an authorization result or leak provider details into telemetry.
 */
export function createAxiomLabOSShadowTelemetrySink(options: {
	client: AxiomShadowIngestClient
	dataset: string
	schedule?: DeliveryScheduler
	onDeliveryFailure?: () => void
}): LabOSShadowTelemetrySink {
	const dataset = options.dataset.trim()
	if (!dataset) throw new Error('Axiom telemetry dataset is required')
	const schedule = options.schedule ?? scheduleAfterResponse

	return Object.freeze({
		write(record: LabOSStructuredShadowTelemetryRecord) {
			const delivery = options.client
				.ingest(dataset, record)
				.then(() => undefined)
				.catch(() => {
					options.onDeliveryFailure?.()
				})
			schedule(delivery)
		},
	})
}

/** Returns null when Axiom is intentionally unconfigured. */
export function createConfiguredAxiomLabOSShadowTelemetrySink(options: {
	onDeliveryFailure?: () => void
} = {}): LabOSShadowTelemetrySink | null {
	const config = readAxiomServerConfig()
	if (!config) return null

	return createAxiomLabOSShadowTelemetrySink({
		client: createImmediateAxiomServerClient(
			config,
			options.onDeliveryFailure,
		),
		dataset: config.dataset,
		onDeliveryFailure: options.onDeliveryFailure,
	})
}
