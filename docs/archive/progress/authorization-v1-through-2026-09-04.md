# Current Progress

Status: Archived
Authority: Historical
Owner: Project owner
Last reviewed: 2026-09-05

> This document is non-authoritative and does not define current LabOS architecture or security policy. Consult current documentation, architecture, and decisions before using it.

## Milestone

**Branch:** `feat/authorization-financial-reads`
**Workstream:** F2 — protected financial and sensitive reads
**Current slice:** A-075/A-090/A-092–A-094 — Invoice read separation

## What I am doing now

The Clinic/Case disclosure slice was committed at `51f802c`. The active work is
now the Invoice read boundary: Owner/Admin/Manager retain Invoice and A/R
access, while Staff keeps operational Clinic/Case data but receives no Invoice
financial records or controls.

## Staff Invoice policy decision — 2026-09-01

- Staff no longer has `invoice.read`, `invoice.list`, or
  `invoice.analytics.read` in the fixed V1 permission bundle.
- Invoice lists, dossiers, Clinic ledger history, A/R vitals, risk views,
  payment history, totals, balances, discounts, and unbilled financial values
  are Owner/Admin/Manager-only.
- This records policy intent. Server-page, action, repository short-circuit,
  DTO, and UI enforcement are the next implementation slice.

## Invoice reader enforcement

- Global and Clinic-scoped Invoice lists require `invoice.list` before opening
  their business Prisma clients.
- Both the Invoice dossier action and the direct server data reader require
  `invoice.read` with an identifier-only Invoice target before loading the
  dossier projection.
- A/R vitals, risk radar, and the server unbilled-summary reader require
  `invoice.analytics.read` before aggregate or Clinic queries execute.
- Invoice list, detail, edit, and new-invoice server pages now authorize before
  loading data or creating query dehydration. Denied Staff requests redirect to
  `/dashboard` or `/invoices` without rendering the protected page.
- The Clinic Financial Ledger tab is hidden for Staff and direct `?tab=ledger`
  navigation redirects to the operational overview before ledger data loads.
- Focused authorization/source-order tests pass (23 files, 249 tests). The
  remaining browser matrix is a manual confirmation with authenticated Staff
  and management sessions.

The current work is:

1. Authorize Clinic-wide revenue aggregates with `clinic.financials.list` before
   opening Prisma.
2. Prefetch and render the revenue strip only for Owner/Admin/Manager.
3. Keep the Clinic ledger available for permitted operational invoice history,
   while omitting negotiated pricing data and its editor for Staff.
4. Keep pricing create/update actions behind the management server boundary.
5. Hide Clinic creation controls from Staff while retaining server enforcement.
6. Verify the approved role matrix and source ordering with regression tests.

## Case Staff disclosure follow-up

- Case revenue aggregates now require `case.financials.list` before opening
  Prisma, and the page prefetches them only for Owner/Admin/Manager.
- The Staff Case-list DTO does not select or serialize `grandTotal`; the
  financial table column and executive revenue strip are absent for Staff.
- Operational Case pulse counts remain available to Staff, with the legacy
  membership gate corrected from Admin to Staff so the page no longer produces
  an expected 403.

## Clinic Staff disclosure and write-control pass

- Staff Clinic list DTOs omit balance, credit limit, and unbilled counts. The
  financial filters are rejected on the server and removed from the UI.
- Staff retains operational pulse cards: All Partners, Suspended, and Dormant.
  Credit Risk and Unbilled cards are queried and shown only to management.
- Quick View keeps operational identity/contact and production data, while
  balance, credit limit, unbilled counts, recent payments, statements, payment
  actions, and invoice-generation controls are omitted for Staff.
- Clinic overview analytics now separates operational metrics from financial
  category revenue and payment-derived scores before dehydration.
- Clinic phone/email remain ordinary operational contact data by policy.
- Case creation is Owner/Admin/Manager-only in the UI, the `/cases/new-case`
  server layout, and the create action. Staff direct navigation redirects to
  `/cases` and direct action calls are denied.
- Clinic historical Case DTOs retain operational details for Staff while
  omitting `grandTotal` unless `case.financials.list` is allowed.
- The focused authorization/Clinic suite passes. The TypeScript baseline still
  contains unrelated generated-schema/Decimal errors; this slice adds none.

## Files referenced or changed

