# N-FILE-110 Case clinical evidence schema candidate

Status: SCHEMA/SQL AUTHORING CODE PASS after independent V3 review; PostgreSQL execution and normal development migration NOT RUN; managed Case files inactive
Date: 2026-09-28
Authority: Product Owner approval of `JPEG_CLINICAL_V1`, immutable release IDs, and additive schema authoring only

## Authored artifacts

- `prisma/schema.prisma`: `CaseClinicalPurpose`, `CaseClinicalVerifiedFormat`, and `CaseClinicalValidatedSuffix` closed enums; nullable `CaseAssetFile.clinicalPurpose`; nullable Case-only-capable `FileUploadGrant.provider`; one-to-one `CaseClinicalUploadEvidence` with required canonical tenant/Case, provider/key, verified format/suffix, positive measurements, digest, release ID, and validation time.
- `prisma/migrations/20260927130000_case_clinical_upload_evidence/migration.sql`: next candidate after accepted C2 migration 48. SHA-256: `e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b` (recompute if changed after review).
- `prisma/tests/case-clinical-evidence.test.mjs`: focused read-only artifact tests. This isolated Node test sits under `prisma/tests/` because `apply_patch` rejects writes under this checkout's existing `tests/` tree as a reparse-point path; no shell-write workaround or test-runner configuration change was used.
- C2 migration 48 remains SHA-256 `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80` and was not edited.

`validationProfile` is `VARCHAR(64)` with an uppercase identifier-shape CHECK, not an enum. The later application registry must close recognized release IDs such as `JPEG_CLINICAL_V1_R001`; adding `R002` does not require a database migration. No browser-supplied release ID is authorized. The database stores no mutable JPEG ceilings, callback MIME, URL, filename, pixel count, or arbitrary metadata. `contentSha256` is the SHA-256 of independently inspected bytes and does not prove provider-object immutability.

## Structural and custom SQL

Prisma 7.8 `migrate diff --from-schema <pre-edit copy> --to-schema prisma/schema.prisma --script` was run without a datasource. Its enum, columns, evidence table, indexes, and four composite/single-column FKs match the candidate's structural section after comment/whitespace normalization. The evidence FK includes grant ID, Organization, Lab, provider, and reserved key. A separate composite Case FK binds Case ID/Lab; Lab is bound to Organization. Evidence has a primary-key one-to-one grant ID and a unique provider/key pair. All evidence FKs use RESTRICT/NO ACTION; no evidence cascade is introduced.

Custom PostgreSQL SQL adds:

1. Positive measured bytes/dimensions, lowercase 64-hex digest, nonempty object key, and release-ID structural checks. Numerical byte/pixel/metadata ceilings remain in immutable application policy releases.
2. A BEFORE UPDATE/DELETE evidence trigger that rejects mutation, including deletion. Committed immutable evidence is not individually disposable.
3. A BEFORE INSERT evidence trigger that locks the reserved grant and requires the exact Case boundary/purpose, target, tenant, provider/key, same-Organization live Member, PENDING status, current database clock before expiry, and validation time inside the fixed grant interval.
4. A Case-scoped grant identity trigger that requires a saved Case in the canonical Lab/Organization and a nonnull same-Organization Member on insertion, freezes tenant/target/provider/expiry/key after reservation, and permits the pre-existing Member FK non-null-to-null transition. It does not change non-Case grant completion semantics or require a deleted Case to exist when cleaning up a previously staged grant.
5. Deferred final-state triggers: a Case grant cannot transition to UPLOADED without matching evidence and before-expiry database clock; inserted evidence cannot commit while its grant remains PENDING; a MANAGED_PRIVATE Case asset requires clinicalPurpose while a legacy asset retains null purpose. These read final rows at constraint-check time so evidence and UPLOADED, or managed asset and purpose, can be constructed in one transaction. The grant trigger is scoped to status transitions, preserving later Member `SET NULL` and cleanup metadata updates on an already UPLOADED grant.

The grant's existing `createdAt`/`expiresAt` columns are `TIMESTAMP(3)` without time zone (historical grant migration), while evidence `validatedAt` and PostgreSQL `clock_timestamp()` are `timestamptz`. The candidate explicitly interprets grant timestamps as UTC with `AT TIME ZONE 'UTC'` before instant comparisons, avoiding session-TimeZone-dependent implicit casts. A non-UTC session scenario remains required in disposable SQL verification.

The migration contains no legacy backfill, no fabricated StoredFile/version/evidence rows, no C2 constraint replacement, and no policy ceilings. Existing `IMAGE | VIDEO | SCANNERFILE` stays compatibility data. `StoredFile.detectedMimeType` remains unchanged and future JPEG attachment must derive `image/jpeg` only from independently verified evidence.

## Verification and remaining gates

- Prisma 7.8 schema validation: PASS.
- Prisma Client generation: PASS.
- Offline generated structural diff comparison: PASS (normalized SQL identical).
- Existing C2 schema/audit, upload-grant telemetry, and `case.asset.add` authorization tests: 4 files / 22 tests PASS.
- Global `pnpm exec tsc --noEmit`: PASS.
- New schema-focused artifact tests: 5/5 PASS (`node --test prisma/tests/case-clinical-evidence.test.mjs`). Owned-file ESLint: PASS.
- PostgreSQL execution, committed trigger behavior, and disposable SQL scenarios: NOT RUN. Workflow standing authority does not provision a new disposable database; separate environment/runtime authority is required.
- Independent V3 `CODE`/SQL review: `PASS` on candidate SHA-256 `e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b`. The initial `CORRECTION_REQUIRED` findings on canonical Member and DB-clock expiry, and the second timestamp-type/session-TimeZone finding, were corrected and rereviewed. Reviewer confirmed structural diff, trigger ordering by code inspection, Prisma validation and 5/5 static tests. No PostgreSQL runtime claim was reviewed or accepted.

Before any future normal-development application: read-only target attestation, fresh data/migration preflight (including existing Case-scoped grants), exact candidate hash and migration-order review, authorized disposable PostgreSQL positive/negative matrix, independent runtime review, then separate normal-development migration authority. No managed staging/callback/validator/attachment or private-provider claim follows from schema authoring.
