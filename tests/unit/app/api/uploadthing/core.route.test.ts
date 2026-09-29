import { beforeEach, describe, expect, it, vi } from 'vitest'

const authorizeCatalogCategoryImageStage = vi.hoisted(() => vi.fn())
const completeVerifiedProviderCallback = vi.hoisted(() => vi.fn())
const requireTenantContext = vi.hoisted(() => vi.fn())

vi.mock('@/modules/labos-files/catalog-category-upload.contract', async (importOriginal) => {
	const actual = await importOriginal<
		typeof import('@/modules/labos-files/catalog-category-upload.contract')
	>()
	return {
		...actual,
		authorizeCatalogCategoryImageStage,
	}
})

vi.mock('@/modules/labos-files/upload-grants', () => ({
	labOSUploadGrantService: { completeVerifiedProviderCallback },
}))

vi.mock('@/platform/organizations/tenant-context', async (importOriginal) => {
	const actual = await importOriginal<typeof import('@/platform/organizations/tenant-context')>()
	return { ...actual, requireTenantContext }
})

import { labOSUploadRouter } from '@/app/api/uploadthing/core'
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

const categoryRoute = labOSUploadRouter.categoryIconAvatar
const parseStageInput = (input: unknown) =>
	(
		categoryRoute.inputParser as {
			parseAsync(value: unknown): Promise<unknown>
		}
	).parseAsync(input)

function runMiddleware(input: unknown) {
	return categoryRoute.middleware({ input, files: [] })
}

function runCompletion(input: unknown) {
	return categoryRoute.onUploadComplete(input)
}

describe('categoryIconAvatar UploadThing route', () => {
	beforeEach(() => {
		vi.clearAllMocks()
		requireTenantContext.mockResolvedValue(tenant)
		authorizeCatalogCategoryImageStage.mockResolvedValue({
			uploadGrantId: 'grant_123',
	})
		completeVerifiedProviderCallback.mockResolvedValue({
			uploadGrantId: 'grant_123',
			userId: 'must-not-leak',
			providerFileUrl: 'https://must-not-leak.example/file',
		})
	})

	it.each([
		{ mode: 'create', unexpected: true },
		{ mode: 'update' },
		{ mode: 'update', categoryId: 'not-a-uuid' },
		{ mode: 'delete' },
	])('rejects malformed stage input: %j', async (input) => {
		await expect(parseStageInput(input)).rejects.toThrow()
		expect(requireTenantContext).not.toHaveBeenCalled()
		expect(authorizeCatalogCategoryImageStage).not.toHaveBeenCalled()
	})

	it('denies before grant or provider work', async () => {
		const events: string[] = []
		requireTenantContext.mockImplementation(async () => {
			events.push('tenant')
			return tenant
		})
		authorizeCatalogCategoryImageStage.mockImplementation(async () => {
			events.push('authorization')
			throw new Error('denied')
		})

		await expect(runMiddleware({ mode: 'create' })).rejects.toThrow('denied')
		expect(events).toEqual(['tenant', 'authorization'])
		expect(completeVerifiedProviderCallback).not.toHaveBeenCalled()
	})

	it.each([
		{ mode: 'create' },
		{
			mode: 'update',
			categoryId: 'b57bfc7a-ae61-4405-a329-b5a98608aa02',
		},
	])('creates opaque metadata for %j', async (stage) => {
		const metadata = await runMiddleware(stage)
		expect(metadata).toEqual({
			uploadGrantId: 'grant_123',
		})
		expect(requireTenantContext).toHaveBeenCalledTimes(1)
		expect(authorizeCatalogCategoryImageStage).toHaveBeenCalledWith({
			tenant,
			stage,
		})
		expect(Object.keys(metadata)).toEqual(['uploadGrantId'])
	})

	it('completes a verified callback with only the opaque grant metadata and provider file', async () => {
		const metadata = { uploadGrantId: 'grant_123' }
		const file = {
			key: 'provider-key',
			ufsUrl: 'https://ufs.sh/f/provider-key',
		}

		const output = await runCompletion({ metadata, file })
		expect(output).toEqual({
			uploadGrantId: 'grant_123',
		})
		expect(completeVerifiedProviderCallback).toHaveBeenCalledWith({
			metadata,
			file: { key: file.key, url: file.ufsUrl },
		})
		expect(Object.keys(output)).toEqual(['uploadGrantId'])
	})
})
