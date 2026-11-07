# Case Image V1 verification migration 61 — 2026-11-04

Scope: one Product Owner-authorized Prisma migration on the existing Supabase verification project. No R2, Vercel, deployment, upload activation, or customer-facing production action occurred. This record contains no connection string or credential.

## Immediate preflight

- Target: Supabase project `rvtubjrczuxdxfuazjmr`, database `postgres`, PostgreSQL 17.11, migration login `postgres` through `postgres.rvtubjrczuxdxfuazjmr` on the shared **session** pooler at port 5432. The transient client used the project CA and `sslmode=verify-full`; libpq reported TLSv1.3 and an SSL connection. The native direct IPv6 endpoint was unavailable from this runner. In one psql session, backend PID remained identical across two statements and a session advisory lock was acquired and released. The session pooler therefore supplied the continuity needed for this run.
- Ledger: 60 finished, zero incomplete, zero rolled back. SHA-256 of every predecessor `migration.sql` matched its Prisma ledger checksum. The only locally pending migration was `20261028120000_case_png_webp_v1`; Prisma `migrate status` independently listed only that migration as pending.
- Reviewed migration SQL SHA-256: `515b15d48a3af2a609a926a88cd085db65c14ba43068d9017eb9835c4621e91c`.
- Historical JPEG S001 evidence: one row; ordered full-row JSON MD5 `f78177055fe5fe615bb4eba33421ce33`.
- StoredFile guard: owner `postgres`, SECURITY INVOKER, search path `pg_catalog, public, pg_temp`, function-definition MD5 `4df4e10f75ca326d86c00f6f2cedb4fc`, ACL MD5 `791d2b1e22edbb03f97770724fbb588b`, enabled trigger `StoredFile_object_cleanup_insert` (`O`).
- Public relation ACL, function ACL, and column ACL inventory MD5s: `a290480ba3800cbda0d8e2d465f085d7`, `89d2e708af5e09638bec33bc4b52c395`, `29253540fa398533c309f0da03d57b61`.
- Approved encrypted pre-migration artifact remained present at `F:\Software_Engineering\LabOS\Private-Backups\case-image-v1-premigration-20261103\case-image-v1-premigration-20261103.pgcustom.age`: 260,486 bytes; SHA-256 `b3034543d374f2c93bb9744833afa153c5f9137f406d5a58bbc02689a8220c91`.

## Execution

- Executed the pinned local Prisma CLI `migrate deploy` once, with a run-scoped verification-only `DIRECT_URL` and the reviewed SQL unchanged. Prisma reported applying only `20261028120000_case_png_webp_v1` and that all migrations were successfully applied. No repair, reset, retry, or historical migration edit occurred.

## Independent read-only postflight

- Fresh connection to the same target and login: 61 finished, zero incomplete, zero rolled back. Migration 61 has the reviewed checksum, finished timestamp, no rollback timestamp, and empty logs. Prisma `migrate status` reports the schema up to date.
- `CaseClinicalCodecBackend`: `JULUSIAN_TURBOJPEG,SHARP_LIBVIPS`; `CaseClinicalValidatedSuffix`: `JPG,JPEG,PNG,WEBP`; `CaseClinicalVerifiedFormat`: `JPEG,PNG,WEBP`.
- New `CaseClinicalUploadEvidence_format_identity` CHECK is validated and contains the JPEG S001, PNG V1, WebP V1, and Sharp/libvips identities. Old `CaseClinicalUploadEvidence_s001_identity` is absent.
- Historical JPEG S001 evidence remains one row with exactly the same full-row fingerprint `f78177055fe5fe615bb4eba33421ce33`.
- StoredFile guard still has owner `postgres`, SECURITY INVOKER, the same search path and ACL MD5, and the same enabled trigger. Its new function-definition MD5 is `c4b0a0fac6da1dc876dfd11652267ad0`; its body contains the closed JPEG/PNG/WebP MIME mapping.
- All three public ACL inventory MD5s match preflight exactly. Public object inventory after migration: 41 tables, 16 functions, 16 non-internal triggers. The migration source contains only the reviewed enum additions, evidence constraint replacement, and guard function replacement; no additional migration was recorded.

## Boundaries

- The existing encrypted recovery artifact and private age identity remain untouched.
- No hosted test insert or object operation was performed; postflight validates installed definitions and unchanged historical rows, not a new hosted upload.
- R2 CORS, hosted deployment, verification flag, and actual upload/view testing remain separate authorization gates.

## Independent review

Independent V3 returned `PASS | RUNTIME_EVIDENCE`. The reviewer used read-only checks to confirm the TLS-verified target, all 61 ledger checksums, enum and constraint installation, JPEG fingerprint, guard and ACL continuity, and encrypted backup hash. No material finding was reported.
