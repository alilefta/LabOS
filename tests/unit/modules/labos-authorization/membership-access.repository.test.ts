import { beforeEach, describe, expect, it, vi } from 'vitest'

const prisma = vi.hoisted(() => ({
	labStaff: {
		findUnique: vi.fn(),
		findFirst: vi.fn(),
	},
	member: {
		findUnique: vi.fn(),
		findFirst: vi.fn(),
	},
}))

vi.mock('@/lib/prisma', () => ({ generalPrisma: prisma }))

import {
	MEMBER_ORGANIZATION_BOUNDARY_SELECT,
	MEMBERSHIP_ADMINISTRATION_FACTS_SELECT,
	prismaMemberOrganizationBoundaryLookup,
	prismaMembershipAccessFactRepository,
	prismaStaffOrganizationBoundaryLookup,
	STAFF_ACCESS_FACTS_SELECT,
	STAFF_ORGANIZATION_BOUNDARY_SELECT,
} from '@/modules/labos-authorization/adapters/prisma/membership-access.repository'

describe('Prisma membership authorization repository', () => {
	beforeEach(() => vi.clearAllMocks())

	it('resolves Staff and Member boundaries with minimal identifier-only queries', async () => {
		prisma.labStaff.findUnique.mockResolvedValue({
			lab: { organizationId: 'organization-2' },
		})
		prisma.member.findUnique.mockResolvedValue({
			organizationId: 'organization-3',
		})

		await expect(
			prismaStaffOrganizationBoundaryLookup.findOrganizationBoundary('staff-1'),
		).resolves.toEqual({ organizationId: 'organization-2' })
		await expect(
			prismaMemberOrganizationBoundaryLookup.findOrganizationBoundary('member-1'),
		).resolves.toEqual({ organizationId: 'organization-3' })

		expect(prisma.labStaff.findUnique).toHaveBeenCalledWith({
			where: { id: 'staff-1' },
			select: STAFF_ORGANIZATION_BOUNDARY_SELECT,
		})
		expect(prisma.member.findUnique).toHaveBeenCalledWith({
			where: { id: 'member-1' },
			select: MEMBER_ORGANIZATION_BOUNDARY_SELECT,
		})
	})

	it('loads tenant-scoped Staff-access facts and only the invitation email needed for idempotency', async () => {
		prisma.labStaff.findFirst.mockResolvedValue({
			id: 'staff-1',
			labId: 'lab-1',
			isActive: true,
			lab: { organizationId: 'organization-1' },
			member: null,
			organizationInvitationIntent: null,
		})

		await expect(
			prismaMembershipAccessFactRepository.findStaffAccessFacts({
				organizationId: 'organization-1',
				staffId: 'staff-1',
			}),
		).resolves.toMatchObject({
			staffId: 'staff-1',
			organizationId: 'organization-1',
		})
		expect(prisma.labStaff.findFirst).toHaveBeenCalledWith({
			where: {
				id: 'staff-1',
				lab: { organizationId: 'organization-1' },
			},
			select: STAFF_ACCESS_FACTS_SELECT,
		})
		expect(STAFF_ACCESS_FACTS_SELECT).not.toHaveProperty('firstName')
		expect(STAFF_ACCESS_FACTS_SELECT).not.toHaveProperty('phoneNumber')
		expect(STAFF_ACCESS_FACTS_SELECT).not.toHaveProperty('commissionValue')
		expect(
			STAFF_ACCESS_FACTS_SELECT.organizationInvitationIntent.select.invitation
				.select,
		).toHaveProperty('email', true)
	})

	it('loads only identity and role facts for a tenant-scoped Member target', async () => {
		prisma.member.findFirst.mockResolvedValue({
			id: 'member-2',
			organizationId: 'organization-1',
			userId: 'user-2',
			role: 'staff',
			labStaff: null,
		})

		await expect(
			prismaMembershipAccessFactRepository.findMembershipAdministrationFacts({
				organizationId: 'organization-1',
				memberId: 'member-2',
			}),
		).resolves.toEqual({
			memberId: 'member-2',
			organizationId: 'organization-1',
			userId: 'user-2',
			role: 'staff',
			staffId: null,
		})
		expect(prisma.member.findFirst).toHaveBeenCalledWith({
			where: { id: 'member-2', organizationId: 'organization-1' },
			select: MEMBERSHIP_ADMINISTRATION_FACTS_SELECT,
		})
	})
})