### Authorization and loading

- `modules/labos-authorization/service.ts` — registers the implemented
  `staff.read` permission in the concrete LabOS service.
- `modules/labos-staff/staff-dossier.loader.ts` — section-level authorization
  and fail-closed Staff dossier loader.
- `data/team/staff-dossier.repository.ts` — tenant-scoped Prisma repositories
  with explicit minimal projections for identity, compensation, and access.
- `data/team/get-staff-dossier.ts` — server data boundary for dossier,
  metadata, and header reads.
- `schema/composed/team/staff-dossier.dtos.ts` — redacted DTO contracts and
  separate analytics type declarations.

### Staff interface

- `components/team/staff-details/navigation-shell/team-header-section.tsx` —
  operational-only header data.
- `components/team/staff-details/staff-settings-tab/staff-settings-tab.tsx` —
  role-aware settings access.
- `components/team/staff-details/staff-settings-tab/staff-settings-tab-content.tsx` —
  maps independently authorized dossier sections to cards.
- `components/team/staff-details/staff-settings-tab/staff-security-card.tsx` —
  access administration and one-time invitation-link handling.
- `components/team/staff-details/staff-settings-tab/staff-compensation-card.tsx` —
  read-only compensation behavior for Admin.
- `components/team/staff-details/overview-tab/overview-tab-content/staff-overview-tab-content.tsx` —
  consumes the redacted overview analytics payload.
- `components/team/staff-details/overview-tab/overview-tab-content/staff-performance-vitals-card.tsx` —
  shows a non-sensitive Settings navigation hint instead of compensation
  values.

### Tests and tracking

- `tests/unit/modules/labos-staff/staff-dossier.loader.test.ts` — role matrix,
  unknown-role short-circuit, invitation-ID redaction, and analytics payload
  regression checks.
- `tests/unit/modules/labos-authorization/service.test.ts` — concrete service
  supported-permission expectations and default-deny coverage.
- `notes/project/authorization-v1-financials-inventory.md` — A-118 inventory
  status and remaining work.
- `notes/project/authorization-v1-financials-plan.md` — F2 progress and exit
  criteria.
- `notes/project/tasks_for_ali.md` — manual verification checklist.

## Verification status

- Focused Authorization V1 + Staff dossier tests: passed (21 files, 206 tests).
- Full Vitest suite: passed (66 files, 475 tests).
- Full ESLint run: passed.
- `git diff --check`: passed.
- Prisma migration: not required and not performed.

Authentication/session hardening completed during this handoff:

- `lib/application-session.ts` defines a frozen, minimal application session
  projection containing only `user.id`, `user.name`, and
  `session.activeOrganizationId`.
- `lib/auth.ts` configures Better Auth `customSession` with that projection so
  the browser `/get-session` response no longer returns credential-bearing
  session fields.
- `lib/get-session.ts` projects again at the Server Component boundary and
  rethrows unexpected provider failures instead of silently returning
  `undefined`.
- `lib/auth-client.ts` now uses the configured client and its custom-session
  client plugin; a source-boundary test prevents regression to an unconfigured
  `createAuthClient()` instance.
- Focused session/tenant/architecture checks: passed (5 files, 19 tests).
- Full Vitest after hardening: passed (68 files, 479 tests).
- Touched-file ESLint: passed. Full ESLint still has 13 unrelated existing
  errors and 253 warnings elsewhere in the repository.
- Production build was attempted twice and remains blocked before compilation
  by unavailable Google Fonts (`Inter` and `JetBrains Mono`).
- The follow-up Owner retest still showed the old full session shape in RSC and
  surfaced `No QueryClient set`; this was reported against a dev server that
  had not been fully restarted after the session changes. The query hydration
  wrapper also had its client directive commented out; that directive is now
  restored and protected by an architecture test.
- Full Vitest after the hydration-boundary fix: passed (69 files, 480 tests).
- `QueryHydrationBoundary` now establishes an explicit `QueryClientProvider`
  around each hydrated tab, so streamed Server/Client route boundaries cannot
  render tab queries without a client context.
- `DashboardClientShell` no longer wraps the sidebar and top header in
  `next/dynamic(..., { ssr: false })`; both are already client components, so
  the dynamic wrapper only emitted a `BAILOUT_TO_CLIENT_SIDE_RENDERING`
  marker into authenticated documents.
