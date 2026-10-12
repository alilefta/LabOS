import { createHash, randomBytes } from 'node:crypto'
import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { performance } from 'node:perf_hooks'

import { validateClinicalJpegS001Bytes } from '../../../modules/labos-files/jpeg-s001/core'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const instance = randomBytes(6).toString('hex')
const bootMs = Date.now()
const fixtureNames = new Set(['baseline', 'progressive', 'grayscale', 'trailing_bytes', 'short_entropy_eoi'])
const packageRequire = createRequire(import.meta.url)

async function artifact(name: 'node-napi-v10.node' | 'libturbojpeg.so.0') {
  try {
    const root = dirname(packageRequire.resolve('@julusian/jpeg-turbo'))
    const path = await realpath(join(root, 'prebuilds', 'jpeg-turbo-linux-x64', name))
    const bytes = await readFile(path)
    return { present: true, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') }
  } catch { return { present: false } }
}

function environment() {
  return { platform: process.platform, arch: process.arch, node: process.version,
    napi: process.versions.napi ?? null, instance, bootMs }
}

export async function GET(request: Request) {
  const fixture = new URL(request.url).searchParams.get('fixture')
  const common = { environment: environment(), rssBefore: process.memoryUsage().rss,
    maxRssBefore: process.resourceUsage().maxRSS }
  if (fixture === 'inventory') return Response.json({ ...common,
    addon: await artifact('node-napi-v10.node'), library: await artifact('libturbojpeg.so.0') },
    { headers: { 'Cache-Control': 'no-store' } })
  if (!fixture || !fixtureNames.has(fixture))
    return Response.json({ error: 'unsupported' }, { status: 404, headers: { 'Cache-Control': 'no-store' } })
  const start = performance.now()
  let encodedBytes = 0
  try {
    const original = await readFile(join(process.cwd(), 'fixtures', `${fixture}.jpg`))
    encodedBytes = original.length
    const beforeCore = performance.now()
    const result = await validateClinicalJpegS001Bytes(original)
    const afterCore = performance.now()
    return Response.json({ ...common, fixture, outcome: 'accepted', result,
      derivedOutputBytes: result.width * result.height * result.sourceComponents,
      encodedBytes, coreMs: Math.round((afterCore - beforeCore) * 100) / 100,
      totalMs: Math.round((afterCore - start) * 100) / 100,
      rssAfter: process.memoryUsage().rss, maxRssAfter: process.resourceUsage().maxRSS },
      { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return Response.json({ ...common, fixture, outcome: 'rejected', encodedBytes,
      totalMs: Math.round((performance.now() - start) * 100) / 100,
      rssAfter: process.memoryUsage().rss, maxRssAfter: process.resourceUsage().maxRSS },
      { headers: { 'Cache-Control': 'no-store' } })
  }
}
