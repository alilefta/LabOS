import 'server-only'

import { createHash } from 'node:crypto'
import sharp, { type Metadata, type OutputInfo } from 'sharp'

export const CASE_IMAGE_V1_LIMITS = Object.freeze({
  encodedBytes: 33_554_432,
  axisPixels: 9_000,
  decodedPixels: 50_000_000,
  decodedBytes: 200_000_000,
  concurrentValidations: 1,
})

export type CaseImageV1Format = 'PNG' | 'WEBP'
export type CaseImageV1Suffix = '.png' | '.webp'
export type VerifiedCaseImageV1 = Readonly<{
  verifiedFormat: CaseImageV1Format
  verifiedMime: 'image/png' | 'image/webp'
  validatedSuffix: CaseImageV1Suffix
  encodedBytes: number
  width: number
  height: number
  sha256: string
  validatorRelease: 'CASE_PNG_V1_SHARP_1' | 'CASE_WEBP_V1_SHARP_1'
  decoder: 'SHARP_LIBVIPS'
  sharpVersion: '0.35.4'
  libvipsVersion: string
}>

/** Known policy or content failure. Neither error class carries image data. */
export class CaseImageV1Rejected extends Error {
  constructor() { super('Case image rejected') }
}

/** Native runtime, resource or cancellation outcome that is not definitive content evidence. */
export class CaseImageV1Unavailable extends Error {
  constructor() { super('Case image validation unavailable') }
}

const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
const admissionKey = Symbol.for('labos.files.case-image-v1.active')
const slots = globalThis as unknown as { [key: symbol]: { occupied: boolean } | undefined }
const slot = slots[admissionKey] ??= { occupied: false }

function acquire(): () => void {
  if (slot.occupied) throw new CaseImageV1Unavailable()
  slot.occupied = true
  return () => { slot.occupied = false }
}

function identify(bytes: Buffer): CaseImageV1Format {
  if (bytes.length >= 8 && bytes.subarray(0, 8).equals(pngSignature)) return 'PNG'
  if (bytes.length >= 12 && bytes.toString('ascii', 0, 4) === 'RIFF' &&
      bytes.toString('ascii', 8, 12) === 'WEBP') return 'WEBP'
  throw new CaseImageV1Rejected()
}

// These two small chunk walks only detect animation. Sharp remains responsible
// for image decoding and format validity; these are not conformance parsers.
function rejectAnimation(bytes: Buffer, format: CaseImageV1Format): void {
  if (format === 'PNG') {
    // libvips may report an 8-bit working depth after loading a 16-bit PNG.
    // The original IHDR sample depth is the approved-policy fact.
    if (bytes.length < 33 || bytes.toString('ascii', 12, 16) !== 'IHDR' ||
        bytes.readUInt32BE(8) !== 13 || bytes[24] !== 8 &&
        !(bytes[25] === 3 && [1, 2, 4].includes(bytes[24]!))) {
      throw new CaseImageV1Rejected()
    }
    let at = 8
    while (at + 12 <= bytes.length) {
      const length = bytes.readUInt32BE(at)
      const end = at + 12 + length
      if (end > bytes.length) throw new CaseImageV1Rejected()
      const tag = bytes.toString('ascii', at + 4, at + 8)
      if (tag === 'acTL' || tag === 'fcTL' || tag === 'fdAT') throw new CaseImageV1Rejected()
      at = end
      if (tag === 'IEND') {
        if (length !== 0 || end !== bytes.length) throw new CaseImageV1Rejected()
        return
      }
    }
    throw new CaseImageV1Rejected()
  }
  const riffEnd = Math.min(bytes.length, bytes.readUInt32LE(4) + 8)
  if (bytes.readUInt32LE(4) + 8 > bytes.length) throw new CaseImageV1Rejected()
  let at = 12
  while (at + 8 <= riffEnd) {
    const tag = bytes.toString('ascii', at, at + 4)
    const length = bytes.readUInt32LE(at + 4)
    const end = at + 8 + length + (length & 1)
    if (end > riffEnd) throw new CaseImageV1Rejected()
    if (tag === 'ANIM' || tag === 'ANMF' ||
        (tag === 'VP8X' && length >= 1 && (bytes[at + 8]! & 0x02) !== 0)) {
      throw new CaseImageV1Rejected()
    }
    at = end
  }
  if (at !== riffEnd) throw new CaseImageV1Rejected()
}

