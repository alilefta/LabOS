# Authorization V1 financial boundary inventory

**Status:** F0 approved; implementation remediations remain open

**Branch:** `feat/platform-authorization-financials`

**Plan:** `authorization-v1-financials-plan.md`

**Reviewed and approved by:** Ali — 2026-08-27

## Purpose

This is the F0 control record for financial Authorization V1. It classifies the
known server boundaries before target resolvers, policies, action adapters, or
enforcement are implemented. A row marked `Blocked` must not move to shadow or
V1 enforcement until its named security/domain issue is resolved.

Legacy effective actors use the old hierarchy:

- `OWNER` gate: Owner.
- `MANAGER` gate: Owner and Manager.
- `ADMIN` gate: Owner, Manager, and Admin.
- `STAFF` gate: every known role.

V1 actors come from the fixed, non-hierarchical bundles. A difference is
intentional only after explicit product/security approval.

## Classification rules

- Targets contain an identifier and type only. Resolvers load authoritative
  Organization ownership; callers never supply trusted amounts, states, roles,
  balances, or relationships.
- An Organization-scoped collection may accept a resource filter only after a
  trusted resolver proves that filter belongs to the active Organization.
- Composite readers either require every disclosure permission before querying,
  or are split/redacted. Ordinary `clinic.read`, `case.read`, or `staff.read`
  never implies access to money, compensation, payment history, or bearer tokens.
- Authorization pre-checks do not establish mutable financial invariants.
  Invoice state/balance, Case/Clinic links, unpaid assignments, and payout
  eligibility are re-read inside the mutation transaction.
- Authorization telemetry is allowlisted and excludes amounts, percentages,
  payment methods, references, notes, public tokens, provider errors, and human
  identity. Business audit records may contain necessary financial facts, but
  they are a separate protected subsystem.

## Invoice and payment boundaries

| ID | Operation | V1 permission / scope / target | Required policy and transaction invariant | Legacy → V1 | Status |
|---|---|---|---|---|---|
| A-084 | Adjust a live Invoice | `invoice.update`; resource; Invoice ID from validated input | Same Organization; live mutable state; re-read state, totals, discount and Clinic balance inside the transaction | Owner/Manager → Owner/Admin/Manager; **Admin expansion approved 2026-08-27** | Blocked: remove stale pre-read race |
| A-085 | Delete a draft Invoice | `invoice.delete_draft`; resource; Invoice ID | Same Organization; draft-only policy; revalidate draft and delete tenant-owned junctions/Invoice transactionally | Owner/Manager → Owner/Admin/Manager; **Admin expansion approved 2026-08-27** | Approved classification; implementation pending |
| A-086 | Synchronize overdue Invoices | `invoice.overdue.sync`; Organization; no target | Server-owned time/status predicate; bounded tenant update; record counts only | Owner/Manager → Owner/Admin/Manager; **Admin expansion approved 2026-08-27** | Approved classification; implementation pending |
| A-087 | Void a live Invoice | `invoice.cancel`; resource; Invoice ID | Same Organization; void eligibility; re-read payment/state/Clinic balance; never put reason in auth telemetry | Owner/Manager → Owner/Admin/Manager; **Admin expansion approved 2026-08-27** | Deferred: paid/partial void semantics remain separate from A-088 |
| A-088 | Cancel an unpaid Invoice | `invoice.cancel`; resource; Invoice ID | Same Organization; non-draft, no-payment cancellation; revalidate payment/state and release Cases atomically | Owner/Manager/Admin → same | Approved classification; implementation pending |
| A-089 | Create an Invoice | `invoice.create`; Organization; validated Clinic/Case IDs are typed operation intent, not trusted facts | Resolve Clinic and every Case in tenant; require same Clinic, eligible status, unbilled state; validate in transaction | Owner/Manager → Owner/Admin/Manager; **Admin expansion approved 2026-08-27** | Blocked: separate public-link issuance |
| A-090 | Accounts-receivable vitals | `invoice.analytics.read`; Organization | Tenant-scoped aggregates and one consistent predicate | All roles → all roles | Approved classification |
| A-091 | List Cases eligible for a draft Invoice | `invoice.create` for creation, or `invoice.update` with Invoice target for editing; Clinic filter must resolve | Resolve Clinic; when draft ID exists resolve same-tenant, same-Clinic draft; return minimal supporting DTO | All roles → Owner/Admin/Manager; **Staff restriction approved 2026-08-27** | Blocked: split create/edit contracts and validate draft authority |
| A-092 | Read Invoice dossier | `invoice.read`; resource; Invoice ID | Same Organization; composite sections independently require their disclosure permission or are redacted | All roles → all roles | Bearer token removed; authenticated detail minimized to necessary Case identity and payment reconciliation facts; V1 reader adapter and role/tenant tests pending |
| A-093 | List Invoices | `invoice.list`; Organization; optional Clinic filter resolves in tenant | Tenant-scoped collection; same predicate for rows/count/cursor | All roles → all roles | Critical `publicToken` query/DTO/UI disclosure remediated in F2; V1 reader adapter and role/tenant matrix pending |
| A-094 | Read credit-risk Clinic analytics | `invoice.analytics.read` plus `clinic.read` (or a redacted analytics DTO); Organization collection with verified Clinic rows | Tenant-scoped balance/overdue aggregates; no contact data unless `clinic.read` also allows it | All roles → all roles under current bundles | Blocked: split financial analytics from Clinic contact data |
| A-095 | List unbilled Cases for Invoice creation | `invoice.create`; Organization with verified Clinic filter | Resolve Clinic; eligible same-tenant Case predicate; minimal identifier/price projection | All roles → Owner/Admin/Manager; **Staff restriction approved 2026-08-27** | Approved classification; DTO review pending |
| A-096 | Record Invoice payment | `invoice.payment.record`; resource; Invoice ID | Same Organization; payable state; positive bounded amount; transaction re-reads balance/state and prevents duplicate value | Owner/Manager → Owner/Admin/Manager; **Admin expansion approved 2026-08-27** | **Blocked critical:** add idempotency/concurrency guarantee |
| A-097 | Update a draft Invoice | `invoice.update`; resource; Invoice ID | Same Organization; draft-only; transaction re-resolves Invoice, its Clinic, every Case and unbilled state | Owner/Manager → Owner/Admin/Manager; **Admin expansion approved 2026-08-27** | **Blocked critical:** current code can credit a caller-selected Clinic and trusts stale pre-reads |

