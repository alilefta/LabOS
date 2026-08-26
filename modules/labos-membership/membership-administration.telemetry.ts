import 'server-only'

import { after } from 'next/server'

import {
	createImmediateAxiomServerClient,
	readAxiomServerConfig,
} from '@/lib/axiom/axiom'

export const MEMBERSHIP_ADMINISTRATION_TELEMETRY_SCHEMA_VERSION = 1 as const

export type MembershipAdministrationMonitorEvent = Readonly<{
	event: 'labos.membership_administration'
	boundaryId: 'M-002' | 'M-003' | 'M-004'
	permission:
		| 'membership.role.update'
		| 'membership.remove'
		| 'membership.invite'
	organizationId: string
	correlationId: string
	outcome: 'started' | 'completed' | 'failed'
	phase?: 'authorization' | 'provider'
	durationMs?: number
}>

export interface MembershipAdministrationMonitor {
	record(event: MembershipAdministrationMonitorEvent): void
}

export type StructuredMembershipAdministrationRecord = Readonly<{
	schemaVersion: typeof MEMBERSHIP_ADMINISTRATION_TELEMETRY_SCHEMA_VERSION
	service: 'labos'
	source: 'authorization-v1-membership-administration'
	environment: 'development' | 'test' | 'production'
	emittedAt: string
	payload: MembershipAdministrationMonitorEvent &
		Readonly<{ severity: 'info' | 'high' }>
}>

export interface MembershipAdministrationTelemetrySink {
	/** Starts delivery synchronously; failures must never affect the command. */
	write(record: StructuredMembershipAdministrationRecord): void
}

export type MembershipAdministrationAxiomClient = Readonly<{
	ingest(
		dataset: string,
		record: StructuredMembershipAdministrationRecord,
	): Promise<unknown>
}>

type DeliveryScheduler = (delivery: Promise<void>) => void

function scheduleAfterResponse(delivery: Promise<void>): void {
	try {
		after(delivery)
	} catch {
		// Ingestion has already started when invoked outside a Next.js request.
	}
}

/**
 * Reconstructs the command event from an explicit allowlist. Runtime extras,
 * including Member IDs, role intent, emails, headers, inputs, and provider
 * errors, are discarded before the record reaches any telemetry sink.
 */
function sanitizeMembershipAdministrationEvent(
	event: MembershipAdministrationMonitorEvent,
): StructuredMembershipAdministrationRecord['payload'] {
	return Object.freeze({
		event: 'labos.membership_administration',
		boundaryId: event.boundaryId,
		permission: event.permission,
		organizationId: event.organizationId,
		correlationId: event.correlationId,
		outcome: event.outcome,
		...(event.phase && { phase: event.phase }),
		...(event.durationMs !== undefined && {
			durationMs: Math.max(0, event.durationMs),
		}),
		severity: event.outcome === 'failed' ? 'high' : 'info',
	})
}

export function createStructuredMembershipAdministrationMonitor(options: {
	sink: MembershipAdministrationTelemetrySink
	now?: () => Date
	environment?: StructuredMembershipAdministrationRecord['environment']
}): MembershipAdministrationMonitor {
	const now = options.now ?? (() => new Date())
	return Object.freeze({
		record(event: MembershipAdministrationMonitorEvent) {
			const record = Object.freeze({
				schemaVersion: MEMBERSHIP_ADMINISTRATION_TELEMETRY_SCHEMA_VERSION,
				service: 'labos' as const,
				source: 'authorization-v1-membership-administration' as const,
				environment: options.environment ?? 'production',
				emittedAt: now().toISOString(),
				payload: sanitizeMembershipAdministrationEvent(event),
			})
			try {
				options.sink.write(record)
			} catch {
				// Observability failures never change authorization or provider results.
			}
		},
	})
}

export function createAxiomMembershipAdministrationTelemetrySink(options: {
	client: MembershipAdministrationAxiomClient
	dataset: string
	schedule?: DeliveryScheduler
	onDeliveryFailure?: () => void
}): MembershipAdministrationTelemetrySink {
	const dataset = options.dataset.trim()
	if (!dataset) throw new Error('Axiom telemetry dataset is required')
	const schedule = options.schedule ?? scheduleAfterResponse

	return Object.freeze({
		write(record: StructuredMembershipAdministrationRecord) {
			const delivery = options.client
				.ingest(dataset, record)
				.then(() => undefined)
				.catch(() => options.onDeliveryFailure?.())
			schedule(delivery)
		},
	})
}

export const consoleMembershipAdministrationTelemetrySink: MembershipAdministrationTelemetrySink =
	{
		write(record) {
			const writer = record.payload.severity === 'high' ? console.warn : console.info
			writer(record)
		},
	}

function createDefaultMembershipAdministrationTelemetrySink(): MembershipAdministrationTelemetrySink {
	if (process.env.NODE_ENV === 'test') {
		return consoleMembershipAdministrationTelemetrySink
	}

	try {
		const config = readAxiomServerConfig()
		if (!config) return consoleMembershipAdministrationTelemetrySink
		return createAxiomMembershipAdministrationTelemetrySink({
			client: createImmediateAxiomServerClient(config),
			dataset: config.dataset,
			onDeliveryFailure: () =>
				console.error('[Observability] Membership telemetry delivery failed'),
		})
	} catch {
		console.error('[Observability] Membership telemetry is misconfigured')
		return consoleMembershipAdministrationTelemetrySink
	}
}

export const structuredMembershipAdministrationMonitor =
	createStructuredMembershipAdministrationMonitor({
		sink: createDefaultMembershipAdministrationTelemetrySink(),
		environment:
			process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
				? process.env.NODE_ENV
				: 'production',
	})
