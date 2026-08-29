import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

describe('dashboard shell rendering boundary', () => {
	it('does not force the authenticated document through a dynamic CSR bailout', () => {
		const source = fs.readFileSync(
			path.join(process.cwd(), 'components/dashboard/dashboard-client-shell.tsx'),
			'utf8',
		)

		expect(source).not.toContain("from 'next/dynamic'")
		expect(source).not.toContain("ssr: false")
		expect(source).toContain("from './dashboard-sidebar'")
		expect(source).toContain("from './dashboard-top-header'")
	})
})
