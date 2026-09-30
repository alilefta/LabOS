# C2 disposable PostgreSQL verification attempt

Status: BLOCKED before SQL execution. The initial attempt stopped before
container creation; the authorized restart created one run-owned container
and volume, then stopped at target/port attestation and destroyed both.
Scope: Product Owner-authorized disposable PostgreSQL 17.6 verification only.
Normal development migration acceptance remains PENDING.

## Candidate authority

The reviewed baseline candidate was SHA-256
`b6285c48ef9194b78bf48d99296122192bd567582af7314f52eb7f48e0b3f711`.
One duplicate identical `AND "authorizationOutcome" = 'ALLOWED'` conjunct
was removed from `CaseFileAccessAudit_issuance_timestamps`. The exact
47-byte deletion transforms the baseline byte-for-byte into the candidate
SHA-256
`92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
An independent narrow `CODE` Reviewer returned `PASS` on that exact delta;
the remaining conjunct preserves the approved invariant. C2 static schema
and audit tests passed: 2 files, 4 tests. This hash is authoritative for
this attempted run and any separately resumed run must recheck it.

## Isolation preflight and stop

- Docker CLI 29.7.2 and Docker Desktop were installed. The CLI context was
  `desktop-linux`, but both ordinary and host-level `docker version` returned
  no Server and reported that the Linux engine named pipe did not exist.
- Docker Desktop's supported `status` command could not retrieve engine
  status; its `start` command reported the desktop app already running, but
  a second engine check still returned no Server. Historical error-level
  Desktop logs did not establish a current engine cause.
- No PostgreSQL image digest, server version, container isolation, port,
  or effective disposable database target could be attested. The approved
  pre-application stop gate therefore fired. No container/volume was
  created; no migration copy/config, synthetic fixture, SQL connection,
  migration, or C2 database mutation was attempted.
- A run-started Docker Desktop process (PID 19172) was stopped. The
  temporary pre-dedup SQL comparison copy was removed and its absence
  checked. No run-owned container/volume/port or migration/fixture artifact
  was allocated. Docker inspection-based destruction evidence is not
  available because the engine never became reachable; this is not a
  completed runtime cleanup PASS claim.

## Scenario matrix

| Claim | Result | Reason |
| --- | --- | --- |
| Docker isolation, PostgreSQL 17.6, target attestation | BLOCKED | Engine unavailable; no Server or disposable target |
| Migration-chain copy/checksums and migrations 1-47 | NOT_RUN | Pre-application stop |
| Synthetic two-tenant prerequisites | NOT_RUN | Pre-application stop |
| C2 candidate migration 48 and schema inspection | NOT_RUN | Pre-application stop |
| Committed managed asset/version and independent observation | NOT_RUN | Pre-application stop |
| Deferred final-state and cross-tenant constraints | NOT_RUN | Pre-application stop |
| Uniqueness, positive-value, checksum, audit/TTL constraints | NOT_RUN | Pre-application stop |
| Rollback/absence of partial committed state | NOT_RUN | Pre-application stop |
| Committed-row immutability and Member null transitions | NOT_RUN | Pre-application stop |
| Run-owned container/volume destruction | NOT_RUN | None was created; engine inspection unavailable |

No PostgreSQL runtime or development migration acceptance is established.
The normal Supabase/development database was not contacted by this attempt.
The precise blocker is Docker engine availability (`VERIFICATION_ENVIRONMENT_BLOCKER`),
not a C2 SQL/application defect. Resume only after the approved local engine
is reachable, then restart at target/isolation attestation, recheck the pinned
candidate hash, and run every ordered gate; no scenario can be carried forward
as PASS from this attempt. Development migration application still requires
separate Product Owner authorization after disposable runtime evidence.

Independent V3 Reviewer verdict: `PASS | RUNTIME_EVIDENCE` for this
pre-application stop packet, not for C2 PostgreSQL behavior. The Reviewer
confirmed the unreachable engine, corrected candidate hash, `BLOCKED`/
`NOT_RUN` scenario classification, and accurate no-container cleanup wording.

## Authorized restart after Docker became reachable

The Product Owner reported Docker running, and read-only `docker version`/
`docker info` confirmed a Linux engine (Docker Desktop 4.90.0, Engine
29.7.2). The pinned candidate hash remained
`92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
The exact `postgres:17.6` image was pulled, with registry digest
`sha256:00bc86618629af00d2937fdc5a5d63db3ff8450acf52f0636ec813c7f4902929`
and local image ID prefix `50903ccdcab5`. No server version was attested.

