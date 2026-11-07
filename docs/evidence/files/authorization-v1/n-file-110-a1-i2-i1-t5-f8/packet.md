# A1-I2-I1-T5-F8 — limited hosted runtime verification

Status: **T5 CLOSED | ACCEPTED — limited hosted runtime**  
Target: only Supabase `labos-verification` / `rvtubjrczuxdxfuazjmr`, database `postgres`, PostgreSQL 17.11.  
Executable packet: [a1-i2-i1-t5-f8-runtime.mjs](../../../../../tests/integration/a1-i2-i1-t5-f8-runtime.mjs).  
Authority: Product Owner T5 final hosted retry and 2026-10-20 formal closure; independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`. The preparation proposal below remains point-in-time history and does not authorize another `--hosted` run.

## Formal T5 closure — 2026-10-20

The final authorized rollback-only run on `labos-verification` passed all five hosted groups: seven-grant expiry with deferred validation, seven-grant S001 rejection, missing-fence quarantine, durable allocation despite temporary-table shadowing, and invalid-state/caller denials. The installed baseline was PostgreSQL 17.11 with **58 finished migrations**. The reviewed recovery helper returned `databaseCleanup=CONFIRMED_ABSENT`, `executionCompletion=COMPLETE`, `overallVerification=PASS`; all 18 planned grant/key identities had zero surviving exact matches and no transaction-local SET membership survived. Read-only postflight confirmed the eight distinct cleanup function owners, the six-column expiry evidence SELECT grant, no table-wide evidence SELECT, and no new due scoped grant. The Product Owner accepted independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT` and closed **T5 | CLOSED | ACCEPTED**.

The exact 55-record registry, hosted transcript, original recovery output, independent-review provenance, and hash manifest are archived outside Git in operator-private storage. The exact local path remains in the private handoff; byte-for-byte copy verification passed:

| Archived artifact | SHA-256 |
| --- | --- |
| `t5f9-c16a1f0f-828a-47bc-827c-96fb50a62703.jsonl` | `34A9006BB6C2053C655D05313398600DDF39682087FC0AEFE89854AF5F4F26B5` |
| `hosted-launch-e83d44d37f4f4b6ebb175e2b40432e9b.txt` | `0384B3D1B0A01F400A41E8CFFCEE47704F781A7D123C43D9C5279E874B3271B0` |
| `recovery-d09be4469d624ac0b22a55d0e03166f7.txt` | `51A0B05E7DFAFA6B9BE4F7DF06F907A12EBA1D46061356F69A4B3BE94B9CB82C` |
| `independent-v3-review-provenance.txt` | `742895DF560351CB478AC90C367DBBEA212ECF21FA6CA24C4507C324046F77BB` |

This checkpoint excludes positive claim/renew/ACK, S1–S4 reconciliation, cleanup-worker execution, R2 operations, and N-FILE-110 activation. No worker or provider operation occurred in T5.

## Scope and execution boundary

The executable uses one fresh, UUIDv4-marked fixture and **one explicit BEGIN/ROLLBACK transaction per scenario**. It creates synthetic Organization, Lab, AuthUser, Member, Patient, Case, scoped upload grants and automatic object-key allocations through normal enabled triggers. It never creates an R2 object. Every `objects/<uuidv4>` key is newly generated and checked against existing allocations and StoredFile references before use. No fixed historical fixture ID or key is reused.

The trusted `postgres` test session makes only this transaction-local role grant:

```sql
GRANT labos_verification_app, labos_verification_cleanup,
  labos_case_expiry_executor TO postgres
  WITH ADMIN FALSE, INHERIT FALSE, SET TRUE GRANTED BY postgres;
```

The grant is rolled back, leaving the accepted `supabase_admin`-granted `ADMIN=true, INHERIT=false, SET=false` memberships unchanged. The target read-only catalog shows `postgres` is non-superuser with CREATEROLE and those three managed ADMIN memberships, and no current SET membership. Disposable PostgreSQL 17.11 proved the temporary self-grant, `SET LOCAL ROLE`, and rollback sequence. Actual target execution of that sequence remains unproven until separately authorized. The test never grants a function-owner role to a runtime executor.

The first connection runs read-only identity, migration-56/57 checksum, exact trigger-body and membership checks. Hosted mode pins the session-pooler host, port 5432, database, project-qualified username and certificate/hostname verification. It refuses URL query options that could override TLS. The local reviewed SQL files are hashed before connection. Immediately before hosted execution, the operator must independently reconfirm the Supabase project ID, 57 finished migration records, baseline ACLs, and **zero pre-existing due scoped PENDING/UPLOADED grants**. The read-only target count on 2026-10-19 was zero; this is a point-in-time observation and must be repeated.

The expiry and quarantine transactions obtain `SHARE ROW EXCLUSIVE ... NOWAIT` on `FileUploadGrant` before creating fixtures, recheck that no pre-existing eligible row exists, then recheck that the due set contains exactly their 7 or 1 generated IDs before invoking the unfiltered batch function with a matching limit. This short table lock prevents a concurrent writer from inserting an eligible row during the test. A lock conflict, any existing eligible row, or any unexpected due ID **stops the scenario before calling expiry**. Lock and statement timeouts are 2 and 20 seconds; idle-in-transaction timeout is 30 seconds. The ordinary 3.6/2.6-second waits are real elapsed time, not clock manipulation.

