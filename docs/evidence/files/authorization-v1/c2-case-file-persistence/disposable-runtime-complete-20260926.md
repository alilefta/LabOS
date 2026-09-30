# C2 disposable PostgreSQL verification: fresh completion run

Status: partial fresh run; independent V3 `RUNTIME_EVIDENCE` review
`CORRECTION_REQUIRED`. Disposable acceptance `PENDING`/`BLOCKED`.
Scope: disposable PostgreSQL constraint/trigger verification only. The normal
development database was not contacted, migrated, or used for fixtures.

## Pre-execution gate

The prior run's foreign-StoredFile scenario collided with the one-file-per-
version unique key. Its exact matrix baseline hash was
`72912a8184a5ed81cdb6f90cceaac9f6362f9126a3a0f0f139b0e3c3f5d7623c`.
The sole matrix change committed a new Tenant B grant and otherwise-unused
Tenant B StoredFile, observed its ownership and zero referencing versions
from a separate connection, then used it for the Tenant A negative version
attempt. Matrix hash after correction:
`b09885f59675cf6b7486d2e3cad4aa37f4167dec6b58fbdd94ba1d10e94f925f`.
Lifecycle helper remained at
`dab1549fcb42336a67f4ba086c3899a2ba33e48958427bfd12239ef886b2de9a`.
Independent V3 `CODE` rereview: **PASS** for that exact-only harness delta;
both helpers passed `node --check`. The candidate SQL was unchanged.

## Target and migration gates

Run ID `labos-c2-v3-26e4ea0f`; exact volume
`labos-c2-v3-26e4ea0f-data`; container ID prefix `37fb935f704e`.
Docker engine: Linux amd64 29.7.2. PostgreSQL image tag `postgres:17.6`,
RepoDigest `sha256:00bc86618629af00d2937fdc5a5d63db3ff8450acf52f0636ec813c7f4902929`;
the running server reported PostgreSQL 17.6. Only random loopback port
`127.0.0.1:52450` was published. Host connection and run-owned container
reported matching PostgreSQL system identifiers (recorded hash prefix
`61dcbdadcfcf54d0`). Disposable database `labos_c2_verify`, loopback
host fingerprint `12ca17b49af2`, versus the recorded development host
fingerprint `eb0d823953fe` and ports 5432/6543. The effective target did
not match development. Password was fresh, process-local, passed only to
Docker and the disposable connection, and never recorded. No project
credentials or real data were imported.

