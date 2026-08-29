# Current Progress

## Milestone

**Branch:** `feat/authorization-financial-reads`
**Workstream:** F2 — protected financial and sensitive reads
**Current slice:** A-118 — Staff dossier disclosure boundaries

## What I am doing now

I am finishing the A-118 implementation and verification pass. The goal is to
make Staff details disclose only the sections that the current role is allowed
to read, while keeping security-sensitive facts out of broad/composite reads.

The current work is:

1. Keep ordinary Staff identity behind `staff.read`.
2. Load compensation only after `staff.compensation.read` allows it.
3. Load system-access and invitation state only after the Organization-scoped
   `membership.list` decision allows it.
4. Avoid selecting or returning Better Auth invitation bearer identifiers.
5. Keep compensation values out of the combined overview analytics response;
   compensation remains available only through the separately authorized
   Settings section.
6. Preserve role-specific UI behavior: Staff receives the sanitized Work
   Settings denial state, Manager can see compensation but not access
   administration, and Owner/Admin can use their permitted controls. The
   ordinary identity projection remains independently authorized on the server,
   but its card is grouped inside the administrative Work Settings surface.
7. Add unit and source-boundary regression checks before the user runs the full
   test and lint commands.

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

A-119 is implemented and ready for manual Owner/Admin/Manager/Staff verification.
The next slice is to review the Staff overview analytics action for field-level
disclosure and confirm which operational metrics are appropriate for ordinary
Staff versus management roles.
