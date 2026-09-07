import type { Prisma } from '@/generated/prisma/client'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
	createUploadGrantRegistry,
	createUploadGrantService,
	UPLOAD_GRANT_ERROR_CODES,
	type UploadGrantMonitor,
	type UploadGrantDomainMutation,
	type UploadGrantRepository,
} from '@/modules/labos-files/upload-grants'
import type { TenantContext } from '@/platform/organizations'

const fixedNow = new Date('2026-09-04T12:00:00.000Z')
const tenant: TenantContext = {
	userId: 'user-1',
	memberId: 'member-1',
	memberRole: 'manager',
	staffId: 'staff-1',
	organizationId: 'organization-1',
	labId: 'lab-1',
	lab: { id: 'lab-1', title: 'Lab', slug: 'lab' },
}

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

function createRepository(): UploadGrantRepository {
	return {
		create: vi.fn().mockResolvedValue({ id: 'grant_123' }),
		findDefinition: vi.fn().mockResolvedValue({
			boundaryId: createDefinition.boundaryId,
			purpose: createDefinition.purpose,
		}),
		complete: vi.fn().mockResolvedValue('completed'),
		expireDue: vi.fn().mockResolvedValue(2),
		consume: (async (
			_input: unknown,
			mutation: UploadGrantDomainMutation<unknown>,
		) => {
			return mutation({} as Prisma.TransactionClient, {
				providerFileKey: 'provider-key',
				providerFileUrl: 'https://ufs.sh/f/provider-key',
			})
		}) as UploadGrantRepository['consume'],
	}
}

function createFixture(repository = createRepository()) {
	const events: Parameters<UploadGrantMonitor['record']>[0][] = []
	const registry = createUploadGrantRegistry([
		createDefinition,
		updateDefinition,
	])
	const service = createUploadGrantService({
		registry,
		repository,
		monitor: { record: (event) => events.push(event) },
		now: () => fixedNow,
		nowMs: () => 10,
		generateCorrelationId: () => 'correlation-1',
	})
	return { events, repository, service }
}

