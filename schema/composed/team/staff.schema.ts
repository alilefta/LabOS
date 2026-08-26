import { StaffRoleCategorySchema } from '@/schema/base/enums.base'
import { emptyToUndefinedTransformer } from '@/schema/base/utils.base'
import { z } from 'zod'

/**
 * A-123 accepts only the fields required to create an operational Staff
 * identity. Digital access and compensation are deliberately absent because
 * those are separate, resource-scoped commands after the Staff ID exists.
 */
export const CreateLabStaffInputSchema = z
	.object({
		// ── 1. IDENTITY & CONTACT (STRICT VALIDATION) ──────────────────────
		firstName: z
			.string()
			.trim()
			.min(2, 'First name must be at least 2 characters.'),
		lastName: z
			.string()
			.trim()
			.min(2, 'Last name must be at least 2 characters.'),
		phoneNumber: z
			.string()
			.trim()
			.min(7, 'Please enter a valid phone number.'),

		// Re-use the secure UploadThing avatar URL validator.
		avatarUrl: z
			.union([
				z.literal(''),
				z.string().trim().url('Please enter a valid image URL'),
			])
			.transform(emptyToUndefinedTransformer)
			.optional(),

		isActive: z.boolean(),

		// ── 2. LOCATION & LOGISTICS ────────────────────────────────────────
		city: z.string().trim().min(1, 'City is required.'),
		address1: z.string().trim().min(1, 'Street address is required.'),
		address2: z
			.string()
			.trim()
			.transform(emptyToUndefinedTransformer)
			.optional(),
		zipcode: z
			.string()
			.trim()
			.transform(emptyToUndefinedTransformer)
			.optional(),

		// ── 3. OPERATIONAL JOB DETAILS ─────────────────────────────────────
		roleCategory: StaffRoleCategorySchema,
		jobTitle: z
			.string()
			.transform(emptyToUndefinedTransformer)
			.optional()
			.nullable(),
		specialization: z
			.string()
			.transform(emptyToUndefinedTransformer)
			.optional()
			.nullable(),

		// Compensation and system-access fields must never be added here. Use the
		// dedicated Staff settings actions after the operational identity exists.
	})
	.strict()

export type CreateLabStaffInput = z.infer<typeof CreateLabStaffInputSchema>

// ── 1. INPUT SCHEMA ─────────────────────────────────────────────────────────
export const ReassignCasesStaffSchema = z
	.object({
		caseIds: z.array(z.string().uuid()).min(1, 'Select at least one case to reassign'),
		originalStaffId: z.string().uuid('Invalid original staff ID'),
		targetStaffId: z.string().uuid('Invalid target staff ID'),
		roleCategory: z.string(), // e.g. "TECHNICIAN"
	})
	.superRefine((data, ctx) => {
		if (data.originalStaffId === data.targetStaffId) {
			ctx.addIssue({
				code: 'custom',
				message: 'Cannot reassign cases to the same staff member.',
				path: ['targetStaffId'],
			})
		}
	})
