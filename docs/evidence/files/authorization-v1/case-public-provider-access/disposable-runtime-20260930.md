# V1 public-backed Case persistence — disposable PostgreSQL verification

Status: ACCEPTED for disposable runtime verification; independent `PASS | RUNTIME_EVIDENCE`
Authority: Product Owner authorization on 2026-09-30 for this isolated runtime gate only
Classification: ISOLATION_REQUIRED

## Pinned run and preflight

- Run ID: `labos-case-public-d016f90a`.
- Exact Docker container: `labos-case-public-d016f90a`; exact volume: `labos-case-public-d016f90a-vol`. Run-owned temporary workspace: `prisma/.disposable-case-public-d016f90a` under this repository. Only these exact resources may be removed.
- Image: local `postgres:17.6`, digest `postgres@sha256:00bc86618629af00d2937fdc5a5d63db3ff8450acf52f0636ec813c7f4902929`. Docker Server 29.7.2, Linux/amd64. Final run container ID `414dd4a882be53e778c1f4cf54599d39ba7a1167dee84ac284e1cd17f318f0fc`, published only at `127.0.0.1:56845`, PostgreSQL 17.6, database `labos_disposable`; the server reported its container-network address `172.17.0.2/32`. No project datasource URL or `.env` value was loaded.
- Expected migration order: 47 pre-C2 + installed C2 48 + installed clinical evidence 49, then the accepted candidate 50 in a temporary migration copy. No project datasource URL or `.env` value may enter the run. Prisma configuration must use only a process-local disposable loopback URL.
- Accepted candidate: `prisma/migrations/20260929120000_case_public_provider_access_contract/migration.sql`, SHA-256 `a4d3cf3aa49a8ac910cb173d3c6a1050b128a2cd5aad3c51718fa04fed81b668`. Installed C2 and evidence SQL expected SHA-256: `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80` and `e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b`. Recheck source and copied bytes before application.
- Cleanup target and observed result: exact container, volume, loopback port publication, and run-owned workspace absent after each attempt. No broad prune or normal-development DB contact.

## Execution evidence and attribution

- Final run raw event log: [disposable-runtime-20260930.jsonl](disposable-runtime-20260930.jsonl). The executable run harness is [disposable-runtime-harness.mjs](disposable-runtime-harness.mjs). The final run exited zero. Event timestamps, SQLSTATEs, deferred commit boundaries, and independent-connection four-table rollback projections are retained in the JSONL.
- Earlier bounded harness attempts are retained as [attempt 1](disposable-runtime-20260930-attempt1.jsonl), [attempt 2](disposable-runtime-20260930-attempt2.jsonl), [attempt 3](disposable-runtime-20260930-attempt3.jsonl), [attempt 4](disposable-runtime-20260930-attempt4.jsonl), [attempt 5](disposable-runtime-20260930-attempt5.jsonl), [attempt 6](disposable-runtime-20260930-attempt6.jsonl), and [attempt 7](disposable-runtime-20260930-attempt7.jsonl). Attempt 1 stopped at a synthetic fixture's missing `updatedAt`; attempts 2–3 exposed a client `name[]` parsing error in the schema assertion; attempt 4 reached the immutability check and showed SQLSTATE `P0001`; attempts 5–6 passed but revealed incomplete attribution checks. Attempt 7 passed, but independent review identified missing-purpose coverage and omission of clinical evidence from rollback projections. The final run added both. All attempts reported exact cleanup `C01 PASS`. None changed the accepted candidate.
- Source and temporary-copy SHA-256 for the candidate were both `a4d3cf3aa49a8ac910cb173d3c6a1050b128a2cd5aad3c51718fa04fed81b668`. The 49 historical migrations and candidate applied successfully in order (`_prisma_migrations`: 50 finished, none rolled back). The source C2 and clinical-evidence hashes matched the pinned values above.
- Installed enums: `CaseAssetStorageMode` = `LEGACY_URL_UNVERIFIED`, `MANAGED_PRIVATE`, `MANAGED_PUBLIC`; `StoredFileProviderAccess` = exactly `PUBLIC_READ`, `PRIVATE`. `StoredFile.providerAccess` is nullable with no default. The existing deferred Case storage and clinical-purpose triggers remained installed; the new insert-classification trigger and frozen StoredFile mutation trigger were installed. The raw `G03` event lists trigger definitions.
- Final `P01` observed the committed public asset from a second connection. All eight checked Case/Lab/Organization/version/grant/evidence/provider-key equalities were true. `F01` directly records `storageMode=MANAGED_PRIVATE`, old access `PUBLIC_READ`, new access `PRIVATE`, and the stable asset ID.
- Every rejected transaction recorded its actual SQLSTATE and whether rejection occurred at statement or commit. Counts of `CaseAssetFile`, `CaseAssetFileVersion`, `StoredFile`, `FileUploadGrant`, and `CaseClinicalUploadEvidence` were equal before and after on a separate observer connection. Immediate immutability rejections used `P0001`; Case trigger rejections used `23514`; FK rejections used `23503`.
- The final `C01` event verified the named container, volume, and temporary workspace absent. An independent post-run host check again returned no matching `docker ps -a` container, no matching `docker volume ls` volume, `Test-Path=False` for the run workspace, and the unchanged candidate SHA-256. The loopback publication disappeared with its exact container. No development migration was applied.

