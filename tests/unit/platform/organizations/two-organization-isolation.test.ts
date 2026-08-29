import { describe, expect, it, vi } from 'vitest'

import {
	revokeStaffOrganizationAccess,
	type StaffAccessRevocationDependencies,
} from '@/lib/staff-access-revocation'
import {
	linkLabStaffToMember,
	type StaffMemberLinkDependencies,
} from '@/lib/staff-member-link'
import {
	processAcceptedStaffInvitation,
	type AcceptedStaffInvitationDependencies,
} from '@/lib/staff-invitation/accept-staff-invitation.service'
import {
	createStaffOrganizationInvitation,
	type CreateStaffInvitationDependencies,
} from '@/lib/staff-invitation/create-staff-invitation.service'
import type { PlatformSession } from '@/platform/auth/session'
import type {
	OrganizationService,
	ResolvedOrganizationTenant,
} from '@/platform/organizations/organization.service'
import {
	resolveTenantContext,
	TENANT_CONTEXT_ERROR_CODES,
} from '@/platform/organizations/tenant-context'

const createdAt = new Date('2026-08-22T00:00:00.000Z')
const userId = 'user-shared'
const organizationA = 'organization-a'
const organizationB = 'organization-b'
const labA = 'lab-a'
const labB = 'lab-b'
const memberA = 'member-a'
const memberB = 'member-b'
const staffA = 'staff-a'
const staffB = 'staff-b'

function session(activeOrganizationId: string): PlatformSession {
	return {
		user: {
			id: userId,
			name: 'Shared User',
		},
		session: {
			activeOrganizationId,
		},
	}
}

function organizationFixture(input: {
	organizationId: string
	labId: string
	memberId: string
	staffId: string
}): ResolvedOrganizationTenant {
	return {
		organization: {
			id: input.organizationId,
			name: `Organization ${input.organizationId.at(-1)?.toUpperCase()}`,
			slug: input.organizationId,
			logo: null,
			metadata: null,
			createdAt,
		},
		membership: {
			id: input.memberId,
			organizationId: input.organizationId,
			userId,
			role: 'admin',
			createdAt,
			labStaff: {
				id: input.staffId,
				labId: input.labId,
				isActive: true,
			},
		},
		lab: {
			id: input.labId,
			organizationId: input.organizationId,
			title: `Lab ${input.labId.at(-1)?.toUpperCase()}`,
			slug: input.labId,
		},
	}
}

const fixtures = new Map<string, ResolvedOrganizationTenant>([
	[
		organizationA,
		organizationFixture({
			organizationId: organizationA,
			labId: labA,
			memberId: memberA,
			staffId: staffA,
		}),
	],
	[
		organizationB,
		organizationFixture({
			organizationId: organizationB,
			labId: labB,
			memberId: memberB,
			staffId: staffB,
		}),
	],
])

function twoOrganizationService(): OrganizationService {
	return {
		resolveTenant: vi.fn(async ({ userId: requestedUser, organizationId }) => {
			if (requestedUser !== userId) return null
			return fixtures.get(organizationId) ?? null
		}),
	}
}

describe('two-Organization tenant isolation', () => {
	it('switches the same AuthUser between isolated Member, Lab, and staff contexts', async () => {
		const organizations = twoOrganizationService()

		const contextA = await resolveTenantContext(session(organizationA), organizations)
		const contextB = await resolveTenantContext(session(organizationB), organizations)

		expect(contextA).toMatchObject({
			organizationId: organizationA,
			labId: labA,
			memberId: memberA,
			staffId: staffA,
		})
		expect(contextB).toMatchObject({
			organizationId: organizationB,
			labId: labB,
			memberId: memberB,
			staffId: staffB,
		})
		expect(contextA.labId).not.toBe(contextB.labId)
	})

	it('does not fall back to Organization B when active Organization A membership is missing', async () => {
		const organizations = twoOrganizationService()
		vi.mocked(organizations.resolveTenant).mockImplementation(
			async ({ organizationId }) => {
				const fixture = fixtures.get(organizationId)
				if (!fixture) return null
				return organizationId === organizationA
					? { ...fixture, membership: null }
					: fixture
			},
		)

		const error = await resolveTenantContext(
			session(organizationA),
			organizations,
		).catch((reason: unknown) => reason)
		expect(error).toMatchObject({
			code: TENANT_CONTEXT_ERROR_CODES.MEMBERSHIP_REQUIRED,
		})
		expect(organizations.resolveTenant).toHaveBeenCalledTimes(1)
		expect(organizations.resolveTenant).toHaveBeenCalledWith({
			userId,
			organizationId: organizationA,
		})
	})

	it('rejects linking Organization B staff/member IDs inside Organization A context', async () => {
		const setMember = vi.fn()
		const dependencies: StaffMemberLinkDependencies = {
			repository: {
				readState: vi.fn(async () => ({ staff: null, member: null })),
				setMember,
			},
			monitor: { record: vi.fn() },
			now: vi.fn().mockReturnValueOnce(100).mockReturnValue(110),
		}

		await expect(
			linkLabStaffToMember(
				{
					tenant: { organizationId: organizationA, labId: labA },
					staffId: staffB,
					memberId: memberB,
				},
				dependencies,
			),
		).rejects.toMatchObject({ code: 'STAFF_MEMBER_LINK_STAFF_NOT_FOUND' })
		expect(setMember).not.toHaveBeenCalled()
	})
})

