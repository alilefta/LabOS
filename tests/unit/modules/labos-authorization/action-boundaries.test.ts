import { describe, expect, it } from 'vitest'

import {
	LABOS_ACTION_BOUNDARY_ERROR_CODES,
	LABOS_ACTION_BOUNDARY_IDS,
	LabOSActionBoundaryError,
	getLabOSActionBoundaryInputSchema,
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
		expect(LABOS_ACTION_BOUNDARY_IDS).toEqual([
			'A-086',
			'A-089',
			'A-097',
			'N-FIN-PL-001',
			'A-123',
			'A-124',
			'A-125',
		])
		expect(Object.isFrozen(LABOS_ACTION_BOUNDARY_IDS)).toBe(true)
	})

	it('projects A-089 to Organization permission and a closed validated Case intent', () => {
		const clinicId = '9a58f4c9-f112-4479-af03-6d3991ad7849'
		const caseId = '9a58f4c9-f112-4479-af03-6d3991ad7850'
		const input = { clinicId, caseIds: [caseId], status: 'SENT', billingTerms: 'RECEIPT', discountPercentage: 0, permission: 'billing.manage' }
		const parsed = getLabOSActionBoundaryInputSchema('A-089').parse(input)
		const projection = projectLabOSActionBoundary('A-089', parsed)
		expect(projection).toEqual({
			boundaryId: 'A-089', actionName: 'Create-Invoice-Action',
			legacyComparisonRole: 'MANAGER', permission: 'invoice.create',
			operation: { kind: 'invoice.create', clinicId, caseIds: [caseId] },
		})
		expect(projection).not.toHaveProperty('target')
		expect(Object.isFrozen(projection.operation)).toBe(true)
		expect(Object.isFrozen(projection.operation.caseIds)).toBe(true)
		expect(() => projectLabOSActionBoundary('A-089', { ...parsed, caseIds: [caseId, caseId] })).toThrow()
		expect(() => projectLabOSActionBoundary('A-089', { ...parsed, clinicId: 'bad' })).toThrow()
	})

	it('projects A-097 to a fixed Invoice permission and closed update intent', () => {
		const invoiceId = '9a58f4c9-f112-4479-af03-6d3991ad7848'
		const clinicId = '9a58f4c9-f112-4479-af03-6d3991ad7849'
		const caseId = '9a58f4c9-f112-4479-af03-6d3991ad7850'
		const input = {
			invoiceId, clinicId, caseIds: [caseId], status: 'SENT',
			billingTerms: 'RECEIPT', discountPercentage: 0,
			permission: 'billing.manage', organizationId: 'forged',
		}
		const parsed = getLabOSActionBoundaryInputSchema('A-097').parse(input)
		const projection = projectLabOSActionBoundary('A-097', parsed)

		expect(projection).toEqual({
			boundaryId: 'A-097', actionName: 'Update-Draft-Invoice-Action',
			legacyComparisonRole: 'MANAGER', permission: 'invoice.update',
			target: { type: 'invoice', id: invoiceId },
			operation: { kind: 'invoice.draft.update', clinicId, caseIds: [caseId] },
		})
		expect(Object.isFrozen(projection.target)).toBe(true)
		expect(Object.isFrozen(projection.operation)).toBe(true)
		expect(projection.operation?.kind).toBe('invoice.draft.update')
		if (projection.operation?.kind === 'invoice.draft.update') {
			expect(Object.isFrozen(projection.operation.caseIds)).toBe(true)
		}
		expect(() => projectLabOSActionBoundary('A-097', { ...parsed, caseIds: ['bad'] })).toThrowError(
			expect.objectContaining({ code: LABOS_ACTION_BOUNDARY_ERROR_CODES.VALIDATED_INPUT_INVALID }),
		)
	})

	it('accepts only an Invoice UUID for public-link sharing and projects a closed intent', () => {
		const invoiceId = STAFF_ID
		const parsed = getLabOSActionBoundaryInputSchema('N-FIN-PL-001').parse({ invoiceId })
		expect(projectLabOSActionBoundary('N-FIN-PL-001', parsed)).toEqual({
			boundaryId: 'N-FIN-PL-001', actionName: 'Share-Invoice-Public-Link-Action',
			legacyComparisonRole: 'MANAGER', permission: 'invoice.public_link.share',
			target: { type: 'invoice', id: invoiceId },
			operation: { kind: 'invoice.public_link.share' },
		})
		expect(() => getLabOSActionBoundaryInputSchema('N-FIN-PL-001').parse({ invoiceId, token: 'forged' })).toThrow()
		expect(() => projectLabOSActionBoundary('N-FIN-PL-001', { invoiceId: 'bad' })).toThrow()
	})

	it('owns the A-086 schema and projects no caller data', () => {
		const schema = getLabOSActionBoundaryInputSchema('A-086')
		expect(schema.parse(undefined)).toBeUndefined()
		expect(() => schema.parse({ permission: 'billing.manage' })).toThrow()
		expect(projectLabOSActionBoundary('A-086', undefined)).toEqual({
			boundaryId: 'A-086',
			actionName: 'Sync-Overdue-Invoices-Action',
			legacyComparisonRole: 'MANAGER',
			permission: 'invoice.overdue.sync',
		})
	})

	it('projects A-123 as an Organization-scoped permission without Staff PII', () => {
		const projection = projectLabOSActionBoundary('A-123', {
			firstName: 'Private',
			lastName: 'Person',
			phoneNumber: '+9647000000000',
			address1: 'Private address',
		})

		expect(projection).toEqual({
			boundaryId: 'A-123',
			actionName: 'Register-Team-Lab-Staff-Action',
			legacyComparisonRole: 'ADMIN',
			permission: 'staff.create',
		})
		expect(projection).not.toHaveProperty('target')
		expect(JSON.stringify(projection)).not.toContain('Private')
		expect(Object.isFrozen(projection)).toBe(true)
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
				legacyComparisonRole: 'ADMIN',
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
			legacyComparisonRole: 'ADMIN',
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
