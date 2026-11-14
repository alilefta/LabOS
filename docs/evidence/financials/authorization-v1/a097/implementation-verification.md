# A-097 draft Invoice update: implementation evidence

Status: BLOCKED_DECISION. This packet is engineering evidence only; no Product Owner acceptance, deployment, commit, or enforcement-mode change occurred.

## Implemented scope

- Registered A-097 with a schema-owned `invoice.update` permission, Invoice ID target, and `invoice.draft.update` operation. The action uses the V1-authoritative adapter before tenant Prisma and no longer has a legacy role gate or manual authorization call.
- Moved Invoice, Clinic, InvoiceCase, and Case validation into one Serializable transaction. The Invoice update requires current `DRAFT` status and trusted `labId`; Clinic credit uses the Invoice's authoritative Clinic. Failed writes roll back together.
- Replaced Number-based authoritative totals and new Case snapshots with Prisma Decimal arithmetic. The existing sum, percentage discount, zero floor, and database storage scale remain unchanged.

## Verification

- Focused authorization, financial-policy, telemetry, action, and architecture regressions: 69 + 71 tests passed across the final targeted runs.
- Disposable PostgreSQL 17.11 at a fresh local container: 8 tests passed. Cases include DRAFT edit, SENT once, duplicate send, Clinic/Case mismatch, post-authorization state/price/eligibility/billing changes, foreign Lab, rollback on Clinic credit failure, fractional-cent arithmetic, and overlapping send requests using a database trigger that delays Invoice updates.
- TypeScript `tsc --noEmit --incremental false`: passed. Focused ESLint: passed. `git diff --check`: passed.
- Independent V3 reviewer: `BLOCKED_DECISION` for the public-token contract. The reviewer checked final code, reran focused tests and TypeScript, and independently passed the original 7 PostgreSQL tests. The final added cross-tenant PostgreSQL case passed in the Primary's 8-test run; the reviewer's attempted repeat was `NOT_RUN` after the disposable container had been removed.

## Decision and limitations

The accepted financial boundary at `docs/plans/authorization-v1/financial-boundaries.md` says public-link creation, rotation, and disclosure are separate; `invoice.update` must not return a bearer token. The existing A-097 action creates and returns `publicToken`, and its sole direct UI consumer uses it to build/copy/share `/statement/[token]`. That pre-existing handoff was preserved because removing it would break the active edit flow. Product Owner must approve a replacement issuance/disclosure handoff or explicitly approve a bounded legacy exception before A-097 can be accepted as a whole.

Fractional-cent discount values still use the database's existing independent `NUMERIC(10,2)` storage conversion. For example, subtotal `0.05` with 10% discount stores discount `0.01` and total `0.05`; changing the rounding relationship requires a separate accepted financial rule. No new rule was introduced.

No Prisma schema change or migration was needed. The disposable PostgreSQL container was stopped and removed after verification.

## Product Owner correction iteration — 2026-11-07

D-A097-02 was implemented without changing the Invoice schema. A-097 now rounds subtotal and discount to two decimals with Decimal `ROUND_HALF_UP`, then derives total from those rounded values. Its result includes committed `amountDue` as a decimal string, and the edit success modal uses that value. The fractional-cent example above now stores subtotal `0.05`, discount `0.01`, and total `0.04`, satisfying `total = subtotal - discountAmount`. A fresh disposable PostgreSQL 17.11 target passed all 8 transaction tests, including concurrency and rollback. TypeScript and focused ESLint passed.

D-A097-01 remains `BLOCKED_DECISION` before public-link code changes. The current Invoice schema has `publicToken` and expiry but no Invoice public-link audit table; the Case activity and file access audit models cannot represent Invoice issuance/disclosure. Authorization decision telemetry is best effort and does not provide a durable business audit. A new audit persistence model or an explicitly accepted alternative is required. The existing A-097 token creation/return and edit sharing dependency remain unchanged pending that decision.

Independent V3 correction rereview: `BLOCKED_DECISION | CODE + RUNTIME_EVIDENCE`. The reviewer independently passed 8/8 disposable PostgreSQL tests, 50 focused tests, TypeScript, and diff checks. The sole blocker is authorization of audit persistence/migration or an accepted durable audit alternative for public-link issuance/disclosure. The legacy `createInvoiceAction` token handoff is a separate later migration dependency.
