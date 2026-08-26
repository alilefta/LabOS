import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { UpdateStaffIdentityInputSchema } from '@/schema/composed/team/staff-settings.schema'

const validIdentityInput = {
	staffId: '1690baa7-467a-4143-97dc-1e557022f788',
	firstName: 'Ahmed',
	lastName: 'Mohsin',
	phoneNumber: '+9647912324343',
	jobTitle: 'Dental technician',
	specialization: 'Complete dentures',
	roleCategory: 'TECHNICIAN' as const,
}

describe('A-127 operational Staff identity boundary', () => {
	it('accepts only operational identity fields', () => {
		expect(UpdateStaffIdentityInputSchema.parse(validIdentityInput)).toEqual(
			validIdentityInput,
		)
	})

	it('strips a forged employment-status field before the action handler', () => {
		const parsed = UpdateStaffIdentityInputSchema.parse({
			...validIdentityInput,
			isActive: false,
		})

		expect(parsed).not.toHaveProperty('isActive')
	})

	it('contains no Organization access or employment-status mutation', () => {
		const source = readFileSync(
			join(
				process.cwd(),
				'actions/team/staff-settings/update-staff-identity.ts',
			),
			'utf8',
		)

		expect(source).not.toContain('auth.api.')
		expect(source).not.toContain('revokeStaffOrganizationAccess')
		expect(source).not.toContain('cleanupStaffInvitationIntent')
		expect(source).not.toContain("from 'next/headers'")
		expect(source).not.toMatch(/data:\s*\{[^}]*isActive/)
	})

	it('does not expose the former compound status control in the UI', () => {
		const source = readFileSync(
			join(
				process.cwd(),
				'components/team/staff-details/staff-settings-tab/staff-identity-card.tsx',
			),
			'utf8',
		)

		expect(source).not.toContain('Active Employment Status')
		expect(source).not.toContain('name="isActive"')
	})
})
