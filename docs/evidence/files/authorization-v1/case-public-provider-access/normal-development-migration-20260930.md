# V1 public-backed Case persistence — normal-development migration application

Status: CLOSED; normal-development migration `PASS`; independent `PASS | RUNTIME_EVIDENCE`
Authority: Product Owner's bounded normal-development migration authorization, 2026-09-30
Scope: migration 50 persistence only; no Case upload, provider, DTO/open, callback, or application activation

## Exact artifact and target

- Candidate: `prisma/migrations/20260929120000_case_public_provider_access_contract/migration.sql`, SHA-256 `a4d3cf3aa49a8ac910cb173d3c6a1050b128a2cd5aad3c51718fa04fed81b668` in both primary and isolated canonical-LF checkout.
- Installed predecessors retained their accepted source SHA-256s: C2 `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`; clinical evidence `e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b`.
- Established development identity: effective direct host SHA-256 prefix `eb0d823953fe`, port `5432`, database/schema `postgres`/`public`; live PostgreSQL `server_version_num=170006`, `pg_is_in_recovery=false`. Read-only transaction attested this without retaining an endpoint, user name, password, or URL.
- Exact isolated execution checkout: `C:/Users/alnaseem/.codex/worktrees/case-public-dev-migration/lab-os-project-4`, created from primary HEAD `022c4bdee3f65fd56f1d430b5a4372bd80907ed4`. All 50 migration SQL files in this checkout matched canonical-LF hashes of the primary repository files. The isolated copy's candidate hash matched the pinned artifact. No primary migration bytes were rewritten.

## Mandatory pre-mutation gate

- [Read-only precheck](normal-development-precheck-20260930.json): `PASS`; 49 finished, non-rolled-back migration rows, no failed rows, no candidate row, no checksum divergence against all 49 canonical-LF execution files. Candidate is migration 50 by directory ordering.
- [Pre-application Prisma migration status](normal-development-prisma-status-pre-20260930.json): only `20260929120000_case_public_provider_access_contract` pending. Prisma exits `1` for this pending state; its sanitized transcript names only this candidate. No `migrate resolve`, reset, baseline, history edit, or schema push was used.
- Pre-existing development counts: six Organizations, six Labs, two Cases, zero Case assets, two grants, zero StoredFiles, versions, clinical evidence, and C3 audits; WorkType/Product/Dentist each have one row. Unlinked Labs, broken Case/Lab and asset/Case links, invalid legacy assets, broken grant tenant links, and managed/private assets are zero. The precheck retains aggregate fingerprints rather than URLs, keys, or payloads.
- Four historical primary working copies can be CRLF on Windows; the isolated execution copy was byte-matched to all 49 installed canonical-LF checksums. Prisma is pointed at that isolated migration chain. No checksum mismatch is accepted by exception.

## Application and postchecks

- A fresh repeat of the read-only precheck passed immediately before deployment with 49 finished migrations, candidate absent, all canonical-LF checksums matching, and unchanged data counts. The [sanitized Prisma deployment record](normal-development-prisma-deploy-20260930.json) shows one supported `migrate deploy` invocation from the isolated LF chain, exit `0`, applying only `20260929120000_case_public_provider_access_contract`. No manual SQL, `db push`, `migrate resolve`, reset, baseline, or migration-history edit was used.
- The [read-only postcheck](normal-development-postcheck-20260930.json) found exactly 50 finished, non-rolled-back migration rows, candidate exactly once at installed SHA-256 `a4d3cf3aa49a8ac910cb173d3c6a1050b128a2cd5aad3c51718fa04fed81b668`, and all 49 predecessor checksums still matching canonical-LF repository bytes. [Post-application Prisma status](normal-development-prisma-status-20260930.json) exits `0` and reports the schema up to date.
- Installed `CaseAssetStorageMode`: `LEGACY_URL_UNVERIFIED`, `MANAGED_PRIVATE`, `MANAGED_PUBLIC`. Installed `StoredFileProviderAccess`: exactly `PUBLIC_READ`, `PRIVATE`. `StoredFile.providerAccess` is nullable with no default. The four affected Case/StoredFile triggers are enabled; both Case final-state triggers remain deferrable and initially deferred. The postcheck retains their actual definitions, the four installed function definitions, and 28 relevant validated constraints, including the Case current-version and StoredFile tenant/grant composite FKs.
- The [preservation comparison](normal-development-preservation-20260930.json) found equal pre/post counts and aggregate row fingerprints for Organization, Lab, Case, CaseAssetFile, FileUploadGrant, StoredFile, CaseAssetFileVersion, CaseClinicalUploadEvidence, CaseFileAccessAudit, WorkType, Product, and Dentist. Development had zero Case assets and StoredFiles before application; no row was classified, reclassified, or fabricated. Historical `MANAGED_PRIVATE`/null row preservation therefore has no nonempty development example in this gate; it was exercised in the accepted disposable PostgreSQL runtime packet.

## Focused checks

- Prisma schema validation: PASS.
- C2 persistence/audit, mixed-read, N-FILE-110A preservation, Case read/authorization, Case mapper, C3 audit, and Case staging regressions: 9 files / 65 tests PASS.
- Clinical evidence schema artifact tests: 5/5 PASS.
- Global `tsc --noEmit`: PASS.
- Prisma Client/Zod generation: NOT_RUN; no generated output was changed for this gate. The accepted Prisma schema and migration SQL were not modified.

## Independent review

Independent V3 `RUNTIME_EVIDENCE` Reviewer verdict: **PASS**. The Reviewer inspected the actual candidate, canonical-LF execution chain, Prisma records, pre/post ledger and schema, and preservation packet. Direct independent read-only development queries found 50 ordered finished migrations, all checksums matching canonical-LF artifacts, candidate exactly once at the pinned hash, intended enums/nullable column/triggers/validated constraints/function semantics, and unchanged row counts/fingerprints. The Reviewer independently passed Prisma validation and `tsc --noEmit`. No application or provider behavior was verified by this gate.

The disposable PostgreSQL adversarial matrix remains separate and was not repeated against development. No provider object, synthetic Case attachment, public-open operation, or runtime activation was created. No staging or production target was touched. The run-owned temporary Prisma config was removed. After review, the exact isolated execution checkout was archived with the worktree tool; `list_artifacts` identifies it as archived, its path is absent, and `git worktree list --porcelain` lists only the primary checkout. The primary candidate remains at the pinned SHA-256. The single next gate is separately authorized DTO/public-open contract implementation; N-FILE-110 remains inactive.

Primary reconciled `docs/current.md`, the active Files plan, the public-access contract status, and `.agent/current-task.md` after the independent PASS. The checkpoint is closed with no active implementation task.
