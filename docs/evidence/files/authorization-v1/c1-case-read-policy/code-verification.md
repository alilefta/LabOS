# C1 authoritative Case read policy — code verification

Status: `CLOSED`; code acceptance `PASS`; runtime `NOT_REQUIRED`; parent gate `NOT_EVALUATED`
Date: 2026-09-24
Scope: Product Owner-authorized C1 code and focused tests only. No database/provider/browser runtime claim.

## Implementation and claims

- The existing `case.read` resource permission and owner/admin/manager/staff fixed bundles are reused. The supported-permission registry now includes it with a trusted Case resolver, scoped facts, and required policy. No add/replace permission or bundle grant was activated.
- Resolver/facts derive Case -> Lab -> Organization. Staff allowance requires an active, same-Lab `LabStaff` linked to the authenticated Member and assigned to the exact Case. The policy uses kernel-equivalent fixed-role normalization; management allowance still requires the Case target, permission, tenant match, and policy facts.
- `getDentalCaseById` authorizes before tenant Case DTO/repository loading. Its shared use by the detail, edit, and metadata paths carries the same guard. Denied/missing/foreign Case outcomes use the existing generic not-found result; denied Staff receive no asset URL fields. Authorized DTO behavior is unchanged, including the pre-cutover legacy display contract.

## Verification

- Writer focused C1/platform authorization: 9 files, 123 tests `PASS`; affected Authorization V1 regressions: 30 files, 336 tests `PASS`.
- Primary independently reran the five direct C1 test files: 86 tests `PASS`; global `tsc --noEmit` `PASS`; C1-owned ESLint `PASS`; targeted `git diff --check` found no whitespace errors.
- Independent Reviewer reran 26 authorization/Case-reader files: 296 tests `PASS`, C1-owned lint `PASS`, global typecheck `PASS`.
- Repository-wide ESLint does **not** pass in the current dirty baseline: Primary reproduced 13 errors and 261 warnings, all outside C1-owned files. The writer's earlier global-lint-pass report was not reproducible. No unrelated lint files were modified or waived as C1 diagnostics.

## Independent review and reconciliation

Initial independent `CODE` verdict: `CORRECTION_REQUIRED`. The policy inspected raw role strings although the kernel normalizes casing/whitespace, and negative resolver/reader tests were incomplete. The same bounded writer corrected the policy and added normalization, missing/unlinked/failure, and missing-versus-foreign tests. Final independent V3 `CODE` verdict: `PASS`; no material C1 defect remains.

Primary accepts C1 code at `PASS`. Runtime is `NOT_REQUIRED` for this provider-independent code slice, not a claim of real Case clinical asset security. C2, C3, and N-FILE-110A remain separate unapproved tasks. N-FILE-110/111 activation remains blocked by the UploadThing `CAPABILITY_BLOCKER` and separate schema/provider/runtime gates. Accepted Files checkpoints and Product PRV-08 are unchanged. No staging, commit, deployment, schema, migration, database, provider, or runtime operation occurred.
