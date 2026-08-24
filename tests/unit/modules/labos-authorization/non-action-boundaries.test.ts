import { describe, expect, it } from 'vitest'

import {
	getLabOSNonActionBoundaryMetadata,
	LABOS_NON_ACTION_BOUNDARY_ERROR_CODES,
	LABOS_NON_ACTION_BOUNDARY_IDS,
	LabOSNonActionBoundaryError,
	type LabOSNonActionBoundaryId,
} from '@/modules/labos-authorization/non-action-boundaries'
import { LABOS_PERMISSION_DEFINITION_REGISTRY } from '@/modules/labos-authorization/permission-definitions'

describe('LabOS non-action authorization boundary registry', () => {
	it('registers the Team & Roles directory under one stable ID', () => {
		expect(LABOS_NON_ACTION_BOUNDARY_IDS).toEqual(['N-001'])
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
