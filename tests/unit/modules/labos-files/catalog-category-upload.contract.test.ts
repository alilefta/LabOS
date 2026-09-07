import { describe, expect, it, vi } from 'vitest'

import {
	CATALOG_CATEGORY_IMAGE_MUTATION_RULES,
	authorizeCatalogCategoryImageStage,
	projectCatalogCategoryImageStage,
} from '@/modules/labos-files/catalog-category-upload.contract'
import type { TenantContext } from '@/platform/organizations'

const tenant: TenantContext = {
	userId: 'user-1',
	memberId: 'member-1',
	memberRole: 'admin',
	staffId: null,
	organizationId: 'organization-1',
	labId: 'lab-1',
	lab: { id: 'lab-1', title: 'Lab', slug: 'lab' },
}

function createDependencies() {
	return {
		authorizationService: { require: vi.fn().mockResolvedValue(undefined) },
		grantIssuer: {
			create: vi.fn().mockResolvedValue({ uploadGrantId: 'grant_123' }),
		},
		generateCorrelationId: () => 'correlation-1',
	}
}

describe('Catalog Category image-stage contract', () => {
	it('keeps removal unavailable while allowing only grant-backed replacement', () => {
		expect(CATALOG_CATEGORY_IMAGE_MUTATION_RULES).toEqual({
			unchanged: 'preserve-existing-image',
			replace: 'consume-N-FILE-103-grant',
			remove: 'unavailable-pending-file-delete-policy',
		})
	})

	it('projects fixed create authority without a resource target', () => {
		expect(projectCatalogCategoryImageStage({ mode: 'create' })).toEqual({
			boundaryId: 'N-FILE-102',
			permission: 'catalog.create',
			purpose: 'catalog.category.image.create.stage',
			target: null,
			operation: { kind: 'catalog.category.image.create.stage' },
		})
	})

	it('projects fixed update authority with only a Category target', () => {
		expect(
			projectCatalogCategoryImageStage({
				mode: 'update',
				categoryId: 'b57bfc7a-ae61-4405-a329-b5a98608aa02',
			}),
		).toEqual({
			boundaryId: 'N-FILE-103',
			permission: 'catalog.update',
			purpose: 'catalog.category.image.update.stage',
			target: {
				type: 'catalog.category',
				id: 'b57bfc7a-ae61-4405-a329-b5a98608aa02',
			},
			operation: { kind: 'catalog.category.image.update.stage' },
		})
	})

	it('rejects caller-selected authority before authorization or grant creation', async () => {
		const dependencies = createDependencies()

		await expect(
			authorizeCatalogCategoryImageStage(
				{
					tenant,
					stage: {
						mode: 'create',
						boundaryId: 'N-FILE-109',
						permission: 'dentist.create',
					},
				},
				dependencies,
			),
		).rejects.toThrow()
		expect(dependencies.authorizationService.require).not.toHaveBeenCalled()
		expect(dependencies.grantIssuer.create).not.toHaveBeenCalled()
	})

	it('authorizes before issuing an opaque update grant', async () => {
		const dependencies = createDependencies()
		const stage = {
			mode: 'update' as const,
			categoryId: 'b57bfc7a-ae61-4405-a329-b5a98608aa02',
		}

		await expect(
			authorizeCatalogCategoryImageStage({ tenant, stage }, dependencies),
		).resolves.toEqual({ uploadGrantId: 'grant_123' })
		expect(dependencies.authorizationService.require).toHaveBeenCalledWith(
			expect.objectContaining({
				boundaryId: 'N-FILE-103',
				permission: 'catalog.update',
				target: { type: 'catalog.category', id: stage.categoryId },
				operation: { kind: 'catalog.category.image.update.stage' },
			}),
		)
		expect(dependencies.grantIssuer.create).toHaveBeenCalledWith({
			tenant,
			boundaryId: 'N-FILE-103',
			purpose: 'catalog.category.image.update.stage',
			target: { type: 'catalog.category', id: stage.categoryId },
			correlationId: 'correlation-1',
		})
	})

	it('does not create a grant when authorization denies', async () => {
		const dependencies = createDependencies()
		dependencies.authorizationService.require.mockRejectedValueOnce(
			new Error('denied'),
		)

		await expect(
			authorizeCatalogCategoryImageStage(
				{ tenant, stage: { mode: 'create' } },
				dependencies,
			),
		).rejects.toThrow('denied')
		expect(dependencies.grantIssuer.create).not.toHaveBeenCalled()
	})
})
