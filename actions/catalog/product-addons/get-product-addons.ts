'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'
import { ProductAddonDTO } from '@/schema/composed/catalog/product.dtos'

const GetProductAddonsInputSchema = z.object({
	productId: z.string().uuid('Invalid Product ID'),
	showArchived: z.boolean().default(false).optional(),
})

export const getProductAddonsAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Product-Addons-Action',
		requiredLabRole: 'STAFF',
	})
	.inputSchema(GetProductAddonsInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { productId, showArchived } = parsedInput
		const { labId } = ctx

		const prisma = await tenantPrisma(labId)

		// 1. Security Check: Verify product exists in this lab
		const productExists = await prisma.product.findUnique({
			where: { id: productId, labId },
			select: { id: true },
		})

		if (!productExists) {
			throw ERRORS.NOT_FOUND
		}

		// 2. Fetch the Addons
		const rawAddons = await prisma.productAddon.findMany({
			where: {
				productId,
				labId,
				// Soft-delete logic: If false, hide archived addons. If true, show all.
				...(!showArchived && { isArchived: false }),
			},
			select: {
				id: true,
				name: true,
				price: true,
				isArchived: true,
			},
			orderBy: {
				name: 'asc', // Alphabetical list is easiest to scan
			},
		})

		// 3. Map to DTO
		const addons: ProductAddonDTO[] = rawAddons.map((addon) => ({
			id: addon.id,
			name: addon.name,
			// Safely coerce Decimal to JavaScript Number
			price: Number(addon.price),
			isArchived: addon.isArchived,
		}))

		return { addons }
	})

export const getProductAddonByIdAction = actionClientWithLab
	.metadata({
		actionName: 'Get-Product-Addons-Action',
		requiredLabRole: 'STAFF',
	})
	.inputSchema(z.object({ addonId: z.string().uuid() }))
	.action(async ({ parsedInput, ctx }) => {
		const { labId } = ctx
		const prisma = await tenantPrisma(labId)

		const addon = await prisma.productAddon.findUnique({
			where: { id: parsedInput.addonId, labId },
			select: { id: true, name: true, price: true, isArchived: true },
		})

		if (!addon) throw ERRORS.NOT_FOUND
		return { addon: { ...addon, price: Number(addon.price) } }
	})
