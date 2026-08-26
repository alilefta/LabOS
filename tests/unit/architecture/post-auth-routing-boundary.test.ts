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
		expect(source).toContain('window.location.assign(postAuthUrl)')
	})

	it('preserves invitation callbacks when switching between auth forms', () => {
		const signUpSource = readFileSync(
			join(process.cwd(), 'components', 'auth', 'sign-up-form.tsx'),
			'utf8',
		)
		const signInSource = readFileSync(
			join(process.cwd(), 'components', 'auth', 'sign-in-form.tsx'),
			'utf8',
		)

		expect(signUpSource).toContain(
			'`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`',
		)
		expect(signInSource).toContain(
			'`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`',
		)
		expect(signUpSource).toContain(
			'window.location.assign(callbackUrl ?? SIGN_UP_CALLBACK_URL)',
		)
	})

	it('allows only authenticated tenant-bootstrap routes past the onboarding hint', () => {
		const source = readFileSync(join(process.cwd(), 'proxy.ts'), 'utf8')
		const unauthenticatedBranch = source.indexOf('if (!hasSession)')
		const bootstrapAllowance = source.indexOf(
			'if (isTenantBootstrapRoute || isOrganizationCreationRoute)',
		)

		expect(source).toContain("['/auth/continue', '/select-organization']")
		expect(source).toContain("const organizationCreationRoute = '/organizations/new'")
		expect(source).toContain('isTenantBootstrapRoute || isOrganizationCreationRoute')
		expect(unauthenticatedBranch).toBeGreaterThan(-1)
		expect(bootstrapAllowance).toBeGreaterThan(unauthenticatedBranch)
	})

	it('uses document navigation after active Organization selection', () => {
		const selectorSource = readFileSync(
			join(process.cwd(), 'components', 'auth', 'organization-selector.tsx'),
			'utf8',
		)
		const continuationSource = readFileSync(
			join(
				process.cwd(),
				'components',
				'auth',
				'post-auth-continuation.tsx',
			),
			'utf8',
		)

		expect(selectorSource).toContain('window.location.replace(callbackUrl)')
		expect(selectorSource).toContain('announceActiveOrganizationChange()')
		expect(selectorSource).not.toContain('router.replace(callbackUrl)')
		expect(continuationSource).toContain(
			'window.location.replace(callbackUrl)',
		)
		expect(continuationSource).toContain(
			'if (resolution.restored) announceActiveOrganizationChange()',
		)
	})

	it('evicts stale protected tabs after an Organization change', () => {
		const shellSource = readFileSync(
			join(
				process.cwd(),
				'components',
				'dashboard',
				'dashboard-client-shell.tsx',
			),
			'utf8',
		)
		const syncSource = readFileSync(
			join(
				process.cwd(),
				'components',
				'dashboard',
				'active-organization-tab-sync.tsx',
			),
			'utf8',
		)
		const switcherSource = readFileSync(
			join(
				process.cwd(),
				'components',
				'dashboard',
				'dashboard-workspace-switcher.tsx',
			),
			'utf8',
		)

		expect(shellSource).toContain('<ActiveOrganizationTabSync />')
		expect(syncSource).toContain("window.addEventListener('storage'")
		expect(syncSource).toContain("window.location.replace('/dashboard')")
		expect(switcherSource).toContain('announceActiveOrganizationChange()')
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
		expect(source).toContain('window.location.replace(callbackUrl)')
		expect(source.indexOf("callbackUrl.startsWith('/invite/')")).toBeLessThan(
			source.indexOf('resolvePostAuthOrganization('),
		)
	})

	it('repairs revoked active membership before entering onboarding', () => {
		const source = readFileSync(
			join(process.cwd(), 'app', '(main)', 'layout.tsx'),
			'utf8',
		)

		expect(source).toContain('isTenantContextError(error)')
		expect(source).toContain("TENANT_CONTEXT_ERROR_CODES.UNAUTHENTICATED")
		expect(source).toContain("'/auth/continue?callbackUrl=%2Fdashboard'")
	})
})
