# Organizations / Tenancy module architecture

## Mission

Own the SaaS membership boundary, active Organization, invitations, switching, and resolution from Better Auth Organization to the LabOS `Lab` domain tenant.

## Owns

- Better Auth Organization, Member, and Invitation integration.
- Membership validation and active-Organization selection.
- Organization creation/ownership and switching.
- Stable `TenantContext` resolution and Organization-to-application-tenant resolver contract.

## Does not own

- Dental Lab business fields, LabStaff, permissions beyond membership validity, subscriptions, or domain queries.

## Core contract

```ts
type TenantContext = {
  userId: string
  organizationId: string
  memberId: string
  memberRole: string
  staffId: string | null
  labId: string
  lab: { id: string; title: string; slug: string | null }
}
interface TenancyService {
  resolveActive(identity: AuthenticatedIdentity): Promise<TenantContext>
  switchActive(identity: AuthenticatedIdentity, organizationId: string): Promise<TenantContext>
}
```

LabOS registers a resolver from `organizationId` to the unique `Lab.organizationId`; generic tenancy code contains no dental imports.

## Invariants

- For LabOS V1, one Organization maps to exactly one Lab and one Lab maps to exactly one Organization.
- A Member must exist and be active before resolving a tenant.
- `organizationId` establishes security context; `labId` scopes domain ownership.
- Client-provided tenant IDs are never trusted.

## Migration and rollout

Add Organizations, nullable unique Lab association, deterministic backfill, dual-read with telemetry, active switching, onboarding cutover, then make the association required. Existing `LabUser` and `AuthUser.labId` remain compatibility artifacts until verified unused.

## Failure handling

Organization and Lab provisioning is idempotent. Persist correlation/status, retry partial operations, and use narrow compensation only for a newly created empty Organization. Invalid or stale active Organizations return a tenant-selection state without falling back across Organizations silently.

### Transitional onboarding implementation

`platform/organizations/onboarding` provides a parallel onboarding service while the legacy action remains operational. The globally unique Organization slug is the natural idempotency key; `Lab.organizationId @unique` protects the second creation boundary. The service re-reads authoritative state after either creation failure to recover from concurrent requests. It resumes an Organization that has its creator Member but no Lab, rejects slugs where the caller is not a Member, and sets the active Organization only after Organization and Lab are complete.

The onboarding monitor emits structured step, outcome, correlation ID, safe actor/resource identifiers, duration, and platform error code. It never emits request headers, cookies, tokens, email addresses, or raw provider errors. A production metrics/tracing adapter may replace the default structured-console adapter without changing the onboarding service.

The Organization/Lab provisioning service does not write `AuthUser.labId` or create `LabUser`/`LabStaff`. The workspace onboarding action now delegates to this service. Its former export remains temporarily as a deprecated alias, while the form sends only Lab workspace fields and no longer collects operational staff data. Legacy models and tenant middleware remain for existing runtime paths until the tenant-context cutover.

Authenticated users can provision an additional Organization + Lab from
`/organizations/new`. This entry point is linked from both the
Organization-selection page and the shared desktop/mobile workspace switcher.
It reuses the same server-owned onboarding action, derives identity from the
current session, keeps Better Auth browser Organization creation disabled, and
selects the newly completed Organization only after its Lab exists. The
existing slug and one-to-one constraints preserve idempotent retries.

The public request-facing entry point derives AuthUser ID and request headers from the authenticated server session. These security inputs are not accepted from client-controlled onboarding data. A lower-level dependency-injected orchestrator exists only for focused tests and trusted internal orchestration.

### Runtime tenant context

Fresh Better Auth sessions do not necessarily retain `activeOrganizationId`. Authentication therefore continues through `/auth/continue` before entering protected product routes. The provider-neutral post-auth resolver compares the session's active ID with the caller's authoritative Better Auth Organization list. A valid active membership is retained; exactly one membership is selected through Better Auth; zero memberships proceed to onboarding; and multiple memberships require explicit selection at `/select-organization`. Stale IDs are never trusted, and multiple Organizations are never resolved by arbitrary ordering. Invitation callbacks bypass normal selection only long enough to complete Better Auth acceptance, which establishes the membership and active Organization. Provider failures stop on a retryable restoration screen rather than misclassifying the account as new onboarding.

The proxy permits these two authenticated bootstrap routes even when the active-Organization routing hint is empty. Unauthenticated requests are still redirected to sign-in, and protected layouts continue to call `requireTenantContext()` for authoritative membership and Organization-to-Lab validation.

Every successful active-Organization mutation performs a full document
navigation so React Server Component payloads and client caches cannot be
reused across tenants. The product shell also emits an identifier-free browser
storage signal after a successful switch, restoration, or additional-workspace
activation. Other open protected tabs respond by replacing their document with
`/dashboard`, rebuilding tenant context before rendering more product data.
This is defense-in-depth UX isolation; server-side tenant checks remain
authoritative if browser storage is unavailable or delivery is delayed.

