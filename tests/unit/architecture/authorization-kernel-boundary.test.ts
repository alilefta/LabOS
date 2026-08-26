import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

function sourceFiles(directory: string): string[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name)
		if (entry.isDirectory()) return sourceFiles(path)
		return entry.name.endsWith('.ts') ? [path] : []
	})
}

describe('authorization kernel architecture boundary', () => {
	it('does not import LabOS, Prisma, schema, or generated domain code', () => {
		const root = join(process.cwd(), 'platform', 'authorization')
		const violations = sourceFiles(root).flatMap((file) => {
			const source = readFileSync(file, 'utf8')
			return [
				/@\/modules\/labos-authorization/.test(source) && 'LabOS module import',
				/@prisma|generated\/prisma|@\/schema\//.test(source) &&
					'domain persistence import',
				/\b(?:labId|staffId)\b/.test(source) && 'LabOS identity field',
			]
				.filter((violation): violation is string => Boolean(violation))
				.map((violation) => `${relative(process.cwd(), file)}: ${violation}`)
		})

		expect(violations).toEqual([])
	})

	it('allows only the reviewed application adapter to import the kernel', () => {
		const applicationRoots = ['actions', 'app', 'components', 'data', 'lib']
		const consumers = applicationRoots.flatMap((directory) =>
			sourceFiles(join(process.cwd(), directory))
				.filter((file) =>
					readFileSync(file, 'utf8').includes('@/platform/authorization'),
				)
				.map((file) =>
					relative(process.cwd(), file).replaceAll('\\', '/'),
				),
		)

		expect(consumers).toEqual(['lib/safe-action.ts'])
	})
})
