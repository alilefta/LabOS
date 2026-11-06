import { createHash } from 'node:crypto'
import { deflateSync } from 'node:zlib'
import sharp from 'sharp'
import { describe, expect, it, vi } from 'vitest'
import { CASE_IMAGE_V1_LIMITS, CaseImageV1Rejected, CaseImageV1Unavailable,
  validateCaseImageV1Bytes } from '@/modules/labos-files/case-image-v1/validate'

const digest = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')
const picture = (alpha = false) => sharp({ create: { width: 3, height: 2,
  channels: alpha ? 4 : 3, background: { r: 24, g: 60, b: 90, alpha: alpha ? 0.4 : 1 } } })

function crc32(bytes: Buffer): number {
  let crc = 0xffffffff
  for (const byte of bytes) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0)
  }
  return (crc ^ 0xffffffff) >>> 0
}

function pngChunk(tag: string, data: Buffer): Buffer {
  const length = Buffer.alloc(4); length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(tag, 'ascii'), data])
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

function palettePng(): Buffer {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(2, 0); ihdr.writeUInt32BE(1, 4)
  ihdr[8] = 1; ihdr[9] = 3 // 1-bit palette indices
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', ihdr), pngChunk('PLTE', Buffer.from([255, 0, 0, 0, 0, 255])),
    pngChunk('IDAT', deflateSync(Buffer.from([0, 0b01000000]))), pngChunk('IEND', Buffer.alloc(0))])
}

function sixteenBitPng(): Buffer {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(1, 0); ihdr.writeUInt32BE(1, 4)
  ihdr[8] = 16; ihdr[9] = 2 // 16-bit RGB
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    pngChunk('IHDR', ihdr), pngChunk('IDAT', deflateSync(Buffer.alloc(7))),
    pngChunk('IEND', Buffer.alloc(0))])
}

function corruptPixelData(png: Buffer): Buffer {
  const at = png.indexOf(Buffer.from('IDAT'))
  const length = png.readUInt32BE(at - 4)
  return Buffer.concat([png.subarray(0, at - 4),
    pngChunk('IDAT', Buffer.alloc(length)), png.subarray(at + 4 + length + 4)])
}

const twoFrameGif = Buffer.from(
  '47494638396101000100800000ffffff00000021f90401000000002c0000000001000100000202440100' +
  '21f90401000000002c00000000010001000002024c01003b', 'hex')

