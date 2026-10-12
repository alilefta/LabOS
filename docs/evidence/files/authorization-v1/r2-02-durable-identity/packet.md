# R2-02 durable object-storage identity and key allocation

Status: **CLOSED | PASS CHECKPOINT**. The Product Owner accepted the R2-02
candidate and separately authorized its exact normal-development installation.
This packet retains the CODE/SQL and disposable PostgreSQL evidence; the
[normal-development installation](normal-development-install.md) has
independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`. R2-03 remains
unauthorized and N-FILE-110 remains inactive.

## Authority and candidate

Product Owner accepted R2-01 as `CLOSED | PASS CHECKPOINT` and authorized
R2-02 only. The approved roadmap is
`docs/plans/authorization-v1/uploadthing-r2-migration-repository-review.md`.
The current Files architecture keeps R2 behind the semantic ObjectStorage
port. No provider, application upload route, Case attachment, or cleanup worker
was changed in this checkpoint.

Changed source: `prisma/schema.prisma`; new additive
`prisma/migrations/20261007120000_r2_object_storage_allocation/migration.sql`
(SHA-256 `2bd36498143ef7eceda2de046be80ec061ef9b042ee266dea6bf036d0e0470f6`);
regenerated `generated/prisma` and `prisma/generated`; and this packet's
`scenarios.cjs`. The already dirty worktree and all installed historical
migrations were preserved. At this candidate gate it was **not** applied to
normal development; the later, separately authorized installation is recorded
in `normal-development-install.md`.

The migration adds `StoredFileProvider.OBJECT_STORAGE` as a stable LabOS
backend label. It carries no R2 vendor, bucket, endpoint, account, credential,
signature, URL, or ETag identity. A permanent `ObjectStorageKeyAllocation`
table records the exact `objects/{uuidv4}` key, unique source grant ID,
allocation time and nullable latest write-capability expiry. The ledger has
no grant FK, so a grant/tenant cascade cannot erase the key or expiry fence.
Its identity cannot update or delete; TRUNCATE is denied. The only permitted
update is a finite monotone expiry extension while the exact matching Case
`OBJECT_STORAGE` grant is `PENDING`, with a grant row lock.

For new Case object-storage grants, the existing identity guard requires a
`PENDING` status, exact opaque key at INSERT, checked suffix, canonical
tenant/Case/Member match, and permanently NULL `providerFileUrl`. An AFTER
INSERT trigger allocates the key in the same transaction; uniqueness prevents
concurrent allocation and reuse after grant deletion. New non-Case
`OBJECT_STORAGE` grants are rejected until separately authorized. UploadThing
Case and non-Case grant behavior, including historical nullable key and URL,
is preserved. A deferred final-state guard requires a matching non-null
allocation fence before an `OBJECT_STORAGE` Case grant can be `UPLOADED` or
`CONSUMED`. The existing evidence binding/S001 CHECK, StoredFile immutability
and CaseAssetFile mode/evidence guards remain provider independent and were
not rewritten.

The stored expiry is a conservative upper bound for all write capabilities
that may have been delivered for that key, distinct from grant expiry. R2-03
must keep any signed URL undisclosed until it locks/rechecks the exact
`PENDING` grant, commits an allocation bound covering the adapter's actual
expiration, and only then returns the bearer capability. A failed delivery
may leave an over-conservative fence. Future cleanup must consult this ledger
and wait for the bound plus the separately approved skew; no cleanup lifecycle
was implemented here.

## Verification

- `prisma validate`: PASS. Direct CLI invocation was required because this
  shell's `pnpm exec prisma` shim was not resolved.
- Prisma Client and Zod generation: PASS with the project `.bin` directory on
  `PATH`; 264 generated paths appeared changed/new in the dirty worktree.
- `node --check scenarios.cjs`: PASS; `git diff --check -- prisma/schema.prisma`:
  PASS (line-ending warning only).
- Broad `tsc --noEmit` remains FAIL on five retained historical evidence
  harness imports under `docs/evidence/`; it reports no current application,
  schema-generated, or R2-02 source error.
- Read-only target attestation rejected the stopped, inaccessible local
  PostgreSQL service and unavailable Docker daemon. A fresh run-owned
  PostgreSQL 18.4 cluster was created under
  `experiments/r2-02-pg-8bb9ea6ae2104dff93c5aa7b4813b7ff`, bound only to
  `127.0.0.1:55483`. Direct `SHOW` confirmed exact data directory, version,
  listen address and port. No `.env` database target was used.
- Prisma deployed all 53 migrations to the fresh isolated
  `r2success3ee2afd30a` database with the exact final candidate. The final
  synthetic, collision-resistant scenario run was **23/23 PASS**:
  automatic key allocation; URL insert/mutation denial; immutable key and
  ledger; UUID shape; non-Case restriction; finite/monotone expiry; terminal
  freeze; grant deletion retention; permanent nonreuse; historical UploadThing
  behavior; concurrent same-key allocation; concurrent expiry maximum;
  final-state fence denial; positive exact `OBJECT_STORAGE` grant/evidence/
  StoredFile binding; and stable enum labels.
- `prisma migrate diff --from-config-datasource --to-schema ... --exit-code`
  against the isolated success database: **No difference detected**, exit 0.
- In a separate fresh `r2rollback6379427cb5` database, all 52 predecessor
  SQL files applied. A run-owned injected copy of the final candidate failed
  at `SELECT 1/0` before `COMMIT`. Both the enum label and new table were
  absent (`0`/`0`), proving full candidate DDL rollback. The canonical
  candidate then retried successfully; both appeared (`1`/`1`). Retained
  sanitized outcomes are in `rollback-results.txt`. PostgreSQL accepts the
  new enum label inside the transaction because its first use is in stored
  trigger bodies after commit.

Harness-only setup failures were kept separate from candidate defects: an
initial `initdb` argument form failed; the corrected Windows startup needed
an elevated restricted-token launch. The first scenario run's reuse assertion
omitted a required `updatedAt`; a later run reused a fixed historical key;
both were corrected in the run-owned test script. The first rollback probe's
catalog query had a PowerShell quoting error. Independent CODE review then
identified that the initial candidate had a two-phase enum addition. The
candidate was corrected to one transaction; all accepted apply, matrix, diff
and failure-rollback evidence above was rerun on fresh databases against the
final hash. Initial two-phase runs are superseded.

## Normal-development installation and boundary

After Product Owner acceptance, the exact reviewed candidate was installed
once in the attested normal development database. Its stored checksum matches
the source; 53 migrations are complete, Prisma status and schema diff pass,
and independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT` confirms the live
enum, allocation ledger and triggers. The two historical provider-null grants
remain; no allocation, evidence or StoredFile row was created. Full sanitized
installation evidence is in [normal-development-install.md](normal-development-install.md).

