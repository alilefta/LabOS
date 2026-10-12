import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { UTApi, UTFile } from 'uploadthing/server'

const runId = '7947b03b84e14fb8ad4d18219760a535'
const manifestPath = new URL('./owned-keys.json', import.meta.url)
const lines = readFileSync(new URL('../../.env.local', import.meta.url), 'utf8').split(/\r?\n/)
const tokenLine = lines.find((line) => line.startsWith('UPLOADTHING_DEVELOPMENT_TOKEN='))
if (!tokenLine) throw new Error('missing development token')
const token = tokenLine.slice('UPLOADTHING_DEVELOPMENT_TOKEN='.length).replace(/^['"]|['"]$/g, '')
const claims = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'))
if (claims.appId !== 'fyylnhrlmu') throw new Error('unexpected provider application')
const api = new UTApi({ token, logLevel: 'None' })
const keys = []
const events = []
const keyId = (key) => createHash('sha256').update(key).digest('hex').slice(0, 16)
const mark = (stage, data = {}) => events.push({ at: new Date().toISOString(), stage, ...data })
const saveKeys = () => writeFileSync(manifestPath, JSON.stringify({ runId, keys }), { mode: 0o600 })
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function lookup(key, stage) {
  const result = await api.getFileUrls(key, { keyType: 'fileKey' })
  const data = result.data
  mark(stage, { count: data.length, exact: data.length === 1 ? data[0].key === key : null })
  return data
}

async function deletion(key, stage) {
  const result = await api.deleteFiles(key, { keyType: 'fileKey' })
  mark(stage, { success: result.success, deletedCount: result.deletedCount })
  return result
}

let failure = null
try {
  mark('target', { sdkVersion: '7.7.4', appId: claims.appId, runId })
  for (const ordinal of [1, 2]) {
    const file = new UTFile([`synthetic provider capability probe ${runId} ${ordinal}\n`],
      `ut-capability-${runId}-${ordinal}.txt`, { type: 'text/plain' })
    const result = await api.uploadFiles(file)
    if (result.error || !result.data?.key) {
      mark('upload-failure', { code: typeof result.error?.code === 'string' ? result.error.code : null,
        errorClass: result.error?.name ?? null, hasData: !!result.data })
      throw new Error('synthetic upload failed')
    }
    const key = result.data.key
    keys.push(key)
    saveKeys()
    mark('uploaded', { ordinal, keyFingerprint: keyId(key), size: file.size })
    await lookup(key, `present-${ordinal}`)
  }
  mark('independent-key-comparison', { distinct: keys[0] !== keys[1] })
  const key = keys[0]
  await deletion(key, 'first-delete')
  await lookup(key, 'lookup-immediate')
  for (const delayMs of [250, 1000, 3000]) {
    await wait(delayMs)
    await lookup(key, `lookup-after-${delayMs}ms`)
  }
  await deletion(key, 'repeat-delete')
  await lookup(key, 'lookup-after-repeat')
} catch (error) {
  failure = { stage: events.at(-1)?.stage ?? 'preflight', errorClass: error?.name ?? 'Error' }
} finally {
  for (const key of keys) {
    try {
      const before = await api.getFileUrls(key, { keyType: 'fileKey' })
      if (before.data.length !== 0) await deletion(key, `cleanup-delete-${keyId(key)}`)
      const after = await api.getFileUrls(key, { keyType: 'fileKey' })
      mark('cleanup-confirmation', { keyFingerprint: keyId(key), count: after.data.length })
    } catch (error) {
      mark('cleanup-failure', { keyFingerprint: keyId(key), errorClass: error?.name ?? 'Error' })
    }
  }
  const cleanupConfirmed = keys.every((key) => events.some((event) =>
    event.stage === 'cleanup-confirmation' && event.keyFingerprint === keyId(key) && event.count === 0))
  if (cleanupConfirmed && existsSync(manifestPath)) unlinkSync(manifestPath)
  writeFileSync(new URL('./sanitized-result.json', import.meta.url),
    JSON.stringify({ runId, createdCount: keys.length, events, failure, cleanupConfirmed }, null, 2))
  process.stdout.write(JSON.stringify({ runId, createdCount: keys.length, events, failure, cleanupConfirmed }))
}
