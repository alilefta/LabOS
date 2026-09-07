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

const CATALOG_CATEGORY_IMAGE_STAGE_BOUNDARIES = Object.freeze({
	create: Object.freeze({
		boundaryId: 'N-FILE-102' as const,
		permission: 'catalog.create' as const,
		purpose: 'catalog.category.image.create.stage' as const,
		operation: Object.freeze({
			kind: 'catalog.category.image.create.stage' as const,
		}),
	}),
	update: Object.freeze({
		boundaryId: 'N-FILE-103' as const,
		permission: 'catalog.update' as const,
		purpose: 'catalog.category.image.update.stage' as const,
		operation: Object.freeze({
			kind: 'catalog.category.image.update.stage' as const,
		}),
	}),
})

/**
 * The pilot has no file-delete boundary. Existing images remain unchanged
 * unless a completed update-stage grant is consumed by the final Category
 * command. Replacing an image is grant-backed; removal is unavailable rather
 * than treating an empty URL as an implicit provider-delete instruction.
 */
export const CATALOG_CATEGORY_IMAGE_MUTATION_RULES = Object.freeze({
	unchanged: 'preserve-existing-image' as const,
	replace: 'consume-N-FILE-103-grant' as const,
	remove: 'unavailable-pending-file-delete-policy' as const,
})

/**
 * A caller may select only create versus update and, for update, a Category
 * identifier. All authorization labels and target types remain server-owned.
 */
export const CatalogCategoryImageStageInputSchema = z.discriminatedUnion('mode', [
	z.object({ mode: z.literal('create') }).strict(),
	z
		.object({
			mode: z.literal('update'),
			categoryId: z.string().uuid(),
		})
		.strict(),
])

export type CatalogCategoryImageStageInput = z.infer<
	typeof CatalogCategoryImageStageInputSchema
>

export type CatalogCategoryImageStageProjection =
	| Readonly<{
			boundaryId: 'N-FILE-102'
			permission: 'catalog.create'
			purpose: 'catalog.category.image.create.stage'
			target: null
			operation: Readonly<{ kind: 'catalog.category.image.create.stage' }>
		}>
	| Readonly<{
			boundaryId: 'N-FILE-103'
			permission: 'catalog.update'
			purpose: 'catalog.category.image.update.stage'
			target: Readonly<{ type: 'catalog.category'; id: string }>
			operation: Readonly<{ kind: 'catalog.category.image.update.stage' }>
		}>

export function projectCatalogCategoryImageStage(
	input: unknown,
): CatalogCategoryImageStageProjection {
	const parsed = CatalogCategoryImageStageInputSchema.parse(input)
	if (parsed.mode === 'create') {
		return Object.freeze({
			...CATALOG_CATEGORY_IMAGE_STAGE_BOUNDARIES.create,
			target: null,
		})
	}

	return Object.freeze({
		...CATALOG_CATEGORY_IMAGE_STAGE_BOUNDARIES.update,
		target: Object.freeze({ type: 'catalog.category' as const, id: parsed.categoryId }),
	})
}

type UploadGrantIssuer = Pick<typeof labOSUploadGrantService, 'create'>
type CatalogCategoryStageAuthorizer = Pick<LabOSAuthorizationService, 'require'>

export type AuthorizeCatalogCategoryImageStageDependencies = Readonly<{
	authorizationService?: CatalogCategoryStageAuthorizer
	grantIssuer?: UploadGrantIssuer
	generateCorrelationId?: () => string
}>

/**
 * Performs Authorization V1 before creating the opaque persisted grant that
 * UploadThing may carry to its verified callback. It never returns provider,
 * tenant, permission, target, or operation data to the browser.
 */
export async function authorizeCatalogCategoryImageStage(
	input: Readonly<{ tenant: TenantContext; stage: unknown }>,
	dependencies: AuthorizeCatalogCategoryImageStageDependencies = {},
): Promise<UploadGrantProviderMetadata> {
	const projection = projectCatalogCategoryImageStage(input.stage)
	const correlationId =
		dependencies.generateCorrelationId?.() ?? crypto.randomUUID()
	const authorizationService =
		dependencies.authorizationService ?? labosAuthorizationService
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

	const grant = await grantIssuer.create({
		tenant: input.tenant,
		boundaryId: projection.boundaryId,
		purpose: projection.purpose,
		target: projection.target,
		correlationId,
	})

	return Object.freeze({ uploadGrantId: grant.uploadGrantId })
}
