import { createHash, randomUUID } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { expect, it, vi } from 'vitest'
import { Prisma } from '../../generated/prisma/client'

if (process.env.DATABASE_URL !== 'postgresql://postgres@127.0.0.1:55487/postgres?schema=public' ||
    process.env.DIRECT_URL !== process.env.DATABASE_URL) throw new Error('Disposable target mismatch')

const mocks = vi.hoisted(() => ({ retrieve: vi.fn(), core: vi.fn(), identity: vi.fn() }))
vi.mock('@/modules/labos-files/jpeg-r001/retrieve', () => ({ retrieveReservedUploadThingBytes: mocks.retrieve }))
vi.mock('@/modules/labos-files/jpeg-s001/identity', async importOriginal => {
  const original = await importOriginal<typeof import('@/modules/labos-files/jpeg-s001/identity')>()
  return { ...original, getS001CodecIdentity: mocks.identity }
})
vi.mock('@/modules/labos-files/jpeg-s001/core', async importOriginal => {
  const original = await importOriginal<typeof import('@/modules/labos-files/jpeg-s001/core')>()
  return { ...original, validateClinicalJpegS001Bytes: mocks.core }
})

import { generalPrisma } from '@/lib/prisma'
import { inspectR001 } from '@/modules/labos-files/jpeg-r001/inspect'
import { S001_CODEC_MANIFEST } from '@/modules/labos-files/jpeg-s001/manifest'
import { validateReservedClinicalJpegS001, getRetainedS001Context } from '@/modules/labos-files/jpeg-s001/validate'
import { createS001ClinicalEvidenceFinalizer } from '@/modules/labos-files/jpeg-s001/finalize'

const bytes = readFileSync('tests/unit/modules/labos-files/jpeg-s001/fixtures/baseline.jpg')
const sha = (value: Buffer) => createHash('sha256').update(value).digest('hex')
const facts = inspectR001(bytes)
const finalize = createS001ClinicalEvidenceFinalizer(generalPrisma)

mocks.identity.mockImplementation(async () => ({ runtimeSha256: S001_CODEC_MANIFEST.librarySha256 }))
mocks.retrieve.mockImplementation(async () => bytes)
mocks.core.mockImplementation(async (original: Buffer) => Object.freeze({
  validationProfile: S001_CODEC_MANIFEST.profile,
  validatorVersion: S001_CODEC_MANIFEST.validatorVersion,
  codecBackend: S001_CODEC_MANIFEST.backend,
  codecPackageVersion: S001_CODEC_MANIFEST.packageVersion,
  codecLibraryVersion: S001_CODEC_MANIFEST.libraryVersion,
  codecRuntimeSha256: S001_CODEC_MANIFEST.librarySha256,
  encodedBytes: original.length, sha256: sha(original), width: facts.width, height: facts.height,
  sourceComponents: facts.components, isProgressive: facts.progressive,
}))

async function grant(suffix: 'JPG' | 'JPEG' = 'JPG', ttlSeconds = 3600) {
  const id = randomUUID()
  const key = `synthetic-${id}`
  await generalPrisma.$executeRaw(Prisma.sql`
    INSERT INTO "FileUploadGrant" ("id","organizationId","labId","createdByMemberId",
      "boundaryId","purpose","targetType","targetId","provider","providerFileKey",
      "correlationId","createdAt","updatedAt","expiresAt","caseClinicalValidatedSuffix")
    VALUES (${id},'finalize-org','finalize-lab','finalize-member','N-FILE-110',
      'case.asset.add.stage','case','finalize-case','UPLOADTHING',${key},${id},
      (now() at time zone 'UTC')-interval '1 minute',(now() at time zone 'UTC'),
      (now() at time zone 'UTC')+${ttlSeconds} * interval '1 second',${suffix}::"CaseClinicalValidatedSuffix")
  `)
  return { id, key }
}
async function state(id: string) {
  const [grantRow, evidence] = await Promise.all([
    generalPrisma.fileUploadGrant.findUnique({ where: { id }, select: { status: true } }),
    generalPrisma.caseClinicalUploadEvidence.count({ where: { uploadGrantId: id } }),
  ])
  return { status: grantRow?.status, evidence }
}
async function outer(id: string) { return validateReservedClinicalJpegS001(id) }

