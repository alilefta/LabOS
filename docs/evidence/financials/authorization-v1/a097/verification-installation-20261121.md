# A-097 verification audit migration installation

Status: PASS | TARGET INSTALLATION + RESTRICTED GRANTS | INDEPENDENT V3 RUNTIME_EVIDENCE
Target: Supabase `labos-verification` (`rvtubjrczuxdxfuazjmr`), `eu-central-1`, database `postgres`, PostgreSQL 17.11.0.003
Source: `F:/labos-roadmap-next`, branch `codex/labos-roadmap-next`, HEAD `8b0a9a664a617f15ff358434202e1d63bcdbd868`
Candidate: `20261107230000_invoice_public_link_audit`
Candidate SQL and installed ledger SHA-256: `7C60188F28490B3C755E8AF6A7666AA72EB459ED2778A5C772A12503B39264DD`
Execution date: 2026-11-21 (Asia/Baghdad)
Authority: Product Owner controlled verification-target installation decision. No application deployment or Git commit was authorized.

## Preflight

- Supabase project status was `ACTIVE_HEALTHY` in the named region and PostgreSQL version. The verified connection reached database `postgres` as `current_user = session_user = postgres`, through the project-specific session pooler identity. The restricted application role was not used for DDL.
- The retained DPAPI-encrypted backup and metadata sidecar both existed. The encrypted file's SHA-256 and sidecar value matched `704534D7D884BF395E8907252BD2C8B5D14C3FF360AAFAD3921E265D8D4EB397`. The backup was not modified.
- The target had 61 finished, non-rolled-back Prisma migrations, zero incomplete records, no candidate row, and no audit table or enum. The new Invoice composite index was absent. All 61 historical ledger checksums matched actual bytes in the temporary execution copy; the four documented historical files were converted from verified LF source bytes to their target-matching CRLF bytes in that copy only. The candidate SQL remained unchanged at the approved hash.
- The target had the expected Lab composite unique index, Invoice key/token/expiry columns, `postgres` ownership of key tables, restricted application access to existing domain tables, and no default public-table grants to `anon`, `authenticated`, or `service_role`.
- Retained aggregate counts were Organization 5, Lab 5, Member 5, Clinic 1, Patient 3, StoredFile 5, clinical-evidence 5, Invoice 0. Checked Lab/Organization, Member/Organization and Invoice relationships had zero inconsistencies. No bearer values or identifying rows were disclosed.
- The pinned installed Prisma CLI was 7.8.0. Its read-only `migrate status` against the temporary copy identified only the audit candidate as pending. The migrator URL was process-scoped with `sslmode=verify-full` and the existing verification CA. Client `psql \conninfo` confirmed SSL/TLSv1.3 to the pooler; `pg_stat_ssl` on the database backend is not a client-to-pooler TLS measurement.

## Authorized installation

After immediate rechecks of backup, HEAD, candidate, target identity, 61 ledger rows, audit absence, and all 61 file checksums, the pinned Prisma CLI's `migrate deploy` ran **once** from the temporary byte-faithful copy. It exited 0, applied only `20261107230000_invoice_public_link_audit`, and reported all migrations successfully applied. No `migrate dev`, `db push`, `db execute`, ledger edit, historical migration edit, or manual substitute was used.

After the migration succeeded, the `postgres` identity applied exactly the two reviewed `GRANT SELECT` and `GRANT INSERT` statements from the [installation runbook](verification-installation-readiness-20261120.md). Each returned `GRANT`. No table-wide grant, audit UPDATE/DELETE grant, role-membership change, or default-privilege change was applied.

## Post-installation verification

- The Prisma ledger contains 62 finished, non-rolled-back rows, zero incomplete/failed rows, and exactly one candidate row with the approved SHA-256. All 62 ledger checksums match the execution copy. A second read-only `migrate status` exited 0 and reported the database schema up to date.
- The audit enum, nine-column `postgres`-owned audit table, five audit indexes, `Invoice(id, labId)` unique index, and three `ON DELETE RESTRICT` foreign keys are present. The composite Lab/Organization and Invoice/Lab references are correct. Public table count changed from 41 to 42; the `postgres` public default-ACL count remained 3.
- Effective `labos_verification_app` audit access is exactly six named SELECT columns (`actorMemberId`, `correlationId`, `event`, `invoiceId`, `labId`, `organizationId`) and eight named INSERT columns (those plus `expiresAt` and `id`). The role has no audit UPDATE, DELETE, or TRUNCATE. `anon`, `authenticated`, `service_role`, and `PUBLIC` have no audit-table read/write access. The application role has required `public` schema and enum USAGE.
- Retained application counts remained Organization 5, Lab 5, Member 5, Clinic 1, Patient 3, StoredFile 5, clinical-evidence 5, Invoice 0; audit rows remained 0. Checked tenant relationships remained consistent. No persistent synthetic audit row was inserted. No unexpected LabOS schema or privilege change was observed in the scoped catalog checks.
- The retained encrypted backup and its sidecar were preserved. No application, Vercel configuration, provider object, or original dirty worktree change was made.

## Independent review and remaining gates

Independent V3 read-only review returned **PASS | RUNTIME_EVIDENCE**. The reviewer independently confirmed the ledger, candidate checksum, schema objects, composite relationships, exact effective ACLs, retained counts, and absence of material unapproved privilege expansion.

The Product Owner's earlier `ACCEPTED_WITH_LIMITATIONS` recovery disposition remains unchanged. The failed full PostgreSQL restore remains historical `BLOCKED` with V3 `CORRECTION_REQUIRED`; Supabase-managed schemas, roles, privileges, extensions, service configuration, and external provider objects were not covered by the application-schema restore. The DPAPI backup depends on the original Windows user context, and off-machine recovery is unverified.

The effective verification Vercel `DATABASE_URL` host, project, and role remain `NOT_ATTESTED`. Database installation is complete; application deployment needs separate runtime-binding attestation and Product Owner authorization. No commit, merge, push, rebase, or deployment occurred.