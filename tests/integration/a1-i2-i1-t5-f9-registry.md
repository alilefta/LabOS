# A1-I2-I1-T5-F9 local registry and recovery

This is a local evidence protocol for the rollback-only runtime packet. It does not authorize a hosted run. The amended script has a new hash and requires separate Product Owner review and authorization before use on `labos-verification`.

## Operator preparation

Create a new directory controlled by the operator, preferably under the operator's local profile. On Windows, remove inherited ACL entries and grant access to the operator alone; local SYSTEM and Administrators are also accepted by the harness. The harness checks the directory owner and allow entries, rejects symbolic-link path components, and rejects nonprivate ACLs. Its ACL checker uses the pinned absolute PowerShell executable on this approved operator host; it fails closed if that executable is unavailable and never searches `PATH`. Set `LABOS_T5F9_EVIDENCE_DIR` to the directory's absolute normalized path. Never reuse a registry file. Keep the existing database URL and CA material in the operator's approved local credential channel; the registry never receives either value.

The harness creates `t5f9-<execution-uuid>.jsonl` with exclusive creation. Each JSON line contains a version, monotonically increasing sequence, previous-record SHA-256, a closed-format payload, and its own SHA-256. One write call and file `fsync` follow each event. A registry write or integrity error stops further SQL mutation. The file contains target identity, planned synthetic identifiers, SQLSTATE codes, and closed outcome classifications only. It contains no database URL, password, signed capability, SQL response, or unrestricted exception text.

`scenario_planned` records the scenario run ID, all synthetic parent IDs, organization slug, email, and case number before its transaction can mutate data. Each `grant_planned` records the grant ID and exact object key before its INSERT, including the expected invalid-member attempt. These are **plans**, not proof that an INSERT succeeded. `rollback_outcome=ACKNOWLEDGED` records a client-observed response, while `postflight` records an independent fresh-connection exact check. A missing final record is never interpreted as successful rollback.

Each `sqlstate_assertion` is bound to its scenario and `runId`, and names one stable `operationId`. The recovery protocol requires the following ordered operation/SQLSTATE contracts; it does not accept an assertion merely because its recorded `expected` and `observed` fields agree:

| Scenario | Ordered operation ID → required SQLSTATE |
| --- | --- |
| `denials` | `invalid_member_insert` → `23514`; `direct_terminal_mutation` → `23514`; `wrong_caller_expiry` → `42501`; `wrong_caller_s001` → `42501`; `premature_claim` → `23514` |
| `fence_disposable_only` | `terminal_fence_shadow` → `23514` |
| `sql_error_and_connection_loss_disposable_only` | `sql_error_disconnect` → `22012` |

Missing, additional, reordered, mislabeled, failed or incorrect-code assertions prevent runtime PASS. A valid interrupted prefix remains incomplete; a malformed assertion makes the protocol indeterminate.

On Windows, file `fsync` is used, but Node does not offer a reliable directory-metadata `fsync`; a sudden power failure immediately after exclusive file creation is a residual filesystem durability risk. A process crash or connection loss does not depend on successful console output: the prior per-record file `fsync` preserves recorded identities under normal filesystem behavior. Keep the private evidence directory and backups until independent review closes the run.

## Read-only recovery

Using the original operator connection binding, run:

```text
node tests/integration/a1-i2-i1-t5-f9-recover.mjs --hosted ABSOLUTE_REGISTRY_PATH
```

Use `--disposable` only for local rehearsal. The helper validates the target, reads intact chained records, starts `BEGIN READ ONLY`, and checks each recorded organization, lab, user, member, patient, Case, grant ID, object key, allocation, and StoredFile reference by exact match. It also checks migration-runner-granted temporary SET memberships to the three test executor roles. It then rolls back its read-only transaction. It never deletes fixtures or repairs privileges.

Recovery reports three independent dimensions: `databaseCleanup` (`CONFIRMED_ABSENT`, `SURVIVING_RECORDS`, or `INDETERMINATE`), `executionCompletion` (`COMPLETE`, `INCOMPLETE`, or `INDETERMINATE`), and `overallVerification` (`PASS`, `NOT_ACCEPTED`, or `INDETERMINATE`). Exact absence of planned identities is a database observation, not evidence that the scenario completed. `COMPLETE` requires one valid terminal outcome for every expected scenario, successful postflight records, and one valid final execution outcome. `PASS` additionally requires all five hosted groups to pass, exact absence, no surviving temporary SET membership, and an intact registry. An interrupted run can have `databaseCleanup=CONFIRMED_ABSENT` while `executionCompletion=INCOMPLETE` and `overallVerification=NOT_ACCEPTED`.

If the final line is truncated, the hash chain is invalid, identities are malformed, or terminal records are duplicate, contradictory or out of order, the helper retains intact preceding plans but classifies execution as `INDETERMINATE`. Corrupt or incomplete identity evidence cannot establish complete database cleanup. A surviving exact record or temporary membership prevents overall PASS. Target mismatch, failed connection, or failed query also prevents an absence conclusion. Preserve the registry and request a separate disposition for any unresolved case. Do not infer SQL execution from a planned identity, or rollback from an execution-outcome record or connection closure alone.

The hosted harness retains its existing `LABOS_T5F8_HOSTED_AUTHORIZATION=APPROVED` gate. A new approved script hash, target preflight, exclusive operator control, and explicit hosted authorization are required before any hosted mutation.
