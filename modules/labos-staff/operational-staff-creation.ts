import type { CreateLabStaffInput } from '@/schema/composed/team/staff.schema'

/**
 * The non-entitling compensation state used by A-123. A later
 * `staff.compensation.update` command is required before the Staff member can
 * receive a percentage or fixed per-case amount.
 */
export const SAFE_INITIAL_STAFF_COMPENSATION = Object.freeze({
	commissionType: 'PERCENTAGE' as const,
	commissionValue: 0,
})

/**
 * Builds the tenant-scoped persistence input from an already validated A-123
 * payload. Keeping this transformation explicit makes the security boundary
 * testable and prevents access, invitation, or financial fields from leaking
 * back into basic Staff creation.
 */
export function buildOperationalStaffCreateData(
	input: CreateLabStaffInput,
	labId: string,
) {
	return {
		...input,
		address1: input.address1 || 'N/A',
		address2: input.address2 || null,
		city: input.city || 'N/A',
		zipcode: input.zipcode || null,
		avatarUrl: input.avatarUrl || null,
		specialization: input.specialization || null,
		jobTitle: input.jobTitle || null,
		...SAFE_INITIAL_STAFF_COMPENSATION,
		labId,
	}
}
