# C2 supplemental audit-lifetime verification

Status: executed and exactly cleaned; independent V3 `RUNTIME_EVIDENCE`
review `PASS`. This is a two-scenario supplement, not a rerun of the
previous full matrix. See the [combined scenario matrix](combined-disposable-scenario-matrix.md),
the [fresh-run events](labos-c2-v3-26e4ea0f-events.jsonl), and the
[supplemental events](labos-c2-audit-b77d86ea-events.jsonl).

## Isolation and migration identity

Run `labos-c2-audit-b77d86ea` used exactly one run-owned container
`72468ba7bf5466c531675b61a8634ac3904acac3b4c4bd8194f51c4bf6568a47`
and volume `labos-c2-audit-b77d86ea-data`. Docker engine reported Linux
amd64 29.7.2. PostgreSQL image RepoDigest was
`sha256:00bc86618629af00d2937fdc5a5d63db3ff8450acf52f0636ec813c7f4902929`;
the actual server reported PostgreSQL 17.6. The published endpoint was
loopback-only `127.0.0.1:58435`, database `labos_c2_verify`. The host
connection's server system identifier matched that inside the exact
container (retained hash prefix `250715082db90850`). Loopback host
fingerprint `12ca17b49af2` did not match the recorded development host
fingerprint `eb0d823953fe`/ports 5432 and 6543. No development/Supabase
connection or credential was used.

All 47 repository migration hashes and the temporary copy matched the
approved chain aggregate
`50d508ee3039388c6546fe99aa351c1cd835966e10e42c4f5bfe896a9cec2249`;
`migration_lock.toml` matched
`99836963713b4f5b269ad49af0ed3d7b0b2e336115c2f92dc9ac683d139d0900`.
The unchanged candidate and temporary migration 48 matched SHA-256
`92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
Prisma applied migrations 1-47, then candidate 48, with 47 and 48 finished
records respectively. The installed audit CHECK was present and validated.
The only fixture was one synthetic Organization, AuthUser, Member, Lab,
Patient, saved DRAFT Case, and legacy asset. No real clinical/provider data
or account/session/token was copied. Initial audit count was zero.

## Boundary results

| Transaction | Input relationship | Result | Independent postcondition |
| --- | --- | --- | --- |
| `zero_lifetime` | `ALLOWED`, `ISSUED`, `expiresAt = issuedAt` | Rejected `23514` / `CaseFileAccessAudit_issuance_timestamps` | Audit count 0 before and after; attempted row count 0 |
| `negative_lifetime` | `ALLOWED`, `ISSUED`, `expiresAt < issuedAt` | Rejected `23514` / `CaseFileAccessAudit_issuance_timestamps` | Audit count 0 before and after; attempted row count 0 |

These were distinct transactions. Each rejected-row absence was observed
from a separate PostgreSQL connection. The 13-line supplemental JSONL was
written during execution and has SHA-256
`5158b9adfe72f2fcd08e68fa47a00c5ffc00f44c0ad1f655b5c5fea1cc9f2957`.
The temporary helper SHA-256 before removal was
`95116ea56ad80762e014242d8b75de25b13d3b83a8db24c9be0db5b22745b2d9`;
its narrow pre-execution CODE review passed after collision-safe path and
exact Jiti-cache cleanup corrections. No C2 SQL changed.

## Destruction

The exact container and volume were removed after the scenarios, without
individual immutable-row cleanup or trigger/FK bypass. A separate check
returned `True` for all seven absence fields: container, volume, port 58435
binding, temporary migration directory
`C:\Users\alnaseem\AppData\Local\Temp\labos-c2-audit-b77d86ea`, repository
root `.labos-c2-audit-b77d86ea.prisma.config.ts`, run-marked Jiti compiled
config under `C:\Users\alnaseem\AppData\Local\Temp\jiti`, and repository
root `.c2-audit-supplement.mjs`. The retained event JSONL is evidence, not a
temporary runtime artifact. No broad Docker prune or cache deletion was used.

## Acceptance boundary

The supplement establishes only the two missing positive-lifetime audit
rejections. The [combined, run-attributed evidence](combined-disposable-scenario-matrix.md)
passed independent V3 `RUNTIME_EVIDENCE` review across all 46 mandatory
scenario rows and both cleanup records. Primary records C2 disposable
PostgreSQL runtime verification `PASS` across the two runs. Normal
development C2 migration remains `NOT_RUN` and separately authorized;
provider/private ACL, signed read, C3, and N-FILE-110/111 remain outside
scope.