describe('standalone Case PNG/WebP V1 byte validator', () => {
  it('fully decodes static PNG and hashes unchanged original bytes', async () => {
    const bytes = await picture().png().toBuffer()
    expect(bytes.subarray(-12).equals(pngChunk('IEND', Buffer.alloc(0)))).toBe(true)
    const result = await validateCaseImageV1Bytes(bytes, '.png')
    expect(result).toMatchObject({ verifiedFormat: 'PNG', verifiedMime: 'image/png',
      validatedSuffix: '.png', width: 3, height: 2, encodedBytes: bytes.length,
      sha256: digest(bytes), validatorRelease: 'CASE_PNG_V1_SHARP_1',
      decoder: 'SHARP_LIBVIPS', sharpVersion: '0.35.4' })
    expect(Object.isFrozen(result)).toBe(true)
    expect(bytes.equals(await picture().png().toBuffer())).toBe(true)
  })

  it('requires a zero-length final IEND with no appended bytes', async () => {
    const png = await picture().png().toBuffer()
    const iend = pngChunk('IEND', Buffer.alloc(0))
    const beforeIend = png.subarray(0, -iend.length)
    const cases = [
      Buffer.concat([png, Buffer.from('appended')]),
      Buffer.concat([beforeIend, pngChunk('IEND', Buffer.from([0]))]),
      beforeIend,
    ]
    for (const bytes of cases) {
      await expect(validateCaseImageV1Bytes(bytes, '.png')).rejects.toBeInstanceOf(CaseImageV1Rejected)
    }
  })

  it.each([false, true])('accepts static WebP with lossless=%s', async lossless => {
    const bytes = await picture().webp({ lossless }).toBuffer()
    expect(await validateCaseImageV1Bytes(bytes, '.webp')).toMatchObject({
      verifiedFormat: 'WEBP', verifiedMime: 'image/webp', width: 3, height: 2,
      sha256: digest(bytes), validatorRelease: 'CASE_WEBP_V1_SHARP_1' })
  })

  it('accepts transparency, extended static WebP and indexed 1-bit PNG', async () => {
    const png = await picture(true).png().toBuffer()
    const webp = await picture(true).webp({ lossless: false }).toBuffer()
    expect(webp.toString('ascii').includes('VP8X')).toBe(true)
    expect((await validateCaseImageV1Bytes(png, '.png')).width).toBe(3)
    expect((await validateCaseImageV1Bytes(webp, '.webp')).height).toBe(2)
    expect((await validateCaseImageV1Bytes(palettePng(), '.png')).width).toBe(2)
  })

  it('rejects APNG and real animated WebP', async () => {
    const png = await picture().png().toBuffer()
    const apng = Buffer.concat([png.subarray(0, 33),
      pngChunk('acTL', Buffer.from([0, 0, 0, 2, 0, 0, 0, 0])), png.subarray(33)])
    const webp = await sharp(twoFrameGif, { animated: true }).webp({ loop: 0 }).toBuffer()
    expect((await sharp(webp, { animated: true }).metadata()).pages).toBe(2)
    await expect(validateCaseImageV1Bytes(apng, '.png')).rejects.toBeInstanceOf(CaseImageV1Rejected)
    await expect(validateCaseImageV1Bytes(webp, '.webp')).rejects.toBeInstanceOf(CaseImageV1Rejected)
  })

  it('denies wrong suffix, unsupported signature and claimed-MIME text', async () => {
    const png = await picture().png().toBuffer()
    await expect(validateCaseImageV1Bytes(png, '.webp')).rejects.toBeInstanceOf(CaseImageV1Rejected)
    await expect(validateCaseImageV1Bytes(Buffer.from('image/png'), '.png')).rejects.toBeInstanceOf(CaseImageV1Rejected)
    await expect(validateCaseImageV1Bytes(png, 'JPEG')).rejects.toBeInstanceOf(CaseImageV1Rejected)
  })

  it('does not accept missing, oversized, malformed or truncated content', async () => {
    const png = await picture().png().toBuffer()
    for (const bytes of [Buffer.alloc(0), Buffer.alloc(CASE_IMAGE_V1_LIMITS.encodedBytes + 1),
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), png.subarray(0, 40)]) {
      await expect(validateCaseImageV1Bytes(bytes, '.png')).rejects.toThrow()
    }
  })

  it('keeps a decoder failure retryable when content and runtime causes cannot be distinguished', async () => {
    const bytes = corruptPixelData(await picture().png().toBuffer())
    await expect(validateCaseImageV1Bytes(bytes, '.png')).rejects.toBeInstanceOf(CaseImageV1Unavailable)
  })

  it('never returns verified evidence after a native memory failure', async () => {
    const bytes = await picture().png().toBuffer()
    const decoder = vi.spyOn(sharp.prototype, 'toBuffer')
      .mockRejectedValueOnce(new Error('simulated native memory allocation failure'))
    try {
      await expect(validateCaseImageV1Bytes(bytes, '.png')).rejects.toBeInstanceOf(CaseImageV1Unavailable)
    } finally { decoder.mockRestore() }
    expect((await validateCaseImageV1Bytes(bytes, '.png')).sha256).toBe(digest(bytes))
  })

  it('enforces axis, pixel and 16-bit PNG limits', async () => {
    const wide = await sharp({ create: { width: 9001, height: 1, channels: 3,
      background: '#000000' } }).png().toBuffer()
    await expect(validateCaseImageV1Bytes(wide, '.png')).rejects.toBeInstanceOf(CaseImageV1Rejected)
    const pixels = await sharp({ create: { width: 8000, height: 6251, channels: 3,
      background: '#000000' } }).png().toBuffer()
    await expect(validateCaseImageV1Bytes(pixels, '.png')).rejects.toBeInstanceOf(CaseImageV1Rejected)
    await expect(validateCaseImageV1Bytes(sixteenBitPng(), '.png')).rejects.toBeInstanceOf(CaseImageV1Rejected)
  })

  it('admits one decode at a time and releases admission', async () => {
    const bytes = await picture(true).png().toBuffer()
    const first = validateCaseImageV1Bytes(bytes, '.png')
    await expect(validateCaseImageV1Bytes(bytes, '.png')).rejects.toBeInstanceOf(CaseImageV1Unavailable)
    await first
    const abort = new AbortController(); abort.abort()
    await expect(validateCaseImageV1Bytes(bytes, '.png', abort.signal)).rejects.toBeInstanceOf(CaseImageV1Unavailable)
    await expect(validateCaseImageV1Bytes(bytes, '.png')).resolves.toHaveProperty('width', 3)
  })

  it('runs a bounded larger RGBA resource smoke', async () => {
    const bytes = await sharp({ create: { width: 4096, height: 4096, channels: 4,
      background: { r: 30, g: 60, b: 90, alpha: 0.5 } } }).png().toBuffer()
    const before = process.memoryUsage().rss
    let peak = before
    const sample = setInterval(() => { peak = Math.max(peak, process.memoryUsage().rss) }, 2)
    const start = performance.now()
    let result: Awaited<ReturnType<typeof validateCaseImageV1Bytes>>
    try { result = await validateCaseImageV1Bytes(bytes, '.png') }
    finally { clearInterval(sample) }
    const elapsedMs = Math.round(performance.now() - start)
    peak = Math.max(peak, process.memoryUsage().rss)
    const peakRssMiB = Math.round(peak / 1048576)
    const peakDeltaMiB = Math.round((peak - before) / 1048576)
    expect(result).toMatchObject({ width: 4096, height: 4096, sha256: digest(bytes) })
    expect(bytes.length).toBeLessThan(CASE_IMAGE_V1_LIMITS.encodedBytes)
    console.info(`CASE_IMAGE_V1_SMOKE encoded=${bytes.length} decodedMax=67108864 ` +
      `elapsedMs=${elapsedMs} peakRssMiB=${peakRssMiB} peakDeltaMiB=${peakDeltaMiB}`)
  })
})
