# S001 evidence migration: normal-development application

Status: normal-development migration PASS; independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`.
Authority: Product Owner's bounded normal-development migration authorization, 2026-10-03.
Scope: exact S001 evidence identity persistence installation only.

## Identity and preflight

- Authorized artifact: `prisma/migrations/20261002120000_case_s001_evidence_identity/migration.sql`, SHA-256 `c322412de3c40f697407ce74a062afb797b2554a98fa5e8393e1c4bfe8c8bb88` before and after the run. The superseded `cf95d2e3b9beed366e493b78f3e5fa8fd2c6771e4d2f8159c090cf87306909c8` remains associated only with the earlier disposable FAIL; that evidence was not rewritten.
- The [repeat read-only preflight](preflight.json) attested the established direct development target by host SHA-256 prefix `eb0d823953fe`, port `5432`, database/schema `postgres`/`public`, PostgreSQL `server_version_num=170006`, `pg_is_in_recovery=false`, and a read-only transaction. No endpoint or credential is retained.
- Exactly 50 predecessor migrations were finished, with no failed/rolled-back or divergent checksum, no S001 candidate row, and zero `JPEG_CLINICAL_V1_S001` evidence rows. All 50 installed checksums matched repository canonical-LF bytes, including C2 `92c6a5d2...`, clinical evidence `e1892370...`, and public-access `a4d3cf3a...`. The predecessor evidence table had 15 columns and its three expected enabled triggers.
- The first [preflight attempt](preflight-attempt1.json) stopped read-only at SQL `42703`: the verification fingerprint query ordered evidence by an absent `id`. The harness was corrected to order by `uploadGrantId`; the complete fresh preflight then passed. No migration was applied during the failed harness attempt.
- A run-owned [canonical-LF execution copy](execution-identity.json) contained 51 byte-verified migration SQL files and an isolated Prisma config. [Pre-deploy Prisma status](prisma-status-pre.json) named only this candidate as pending. Prisma CLI version: `7.8.0`.

## Application and installed result

The [sanitized Prisma deploy record](prisma-deploy.json) shows one `migrate deploy` invocation through the canonical-LF execution chain and exit `0`, applying only `20261002120000_case_s001_evidence_identity`. The [read-only postflight](postflight.json) found 51 successful migrations, candidate present exactly once with the authorized checksum, and no predecessor divergence. [Prisma status](prisma-status-post.json) reports up to date; [datasource-to-schema diff](prisma-diff.json) reports no difference.

The installed `CaseClinicalCodecBackend` has exactly `JULUSIAN_TURBOJPEG`. The seven new evidence columns have the accepted enum/varchar/integer/boolean types, varchar lengths, nullability, and no defaults. The `CaseClinicalUploadEvidence_s001_identity` CHECK exists and is validated. [Schema delta](schema-delta.json) confirms the four predecessor CHECKs and all three enabled evidence triggers retained identical definitions and properties. The `CaseClinicalUploadEvidence_uploaded` trigger remains deferrable and initially deferred. The new enum, seven columns, and single CHECK are the intended S001 additions; Prisma reports no unexplained schema drift.

The [preservation comparison](preservation.json) found unchanged counts and row fingerprints across Organization, Lab, Case, Case assets, grants, StoredFiles, versions, clinical evidence, audit, WorkType, Product, and Dentist. There were zero existing clinical-evidence rows, including R001, so row-level R001 preservation has no nonempty development example; the accepted corrected disposable packet separately tested it. No S001 row was introduced. No grant transitioned and no StoredFile/version/asset appeared.

## Reconciliation checks and limits

- Prisma schema validation: PASS. Migration status: PASS. Read-only datasource-to-schema diff: PASS.
- [Evidence schema static tests](schema-test.txt): 5/5 PASS. [Focused Case/grant/callback/route tests](focused-tests.txt): 5 files, 63/63 PASS.
- The initial `pnpm exec` wrappers stopped in pnpm's dependency self-check before running Vitest or TypeScript because package metadata fetch was unavailable and module-directory removal required a TTY. The already installed Vitest and TypeScript binaries were then invoked directly; no dependency install or purge was performed.
- Prisma Client 7.8 generated successfully from the unchanged accepted schema ([record](prisma-generate.txt)); generated enum and seven evidence fields were inspected. An isolated generator check also passed ([record](isolated-generate.txt)). No Zod generation was requested.
- A broad `tsc --noEmit` attempt ([raw output](typescript-global.txt)) exited `2` with four unresolved imports in retained, isolated Vercel experiment source under `docs/evidence/` (`../../../inspect`, `@julusian/jpeg-turbo`, `sharp`). These are unrelated to this migration and were not repaired in this gate. A TypeScript check excluding only `docs/evidence/` and `experiments/` passed after Prisma Client generation ([record](typescript-affected.txt)). Broad repository TypeScript is therefore **not PASS**.
- `git diff --check`: exit `0` ([record](diff-check.txt)); Git emitted only existing LF/CRLF working-copy warnings. No SQL/schema/application source was edited by this gate.
- The Case upload route still contains its unavailable response. No Case route activation, clinical finalization, provider call, synthetic evidence, or attachment was performed. Actual deployed Julusian identity and live clinical/UploadThing behavior remain NOT_RUN. Clinical finalization remains PO HOLD / DEFERRED; N-FILE-110 runtime remains inactive.
- The exact run-owned LF/config/generation copy was removed; [cleanup attestation](execution-cleanup.json) records its absence and the unchanged candidate hash. Normal development data was not cleaned or reset.

## Review

The independent V3 Reviewer inspected the actual pre/post ledgers and catalogs, target identity, preservation fingerprints, Prisma execution and reconciliation, focused tests, broad TypeScript limitation, generated client result, and cleanup. A separate read-only development query confirmed the installed candidate once at the exact hash, seven fields, zero S001 rows, and the preserved deferred evidence trigger. Verdict: **PASS | RUNTIME_EVIDENCE + CHECKPOINT**. The reviewer found no material defect or unresolved decision. The single successor is a separately authorized production-facing S001 validator/containment CODE implementation gate; clinical finalization remains deferred.
