# R2-04 first attachment and private open

Status: **CLOSED | PASS CHECKPOINT** after Product Owner acceptance on 2026-10-07.
Authority: Product Owner accepted R2-03 as `CLOSED | PASS CHECKPOINT` and
separately authorized R2-04 only. R2-05, N-FILE-110 activation, real R2 Case
end-to-end runtime, cleanup, non-Case migration and deployment are unauthorized.

## Implementation and preservation

- `case-clinical-first-attachment.ts` retains the accepted two-phase fresh
  retrieval, exact evidence length and application SHA-256 comparison, fresh
  authorization/state snapshot, and one serializable transaction for StoredFile,
  CaseAssetFile, first version/current pointer and UPLOADED-to-CONSUMED. For
  OBJECT_STORAGE it uses the semantic port's bounded exact-key retrieve and
  writes logical provider OBJECT_STORAGE, PRIVATE access and MANAGED_PRIVATE
  mode. The UploadThing retrieval and PUBLIC_READ/MANAGED_PUBLIC branch remains.
  Grant timestamp-without-timezone checks use UTC-wall database clock under
  non-UTC PostgreSQL sessions.
- `case-public-open.ts` retains strict identifier-only Case selectors, fresh
  `case.read` before lookup, tenant/current-version/file/grant/evidence/
  CONSUMED checks and the historical UploadThing public resolver. Only an
  exact OBJECT_STORAGE/PRIVATE/MANAGED_PRIVATE row can request a short-lived
  exact-key GET capability from ObjectStorage. The opaque bearer URL is returned
  only by the narrow no-store open route after issuance audit permits delivery.
  ObjectStorage configuration is composed in the route; Files application
  modules depend only on the semantic port.
  It is absent from normal Case DTOs and durable file identity. Public rows
  never invoke C3 signed-read audit or the private adapter.
- `case-file-access-audit.ts` persists only allowlisted issuance facts. Its
  issuedAt/expiresAt columns are installed `timestamptz` absolute instants;
  the issued branch binds explicit ISO UTC strings to avoid PrismaPg's
  non-UTC Date shift, and supplies the Prisma-generated UUID explicitly in
  raw SQL. No URL, key, signature, bucket or provider metadata is recorded.
- No schema, migration, generated output, dependency, R2 adapter or Case DTO
  source changed. Historical UploadThing rows are neither rewritten nor
  reinterpreted. The Case upload HTTP gate remains closed.

Files changed in this checkpoint: `modules/labos-files/case-clinical-first-attachment.ts`,
`modules/labos-files/case-public-open.ts`,
`modules/labos-files/case-file-access-audit.ts`,
`tests/unit/modules/labos-files/case-clinical-first-attachment.test.ts`,
`tests/unit/modules/labos-files/case-public-open.test.ts`,
`tests/unit/modules/labos-files/case-file-access-audit.test.ts`,
`tests/integration/r2-04-case-attachment-open.test.ts`,
`tests/unit/app/api/cases/public-open.route.test.ts`,
`app/api/cases/[caseId]/assets/[assetId]/open/route.ts`, this packet,
`docs/current.md`, `.agent/current-task.md`, the migration roadmap status,
and the R2-03 packet closure entry. These are scoped changes in an already
dirty worktree; unrelated changes were preserved.

## Verification to date

- Focused unit tests: **99/99 PASS** across attachment, open, C3 audit and
  no-store open route. Cases include historical public resolution, private
  authorization and tenant/current-pointer/evidence/CONSUMED failures,
  second-retrieval wrong length/SHA, no legacy fallback, bounded GET
  capability shape/expiry, audit-before-disclosure, and generic failure.
- Normal DTO/route regression: **13/13 PASS**; the managed private Case
  summary remains capability-free.
- TypeScript: no new source/test diagnostics; repository-wide `tsc --noEmit`
  retains five historical evidence-harness missing-import errors.
- Fresh run-owned PostgreSQL 18.4 at `127.0.0.1:55493`, exact data root
  `experiments/r2-04-pg-0b4928b77d6244b88415b18163693c9e/data`,
  was attested by database name, address/port, version, data directory and
  `Asia/Baghdad` timezone. All 53 installed migrations applied on this
  disposable target. Six synthetic non-clinical Case composition scenarios
  now pass: private chain/CONSUMED after second retrieval, wrong-length/SHA
  denial with no partial file, one-winner concurrent attachment, real
  `case.read`/private-read/C3 audit composition with no bearer persistence,
  forced post-write conditional-consume rollback, and exact signed-read
  audit SQL epoch preservation. The final matrix is **6/6 PASS**.
  The first run had a
  local raw-insert ID omission (`23502`), corrected before the passing run.
  This failed attempt remains recorded as part of the evidence. A later
  execution-helper reset stopped the disposable PostgreSQL process; its exact
  data directory remained intact. The cluster was restarted, reattested at
  the same loopback target and non-UTC timezone, and the final matrix reran
  **6/6 PASS**.
- Real R2 Case end-to-end runtime: **NOT_RUN**. The provider is a non-vendor
  fake in disposable composition; unchanged R2 adapter conformance belongs
  to R2-01. No provider object or bearer was created externally.
- Independent V3 `PASS | CODE/ARCHITECTURE`: no material defect. The
  reviewer inspected the final dependency direction and attachment/open
  authorization, integrity, transaction and historical compatibility paths;
  its independent focused run passed **106/106** across attachment, open,
  audit, route and DTO coverage. Scoped R2-04 whitespace review found no
  defect; repository-wide diff diagnostics arise in pre-existing/generated
  files outside this checkpoint.
- Independent V3 `PASS | RUNTIME_EVIDENCE`: the reviewer independently
  reattested the live PostgreSQL 18.4 target, exact directory and
  `Asia/Baghdad` session timezone, and assessed the final **6/6** matrix.
  Read-only inventory found 24 CONSUMED grants each with one StoredFile,
  14 UPLOADED grants with none; all 24 files were OBJECT_STORAGE/PRIVATE and
  all 24 assets MANAGED_PRIVATE. It found zero invalid grant/file or
  evidence/file bindings, zero persisted provider URLs or invalid synthetic
  key forms, and zero invalid signed-read audit lifetimes.
- Exact cleanup: after independent review, the cluster stopped with
  `pg_ctl -m fast`. Its resolved target was verified inside this workspace,
  with exact basename and no reparse attribute, before recursive removal.
  The run root is absent and loopback port 55493 has no listener. All
  synthetic database fixtures vanished with the isolated cluster.

R2-04 remains **OPEN** pending Product Owner review. The historical first
run remains a recorded failed attempt; the corrected final matrix and exact
fixture cleanup are established above.


## Product Owner checkpoint acceptance

The Product Owner accepted R2-04 as `CLOSED | PASS CHECKPOINT` based on
independent V3 CODE/ARCHITECTURE and RUNTIME_EVIDENCE PASS. Accepted invariants
include bounded fresh second retrieval, exact immutable-evidence length/SHA,
atomic first private attachment and CONSUMED transition, fresh Case-read and
current identity checks before private signed read, narrow audited bearer
disclosure, capability-free DTO/audit persistence and retained UploadThing
PUBLIC_READ/MANAGED_PUBLIC interpretation. Real R2 Case end-to-end runtime
remained NOT_RUN at R2-04 and is the separately authorized R2-05 gate.
