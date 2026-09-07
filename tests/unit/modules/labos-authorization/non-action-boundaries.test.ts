import { describe, expect, it } from 'vitest'

import {
	getLabOSNonActionBoundaryMetadata,
	LABOS_NON_ACTION_BOUNDARY_ERROR_CODES,
	LABOS_NON_ACTION_BOUNDARY_IDS,
	LabOSNonActionBoundaryError,
	type LabOSNonActionBoundaryId,
	projectNApi002DentistDetailBoundary,
} from '@/modules/labos-authorization/non-action-boundaries'
import { LABOS_PERMISSION_DEFINITION_REGISTRY } from '@/modules/labos-authorization/permission-definitions'

describe('LabOS non-action authorization boundary registry', () => {
	it('registers the Team & Roles directory under one stable ID', () => {
		expect(LABOS_NON_ACTION_BOUNDARY_IDS).toEqual([
			'N-001',
			'N-002',
			'N-API-002',
		])
		expect(Object.isFrozen(LABOS_NON_ACTION_BOUNDARY_IDS)).toBe(true)

		const metadata = getLabOSNonActionBoundaryMetadata('N-001')
		expect(metadata).toEqual({
			boundaryId: 'N-001',
			kind: 'server-page',
			boundaryName: 'Team-And-Roles-Directory',
			route: '/settings/team',
			source: 'app/(main)/settings/team/page.tsx',
			permission: 'membership.list',
			legacyAccess: 'verified-tenant-member',
			wave: 'membership',
		})
		expect(Object.isFrozen(metadata)).toBe(true)
	})

	it('registers and projects the Dentist detail API with fixed policy inputs', () => {
		expect(getLabOSNonActionBoundaryMetadata('N-API-002')).toMatchObject({
			boundaryId: 'N-API-002',
			kind: 'route-handler',
			permission: 'dentist.read',
			migration: 'LEGACY_TENANT_ONLY -> V1_AUTHENTICATED_RESOURCE_SCOPED',
		})
		expect(
			projectNApi002DentistDetailBoundary({
				dentistId: '11111111-1111-4111-8111-111111111111',
				clinicId: '22222222-2222-4222-8222-222222222222',
			}),
		).toEqual({
			boundaryId: 'N-API-002',
			boundaryName: 'Dentist-Detail-API',
			permission: 'dentist.read',
			target: {
				type: 'dentist',
				id: '11111111-1111-4111-8111-111111111111',
			},
			operation: {
				kind: 'dentist.detail.read',
				routeClinicId: '22222222-2222-4222-8222-222222222222',
			},
		})
	})

	it('rejects malformed Dentist route identifiers before projection', () => {
		expect(() =>
			projectNApi002DentistDetailBoundary({
				dentistId: 'not-a-uuid',
				clinicId: '22222222-2222-4222-8222-222222222222',
			}),
		).toThrow('Authorization boundary input is invalid')
	})

	it('registers and projects the authenticated resource-scoped paystub boundary', async () => {
		const { projectN002PaystubBoundary } = await import(
			'@/modules/labos-authorization/non-action-boundaries'
		)
		expect(getLabOSNonActionBoundaryMetadata('N-002')).toMatchObject({
			boundaryId: 'N-002',
			permissions: ['payout.read', 'payout.self.read'],
			migration: 'LEGACY_PUBLIC -> V1_AUTHENTICATED_RESOURCE_SCOPED',
		})
		expect(
			projectN002PaystubBoundary({
				staffId: '11111111-1111-4111-8111-111111111111',
				payoutId: '22222222-2222-4222-8222-222222222222',
			}),
		).toMatchObject({
			boundaryId: 'N-002',
			target: { type: 'payout', id: '22222222-2222-4222-8222-222222222222' },
			operation: {
				kind: 'payout.paystub.read',
				routeStaffId: '11111111-1111-4111-8111-111111111111',
			},
		})
	})

	it('derives scope, policies, and sensitivity from the trusted catalog', () => {
		const metadata = getLabOSNonActionBoundaryMetadata('N-001')
		const definition = LABOS_PERMISSION_DEFINITION_REGISTRY.get(
			metadata.permission,
		)

		expect(definition).toEqual({
			permission: 'membership.list',
			scope: 'organization',
			requiredPolicies: [],
			sensitivity: 'sensitive',
		})
	})

	it('fails closed with a sanitized error for an unknown boundary ID', () => {
		let thrown: unknown
		try {
			getLabOSNonActionBoundaryMetadata(
				'N-999' as LabOSNonActionBoundaryId,
			)
		} catch (error) {
			thrown = error
		}

		expect(thrown).toBeInstanceOf(LabOSNonActionBoundaryError)
		expect(thrown).toMatchObject({
			code: LABOS_NON_ACTION_BOUNDARY_ERROR_CODES.BOUNDARY_NOT_REGISTERED,
			message: 'Authorization boundary is not registered',
		})
	})
})
