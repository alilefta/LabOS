# N-FILE-110 first clinical attachment — CODE and disposable PostgreSQL

Status: independent V3 **PASS | CODE/ARCHITECTURE + RUNTIME_EVIDENCE/CHECKPOINT**. The independently accepted first-attachment architecture is the controlling decision. N-FILE-110 remains inactive. No live provider, Case upload, normal-development mutation, migration, or Vercel deployment occurred.

## Implemented boundary

`modules/labos-files/case-clinical-first-attachment.ts` adds a server-only grant-ID selector. A read-only serializable preflight checks exact N-FILE-110 UPLOADED grant, checked suffix, immutable S001 evidence, canonical Case/Lab/Organization, current grant creator and `case.asset.add` policy, expiry, and absence of a StoredFile before any provider call. It calls the existing `retrieveReservedUploadThingBytes` with only the persisted key. The private original Buffer must equal evidence `measuredSizeBytes` and `contentSha256`; no S001 decode runs. A second serializable transaction locks grant and Case, repeats the authority/state checks and Buffer equality, then creates StoredFile, MANAGED_PUBLIC CaseAssetFile, version 1, current-version pointer, and conditionally transitions the exact grant to CONSUMED. Errors map to one bounded `CaseClinicalAttachmentUnavailable`. Evidence is read-only. No provider URL or Buffer is persisted or returned.

`modules/labos-files/case-public-open.ts` now requires the source grant to be CONSUMED in addition to its existing fresh read authorization, evidence, key, current-version and public-access checks. No route is activated.

The exported factory permits a synthetic transport and disposable Prisma target in tests; the default production export binds the real generalPrisma and accepted exact-key retrieval. There is no caller-supplied tenant, Case, provider, key, URL, evidence or asset identity.

## Source identity

- `case-clinical-first-attachment.ts`: SHA-256 `2f1914485391f909caf6997647fb9f1979924363f3afeabc91234f3efc481648`
- `case-public-open.ts`: SHA-256 `2de0ba9cdba84af1951fb382f291e1b24f598da35bf20c8e8b82e6f73d0127b6`
- `case-clinical-first-attachment.test.ts`: SHA-256 `591cb4b620ae892c8b7b3eacf23f11bff4181c2d54f67e26a3d0ebba67337b06`
- `case-public-open.test.ts`: SHA-256 `3e3f1feb7155a667eb2bf399b72b78036d124cf1da826ab406e7db7a3e7f75e1`
- Retained [runtime harness](runtime-harness.test.ts): SHA-256 `56562725062d544f4f679b39352a42316a577e16bd6606d10c39f36de228d627`

## Focused and static verification

- Relevant S001/R001/grant/callback/staging/public-open/attachment unit suites: 15 files, 205 tests PASS.
- Affected production and unit ESLint: PASS. Disposable harness ESLint: PASS.
- Prisma schema validation: PASS. Canonical migrations: 52/52 installed in the final disposable database. Migration status: up to date. Datasource-to-schema diff: no difference.
- `git diff --check`: PASS; Git emitted only existing LF/CRLF warnings.
- Broad TypeScript: no errors in affected production/tests. Five retained experiment-source missing-import errors remain, outside this gate.

## Disposable runtime target and evidence

Run identity `first-attach-f6c6a50f`; exact Docker container `labos-attach-f6c6a50f`, label `labos.run=first-attach-f6c6a50f`, image `postgres:17.6`, PostgreSQL 17.6 Debian x86_64, bound only to `127.0.0.1:45671`. The fresh final database was `attach_final`; two earlier run-owned databases in the same disposable container were `postgres` and `attach_second` for the initial and tightened harness passes. All used synthetic LabOS rows and mock provider bytes. The final database received all 52 exact repository migrations via Prisma migrate deploy and was up to date. The first attempted host port 55497 was Windows-excluded; its created but never-started exact run-owned container was inspected and removed before the successful container start. No shared, normal-development, staging or production database was used.

The retained [raw final run](runtime-raw.txt) is 8/8 PASS. [Migration output](migration-raw.txt) and [status](migration-status.txt) are retained. The final harness executes actual first-attachment CODE and actual Prisma/PostgreSQL transactions/triggers; only provider retrieval is synthetic at the factory transport boundary. Thus this is not live UploadThing evidence.

| Scenario | Result | Runtime claim |
| --- | --- | --- |
| JPG and JPEG valid first attachment | PASS | Exact public StoredFile, Case asset, version 1, current pointer and CONSUMED/consumedAt commit; evidence unchanged. |
| Size mismatch; same-size changed bytes | PASS | Generic rejection, no new chain or grant consumption; retry refetches. |
| Case leaves DRAFT after retrieval | PASS | Transaction-fresh rejection; no new chain or consumption. |
| Creator authorization revoked after retrieval | PASS | Fresh policy rejection; no new chain or consumption. |
| Expired grant | PASS | Rejected before retrieval; no new chain. |
| Preexisting unattached StoredFile | PASS | Inconsistent state rejected before retrieval, not silently adopted. |
| File/asset/version/pointer/conditional-transition/post-write faults | PASS | Six injected failure boundaries against real PostgreSQL transactions; each leaves no new chain and UPLOADED grant. |
| Installed deferred managed-state trigger failure | PASS | A temporary in-transaction null current pointer causes COMMIT rejection; all new writes and consumption roll back. |
| Genuine concurrent same-grant attempt | PASS | Separate transactions, two observed PostgreSQL lock waiters, one commit and one generic rejection; one canonical chain. Raw record: `ATTACH_RACE {"overlappingLockWaiters":2,"fulfilled":1,"rejected":1}`. |
| Evidence UPDATE/DELETE after success | PASS | Installed immutability trigger rejects both; evidence facts remain. |
| Public-open non-CONSUMED and inconsistent chain | PASS at CODE level | CONSUMED success fixture and all other statuses rejected by focused tests; no live provider open. |
| Live UploadThing and Case route | NOT_RUN | Explicitly out of scope. |

The actual PostgreSQL schema is sufficient for the approved sole writer. Its installed constraints and unique indexes are exercised naturally; no trigger was disabled and no migration was authored. The provider byte identity check is an attachment-time observation, not proof that UploadThing objects remain immutable afterward.

## Review and cleanup

Independent V3 verdict: **PASS | CODE/ARCHITECTURE + RUNTIME_EVIDENCE/CHECKPOINT**. The read-only reviewer inspected the implementation, accepted architecture, installed schema/triggers, focused tests, retained raw migration/runtime evidence, race and cleanup record. It independently reran the attachment/public-open suites (58/58 PASS) and found no material code or runtime-evidence defect. Live provider and Case behavior remain `NOT_RUN`. The exact container `labos-attach-f6c6a50f` was inspected by ID, run label, loopback port and anonymous volume, then removed with its volume. Follow-up `docker ps -a` returned no matching container, `docker volume inspect` reported the exact volume absent, and no listener remained on 45671. The reviewer independently repeated those read-only checks and confirmed the exact container/volume and port 45671 listener absent. The temporary execution copy `tests/integration/first-attach-disposable.runtime.test.ts` was verified byte-identical to the retained harness, its resolved path was checked within this workspace, removed, and verified absent. The evidence files above remain. First attachment is not registered as a route and N-FILE-110 remains inactive.

**Single successor gate:** separately authorized N-FILE-110 rejected/orphan provider-object cleanup architecture decision, including finalized-but-unattached expiry and failed attachment responsibility. Do not activate the route or contact UploadThing automatically.