it('real installed transaction: JPG and JPEG commit exact evidence and grant together; stale rejects', async () => {
  for (const suffix of ['JPG', 'JPEG'] as const) {
    const { id, key } = await grant(suffix)
    const result = await outer(id)
    const stamp = new Date(getRetainedS001Context(result).validatedAtEpochMs)
    await expect(finalize(result)).resolves.toBeUndefined()
    expect(await state(id)).toEqual({ status: 'UPLOADED', evidence: 1 })
    const evidence = await generalPrisma.caseClinicalUploadEvidence.findUniqueOrThrow({ where: { uploadGrantId: id } })
    expect(evidence).toMatchObject({ organizationId: 'finalize-org', labId: 'finalize-lab', caseId: 'finalize-case',
      provider: 'UPLOADTHING', providerObjectKey: key, validatedSuffix: suffix,
      validationProfile: S001_CODEC_MANIFEST.profile, validatorVersion: S001_CODEC_MANIFEST.validatorVersion,
      codecBackend: S001_CODEC_MANIFEST.backend, codecPackageVersion: S001_CODEC_MANIFEST.packageVersion,
      codecLibraryVersion: S001_CODEC_MANIFEST.libraryVersion, codecRuntimeSha256: S001_CODEC_MANIFEST.librarySha256,
      measuredSizeBytes: BigInt(bytes.length), contentSha256: sha(bytes), width: facts.width, height: facts.height,
      sourceComponents: facts.components, isProgressive: facts.progressive, validatedAt: stamp })
    await expect(finalize(result)).rejects.toThrow('Clinical JPEG unavailable')
    expect(await state(id)).toEqual({ status: 'UPLOADED', evidence: 1 })
    await expect(generalPrisma.caseClinicalUploadEvidence.update({ where: { uploadGrantId: id }, data: { width: 1 } })).rejects.toThrow()
    await expect(generalPrisma.caseClinicalUploadEvidence.delete({ where: { uploadGrantId: id } })).rejects.toThrow()
    expect(await state(id)).toEqual({ status: 'UPLOADED', evidence: 1 })
  }
}, 30000)

it('real installed transaction: changed Case and expired grant fail with no evidence or consumption', async () => {
  const changed = await grant()
  const changedResult = await outer(changed.id)
  await generalPrisma.$executeRaw(Prisma.sql`UPDATE "Case" SET "status"='PROCESSING' WHERE "id"='finalize-case'`)
  await expect(finalize(changedResult)).rejects.toThrow('Clinical JPEG unavailable')
  expect(await state(changed.id)).toEqual({ status: 'PENDING', evidence: 0 })
  await generalPrisma.$executeRaw(Prisma.sql`UPDATE "Case" SET "status"='DRAFT' WHERE "id"='finalize-case'`)
  const expired = await grant('JPG', 2)
  const expiredResult = await outer(expired.id)
  await new Promise(resolve => setTimeout(resolve, 2200))
  await expect(finalize(expiredResult)).rejects.toThrow('Clinical JPEG unavailable')
  expect(await state(expired.id)).toEqual({ status: 'PENDING', evidence: 0 })
}, 30000)

it('real installed transaction: evidence and transition faults roll back both sides', async () => {
  for (const table of ['evidence', 'grant'] as const) {
    const { id } = await grant()
    const result = await outer(id)
    const triggerName = `synthetic_finalizer_${table}_fault`
    if (table === 'evidence') {
      await generalPrisma.$executeRawUnsafe(`CREATE FUNCTION ${triggerName}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."uploadGrantId" = '${id}' THEN RAISE EXCEPTION 'synthetic fault'; END IF; RETURN NEW; END $$`)
      await generalPrisma.$executeRawUnsafe(`CREATE TRIGGER ${triggerName} BEFORE INSERT ON "CaseClinicalUploadEvidence" FOR EACH ROW EXECUTE FUNCTION ${triggerName}()`)
    } else {
      await generalPrisma.$executeRawUnsafe(`CREATE FUNCTION ${triggerName}() RETURNS trigger LANGUAGE plpgsql AS $$ BEGIN IF NEW."id" = '${id}' AND NEW."status" = 'UPLOADED' THEN RAISE EXCEPTION 'synthetic fault'; END IF; RETURN NEW; END $$`)
      await generalPrisma.$executeRawUnsafe(`CREATE TRIGGER ${triggerName} BEFORE UPDATE ON "FileUploadGrant" FOR EACH ROW EXECUTE FUNCTION ${triggerName}()`)
    }
    try {
      await expect(finalize(result)).rejects.toThrow('Clinical JPEG unavailable')
      expect(await state(id)).toEqual({ status: 'PENDING', evidence: 0 })
    } finally {
      const target = table === 'evidence' ? 'CaseClinicalUploadEvidence' : 'FileUploadGrant'
      await generalPrisma.$executeRawUnsafe(`DROP TRIGGER ${triggerName} ON "${target}"`)
      await generalPrisma.$executeRawUnsafe(`DROP FUNCTION ${triggerName}()`)
    }
  }
}, 30000)


