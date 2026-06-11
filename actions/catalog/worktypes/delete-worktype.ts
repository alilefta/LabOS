'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'

const DeleteEntityInputSchema = z.object({
	id: z.string().uuid('Invalid entity ID'),
})

export const deleteWorkTypeAction = actionClientWithLab
	.metadata({
		actionName: 'Hard-Delete-WorkType-Action',
		requiredLabRole: 'OWNER', // SECURITY: Only the lab owner can perform hard deletes
	})
	.inputSchema(DeleteEntityInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id } = parsedInput
		const { labId } = ctx

		const prisma = await tenantPrisma(labId)

		// ── 1. SECURITY & USAGE VERIFICATION ──────────────────────────────
		// Fetch the WorkType and count how many times it was used in production.
		const workType = await prisma.workType.findUnique({
			where: { id, labId },
			include: {
				_count: {
					select: { caseWorkItems: true }, // Lifetime usage count
				},
			},
		})

		if (!workType) throw ERRORS.NOT_FOUND

		// ── 2. THE PRODUCTION LOCKOUT GUARD ───────────────────────────────
		const usageCount = workType._count.caseWorkItems

		if (usageCount > 0) {
			throw new Error(
				`DATABASE LOCKOUT: This Department is tied to ${usageCount} historical production records. You cannot delete it. Please 'Archive' it instead.`,
			)
		}

		// ── 3. SAFE DELETION (CASCADE) ────────────────────────────────────
		// Since usageCount === 0, this WorkType has never been sold.
		// Deleting it will safely cascade and delete all associated Products and Pricing Plans
		// under it without breaking any historical invoices.
		await prisma.workType.delete({
			where: { id },
		})

		return { success: true }
	})
