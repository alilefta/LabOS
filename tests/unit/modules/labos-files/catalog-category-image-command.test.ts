import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it, vi } from 'vitest'

import {
	executeCatalogCategoryCreate,
	executeCatalogCategoryUpdate,
	type CatalogCategoryCommandDependencies,
} from '@/modules/labos-files/catalog-category-image-command'
import type { TenantContext } from '@/platform/organizations'

const tenant: TenantContext = {
	userId: 'user-1',
	memberId: 'member-1',
	memberRole: 'manager',
	staffId: null,
	organizationId: 'organization-1',
	labId: 'lab-1',
	lab: { id: 'lab-1', title: 'Lab', slug: 'lab' },
}

const categoryId = 'b57bfc7a-ae61-4405-a329-b5a98608aa02'
const grantId = 'e3f1d028-6ea5-442f-b913-5e54a7df1361'
const category = {
	id: categoryId,
	name: 'Implants',
	description: null,
	imageUrl: 'https://ufs.sh/f/verified-file',
	isArchived: false,
	labId: tenant.labId,
	createdAt: new Date('2026-09-07T00:00:00.000Z'),
	updatedAt: new Date('2026-09-07T00:00:00.000Z'),
}

function fixture() {
	const transaction = {
		caseCategory: {
			create: vi.fn().mockResolvedValue(category),
			updateMany: vi.fn().mockResolvedValue({ count: 1 }),
			findFirst: vi.fn().mockResolvedValue(category),
		},
	}
	const authorizationService = { require: vi.fn().mockResolvedValue(undefined) }
	const grantConsumer = {
		consumeTransactionally: vi.fn(async (_request, mutation) =>
			mutation(transaction, {
				providerFileKey: 'verified-file',
				providerFileUrl: 'https://ufs.sh/f/verified-file',
			}),
		),
	}
	const dependencies: CatalogCategoryCommandDependencies = {
		authorizationService,
		grantConsumer: grantConsumer as CatalogCategoryCommandDependencies['grantConsumer'],
		prisma: transaction as unknown as CatalogCategoryCommandDependencies['prisma'],
		generateCorrelationId: () => 'correlation-1',
	}
	return { transaction, authorizationService, grantConsumer, dependencies }
}

