import { readFileSync, writeFileSync } from 'node:fs'
import { UTApi } from 'uploadthing/server'

const runId = '7947b03b84e14fb8ad4d18219760a535'
const lines = readFileSync(new URL('../../.env.local', import.meta.url), 'utf8').split(/\r?\n/)
const token = lines.find((line) => line.startsWith('UPLOADTHING_DEVELOPMENT_TOKEN='))
  ?.slice('UPLOADTHING_DEVELOPMENT_TOKEN='.length).replace(/^['"]|['"]$/g, '')
if (!token) throw new Error('missing development token')
const claims = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'))
if (claims.appId !== 'fyylnhrlmu') throw new Error('unexpected provider application')
const api = new UTApi({ token, logLevel: 'None' })
const matches = []
let scanComplete = false
let pages = 0
let errorClass = null
try {
  for (let offset = 0; offset < 10000; offset += 500) {
    const result = await api.listFiles({ limit: 500, offset })
    pages++
    for (const file of result.files) {
      if (file.name === `ut-capability-${runId}-1.txt` ||
          file.name === `ut-capability-${runId}-2.txt`) matches.push(file)
    }
    if (!result.hasMore) { scanComplete = true; break }
  }
  for (const file of matches) await api.deleteFiles(file.key, { keyType: 'fileKey' })
} catch (error) { errorClass = error?.name ?? 'Error' }
const evidence = { at: new Date().toISOString(), runId, pages, scanComplete,
  exactNameMatches: matches.length, deleteAttempts: matches.length, errorClass }
writeFileSync(new URL('./recovery-result.json', import.meta.url), JSON.stringify(evidence, null, 2))
process.stdout.write(JSON.stringify(evidence))
