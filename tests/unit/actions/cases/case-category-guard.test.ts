import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const readSource = (...segments: string[]) =>
	readFileSync(join(process.cwd(), ...segments), 'utf8')

describe('case category business guards', () => {
	it.each(['create-case.ts', 'update-case-form.ts'] as const)(
		'rejects archived categories while allowing active categories in %s',
		(file) => {
			const source = readSource('actions', 'cases', file)
			expect(source).toMatch(/if \(category\.isArchived\)\s+throw ERRORS\.OPERATION_NOT_ALLOWED/)
			expect(source).not.toMatch(/if \(!category\.isArchived\)\s+throw ERRORS\.OPERATION_NOT_ALLOWED/)
		},
	)
})
