import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const dir = new URL('../fixtures/', import.meta.url)
const base = await readFile(new URL('baseline.jpg', dir))
const progressive = await readFile(new URL('progressive.jpg', dir))
const sof = base.indexOf(Buffer.from([0xff, 0xc0]))
if (sof < 0) throw new Error('missing SOF')
const segment = (marker, payload) => {
  const out = Buffer.alloc(payload + 4)
  out[0] = 255; out[1] = marker; out.writeUInt16BE(payload + 2, 2)
  return out
}
const inject = (source, parts) => Buffer.concat([source.subarray(0, 2), ...parts, source.subarray(2)])
const dimensions = (w, h) => {
  const out = Buffer.from(base)
  out.writeUInt16BE(h, sof + 5); out.writeUInt16BE(w, sof + 7)
  return out
}
const corpus = new Map()
const add = (name, bytes, expectedStage) => corpus.set(name, { bytes, expectedStage })
add('missing_eoi', base.subarray(0, -2), 'structure')
add('premature_eoi', Buffer.concat([base.subarray(0, -22), base.subarray(-2)]), 'decode')
add('concatenated', Buffer.concat([base, base]), 'structure')
add('width_9000_header', dimensions(9000, 5555), 'decode')
add('width_9001', dimensions(9001, 5555), 'structure')
add('height_9000_header', dimensions(5555, 9000), 'decode')
add('height_9001', dimensions(5555, 9001), 'structure')
add('pixels_50m_header', dimensions(8000, 6250), 'decode')
add('pixels_50m_plus1', dimensions(8000, 6251), 'structure')
const metaParts = [segment(226, 65000), segment(227, 65000), segment(228, 65000), segment(229, 65000), segment(254, 2144)]
add('metadata_exact', inject(base, metaParts), 'pass')
add('metadata_plus1', inject(base, [...metaParts, segment(254, 1)]), 'structure')
// The parser's base count is measured from the existing accepted inspector in the runner.
const baseSegments = 8
add('segments_exact', inject(base, Array.from({ length: 512 - baseSegments }, () => segment(254, 0))), 'pass')
add('segments_plus1', inject(base, Array.from({ length: 513 - baseSegments }, () => segment(254, 0))), 'structure')
const scanMarker = Buffer.from([255, 218, 0, 8, 1, 1, 0, 0, 0, 0])
const progressiveOriginalScans = 10
const scans = (count) => Buffer.concat([progressive.subarray(0, -2), ...Array.from({ length: count - progressiveOriginalScans }, () => scanMarker), progressive.subarray(-2)])
add('scans_128_header', scans(128), 'decode')
add('scans_129', scans(129), 'structure')
const padded = Buffer.concat([base.subarray(0, -2), Buffer.alloc(33_554_432 - base.length), base.subarray(-2)])
add('encoded_exact_header', padded, 'decode')
add('encoded_plus1', Buffer.concat([padded, Buffer.from([0])]), 'structure')

const largeUniform = await sharp({ create: { width: 8000, height: 6250, channels: 3, background: '#447799' } }).jpeg({ quality: 80, progressive: false }).toBuffer()
add('large_50m_uniform', largeUniform, 'pass')
add('valid_width_9000', await sharp({ create: { width: 9000, height: 5555, channels: 3, background: '#447799' } }).jpeg({ quality: 80, progressive: false }).toBuffer(), 'pass')
add('valid_height_9000', await sharp({ create: { width: 5555, height: 9000, channels: 3, background: '#447799' } }).jpeg({ quality: 80, progressive: false }).toBuffer(), 'pass')
const pixels = Buffer.allocUnsafe(4000 * 3000 * 3)
let state = 0x9e3779b9
for (let i = 0; i < pixels.length; i++) { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; pixels[i] = state & 255 }
const highEntropy = await sharp(pixels, { raw: { width: 4000, height: 3000, channels: 3 } }).jpeg({ quality: 85, progressive: true }).toBuffer()
add('large_12m_progressive_entropy', highEntropy, 'pass')
const nearPixels = Buffer.allocUnsafe(6000 * 6000 * 3)
state = 0x85ebca6b
for (let i = 0; i < nearPixels.length; i++) { state ^= state << 13; state ^= state >>> 17; state ^= state << 5; nearPixels[i] = state & 255 }
const nearCeiling = await sharp(nearPixels, { raw: { width: 6000, height: 6000, channels: 3 } }).jpeg({ quality: 88, progressive: false }).toBuffer()
if (nearCeiling.length > 33_554_432) throw new Error('near-ceiling fixture oversize')
add('large_36m_entropy_near_limit', nearCeiling, 'pass')

const manifest = {}
for (const [name, { bytes, expectedStage }] of corpus) {
  await writeFile(new URL(`${name}.jpg`, dir), bytes)
  manifest[name] = { bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), expectedStage }
}
await writeFile(join(fileURLToPath(dir), 'conformance-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
process.stdout.write(JSON.stringify({ count: corpus.size, manifest }) + '\n')
