import { describe, expect, it, vi } from 'vitest'

import {
	CATALOG_WORKTYPE_IMAGE_MUTATION_RULES,
	authorizeCatalogWorkTypeImageStage,
	projectCatalogWorkTypeImageStage,
} from '@/modules/labos-files/catalog-worktype-upload.contract'
import type { TenantContext } from '@/platform/organizations'
import { labOSUploadGrantRegistry } from '@/modules/labos-files/upload-grants'

const tenant: TenantContext = {
	userId: 'user-1', memberId: 'member-1', memberRole: 'admin', staffId: null,
	organizationId: 'organization-1', labId: 'lab-1', lab: { id: 'lab-1', title: 'Lab', slug: 'lab' },
}
const workTypeId = 'b57bfc7a-ae61-4405-a329-b5a98608aa02'

describe('Catalog WorkType image-stage contract', () => {
	it('projects closed create and authoritative update grants', () => {
		expect(projectCatalogWorkTypeImageStage({ mode: 'create' })).toEqual({ boundaryId: 'N-FILE-104', permission: 'catalog.create', purpose: 'catalog.worktype.image.create.stage', target: null, operation: { kind: 'catalog.worktype.image.create.stage' } })
		expect(projectCatalogWorkTypeImageStage({ mode: 'update', workTypeId })).toEqual({ boundaryId: 'N-FILE-105', permission: 'catalog.update', purpose: 'catalog.worktype.image.update.stage', target: { type: 'catalog.worktype', id: workTypeId }, operation: { kind: 'catalog.worktype.image.update.stage' } })
		expect(() => projectCatalogWorkTypeImageStage({ mode: 'update', workTypeId, boundaryId: 'N-FILE-104' })).toThrow()
	})

	it('keeps replacement grant-backed and removal unavailable', () => {
		expect(CATALOG_WORKTYPE_IMAGE_MUTATION_RULES).toEqual({ unchanged: 'preserve-existing-image', replace: 'consume-N-FILE-105-grant', remove: 'unavailable-pending-file-delete-policy' })
	})

	it('uses the registered 15-minute WorkType definitions and their allowlisted labels', () => {
		expect(labOSUploadGrantRegistry.resolve('N-FILE-104', 'catalog.worktype.image.create.stage', null)).toMatchObject({ ttlMs: 15 * 60_000, targetType: null })
		expect(labOSUploadGrantRegistry.resolve('N-FILE-105', 'catalog.worktype.image.update.stage', { type: 'catalog.worktype', id: workTypeId })).toMatchObject({ ttlMs: 15 * 60_000, targetType: 'catalog.worktype' })
	})

	it('authorizes before it issues an opaque target-bound grant', async () => {
		const authorizationService = { require: vi.fn().mockResolvedValue(undefined) }
		const grantIssuer = { create: vi.fn().mockResolvedValue({ uploadGrantId: 'grant_123' }) }
		await expect(authorizeCatalogWorkTypeImageStage({ tenant, stage: { mode: 'update', workTypeId } }, { authorizationService, grantIssuer, generateCorrelationId: () => 'correlation-1' })).resolves.toEqual({ uploadGrantId: 'grant_123' })
		expect(authorizationService.require).toHaveBeenCalledWith(expect.objectContaining({ boundaryId: 'N-FILE-105', target: { type: 'catalog.worktype', id: workTypeId } }))
		expect(grantIssuer.create).toHaveBeenCalledWith({ tenant, boundaryId: 'N-FILE-105', purpose: 'catalog.worktype.image.update.stage', target: { type: 'catalog.worktype', id: workTypeId }, correlationId: 'correlation-1' })
	})

	it('does not issue a grant when authorization denies', async () => {
		const authorizationService = { require: vi.fn().mockRejectedValue(new Error('denied')) }
		const grantIssuer = { create: vi.fn() }
		await expect(authorizeCatalogWorkTypeImageStage({ tenant, stage: { mode: 'create' } }, { authorizationService, grantIssuer })).rejects.toThrow('denied')
		expect(grantIssuer.create).not.toHaveBeenCalled()
	})
})
