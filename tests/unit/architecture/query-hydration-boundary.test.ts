import fs from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vitest'

describe('query hydration boundary', () => {
	it('is an explicit client boundary for TanStack Query hydration', () => {
		const source = fs.readFileSync(
			path.join(process.cwd(), 'providers/query-hydration-boundary.tsx'),
			'utf8',
		)

		expect(source).toMatch(
			/^\s*(?:\/\/[^\r\n]*\r?\n\s*)?['"]use client['"]/,
		)
		expect(source).toContain('HydrationBoundary')
		expect(source).toContain('QueryClientProvider')
		expect(source).toContain('getQueryClient()')
	})
})
