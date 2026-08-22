// actions/team/staff-settings/update-staff-identity.ts
'use server'

import { headers } from 'next/headers'

import { auth } from '@/lib/auth'
import { ERRORS } from '@/lib/errors'
import { normalizeLabStaff } from '@/lib/mappers'
import { generalPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import {
	assertStaffAccessRevocationAllowed,
	revokeStaffOrganizationAccess,
} from '@/lib/staff-access-revocation'
import { cleanupStaffInvitationIntent } from '@/lib/staff-invitation'
import { UpdateStaffIdentityInputSchema } from '@/schema/composed/team/staff-settings.schema'

/** Throws when operational deactivation would strand active case work. */
async function requireNoActiveWorkload(staffId: string, labId: string) {
	const activeCasesCount = await generalPrisma.caseStaffAssignment.count({
		where: {
			staffId,
			labId,
			dentalCase: { status: { in: ['ASSIGNED', 'PROCESSING'] } },
		},
	})

	if (activeCasesCount > 0) {
		throw new Error(
			`Cannot deactivate. This employee still has ${activeCasesCount} active cases assigned on their bench. Reassign their workload first.`,
		)
	}
}

/**
 * Updates operational staff identity without mutating legacy membership.
 * Deactivation revokes a linked Better Auth Organization Member, or cancels a
 * pending Better Auth invitation, before marking the staff record inactive.
 * Global AuthUser identity and sessions for other Organizations are preserved.
 */
export const updateStaffIdentityAction = actionClientWithLab
	.metadata({
		actionName: 'Update-Staff-Identity-Action',
		requiredLabRole: 'MANAGER',
	})
	.inputSchema(UpdateStaffIdentityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const {
			staffId,
			firstName,
			lastName,
			phoneNumber,
			jobTitle,
			specialization,
			roleCategory,
			isActive,
		} = parsedInput

		const existingStaff = await generalPrisma.labStaff.findFirst({
			where: { id: staffId, labId: ctx.labId },
			select: {
				member: {
					select: { id: true, userId: true, role: true, organizationId: true },
				},
				organizationInvitationIntent: {
					select: {
						invitationId: true,
						invitation: {
							select: { organizationId: true, status: true },
						},
					},
				},
			},
		})
		if (!existingStaff) throw ERRORS.NOT_FOUND

		if (!isActive) {
			// Preflight before any access change; the transaction below repeats this
			// check to close the normal concurrent-assignment window.
			await requireNoActiveWorkload(staffId, ctx.labId)
			const requestHeaders = await headers()

			if (existingStaff.member) {
				if (existingStaff.member.organizationId !== ctx.organizationId) {
					throw ERRORS.OPERATION_NOT_ALLOWED
				}
				assertStaffAccessRevocationAllowed({
					actorUserId: ctx.user.id,
					actorMemberRole: ctx.memberRole,
					targetUserId: existingStaff.member.userId,
					targetMemberRole: existingStaff.member.role,
				})
				await revokeStaffOrganizationAccess({
					tenant: {
						organizationId: ctx.organizationId,
						labId: ctx.labId,
					},
					staffId,
					memberId: existingStaff.member.id,
					requestHeaders,
				})
			} else if (existingStaff.organizationInvitationIntent) {
				const intent = existingStaff.organizationInvitationIntent
				if (intent.invitation.organizationId !== ctx.organizationId) {
					throw ERRORS.OPERATION_NOT_ALLOWED
				}
				if (intent.invitation.status === 'pending') {
					await auth.api.cancelInvitation({
						body: { invitationId: intent.invitationId },
						headers: requestHeaders,
					})
				}
				await cleanupStaffInvitationIntent(intent.invitationId)
			}
		}

		const updatedStaff = await generalPrisma.$transaction(async (tx) => {
			if (!isActive) {
				const activeCasesCount = await tx.caseStaffAssignment.count({
					where: {
						staffId,
						labId: ctx.labId,
						dentalCase: { status: { in: ['ASSIGNED', 'PROCESSING'] } },
					},
				})
				if (activeCasesCount > 0) {
					throw new Error(
						`Cannot deactivate. This employee now has ${activeCasesCount} active cases. Reassign their workload first. Organization access has already been revoked for safety.`,
					)
				}
			}

			const update = await tx.labStaff.updateMany({
				where: { id: staffId, labId: ctx.labId },
				data: {
					firstName,
					lastName,
					phoneNumber,
					jobTitle: jobTitle || null,
					specialization: specialization || null,
					roleCategory,
					isActive,
				},
			})
			if (update.count !== 1) throw ERRORS.NOT_FOUND

			const staff = await tx.labStaff.findFirst({
				where: { id: staffId, labId: ctx.labId },
			})
			if (!staff) throw ERRORS.NOT_FOUND
			return staff
		})

		return { success: true, staff: normalizeLabStaff(updatedStaff) }
	})
