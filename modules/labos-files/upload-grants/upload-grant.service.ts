import 'server-only'

import {
	UPLOAD_GRANT_ERROR_CODES,
	UploadGrantError,
	type UploadGrantCompletionRequest,
	type UploadGrantConsumptionRequest,
	type UploadGrantCreationRequest,
	type UploadGrantDomainMutation,
	type UploadGrantLifecyclePhase,
	type UploadGrantLifecycleReason,
} from './upload-grant.types'
import type { UploadGrantRegistry } from './upload-grant.registry'
import {
	prismaUploadGrantRepository,
	type UploadGrantRepository,
} from './upload-grant.repository'
import {
	structuredUploadGrantMonitor,
	type UploadGrantMonitor,
} from './upload-grant.telemetry'

const SAFE_ID_PATTERN = /^[a-zA-Z0-9_-]{1,191}$/
const SAFE_PROVIDER_KEY_PATTERN = /^[^\s]{1,1024}$/

function assertSafeId(value: string) {
	if (!SAFE_ID_PATTERN.test(value)) {
		throw new UploadGrantError(UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED)
	}
}

function assertProviderFile(key: string, url: string) {
	if (!SAFE_PROVIDER_KEY_PATTERN.test(key) || key.includes('://')) {
		throw new UploadGrantError(UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED)
	}
	let parsed: URL
	try {
		parsed = new URL(url)
	} catch {
		throw new UploadGrantError(UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED)
	}
	if (parsed.protocol !== 'https:' || parsed.username || parsed.password) {
		throw new UploadGrantError(UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED)
	}
}

