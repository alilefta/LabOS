# C2 disposable PostgreSQL verification route

Status: proposed for separate execution authorization. Design and static
review only; no container, database, fixture, or migration was created or
applied under this task. The normal LabOS development database is excluded
from committed immutable-row verification.

## Isolation and construction

Use one run-marked, dedicated PostgreSQL **17.6** container and run-owned
volume on the local Docker engine, not the Supabase development project.
Before creation, separately authorize infrastructure operations and attest
Docker availability, the pinned image digest/server version, free loopback
port, and an empty run ID namespace. A candidate run name is
`labos-c2-v3-<run-id>` for both container and volume. Bind the container
only to a random `127.0.0.1` host port. Generate a one-run password in
memory, never log it, and provide the local connection URL only to the
verification processes. Do not pass `DATABASE_URL`, `DIRECT_URL`, Better
Auth, Supabase, UploadThing, or provider credentials from the normal `.env`
into the container or verification scripts. Refuse to run if the effective
host/port fingerprint equals the attested Supabase development target.
No project database, volume, or clinical data is copied into the container.

Copy the repository's approved 47 pre-C2 migration directories and
`migration_lock.toml` into a run-owned temporary workspace. Record their
checksums and compare them to the repository. Append the exact reviewed C2
candidate SQL as migration 48 in that **temporary copy only**. Before
deployment, require SHA-256
`92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`
for both the reviewed source SQL and the copied migration file; record both
hashes and stop on mismatch. Use a
run-owned Prisma config with the temporary migration path and process-local
disposable URL; do not modify `prisma.config.ts` or the repository migration
history. Run Prisma 7.8 `migrate deploy` for the first 47 migrations against
the disposable database and assert all 47 succeeded. This verifies the real
chain, not a hand-built schema. Seed minimal synthetic prerequisites and one
legacy Case asset, then deploy only the reviewed C2 migration. Assert 48
successful migration records, exact C2 SQL hash, expected columns, FKs,
indexes, checks, trigger definitions, and unchanged synthetic legacy fields.
Stop and destroy the disposable environment on a chain or hash mismatch;
never retarget the command to Supabase.

The synthetic prerequisite set is two run-marked Organizations, each with
one Lab, one AuthUser and Member, one Patient and saved DRAFT Case, plus
run-marked FileUploadGrants where needed. Seed **before** C2 using a
run-owned, parameterized raw-SQL script against the 47-migration schema,
not the repository's current C2 Prisma Client. Insert Organization, then
AuthUser, Member, Lab, Patient, Case, FileUploadGrant, and the single legacy
CaseAssetFile in FK-safe order, checking exact run-marked IDs/cardinality
after each phase. The legacy insert supplies only the pre-C2 required
`documentUrl` and `fileExtension`; it does not reference future
`storageMode` or `currentVersionId` columns. Use parameter bindings and
the actual 47-migration column definitions rather than interpolated SQL.
Insert no Account, Session,
password, token, real clinical URL, or provider object. The pre-C2 legacy
asset uses only `https://example.invalid/<run-id>/legacy` and synthetic
clinical metadata; it is **not** a copied clinical record. Managed-row
tests use synthetic provider/object-key strings as database values only;
they do not assert actual UploadThing provenance, callback, ACL, or access.
The two-tenant set exercises composite ownership denial. All fixture
identifiers must carry the run ID and be asserted before use.

## Scenario-to-environment matrix

| Claim / scenario | Disposable PostgreSQL 17.6 | Normal development database |
| --- | --- | --- |
| Full pre-C2 migration chain and candidate C2 migration | Apply and inspect 47 + 1 records; synthetic legacy row survives | Separately authorized application only after fresh target/preflight and SQL review |
| Managed asset -> StoredFile -> version 1 -> current pointer | **COMMIT** and query final state from a new connection; then version 2 commits and pointer advances without changing version 1 | No managed verification fixture |
| Deferred final-state guard | Commit valid sequence; commit invalid pointerless/URL-bearing managed and invalid legacy transactions, assert SQLSTATE failure and zero partial rows | Inspect installed trigger only |
| Tenant/pointer and uniqueness constraints | Commit/reject wrong asset/Lab/version, foreign grant/file, duplicate provider key/source grant/file/version number, nonpositive values, checksum mismatch | Inspect validated constraints only |
| Audit constraints | Commit ALLOWED + ISSUED with <=300-second expiry; reject DENIED + ISSUED, missing timestamps, and >300-second expiry | No synthetic audit rows |
| Immutable history | In fresh transactions attempt UPDATE/DELETE on committed StoredFile, version, and audit rows; assert rejection and unchanged rows | Inspect enabled triggers only |
| Nullable live Member reference | Verify exact non-null -> null update shape and actual `ON DELETE SET NULL` using a synthetic Member; reject any accompanying identity mutation | No test Member deletion |
| Failed-transaction rollback | Compare run-marked counts and IDs before/after rejected commits from a second connection | No synthetic rollback fixture |
| Cleanup | Destroy exact run-owned container, volume, and temporary migration/config artifacts; verify absence independently | No fixture cleanup needed |

Use separate database connections to observe successful commits, not only
uncommitted state or `SET CONSTRAINTS ... IMMEDIATE`. A failed commit must
leave no partial rows. Record SQLSTATE, constraint/trigger name, redacted
count/ID hashes, and before/after projections, not synthetic provider URLs
or credentials. The immutable committed rows remain inside the disposable
database until its whole run-owned environment is destroyed; there is no
test-only deletion path in C2 and no trigger/FK bypass.

## Destruction and evidence

Record exact container ID, volume name/ID, image digest, local port, and
run ID at creation. Stop only that container, remove it by exact ID, remove
only that run-owned volume, and remove the run-owned temporary Prisma config,
migration copy, and synthetic assets. Never use a broad prune or delete a
computed path without checking its resolved workspace/temporary root.
Independently confirm `docker inspect` finds no container, `docker volume
inspect` finds no volume, the Docker port mapping is gone, and no run-owned
temporary files remain. If destruction cannot be proved, cleanup and runtime
acceptance remain blocked even if scenarios pass.

Disposable evidence establishes PostgreSQL constraint, trigger, migration,
and committed-row behavior only. It does **not** establish application
authorization, transactional grant consumption, provider/private ACL,
clinical URL delivery, signed read, or production readiness. Eventual
development migration application is a separate gate: re-attest Supabase,
rerun fresh preflight/fingerprint and grant checks, independently review the
exact SQL/hash, apply without managed fixtures, inspect all existing legacy
rows and constraints, run application regressions, and obtain V3
`RUNTIME_EVIDENCE` review. Never substitute a disposable synthetic legacy
row for preservation evidence about real development rows.

## Unresolved execution authority

This route is a proposal, not approval to provision Docker or run SQL.
Separate Product Owner authorization must name the disposable local
PostgreSQL environment and its destruction, then separately authorize
normal development migration application after corrected SQL review and
the applicable verification gate. Image availability, Docker daemon access,
and full migration-chain compatibility remain `NOT_RUN` capabilities.