- `proxy.ts` was a remaining raw-session bypass: it now passes
  `request.headers` to Better Auth and projects immediately before using the
  session for routing hints. It now consumes the redacted
  `/api/auth/get-session` endpoint instead of calling Better Auth's low-level
  session API from middleware. A source-boundary test protects this rule.
- `actions/auth.ts` was another raw-session boundary: sign-in and sign-up were
  returning Better Auth's provider response directly from Server Actions. They
  now return only `{ success: true }`; the login forms only need that success
  signal before navigating. An architecture test protects this boundary.
- The remaining development-document exposure was traced to React 19.2's RSC
  async debug stream. In development it records fulfilled Promise values and
  their owner stacks; running Better Auth's handler inside the Server Component
  request allowed an internal raw session Promise to appear in a debug chunk
  even though `getServerSession` returned only the projected application DTO.
  `lib/get-session.ts` now crosses a real HTTP boundary to the redacted
  `/api/auth/get-session` route and forwards only the session cookie. Better
  Auth's internal Promises therefore execute in the API-route request rather
  than the page render's async-debug context. The result is projected again
  after parsing.
- A production build completed after temporarily skipping the repository's
  unrelated existing TypeScript mapper error; `next.config.ts` was restored
  immediately afterward. The production React Flight renderer contains no
  async debug value serializer. An authenticated production response check on
  port 3001 remains for the user because the production browser has no session.
- The authenticated production check is now complete: `/api/auth/get-session`
  contains only the application projection, and the Dashboard, Team roster,
  and staff dossier documents contain no raw Better Auth token or AuthUser
  model. Their remaining dehydrated records are page query data and must be
  reviewed separately under field-level disclosure policy.
- Next.js was upgraded from 16.1.7 to the Active LTS security release 16.3.3;
  React/React DOM are now 19.2.8 and `eslint-config-next` is 16.3.3. The official
  upgrader's invalid `instant = false` additions were removed because Cache
  Components is not enabled. The full suite passes (72 files, 484 tests), and a
  complete 16.3.3 production bundle succeeds with the existing TypeScript debt
  temporarily bypassed. The bypass was removed immediately after verification.
- Full Vitest after the proxy hardening: passed (71 files, 482 tests).
- Because the RSC path still observed Better Auth's internal full object after
  browser reset, `getServerSession` now invokes the redacted `/api/auth/get-session`
  handler and parses its HTTP response instead of awaiting `auth.api.getSession`
  directly. This keeps the raw provider object out of the RSC execution graph.

## Next handoff

F2-002 manual verification and the authenticated production disclosure check
are complete. Next.js 16.3.3 production is running on port 3001 for a final UI
smoke test. The remaining authorization check is to restart development and
confirm the new HTTP boundary also removes React's development debug copy. Then
resolve or separately track the existing TypeScript/lint backlog and continue
with the Staff analytics field-disclosure boundary.

## A-119 roster contact and access disclosure boundary

- Added explicit `staff.contact.read/list` and `staff.compensation.list`
  permissions. Owner, Admin, and Manager may receive contact/compensation list
  fields; Staff receives neither. Membership access metadata remains Owner/Admin
  only.
- Replaced the wide roster Prisma query with separate base, analytics, contact,
  compensation, and access projections. Denied projections are not queried and
  their DTO keys are omitted entirely.
- Removed phone numbers from the ordinary Staff dossier identity/header path;
  the contact projection is now independently authorized. Pending invitation
  counts in Team vitals are also membership-gated.
- Team UI now hides access filters/actions for Staff and omits the contact zone
  when the server did not disclose a phone field.
- Legacy staff search/list actions used by case assignment controls now use a
  safe scalar projection and no longer serialize phone numbers, lab relations,
  or invitation data.
- Added roster loader disclosure tests and expanded dossier tests. Targeted
  authorization/roster tests pass (56 tests); repository-wide TypeScript still
  has the previously tracked Decimal/addons/ES target errors.

## A-119 handoff

A-119 manual verification passed: Owner/Admin/Manager receive the expected
contact and compensation projections, while Staff receives neither in the UI
nor network responses.

## A-120 Staff performance privacy boundary

- Approved policy: Staff may see the full team roster, but detailed performance
  is self-only; Owner/Admin/Manager may view every Staff profile.
