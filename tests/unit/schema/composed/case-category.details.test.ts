import { describe, expect, it } from 'vitest'

import {
	CreateCaseCategoryInputSchema,
	UpdateCaseCategoryInputSchema,
} from '@/schema/composed/case-category.details'

const uploadGrantId = '11111111-1111-4111-8111-111111111111'
const categoryId = '22222222-2222-4222-8222-222222222222'

describe('Category image upload grant form field', () => {
	it('accepts an opaque UUID grant on create and update inputs', () => {
		expect(
			CreateCaseCategoryInputSchema.parse({
				name: 'Implants',
				imageUploadGrantId: uploadGrantId,
			}),
		).toMatchObject({ imageUploadGrantId: uploadGrantId })

		expect(
			UpdateCaseCategoryInputSchema.parse({
				categoryId,
				name: 'Implants',
				imageUploadGrantId: uploadGrantId,
			}),
		).toMatchObject({ imageUploadGrantId: uploadGrantId })
	})

	it('allows the safe omitted default but rejects non-UUID grant values', () => {
		expect(
			CreateCaseCategoryInputSchema.parse({ name: 'Implants' }),
		).not.toHaveProperty('imageUploadGrantId')
		expect(() =>
			CreateCaseCategoryInputSchema.parse({
				name: 'Implants',
				imageUploadGrantId: 'provider-key',
			}),
		).toThrow()
		expect(() =>
			UpdateCaseCategoryInputSchema.parse({
				categoryId,
				name: 'Implants',
				imageUploadGrantId: '',
			}),
		).toThrow()
	})

	it('keeps the grant optional for no-image create and edit submissions', () => {
		expect(
			CreateCaseCategoryInputSchema.parse({
				name: 'Implants',
				imageUrl: 'https://existing.example/category.png',
			}),
		).not.toHaveProperty('imageUploadGrantId')

		expect(
			UpdateCaseCategoryInputSchema.parse({
				categoryId,
				name: 'Implants',
				imageUrl: 'https://existing.example/category.png',
			}),
		).not.toHaveProperty('imageUploadGrantId')
	})
})
