# S001 evidence migration disposable PostgreSQL runtime verification

Status: **FAIL — candidate failed-install rollback defect; independent V3 CORRECTION_REQUIRED | RUNTIME_EVIDENCE + SQL/CHECKPOINT**. Run `s001-pg-20261002-212127-1cc93c10` was isolated to a fresh local PostgreSQL 18.4 Windows x64 cluster on `127.0.0.1:55437`, with databases `s001_success_1cc93c10` and `s001_rollback_1cc93c10`. The normal development, staging, production and provider environments were not contacted. The cluster and both databases were destroyed after evidence retention.

## Candidate and isolation preflight

The only canonical candidate executed on the success database was `prisma/migrations/20261002120000_case_s001_evidence_identity/migration.sql`, SHA-256 **`cf95d2e3b9beed366e493b78f3e5fa8fd2c6771e4d2f8159c090cf87306909c8`** before and after the run. [Preflight manifest](preflight.json) records exact names/hashes for all 50 predecessor migration files. The accepted C2, clinical-evidence, and public-backed predecessors matched repository hashes `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`, `e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b`, and `a4d3cf3aa49a8ac910cb173d3c6a1050b128a2cd5aad3c51718fa04fed81b668`. A byte-for-byte copied 50-migration predecessor directory had zero hash mismatches and was applied via Prisma migrate deploy to each run-owned database. Both had exactly 50 successful migrations and no S001 evidence before candidate application.

Docker was unavailable. The run used a fresh `initdb` cluster from installed PostgreSQL 18.4, with run-owned path recorded in [run-root attestation](run-root.txt); the server was launched bound only to loopback. The synthetic relational fixture was created only after the predecessor chain installed. [Fixture source](fixture-pre.cjs) inserts an AuthUser, Organization, Lab, Member, Patient, DRAFT Case, exact target-bound PENDING Case grant and a synthetic R001 success row, then transitions that grant to UPLOADED in the same transaction. It committed under the installed evidence/grant triggers without disabling them. No clinical bytes or provider object was used.

## Scenario matrix

The success database applied the exact pinned candidate once via the repository Prisma config and `migrate deploy`. Its `_prisma_migrations` row checksum equals the pinned SHA-256. The [raw scenario results](scenario-results.jsonl), [schema catalog correction](schema-shape-correction-raw.txt), and [final success-database attestation](success-final-state.txt) support the following classifications. Synthetic provider and codec digests prove database shape only.

| Scenario | Result | Observed boundary |
| --- | --- | --- |
| RV-S001-01 forward migration | **PASS** | 51 successful history rows, candidate once; exact enum value, seven nullable/no-default fields, validated CHECK, three existing evidence triggers. |
| RV-S001-02 historical R001 preservation | **PASS** | Pre-existing R001 row retained original identity/hash/size/dimensions; all seven new fields null. |
| RV-S001-03 complete valid S001 identity | **PASS** | Complete synthetic S001 evidence and same-transaction PENDING→UPLOADED committed with actual grant/Case relationships. |
| RV-S001-04 every missing field | **PASS** | Seven independent null variants rejected at insert by SQLSTATE `23514`, `CaseClinicalUploadEvidence_s001_identity`. |
| RV-S001-05 wrong pinned identity | **PASS** | Wrong version/package/library/digest/source components and uppercase digest rejected by CHECK `23514`; unknown backend rejected earlier by enum input `22P02`; null progressive rejected in RV-S001-04. |
| RV-S001-06 non-S001 stray identity | **PASS** | Each of seven independent R001 stray-field variants rejected by CHECK `23514`. |
| RV-S001-07 null semantics | **PASS** | Explicit `IS NOT DISTINCT FROM`/`COALESCE` null probes all false; incomplete S001 inserts rejected. |
| RV-S001-08 immutability | **PASS** | Existing width, each new identity/source field and DELETE rejected by installed immutable trigger `23514`; original S001 row remained. |
| RV-S001-09 finalization relationship | **PASS** | Positive same-transaction S001 success; evidence left PENDING rejected at commit `23514`; UPLOADED without evidence rejected at commit `23514`. |
| RV-S001-10 transactional failed-install rollback | **FAIL** | Prisma reported injected `22012` failure and no successful candidate history, but enum, seven columns and CHECK persisted in the fresh rollback database. |
| RV-S001-11 Prisma/schema reconciliation | **NOT_RUN** | Stopped after RV-S001-10 exposed a candidate defect; no drift acceptance claim. |

