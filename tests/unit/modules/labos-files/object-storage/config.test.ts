import { describe, expect, it, vi } from 'vitest'

const seams = vi.hoisted(() => ({ mode: 'DISABLED', local: vi.fn(), r2: vi.fn() }))
vi.mock('@/modules/labos-files/case-object-storage-activation', () => ({
	get CASE_OBJECT_STORAGE_MODE() { return seams.mode },
}))
vi.mock('@/modules/labos-files/object-storage/local-case', () => ({
	createLocalCaseObjectStorage: seams.local,
}))
vi.mock('@/modules/labos-files/object-storage/r2', () => ({ createR2ObjectStorage: seams.r2 }))

import { createConfiguredObjectStorage } from '@/modules/labos-files/object-storage/config'

describe('Case object storage provider binding', () => {
	it('never constructs a provider when the gate is disabled', () => {
		seams.mode = 'DISABLED'
		expect(() => createConfiguredObjectStorage()).toThrow('Case object storage unavailable')
		expect(seams.local).not.toHaveBeenCalled()
		expect(seams.r2).not.toHaveBeenCalled()
	})
	it('binds only the local adapter in local development mode', () => {
		seams.mode = 'LOCAL'
		const local = { adapter: 'local' }
		seams.local.mockReturnValueOnce(local)
		expect(createConfiguredObjectStorage()).toBe(local)
		expect(seams.r2).not.toHaveBeenCalled()
	})
	it('binds only R2 in hosted verification mode', () => {
		seams.mode = 'HOSTED_VERIFICATION'
		const r2 = { adapter: 'r2' }
		seams.r2.mockReturnValueOnce(r2)
		expect(createConfiguredObjectStorage()).toBe(r2)
		expect(seams.r2).toHaveBeenCalledOnce()
		expect(seams.local).toHaveBeenCalledOnce()
	})
})
