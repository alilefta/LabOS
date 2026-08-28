# Authorization V1 financials implementation plan

**Status:** Approved planning baseline  
**Current branch:** `feat/platform-authorization-financials`  
**Starting checkpoint:** `authorization-v1-membership-enforcement`  
**Scope:** Case/Clinic financial disclosure, Staff compensation, invoices,
payments, payouts, and billing authorization

## Objective

Extend Authorization V1 into financial operations without creating one
long-running migration branch. The current branch establishes the reviewed
inventory, typed target/fact infrastructure, policies, telemetry contract, and
tests. Action migration and enforcement continue in smaller vertical branches.

Authorization answers whether an actor may request a financial operation.
Domain services still own calculations, invoice lifecycle rules, payment and
payout invariants, persistence, and transaction boundaries.

## Non-negotiable rules

- Tenant context resolves before any financial query or mutation.
- Resource permissions receive identifier-only targets. Callers never supply
  trusted financial facts or arbitrary attributes.
- Policies load minimal tenant-scoped facts through typed repositories.
- Every mutable financial invariant is re-read inside the mutation transaction.
- A permission-required resource, resolver, fact, or policy that is absent or
  malformed denies and emits sanitized high-severity telemetry.
- Telemetry never contains amounts, balances, percentages, payment methods,
  public tokens, free-form notes, patient/Staff identity, invoice line items, or
  provider/database errors.
- UI capability checks remain non-authoritative; server enforcement always
  precedes the domain operation.
- No Prisma migration is expected. If implementation discovers a required
  schema change or unique constraint, stop and ask Ali to run the migration.

## Reviewed fixed-role intent

This milestone starts from the existing fixed bundles; it does not recreate a
role hierarchy.

| Capability | Owner | Admin | Manager | Staff |
|---|---|---|---|---|
| Case/Clinic financials | Read/write | Read/write | Read/write | None |
| Invoice read/list/analytics | Full | Full | Full | Read-only |
| Invoice create/update/cancel/delete draft | Yes | Yes | Yes | No |
| Record payment / sync overdue | Yes | Yes | Yes | No |
| Compensation | Read/write | Read | Read/write | No |
| Payouts | Full | Read-only | Full | No |
| Billing | Read/manage | Read | Read | No |

Any departure from this table requires an explicit product/security decision
and a recorded divergence. Role changes must affect the next request; no
long-lived authorization result may survive tenant or membership changes.

## Boundary inventory

### Primary financial wave

- Invoices and payments: A-084–A-097.
- Payroll, compensation, and payouts: A-111–A-114 and A-126.
- Case recalculation: A-020.
- Clinic invoice collection: A-075.

### Cross-domain disclosures that must be reviewed in this wave

- A-019 Case financial aggregates.
- A-060, A-065, A-066, A-068, and A-071 Clinic analytics/detail endpoints
  that currently mix ordinary and financial fields.
- A-074 Clinic pricing disclosure.
- A-118 Staff dossier compensation disclosure.
- Billing server pages, route handlers, services, and provider calls discovered
  outside the 131-action baseline.

### Critical remediation before enforcement

- A-093 must stop returning `publicToken` in the invoice list DTO. Public-link
  creation/disclosure becomes a separately authorized, expiring, audited
  operation.
- Composite Clinic/Case/Staff endpoints must either require every applicable
  permission or return split/redacted DTOs. Ordinary read permission cannot
  expose financial or compensation fields.

## Milestone sequence

### F0 — Reconcile and approve the inventory

Inventory record: `authorization-v1-financials-inventory.md`

Current state: F0 approved by Ali on 2026-08-27; implementation remediations
remain open and F1 may begin.

For every listed action and non-action boundary, record:

- business operation and stable boundary ID;
- permission and trusted scope;
- target type and validated ID source;
- target resolver and fact loader;
- required policies and transaction-time invariants;
- sensitivity, legacy behavior, V1 behavior, and divergence;
- telemetry event family, tests, owner, rollback, and status.

Exit criteria:

- Every financial boundary is classified or explicitly deferred.
- A-093 and mixed-DTO remediation designs are approved.
- No compound action silently combines unrelated financial privileges.
- No new authorization table or database migration is introduced.

### F1 — Build the shared financial authorization foundation

Progress as of 2026-08-28:

- Complete: identifier-only Organization resolvers for Case, Clinic, Invoice,
  Staff, and Payout.
- Complete: tenant-scoped, request-cached fact loaders for Case/Clinic
  financial state, Invoice lifecycle, Invoice Case links, Staff compensation
  targets, and Payout lifecycle.
- Complete: specialized candidate/source loaders for draft Invoice Case links
  and payout assignments; callers cannot establish those security facts.
- Complete: closed operation-intent contracts and deterministic policies for
  Case recalculation, Staff compensation, Invoice update/cancel/draft deletion/
  payment, and Payout issue/void.
- Complete: concrete-service registration, fixed-role matrices, fail-closed
  facts, cross-Organization isolation, cross-link, and lifecycle tests.
- F1 checkpoint: complete. No application action or page consumes this
  financial policy slice yet.

Implement typed tenant-scoped resolvers and minimal fact loaders for:

- Case;
- Clinic;
- Invoice;
- LabStaff compensation target;
- Payout.

Implement deterministic policies for:

