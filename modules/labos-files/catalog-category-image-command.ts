import 'server-only'

import type { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import {
	labosAuthorizationService,
	type LabOSAuthorizationService,
} from '@/modules/labos-authorization/service'
import type { TenantContext } from '@/platform/organizations'

import { labOSUploadGrantService } from './upload-grants'

const CATEGORY_SELECT = {
	id: true,
	name: true,
	description: true,
	imageUrl: true,
	isArchived: true,
	labId: true,
	createdAt: true,
	updatedAt: true,
} as const

const CATEGORY_IMAGE_CREATE_GRANT = Object.freeze({
	boundaryId: 'N-FILE-102' as const,
	purpose: 'catalog.category.image.create.stage' as const,
	target: null,
})

const CATEGORY_IMAGE_UPDATE_GRANT = Object.freeze({
	boundaryId: 'N-FILE-103' as const,
	purpose: 'catalog.category.image.update.stage' as const,
})

type CategoryClient = Pick<Prisma.TransactionClient, 'caseCategory'>
type CategoryGrantConsumer = Pick<
	typeof labOSUploadGrantService,
	'consumeTransactionally'
>

export type CatalogCategoryCommandDependencies = Readonly<{
	authorizationService?: Pick<LabOSAuthorizationService, 'require'>
	grantConsumer?: CategoryGrantConsumer
	prisma?: CategoryClient
	generateCorrelationId?: () => string
}>

export type CatalogCategoryCreateCommand = Readonly<{
	name: string
	description?: string
	isArchived?: boolean
	/** Opaque handoff only; provider URLs and keys are never command input. */
	imageUploadGrantId?: string
}>

export type CatalogCategoryUpdateCommand = CatalogCategoryCreateCommand &
	Readonly<{ categoryId: string }>

export class CatalogCategoryNotFoundError extends Error {
	constructor() {
		super('Catalog category was not found')
		this.name = 'CatalogCategoryNotFoundError'
	}
}

function dependenciesFor(dependencies: CatalogCategoryCommandDependencies) {
	return {
		authorizationService:
			dependencies.authorizationService ?? labosAuthorizationService,
		grantConsumer: dependencies.grantConsumer ?? labOSUploadGrantService,
		prisma: dependencies.prisma ?? generalPrisma,
		correlationId:
			dependencies.generateCorrelationId?.() ?? crypto.randomUUID(),
	}
}

function createData(input: CatalogCategoryCreateCommand, imageUrl: string | null) {
	return {
		name: input.name,
		description: input.description ?? null,
		isArchived: input.isArchived ?? false,
		imageUrl,
	}
}

function updateData(input: CatalogCategoryUpdateCommand, imageUrl?: string) {
	return {
		name: input.name,
		description:
			input.description !== undefined ? input.description ?? null : undefined,
		isArchived: input.isArchived !== undefined ? input.isArchived : undefined,
		...(imageUrl !== undefined && { imageUrl }),
	}
}

async function updateCategory(
	prisma: CategoryClient,
	input: CatalogCategoryUpdateCommand,
	labId: string,
	imageUrl?: string,
) {
	const updated = await prisma.caseCategory.updateMany({
		where: { id: input.categoryId, labId },
		data: updateData(input, imageUrl),
	})
	if (updated.count !== 1) throw new CatalogCategoryNotFoundError()

	const category = await prisma.caseCategory.findFirst({
		where: { id: input.categoryId, labId },
		select: CATEGORY_SELECT,
	})
	if (!category) throw new CatalogCategoryNotFoundError()
	return category
}

/**
 * Final Catalog Category create command. Authorization precedes all domain
 * work; a supplied grant is consumed in the transaction that creates the
 * Category. Raw URLs are intentionally absent from this command contract.
 */
export async function executeCatalogCategoryCreate(
	tenant: TenantContext,
	input: CatalogCategoryCreateCommand,
	dependencies: CatalogCategoryCommandDependencies = {},
) {
	const { authorizationService, grantConsumer, prisma, correlationId } =
		dependenciesFor(dependencies)

	await authorizationService.require({
		actor: createLabOSAuthorizationActor(tenant),
		boundaryId: CATEGORY_IMAGE_CREATE_GRANT.boundaryId,
		permission: 'catalog.create',
		operation: { kind: 'catalog.category.image.create.commit' },
		correlationId,
	})

	if (!input.imageUploadGrantId) {
		return prisma.caseCategory.create({
			data: { ...createData(input, null), labId: tenant.labId },
			select: CATEGORY_SELECT,
		})
	}

	return grantConsumer.consumeTransactionally(
		{
			tenant,
			uploadGrantId: input.imageUploadGrantId,
			...CATEGORY_IMAGE_CREATE_GRANT,
			correlationId,
		},
		(transaction, file) =>
			transaction.caseCategory.create({
				data: {
					...createData(input, file.providerFileUrl),
					labId: tenant.labId,
				},
				select: CATEGORY_SELECT,
			}),
	)
}

/**
 * Final Catalog Category update command. A no-grant edit deliberately omits
 * imageUrl so a client cannot convert a blank or raw provider URL into delete
 * or replacement authority.
 */
export async function executeCatalogCategoryUpdate(
	tenant: TenantContext,
	input: CatalogCategoryUpdateCommand,
	dependencies: CatalogCategoryCommandDependencies = {},
) {
	const { authorizationService, grantConsumer, prisma, correlationId } =
		dependenciesFor(dependencies)
	const target = Object.freeze({
		type: 'catalog.category' as const,
		id: input.categoryId,
	})

	await authorizationService.require({
		actor: createLabOSAuthorizationActor(tenant),
		boundaryId: CATEGORY_IMAGE_UPDATE_GRANT.boundaryId,
		permission: 'catalog.update',
		target,
		operation: { kind: 'catalog.category.image.update.commit' },
		correlationId,
	})

	if (!input.imageUploadGrantId) {
		return updateCategory(prisma, input, tenant.labId)
	}

	return grantConsumer.consumeTransactionally(
		{
			tenant,
			uploadGrantId: input.imageUploadGrantId,
			boundaryId: CATEGORY_IMAGE_UPDATE_GRANT.boundaryId,
			purpose: CATEGORY_IMAGE_UPDATE_GRANT.purpose,
			target,
			correlationId,
		},
		(transaction, file) =>
			updateCategory(transaction, input, tenant.labId, file.providerFileUrl),
	)
}
