'use server'

import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { CreateProductAddonInputSchema } from '@/schema/composed/catalog/product.schema' // Adjust path to where you placed the schema
import { ProductAddonDTO } from '@/schema/composed/catalog/product.dtos'

export const createProductAddonAction = actionClientWithLab
	.metadata({
		actionName: 'Create-Product-Addon-Action',
		// SECURITY: Only roles that manage catalog pricing can create addons
		requiredLabRole: 'STAFF',
	})
	.inputSchema(CreateProductAddonInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx
		const { productId, name, price, isArchived } = parsedInput

		try {
			const prisma = await tenantPrisma(labId)

			// ── 1. SECURITY & INTEGRITY CHECK ───────────────────────────────
			// Verify that the parent product exists and actually belongs to this lab tenant.
			const productExists = await prisma.product.findUnique({
				where: { id: productId, labId },
				select: { id: true },
			})

			if (!productExists) {
				throw ERRORS.NOT_FOUND
			}

			// ── 2. DATABASE INSERTION ───────────────────────────────────────
			const newAddon = await prisma.productAddon.create({
				data: {
					name,
					price,
					isArchived: isArchived ?? false,
					productId,
					labId, // Enforce tenant ownership
				},
				select: {
					id: true,
					name: true,
					price: true,
					isArchived: true,
				},
			})

			// ── 3. MAP TO DTO ───────────────────────────────────────────────
			// Safe coercion of the Prisma Decimal to a JS Number for the frontend
			const addonDto: ProductAddonDTO = {
				id: newAddon.id,
				name: newAddon.name,
				price: Number(newAddon.price),
				isArchived: newAddon.isArchived,
			}

			return { addon: addonDto }
		} catch (error) {
			console.error('[Create-Product-Addon-Action] Error:', error)
			// Pass the error back through your safe action handler
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
