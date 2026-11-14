# A-097 final acceptance gaps — implementation handoff

Status: Product Owner accepted `PASS_WITH_LIMITATIONS` for bounded A-097 and N-FIN-PL-001; independent V3 `PASS | CODE` for final UI correction. Shared migration and deployment remain blocked.

## Product Owner acceptance — 2026-11-09

The Product Owner accepted the A-097 transaction correction and N-FIN-PL-001 sharing implementation at `PASS_WITH_LIMITATIONS`. Prior focused disposable PostgreSQL runtime and full-history migration rehearsal evidence remain accepted for their stated scope; the final currency/clipboard UI correction passed focused code checks and independent V3 code review. Browser verification and target-specific audit migration installation/deployment remain outstanding gates. No shared migration, commit, merge, push, or deployment is authorized. A-089 creation defects are tracked separately and do not reopen the bounded A-097 acceptance.

## A-089 creation path assessment

`createInvoiceAction` retains `requiredLabRole: "MANAGER"` and a manual `invoice.create` V1 decision. The accepted A-089 boundary expands Owner/Manager to Owner/Admin/Manager, but the legacy gate can still deny Admin before the V1 check. This is A-089 ownership, not an A-097 permission change.

The complete action transaction increments the Lab invoice sequence, reads matching eligible unbilled Cases, calculates totals, and creates the Invoice and InvoiceCase links. It never updates `Clinic.currentBalance`. Consequently, direct SENT creation can persist an amount due while leaving the authoritative Clinic receivable balance unchanged. No downstream service call in this action adjusts that balance. DRAFT creation correctly has no balance increment. The action never verifies that the submitted Clinic itself exists in the trusted Lab before reading Cases; a missing or foreign Clinic generally yields zero matching Cases and fails, but no explicit authoritative Clinic projection is present. The read and create occur in the default transaction isolation, without a transaction-fresh Clinic validation or Serializable strategy. The unique `InvoiceCase.caseId` constraint prevents two successful claims of the same Case, with one competing transaction expected to fail atomically; there is no explicit request idempotency or tested concurrent creation guarantee.

The creation calculation uses `Number` addition and multiplication, with no explicit HALF_UP discount rounding. Its two-decimal persisted `subtotal`, `discountAmount`, and `total` may be rounded independently by storage, so the stored identity `total = subtotal - discountAmount` is not established for fractional-cent discounts. A-097 uses Decimal HALF_UP and derives total from the rounded discount.

Minimum A-089 correction candidate: migrate the create action to its registered V1 authority and remove the conflicting legacy gate; in a Serializable transaction resolve the Clinic by trusted `labId`, revalidate every requested Case and unique Case IDs, compute subtotal and HALF_UP discount with Decimal at storage scale, derive total from the rounded values, create the Invoice/links, and increment the authoritative Clinic balance exactly once only for SENT. Retain the unique Case-to-Invoice constraint. Add overlapping real PostgreSQL creation tests, rollback tests, role/tenant checks, and fractional-cent accounting tests. No A-089 implementation is included here.

## Sharing UI correction

Both ordinary Invoice actions now read `LabSettings.currency` inside their mutation transaction and return it with the committed amount due as safe metadata. Missing tenant settings fail the transaction. The create/edit clients pass that server-owned currency and committed amount to the success modal. Its amount label and WhatsApp message use the same formatter. Clipboard success is shown only after `navigator.clipboard.writeText` resolves; rejection shows an error. The public-link share transaction, registered boundary, public reader, Prisma schema, and migration were not changed.

## Verification

Unit and architecture regressions: 30 files, 360 tests passed. Focused ESLint and TypeScript passed. `git diff --check` passed. Candidate SQL SHA-256 remains `7C60188F28490B3C755E8AF6A7666AA72EB459ED2778A5C772A12503B39264DD`. Independent V3 returned `PASS | CODE` for the currency/clipboard correction and confirmed the separate A-089 findings. The new disposable PostgreSQL tests were not rerun because the Docker engine was unavailable; the previously accepted A-097 runtime evidence remains intact.

Browser scenarios (DRAFT no share, SENT share, edit-to-SENT, existing-link reuse, share failure/retry, committed amount/currency, modal navigation, null-URL prevention, unauthorized denial): **NOT_RUN**. No local app was listening on port 3000, and the Docker engine for a disposable PostgreSQL target was unavailable. Existing source-level UI tests do not establish browser behavior. No shared development, verification, or production database was used.

A-097 transaction and sharing implementation can be evaluated independently at code/runtime scope. Direct SENT Invoice creation is an A-089 financial blocker for platform acceptance and must be corrected before treating the create-and-share journey as financially complete. No production readiness is claimed.
