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

	it('limits runtime shadow-client adoption to A-124 and A-125', () => {
		expect(consumers).toEqual([
			'actions/team/staff-settings/grant-staff-access.ts',
			'actions/team/staff-settings/revoke-staff-access.ts',
		])

		const grant = readFileSync(join(process.cwd(), consumers[0]), 'utf8')
		const revoke = readFileSync(join(process.cwd(), consumers[1]), 'utf8')
		expect(grant).toContain("actionClientWithAuthorizationShadow('A-124')")
		expect(revoke).toContain("actionClientWithAuthorizationShadow('A-125')")
	})

	it('keeps the existing Better Auth integration calls inside both handlers', () => {
		const grant = readFileSync(join(process.cwd(), consumers[0]), 'utf8')
		const revoke = readFileSync(join(process.cwd(), consumers[1]), 'utf8')

		expect(grant).toContain('createStaffOrganizationInvitation({')
		expect(revoke).toContain('revokeStaffOrganizationAccess({')
		expect(revoke).toContain('auth.api.cancelInvitation({')
	})

	it('does not migrate invitation acceptance or Staff creation', () => {
		for (const file of [
			'actions/invitations/accept-organization-invitation.ts',
			'actions/team/register-staff-member-action.ts',
		]) {
			expect(readFileSync(join(process.cwd(), file), 'utf8')).not.toContain(
				'actionClientWithAuthorizationShadow',
			)
		}
	})
})
