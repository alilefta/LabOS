import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('post-authentication tenant restoration routing', () => {
	it('routes credential sign-in through the common continuation boundary', () => {
		const source = readFileSync(
			join(process.cwd(), 'components', 'auth', 'sign-in-form.tsx'),
			'utf8',
		)

		expect(source).toContain('/auth/continue?callbackUrl=')
		expect(source).toContain('callbackURL: postAuthUrl')
	})

	it('allows only authenticated tenant-bootstrap routes past the onboarding hint', () => {
		const source = readFileSync(join(process.cwd(), 'proxy.ts'), 'utf8')
		const unauthenticatedBranch = source.indexOf('if (!hasSession)')
		const bootstrapAllowance = source.indexOf('if (isTenantBootstrapRoute)')

		expect(source).toContain("['/auth/continue', '/select-organization']")
		expect(unauthenticatedBranch).toBeGreaterThan(-1)
		expect(bootstrapAllowance).toBeGreaterThan(unauthenticatedBranch)
	})

	it('preserves invitation callbacks before normal tenant resolution', () => {
		const source = readFileSync(
			join(
				process.cwd(),
				'components',
				'auth',
				'post-auth-continuation.tsx',
			),
			'utf8',
		)

		expect(source).toContain("callbackUrl.startsWith('/invite/')")
		expect(source.indexOf("callbackUrl.startsWith('/invite/')")).toBeLessThan(
			source.indexOf('resolvePostAuthOrganization('),
		)
	})
})
