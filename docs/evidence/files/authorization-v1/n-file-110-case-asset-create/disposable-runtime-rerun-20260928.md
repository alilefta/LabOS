# N-FILE-110 disposable PostgreSQL rerun

Status: `PASS` for combined disposable PostgreSQL verification after independent V3 `RUNTIME_EVIDENCE` review
Run: `labos-nfile110-v3-5c3ec63d` (fresh, not the earlier stopped run)
Candidate SHA-256: `e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b`
Evidence: [redacted run events](labos-nfile110-v3-5c3ec63d-events.jsonl), SHA-256 `3a3ffbce9a5609523052e5d7d3af16e4a58908ff55758a8876846dfdad5fff13`

## Isolation and migration gates

| Gate | Result | Evidence |
| --- | --- | --- |
| Fresh run ID/container/volume | PASS | [1](labos-nfile110-v3-5c3ec63d-events.jsonl#L1) |
| 47 pre-C2, C2, candidate source hashes | PASS; C2 `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80` | [2](labos-nfile110-v3-5c3ec63d-events.jsonl#L2) |
| Docker/pinned image | PASS; engine 29.7.2, approved PostgreSQL 17.6 image digest | [3](labos-nfile110-v3-5c3ec63d-events.jsonl#L3) |
| Disposable target | PASS; loopback `127.0.0.1:54607`, `server_version_num=170006`, new container ID prefix `a98fe59c4225`, database `postgres`; no project datasource credential | [4](labos-nfile110-v3-5c3ec63d-events.jsonl#L4) |
| Migrations through accepted C2 | PASS; 48 finished | [5](labos-nfile110-v3-5c3ec63d-events.jsonl#L5) |
| Exact candidate migration | PASS; 49 finished, six inspected triggers and ten evidence constraints | [6](labos-nfile110-v3-5c3ec63d-events.jsonl#L6) |
| Synthetic prerequisites | PASS; two Organizations/Labs/Members and three saved Cases, all run-marked | [7](labos-nfile110-v3-5c3ec63d-events.jsonl#L7) |
| Exact cleanup | PASS; run-owned container, volume and temporary workspace absent; independent exit-code/port inspection also confirmed absence | [48](labos-nfile110-v3-5c3ec63d-events.jsonl#L48) |

The run-owned helper was removed after independent review. The previous stopped run's resources were not reused.

## Scenario matrix

For every rejected transaction below, the run recorded SQLSTATE and a separate-connection before/after projection with no partial committed state. For every committed transaction, the listed final state was observed on a separate connection. A blank PostgreSQL constraint name means the named custom trigger raised SQLSTATE `23514` without setting `CONSTRAINT` in the exception metadata.

| Scenario | Expected | Actual / postcondition | Result | Event |
| --- | --- | --- | --- | --- |
| Case grant and key reservation | Commit PENDING with reserved key | Committed; PENDING/key observed | PASS | [8](labos-nfile110-v3-5c3ec63d-events.jsonl#L8) |
| Evidence then UPLOADED | Commit one matching evidence row | Committed; UPLOADED/evidence count 1 | PASS | [9](labos-nfile110-v3-5c3ec63d-events.jsonl#L9) |
| UPLOADED without evidence | Reject | `23514`; PENDING/count 0 | PASS | [10](labos-nfile110-v3-5c3ec63d-events.jsonl#L10) |
| Evidence with PENDING final grant | Reject | `23514`; PENDING/count 0 | PASS | [11](labos-nfile110-v3-5c3ec63d-events.jsonl#L11) |
| Evidence wrong Organization | Reject | `23514`; unchanged | PASS | [12](labos-nfile110-v3-5c3ec63d-events.jsonl#L12) |
| Evidence wrong Lab | Reject | `23514`; unchanged | PASS | [13](labos-nfile110-v3-5c3ec63d-events.jsonl#L13) |
| Evidence wrong same-Lab Case | Reject | `23514`; unchanged | PASS | [14](labos-nfile110-v3-5c3ec63d-events.jsonl#L14) |
| Evidence foreign-Lab Case | Reject | `23514`; unchanged | PASS | [15](labos-nfile110-v3-5c3ec63d-events.jsonl#L15) |
| Evidence wrong reserved key | Reject | `23514`; unchanged | PASS | [16](labos-nfile110-v3-5c3ec63d-events.jsonl#L16) |
| Evidence wrong/null provider | Reject | `23514`; unchanged | PASS | [17](labos-nfile110-v3-5c3ec63d-events.jsonl#L17) |
| Grant null Member | Reject | `23514`; no grant | PASS | [18](labos-nfile110-v3-5c3ec63d-events.jsonl#L18) |
| Grant foreign-Organization Member | Reject | `23514`; no grant | PASS | [19](labos-nfile110-v3-5c3ec63d-events.jsonl#L19) |
| Grant foreign Lab/Organization | Reject | `23514`; no grant | PASS | [20](labos-nfile110-v3-5c3ec63d-events.jsonl#L20) |
| Grant missing Case | Reject | `23514`; no grant | PASS | [21](labos-nfile110-v3-5c3ec63d-events.jsonl#L21) |
| Expired at inspection | Reject by DB clock | `23514`; PENDING/count 0 | PASS | [22](labos-nfile110-v3-5c3ec63d-events.jsonl#L22) |
| Validation before grant creation | Reject | `23514`; PENDING/count 0 | PASS | [23](labos-nfile110-v3-5c3ec63d-events.jsonl#L23) |
| Validation at/after expiry | Reject | `23514`; PENDING/count 0 | PASS | [24](labos-nfile110-v3-5c3ec63d-events.jsonl#L24) |
| Zero measured bytes | Reject | `23514`, positive-measurements CHECK | PASS | [25](labos-nfile110-v3-5c3ec63d-events.jsonl#L25) |
| Negative measured bytes | Reject | `23514`, positive-measurements CHECK | PASS | [26](labos-nfile110-v3-5c3ec63d-events.jsonl#L26) |
| Zero width | Reject | `23514`, positive-measurements CHECK | PASS | [27](labos-nfile110-v3-5c3ec63d-events.jsonl#L27) |
| Zero height | Reject | `23514`, positive-measurements CHECK | PASS | [28](labos-nfile110-v3-5c3ec63d-events.jsonl#L28) |
| Invalid SHA-256 shape | Reject | `23514`, SHA-256 CHECK | PASS | [29](labos-nfile110-v3-5c3ec63d-events.jsonl#L29) |
| Invalid profile shape | Reject | `23514`, profile CHECK | PASS | [30](labos-nfile110-v3-5c3ec63d-events.jsonl#L30) |
| Empty provider object key | Reject | `23514`, grant/evidence binding guard | PASS | [31](labos-nfile110-v3-5c3ec63d-events.jsonl#L31) |
| Duplicate evidence for one grant | Reject | `23505`, evidence PK; rollback leaves PENDING/count 0 | PASS | [32](labos-nfile110-v3-5c3ec63d-events.jsonl#L32) |
| Duplicate reserved key | Reject | `23505`, grant provider-key uniqueness | PASS | [33](labos-nfile110-v3-5c3ec63d-events.jsonl#L33) |
| Evidence UPDATE | Reject; committed row unchanged | `23514`; count 1/width unchanged | PASS | [34](labos-nfile110-v3-5c3ec63d-events.jsonl#L34) |
| Evidence DELETE | Reject; committed row retained | `23514`; count 1/width unchanged | PASS | [35](labos-nfile110-v3-5c3ec63d-events.jsonl#L35) |
| Grant target mutation | Reject | `23514`; unchanged | PASS | [36](labos-nfile110-v3-5c3ec63d-events.jsonl#L36) |
| Grant reserved-key mutation | Reject | `23514`; unchanged | PASS | [37](labos-nfile110-v3-5c3ec63d-events.jsonl#L37) |
| Grant expiry mutation | Reject | `23514`; unchanged | PASS | [38](labos-nfile110-v3-5c3ec63d-events.jsonl#L38) |
| Non-Case grant UPLOADED without evidence | Commit under pre-existing non-Case behavior | Committed UPLOADED/count 0 | PASS | [39](labos-nfile110-v3-5c3ec63d-events.jsonl#L39) |
| Legacy asset with null clinical purpose | Commit | Committed, legacy/purpose null | PASS | [40](labos-nfile110-v3-5c3ec63d-events.jsonl#L40) |
| Legacy asset with clinical purpose | Reject | `23514`; prior null retained | PASS | [41](labos-nfile110-v3-5c3ec63d-events.jsonl#L41) |
| Managed asset with clinical purpose | Commit | Committed, version pointer/purpose present | PASS | [42](labos-nfile110-v3-5c3ec63d-events.jsonl#L42) |
| Managed asset purpose removal | Reject | `23514`; purpose retained | PASS | [43](labos-nfile110-v3-5c3ec63d-events.jsonl#L43) |
| Member FK `SET NULL` | Commit permitted transition | Committed; grant Member ref null | PASS | [44](labos-nfile110-v3-5c3ec63d-events.jsonl#L44) |
| Failed evidence/status transaction | Reject, no partial state | `23514`, positive-measurements CHECK; PENDING/count 0 | PASS | [45](labos-nfile110-v3-5c3ec63d-events.jsonl#L45) |
| Expiry reached before commit | Reject by DB clock | `23514`; PENDING/count 0 | PASS | [46](labos-nfile110-v3-5c3ec63d-events.jsonl#L46) |
| Non-UTC session timestamp interpretation | Explicit non-UTC session; live grant commits and expired grant rejects without partial state | Supplemental run `labos-nfile110-tz-5ed89f5d`: `America/New_York` (UTC-4), live `UPLOADED`/evidence count 1 committed; expired rejected `23514`, PENDING/evidence count 0 from independent connection | PASS, supplemental only | [session and two transactions](labos-nfile110-tz-5ed89f5d-events.jsonl#L7) |

The helper's [aggregate marker](labos-nfile110-v3-5c3ec63d-events.jsonl#L47) supports only the original 39 executed scenarios; the non-UTC row above is supported separately by the supplemental run. No candidate SQL was changed. No normal-development database or provider was contacted. Combined disposable PostgreSQL runtime acceptance is `PASS` after independent V3 review; normal-development migration remains `NOT RUN` and separately gated.

The earlier independent V3 `RUNTIME_EVIDENCE` review returned `CORRECTION_REQUIRED`: it confirmed the hashes, isolation, 49 migration records, executed positive/negative evidence, and cleanup, but found no explicit `SET TIME ZONE`, non-UTC observation, or scenario event. The Reviewer called the omission an `APPLICATION_DEFECT` in the temporary harness. Primary classified that checkpoint blocker as `VERIFICATION_ENVIRONMENT_BLOCKER` because the missing test was harness coverage, not a demonstrated LabOS application/schema defect. The supplemental result does not retroactively change that review; a new combined review is required.

## Supplemental non-UTC run

Run `labos-nfile110-tz-5ed89f5d` used a fresh local PostgreSQL 17.6 container, volume, process-local password, loopback port `54756`, and run-marked synthetic Organization/Lab/Member/Case. The [run event log](labos-nfile110-tz-5ed89f5d-events.jsonl) has SHA-256 `6d4f8f084fda0801c1e92fb33800a8654e4de256f6769737c0c7581b57acc681`. It records the 47 pre-C2 source hashes, accepted C2 hash `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`, candidate hash `e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b`, approved PostgreSQL image digest, loopback isolation, `server_version_num=170006`, and 49 finished migrations. The temporary migration copies were hash-checked before deployment. No normal-development connection string or credential was imported.

The mutation connection explicitly set `TimeZone='America/New_York'` and observed offset `-14400` seconds. The live Case grant used UTC-naive `createdAt` about one minute before database time and `expiresAt` about 15 minutes after; the evidence-to-`UPLOADED` transaction committed, and a separate connection observed `UPLOADED` plus exactly one evidence row. The expired grant used UTC-naive creation about 30 minutes before database time and expiry about 10 minutes before; with an otherwise in-interval `validatedAt`, the trigger rejected evidence insertion with SQLSTATE `23514`. After rollback, a separate connection observed `PENDING` and zero evidence. These margins avoid boundary scheduling ambiguity. [Session evidence](labos-nfile110-tz-5ed89f5d-events.jsonl#L7), [valid commit](labos-nfile110-tz-5ed89f5d-events.jsonl#L8), [expired rollback](labos-nfile110-tz-5ed89f5d-events.jsonl#L9).

The run-owned container, volume and temporary workspace were removed; the [run cleanup event](labos-nfile110-tz-5ed89f5d-events.jsonl#L11) and a subsequent independent Docker/container/volume/port and filesystem check all reported absence. The run-owned helper was removed after Reviewer inspection. An initial sandboxed invocation `labos-nfile110-tz-b54de9aa` stopped at Docker preflight with access denied before container or SQL creation; its [stop/cleanup log](labos-nfile110-tz-b54de9aa-events.jsonl) is not scenario evidence.

## Final independent review and acceptance

V3 Reviewer verdict: `PASS | RUNTIME_EVIDENCE`. The Reviewer individually inspected original scenario events L8-L46 and the supplemental non-UTC session/live-grant/expired-grant events, and confirmed the authoritative hashes, PostgreSQL 17.6 isolation, 49 finished migrations, separate-connection observations, and exact cleanup for both actual disposable runs. The original aggregate `scenario_matrix: PASS` was not used to infer the omitted scenario. Primary reconciles N-FILE-110 schema `CODE: PASS` and **combined disposable PostgreSQL verification: `PASS`**. This does not establish a normal-development migration, provider/private ACL, upload/attachment implementation, signed reads, browser behavior, or production acceptance.
