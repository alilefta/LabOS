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

const WORKTYPE_IMAGE_STAGE_BOUNDARIES = Object.freeze({
	create: Object.freeze({
		boundaryId: 'N-FILE-104' as const,
		permission: 'catalog.create' as const,
		purpose: 'catalog.worktype.image.create.stage' as const,
		operation: Object.freeze({ kind: 'catalog.worktype.image.create.stage' as const }),
	}),
	update: Object.freeze({
		boundaryId: 'N-FILE-105' as const,
		permission: 'catalog.update' as const,
		purpose: 'catalog.worktype.image.update.stage' as const,
		operation: Object.freeze({ kind: 'catalog.worktype.image.update.stage' as const }),
	}),
})

export const CATALOG_WORKTYPE_IMAGE_MUTATION_RULES = Object.freeze({
	unchanged: 'preserve-existing-image' as const,
	replace: 'consume-N-FILE-105-grant' as const,
	remove: 'unavailable-pending-file-delete-policy' as const,
})

export const CatalogWorkTypeImageStageInputSchema = z.discriminatedUnion('mode', [
	z.object({ mode: z.literal('create') }).strict(),
	z.object({ mode: z.literal('update'), workTypeId: z.string().uuid() }).strict(),
])

export type CatalogWorkTypeImageStageProjection =
	| Readonly<{ boundaryId: 'N-FILE-104'; permission: 'catalog.create'; purpose: 'catalog.worktype.image.create.stage'; target: null; operation: Readonly<{ kind: 'catalog.worktype.image.create.stage' }> }>
	| Readonly<{ boundaryId: 'N-FILE-105'; permission: 'catalog.update'; purpose: 'catalog.worktype.image.update.stage'; target: Readonly<{ type: 'catalog.worktype'; id: string }>; operation: Readonly<{ kind: 'catalog.worktype.image.update.stage' }> }>

export function projectCatalogWorkTypeImageStage(input: unknown): CatalogWorkTypeImageStageProjection {
	const parsed = CatalogWorkTypeImageStageInputSchema.parse(input)
	if (parsed.mode === 'create') return Object.freeze({ ...WORKTYPE_IMAGE_STAGE_BOUNDARIES.create, target: null })
	return Object.freeze({ ...WORKTYPE_IMAGE_STAGE_BOUNDARIES.update, target: Object.freeze({ type: 'catalog.worktype' as const, id: parsed.workTypeId }) })
}

type GrantIssuer = Pick<typeof labOSUploadGrantService, 'create'>
type StageAuthorizer = Pick<LabOSAuthorizationService, 'require'>
export type AuthorizeCatalogWorkTypeImageStageDependencies = Readonly<{ authorizationService?: StageAuthorizer; grantIssuer?: GrantIssuer; generateCorrelationId?: () => string }>

export async function authorizeCatalogWorkTypeImageStage(
	input: Readonly<{ tenant: TenantContext; stage: unknown }>,
	dependencies: AuthorizeCatalogWorkTypeImageStageDependencies = {},
): Promise<UploadGrantProviderMetadata> {
	const projection = projectCatalogWorkTypeImageStage(input.stage)
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
