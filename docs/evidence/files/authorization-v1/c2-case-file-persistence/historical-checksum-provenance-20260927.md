# C2 historical migration checksum provenance

Status: read-only diagnosis. C2 normal-development migration remains `PENDING` / `BLOCKED`; no migration application or history reconciliation was performed.

## Target and evidence method

The effective `DIRECT_URL` was re-attested to the approved development host SHA-256 prefix `eb0d823953fe`, database/schema `postgres`/`public`, PostgreSQL 17.6, not in recovery. Credential and endpoint values were not retained. A read-only, repeatable-read query confirmed the four `_prisma_migrations` rows; a second read-only query inspected selected current schema relationships. Both transactions were rolled back. The [prior preflight](normal-development-preflight-20260927.json) establishes 47 finished, non-rolled-back migrations: 43 applied checksums match working-tree migration bytes and only the four below differ.

Git inspection used `git log --all --follow`, `git show`, `git ls-files --eol`, and SHA-256 of both committed blobs and checked-out bytes. All four paths were added in the same and only file-history commit, `b060291a07ebe3e89e5ceb09623110bbc5e7d218` (`feat: establish platform foundation`, 2026-08-22 17:04:42 +03). Normal Git history shows no subsequent committed modification to those files. Git reports `i/lf w/crlf attr/` for each. Effective `core.autocrlf=true` comes from the Windows Git system configuration; no path-specific EOL attribute is set.

## Per-migration comparison

| Migration | Development applied SHA-256 | Current checked-out SHA-256 | Matching Git version | LF / CRLF bytes | Difference | Provenance confidence |
| --- | --- | --- | --- | --- | --- | --- |
| `20260821181621_added_better_auth_orgnizations_support` | `4c4fb9a199c19d90375322321ac15f6c6de82ca3795993234ee3a46661051cb4` | `36ad8a7abc3d77044c50ca59e74c3eb419c48e910ee7396434b27c5b31d81a61` | `b060291a` blob: `4c4fb9a199c19d90375322321ac15f6c6de82ca3795993234ee3a46661051cb4` | 2317 / 2389 | Byte-only, 72 CR bytes | High |
| `20260821185304_link_lab_to_organization` | `8a330bd7b835b448b9480616ab80099fb0e2ea1c1cd16d1eebe5900dac83a917` | `2d488bab57d187813a4a2acd592ac3fc814b1f9610440d447333b0126f222e70` | `b060291a` blob: `8a330bd7b835b448b9480616ab80099fb0e2ea1c1cd16d1eebe5900dac83a917` | 510 / 524 | Byte-only, 14 CR bytes | High |
| `20260821200152_link_labstaff_to_member` | `d4e9b9547912533e4f5418f9a3e99c42447a4fb85587a58de2e2ccedb0f7508e` | `30ef4ee39aaf7dce175970343781456cc0c0e59680d48b74ac224d615f71ff7b` | `b060291a` blob: `d4e9b9547912533e4f5418f9a3e99c42447a4fb85587a58de2e2ccedb0f7508e` | 499 / 513 | Byte-only, 14 CR bytes | High |
| `20260821213743_add_labstaff_invitation_intent` | `906736a1bbfd2f912c5ddd84d0123720602f56998f7986fda385f952b5810d2d` | `93517915303922e962f364bf0883d726bb4b6c0e0b3999f20b919e4525757b86` | `b060291a` blob: `906736a1bbfd2f912c5ddd84d0123720602f56998f7986fda385f952b5810d2d` | 1426 / 1461 | Byte-only, 35 CR bytes | High |

For every row, removing only CR from each CRLF pair in the checked-out file yields a byte-for-byte copy of the `b060291a` Git blob, whose SHA-256 equals the database checksum. Therefore the text/SQL diff between the applied-matching committed artifact and the present checkout is empty. No SQL operation was added, removed, or changed by this difference: respectively, the Organization/Member/Invitation foundation, nullable Lab-to-Organization link, nullable LabStaff-to-Member link, and LabStaffInvitationIntent/index/FK changes have the same SQL text. This is a byte-only line-ending discrepancy, not evidence of a semantic migration amendment.

## Chronology and database metadata

All four migration applications finished successfully on 2026-08-21 UTC, before the sole Git commit on 2026-08-22. The ordered database metadata is:

| Migration suffix | Started UTC | Finished UTC | Status |
| --- | --- | --- | --- |
| `orgnizations_support` | `18:16:21.961` | `18:16:24.019` | finished, one applied step |
| `lab_to_organization` | `18:53:04.964` | `18:53:06.166` | finished, one applied step |
| `labstaff_to_member` | `20:01:53.234` | `20:01:54.247` | finished, one applied step |
| `labstaff_invitation_intent` | `21:37:44.615` | `21:37:46.029` | finished, one applied step |

For each, `rolled_back_at` is null and no migration log is retained. The matching committed blobs are direct evidence of an available historical SQL artifact with the recorded bytes; a checksum alone would not reconstruct missing SQL. Git does not prove why the local August 21 files were LF at application time, nor the exact time or checkout operation that converted the present working files to CRLF. There is no committed after-application edit to these four files, individually or as a group. An intentional joint semantic amendment is not supported by repository evidence.

Current read-only schema inspection finds nullable `Lab.organizationId` with its Organization FK, nullable `LabStaff.memberId` with its Member FK, and `LabStaffInvitationIntent` with required `id` and `labId`. This corroborates the broad intended structures but is **not** direct proof of the original migration execution, because subsequent migrations may have altered the schema. No development rows or migration metadata were changed.

## Reconciliation choices, not executed

1. Preferred for a separately authorized gate: make the *execution checkout* of these historical migration files byte-identical to the committed LF artifacts, verify all 47 working migration checksums against `_prisma_migrations`, then restart the full normal-development C2 preflight and all remaining application gates. The exact supported mechanism and effects on this dirty worktree must be reviewed first; no historical file rewrite or migration application is authorized by this packet.
2. Establish an explicit LF checkout policy for migration SQL in a separate repository-change task. This may prevent recurrence but itself changes working bytes and must be reviewed against all migrations and current dirty state. It is not a substitute for fresh database preflight or approval to apply C2.
3. Editing `_prisma_migrations`, using `migrate resolve`, resetting/baselining development, or accepting drift by exception would alter or obscure the recorded history and is not justified by this byte-only explanation. None is recommended or authorized.

The current repository Git history is semantically consistent with the applied SQL. The open operational question is how to ensure the authorized Prisma path reads the exact LF historical bytes without disturbing unrelated changes. A separate Product Owner reconciliation/application decision is required. C2 candidate SHA-256 remains `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`; no real migration 48 was materialized.

## Independent review

Independent V3 `CHECKPOINT` provenance review: **PASS**, no material findings. The Reviewer independently verified the retained preflight artifact hash, all four applied-to-committed SHA-256 matches, all four current worktree hashes and CRLF-only diffs, the single shared Git introduction commit and lack of later reachable modifications, and the EOL configuration. The Reviewer did not connect to the database; its database-side verification used the hash-verified retained preflight evidence. Primary's live queries above were read-only. This review approves the diagnosis packet only, not C2 migration application.
