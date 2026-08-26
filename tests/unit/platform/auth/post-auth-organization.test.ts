import { describe, expect, it, vi } from 'vitest'

import {
	resolvePostAuthOrganization,
	type PostAuthOrganizationGateway,
} from '@/platform/auth/post-auth-organization'

function gateway(input: {
	activeOrganizationId?: string | null
	organizations?: readonly { id: string; name: string; slug: string }[]
} = {}) {
	return {
		getActiveOrganizationId: vi
			.fn()
			.mockResolvedValue(input.activeOrganizationId ?? null),
		listOrganizations: vi
			.fn()
			.mockResolvedValue(input.organizations ?? []),
		setActiveOrganization: vi.fn().mockResolvedValue(undefined),
	} satisfies PostAuthOrganizationGateway
}

describe('post-authentication Organization resolution', () => {
	it('keeps a valid active Organization without rewriting the session', async () => {
		const adapter = gateway({
			activeOrganizationId: 'organization-b',
			organizations: [
				{ id: 'organization-a', name: 'A', slug: 'a' },
				{ id: 'organization-b', name: 'B', slug: 'b' },
			],
		})

		await expect(resolvePostAuthOrganization(adapter)).resolves.toEqual({
			status: 'ready',
			organizationId: 'organization-b',
			restored: false,
		})
		expect(adapter.setActiveOrganization).not.toHaveBeenCalled()
	})

	it('restores the sole Organization on a fresh session', async () => {
		const adapter = gateway({
			organizations: [
				{ id: 'organization-a', name: 'Lab A', slug: 'lab-a' },
			],
		})

		await expect(resolvePostAuthOrganization(adapter)).resolves.toEqual({
			status: 'ready',
			organizationId: 'organization-a',
			restored: true,
		})
		expect(adapter.setActiveOrganization).toHaveBeenCalledWith(
			'organization-a',
		)
	})

	it('replaces a stale active ID when only one valid membership remains', async () => {
		const adapter = gateway({
			activeOrganizationId: 'revoked-organization',
			organizations: [
				{ id: 'organization-a', name: 'Lab A', slug: 'lab-a' },
			],
		})

		const result = await resolvePostAuthOrganization(adapter)
		expect(result).toMatchObject({
			status: 'ready',
			organizationId: 'organization-a',
			restored: true,
		})
	})

	it('sends an account with no memberships to onboarding', async () => {
		const adapter = gateway()
		await expect(resolvePostAuthOrganization(adapter)).resolves.toEqual({
			status: 'onboarding_required',
		})
		expect(adapter.setActiveOrganization).not.toHaveBeenCalled()
	})

	it('clears a revoked stale active Organization before onboarding', async () => {
		const adapter = gateway({
			activeOrganizationId: 'revoked-organization',
			organizations: [],
		})

		await expect(resolvePostAuthOrganization(adapter)).resolves.toEqual({
			status: 'onboarding_required',
		})
		expect(adapter.setActiveOrganization).toHaveBeenCalledWith(null)
	})

	it('requires explicit selection for multiple Organizations', async () => {
		const adapter = gateway({
			organizations: [
				{ id: 'organization-a', name: 'A', slug: 'a' },
				{ id: 'organization-b', name: 'B', slug: 'b' },
			],
		})

		const result = await resolvePostAuthOrganization(adapter)
		expect(result).toMatchObject({ status: 'selection_required' })
		expect(adapter.setActiveOrganization).not.toHaveBeenCalled()
		expect(Object.isFrozen(result)).toBe(true)
		if (result.status === 'selection_required') {
			expect(Object.isFrozen(result.organizations)).toBe(true)
		}
	})

	it('does not hide provider failures or continue with a guessed tenant', async () => {
		const adapter = gateway()
		adapter.listOrganizations.mockRejectedValue(new Error('provider failed'))

		await expect(resolvePostAuthOrganization(adapter)).rejects.toThrow(
			'provider failed',
		)
		expect(adapter.setActiveOrganization).not.toHaveBeenCalled()
	})
})
