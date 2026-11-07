# A1-I1 combined trigger correction and target runtime continuation — 2026-10-15

Status: **MIGRATION_INSTALLED | TARGET_RUNTIME_PARTIAL | A1-I1 BLOCKED_DECISION**. Scope: isolated synthetic `labos-verification` (`rvtubjrczuxdxfuazjmr`) only. This follows, and does not replace, the [pre-installation stop](trigger-correction-preinstall-stop-20261015.md) and [initial runtime stop](final-runtime-verification-20261015.md).

## Correction and installation

- The single forward-only migration is `prisma/migrations/20261015120000_case_cleanup_trigger_relation_qualification/migration.sql`, SHA-256 `c6b9f8c826adab0d59c1db1f3957030b2cc281a9a8edd7de383487311febce3d`. Installed migrations 1–54 were not changed.
- `FileUploadGrant_case_identity_guard` qualifies `public."member"`, `public."Lab"`, and `public."Case"`. Its predicates, signature, invoker mode, errors and trigger binding are retained.
- `FileUploadGrant_case_uploaded_evidence_final_state` selects only `id`, `boundaryId`, `purpose`, `status`, `organizationId`, `labId`, `targetId`, `provider`, `providerFileKey`, and `expiresAt` from the final `public."FileUploadGrant"` row. The worker already has column-level SELECT on these ten columns; it still lacks table-level SELECT. The deferred COMMIT-time predicates and invoker mode remain unchanged.
- Disposable PostgreSQL 17.6 with migrations 1–55 and representative restricted ACLs passed actual app S001 and worker update commits through the trigger chain, rejected missing evidence, invalid allocation fence and expired UPLOADED state at COMMIT, and preserved rows after failed transactions. App direct CLEANED and worker direct ACK writes remained denied. Independent pre-install V3: **PASS | CODE + SQL DESIGN + DISPOSABLE RUNTIME_EVIDENCE**.
- Fresh target preflight identified `labos-verification`, PostgreSQL 17.11, migration-owner `postgres.rvtubjrczuxdxfuazjmr`, 54 finished migrations with repository-matching names and SHA-256, the five private functions owned by the NOLOGIN ACK owner, and the reviewed app/worker ACLs. Controlled migration-owner session-pooler connection used certificate and hostname verification. `prisma migrate deploy` installed only migration 55 once. Postflight found 55 finished, zero incomplete, the accepted checksum, intact trigger bindings/deferred mode, unchanged public-function ownership/ACLs, five private functions still owned by the ACK owner, and unchanged app/worker execution and table grants. No Supabase-managed role or membership changed.

## Isolated target matrix

All operations below used the actual restricted identities through the Supabase transaction pooler with certificate and hostname validation. SQLSTATE and unchanged state were checked for denials. No R2 request occurred. A synthetic database-only ACK is **not** proof of provider object absence.

| Scenario | Result |
| --- | --- |
| Application S001 rejection of eligible retained PENDING grant | PASS: committed FAILED with `CASE_S001_REJECTED` |
| Application direct CLEANED/ACK, lease and claim writes | PASS denial: SQLSTATE 23514; grant unchanged |
| Application execution of worker claim, renewal, failure and ACK functions | PASS denial: SQLSTATE 42501 |
| Worker direct ACK/lease writes and S001 function execution | PASS denial: SQLSTATE 42501; grant unchanged |
| Worker FAILED/EXPIRED claim, generation 1; valid renewal, failure recording; synthetic ACK | PASS; ACK committed CLEANED only on a run-owned row with no R2 object/capability |
| Active lease second claim, stale generation, expired lease, premature retry | PASS denials: SQLSTATE 23514; unchanged rows |
| New run-owned future write fence and 60-second margin | PASS denial: claim rejected before durable fence plus margin, unchanged |
| Two concurrent restricted-worker claims | PASS: one generation-1 claim committed, the other denied after lock wait; one authority |
| Transaction rollback of worker renewal | PASS: lease timestamp and attempt count unchanged |
| Worker renewal with `Pacific/Kiritimati` session timezone | PASS: live absolute lease renewed; UTC decision unaffected in this path |
| Wrong-tenant grant insertion; exact-key rebinding | PASS denials: SQLSTATE 23514 and 23505; zero inserted rows |
| Worker LOGIN, effective ACL and Prisma application read after migration | PASS: worker current/session user correct, no full-table SELECT, ACK update, schema CREATE or owner assumption; restricted Prisma read counted synthetic rows |
| Canonical StoredFile/version/current-pointer exclusion on the actual target | **NOT_RUN**: no run-owned canonical StoredFile exists; inserting one requires a valid UPLOADED evidence/attachment flow and immutable retained records. The installed function predicates and earlier disposable review cover the code path, but this is not a target runtime assertion. |
| Missing-allocation denial on the actual target | **NOT_RUN**: immutable allocation guard prevents constructing a mismatched committed target row without bypassing it. Disposable invalid-allocation testing passed; target guard was not disabled. |
| Fresh Better Auth signup/login/session after migration | **NOT_RUN**: prior accepted D2 restricted-role smoke remains historical; this continuation did not create a new account or exercise callbacks. |

## Exact synthetic inventory and limits

The original three grant/allocation pairs from the initial stop remain: `a1i1rt-20261015-cc4a1590-valid` is FAILED with one attempt and `PROVIDER_AMBIGUOUS`; `...-fence` is CLEANED by a synthetic database-only ACK; `...-expired` is EXPIRED with one attempt and expired lease. One additional run-owned grant/allocation pair, `a1i1rt-20261015-combined-fence`, is FAILED with one claimed attempt and a lease. No StoredFile or CaseClinicalUploadEvidence exists for these four grants. The rejected wrong-tenant and exact-key-rebind attempts left zero rows. All four grant/allocation pairs remain identifiable and retained under installed immutability guards; none was deleted or bypassed. Existing D2 accounts and clinical evidence were not changed.

The migration and executed database-role matrix passed, but **A1-I1 cannot close** while the required target canonical protection and fresh Better Auth compatibility checks remain unexecuted. A1-I2, provider deletion, worker scheduling and N-FILE-110 activation remain unauthorized. No provider object was checked or deleted.

Independent final V3: **CORRECTION_REQUIRED | RUNTIME_EVIDENCE + CHECKPOINT**. The reviewer recomputed the migration checksum, accepted the narrow trigger fix and found no observed ACL/ownership regression, but identified the three `NOT_RUN` target scenarios above as mandatory closure gaps. Its verdict is a runtime-evidence blocker, not a newly observed application defect. A1-I1 remains `BLOCKED_DECISION`. The exact next verification requires a safe run-owned canonical attachment fixture, a safe way to test missing-allocation denial without bypassing immutable target guards (or an explicit Product Owner disposition for this inaccessible state), and a fresh restricted Better Auth flow, followed by independent rereview.
