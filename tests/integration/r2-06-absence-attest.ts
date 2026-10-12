import { config as loadEnvironment } from 'dotenv'
import { generalPrisma } from '@/lib/prisma'
import { createConfiguredObjectStorage } from '@/modules/labos-files/object-storage/config'

loadEnvironment({ path: process.env.LABOS_R2_ENV_FILE, quiet: true })
const expected = 'postgresql://postgres@r206-pg:5432/postgres?schema=public'
if (process.env.DATABASE_URL !== expected || process.env.DIRECT_URL !== expected ||
  process.env.LABOS_R2_NON_PRODUCTION !== '1' || process.platform !== 'linux')
  throw new Error('R2-06 target gate failed')

async function main() {
  const allocations = await generalPrisma.objectStorageKeyAllocation.findMany({
    select: { objectKey: true },
  })
  if (allocations.length !== 3 || allocations.some(a => !/^objects\/[0-9a-f-]{36}$/.test(a.objectKey)))
    throw new Error('Unexpected R2-06 allocation inventory')
  const storage = createConfiguredObjectStorage()
  for (const { objectKey } of allocations) {
    const result = await storage.classifyPresence(objectKey)
    if (!result.ok || result.value !== 'ABSENT') throw new Error(`R2-06 residual object: ${objectKey}`)
  }
  console.log(JSON.stringify({ runOwnedAllocations: allocations.length, directProviderAbsence: 'PASS' }))
  await generalPrisma.$disconnect()
}
main().catch(() => { console.error('R2-06 absence attestation failed'); process.exitCode = 1 })
