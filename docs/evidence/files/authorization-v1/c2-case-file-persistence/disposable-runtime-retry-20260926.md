# C2 disposable PostgreSQL verification: authorized retry

Status: BLOCKED in the scenario matrix; exact disposable resource cleanup PASS.
This is a separate run from the earlier pre-SQL stops. C2 normal-development
migration is NOT_RUN and unauthorized; disposable runtime acceptance is not PASS.

## Authority and target

Product Owner authorized one new PostgreSQL 17.6 container and volume, with
the sole prior launch repair of passing a fresh process-local password to
Docker as `POSTGRES_PASSWORD`. Run ID `labos-c2-v3-02956297`; exact container
ID `c88522af9c2ad160d17077225b1e41c3110b8be91a25259f3f6d996d07d3fbd1`;
volume `labos-c2-v3-02956297-data`; Docker Desktop Linux Engine 29.7.2.
Image `postgres:17.6`, registry digest
`sha256:00bc86618629af00d2937fdc5a5d63db3ff8450acf52f0636ec813c7f4902929`.
The container remained running for verification and reported PostgreSQL
17.6 (Debian 17.6-2.pgdg13+1). It published only `127.0.0.1:59684` to
container port 5432. The connected database was `labos_c2_verify`; a
separate in-container connection matched the host connection's PostgreSQL
system identifier (retained hash prefix `af3e5c09990c8952`). The loopback
host hash prefix `12ca17b49af2` and port 59684 differed from the previously
attested development host hash prefix `eb0d823953fe` and ports 5432/6543;
the development database name was `postgres`. No development/Supabase or
provider credential was imported, and the normal database was not contacted.
The generated password was not logged or persisted.

## Migration gates

