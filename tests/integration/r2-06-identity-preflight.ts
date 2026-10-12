import { readFile } from 'node:fs/promises'
import { getS001CodecIdentity } from '@/modules/labos-files/jpeg-s001/identity'
import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'

async function main() {
  const identity = await getS001CodecIdentity()
  const maps = await readFile('/proc/self/maps', 'utf8')
  const mapped = (name: string) => new Set(maps.split('\n')
    .map(line => line.trim().split(/\s+/).slice(5).join(' '))
    .filter(path => path.endsWith('/' + name))).size
  if (identity.runtimeSha256 !== S001_CODEC_MANIFEST.librarySha256 ||
    mapped('node-napi-v10.node') !== 1 || mapped('libturbojpeg.so.0') !== 1)
    throw new Error('Production S001 identity failed')
  console.log(JSON.stringify({ platform: process.platform, arch: process.arch,
    node: process.version, napi: process.versions.napi, processId: process.pid,
    identity: 'PRODUCTION_S001_VERIFIED',
    addonMappingCount: mapped('node-napi-v10.node'),
    libraryMappingCount: mapped('libturbojpeg.so.0'),
    pinnedLibraryHashMatch: true }))
}
main().catch(() => { console.error('PRODUCTION_S001_IDENTITY_FAILED'); process.exitCode = 1 })
