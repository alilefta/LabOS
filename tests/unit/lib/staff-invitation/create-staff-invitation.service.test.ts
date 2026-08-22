import { describe, expect, it, vi } from 'vitest'

import {
	createStaffOrganizationInvitation,
	type CreateStaffInvitationDependencies,
} from '@/lib/staff-invitation/create-staff-invitation.service'
import type { StaffInvitationGateway } from '@/lib/staff-invitation/staff-invitation.gateway'
import type {
	StaffInvitationMonitor,
	StaffInvitationMonitorEvent,
} from '@/lib/staff-invitation/staff-invitation.monitor'
import type { StaffInvitationRepository } from '@/lib/staff-invitation/staff-invitation.repository'
import {
	STAFF_INVITATION_ERROR_CODES,
	StaffInvitationError,
	type OrganizationInvitationRecord,
	type StaffInvitationState,
} from '@/lib/staff-invitation/staff-invitation.types'

const now = new Date('2026-08-21T12:00:00.000Z')
const tenant = { organizationId: 'organization-1', labId: 'lab-1' }
const input = {
	tenant,
	staffId: 'staff-1',
	email: ' Staff@Example.com ',
	role: 'ADMIN' as const,
	requestHeaders: new Headers({ cookie: 'session=redacted' }),
}
const invitation: OrganizationInvitationRecord = {
	id: 'invitation-1',
	organizationId: tenant.organizationId,
	email: 'staff@example.com',
	role: 'admin',
	status: 'pending',
	expiresAt: new Date('2026-08-23T12:00:00.000Z'),
}
const baseState: StaffInvitationState = {
	staff: { id: 'staff-1', labId: tenant.labId, memberId: null },
	intent: null,
}

function createHarness(options?: {
	state?: StaffInvitationState
	createError?: Error
	saveError?: Error
}) {
	const events: StaffInvitationMonitorEvent[] = []
	const repository: StaffInvitationRepository = {
		findState: vi.fn(async () => options?.state ?? baseState),
		saveIntent: vi.fn(async () => {
			if (options?.saveError) throw options.saveError
		}),
		deleteIntent: vi.fn(async () => undefined),
		resolveAcceptance: vi.fn(),
	}
	const gateway: StaffInvitationGateway = {
		create: vi.fn(async () => {
			if (options?.createError) throw options.createError
			return invitation
		}),
		cancel: vi.fn(async () => undefined),
	}
	const monitor: StaffInvitationMonitor = {
		record: vi.fn((event) => events.push(event)),
	}
	const dependencies: CreateStaffInvitationDependencies = {
		repository,
		gateway,
		monitor,
		now: vi.fn().mockReturnValueOnce(100).mockReturnValue(112),
		currentDate: () => now,
	}
	return { dependencies, repository, gateway, events }
}

async function expectInvitationError(promise: Promise<unknown>, code: string) {
	const error = await promise.catch((reason: unknown) => reason)
	expect(error).toBeInstanceOf(StaffInvitationError)
	expect(error).toMatchObject({ code })
}

describe('createStaffOrganizationInvitation', () => {
	it('creates a Better Auth invitation and persists optional staff intent', async () => {
		const harness = createHarness()

		await expect(
			createStaffOrganizationInvitation(input, harness.dependencies),
		).resolves.toEqual({ status: 'created', invitation })
		expect(harness.gateway.create).toHaveBeenCalledWith({
			email: 'staff@example.com',
			role: 'admin',
			organizationId: tenant.organizationId,
			resend: false,
			requestHeaders: input.requestHeaders,
		})
		expect(harness.repository.saveIntent).toHaveBeenCalledWith({
			tenant,
			staffId: 'staff-1',
			invitationId: invitation.id,
		})
		expect(harness.events.at(-1)).toMatchObject({
			outcome: 'created',
			durationMs: 12,
		})
	})

	it('resends the exact pending invitation idempotently', async () => {
		const harness = createHarness({
			state: {
				...baseState,
				intent: { invitationId: invitation.id, invitation },
			},
		})

		await expect(
			createStaffOrganizationInvitation(input, harness.dependencies),
		).resolves.toMatchObject({ status: 'resent' })
		expect(harness.gateway.create).toHaveBeenCalledWith(
			expect.objectContaining({ resend: true }),
		)
		expect(harness.gateway.cancel).not.toHaveBeenCalled()
	})

	it('replaces a pending invitation when email or role changes', async () => {
		const oldInvitation = { ...invitation, email: 'old@example.com' }
		const harness = createHarness({
			state: {
				...baseState,
				intent: { invitationId: oldInvitation.id, invitation: oldInvitation },
			},
		})

		await createStaffOrganizationInvitation(input, harness.dependencies)
		expect(harness.gateway.cancel).toHaveBeenCalledWith({
			invitationId: oldInvitation.id,
			requestHeaders: input.requestHeaders,
		})
		expect(harness.repository.deleteIntent).toHaveBeenCalledWith(oldInvitation.id)
	})

	it('rejects owner invitations and records a stable failure code', async () => {
		const harness = createHarness()

		await expectInvitationError(
			createStaffOrganizationInvitation(
				{ ...input, role: 'OWNER' },
				harness.dependencies,
			),
			STAFF_INVITATION_ERROR_CODES.OWNER_ROLE_FORBIDDEN,
		)
		expect(harness.gateway.create).not.toHaveBeenCalled()
		expect(harness.events.at(-1)).toMatchObject({
			outcome: 'failed',
			errorCode: STAFF_INVITATION_ERROR_CODES.OWNER_ROLE_FORBIDDEN,
		})
	})

	it('cancels the new invitation if intent persistence fails', async () => {
		const harness = createHarness({ saveError: new Error('database unavailable') })

		await expectInvitationError(
			createStaffOrganizationInvitation(input, harness.dependencies),
			STAFF_INVITATION_ERROR_CODES.INTENT_PERSISTENCE_FAILED,
		)
		expect(harness.gateway.cancel).toHaveBeenCalledWith({
			invitationId: invitation.id,
			requestHeaders: input.requestHeaders,
		})
	})
})