describe('Catalog Category image command', () => {
	it('creates without a grant and never trusts a caller image URL', async () => {
		const { transaction, grantConsumer, dependencies } = fixture()

		await expect(
			executeCatalogCategoryCreate(
				tenant,
				{
					name: 'Implants',
					// Stale/direct callers cannot make this raw URL authoritative.
					imageUrl: 'https://attacker.example/image',
				} as never,
				dependencies,
			),
		).resolves.toEqual(category)

		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
		expect(transaction.caseCategory.create).toHaveBeenCalledWith(
			expect.objectContaining({
				data: expect.objectContaining({ imageUrl: null, labId: tenant.labId }),
			}),
		)
	})

	it('authorizes create before either grant or Category work', async () => {
		const { transaction, authorizationService, grantConsumer, dependencies } =
			fixture()
		authorizationService.require.mockRejectedValueOnce(new Error('denied'))

		await expect(
			executeCatalogCategoryCreate(
				tenant,
				{ name: 'Implants', imageUploadGrantId: grantId },
				dependencies,
			),
		).rejects.toThrow('denied')

		expect(transaction.caseCategory.create).not.toHaveBeenCalled()
		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
	})

	it('consumes the exact create grant and persists only its verified file URL', async () => {
		const { transaction, authorizationService, grantConsumer, dependencies } =
			fixture()

		await executeCatalogCategoryCreate(
			tenant,
			{ name: 'Implants', imageUploadGrantId: grantId },
			dependencies,
		)

		expect(authorizationService.require).toHaveBeenCalledWith(
			expect.objectContaining({
				boundaryId: 'N-FILE-102',
				permission: 'catalog.create',
				operation: { kind: 'catalog.category.image.create.commit' },
			}),
		)
		expect(grantConsumer.consumeTransactionally).toHaveBeenCalledWith(
			expect.objectContaining({
				tenant,
				uploadGrantId: grantId,
				boundaryId: 'N-FILE-102',
				purpose: 'catalog.category.image.create.stage',
				target: null,
			}),
			expect.any(Function),
		)
		expect(transaction.caseCategory.create).toHaveBeenCalledWith(
			expect.objectContaining({
				data: expect.objectContaining({
					imageUrl: 'https://ufs.sh/f/verified-file',
					labId: tenant.labId,
				}),
			}),
		)
	})

	it('preserves the existing image for a no-grant update', async () => {
		const { transaction, grantConsumer, dependencies } = fixture()

		await executeCatalogCategoryUpdate(
			tenant,
			{
				categoryId,
				name: 'Implants revised',
				// A raw provider URL from an edit form is preview-only and must
				// never become authoritative command input without a grant.
				imageUrl: 'https://attacker.example/replacement' as never,
			} as never,
			dependencies,
		)

		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
		expect(transaction.caseCategory.updateMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { id: categoryId, labId: tenant.labId },
				data: expect.not.objectContaining({ imageUrl: expect.anything() }),
			}),
		)
	})

	it('binds replacement to the authoritative Category target and verified file', async () => {
		const { transaction, authorizationService, grantConsumer, dependencies } =
			fixture()

		await executeCatalogCategoryUpdate(
			tenant,
			{ categoryId, name: 'Implants revised', imageUploadGrantId: grantId },
			dependencies,
		)

		expect(authorizationService.require).toHaveBeenCalledWith(
			expect.objectContaining({
				boundaryId: 'N-FILE-103',
				permission: 'catalog.update',
				target: { type: 'catalog.category', id: categoryId },
				operation: { kind: 'catalog.category.image.update.commit' },
			}),
		)
		expect(grantConsumer.consumeTransactionally).toHaveBeenCalledWith(
			expect.objectContaining({
				tenant,
				uploadGrantId: grantId,
				boundaryId: 'N-FILE-103',
				purpose: 'catalog.category.image.update.stage',
				target: { type: 'catalog.category', id: categoryId },
			}),
			expect.any(Function),
		)
		expect(transaction.caseCategory.updateMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { id: categoryId, labId: tenant.labId },
				data: expect.objectContaining({
					imageUrl: 'https://ufs.sh/f/verified-file',
				}),
			}),
		)
	})

	it('does not execute Category mutation when grant revalidation rejects', async () => {
		const { transaction, grantConsumer, dependencies } = fixture()
		grantConsumer.consumeTransactionally.mockRejectedValueOnce(
			new Error('grant rejected'),
		)

		await expect(
			executeCatalogCategoryUpdate(
				tenant,
				{ categoryId, name: 'Implants', imageUploadGrantId: grantId },
				dependencies,
			),
		).rejects.toThrow('grant rejected')

		expect(transaction.caseCategory.updateMany).not.toHaveBeenCalled()
	})

	it.each([
		['expired'],
		['wrong tenant'],
		['wrong member'],
		['wrong boundary or purpose'],
		['replayed'],
		['concurrent-consumer loser'],
	])('does no Category work when the grant is %s', async (reason) => {
		const { transaction, grantConsumer, dependencies } = fixture()
		grantConsumer.consumeTransactionally.mockRejectedValueOnce(
			new Error(reason),
		)

		await expect(
			executeCatalogCategoryCreate(
				tenant,
				{ name: 'Implants', imageUploadGrantId: grantId },
				dependencies,
			),
		).rejects.toThrow(reason)

		expect(transaction.caseCategory.create).not.toHaveBeenCalled()
	})

	it.each(['create', 'update'] as const)(
	'propagates a %s mutation failure through the transaction callback',
	async (command) => {
		const { transaction, dependencies } = fixture()
		if (command === 'create') {
			transaction.caseCategory.create.mockRejectedValueOnce(
				new Error('Category mutation failed'),
			)
			await expect(
				executeCatalogCategoryCreate(
					tenant,
					{ name: 'Implants', imageUploadGrantId: grantId },
					dependencies,
				),
			).rejects.toThrow('Category mutation failed')
			return
		}

		transaction.caseCategory.updateMany.mockRejectedValueOnce(
			new Error('Category mutation failed'),
		)
		await expect(
			executeCatalogCategoryUpdate(
				tenant,
				{ categoryId, name: 'Implants', imageUploadGrantId: grantId },
				dependencies,
			),
		).rejects.toThrow('Category mutation failed')
	},
	)

	it('uses only the active create and update actions; the legacy create action remains unmodified', () => {
		const source = (...segments: string[]) =>
			readFileSync(join(process.cwd(), ...segments), 'utf8')
		expect(source('actions', 'case-category.ts')).toContain(
			'executeCatalogCategoryCreate',
		)
		expect(source('actions', 'catalog', 'categories', 'update-category.ts')).toContain(
			'executeCatalogCategoryUpdate',
		)
		expect(source('actions', 'catalog', 'categories', 'create-category.ts')).not.toContain(
			'executeCatalogCategoryCreate',
		)
	})
})
