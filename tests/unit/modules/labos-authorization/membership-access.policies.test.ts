import { describe, expect, it, vi } from 'vitest'

import {
	createAuthorizationFactCache,
	createAuthorizationService,
} from '@/platform/authorization'
import type {
	AuthorizationActor,
	AuthorizationRequest,
} from '@/platform/authorization'
import {
	LABOS_PERMISSION_DEFINITION_REGISTRY,
	LABOS_ROLE_PERMISSION_BUNDLES,
} from '@/modules/labos-authorization'
import type {
	MembershipAdministrationFacts,
	StaffAccessFacts,
} from '@/modules/labos-authorization/fact-loaders/membership-access-facts'
import { createMembershipAccessFactLoaders } from '@/modules/labos-authorization/fact-loaders/membership-access-facts'
import type { LabOSAuthorizationOperationMap } from '@/modules/labos-authorization/operation-intents'
import type { LabOSPermission } from '@/modules/labos-authorization/permissions'
import { createMembershipAccessPolicies } from '@/modules/labos-authorization/policies/membership-access.policies'
import type { LabOSPolicyId } from '@/modules/labos-authorization/policy-ids'
import type { LabOSResourceType } from '@/modules/labos-authorization/resource-types'
import type { LabOSOrganizationRole } from '@/modules/labos-authorization/roles'

const ORGANIZATION_ID = 'organization-1'
const LAB_ID = 'lab-1'
const STAFF_ID = 'staff-1'
const TARGET_MEMBER_ID = 'member-2'

function actor(role: LabOSOrganizationRole = 'owner'): AuthorizationActor {
	return {
		userId: 'actor-user',
		memberId: 'actor-member',
		organizationId: ORGANIZATION_ID,
		memberRoles: [role],
	}
}

function staffFacts(
	overrides: Partial<StaffAccessFacts> = {},
): StaffAccessFacts {
	return {
		staffId: STAFF_ID,
		labId: LAB_ID,
		organizationId: ORGANIZATION_ID,
		isActive: true,
		member: null,
		invitation: null,
		...overrides,
	}
}

function member(role: string, overrides: Partial<NonNullable<StaffAccessFacts['member']>> = {}) {
	return {
		id: TARGET_MEMBER_ID,
		userId: 'target-user',
		organizationId: ORGANIZATION_ID,
		role,
		...overrides,
	}
}

function invitation(
	role: string | null,
	overrides: Partial<NonNullable<StaffAccessFacts['invitation']>> = {},
) {
	return {
		id: 'invitation-1',
		organizationId: ORGANIZATION_ID,
		email: 'target@example.com',
		role,
		status: 'pending',
		expiresAt: new Date('2030-01-02T00:00:00.000Z'),
		intentLabId: LAB_ID,
		...overrides,
	}
}

function membershipFacts(
	role: string,
	overrides: Partial<MembershipAdministrationFacts> = {},
): MembershipAdministrationFacts {
	return {
		memberId: TARGET_MEMBER_ID,
		organizationId: ORGANIZATION_ID,
		userId: 'target-user',
		role,
		staffId: null,
		...overrides,
	}
}

function createHarness() {
	const staffAccessFacts = { load: vi.fn() }
	const membershipAdministrationFacts = { load: vi.fn() }
	const policies = createMembershipAccessPolicies({
		staffAccessFacts,
		membershipAdministrationFacts,
		now: () => new Date('2030-01-01T00:00:00.000Z'),
	})

	return { policies, staffAccessFacts, membershipAdministrationFacts }
}

function staffInviteContext(
	actorRole: LabOSOrganizationRole,
	requestedRole: LabOSOrganizationRole,
	recipientEmail = 'target@example.com',
) {
	return {
		actor: actor(actorRole),
		permission: 'staff.access.invite' as const,
		target: { type: 'staff' as const, id: STAFF_ID },
		operation: {
			kind: 'staff.access.invite' as const,
			requestedRole,
			recipientEmail,
		},
		facts: createAuthorizationFactCache(),
	}
}

