import 'server-only'

import type {
	LabOSShadowComparisonMonitorEvent,
	LabOSShadowConfigurationFailureEvent,
	LabOSShadowMonitor,
	LabOSShadowMonitorEvent,
} from './shadow-evaluation'
import { createConfiguredAxiomLabOSShadowTelemetrySink } from './axiom-shadow-telemetry'

export const LABOS_SHADOW_TELEMETRY_SCHEMA_VERSION = 1 as const

export type LabOSStructuredShadowTelemetryRecord = Readonly<{
	schemaVersion: typeof LABOS_SHADOW_TELEMETRY_SCHEMA_VERSION
	service: 'labos'
	source: 'authorization-v1-shadow'
	environment: 'development' | 'test' | 'production'
	emittedAt: string
	payload: LabOSShadowMonitorEvent
}>

export interface LabOSShadowTelemetrySink {
	/** Must enqueue/write synchronously; failures are isolated by the adapter. */
	write(record: LabOSStructuredShadowTelemetryRecord): void
}

export type LabOSShadowAggregateSeries = Readonly<{
	kind: 'comparison' | 'configuration_failure'
	boundaryId: string
	actionName?: string
	permission?: string
	actorRoles?: readonly string[]
	legacyRequiredRole?: string | null
	legacyOutcome?: string
	v1Outcome?: string
	v1Reason?: string
	comparison?: string
	failureReason?: string
	severity: string
	reviewPriority: string
	count: number
	totalDurationMs: number
	maxDurationMs: number
	averageDurationMs: number
}>

export type LabOSShadowAggregateSnapshot = Readonly<{
	totalEvents: number
	droppedEvents: number
	deliveryFailures: number
	series: readonly LabOSShadowAggregateSeries[]
}>

export interface LabOSShadowTelemetryAggregator {
	record(record: LabOSStructuredShadowTelemetryRecord): void
	recordDeliveryFailure(): void
	snapshot(): LabOSShadowAggregateSnapshot
	reset(): void
}

type MutableSeries = Omit<
	LabOSShadowAggregateSeries,
	'count' | 'totalDurationMs' | 'maxDurationMs' | 'averageDurationMs'
> & {
	count: number
	totalDurationMs: number
	maxDurationMs: number
}

function sanitizeComparison(
	event: LabOSShadowComparisonMonitorEvent,
): LabOSShadowComparisonMonitorEvent {
	return Object.freeze({
		event: 'labos.authorization.shadow_comparison',
		boundaryId: event.boundaryId,
		actionName: event.actionName,
		permission: event.permission,
		organizationId: event.organizationId,
		actorRoles: Object.freeze([...event.actorRoles]),
		unknownRoleCount: event.unknownRoleCount,
		legacyRequiredRole: event.legacyRequiredRole,
		correlationId: event.correlationId,
		legacyOutcome: event.legacyOutcome,
		v1Outcome: event.v1Outcome,
		v1Reason: event.v1Reason,
		...(event.comparison && { comparison: event.comparison }),
		enforcementSource: event.enforcementSource,
		severity: event.severity,
		reviewPriority: event.reviewPriority,
		durationMs: event.durationMs,
	})
}

function sanitizeConfigurationFailure(
	event: LabOSShadowConfigurationFailureEvent,
): LabOSShadowConfigurationFailureEvent {
	return Object.freeze({
		event: 'labos.authorization.shadow_configuration_failure',
		boundaryId: event.boundaryId,
		...(event.actionName && { actionName: event.actionName }),
		...(event.permission && { permission: event.permission }),
		...(event.organizationId && { organizationId: event.organizationId }),
		correlationId: event.correlationId,
		failureReason: event.failureReason,
		enforcementSource: event.enforcementSource,
		severity: 'high',
		reviewPriority: 'review',
	})
}

function sanitizeEvent(event: LabOSShadowMonitorEvent): LabOSShadowMonitorEvent {
	return event.event === 'labos.authorization.shadow_comparison'
		? sanitizeComparison(event)
		: sanitizeConfigurationFailure(event)
}

function createSeries(record: LabOSStructuredShadowTelemetryRecord): MutableSeries {
	const event = record.payload
	if (event.event === 'labos.authorization.shadow_configuration_failure') {
		return {
			kind: 'configuration_failure',
			boundaryId: event.boundaryId,
			actionName: event.actionName,
			permission: event.permission,
			failureReason: event.failureReason,
			severity: event.severity,
			reviewPriority: event.reviewPriority,
			count: 0,
			totalDurationMs: 0,
			maxDurationMs: 0,
		}
	}

	return {
		kind: 'comparison',
		boundaryId: event.boundaryId,
		actionName: event.actionName,
		permission: event.permission,
		actorRoles: Object.freeze([...event.actorRoles].sort()),
		legacyRequiredRole: event.legacyRequiredRole,
		legacyOutcome: event.legacyOutcome,
		v1Outcome: event.v1Outcome,
		v1Reason: event.v1Reason,
		comparison: event.comparison,
		severity: event.severity,
		reviewPriority: event.reviewPriority,
		count: 0,
		totalDurationMs: 0,
		maxDurationMs: 0,
	}
}

