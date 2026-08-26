import { describe, expect, it, vi } from 'vitest'

import {
	AUTHORIZATION_DENIAL_REASONS,
	AuthorizationError,
	createAuthorizationService,
	createPermissionDefinitionRegistry,
	createRolePermissionBundles,
} from '@/platform/authorization'
import type {
	AuthorizationActor,
	AuthorizationMonitor,
	AuthorizationPolicy,
	AuthorizationTargetResolver,
	PermissionDefinition,
} from '@/platform/authorization'

const ROLES = ['owner', 'admin', 'manager', 'staff'] as const
const PERMISSIONS = [
	'record.create',
	'record.read',
	'record.archive',
	'orphan.permission',
] as const
type Role = (typeof ROLES)[number]
type Permission = (typeof PERMISSIONS)[number]
type ResourceType = 'record' | 'other'
type PolicyId = 'record.visible' | 'record.active'

const actor: AuthorizationActor = {
	userId: 'user-1',
	memberId: 'member-1',
	organizationId: 'organization-1',
	memberRoles: ['staff'],
}

function allowPolicy(): AuthorizationPolicy<Permission, ResourceType> {
	return { evaluate: vi.fn().mockResolvedValue({ allowed: true }) }
}

function createFixture(overrides: {
	actorRoles?: readonly string[]
	definitions?: readonly PermissionDefinition<
		Permission,
		ResourceType,
		PolicyId
	>[]
	resolver?: AuthorizationTargetResolver<ResourceType>
	policies?: Partial<
		Record<PolicyId, AuthorizationPolicy<Permission, ResourceType>>
	>
	monitor?: AuthorizationMonitor<Permission, Role, ResourceType>
} = {}) {
	const definitions =
		overrides.definitions ??
		([
			{
				permission: 'record.create',
				scope: 'organization',
				requiredPolicies: [],
				sensitivity: 'ordinary',
			},
			{
				permission: 'record.read',
				scope: 'resource',
				targetTypes: ['record'],
				requiredPolicies: ['record.visible', 'record.active'],
				sensitivity: 'sensitive',
			},
			{
				permission: 'record.archive',
				scope: 'resource',
				targetTypes: ['record'],
				requiredPolicies: [],
				sensitivity: 'critical',
			},
		] satisfies readonly PermissionDefinition<
			Permission,
			ResourceType,
			PolicyId
		>[])
	const resolver =
		overrides.resolver ??
		({
			resolveOrganizationId: vi.fn().mockResolvedValue('organization-1'),
		} satisfies AuthorizationTargetResolver<ResourceType>)
	const policies = overrides.policies ?? {
		'record.visible': allowPolicy(),
		'record.active': allowPolicy(),
	}
	const roleBundles = createRolePermissionBundles({
		roles: ROLES,
		permissions: PERMISSIONS,
		bundles: {
			owner: [...PERMISSIONS],
			admin: ['record.create', 'record.read', 'record.archive'],
			manager: ['record.create', 'record.read'],
			staff: ['record.read'],
		},
	})
	const service = createAuthorizationService({
		knownRoles: ROLES,
		roleBundles,
		permissionDefinitions: createPermissionDefinitionRegistry(definitions),
		targetResolvers: { record: resolver },
		policies,
		monitor: overrides.monitor,
	})

	return {
		service,
		actor: {
			...actor,
			memberRoles: overrides.actorRoles ?? actor.memberRoles,
		},
		resolver,
		policies,
	}
}