- `staff.analytics.read` now requires the
  `staff.analytics.self_or_management` resource policy. Staff self-access is
  verified through the authoritative Member-to-Staff link; coworker targets
  fail closed before analytics queries execute.
- Coworker roster cards remain visible to Staff but no longer link to a dossier.
  The Staff user's own card shows `Open My Performance`.
- Restricted roster cards no longer retain the removed contact zone's forced
  minimum height or `mt-auto` spacer, eliminating the large blank middle area.
- Focused authorization suite passes (5 files, 70 tests). The full TypeScript
  check reports only the previously tracked Decimal/addons/ES-target errors.

## A-121 Staff payroll read boundary

- Payroll vitals, pending commissions, and payout history now require the V1
  `payout.list` permission plus the relevant Staff read/compensation
  permission before any financial query runs.
- The legacy membership gate remains at `STAFF` only as a compatibility
  precondition; the authorization service is now the decision-maker, allowing
  Owner/Admin/Manager and denying Staff.
- The payroll page now includes Admin in its read-only financial view, matching
  the approved policy. Staff still receives the existing denial panel and no
  payroll prefetch.
- The payout-issue control remains visible only to Owner/Manager, matching the
  separate `payout.issue` policy; Admin receives read-only payroll data.
- Targeted TypeScript and ESLint checks pass for the changed payroll files;
  `git diff --check` passes. The repository-wide TypeScript debt remains the
  previously tracked Decimal/addons/ES-target errors.

## A-122 Staff workbench privacy boundary

- Added `staff.workbench.read` with a self-or-management target policy. Staff
  can read their own active and historical workbench; Owner/Admin/Manager can
  read any Staff workbench.
- `staff.read` now has its own self-or-management target policy. The
  `/team/[staffId]` page redirects a Staff user away from a coworker's dossier
  before rendering its header, navigation, or any tab content.
- The cases tab retains its defense-in-depth check before loading header data
  or dehydrating active/historical cases.
- Both active-case and historical-case server actions enforce the same policy
  before their Prisma queries, protecting direct action calls as well as page
  navigation.
- Staff can still see coworker names in the Team roster; only the detailed
  workbench route is restricted.

## A-071 Clinic revenue aggregate boundary

- `getClinicsRevenueAction` now uses the membership-compatible legacy gate and
  enforces `clinic.financials.list` as the authoritative decision before Prisma.
- The `/clinics` server page prefetches revenue only for Owner/Admin/Manager, so
  Staff no longer produces an expected `MISSING_PERMISSIONS` error or receives
  dehydrated aggregate values.
- The Staff UI also omits the revenue strip and New Clinic control. Direct write
  actions remain protected independently on the server.
- The approved role matrix is Owner/Admin/Manager allow and Staff deny.

## A-074 Clinic negotiated-pricing read boundary

- `getClinicPricingPlansAction` now requires `clinic.financials.read` for the
  requested Clinic before opening the tenant Prisma client.
- The Clinic Financial Ledger checks the same permission on the server. Staff
  retains the permitted Invoice history tab, but the negotiated-pricing query,
  hydrated DTO, and pricing editor UI are omitted entirely.
- Owner/Admin/Manager retain the negotiated pricing view. The Clinic target
  resolver continues to enforce same-Organization ownership.
- Focused A-074 and Authorization V1 tests pass (4 files, 52 tests), and
  targeted ESLint passes.

## A-123 Invoice server-page and dehydration boundary

- Global Invoice list access is checked before the page can prefetch invoice
  rows, A/R vitals, or risk data.
- Invoice dossier, edit, and new-invoice pages authorize before loading their
  DTOs or onboarding queries; metadata uses the same target check and returns a
  generic title when denied.
- Clinic Financial Ledger navigation and routing are management-only, so Staff
  cannot reach invoice history or pricing through a hidden tab or direct URL.
- Added source-order regression coverage for the page guards and ledger
  hide/redirect behavior. No Prisma migration was required.

## Step 5 role and tenant-isolation verification

- Owner, Admin, and Manager are allowed `invoice.read`, `invoice.list`,
  `invoice.analytics.read`, and `invoice.create`; Staff is denied by the fixed
  role bundles and the authorization service.