function staffRevokeContext(actorRole: LabOSOrganizationRole) {
	return {
		actor: actor(actorRole),
		permission: 'staff.access.revoke' as const,
		target: { type: 'staff' as const, id: STAFF_ID },
		facts: createAuthorizationFactCache(),
	}
}

function staffAnalyticsContext(actorRole: LabOSOrganizationRole) {
	return {
		actor: actor(actorRole),
		permission: 'staff.analytics.read' as const,
		target: { type: 'staff' as const, id: STAFF_ID },
		facts: createAuthorizationFactCache(),
	}
}

function staffReadContext(actorRole: LabOSOrganizationRole) {
	return {
		actor: actor(actorRole),
		permission: 'staff.read' as const,
		target: { type: 'staff' as const, id: STAFF_ID },
		facts: createAuthorizationFactCache(),
	}
}

function staffWorkbenchContext(actorRole: LabOSOrganizationRole) {
	return {
		actor: actor(actorRole),
		permission: 'staff.workbench.read' as const,
		target: { type: 'staff' as const, id: STAFF_ID },
		facts: createAuthorizationFactCache(),
	}
}

function membershipUpdateContext(
	actorRole: LabOSOrganizationRole,
	requestedRoles: readonly LabOSOrganizationRole[],
) {
	return {
		actor: actor(actorRole),
		permission: 'membership.role.update' as const,
		target: { type: 'member' as const, id: TARGET_MEMBER_ID },
		operation: {
			kind: 'membership.role.update' as const,
			requestedRoles,
		},
		facts: createAuthorizationFactCache(),
	}
}

function membershipRemoveContext(actorRole: LabOSOrganizationRole) {
	return {
		actor: actor(actorRole),
		permission: 'membership.remove' as const,
		target: { type: 'member' as const, id: TARGET_MEMBER_ID },
		facts: createAuthorizationFactCache(),
	}
}

function membershipInviteContext(
	actorRole: LabOSOrganizationRole,
	requestedRole: Exclude<LabOSOrganizationRole, 'owner'>,
	email = 'member@example.test',
) {
	return {
		actor: actor(actorRole),
		permission: 'membership.invite' as const,
		operation: {
			kind: 'membership.invite' as const,
			requestedRole,
			recipientEmail: email,
		},
		facts: createAuthorizationFactCache(),
	}
}

