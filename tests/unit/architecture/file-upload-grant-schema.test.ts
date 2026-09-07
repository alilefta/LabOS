import { readFileSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

const schema = readFileSync(
	join(process.cwd(), 'prisma/schema.prisma'),
	'utf8',
)
const migration = readFileSync(
	join(
		process.cwd(),
		'prisma/migrations/20260904003000_add_file_upload_grants/migration.sql',
	),
	'utf8',
)

describe('FileUploadGrant persistence contract', () => {
	it('defines the closed lifecycle required for one-time use and cleanup', () => {
		expect(schema).toMatch(
			/enum FileUploadGrantStatus \{[\s\S]*PENDING[\s\S]*UPLOADED[\s\S]*CONSUMED[\s\S]*EXPIRED[\s\S]*FAILED[\s\S]*CLEANED[\s\S]*\}/,
		)
		expect(migration).toContain(
			`CREATE TYPE "FileUploadGrantStatus" AS ENUM ('PENDING', 'UPLOADED', 'CONSUMED', 'EXPIRED', 'FAILED', 'CLEANED')`,
		)
	})

	it('stores canonical scope, registry purpose, provider facts, and lifecycle timestamps', () => {
		for (const field of [
			'organizationId',
			'labId',
			'createdByMemberId',
			'boundaryId',
			'purpose',
			'targetType',
			'targetId',
			'providerFileKey',
			'providerFileUrl',
			'correlationId',
			'expiresAt',
			'uploadedAt',
			'consumedAt',
			'providerDeletedAt',
			'cleanupAttemptCount',
		]) {
			expect(schema).toContain(field)
			expect(migration).toContain(`"${field}"`)
		}
	})

	it('provides indexes for conditional consumption, expiry, boundary, target, and provider callback lookup', () => {
		expect(schema).toContain('providerFileKey String? @unique')
		expect(schema).toContain(
			'@@index([organizationId, labId, createdByMemberId, status])',
		)
		expect(schema).toContain('@@index([status, expiresAt])')
		expect(schema).toContain('@@index([boundaryId, status])')
		expect(schema).toContain('@@index([targetType, targetId, status])')
		expect(migration).toContain(
			'CREATE UNIQUE INDEX "FileUploadGrant_providerFileKey_key"',
		)
	})

	it('preserves expired grants for cleanup if their creating Member is removed', () => {
		expect(schema).toMatch(
			/Member\?\s+@relation\(fields: \[createdByMemberId\], references: \[id\], onDelete: SetNull\)/,
		)
		expect(migration).toContain(
			'REFERENCES "member"("id") ON DELETE SET NULL ON UPDATE CASCADE',
		)
	})

	it('does not persist request payloads or raw provider errors', () => {
		const model = schema.match(/model FileUploadGrant \{[\s\S]*?\n\}/)?.[0]
		expect(model).toBeDefined()
		expect(model).not.toMatch(/requestPayload|authorizationHeader|cookie|providerError|email|fileName|notes/)
	})
})
