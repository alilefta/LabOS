import { describe, expect, it } from 'vitest'

import { createUploadCompletionDTO } from '@/modules/labos-files/upload-completion.dto'

describe('UploadThing completion DTO', () => {
	it('returns no server identity or tenant metadata to the browser', () => {
		const result = createUploadCompletionDTO()

		expect(result).toEqual({})
		expect(Object.isFrozen(result)).toBe(true)
		const serialized = JSON.stringify(result)
		expect(serialized).not.toContain('userId')
		expect(serialized).not.toContain('labId')
		expect(serialized).not.toContain('uploadedBy')
	})
})
