import { createHash } from 'node:crypto'
import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { describe, expect, it } from 'vitest'
import * as turbo from '@julusian/jpeg-turbo'

import { getS001CodecIdentity, verifyS001CodecIdentity, type CodecIdentityDependencies } from '@/modules/labos-files/jpeg-s001/identity'
import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'

const requirePackage = createRequire(import.meta.url)
const packageEntry = requirePackage.resolve('@julusian/jpeg-turbo')
const nativeRoot = join(dirname(packageEntry), 'prebuilds', 'jpeg-turbo-linux-x64')
const addon = join(nativeRoot, 'node-napi-v10.node')
const library = join(nativeRoot, 'libturbojpeg.so.0')
const maps = [
  '7f000-7f100 r-xp 0 00:00 0 /mapped/node-napi-v10.node',
  '7f200-7f300 r-xp 0 00:00 0 /mapped/libturbojpeg.so.0',
].join('\n')

function dependencies(): CodecIdentityDependencies {
  return {
    platform: 'linux', architecture: 'x64', nodeVersion: '24.21.0', napiVersion: '10',
    readFile,
    realpath: async (value: string) => realpath(value === '/mapped/node-napi-v10.node' ? addon :
      value === '/mapped/libturbojpeg.so.0' ? library : value),
    load: () => turbo,
    readMaps: async () => maps,
  } as unknown as CodecIdentityDependencies
}

describe('S001 reviewed native identity', () => {
  it('pins the published Linux x64 addon and adjacent library bytes', async () => {
    const digest = async (file: string) => createHash('sha256').update(await readFile(file)).digest('hex')
    expect(await digest(addon)).toBe(S001_CODEC_MANIFEST.addonSha256)
    expect(await digest(library)).toBe(S001_CODEC_MANIFEST.librarySha256)
    const result = await verifyS001CodecIdentity(dependencies())
    expect(result.runtimeSha256).toBe(S001_CODEC_MANIFEST.librarySha256)
    expect(result.codec.decompressSync).toBe(turbo.decompressSync)
  })

  it('fails closed on missing library', async () => {
    const deps = dependencies()
    const missing = { ...deps, readFile: (file: string, ...args: unknown[]) => {
      if (String(file).endsWith('libturbojpeg.so.0')) throw new Error('/sensitive/native/path')
      return (readFile as (...input: unknown[]) => unknown)(file, ...args)
    } } as CodecIdentityDependencies
    await expect(verifyS001CodecIdentity(missing)).rejects.toThrow('Clinical JPEG unavailable')
  })

  it('fails closed on library digest mismatch', async () => {
    const deps = dependencies()
    const altered = { ...deps, readFile: (file: string, ...args: unknown[]) =>
      String(file).endsWith('libturbojpeg.so.0') ? Promise.resolve(Buffer.from('altered')) :
      (readFile as (...input: unknown[]) => unknown)(file, ...args) } as CodecIdentityDependencies
    await expect(verifyS001CodecIdentity(altered)).rejects.toThrow('Clinical JPEG unavailable')
  })

  it('fails closed if the actual mapped library differs', async () => {
    const deps = dependencies()
    await expect(verifyS001CodecIdentity({ ...deps,
      readMaps: async () => maps.replace('/mapped/libturbojpeg.so.0', '/other/libturbojpeg.so.0'),
    })).rejects.toThrow('Clinical JPEG unavailable')
  })

  it.each([
    ['missing addon', maps.replace('/mapped/node-napi-v10.node', '/other/not-an-addon.node')],
    ['missing library', maps.replace('/mapped/libturbojpeg.so.0', '/other/not-a-library.so')],
    ['duplicate addon', `${maps}\n7f400-7f500 r-xp 0 00:00 0 /other/node-napi-v10.node`],
    ['duplicate library', `${maps}\n7f400-7f500 r-xp 0 00:00 0 /other/libturbojpeg.so.0`],
    ['deleted addon', maps.replace('/mapped/node-napi-v10.node', '/mapped/node-napi-v10.node (deleted)')],
  ])('fails closed on %s mapping', async (_name, observed) => {
    const deps = dependencies()
    await expect(verifyS001CodecIdentity({ ...deps, readMaps: async () => observed })).rejects.toThrow('Clinical JPEG unavailable')
  })

  it('fails closed on duplicate mapped paths even if one is valid', async () => {
    const deps = dependencies()
    await expect(verifyS001CodecIdentity({ ...deps,
      readMaps: async () => `${maps}\n7f400-7f500 r-xp 0 00:00 0 /elsewhere/node-napi-v10.node`,
    })).rejects.toThrow('Clinical JPEG unavailable')
  })

  it('fails closed when actual addon bytes differ', async () => {
    const deps = dependencies()
    await expect(verifyS001CodecIdentity({ ...deps,
      readFile: (file: string, ...args: unknown[]) =>
        String(file).endsWith('node-napi-v10.node') ? Promise.resolve(Buffer.from('altered')) :
          (readFile as (...input: unknown[]) => unknown)(file, ...args),
    } as CodecIdentityDependencies)).rejects.toThrow('Clinical JPEG unavailable')
  })

  it('rejects a mapped shared library outside the addon directory', async () => {
    const deps = dependencies()
    await expect(verifyS001CodecIdentity({ ...deps,
      realpath: (async (value: string) => value === '/mapped/libturbojpeg.so.0' ? '/other/libturbojpeg.so.0' : deps.realpath(value)) as typeof realpath,
    })).rejects.toThrow('Clinical JPEG unavailable')
  })

  it('rejects an addon outside the reviewed prebuild layout', async () => {
    const deps = dependencies()
    await expect(verifyS001CodecIdentity({ ...deps,
      realpath: (async (value: string) => value === '/mapped/node-napi-v10.node' ? '/other/node-napi-v10.node' : deps.realpath(value)) as typeof realpath,
    })).rejects.toThrow('Clinical JPEG unavailable')
  })

  it('requires package identity adjacent to the mapped addon', async () => {
    const deps = dependencies()
    await expect(verifyS001CodecIdentity({ ...deps,
      readFile: (file: string, ...args: unknown[]) =>
        String(file).endsWith('package.json') ? Promise.resolve('{"name":"other","version":"3.0.1"}') :
          (readFile as (...input: unknown[]) => unknown)(file, ...args),
    } as CodecIdentityDependencies)).rejects.toThrow('Clinical JPEG unavailable')
  })
  it('requires approved Linux x64 Node 24 and N-API 10', async () => {
    const deps = dependencies()
    for (const change of [{ platform: 'win32' }, { architecture: 'arm64' },
      { nodeVersion: '22.18.0' }, { napiVersion: '9' }]) {
      await expect(verifyS001CodecIdentity({ ...deps, ...change })).rejects.toThrow('Clinical JPEG unavailable')
    }
  })
  it('caches a rejected production initialization on this unsupported Windows host', async () => {
    if (process.platform !== 'win32') return
    const first = getS001CodecIdentity()
    const second = getS001CodecIdentity()
    expect(second).toBe(first)
    await expect(first).rejects.toThrow('Clinical JPEG unavailable')
  })
  it('fails closed when the approved native addon cannot load', async () => {
    const deps = dependencies()
    await expect(verifyS001CodecIdentity({ ...deps,
      load: () => { throw new Error('/native/loader/diagnostic') },
    })).rejects.toThrow('Clinical JPEG unavailable')
  })
})
