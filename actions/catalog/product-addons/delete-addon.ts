'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'

const DeleteAddonInputSchema = z.object({
	id: z.string().uuid('Invalid Addon ID'),
})

export const deleteProductAddonAction = actionClientWithLab
	.metadata({
		actionName: 'Hard-Delete-Product-Addon-Action',
		requiredLabRole: 'OWNER', // Financial structure deletion requires Owner
	})
	.inputSchema(DeleteAddonInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// ── 1. SECURITY & USAGE VERIFICATION ──────────────────────────────
			const addon = await prisma.productAddon.findUnique({
				where: { id, labId },
				include: {
					_count: {
						select: { caseWorkItemAddons: true }, // Check historical usage
					},
				},
			})

			if (!addon) throw ERRORS.NOT_FOUND

			// ── 2. THE PRODUCTION LOCKOUT GUARD ───────────────────────────────
			const usageCount = addon._count.caseWorkItemAddons

			if (usageCount > 0) {
				throw new Error(
					`DATABASE LOCKOUT: This accessory is tied to ${usageCount} historical invoices. You cannot delete it. Please 'Archive' it instead.`,
				)
			}

			// ── 3. SAFE DELETION ──────────────────────────────────────────────
			await prisma.productAddon.delete({
				where: { id },
			})

			return { success: true }
		} catch (error) {
			console.error('[Delete-Product-Addon] Error:', error)
			if (error instanceof Error) throw error // Allow custom message to reach UI
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
