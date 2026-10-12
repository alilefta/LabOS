import { readFile, realpath } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'

const requirePackage = createRequire(import.meta.url)
const root = dirname(requirePackage.resolve('@julusian/jpeg-turbo'))
const addon = join(root, 'prebuilds', 'jpeg-turbo-linux-x64', 'node-napi-v10.node')
const library = join(root, 'prebuilds', 'jpeg-turbo-linux-x64', 'libturbojpeg.so.0')
const virtualAddon = 'C:/mapped/node-napi-v10.node'
const virtualLibrary = 'C:/mapped/libturbojpeg.so.0'
const maps = `7f000-7f100 r-xp 0 00:00 0 ${virtualAddon}\n7f200-7f300 r-xp 0 00:00 0 ${virtualLibrary}`

const actualPlatform = Object.getOwnPropertyDescriptor(process, 'platform')!
afterEach(() => {
  Object.defineProperty(process, 'platform', actualPlatform)
  vi.doUnmock('node:fs/promises')
  vi.resetModules()
})

describe('production S001 identity initialization cache', () => {
  it('returns the same successful identity promise after one native load and mapping read', async () => {
    if (process.platform !== 'win32') return
    let mapReads = 0
    vi.doMock('node:fs/promises', () => ({
      readFile: async (path: string, ...args: unknown[]) => {
        if (path === '/proc/self/maps') { mapReads++; return maps }
        return (readFile as (...input: unknown[]) => unknown)(path, ...args)
      },
      realpath: async (path: string) => realpath(path === virtualAddon ? addon :
        path === virtualLibrary ? library : path),
    }))
    Object.defineProperty(process, 'platform', { ...actualPlatform, value: 'linux' })
    vi.resetModules()
    const { getS001CodecIdentity } = await import('@/modules/labos-files/jpeg-s001/identity')
    Object.defineProperty(process, 'platform', actualPlatform)
    const first = getS001CodecIdentity()
    const second = getS001CodecIdentity()
    expect(second).toBe(first)
    const identity = await first
    expect(identity.runtimeSha256).toBe('6facda09ef3e2308608f2b0214c040791e276305a48a27036362402f95fffcf5')
    expect(mapReads).toBe(1)
    expect(await getS001CodecIdentity()).toBe(identity)
    expect(mapReads).toBe(1)
  })

  it('caches rejection when the production platform gate fails', async () => {
    vi.resetModules()
    const { getS001CodecIdentity } = await import('@/modules/labos-files/jpeg-s001/identity')
    if (process.platform !== 'win32') return
    const first = getS001CodecIdentity()
    const second = getS001CodecIdentity()
    expect(second).toBe(first)
    await expect(first).rejects.toThrow('Clinical JPEG unavailable')
    await expect(getS001CodecIdentity()).rejects.toThrow('Clinical JPEG unavailable')
  })
})