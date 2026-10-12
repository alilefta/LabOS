# S001 clinical-evidence atomic finalization — attempt #2

Scope: CODE/ARCHITECTURE + disposable PostgreSQL RUNTIME_EVIDENCE/CHECKPOINT. The previous suffix-provenance finalization attempt remains a separate historical `BLOCKED_DECISION`, with its CODE/runtime/review `NOT_RUN`. This packet does not revise that result.

## Implemented boundary

`modules/labos-files/jpeg-s001/finalize.ts` introduces a server-only finalizer. It accepts the narrow S001 result only when the outer validator's private WeakMap supplies retained grant/original/completion time and the retained original still matches length and SHA-256. In a serializable PostgreSQL transaction it locks the exact grant, rechecks live PENDING N-FILE-110 target identity and suffix/key/provider, locks the DRAFT Case and checks Lab/Organization, Member and fresh `case.asset.add` authority. It inserts the installed immutable evidence shape using the fresh checked suffix and canonical provider key, then conditionally transitions that grant to UPLOADED. Errors become generic `S001Unavailable`; no provider, asset, or route operation is added.

The evidence timestamp is the retained post-validation completion instant, not insertion time. The installed evidence triggers, composite provider-key FK and deferred grant/evidence relationship remain enabled. The finalizer does not rerun JPEG decode.

Source SHA-256: `finalize.ts` `2497f3fff39753b4b0555816ef88062c65f66f4a26097208b65fbf5f02eb7bf1`. Exact installed checked-suffix migration SHA-256: `3e150d41429c58d44a902473ff4b9d4fbc4c0d9afb29955e8d124f899e6bd23d`. No schema/migration edits occurred.

## Verification

- Focused S001/R001/grant/callback/route tests: 163/163 PASS in 14 files. The narrower initial set was 133/133 PASS.
- Prisma schema validation: PASS. Disposable database migration status: 52/52 complete, no failed rows, up to date. Datasource/schema diff: no difference.
- Affected ESLint: PASS. `git diff --check`: PASS with preexisting line-ending warnings only.
- Broad `tsc --noEmit`: four preexisting retained-experiment import errors only; no finalizer or affected-test errors after correction. The four retained-experiment errors were not repaired.
- Normal development database: no writes or synthetic fixtures in this gate.

### Disposable runtime target

Unique run root: `experiments/s001-finalize-89df96266df5`. Run-owned PostgreSQL 18.4 x64 cluster bound only to `127.0.0.1:55487`, databases `postgres` and `finalize_historical`. Both use synthetic organization/Member/Case/grants; no clinical/provider object or credential. Canonical 52 repository migrations were applied to the main database. The historical database received the 51 predecessors, a null-suffix Case grant, then exact migration 52. The cluster was set to UTC after an initial fixture test exposed the local Asia/Baghdad session timezone mismatch in the existing clock mapping; no production source was altered. PostgreSQL schema remained otherwise canonical.

The retained [runtime harness](runtime-harness.test.ts) SHA-256 is `182d58e6948eac4535c9aa77000c96e1fb0066d30ef86df4c4fc390f01d36c92`. It uses the actual grant resolver, outer retained context, finalizer, Prisma transactions, and installed SQL triggers. Provider retrieval, codec identity and byte-core output are synthetic mocks only to construct nonclinical outer results. They are not runtime proof of provider or codec behavior. [Raw bounded test output](runtime-raw.txt) records 8/8 PASS; final concurrency rerun observed 2 overlapping PostgreSQL lock waiters, one fulfilled transaction and one rejected transaction.

| Runtime scenario | Result | Evidence |
| --- | --- | --- |
| Valid JPG/JPEG atomic commit and exact S001 field/timestamp mapping | PASS | Both suffixes commit one evidence row with UPLOADED; exact retained timestamp asserted. |
| Second/stale finalization | PASS | Generic reject; one evidence row remains. |
| Changed non-DRAFT Case and expiry | PASS | Generic reject; grant remains PENDING and evidence absent. |
| Evidence-side failure | PASS | Run-owned fault trigger; no evidence or consumption. |
| Grant-transition failure | PASS | Run-owned fault trigger after evidence insert; both roll back. |
| Deferred finalization trigger failure | PASS | Run-owned post-transition invalidation inside transaction; commit rejects, both roll back. |
| Transaction exception after both writes | PASS | Throw before commit; both roll back. |
| Genuine concurrent same-grant race | PASS | Two lock waiters; one commit, one reject; final state one evidence and UPLOADED. |
| Installed suffix/key immutability guards | PASS | Both attempted mutations reject; finalizer still uses original authoritative grant. |
| Revoked/unknown Member role at finalization | PASS | Fresh authorization denies; no evidence or consumption. |
| Historical NULL suffix | PASS at SQL trigger boundary | Predecessor grant survives migration NULL/PENDING; the [executed SQL](historical-null-attempt.sql), [raw rejection](historical-null-result.txt), and [postcondition](historical-null-postcondition.txt) show zero evidence. Outer resolver CODE separately rejects NULL; no provider call. |
| Mismatched suffix/wrong canonical provider key | PASS at SQL trigger boundary | Both [executed inserts](mismatch-executed.sql) reject with zero evidence and PENDING grant in the [raw result](mismatch-result.txt). Application stale mismatch is covered by CODE tests. |
| Evidence immutability | PASS | UPDATE old field and DELETE rejected after success; row persists. |

The runtime harness is purpose-bound and stored only as evidence, not an automatic application test. Both exact run-owned database clusters and the local execution copy of the harness were removed after evidence capture.

## Scope limits

This gate does not execute live UploadThing retrieval, real Julusian decode, a live Case upload, Vercel deployment, asset creation, or route activation. The earlier Preview codec-only structural-pass/Julusian-fail fixture remains `NOT_RUN`. S001/R001 semantics and native identity pins are unchanged. No cleanup/deletion of provider objects is implemented.

## Review and routing

Independent V3 review: **PASS | CODE/ARCHITECTURE + RUNTIME_EVIDENCE/CHECKPOINT**. The first checkpoint review identified malformed cleanup prose and missing retained SQL rejection outputs; both were corrected. The independent re-review confirmed both run roots/listeners absent, retained historical-null and suffix/key rejection outputs, 8/8 main runtime scenarios and the two-waiter race, with no material finalizer CODE finding.

## Cleanup attestation

PostgreSQL was stopped with the exact run-owned `pg_ctl` target. The `127.0.0.1:55487` listener was absent. Resolved target `experiments/s001-finalize-89df96266df5` was verified under the workspace `experiments` directory, removed, then verified absent. The temporary `tests/integration/s001-finalize-disposable.runtime.test.ts` execution copy was removed and verified absent; the sanitized durable harness and evidence remain in this packet. No normal-development, staging, production or unrelated database/resource was cleaned.

A second fresh run-owned PostgreSQL 18.4 cluster at `experiments/s001-finalize-evidence-0f55df2b923c`, bound to `127.0.0.1:55621` with UTC session timezone, installed 51 predecessors, then the historical NULL Case fixture, then the exact checked-suffix migration. The retained SQL outputs above were captured before shutdown. That exact cluster was stopped; port 55621 listener was absent; the resolved run root was removed and verified absent. The first cluster cleanup status above remains unchanged.
