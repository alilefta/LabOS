import 'server-only'

import { tenantPrisma } from '@/lib/prisma'
import { toLegacyLabRole } from '@/platform/organizations/legacy-role-compatibility'

import type {
	StaffDossierAccess,
	StaffDossierRepository,
} from '@/modules/labos-staff/staff-dossier.loader'

export const STAFF_DOSSIER_IDENTITY_SELECT = Object.freeze({
	id: true,
	firstName: true,
	lastName: true,
	phoneNumber: true,
	avatarUrl: true,
	roleCategory: true,
	jobTitle: true,
	specialization: true,
	isActive: true,
	workingDays: true,
} as const)

export const STAFF_DOSSIER_COMPENSATION_SELECT = Object.freeze({
	commissionType: true,
	commissionValue: true,
} as const)

export const STAFF_DOSSIER_ACCESS_SELECT = Object.freeze({
	member: { select: { role: true } },
	organizationInvitationIntent: {
		select: {
			invitation: {
				select: {
					email: true,
					role: true,
					status: true,
					expiresAt: true,
				},
			},
		},
	},
} as const)

/**
 * Prisma adapter for the split A-118 disclosure repositories.
 *
 * Each method uses a tenant-bound client and a minimal select. In particular,
 * the access projection never selects the Better Auth invitation ID because it
 * is a reusable bearer capability rather than ordinary dossier data.
 */
export const prismaStaffDossierRepository: StaffDossierRepository = {
	async findIdentity({ labId, staffId }) {
		const prisma = await tenantPrisma(labId)
		return prisma.labStaff.findUnique({
			where: { id: staffId, labId },
			select: STAFF_DOSSIER_IDENTITY_SELECT,
		})
	},

	async findCompensation({ labId, staffId }) {
		const prisma = await tenantPrisma(labId)
		const result = await prisma.labStaff.findUnique({
			where: { id: staffId, labId },
			select: STAFF_DOSSIER_COMPENSATION_SELECT,
		})
		if (!result) return null
		return {
			commissionType: result.commissionType,
			commissionValue:
				result.commissionValue === null
					? null
					: Number(result.commissionValue),
		}
	},

	async findAccess({ labId, staffId }) {
		const prisma = await tenantPrisma(labId)
		const result = await prisma.labStaff.findUnique({
			where: { id: staffId, labId },
			select: STAFF_DOSSIER_ACCESS_SELECT,
		})
		if (!result) return null

		let access: StaffDossierAccess = {
			accessState: 'NO_ACCESS',
			systemRole: null,
			inviteEmail: null,
		}

		if (result.member) {
			access = {
				accessState: 'ACTIVE_USER',
				systemRole: toLegacyLabRole(result.member.role),
				inviteEmail: null,
			}
		} else {
			const invitation = result.organizationInvitationIntent?.invitation
			if (
				invitation?.status === 'pending' &&
				invitation.expiresAt > new Date()
			) {
				access = {
					accessState: 'PENDING_INVITE',
					systemRole: invitation.role
						? toLegacyLabRole(invitation.role)
						: null,
					inviteEmail: invitation.email,
				}
			}
		}

		return access
	},
}
