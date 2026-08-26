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

describe('generic membership action rollout boundary', () => {
	const root = process.cwd()
	const consumers = listTypeScriptFiles(join(root, 'actions'))
		.filter((file) =>
			readFileSync(file, 'utf8').includes(
				'actionClientWithMembershipAuthorization(',
			),
		)
		.map((file) => relative(root, file).replaceAll('\\', '/'))
		.sort()

	it('allows only the reviewed M-002, M-003, and M-004 server actions', () => {
		expect(consumers).toEqual([
			'actions/settings/team/invite-organization-member.ts',
			'actions/settings/team/remove-organization-member.ts',
			'actions/settings/team/update-organization-member-role.ts',
		])

		const invite = readFileSync(join(root, consumers[0]), 'utf8')
		const remove = readFileSync(join(root, consumers[1]), 'utf8')
		const update = readFileSync(join(root, consumers[2]), 'utf8')
		expect(invite).toContain(
			"actionClientWithMembershipAuthorization('M-004')",
		)
		expect(invite).toContain("process.env.NODE_ENV === 'development'")
		expect(invite).toContain('developmentInviteToken')
		expect(remove).toContain(
			"actionClientWithMembershipAuthorization('M-003')",
		)
		expect(update).toContain(
			"actionClientWithMembershipAuthorization('M-002')",
		)
		for (const source of [invite, remove, update]) {
			expect(source).not.toContain('auth.api.')
			expect(source).not.toContain('.metadata(')
			expect(source).not.toContain('.inputSchema(')
		}
	})

	it('connects only the reviewed controls with explicit destructive safeguards', () => {
		const page = readFileSync(
			join(root, 'app/(main)/settings/team/page.tsx'),
			'utf8',
		)
		const view = readFileSync(
			join(root, 'app/(main)/settings/team/team-directory-view.tsx'),
			'utf8',
		)
		const controls = readFileSync(
			join(
				root,
				'app/(main)/settings/team/team-member-administration-controls.tsx',
			),
			'utf8',
		)
		const invitation = readFileSync(
			join(
				root,
				'app/(main)/settings/team/team-member-invitation-control.tsx',
			),
			'utf8',
		)
		const ui = `${page}\n${view}\n${controls}\n${invitation}`

		expect(controls).toContain('updateOrganizationMemberRoleAction')
		expect(controls).toContain('removeOrganizationMemberAction')
		expect(controls).toContain('getMembershipAdministrationUiPolicy')
		expect(controls).toContain('Use Staff access revocation instead.')
		expect(controls).toContain('<AlertDialog')
		expect(controls).toContain("router.refresh()")
		expect(invitation).toContain('inviteOrganizationMemberAction')
		expect(invitation).toContain('operational Staff profile.')
		expect(invitation).toContain("['admin', 'manager', 'staff']")
		expect(invitation).toContain('This link is shown only in development')
		expect(invitation).toContain(
			'InviteOrganizationMemberInputSchema.safeParse',
		)
		expect(invitation).toContain('aria-invalid={Boolean(emailError)}')
		expect(invitation).toContain('Invitation will be sent to')
		expect(page).toContain('tenant.memberId')
		expect(ui).not.toContain('auth.api.')
	})

	it('revalidates the directory only after successful server mutations', () => {
		for (const file of consumers) {
			const source = readFileSync(join(root, file), 'utf8')
			expect(source).toContain("revalidatePath('/settings/team')")
			expect(source.indexOf('await membershipAdministrationService.')).toBeLessThan(
				source.indexOf("revalidatePath('/settings/team')"),
			)
		}
	})
})
