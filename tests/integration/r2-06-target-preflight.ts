import { randomUUID } from 'node:crypto'
import { config } from 'dotenv'
import { HeadBucketCommand, S3Client } from '@aws-sdk/client-s3'
import { createConfiguredObjectStorage } from '@/modules/labos-files/object-storage/config'

config({ path: process.env.LABOS_R2_ENV_FILE ?? '.env.local', quiet: true })
async function main() {
  if (process.env.LABOS_R2_CONFORMANCE_RUN !== '1' ||
    process.env.LABOS_R2_NON_PRODUCTION !== '1') throw new Error('R2 target gate absent')
  const accountId = process.env.LABOS_R2_ACCOUNT_ID ?? ''
  const bucket = process.env.LABOS_R2_BUCKET ?? ''
  const accessKeyId = process.env.LABOS_R2_ACCESS_KEY_ID ?? ''
  const secretAccessKey = process.env.LABOS_R2_SECRET_ACCESS_KEY ?? ''
  if (!/^[a-f0-9]{32}$/i.test(accountId) || !bucket || !accessKeyId || !secretAccessKey)
    throw new Error('R2 target configuration invalid')
  const client = new S3Client({ region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey }, forcePathStyle: true, maxAttempts: 1 })
  try {
    await client.send(new HeadBucketCommand({ Bucket: bucket }))
    const storage = createConfiguredObjectStorage()
    const presence = await storage.classifyPresence(`objects/${randomUUID()}`)
    if (!presence.ok || presence.value !== 'ABSENT') throw new Error('Exact absence unavailable')
    console.log(JSON.stringify({ targetGate: 'NON_PRODUCTION_PRIVATE_R2',
      headBucket: 'PASS', exactAbsence: 'PASS' }))
  } finally { client.destroy() }
}
main().catch(() => { console.error('R206_R2_PREFLIGHT_FAILED'); process.exitCode = 1 })
