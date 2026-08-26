import { describe, expect, it } from 'vitest'

import { createPermissionDefinitionRegistry } from '@/platform/authorization'
import type { PermissionDefinition } from '@/platform/authorization'

type Permission = 'record.read' | 'record.create'
type ResourceType = 'record'
type PolicyId = 'record.visible'

function definition(
	overrides: Partial<
		PermissionDefinition<Permission, ResourceType, PolicyId>
	> = {},
): PermissionDefinition<Permission, ResourceType, PolicyId> {
	return {
		permission: 'record.read',
		scope: 'resource',
		targetTypes: ['record'],
		requiredPolicies: ['record.visible'],
		sensitivity: 'ordinary',
		...overrides,
	} as PermissionDefinition<Permission, ResourceType, PolicyId>
}

describe('permission definition registry', () => {
	it('returns trusted snapshots that do not follow source array mutation', () => {
		const policies: PolicyId[] = ['record.visible']
		const registry = createPermissionDefinitionRegistry([
			definition({ requiredPolicies: policies }),
		])

		policies.length = 0

			expect(registry.get('record.read')).toEqual({
			permission: 'record.read',
			scope: 'resource',
			targetTypes: ['record'],
			requiredPolicies: ['record.visible'],
			sensitivity: 'ordinary',
		})
	})

	it('rejects duplicate permission definitions', () => {
		expect(() =>
			createPermissionDefinitionRegistry([definition(), definition()]),
		).toThrow('Duplicate authorization permission definition')
	})

	it('rejects duplicate required policies', () => {
		expect(() =>
			createPermissionDefinitionRegistry([
				definition({
					requiredPolicies: ['record.visible', 'record.visible'],
				}),
			]),
		).toThrow('duplicate required policies')
	})

	it('rejects an empty resource target type', () => {
		expect(() =>
			createPermissionDefinitionRegistry([
				definition({ targetTypes: [] }),
			]),
		).toThrow('requires at least one target type')
	})

	it('rejects duplicate trusted target types', () => {
		expect(() =>
			createPermissionDefinitionRegistry([
				definition({ targetTypes: ['record', 'record'] }),
			]),
		).toThrow('duplicate target types')
	})
})
