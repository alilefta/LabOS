import 'server-only'

import { z } from 'zod/v4'

import { createLabOSAuthorizationActor } from '@/modules/labos-authorization/actor'
import {
	labosAuthorizationService,
	type LabOSAuthorizationService,
} from '@/modules/labos-authorization/service'
import type { TenantContext } from '@/platform/organizations'

import {
	labOSUploadGrantService,
	type UploadGrantProviderMetadata,
} from './upload-grants'

const PRODUCT_IMAGE_STAGE_BOUNDARIES = Object.freeze({
	create: Object.freeze({
		boundaryId: 'N-FILE-106' as const,
		permission: 'catalog.create' as const,
		purpose: 'catalog.product.image.create.stage' as const,
		operation: Object.freeze({ kind: 'catalog.product.image.create.stage' as const }),
	}),
	update: Object.freeze({
		boundaryId: 'N-FILE-107' as const,
		permission: 'catalog.update' as const,
		purpose: 'catalog.product.image.update.stage' as const,
		operation: Object.freeze({ kind: 'catalog.product.image.update.stage' as const }),
	}),
})

export const CATALOG_PRODUCT_IMAGE_MUTATION_RULES = Object.freeze({
	unchanged: 'preserve-existing-image' as const,
	replace: 'consume-N-FILE-107-grant' as const,
	remove: 'unavailable-pending-file-delete-policy' as const,
})

export const CatalogProductImageStageInputSchema = z.discriminatedUnion('mode', [
	z.object({ mode: z.literal('create') }).strict(),
	z.object({ mode: z.literal('update'), productId: z.string().uuid() }).strict(),
])

export type CatalogProductImageStageProjection =
	| Readonly<{ boundaryId: 'N-FILE-106'; permission: 'catalog.create'; purpose: 'catalog.product.image.create.stage'; target: null; operation: Readonly<{ kind: 'catalog.product.image.create.stage' }> }>
	| Readonly<{ boundaryId: 'N-FILE-107'; permission: 'catalog.update'; purpose: 'catalog.product.image.update.stage'; target: Readonly<{ type: 'catalog.product'; id: string }>; operation: Readonly<{ kind: 'catalog.product.image.update.stage' }> }>

export function projectCatalogProductImageStage(input: unknown): CatalogProductImageStageProjection {
	const parsed = CatalogProductImageStageInputSchema.parse(input)
	if (parsed.mode === 'create') return Object.freeze({ ...PRODUCT_IMAGE_STAGE_BOUNDARIES.create, target: null })
	return Object.freeze({ ...PRODUCT_IMAGE_STAGE_BOUNDARIES.update, target: Object.freeze({ type: 'catalog.product' as const, id: parsed.productId }) })
}

type GrantIssuer = Pick<typeof labOSUploadGrantService, 'create'>
type StageAuthorizer = Pick<LabOSAuthorizationService, 'require'>
export type AuthorizeCatalogProductImageStageDependencies = Readonly<{ authorizationService?: StageAuthorizer; grantIssuer?: GrantIssuer; generateCorrelationId?: () => string }>

/** Authorizes before creating the opaque provider handoff grant. */
export async function authorizeCatalogProductImageStage(
	input: Readonly<{ tenant: TenantContext; stage: unknown }>,
	dependencies: AuthorizeCatalogProductImageStageDependencies = {},
): Promise<UploadGrantProviderMetadata> {
	const projection = projectCatalogProductImageStage(input.stage)
	const correlationId = dependencies.generateCorrelationId?.() ?? crypto.randomUUID()
	const authorizationService = dependencies.authorizationService ?? labosAuthorizationService
	const grantIssuer = dependencies.grantIssuer ?? labOSUploadGrantService
	if (projection.target) {
		await authorizationService.require({
			actor: createLabOSAuthorizationActor(input.tenant),
			boundaryId: projection.boundaryId,
			permission: projection.permission,
			target: projection.target,
			operation: projection.operation,
			correlationId,
		})
	} else {
		await authorizationService.require({
			actor: createLabOSAuthorizationActor(input.tenant),
			boundaryId: projection.boundaryId,
			permission: projection.permission,
			operation: projection.operation,
			correlationId,
		})
	}
	const grant = await grantIssuer.create({ tenant: input.tenant, boundaryId: projection.boundaryId, purpose: projection.purpose, target: projection.target, correlationId })
	return Object.freeze({ uploadGrantId: grant.uploadGrantId })
}
