# A-097 public statement sharing implementation verification

Status: Independent V3 `PASS | CODE + RUNTIME_EVIDENCE` (verdict below); Product Owner A-097/N-FIN-PL-001 `PASS_WITH_LIMITATIONS`; combined Invoice integration `CLOSED | PASS_WITH_LIMITATIONS | AUTHENTICATED_BROWSER + DISPOSABLE_POSTGRESQL`. No shared migration or deployment authorized.  
Branch: `codex/labos-roadmap-next`.  
Accepted schema candidate SHA-256: `7C60188F28490B3C755E8AF6A7666AA72EB459ED2778A5C772A12503B39264DD` (unchanged).

## Implementation

`N-FIN-PL-001` is a registered V1-authoritative action with strict Invoice UUID input, fixed `invoice.public_link.share` permission, identifier-only Invoice target, and closed operation intent. Owner/Admin/Manager receive the permission; Staff and unknown roles do not. The Invoice resolver and a dedicated minimal policy fact loader check Organization, active state, and eligible lifecycle before the handler reaches Prisma. The registered action has no legacy role fallback or manual authorization call. Decision telemetry remains allowlisted and redacted.

The share handler uses a parameterized Invoice/Lab `FOR UPDATE` lock in a Serializable transaction, then reloads Invoice, linked Lab/Organization, and canonical Member. The current Member role must still equal the verified role authorized for the request. Initial sharing generates a UUID and established start-of-day plus 90-day expiry, writes the Invoice pair, and records `ISSUED` and `DISCLOSED` atomically. A valid unexpired legacy UUID is reused without mutation and records `DISCLOSED` only. Expired, malformed, mismatched, draft, cancelled, inactive, foreign, changed-role, and missing-member cases deny. The audit expiry snapshot is inserted with `"publicLinkExpiresAt" AT TIME ZONE 'UTC'`. No bearer is returned before audit commit. Retry is limited to Prisma `P2034` or adapter raw-query `P2010` with nested PostgreSQL original code `40001`, at most two retries after the first attempt.

A-097 and `createInvoiceAction` no longer issue or return a token. Both return committed amount due. The create and edit clients invoke sharing only after successful SENT commit; DRAFT does not share. The common modal distinguishes submission from sharing failure, offers share-only retry, and constructs a statement URL only with a token. The public statement reader and DTO were not changed.

## Verification

Fresh run-owned Docker `postgres:17.11` database `labos_a097_share` on local loopback received the accepted current Prisma schema via `prisma db push`. It is disposable and separate from development, verification, and production databases. The prior full-history SQL plus unchanged candidate rehearsal is recorded in `schema-migration-verification.md`; this application run did not repeat that migration sequence.

The disposable share suite passed 8/8: first issuance with two audit rows; valid legacy disclosure without rotation; lifecycle/tenant/member and malformed/expired denial; initial and existing-link audit failure withholding; non-UTC expiry epoch; real overlapping transactions observed waiting on the Invoice row with one `ISSUED` event; and recognized serialization retry. The ordinary create handoff passed 2/2 for DRAFT and SENT token absence and committed amount. Existing A-097 transaction tests and the expiry-representation tests passed in the combined focused run.

Focused regression run after the Member role-change correction: **35 files, 384 tests passed** across Authorization V1, financial policies/repositories, registered boundaries, architecture, A-097 transaction/share/create, UI handoff, and expiry representation. TypeScript `npx tsc --noEmit --incremental false`, focused ESLint, and `git diff --check` passed. The schema test's fixed creation invoice number was changed to a generated unique number so it can be rerun on the same disposable target.

## Limits and installation gate

The create/edit UI checks are source-level handoff tests, not a browser session. The disposable application database was created from the accepted schema with `db push`; it does not substitute for a target-specific Prisma migration ledger, drift, privilege, and connection preflight. The prior 61-file SQL history and candidate passed separately. Shared migration installation, application deployment, commit, merge, and push remain unauthorized. The prior create action's financial arithmetic and transaction behavior were preserved; no broader creation redesign was attempted.

Independent V3 verdict: **PASS | CODE + RUNTIME_EVIDENCE**. The reviewer found no material implementation defect or new Product Owner decision blocker, independently confirmed the candidate checksum and disposable catalog constraints, and accepted the 8/8 sharing runtime evidence, including the role-change regression. Browser UI execution and target-specific installation remain separate gates.
