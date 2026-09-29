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

const DENTIST_AVATAR_STAGE_BOUNDARIES = Object.freeze({
	create: Object.freeze({
		boundaryId: 'N-FILE-108' as const,
		permission: 'dentist.create' as const,
		purpose: 'dentist.avatar.create.stage' as const,
		operation: Object.freeze({ kind: 'dentist.avatar.create.stage' as const }),
	}),
	update: Object.freeze({
		boundaryId: 'N-FILE-109' as const,
		permission: 'dentist.update' as const,
		purpose: 'dentist.avatar.update.stage' as const,
		operation: Object.freeze({ kind: 'dentist.avatar.update.stage' as const }),
	}),
})

/** Attachment-only scope: no grant means preserve; deletion remains deferred. */
export const DENTIST_AVATAR_MUTATION_RULES = Object.freeze({
	unchanged: 'preserve-existing-avatar' as const,
	replace: 'consume-N-FILE-109-grant' as const,
	remove: 'unavailable-pending-file-delete-policy' as const,
})

export const DentistAvatarStageInputSchema = z.discriminatedUnion('mode', [
	z.object({ mode: z.literal('create') }).strict(),
	z.object({ mode: z.literal('update'), dentistId: z.string().uuid() }).strict(),
])

export type DentistAvatarStageProjection =
	| Readonly<{ boundaryId: 'N-FILE-108'; permission: 'dentist.create'; purpose: 'dentist.avatar.create.stage'; target: null; operation: Readonly<{ kind: 'dentist.avatar.create.stage' }> }>
	| Readonly<{ boundaryId: 'N-FILE-109'; permission: 'dentist.update'; purpose: 'dentist.avatar.update.stage'; target: Readonly<{ type: 'dentist'; id: string }>; operation: Readonly<{ kind: 'dentist.avatar.update.stage' }> }>

export function projectDentistAvatarStage(input: unknown): DentistAvatarStageProjection {
	const parsed = DentistAvatarStageInputSchema.parse(input)
	if (parsed.mode === 'create') return Object.freeze({ ...DENTIST_AVATAR_STAGE_BOUNDARIES.create, target: null })
	return Object.freeze({ ...DENTIST_AVATAR_STAGE_BOUNDARIES.update, target: Object.freeze({ type: 'dentist' as const, id: parsed.dentistId }) })
}

type GrantIssuer = Pick<typeof labOSUploadGrantService, 'create'>
type StageAuthorizer = Pick<LabOSAuthorizationService, 'require'>
export type AuthorizeDentistAvatarStageDependencies = Readonly<{ authorizationService?: StageAuthorizer; grantIssuer?: GrantIssuer; generateCorrelationId?: () => string }>

/** Authorizes a closed Dentist stage before issuing opaque provider metadata. */
export async function authorizeDentistAvatarStage(
	input: Readonly<{ tenant: TenantContext; stage: unknown }>,
	dependencies: AuthorizeDentistAvatarStageDependencies = {},
): Promise<UploadGrantProviderMetadata> {
	const projection = projectDentistAvatarStage(input.stage)
	const correlationId = dependencies.generateCorrelationId?.() ?? crypto.randomUUID()
	const authorizationService = dependencies.authorizationService ?? labosAuthorizationService
	const grantIssuer = dependencies.grantIssuer ?? labOSUploadGrantService
	if (projection.target) {
		await authorizationService.require({ actor: createLabOSAuthorizationActor(input.tenant), boundaryId: projection.boundaryId, permission: projection.permission, target: projection.target, operation: projection.operation, correlationId })
	} else {
		await authorizationService.require({ actor: createLabOSAuthorizationActor(input.tenant), boundaryId: projection.boundaryId, permission: projection.permission, operation: projection.operation, correlationId })
	}
	const grant = await grantIssuer.create({ tenant: input.tenant, boundaryId: projection.boundaryId, purpose: projection.purpose, target: projection.target, correlationId })
	return Object.freeze({ uploadGrantId: grant.uploadGrantId })
}