describe('UploadGrantService', () => {
	beforeEach(() => vi.clearAllMocks())

	it('creates a short-lived grant from canonical context and a registered definition', async () => {
		const { events, repository, service } = createFixture()

		await expect(
			service.create({
				tenant,
				boundaryId: createDefinition.boundaryId,
				purpose: createDefinition.purpose,
				target: null,
			}),
		).resolves.toEqual({
			uploadGrantId: 'grant_123',
		})
		expect(repository.create).toHaveBeenCalledWith({
			organizationId: tenant.organizationId,
			labId: tenant.labId,
			memberId: tenant.memberId,
			boundaryId: createDefinition.boundaryId,
			purpose: createDefinition.purpose,
			target: null,
			correlationId: 'correlation-1',
			expiresAt: new Date('2026-09-04T12:05:00.000Z'),
		})
		expect(events.at(-1)).toMatchObject({
			phase: 'creation',
			outcome: 'completed',
			reason: 'UPLOAD_GRANT_CREATED',
		})
	})

	it('fails closed when canonical membership or Lab linkage is rejected', async () => {
		const repository = createRepository()
		vi.mocked(repository.create).mockResolvedValue(null)
		const { events, service } = createFixture(repository)

		await expect(
			service.create({
				tenant,
				boundaryId: createDefinition.boundaryId,
				purpose: createDefinition.purpose,
				target: null,
			}),
		).rejects.toMatchObject({
			code: UPLOAD_GRANT_ERROR_CODES.CANONICAL_CONTEXT_REJECTED,
		})
		expect(events.at(-1)).toMatchObject({
			outcome: 'failed',
			reason: UPLOAD_GRANT_ERROR_CODES.CANONICAL_CONTEXT_REJECTED,
		})
	})

	it('does not echo unknown definitions or invalid correlation labels into telemetry', async () => {
		const { events, service } = createFixture()

		await expect(
			service.create({
				tenant,
				boundaryId: 'attacker-controlled-boundary',
				purpose: 'patient@example.com',
				target: null,
				correlationId: 'invalid correlation with spaces',
			}),
		).rejects.toMatchObject({
			code: UPLOAD_GRANT_ERROR_CODES.DEFINITION_NOT_REGISTERED,
		})
		expect(events[0]).toMatchObject({
			boundaryId: 'FILE-UPLOAD-GRANT-UNKNOWN',
			purpose: 'upload-grant.create',
			correlationId: 'correlation-1',
		})
		expect(JSON.stringify(events[0])).not.toMatch(
			/attacker-controlled|patient@example|invalid correlation/,
		)
	})

	it('records a verified provider callback and accepts an exact callback retry', async () => {
		const repository = createRepository()
		vi.mocked(repository.complete)
			.mockResolvedValueOnce('completed')
			.mockResolvedValueOnce('already_completed')
		const { events, service } = createFixture(repository)
		const request = {
			metadata: {
				uploadGrantId: 'grant_123',
			},
			file: {
				key: 'provider-key',
				url: 'https://ufs.sh/f/provider-key',
			},
		}

		await expect(
			service.completeVerifiedProviderCallback(request),
		).resolves.toEqual({ uploadGrantId: 'grant_123' })
		await expect(
			service.completeVerifiedProviderCallback(request),
		).resolves.toEqual({ uploadGrantId: 'grant_123' })
		expect(events.map((event) => event.reason)).toEqual([
			'UPLOAD_GRANT_PROVIDER_COMPLETED',
			'UPLOAD_GRANT_PROVIDER_REPLAY_ACCEPTED',
		])
	})

	it('rejects malformed, expired, mismatched, and unregistered callbacks', async () => {
		const repository = createRepository()
		vi.mocked(repository.complete).mockResolvedValue('expired')
		const { service } = createFixture(repository)
		const base = {
			metadata: {
				uploadGrantId: 'grant_123',
			},
			file: { key: 'provider-key', url: 'https://ufs.sh/f/provider-key' },
		}

		await expect(
			service.completeVerifiedProviderCallback(base),
		).rejects.toMatchObject({ code: UPLOAD_GRANT_ERROR_CODES.EXPIRED })
		await expect(
			service.completeVerifiedProviderCallback({
				...base,
				file: { ...base.file, url: 'http://insecure.example/file' },
			}),
		).rejects.toMatchObject({
			code: UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED,
		})
		vi.mocked(repository.findDefinition).mockResolvedValue({
			boundaryId: 'N-FILE-UNKNOWN',
			purpose: createDefinition.purpose,
		})
		await expect(
			service.completeVerifiedProviderCallback(base),
		).rejects.toMatchObject({
			code: UPLOAD_GRANT_ERROR_CODES.DEFINITION_NOT_REGISTERED,
		})
	})

	it('expires pending and uploaded grants without disclosing affected identifiers', async () => {
		const { events, repository, service } = createFixture()

		await expect(service.expireDueGrants()).resolves.toEqual({ expiredCount: 2 })
		expect(repository.expireDue).toHaveBeenCalledWith(fixedNow)
		expect(events[0]).toEqual({
			event: 'labos.file_upload_grant',
			boundaryId: 'FILE-UPLOAD-GRANT-LIFECYCLE',
			purpose: 'upload-grant.expire',
			correlationId: 'correlation-1',
			phase: 'expiry',
			outcome: 'completed',
			reason: 'UPLOAD_GRANT_EXPIRY_SWEEP_COMPLETED',
			durationMs: 0,
		})
	})

	it('binds transactional consumption to actor, tenant, purpose, and target', async () => {
		const repository = createRepository()
		const consume = vi.spyOn(repository, 'consume')
		const mutation = vi.fn().mockResolvedValue({ categoryId: 'category-1' })
		const { service } = createFixture(repository)
		const target = { type: 'catalog.category', id: 'category-1' }

		await expect(
			service.consumeTransactionally(
				{
					tenant,
					uploadGrantId: 'grant_123',
					boundaryId: updateDefinition.boundaryId,
					purpose: updateDefinition.purpose,
					target,
				},
				mutation,
			),
		).resolves.toEqual({ categoryId: 'category-1' })
		expect(consume).toHaveBeenCalledWith(
			expect.objectContaining({
				organizationId: tenant.organizationId,
				labId: tenant.labId,
				memberId: tenant.memberId,
				boundaryId: updateDefinition.boundaryId,
				purpose: updateDefinition.purpose,
				target,
				uploadGrantId: 'grant_123',
			}),
			mutation,
		)
		expect(mutation).toHaveBeenCalledWith(
			expect.anything(),
			Object.freeze({
				providerFileKey: 'provider-key',
				providerFileUrl: 'https://ufs.sh/f/provider-key',
			}),
		)
	})

	it('isolates monitoring failures from valid grant operations', async () => {
		const repository = createRepository()
		const registry = createUploadGrantRegistry([createDefinition])
		const service = createUploadGrantService({
			registry,
			repository,
			monitor: { record: () => { throw new Error('axiom unavailable') } },
			now: () => fixedNow,
		})

		await expect(
			service.create({
				tenant,
				boundaryId: createDefinition.boundaryId,
				purpose: createDefinition.purpose,
				target: null,
			}),
		).resolves.toMatchObject({ uploadGrantId: 'grant_123' })
	})
})