### Invoice lifecycle decision

A-087 and A-088 must not remain two ambiguous ways to cancel value. The
recommended V1 model is:

- A-088 is the canonical unpaid cancellation command.
- A-087 remains deferred until the product defines paid/partial voiding,
  refund/credit behavior, financial audit requirements, and its own permission
  if it is materially different from cancellation.
- Public-link creation, rotation, and disclosure are a separate critical
  operation. `invoice.create`, `invoice.update`, `invoice.read`, and
  `invoice.list` do not return a bearer token.

## Case, Clinic, Staff, compensation, and payout boundaries

| ID | Operation | V1 permission / scope / target | Required treatment | Legacy → V1 | Status |
|---|---|---|---|---|---|
| A-019 | Read Case financial aggregates | `case.financials.list`; Organization | Tenant-scoped aggregate predicate | Owner/Manager/Admin → same | Approved classification |
| A-020 | Recalculate Case financials | `case.financials.update`; resource; Case ID | Same Organization; transaction re-reads Case items, discounts, warranty, and state before calculation/write | Owner/Manager/Admin → same | Blocked: current calculation uses stale pre-transaction facts |
| A-060 | Read Clinic overview analytics | `clinic.analytics.read` plus `clinic.financials.read` for revenue portions; Clinic target | Split/redact financial category revenue and payment-derived score from ordinary analytics | All roles → Staff denied financial section; **restriction approved 2026-08-27** | Blocked: composite DTO |
| A-065 | Read Clinic quick overview | `clinic.read`; Clinic target; financial/payment section additionally `clinic.financials.read` | Split balance, credit limit, recent payments, and unbilled value from ordinary overview | All roles → Staff denied financial section; **restriction approved 2026-08-27** | Blocked: composite DTO |
| A-066 | Read Clinic details | `clinic.read`; Clinic target; financial fields additionally `clinic.financials.read` | Redact/split balance, credit limit, and discount | All roles → Staff denied financial section; **restriction approved 2026-08-27** | Blocked: composite DTO |
| A-068 | Read Clinic historical Cases | `clinic.read` + `case.list`; Case totals additionally require `case.financials.list` | Remove `grandTotal` for actors without financial permission or use a separate DTO | All roles → Staff denied totals; **restriction approved 2026-08-27** | Blocked: composite DTO |
| A-071 | Read Clinic financial aggregates | `clinic.financials.list`; Organization | Tenant-scoped AR, unbilled, and overdue aggregates | Owner/Manager → Owner/Admin/Manager; **Admin expansion approved 2026-08-27** | Approved classification; implementation pending |
| A-074 | Read Clinic pricing plans | `clinic.financials.read`; resource; Clinic ID | Resolve Clinic; treat prices and discounts as financial disclosure | All roles → Owner/Admin/Manager; **Staff restriction approved 2026-08-27** | Approved classification; implementation pending |
| A-075 | List a Clinic's Invoices | `invoice.list`; Organization with verified Clinic filter | Resolve Clinic; tenant predicate shared by count/rows/cursor | All roles → all roles | Approved classification |
| A-111 | Read Staff payout history | `payout.list` plus `staff.read`; Organization collection with verified Staff filter | Tenant Staff filter; minimal payout DTO | Owner/Manager → Owner/Admin/Manager; **Admin expansion approved 2026-08-27** | Implemented in the payout-history action; denied before query for Staff |
| A-112 | Read pending Staff commissions | `payout.list` + `staff.compensation.read` + `staff.read`; verified Staff filter | Tenant assignment predicate; protect Case/patient identity separately | Owner/Manager → Owner/Admin/Manager; **Admin expansion approved 2026-08-27** | Implemented in the pending-commissions action; denied before query for Staff |
| A-113 | Read payroll vitals | `payout.list` + `staff.compensation.read`; Organization | Tenant aggregates; Staff identities require `staff.list` | Owner/Manager → Owner/Admin/Manager; **Admin expansion approved 2026-08-27** | Implemented in the payroll-vitals action; denied before query for Staff |
| A-114 | Issue Staff payout | `payout.issue`; resource; Staff ID | Same Organization, active Staff, eligible unpaid assignments; atomically claim assignments and create payout | Owner/Manager → Owner/Manager | **Blocked critical:** no idempotency key or concurrent double-payout protection |
| A-118 | Read Staff dossier | `staff.read`; Staff target; compensation section additionally `staff.compensation.read`; access section uses Organization `membership.list` | Split ordinary identity, compensation, analytics, and access DTOs; never expose invitation identifier | All roles → Staff denied compensation/access sections; **restriction approved 2026-08-27** | Identity/compensation/access query split and invitation-token removal implemented in F2; combined overview analytics no longer includes compensation; dedicated `staff.analytics.read` action/page rollout remains pending |
| A-126 | Update Staff compensation defaults | `staff.compensation.update`; resource; Staff ID | Same Organization; active-target policy; affects future assignments only unless product explicitly defines otherwise | Owner → Owner/Manager; **Manager expansion approved 2026-08-27** | Blocked: define effective-date semantics |