The first raw scenario run marked `schema_shape` FAIL solely because the Node `pg` driver represented PostgreSQL's enum array as text (`{JULUSIAN_TURBOJPEG}`), while the harness expected a JavaScript array. The separate catalog query used `string_agg` and observed exactly `JULUSIAN_TURBOJPEG|7|1|3` (enum, nullable columns, validated CHECK, preserved evidence triggers). No SQL candidate change was made; this was a harness-result decoding issue. All other raw rows retain their initial classifications.

## Failed-install evidence and conclusion

The rollback database had a fresh 50-predecessor state. A run-owned **temporary verification copy** of the pinned candidate appended only `SELECT 1/0;` after its final statement; its distinct hash was `19fe22b28b2117aa287b36a610083a5810fc38bcf551ab80831874a5c49007f7`. The repository migration was untouched. Prisma `migrate deploy` returned P3018 / SQLSTATE `22012` ([raw output](rollback-injected-deploy.txt)). [Postfailure catalog/history query](rollback-postfailure-shape.txt) observed `enum=1|columns=7|CHECK=1|successful predecessors=50|successful candidate=0|failed candidate record=1`. Thus Prisma did not falsely mark the candidate successful, but the current SQL has no explicit transaction wrapper and the repository's migration execution did **not** roll back its earlier DDL after a later statement failed. This directly contradicts the accepted design's all-or-nothing rollback claim. It is a migration candidate defect requiring new CODE/SQL review; it was not repaired in this runtime gate. Do not apply this candidate to normal development.

The test establishes failure behavior of the temporary injected copy under the actual Prisma wrapper and PostgreSQL target; it does not claim that the unmodified candidate failed normal forward installation. Forward installation and identity constraints passed in the separate success database. It also does not prove actual Julusian binary identity, JPEG validation, application finalization, or provider behavior.

## Cleanup and boundary

The exact postmaster PID was read from the run-owned cluster's `postmaster.pid` and checked against the run-owned data path, port `55437`, executable `E:\\PostgreSQL\\18\\bin\\postgres.exe` and process name before termination. After termination the PID and loopback listener were absent. The resolved run root was checked against the exact workspace `experiments/s001-pg-20261002-212127-1cc93c10` path before recursive removal. The [cleanup attestation](cleanup-attestation.json) confirms root, listener and PID absence plus the unchanged pinned migration hash. Only this run-owned cluster, databases and temporary verification copies were removed. Durable sanitized evidence in this directory remains.

**Overall runtime result: FAIL.** Next gate: bounded correction of the migration's transactional-install/rollback contract and independent CODE/SQL rereview, with fresh disposable verification afterward. Clinical finalization stays `PO HOLD / DEFERRED`; S001 production validator remains design-only; N-FILE-110 runtime remains inactive.

Independent V3 review inspected the actual raw preflight, fixture, scenario, schema-catalog, rollback and cleanup artifacts and returned **CORRECTION_REQUIRED | RUNTIME_EVIDENCE + SQL/CHECKPOINT**. It confirmed the forward and negative matrix, the transparent schema-array harness correction, exact cleanup, and the blocking failed-install rollback defect. The candidate remains byte-for-byte unchanged; this runtime verdict supersedes its prior CODE/SQL eligibility for application without rewriting that earlier review history.
