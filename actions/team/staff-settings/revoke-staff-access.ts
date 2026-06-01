// actions/team/revoke-staff-access.ts
'use server'

import { actionClientWithLab } from '@/lib/safe-action'
import { tenantPrisma } from '@/lib/prisma'
import { ERRORS } from '@/lib/errors'
import { RevokeStaffSystemAccessInputSchema } from '@/schema/composed/team/staff-settings.schema'

export const revokeStaffSystemAccessAction = actionClientWithLab
	.metadata({
		actionName: 'Revoke-Staff-System-Access',
		requiredLabRole: 'MANAGER', // Scopes via middleware to OWNER/MANAGER minimum
	})
	.inputSchema(RevokeStaffSystemAccessInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { staffId } = parsedInput
		const { labId, labUser, user } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// ── 1. DEFENSE IN DEPTH: ROLE VERIFICATION ──────────────────────────
			// FIX 1: Explicitly allow the ADMIN role to revoke credentials
			if (
				labUser.role !== 'OWNER' &&
				labUser.role !== 'MANAGER' &&
				labUser.role !== 'ADMIN'
			) {
				throw new Error(
					'Unauthorized. You do not have the required administrative permissions.',
				)
			}

			// ── 2. ATOMIC DELETION TRANSACTION ────────────────────────────────
			await prisma.$transaction(async (tx) => {
				// Locate the linked LabUser record [1]
				const targetUser = await tx.labUser.findUnique({
					where: { labStaffId: staffId, labId },
					select: { id: true, authUserId: true, role: true },
				})

				if (!targetUser) {
					throw new Error('No system access record found for this employee.')
				}

				// SECURITY: Prevent Self-Lockout [2]
				if (targetUser.authUserId === user.id) {
					throw new Error(
						'Self-lockout prevented. You cannot revoke your own system credentials.',
					)
				}

				// SECURITY: Protect the Owner Seat
				if (targetUser.role === 'OWNER' && labUser.role !== 'OWNER') {
					throw new Error(
						"Permission Denied. Only a Lab Owner can revoke another Owner's credentials.",
					)
				}

				// ── FIX 2: SAFE MULTI-TENANT DELETION [2] ─────────────────────
				// Instead of deleting the global AuthUser, we:
				// 1. Delete the tenant-specific LabUser link (revoking access to this lab) [2]
				// 2. Delete all active sessions to force an instant logout [2]
				// 3. Keep the global AuthUser intact [2]
				await tx.labUser.delete({
					where: { id: targetUser.id },
				})

				await tx.session.deleteMany({
					where: { userId: targetUser.authUserId },
				})
			})

			return { success: true }
		} catch (error: any) {
			console.error('[Revoke-Staff-System-Access-Action] Error:', error.message)
			if (error instanceof Error) throw error
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
