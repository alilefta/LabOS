# C2 development migration validation

Status: BLOCKED at fresh read-only preflight. Classification:
`VERIFICATION_ENVIRONMENT_BLOCKER`. C2 code acceptance remains `PASS`;
development database migration acceptance is `PENDING`, not passed. Read-only
identity and preflight SQL executed; no migration SQL generation/application,
DDL/DML, or other state-changing SQL occurred.

## Target attestation

- Effective Prisma `DIRECT_URL` and runtime `DATABASE_URL` share the accepted
  Supabase development host fingerprint `eb0d823953fe`. Direct port `5432`,
  runtime pooler port `6543`, database/schema `postgres`/`public`.
- Connected read-only transaction reported PostgreSQL 17.6, 47 applied
  migrations, latest `20260907211306_add_file_upload_grants`. These match the
  prior accepted development attestation. No URL, username, or credential was
  retained.
- The first identity SQL query had a quoting error and rolled back without
  mutation. The corrected query passed. A Node TLS chain-validation attempt
  failed before SQL because the chain contains a self-signed certificate; the
  aggregate preflight used encrypted TLS without chain validation, matching
  the existing development `psql sslmode=require` behavior. The host
  fingerprint/database checks, not certificate validation, establish this
  bounded target attestation.

## Fresh preflight

All SQL ran within `BEGIN READ ONLY` with a local statement timeout. Output
contained only counts, hashed Lab/Case pair identifiers, and an aggregate
clinical fingerprint; no clinical URLs or payloads were printed.

| Check | Result |
| --- | --- |
| `CaseAssetFile` rows | 3; two hashed Case/Lab groups with counts 2 and 1 |
| Missing/empty URL or extension | 0 / 0 |
| Missing Case/Lab or Case/Lab mismatch | 0 / 0 |
| Duplicate URL groups | 0 (informational) |
| Duplicate Case, Lab, or FileUploadGrant composite candidates | 0 / 0 / 0 |
| FileUploadGrant missing tenant, missing linked Lab/Organization, Lab/Organization mismatch | 0 / 0 / 0 |
| FileUploadGrant status | `UPLOADED`: 2 |
| **Labs without Organization linkage** | **1: required stop condition** |
| C2 tables and `storageMode`/`currentVersionId` columns | absent, as expected before migration |

Aggregate clinical fingerprint: `e8f62eff25a90bc7b3d7d16da68e6297`.
The present three-row count happens to match the historical inventory, but
that historical observation was not used as a substitute for this preflight.

The accepted safety packet requires stopping on any nonzero tenant-linkage
defect. The one Lab without Organization linkage violates that invariant.
Its relationship to the three assets was not investigated after the stop;
do not infer that it is harmless, nor mutate it to make preflight pass.

## Phase disposition

- Target attestation: `PASS` for the approved development scope.
- Fresh read-only preflight: `BLOCKED` by the Lab/Organization integrity count.
- Prisma-modelled SQL regeneration/comparison, exact-SQL review, migration
  application, legacy preservation, PostgreSQL scenario matrix, application
  post-migration regressions, and independent runtime acceptance: `NOT_RUN`.
- No migration identity or applied SQL exists for this attempt. The authored
  `c2-proposed-migration.sql` remains review-only and unchanged.
- No synthetic fixtures, managed assets, provider objects, or run markers were
  created. The temporary preflight helper was removed; no fixture cleanup was
  needed. The migrated C2 schema is not present in development.
- The prior `prisma-zod-generator` spawn `ENOENT` was not reassessed because
  the post-migration verification phase was not reached.

## Required next decision

Separately authorize a bounded read-only diagnosis of the unlinked Lab and
its Case/asset/grant relationships, then decide whether/how the development
data may be reconciled without harming existing tenants. Any data mutation
needs explicit separate authority. Only after the required invariant passes
may a new bounded C2 migration-validation attempt resume at fresh attestation
and preflight. Do not skip to SQL generation or application on this evidence.

Independent V3 `RUNTIME_EVIDENCE` review: initial `CORRECTION_REQUIRED`
for wording that incorrectly said no SQL had executed. The wording was
corrected to distinguish read-only SQL from state-changing/migration SQL.
Independent rereview: `PASS | RUNTIME_EVIDENCE` for the stopped packet and
stop discipline. Reviewer PASS does not establish development migration
acceptance. Primary reconciliation: migration validation `BLOCKED`,
development database acceptance `PENDING`, parent activation gate
`INELIGIBLE`; no later phase was run.