- Cross-Organization Invoice dossier targets fail with
  `AUTHZ_TENANT_MISMATCH` before policy or dossier loading. Clinic Invoice
  history keeps both Clinic lookup and Invoice predicates scoped to the active
  Lab/Organization.
- Focused role, resolver, repository, page-boundary, and Clinic pricing tests
  pass. Authenticated Staff browser smoke testing passed, and the Manager,
  Admin, and Owner browser confirmations all passed for Case, Invoice, Clinic,
  and Clinic Ledger management surfaces.

## Case DTO Decimal boundary

- `normalizeCase` now emits an explicit scalar-only `CaseBase` projection and
  converts both `grandTotal` and `manualDiscountAmount` from Prisma Decimal to
  plain numbers. Raw Case relations can no longer be carried by object spread
  into Server Component props.
- Case list mapping and the Case dossier both use this normalizer, so the
  created-case detail route has one server-to-client DTO boundary.
- Decimal/relation audits for Invoice, Clinic, Staff, and other model mappers
  remain deferred to the later hardening backlog; they are not part of this
  Case slice.

## F3 Invoice lifecycle kickoff

- F2 is checkpointed in commit `0e4dfbb` after Manager, Admin, and Owner browser
  confirmation.
- The first F3 write slice protects `createInvoiceAction` with the V1
  organization-level `invoice.create` permission before `tenantPrisma`.
- Existing transaction checks still require same-tenant, same-Clinic,
  completed/delivered, unbilled Cases. Public-link issuance remains a separate
  capability boundary and is not expanded by Invoice creation.
- Next F3 slices: update draft, record payment, unpaid cancellation, overdue
  synchronization, and draft deletion; each needs target authorization before
  Prisma plus transaction-time state and concurrency invariants.

## Documentation checkpoint structure

- Added `notes/project/current-checkpoint.md` as the canonical handoff for the
  active branch, milestone status, verified work, open risks, and next task.
- Updated `notes/project/README.md` with a clear reading order and corrected the
  active financials plan source of truth.
- Backfilled explicit F1 and F2 status/evidence summaries in the financials
  plan and added the missing F1 implementation record to the boundary inventory.
- `progress.md` remains append-only history; product-specific findings remain
  under `notes/baseline-app/`.

## F3 draft Invoice update authorization slice

- `updateDraftInvoiceAction` now authorizes `invoice.update` before opening the
  tenant Prisma client.
- The request carries the Invoice target plus the closed
  `invoice.draft.update` operation intent (`clinicId` and `caseIds`), allowing
  the policy to validate draft state, Clinic ownership, and candidate links
  without trusting caller-supplied facts.
- Existing transaction logic remains in place, including draft-only checks,
  same-Clinic Case selection, and Case eligibility validation. Binding the
  transaction's Clinic update to the trusted Invoice relationship remains a
  critical follow-up.
- Focused invoice boundary, policy, and service tests pass (71 tests).

## F3 live Invoice adjustment authorization slice

- `adjustLiveInvoiceAction` now authorizes `invoice.update` before opening the
  tenant Prisma client.
- The request carries the Invoice target and a derived, closed
  `invoice.live.update` change set. Only fields actually present in the input
  become `due_date`, `discount`, or `notes` intent; callers cannot claim a
  broader change set independently of their submitted values.
- Existing paid/partial/draft state rules remain in the domain action and the
  policy denies financial changes to settled invoices while allowing notes-only
  updates where defined.
- Focused invoice boundary, policy, and service tests pass (72 tests).

## F3 A-084 transaction integrity follow-up

- Moved the live Invoice state, subtotal, payment, total, and Clinic reads into
  the mutation transaction so calculations cannot use stale pre-read facts.
- The transaction now uses serializable isolation and binds the Clinic ledger
  update to `invoice.clinicId` read inside that transaction, rather than to any
  caller-selected relationship.
- Clinic balance deltas now support both directions: a reduced Invoice total
  decrements debt and an increased total increments it.
- Focused boundary, policy, and service tests pass (73 tests). A production
  concurrency exercise remains a follow-up for the broader F3 verification.

## F3 A-085 draft Invoice deletion authorization slice

- `deleteDraftInvoiceAction` now authorizes `invoice.delete_draft` with the
  Invoice target before opening the tenant Prisma client.
- The transaction revalidates Invoice existence and `DRAFT` state before
  deleting tenant-owned InvoiceCase rows and the Invoice itself.