describe('two-Organization invitation isolation', () => {
	it('does not create an Organization A invitation for a Lab B staff record', async () => {
		const create = vi.fn()
		const dependencies: CreateStaffInvitationDependencies = {
			repository: {
				findState: vi.fn(async () => ({ staff: null, intent: null })),
				saveIntent: vi.fn(),
				deleteIntent: vi.fn(),
				resolveAcceptance: vi.fn(),
			},
			gateway: { create, cancel: vi.fn() },
			monitor: { record: vi.fn() },
			now: vi.fn().mockReturnValueOnce(100).mockReturnValue(110),
			currentDate: () => createdAt,
		}

		await expect(
			createStaffOrganizationInvitation(
				{
					tenant: { organizationId: organizationA, labId: labA },
					staffId: staffB,
					email: 'staff-b@example.com',
					role: 'STAFF',
					requestHeaders: new Headers(),
				},
				dependencies,
			),
		).rejects.toMatchObject({ code: 'STAFF_INVITATION_STAFF_NOT_FOUND' })
		expect(create).not.toHaveBeenCalled()
	})

	it('does not consume Organization B staff intent during Organization A acceptance', async () => {
		const linkStaff = vi.fn()
		const deleteIntent = vi.fn()
		const dependencies: AcceptedStaffInvitationDependencies = {
			repository: {
				findState: vi.fn(),
				saveIntent: vi.fn(),
				deleteIntent,
				resolveAcceptance: vi.fn(async () => ({
					intent: {
						invitationId: 'invitation-a',
						labId: labB,
						staffId: staffB,
					},
					organizationLabId: labA,
				})),
			},
			monitor: { record: vi.fn() },
			linkStaff,
			now: vi.fn().mockReturnValueOnce(100).mockReturnValue(110),
		}

		await expect(
			processAcceptedStaffInvitation(
				{
					invitationId: 'invitation-a',
					organizationId: organizationA,
					memberId: memberA,
				},
				dependencies,
			),
		).rejects.toMatchObject({ code: 'STAFF_INVITATION_TENANT_MISMATCH' })
		expect(linkStaff).not.toHaveBeenCalled()
		expect(deleteIntent).not.toHaveBeenCalled()
	})
})

describe('two-Organization revocation isolation', () => {
	it('revokes Organization A without removing Organization B membership or staff link', async () => {
		const memberships = new Set([
			`${organizationA}:${memberA}`,
			`${organizationB}:${memberB}`,
		])
		const staffLinks = new Map([
			[staffA, memberA],
			[staffB, memberB],
		])
		const dependencies: StaffAccessRevocationDependencies = {
			removeMembership: vi.fn(async ({ organizationId, memberId }) => {
				memberships.delete(`${organizationId}:${memberId}`)
			}),
			unlinkStaff: vi.fn(async ({ tenant, staffId }) => {
				if (tenant.organizationId !== organizationA || tenant.labId !== labA) {
					throw new Error('unexpected tenant')
				}
				staffLinks.set(staffId, '')
				return { status: 'unlinked' as const, staffId, memberId: null }
			}),
			monitor: { record: vi.fn() },
			now: vi.fn().mockReturnValueOnce(100).mockReturnValue(110),
		}

		await revokeStaffOrganizationAccess(
			{
				tenant: { organizationId: organizationA, labId: labA },
				staffId: staffA,
				memberId: memberA,
				requestHeaders: new Headers(),
			},
			dependencies,
		)

		expect(memberships.has(`${organizationA}:${memberA}`)).toBe(false)
		expect(staffLinks.get(staffA)).toBe('')
		expect(memberships.has(`${organizationB}:${memberB}`)).toBe(true)
		expect(staffLinks.get(staffB)).toBe(memberB)
	})
})