## Candidate-gate limits retained

At the earlier candidate gate, no normal development or production database
migration, provider operation, browser upload, Case route/completion, StoredFile/Case attachment production
path, cleanup worker, N-FILE-110 activation, stage, commit, push or deployment
ran. SQL synthetic rows prove persistence compatibility only. The exact
isolated cluster was stopped, `127.0.0.1:55483` had no listener, and the
verified run root was removed with `Remove-Item -LiteralPath`. `Test-Path`
confirmed root absence and `pg_isready` again confirmed no listener. Thus all
run-owned databases, credentials and fixtures were removed. Independent V3
`RUNTIME_EVIDENCE` review passed below. Normal-development installation then
passed separately as described above. No production migration, provider
operation, Case route, cleanup or deployment ran in R2-02.

## Independent reviews

Independent V3 read-only `PASS | CODE/SQL` on corrected candidate SHA-256
`2bd36498143ef7eceda2de046be80ec061ef9b042ee266dea6bf036d0e0470f6`.
The reviewer found the original two-phase enum rollback defect; the migration
was corrected to a fully transactional candidate and all accepted runtime
checks reran on fresh disposable databases. No remaining code-level defect
was found. Independent V3 read-only `PASS | RUNTIME_EVIDENCE` verified the
final hash, 53 completed Prisma migrations in the fresh success database,
23/23 synthetic matrix, no-drift comparison, full enum/table rollback and
retry, and final exact-cluster/loopback absence. That candidate review alone
did not claim normal-development or production installation, provider/browser behavior,
Case flow, cleanup lifecycle or N-FILE-110 activation.