describe('Staff-access policies', () => {
	it('requires an active same-Organization Staff target with no Member for invitation', async () => {
		const { policies, staffAccessFacts } = createHarness()
		staffAccessFacts.load.mockResolvedValueOnce(null)
		await expect(
			policies['staff.access.target'].evaluate(
				staffInviteContext('owner', 'staff'),
			),
		).resolves.toMatchObject({
			allowed: false,
			reason: 'AUTHZ_POLICY_FACT_MISSING',
		})

		staffAccessFacts.load.mockResolvedValueOnce(
			staffFacts({ isActive: false }),
		)
		await expect(
			policies['staff.access.target'].evaluate(
				staffInviteContext('owner', 'staff'),
			),
		).resolves.toMatchObject({ allowed: false })

		staffAccessFacts.load.mockResolvedValueOnce(
			staffFacts({ member: member('staff') }),
		)
		await expect(
			policies['staff.access.target'].evaluate(
				staffInviteContext('owner', 'staff'),
			),
		).resolves.toMatchObject({ allowed: false })
	})

	it('denies Staff-administration self targeting by Member or AuthUser identity', async () => {
		const { policies, staffAccessFacts } = createHarness()
		staffAccessFacts.load.mockResolvedValueOnce(
			staffFacts({ member: member('staff', { id: 'actor-member' }) }),
		)
		await expect(
			policies['staff.access.self_target'].evaluate(
				staffRevokeContext('owner'),
			),
		).resolves.toMatchObject({ allowed: false })

		staffAccessFacts.load.mockResolvedValueOnce(
			staffFacts({ member: member('staff', { userId: 'actor-user' }) }),
		)
		await expect(
			policies['staff.access.self_target'].evaluate(
				staffRevokeContext('owner'),
			),
		).resolves.toMatchObject({ allowed: false })
	})

	it('enforces the complete approved invite role-target matrix', async () => {
		const { policies, staffAccessFacts } = createHarness()
		const roles: readonly LabOSOrganizationRole[] = [
			'owner',
			'admin',
			'manager',
			'staff',
		]
		const allowed = new Set([
			'owner:admin',
			'owner:manager',
			'owner:staff',
			'admin:staff',
		])

		for (const actorRole of roles) {
			for (const targetRole of roles) {
				staffAccessFacts.load.mockResolvedValueOnce(staffFacts())
				const result = await policies['staff.access.role_target'].evaluate(
					staffInviteContext(actorRole, targetRole),
				)
				expect(result.allowed, `${actorRole} -> ${targetRole}`).toBe(
					allowed.has(`${actorRole}:${targetRole}`),
				)
				if (targetRole === 'owner') {
					expect(result).toMatchObject({ reason: 'AUTHZ_OWNER_INVARIANT' })
				}
			}
		}
	})

	it('uses the linked Member or pending intent role for the revoke matrix', async () => {
		const { policies, staffAccessFacts } = createHarness()
		staffAccessFacts.load.mockResolvedValueOnce(
			staffFacts({ member: member('manager') }),
		)
		await expect(
			policies['staff.access.role_target'].evaluate(
				staffRevokeContext('owner'),
			),
		).resolves.toEqual({ allowed: true })

		staffAccessFacts.load.mockResolvedValueOnce(
			staffFacts({ invitation: invitation('manager') }),
		)
		await expect(
			policies['staff.access.role_target'].evaluate(
				staffRevokeContext('admin'),
			),
		).resolves.toMatchObject({ allowed: false })

		staffAccessFacts.load.mockResolvedValueOnce(
			staffFacts({ member: member('owner') }),
		)
		await expect(
			policies['staff.access.role_target'].evaluate(
				staffRevokeContext('owner'),
			),
		).resolves.toMatchObject({ reason: 'AUTHZ_OWNER_INVARIANT' })
	})

	it('fails closed for ambiguous or malformed authoritative role state', async () => {
		const { policies, staffAccessFacts } = createHarness()
		staffAccessFacts.load.mockResolvedValueOnce(
			staffFacts({
				member: member('staff'),
				invitation: invitation('staff'),
			}),
		)
		await expect(
			policies['staff.access.role_target'].evaluate(
				staffRevokeContext('owner'),
			),
		).resolves.toMatchObject({ reason: 'AUTHZ_POLICY_FACT_MISSING' })

		staffAccessFacts.load.mockResolvedValueOnce(
			staffFacts({ member: member('unexpected') }),
		)
		await expect(
			policies['staff.access.role_target'].evaluate(
				staffRevokeContext('owner'),
			),
		).resolves.toMatchObject({ reason: 'AUTHZ_POLICY_FACT_MISSING' })
	})

	it('accepts exact resend and changed replacement intent but denies foreign intent', async () => {
		const { policies, staffAccessFacts } = createHarness()
		for (const existing of [
			invitation('staff'),
			invitation('manager', { email: 'changed@example.com' }),
		]) {
			staffAccessFacts.load.mockResolvedValueOnce(
				staffFacts({ invitation: existing }),
			)
			await expect(
				policies['staff.access.invitation_state'].evaluate(
					staffInviteContext('owner', 'staff'),
				),
			).resolves.toEqual({ allowed: true })
		}

		staffAccessFacts.load.mockResolvedValueOnce(
			staffFacts({
				invitation: invitation('staff', {
					organizationId: 'organization-2',
				}),
			}),
		)
		await expect(
			policies['staff.access.invitation_state'].evaluate(
				staffInviteContext('owner', 'staff'),
			),
		).resolves.toMatchObject({ allowed: false })
	})

	it('requires exactly one same-tenant Member or Invitation linkage for revoke', async () => {
		const { policies, staffAccessFacts } = createHarness()
		for (const facts of [
			staffFacts(),
			staffFacts({ member: member('staff'), invitation: invitation('staff') }),
			staffFacts({
				member: member('staff', { organizationId: 'organization-2' }),
			}),
		]) {
			staffAccessFacts.load.mockResolvedValueOnce(facts)
			await expect(
				policies['staff.access.linkage'].evaluate(
					staffRevokeContext('owner'),
				),
			).resolves.toMatchObject({ allowed: false })
		}

		staffAccessFacts.load.mockResolvedValueOnce(
			staffFacts({ invitation: invitation('staff') }),
		)
		await expect(
			policies['staff.access.linkage'].evaluate(
				staffRevokeContext('owner'),
			),
		).resolves.toEqual({ allowed: true })
	})
})

