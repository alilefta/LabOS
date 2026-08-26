import { readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

import { describe, expect, it } from 'vitest'

function listTypeScriptFiles(directory: string): string[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name)
		if (entry.isDirectory()) return listTypeScriptFiles(path)
		return /\.tsx?$/.test(entry.name) ? [path] : []
	})
}

describe('Authorization V1 shadow pilot scope', () => {
	const actionsRoot = join(process.cwd(), 'actions')
	const consumers = listTypeScriptFiles(actionsRoot)
		.filter((file) =>
			readFileSync(file, 'utf8').includes(
				'actionClientWithAuthorizationShadow(',
			),
		)
		.map((file) => relative(process.cwd(), file).replaceAll('\\', '/'))
		.sort()
	const cutoverConsumers = listTypeScriptFiles(actionsRoot)
		.filter((file) =>
			readFileSync(file, 'utf8').includes(
				'actionClientWithAuthorizationCutover(',
			),
		)
		.map((file) => relative(process.cwd(), file).replaceAll('\\', '/'))
		.sort()

	it('keeps A-123 shadow-only and puts A-124/A-125 behind the cutover client', () => {
		expect(consumers).toEqual(['actions/team/register-staff-member-action.ts'])
		expect(cutoverConsumers).toEqual([
			'actions/team/staff-settings/grant-staff-access.ts',
			'actions/team/staff-settings/revoke-staff-access.ts',
		])

		const create = readFileSync(join(process.cwd(), consumers[0]), 'utf8')
		const grant = readFileSync(join(process.cwd(), cutoverConsumers[0]), 'utf8')
		const revoke = readFileSync(join(process.cwd(), cutoverConsumers[1]), 'utf8')
		expect(create).toContain("actionClientWithAuthorizationShadow('A-123')")
		expect(grant).toContain("actionClientWithAuthorizationCutover('A-124')")
		expect(revoke).toContain("actionClientWithAuthorizationCutover('A-125')")
	})

	it('keeps the existing Better Auth integration calls inside both handlers', () => {
		const grant = readFileSync(join(process.cwd(), cutoverConsumers[0]), 'utf8')
		const revoke = readFileSync(join(process.cwd(), cutoverConsumers[1]), 'utf8')

		expect(grant).toContain('createStaffOrganizationInvitation({')
		expect(revoke).toContain('revokeStaffOrganizationAccess({')
		expect(revoke).toContain('auth.api.cancelInvitation({')
	})

	it('keeps invitation acceptance session-only', () => {
		expect(
			readFileSync(
				join(
					process.cwd(),
					'actions/invitations/accept-organization-invitation.ts',
				),
				'utf8',
			),
		).not.toContain('actionClientWithAuthorizationShadow')
	})
})
