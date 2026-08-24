import { describe, expect, it } from 'vitest'

import {
	LABOS_ACTION_BOUNDARY_ERROR_CODES,
	LABOS_ACTION_BOUNDARY_IDS,
	LabOSActionBoundaryError,
	projectLabOSActionBoundary,
} from '@/modules/labos-authorization/action-boundaries'
import type { LabOSActionBoundaryId } from '@/modules/labos-authorization/action-boundaries'
import {
	GrantStaffSystemAccessInputSchema,
	RevokeStaffSystemAccessInputSchema,
} from '@/schema/composed/team/staff-settings.schema'

const STAFF_ID = '9a58f4c9-f112-4479-af03-6d3991ad7848'

describe('LabOS action-boundary registry', () => {
	it('exposes only the stable reviewed boundary IDs', () => {
		expect(LABOS_ACTION_BOUNDARY_IDS).toEqual(['A-124', 'A-125'])
		expect(Object.isFrozen(LABOS_ACTION_BOUNDARY_IDS)).toBe(true)
	})

	it.each([
		['OWNER', 'owner'],
		['ADMIN', 'admin'],
		['MANAGER', 'manager'],
		['STAFF', 'staff'],
	] as const)(
		'projects validated A-124 %s role intent to %s without granting it',
		(roleToGrant, requestedRole) => {
			const parsedInput = GrantStaffSystemAccessInputSchema.parse({
				staffId: STAFF_ID,
				email: '  staff@example.com  ',
				roleToGrant,
				permission: 'billing.manage',
				organizationId: 'forged-organization',
			})

			const projection = projectLabOSActionBoundary('A-124', parsedInput)

			expect(projection).toEqual({
				boundaryId: 'A-124',
				actionName: 'Grant-Staff-System-Access',
				legacyRequiredRole: 'ADMIN',
				permission: 'staff.access.invite',
				target: { type: 'staff', id: STAFF_ID },
				operation: {
					kind: 'staff.access.invite',
					requestedRole,
					recipientEmail: 'staff@example.com',
				},
			})
			expect(projection).not.toHaveProperty('organizationId')
		},
	)

	it('projects validated A-125 input to its fixed permission and Staff target', () => {
		const parsedInput = RevokeStaffSystemAccessInputSchema.parse({
			staffId: STAFF_ID,
			permission: 'membership.remove',
			target: { type: 'member', id: 'forged-member' },
		})

		expect(projectLabOSActionBoundary('A-125', parsedInput)).toEqual({
			boundaryId: 'A-125',
			actionName: 'Revoke-Staff-System-Access',
			legacyRequiredRole: 'ADMIN',
			permission: 'staff.access.revoke',
			target: { type: 'staff', id: STAFF_ID },
		})
	})

	it('returns immutable projection, target, and operation snapshots', () => {
		const parsedInput = GrantStaffSystemAccessInputSchema.parse({
			staffId: STAFF_ID,
			email: 'staff@example.com',
			roleToGrant: 'STAFF',
		})
		const projection = projectLabOSActionBoundary('A-124', parsedInput)

		expect(Object.isFrozen(projection)).toBe(true)
		expect(Object.isFrozen(projection.target)).toBe(true)
		expect(Object.isFrozen(projection.operation)).toBe(true)
	})

	it('fails closed with a sanitized error for stale validated-input wiring', () => {
		const sensitiveEmail = 'private-person@example.com'
		let thrown: unknown

		try {
			projectLabOSActionBoundary('A-124', {
				staffId: STAFF_ID,
				email: sensitiveEmail,
				roleToGrant: 'NOT_CONFIGURED',
			})
		} catch (error) {
			thrown = error
		}

		expect(thrown).toBeInstanceOf(LabOSActionBoundaryError)
		expect(thrown).toMatchObject({
			code: LABOS_ACTION_BOUNDARY_ERROR_CODES.VALIDATED_INPUT_INVALID,
			message: 'Authorization boundary projection failed',
		})
		expect((thrown as Error).message).not.toContain(sensitiveEmail)
	})

	it('fails closed when runtime metadata references an unknown boundary', () => {
		expect(() =>
			projectLabOSActionBoundary(
				'A-999' as LabOSActionBoundaryId,
				{ staffId: STAFF_ID },
			),
		).toThrowError(
			expect.objectContaining({
				code: LABOS_ACTION_BOUNDARY_ERROR_CODES.BOUNDARY_NOT_REGISTERED,
			}),
		)
	})
})