- Serializable isolation prevents a concurrent lifecycle change from being
  silently deleted as a stale draft; the operation fails rather than widening
  the deletion race.
- Focused invoice boundary, policy, and service tests pass (74 tests).

## F3 A-088 unpaid Invoice cancellation authorization slice

- `cancelInvoiceAction` now authorizes `invoice.cancel` with the Invoice target
  and `invoice.unpaid.cancel` operation intent before tenant Prisma and actor
  name resolution.
- The legacy metadata gate now matches the approved Owner/Admin/Manager role
  bundle instead of requiring Admin only.
- Existing transaction-time guards remain authoritative: Invoice existence,
  cancellation state, and zero recorded payments are checked before adjusting
  Clinic balance, releasing Case links, and cancelling the Invoice.
- Serializable isolation keeps the payment/state check and Case release in one
  atomic mutation. Paid/partial voiding remains the separately deferred A-087
  design.
- Focused invoice boundary, policy, and service tests pass (75 tests).

## F3 A-086 overdue Invoice synchronization authorization slice

- `syncOverdueInvoicesAction` now authorizes the organization-level
  `invoice.overdue.sync` permission before opening tenant Prisma.
- The existing server-owned update predicate remains intact: only SENT/PARTIAL
  Invoices with a positive balance and past due date transition to OVERDUE.
- The action returns only the bounded `updatedCount` result; no Invoice rows or
  financial details are returned to the caller.
- Focused invoice boundary, policy, and service tests pass (76 tests).

## Platform-wide authorization reconciliation and registered adapter pilot

- Completed a repository-wide discovery pass beyond Server Actions and added
  `authorization-v1-platform-boundary-inventory.md` with route, page/hydration,
  reader/service, file/provider, and client-role surfaces plus migration order.
- Reconciled the historical 131 declarations to 127 current declarations, 35
  remaining manual action decisions in 23 files, three route handlers, and the
  protected non-action candidate sets. Non-growth architecture guards now pin
  the legacy/manual ceilings.
- Added a reusable schema-first, registry-owned, V1-authoritative safe-action
  adapter and migrated A-086 to it. The action handler has no `requiredLabRole`
  metadata and no direct authorization-service call; denial occurs in validated
  middleware before tenant Prisma can open.
- Generalized the existing server-only Axiom pattern to authoritative
  `platform.authorization.decision` records. The adapter propagates stable
  boundary and correlation IDs; an explicit allowlist drops runtime extras,
  and ingestion/configuration failures cannot change authorization.
- Repository-wide Vitest passed with 83 files / 571 tests. TypeScript reports
  only the recorded Invoice Decimal mapper debt and an existing ES-target test
  regex; no adapter, A-086, or telemetry type error remains after correction.
- Focused ESLint passed. Repository-wide `eslint . --quiet` reproduced the
  approved 13 errors in the same eight unrelated files and added no
  authorization, Axiom, safe-action, or pilot violation. `git diff --check`
  passed.

## N-002 authenticated Staff paystub authorization slice

- Recorded the approved classification
  `LEGACY_PUBLIC -> V1_AUTHENTICATED_RESOURCE_SCOPED`; removed `/paystub` from
  public proxy routes and added it to authenticated protected routes.
- Registered N-002 with a boundary-owned UUID schema, Payout-only target, and
  closed paystub-read intent containing the route Staff identifier. UUID
  possession grants no access.
- Added `payout.self.read` only to the Staff bundle. Owner/Admin/Manager use
  `payout.read`; neither management role receives the self permission.
- Added mandatory Payout relationship and self-ownership policies. Trusted
  facts prove Organization/Lab ownership, linked Staff tenancy, assignment and
  Case Lab consistency, route Staff parity, and Member-to-LabStaff ownership.
- The loader enforces canonical TenantContext and V1 before the tenant Prisma
  repository. Denial prevents repository execution; cross-Staff, cross-tenant,
  unknown-role, and missing-identity cases fail closed.
- Replaced broad relation loading with an explicit projection and a minimal
  immutable DTO. Patient names, Case totals, payout notes, references, and
  Decimal objects do not cross the page boundary.
- Repository-wide verification passes 85 files / 596 tests. Repository TypeScript has
  only the two recorded baseline failures (Invoice Decimal mapper and existing
  ES-target regex test); no N-002 type failure remains.
