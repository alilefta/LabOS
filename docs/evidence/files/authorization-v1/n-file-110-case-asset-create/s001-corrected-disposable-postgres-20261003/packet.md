# Corrected S001 evidence migration: disposable PostgreSQL verification

Status: **overall corrected runtime PASS; independent V3 PASS | RUNTIME_EVIDENCE + SQL/CHECKPOINT**. Run `s001-pg-corrected-20261003-010312-5c987b49` used a fresh PostgreSQL 18.4 Windows x64 cluster, bound only to `127.0.0.1:55438`, with exact run-owned databases `s001_success_5c987b49` and `s001_rollback_5c987b49`. Installed Prisma CLI: 7.8.0. No normal LabOS development, staging, production, shared database, provider object or clinical data was contacted.

## Candidate, predecessor and target attestation

The canonical corrected candidate is `prisma/migrations/20261002120000_case_s001_evidence_identity/migration.sql`, SHA-256 **`c322412de3c40f697407ce74a062afb797b2554a98fa5e8393e1c4bfe8c8bb88`** before and after the run. It has one `BEGIN;` before S001 DDL and one `COMMIT;` after its CHECK. The [preflight manifest](preflight.json) records all 50 predecessor names/hashes, including the accepted C2, evidence and public-access migrations. Copies of all 50 predecessor SQL files had zero byte-hash mismatches. [Success](s001_success_5c987b49-predecessor-deploy.txt) and [rollback](s001_rollback_5c987b49-predecessor-deploy.txt) databases each installed exactly those 50 migrations through Prisma. Before candidate installation both had zero S001 evidence and no candidate history. The [synthetic pre-candidate fixture](fixture-pre.cjs) committed a canonical Organization/Lab/Member/Patient/DRAFT Case, target-bound Case grant and R001 evidence with atomic UPLOADED transition under the installed triggers; [result](fixture-pre-result.jsonl) is PASS.

The old hash `cf95d2e3b9beed366e493b78f3e5fa8fd2c6771e4d2f8159c090cf87306909c8` and [old runtime FAIL](../s001-disposable-postgres-20261002/packet.md) remain historical facts. None of that runtime PASS subset is attributed to this corrected candidate.

## Corrected-candidate scenario matrix

The exact candidate was applied once through the repository's normal `prisma migrate deploy` path in the success database ([raw deploy result](success-candidate-deploy.txt)). The retained [harness](scenarios.cjs) and [39 raw scenario outcomes](scenario-results.jsonl) exercised the actual triggers and deferred commit boundaries. All 39 rows report PASS. A synthetic 64-hex codec digest verifies SQL shape only; it is not a deployed Julusian library hash.

| Scenario | Status | Observed result |
| --- | --- | --- |
| RV-S001-C01 normal forward installation | **PASS** | Successful corrected checksum once in 51-row history; sole enum value `JULUSIAN_TURBOJPEG`, seven nullable/no-default columns, validated S001 CHECK and all three pre-existing evidence triggers. |
| RV-S001-C02 historical/R001 preservation | **PASS** | Pre-candidate R001 row kept profile, SHA, dimensions and size; all seven new fields remain null. |
| RV-S001-C03 complete S001 positive | **PASS** | Full approved identity and same-transaction evidence/PENDING→UPLOADED committed under real Case/grant relationships. |
| RV-S001-C04 negative S001 identity | **PASS** | Every one of seven independently null fields rejected by CHECK `23514`; wrong validator/package/library/digest/components and uppercase digest rejected `23514`; unknown backend rejected at enum input `22P02`. |
| RV-S001-C05 non-S001 contamination/null | **PASS** | Seven independent R001 stray-field cases rejected `23514`; clean historical R001 committed; explicit null-expression probes were false and incomplete S001 rows rejected. |
| RV-S001-C06 immutability | **PASS** | UPDATE of old width and each new identity/source field plus DELETE rejected by immutable trigger `23514`; original S001 row remained. |
| RV-S001-C07 deferred finalization | **PASS** | Valid evidence and UPLOADED committed together; evidence left PENDING and UPLOADED without evidence each failed at COMMIT with `23514`. |
| RV-S001-C08 injected pre-COMMIT failure | **PASS** | Prisma failed; enum, seven columns and CHECK all absent afterward, predecessor 15-column evidence table/three triggers and 50 successful migration rows intact, candidate successful=0, failed bookkeeping row=1. |
| RV-S001-C09 successful COMMIT counterpart | **PASS** | Success database had all DDL and corrected checksum exactly once; a later independent connection completed `BEGIN`/temporary table INSERT/`COMMIT` and observed its row. |
| RV-S001-C10 Prisma/schema reconciliation | **PASS** | Direct Prisma validation passed, `migrate status` reported up to date, and read-only datasource→schema `migrate diff --exit-code` returned 0 / “No difference detected.” Existing raw CHECK/triggers were separately catalog-inspected. |

