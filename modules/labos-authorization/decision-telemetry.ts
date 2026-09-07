import 'server-only'

import { after } from 'next/server'

import {
	createImmediateAxiomServerClient,
	readAxiomServerConfig,
} from '@/lib/axiom/axiom'
import type {
	AuthorizationMonitor,
	AuthorizationMonitorEvent,
} from '@/platform/authorization'

import type { LabOSPermission } from './permissions'
import type { LabOSResourceType } from './resource-types'
import type { LabOSOrganizationRole } from './roles'

export const LABOS_AUTHORIZATION_DECISION_SCHEMA_VERSION = 1 as const

export type LabOSAuthorizationDecisionEvent = AuthorizationMonitorEvent<
	LabOSPermission,
	LabOSOrganizationRole,
	LabOSResourceType
>

export type StructuredLabOSAuthorizationDecisionRecord = Readonly<{
	schemaVersion: typeof LABOS_AUTHORIZATION_DECISION_SCHEMA_VERSION
	service: 'labos'
	source: 'authorization-v1-decisions'
	environment: 'development' | 'test' | 'production'
	emittedAt: string
	payload: LabOSAuthorizationDecisionEvent
}>

export interface LabOSAuthorizationDecisionTelemetrySink {
	write(record: StructuredLabOSAuthorizationDecisionRecord): void
}

export type LabOSAuthorizationDecisionAxiomClient = Readonly<{
	ingest(
		dataset: string,
		record: StructuredLabOSAuthorizationDecisionRecord,
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

/** Rebuilds the event from the approved low-cardinality server labels only. */
function sanitizeDecisionEvent(
	event: LabOSAuthorizationDecisionEvent,
): LabOSAuthorizationDecisionEvent {
	return Object.freeze({
		event: 'platform.authorization.decision',
		...(event.boundaryId && { boundaryId: event.boundaryId }),
		permission: event.permission,
		...(event.sensitivity && { sensitivity: event.sensitivity }),
		...(event.organizationId && { organizationId: event.organizationId }),
		roles: Object.freeze([...event.roles]),
		unknownRoleCount: event.unknownRoleCount,
		...(event.targetType && { targetType: event.targetType }),
		...(event.correlationId && { correlationId: event.correlationId }),
		outcome: event.outcome,
		severity: event.severity,
		reason: event.reason,
		durationMs: Math.max(0, event.durationMs),
	})
}

export function createStructuredLabOSAuthorizationDecisionMonitor(options: {
	sink: LabOSAuthorizationDecisionTelemetrySink
	now?: () => Date
	environment?: StructuredLabOSAuthorizationDecisionRecord['environment']
}): AuthorizationMonitor<
	LabOSPermission,
	LabOSOrganizationRole,
	LabOSResourceType
> {
	const now = options.now ?? (() => new Date())
	return Object.freeze({
		record(event: LabOSAuthorizationDecisionEvent) {
			const record = Object.freeze({
				schemaVersion: LABOS_AUTHORIZATION_DECISION_SCHEMA_VERSION,
				service: 'labos' as const,
				source: 'authorization-v1-decisions' as const,
				environment: options.environment ?? 'production',
				emittedAt: now().toISOString(),
				payload: sanitizeDecisionEvent(event),
			})
			try {
				options.sink.write(record)
			} catch {
				// Monitoring can never alter an authorization result.
			}
		},
	})
}

export function createAxiomLabOSAuthorizationDecisionTelemetrySink(options: {
	client: LabOSAuthorizationDecisionAxiomClient
	dataset: string
	schedule?: DeliveryScheduler
	onDeliveryFailure?: () => void
}): LabOSAuthorizationDecisionTelemetrySink {
	const dataset = options.dataset.trim()
	if (!dataset) throw new Error('Axiom telemetry dataset is required')
	const schedule = options.schedule ?? scheduleAfterResponse

	return Object.freeze({
		write(record: StructuredLabOSAuthorizationDecisionRecord) {
			const delivery = options.client
				.ingest(dataset, record)
				.then(() => undefined)
				.catch(() => options.onDeliveryFailure?.())
			schedule(delivery)
		},
	})
}

export const consoleLabOSAuthorizationDecisionTelemetrySink: LabOSAuthorizationDecisionTelemetrySink =
	{
		write(record) {
			const writer =
				record.payload.severity === 'high'
					? console.error
					: record.payload.outcome === 'denied'
						? console.warn
						: console.info
			writer(record)
		},
	}

function createDefaultDecisionSink(): LabOSAuthorizationDecisionTelemetrySink {
	if (process.env.NODE_ENV === 'test') {
		return consoleLabOSAuthorizationDecisionTelemetrySink
	}
	try {
		const config = readAxiomServerConfig()
		if (!config) return consoleLabOSAuthorizationDecisionTelemetrySink
		return createAxiomLabOSAuthorizationDecisionTelemetrySink({
			client: createImmediateAxiomServerClient(config),
			dataset: config.dataset,
			onDeliveryFailure: () =>
				console.error('[Observability] Authorization decision delivery failed'),
		})
	} catch {
		console.error('[Observability] Authorization decision telemetry is misconfigured')
		return consoleLabOSAuthorizationDecisionTelemetrySink
	}
}

export const structuredLabOSAuthorizationDecisionMonitor =
	createStructuredLabOSAuthorizationDecisionMonitor({
		sink: createDefaultDecisionSink(),
		environment:
			process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
				? process.env.NODE_ENV
				: 'production',
	})
