import { describe, expect, it } from 'vitest'

import { CreateWorkTypeInputSchema, UpdateWorkTypeInputSchema } from '@/schema/composed/worktype.details'

const grantId = '11111111-1111-4111-8111-111111111111'
const workTypeId = '22222222-2222-4222-8222-222222222222'

describe('WorkType image upload grant form field', () => {
	it('accepts opaque grant identifiers and rejects raw provider keys', () => {
		expect(CreateWorkTypeInputSchema.parse({ name: 'Crowns', caseCategoryId: 'category-1', imageUploadGrantId: grantId })).toMatchObject({ imageUploadGrantId: grantId })
		expect(UpdateWorkTypeInputSchema.parse({ name: 'Crowns', caseCategoryId: 'category-1', workTypeId, imageUploadGrantId: grantId })).toMatchObject({ imageUploadGrantId: grantId })
		expect(() => CreateWorkTypeInputSchema.parse({ name: 'Crowns', caseCategoryId: 'category-1', imageUploadGrantId: 'provider-key' })).toThrow()
	})
})
