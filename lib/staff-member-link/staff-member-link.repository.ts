import 'server-only'

import { generalPrisma } from '@/lib/prisma'

import type {
	StaffMemberLinkState,
	StaffMemberLinkTenant,
} from './staff-member-link.types'

export interface StaffMemberLinkRepository {
	readState(input: {
		tenant: StaffMemberLinkTenant
		staffId: string
		memberId?: string
	}): Promise<StaffMemberLinkState>
	setMember(input: {
		tenant: StaffMemberLinkTenant
		staffId: string
		expectedMemberId: string | null
		memberId: string | null
	}): Promise<void>
}

/**
 * Prisma persistence adapter for the LabStaff-to-Member bridge.
 *
 * Both reads are constrained by the resolved tenant. This is intentional:
 * returning "not found" for out-of-tenant identifiers prevents cross-tenant
 * existence disclosure. The application service performs the invariant checks
 * before the write; the unique memberId constraint is the concurrency backstop.
 */
export const prismaStaffMemberLinkRepository: StaffMemberLinkRepository = {
	async readState({ tenant, staffId, memberId }) {
		const [staff, member] = await generalPrisma.$transaction(async (tx) => {
			const staffQuery = tx.labStaff.findFirst({
				where: { id: staffId, labId: tenant.labId },
				select: {
					id: true,
					labId: true,
					memberId: true,
					isActive: true,
				},
			})
			const memberQuery = memberId
				? tx.member.findFirst({
						where: {
							id: memberId,
							organizationId: tenant.organizationId,
						},
						select: {
							id: true,
							organizationId: true,
							labStaff: { select: { id: true } },
						},
					})
				: null

			return Promise.all([staffQuery, memberQuery])
		})

		return {
			staff,
			member: member
				? {
						id: member.id,
						organizationId: member.organizationId,
						linkedStaffId: member.labStaff?.id ?? null,
					}
				: null,
		}
	},

	async setMember({ tenant, staffId, expectedMemberId, memberId }) {
		const result = await generalPrisma.labStaff.updateMany({
			where: { id: staffId, labId: tenant.labId, memberId: expectedMemberId },
			data: { memberId },
		})

		if (result.count !== 1) {
			throw new Error('Tenant-scoped LabStaff update did not affect one row')
		}
	},
}
