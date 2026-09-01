# Current Progress

## Milestone

**Branch:** `feat/authorization-financial-reads`
**Workstream:** F2 — protected financial and sensitive reads
**Current slice:** A-019/A-060/A-065/A-071/A-074 — Clinic and Case financial disclosure surfaces

## What I am doing now

I am finishing the Clinic financial-surface implementation and manual
verification pass. The goal is to keep revenue aggregates and negotiated
pricing available to Owner/Admin/Manager without generating expected 403s or
dehydrating those financial values for Staff.

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
