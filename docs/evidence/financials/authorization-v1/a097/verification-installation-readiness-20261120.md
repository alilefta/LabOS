# A-097 verification audit migration installation gate

Status: READY_FOR_SEPARATE_INSTALLATION_AUTHORIZATION | RECOVERY ACCEPTED_WITH_LIMITATIONS
Target: Supabase `labos-verification` (`rvtubjrczuxdxfuazjmr`), `eu-central-1`, PostgreSQL 17.11
Source: `F:/labos-roadmap-next`, branch `codex/labos-roadmap-next`, HEAD `8b0a9a664a617f15ff358434202e1d63bcdbd868`
Candidate: `prisma/migrations/20261107230000_invoice_public_link_audit/migration.sql`
Candidate SHA-256: `7C60188F28490B3C755E8AF6A7666AA72EB459ED2778A5C772A12503B39264DD`
Authority: Product Owner recovery-scope disposition, 2026-11-20. Installation, grants, deployment, and Git mutation remain unauthorized.

## Recovery disposition and retained evidence

The Product Owner accepts the verified LabOS application-schema and application-data restore **only for assessing installation of this additive audit migration on this isolated verification target**. Existing Organizations, Labs, accounts, clinical records, file references, and provider objects are retained data; none is designated disposable.

A full `pg_dump` custom archive was made through the verified `postgres` migrator identity and TLS connection. It is retained outside Git at `%LOCALAPPDATA%/LabOS/Backups/labos-verification-20261120T193928Z.pgdump.dpapi` with a metadata sidecar. The artifact is encrypted with Windows DPAPI CurrentUser; its directory ACL is protected and limited to the Windows owner and SYSTEM. Encrypted size: 678,902 bytes. Encrypted SHA-256: `704534D7D884BF395E8907252BD2C8B5D14C3FF360AAFAD3921E265D8D4EB397`. Read-only recheck on 2026-11-20 confirmed the file exists and this SHA-256 matches the sidecar. Recovery depends on the original Windows user context; off-machine recovery has not been established. Preserve the artifact and sidecar.

The archive passed an in-memory decrypt/checksum check. A fresh isolated PostgreSQL 17.11 instance restored `public` and `labos_cleanup_private` using `pg_restore --no-owner --no-acl`. Source and restored counts matched: Organization 5, Lab 5, Member 5, Clinic 1, Patient 3, StoredFile 5, CaseClinicalUploadEvidence 5, Prisma migrations 61. The migration-ledger digest matched (`e29d4580db74f77f1a980ac52bd5383b`); six checked tenant relationships had zero orphans; 82 restored foreign keys were validated. Important relation, function, trigger, and index counts matched.

The attempted **full** restore into vanilla PostgreSQL 17.11 stopped at missing `supabase_vault`. Independent V3 review returned **`CORRECTION_REQUIRED | RUNTIME_EVIDENCE`** for a whole-project recovery claim. That finding remains unchanged and the full restore remains `BLOCKED` historical evidence. The Product Owner explicitly accepts the narrower application-schema recovery scope and the residual risk that Supabase-managed schemas, roles, privileges, extensions, service configuration, and external provider objects may not be recoverable from this rehearsal. No provider-object recovery was tested. This disposition does not convert the full restore to PASS.

## Installation preflight — stop on any mismatch

1. Require separate Product Owner approval naming this target, the exact candidate, the column-specific grants below, and the accepted recovery limitation. Serialize the installation with other target schema work. Preserve existing records.
2. Re-attest Supabase project ref `rvtubjrczuxdxfuazjmr`, region `eu-central-1`, healthy state, PostgreSQL major 17, database `postgres`, and direct/session migration identity `current_user = session_user = postgres`. Use verified TLS. The restricted application role is not a DDL runner.
3. Recheck the retained encrypted backup file and sidecar SHA-256 above. Do not treat a missing or changed artifact as covered by this acceptance.
4. Read `public._prisma_migrations`: exactly 61 finished, non-rolled-back rows, no failed/incomplete row, all names in the repository history, and no audit candidate. Confirm audit table/enum and `Invoice_id_labId_key` are absent. Compare all 61 installed checksums with the execution-copy files. Do not edit the ledger, use `migrate resolve`, or waive a mismatch.
5. Read the expected pre-migration LabOS schema and permissions, including the Invoice/Clinic/Lab/Organization relationship, `Lab(id, organizationId)` unique key, Invoice token and expiry column types, table owners, API-role denial, and application role's existing table/schema access. Recheck aggregate Invoice token/expiry states and retained table counts; capture only counts, not tokens or identities. Stop on unexpected drift, inconsistent relationships, or an unreviewed data change.
6. Confirm the candidate file SHA-256 above and that it contains only the reviewed enum/table/index/FK transaction. Do not modify it.

### Byte-faithful Prisma execution copy

Create a new temporary directory **outside the repository**. Copy `prisma/migrations` and `prisma/schema.prisma` there. Do not edit repository migrations or Git history. Verify the four source files have these LF SHA-256 values before converting only their line endings in the temporary copy to CRLF (UTF-8 without BOM):

