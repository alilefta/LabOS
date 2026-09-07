import { describe, expect, it, vi } from 'vitest'

import {
	createPrismaUploadGrantRepository,
	UPLOAD_GRANT_ERROR_CODES,
} from '@/modules/labos-files/upload-grants'

const now = new Date('2026-09-04T12:00:00.000Z')
const scope = {
	organizationId: 'organization-1',
	labId: 'lab-1',
	memberId: 'member-1',
	boundaryId: 'N-FILE-TEST',
	purpose: 'catalog.image.update.stage',
	target: { type: 'category', id: 'category-1' },
} as const

type TransactionCallback = (transaction: ReturnType<typeof createTransaction>) =>
	Promise<unknown>

function createTransaction() {
	return {
		member: { findFirst: vi.fn().mockResolvedValue({ id: 'member-1' }) },
		lab: { findFirst: vi.fn().mockResolvedValue({ id: 'lab-1' }) },
		fileUploadGrant: {
			create: vi.fn().mockResolvedValue({ id: 'grant_123' }),
			findFirst: vi.fn().mockResolvedValue({
				status: 'UPLOADED',
				expiresAt: new Date('2026-09-04T12:05:00.000Z'),
				providerFileKey: 'provider-key',
				providerFileUrl: 'https://ufs.sh/f/provider-key',
			}),
			updateMany: vi.fn().mockResolvedValue({ count: 1 }),
		},
	}
}

function createFixture() {
	const transaction = createTransaction()
	const prisma = {
		fileUploadGrant: {
			...transaction.fileUploadGrant,
			findUnique: vi.fn().mockResolvedValue({
				boundaryId: scope.boundaryId,
				purpose: scope.purpose,
			}),
		},
		$transaction: vi.fn(async (callback: TransactionCallback) =>
			callback(transaction),
		),
	}
	const repository = createPrismaUploadGrantRepository(
		prisma as unknown as Parameters<typeof createPrismaUploadGrantRepository>[0],
	)
	return { prisma, repository, transaction }
}