function seriesKey(series: MutableSeries): string {
	return JSON.stringify([
		series.kind,
		series.boundaryId,
		series.actionName,
		series.permission,
		series.actorRoles,
		series.legacyRequiredRole,
		series.legacyOutcome,
		series.v1Outcome,
		series.v1Reason,
		series.comparison,
		series.failureReason,
		series.severity,
		series.reviewPriority,
	])
}

/**
 * Creates a bounded, process-local aggregate. It is diagnostic support, not a
 * durable or distributed metrics store. Organization/correlation identifiers
 * are intentionally excluded from series dimensions.
 */
export function createLabOSShadowTelemetryAggregator(options: {
	maxSeries?: number
} = {}): LabOSShadowTelemetryAggregator {
	const maxSeries = Math.max(1, options.maxSeries ?? 256)
	const seriesByKey = new Map<string, MutableSeries>()
	let totalEvents = 0
	let droppedEvents = 0
	let deliveryFailures = 0

	return {
		record(record) {
			totalEvents += 1
			const candidate = createSeries(record)
			const key = seriesKey(candidate)
			let series = seriesByKey.get(key)
			if (!series) {
				if (seriesByKey.size >= maxSeries) {
					droppedEvents += 1
					return
				}
				series = candidate
				seriesByKey.set(key, series)
			}
			const duration =
				record.payload.event === 'labos.authorization.shadow_comparison'
					? Math.max(0, record.payload.durationMs)
					: 0
			series.count += 1
			series.totalDurationMs += duration
			series.maxDurationMs = Math.max(series.maxDurationMs, duration)
		},
		recordDeliveryFailure() {
			deliveryFailures += 1
		},
		snapshot() {
			return Object.freeze({
				totalEvents,
				droppedEvents,
				deliveryFailures,
				series: Object.freeze(
					[...seriesByKey.values()]
						.map((series) =>
							Object.freeze({
								...series,
								actorRoles: series.actorRoles
									? Object.freeze([...series.actorRoles])
									: undefined,
								averageDurationMs:
									series.count === 0
										? 0
										: series.totalDurationMs / series.count,
							}),
						)
						.sort((left, right) =>
							seriesKey(left).localeCompare(seriesKey(right)),
						),
				),
			})
		},
		reset() {
			seriesByKey.clear()
			totalEvents = 0
			droppedEvents = 0
			deliveryFailures = 0
		},
	}
}

/** Console fallback for tests, local development, and missing provider config. */
export const consoleLabOSShadowTelemetrySink: LabOSShadowTelemetrySink = {
	write(record) {
		const writer =
			record.payload.severity === 'high'
				? console.error
				: record.payload.severity === 'warning'
					? console.warn
					: console.info
		writer(record)
	},
}

export function createStructuredLabOSShadowMonitor(options: {
	sink: LabOSShadowTelemetrySink
	aggregator?: LabOSShadowTelemetryAggregator
	now?: () => Date
	environment?: LabOSStructuredShadowTelemetryRecord['environment']
}): LabOSShadowMonitor {
	const now = options.now ?? (() => new Date())
	return {
		record(event) {
			const record = Object.freeze({
				schemaVersion: LABOS_SHADOW_TELEMETRY_SCHEMA_VERSION,
				service: 'labos' as const,
				source: 'authorization-v1-shadow' as const,
				environment: options.environment ?? 'production',
				emittedAt: now().toISOString(),
				payload: sanitizeEvent(event),
			})
			try {
				options.aggregator?.record(record)
			} catch {
				// Aggregation must never stop event delivery or authorization.
			}
			try {
				options.sink.write(record)
			} catch {
				try {
					options.aggregator?.recordDeliveryFailure()
				} catch {
					// Telemetry failure never alters authorization behavior.
				}
			}
		},
	}
}

export const labosShadowTelemetryAggregator =
	createLabOSShadowTelemetryAggregator()

function createDefaultLabOSShadowTelemetrySink(): LabOSShadowTelemetrySink {
	if (process.env.NODE_ENV === 'test') return consoleLabOSShadowTelemetrySink

	try {
		return (
			createConfiguredAxiomLabOSShadowTelemetrySink({
				onDeliveryFailure: () =>
					labosShadowTelemetryAggregator.recordDeliveryFailure(),
			}) ?? consoleLabOSShadowTelemetrySink
		)
	} catch {
		// Configuration/provider details are deliberately excluded from logs.
		console.error('[Observability] Axiom shadow telemetry is misconfigured')
		return consoleLabOSShadowTelemetrySink
	}
}

export const structuredLabOSShadowMonitor =
	createStructuredLabOSShadowMonitor({
		sink: createDefaultLabOSShadowTelemetrySink(),
		aggregator: labosShadowTelemetryAggregator,
		environment:
			process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
				? process.env.NODE_ENV
				: 'production',
	})

export function getLabOSShadowTelemetrySnapshot() {
	return labosShadowTelemetryAggregator.snapshot()
}
