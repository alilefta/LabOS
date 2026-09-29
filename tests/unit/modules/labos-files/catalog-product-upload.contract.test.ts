import { describe, expect, it, vi } from 'vitest'

import {
	CATALOG_PRODUCT_IMAGE_MUTATION_RULES,
	authorizeCatalogProductImageStage,
	projectCatalogProductImageStage,
} from '@/modules/labos-files/catalog-product-upload.contract'
import type { TenantContext } from '@/platform/organizations'
import { labOSUploadGrantRegistry } from '@/modules/labos-files/upload-grants'

const tenant: TenantContext = { userId: 'user-1', memberId: 'member-1', memberRole: 'admin', staffId: null, organizationId: 'organization-1', labId: 'lab-1', lab: { id: 'lab-1', title: 'Lab', slug: 'lab' } }
const productId = 'b57bfc7a-ae61-4405-a329-b5a98608aa02'

describe('Catalog Product image-stage contract', () => {
	it('projects closed create and authoritative update grants', () => {
		expect(projectCatalogProductImageStage({ mode: 'create' })).toEqual({ boundaryId: 'N-FILE-106', permission: 'catalog.create', purpose: 'catalog.product.image.create.stage', target: null, operation: { kind: 'catalog.product.image.create.stage' } })
		expect(projectCatalogProductImageStage({ mode: 'update', productId })).toEqual({ boundaryId: 'N-FILE-107', permission: 'catalog.update', purpose: 'catalog.product.image.update.stage', target: { type: 'catalog.product', id: productId }, operation: { kind: 'catalog.product.image.update.stage' } })
		expect(() => projectCatalogProductImageStage({ mode: 'update', productId, purpose: 'catalog.worktype.image.update.stage' })).toThrow()
	})

	it('keeps replacement grant-backed and removal unavailable', () => {
		expect(CATALOG_PRODUCT_IMAGE_MUTATION_RULES).toEqual({ unchanged: 'preserve-existing-image', replace: 'consume-N-FILE-107-grant', remove: 'unavailable-pending-file-delete-policy' })
	})

	it('uses the registered 15-minute Product definitions', () => {
		expect(labOSUploadGrantRegistry.resolve('N-FILE-106', 'catalog.product.image.create.stage', null)).toMatchObject({ ttlMs: 15 * 60_000, targetType: null })
		expect(labOSUploadGrantRegistry.resolve('N-FILE-107', 'catalog.product.image.update.stage', { type: 'catalog.product', id: productId })).toMatchObject({ ttlMs: 15 * 60_000, targetType: 'catalog.product' })
	})

	it('authorizes before issuing an opaque target-bound grant', async () => {
		const authorizationService = { require: vi.fn().mockResolvedValue(undefined) }
		const grantIssuer = { create: vi.fn().mockResolvedValue({ uploadGrantId: 'grant_123' }) }
		await expect(authorizeCatalogProductImageStage({ tenant, stage: { mode: 'update', productId } }, { authorizationService, grantIssuer, generateCorrelationId: () => 'correlation-1' })).resolves.toEqual({ uploadGrantId: 'grant_123' })
		expect(authorizationService.require).toHaveBeenCalledWith(expect.objectContaining({ boundaryId: 'N-FILE-107', target: { type: 'catalog.product', id: productId } }))
		expect(grantIssuer.create).toHaveBeenCalledWith({ tenant, boundaryId: 'N-FILE-107', purpose: 'catalog.product.image.update.stage', target: { type: 'catalog.product', id: productId }, correlationId: 'correlation-1' })
	})

	it('does not issue a grant when authorization denies', async () => {
		const authorizationService = { require: vi.fn().mockRejectedValue(new Error('denied')) }
		const grantIssuer = { create: vi.fn() }
		await expect(authorizeCatalogProductImageStage({ tenant, stage: { mode: 'create' } }, { authorizationService, grantIssuer })).rejects.toThrow('denied')
		expect(grantIssuer.create).not.toHaveBeenCalled()
	})
})
