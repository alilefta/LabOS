import { describe, expect, it, vi } from 'vitest'

import {
	createN001TeamDirectoryLoader,
	N001_TEAM_DIRECTORY_LOADER_ERROR_CODES,
} from '@/modules/labos-membership'
import type { TenantContext } from '@/platform/organizations'

function tenant(overrides: Partial<TenantContext> = {}): TenantContext {
	return {
		userId: 'user-a',
		memberId: 'member-a',
		memberRole: 'owner',
		staffId: null,
		organizationId: 'organization-a',
		labId: 'lab-a',
		lab: { id: 'lab-a', title: 'Lab A', slug: 'lab-a' },
		...overrides,
	}
}

const emptyPage = Object.freeze({ items: Object.freeze([]), nextOffset: null })

function shadowResult(
	allowed: boolean,
	options: {
		source?: 'legacy' | 'v1'
		legacyAllowed?: boolean
		v1Status?: 'completed' | 'failed'
	} = {},
) {
	const source = options.source ?? 'legacy'
	const legacyAllowed = options.legacyAllowed ?? allowed
	const v1Status = options.v1Status ?? 'completed'
	return Object.freeze({
		boundaryId: 'N-001' as const,
		correlationId: 'correlation-n-001',
		comparison: legacyAllowed
			? allowed
				? ('MATCH_ALLOW' as const)
				: ('LEGACY_ALLOW_V1_DENY' as const)
			: allowed
				? ('LEGACY_DENY_V1_ALLOW' as const)
				: ('MATCH_DENY' as const),
		legacyDecision: Object.freeze({ allowed: legacyAllowed }),
		v1Decision: Object.freeze({
			status: v1Status,
			allowed,
			reason: v1Status === 'failed'
				? ('AUTHZ_SHADOW_V1_EVALUATION_FAILED' as const)
				: allowed
				? ('ROLE_PERMISSION' as const)
				: ('AUTHZ_PERMISSION_NOT_GRANTED' as const),
		}),
		enforcement: Object.freeze({ source, allowed }),
	})
}