- Focused ESLint passes for every N-002 production/test file. Manual browser
  verification confirms an unauthenticated paystub URL redirects to `/sign-in`
  without rendering payroll data. Authenticated role-browser evidence remains
  pending seeded payout fixtures.
- `git diff --check` passes. Repository-wide `eslint . --quiet` reproduces the
  approved 13 errors in the same eight unrelated files and adds no N-002
  violation.

## N-API-002 authenticated Dentist detail API slice

- Classified the prior tenant-context-only route as
  `LEGACY_TENANT_ONLY -> V1_AUTHENTICATED_RESOURCE_SCOPED` and registered stable
  boundary N-API-002 with fixed `dentist.read`.
- Added a boundary-owned UUID schema and trusted projection to an
  identifier-only Dentist target plus closed `dentist.detail.read` intent
  carrying the route Clinic identifier for authoritative parity checking.
- Added minimal target-resolution and tenant-scoped policy repositories that
  prove Dentist Organization ownership and Dentist/Lab/Clinic consistency.
  Missing, cross-tenant, cross-Clinic, inconsistent, and malformed facts fail
  closed before the tenant detail repository runs.
- Replaced the route's direct Prisma read and broad normalization with a loader
  that enforces canonical TenantContext and V1 first, followed by an explicit
  Prisma projection and immutable client-safe editor DTO. Denial and absence
  share a generic 404 to prevent identifier enumeration.
- Owner, Admin, Manager, and Staff preserve the approved `dentist.read` bundle;
  unknown roles and missing identity grant nothing. Decision telemetry carries
  only the allowlisted boundary, permission, outcome, target type, reason, and
  correlation labels—not Dentist/Clinic/User/Member identifiers.
- Repository-wide Vitest passes 90 files / 620 tests. Focused server-side
  ESLint passes. TypeScript remains at the two recorded unrelated baseline
  errors and adds no N-API-002 failure. Repository-wide quiet ESLint remains at
  the recorded 13 errors in the same eight unrelated files, and `git diff
  --check` passes. UploadThing completion identifier disclosure is the next P0
  slice; payout issue and void remain separate transaction-focused migrations.
- Authenticated editor browser confirmation remains pending seeded Dentist and
  tenant fixtures; route status behavior and repository short-circuiting are
  covered by automated tests.

## N-FILE-002 UploadThing completion disclosure and endpoint inventory

- Removed the LabOS-added `uploadedBy`/`userId` and `labId` values from the
  common UploadThing completion payload. Every configured endpoint now returns
  an immutable empty LabOS server-data DTO; UploadThing's normal file name,
  key, type/size, and URL result remains available to existing clients.
- Updated the Case asset consumer's explicit response type so it no longer
  declares or depends on actor/tenant identifiers. No active client read those
  fields at runtime.
- Inventoried all six endpoint keys and reconciled four active consumers. The
  Lab logo and unused user-avatar routes are onboarding/session-only; Staff
  avatar, category icon, and Case assets are protected domain routes; the
  shared `genericAvatar` route mixes Catalog and Dentist ownership and must be
  split before Authorization V1 enforcement.
- Recorded that category/new-Case uploads may occur before a concrete resource
  exists. Their future boundary needs an approved staged-upload ownership
  contract rather than trusting a caller-supplied future identifier.
- Repository-wide Vitest passes 91 files / 622 tests. Focused ESLint passes;
  TypeScript remains at only the two recorded unrelated baseline errors. No
  provider configuration, permission, database schema, or external
  infrastructure was changed.

## Approved protected UploadThing boundary design

- Reserved candidate boundaries N-FILE-101 through N-FILE-111, separating
  create from update and Catalog Category/WorkType/Product, Dentist, Staff, and
  Case targets so callers cannot select permission or target semantics through
  one generic endpoint.
- Reused existing approved `catalog.create`, `catalog.update`,
  `dentist.create`, `dentist.update`, `staff.update`, and `case.create`
  permissions where their current bundles match the operation. No permission
  or role bundle was changed.
- D-FILE-01 approves an opaque persisted upload grant created after V1 and consumed
  once inside the final domain transaction. This closes URL/key substitution,
  cross-tenant reuse, and replay while supporting pre-resource uploads, but it
  includes the Prisma migration, conditional one-row consumption, expiry, and
  orphan-cleanup requirements.