| Migration | Source LF SHA-256 | Required target-ledger / copy CRLF SHA-256 |
| --- | --- | --- |
| `20260821181621_added_better_auth_orgnizations_support` | `4c4fb9a199c19d90375322321ac15f6c6de82ca3795993234ee3a46661051cb4` | `36ad8a7abc3d77044c50ca59e74c3eb419c48e910ee7396434b27c5b31d81a61` |
| `20260821185304_link_lab_to_organization` | `8a330bd7b835b448b9480616ab80099fb0e2ea1c1cd16d1eebe5900dac83a917` | `2d488bab57d187813a4a2acd592ac3fc814b1f9610440d447333b0126f222e70` |
| `20260821200152_link_labstaff_to_member` | `d4e9b9547912533e4f5418f9a3e99c42447a4fb85587a58de2e2ccedb0f7508e` | `30ef4ee39aaf7dce175970343781456cc0c0e59680d48b74ac224d615f71ff7b` |
| `20260821213743_add_labstaff_invitation_intent` | `906736a1bbfd2f912c5ddd84d0123720602f56998f7986fda385f952b5810d2d` | `93517915303922e962f364bf0883d726bb4b6c0e0b3999f20b919e4525757b86` |

Verify byte-level checksums for **all 61** temporary historical SQL files against the live ledger. The only pending file must be the unchanged audit candidate with SHA-256 `7C60188F28490B3C755E8AF6A7666AA72EB459ED2778A5C772A12503B39264DD`. Stop if any mismatch is not explained by verified byte identity. The disposable PostgreSQL 17.11 rehearsal populated a target-equivalent 61-row Prisma ledger, ran the actual Prisma `migrate deploy` from this execution copy, installed the candidate once, reached 62 finished rows, and reported no pending migration on a second run.

Create a temporary `prisma.config.ts` pointing `schema` and `migrations.path` at the temporary copies and `datasource.url` at the process-scoped `DIRECT_URL`. Use the separately approved target migrator credential with verified TLS; do not print, persist, or pass the URL on a command line. Execute the pinned repository Prisma CLI's `migrate deploy --config <temporary-config>` once. Do not run `migrate dev`, `db push`, or `db execute` on the target.

## Reviewed audit-table grant — apply only under separate authority

After successful migration and before deploying audit-writing application code, the DDL owner applies **only**:

```sql
GRANT SELECT (
  "correlationId", "event", "actorMemberId",
  "organizationId", "labId", "invoiceId"
) ON TABLE public."InvoicePublicLinkAudit"
TO labos_verification_app;

GRANT INSERT (
  "id", "organizationId", "labId", "invoiceId",
  "actorMemberId", "correlationId", "event", "expiresAt"
) ON TABLE public."InvoicePublicLinkAudit"
TO labos_verification_app;
```

The sharing action needs those six read columns for existing-disclosure lookup and eight inserted columns for `ISSUED`/`DISCLOSED`. The target already grants the restricted application role `USAGE` on `public` and the required pre-existing Invoice/Lab/Organization/Member access. Disposable tests confirmed effective enum-type usage without a new grant. Do not add table-wide `SELECT`, audit `UPDATE`/`DELETE`, grants to `anon`/`authenticated`/`service_role`, role memberships, or default-privilege changes. If target post-migration schema/type access differs, stop for review.

## Post-installation checks — before any application rollout

- Confirm exactly 62 finished, non-rolled-back Prisma rows; one audit candidate row with the approved checksum; no failed row. Confirm the enum, audit table, five audit indexes, `Invoice(id, labId)` unique index, and three `ON DELETE RESTRICT` audit foreign keys.
- Compare pre/post aggregate Invoice token/expiry states, retained application table counts, and tenant relationship checks. Existing Invoice/token values must be preserved. Do not print bearer tokens or identifying records.
- Inspect exact audit-column ACLs: `labos_verification_app` may select only the six named columns and insert only the eight named columns; it has no audit `UPDATE`/`DELETE`. `anon`, `authenticated`, and `service_role` have no effective audit-table read/write access. Verify `public` schema and enum usage for the application role and no unexpected `PUBLIC` grant.
- Verify the migration did not change Supabase-managed roles/default privileges, unrelated schema, public statement reader, or external provider objects. Retain sanitized ledger/catalog evidence.
- If Prisma fails, stop and inspect ledger and catalog before any retry. The candidate wraps DDL in a transaction, but a failed Prisma ledger entry needs separately reviewed handling. Do not drop an audit table after the first business audit event; application rollback is not database rollback. The accepted DPAPI backup is a bounded application-schema recovery option, not proof of full Supabase recovery. Remove only exact run-owned temporary execution files after checks; retain the backup.

## Separate deployment gate

Database installation readiness is **not** application deployment readiness. The verification Vercel project's `DATABASE_URL` is present for Production/Preview but provider APIs redact its value. Its effective database host, project ref, and role remain `NOT_ATTESTED` after the 2026-11-05 update; there is no `DIRECT_URL` in the Vercel environment inventory. Attest that binding and obtain separate deployment approval before releasing the audit-writing application. No migration, grant, Vercel configuration change, commit, push, or deployment is authorized by this packet.

Relevant accepted design and earlier evidence: [public-statement capability plan](../../../../plans/authorization-v1/a097-public-statement-capability.md), [schema migration verification](schema-migration-verification.md), and [deployment architecture](../../../../plans/deployment-d1.md).
