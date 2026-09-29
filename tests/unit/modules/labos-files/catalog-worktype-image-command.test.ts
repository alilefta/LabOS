import { describe, expect, it, vi } from 'vitest'

import {
	executeCatalogWorkTypeCreate,
	executeCatalogWorkTypeUpdate,
	type CatalogWorkTypeCommandDependencies,
} from '@/modules/labos-files/catalog-worktype-image-command'
import type { TenantContext } from '@/platform/organizations'

const tenant: TenantContext = { userId: 'user-1', memberId: 'member-1', memberRole: 'manager', staffId: null, organizationId: 'organization-1', labId: 'lab-1', lab: { id: 'lab-1', title: 'Lab', slug: 'lab' } }
const workTypeId = 'b57bfc7a-ae61-4405-a329-b5a98608aa02'
const categoryId = 'c57bfc7a-ae61-4405-a329-b5a98608aa02'
const grantId = 'e3f1d028-6ea5-442f-b913-5e54a7df1361'
const workType = { id: workTypeId, name: 'Crowns', description: null, imageUrl: 'https://ufs.sh/f/verified-file', requireTeethSelection: true, caseCategoryId: categoryId, labId: tenant.labId, isArchived: false, createdAt: new Date(), updatedAt: new Date() }

function fixture() {
	const transaction = { caseCategory: { findFirst: vi.fn().mockResolvedValue({ id: categoryId }) }, workType: { create: vi.fn().mockResolvedValue(workType), updateMany: vi.fn().mockResolvedValue({ count: 1 }), findFirst: vi.fn().mockResolvedValue(workType) } }
	const authorizationService = { require: vi.fn().mockResolvedValue(undefined) }
	const grantConsumer = { consumeTransactionally: vi.fn(async (_request, mutation) => mutation(transaction, { providerFileKey: 'verified-file', providerFileUrl: 'https://ufs.sh/f/verified-file' })) }
	const dependencies: CatalogWorkTypeCommandDependencies = { authorizationService, grantConsumer: grantConsumer as CatalogWorkTypeCommandDependencies['grantConsumer'], prisma: transaction as unknown as CatalogWorkTypeCommandDependencies['prisma'], generateCorrelationId: () => 'correlation-1' }
	return { transaction, authorizationService, grantConsumer, dependencies }
}

describe('Catalog WorkType image command', () => {
	it('authorizes before parent lookup, grant, or WorkType work', async () => {
		const { transaction, authorizationService, grantConsumer, dependencies } = fixture()
		authorizationService.require.mockRejectedValueOnce(new Error('denied'))
		await expect(executeCatalogWorkTypeCreate(tenant, { name: 'Crowns', caseCategoryId: categoryId, imageUploadGrantId: grantId }, dependencies)).rejects.toThrow('denied')
		expect(transaction.caseCategory.findFirst).not.toHaveBeenCalled()
		expect(transaction.workType.create).not.toHaveBeenCalled()
		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
	})

	it('creates only after same-Lab parent validation and ignores raw URLs', async () => {
		const { transaction, grantConsumer, dependencies } = fixture()
		await executeCatalogWorkTypeCreate(tenant, { name: 'Crowns', caseCategoryId: categoryId, imageUrl: 'https://attacker.example/file' } as never, dependencies)
		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
		expect(transaction.caseCategory.findFirst).toHaveBeenCalledWith({ where: { id: categoryId, labId: tenant.labId }, select: { id: true } })
		expect(transaction.workType.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ imageUrl: null, labId: tenant.labId }) }))
	})

	it('binds create consumption to the registered targetless grant', async () => {
		const { transaction, grantConsumer, dependencies } = fixture()
		await executeCatalogWorkTypeCreate(tenant, { name: 'Crowns', caseCategoryId: categoryId, imageUploadGrantId: grantId }, dependencies)
		expect(grantConsumer.consumeTransactionally).toHaveBeenCalledWith(expect.objectContaining({ boundaryId: 'N-FILE-104', purpose: 'catalog.worktype.image.create.stage', target: null }), expect.any(Function))
		expect(transaction.workType.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ imageUrl: 'https://ufs.sh/f/verified-file' }) }))
	})

	it('preserves image with no grant and binds update to authoritative WorkType ID', async () => {
		const { transaction, authorizationService, grantConsumer, dependencies } = fixture()
		await executeCatalogWorkTypeUpdate(tenant, { workTypeId, name: 'Crowns revised', caseCategoryId: categoryId, imageUrl: 'https://attacker.example/file' } as never, dependencies)
		expect(grantConsumer.consumeTransactionally).not.toHaveBeenCalled()
		expect(authorizationService.require).toHaveBeenCalledWith(expect.objectContaining({ boundaryId: 'N-FILE-105', target: { type: 'catalog.worktype', id: workTypeId } }))
		expect(transaction.workType.updateMany).toHaveBeenCalledWith(expect.objectContaining({ where: { id: workTypeId, labId: tenant.labId }, data: expect.not.objectContaining({ imageUrl: expect.anything() }) }))
	})

	it.each(['expired', 'wrong tenant', 'wrong member', 'wrong boundary or purpose', 'replayed', 'concurrent-consumer loser'])('does no WorkType work when the grant is %s', async (reason) => {
		const { transaction, grantConsumer, dependencies } = fixture()
		grantConsumer.consumeTransactionally.mockRejectedValueOnce(new Error(reason))
		await expect(executeCatalogWorkTypeUpdate(tenant, { workTypeId, name: 'Crowns', caseCategoryId: categoryId, imageUploadGrantId: grantId }, dependencies)).rejects.toThrow(reason)
		expect(transaction.workType.updateMany).not.toHaveBeenCalled()
	})

	it('propagates parent and mutation failures through the transactional callback', async () => {
		const { transaction, dependencies } = fixture()
		transaction.workType.create.mockRejectedValueOnce(new Error('WorkType mutation failed'))
		await expect(executeCatalogWorkTypeCreate(tenant, { name: 'Crowns', caseCategoryId: categoryId, imageUploadGrantId: grantId }, dependencies)).rejects.toThrow('WorkType mutation failed')
	})
})
