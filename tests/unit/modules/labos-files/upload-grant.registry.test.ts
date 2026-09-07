import { describe, expect, it } from 'vitest'

import {
	createUploadGrantRegistry,
	labOSUploadGrantRegistry,
	UPLOAD_GRANT_ERROR_CODES,
	UploadGrantError,
} from '@/modules/labos-files/upload-grants'

const createDefinition = {
	boundaryId: 'N-FILE-TEST-CREATE',
	purpose: 'catalog.image.create.stage',
	targetType: null,
	ttlMs: 5 * 60_000,
} as const

const updateDefinition = {
	boundaryId: 'N-FILE-TEST-UPDATE',
	purpose: 'catalog.image.update.stage',
	targetType: 'catalog.category',
	ttlMs: 5 * 60_000,
} as const

describe('UploadGrantRegistry', () => {
	it('resolves only registered boundary and purpose pairs', () => {
		const registry = createUploadGrantRegistry([
			createDefinition,
			updateDefinition,
		])

		expect(
			registry.resolve(
				updateDefinition.boundaryId,
				updateDefinition.purpose,
				{ type: 'catalog.category', id: 'category-1' },
			),
		).toEqual(updateDefinition)

		expect(() =>
			registry.resolve('N-FILE-UNKNOWN', createDefinition.purpose, null),
		).toThrowError(
			expect.objectContaining<Partial<UploadGrantError>>({
				code: UPLOAD_GRANT_ERROR_CODES.DEFINITION_NOT_REGISTERED,
			}),
		)
	})

	it('enforces closed target semantics', () => {
		const registry = createUploadGrantRegistry([
			createDefinition,
			updateDefinition,
		])

		expect(() =>
			registry.resolve(
				createDefinition.boundaryId,
				createDefinition.purpose,
				{ type: 'catalog.category', id: 'category-1' },
			),
		).toThrowError(
			expect.objectContaining<Partial<UploadGrantError>>({
				code: UPLOAD_GRANT_ERROR_CODES.TARGET_INVALID,
			}),
		)
		expect(() =>
			registry.resolve(
				updateDefinition.boundaryId,
				updateDefinition.purpose,
				{ type: 'dentist', id: 'category-1' },
			),
		).toThrowError(
			expect.objectContaining<Partial<UploadGrantError>>({
				code: UPLOAD_GRANT_ERROR_CODES.TARGET_INVALID,
			}),
		)
		expect(() =>
			registry.resolve(
				updateDefinition.boundaryId,
				updateDefinition.purpose,
				null,
			),
		).toThrowError(
			expect.objectContaining<Partial<UploadGrantError>>({
				code: UPLOAD_GRANT_ERROR_CODES.TARGET_INVALID,
			}),
		)
	})

	it('rejects invalid, duplicate, and excessive-TTL definitions', () => {
		expect(() =>
			createUploadGrantRegistry([createDefinition, createDefinition]),
		).toThrowError(
			expect.objectContaining<Partial<UploadGrantError>>({
				code: UPLOAD_GRANT_ERROR_CODES.DEFINITION_INVALID,
			}),
		)
		expect(() =>
			createUploadGrantRegistry([
				{ ...createDefinition, ttlMs: 24 * 60 * 60_000 },
			]),
		).toThrowError(
			expect.objectContaining<Partial<UploadGrantError>>({
				code: UPLOAD_GRANT_ERROR_CODES.DEFINITION_INVALID,
			}),
		)
	})

	it('registers approved Catalog and Dentist grants but keeps deferred routes unavailable', () => {
		expect(
			labOSUploadGrantRegistry.resolve(
				'N-FILE-102',
				'catalog.category.image.create.stage',
				null,
			),
		).toMatchObject({ targetType: null, ttlMs: 15 * 60_000 })
		expect(
			labOSUploadGrantRegistry.resolve(
				'N-FILE-109',
				'dentist.avatar.update.stage',
				{ type: 'dentist', id: 'dentist-1' },
			),
		).toMatchObject({ targetType: 'dentist' })
		for (const boundaryId of ['N-FILE-101', 'N-FILE-110', 'N-FILE-111']) {
			expect(() =>
				labOSUploadGrantRegistry.get(boundaryId, 'unavailable'),
			).toThrowError(
				expect.objectContaining<Partial<UploadGrantError>>({
					code: UPLOAD_GRANT_ERROR_CODES.DEFINITION_NOT_REGISTERED,
				}),
			)
		}
	})
})
