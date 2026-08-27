import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

const routeDirectory = join(
	process.cwd(),
	'app',
	'(main)',
	'settings',
	'team',
)

describe('N-001 Team directory page boundary', () => {
	it('keeps the route server-only and loads through the authorized loader', () => {
		const source = readFileSync(join(routeDirectory, 'page.tsx'), 'utf8')

		expect(source).toContain('loadN001TeamDirectory()')
		expect(source).not.toContain("'use client'")
		expect(source).not.toContain('generalPrisma')
		expect(source).not.toContain('LabUser')
		expect(source).not.toContain('teamMembers =')
	})

	it('renders a sanitized denial while rethrowing unrelated page failures', () => {
		const source = readFileSync(join(routeDirectory, 'page.tsx'), 'utf8')

		expect(source).toContain('error instanceof N001TeamDirectoryLoaderError')
		expect(source).toContain('Team directory unavailable')
		expect(source).toContain('throw error')
		expect(source).not.toContain('AUTHZ_PERMISSION_NOT_GRANTED')
	})

	it('renders only the safe DTO and exposes no mutation implementation', () => {
		const source = readFileSync(
			join(routeDirectory, 'team-directory-view.tsx'),
			'utf8',
		)

		expect(source).toContain('OrganizationMemberDirectoryPageDTO')
		expect(source).not.toContain('generalPrisma')
		expect(source).not.toContain('LabUser')
		expect(source).not.toContain('AuthUser')
		expect(source).not.toContain('grantStaff')
		expect(source).not.toContain('revokeStaff')
	})
})
