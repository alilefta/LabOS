import { z } from 'zod'
import { CaseCategoryBaseSchema } from '../base/case-category.base'
import { LabBaseSchema } from '../base/lab.base'
import { WorkTypeBaseSchema } from '../base/worktype.base'
import { CaseBaseSchema } from '../base/case.base'
import { emptyToUndefinedTransformer } from '../base/utils.base'

export const CaseCategoryDetailsSchema = CaseCategoryBaseSchema.extend({
	lab: LabBaseSchema,
	workTypes: z.array(WorkTypeBaseSchema),
	cases: z.array(CaseBaseSchema),
})

export type CaseCategoryDetails = z.infer<typeof CaseCategoryDetailsSchema>

export const CaseCategoryDetailsUISchema = CaseCategoryBaseSchema.extend({
	lab: LabBaseSchema.optional(),
	workTypes: z.array(WorkTypeBaseSchema).optional(),
	cases: z.array(CaseBaseSchema).optional(),
})

export type CaseCategoryDetailsUI = z.infer<typeof CaseCategoryDetailsUISchema>

export const GetCaseCategoriesForCaseInputSchema = z.object({
	limit: z.number().default(10),
})

export type GetCaseCategoriesForCaseInput = z.infer<
	typeof GetCaseCategoriesForCaseInputSchema
>

export const CreateCaseCategoryInputSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, 'Category name must be at least 2 characters.'),
	description: z
		.string()
		.trim()
		.transform(emptyToUndefinedTransformer)
		.optional(),
	imageUrl: z
		.union([
			z.literal(''),
			z.string().trim().url('Please enter a valid image URL'),
		])
		.transform(emptyToUndefinedTransformer)
		.optional(),
	isArchived: z.boolean().default(false).optional(),
})

export type CreateCaseCategoryInput = z.infer<
	typeof CreateCaseCategoryInputSchema
>

// We make the payload fields optional (partial), but the ID is strictly required.
export const UpdateCaseCategoryInputSchema =
	CreateCaseCategoryInputSchema.extend({
		categoryId: z.string().uuid('Invalid category ID'),
	})

export type UpdateCaseCategoryInput = z.infer<
	typeof UpdateCaseCategoryInputSchema
>
