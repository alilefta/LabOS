# C2 normal development migration: pre-application stop

Status: `BLOCKED` before materialization or database mutation. Normal
development migration acceptance `PENDING`; migration application `NOT_RUN`.

## Authority and target

The Product Owner authorized exact candidate C2 migration application only
after fresh target, preflight, generated SQL, and artifact identity gates.
The effective Prisma `DIRECT_URL` and runtime `DATABASE_URL` retained the
previously approved development host SHA-256 prefix `eb0d823953fe`, ports
5432 and 6543 respectively, database/schema `postgres`/`public`. The direct
server reported PostgreSQL 17.6, database `postgres`, schema `public`, and
not in recovery. No endpoint URL, username, password, or clinical payload
was printed or retained.

## Read-only migration gate

The repository still has 47 pre-C2 migration directories, ending at
`20260907211306_add_file_upload_grants`. Their bytes match the approved
47-migration manifest; `migration_lock.toml` matches SHA-256
`99836963713b4f5b269ad49af0ed3d7b0b2e336115c2f92dc9ac683d139d0900`.
The development `_prisma_migrations` table has 47 finished, non-rolled-back
records ending at the same migration. However, the applied checksum does
not match the current repository migration SQL for four historical entries:

- `20260821181621_added_better_auth_orgnizations_support`
- `20260821185304_link_lab_to_organization`
- `20260821200152_link_labstaff_to_member`
- `20260821213743_add_labstaff_invitation_intent`

The first comparison used execution order and stopped. A second read-only
comparison sorted by migration name and confirmed the same four mismatches;
the count and latest migration remained 47 and unchanged. This is
**unexpected migration-history checksum drift** under the Product Owner's
explicit pre-application stop rule. The cause and semantic content of the
differences were not established in this attempt. No migration history was
edited or repaired.

The [sanitized preflight evidence](normal-development-preflight-20260927.json)
retains the effective target/server attestation, both comparison outcomes,
and all 47 migration names with applied and repository SHA-256 values;
43 match and the four listed above do not. It was extracted from the two
complete, untruncated read-only command results in the Codex task record,
not reconstructed from a truncated terminal display. The evidence artifact
SHA-256 is
`085ad0123868abbc8e981227985349fc9e8a7ee4eb044d38c97ab4287ca0b088`.

The verifier used a repeatable-read, read-only transaction and rolled it
back on the stop. It did not reach the remaining tenant/Organization/Lab,
Case asset, grant, or aggregate clinical fingerprint checks; these remain
`NOT_RUN` for this attempt. Prisma SQL regeneration/comparison, repository
migration-48 materialization, independent exact-SQL review, `migrate deploy`,
post-migration inspection, regressions, and final independent
`RUNTIME_EVIDENCE` review are likewise `NOT_RUN`.

## Reconciliation

No C2 migration directory was created. The candidate
`c2-proposed-migration.sql` was not changed or applied; its approved SHA-256
remains `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
The accepted combined disposable PostgreSQL checkpoint remains `PASS`, but
it does not override development migration drift. C2 normal-development
migration stays `PENDING`/`BLOCKED`; managed-file activation remains
`INELIGIBLE`. A separately authorized, read-only checksum-provenance
diagnosis or Product Owner reconciliation decision is required before a
fresh application attempt. Do not use `migrate resolve`, reset, migration
history editing, or database repair under this stop packet.

The first independent V3 `RUNTIME_EVIDENCE` review returned
`CORRECTION_REQUIRED` because the database-side checksum values were only
summarized, not retained in reviewer-accessible evidence. The linked
sanitized artifact resolves that documentation gap for rereview; it does
not resolve the checksum drift or authorize resumption.

Independent V3 `RUNTIME_EVIDENCE` rereview: **PASS for this stop record only**.
The Reviewer verified the artifact hash, all 47 applied/repository pairs,
the same four mismatches under both comparisons, 47 finished migrations,
the unchanged candidate, and absence of a real C2 migration artifact.
No database connection was made during review. Development migration
acceptance remains `PENDING`/`BLOCKED`.