`requireTenantContext()` is the canonical request-scoped resolver. It reads the authenticated session, requires `activeOrganizationId`, and performs one scoped database query that loads the Organization, only the caller's Member row, its optional LabStaff link, and the linked Lab. Its result contains `userId`, `memberId`, `memberRole`, `staffId`, `organizationId`, `labId`, and the minimal Lab identity needed by request consumers. `staffId` is null for members without an operational identity, inactive staff, or any defensive cross-Lab mismatch. It never falls back to `AuthUser.labId` or uses `LabUser` to establish tenancy.

`requireTenantMiddleware` is a thin safe-action adapter that merges this verified context into `ctx`. The previous middleware name remains as a deprecated alias. The subsequent legacy role gate temporarily maps Member roles into fixed `LabRole` values; this compatibility map fails closed to `STAFF` and must be deleted when `requirePermission` becomes authoritative.

Existing `CaseActivityLog.actorId` points to `LabUser`, so the middleware also exposes a transitional actor containing an optional legacy LabUser ID. This lookup occurs only after tenant resolution and cannot grant access or alter the resolved Lab. Organization-only members receive a null legacy audit actor ID. `ctx.labUser` remains as a deprecated shape for unmigrated actions and must not be used by new code.

Tenant-context monitoring records safe resolution/rejection outcomes, reason codes, and latency. It excludes headers, cookies, tokens, email addresses, and raw provider/database errors.

### LabOS staff/member integration

LabOS links its operational `LabStaff` identity directly and optionally to Better Auth `Member` with `LabStaff.memberId @unique`. The Member is Organization-scoped, so an AuthUser can have one distinct staff identity in each Organization while owners/admins may have no staff identity and operational staff may exist without any account. `onDelete: SetNull` preserves staff history when membership is removed.

The integration service in `lib/staff-member-link` validates both sides against an already-resolved `{ organizationId, labId }` context before every write. Out-of-tenant identifiers are reported as not found, exact links/unlinks are idempotent, and the unique constraint is the final concurrency guard. This domain bridge is not owned by the generic Organizations module and cannot grant access; callers must perform authorization separately once the authorization module is available.

The tracked direct-reader cutover is complete: server pages, data functions, route handlers, uploads, cache keys, and the proxy routing hint no longer read `AuthUser.labId`. Deprecated action aliases and the legacy audit actor remain separate compatibility work; multi-Organization switching and cache-isolation verification are still required before declaring the entire tenancy milestone complete.

### Two-Organization regression boundary

`tests/unit/platform/organizations/two-organization-isolation.test.ts` models one AuthUser with distinct Member, Lab, and optional LabStaff identities in Organizations A and B. It verifies that changing `activeOrganizationId` changes the complete resolved tenant context; a missing membership in A never falls back to B; foreign staff/member IDs cannot be linked or invited through A; B intent cannot be consumed by an A invitation acceptance; and revoking membership/staff linkage in A preserves B.

These are deterministic service-contract tests and run without a database. They establish the platform isolation boundary but do not replace the remaining browser/database verification for the future Organization switcher and tenant-keyed cache invalidation.

### Organization invitations with optional LabStaff intent

Better Auth owns the invitation lifecycle and performs inviter permission checks plus recipient-bound acceptance. LabOS adds `LabStaffInvitationIntent` only when the invitation should connect the resulting Organization Member to an operational staff identity. The bridge contains no duplicate email, role, expiry, or status fields.

Creation and resend are tenant-scoped and idempotent. Acceptance re-verifies `Invitation.organizationId -> Lab.id == intent.labId`, delegates to the idempotent staff/member link service, and consumes intent only after the link succeeds. Failed post-accept linking retains intent for safe retry/reconciliation because Organization membership is already authoritative. Cancellation/rejection remove intent. Structured lifecycle telemetry contains safe resource IDs, outcomes, durations, and stable error codes, never email, cookies, headers, or invitation URLs.

Invitation links use `/invite/[invitationId]`. The public page preserves a safe relative callback through sign-in/sign-up, and the authenticated server calls Better Auth to verify recipient, status, and expiry before exposing acceptance. The current delivery mode is an authorized copyable link; automatic email delivery remains a separately tracked adapter.

## Definition of done

- [ ] Existing Labs and memberships reconcile one-to-one.
- [x] Fresh sessions restore a sole Organization and require explicit selection for multiple Organizations.
- [x] In-app Organization switching is available after entering the product.
- [x] Authenticated users can create an additional Organization + Lab from the
  product shell and selection page; creation, activation, switching,
  Team-directory isolation, and signed-out route protection are manually
  verified.
- [x] Switching changes resolved Lab context and tenant-keyed caches, including
  identifier-free cross-tab invalidation and full document reload.
- [ ] Cross-tenant and stale-membership tests pass.
- [ ] Onboarding retries cannot create duplicate Organizations or Labs.
- [x] The `LabStaffInvitationIntent` migration is applied.
- [ ] Invitation-intent data is reconciled after production use begins.
- [x] Invitation lifecycle has one authority and optional staff linking is idempotent.
- [ ] Invitation email delivery and failure monitoring are configured.