The [success catalog/history result](success-postmigration-state.txt) is `success DB|127.0.0.1|55438|51|1|corrected SHA|1 enum|7 columns|1 CHECK|1 R001 row|1 S001 row`. The [success transaction probe](success-transaction-counterpart.txt) confirms ordinary subsequent transaction behavior. Prisma [validation](prisma-validate.txt), [migration status](prisma-migrate-status.txt), and [schema diff](prisma-schema-diff.txt) are retained separately.

### Critical rollback proof and Prisma bookkeeping

The rollback database began independently at the 50-predecessor state. The [temporary run-owned injection copy](injected-migration.sql), SHA-256 **`2626ea5d3797d5cb09644dbf14e2a5cd5da5b4cad71a41ae821de45795533ee3`**, differs from the corrected candidate by exactly one `SELECT 1/0;` immediately before `COMMIT;`; [identity record](failure-injection-identity.json) distinguishes the two. The canonical repository migration was not changed. The same Prisma deploy path failed ([raw output](rollback-injected-deploy.txt): “current transaction is aborted”). The [postfailure catalog query](rollback-postfailure-shape.txt) recorded `rollback DB|enum 0|new columns 0|CHECK 0|predecessor columns 15|predecessor triggers 3|successful migrations 50|successful candidate 0|failed candidate record 1`. [History detail](rollback-history-detail.txt) records the injected copy's separate checksum and unfinished Prisma row. This establishes complete S001 application-DDL rollback while accurately separating Prisma failure bookkeeping from schema state. The wrapper message does not itself expose the original SQLSTATE `22012`; the temporary SQL and catalog outcome establish the tested boundary.

## Cleanup, limits, next gate

The postmaster PID `13988`, run-owned data path, PostgreSQL executable, port and process name were checked before termination. The exact resolved `experiments/s001-pg-corrected-20261003-010312-5c987b49` path was checked within the workspace before recursive removal. The [cleanup attestation](cleanup-attestation.json) verifies run root, PID and listener absence and the unchanged canonical corrected SHA. Only run-owned cluster/databases/temp copies were destroyed; durable sanitized evidence remains.

This SQL verification does not establish actual Julusian runtime-library identity, clinical JPEG validation, live provider retrieval, application finalization, Case attachment or deployed behavior. No migration was applied to normal development. **Overall corrected migration runtime: PASS with independent V3 PASS | RUNTIME_EVIDENCE + SQL/CHECKPOINT.** If review accepts the actual evidence, the single successor is separate Product Owner authorization for normal-development application of this exact corrected S001 evidence migration. Production S001 validator integration and clinical finalization remain later, separate gates.

The independent V3 Reviewer inspected the actual raw preflight, both predecessor applications, 39 scenario outcomes, injected SQL, Prisma rollback bookkeeping and catalogs, successful COMMIT counterpart, schema reconciliation, and exact cleanup. It returned **PASS | RUNTIME_EVIDENCE + SQL/CHECKPOINT**, overall corrected runtime **PASS**, with real Julusian/provider/application/deployed claims explicitly outside this SQL scope. No prior old-candidate result was transferred.
