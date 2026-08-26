import { describe, expect, it, vi } from 'vitest'

import {
	createAuthorizationFactCache,
	createAuthorizationService,
	createPermissionDefinitionRegistry,
	createRolePermissionBundles,
} from '@/platform/authorization'
import { createMembershipAccessFactLoaders } from '@/modules/labos-authorization/fact-loaders/membership-access-facts'
import { createOrganizationBoundaryResolver } from '@/modules/labos-authorization/target-resolvers/organization-boundary-resolver'

const actor = {
	userId: 'user-1',
	memberId: 'actor-member-1',
	organizationId: 'organization-1',
	memberRoles: ['owner'],
} as const

describe('LabOS membership target resolvers', () => {
	it('returns the authoritative Organization and lets the kernel deny isolation mismatches', async () => {
		const policy = { evaluate: vi.fn().mockResolvedValue({ allowed: true }) }
		const lookup = {
			findOrganizationBoundary: vi
				.fn()
				.mockResolvedValue({ organizationId: 'organization-2' }),
		}
		const resolver = createOrganizationBoundaryResolver('staff', lookup)
		const service = createAuthorizationService({
			knownRoles: ['owner'] as const,
			roleBundles: createRolePermissionBundles({
				roles: ['owner'] as const,
				permissions: ['staff.access.revoke'] as const,
				bundles: { owner: ['staff.access.revoke'] } as const,
			}),
			permissionDefinitions: createPermissionDefinitionRegistry([
				{
					permission: 'staff.access.revoke',
					scope: 'resource',
					targetTypes: ['staff'],
					requiredPolicies: ['staff.access.target'],
					sensitivity: 'critical',
				},
			] as const),
			targetResolvers: { staff: resolver },
			policies: { 'staff.access.target': policy },
		})

		const request = {
				actor,
				permission: 'staff.access.revoke',
				target: { type: 'staff', id: 'foreign-staff' },
			} as const

		await expect(
			service.can(request),
		).resolves.toEqual({ allowed: false, reason: 'AUTHZ_TENANT_MISMATCH' })
		await service.can(request)
		expect(lookup.findOrganizationBoundary).toHaveBeenCalledTimes(2)
		expect(policy.evaluate).not.toHaveBeenCalled()
	})

	it('reuses a boundary inside one evaluation cache and rejects the wrong target type', async () => {
		const lookup = {
			findOrganizationBoundary: vi
				.fn()
				.mockResolvedValue({ organizationId: 'organization-1' }),
		}
		const resolver = createOrganizationBoundaryResolver('staff', lookup)
		const facts = createAuthorizationFactCache()

		const input = {
			actor,
			target: { type: 'staff' as const, id: 'staff-1' },
			facts,
		}
		await resolver.resolveOrganizationId(input)
		await resolver.resolveOrganizationId(input)
		expect(lookup.findOrganizationBoundary).toHaveBeenCalledOnce()

		await expect(
			resolver.resolveOrganizationId({
				actor,
				target: { type: 'member', id: 'member-1' },
				facts,
			}),
		).resolves.toBeNull()
		expect(lookup.findOrganizationBoundary).toHaveBeenCalledOnce()
	})
})

describe('LabOS membership policy fact loaders', () => {
	it('constrains Staff facts by the actor Organization and reuses the snapshot', async () => {
		const staffFacts = {
			staffId: 'staff-1',
			labId: 'lab-1',
			organizationId: 'organization-1',
			isActive: true,
			member: null,
			invitation: null,
		} as const
		const repository = {
			findStaffAccessFacts: vi.fn().mockResolvedValue(staffFacts),
			findMembershipAdministrationFacts: vi.fn(),
		}
		const loaders = createMembershipAccessFactLoaders(repository)
		const facts = createAuthorizationFactCache()
		const input = {
			actor,
			target: { type: 'staff' as const, id: 'staff-1' },
			facts,
		}

		await expect(loaders.staffAccess.load(input)).resolves.toBe(staffFacts)
		await expect(loaders.staffAccess.load(input)).resolves.toBe(staffFacts)
		expect(repository.findStaffAccessFacts).toHaveBeenCalledOnce()
		expect(repository.findStaffAccessFacts).toHaveBeenCalledWith({
			organizationId: 'organization-1',
			staffId: 'staff-1',
		})

		await loaders.staffAccess.load({
			...input,
			facts: createAuthorizationFactCache(),
		})
		expect(repository.findStaffAccessFacts).toHaveBeenCalledTimes(2)
	})

	it('uses a separate tenant-scoped fact contract for generic Member targets', async () => {
		const memberFacts = {
			memberId: 'member-2',
			organizationId: 'organization-1',
			userId: 'user-2',
			role: 'staff',
			staffId: null,
		} as const
		const repository = {
			findStaffAccessFacts: vi.fn(),
			findMembershipAdministrationFacts: vi
				.fn()
				.mockResolvedValue(memberFacts),
		}
		const loader =
			createMembershipAccessFactLoaders(repository).membershipAdministration

		await expect(
			loader.load({
				actor,
				target: { type: 'member', id: 'member-2' },
				facts: createAuthorizationFactCache(),
			}),
		).resolves.toBe(memberFacts)
		expect(repository.findMembershipAdministrationFacts).toHaveBeenCalledWith({
			organizationId: 'organization-1',
			memberId: 'member-2',
		})
		expect(repository.findStaffAccessFacts).not.toHaveBeenCalled()
	})
})
