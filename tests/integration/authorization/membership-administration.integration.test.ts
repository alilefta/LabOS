import { describe, expect, it, vi } from 'vitest'

import { authorizeLabOSMembershipOperation } from '@/modules/labos-authorization/membership-operation-authorization'
import { createMembershipAccessFactLoaders } from '@/modules/labos-authorization/fact-loaders/membership-access-facts'
import type {
	MembershipAccessFactRepository,
	MembershipAdministrationFacts,
} from '@/modules/labos-authorization/fact-loaders/membership-access-facts'
import { createMembershipAccessPolicies } from '@/modules/labos-authorization/policies/membership-access.policies'
import type { LabOSOrganizationRole } from '@/modules/labos-authorization/roles'
import { createLabOSAuthorizationService } from '@/modules/labos-authorization/service'
import { createOrganizationBoundaryResolver } from '@/modules/labos-authorization/target-resolvers/organization-boundary-resolver'
import { createMembershipAdministrationService } from '@/modules/labos-membership/membership-administration.service'
import type { TenantContext } from '@/platform/organizations'

type MemberRecord = MembershipAdministrationFacts

const MEMBER_A_OWNER = '10000000-0000-4000-8000-000000000001'
const MEMBER_A_ADMIN = '10000000-0000-4000-8000-000000000002'
const MEMBER_A_MANAGER = '10000000-0000-4000-8000-000000000003'
const MEMBER_A_STAFF = '10000000-0000-4000-8000-000000000004'
const MEMBER_A_LINKED_STAFF = '10000000-0000-4000-8000-000000000005'
const MEMBER_B_STAFF = '20000000-0000-4000-8000-000000000006'

const members = new Map<string, MemberRecord>([
	[
		MEMBER_A_OWNER,
		{
			memberId: MEMBER_A_OWNER,
			organizationId: 'organization-a',
			userId: 'user-a-owner',
			role: 'owner',
			staffId: null,
		},
	],
	[
		MEMBER_A_ADMIN,
		{
			memberId: MEMBER_A_ADMIN,
			organizationId: 'organization-a',
			userId: 'user-a-admin',
			role: 'admin',
			staffId: null,
		},
	],
	[
		MEMBER_A_MANAGER,
		{
			memberId: MEMBER_A_MANAGER,
			organizationId: 'organization-a',
			userId: 'user-a-manager',
			role: 'manager',
			staffId: null,
		},
	],
	[
		MEMBER_A_STAFF,
		{
			memberId: MEMBER_A_STAFF,
			organizationId: 'organization-a',
			userId: 'user-a-staff',
			role: 'staff',
			staffId: null,
		},
	],
	[
		MEMBER_A_LINKED_STAFF,
		{
			memberId: MEMBER_A_LINKED_STAFF,
			organizationId: 'organization-a',
			userId: 'user-a-linked-staff',
			role: 'staff',
			staffId: 'staff-a-linked',
		},
	],
	[
		MEMBER_B_STAFF,
		{
			memberId: MEMBER_B_STAFF,
			organizationId: 'organization-b',
			userId: 'user-b-staff',
			role: 'staff',
			staffId: null,
		},
	],
])

function tenant(
	role: LabOSOrganizationRole,
	overrides: Partial<TenantContext> = {},
): TenantContext {
	return {
		userId: `actor-${role}`,
		memberId: `actor-member-${role}`,
		memberRole: role,
		staffId: null,
		organizationId: 'organization-a',
		labId: 'lab-a',
		lab: { id: 'lab-a', title: 'Lab A', slug: 'lab-a' },
		...overrides,
	}
}

function createHarness() {
	const factRepository: MembershipAccessFactRepository = {
		findStaffAccessFacts: vi.fn(),
		findMembershipAdministrationFacts: vi.fn(
			async ({ organizationId, memberId }) => {
				const record = members.get(memberId)
				if (!record || record.organizationId !== organizationId) return null
				return record
			},
		),
	}
	const loaders = createMembershipAccessFactLoaders(factRepository)
	const authorizationService = createLabOSAuthorizationService({
		targetResolvers: {
			member: createOrganizationBoundaryResolver('member', {
				async findOrganizationBoundary(memberId) {
					const record = members.get(memberId)
					return record
						? { organizationId: record.organizationId }
						: null
				},
			}),
		},
		policies: createMembershipAccessPolicies({
			staffAccessFacts: loaders.staffAccess,
			membershipAdministrationFacts: loaders.membershipAdministration,
		}),
		monitor: { record: vi.fn() },
	})
	const authorize = vi.fn((input) =>
		authorizeLabOSMembershipOperation(input, { authorizationService }),
	)
	const gateway = {
		invite: vi.fn().mockResolvedValue({ invitationId: 'invitation-safe' }),
		updateRole: vi.fn().mockResolvedValue(undefined),
		remove: vi.fn().mockResolvedValue(undefined),
	}
	const monitor = { record: vi.fn() }
	const service = createMembershipAdministrationService({
		authorize,
		gateway,
		monitor,
		generateCorrelationId: () => 'integration-correlation',
		now: () => 1,
	})

	return {
		service,
		gateway,
		factRepository,
		monitor,
		context(actorTenant: TenantContext) {
			return {
				tenant: actorTenant,
				requestHeaders: new Headers({ cookie: 'session' }),
			}
		},
	}
}

