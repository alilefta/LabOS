# case.asset.add Authorization V1 code verification

Status: CLOSED | CODE PASS
Date: 2026-09-27
Scope: provider-independent permission/resolver/policy only

## Implemented contract

- Explicit `case.asset.add` vocabulary, resource definition and policy ID,
  fixed Owner/Admin/Manager/Staff bundle entries, and supported-permission
  registration. The target is an identifier-only existing Case, never a
  targetless collection.
- Reuses the C1 Case resolver and fact loader. The authoritative Case/Lab
  relationship and Organization boundary must agree. Staff requires the
  existing active Member-linked same-Lab assignment to the exact Case;
  Owner/Admin/Manager do not require an assignment. Missing, foreign, and
  inconsistent facts deny by default. Kernel role normalization is unchanged.
- No DRAFT-only rule is introduced, so a saved DRAFT is eligible. No Case
  upload action, grant, managed-file write, replacement/delete authority, or
  provider operation was activated. `case.update` remains distinct.

## Verification and review

| Check | Result |
| --- | --- |
| Focused asset-add and C1 Authorization V1 tests | PASS, 7 files / 112 tests |
| Global TypeScript `--noEmit` | PASS |
| Owned-file ESLint | PASS |
| Database/provider runtime | NOT_RUN by scope |

Independent V3 `CODE` review first returned `CORRECTION_REQUIRED`: the Staff
bundle regression expected list omitted the new approved permission. The
expectation was corrected, the focused suite reran green, and independent
rereview returned `PASS` with no remaining task-caused finding. Primary
records code acceptance `PASS`; this slice is `CLOSED`.

## Next gate

The next provider-independent candidate is a separately authorized closed
Case-targeted staging/domain contract, including exact grant purpose, expiry,
file validation/metadata, verified callback handoff, and transactional first
attachment. No such route or command is authorized by this checkpoint.
Before implementing it, the contract must be fixed in a bounded task packet.
The real Case-private provider route remains blocked at
`defaultACL=public-read`/`allowACLOverride=false` with unresolved capability;
private storage and signed delivery are unverified. N-FILE-111 remains separate.
