// actions/catalog/rename-catalog-entities.ts
'use server'

import { z } from 'zod'
import { tenantPrisma } from '@/lib/prisma'
import { actionClientWithLab } from '@/lib/safe-action'
import { ERRORS } from '@/lib/errors'

// ── 1. RENAME CASE CATEGORY ACTION ──────────────────────────────────────────
const RenameCategoryInputSchema = z.object({
	id: z.string().uuid('Invalid Category ID format.'),
	name: z
		.string()
		.trim()
		.min(2, 'Category name must be at least 2 characters.'),
})

export const renameCaseCategoryAction = actionClientWithLab
	.metadata({
		actionName: 'Rename-Case-Category-Action',
		requiredLabRole: 'ADMIN', // Only admins/owners can modify catalog schema
	})
	.inputSchema(RenameCategoryInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id, name } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// A. SECURITY CHECK: Verify category exists in this lab tenant
			const category = await prisma.caseCategory.findUnique({
				where: { id, labId },
				select: { id: true },
			})

			if (!category) {
				throw ERRORS.NOT_FOUND
			}

			// B. EXECUTE MUTATION
			const updatedCategory = await prisma.caseCategory.update({
				where: { id },
				data: { name },
				select: { id: true, name: true }, // Keep payload tiny
			})

			return { category: updatedCategory }
		} catch (error) {
			console.error('[Rename-Case-Category-Action] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})

// ── 2. RENAME WORK TYPE ACTION ──────────────────────────────────────────────
const RenameWorkTypeInputSchema = z.object({
	id: z.string().uuid('Invalid Work Type ID format.'),
	name: z
		.string()
		.trim()
		.min(2, 'Work Type name must be at least 2 characters.'),
})

export const renameWorkTypeAction = actionClientWithLab
	.metadata({
		actionName: 'Rename-Work-Type-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(RenameWorkTypeInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id, name } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// A. SECURITY CHECK: Verify Work Type belongs to this lab tenant
			const workType = await prisma.workType.findUnique({
				where: { id, labId },
				select: { id: true },
			})

			if (!workType) {
				throw ERRORS.NOT_FOUND
			}

			// B. EXECUTE MUTATION
			const updatedWorkType = await prisma.workType.update({
				where: { id },
				data: { name },
				select: { id: true, name: true },
			})

			return { workType: updatedWorkType }
		} catch (error) {
			console.error('[Rename-Work-Type-Action] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})

// ── 1. RENAME PRODUCT ACTION ──────────────────────────────────────────
const RenameProductInputSchema = z.object({
	id: z.string().uuid('Invalid Product ID format.'),
	name: z.string().trim().min(2, 'Product name must be at least 2 characters.'),
})

export const renameProductAction = actionClientWithLab
	.metadata({
		actionName: 'Rename-Product-Action',
		requiredLabRole: 'ADMIN', // Only administrators can edit catalog names
	})
	.inputSchema(RenameProductInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id, name } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// A. SECURITY CHECK: Verify product exists in this lab tenant
			const product = await prisma.product.findUnique({
				where: { id, labId },
				select: { id: true },
			})

			if (!product) {
				throw ERRORS.NOT_FOUND
			}

			// B. EXECUTE MUTATION
			const updatedProduct = await prisma.product.update({
				where: { id },
				data: { name },
				select: { id: true, name: true }, // Keep payload tiny
			})

			return { product: updatedProduct }
		} catch (error) {
			console.error('[Rename-Product-Action] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})

// ── 2. RENAME PRICING PLAN ACTION ──────────────────────────────────────────
const RenamePricingPlanInputSchema = z.object({
	id: z.string().uuid('Invalid Pricing Plan ID format.'),
	name: z
		.string()
		.trim()
		.min(2, 'Pricing Plan name must be at least 2 characters.'),
})

export const renamePricingPlanAction = actionClientWithLab
	.metadata({
		actionName: 'Rename-Pricing-Plan-Action',
		requiredLabRole: 'ADMIN',
	})
	.inputSchema(RenamePricingPlanInputSchema)
	.action(async ({ parsedInput, ctx }) => {
		const { id, name } = parsedInput
		const { labId } = ctx

		try {
			const prisma = await tenantPrisma(labId)

			// A. SECURITY CHECK: Verify pricing plan belongs to this lab tenant
			const pricingPlan = await prisma.casePricingPlan.findUnique({
				where: { id, labId },
				select: { id: true },
			})

			if (!pricingPlan) {
				throw ERRORS.NOT_FOUND
			}

			// B. EXECUTE MUTATION
			const updatedPlan = await prisma.casePricingPlan.update({
				where: { id },
				data: { name },
				select: { id: true, name: true },
			})

			return { pricingPlan: updatedPlan }
		} catch (error) {
			console.error('[Rename-Pricing-Plan-Action] Error:', error)
			throw ERRORS.OPERATION_NOT_ALLOWED
		}
	})
