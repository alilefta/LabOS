import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { buildOperationalStaffCreateData } from '@/modules/labos-staff/operational-staff-creation'
import { CreateLabStaffInputSchema } from '@/schema/composed/team/staff.schema'

const validOperationalInput = {
	firstName: 'Ahmed',
	lastName: 'Mohsin',
	phoneNumber: '+9647912324343',
	isActive: true,
	city: 'Baghdad',
	address1: 'Karrada',
	roleCategory: 'TECHNICIAN' as const,
	jobTitle: 'Dental technician',
	specialization: 'Complete dentures',
}

describe('A-123 operational Staff creation split', () => {
	it('accepts the operational identity contract', () => {
		expect(CreateLabStaffInputSchema.parse(validOperationalInput)).toEqual(
			validOperationalInput,
		)
	})

	it.each([
		['grantAccess', true],
		['email', 'staff@example.com'],
		['systemRole', 'MANAGER'],
		['commissionType', 'FIXED'],
		['commissionValue', 100],
	])('rejects the separate-command field %s', (field, value) => {
		expect(() =>
			CreateLabStaffInputSchema.parse({
				...validOperationalInput,
				[field]: value,
			}),
		).toThrow()
	})

	it('builds tenant-scoped persistence data with safe compensation defaults', () => {
		const parsed = CreateLabStaffInputSchema.parse(validOperationalInput)

		expect(buildOperationalStaffCreateData(parsed, 'lab-1')).toMatchObject({
			...validOperationalInput,
			labId: 'lab-1',
			commissionType: 'PERCENTAGE',
			commissionValue: 0,
		})
	})

	it('has no invitation or compensating-delete side effect', () => {
		const source = readFileSync(
			join(process.cwd(), 'actions/team/register-staff-member-action.ts'),
			'utf8',
		)

		expect(source).toContain('buildOperationalStaffCreateData')
		expect(source).not.toContain('createStaffOrganizationInvitation')
		expect(source).not.toContain('auth.api.')
		expect(source).not.toContain('labStaff.delete')
		expect(source).not.toContain("from 'next/headers'")
	})

	it('treats duplicate names and phone numbers as non-authoritative identity', () => {
		const first = buildOperationalStaffCreateData(
			CreateLabStaffInputSchema.parse(validOperationalInput),
			'lab-1',
		)
		const second = buildOperationalStaffCreateData(
			CreateLabStaffInputSchema.parse(validOperationalInput),
			'lab-1',
		)

		// LabStaff identity is its database-generated UUID. Names and phone numbers
		// cannot be used for global deduplication because multi-role records are valid.
		expect(second).toEqual(first)
		expect(first).not.toHaveProperty('id')
	})

	it('uses an action name distinct from the A-107 quick-create action', () => {
		const source = readFileSync(
			join(process.cwd(), 'actions/team/register-staff-member-action.ts'),
			'utf8',
		)

		expect(source).toContain("actionName: 'Register-Team-Lab-Staff-Action'")
	})

	it('does not expose client payloads through shared action-start logging', () => {
		const source = readFileSync(join(process.cwd(), 'lib/safe-action.ts'), 'utf8')
		const loggingMiddleware = source.slice(
			source.indexOf('export const loggingMiddleware'),
			source.indexOf('export const requireUserMiddleware'),
		)

		expect(loggingMiddleware).not.toContain('clientInput')
		expect(loggingMiddleware).not.toContain('input:')
	})
})
