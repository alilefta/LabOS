import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

import { describe, expect, it } from 'vitest'

const ORGANIZATION_MUTATION_METHODS = [
	'createOrganization',
	'updateOrganization',
	'deleteOrganization',
	'setActiveOrganization',
	'createInvitation',
	'cancelInvitation',
	'acceptInvitation',
	'rejectInvitation',
	'addMember',
	'removeMember',
	'updateMemberRole',
	'leaveOrganization',
] as const

const EXPECTED_CALLERS = [
	'actions/invitations/accept-organization-invitation.ts:acceptInvitation',
	'actions/team/staff-settings/revoke-staff-access.ts:cancelInvitation',
	'lib/staff-access-revocation/staff-access-revocation.service.ts:removeMember',
	'lib/staff-invitation/staff-invitation.gateway.ts:cancelInvitation',
	'lib/staff-invitation/staff-invitation.gateway.ts:createInvitation',
	'modules/labos-membership/membership-administration.gateway.ts:createInvitation',
	'modules/labos-membership/membership-administration.gateway.ts:removeMember',
	'modules/labos-membership/membership-administration.gateway.ts:updateMemberRole',
	'platform/organizations/onboarding/organization-onboarding.gateway.ts:createOrganization',
	'platform/organizations/onboarding/organization-onboarding.gateway.ts:setActiveOrganization',
] as const

function listTypeScriptFiles(directory: string): string[] {
	return readdirSync(directory).flatMap((entry) => {
		const path = join(directory, entry)
		if (statSync(path).isDirectory()) return listTypeScriptFiles(path)
		return /\.(?:ts|tsx)$/.test(entry) ? [path] : []
	})
}

function normalizePath(path: string) {
	return path.split(sep).join('/')
}

/**
 * Returns every direct in-process Better Auth Organization mutation. These
 * calls bypass the HTTP catch-all guard, so each caller must be explicitly
 * reviewed and pinned here or moved behind a trusted product adapter.
 */
function findOrganizationMutationCallers() {
	const root = process.cwd()
	const files = ['actions', 'app', 'lib', 'modules', 'platform'].flatMap(
		(directory) => listTypeScriptFiles(join(root, directory)),
	)
	const methodPattern = new RegExp(
		`auth\\.api\\.(${ORGANIZATION_MUTATION_METHODS.join('|')})\\s*\\(`,
		'g',
	)

	return files
		.flatMap((file) => {
			const source = readFileSync(file, 'utf8')
			return Array.from(source.matchAll(methodPattern), (match) =>
				`${normalizePath(relative(root, file))}:${match[1]}`,
			)
		})
		.sort()
}

describe('Better Auth Organization in-process mutation boundary', () => {
	it('contains exactly the reviewed mutation callers', () => {
		expect(findOrganizationMutationCallers()).toEqual([...EXPECTED_CALLERS].sort())
	})

	it('does not use computed auth.api access that can evade the inventory', () => {
		const root = process.cwd()
		const computedCallers = ['actions', 'app', 'lib', 'modules', 'platform']
			.flatMap((directory) => listTypeScriptFiles(join(root, directory)))
			.filter((file) => /auth\.api\s*\[/.test(readFileSync(file, 'utf8')))
			.map((file) => normalizePath(relative(root, file)))

		expect(computedCallers).toEqual([])
	})
})
