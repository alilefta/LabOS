# N-FILE-110 normal-development migration

Status: `PASS` after independent V3 `RUNTIME_EVIDENCE` review. This is development persistence installation only, not Case upload activation.

## Authority and identity

- Exact candidate: `prisma/migrations/20260927130000_case_clinical_upload_evidence/migration.sql`, SHA-256 `e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b`.
- Accepted C2 migration 48 remained SHA-256 `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
- Effective direct development target: approved host SHA-256 prefix `eb0d823953fe`, port 5432, database/schema `postgres`/`public`, PostgreSQL `server_version_num=170006`, not in recovery. Runtime pool target has the same host fingerprint on port 6543. No connection string or credential is retained.
- The isolated Git-managed `nfile110-lf-migration-run` checkout was created at primary HEAD `9debd695f4065c65f7b5aa1cd7a118705850b5ad`. Only its `prisma/migrations` path was changed for execution. Its 47 pre-C2 files, C2, candidate, and lock file were materialized as exact canonical-LF bytes; [isolated chain manifest](normal-development-isolated-chain-20260928.json) records every SHA-256. No primary historical migration was rewritten.

## Fresh preflight

The [read-only preflight](development-migration-preflight-20260928.json) was repeated immediately before deployment. It found 48 finished, non-rolled-back migrations, all 47 historical checksums matching the canonical-LF execution files, C2 matching its accepted hash, and migration 49 not yet applied. Prisma `migrate status` identified only migration 49 as pending. Four August primary working copies remain CRLF while their LF bytes match the applied checksums; one historical migration is not a HEAD Git blob but its current canonical-LF file matches its applied checksum. These source-provenance facts did not alter execution bytes or migration history.

Six Organizations, six canonically linked Labs, two Cases, zero Case assets, two unrelated `UPLOADED` grants, and zero StoredFile/version/audit rows were present. Unlinked Labs, broken Lab/Organization or Case/Lab or asset relationships, Case-scoped grants, grant tenant mismatches, managed assets, and invalid legacy assets were all zero. The evidence table, `clinicalPurpose`, and grant `provider` column were absent as expected. The preflight retains counts and aggregate hashes, not URLs or clinical payloads.

## Application and installed state

The supported Prisma 7.8 `migrate deploy` path was invoked once from the isolated LF migration chain and reported successful application of `20260927130000_case_clinical_upload_evidence`. No `db push`, manual SQL, `migrate resolve`, reset, baseline, or migration-history edit was used.

The [read-only postcheck](development-migration-postcheck-20260928.json) found 49 finished, non-rolled-back migrations: all 47 historical identities and C2 unchanged, with migration 49 present once at the exact reviewed hash. The three enums have exactly the reviewed values; `CaseAssetFile.clinicalPurpose` and `FileUploadGrant.provider` are nullable. `CaseClinicalUploadEvidence` has the reviewed 15 columns. The four named indexes, eight named FKs/CHECKs, six functions, and six enabled triggers are installed; the three final-state constraint triggers are deferrable and initially deferred. The expected CHECKs are validated.

Pre-existing Organization, Lab, Case, asset, grant, StoredFile, version, and audit counts and aggregate fingerprints matched preflight after excluding only the newly added nullable columns from comparison. Existing grants still have null `provider`; no Case-scoped grant or managed asset appeared. `CaseClinicalUploadEvidence`, StoredFile, version, audit, and Case asset row counts remain zero. The migration did not fabricate clinical purpose, evidence, or managed-file history. No provider API or object operation was performed.

## Application checks

- Prisma schema validation: PASS.
- Prisma Client 7.8 and Zod generator: PASS.
- N-FILE-110 schema static tests: 5/5 PASS.
- Affected C2, Case preservation/read/authorization, C3 audit, and upload-grant regressions: 13 files / 87 tests PASS.
- Global `pnpm exec tsc --noEmit`: PASS.
- Owned-file ESLint (`prisma/tests/case-clinical-evidence.test.mjs`): PASS.

The disposable PostgreSQL adversarial scenario matrix was not rerun against development. The primary migration-49 artifact remains the retained exact source; no stage or commit occurred. Prisma Client/Zod generation refreshed generated output in the dirty worktree; it was not staged.

## Independent review and cleanup

Independent V3 `RUNTIME_EVIDENCE` Reviewer verdict: **PASS**, no material findings. The Reviewer re-attested the development target and read-only migration ledger, matched all 49 checksums, inspected the installed enums, columns, validated constraints and enabled/deferred triggers, and independently compared preservation counts/fingerprints. It reran the five schema tests, Prisma validation, focused ESLint, TypeScript, and 24 focused Case/grant regressions. It did not rerun the already applied `migrate deploy`; its command-path conclusion rests on the retained invocation result and independently observed ledger/schema state.

After review, the exact run-owned LF worktree was archived. `list_artifacts` identifies it as archived; its checkout path is absent, and `git worktree list --porcelain` lists only the primary checkout. The three run-owned verification helpers and their temporary Prisma config/directory were removed. The primary migration-49 and C2 hashes remained exact after cleanup. No normal-development synthetic verification fixture was created.

Primary records **N-FILE-110 normal-development migration: PASS**. Schema `CODE: PASS` and combined disposable PostgreSQL verification `PASS` remain separate accepted gates.

## Boundary

This gate installs only the N-FILE-110 evidence persistence schema in normal development. It does not establish private UploadThing ACL, executable JPEG validation or limits, staging/callback/attachment services, signed reads, N-FILE-111, production/staging migration, or clinical upload acceptance.