describe('PrismaUploadGrantRepository', () => {
	it('loads trusted boundary and purpose labels by opaque grant ID', async () => {
		const { prisma, repository } = createFixture()

		await expect(repository.findDefinition('grant_123')).resolves.toEqual({
			boundaryId: scope.boundaryId,
			purpose: scope.purpose,
		})
		expect(prisma.fileUploadGrant.findUnique).toHaveBeenCalledWith({
			where: { id: 'grant_123' },
			select: { boundaryId: true, purpose: true },
		})
	})

	it('verifies canonical Member and Lab relationships before creation', async () => {
		const { repository, transaction } = createFixture()

		await expect(
			repository.create({
				...scope,
				correlationId: 'correlation-1',
				expiresAt: new Date('2026-09-04T12:05:00.000Z'),
			}),
		).resolves.toEqual({ id: 'grant_123' })
		expect(transaction.member.findFirst).toHaveBeenCalledWith({
			where: { id: 'member-1', organizationId: 'organization-1' },
			select: { id: true },
		})
		expect(transaction.lab.findFirst).toHaveBeenCalledWith({
			where: { id: 'lab-1', organizationId: 'organization-1' },
			select: { id: true },
		})
		expect(transaction.fileUploadGrant.create).toHaveBeenCalledOnce()
	})

	it('does not create a grant when either canonical relationship is missing', async () => {
		const { repository, transaction } = createFixture()
		transaction.member.findFirst.mockResolvedValue(null)

		await expect(
			repository.create({
				...scope,
				correlationId: 'correlation-1',
				expiresAt: new Date('2026-09-04T12:05:00.000Z'),
			}),
		).resolves.toBeNull()
		expect(transaction.fileUploadGrant.create).not.toHaveBeenCalled()
	})

	it('conditionally completes a pending, unexpired grant', async () => {
		const { repository, transaction } = createFixture()

		await expect(
			repository.complete({
				uploadGrantId: 'grant_123',
				boundaryId: scope.boundaryId,
				purpose: scope.purpose,
				providerFileKey: 'provider-key',
				providerFileUrl: 'https://ufs.sh/f/provider-key',
				now,
			}),
		).resolves.toBe('completed')
		expect(transaction.fileUploadGrant.updateMany).toHaveBeenCalledWith({
			where: {
				id: 'grant_123',
				boundaryId: scope.boundaryId,
				purpose: scope.purpose,
				status: 'PENDING',
				expiresAt: { gt: now },
			},
			data: {
				status: 'UPLOADED',
				providerFileKey: 'provider-key',
				providerFileUrl: 'https://ufs.sh/f/provider-key',
				uploadedAt: now,
			},
		})
	})

	it('accepts only an exact idempotent provider retry', async () => {
		const { repository, transaction } = createFixture()
		transaction.fileUploadGrant.updateMany.mockResolvedValue({ count: 0 })

		await expect(
			repository.complete({
				uploadGrantId: 'grant_123',
				boundaryId: scope.boundaryId,
				purpose: scope.purpose,
				providerFileKey: 'provider-key',
				providerFileUrl: 'https://ufs.sh/f/provider-key',
				now,
			}),
		).resolves.toBe('already_completed')

		transaction.fileUploadGrant.findFirst.mockResolvedValue({
			status: 'UPLOADED',
			expiresAt: new Date('2026-09-04T12:05:00.000Z'),
			providerFileKey: 'different-key',
			providerFileUrl: 'https://ufs.sh/f/different-key',
		})
		await expect(
			repository.complete({
				uploadGrantId: 'grant_123',
				boundaryId: scope.boundaryId,
				purpose: scope.purpose,
				providerFileKey: 'provider-key',
				providerFileUrl: 'https://ufs.sh/f/provider-key',
				now,
			}),
		).resolves.toBe('rejected')
	})

	it('expires due pending and uploaded grants', async () => {
		const { repository, prisma } = createFixture()
		prisma.fileUploadGrant.updateMany.mockResolvedValue({ count: 3 })

		await expect(repository.expireDue(now)).resolves.toBe(3)
		expect(prisma.fileUploadGrant.updateMany).toHaveBeenCalledWith({
			where: {
				status: { in: ['PENDING', 'UPLOADED'] },
				expiresAt: { lte: now },
			},
			data: { status: 'EXPIRED', expiredAt: now },
		})
	})

	it('consumes exactly once with all actor, tenant, purpose, and target constraints', async () => {
		const { prisma, repository, transaction } = createFixture()
		const mutation = vi.fn().mockResolvedValue({ id: 'category-1' })

		await expect(
			repository.consume(
				{ ...scope, uploadGrantId: 'grant_123', now },
				mutation,
			),
		).resolves.toEqual({ id: 'category-1' })
		expect(transaction.fileUploadGrant.findFirst).toHaveBeenCalledWith(
			expect.objectContaining({
				where: expect.objectContaining({
					id: 'grant_123',
					organizationId: 'organization-1',
					labId: 'lab-1',
					createdByMemberId: 'member-1',
					boundaryId: scope.boundaryId,
					purpose: scope.purpose,
					targetType: 'category',
					targetId: 'category-1',
					status: 'UPLOADED',
					expiresAt: { gt: now },
				}),
			}),
		)
		expect(transaction.fileUploadGrant.updateMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: expect.objectContaining({
					providerFileKey: 'provider-key',
					providerFileUrl: 'https://ufs.sh/f/provider-key',
					status: 'UPLOADED',
				}),
				data: { status: 'CONSUMED', consumedAt: now },
			}),
		)
		expect(mutation).toHaveBeenCalledWith(transaction, {
			providerFileKey: 'provider-key',
			providerFileUrl: 'https://ufs.sh/f/provider-key',
		})
		expect(prisma.$transaction).toHaveBeenCalledWith(
			expect.any(Function),
			expect.objectContaining({ isolationLevel: 'Serializable' }),
		)
	})

	it('short-circuits cross-tenant or replayed consumption before domain work', async () => {
		const { repository, transaction } = createFixture()
		const mutation = vi.fn()
		transaction.fileUploadGrant.findFirst.mockResolvedValueOnce(null)

		await expect(
			repository.consume(
				{
					...scope,
					organizationId: 'foreign-organization',
					uploadGrantId: 'grant_123',
					now,
				},
				mutation,
			),
		).rejects.toMatchObject({
			code: UPLOAD_GRANT_ERROR_CODES.CONSUMPTION_REJECTED,
		})
		expect(transaction.fileUploadGrant.updateMany).not.toHaveBeenCalled()
		expect(mutation).not.toHaveBeenCalled()
	})

	it('does not execute the mutation when a concurrent consumer wins', async () => {
		const { repository, transaction } = createFixture()
		const mutation = vi.fn()
		transaction.fileUploadGrant.updateMany.mockResolvedValue({ count: 0 })

		await expect(
			repository.consume(
				{ ...scope, uploadGrantId: 'grant_123', now },
				mutation,
			),
		).rejects.toMatchObject({
			code: UPLOAD_GRANT_ERROR_CODES.CONSUMPTION_REJECTED,
		})
		expect(mutation).not.toHaveBeenCalled()
	})

	it('propagates a domain failure so the enclosing transaction rolls back consumption', async () => {
		const { repository } = createFixture()
		const domainFailure = new Error('domain invariant failed')

		await expect(
			repository.consume(
				{ ...scope, uploadGrantId: 'grant_123', now },
				async () => {
					throw domainFailure
				},
			),
		).rejects.toBe(domainFailure)
	})
})
