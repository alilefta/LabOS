import { createHash, randomBytes } from 'node:crypto'
import { readFile, realpath } from 'node:fs/promises'
import { basename, dirname, join } from 'node:path'
import { performance } from 'node:perf_hooks'

import { validateClinicalJpegS001Bytes } from '../../../modules/labos-files/jpeg-s001/core'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

const instance = randomBytes(6).toString('hex')
const bootMs = Date.now()
const fixtures = new Set(['baseline', 'progressive', 'grayscale', 'trailing_bytes'])
const sha256 = (bytes: Buffer) => createHash('sha256').update(bytes).digest('hex')

function environment() {
  return { platform: process.platform, architecture: process.arch,
    node: process.version, napi: process.versions.napi ?? null, instance, bootMs }
}

// Corroboration only, after the production core has independently accepted identity.
// No mapped pathname or raw maps text enters the response.
async function postCoreNativeFacts() {
  try {
    const maps = await readFile('/proc/self/maps', 'utf8')
    const mapped = (name: string) => [...new Set(maps.split('\n').map(line => {
      const fields = line.trim().split(/\s+/)
      return fields.length >= 6 ? fields.slice(5).join(' ') : ''
    }).filter(path => path.endsWith(`/${name}`)))]
    const addons = mapped('node-napi-v10.node')
    const libraries = mapped('libturbojpeg.so.0')
    if (addons.length !== 1 || libraries.length !== 1)
      return { addonMappings: addons.length, libraryMappings: libraries.length, corroborated: false }
    const addon = await realpath(addons[0])
    const library = await realpath(libraries[0])
    const nativeRoot = dirname(addon)
    const packageRoot = dirname(dirname(nativeRoot))
    const packageInfo = JSON.parse(await readFile(join(packageRoot, 'package.json'), 'utf8')) as {name?: string; version?: string}
    const addonDigest = sha256(await readFile(addon))
    const libraryDigest = sha256(await readFile(library))
    return { addonMappings: 1, libraryMappings: 1,
      layoutMatches: basename(addon) === 'node-napi-v10.node' && basename(nativeRoot) === 'jpeg-turbo-linux-x64' &&
        basename(dirname(nativeRoot)) === 'prebuilds' && library === join(nativeRoot, 'libturbojpeg.so.0'),
      packageMatches: packageInfo.name === '@julusian/jpeg-turbo' && packageInfo.version === '3.0.1',
      addonShaMatches: addonDigest === '627fa49f801c8386e90c6844d4c75aa85dd4eaabccaeae38994af069c9e36eea',
      libraryShaMatches: libraryDigest === '6facda09ef3e2308608f2b0214c040791e276305a48a27036362402f95fffcf5',
      corroborated: true }
  } catch { return { corroborated: false } }
}

export async function GET(request: Request) {
  const fixture = new URL(request.url).searchParams.get('fixture')
  const common = { environment: environment(), rssBefore: process.memoryUsage().rss,
    maxRssBefore: process.resourceUsage().maxRSS }
  if (fixture === 'inventory') return Response.json(common, { headers: { 'Cache-Control': 'no-store' } })
  if (!fixture || !fixtures.has(fixture))
    return Response.json({ outcome: 'unsupported' }, { status: 404, headers: { 'Cache-Control': 'no-store' } })
  const start = performance.now()
  let encodedBytes = 0
  try {
    const original = await readFile(join(process.cwd(), 'fixtures', `${fixture}.jpg`))
    encodedBytes = original.length
    const beforeCore = performance.now()
    const result = await validateClinicalJpegS001Bytes(original)
    const afterCore = performance.now()
    const nativeFacts = await postCoreNativeFacts()
    return Response.json({ ...common, fixture, outcome: 'accepted', result, nativeFacts,
      encodedBytes, decodedOutputBytes: result.width * result.height * result.sourceComponents,
      coreMs: Math.round((afterCore - beforeCore) * 100) / 100,
      totalMs: Math.round((performance.now() - start) * 100) / 100,
      rssAfter: process.memoryUsage().rss, maxRssAfter: process.resourceUsage().maxRSS },
      { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return Response.json({ ...common, fixture, outcome: 'rejected', encodedBytes,
      totalMs: Math.round((performance.now() - start) * 100) / 100,
      rssAfter: process.memoryUsage().rss, maxRssAfter: process.resourceUsage().maxRSS },
      { headers: { 'Cache-Control': 'no-store' } })
  }
}