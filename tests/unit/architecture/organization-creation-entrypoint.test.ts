import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

describe('additional Organization creation entry point', () => {
	it('offers creation from the Organization selector', () => {
		const source = readFileSync(
			join(process.cwd(), 'components', 'auth', 'organization-selector.tsx'),
			'utf8',
		)

		expect(source).toContain('href="/organizations/new"')
		expect(source).toContain('Create a new workspace')
	})

	it('uses authenticated platform onboarding for the dedicated page', () => {
		const source = readFileSync(
			join(
				process.cwd(),
				'app',
				'(setup)',
				'organizations',
				'new',
				'page.tsx',
			),
			'utf8',
		)

		expect(source).toContain('getPlatformSession()')
		expect(source).toContain('<OnboardingForm mode="additional" />')
	})

	it('keeps creation discoverable from the application workspace switcher', () => {
		const source = readFileSync(
			join(
				process.cwd(),
				'components',
				'dashboard',
				'dashboard-workspace-switcher.tsx',
			),
			'utf8',
		)

		expect(source).toContain('href="/organizations/new"')
		expect(source).toContain('<DropdownMenuSeparator />')
	})
})
