import { z } from 'zod'

import { LABOS_ORGANIZATION_ROLES } from '@/modules/labos-authorization/roles'

/**
 * Better Auth identifiers are provider-owned opaque strings, not LabOS UUIDs.
 * Keep the boundary encoding-agnostic while rejecting empty, padded/whitespace,
 * control-character, and unreasonably large values before persistence access.
 */
export const BetterAuthMemberIdSchema = z
	.string()
	.min(1, 'Invalid Member ID format.')
	.max(128, 'Invalid Member ID format.')
	.regex(/^\S+$/u, 'Invalid Member ID format.')

export const MembershipTargetInputSchema = z
	.object({
		memberId: BetterAuthMemberIdSchema,
	})
	.strict()

/**
 * Generic Organization invitation input. This command deliberately carries no
 * LabStaff identifier or linkage intent; acceptance creates Member-only access.
 */
export const InviteOrganizationMemberInputSchema = z
	.object({
		email: z
			.string()
			.trim()
			.toLowerCase()
			.email('Please enter a valid email address.')
			.max(320, 'Email address is too long.'),
		role: z.enum(['admin', 'manager', 'staff']),
	})
	.strict()

export const UpdateMembershipRoleInputSchema = z
	.object({
		memberId: BetterAuthMemberIdSchema,
		roles: z
			.array(z.enum(LABOS_ORGANIZATION_ROLES))
			.min(1, 'At least one role is required.')
			.max(LABOS_ORGANIZATION_ROLES.length)
			.refine((roles) => new Set(roles).size === roles.length, {
				message: 'Duplicate roles are not allowed.',
			}),
	})
	.strict()

export type MembershipTargetInput = z.infer<
	typeof MembershipTargetInputSchema
>
export type InviteOrganizationMemberInput = z.infer<
	typeof InviteOrganizationMemberInputSchema
>
export type UpdateMembershipRoleInput = z.infer<
	typeof UpdateMembershipRoleInputSchema
>
