import { beforeEach, describe, expect, it, vi } from 'vitest'

const authorizeCatalogCategoryImageStage = vi.hoisted(() => vi.fn())
const authorizeCatalogWorkTypeImageStage = vi.hoisted(() => vi.fn())
const authorizeCatalogProductImageStage = vi.hoisted(() => vi.fn())
const authorizeDentistAvatarStage = vi.hoisted(() => vi.fn())
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

vi.mock('@/modules/labos-files/catalog-worktype-upload.contract', async (importOriginal) => {
	const actual = await importOriginal<
		typeof import('@/modules/labos-files/catalog-worktype-upload.contract')
	>()
	return { ...actual, authorizeCatalogWorkTypeImageStage }
})

vi.mock('@/modules/labos-files/catalog-product-upload.contract', async (importOriginal) => {
	const actual = await importOriginal<
		typeof import('@/modules/labos-files/catalog-product-upload.contract')
	>()
	return { ...actual, authorizeCatalogProductImageStage }
})

vi.mock('@/modules/labos-files/dentist-avatar-upload.contract', async (importOriginal) => {
	const actual = await importOriginal<
		typeof import('@/modules/labos-files/dentist-avatar-upload.contract')
	>()
	return { ...actual, authorizeDentistAvatarStage }
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
const workTypeRoute = labOSUploadRouter.workTypeIconAvatar
const productRoute = labOSUploadRouter.productIconAvatar
const dentistRoute = labOSUploadRouter.dentistAvatar
const caseAssetsRoute = labOSUploadRouter.caseAssetsRoute
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

describe('workTypeIconAvatar UploadThing route', () => {
	it('requires the closed WorkType stage input before tenant/provider work', async () => {
		await expect(
			(workTypeRoute.inputParser as { parseAsync(value: unknown): Promise<unknown> }).parseAsync({
				mode: 'update',
				workTypeId: 'not-a-uuid',
			}),
		).rejects.toThrow()
	})

	it('passes only opaque grant metadata through its verified callback', async () => {
		requireTenantContext.mockResolvedValue(tenant)
		authorizeCatalogWorkTypeImageStage.mockResolvedValue({ uploadGrantId: 'grant_456' })
		completeVerifiedProviderCallback.mockResolvedValue({ uploadGrantId: 'grant_456' })
		const metadata = await workTypeRoute.middleware({ input: { mode: 'create' }, files: [] })
		expect(metadata).toEqual({ uploadGrantId: 'grant_456' })
		expect(authorizeCatalogWorkTypeImageStage).toHaveBeenCalledWith({ tenant, stage: { mode: 'create' } })
		await expect(workTypeRoute.onUploadComplete({ metadata, file: { key: 'provider-key', ufsUrl: 'https://ufs.sh/f/provider-key' } })).resolves.toEqual({ uploadGrantId: 'grant_456' })
		expect(completeVerifiedProviderCallback).toHaveBeenCalledWith({
			metadata,
			file: { key: 'provider-key', url: 'https://ufs.sh/f/provider-key' },
		})
	})
})

describe('productIconAvatar UploadThing route', () => {
	it('requires closed Product input before tenant or provider work', async () => {
		await expect(
			(productRoute.inputParser as { parseAsync(value: unknown): Promise<unknown> }).parseAsync({
				mode: 'update',
				productId: 'not-a-uuid',
			}),
		).rejects.toThrow()
	})

	it('passes only opaque Product grant metadata through its verified callback', async () => {
		requireTenantContext.mockResolvedValue(tenant)
		authorizeCatalogProductImageStage.mockResolvedValue({ uploadGrantId: 'grant_789' })
		completeVerifiedProviderCallback.mockResolvedValue({ uploadGrantId: 'grant_789' })
		const metadata = await productRoute.middleware({ input: { mode: 'create' }, files: [] })
		expect(metadata).toEqual({ uploadGrantId: 'grant_789' })
		expect(authorizeCatalogProductImageStage).toHaveBeenCalledWith({ tenant, stage: { mode: 'create' } })
		await expect(productRoute.onUploadComplete({ metadata, file: { key: 'provider-key', ufsUrl: 'https://ufs.sh/f/provider-key' } })).resolves.toEqual({ uploadGrantId: 'grant_789' })
		expect(completeVerifiedProviderCallback).toHaveBeenCalledWith({
			metadata,
			file: { key: 'provider-key', url: 'https://ufs.sh/f/provider-key' },
		})
	})
})

describe('dentistAvatar UploadThing route', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('accepts only raster avatar MIME types at the provider boundary', () => {
		expect(Object.keys(dentistRoute.routerConfig).sort()).toEqual([
			'image/jpeg',
			'image/png',
			'image/webp',
		])
		for (const config of Object.values(dentistRoute.routerConfig)) {
			expect(config).toMatchObject({ maxFileSize: '4MB', maxFileCount: 1 })
		}
	})

	it('requires closed Dentist input before tenant or provider work', async () => {
		await expect(
			(dentistRoute.inputParser as { parseAsync(value: unknown): Promise<unknown> }).parseAsync({
				mode: 'update',
				dentistId: 'not-a-uuid',
			}),
		).rejects.toThrow()
	})

	it('rejects zero or mixed-type multiple files before staging a grant', async () => {
		const input = { mode: 'create' as const }
		const png = { name: 'avatar.png', size: 1024, type: 'image/png' }
		const webp = { name: 'avatar.webp', size: 1024, type: 'image/webp' }
		await expect(dentistRoute.middleware({ input, files: [] })).rejects.toThrow('Exactly one Dentist avatar is required')
		await expect(dentistRoute.middleware({ input, files: [png, webp] })).rejects.toThrow('Exactly one Dentist avatar is required')
		expect(requireTenantContext).not.toHaveBeenCalled()
		expect(authorizeDentistAvatarStage).not.toHaveBeenCalled()
	})

	it('passes only opaque Dentist grant metadata through its verified callback', async () => {
		requireTenantContext.mockResolvedValue(tenant)
		authorizeDentistAvatarStage.mockResolvedValue({ uploadGrantId: 'grant_dentist' })
		completeVerifiedProviderCallback.mockResolvedValue({ uploadGrantId: 'grant_dentist' })
		const stage = { mode: 'update' as const, dentistId: 'b57bfc7a-ae61-4405-a329-b5a98608aa02' }
		const metadata = await dentistRoute.middleware({ input: stage, files: [{ name: 'avatar.webp', size: 1024, type: 'image/webp' }] })
		expect(metadata).toEqual({ uploadGrantId: 'grant_dentist' })
		expect(authorizeDentistAvatarStage).toHaveBeenCalledWith({ tenant, stage })
		await expect(dentistRoute.onUploadComplete({ metadata, file: { key: 'provider-key', ufsUrl: 'https://ufs.sh/f/provider-key' } })).resolves.toEqual({ uploadGrantId: 'grant_dentist' })
		expect(completeVerifiedProviderCallback).toHaveBeenCalledWith({
			metadata,
			file: { key: 'provider-key', url: 'https://ufs.sh/f/provider-key' },
		})
	})
})

describe('caseAssetsRoute UploadThing route', () => {
	it('denies staging and callback without granting raw URL authority', async () => {
		vi.clearAllMocks()
		await expect(caseAssetsRoute.middleware({ input: undefined, files: [] })).rejects.toThrow(
			'Case clinical uploads are unavailable',
		)
		await expect(
			caseAssetsRoute.onUploadComplete({
				metadata: {},
				file: { key: 'provider-key', ufsUrl: 'https://ufs.sh/f/provider-key' },
			}),
		).rejects.toThrow('Case clinical uploads are unavailable')
		expect(requireTenantContext).not.toHaveBeenCalled()
		expect(completeVerifiedProviderCallback).not.toHaveBeenCalled()
	})
})
