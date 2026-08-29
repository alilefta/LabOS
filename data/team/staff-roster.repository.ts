import 'server-only'

import { tenantPrisma } from '@/lib/prisma'
import { toLegacyLabRole } from '@/platform/organizations/legacy-role-compatibility'
import type { LabStaffWhereInput } from '@/generated/prisma/models'
import { CaseStatus } from '@/generated/prisma/client'
import type { StaffRosterAccessRow, StaffRosterRepository } from '@/modules/labos-staff/staff-roster.loader'

export const STAFF_ROSTER_BASE_SELECT = Object.freeze({ id: true, firstName: true, lastName: true, avatarUrl: true, roleCategory: true, jobTitle: true, isActive: true } as const)
export const STAFF_ROSTER_CONTACT_SELECT = Object.freeze({ id: true, phoneNumber: true } as const)
export const STAFF_ROSTER_COMPENSATION_SELECT = Object.freeze({ id: true, commissionType: true, commissionValue: true } as const)
const ACTIVE_CASE_STATUSES: CaseStatus[] = ['ASSIGNED', 'PROCESSING']
const HISTORICAL_CASE_STATUSES: CaseStatus[] = ['COMPLETED', 'DELIVERED', 'FAILED']

export const STAFF_ROSTER_ANALYTICS_SELECT = {
	id: true,
	_count: { select: { caseAssignments: { where: { dentalCase: { status: { in: ACTIVE_CASE_STATUSES } } } } } },
	caseAssignments: { where: { dentalCase: { status: { in: HISTORICAL_CASE_STATUSES } } }, select: { dentalCase: { select: { status: true, isRemake: true } } } },
} as const
export const STAFF_ROSTER_ACCESS_SELECT = Object.freeze({
	id: true,
	member: { select: { role: true } },
	organizationInvitationIntent: { select: { invitation: { select: { email: true, role: true, status: true, expiresAt: true } } } },
} as const)

export const prismaStaffRosterRepository: StaffRosterRepository = {
	async findBase({ labId, searchQuery, filters }) {
		const prisma = await tenantPrisma(labId)
		const where: LabStaffWhereInput = { labId, isActive: filters.isActive }
		if (filters.roleCategories.length) where.roleCategory = { in: filters.roleCategories }
		if (filters.specializationSearch) where.specialization = { contains: filters.specializationSearch, mode: 'insensitive' }
		if (searchQuery) where.OR = [{ firstName: { contains: searchQuery, mode: 'insensitive' } }, { lastName: { contains: searchQuery, mode: 'insensitive' } }, { jobTitle: { contains: searchQuery, mode: 'insensitive' } }]
		return prisma.labStaff.findMany({ where, select: STAFF_ROSTER_BASE_SELECT, orderBy: [{ roleCategory: 'asc' }, { firstName: 'asc' }] })
	},
	async findContacts({ labId, staffIds }) {
		const prisma = await tenantPrisma(labId)
		return prisma.labStaff.findMany({ where: { labId, id: { in: [...staffIds] } }, select: STAFF_ROSTER_CONTACT_SELECT })
	},
	async findCompensation({ labId, staffIds }) {
		const prisma = await tenantPrisma(labId)
		const rows = await prisma.labStaff.findMany({ where: { labId, id: { in: [...staffIds] } }, select: STAFF_ROSTER_COMPENSATION_SELECT })
		return rows.map((row) => ({ ...row, commissionValue: row.commissionValue === null ? null : Number(row.commissionValue) }))
	},
	async findAnalytics({ labId, staffIds }) {
		const prisma = await tenantPrisma(labId)
		const rows = await prisma.labStaff.findMany({ where: { labId, id: { in: [...staffIds] } }, select: STAFF_ROSTER_ANALYTICS_SELECT })
		return rows.map((row) => {
			const activeCaseCount = row._count.caseAssignments
			const failedCases = row.caseAssignments.filter((item) => item.dentalCase.status === 'FAILED' || item.dentalCase.isRemake).length
			const remakeRate = row.caseAssignments.length ? (failedCases / row.caseAssignments.length) * 100 : 0
			return {
				id: row.id,
				activeCaseCount,
				capacityBand: activeCaseCount >= 15 ? 'OVERLOADED' as const : activeCaseCount >= 9 ? 'HEAVY' as const : activeCaseCount >= 4 ? 'OPTIMAL' as const : 'AVAILABLE' as const,
				qualityBand: remakeRate > 10 ? 'CRITICAL' as const : remakeRate >= 6 ? 'ELEVATED' as const : remakeRate >= 2 ? 'AVERAGE' as const : 'EXCELLENT' as const,
				remakeRate,
			}
		})
	},
	async findAccess({ labId, staffIds }) {
		const prisma = await tenantPrisma(labId)
		const rows = await prisma.labStaff.findMany({ where: { labId, id: { in: [...staffIds] } }, select: STAFF_ROSTER_ACCESS_SELECT })
		const now = new Date()
		return rows.map((row): StaffRosterAccessRow => {
			if (row.member) return { id: row.id, accessState: 'ACTIVE_USER', systemRole: toLegacyLabRole(row.member.role), inviteEmail: null }
			const invitation = row.organizationInvitationIntent?.invitation
			if (invitation?.status === 'pending' && invitation.expiresAt > now) return { id: row.id, accessState: 'PENDING_INVITE', systemRole: invitation.role ? toLegacyLabRole(invitation.role) : null, inviteEmail: invitation.email }
			return { id: row.id, accessState: 'NO_ACCESS', systemRole: null, inviteEmail: null }
		})
	},
}
