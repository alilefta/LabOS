import { describe, expect, it, vi } from 'vitest'

import {
	createAxiomMembershipAdministrationTelemetrySink,
	createStructuredMembershipAdministrationMonitor,
	type MembershipAdministrationAxiomClient,
	type MembershipAdministrationTelemetrySink,
	type StructuredMembershipAdministrationRecord,
} from '@/modules/labos-membership/membership-administration.telemetry'

describe('membership administration structured telemetry', () => {
	it('emits a versioned, sanitized record and discards runtime extras', () => {
		const write = vi.fn<(record: StructuredMembershipAdministrationRecord) => void>()
		const sink: MembershipAdministrationTelemetrySink = { write }
		const monitor = createStructuredMembershipAdministrationMonitor({
			sink,
			now: () => new Date('2026-08-25T12:00:00.000Z'),
			environment: 'development',
		})

		monitor.record({
			event: 'labos.membership_administration',
			boundaryId: 'M-002',
			permission: 'membership.role.update',
			organizationId: 'organization-a',
			correlationId: 'correlation-a',
			outcome: 'completed',
			phase: 'provider',
			durationMs: 12,
			memberId: 'forbidden-member',
			email: 'private@example.test',
			roles: ['owner'],
			providerError: 'private failure',
		} as never)

		expect(write).toHaveBeenCalledWith({
			schemaVersion: 1,
			service: 'labos',
			source: 'authorization-v1-membership-administration',
			environment: 'development',
			emittedAt: '2026-08-25T12:00:00.000Z',
			payload: {
				event: 'labos.membership_administration',
				boundaryId: 'M-002',
				permission: 'membership.role.update',
				organizationId: 'organization-a',
				correlationId: 'correlation-a',
				outcome: 'completed',
				phase: 'provider',
				durationMs: 12,
				severity: 'info',
			},
		})
		const emittedRecord = write.mock.calls[0]?.[0]
		expect(emittedRecord).toBeDefined()
		const serialized = JSON.stringify(emittedRecord)
		expect(serialized).not.toContain('forbidden-member')
		expect(serialized).not.toContain('private@example.test')
		expect(serialized).not.toContain('owner')
		expect(serialized).not.toContain('private failure')
	})

	it('marks failures high severity and isolates sink failures', () => {
		const write = vi.fn<(record: StructuredMembershipAdministrationRecord) => void>(() => {
			throw new Error('sink failed')
		})
		const monitor = createStructuredMembershipAdministrationMonitor({
			sink: { write },
		})

		expect(() =>
			monitor.record({
				event: 'labos.membership_administration',
				boundaryId: 'M-003',
				permission: 'membership.remove',
				organizationId: 'organization-a',
				correlationId: 'correlation-a',
				outcome: 'failed',
				phase: 'authorization',
			}),
		).not.toThrow()
		expect(write.mock.calls[0]?.[0].payload.severity).toBe('high')
	})

	it('redacts recipient and requested-role data from M-004 telemetry', () => {
		const write = vi.fn<(record: StructuredMembershipAdministrationRecord) => void>()
		const monitor = createStructuredMembershipAdministrationMonitor({
			sink: { write },
		})

		monitor.record({
			event: 'labos.membership_administration',
			boundaryId: 'M-004',
			permission: 'membership.invite',
			organizationId: 'organization-a',
			correlationId: 'correlation-invite',
			outcome: 'completed',
			phase: 'provider',
			email: 'private@example.test',
			requestedRole: 'admin',
			invitationId: 'private-invitation',
		} as never)

		const record = write.mock.calls[0]?.[0]
		const serialized = JSON.stringify(record)
		expect(serialized).toContain('M-004')
		expect(serialized).not.toContain('private@example.test')
		expect(serialized).not.toContain('private-invitation')
		expect(record?.payload).not.toHaveProperty('requestedRole')
		expect(record?.payload).not.toHaveProperty('email')
		expect(record?.payload).not.toHaveProperty('invitationId')
	})

	it('starts immediate Axiom ingestion and isolates delivery rejection', async () => {
		const ingest = vi
			.fn<MembershipAdministrationAxiomClient['ingest']>()
			.mockRejectedValue(new Error('provider details'))
		const schedule = vi.fn()
		const onDeliveryFailure = vi.fn()
		const sink = createAxiomMembershipAdministrationTelemetrySink({
			client: { ingest },
			dataset: 'labos-authorization-shadow',
			schedule,
			onDeliveryFailure,
		})
		const monitor = createStructuredMembershipAdministrationMonitor({ sink })

		monitor.record({
			event: 'labos.membership_administration',
			boundaryId: 'M-003',
			permission: 'membership.remove',
			organizationId: 'organization-a',
			correlationId: 'correlation-a',
			outcome: 'started',
		})

		expect(ingest).toHaveBeenCalledTimes(1)
		expect(schedule).toHaveBeenCalledTimes(1)
		await schedule.mock.calls[0]?.[0]
		expect(onDeliveryFailure).toHaveBeenCalledTimes(1)
	})
})
