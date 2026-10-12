# R2-03 Case object-storage upload intent and completion

Status: **CLOSED | PASS CHECKPOINT** after Product Owner acceptance on 2026-10-07.
R2-02 is `CLOSED | PASS CHECKPOINT`. N-FILE-110 HTTP routes remain
closed. R2-04 was unauthorized during the R2-03 work and was separately
authorized upon Product Owner acceptance.

## Scope and implementation

R2-03 changed these files only: `.agent/current-task.md`, `docs/current.md`,
`docs/plans/authorization-v1/uploadthing-r2-migration-repository-review.md`,
this packet, `modules/labos-files/case-asset-stage.contract.ts`,
`case-asset-stage.repository.ts`, `case-object-storage-activation.ts`,
`case-object-storage-upload.ts`, `case-object-storage-completion.ts`,
`jpeg-r001/grant.ts`, `jpeg-s001/validate.ts`, `jpeg-s001/finalize.ts`,
`object-storage/config.ts`,
`app/api/cases/[caseId]/clinical-upload/intent/route.ts`,
`app/api/cases/[caseId]/clinical-upload/complete/route.ts`, `next.config.ts`,
`tests/unit/modules/labos-files/case-asset-stage.test.ts`,
`tests/unit/modules/labos-files/r2-03.test.ts`,
`tests/unit/modules/labos-files/jpeg-s001/validate.test.ts`,
`tests/unit/modules/labos-files/jpeg-s001/finalize.test.ts`, and
`tests/integration/r2-03-case-composition.test.ts`. No schema, migration,
generated output, dependency or provider adapter file changed in R2-03.

The saved-DRAFT Case stage writer now accepts an `OBJECT_STORAGE` mode. It
generates a fresh `objects/{uuidv4}` key in Files and creates the exact
`PENDING` grant; the installed R2-02 trigger allocates the permanent ledger row
in that same transaction. The legacy UploadThing stage remains the default.

The Case issuer reads the session tenant, transactionally locks and rechecks
the exact PENDING grant, DRAFT Case, Member, current role, active assignment and
ledger binding. It requests an exact-key create-only capability through the
provider-independent `ObjectStorage` port outside the transaction. A second
serializable transaction repeats the locks/authorization, commits a monotone
ledger fence at or beyond the adapter's authoritative expiration, and only
then returns the bearer capability. A terminalization race drops the signed
capability without disclosure. The URL/signature is never persisted or logged.

Completion accepts only a grant ID and the Case path selector. It resolves the
authenticated tenant and transaction-fresh PENDING grant/Case/Member/ledger
before provider access. The path must match the saved Case. The semantic port
inspects and retrieves one exact key under the 33,554,432-byte encoded bound;
retrieved bytes must match the inspected length. The existing S001 byte core
validates those exact bytes. The existing finalizer rechecks identity and
authorization, inserts immutable evidence with `OBJECT_STORAGE` and the exact
key/suffix/hash, and atomically moves one grant `PENDING -> UPLOADED`.

Two new POST routes carry the minimal opaque intent and grant-ID completion
contracts. Both return 404 while `CASE_OBJECT_STORAGE_UPLOAD_ACTIVE` is false.
No Case UI is connected. The S001 native output trace is assigned to the
future completion route. No StoredFile, CaseAssetFile, version, attachment,
private-open or cleanup path is invoked.

R2 configuration is loaded only by server infrastructure. Files application
modules import the semantic `ObjectStorage` type and contain no AWS SDK, R2
endpoint, bucket, account, ETag or SigV4 dependency. Historical UploadThing
ingestion and evidence remain in place.

## Original verification, preserved

- Focused unit regression: **61/61 PASS** across saved-DRAFT staging, issuer,
  S001 validator/finalizer and route activation gate. Unit cases include
  create-only contract shape, fence commit before disclosure, terminal race,
  Member mismatch, exact key/encoded bound, Case-path mismatch, and stable
  provider/evidence binding.
- TypeScript: no new source/test diagnostics. Repository-wide `tsc --noEmit`
  reports five historical evidence-harness missing imports documented by R2-02.
