import {
	UPLOAD_GRANT_ERROR_CODES,
	UploadGrantError,
	type UploadGrantDefinition,
	type UploadGrantTarget,
} from './upload-grant.types'

const LABEL_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9._:-]{0,127}$/
const MIN_TTL_MS = 60_000
const MAX_TTL_MS = 60 * 60 * 1000

function definitionKey(boundaryId: string, purpose: string) {
	return `${boundaryId}\u0000${purpose}`
}

function isValidDefinition(definition: UploadGrantDefinition): boolean {
	return (
		LABEL_PATTERN.test(definition.boundaryId) &&
		LABEL_PATTERN.test(definition.purpose) &&
		(definition.targetType === null ||
			LABEL_PATTERN.test(definition.targetType)) &&
		Number.isSafeInteger(definition.ttlMs) &&
		definition.ttlMs >= MIN_TTL_MS &&
		definition.ttlMs <= MAX_TTL_MS
	)
}

function assertTarget(
	definition: UploadGrantDefinition,
	target: UploadGrantTarget | null,
) {
	const targetIsValid =
		target !== null &&
		LABEL_PATTERN.test(target.type) &&
		typeof target.id === 'string' &&
		target.id.length > 0 &&
		target.id.length <= 191

	if (
		(definition.targetType === null && target !== null) ||
		(definition.targetType !== null &&
			(!targetIsValid || target?.type !== definition.targetType))
	) {
		throw new UploadGrantError(UPLOAD_GRANT_ERROR_CODES.TARGET_INVALID)
	}
}

export type UploadGrantRegistry = ReturnType<typeof createUploadGrantRegistry>

/** Immutable fail-closed registry for boundary-owned upload purposes. */
export function createUploadGrantRegistry(
	definitions: readonly UploadGrantDefinition[],
) {
	const registry = new Map<string, UploadGrantDefinition>()

	for (const candidate of definitions) {
		if (!isValidDefinition(candidate)) {
			throw new UploadGrantError(
				UPLOAD_GRANT_ERROR_CODES.DEFINITION_INVALID,
			)
		}

		const key = definitionKey(candidate.boundaryId, candidate.purpose)
		if (registry.has(key)) {
			throw new UploadGrantError(
				UPLOAD_GRANT_ERROR_CODES.DEFINITION_INVALID,
			)
		}
		registry.set(key, Object.freeze({ ...candidate }))
	}

	return Object.freeze({
		get(boundaryId: string, purpose: string): UploadGrantDefinition {
			const definition = registry.get(definitionKey(boundaryId, purpose))
			if (!definition) {
				throw new UploadGrantError(
					UPLOAD_GRANT_ERROR_CODES.DEFINITION_NOT_REGISTERED,
				)
			}
			return definition
		},
		resolve(
			boundaryId: string,
			purpose: string,
			target: UploadGrantTarget | null,
		): UploadGrantDefinition {
			const definition = this.get(boundaryId, purpose)
			assertTarget(definition, target)
			return definition
		},
	})
}
