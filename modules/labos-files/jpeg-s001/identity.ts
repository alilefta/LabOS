import 'server-only'

import { createHash } from 'node:crypto'
import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { basename, dirname, isAbsolute, join, normalize } from 'node:path'

import { S001_CODEC_MANIFEST } from './manifest'

export type S001Codec = Pick<typeof import('@julusian/jpeg-turbo'),
  'decompressSync' | 'FORMAT_GRAY' | 'FORMAT_RGB'>

export class S001Unavailable extends Error {
  constructor() { super('Clinical JPEG unavailable') }
}

const requirePackage = createRequire(import.meta.url)
const hash = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex')

export type CodecIdentityDependencies = Readonly<{
  platform: string
  architecture: string
  nodeVersion: string
  napiVersion: string | undefined
  readFile: typeof readFile
  realpath: typeof realpath
  load(): S001Codec
  readMaps(): Promise<string>
}>

const production: CodecIdentityDependencies = {
  platform: process.platform,
  architecture: process.arch,
  nodeVersion: process.versions.node,
  napiVersion: process.versions.napi,
  readFile,
  realpath,
  load: () => requirePackage('@julusian/jpeg-turbo') as S001Codec,
  readMaps: async () => readFile('/proc/self/maps', 'utf8'),
}

function mappedPaths(maps: string, name: string): string[] {
  const paths = new Set<string>()
  for (const line of maps.split('\n')) {
    const fields = line.trim().split(/\s+/)
    if (fields.length < 6) continue
    const mapped = fields.slice(5).join(' ')
    if (mapped.endsWith(`/${name}`) || mapped.includes(`/${name} (deleted)`)) paths.add(mapped)
  }
  return [...paths]
}

/**
 * Load the package, then trust it only if the actual native mappings resolve
 * to the reviewed adjacent prebuild and match the pinned bytes. Package
 * metadata or a build trace alone never establishes codec identity.
 */
export async function verifyS001CodecIdentity(deps: CodecIdentityDependencies = production): Promise<Readonly<{
  codec: S001Codec
  runtimeSha256: typeof S001_CODEC_MANIFEST.librarySha256
}>> {
  try {
    if (deps.platform !== 'linux' || deps.architecture !== 'x64' ||
      !/^24\./.test(deps.nodeVersion) || deps.napiVersion !== '10') throw new Error()
    const codec = deps.load()
    if (typeof codec.decompressSync !== 'function' ||
      typeof codec.FORMAT_GRAY !== 'number' || typeof codec.FORMAT_RGB !== 'number') throw new Error()
    const maps = await deps.readMaps()
    const addonMappings = mappedPaths(maps, 'node-napi-v10.node')
    const libraryMappings = mappedPaths(maps, 'libturbojpeg.so.0')
    if (addonMappings.length !== 1 || libraryMappings.length !== 1 ||
      !isAbsolute(addonMappings[0]) || !isAbsolute(libraryMappings[0]) ||
      addonMappings[0].endsWith(' (deleted)') || libraryMappings[0].endsWith(' (deleted)')) throw new Error()
    const addonPath = normalize(await deps.realpath(addonMappings[0]))
    const libraryPath = normalize(await deps.realpath(libraryMappings[0]))
    const nativeRoot = dirname(addonPath)
    if (basename(addonPath) !== 'node-napi-v10.node' ||
      basename(nativeRoot) !== 'jpeg-turbo-linux-x64' ||
      basename(dirname(nativeRoot)) !== 'prebuilds' ||
      libraryPath !== join(nativeRoot, 'libturbojpeg.so.0')) throw new Error()
    const root = dirname(dirname(nativeRoot))
    const packageInfo = JSON.parse(await deps.readFile(join(root, 'package.json'), 'utf8')) as { name?: string; version?: string }
    if (packageInfo.name !== '@julusian/jpeg-turbo' || packageInfo.version !== '3.0.1') throw new Error()
    if (hash(await deps.readFile(addonPath)) !== S001_CODEC_MANIFEST.addonSha256 ||
      hash(await deps.readFile(libraryPath)) !== S001_CODEC_MANIFEST.librarySha256) throw new Error()
    return Object.freeze({ codec, runtimeSha256: S001_CODEC_MANIFEST.librarySha256 })
  } catch {
    throw new S001Unavailable()
  }
}

let coldIdentity: Promise<Awaited<ReturnType<typeof verifyS001CodecIdentity>>> | undefined

/** Initialized on the first authorized S001 invocation, then fixed per instance. */
export function getS001CodecIdentity(): Promise<Awaited<ReturnType<typeof verifyS001CodecIdentity>>> {
  coldIdentity ??= verifyS001CodecIdentity()
  return coldIdentity
}