export function createUploadGrantService(options: {
	registry: UploadGrantRegistry
	repository?: UploadGrantRepository
	monitor?: UploadGrantMonitor
	now?: () => Date
	nowMs?: () => number
	generateCorrelationId?: () => string
}) {
	const repository = options.repository ?? prismaUploadGrantRepository
	const monitor = options.monitor ?? structuredUploadGrantMonitor
	const now = options.now ?? (() => new Date())
	const nowMs = options.nowMs ?? (() => performance.now())
	const generateCorrelationId =
		options.generateCorrelationId ?? (() => crypto.randomUUID())
	const correlationIdFor = (candidate: string | undefined) =>
		candidate && SAFE_ID_PATTERN.test(candidate)
			? candidate
			: generateCorrelationId()

	function record(
		base: Readonly<{
			boundaryId: string
			purpose: string
			targetType?: string
			correlationId: string
			phase: UploadGrantLifecyclePhase
			startedAt: number
		}>,
		outcome: 'completed' | 'failed',
		reason: UploadGrantLifecycleReason,
	) {
		try {
			monitor.record({
				event: 'labos.file_upload_grant',
				boundaryId: base.boundaryId,
				purpose: base.purpose,
				...(base.targetType && { targetType: base.targetType }),
				correlationId: base.correlationId,
				phase: base.phase,
				outcome,
				reason,
				durationMs: Math.max(0, nowMs() - base.startedAt),
			})
		} catch {
			// Monitoring cannot alter a grant lifecycle decision.
		}
	}

	return Object.freeze({
		async create(input: UploadGrantCreationRequest) {
			const startedAt = nowMs()
			const correlationId = correlationIdFor(input.correlationId)
			let base = {
				boundaryId: 'FILE-UPLOAD-GRANT-UNKNOWN',
				purpose: 'upload-grant.create',
				correlationId,
				phase: 'creation' as const,
				startedAt,
			}
			try {
				const definition = options.registry.resolve(
					input.boundaryId,
					input.purpose,
					input.target,
				)
				base = {
					...base,
					boundaryId: definition.boundaryId,
					purpose: definition.purpose,
					...(definition.targetType && {
						targetType: definition.targetType,
					}),
				}
				const createdAt = now()
				const grant = await repository.create({
					organizationId: input.tenant.organizationId,
					labId: input.tenant.labId,
					memberId: input.tenant.memberId,
					boundaryId: definition.boundaryId,
					purpose: definition.purpose,
					target: input.target,
					correlationId,
					expiresAt: new Date(createdAt.getTime() + definition.ttlMs),
				})
				if (!grant) {
					throw new UploadGrantError(
						UPLOAD_GRANT_ERROR_CODES.CANONICAL_CONTEXT_REJECTED,
					)
				}
				record(base, 'completed', 'UPLOAD_GRANT_CREATED')
				return Object.freeze({ uploadGrantId: grant.id })
			} catch (error) {
				const reason =
					error instanceof UploadGrantError
						? error.code
						: UPLOAD_GRANT_ERROR_CODES.LIFECYCLE_FAILURE
				record(base, 'failed', reason)
				if (error instanceof UploadGrantError) throw error
				throw new UploadGrantError(
					UPLOAD_GRANT_ERROR_CODES.LIFECYCLE_FAILURE,
				)
			}
		},

		async completeVerifiedProviderCallback(
			input: UploadGrantCompletionRequest,
		) {
			const startedAt = nowMs()
			const correlationId = correlationIdFor(input.correlationId)
			let base = {
				boundaryId: 'FILE-UPLOAD-GRANT-UNKNOWN',
				purpose: 'upload-grant.provider-completion',
				correlationId,
				phase: 'provider_completion' as const,
				startedAt,
			}
			try {
				assertSafeId(input.metadata.uploadGrantId)
				assertProviderFile(input.file.key, input.file.url)
				const storedDefinition = await repository.findDefinition(
					input.metadata.uploadGrantId,
				)
				if (!storedDefinition) {
					throw new UploadGrantError(
						UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED,
					)
				}
				const definition = options.registry.get(
					storedDefinition.boundaryId,
					storedDefinition.purpose,
				)
				base = {
					...base,
					boundaryId: definition.boundaryId,
					purpose: definition.purpose,
				}
				const result = await repository.complete({
					uploadGrantId: input.metadata.uploadGrantId,
					boundaryId: definition.boundaryId,
					purpose: definition.purpose,
					providerFileKey: input.file.key,
					providerFileUrl: input.file.url,
					now: now(),
				})

				if (result === 'expired') {
					throw new UploadGrantError(UPLOAD_GRANT_ERROR_CODES.EXPIRED)
				}
				if (result === 'rejected') {
					throw new UploadGrantError(
						UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED,
					)
				}
				record(
					base,
					'completed',
					result === 'completed'
						? 'UPLOAD_GRANT_PROVIDER_COMPLETED'
						: 'UPLOAD_GRANT_PROVIDER_REPLAY_ACCEPTED',
				)
				return Object.freeze({
					uploadGrantId: input.metadata.uploadGrantId,
				})
			} catch (error) {
				const reason =
					error instanceof UploadGrantError
						? error.code
						: UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED
				record(base, 'failed', reason)
				if (error instanceof UploadGrantError) throw error
				throw new UploadGrantError(UPLOAD_GRANT_ERROR_CODES.CALLBACK_REJECTED)
			}
		},

		async expireDueGrants(correlationId = generateCorrelationId()) {
			const startedAt = nowMs()
			const base = {
				boundaryId: 'FILE-UPLOAD-GRANT-LIFECYCLE',
				purpose: 'upload-grant.expire',
				correlationId,
				phase: 'expiry' as const,
				startedAt,
			}
			try {
				const expiredCount = await repository.expireDue(now())
				record(base, 'completed', 'UPLOAD_GRANT_EXPIRY_SWEEP_COMPLETED')
				return Object.freeze({ expiredCount })
			} catch {
				record(
					base,
					'failed',
					UPLOAD_GRANT_ERROR_CODES.LIFECYCLE_FAILURE,
				)
				throw new UploadGrantError(
					UPLOAD_GRANT_ERROR_CODES.LIFECYCLE_FAILURE,
				)
			}
		},

		async consumeTransactionally<Result>(
			input: UploadGrantConsumptionRequest,
			mutation: UploadGrantDomainMutation<Result>,
		) {
			const startedAt = nowMs()
			const correlationId = correlationIdFor(input.correlationId)
			let base = {
				boundaryId: 'FILE-UPLOAD-GRANT-UNKNOWN',
				purpose: 'upload-grant.consume',
				correlationId,
				phase: 'consumption' as const,
				startedAt,
			}
			try {
				const definition = options.registry.resolve(
					input.boundaryId,
					input.purpose,
					input.target,
				)
				base = {
					...base,
					boundaryId: definition.boundaryId,
					purpose: definition.purpose,
					...(definition.targetType && {
						targetType: definition.targetType,
					}),
				}
				assertSafeId(input.uploadGrantId)
				const result = await repository.consume(
					{
						organizationId: input.tenant.organizationId,
						labId: input.tenant.labId,
						memberId: input.tenant.memberId,
						boundaryId: definition.boundaryId,
						purpose: definition.purpose,
						target: input.target,
						uploadGrantId: input.uploadGrantId,
						now: now(),
					},
					mutation,
				)
				record(base, 'completed', 'UPLOAD_GRANT_CONSUMED')
				return result
			} catch (error) {
				const reason =
					error instanceof UploadGrantError
						? error.code
						: UPLOAD_GRANT_ERROR_CODES.CONSUMPTION_REJECTED
				record(base, 'failed', reason)
				if (error instanceof UploadGrantError) throw error
				throw new UploadGrantError(
					UPLOAD_GRANT_ERROR_CODES.CONSUMPTION_REJECTED,
				)
			}
		},
	})
}