One run-owned container/volume pair was created under run ID
`labos-c2-v3-9acabc8b` (container ID prefix `28623b67b099`, volume
`labos-c2-v3-9acabc8b-data`). The real 47 migration directories were
copied to a run-owned temporary path: 47 SQL files and the lock file
matched repository hashes; aggregate chain SHA-256 was
`50d508ee3039388c6546fe99aa351c1cd835966e10e42c4f5bfe896a9cec2249`.
The [per-migration checksum manifest](pre-c2-chain-manifest-20260926.txt)
retains all 47 source hashes, the lock-file hash, and the exact aggregate
construction rule. A fresh read-only calculation from the repository
reproduced the aggregate after the stop.
The temporary Prisma config referenced only a process-local loopback
disposable URL, never project credentials.

The next isolation gate failed: `docker port <exact container ID> 5432/tcp`
reported `no public port '5432/tcp' published`, despite the run request for
`127.0.0.1::5432`. The harness stopped before PostgreSQL target attestation,
before any SQL connection, and before migrations 1-47. Read-only Docker
events subsequently showed one `create`, one `start`, immediate `die` with
exit code 1, and one `destroy`, all for the same exact container ID. The
read-only query was `docker events --since 2h --until <current UTC time>
--filter type=container`, filtered to `labos-c2-v3-`; its four matching
events were:

| Unix second | Event | Container ID prefix | Detail |
| --- | --- | --- | --- |
| 1790434974 | create | `28623b67b099` | run name `labos-c2-v3-9acabc8b` |
| 1790434975 | start | `28623b67b099` | same name |
| 1790434975 | die | `28623b67b099` | exit code 1 |
| 1790434975 | destroy | `28623b67b099` | same name |

No second `labos-c2-v3-` container creation appeared in that daemon event
window; this is bounded event-history evidence, not a claim about all Docker
activity. The
launch helper requested Docker CLI inheritance of `POSTGRES_PASSWORD` but
its allowlisted child environment omitted that process-local generated
value. This is a concrete harness launch defect, not evidence of a C2 SQL
or application defect. Under the one-container
authorization, no second container was created for a harness retry.

The harness removed that exact container and volume. Independent read-only
Docker list commands found neither name; the run-owned temporary migration
directory was `C:\Users\alnaseem\AppData\Local\Temp\labos-c2-v3-9acabc8b`;
the config was repository-root `.labos-c2-v3-9acabc8b.prisma.config.ts`;
the temporary helper was repository-root `.c2-disposable-verify.mjs`.
Exact-path checks found all three absent after cleanup. No port had been
attested or used, and the removed container has no remaining port mapping.
The pulled PostgreSQL image is
not a run-owned container/volume and remains cached locally.

Restart result: environment preflight `BLOCKED`; migrations 1-47,
synthetic seeding, C2 migration 48, schema/trigger inspection, every
PostgreSQL scenario, and normal development migration `NOT_RUN`.
Exact resource destruction `PASS` for the one created run. The blocker is
`VERIFICATION_ENVIRONMENT_BLOCKER` caused by the run-owned Docker launch
environment. The smallest harness repair is to pass the generated password
to the Docker CLI child environment while retaining it only in process
memory; do not log it or import project credentials.
A new disposable container would require renewed exact-run authority, then
fresh target attestation and every ordered gate; no result from this attempt
can substitute for runtime PostgreSQL evidence.

The first independent V3 `RUNTIME_EVIDENCE` review of this restarted attempt
returned `CORRECTION_REQUIRED` for a missing reproducible checksum manifest,
exact temporary paths, and evidence of the single-container count. The
manifest, exact-path checks, and Docker event sequence above address those
evidence gaps; no runtime scenario was rerun as part of this correction.
After the packet-level status was corrected to cover both attempts, the
independent V3 Reviewer returned `PASS | RUNTIME_EVIDENCE` for this
pre-SQL stop evidence. The verdict explicitly does not accept PostgreSQL
constraint behavior, migration application, or C2 development migration.
