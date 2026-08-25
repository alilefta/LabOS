import { describe, expect, it, vi } from 'vitest'

import type {
	AuthorizationActor,
	AuthorizationMonitor,
	AuthorizationPolicy,
	AuthorizationTargetResolver,
} from '@/platform/authorization'
import type { LabOSAuthorizationOperationMap } from '@/modules/labos-authorization/operation-intents'
import type { LabOSPermission } from '@/modules/labos-authorization/permissions'
import type { LabOSPolicyId } from '@/modules/labos-authorization/policy-ids'
import type { LabOSResourceType } from '@/modules/labos-authorization/resource-types'
import type { LabOSOrganizationRole } from '@/modules/labos-authorization/roles'
import {
	createLabOSAuthorizationService,
	LABOS_AUTHORIZATION_V1_PERMISSION_REGISTRY,
	LABOS_AUTHORIZATION_V1_SUPPORTED_PERMISSIONS,
} from '@/modules/labos-authorization/service'

const actor: AuthorizationActor = {
	userId: 'user-1',
	memberId: 'member-1',
	organizationId: 'organization-1',
	memberRoles: ['owner'],
}

type LabOSPolicy = AuthorizationPolicy<
	LabOSPermission,
	LabOSResourceType,
	LabOSAuthorizationOperationMap
>

function allowPolicy(): LabOSPolicy {
	return { evaluate: vi.fn().mockResolvedValue({ allowed: true }) }
}

function resolver(
	organizationId = actor.organizationId,
): AuthorizationTargetResolver<LabOSResourceType> {
	return {
		resolveOrganizationId: vi.fn().mockResolvedValue(organizationId),
	}
}

function monitor() {
	const record = vi.fn()
	return {
		record,
		monitor: { record } satisfies AuthorizationMonitor<
			LabOSPermission,
			LabOSOrganizationRole,
			LabOSResourceType
		>,
	}
}

