import { describe, expect, it, vi } from 'vitest'

import type {
	StaffMemberLinkMonitor,
	StaffMemberLinkMonitorEvent,
} from '@/lib/staff-member-link/staff-member-link.monitor'
import type { StaffMemberLinkRepository } from '@/lib/staff-member-link/staff-member-link.repository'
import {
	linkLabStaffToMember,
	type StaffMemberLinkDependencies,
	unlinkLabStaffFromMember,
} from '@/lib/staff-member-link/staff-member-link.service'
import {
	STAFF_MEMBER_LINK_ERROR_CODES,
	StaffMemberLinkError,
	type StaffMemberLinkState,
} from '@/lib/staff-member-link/staff-member-link.types'

const tenant = { organizationId: 'organization-1', labId: 'lab-1' }
const linkInput = { tenant, staffId: 'staff-1', memberId: 'member-1' }

const unlinkedState: StaffMemberLinkState = {
	staff: {
		id: 'staff-1',
		labId: 'lab-1',
		memberId: null,
		isActive: true,
	},
	member: {
		id: 'member-1',
		organizationId: 'organization-1',
		linkedStaffId: null,
	},
}

const linkedState: StaffMemberLinkState = {
	staff: { ...unlinkedState.staff!, memberId: 'member-1' },
	member: { ...unlinkedState.member!, linkedStaffId: 'staff-1' },
}

function createHarness(options?: {
	states?: StaffMemberLinkState[]
	writeError?: Error
}) {
	const states = [...(options?.states ?? [unlinkedState])]
	const events: StaffMemberLinkMonitorEvent[] = []
	const repository: StaffMemberLinkRepository = {
		readState: vi.fn(async () => states.shift() ?? unlinkedState),
		setMember: vi.fn(async () => {
			if (options?.writeError) throw options.writeError
		}),
	}
	const monitor: StaffMemberLinkMonitor = {
		record: vi.fn((event) => events.push(event)),
	}
	const dependencies: StaffMemberLinkDependencies = {
		repository,
		monitor,
		now: vi.fn().mockReturnValueOnce(100).mockReturnValue(112),
	}
	return { dependencies, repository, events }
}

async function expectLinkError(promise: Promise<unknown>, code: string) {
	const error = await promise.catch((reason: unknown) => reason)
	expect(error).toBeInstanceOf(StaffMemberLinkError)
	expect(error).toMatchObject({ code })
}

describe('linkLabStaffToMember', () => {
	it('links tenant-compatible staff and membership records', async () => {
		const harness = createHarness()

		await expect(
			linkLabStaffToMember(linkInput, harness.dependencies),
		).resolves.toEqual({
			status: 'linked',
			staffId: 'staff-1',
			memberId: 'member-1',
		})
		expect(harness.repository.setMember).toHaveBeenCalledWith({
			tenant,
			staffId: 'staff-1',
			expectedMemberId: null,
			memberId: 'member-1',
		})
		expect(harness.events.at(-1)).toMatchObject({
			outcome: 'linked',
			durationMs: 12,
		})
	})

	it('is idempotent when the exact link already exists', async () => {
		const harness = createHarness({ states: [linkedState] })

		await expect(
			linkLabStaffToMember(linkInput, harness.dependencies),
		).resolves.toMatchObject({ status: 'existing' })
		expect(harness.repository.setMember).not.toHaveBeenCalled()
	})

	it('does not reveal an out-of-tenant or missing staff record', async () => {
		const harness = createHarness({
			states: [{ ...unlinkedState, staff: null }],
		})

		await expectLinkError(
			linkLabStaffToMember(linkInput, harness.dependencies),
			STAFF_MEMBER_LINK_ERROR_CODES.STAFF_NOT_FOUND,
		)
	})

	it('does not reveal an out-of-tenant or missing Member record', async () => {
		const harness = createHarness({
			states: [{ ...unlinkedState, member: null }],
		})

		await expectLinkError(
			linkLabStaffToMember(linkInput, harness.dependencies),
			STAFF_MEMBER_LINK_ERROR_CODES.MEMBER_NOT_FOUND,
		)
	})

	it('refuses to replace either side of an existing one-to-one link', async () => {
		const staffLinkedElsewhere = createHarness({
			states: [
				{
					...unlinkedState,
					staff: { ...unlinkedState.staff!, memberId: 'member-2' },
				},
			],
		})
		await expectLinkError(
			linkLabStaffToMember(linkInput, staffLinkedElsewhere.dependencies),
			STAFF_MEMBER_LINK_ERROR_CODES.STAFF_ALREADY_LINKED,
		)

		const memberLinkedElsewhere = createHarness({
			states: [
				{
					...unlinkedState,
					member: { ...unlinkedState.member!, linkedStaffId: 'staff-2' },
				},
			],
		})
		await expectLinkError(
			linkLabStaffToMember(linkInput, memberLinkedElsewhere.dependencies),
			STAFF_MEMBER_LINK_ERROR_CODES.MEMBER_ALREADY_LINKED,
		)
	})

	it('accepts an exact link completed by a concurrent request', async () => {
		const harness = createHarness({
			states: [unlinkedState, linkedState],
			writeError: new Error('unique constraint'),
		})

		await expect(
			linkLabStaffToMember(linkInput, harness.dependencies),
		).resolves.toMatchObject({ status: 'linked' })
		expect(harness.repository.readState).toHaveBeenCalledTimes(2)
	})

	it('reports a stable conflict when a concurrent writer creates another link', async () => {
		const harness = createHarness({
			states: [
				unlinkedState,
				{
					...unlinkedState,
					member: { ...unlinkedState.member!, linkedStaffId: 'staff-2' },
				},
			],
			writeError: new Error('unique constraint'),
		})

		await expectLinkError(
			linkLabStaffToMember(linkInput, harness.dependencies),
			STAFF_MEMBER_LINK_ERROR_CODES.CONCURRENT_CONFLICT,
		)
		expect(harness.events.at(-1)).toMatchObject({
			outcome: 'failed',
			errorCode: STAFF_MEMBER_LINK_ERROR_CODES.CONCURRENT_CONFLICT,
		})
	})
})

describe('unlinkLabStaffFromMember', () => {
	it('removes only the digital link and preserves the staff record', async () => {
		const harness = createHarness({ states: [linkedState] })

		await expect(
			unlinkLabStaffFromMember(
				{ tenant, staffId: 'staff-1' },
				harness.dependencies,
			),
		).resolves.toEqual({
			status: 'unlinked',
			staffId: 'staff-1',
			memberId: null,
		})
		expect(harness.repository.setMember).toHaveBeenCalledWith({
			tenant,
			staffId: 'staff-1',
			expectedMemberId: 'member-1',
			memberId: null,
		})
	})

	it('is idempotent for staff without a digital account', async () => {
		const harness = createHarness()

		await expect(
			unlinkLabStaffFromMember(
				{ tenant, staffId: 'staff-1' },
				harness.dependencies,
			),
		).resolves.toMatchObject({ status: 'existing', memberId: null })
		expect(harness.repository.setMember).not.toHaveBeenCalled()
	})
})