## Non-action financial boundaries

| ID | Boundary | Classification | Required treatment | Status |
|---|---|---|---|---|
| F-N-001 | Draft Invoice edit server page and `getDraftInvoiceForEdit` | `invoice.update`; Invoice resource | Authorize before loading the DTO in both page render and metadata. Resolver must prove tenant ownership and draft policy; avoid duplicate repository execution. | Pending adapter |
| F-P-001 | Public statement by bearer token | Public capability boundary, not Organization RBAC | High-entropy expiring token; active/non-draft/non-cancelled state; generic not-found; rate-limit/abuse monitoring. Review whether patient age/gender/name, Clinic contacts, notes, and Case IDs are necessary public disclosure. | Blocked: privacy/data-minimization review |
| F-N-002 | Subscription and billing settings page | Future `billing.read` / `billing.manage` server boundaries | Current page is static mock data and performs no provider/database operation. Before real integration, authorize every server read/mutation and require provider ownership revalidation. | Deferred until real billing integration |

## Storage and concurrency findings

- `InvoiceCase.caseId @unique` prevents one Case from being attached to two
  Invoices. This is a useful database invariant and must remain.
- `InvoicePayment` has no idempotency key or unique external reference. The
  current transaction prevents overpayment but does not make an otherwise valid
  repeated submission idempotent.
