import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import ts from 'typescript'
import { describe, expect, it } from 'vitest'

const SOURCE_ROOTS = ['actions', 'app', 'components', 'data', 'lib', 'platform']
const MUTATION_METHODS = new Set([
	'create',
	'createMany',
	'createManyAndReturn',
	'upsert',
	'update',
	'updateMany',
	'delete',
	'deleteMany',
])

function sourceFiles(directory: string): string[] {
	return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
		const path = join(directory, entry.name)
		if (entry.isDirectory()) return sourceFiles(path)
		return /\.(?:ts|tsx)$/.test(entry.name) ? [path] : []
	})
}

function containsProperty(node: ts.Node, propertyName: string) {
	let found = false
	function visit(child: ts.Node) {
		if (
			ts.isPropertyAssignment(child) &&
			((ts.isIdentifier(child.name) && child.name.text === propertyName) ||
				(ts.isStringLiteral(child.name) && child.name.text === propertyName))
		) {
			found = true
			return
		}
		ts.forEachChild(child, visit)
	}
	visit(node)
	return found
}

/**
 * Finds direct Prisma mutations of frozen legacy membership models. AuthUser
 * remains writable for Better Auth identity concerns, so only a `labId`
 * assignment is forbidden there. Generated clients, migrations, and tests are
 * intentionally outside the scanned application roots.
 */
function findLegacyTenancyWrites(file: string) {
	const sourceText = readFileSync(file, 'utf8')
	const source = ts.createSourceFile(
		file,
		sourceText,
		ts.ScriptTarget.Latest,
		true,
		file.endsWith('x') ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
	)
	const violations: string[] = []
	const legacyRawSql =
		/(?:insert\s+into|update|delete\s+from)\s+["'`\\]*(?:LabUser|LabInvitation)\b|update\s+["'`\\]*AuthUser\b[\s\S]{0,500}\blabId\b/i
	if (legacyRawSql.test(sourceText)) {
		violations.push(`${relative(process.cwd(), file)} raw legacy tenancy SQL`)
	}

	function visit(node: ts.Node) {
		if (
			ts.isCallExpression(node) &&
			ts.isPropertyAccessExpression(node.expression) &&
			MUTATION_METHODS.has(node.expression.name.text) &&
			ts.isPropertyAccessExpression(node.expression.expression)
		) {
			const model = node.expression.expression.name.text
			const method = node.expression.name.text
			const forbiddenModel = model === 'labUser' || model === 'labInvitation'
			const forbiddenAuthTenantWrite =
				model === 'authUser' && node.arguments.some((argument) => containsProperty(argument, 'labId'))

			if (forbiddenModel || forbiddenAuthTenantWrite) {
				const position = source.getLineAndCharacterOfPosition(node.getStart(source))
				violations.push(
					`${relative(process.cwd(), file)}:${position.line + 1} ${model}.${method}`,
				)
			}
		}
		ts.forEachChild(node, visit)
	}

	visit(source)
	return violations
}

describe('legacy tenancy write freeze', () => {
	it('blocks new LabInvitation, LabUser, and AuthUser.labId writes', () => {
		const violations = SOURCE_ROOTS.flatMap((root) =>
			sourceFiles(join(process.cwd(), root)).flatMap(findLegacyTenancyWrites),
		)

		expect(
			violations,
			'Legacy tenancy writes are frozen. Use Better Auth Organization, Member, Invitation, and TenantContext services.',
		).toEqual([])
	})

	it('keeps the legacy Better Auth labId field closed to API input', () => {
		const authSource = readFileSync(join(process.cwd(), 'lib', 'auth.ts'), 'utf8')
		const legacyField = authSource.match(/labId\s*:\s*\{[\s\S]{0,400}?\}/)?.[0]

		expect(legacyField).toBeDefined()
		expect(legacyField).toMatch(/input\s*:\s*false/)
	})
})