- Organization/resource boundary;
- Case/Clinic relationship consistency;
- Invoice ownership and Clinic/Case cross-links;
- invoice mutable state;
- draft-only deletion/update behavior;
- payment eligibility and transaction-time invoice balance/state revalidation;
- compensation target and active Staff rules;
- payout target, source-period, duplicate/void eligibility, and transaction-time
  revalidation.

Exit criteria:

- Every required resolver/policy fails closed when missing or inconsistent.
- Cross-Organization and cross-linked-resource tests pass.
- Policy inputs contain only typed identifiers and operation intent.
- No action consumes the new policies yet.

### F2 — Financial read separation

Migrate financial collection/detail/analytics readers and remove capability
leakage before mutating actions are enforced.

Work includes:

- `case.financials.list/read` and `clinic.financials.list/read` boundaries;
- `invoice.list/read/analytics.read` boundaries;
- `staff.compensation.read` and `payout.list/read` boundaries;
- split/redacted ordinary DTOs;
- removal of invoice public tokens from list results;
- server-page and data-reader adapters, not only safe actions.

Exit criteria:

- Staff ordinary reads expose no financial or compensation data.
- Invoice lists expose no reusable public capability.
- Owner/Admin/Manager/Staff and two-Organization read matrices pass.
- Denied readers do not execute repositories.

### F3 — Invoice lifecycle and payments

Migrate A-084–A-089 and A-096–A-097 vertically:

- create invoice;
- update/adjust draft or live invoice;
- delete draft;
- cancel/void;
- overdue synchronization;
- record payment.

Exit criteria:

- Permission and resource policies run before each mutation.
- Invoice state and critical relationships are revalidated transactionally.
- Repeated payment submissions cannot silently create duplicate value.
- Cross-tenant Clinic, Case, Invoice, and payment references fail closed.
- Shadow evidence has zero unexplained privilege expansion or failure.

### F4 — Compensation and payouts

Migrate A-111–A-114 and A-126:

- compensation read/update;
- pending commission/payroll views;
- payout history/detail;
- issue and, where a real boundary exists, void payout.

Exit criteria:

- Admin remains compensation/payout read-only.
- Owner and Manager behavior matches the reviewed fixed bundles.
- Active Staff, source-period, and duplicate-payout invariants are checked again
  inside the transaction.
- Amounts and Staff identity never enter authorization telemetry.

### F5 — Billing and financial cutover

Audit and migrate billing server pages, actions, route handlers, and provider
calls using `billing.read` and `billing.manage`.

Then, for each completed vertical slice:

1. run legacy-authoritative shadow comparison;
2. collect sanitized Axiom evidence;
3. review every divergence and any provider/domain rejection;
4. enable V1 for only that slice behind a deployment-owned mode;
5. preserve a documented legacy rollback until the observation gate closes.

Exit criteria:

- Billing ownership changes take effect on the next request.
- All financial mutations have tenant/resource predicates and transactional
  invariant checks.
- All financial reads have explicit disclosure permissions.
- Axiom contains no financial/identity payload data.
- Full tests, focused lint, repository baseline comparison, and rollout record
  pass.

## Branch strategy

Keep the current branch bounded to F0–F1 and merge it once the shared
foundation is stable. Continue from updated `main` with:

1. `feat/authorization-financial-reads`
2. `feat/authorization-invoice-lifecycle`
3. `feat/authorization-payments`
4. `feat/authorization-compensation-payouts`
5. `feat/authorization-billing`

Each branch includes its own tests, shadow evidence checklist, rollback note,
and documentation update. Do not keep unrelated LabOS feature work on these
branches.

## Logical commits for the current branch

1. `docs(auth): define financial authorization inventory`
2. `feat(auth): add financial target resolvers and fact loaders`
3. `feat(auth): add invoice and financial domain policies`
4. `test(auth): cover financial tenant and state invariants`
5. `docs(auth): record financial foundation checkpoint`

## Verification matrix

At minimum, automated tests cover:

- all four fixed roles and unknown/multiple roles;
- same-resource success and two-Organization mismatch;
- cross-linked Case/Clinic/Invoice/Staff/Payout identifiers;
- every supported and unsupported invoice state;
- stale pre-check followed by failed transaction-time revalidation;
- duplicate payment and payout attempts;
- role change affecting the next request;
- missing resolver/fact/policy registration;
- repository short-circuit after denial;
- all four shadow comparison categories;
- telemetry redaction for amounts, notes, identities, tokens, and errors;
- legacy rollback behavior and its known privilege implications.

## Initial risks

| Risk | Treatment |
|---|---|
| Financial data is embedded in ordinary DTOs | Split/redact before enforcing read permissions |
| A-093 exposes `publicToken` | Remove it from list DTOs before read cutover |
| Authorization pre-check races mutable invoice/payment/payout state | Mandatory transaction-time revalidation |
| Duplicate payment or payout value | Inspect current persistence guarantees; require an idempotent or unique strategy before enforcement |
| Caller fabricates totals/status/ownership | Policies load authoritative facts; callers pass identifiers only |
| One large financial branch becomes long-lived | Merge F0–F1, then use the five vertical branches above |
| Logs leak amounts or notes | Explicit allowlist, forbidden-value tests, and Axiom sampling |

## Definition of done for one boundary

A financial boundary is complete only when its inventory record is approved,
permission metadata is trusted, resolver and policies are registered, critical
facts are transactionally revalidated, handler/repository execution is blocked
after denial, telemetry is sanitized, two-Organization tests pass, shadow
evidence is reviewed, rollback is documented, and V1 enforcement is explicitly
approved.
