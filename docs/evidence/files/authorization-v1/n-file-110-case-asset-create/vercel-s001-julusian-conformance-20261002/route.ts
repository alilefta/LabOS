import { createHash, randomBytes } from 'node:crypto'
import { readFile, stat } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'
import { performance } from 'node:perf_hooks'
import { inspectR001, R001_LIMITS } from '../../../inspect'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const fixtureNames = new Set([
  'baseline', 'progressive', 'grayscale', 'truncated', 'short_entropy_eoi',
  'corrupt_entropy', 'trailing_bytes', 'missing_eoi', 'premature_eoi',
  'concatenated', 'width_9000_header', 'width_9001', 'height_9000_header',
  'height_9001', 'pixels_50m_header', 'pixels_50m_plus1', 'metadata_exact',
  'metadata_plus1', 'segments_exact', 'segments_plus1', 'scans_128_header',
  'scans_129', 'encoded_exact_header', 'encoded_plus1', 'large_50m_uniform',
  'valid_width_9000', 'valid_height_9000',
  'large_12m_progressive_entropy',
  'large_36m_entropy_near_limit',
])
type Turbo = typeof import('@julusian/jpeg-turbo')
const requirePackage = createRequire(import.meta.url)
let turbo: Turbo | undefined
const instance = randomBytes(6).toString('hex')

const mb = (bytes: number) => Math.round(bytes / 1024 / 1024 * 100) / 100
const mem = () => ({ rssMiB: mb(process.memoryUsage().rss), externalMiB: mb(process.memoryUsage().external), arrayBuffersMiB: mb(process.memoryUsage().arrayBuffers), peakRssMiB: mb(process.resourceUsage().maxRSS * 1024) })
async function filePresent(relative: string) {
  try { const s = await stat(join(process.cwd(), 'node_modules', relative)); return { present: s.isFile(), bytes: s.size } }
  catch { return { present: false, bytes: 0 } }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const name = url.searchParams.get('fixture')
  const environment = { platform: process.platform, arch: process.arch, node: process.version,
    napi: process.versions.napi ?? null, glibc: (process.report?.getReport() as { header?: { glibcVersionRuntime?: string } })?.header?.glibcVersionRuntime ?? null,
    instance }
  if (name === 'inventory') {
    return Response.json({ environment, memory: mem(), artifacts: {
      addon: await filePresent('@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/node-napi-v10.node'),
      turbojpeg: await filePresent('@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/libturbojpeg.so.0'),
    } }, { headers: { 'Cache-Control': 'no-store' } })
  }
  if (!name || !fixtureNames.has(name)) return Response.json({ error: 'unsupported' }, { status: 404 })
  let original: Buffer
  try { original = await readFile(join(process.cwd(), 'fixtures', `${name}.jpg`)) }
  catch { return Response.json({ error: 'unavailable' }, { status: 503 }) }
  const before = mem()
  const started = performance.now()
  let sha256: string | null = null
  let inspectMs = 0, loadMs = 0, decodeMs = 0
  let stage: 'accepted' | 'structure_reject' | 'decode_reject' = 'structure_reject'
  let structure: ReturnType<typeof inspectR001> | undefined
  let outputBytes: number | null = null
  try {
    const t = performance.now()
    try { structure = inspectR001(original) }
    finally { inspectMs = performance.now() - t }
    if (original.length > R001_LIMITS.encodedBytes) throw new Error('structure')
    sha256 = createHash('sha256').update(original).digest('hex')
    stage = 'decode_reject'
    if (!turbo) {
      const l = performance.now()
      try { turbo = requirePackage('@julusian/jpeg-turbo') as Turbo }
      finally { loadMs = performance.now() - l }
    }
    const d = performance.now()
    let decoded: ReturnType<Turbo['decompressSync']>
    try { decoded = turbo.decompressSync(original, { format: structure.components === 1 ? turbo.FORMAT_GRAY : turbo.FORMAT_RGB }) }
    finally { decodeMs = performance.now() - d }
    const channels = structure.components === 1 ? 1 : 3
    if (decoded.width !== structure.width || decoded.height !== structure.height ||
      decoded.data.length !== structure.width * structure.height * channels) throw new Error('mismatch')
    if (createHash('sha256').update(original).digest('hex') !== sha256) throw new Error('mutated-input')
    outputBytes = decoded.data.length
    stage = 'accepted'
  } catch {
    // Never disclose native diagnostics, image data, or internal paths.
  }
  return Response.json({ environment, profile: 'JPEG_CLINICAL_V1_S001', backend: 'JULUSIAN_TURBOJPEG',
    packageVersion: '3.0.1', fixture: name, encodedBytes: original.length, sha256,
    stage, structure: structure ?? null, outputBytes, loadMs, inspectMs, decodeMs,
    totalMs: performance.now() - started, before, after: mem() }, { headers: { 'Cache-Control': 'no-store' } })
}