it('real installed deferred trigger rejects a post-transition invalid final state and rolls back both', async () => {
  const { id } = await grant()
  const result = await outer(id)
  const wrapper = { $transaction: (async (callback: (tx: any) => Promise<void>, options: any) =>
    generalPrisma.$transaction(async tx => {
      await callback(tx)
      // Run-owned fault after the real finalizer has inserted evidence and transitioned.
      // The installed deferred evidence/grant invariant must reject this at COMMIT.
      await tx.$executeRaw(Prisma.sql`UPDATE "FileUploadGrant" SET "status"='PENDING', "uploadedAt"=NULL WHERE "id"=${id}`)
    }, options)) } as unknown as typeof generalPrisma
  await expect(createS001ClinicalEvidenceFinalizer(wrapper)(result)).rejects.toThrow('Clinical JPEG unavailable')
  expect(await state(id)).toEqual({ status: 'PENDING', evidence: 0 })
}, 30000)

it('real transaction exception after both writes rolls back both sides', async () => {
  const { id } = await grant()
  const result = await outer(id)
  const wrapper = { $transaction: (async (callback: (tx: any) => Promise<void>, options: any) =>
    generalPrisma.$transaction(async tx => {
      await callback(tx)
      throw new Error('synthetic post-write exception')
    }, options)) } as unknown as typeof generalPrisma
  await expect(createS001ClinicalEvidenceFinalizer(wrapper)(result)).rejects.toThrow('Clinical JPEG unavailable')
  expect(await state(id)).toEqual({ status: 'PENDING', evidence: 0 })
}, 30000)

it('separate PostgreSQL transactions overlap and only one finalizes the same grant', async () => {
  const { Client } = await import('pg')
  const { id } = await grant()
  const result = await outer(id)
  const blocker = new Client({ connectionString: process.env.DIRECT_URL })
  await blocker.connect()
  await blocker.query('BEGIN')
  await blocker.query('SELECT id FROM "FileUploadGrant" WHERE id = $1 FOR UPDATE', [id])
  try {
    const first = finalize(result)
    const second = finalize(result)
    let waiters = 0
    for (let attempt = 0; attempt < 30; attempt++) {
      await new Promise(resolve => setTimeout(resolve, 50))
      const rows = await blocker.query<{ n: string }>(`SELECT count(*)::text AS n FROM pg_stat_activity
        WHERE datname=current_database() AND wait_event_type='Lock' AND pid<>pg_backend_pid()`)
      waiters = Number(rows.rows[0].n)
      if (waiters >= 2) break
    }
    expect(waiters).toBeGreaterThanOrEqual(2)
    await blocker.query('COMMIT')
    const settled = await Promise.allSettled([first, second])
    console.log('RACE_EVIDENCE', JSON.stringify({ overlappingLockWaiters: waiters, fulfilled: settled.filter(x => x.status === 'fulfilled').length, rejected: settled.filter(x => x.status === 'rejected').length }))
    expect(settled.filter(x => x.status === 'fulfilled')).toHaveLength(1)
    expect(settled.filter(x => x.status === 'rejected')).toHaveLength(1)
    expect(await state(id)).toEqual({ status: 'UPLOADED', evidence: 1 })
  } finally {
    await blocker.query('ROLLBACK').catch(() => undefined)
    await blocker.end()
  }
}, 30000)


it('installed grant guards reject checked-suffix and exact-provider-key tampering', async () => {
  const { id } = await grant('JPG')
  const result = await outer(id)
  await expect(generalPrisma.$executeRaw(Prisma.sql`UPDATE "FileUploadGrant" SET "caseClinicalValidatedSuffix"='JPEG' WHERE "id"=${id}`)).rejects.toThrow()
  await expect(generalPrisma.$executeRaw(Prisma.sql`UPDATE "FileUploadGrant" SET "providerFileKey"='different-synthetic-key' WHERE "id"=${id}`)).rejects.toThrow()
  expect(await state(id)).toEqual({ status: 'PENDING', evidence: 0 })
  await expect(finalize(result)).resolves.toBeUndefined()
  expect(await state(id)).toEqual({ status: 'UPLOADED', evidence: 1 })
}, 30000)

it('fresh authorization denies revoked member role without consuming grant', async () => {
  const { id } = await grant()
  const result = await outer(id)
  await generalPrisma.$executeRaw(Prisma.sql`UPDATE member SET role='unrecognized-role' WHERE id='finalize-member'`)
  try {
    await expect(finalize(result)).rejects.toThrow('Clinical JPEG unavailable')
    expect(await state(id)).toEqual({ status: 'PENDING', evidence: 0 })
  } finally {
    await generalPrisma.$executeRaw(Prisma.sql`UPDATE member SET role='owner' WHERE id='finalize-member'`)
  }
}, 30000)
