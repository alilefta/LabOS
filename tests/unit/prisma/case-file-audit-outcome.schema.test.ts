import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

const reviewSql = readFileSync(
	join(process.cwd(), 'docs/evidence/files/authorization-v1/c2-case-file-persistence/c2-proposed-migration.sql'),
	'utf8',
)

describe('C2 Case file access audit constraint', () => {
	it('requires an allowed authorization before issuance', () => {
		expect(reviewSql).toMatch(/"issuanceOutcome" = 'ISSUED'\s+AND "authorizationOutcome" = 'ALLOWED'/)
		expect(reviewSql).toContain('"expiresAt" <= "issuedAt" + INTERVAL \'300 seconds\'')
	})
})
