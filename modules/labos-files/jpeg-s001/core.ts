import 'server-only'

import { createHash } from 'node:crypto'

import { inspectR001, R001_LIMITS } from '../jpeg-r001/inspect'
import { getS001CodecIdentity, S001Unavailable } from './identity'
import { S001_CODEC_MANIFEST } from './manifest'

export type ValidatedClinicalJpegS001 = Readonly<{
  validationProfile: typeof S001_CODEC_MANIFEST.profile
  validatorVersion: typeof S001_CODEC_MANIFEST.validatorVersion
  codecBackend: typeof S001_CODEC_MANIFEST.backend
  codecPackageVersion: typeof S001_CODEC_MANIFEST.packageVersion
  codecLibraryVersion: typeof S001_CODEC_MANIFEST.libraryVersion
  codecRuntimeSha256: string
  encodedBytes: number
  sha256: string
  width: number
  height: number
  sourceComponents: 1 | 3
  isProgressive: boolean
}>

const sha256 = (bytes: Buffer): string => createHash('sha256').update(bytes).digest('hex')

/** Validate only an already-authoritative original encoded Buffer. No grant context is retained. */
export async function validateClinicalJpegS001Bytes(
  original: Buffer,
  signal?: AbortSignal,
): Promise<ValidatedClinicalJpegS001> {
  try {
    if (!Buffer.isBuffer(original) || original.length === 0 ||
      original.length > R001_LIMITS.encodedBytes || signal?.aborted) throw new S001Unavailable()
    const { codec, runtimeSha256 } = await getS001CodecIdentity()
    if (runtimeSha256 !== S001_CODEC_MANIFEST.librarySha256 || signal?.aborted) throw new S001Unavailable()
    const structure = inspectR001(original, signal)
    const digest = sha256(original)
    if (!/^[0-9a-f]{64}$/.test(digest) || signal?.aborted) throw new S001Unavailable()
    const decoded = codec.decompressSync(original, {
      format: structure.components === 1 ? codec.FORMAT_GRAY : codec.FORMAT_RGB,
    })
    const channels = structure.components === 1 ? 1 : 3
    const expectedBytes = structure.width * structure.height * channels
    if (!Number.isSafeInteger(expectedBytes) || expectedBytes <= 0 ||
      decoded.width !== structure.width || decoded.height !== structure.height ||
      decoded.format !== (structure.components === 1 ? codec.FORMAT_GRAY : codec.FORMAT_RGB) ||
      decoded.size !== expectedBytes || !Buffer.isBuffer(decoded.data) ||
      decoded.data.length !== expectedBytes || signal?.aborted) throw new S001Unavailable()
    if (sha256(original) !== digest) throw new S001Unavailable()
    return Object.freeze({
      validationProfile: S001_CODEC_MANIFEST.profile,
      validatorVersion: S001_CODEC_MANIFEST.validatorVersion,
      codecBackend: S001_CODEC_MANIFEST.backend,
      codecPackageVersion: S001_CODEC_MANIFEST.packageVersion,
      codecLibraryVersion: S001_CODEC_MANIFEST.libraryVersion,
      codecRuntimeSha256: runtimeSha256,
      encodedBytes: original.length,
      sha256: digest,
      width: structure.width,
      height: structure.height,
      sourceComponents: structure.components,
      isProgressive: structure.progressive,
    })
  } catch {
    throw new S001Unavailable()
  }
}