Repository and temporary-copy checks of all 47 pre-C2 migrations: **PASS**;
aggregate SHA-256
`50d508ee3039388c6546fe99aa351c1cd835966e10e42c4f5bfe896a9cec2249`.
`migration_lock.toml` SHA-256:
`99836963713b4f5b269ad49af0ed3d7b0b2e336115c2f92dc9ac683d139d0900`.
Authoritative C2 SQL and temporary migration 48 both SHA-256
`92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
Prisma 7.8 `migrate deploy`: migrations 1-47 **PASS**, 47 finished records;
candidate migration 48 **PASS**, 48 finished records. No repository
migration was registered. Pre-C2 seed **PASS**: exactly two synthetic
Organizations, users, Members, Labs, Patients, saved DRAFT Cases, one
UPLOADED grant, and one synthetic legacy asset. No clinical/provider data
was copied.

Installed-schema sample: four enabled triggers, five key constraints,
initially deferred Case-asset final-state trigger, five indexes, and two
nullable legacy URL/extension columns: **PASS**. The synthetic legacy
asset retained its identity, Case/Lab, metadata, URL, extension, and
`LEGACY_URL_UNVERIFIED` mode with null current pointer. Migration fabricated
zero StoredFile, version, or audit rows.

## PostgreSQL scenario matrix

All `PASS` entries below are results from this fresh run, not inherited from
the previous partial run. Successful committed scenarios were queried from an
independent database connection. Rejected transactions checked SQLSTATE,
named constraint where applicable, unchanged table counts, and absence of
the attempted row; cross-table rollback was checked separately.

| Scenario | Result | Observed outcome |
| --- | --- | --- |
| Managed version 1 and current pointer | PASS | Committed; independent read saw version 1/current 1 |
| Immutable version 1 retained while version 2 advances pointer | PASS | Committed; independent read saw versions 1,2/current 2 |
| Managed pointerless final state | PASS | Commit rejected `P0001`; no partial row |
| Managed legacy URL final state | PASS | Commit rejected `P0001`; no partial row |
| Managed legacy extension final state | PASS | Commit rejected `P0001`; no partial row |
| Invalid legacy final state | PASS | Commit rejected `P0001`; no partial row |
| Case/Lab mismatch | PASS | `23503` `CaseAssetFile_dentalCaseId_labId_fkey` |
| Pointer to another asset/version/Lab | PASS | `23503` `CaseAssetFile_currentVersionId_id_labId_fkey` in two tests |
| Foreign grant on StoredFile | PASS | `23503` `StoredFile_sourceUploadGrantId_organizationId_labId_fkey` |
| Tenant B file and version prerequisites | PASS | Three committed states independently observed |
| Fresh unused Tenant B StoredFile prerequisite | PASS | Committed; separate read saw Tenant B ownership and zero versions |
| Tenant A version referencing foreign Tenant B file | PASS | `23503` `CaseAssetFileVersion_storedFileId_organizationId_labId_fkey`; no partial row |
| StoredFile Lab/Organization mismatch | PASS | `23503` `StoredFile_labId_organizationId_fkey` |
| Provider/object-key uniqueness | PASS | `23505` `StoredFile_provider_providerObjectKey_key` |
| Source-grant uniqueness | PASS | `23505` `StoredFile_sourceUploadGrantId_key` |
| Positive StoredFile size | PASS | Zero rejected `23514` `StoredFile_sizeBytes_positive` |
| Checksum paired nullability | PASS | Unpaired value rejected `23514` `StoredFile_checksum_pair` |
| One StoredFile per version | PASS | Reuse rejected `23505` `CaseAssetFileVersion_storedFileId_key` |
| Per-asset version number uniqueness | PASS | Duplicate rejected `23505` `CaseAssetFileVersion_caseAssetFileId_versionNumber_key` |
| Positive version number | PASS | Zero rejected `23514` `CaseAssetFileVersion_versionNumber_positive` |
| Failed cross-table transaction | PASS | Deferred rejection `P0001`; asset and newly inserted file both absent |
| `ALLOWED` + `ISSUED` audit and 300-second bound | PASS | Committed; independent read saw exact 300-second TTL |
| Issued audit with zero or negative expiry (`expiresAt <= issuedAt`) | NOT_RUN | Mandatory positive-lifetime rejection was omitted from the harness |
| `DENIED` + `ISSUED` audit | PASS | `23514` `CaseFileAccessAudit_issuance_timestamps` |
| Missing issuance timestamps | PASS | `23514` same check |
| Expiry beyond 300 seconds | PASS | `23514` same check |
| Nonissued event carrying issuance timestamps | PASS | `23514` same check |
| Committed StoredFile UPDATE/DELETE | PASS | Both rejected `P0001`; prior size retained |
| Committed version UPDATE/DELETE | PASS | Both rejected `P0001`; prior version number retained |
| Committed audit UPDATE/DELETE | PASS | Both rejected `P0001`; prior reason retained |
| Live Member null plus identity mutation | PASS | Rejected `P0001`; no state change |
| Permitted live Member non-null to null | PASS | Committed and independently observed |
| Actual `ON DELETE SET NULL` | PASS | Synthetic Member delete committed; live version Member null, immutable snapshot retained |

The helper emitted `scenario_matrix: PASS` for its implemented tests, but
that marker is **not** full approved-matrix acceptance: the required
positive-lifetime negative case was absent. The observed tests verify
database behavior, not application-level replacement concurrency, real
provider provenance, private ACL, signed reads, or normal-development
migration preservation.

## Exact cleanup

The run-owned container was removed by exact ID and the volume by exact
name, retaining immutable test rows until whole-environment destruction.
Independent Docker listings found no matching container, volume, or port
binding at 52450. The exact run-owned temporary migration copy
`C:\Users\alnaseem\AppData\Local\Temp\labos-c2-v3-26e4ea0f` and Prisma
config at the repository root, `.labos-c2-v3-26e4ea0f.prisma.config.ts`,
were absent. The run-marked Jiti compiled config
`C:\Users\alnaseem\AppData\Local\Temp\jiti\lab-os-project-4-.labos-c2-v3-26e4ea0f.prisma.config.0d3c0d07.mjs`
was found and removed by its verified exact path. The run-owned repository
root helpers `.c2-disposable-run.mjs` and `.c2-disposable-matrix.mjs` were
removed after their hashes and the run results were recorded. An independent
final check returned `True` for all eight absence fields: container, volume,
port binding, temporary copy, Prisma config, Jiti cache, lifecycle helper,
and matrix helper. No broad prune, trigger/FK bypass, or individual
immutable-row deletion was used.

## Acceptance boundary

Independent V3 `RUNTIME_EVIDENCE` review: **CORRECTION_REQUIRED**. The
Reviewer independently confirmed the fresh target/migration/cleanup record
but identified the missing positive-lifetime rejection test. The raw rollout
transcript was also not fully inspectable through the reviewer's truncated
tool output, so individual scenario records need a complete retained raw
evidence extraction for the next review. Exact cleanup passed, but
disposable PostgreSQL runtime acceptance remains **PENDING/BLOCKED**. No
additional disposable run is authorized. Normal development migration:
**NOT_RUN**, requiring separate Product Owner authorization. Provider
capability, managed Case-file activation, C3, and N-FILE-110/111 remain
outside this checkpoint.

## Subsequent supplemental closure

The Product Owner separately authorized the two omitted positive-lifetime
audit boundaries. Both passed in disposable run `labos-c2-audit-b77d86ea`.
The complete prior run's 59 event lines were recovered from an untruncated
Codex task-history command result and retained in
[its JSONL](labos-c2-v3-26e4ea0f-events.jsonl). The supplement retained
[its own JSONL](labos-c2-audit-b77d86ea-events.jsonl). The
[combined matrix](combined-disposable-scenario-matrix.md) passed independent
V3 `RUNTIME_EVIDENCE` review. Thus the earlier `CORRECTION_REQUIRED` verdict
above remains historical for this single run, while **combined C2 disposable
PostgreSQL runtime verification is now PASS**. Normal development migration
remains `NOT_RUN` and separately gated.
