import 'server-only'

import { createHash } from 'node:crypto'
import type { ReservedClinicalGrant } from '../jpeg-r001/grant'
import type { ObjectStorage } from '../object-storage/contract'
import { CASE_IMAGE_V1_LIMITS, CaseImageV1Rejected, CaseImageV1Unavailable,
  validateCaseImageV1Bytes, type VerifiedCaseImageV1 } from './validate'

const retained = new WeakMap<VerifiedCaseImageV1, Readonly<{
  grant: ReservedClinicalGrant
  original: Buffer
  validatedAtEpochMs: number
}>>()

export function getRetainedCaseImageV1Context(result: VerifiedCaseImageV1) {
  const context = retained.get(result)
  if (!context || !Number.isSafeInteger(context.validatedAtEpochMs) ||
    context.original.length !== result.encodedBytes ||
    createHash('sha256').update(context.original).digest('hex') !== result.sha256) {
    throw new CaseImageV1Unavailable()
  }
  return context
}

/** Exact private object bytes only; grant authorization precedes this call. */
export async function validateReservedObjectStorageCaseImageV1(
  grant: ReservedClinicalGrant,
  storage: ObjectStorage,
  signal?: AbortSignal,
): Promise<VerifiedCaseImageV1> {
  try {
    if (signal?.aborted || grant.provider !== 'OBJECT_STORAGE' ||
      (grant.checkedSuffix !== 'PNG' && grant.checkedSuffix !== 'WEBP')) {
      throw new CaseImageV1Unavailable()
    }
    const inspection = await storage.inspect(grant.providerFileKey, signal)
    if (!inspection.ok || inspection.value.presence !== 'PRESENT' ||
      inspection.value.bytes <= 0 || inspection.value.bytes > CASE_IMAGE_V1_LIMITS.encodedBytes) {
      throw new CaseImageV1Unavailable()
    }
    const retrieved = await storage.retrieve({ key: grant.providerFileKey,
      maxBytes: CASE_IMAGE_V1_LIMITS.encodedBytes, signal })
    if (!retrieved.ok || retrieved.value.length !== inspection.value.bytes || signal?.aborted) {
      throw new CaseImageV1Unavailable()
    }
    const original = Buffer.from(retrieved.value)
    const result = await validateCaseImageV1Bytes(original,
      grant.checkedSuffix === 'PNG' ? '.png' : '.webp', signal)
    if (signal?.aborted) throw new CaseImageV1Unavailable()
    const validatedAtEpochMs = Date.now()
    if (!Number.isSafeInteger(validatedAtEpochMs)) throw new CaseImageV1Unavailable()
    retained.set(result, Object.freeze({ grant, original, validatedAtEpochMs }))
    return result
  } catch (error) {
    if (error instanceof CaseImageV1Rejected) throw error
    throw new CaseImageV1Unavailable()
  }
}
