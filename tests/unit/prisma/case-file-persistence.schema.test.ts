import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

const repositoryRoot = process.cwd()
const schema = readFileSync(join(repositoryRoot, 'prisma/schema.prisma'), 'utf8')
const reviewSql = readFileSync(
	join(repositoryRoot, 'docs/evidence/files/authorization-v1/c2-case-file-persistence/c2-proposed-migration.sql'),
	'utf8',
)

describe('C2 Case file persistence schema artifacts', () => {
	it('keeps current-version ownership composite and does not weaken it to a single-column foreign key', () => {
		expect(schema).toContain('fields: [currentVersionId, id, labId], references: [id, caseAssetFileId, labId]')
		expect(schema).toContain('@@unique([currentVersionId, id, labId])')
		expect(schema).toContain('@@unique([id, caseAssetFileId, labId])')
	})

	it('keeps the final-state guard deferred and based on the committed row state', () => {
		expect(reviewSql).toContain('DEFERRABLE INITIALLY DEFERRED')
		expect(reviewSql).toContain('SELECT * INTO final_asset')
		expect(reviewSql).toContain('WHERE "id" = NEW."id"')
		expect(reviewSql).toContain('AFTER INSERT OR UPDATE OF "storageMode", "currentVersionId", "documentUrl", "fileExtension"')
	})

	it('allows only a narrow live Member null transition while keeping persistence and audit history immutable', () => {
		const storedFileColumns = [
			'id',
			'organizationId',
			'labId',
			'sourceUploadGrantId',
			'provider',
			'providerObjectKey',
			'purpose',
			'detectedMimeType',
			'sizeBytes',
			'checksumAlgorithm',
			'checksumValue',
			'uploaderMemberIdSnapshot',
			'createdAt',
		]
		const versionColumns = [
			'id',
			'caseAssetFileId',
			'organizationId',
			'labId',
			'storedFileId',
			'versionNumber',
			'createdByMemberIdSnapshot',
			'createdAt',
		]

		expect(reviewSql).toContain('CREATE FUNCTION "StoredFile_allow_live_member_null_transition_only"()')
		expect(reviewSql).toContain('OLD."uploaderMemberId" IS NOT NULL')
		expect(reviewSql).toContain('NEW."uploaderMemberId" IS NULL')
		expect(reviewSql).toContain('CREATE FUNCTION "CaseAssetFileVersion_allow_live_member_null_transition_only"()')
		expect(reviewSql).toContain('OLD."createdByMemberId" IS NOT NULL')
		expect(reviewSql).toContain('NEW."createdByMemberId" IS NULL')
		for (const column of storedFileColumns) {
			expect(reviewSql).toContain(`NEW."${column}" IS NOT DISTINCT FROM OLD."${column}"`)
		}
		for (const column of versionColumns) {
			expect(reviewSql).toContain(`NEW."${column}" IS NOT DISTINCT FROM OLD."${column}"`)
		}
		expect(reviewSql).toContain('BEFORE UPDATE OR DELETE ON "StoredFile"')
		expect(reviewSql).toContain('BEFORE UPDATE OR DELETE ON "CaseAssetFileVersion"')
		expect(reviewSql).toContain('BEFORE UPDATE OR DELETE ON "CaseFileAccessAudit"')
		expect(reviewSql).toContain("CaseFileAccessAudit history is append-only")
	})
})
