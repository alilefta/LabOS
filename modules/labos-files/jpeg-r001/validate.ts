import 'server-only'

import { createHash, randomUUID } from 'node:crypto'

import { resolveReservedClinicalGrant, type ReservedClinicalGrant } from './grant'
import { inspectR001, R001Unavailable, type JpegStructure } from './inspect'
import { acquireNativeSlot, decodeR001WithNative } from './native'
import { retrieveReservedUploadThingBytes } from './retrieve'

export type ValidatedClinicalJpeg = Readonly<{
	profileId: 'JPEG_CLINICAL_V1_R001'
	encodedBytes: number
	width: number
	height: number
	components: 1 | 3
	progressive: boolean
	sha256: string
	grant: ReservedClinicalGrant
}>

export type ValidationDependencies = Readonly<{
	resolveGrant: typeof resolveReservedClinicalGrant
	retrieve: typeof retrieveReservedUploadThingBytes
	inspect: typeof inspectR001
	decode: typeof decodeR001WithNative
	acquireSlot: typeof acquireNativeSlot
}>

const production: ValidationDependencies = {
	resolveGrant: resolveReservedClinicalGrant,
	retrieve: retrieveReservedUploadThingBytes,
	inspect: inspectR001,
	decode: decodeR001WithNative,
	acquireSlot: acquireNativeSlot,
}
const retainedOriginals = new WeakMap<ValidatedClinicalJpeg, Buffer>()

/** Integrity check for the later separately authorized same-lifecycle finalizer. */
export function assertRetainedOriginal(result: ValidatedClinicalJpeg): void {
	const bytes = retainedOriginals.get(result)
	if (!bytes || bytes.length !== result.encodedBytes ||
		createHash('sha256').update(bytes).digest('hex') !== result.sha256) {
		throw new R001Unavailable()
	}
}

/**
 * Internal server-only validation. No evidence, grant transition, or attachment.
 * A later finalization integration must retain this call/result in its lifecycle
 * and transactionally recheck mutable authority before writing evidence.
 */
export async function validateReservedClinicalJpeg(uploadGrantId: string,
	signal?: AbortSignal, deps: ValidationDependencies = production): Promise<ValidatedClinicalJpeg> {
	const release = await deps.acquireSlot(randomUUID(), signal)
	try {
		const grant = await deps.resolveGrant(uploadGrantId)
		const original = await deps.retrieve(grant.providerFileKey, signal)
		let structure: JpegStructure
		try { structure = deps.inspect(original, signal) } catch { throw new R001Unavailable() }
		const sha256 = createHash('sha256').update(original).digest('hex')
		await deps.decode(original, structure, signal)
		if (signal?.aborted) throw new R001Unavailable()
		const result = Object.freeze({ profileId: 'JPEG_CLINICAL_V1_R001' as const,
			encodedBytes: original.length, width: structure.width,
			height: structure.height, components: structure.components,
			progressive: structure.progressive, sha256, grant })
		retainedOriginals.set(result, original)
		return result
	} catch {
		throw new R001Unavailable()
	} finally { release() }
}