describe('LabOS authorization service composition', () => {
	it('enables only the reviewed membership and Staff-access slice', () => {
		expect(LABOS_AUTHORIZATION_V1_SUPPORTED_PERMISSIONS).toEqual([
			'staff.create',
			'staff.access.invite',
			'staff.access.revoke',
			'membership.list',
			'membership.read',
			'membership.role.update',
			'membership.remove',
		])
		expect(
			LABOS_AUTHORIZATION_V1_PERMISSION_REGISTRY.list().map(
				(definition) => definition.permission,
			),
		).toEqual(LABOS_AUTHORIZATION_V1_SUPPORTED_PERMISSIONS)
		expect(Object.isFrozen(LABOS_AUTHORIZATION_V1_SUPPORTED_PERMISSIONS)).toBe(
			true,
		)
	})

	it.each([
		['owner', true, 'ROLE_PERMISSION'],
		['admin', true, 'ROLE_PERMISSION'],
		['manager', true, 'ROLE_PERMISSION'],
		['staff', false, 'AUTHZ_PERMISSION_NOT_GRANTED'],
	] as const)(
		'evaluates organization-scoped staff.create for %s without resource work',
		async (role, allowed, reason) => {
			const staffResolver = resolver()
			const policy = allowPolicy()
			const service = createLabOSAuthorizationService({
				targetResolvers: { staff: staffResolver },
				policies: { 'staff.access.target': policy },
				monitor: monitor().monitor,
			})

			await expect(
				service.can({
					actor: { ...actor, memberRoles: [role] },
					permission: 'staff.create',
				}),
			).resolves.toEqual({ allowed, reason })
			expect(staffResolver.resolveOrganizationId).not.toHaveBeenCalled()
			expect(policy.evaluate).not.toHaveBeenCalled()
		},
	)

	it.each([
		['owner', true, 'ROLE_PERMISSION'],
		['admin', true, 'ROLE_PERMISSION'],
		['manager', false, 'AUTHZ_PERMISSION_NOT_GRANTED'],
		['staff', false, 'AUTHZ_PERMISSION_NOT_GRANTED'],
	] as const)(
		'evaluates membership.list for %s from fixed bundles without resource work',
		async (role, allowed, reason) => {
			const memberResolver = resolver()
			const policy = allowPolicy()
			const service = createLabOSAuthorizationService({
				targetResolvers: { member: memberResolver },
				policies: { 'membership.non_owner_target': policy },
				monitor: monitor().monitor,
			})

			await expect(
				service.can({
					actor: { ...actor, memberRoles: [role] },
					permission: 'membership.list',
				}),
			).resolves.toEqual({ allowed, reason })
			expect(memberResolver.resolveOrganizationId).not.toHaveBeenCalled()
			expect(policy.evaluate).not.toHaveBeenCalled()
		},
	)

	it('denies unknown roles and unexpected targets for membership.list', async () => {
		const service = createLabOSAuthorizationService({
			monitor: monitor().monitor,
		})

		await expect(
			service.can({
				actor: { ...actor, memberRoles: ['unconfigured-role'] },
				permission: 'membership.list',
			}),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_ROLE_UNRECOGNIZED',
		})
		await expect(
			service.can({
				actor,
				permission: 'membership.list',
				target: { type: 'member', id: 'member-2' },
			}),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_RESOURCE_UNEXPECTED',
		})
	})

	it('authorizes a supported Member resource through the concrete resolver', async () => {
		const memberResolver = resolver()
		const { monitor: testMonitor } = monitor()
		const service = createLabOSAuthorizationService({
			targetResolvers: { member: memberResolver },
			policies: {},
			monitor: testMonitor,
			now: () => 0,
		})

		await expect(
			service.can({
				actor,
				permission: 'membership.read',
				target: { type: 'member', id: 'member-2' },
			}),
		).resolves.toEqual({ allowed: true, reason: 'POLICY_ALLOWED' })
		expect(memberResolver.resolveOrganizationId).toHaveBeenCalledOnce()
	})

	it('passes typed Staff invitation intent through every required policy', async () => {
		const policies = {
			'staff.access.target': allowPolicy(),
			'staff.access.self_target': allowPolicy(),
			'staff.access.role_target': allowPolicy(),
			'staff.access.invitation_state': allowPolicy(),
		} satisfies Partial<Record<LabOSPolicyId, LabOSPolicy>>
		const service = createLabOSAuthorizationService({
			targetResolvers: { staff: resolver() },
			policies,
			monitor: monitor().monitor,
		})

		await expect(
			service.can({
				actor,
				permission: 'staff.access.invite',
				target: { type: 'staff', id: 'staff-1' },
				operation: {
					kind: 'staff.access.invite',
					requestedRole: 'staff',
					recipientEmail: 'staff@example.com',
				},
			}),
		).resolves.toEqual({ allowed: true, reason: 'POLICY_ALLOWED' })
		for (const policy of Object.values(policies)) {
			expect(policy.evaluate).toHaveBeenCalledOnce()
		}
	})

	it('denies an unfinished permission before any target resolver runs', async () => {
		const staffResolver = resolver()
		const { monitor: testMonitor, record } = monitor()
		const service = createLabOSAuthorizationService({
			targetResolvers: { staff: staffResolver },
			policies: {},
			monitor: testMonitor,
			now: () => 0,
		})

		await expect(
			service.can({
				actor,
				permission: 'staff.read',
				target: { type: 'staff', id: 'staff-1' },
			}),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_PERMISSION_DEFINITION_MISSING',
		})
		expect(staffResolver.resolveOrganizationId).not.toHaveBeenCalled()
		expect(record).toHaveBeenCalledWith(
			expect.objectContaining({
				permission: 'staff.read',
				outcome: 'denied',
				severity: 'high',
				reason: 'AUTHZ_PERMISSION_DEFINITION_MISSING',
			}),
		)
	})

	it('denies a supported permission when its concrete resolver is unavailable', async () => {
		const service = createLabOSAuthorizationService({
			targetResolvers: {},
			policies: {},
			monitor: monitor().monitor,
		})

		await expect(
			service.can({
				actor,
				permission: 'membership.read',
				target: { type: 'member', id: 'member-2' },
			}),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_TARGET_RESOLVER_MISSING',
		})
	})

	it('denies when a required membership policy was not registered', async () => {
		const service = createLabOSAuthorizationService({
			targetResolvers: { member: resolver() },
			policies: {},
			monitor: monitor().monitor,
		})

		await expect(
			service.can({
				actor,
				permission: 'membership.role.update',
				target: { type: 'member', id: 'member-2' },
				operation: {
					kind: 'membership.role.update',
					requestedRoles: ['staff'],
				},
			}),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_POLICY_NOT_REGISTERED',
		})
	})

	it('rejects an incorrect target type before invoking a resolver', async () => {
		const memberResolver = resolver()
		const staffResolver = resolver()
		const service = createLabOSAuthorizationService({
			targetResolvers: {
				member: memberResolver,
				staff: staffResolver,
			},
			policies: {},
			monitor: monitor().monitor,
		})

		await expect(
			service.can({
				actor,
				permission: 'membership.read',
				target: { type: 'staff', id: 'staff-1' },
			}),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_TARGET_TYPE_MISMATCH',
		})
		expect(memberResolver.resolveOrganizationId).not.toHaveBeenCalled()
		expect(staffResolver.resolveOrganizationId).not.toHaveBeenCalled()
	})

	it('short-circuits role denial before resolver and policy work', async () => {
		const staffResolver = resolver()
		const policy = allowPolicy()
		const service = createLabOSAuthorizationService({
			targetResolvers: { staff: staffResolver },
			policies: { 'staff.access.target': policy },
			monitor: monitor().monitor,
		})

		await expect(
			service.can({
				actor: { ...actor, memberRoles: ['manager'] },
				permission: 'staff.access.invite',
				target: { type: 'staff', id: 'staff-1' },
				operation: {
					kind: 'staff.access.invite',
					requestedRole: 'staff',
					recipientEmail: 'staff@example.com',
				},
			}),
		).resolves.toEqual({
			allowed: false,
			reason: 'AUTHZ_PERMISSION_NOT_GRANTED',
		})
		expect(staffResolver.resolveOrganizationId).not.toHaveBeenCalled()
		expect(policy.evaluate).not.toHaveBeenCalled()
	})
})