describe('AuthorizationService', () => {
	it('allows an organization-scoped permission using only the explicit bundle', async () => {
		const { service } = createFixture({ actorRoles: ['manager'] })

		await expect(
			service.can({ actor: { ...actor, memberRoles: ['manager'] }, permission: 'record.create' }),
		).resolves.toEqual({ allowed: true, reason: 'ROLE_PERMISSION' })
	})

	it('unions multiple recognized role bundles', async () => {
		const { service } = createFixture()

		await expect(
			service.can({
				actor: { ...actor, memberRoles: ['staff', 'admin'] },
				permission: 'record.create',
			}),
		).resolves.toMatchObject({ allowed: true })
	})

	it('denies invalid actor identifiers', async () => {
		const { service } = createFixture()

		await expect(
			service.can({
				actor: { ...actor, organizationId: '' },
				permission: 'record.read',
			}),
		).resolves.toEqual({
			allowed: false,
			reason: AUTHORIZATION_DENIAL_REASONS.ACTOR_INVALID,
		})
	})

	it('denies malformed runtime role data instead of throwing', async () => {
		const { service } = createFixture()

		await expect(
			service.can({
				actor: {
					...actor,
					memberRoles: null as unknown as readonly string[],
				},
				permission: 'record.read',
			}),
		).resolves.toEqual({
			allowed: false,
			reason: AUTHORIZATION_DENIAL_REASONS.ACTOR_INVALID,
		})
	})

	it('denies unknown roles and does not map member to staff', async () => {
		const { service } = createFixture()

		await expect(
			service.can({
				actor: { ...actor, memberRoles: ['member'] },
				permission: 'record.read',
			}),
		).resolves.toEqual({
			allowed: false,
			reason: AUTHORIZATION_DENIAL_REASONS.ROLE_UNRECOGNIZED,
		})
	})

	it('ignores an unknown role when a recognized role grants access and monitors its count', async () => {
		const record = vi.fn()
		const { service } = createFixture({ monitor: { record } })

		await service.can({
			actor: { ...actor, memberRoles: ['staff', 'unexpected-role'] },
			permission: 'record.read',
			target: { type: 'record', id: 'record-1' },
		})

		expect(record).toHaveBeenCalledWith(
			expect.objectContaining({
				roles: ['staff'],
				unknownRoleCount: 1,
				outcome: 'allowed',
			}),
		)
	})

	it('denies a permission absent from the actor bundles', async () => {
		const { service } = createFixture()

		await expect(
			service.can({ actor, permission: 'record.create' }),
		).resolves.toEqual({
			allowed: false,
			reason: AUTHORIZATION_DENIAL_REASONS.PERMISSION_NOT_GRANTED,
		})
	})

	it('fails closed when a granted permission definition is missing', async () => {
		const { service } = createFixture()

		await expect(
			service.can({
				actor: { ...actor, memberRoles: ['owner'] },
				permission: 'orphan.permission',
			}),
		).resolves.toEqual({
			allowed: false,
			reason: AUTHORIZATION_DENIAL_REASONS.PERMISSION_DEFINITION_MISSING,
		})
	})

	it('rejects a target for an organization-scoped permission', async () => {
		const { service } = createFixture()

		await expect(
			service.can({
				actor: { ...actor, memberRoles: ['manager'] },
				permission: 'record.create',
				target: { type: 'record', id: 'record-1' },
			}),
		).resolves.toEqual({
			allowed: false,
			reason: AUTHORIZATION_DENIAL_REASONS.RESOURCE_UNEXPECTED,
		})
	})

	it('requires a non-empty target for resource permissions', async () => {
		const { service } = createFixture()

		for (const target of [undefined, { type: 'record' as const, id: '' }]) {
			await expect(
				service.can({ actor, permission: 'record.read', target }),
			).resolves.toEqual({
				allowed: false,
				reason: AUTHORIZATION_DENIAL_REASONS.RESOURCE_REQUIRED,
			})
		}
	})

	it('rejects a target type that does not match trusted metadata', async () => {
		const { service } = createFixture()

		await expect(
			service.can({
				actor,
				permission: 'record.read',
				target: { type: 'other', id: 'record-1' },
			}),
		).resolves.toEqual({
			allowed: false,
			reason: AUTHORIZATION_DENIAL_REASONS.TARGET_TYPE_MISMATCH,
		})
	})

	it('accepts any target type explicitly listed by trusted metadata', async () => {
		const roleBundles = createRolePermissionBundles({
			roles: ROLES,
			permissions: PERMISSIONS,
			bundles: {
				owner: [],
				admin: [],
				manager: [],
				staff: ['record.archive'],
			},
		})
		const otherResolver = {
			resolveOrganizationId: vi.fn().mockResolvedValue('organization-1'),
		}
		const multiTargetService = createAuthorizationService({
			knownRoles: ROLES,
			roleBundles,
			permissionDefinitions: createPermissionDefinitionRegistry([
				{
					permission: 'record.archive',
					scope: 'resource',
					targetTypes: ['record', 'other'],
					requiredPolicies: [],
					sensitivity: 'critical',
				},
			]),
			targetResolvers: { other: otherResolver },
		})

		await expect(
			multiTargetService.can({
				actor,
				permission: 'record.archive',
				target: { type: 'other', id: 'other-1' },
			}),
		).resolves.toEqual({ allowed: true, reason: 'POLICY_ALLOWED' })
	})

	it('fails closed when a required target resolver is missing', async () => {
		const roleBundles = createRolePermissionBundles({
			roles: ROLES,
			permissions: PERMISSIONS,
			bundles: { owner: [], admin: [], manager: [], staff: ['record.archive'] },
		})
		const service = createAuthorizationService({
			knownRoles: ROLES,
			roleBundles,
			permissionDefinitions: createPermissionDefinitionRegistry([
				{
					permission: 'record.archive',
					scope: 'resource',
					targetTypes: ['record'],
					requiredPolicies: [],
					sensitivity: 'critical',
				},
			]),
		})

		await expect(
			service.can({
				actor,
				permission: 'record.archive',
				target: { type: 'record', id: 'record-1' },
			}),
		).resolves.toEqual({
			allowed: false,
			reason: AUTHORIZATION_DENIAL_REASONS.TARGET_RESOLVER_MISSING,
		})
	})

	it.each([
		[
			'not found',
			vi.fn().mockResolvedValue(null),
			AUTHORIZATION_DENIAL_REASONS.TARGET_NOT_FOUND,
		],
		[
			'resolver failure',
			vi.fn().mockRejectedValue(new Error('private database error')),
			AUTHORIZATION_DENIAL_REASONS.TARGET_RESOLUTION_FAILED,
		],
	] as const)('denies target %s', async (_label, resolverFn, reason) => {
		const { service } = createFixture({
			resolver: { resolveOrganizationId: resolverFn },
		})

		await expect(
			service.can({
				actor,
				permission: 'record.read',
				target: { type: 'record', id: 'record-1' },
			}),
		).resolves.toEqual({ allowed: false, reason })
	})

	it('checks tenant ownership before evaluating domain policies', async () => {
		const visible = allowPolicy()
		const { service } = createFixture({
			resolver: {
				resolveOrganizationId: vi.fn().mockResolvedValue('organization-2'),
			},
			policies: {
				'record.visible': visible,
				'record.active': allowPolicy(),
			},
		})

		await expect(
			service.can({
				actor,
				permission: 'record.read',
				target: { type: 'record', id: 'foreign-record' },
			}),
		).resolves.toEqual({
			allowed: false,
			reason: AUTHORIZATION_DENIAL_REASONS.TENANT_MISMATCH,
		})
		expect(visible.evaluate).not.toHaveBeenCalled()
	})

	it('fails closed before policy execution when any required policy is missing', async () => {
		const visible = allowPolicy()
		const record = vi.fn()
		const { service } = createFixture({
			policies: { 'record.visible': visible },
			monitor: { record },
		})

		await expect(
			service.can({
				actor,
				permission: 'record.read',
				target: { type: 'record', id: 'record-1' },
			}),
		).resolves.toEqual({
			allowed: false,
			reason: AUTHORIZATION_DENIAL_REASONS.POLICY_NOT_REGISTERED,
		})
		expect(visible.evaluate).not.toHaveBeenCalled()
		expect(record).toHaveBeenCalledWith(
			expect.objectContaining({
				severity: 'high',
				reason: AUTHORIZATION_DENIAL_REASONS.POLICY_NOT_REGISTERED,
			}),
		)
	})

	it.each([
		[
			'denial',
			vi.fn().mockResolvedValue({ allowed: false }),
			AUTHORIZATION_DENIAL_REASONS.POLICY_DENIED,
		],
		[
			'missing fact',
			vi.fn().mockResolvedValue({
				allowed: false,
				reason: AUTHORIZATION_DENIAL_REASONS.POLICY_FACT_MISSING,
			}),
			AUTHORIZATION_DENIAL_REASONS.POLICY_FACT_MISSING,
		],
		[
			'failure',
			vi.fn().mockRejectedValue(new Error('private policy failure')),
			AUTHORIZATION_DENIAL_REASONS.POLICY_FAILED,
		],
	] as const)('fails closed on policy %s', async (_label, evaluate, reason) => {
		const { service } = createFixture({
			policies: {
				'record.visible': { evaluate },
				'record.active': allowPolicy(),
			},
		})

		await expect(
			service.can({
				actor,
				permission: 'record.read',
				target: { type: 'record', id: 'record-1' },
			}),
		).resolves.toEqual({ allowed: false, reason })
	})

	it('requires every registered policy to allow', async () => {
		const visible = allowPolicy()
		const active = allowPolicy()
		const { service } = createFixture({
			policies: {
				'record.visible': visible,
				'record.active': active,
			},
		})

		await expect(
			service.can({
				actor,
				permission: 'record.read',
				target: { type: 'record', id: 'record-1' },
			}),
		).resolves.toEqual({ allowed: true, reason: 'POLICY_ALLOWED' })
		expect(visible.evaluate).toHaveBeenCalledBefore(
			vi.mocked(active.evaluate),
		)
	})

	it('throws a public-safe error from require while preserving the internal reason', async () => {
		const { service } = createFixture()

		const error = await service
			.require({ actor, permission: 'record.create' })
			.catch((reason: unknown) => reason)

		expect(error).toBeInstanceOf(AuthorizationError)
		expect(error).toMatchObject({
			message: 'You are not authorized to perform this operation.',
			reason: AUTHORIZATION_DENIAL_REASONS.PERMISSION_NOT_GRANTED,
		})
		expect((error as AuthorizationError).message).not.toContain('record.create')
	})

	it('computes non-authoritative role capabilities without resolvers or policies', async () => {
		const resolver = {
			resolveOrganizationId: vi.fn().mockResolvedValue('organization-1'),
		}
		const policy = allowPolicy()
		const { service } = createFixture({
			resolver,
			policies: {
				'record.visible': policy,
				'record.active': policy,
			},
		})

		await expect(
			service.roleCapabilities(actor, ['record.read', 'record.create']),
		).resolves.toEqual({
			'record.read': true,
			'record.create': false,
		})
		expect(resolver.resolveOrganizationId).not.toHaveBeenCalled()
		expect(policy.evaluate).not.toHaveBeenCalled()
	})

	it('does not let monitoring failures alter an allow decision', async () => {
		const { service } = createFixture({
			actorRoles: ['manager'],
			monitor: {
				record: vi.fn(() => {
					throw new Error('monitor unavailable')
				}),
			},
		})

		await expect(
			service.can({
				actor: { ...actor, memberRoles: ['manager'] },
				permission: 'record.create',
			}),
		).resolves.toEqual({ allowed: true, reason: 'ROLE_PERMISSION' })
	})

	it('emits allowlisted telemetry without target IDs or actor user/member IDs', async () => {
		const record = vi.fn()
		const { service } = createFixture({ monitor: { record } })

		await service.can({
			actor,
			permission: 'record.read',
			target: { type: 'record', id: 'sensitive-record-id' },
			correlationId: 'request-1',
		})

		const event = record.mock.calls[0]?.[0]
		expect(event).toMatchObject({
			event: 'platform.authorization.decision',
			permission: 'record.read',
			organizationId: 'organization-1',
			targetType: 'record',
			correlationId: 'request-1',
			outcome: 'allowed',
		})
		expect(event).not.toHaveProperty('targetId')
		expect(event).not.toHaveProperty('userId')
		expect(event).not.toHaveProperty('memberId')
		expect(JSON.stringify(event)).not.toContain('sensitive-record-id')
	})
})