## Scenario matrix

| Scenario | Runtime identity and expected assertion | Hosted disposition |
| --- | --- | --- |
| Seven-grant expiry | `labos_case_expiry_executor`; seven exclusive due IDs, return count 7, EXPIRED/S0/future due. `SET CONSTRAINTS ALL IMMEDIATE` runs under this executor and succeeds. | Proposed |
| Seven-grant S001 | `labos_verification_app`; seven returned IDs, FAILED/S0/future due; deferred check forced under app. | Proposed |
| Missing-fence quarantine | `labos_case_expiry_executor`; one exclusive due ID remains PENDING with `QUARANTINE_ALLOCATION`, null stage/due. | Proposed |
| Allocation INSERT shadow | Existing app INSERT/SELECT and TEMP privileges only; an app-created temporary allocation table receives zero rows, durable allocation receives one. | Proposed |
| Invalid member | INSERT with nonexistent member returns SQLSTATE `23514`; no grant/allocation remains. | Proposed |
| Direct lifecycle mutation | App direct PENDING→CLEANED returns `23514`. | Proposed |
| Wrong callers | App expiry and cleanup S001 calls return `42501`. | Proposed |
| Premature claim | Cleanup caller on a live PENDING grant returns `23514`. | Proposed |
| Terminal fence shadow | Corrected guard returns `23514` and leaves FAILED/fence unchanged, but reproduction requires temporary allocation UPDATE for app, absent from target. | **Disposable-only; excluded from hosted** |
| SQL error and socket loss | SQLSTATE `22012`, abrupt client disconnect, fresh-connection exact absence and no SET membership. | **Disposable-only rollback proof** |

The app's target catalog already shows `FileUploadGrant` SELECT/INSERT/UPDATE and allocation SELECT/INSERT, but **no allocation UPDATE**; it has database TEMP. The local baseline was aligned to those existing app grants. The disposable fence-shadow test adds allocation column UPDATE **inside its test transaction only** to exercise the guard. Hosted mode omits it, introducing no test-only protected-table privilege. No hosted S1–S4, positive claim/lease/ACK, or canonical-file mutation scenario is proposed.

## Rollback and failure handling

The harness creates no permanent registry. Run IDs and exact object keys are retained in process memory and emitted only as nonsecret synthetic identities for evidence. Each scenario checks namespace absence before fixture creation and uses a fresh connection after rollback to verify zero run-owned parents, grants, allocations and StoredFile references, plus zero `postgres`-granted temporary SET memberships. An expected SQL denial is isolated with SAVEPOINT/ROLLBACK TO SAVEPOINT. An unexpected error triggers rollback, fresh postflight, and immediate stop. If the connection is lost, PostgreSQL aborts its open transaction; **a successful fresh-connection exact postflight is still mandatory**. If postflight cannot establish absence, classify the run BLOCKED, retain the exact run registry, and request a separate disposition. Do not assume that a failed client connection proves cleanup.

No transaction-pool endpoint, trigger disabling, `session_replication_role`, artificial clock advancement, migration replay, Prisma-history edit, R2 call, or update of a pre-existing row is part of this packet. A nonzero lock acquisition, timeout, SQLSTATE mismatch, target mismatch, changed migration hash, missing TLS verification, nonzero pre-existing expiry count, or unexpected surviving fixture stops further execution.

## Disposable rehearsal, 2026-10-19

A fresh workspace-local PostgreSQL **17.11** cluster used EDB's `postgresql-17.11-3-windows-x64-binaries.zip` (SHA-256 `4b8db0930c38f6ef845db919551dedda3b6b845aeb0927b3d79a6e8e9e4537cf`), loopback `127.0.0.1:55471`, and a non-superuser CREATEROLE `postgres` role under `supabase_admin`. All 54 earlier migrations applied in order; an A1-I1 role preparation adapted for non-superuser function ownership was applied in the disposable cluster, followed by migrations 55, 56 and 57. The three predecessor public-function ACLs were made identical to the accepted target's existing serialized managed-role ACLs before applying 57. The first local role preparation failed and rolled back until legitimate effective-owner function grants were added; migration 57 initially failed closed on the disposable cluster's NULL public-function ACL and rolled back. Neither adjustment changed a repository migration or the hosted target.

The final packet run returned **PASS** for expiry, S001, quarantine, allocation shadow, denial matrix, disposable-only fence shadow, and SQL-error/connection-loss rollback. Each scenario's fresh-connection postflight returned `EXACT_ABSENT` for all generated records/keys and `ABSENT` for temporary SET membership. No fixed fixture survived. The disposable cluster has no Supabase managed-runtime behavior and its result is **not hosted PASS**.

## Next approval boundary

Authorize only one bounded hosted run of the five proposed scenarios through the reviewed script, after a fresh read-only target/ACL/due-row preflight and source-hash checkpoint. Approval must explicitly cover synthetic INSERT/UPDATE within rollback transactions, the three transaction-local `GRANT ... SET TRUE GRANTED BY postgres` memberships, temporary-table creation, and the brief `FileUploadGrant` table lock. It must forbid the disposable-only fence test on Supabase. Require capture of every generated run ID/key, SQLSTATE assertions, fresh-connection postflight and an independent V3 runtime-evidence review before accepting hosted behavior.