The C2 candidate SHA-256 was independently rechecked before execution:
`92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
All 47 repository migration SQL hashes matched the
[manifest](pre-c2-chain-manifest-20260926.txt), aggregate
`50d508ee3039388c6546fe99aa351c1cd835966e10e42c4f5bfe896a9cec2249`;
`migration_lock.toml` matched
`99836963713b4f5b269ad49af0ed3d7b0b2e336115c2f92dc9ac683d139d0900`.
The run-owned copy matched the repository files. Prisma 7.8 `migrate deploy`
applied migrations 1-47: **PASS**, 47 finished rows. Pre-C2 seed: **PASS**,
two synthetic Organizations, AuthUsers, Members, Labs, Patients, saved DRAFT
Cases, one UPLOADED synthetic grant, and one synthetic legacy asset. IDs,
tenant linkage, and counts were checked. No real clinical/provider data was
copied. Migration 48 was added only to the temporary migration copy with
the same candidate hash; Prisma `migrate deploy` applied it: **PASS**, 48
finished rows. No repository migration was registered.

Installed-schema inspection: **PASS** for four enabled triggers, five
sampled key constraints, the initially deferred Case asset guard, five
sampled indexes, and both legacy URL/extension columns nullable. The
synthetic legacy asset retained its ID, Case/Lab, title, description, URL,
extension, `LEGACY_URL_UNVERIFIED` mode, and null current pointer; zero
StoredFile/version/audit rows were fabricated by migration.

## Scenario matrix at stop

| Scenario / claim | Result | Observation |
| --- | --- | --- |
| Managed asset -> StoredFile -> version 1 -> current pointer | PASS | Committed and observed from separate connection |
| Version 2 insertion/current-pointer advance; version 1 retained | PASS | Committed; separate connection saw versions 1,2 and current 2 |
| Managed final state without pointer, with legacy URL, or with extension | PASS | Three rejected commits, SQLSTATE P0001; no partial asset row |
| Invalid legacy final state | PASS | Rejected commit P0001; no partial asset row |
| Case/Lab mismatch and pointer to another same-Lab asset | PASS | Composite FKs rejected 23503; no state change |
| StoredFile with foreign grant | PASS | Composite grant FK rejected 23503; no StoredFile row |
| Tenant B file, asset/version, and unpointed version prerequisites | PASS | Committed; observed from separate connections |
| Case A pointer to foreign-Lab version | PASS | Composite current-version FK rejected 23503; no state change |
| Version using foreign tenant StoredFile | BLOCKED | Harness reused a StoredFile already bound to another version; actual SQLSTATE 23505, not the intended 23503 |
| Lab/Organization mismatch, provider key/source grant uniqueness, one-file-per-version, version-number uniqueness | NOT_RUN | Stop at preceding harness collision |
| Positive size/version and checksum pair | NOT_RUN | Stop at preceding harness collision |
| Cross-table failed-transaction rollback | NOT_RUN | Stop at preceding harness collision |
| Audit allowed issuance, DENIED+ISSUED rejection, timestamp/300-second rules | NOT_RUN | Stop at preceding harness collision |
| Committed StoredFile/version/audit UPDATE and DELETE immutability | NOT_RUN | Stop at preceding harness collision |
| Member-reference null transition and actual ON DELETE SET NULL | NOT_RUN | Stop at preceding harness collision |

The blocked negative case attempted version number 3 for Case A using the
Tenant B StoredFile used by the already committed Tenant B version 1.
The temporary matrix called `version('b1', managedB, fb.fileId, 1, 'b')`
before `version('foreign', managedA, fb.fileId, 3)`. SQLSTATE 23505 is
consistent with the approved one-StoredFile-per-version unique index;
the exact constraint name was not retained because the harness stopped on
its unexpected SQLSTATE. This does **not** establish foreign-file tenant-FK
behavior and is not classified as a C2 application/schema defect. It is a
`VERIFICATION_ENVIRONMENT_BLOCKER` in the run-owned scenario setup. The
intended check would require an unused Tenant B StoredFile, but no scenario
or SQL was altered after the stop and no second container was created under
this one-container authorization.

Temporary helper hashes before removal: lifecycle
`dab1549fcb42336a67f4ba086c3899a2ba33e48958427bfd12239ef886b2de9a`;
matrix `72912a8184a5ed81cdb6f90cceaac9f6362f9126a3a0f0f139b0e3c3f5d7623c`.
These identify the run-owned harness, not application artifacts.

## Cleanup and review

The exact container and volume were removed by ID/name, retaining committed
immutable rows only until whole-database destruction. Independent Docker
`ps`/volume listings and `inspect` found neither resource. Docker events
show one create/start and subsequent kill/die/destroy for this exact ID.
The run-owned temporary migration directory
`C:\Users\alnaseem\AppData\Local\Temp\labos-c2-v3-02956297`
and repository-root `.labos-c2-v3-02956297.prisma.config.ts` were absent.
No listener remained on port 59684; only transient TCP TIME_WAIT sockets
were observed. The two run-owned helper files were removed after this packet
was written, and exact-path checks found both absent. No immutable row was
individually deleted or trigger/FK disabled. The pulled image remains cached.

The first independent V3 `RUNTIME_EVIDENCE` review returned
`CORRECTION_REQUIRED` on cleanup: Prisma/Jiti left one run-marked compiled
config at
`C:\Users\alnaseem\AppData\Local\Temp\jiti\lab-os-project-4-.labos-c2-v3-02956297.prisma.config.9ce3ba0e.mjs`.
Its exact SHA-256 was
`2b0b6ab2952769575aaf814a34e5b8c670f001374c12f4f6217091e701361866`.
After checking its resolved path stayed under the system temporary root and
its full hash matched, Primary deleted **only that file**. A fresh exact
check found no matching run-marked Jiti artifact. Docker container/volume,
port listener, migration copy, config, and both helpers were also absent.
Exact run-resource cleanup is now `PASS`; no broad cache deletion was used.

Independent V3 `RUNTIME_EVIDENCE` rereview: `PASS` for this accurately
classified, partially executed and exactly cleaned run record. The Reviewer
confirmed no remaining run-owned resources and kept the foreign-file test
`BLOCKED` and later scenarios `NOT_RUN`. This verdict is not full C2 runtime
acceptance. Disposable acceptance: `PENDING`/`BLOCKED` because mandatory
scenarios were not completed. The run
does not establish normal development migration, application attachment,
provider/private ACL, signed-read, C3, or N-FILE-110/111 acceptance.