describe('N-001 Team directory server-page loader', () => {
	it('resolves tenancy, authorizes, then performs the scoped read in order', async () => {
		const resolvedTenant = tenant()
		const resolveTenant = vi.fn().mockResolvedValue(resolvedTenant)
		const evaluateAuthorization = vi.fn().mockResolvedValue(shadowResult(true))
		const repository = { listPage: vi.fn().mockResolvedValue(emptyPage) }
		const load = createN001TeamDirectoryLoader({
			resolveTenant,
			evaluateAuthorization,
			repository,
		})

		await expect(load({ offset: 25, pageSize: 25 })).resolves.toBe(emptyPage)
		expect(evaluateAuthorization).toHaveBeenCalledWith({
			tenant: resolvedTenant,
		})
		expect(repository.listPage).toHaveBeenCalledWith({
			tenant: { organizationId: 'organization-a', labId: 'lab-a' },
			offset: 25,
			pageSize: 25,
		})
		expect(resolveTenant.mock.invocationCallOrder[0]).toBeLessThan(
			evaluateAuthorization.mock.invocationCallOrder[0],
		)
		expect(evaluateAuthorization.mock.invocationCallOrder[0]).toBeLessThan(
			repository.listPage.mock.invocationCallOrder[0],
		)
	})

	it('never calls the repository when the enforcing legacy decision denies', async () => {
		const repository = { listPage: vi.fn() }
		const load = createN001TeamDirectoryLoader({
			resolveTenant: vi.fn().mockResolvedValue(tenant()),
			evaluateAuthorization: vi.fn().mockResolvedValue(shadowResult(false)),
			repository,
		})

		await expect(load()).rejects.toMatchObject({
			name: 'N001TeamDirectoryLoaderError',
			code: N001_TEAM_DIRECTORY_LOADER_ERROR_CODES.ACCESS_DENIED,
			message: 'Team directory access denied',
		})
		expect(repository.listPage).not.toHaveBeenCalled()
	})

	it('never calls the repository when authoritative V1 denies a legacy-allowed read', async () => {
		const repository = { listPage: vi.fn() }
		const load = createN001TeamDirectoryLoader({
			resolveTenant: vi.fn().mockResolvedValue(tenant({ memberRole: 'manager' })),
			evaluateAuthorization: vi.fn().mockResolvedValue(
				shadowResult(false, { source: 'v1', legacyAllowed: true }),
			),
			repository,
		})

		await expect(load()).rejects.toMatchObject({
			name: 'N001TeamDirectoryLoaderError',
			code: N001_TEAM_DIRECTORY_LOADER_ERROR_CODES.ACCESS_DENIED,
		})
		expect(repository.listPage).not.toHaveBeenCalled()
	})

	it('never calls the repository when authoritative V1 evaluation fails', async () => {
		const repository = { listPage: vi.fn() }
		const load = createN001TeamDirectoryLoader({
			resolveTenant: vi.fn().mockResolvedValue(tenant()),
			evaluateAuthorization: vi.fn().mockResolvedValue(
				shadowResult(false, {
					source: 'v1',
					legacyAllowed: true,
					v1Status: 'failed',
				}),
			),
			repository,
		})

		await expect(load()).rejects.toMatchObject({
			name: 'N001TeamDirectoryLoaderError',
			code: N001_TEAM_DIRECTORY_LOADER_ERROR_CODES.ACCESS_DENIED,
		})
		expect(repository.listPage).not.toHaveBeenCalled()
	})

	it('uses the real shadow adapter and preserves legacy access for Manager', async () => {
		const repository = { listPage: vi.fn().mockResolvedValue(emptyPage) }
		const load = createN001TeamDirectoryLoader({
			resolveTenant: vi
				.fn()
				.mockResolvedValue(tenant({ memberRole: 'manager' })),
			repository,
		})

		await expect(load()).resolves.toBe(emptyPage)
		expect(repository.listPage).toHaveBeenCalledOnce()
	})

	it('continues the legacy-authorized read when V1 infrastructure failed', async () => {
		const repository = { listPage: vi.fn().mockResolvedValue(emptyPage) }
		const evaluateAuthorization = vi.fn().mockResolvedValue(
			Object.freeze({
				boundaryId: 'N-001' as const,
				correlationId: 'correlation-v1-failure',
				comparison: 'LEGACY_ALLOW_V1_DENY' as const,
				legacyDecision: Object.freeze({ allowed: true }),
				v1Decision: Object.freeze({
					status: 'failed' as const,
					allowed: false as const,
					reason: 'AUTHZ_SHADOW_V1_EVALUATION_FAILED' as const,
				}),
				enforcement: Object.freeze({
					source: 'legacy' as const,
					allowed: true,
				}),
			}),
		)
		const load = createN001TeamDirectoryLoader({
			resolveTenant: vi.fn().mockResolvedValue(tenant()),
			evaluateAuthorization,
			repository,
		})

		await expect(load()).resolves.toBe(emptyPage)
		expect(repository.listPage).toHaveBeenCalledOnce()
	})

	it('passes independent canonical predicates when the active Organization switches', async () => {
		const repositoryA = { listPage: vi.fn().mockResolvedValue(emptyPage) }
		const repositoryB = { listPage: vi.fn().mockResolvedValue(emptyPage) }
		const loadA = createN001TeamDirectoryLoader({
			resolveTenant: vi.fn().mockResolvedValue(tenant()),
			evaluateAuthorization: vi.fn().mockResolvedValue(shadowResult(true)),
			repository: repositoryA,
		})
		const loadB = createN001TeamDirectoryLoader({
			resolveTenant: vi.fn().mockResolvedValue(
				tenant({
					organizationId: 'organization-b',
					labId: 'lab-b',
					lab: { id: 'lab-b', title: 'Lab B', slug: 'lab-b' },
				}),
			),
			evaluateAuthorization: vi.fn().mockResolvedValue(shadowResult(true)),
			repository: repositoryB,
		})

		await loadA()
		await loadB()

		expect(repositoryA.listPage).toHaveBeenCalledWith(
			expect.objectContaining({
				tenant: { organizationId: 'organization-a', labId: 'lab-a' },
			}),
		)
		expect(repositoryB.listPage).toHaveBeenCalledWith(
			expect.objectContaining({
				tenant: { organizationId: 'organization-b', labId: 'lab-b' },
			}),
		)
	})

	it('does not attempt authorization or data loading when tenant resolution fails', async () => {
		const evaluateAuthorization = vi.fn()
		const repository = { listPage: vi.fn() }
		const load = createN001TeamDirectoryLoader({
			resolveTenant: vi.fn().mockRejectedValue(new Error('tenant unavailable')),
			evaluateAuthorization,
			repository,
		})

		await expect(load()).rejects.toThrow('tenant unavailable')
		expect(evaluateAuthorization).not.toHaveBeenCalled()
		expect(repository.listPage).not.toHaveBeenCalled()
	})
})
