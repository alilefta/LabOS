import 'server-only'

import { createHash } from 'node:crypto'

import { resolveReservedClinicalGrant, type ReservedClinicalGrant } from '../jpeg-r001/grant'
import { R001_LIMITS } from '../jpeg-r001/inspect'
import { retrieveReservedUploadThingBytes } from '../jpeg-r001/retrieve'
import type { ObjectStorage } from '../object-storage/contract'
import type { TenantContext } from '@/platform/organizations'
import { acquireS001Admission } from './admission'
import { validateClinicalJpegS001Bytes, type ValidatedClinicalJpegS001 } from './core'
import { getS001CodecIdentity, S001Unavailable } from './identity'
import { S001_CODEC_MANIFEST } from './manifest'

export type { ValidatedClinicalJpegS001 } from './core'

const retained = new WeakMap<ValidatedClinicalJpegS001, Readonly<{
  grant: ReservedClinicalGrant
  original: Buffer
  validatedAtEpochMs: number
}>>()
const sha256 = (bytes: Buffer): string => createHash('sha256').update(bytes).digest('hex')

/** For a later separately authorized finalizer; never serialize this state. */
export function getRetainedS001Context(result: ValidatedClinicalJpegS001): Readonly<{
  grant: ReservedClinicalGrant
  original: Buffer
  validatedAtEpochMs: number
}> {
  const context = retained.get(result)
  if (!context || !Number.isSafeInteger(context.validatedAtEpochMs) ||
    context.original.length !== result.encodedBytes ||
    sha256(context.original) !== result.sha256) throw new S001Unavailable()
  return context
}

/** Server-only grant/provider orchestration. No evidence, transition, or attachment. */
export async function validateReservedClinicalJpegS001(uploadGrantId: string,
  signal?: AbortSignal): Promise<ValidatedClinicalJpegS001> {
  let release: (() => void) | undefined
  try {
    if (signal?.aborted) throw new S001Unavailable()
    const grant = await resolveReservedClinicalGrant(uploadGrantId)
    if (signal?.aborted) throw new S001Unavailable()
    release = acquireS001Admission()
    // Preserve identity-before-provider ordering. The byte core independently
    // invokes the same cached production identity gate.
    const { runtimeSha256 } = await getS001CodecIdentity()
    if (runtimeSha256 !== S001_CODEC_MANIFEST.librarySha256 || signal?.aborted) throw new S001Unavailable()
    const original = await retrieveReservedUploadThingBytes(grant.providerFileKey, signal)
    const result = await validateClinicalJpegS001Bytes(original, signal)
    if (signal?.aborted) throw new S001Unavailable()
    const validatedAtEpochMs = Date.now()
    if (!Number.isSafeInteger(validatedAtEpochMs)) throw new S001Unavailable()
    retained.set(result, Object.freeze({ grant, original, validatedAtEpochMs }))
    return result
  } catch {
    throw new S001Unavailable()
  } finally {
    release?.()
  }
}

/** Case object-storage composition; the caller supplies the authenticated tenant. */
export async function validateReservedObjectStorageClinicalJpegS001(
	uploadGrantId: string,
	tenant: TenantContext,
	storage: ObjectStorage,
	signal?: AbortSignal,
	expectedCaseId?: string,
): Promise<ValidatedClinicalJpegS001> {
	let release: (() => void) | undefined
	try {
		if (signal?.aborted) throw new S001Unavailable()
		const grant = await resolveReservedClinicalGrant(uploadGrantId, undefined,
			{ provider: 'OBJECT_STORAGE', tenant })
		if (expectedCaseId !== undefined && grant.caseId !== expectedCaseId) throw new S001Unavailable()
		if (signal?.aborted) throw new S001Unavailable()
		release = acquireS001Admission()
		const { runtimeSha256 } = await getS001CodecIdentity()
		if (runtimeSha256 !== S001_CODEC_MANIFEST.librarySha256 || signal?.aborted) throw new S001Unavailable()
		const inspection = await storage.inspect(grant.providerFileKey, signal)
		if (!inspection.ok || inspection.value.presence !== 'PRESENT' ||
			inspection.value.bytes <= 0 || inspection.value.bytes > R001_LIMITS.encodedBytes) throw new S001Unavailable()
		const retrieved = await storage.retrieve({ key: grant.providerFileKey,
			maxBytes: R001_LIMITS.encodedBytes, signal })
		if (!retrieved.ok || retrieved.value.length !== inspection.value.bytes ||
			signal?.aborted) throw new S001Unavailable()
		const original = Buffer.from(retrieved.value)
		const result = await validateClinicalJpegS001Bytes(original, signal)
		if (signal?.aborted) throw new S001Unavailable()
		const validatedAtEpochMs = Date.now()
		if (!Number.isSafeInteger(validatedAtEpochMs)) throw new S001Unavailable()
		retained.set(result, Object.freeze({ grant, original, validatedAtEpochMs }))
		return result
	} catch { throw new S001Unavailable() }
	finally { release?.() }
}
