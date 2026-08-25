import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('Better Auth Organization catch-all boundary', () => {
	it('routes GET and POST through the default-deny Organization policy', () => {
		const source = readFileSync(
			join(process.cwd(), 'app/api/auth/[...all]/route.ts'),
			'utf8',
		)

		expect(source).toContain('evaluateOrganizationHttpRoute({')
		expect(source).toContain('if (!decision.allowed)')
		expect(source).toContain("status: 403")
		expect(source).not.toContain('export const { POST, GET }')
	})

	it('keeps public Organization creation and deletion disabled in provider configuration', () => {
		const source = readFileSync(join(process.cwd(), 'lib/auth.ts'), 'utf8')

		expect(source).toContain('allowUserToCreateOrganization: false')
		expect(source).toContain('disableOrganizationDeletion: true')
	})

	it('preserves the browser routes currently required for tenant selection', () => {
		const source = readFileSync(
			join(process.cwd(), 'lib/post-auth-organization-client.ts'),
			'utf8',
		)

		expect(source).toContain('authClient.organization.list()')
		expect(source).toContain('authClient.organization.setActive({')
	})
})