- Fresh run-owned PostgreSQL 18.4 cluster at loopback port 55491, run root
  `experiments/r2-03-pg-cac1b10684004de48228d8163fa3d6f8`, was attested
  by database name, server address/port, version and exact data directory.
  All 53 migrations applied. The isolated composition matrix passed **7/7**
  with synthetic non-clinical fixtures: atomic key/fence, successful exact-byte
  S001 evidence/finalization, replay denial, wrong Case, oversized/invalid
  bytes, changed Member role, non-DRAFT Case, monotone repeated issuance,
  terminal issuance denial, and one-winner concurrent completion. It confirmed
  no StoredFile is created at completion.
- The first disposable attempt used the host's `Asia/Baghdad` PostgreSQL
  timezone and exposed the timestamp-without-timezone/raw-clock mismatch.
  Issuance failed closed before signing. The run-owned cluster was set to UTC;
  `SHOW timezone` confirmed UTC before the passing matrix. That was a
  configuration assumption for the original evidence, **not a passed non-UTC
  claim**. A second harness failure was an invalid synthetic Case UUID;
  the fixture was corrected. A standalone native identity probe failed in
  Vitest, so the database matrix used the accepted Julusian backend with a
  pinned identity mock, as existing S001 byte-core tests do. The real byte
  core processed the synthetic baseline JPEG; identity/load conformance
  remains established by its earlier checkpoint, not this matrix.
- New R2 provider operations: **NOT_RUN**. R2-01 already proved the unchanged
  adapter's real private exact-key and create-only capability semantics. The
  R2-03 composition matrix uses a non-vendor fake; no R2 object was created.
- Before teardown, read-only exact-scope inventory found 22 run-owned grants,
  22 permanent allocations, four clinical-evidence rows and zero StoredFiles.
  PostgreSQL was stopped; the exact run root was recursively removed after
  absolute-path and reparse-point checks. Its filesystem path and loopback
  listener are independently absent. All synthetic rows vanished with that
  isolated cluster.

Original independent V3 `PASS | CODE/ARCHITECTURE` found no material defect
after inspecting the active code path, R2-02 SQL guard, provider boundary and
61 focused tests. Original independent V3 `PASS | RUNTIME_EVIDENCE` assessed
the 7/7 isolated matrix, UTC and pinned-native-identity limits, inherited
R2-01 provider conformance, and exact database cleanup. Both reviews found
no material defect or unresolved architecture decision within their original
scope; neither was Product Owner acceptance.

## Product Owner bounded timezone correction (2026-10-07)

The Product Owner held R2-03 acceptance for the non-UTC correctness issue.
This supplement preserves the UTC run above as historical evidence. It does
not change the installed R2-02 schema/migration, provider contract, S001
semantics, route activation, or normal-development database.

| Value/path | Database and application representation | Non-UTC finding and correction |
| --- | --- | --- |
| R2 write capability `expiresAt` | The unchanged R2 adapter derives a JavaScript `Date` absolute instant from signed UTC `X-Amz-Date` plus lifetime. | The adapter unit test verifies the signed expiry; no adapter change. |
| `FileUploadGrant.expiresAt` and `createdAt` | Installed `timestamp without time zone`; LabOS uses UTC wall-clock values and Prisma `Date` maps their UTC fields correctly. | Raw `clock_timestamp()` is `timestamptz` and PrismaPg returned it +3 hours under `Asia/Baghdad`. Issuer, reservation, and finalization now request `clock_timestamp() AT TIME ZONE 'UTC'` before comparing with grant dates. Saved grant timestamps remain unchanged. |
| `ObjectStorageKeyAllocation.latestWriteCapabilityExpiresAt` | Installed `timestamptz(6)`, an absolute instant. The R2-02 trigger uses native PostgreSQL `timestamptz` checks against `clock_timestamp()`. | PrismaPg model read returned a Date +3 hours, while binding a JS Date to raw `timestamptz` compared it -3 hours. Issuer now compares and conditionally updates in PostgreSQL using the adapter Date's UTC ISO string explicitly cast to `timestamptz`, under the locked PENDING transaction. It confirms the persisted fence covers the same instant before disclosure. |
| `CaseClinicalUploadEvidence.validatedAt` | Installed `timestamptz(6)`; private S001 retained epoch is an absolute instant. | PrismaPg Date insertion under `Asia/Baghdad` shifted this instant -3 hours and the installed evidence guard rejected finalization. The OBJECT_STORAGE finalizer now binds the UTC ISO instant explicitly as `timestamptz` in the same transaction. The historical UPLOADTHING Prisma insertion path is untouched. |
| `FileUploadGrant.uploadedAt` | Installed UTC-wall `timestamp without time zone`. | The corrected UTC-wall database clock is used for the conditional `PENDING -> UPLOADED` update. |

