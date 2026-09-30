import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'

const schema = readFileSync(new URL('../schema.prisma', import.meta.url), 'utf8')
const sql = readFileSync(
	new URL('../migrations/20260927130000_case_clinical_upload_evidence/migration.sql', import.meta.url),
	'utf8',
)

test('evidence binds grant, tenant, provider key and Case', () => {
	assert.match(schema, /model CaseClinicalUploadEvidence \{/)
	assert.match(schema, /uploadGrantId\s+String @id/)
	assert.match(schema, /fields: \[uploadGrantId, organizationId, labId, provider, providerObjectKey\], references: \[id, organizationId, labId, provider, providerFileKey\]/)
	assert.match(schema, /@@unique\(\[provider, providerObjectKey\]\)/)
	assert.match(schema, /fields: \[caseId, labId\], references: \[id, labId\]/)
})

test('release identity is structural and evidence is immutable', () => {
	assert.match(schema, /validationProfile\s+String @db\.VarChar\(64\)/)
	assert.match(sql, /CaseClinicalUploadEvidence_profile_shape/)
	assert.match(sql, /BEFORE UPDATE OR DELETE ON "CaseClinicalUploadEvidence"/)
	assert.doesNotMatch(sql, /maxEncodedBytes|maxDecodedPixels|policyJson/)
})

test('Case UPLOADED and managed-purpose final states are deferred', () => {
	assert.match(sql, /CREATE CONSTRAINT TRIGGER "FileUploadGrant_case_uploaded_evidence"/)
	assert.match(sql, /CREATE CONSTRAINT TRIGGER "CaseClinicalUploadEvidence_uploaded"/)
	assert.match(sql, /CREATE CONSTRAINT TRIGGER "CaseAssetFile_clinical_purpose"/)
	assert.equal(sql.match(/DEFERRABLE INITIALLY DEFERRED/g)?.length, 3)
	assert.match(sql, /final_grant\."status" = 'UPLOADED'/)
	assert.match(sql, /OLD\."createdByMemberId" IS NOT NULL AND NEW\."createdByMemberId" IS NULL/)
	assert.match(sql, /CREATE CONSTRAINT TRIGGER "FileUploadGrant_case_uploaded_evidence"\s+AFTER INSERT OR UPDATE OF "status"/)
})

test('Case grant insertion and evidence require a canonical Member and unexpired clock', () => {
	assert.match(sql, /TG_OP = 'INSERT' AND \(NEW\."createdByMemberId" IS NULL OR NOT EXISTS/)
	assert.match(sql, /m\."organizationId" = NEW\."organizationId"/)
	assert.match(sql, /grant_row\."createdByMemberId" IS NULL/)
	assert.match(sql, /m\."organizationId" = grant_row\."organizationId"/)
	assert.match(sql, /clock_timestamp\(\) >= \(grant_row\."expiresAt" AT TIME ZONE 'UTC'\)/)
	assert.match(sql, /clock_timestamp\(\) >= \(final_grant\."expiresAt" AT TIME ZONE 'UTC'\)/)
	assert.match(sql, /Expired Case clinical grant cannot become UPLOADED/)
})

test('legacy rows remain unbackfilled and Case-only purpose is nullable', () => {
	assert.match(schema, /clinicalPurpose\s+CaseClinicalPurpose\?/)
	assert.match(sql, /ALTER TABLE "CaseAssetFile" ADD COLUMN "clinicalPurpose" "CaseClinicalPurpose";/)
	assert.doesNotMatch(sql, /UPDATE "CaseAssetFile"|INSERT INTO "StoredFile"|INSERT INTO "CaseAssetFileVersion"/)
})
