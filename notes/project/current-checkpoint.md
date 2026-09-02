# LabOS current project checkpoint

**Last reviewed:** 2026-09-02
**Active branch:** `feat/authorization-financial-reads`
**Last committed checkpoint:** `0e4dfbb` — `fix(cases): enforce plain DTO boundary`
**Working tree:** F3 implementation changes are in progress and are not yet committed.

This is the short, evidence-based handoff for someone starting from the current
repository state. Detailed design belongs in the plans and boundary inventory;
chronological events belong in `progress.md`.

## Current milestone

**Authorization V1 financials — F3: Invoice lifecycle writes and payments**
**Status:** In progress

The first F3 slice protects `createInvoiceAction` with `invoice.create` before
tenant Prisma access. Existing transaction-time Clinic/Case eligibility checks
remain in place. Focused authorization and invoice-boundary tests pass.

### Next implementation slices

1. Update/adjust draft or live invoices.
2. Delete draft invoices.
3. Implement unpaid cancellation and define the deferred paid/partial void path.
4. Synchronize overdue invoices.
5. Record payments with idempotency/concurrency protection.
6. Re-audit Invoice/payment DTOs for explicit scalar projections and Decimal conversion.

## Financials milestone status

| Milestone | Status | Outcome and evidence |
|---|---|---|
| F0 — Reconcile and approve inventory | Complete | Approved 2026-08-27; see `authorization-v1-financials-inventory.md`. |
| F1 — Shared authorization foundation | Complete | Typed tenant-scoped resolvers, fact loaders, policies, and fail-closed tests; checkpoint merge `6796fda` (underlying commits `0f7101d`, `9135146`). |
| F2 — Financial read separation | Complete for the implemented read-separation checkpoint | Invoice capability removal, Clinic/Case/Staff financial redaction, pre-Prisma reader/page enforcement, role and cross-tenant tests, and Owner/Admin/Manager browser confirmation; see `progress.md` and `baseline-app/`. Remaining follow-ups stay explicitly listed in the plan/inventory. |
| F3 — Invoice lifecycle and payments | In progress | `createInvoiceAction` authorization gate and focused tests are complete in the working tree; remaining lifecycle writes are listed above. |
| F4 — Compensation and payouts | Not started | Planned after F3. |
| F5 — Billing and financial cutover | Not started | Planned after F4. |

## Verification at this checkpoint

- Focused Vitest run: 53 tests passed across invoice read/write boundaries and authorization service tests.
- ESLint passed for the F3 action and its new boundary test.
- `git diff --check` passed.
- Case DTO boundary is committed; Case totals and discounts are converted to plain numbers before Client Components.

## Known follow-ups and risks

- Invoice payment idempotency/concurrency remains a critical F3 requirement.
- Paid/partial invoice void semantics remain deferred until refund/credit and audit behavior are defined.
- The broader M0–M9 register in `milestones.md` is a platform-level view; F0–F5 above is the active financials workstream.
- Product-specific UX and logic findings are intentionally kept under `notes/baseline-app/` and do not block the authorization architecture unless explicitly promoted.

## Recommended reading order

1. This checkpoint.
2. `authorization-v1-financials-plan.md`.
3. `authorization-v1-financials-inventory.md`.
4. `authorization-v1-quality-baseline.md`.
5. `progress.md` for the detailed chronology.
6. `notes/baseline-app/info.md` and the relevant domain folder for product findings.
