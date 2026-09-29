import 'server-only'

import type { Prisma } from '@/generated/prisma/client'
import { generalPrisma } from '@/lib/prisma'
import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import { labosAuthorizationService, type LabOSAuthorizationService } from '@/modules/labos-authorization/service'
import type { TenantContext } from '@/platform/organizations'

import { labOSUploadGrantService } from './upload-grants'

const PRODUCT_SELECT = {
	id: true,
	name: true,
	description: true,
	imageUrl: true,
	labId: true,
	workTypeId: true,
	isArchived: true,
	createdAt: true,
	updatedAt: true,
} as const

const PRODUCT_IMAGE_CREATE_GRANT = Object.freeze({
	boundaryId: 'N-FILE-106' as const,
	purpose: 'catalog.product.image.create.stage' as const,
	target: null,
})
const PRODUCT_IMAGE_UPDATE_GRANT = Object.freeze({
	boundaryId: 'N-FILE-107' as const,
	purpose: 'catalog.product.image.update.stage' as const,
})

type ProductClient = Pick<Prisma.TransactionClient, 'product' | 'workType'>
type GrantConsumer = Pick<typeof labOSUploadGrantService, 'consumeTransactionally'>

export type CatalogProductCommandDependencies = Readonly<{
	authorizationService?: Pick<LabOSAuthorizationService, 'require'>
	grantConsumer?: GrantConsumer
	prisma?: ProductClient
	generateCorrelationId?: () => string
}>

export type CatalogProductCreateCommand = Readonly<{
	name: string
	description?: string
	workTypeId: string
	/** Opaque handoff only; provider URLs and keys are never command input. */
	imageUploadGrantId?: string
}>
export type CatalogProductUpdateCommand = CatalogProductCreateCommand & Readonly<{ productId: string }>

export class CatalogProductNotFoundError extends Error {
	constructor() { super('Catalog product was not found'); this.name = 'CatalogProductNotFoundError' }
}
export class CatalogProductWorkTypeNotFoundError extends Error {
	constructor() { super('Catalog product work type was not found'); this.name = 'CatalogProductWorkTypeNotFoundError' }
}

function dependenciesFor(dependencies: CatalogProductCommandDependencies) {
	return {
		authorizationService: dependencies.authorizationService ?? labosAuthorizationService,
		grantConsumer: dependencies.grantConsumer ?? labOSUploadGrantService,
		prisma: dependencies.prisma ?? generalPrisma,
		correlationId: dependencies.generateCorrelationId?.() ?? crypto.randomUUID(),
	}
}

async function requireWorkType(prisma: ProductClient, workTypeId: string, labId: string) {
	const workType = await prisma.workType.findFirst({ where: { id: workTypeId, labId }, select: { id: true } })
	if (!workType) throw new CatalogProductWorkTypeNotFoundError()
}

function createData(input: CatalogProductCreateCommand, imageUrl: string | null) {
	return { name: input.name, description: input.description ?? null, workTypeId: input.workTypeId, imageUrl }
}
function updateData(input: CatalogProductUpdateCommand, imageUrl?: string) {
	return {
		name: input.name,
		description: input.description !== undefined ? input.description ?? null : undefined,
		workTypeId: input.workTypeId,
		...(imageUrl !== undefined && { imageUrl }),
	}
}

async function updateProduct(prisma: ProductClient, input: CatalogProductUpdateCommand, labId: string, imageUrl?: string) {
	await requireWorkType(prisma, input.workTypeId, labId)
	const updated = await prisma.product.updateMany({ where: { id: input.productId, labId }, data: updateData(input, imageUrl) })
	if (updated.count !== 1) throw new CatalogProductNotFoundError()
	const product = await prisma.product.findFirst({ where: { id: input.productId, labId }, select: PRODUCT_SELECT })
	if (!product) throw new CatalogProductNotFoundError()
	return product
}

export async function executeCatalogProductCreate(tenant: TenantContext, input: CatalogProductCreateCommand, dependencies: CatalogProductCommandDependencies = {}) {
	const { authorizationService, grantConsumer, prisma, correlationId } = dependenciesFor(dependencies)
	await authorizationService.require({
		actor: createLabOSAuthorizationActor(tenant), boundaryId: PRODUCT_IMAGE_CREATE_GRANT.boundaryId,
		permission: 'catalog.create', operation: { kind: 'catalog.product.image.create.commit' }, correlationId,
	})
	if (!input.imageUploadGrantId) {
		await requireWorkType(prisma, input.workTypeId, tenant.labId)
		return prisma.product.create({ data: { ...createData(input, null), labId: tenant.labId }, select: PRODUCT_SELECT })
	}
	return grantConsumer.consumeTransactionally(
		{ tenant, uploadGrantId: input.imageUploadGrantId, ...PRODUCT_IMAGE_CREATE_GRANT, correlationId },
		async (transaction, file) => {
			await requireWorkType(transaction, input.workTypeId, tenant.labId)
			return transaction.product.create({ data: { ...createData(input, file.providerFileUrl), labId: tenant.labId }, select: PRODUCT_SELECT })
		},
	)
}

export async function executeCatalogProductUpdate(tenant: TenantContext, input: CatalogProductUpdateCommand, dependencies: CatalogProductCommandDependencies = {}) {
	const { authorizationService, grantConsumer, prisma, correlationId } = dependenciesFor(dependencies)
	const target = Object.freeze({ type: 'catalog.product' as const, id: input.productId })
	await authorizationService.require({
		actor: createLabOSAuthorizationActor(tenant), boundaryId: PRODUCT_IMAGE_UPDATE_GRANT.boundaryId,
		permission: 'catalog.update', target, operation: { kind: 'catalog.product.image.update.commit' }, correlationId,
	})
	if (!input.imageUploadGrantId) return updateProduct(prisma, input, tenant.labId)
	return grantConsumer.consumeTransactionally(
		{ tenant, uploadGrantId: input.imageUploadGrantId, boundaryId: PRODUCT_IMAGE_UPDATE_GRANT.boundaryId, purpose: PRODUCT_IMAGE_UPDATE_GRANT.purpose, target, correlationId },
		(transaction, file) => updateProduct(transaction, input, tenant.labId, file.providerFileUrl),
	)
}