A fresh run-owned PostgreSQL 18.4 cluster on `127.0.0.1:55492`, exact run
root `experiments/r2-03-tz-b2578b2153d644c38d30baa4900fa9dd`,
was attested by database name, address/port, server version, data directory
and `SHOW TimeZone = Asia/Baghdad`. All 53 installed migrations applied.
A direct probe measured against PostgreSQL `extract(epoch)`: raw
`clock_timestamp()` mapped +10,800,000 ms through PrismaPg; UTC-wall clock
mapped 0 ms; JS Date bound to `timestamptz` mapped -10,800,000 ms;
the same Date bound to `timestamp` mapped 0 ms; Prisma model read of an
allocation `timestamptz` mapped +10,800,000 ms. These are diagnostic
observations of this exact adapter/session, not a new deployment invariant.

After correction, focused unit/contract tests passed **66/66** across five
files, including signed capability expiry and SQL fence/finalization binding.
A fresh `Asia/Baghdad` disposable composition run passed **7/7**: issuance,
ledger fence, exact-byte S001 completion, immutable evidence,
authorization/state failures, replay, and one-winner completion. SQL epoch
assertions establish that the ledger fence equals the returned capability
expiration and evidence `validatedAt` falls within the completion interval
as the same absolute instant. A separate three-test diagnostic probe passed,
for **10/10** disposable tests in that run. The temporary diagnostic probe
harness was removed after its measurements; the seven-case composition
harness remains. Repository-wide `tsc --noEmit`
reports only the same five historical evidence-harness missing-import errors
listed above; no new source/test diagnostics.

No real R2 Case operation ran, and no provider object exists from this
correction. Normal-development and production databases were not mutated.
N-FILE-110 activation, first attachment, private-open, cleanup and non-Case
migration were `NOT_RUN` at this pre-acceptance point. R2-03 was **OPEN**
pending independent rereview and Product Owner acceptance; R2-04 was
unauthorized at that time.

### Independent rereview and fixture cleanup

Independent V3 `PASS | CODE/ARCHITECTURE` inspected the corrected issuer,
reservation, finalization, installed R2-02 trigger/schema, adapter expiry and
tests. It found no material defect, scope drift or provider-boundary breach.
Independent V3 `PASS | RUNTIME_EVIDENCE` read the live disposable target
without mutation and independently attested PostgreSQL 18.4, database
`postgres`, `127.0.0.1:55492`, `Asia/Baghdad`, and exact run-owned data
directory. It checked the SQL epoch assertions and direct database state:
35 grants, 35 allocations, five evidence rows, zero StoredFiles; all five
UPLOADED grants had evidence and no evidence instant fell outside its
UTC-interpreted grant lifetime. Seven unfenced PENDING rows were from failed
pre-correction probes, not accepted uploads. They disappeared with teardown.
Both verdicts are scoped review findings, not Product Owner acceptance.

After review, the exact cluster was stopped with `pg_ctl -m fast`. Its
resolved path was verified beneath the workspace, with the expected exact
basename and no reparse-point attribute, before recursive removal. The run
root is absent and loopback port 55492 has no listener. No normal-development
or production database was touched. No real R2 Case object was created.
At the time of this supplement, R2-03 remained **OPEN** for Product Owner review.


## Product Owner checkpoint acceptance

The Product Owner accepted corrected R2-03 and its supplemental non-UTC
evidence as `CLOSED | PASS CHECKPOINT`. Capability expiry, allocation fence
and OBJECT_STORAGE S001 validation time remain absolute instants. Grant
timestamp-without-timezone fields retain UTC-wall semantics; correctness does
not depend on a UTC PostgreSQL session. The accepted PENDING-only issuance,
fence-before-disclosure, untrusted completion, exact bounded retrieval,
immutable S001 evidence and atomic PENDING-to-UPLOADED invariants remain.
Real R2 Case end-to-end runtime is explicitly NOT_RUN; it cannot be inferred
by combining R2-01 adapter runtime with R2-03 disposable composition.
R2-04 was separately authorized. R2-05, route/UI activation, cleanup and
deployment remain unauthorized.
