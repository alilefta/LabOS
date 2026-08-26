// actions/team/staff-settings/revoke-staff-access.ts
'use server'

import { headers } from 'next/headers'

import { auth } from '@/lib/auth'
import { ERRORS } from '@/lib/errors'
import { generalPrisma } from '@/lib/prisma'
import { actionClientWithAuthorizationShadow } from '@/lib/safe-action'
import {
	assertStaffAccessRevocationAllowed,
	revokeStaffOrganizationAccess,
} from '@/lib/staff-access-revocation'
import { cleanupStaffInvitationIntent } from '@/lib/staff-invitation'

/**
 * Revokes only tenant-scoped digital access for a LabStaff record.
 * Pending access cancels its Better Auth invitation; active access removes the
 * Organization Member. The global AuthUser and sessions for other tenants are
 * deliberately preserved.
 */
export const revokeStaffSystemAccessAction =
	actionClientWithAuthorizationShadow('A-125')
	.action(async ({ parsedInput, ctx }) => {
		const staff = await generalPrisma.labStaff.findFirst({
			where: { id: parsedInput.staffId, labId: ctx.labId },
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

		if (!staff) throw ERRORS.NOT_FOUND
		const requestHeaders = await headers()

		if (staff.member) {
			if (staff.member.organizationId !== ctx.organizationId) {
				throw ERRORS.OPERATION_NOT_ALLOWED
			}
			assertStaffAccessRevocationAllowed({
				actorUserId: ctx.user.id,
				actorMemberRole: ctx.memberRole,
				targetUserId: staff.member.userId,
				targetMemberRole: staff.member.role,
			})

			const result = await revokeStaffOrganizationAccess({
				tenant: {
					organizationId: ctx.organizationId,
					labId: ctx.labId,
				},
				staffId: parsedInput.staffId,
				memberId: staff.member.id,
				requestHeaders,
			})
			return { success: true, ...result }
		}

		const intent = staff.organizationInvitationIntent
		if (intent) {
			if (intent.invitation.organizationId !== ctx.organizationId) {
				throw ERRORS.OPERATION_NOT_ALLOWED
			}

			if (intent.invitation.status === 'pending') {
				await auth.api.cancelInvitation({
					body: { invitationId: intent.invitationId },
					headers: requestHeaders,
				})
			}
			// Retry cleanup explicitly because a post-cancel hook failure is logged
			// and retained for reconciliation instead of failing Better Auth.
			await cleanupStaffInvitationIntent(intent.invitationId)
			return { success: true, status: 'invitation_canceled' as const }
		}

		throw new Error('No Organization access or pending invitation was found.')
	})