- `CaseStaffAssignment` has `payoutId` and `isPaid`, but payout issuance reads
  unpaid assignments and later updates them without a conditional claim.
  Concurrent requests can create duplicate payouts unless transaction isolation
  or a conditional/unique strategy is added and tested.
- `StaffPayout` uniquely constrains `(labId, payoutNumber)`, which protects the
  display number but does not prove that source assignments were paid once.
- No Prisma migration is authorized by this inventory. If the selected payment
  or payout idempotency design needs a field or constraint, stop and ask Ali to
  run the migration.

## Approved product/security decisions

| Decision | Approved answer | Affects |
|---|---|---|
| May Admin perform Invoice create/update/delete/cancel/payment/sync operations? | Yes, matching the reviewed fixed bundle; every expansion remains visible in shadow evidence | A-084–A-087, A-089, A-096–A-097 |
| May Admin read Clinic financial aggregates and compensation/payout views? | Yes, read-only, matching the business definition of Admin | A-071, A-111–A-113 |
| May Manager update Staff compensation defaults? | Yes; compensation changes affect future assignment snapshots, subject to the final effective-date design | A-126 |
| May Staff see financial fields embedded in ordinary Clinic/Staff screens? | No; preserve ordinary operational data and redact or split every financial section | A-060, A-065, A-066, A-068, A-074, A-118 |
| What does voiding a paid/partial Invoice mean? | Defer A-087; design credit/refund and immutable audit behavior separately from unpaid cancellation | A-087 |
| Does `invoice.read` include payment history and nested patient data? | Use a minimal Invoice detail; payment history and nested patient data require explicit necessity and data minimization | A-092, F-P-001 |

All decisions in this section were approved by Ali on 2026-08-27. They do not
approve implementation defects or allow a blocked boundary to enter shadow or
enforcement before its stated remediation is complete.

## Approved divergence directions

These behavior directions were approved on 2026-08-27. They must still appear
in the rollout record and shadow evidence with the exact boundary ID.

- `LEGACY_ALLOW_V1_DENY`: Staff financial portions of A-060, A-065, A-066,
  A-068, A-074, A-091, A-095, and A-118.
- `LEGACY_DENY_V1_ALLOW`: Admin on A-071, A-084–A-087, A-089, A-096–A-097,
  and A-111–A-113; Manager on A-126.
- No change intended: A-019, A-020, A-075, A-088, A-090, A-092–A-094, and
  A-114 after DTO/policy remediation.

Privilege expansions receive the highest review priority. None may be enabled
merely because the TypeScript bundle already contains the permission.

## F0 exit assessment

F0 is approved as of 2026-08-27. A-087 is explicitly deferred, and the A-093,
A-118, payment, payout, and public-statement findings remain mandatory
implementation gates rather than product-decision blockers.

F1 may now implement only the shared target resolvers, fact loaders, policies,
and unit tests. It must not connect financial actions yet and must not perform a
Prisma migration without Ali's explicit approval.

## F2 implementation record

### Invoice bearer-capability remediation — 2026-08-28

- Ordinary A-093 Invoice list queries now use an explicit allowlisted
  projection that cannot retrieve `publicToken` or `publicLinkExpiresAt`.
- Ordinary A-092 Invoice dossier action and server data reader share an
  explicit allowlisted projection and no longer return either bearer-capability
  field in their DTO.
- List and dossier sharing controls were removed until a separate authorized,
  expiring, audited public-link operation exists.
- The public `/statement/[token]` lookup remains isolated and operational; this
  remediation does not delete stored tokens or alter the public capability
  boundary.
- Invoice create/update responses that currently disclose a newly issued token
  remain an F3 lifecycle blocker and are not treated as ordinary read access.
- A-092 now retains only patient name for billed-line identification and
  Case navigation; unused patient age/gender are neither queried nor returned.
- A-092 payment history retains amount, method, date, and reference for receipt
  reconciliation; free-form payment notes are neither queried nor returned.

Regression coverage: `invoice-public-capability-boundary.test.ts` protects the
ordinary query projections, DTO/UI paths, and the isolated public lookup. No
Prisma schema change or migration was required.
