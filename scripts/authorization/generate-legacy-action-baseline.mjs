import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const EXPECTED_COUNTS = Object.freeze({
	ADMIN: 52,
	MANAGER: 14,
	null: 4,
	OWNER: 6,
	STAFF: 55,
})

const actionsRoot = path.join(process.cwd(), 'actions')
const outputPath = path.join(
	process.cwd(),
	'notes/project/authorization-v1-legacy-action-baseline.md',
)

/**
 * Recursively returns TypeScript action files in deterministic path order.
 * Generated artifacts and non-action source trees are intentionally excluded;
 * this baseline tracks only the legacy safe-action metadata under `actions/`.
 */
async function listActionFiles(directory) {
	const entries = await readdir(directory, { withFileTypes: true })
	const files = []

	for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
		const entryPath = path.join(directory, entry.name)
		if (entry.isDirectory()) {
			files.push(...(await listActionFiles(entryPath)))
		} else if (/\.tsx?$/.test(entry.name)) {
			files.push(entryPath)
		}
	}

	return files
}

/**
 * Extracts literal action names and legacy roles from metadata declarations.
 * It deliberately rejects dynamic or malformed authorization metadata so the
 * migration inventory cannot silently omit a boundary it cannot understand.
 */
function extractDeclarations(filePath, source) {
	const declarations = []
	const metadataPattern = /\.metadata\s*\(\s*\{(?<body>[\s\S]*?)\}\s*\)/g

	for (const match of source.matchAll(metadataPattern)) {
		const body = match.groups?.body ?? ''
		const roleMatch = body.match(
			/requiredLabRole\s*:\s*(?:['"](?<role>OWNER|MANAGER|ADMIN|STAFF)['"]|(?<none>null))/,
		)
		if (!roleMatch) continue

		const actionMatch = body.match(/actionName\s*:\s*['"](?<name>[^'"]+)['"]/)
		if (!actionMatch?.groups?.name) {
			throw new Error(`Non-literal actionName beside requiredLabRole in ${filePath}`)
		}

		const offset = match.index ?? 0
		declarations.push({
			actionName: actionMatch.groups.name,
			legacyRole: roleMatch.groups?.none ? 'null' : roleMatch.groups?.role,
			line: source.slice(0, offset).split('\n').length,
		})
	}

	return declarations
}

function escapeTableCell(value) {
	return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ')
}

/**
 * Fails generation when the extracted baseline changes. Updating these counts
 * must be an explicit review action, preventing new legacy gates from quietly
 * entering the codebase while Authorization V1 is being built.
 */
function assertBaseline(records) {
	const actual = Object.fromEntries(
		Object.keys(EXPECTED_COUNTS).map((role) => [
			role,
			records.filter((record) => record.legacyRole === role).length,
		]),
	)

	for (const [role, expected] of Object.entries(EXPECTED_COUNTS)) {
		if (actual[role] !== expected) {
			throw new Error(
				`Legacy ${role} count changed: expected ${expected}, received ${actual[role]}`,
			)
		}
	}

	const expectedTotal = Object.values(EXPECTED_COUNTS).reduce(
		(total, count) => total + count,
		0,
	)
	if (records.length !== expectedTotal) {
		throw new Error(
			`Legacy authorization total changed: expected ${expectedTotal}, received ${records.length}`,
		)
	}
}

function renderDocument(records) {
	const rows = records.map(
		(record, index) =>
			`| A-${String(index + 1).padStart(3, '0')} | \`${escapeTableCell(record.file)}:${record.line}\` | \`${escapeTableCell(record.actionName)}\` | \`${record.legacyRole}\` | Pending classification |`,
	)
	const countRows = Object.entries(EXPECTED_COUNTS).map(
		([role, count]) => `| \`${role}\` | ${count} |`,
	)

	return [
		'# Authorization V1 legacy action baseline',
		'',
		'**Generated:** Do not edit rows manually',
		'**Generator:** `scripts/authorization/generate-legacy-action-baseline.mjs`',
		'**Scope:** Literal `requiredLabRole` declarations under `actions/`',
		`**Verified total:** ${records.length}`,
		'',
		'This document is the immutable mechanical baseline for the Authorization V1 migration. It records what exists, not what the new policy should be. Proposed permissions, target requirements, policies, sensitivity, behavior changes, and migration status belong in the reviewed migration inventory.',
		'',
		'## Counts',
		'',
		'| Legacy value | Count |',
		'|---|---:|',
		...countRows,
		`| **Total** | **${records.length}** |`,
		'',
		'## Declarations',
		'',
		'| ID | Source | Action | Legacy role | Review state |',
		'|---|---|---|---|---|',
		...rows,
		'',
	].join('\n')
}

const files = await listActionFiles(actionsRoot)
const records = []

for (const filePath of files) {
	const source = await readFile(filePath, 'utf8')
	const relativePath = path.relative(process.cwd(), filePath).replaceAll('\\', '/')
	for (const declaration of extractDeclarations(relativePath, source)) {
		records.push({ file: relativePath, ...declaration })
	}
}

assertBaseline(records)
await writeFile(outputPath, renderDocument(records), 'utf8')
console.info(`Generated ${records.length} legacy authorization records at ${outputPath}`)
