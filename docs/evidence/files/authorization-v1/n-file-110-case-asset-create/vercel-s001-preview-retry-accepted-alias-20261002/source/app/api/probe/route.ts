import { createHash, randomBytes } from 'node:crypto'
import { createRequire } from 'node:module'
import { readFile, readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { performance } from 'node:perf_hooks'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const requirePackage = createRequire(import.meta.url)
const instance = randomBytes(6).toString('hex')
const bootMs = Date.now()
const fixtures = new Set(['baseline', 'progressive', 'grayscale', 'truncated', 'short_entropy_eoi', 'corrupt_entropy', 'trailing_bytes'])
type Turbo = typeof import('@julusian/jpeg-turbo')
type Sharp = typeof import('sharp').default
let turbo: Turbo | undefined
let sharp: Sharp | undefined

async function artifact(relative: string) {
  try {
    const file = join(process.cwd(), 'node_modules', relative)
    const info = await stat(file)
    return { present: info.isFile(), bytes: info.size }
  } catch { return { present: false, bytes: 0 } }
}

async function nativeDirectory(relative: string) {
  try {
    const dir = join(process.cwd(), 'node_modules', relative)
    const names = (await readdir(dir)).filter((name) => name.endsWith('.node') || name.includes('.so.'))
    return await Promise.all(names.map(async (name) => ({ name, bytes: (await stat(join(dir, name))).size })))
  } catch { return [] }
}

function environment() {
  const report = process.report?.getReport() as { header?: { glibcVersionRuntime?: string } } | undefined
  return {
    platform: process.platform,
    arch: process.arch,
    node: process.version,
    napi: process.versions.napi ?? null,
    glibc: report?.header?.glibcVersionRuntime ?? null,
    instance,
    bootMs,
    uptimeMs: Math.round(process.uptime() * 1000),
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url)
  const backend = url.searchParams.get('backend')
  const fixture = url.searchParams.get('fixture')
  if (backend !== 'julusian' && backend !== 'sharp' && backend !== 'inventory')
    return Response.json({ error: 'unsupported' }, { status: 404 })
  if (backend !== 'inventory' && (!fixture || !fixtures.has(fixture)))
    return Response.json({ error: 'unsupported' }, { status: 404 })

  const common = { environment: environment(), rssBefore: process.memoryUsage().rss, peakRss: process.resourceUsage().maxRSS }
  if (backend === 'inventory') {
    return Response.json({ ...common, artifacts: {
      julusianNode: await artifact('@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/node-napi-v10.node'),
      julusianSo: await artifact('@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/libturbojpeg.so.0'),
      sharpNode: await nativeDirectory('@img/sharp-linux-x64/lib'),
      sharpLibvips: await nativeDirectory('@img/sharp-libvips-linux-x64/lib'),
    } }, { headers: { 'Cache-Control': 'no-store' } })
  }

  let bytes: Buffer
  try { bytes = await readFile(join(process.cwd(), 'fixtures', `${fixture}.jpg`)) }
  catch { return Response.json({ error: 'unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }) }
  const sha256 = createHash('sha256').update(bytes).digest('hex')
  let loadMs = 0
  let decodeMs = 0
  let result: { width: number; height: number; channels: number; outputBytes: number } | null = null
  let outcome: 'decoded' | 'load_failed' | 'decode_failed' = 'load_failed'
  try {
    if (backend === 'julusian') {
      if (!turbo) {
        const start = performance.now()
        try { turbo = requirePackage('@julusian/jpeg-turbo') as Turbo }
        finally { loadMs = performance.now() - start }
      }
      outcome = 'decode_failed'
      const start = performance.now()
      let decoded: ReturnType<Turbo['decompressSync']>
      try { decoded = turbo.decompressSync(bytes, { format: fixture === 'grayscale' ? turbo.FORMAT_GRAY : turbo.FORMAT_RGB }) }
      finally { decodeMs = performance.now() - start }
      const channels = fixture === 'grayscale' ? 1 : 3
      result = { width: decoded.width, height: decoded.height, channels, outputBytes: decoded.data.length }
    } else {
      if (!sharp) {
        const start = performance.now()
        try { sharp = requirePackage('sharp') as Sharp }
        finally { loadMs = performance.now() - start }
      }
      outcome = 'decode_failed'
      const start = performance.now()
      let decoded: Awaited<ReturnType<ReturnType<ReturnType<Sharp>['raw']>['toBuffer']>>
      try { decoded = await sharp(bytes, { failOn: 'warning', limitInputPixels: 50_000_000 }).raw().toBuffer({ resolveWithObject: true }) }
      finally { decodeMs = performance.now() - start }
      result = { width: decoded.info.width, height: decoded.info.height, channels: decoded.info.channels, outputBytes: decoded.data.length }
    }
    outcome = 'decoded'
  } catch {
    // Never return native decoder diagnostics or fixture bytes.
  }
  return Response.json({ ...common, backend, fixture, encodedBytes: bytes.length, sha256, loadMs, decodeMs, outcome, result, rssAfter: process.memoryUsage().rss, peakRssAfter: process.resourceUsage().maxRSS }, { headers: { 'Cache-Control': 'no-store' } })
}