/** Pure byte validation; no provider, grant, persistence or JPEG lifecycle access. */
export async function validateCaseImageV1Bytes(
  original: Buffer,
  checkedSuffix: string,
  signal?: AbortSignal,
): Promise<VerifiedCaseImageV1> {
  if (!Buffer.isBuffer(original) || original.length === 0 ||
      original.length > CASE_IMAGE_V1_LIMITS.encodedBytes || signal?.aborted) {
    throw signal?.aborted ? new CaseImageV1Unavailable() : new CaseImageV1Rejected()
  }
  const format = identify(original)
  const validatedSuffix: CaseImageV1Suffix = format === 'PNG' ? '.png' : '.webp'
  if (checkedSuffix !== validatedSuffix) throw new CaseImageV1Rejected()
  const release = acquire()
  try {
    const bytes = Buffer.from(original)
    rejectAnimation(bytes, format)
    if (!sharp.format.png.input.buffer || !sharp.format.webp.input.buffer ||
        sharp.versions.sharp !== '0.35.4' || !sharp.versions.vips) {
      throw new CaseImageV1Unavailable()
    }
    const options = { failOn: 'warning' as const, limitInputPixels: CASE_IMAGE_V1_LIMITS.axisPixels ** 2,
      sequentialRead: true, animated: false, pages: 1 }
    let metadata: Metadata
    // A native failure is ambiguous: it can be corrupt content or a transient
    // decoder/resource failure. Only deterministic policy checks reject.
    try { metadata = await sharp(bytes, options).metadata() }
    catch { throw new CaseImageV1Unavailable() }
    if (signal?.aborted) throw new CaseImageV1Unavailable()
    const width = metadata.width
    const height = metadata.height
    if (metadata.format !== format.toLowerCase() || !width || !height ||
        !Number.isSafeInteger(width) || !Number.isSafeInteger(height) ||
        width > CASE_IMAGE_V1_LIMITS.axisPixels || height > CASE_IMAGE_V1_LIMITS.axisPixels ||
        width * height > CASE_IMAGE_V1_LIMITS.decodedPixels ||
        (metadata.pages !== undefined && metadata.pages !== 1) ||
        (format === 'PNG' && metadata.bitsPerSample !== undefined && metadata.bitsPerSample !== 8 &&
          !(metadata.isPalette && [1, 2, 4].includes(metadata.bitsPerSample)))) {
      throw new CaseImageV1Rejected()
    }
    // A raw output forces complete pixel decoding. At most 50M pixels and four
    // 8-bit channels can be materialized; the output is discarded, never stored.
    let decoded: { data: Buffer; info: OutputInfo }
    try { decoded = await sharp(bytes, { ...options,
      limitInputPixels: CASE_IMAGE_V1_LIMITS.decodedPixels }).raw({ depth: 'uchar' })
      .toBuffer({ resolveWithObject: true }) }
    catch { throw new CaseImageV1Unavailable() }
    if (signal?.aborted) throw new CaseImageV1Unavailable()
    const { info, data } = decoded
    if (info.width !== width || info.height !== height ||
        !Number.isSafeInteger(info.channels) || info.channels < 1 || info.channels > 4 ||
        data.length !== width * height * info.channels ||
        data.length > CASE_IMAGE_V1_LIMITS.decodedBytes) throw new CaseImageV1Unavailable()
    const digest = createHash('sha256').update(bytes).digest('hex')
    return Object.freeze({
      verifiedFormat: format,
      verifiedMime: format === 'PNG' ? 'image/png' : 'image/webp',
      validatedSuffix,
      encodedBytes: bytes.length,
      width, height, sha256: digest,
      validatorRelease: format === 'PNG' ? 'CASE_PNG_V1_SHARP_1' : 'CASE_WEBP_V1_SHARP_1',
      decoder: 'SHARP_LIBVIPS',
      sharpVersion: '0.35.4',
      libvipsVersion: sharp.versions.vips,
    })
  } catch (error) {
    if (error instanceof CaseImageV1Rejected || error instanceof CaseImageV1Unavailable) throw error
    throw new CaseImageV1Unavailable()
  } finally { release() }
}
