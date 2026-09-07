import type { Prisma } from '@/generated/prisma/client'
import type { TenantContext } from '@/platform/organizations'

export const UPLOAD_GRANT_ERROR_CODES = Object.freeze({
	DEFINITION_INVALID: 'UPLOAD_GRANT_DEFINITION_INVALID',
	DEFINITION_NOT_REGISTERED: 'UPLOAD_GRANT_DEFINITION_NOT_REGISTERED',
	TARGET_INVALID: 'UPLOAD_GRANT_TARGET_INVALID',
	CANONICAL_CONTEXT_REJECTED: 'UPLOAD_GRANT_CANONICAL_CONTEXT_REJECTED',
	CALLBACK_REJECTED: 'UPLOAD_GRANT_CALLBACK_REJECTED',
	EXPIRED: 'UPLOAD_GRANT_EXPIRED',
	CONSUMPTION_REJECTED: 'UPLOAD_GRANT_CONSUMPTION_REJECTED',
	LIFECYCLE_FAILURE: 'UPLOAD_GRANT_LIFECYCLE_FAILURE',
} as const)

export type UploadGrantErrorCode =
	(typeof UPLOAD_GRANT_ERROR_CODES)[keyof typeof UPLOAD_GRANT_ERROR_CODES]

export class UploadGrantError extends Error {
	constructor(readonly code: UploadGrantErrorCode) {
		super('The upload grant operation was rejected')
		this.name = 'UploadGrantError'
	}
}

export type UploadGrantTarget = Readonly<{
	type: string
	id: string
}>

export type UploadGrantDefinition = Readonly<{
	boundaryId: string
	purpose: string
	targetType: string | null
	ttlMs: number
}>

export type UploadGrantCreationRequest = Readonly<{
	tenant: TenantContext
	boundaryId: string
	purpose: string
	target: UploadGrantTarget | null
	correlationId?: string
}>

/** Metadata returned by middleware and carried only to UploadThing's callback. */
export type UploadGrantProviderMetadata = Readonly<{
	uploadGrantId: string
}>

export type VerifiedUploadProviderFile = Readonly<{
	key: string
	url: string
}>

export type UploadGrantCompletionRequest = Readonly<{
	metadata: UploadGrantProviderMetadata
	file: VerifiedUploadProviderFile
	correlationId?: string
}>

export type UploadGrantConsumptionRequest = Readonly<{
	tenant: TenantContext
	uploadGrantId: string
	boundaryId: string
	purpose: string
	target: UploadGrantTarget | null
	correlationId?: string
}>

export type ConsumedUploadFile = Readonly<{
	providerFileKey: string
	providerFileUrl: string
}>

export type UploadGrantDomainMutation<Result> = (
	transaction: Prisma.TransactionClient,
	file: ConsumedUploadFile,
) => Promise<Result>

export type UploadGrantLifecyclePhase =
	| 'creation'
	| 'provider_completion'
	| 'expiry'
	| 'consumption'

export type UploadGrantLifecycleOutcome = 'completed' | 'failed'

export type UploadGrantLifecycleReason =
	| UploadGrantErrorCode
	| 'UPLOAD_GRANT_CREATED'
	| 'UPLOAD_GRANT_PROVIDER_COMPLETED'
	| 'UPLOAD_GRANT_PROVIDER_REPLAY_ACCEPTED'
	| 'UPLOAD_GRANT_EXPIRY_SWEEP_COMPLETED'
	| 'UPLOAD_GRANT_CONSUMED'

export type UploadGrantLifecycleEvent = Readonly<{
	event: 'labos.file_upload_grant'
	boundaryId: string
	purpose: string
	targetType?: string
	correlationId: string
	phase: UploadGrantLifecyclePhase
	outcome: UploadGrantLifecycleOutcome
	reason: UploadGrantLifecycleReason
	durationMs: number
}>