describe('Member administration policies', () => {
	it('enforces the approved generic invitation role ceiling', async () => {
		const { policies } = createHarness()
		const roles: readonly LabOSOrganizationRole[] = [
			'owner',
			'admin',
			'manager',
			'staff',
		]
		const requestedRoles = ['admin', 'manager', 'staff'] as const
		const allowed = new Set([
			'owner:admin',
			'owner:manager',
			'owner:staff',
			'admin:staff',
		])

		for (const actorRole of roles) {
			for (const requestedRole of requestedRoles) {
				const result = await policies[
					'membership.invitation.role_assignment'
				].evaluate(membershipInviteContext(actorRole, requestedRole))
				expect(result.allowed, `${actorRole} -> ${requestedRole}`).toBe(
					allowed.has(`${actorRole}:${requestedRole}`),
				)
			}
		}
	})

	it('fails closed for malformed generic invitation intent', async () => {
		const { policies } = createHarness()
		const result = await policies[
			'membership.invitation.role_assignment'
		].evaluate({
				...membershipInviteContext('owner', 'staff'),
				operation: {
					kind: 'membership.invite',
					requestedRole: 'staff',
					recipientEmail: 'invalid',
				},
			})
		expect(result).toMatchObject({ reason: 'AUTHZ_POLICY_FACT_MISSING' })
	})

	it('denies every Owner target and malformed target role', async () => {
		const { policies, membershipAdministrationFacts } = createHarness()
		membershipAdministrationFacts.load.mockResolvedValueOnce(
			membershipFacts('owner'),
		)
		await expect(
			policies['membership.non_owner_target'].evaluate(
				membershipRemoveContext('owner'),
			),
		).resolves.toMatchObject({ reason: 'AUTHZ_OWNER_INVARIANT' })

		membershipAdministrationFacts.load.mockResolvedValueOnce(
			membershipFacts('unexpected'),
		)
		await expect(
			policies['membership.non_owner_target'].evaluate(
				membershipRemoveContext('owner'),
			),
		).resolves.toMatchObject({ reason: 'AUTHZ_POLICY_FACT_MISSING' })
	})

	it('denies generic role-update/removal self targeting', async () => {
		const { policies, membershipAdministrationFacts } = createHarness()
		membershipAdministrationFacts.load.mockResolvedValueOnce(
			membershipFacts('staff', { memberId: 'actor-member' }),
		)
		await expect(
			policies['membership.self_target'].evaluate(
				membershipRemoveContext('owner'),
			),
		).resolves.toMatchObject({ allowed: false })
	})

	it('requires linked Staff access removal to use A-125', async () => {
		const { policies, membershipAdministrationFacts } = createHarness()
		membershipAdministrationFacts.load.mockResolvedValueOnce(
			membershipFacts('staff', { staffId: 'staff-2' }),
		)

		await expect(
			policies['membership.unlinked_staff_target'].evaluate(
				membershipRemoveContext('owner'),
			),
		).resolves.toMatchObject({ allowed: false })

		membershipAdministrationFacts.load.mockResolvedValueOnce(
			membershipFacts('staff'),
		)
		await expect(
			policies['membership.unlinked_staff_target'].evaluate(
				membershipRemoveContext('owner'),
			),
		).resolves.toEqual({ allowed: true })
	})

	it('enforces the requested-role ceiling and absolute Owner prohibition', async () => {
		const { policies } = createHarness()
		await expect(
			policies['membership.role_assignment'].evaluate(
				membershipUpdateContext('owner', ['admin', 'manager']),
			),
		).resolves.toEqual({ allowed: true })
		await expect(
			policies['membership.role_assignment'].evaluate(
				membershipUpdateContext('admin', ['staff']),
			),
		).resolves.toEqual({ allowed: true })
		await expect(
			policies['membership.role_assignment'].evaluate(
				membershipUpdateContext('admin', ['manager']),
			),
		).resolves.toMatchObject({ allowed: false })
		await expect(
			policies['membership.role_assignment'].evaluate(
				membershipUpdateContext('owner', ['owner']),
			),
		).resolves.toMatchObject({ reason: 'AUTHZ_OWNER_INVARIANT' })
	})
})

