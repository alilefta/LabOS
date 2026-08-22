import 'server-only'

import { generalPrisma } from '@/lib/prisma'

import type {
	StaffInvitationState,
	StaffInvitationTenant,
} from './staff-invitation.types'

export type StaffInvitationAcceptanceState = {
	intent: {
		invitationId: string
		labId: string
		staffId: string
	} | null
	organizationLabId: string | null
}

export interface StaffInvitationRepository {
	findState(input: {
		tenant: StaffInvitationTenant
		staffId: string
	}): Promise<StaffInvitationState>
	saveIntent(input: {
		tenant: StaffInvitationTenant
		staffId: string
		invitationId: string
	}): Promise<void>
	deleteIntent(invitationId: string): Promise<void>
	resolveAcceptance(input: {
		invitationId: string
		organizationId: string
	}): Promise<StaffInvitationAcceptanceState>
}

/**
 * Tenant-scoped persistence for the optional LabStaff intent. Better Auth's
 * Invitation table remains authoritative for status, role, email, and expiry.
 */
export const prismaStaffInvitationRepository: StaffInvitationRepository = {
	async findState({ tenant, staffId }) {
		const staff = await generalPrisma.labStaff.findFirst({
			where: { id: staffId, labId: tenant.labId },
			select: {
				id: true,
				labId: true,
				memberId: true,
				organizationInvitationIntent: {
					select: {
						invitationId: true,
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
			},
		})

		const intent = staff?.organizationInvitationIntent

		return {
			staff: staff
				? { id: staff.id, labId: staff.labId, memberId: staff.memberId }
				: null,
			intent:
				intent && intent.invitation.role
					? {
							invitationId: intent.invitationId,
							invitation: {
								...intent.invitation,
								role: intent.invitation.role,
							},
						}
					: null,
		}
	},

	async saveIntent({ tenant, staffId, invitationId }) {
		await generalPrisma.labStaffInvitationIntent.upsert({
			where: { labStaffId_labId: { labStaffId: staffId, labId: tenant.labId } },
			create: { invitationId, labStaffId: staffId, labId: tenant.labId },
			update: { invitationId },
		})
	},

	async deleteIntent(invitationId) {
		await generalPrisma.labStaffInvitationIntent.deleteMany({
			where: { invitationId },
		})
	},

	async resolveAcceptance({ invitationId, organizationId }) {
		const [intent, organization] = await generalPrisma.$transaction([
			generalPrisma.labStaffInvitationIntent.findUnique({
				where: { invitationId },
				select: { invitationId: true, labId: true, labStaffId: true },
			}),
			generalPrisma.organization.findUnique({
				where: { id: organizationId },
				select: { lab: { select: { id: true } } },
			}),
		])

		return {
			intent: intent
				? {
						invitationId: intent.invitationId,
						labId: intent.labId,
						staffId: intent.labStaffId,
					}
				: null,
			organizationLabId: organization?.lab?.id ?? null,
		}
	},
}
