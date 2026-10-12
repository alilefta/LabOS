# R2-02 normal-development migration installation

Status: **installation PASS; independent V3 PASS | RUNTIME_EVIDENCE + CHECKPOINT**.
Authority: Product Owner accepted the exact R2-02 CODE/SQL and disposable
runtime candidate and authorized installation of that candidate in the normal
development database only. No candidate modification, Case flow, provider
operation, staging, commit, push or deployment was authorized or performed.

## Target and source preflight

Independent read-only attestation and Primary preflight identified the
established normal development PostgreSQL target: host SHA-256 prefix
`eb0d823953fe` (matching the earlier checked-suffix and S001 development
installations), port `5432`, database/schema `postgres`/`public`, PostgreSQL
17.6. Credentials, full endpoint and connection URL are not retained.
The target role is non-superuser and has the required connection/schema-create
posture. A first sandboxed Primary checksum query returned `EACCES` before
database access; the bounded escalated read-only retry passed.

Before installation, `_prisma_migrations` had exactly **52 completed**
predecessors, zero incomplete/rolled-back rows and zero R2-02 rows. All 52
stored checksums matched the canonical-LF repository SQL files. Prisma found
53 local migrations and only
`20261007120000_r2_object_storage_allocation` pending. The enum had only
`UPLOADTHING`; `ObjectStorageKeyAllocation` was absent. There were two
historical `FileUploadGrant` rows, both provider-null and `UPLOADED`, with zero
StoredFile and clinical-evidence rows. The exact candidate raw SHA-256 was
`2bd36498143ef7eceda2de046be80ec061ef9b042ee266dea6bf036d0e0470f6`.

## Installation and postflight

One `prisma migrate deploy` invocation from the current repository applied
only `20261007120000_r2_object_storage_allocation`; exit `0`. No manual SQL,
backfill, fixture insertion or provider call occurred.

Read-only postflight on the same target found **53 completed** migrations,
zero failed/rolled-back rows, and exactly one finished R2-02 ledger row whose
checksum matches the reviewed source SHA-256. The installed enum values are
`UPLOADTHING` and `OBJECT_STORAGE`. `ObjectStorageKeyAllocation` has the four
reviewed columns (`objectKey`, `sourceUploadGrantId`, nullable
`latestWriteCapabilityExpiresAt`, `allocatedAt`), both mutation/TRUNCATE
protection triggers, and the grant allocation trigger. The two historical
provider-null `UPLOADED` grants remain; allocation, clinical evidence,
StoredFile and CaseAssetFileVersion row counts are all zero. The migration
file hash remained unchanged after installation.

Prisma migration status: **up to date**, exit `0`. Read-only
datasource-to-schema diff: **no difference detected**, exit `0`. Prisma schema
validation: **PASS**. The separate R2-02 disposable PostgreSQL packet retains
the 23/23 synthetic constraint matrix and full injected-failure rollback.

Normal-development installation establishes the durable schema only. It does
not establish browser upload, R2 Case issuance, clinical finalization,
attachment, private open, cleanup lifecycle, production migration or
N-FILE-110 activation. R2-03 remains unauthorized.

## Independent review

Independent read-only reviewer verified the exact candidate SHA-256 and its
single finished normal-development migration row, 53 completed migrations,
the `UPLOADTHING,OBJECT_STORAGE` enum, four allocation columns, both
allocation protection triggers and the grant allocation trigger. The two
historical provider-null `UPLOADED` grants remain and there are zero
allocation/evidence/file/version rows. An independent Prisma status check was
up to date and datasource-to-schema diff found no difference. Verdict:
**PASS | RUNTIME_EVIDENCE + CHECKPOINT**, no material finding. This accepts
normal-development schema installation only; the preceding disposable 23/23
matrix remains its own evidence and was not rerun against development.