describe('M-002/M-003/M-004 concrete membership administration rollout', () => {
	const actorRoles: readonly LabOSOrganizationRole[] = [
		'owner',
		'admin',
		'manager',
		'staff',
	]
	const requestedRoles: readonly LabOSOrganizationRole[] = [
		'owner',
		'admin',
		'manager',
		'staff',
	]

	it('enforces the complete Member-only invitation actor/role matrix', async () => {
		const invitationRoles = ['admin', 'manager', 'staff'] as const
		const allowed = new Set([
			'owner:admin',
			'owner:manager',
			'owner:staff',
			'admin:staff',
		])

		for (const actorRole of actorRoles) {
			for (const requestedRole of invitationRoles) {
				const { service, gateway, context } = createHarness()
				const operation = service.invite(
					{ email: 'fixture@example.test', role: requestedRole },
					context(tenant(actorRole)),
				)
				if (allowed.has(`${actorRole}:${requestedRole}`)) {
					await expect(operation).resolves.toEqual({
						status: 'invitation_sent',
						invitationId: 'invitation-safe',
					})
					expect(gateway.invite).toHaveBeenCalledOnce()
				} else {
					await expect(operation).rejects.toMatchObject({
						name: 'AuthorizationError',
					})
					expect(gateway.invite).not.toHaveBeenCalled()
				}
			}
		}
	})

	it('enforces the complete actor/requested-role matrix for M-002', async () => {
		const allowed = new Set([
			'owner:admin',
			'owner:manager',
			'owner:staff',
			'admin:staff',
		])

		for (const actorRole of actorRoles) {
			for (const requestedRole of requestedRoles) {
				const { service, gateway, context } = createHarness()
				const operation = service.updateRole(
					{ memberId: MEMBER_A_STAFF, roles: [requestedRole] },
					context(tenant(actorRole)),
				)
				const shouldAllow = allowed.has(`${actorRole}:${requestedRole}`)

				if (shouldAllow) {
					await expect(operation).resolves.toEqual({ status: 'role_updated' })
					expect(gateway.updateRole).toHaveBeenCalledOnce()
				} else {
					await expect(operation).rejects.toMatchObject({
						name: 'AuthorizationError',
					})
					expect(gateway.updateRole).not.toHaveBeenCalled()
				}
			}
		}
	})

	it('enforces the complete actor/target-role matrix for Member-only M-003', async () => {
		const targetByRole = {
			owner: MEMBER_A_OWNER,
			admin: MEMBER_A_ADMIN,
			manager: MEMBER_A_MANAGER,
			staff: MEMBER_A_STAFF,
		} as const

		for (const actorRole of actorRoles) {
			for (const targetRole of actorRoles) {
				const { service, gateway, context } = createHarness()
				const operation = service.remove(
					{ memberId: targetByRole[targetRole] },
					context(tenant(actorRole)),
				)
				const shouldAllow =
					(actorRole === 'owner' || actorRole === 'admin') &&
					targetRole !== 'owner'

				if (shouldAllow) {
					await expect(operation).resolves.toEqual({
						status: 'membership_removed',
					})
					expect(gateway.remove).toHaveBeenCalledOnce()
				} else {
					await expect(operation).rejects.toMatchObject({
						name: 'AuthorizationError',
					})
					expect(gateway.remove).not.toHaveBeenCalled()
				}
			}
		}
	})

	it('denies self, every Owner target, and linked Staff before the provider', async () => {
		const scenarios = [
			{
				actor: tenant('owner', {
					memberId: MEMBER_A_STAFF,
					userId: 'user-a-staff',
				}),
				target: MEMBER_A_STAFF,
			},
			{ actor: tenant('owner'), target: MEMBER_A_OWNER },
			{ actor: tenant('owner'), target: MEMBER_A_LINKED_STAFF },
		]

		for (const scenario of scenarios) {
			const { service, gateway, context } = createHarness()
			await expect(
				service.remove(
					{ memberId: scenario.target },
					context(scenario.actor),
				),
			).rejects.toMatchObject({ name: 'AuthorizationError' })
			expect(gateway.remove).not.toHaveBeenCalled()
		}
	})

	it('denies a cross-Organization target before policy facts or provider work', async () => {
		const { service, gateway, factRepository, context } = createHarness()

		await expect(
			service.remove(
				{ memberId: MEMBER_B_STAFF },
				context(tenant('owner')),
			),
		).rejects.toMatchObject({
			name: 'AuthorizationError',
			reason: 'AUTHZ_TENANT_MISMATCH',
		})
		expect(
			factRepository.findMembershipAdministrationFacts,
		).not.toHaveBeenCalled()
		expect(gateway.remove).not.toHaveBeenCalled()
	})

	it('uses the newly active Organization after switching', async () => {
		const { service, gateway, context } = createHarness()
		const organizationB = tenant('owner', {
			userId: 'user-b-owner',
			memberId: 'member-b-owner',
			organizationId: 'organization-b',
			labId: 'lab-b',
			lab: { id: 'lab-b', title: 'Lab B', slug: 'lab-b' },
		})

		await expect(
			service.updateRole(
				{ memberId: MEMBER_B_STAFF, roles: ['manager'] },
				context(organizationB),
			),
		).resolves.toEqual({ status: 'role_updated' })
		expect(gateway.updateRole).toHaveBeenCalledWith(
			expect.objectContaining({
				organizationId: 'organization-b',
				memberId: MEMBER_B_STAFF,
			}),
		)
	})

	it('surfaces Better Auth denial after V1 allow without reporting success', async () => {
		const { service, gateway, monitor, context } = createHarness()
		const providerDenial = new Error('provider denied')
		gateway.updateRole.mockRejectedValueOnce(providerDenial)

		await expect(
			service.updateRole(
				{ memberId: MEMBER_A_STAFF, roles: ['manager'] },
				context(tenant('owner')),
			),
		).rejects.toBe(providerDenial)
		expect(monitor.record).toHaveBeenLastCalledWith(
			expect.objectContaining({
				outcome: 'failed',
				phase: 'provider',
			}),
		)
	})
})