## Scenario matrix prepared before execution

Each negative transaction must reach its statement or deferred commit boundary and report SQLSTATE, constraint/trigger message, and a separate-connection unchanged projection. `PASS` means the expected result was actually observed; `NOT_RUN` never means passed.

| ID | Claim and expected result | Status |
| --- | --- | --- |
| G01 | Target is fresh PostgreSQL 17.6 in the named container/volume, loopback only; no project datasource | PASS |
| G02 | Exact 49 historical migrations deploy, then candidate 50 deploys from byte-matched temporary copy | PASS |
| G03 | Enum/column/default and installed trigger inspection matches candidate; relational FK behavior is exercised by N05/N06/N06_CASE | PASS |
| G04 | WorkType/Product/Dentist column signatures unchanged; candidate contains no Catalog-related DDL | PASS |
| H01 | Pre-existing valid legacy URL asset survives with ID, URL, extension and mode unchanged | PASS |
| H02 | Pre-existing `MANAGED_PRIVATE` asset/current version and null `StoredFile.providerAccess` survive without reclassification | PASS |
| H03 | Null access has no private/open meaning; unchanged historical private/null pointer may remain, but cannot move to a new null file | PASS |
| P01 | New matching grant/evidence/StoredFile `PUBLIC_READ`/version/current public asset commits and is visible from a separate connection | PASS |
| N01 | New StoredFile with null provider access rejects; existing null row remains null | PASS |
| N02 | Public asset with null current-file access rejects | PASS |
| N03 | Public asset with `PRIVATE` current-file access rejects | PASS |
| N04 | Public asset without current version rejects at deferred boundary | PASS |
| N05 | Public current version belonging to another asset rejects | PASS |
| N06 | Version/file tenant mismatch rejects | PASS |
| N06_CASE | Cross-tenant Case/Lab mismatch rejects at composite FK | PASS |
| N07 | Public current file with no matching clinical evidence rejects | PASS |
| N08 | Evidence from a different grant rejects | PASS |
| N09 | Evidence for another same-Lab Case rejects | PASS |
| N10 | Evidence for a different provider/object key rejects | PASS |
| N11 | Public asset retaining `documentUrl` rejects | PASS |
| N12 | Public asset retaining `fileExtension` rejects | PASS |
| N12_PURPOSE | Public managed asset with null clinical purpose rejects at deferred commit | PASS |
| N13 | `MANAGED_PUBLIC` to legacy URL mode rejects without URL fallback | PASS |
| N14 | `MANAGED_PRIVATE` to legacy URL mode rejects without URL fallback | PASS |
| N15 | `MANAGED_PRIVATE` to `MANAGED_PUBLIC` rejects | PASS |
| N16 | Public to private with the same current version rejects | PASS |
| N17 | Public to private pointing to a `PUBLIC_READ` or null file rejects | PASS |
| N17_NULL | Public to private pointing to historical null-classified file rejects | PASS |
| I01 | Updating `StoredFile.providerAccess` rejects and leaves prior value unchanged | PASS |
| I02 | Other immutable StoredFile update/delete rejects; permitted live-Member non-null-to-null transition still commits | PASS |
| I02_DELETE | StoredFile deletion is rejected by immutability trigger | PASS |
| F01 | One guarded public-to-private update to a new `PRIVATE` file/version with matching evidence commits; `CaseAssetFile.id` stays fixed and old version/file remains `PUBLIC_READ` | PASS |
| F02 | Failed deferred transaction leaves no partial asset/version/file/grant state | PASS |
| H03_POINTER | Historical private/null pointer cannot move to another historical null file | PASS |
| C01 | Exact run-owned container, volume, port and temporary workspace are absent after cleanup | PASS |

## Limits and acceptance

This database-only run cannot attest UploadThing ACLs, actual provider bytes, application authorization/DTO/open behavior, signed URL delivery, callback/cleanup, or production deployment. `PUBLIC_READ` and `PRIVATE` are synthetic database classifications here. Catalog has no standalone table in this schema; `G04` compared the actual WorkType, Product, and Dentist table column signatures across the candidate, and the candidate SQL contains no DDL for those or Catalog-related tables. Runtime acceptance still requires independent `PASS | RUNTIME_EVIDENCE` review. Normal-development migration application remains a separate Product Owner gate.

The migration's first `ALTER TYPE ... ADD VALUE` is outside its following explicit transaction. The run proved successful forward application; it did not inject a DDL failure or prove an automatic down migration. A failure after the enum addition would require a separately reviewed forward repair; removal of historical classification or rewriting existing rows was not attempted.

## Independent review and next gate

The first independent `RUNTIME_EVIDENCE` review returned `CORRECTION_REQUIRED` for missing null-clinical-purpose coverage and omission of `CaseClinicalUploadEvidence` from rollback projections. Both were corrected in the run harness and final isolated run. The same independent Reviewer reread the current packet, raw final log, retained attempts, harness, and accepted candidate and returned `PASS | RUNTIME_EVIDENCE`. The single next gate is separately Product Owner-authorized application of the accepted migration to the normal development database; no such application occurred in this run.
