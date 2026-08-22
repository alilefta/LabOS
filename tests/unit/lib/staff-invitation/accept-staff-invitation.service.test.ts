import { describe, expect, it, vi } from 'vitest'

import {
	processAcceptedStaffInvitation,
	type AcceptedStaffInvitationDependencies,
} from '@/lib/staff-invitation/accept-staff-invitation.service'
import type {
	StaffInvitationMonitor,
	StaffInvitationMonitorEvent,
} from '@/lib/staff-invitation/staff-invitation.monitor'
import type { StaffInvitationRepository } from '@/lib/staff-invitation/staff-invitation.repository'
import {
	STAFF_INVITATION_ERROR_CODES,
	StaffInvitationError,
} from '@/lib/staff-invitation/staff-invitation.types'

const input = {
	invitationId: 'invitation-1',
	organizationId: 'organization-1',
	memberId: 'member-1',
}

function createHarness(options?: {
	intent?: { invitationId: string; labId: string; staffId: string } | null
	organizationLabId?: string | null
	linkError?: Error
	linkStatus?: 'linked' | 'existing'
}) {
	const events: StaffInvitationMonitorEvent[] = []
	const repository: StaffInvitationRepository = {
		findState: vi.fn(),
		saveIntent: vi.fn(),
		deleteIntent: vi.fn(async () => undefined),
		resolveAcceptance: vi.fn(async () => ({
			intent:
				options?.intent === undefined
					? { invitationId: input.invitationId, labId: 'lab-1', staffId: 'staff-1' }
					: options.intent,
			organizationLabId:
				options?.organizationLabId === undefined
					? 'lab-1'
					: options.organizationLabId,
		})),
	}
	const monitor: StaffInvitationMonitor = {
		record: vi.fn((event) => events.push(event)),
	}
	const linkStaff = vi.fn(async () => {
		if (options?.linkError) throw options.linkError
		return {
			status: options?.linkStatus ?? 'linked',
			staffId: 'staff-1',
			memberId: 'member-1',
		}
	})
	const dependencies: AcceptedStaffInvitationDependencies = {
		repository,
		monitor,
		linkStaff,
		now: vi.fn().mockReturnValueOnce(100).mockReturnValue(110),
	}
	return { dependencies, repository, linkStaff, events }
}

describe('processAcceptedStaffInvitation', () => {
	it('allows ordinary Organization invitations with no LabStaff intent', async () => {
		const harness = createHarness({ intent: null })

		await expect(
			processAcceptedStaffInvitation(input, harness.dependencies),
		).resolves.toEqual({ status: 'no_intent', staffId: null })
		expect(harness.linkStaff).not.toHaveBeenCalled()
		expect(harness.repository.deleteIntent).not.toHaveBeenCalled()
	})

	it('links tenant-compatible staff and removes consumed intent', async () => {
		const harness = createHarness()

		await expect(
			processAcceptedStaffInvitation(input, harness.dependencies),
		).resolves.toEqual({ status: 'linked', staffId: 'staff-1' })
		expect(harness.linkStaff).toHaveBeenCalledWith({
			tenant: { organizationId: 'organization-1', labId: 'lab-1' },
			staffId: 'staff-1',
			memberId: 'member-1',
		})
		expect(harness.repository.deleteIntent).toHaveBeenCalledWith('invitation-1')
		expect(harness.events.at(-1)).toMatchObject({ outcome: 'linked', durationMs: 10 })
	})

	it('consumes intent when an acceptance retry finds the exact link already exists', async () => {
		const harness = createHarness({ linkStatus: 'existing' })

		await expect(
			processAcceptedStaffInvitation(input, harness.dependencies),
		).resolves.toEqual({ status: 'linked', staffId: 'staff-1' })
		expect(harness.linkStaff).toHaveBeenCalledOnce()
		expect(harness.repository.deleteIntent).toHaveBeenCalledWith('invitation-1')
		expect(harness.events.at(-1)).toMatchObject({ outcome: 'linked' })
	})

	it('rejects cross-tenant intent without linking or consuming it', async () => {
		const harness = createHarness({ organizationLabId: 'lab-2' })

		const error = await processAcceptedStaffInvitation(
			input,
			harness.dependencies,
		).catch((reason: unknown) => reason)
		expect(error).toBeInstanceOf(StaffInvitationError)
		expect(error).toMatchObject({ code: STAFF_INVITATION_ERROR_CODES.TENANT_MISMATCH })
		expect(harness.linkStaff).not.toHaveBeenCalled()
		expect(harness.repository.deleteIntent).not.toHaveBeenCalled()
	})

	it('retains intent for reconciliation when staff linking fails', async () => {
		const harness = createHarness({ linkError: new Error('write conflict') })

		const error = await processAcceptedStaffInvitation(
			input,
			harness.dependencies,
		).catch((reason: unknown) => reason)
		expect(error).toMatchObject({
			code: STAFF_INVITATION_ERROR_CODES.ACCEPTANCE_LINK_FAILED,
		})
		expect(harness.repository.deleteIntent).not.toHaveBeenCalled()
		expect(harness.events.at(-1)).toMatchObject({ outcome: 'failed' })
	})
})