describe('Staff analytics visibility policy', () => {
	it.each(['owner', 'admin', 'manager'] as const)(
		'allows %s to view any Staff performance profile',
		async (role) => {
			const { policies, staffAccessFacts } = createHarness()
			await expect(
				policies['staff.analytics.self_or_management'].evaluate(
					staffAnalyticsContext(role),
				),
			).resolves.toEqual({ allowed: true })
			expect(staffAccessFacts.load).not.toHaveBeenCalled()
		},
	)

	it('allows Staff to view their own linked performance profile', async () => {
		const { policies, staffAccessFacts } = createHarness()
		staffAccessFacts.load.mockResolvedValue(
			staffFacts({
				member: member('staff', {
					id: 'actor-member',
					userId: 'actor-user',
				}),
			}),
		)

		await expect(
			policies['staff.analytics.self_or_management'].evaluate(
				staffAnalyticsContext('staff'),
			),
		).resolves.toEqual({ allowed: true })
	})

	it('denies Staff access to a coworker performance profile', async () => {
		const { policies, staffAccessFacts } = createHarness()
		staffAccessFacts.load.mockResolvedValue(
			staffFacts({ member: member('staff') }),
		)

		await expect(
			policies['staff.analytics.self_or_management'].evaluate(
				staffAnalyticsContext('staff'),
			),
		).resolves.toMatchObject({
			allowed: false,
			reason: 'AUTHZ_POLICY_DENIED',
		})
	})
})

describe('Staff dossier visibility policy', () => {
	it.each(['owner', 'admin', 'manager'] as const)(
		'allows %s to open any Staff dossier',
		async (role) => {
			const { policies, staffAccessFacts } = createHarness()
			await expect(
				policies['staff.read.self_or_management'].evaluate(
					staffReadContext(role),
				),
			).resolves.toEqual({ allowed: true })
			expect(staffAccessFacts.load).not.toHaveBeenCalled()
		},
	)

	it('allows Staff to open their own linked dossier', async () => {
		const { policies, staffAccessFacts } = createHarness()
		staffAccessFacts.load.mockResolvedValue(
			staffFacts({
				member: member('staff', {
					id: 'actor-member',
					userId: 'actor-user',
				}),
			}),
		)

		await expect(
			policies['staff.read.self_or_management'].evaluate(
				staffReadContext('staff'),
			),
		).resolves.toEqual({ allowed: true })
	})

	it('denies Staff access to a coworker dossier', async () => {
		const { policies, staffAccessFacts } = createHarness()
		staffAccessFacts.load.mockResolvedValue(
			staffFacts({ member: member('staff') }),
		)

		await expect(
			policies['staff.read.self_or_management'].evaluate(
				staffReadContext('staff'),
			),
		).resolves.toMatchObject({
			allowed: false,
			reason: 'AUTHZ_POLICY_DENIED',
		})
	})
})

