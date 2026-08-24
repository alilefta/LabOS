import { describe, expect, it, vi } from 'vitest'

import { createAuthorizationFactCache } from '@/platform/authorization'

describe('authorization fact cache', () => {
	it('reuses a fact only within the same namespace and request cache', async () => {
		const cache = createAuthorizationFactCache()
		const namespace = Symbol('policy-facts')
		const loader = vi.fn().mockResolvedValue({ active: true })

		const first = cache.getOrLoad(namespace, 'target-1', loader)
		const second = cache.getOrLoad(namespace, 'target-1', loader)

		await expect(first).resolves.toEqual({ active: true })
		await expect(second).resolves.toEqual({ active: true })
		expect(loader).toHaveBeenCalledOnce()

		await cache.getOrLoad(Symbol('policy-facts'), 'target-1', loader)
		expect(loader).toHaveBeenCalledTimes(2)
	})

	it('retains a rejected load for a consistent fail-closed evaluation', async () => {
		const cache = createAuthorizationFactCache()
		const namespace = Symbol('failing-policy-facts')
		const loader = vi.fn().mockRejectedValue(new Error('database unavailable'))

		await expect(
			cache.getOrLoad(namespace, 'target-1', loader),
		).rejects.toThrow('database unavailable')
		await expect(
			cache.getOrLoad(namespace, 'target-1', loader),
		).rejects.toThrow('database unavailable')
		expect(loader).toHaveBeenCalledOnce()
	})
})