- Rejected using broad `case.update` for Staff attachment behavior. D-FILE-02
  approves narrow `case.asset.add` for all roles, with active same-Lab Staff
  linkage and active Case assignment additionally required for Staff. D-FILE-03
  keeps the unused Staff self-avatar route unavailable in V1.
- Added D-FILE-04 as a separate read/access decision: public Catalog imagery is
  distinct from clinical Case assets, which should not rely on hard-to-guess
  URLs and require a private ACL/signed-URL design before cutover.
- This was a documentation/design slice only. No provider route, permission,
  database schema, external configuration, or runtime behavior changed.

## D-FILE-01 Step 1 — upload-grant persistence foundation

- Added the approved `FileUploadGrantStatus` lifecycle and `FileUploadGrant`
  Prisma model. The grant owns canonical Organization/Lab/Member links,
  registry boundary and purpose, optional resource target, unique provider key,
  canonical provider URL, correlation, expiry, lifecycle timestamps, sanitized
  failure codes, and retryable orphan-cleanup state.
- Added migration `20260904003000_add_file_upload_grants`. Tenant/actor, expiry,
  boundary, target, and callback indexes support the future conditional
  lifecycle operations. Member deletion sets the actor link to null so cleanup
  evidence survives; future consumption must require the exact non-null
  canonical Member. Organization and Lab deletion cascade their grants.
- Regenerated the checked-in Prisma client and Zod artifacts. Added an
  architecture test that freezes lifecycle, authoritative fields, indexes,
  foreign-key deletion behavior, and the absence of unsafe request, identity,
  filename, notes, or raw-error storage fields.
- `prisma validate`, `prisma format`, and `prisma generate` pass. Repository-wide
  Vitest passes 92 files / 627 tests, and focused ESLint passes. TypeScript
  remains at the same two unrelated baseline failures (Invoice Decimal mapper
  and ES-target regex test).
- The migration file was created but not applied to any database. No UploadThing
  endpoint uses the model yet. Runtime grant creation, verified callback
  completion, exact one-row transactional consumption, and orphan cleanup are
  the next D-FILE-01 implementation slice.

## D-FILE-01 Step 2 — upload-grant lifecycle runtime

- Added an immutable upload-grant definition registry. Unknown or duplicate
  boundary/purpose pairs, malformed labels, invalid target semantics, and TTLs
  outside the approved bounds fail closed. N-FILE-102 through N-FILE-109 are
  registered at a fifteen-minute TTL; deferred Staff and Case definitions are
  intentionally absent.
- Added canonical grant creation. The Prisma adapter verifies both the current
  Member/Organization relationship and Lab/Organization relationship in the
  creation transaction before persisting a grant. The caller receives only the
  opaque `uploadGrantId`.
- Added verified provider completion. UploadThing metadata needs only the opaque
  ID; boundary and purpose are loaded from the server record and checked against
  the registry. Only an unexpired `PENDING` grant can move to `UPLOADED`, while
  an exact same-file callback retry is idempotent. Malformed, expired,
  mismatched, missing, and unknown-definition callbacks fail closed.
- Added an explicit expiry sweep for due `PENDING` and `UPLOADED` grants. The
  callable operation is not scheduled yet, and provider orphan deletion remains
  a separate cleanup worker slice.
- Added serializable one-time consumption. Exact Organization, Lab, Member,
  boundary, purpose, target, status, expiry, provider key, and provider URL
  constraints must update one row before domain work runs in the same
  transaction. Race losers and cross-tenant/cross-actor requests execute no
  domain mutation; a domain exception rolls back consumption.
- Added allowlisted Axiom lifecycle telemetry using the existing server-only
  configuration and local fallback. Grant/file/tenant/actor identifiers,
  filenames, payloads, and raw errors are excluded, and synchronous or rejected
  telemetry delivery cannot change the lifecycle result.
- Focused registry/service/repository/telemetry verification passes 26 tests.
  Repository-wide Vitest passes 96 files / 653 tests and focused ESLint is
  clean. TypeScript remains at exactly the two recorded unrelated baseline
  failures. The migration remains unapplied and no UploadThing route is wired
  or activated by this slice.
> Historical design or record.
>
