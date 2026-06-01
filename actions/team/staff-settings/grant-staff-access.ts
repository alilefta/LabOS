// actions/team/grant-staff-access.ts
'use server'

import { actionClientWithLab } from '@/lib/safe-action'
import { tenantPrisma } from '@/lib/prisma'
import { ERRORS } from '@/lib/errors'
import { addDays } from 'date-fns'
import crypto from 'crypto'
import { GrantStaffSystemAccessInputSchema } from '@/schema/composed/team/staff-settings.schema'

export const grantStaffSystemAccessAction = actionClientWithLab
	.metadata({
		actionName: 'Grant-Staff-System-Access',
		requiredLabRole: 'MANAGER',
	})
	.inputSchema(GrantStaffSystemAccessInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { staffId, email, roleToGrant } = parsedInput
		const { labId, labUser } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// ── 1. DEFENSE IN DEPTH: ROLE VERIFICATION ──────────────────────────
			// FIX 1: Explicitly allow the ADMIN role to grant credentials [1]
			if (
				labUser.role !== 'OWNER' &&
				labUser.role !== 'MANAGER' &&
				labUser.role !== 'ADMIN'
			) {
				throw new Error(
					'Unauthorized. You do not have the required administrative permissions.',
				)
			}

			// ── 2. ATOMIC VERIFICATION & GENERATION TRANSACTION ───────────────
			const result = await prisma.$transaction(async (tx) => {
				// --- FIX 2: EMAIL UNIQUE PROTECTION [2] ---
				// Verify this email isn't already registered or invited in this lab [2]
				const [existingUser, existingInvite] = await Promise.all([
					tx.labUser.findFirst({
						where: { authUser: { email: email.trim() }, labId },
						select: { id: true },
					}),
					tx.labInvitation.findFirst({
						where: {
							email: email.trim(),
							labId,
							expiresAt: { gte: new Date() },
						},
						select: { id: true },
					}),
				])

				if (existingUser) {
					throw new Error(
						'This email is already registered to another user in this laboratory.',
					)
				}
				if (existingInvite) {
					throw new Error(
						'An active invitation is already outstanding for this email.',
					)
				}

				// Verify target employee exists and belongs to this lab tenant
				const staff = await tx.labStaff.findUnique({
					where: { id: staffId, labId },
					select: {
						id: true,
						firstName: true,
						lastName: true,
						labUser: { select: { id: true } },
					},
				})

				if (!staff) {
					throw new Error('The specified employee could not be found.')
				}

				// Prevent Double-Seat Creation: Do they already have a login?
				if (staff.labUser) {
					throw new Error(
						`${staff.firstName} already has an active, linked LabOS account.`,
					)
				}

				// IDEMPOTENCY: Invalidate any old, outstanding invitations for this staff member
				await tx.labInvitation.deleteMany({
					where: { labStaffId: staffId, labId },
				})

				// Calculate expiration (Exactly 48 Hours from now)
				const expiresAt = addDays(new Date(), 2)
				const token = crypto.randomUUID() // Highly secure 36-char string

				// Create the new secure invitation
				const invitation = await tx.labInvitation.create({
					data: {
						labId,
						labStaffId: staffId,
						email: email.trim(),
						token,
						roleToGrant,
						expiresAt,
					},
				})

				return { invitation, staff }
			})

			// ── 4. ASYNCHRONOUS EMAIL DISPATCH (STUB) ─────────────────────────
			// In production, trigger your Resend / Mailgun service here on the server:
			// await sendOnboardingEmail({
			//    to: email,
			//    staffName: `${result.staff.firstName} ${result.staff.lastName}`,
			//    inviteLink: `${process.env.NEXT_PUBLIC_APP_URL}/invite/${result.invitation.token}`
			// });
			console.log(
				`[Onboarding] Invite link generated: /invite/${result.invitation.token}`,
			)

			return {
				success: true,
				invite: {
					email: result.invitation.email,
					token: result.invitation.token,
					expiresAt: result.invitation.expiresAt,
				},
			}
		} catch (error: any) {
			console.error('[Grant-Staff-System-Access-Action] Error:', error.message)
			if (error instanceof Error) throw error
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
