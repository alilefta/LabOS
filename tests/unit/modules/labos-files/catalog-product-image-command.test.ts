import { describe, expect, it, vi } from 'vitest'

import {
	executeCatalogProductCreate,
	executeCatalogProductUpdate,
	type CatalogProductCommandDependencies,
} from '@/modules/labos-files/catalog-product-image-command'
import type { TenantContext } from '@/platform/organizations'

const tenant: TenantContext = { userId: 'user-1', memberId: 'member-1', memberRole: 'manager', staffId: null, organizationId: 'organization-1', labId: 'lab-1', lab: { id: 'lab-1', title: 'Lab', slug: 'lab' } }
const productId = 'b57bfc7a-ae61-4405-a329-b5a98608aa02'
const workTypeId = 'c57bfc7a-ae61-4405-a329-b5a98608aa02'
const grantId = 'e3f1d028-6ea5-442f-b913-5e54a7df1361'
const product = { id: productId, name: 'Crown', description: null, imageUrl: 'https://ufs.sh/f/verified-file', labId: tenant.labId, workTypeId, isArchived: false, createdAt: new Date(), updatedAt: new Date() }

function fixture() {
	const transaction = { workType: { findFirst: vi.fn().mockResolvedValue({ id: workTypeId }) }, product: { create: vi.fn().mockResolvedValue(product), updateMany: vi.fn().mockResolvedValue({ count: 1 }), findFirst: vi.fn().mockResolvedValue(product) } }
	const authorizationService = { require: vi.fn().mockResolvedValue(undefined) }
	const grantConsumer = { consumeTransactionally: vi.fn(async (_request, mutation) => mutation(transaction, { providerFileKey: 'verified-file', providerFileUrl: 'https://ufs.sh/f/verified-file' })) }
	const dependencies: CatalogProductCommandDependencies = { authorizationService, grantConsumer: grantConsumer as CatalogProductCommandDependencies['grantConsumer'], prisma: transaction as unknown as CatalogProductCommandDependencies['prisma'], generateCorrelationId: () => 'correlation-1' }
	return { transaction, authorizationService, grantConsumer, dependencies }
}

describe('Catalog Product image command', () => {
	it('authorizes before work-type lookup, grant, or Product work', async () => {
		const { transaction, authorizationService, grantConsumer, dependencies } = fixture()
		authorizationService.require.mockRejectedValueOnce(new Error('denied'))
		await expect(executeCatalogProductCreate(tenant, { name: 'Crown', workTypeId, imageUploadGrantId: grantId }, dependencies)).rejects.toThrow('denied')
		expect(transaction.workType.findFirst).not.toHaveBeenCalled()
		expect(transaction.product.create).not.toHaveBeenCalled()
		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
	})

	it('creates only after same-Lab WorkType validation and ignores raw URLs', async () => {
		const { transaction, grantConsumer, dependencies } = fixture()
		await executeCatalogProductCreate(tenant, { name: 'Crown', workTypeId, imageUrl: 'https://attacker.example/file' } as never, dependencies)
		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
		expect(transaction.workType.findFirst).toHaveBeenCalledWith({ where: { id: workTypeId, labId: tenant.labId }, select: { id: true } })
		expect(transaction.product.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ imageUrl: null, labId: tenant.labId }) }))
	})

	it('consumes a create grant in the transaction that validates its WorkType and creates the Product', async () => {
		const { transaction, grantConsumer, dependencies } = fixture()
		await executeCatalogProductCreate(tenant, { name: 'Crown', workTypeId, imageUploadGrantId: grantId }, dependencies)
		expect(grantConsumer.consumeTransactionally).toHaveBeenCalledWith(expect.objectContaining({ boundaryId: 'N-FILE-106', purpose: 'catalog.product.image.create.stage', target: null }), expect.any(Function))
		expect(transaction.workType.findFirst).toHaveBeenCalledWith({ where: { id: workTypeId, labId: tenant.labId }, select: { id: true } })
		expect(transaction.product.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ imageUrl: 'https://ufs.sh/f/verified-file' }) }))
	})

	it('preserves the image with no grant and binds update to authoritative Product ID', async () => {
		const { transaction, authorizationService, grantConsumer, dependencies } = fixture()
		await executeCatalogProductUpdate(tenant, { productId, name: 'Crown revised', workTypeId, imageUrl: 'https://attacker.example/file' } as never, dependencies)
		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
		expect(authorizationService.require).toHaveBeenCalledWith(expect.objectContaining({ boundaryId: 'N-FILE-107', target: { type: 'catalog.product', id: productId } }))
		expect(transaction.product.updateMany).toHaveBeenCalledWith(expect.objectContaining({ where: { id: productId, labId: tenant.labId }, data: expect.not.objectContaining({ imageUrl: expect.anything() }) }))
	})

	it.each(['expired', 'wrong tenant', 'wrong member', 'wrong boundary or purpose', 'replayed', 'concurrent-consumer loser'])('does no Product work when the grant is %s', async (reason) => {
		const { transaction, grantConsumer, dependencies } = fixture()
		grantConsumer.consumeTransactionally.mockRejectedValueOnce(new Error(reason))
		await expect(executeCatalogProductUpdate(tenant, { productId, name: 'Crown', workTypeId, imageUploadGrantId: grantId }, dependencies)).rejects.toThrow(reason)
		expect(transaction.product.updateMany).not.toHaveBeenCalled()
	})

	it('propagates WorkType and Product mutation failure from the transaction', async () => {
		const { transaction, dependencies } = fixture()
		transaction.workType.findFirst.mockResolvedValueOnce(null)
		await expect(executeCatalogProductCreate(tenant, { name: 'Crown', workTypeId, imageUploadGrantId: grantId }, dependencies)).rejects.toThrow('Catalog product work type was not found')
	})
})