describe('Staff workbench visibility policy', () => {
	it.each(['owner', 'admin', 'manager'] as const)(
		'allows %s to view any Staff workbench',
		async (role) => {
			const { policies, staffAccessFacts } = createHarness()
			await expect(
				policies['staff.workbench.self_or_management'].evaluate(
					staffWorkbenchContext(role),
				),
			).resolves.toEqual({ allowed: true })
			expect(staffAccessFacts.load).not.toHaveBeenCalled()
		},
	)

	it('allows Staff to view their own linked workbench', async () => {
		const { policies, staffAccessFacts } = createHarness()
		staffAccessFacts.load.mockResolvedValue(
			staffFacts({
				member: member('staff', {
					id: 'actor-member',
					userId: 'actor-user',
				}),
			}),
		)

		await expect(
			policies['staff.workbench.self_or_management'].evaluate(
				staffWorkbenchContext('staff'),
			),
		).resolves.toEqual({ allowed: true })
	})

	it('denies Staff access to a coworker workbench', async () => {
		const { policies, staffAccessFacts } = createHarness()
		staffAccessFacts.load.mockResolvedValue(
			staffFacts({ member: member('staff') }),
		)

		await expect(
			policies['staff.workbench.self_or_management'].evaluate(
				staffWorkbenchContext('staff'),
			),
		).resolves.toMatchObject({
			allowed: false,
			reason: 'AUTHZ_POLICY_DENIED',
		})
	})
})

describe('membership policy service composition', () => {
	it('runs the complete invite policy chain with one request-local fact query', async () => {
		const repository = {
			findStaffAccessFacts: vi.fn().mockResolvedValue(staffFacts()),
			findMembershipAdministrationFacts: vi.fn(),
		}
		const loaders = createMembershipAccessFactLoaders(repository)
		const policies = createMembershipAccessPolicies({
			staffAccessFacts: loaders.staffAccess,
			membershipAdministrationFacts: loaders.membershipAdministration,
			now: () => new Date('2030-01-01T00:00:00.000Z'),
		})
		const service = createAuthorizationService<
			LabOSPermission,
			LabOSOrganizationRole,
			LabOSResourceType,
			LabOSPolicyId,
			LabOSAuthorizationOperationMap
		>({
			knownRoles: ['owner', 'admin', 'manager', 'staff'],
			roleBundles: LABOS_ROLE_PERMISSION_BUNDLES,
			permissionDefinitions: LABOS_PERMISSION_DEFINITION_REGISTRY,
			targetResolvers: {
				staff: {
					resolveOrganizationId: vi.fn().mockResolvedValue(ORGANIZATION_ID),
				},
			},
			policies,
		})

		await expect(
			service.can({
				actor: actor('owner'),
				permission: 'staff.access.invite',
				target: { type: 'staff', id: STAFF_ID },
				operation: {
					kind: 'staff.access.invite',
					requestedRole: 'staff',
					recipientEmail: 'target@example.com',
				},
			}),
		).resolves.toEqual({ allowed: true, reason: 'POLICY_ALLOWED' })
		expect(repository.findStaffAccessFacts).toHaveBeenCalledOnce()
	})

	it('fails closed rather than throwing when runtime code omits required intent', async () => {
		const repository = {
			findStaffAccessFacts: vi.fn().mockResolvedValue(staffFacts()),
			findMembershipAdministrationFacts: vi.fn(),
		}
		const loaders = createMembershipAccessFactLoaders(repository)
		const service = createAuthorizationService<
			LabOSPermission,
			LabOSOrganizationRole,
			LabOSResourceType,
			LabOSPolicyId,
			LabOSAuthorizationOperationMap
		>({
			knownRoles: ['owner', 'admin', 'manager', 'staff'],
			roleBundles: LABOS_ROLE_PERMISSION_BUNDLES,
			permissionDefinitions: LABOS_PERMISSION_DEFINITION_REGISTRY,
			targetResolvers: {
				staff: {
					resolveOrganizationId: vi.fn().mockResolvedValue(ORGANIZATION_ID),
				},
			},
			policies: createMembershipAccessPolicies({
				staffAccessFacts: loaders.staffAccess,
				membershipAdministrationFacts: loaders.membershipAdministration,
			}),
		})
		const malformedRuntimeRequest = {
			actor: actor('owner'),
			permission: 'staff.access.invite',
			target: { type: 'staff', id: STAFF_ID },
		} as unknown as AuthorizationRequest<
			LabOSPermission,
			LabOSResourceType,
			LabOSAuthorizationOperationMap
		>

		await expect(service.can(malformedRuntimeRequest)).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_FACT_MISSING',
		})
	})
})
