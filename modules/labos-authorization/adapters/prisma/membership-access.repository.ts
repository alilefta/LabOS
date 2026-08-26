import 'server-only'

import { generalPrisma } from '@/lib/prisma'

import type { MembershipAccessFactRepository } from '../../fact-loaders/membership-access-facts'
import type { OrganizationBoundaryLookup } from '../../target-resolvers/organization-boundary-resolver'

/** Minimal, security-relevant projections used by the authorization adapter. */
export const STAFF_ORGANIZATION_BOUNDARY_SELECT = {
	lab: { select: { organizationId: true } },
} as const

export const MEMBER_ORGANIZATION_BOUNDARY_SELECT = {
	organizationId: true,
} as const

export const STAFF_ACCESS_FACTS_SELECT = {
	id: true,
	labId: true,
	isActive: true,
	lab: { select: { organizationId: true } },
	member: {
		select: {
			id: true,
			userId: true,
			organizationId: true,
			role: true,
		},
	},
	organizationInvitationIntent: {
		select: {
			labId: true,
			invitation: {
				select: {
					id: true,
					organizationId: true,
					email: true,
					role: true,
					status: true,
					expiresAt: true,
				},
			},
		},
	},
} as const

export const MEMBERSHIP_ADMINISTRATION_FACTS_SELECT = {
	id: true,
	organizationId: true,
	userId: true,
	role: true,
	labStaff: { select: { id: true } },
} as const

/**
 * Unscoped boundary lookup for Staff identifiers. The generic kernel compares
 * the returned Organization with the actor before any policy is evaluated.
 */
export const prismaStaffOrganizationBoundaryLookup: OrganizationBoundaryLookup = {
	async findOrganizationBoundary(staffId) {
		const staff = await generalPrisma.labStaff.findUnique({
			where: { id: staffId },
			select: STAFF_ORGANIZATION_BOUNDARY_SELECT,
		})
		const organizationId = staff?.lab.organizationId
		return organizationId ? { organizationId } : null
	},
}

/** Unscoped authoritative boundary lookup for Better Auth Member targets. */
export const prismaMemberOrganizationBoundaryLookup: OrganizationBoundaryLookup = {
	async findOrganizationBoundary(memberId) {
		const member = await generalPrisma.member.findUnique({
			where: { id: memberId },
			select: MEMBER_ORGANIZATION_BOUNDARY_SELECT,
		})
		return member ? { organizationId: member.organizationId } : null
	},
}

/**
 * Tenant-scoped authoritative facts for Staff-access and generic membership
 * policies. Staff names, contact details, addresses, and compensation are not
 * selected. Invitation email is selected only because exact resend versus
 * replacement intent depends on it; policies never return or log that value.
 */
export const prismaMembershipAccessFactRepository: MembershipAccessFactRepository = {
	async findStaffAccessFacts({ organizationId, staffId }) {
		const staff = await generalPrisma.labStaff.findFirst({
			where: { id: staffId, lab: { organizationId } },
			select: STAFF_ACCESS_FACTS_SELECT,
		})

		if (!staff?.lab.organizationId) return null
		const intent = staff.organizationInvitationIntent

		return {
			staffId: staff.id,
			labId: staff.labId,
			organizationId: staff.lab.organizationId,
			isActive: staff.isActive,
			member: staff.member,
			invitation: intent
				? {
						id: intent.invitation.id,
						organizationId: intent.invitation.organizationId,
						email: intent.invitation.email,
						role: intent.invitation.role,
						status: intent.invitation.status,
						expiresAt: intent.invitation.expiresAt,
						intentLabId: intent.labId,
					}
				: null,
		}
	},

	async findMembershipAdministrationFacts({ organizationId, memberId }) {
		const member = await generalPrisma.member.findFirst({
			where: { id: memberId, organizationId },
			select: MEMBERSHIP_ADMINISTRATION_FACTS_SELECT,
		})

		return member
			? {
					memberId: member.id,
					organizationId: member.organizationId,
					userId: member.userId,
					role: member.role,
					staffId: member.labStaff?.id ?? null,
				}
			: null
	},
}
