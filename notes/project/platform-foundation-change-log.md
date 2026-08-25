# LabOS platform foundation — implementation change log

## Document control

| Field | Value |
|---|---|
| Branch | `feat/platform-foundation` |
| Recorded through | 2026-08-22 |
| Scope | Platform architecture, Organizations tenancy foundation, onboarding, tenant-context cutover, staff/member integration, and Organization invitations |
| Migration policy | Schema changes were prepared by Codex; migration creation/application was performed by the project owner |
| Current database status | `prisma migrate status` reports 45 migrations and an up-to-date database schema |

## Executive summary

LabOS has moved from a LabUser/AuthUser-lab-based tenancy model toward a reusable platform model built around Better Auth Organizations:

```text
AuthUser
   │
   ▼
Member ──────────────── optional ───────────────► LabStaff
   │                                               ▲
   ▼                                               │
Organization ── 1:1 ──► Lab              Invitation intent
   │
   ▼
activeOrganizationId
   │
   ▼
TenantContext { userId, memberId, memberRole, staffId?, organizationId, labId }
```

Better Auth now owns authentication, Organization membership, active-Organization selection, membership roles, and invitation lifecycle. LabOS resolves the selected Organization into its Lab domain tenant and retains only domain-specific data such as the optional relationship between an Organization Member and an operational LabStaff identity.

Legacy `LabUser`, `LabInvitation`, and `AuthUser.labId` schema fields have intentionally not been deleted. They remain compatibility artifacts until reconciliation, authorization cutover, and a measured zero-use window are complete.

## 1. Architecture and delivery process

The platform work was documented as a staged engineering migration rather than a single rewrite.

Created or updated documentation includes:

- `notes/architecture/platform-architecture-plan.md`: target platform architecture, boundaries, dependency rules, migration sequence, and architecture decisions.
- `notes/architecture/platform-delivery-process.md`: branch strategy, sprint workflow, review gates, Definition of Done, and release process.
- `notes/architecture/platform-modules/`: one architecture document per reusable platform module, including Auth, Organizations, Authorization, Events, Audit, Workflow, Notifications, Jobs, Files, API Keys, and Webhooks.
- `notes/project/milestones.md`: milestone register from baseline through platform hardening.
- `notes/project/risk-register.md`: tracked migration risks, triggers, mitigations, and contingencies.
- `notes/project/sprints/TEMPLATE.md`: reusable sprint planning/checklist template.
- `notes/project/tenant-context-migration-inventory.md`: file-by-file tenancy cutover record.
- `notes/architecture/labos-integrations/staff-member-bridge.md`: LabStaff/Member and invitation-intent integration contract.

The Git workflow uses the bounded foundation branch `feat/platform-foundation`. Events, Audit, Workflow, Case Workflow, and Notifications remain intended for smaller follow-up branches after this foundation is stable.

## 2. Better Auth Organizations foundation

### Server and client integration

- Enabled the Better Auth Organization plugin in `lib/auth.ts`.
- Enabled `organizationClient` in `lib/auth-client.ts`.
- Generated Better Auth Organization Prisma models and generated clients/schemas.
- Added Organization lifecycle hooks for accepted, canceled, and rejected invitations.
- Configured invitation expiry to 48 hours.
- Configured reinvites to cancel earlier pending invitations.

### Organization role boundary

The current Organization membership roles are:

| Role | Membership-management scope |
|---|---|
| `owner` | Better Auth owner permissions |
| `admin` | Better Auth administrator permissions |
| `manager` | Create/update/delete members and create/cancel invitations; cannot delete the Organization |
| `staff` | Ordinary member permissions; cannot manage members or invitations |

These roles govern Better Auth Organization administration only. They are not the final LabOS application-permission system. Application authorization remains scheduled for Authorization V1.

### Database migrations

| Migration | Purpose |
|---|---|
| `20260821181621_added_better_auth_orgnizations_support` | Better Auth Organization, Member, Invitation, and related Organization support |
| `20260821185304_link_lab_to_organization` | Unique Organization-to-Lab relationship |
| `20260821200152_link_labstaff_to_member` | Optional tenant-aware LabStaff-to-Member relationship |
| `20260821213743_add_labstaff_invitation_intent` | Optional LabStaff intent attached to a Better Auth invitation |

The database currently reports all migrations applied.

## 3. Organization ↔ Lab tenant relationship

`Lab` now has a unique required `organizationId` relationship to Better Auth `Organization`. This establishes the platform-to-domain boundary:

```text
Organization.id -> Lab.organizationId -> Lab.id
```

Important invariants:

- One Organization maps to one Lab in LabOS V1.
- One Lab belongs to one Organization.
- `organizationId` establishes the authenticated platform tenant.
- `labId` scopes LabOS domain queries.
- Client-supplied tenant identifiers are never authoritative.

The relationship uses cascade deletion at the database level, but Organization deletion must not be exposed without a dedicated destructive-operation policy, preview, typed confirmation, audit record, and recoverable backup.

## 4. Idempotent Organization + Lab onboarding

Added `platform/organizations/onboarding` with separated service, repository, Better Auth gateway, monitoring, types, and a current-user entry point.

The onboarding flow is now:

```text
Authenticated AuthUser
        │
        ▼
Create/resume Organization
        │
        ▼
Verify creator Member(owner)
        │
        ▼
Create/resume Lab linked by organizationId
        │
        ▼
Create LabSettings
        │
        ▼
Set active Organization after provisioning is complete
```

Implemented behavior:

- Globally unique Organization slug acts as the natural idempotency boundary.
- Repeated and concurrent calls re-read authoritative state instead of blindly duplicating resources.
- An Organization created by another user is rejected rather than adopted.
- Partial Organization-without-Lab state can be resumed safely.
- Active Organization is selected only after Organization and Lab provisioning succeeds.
- New onboarding does not create a `LabUser` or write `AuthUser.labId`.
- The onboarding action is exposed as `createLabWorkspace`.
- `createLabAndLabUser` remains only as a deprecated compatibility alias.
- The UI no longer collects or creates an operational staff identity during workspace onboarding.

Monitoring records correlation IDs, safe resource identifiers, provisioning step, result, duration, and stable error codes. Cookies, headers, tokens, emails, and raw provider errors are excluded.

## 5. Canonical runtime tenant context

Added `platform/organizations/tenant-context.ts` as the canonical request-scoped resolver.

Resolution path:

```text
session
  -> activeOrganizationId
  -> verify AuthUser Member in that Organization
  -> Organization
  -> linked Lab
  -> optional active LabStaff linked to the Member
  -> TenantContext
```

The canonical result is:

```ts
type TenantContext = {
  userId: string
  memberId: string
  memberRole: string
  staffId: string | null
  organizationId: string
  labId: string
  lab: {
    id: string
    title: string
    slug: string | null
  }
}
```

Failure modes use stable codes for unauthenticated sessions, missing active Organization, missing Organization, missing membership, and an Organization without a linked Lab. The resolver never falls back to `AuthUser.labId` or `LabUser.labId`.

`requireTenantMiddleware` is now the safe-action tenancy adapter. `requireLabMiddleware` remains as a deprecated alias only. The temporary role middleware maps Better Auth Member roles to legacy `LabRole` values until Authorization V1 replaces role hierarchy checks.

Tenant monitoring records resolution/rejection outcomes and latency without recording identity secrets or request credentials.

## 6. Tenant-context application cutover

Direct tenant readers were migrated across the tracked application surface.

### Main pages

- Cases
- Clinics
- Team
- Catalog and catalog alternate page
- Invoices list
- New invoice
- Invoice details
- Invoice editing
- Main protected layout

### Server data functions

- Cases
- Clinics
- Dentists
- Invoice list, dossier, and new-invoice data
- Staff
- Team dossier and case header data
- Lab data

### Route and infrastructure consumers

- Dentist API route
- UploadThing authorization
- Cache/data tenant helpers
- Proxy onboarding routing hint

Removed tenancy helpers:

- `getLabIdSession`
- `CheckLabIsolation`
- Proxy fallback to `AuthUser.labId`

The proxy may use `activeOrganizationId` as a routing hint only. Protected layouts, actions, data access, and route handlers still perform authoritative tenant resolution.

## 7. LabStaff ↔ Better Auth Member redesign

`LabStaff.memberId` is nullable and unique and points to `Member.id` using `onDelete: SetNull`.

Supported identity states:

| Operational staff | Organization Member | Meaning |
|---|---|---|
| Yes | No | Worker without application access |
| No | Yes | Owner/admin/account without an operational staff role |
| Yes | Yes | Tenant member connected to an operational staff identity |

The bridge in `lib/staff-member-link` provides documented, monitored, idempotent link and unlink services.

Security and integrity behavior:

- Both staff and member are resolved inside the trusted `{ organizationId, labId }` context.
- Cross-tenant identifiers fail closed without disclosing foreign records.
- Exact existing links are treated as successful retries.
- Conflicting staff/member links are rejected.
- Compare-and-set writes plus database uniqueness protect concurrent linking.
- Removing Organization membership preserves LabStaff, assignments, commissions, payouts, and operational history.
- `TenantContext.staffId` is returned only for an active, same-Lab staff link.

## 8. Better Auth invitations with optional LabStaff intent

Better Auth `Invitation` is now authoritative for email, Organization role, lifecycle status, expiry, inviter, and acceptance. LabOS stores only optional domain intent:

```text
Invitation ── 0..1 LabStaffInvitationIntent ──► LabStaff
     │ accepted
     ▼
   Member ─────────────────────────────────────► LabStaff.memberId
```

### Creation and resend

Added `createStaffOrganizationInvitation()` with the following behavior:

- Verifies the LabStaff belongs to the active Lab.
- Rejects staff already linked to a Member.
- Rejects `OWNER` invitations through the staff-invitation workflow.
- Normalizes recipient email and maps the requested Lab role to the Organization role.
- Treats an exact pending invitation retry as a Better Auth resend.
- Cancels/replaces an earlier pending invitation when email or role changes.
- Persists only the optional `LabStaffInvitationIntent` bridge.
- Attempts narrow cancellation compensation if intent persistence fails.
- Records structured lifecycle telemetry without email, cookies, headers, or invitation URLs.

Staff registration and “grant system access” now call this service and no longer create new legacy `LabInvitation` rows.

### Acceptance

Added:

- `/invite/[invitationId]` public invitation route.
- Authenticated server-side invitation lookup.
- Recipient acceptance action using Better Auth.
- Safe sign-in/sign-up callback preservation.
- Post-accept LabStaff linking hook plus explicit idempotent reconciliation retry.

Better Auth validates the authenticated recipient, pending status, expiry, and membership creation. LabOS then verifies that the invitation Organization owns the intended Lab before linking the resulting Member to LabStaff.

Intent is deleted only after successful staff/member linking. If linking fails after Better Auth has committed membership, the valid membership is preserved and intent remains for retry/reconciliation.

Invitations without LabStaff intent continue to work as ordinary Organization invitations.

### Cancellation and revocation

- Better Auth cancellation/rejection hooks clean optional intent.
- Staff access revocation cancels a pending Better Auth invitation or delegates active access to `revokeStaffOrganizationAccess()`.
- Active revocation removes the tenant-specific Organization Member first, then calls the existing idempotent staff unlink service to verify tenant-scoped cleanup.
- `Member` deletion's `onDelete: SetNull` behavior remains the database integrity backstop for `LabStaff.memberId`.
- Membership-removal failure prevents staff unlinking; a post-removal verification failure keeps access revoked and returns `pending_reconciliation` with structured monitoring.
- Revocation prevents self-lockout.
- Only an Organization owner may revoke another owner.
- The global AuthUser and sessions serving other Organizations are preserved.
- Staff records and operational history are preserved.

### Current delivery limitation

The authorized inviter currently receives a copyable invitation link from the existing UI. Automatic email delivery is not configured. A future delivery adapter must implement Better Auth's `sendInvitationEmail`, retry failures, and emit delivery metrics without logging invitation IDs or recipient addresses.

## 9. Security, performance, and monitoring improvements

Security controls introduced or strengthened:

- Tenant identity comes from the authenticated active Organization, never client input.
- Membership is revalidated from the database on protected requests.
- Cross-tenant staff/member and invitation-intent relationships fail closed.
- Unknown Organization roles map to the least-privileged temporary role.
- Staff invitation workflow cannot grant owner access.
- Invitation lookup gives the same user-facing response for expired, consumed, invalid, or wrong-recipient invitations.
- Authentication error logging no longer emits raw Better Auth errors.
- Callback URLs accept only safe relative application paths, preventing external open redirects.
- Access revocation no longer deletes a global AuthUser or all of their sessions.

Performance and reliability measures:

- Tenant resolution is request-cached with React `cache()`.
- Organization, membership, optional staff identity, and Lab are resolved through a narrow query contract.
- Tenant-relevant indexes and unique constraints protect common lookups and concurrency boundaries.
- Onboarding and staff/member operations are idempotent.
- Invitation creation uses narrow compensation rather than broad rollback behavior.
- Post-accept failures retain repairable intent instead of silently losing state.

Monitoring added for:

- Organization/Lab onboarding steps and latency.
- Tenant-context resolution and rejection reasons.
- Staff/member link and unlink outcomes.
- Staff access revocation completion, partial verification, and failure phase.
- Staff invitation create, resend, accept, link, cleanup, and failure outcomes.

Monitoring intentionally excludes cookies, session headers, tokens, recipient emails, raw database/provider errors, and stack traces from structured events.

## 10. Tests and verification

The focused platform verification suite currently passes:

- 11 test files.
- 65 tests.
- Organization onboarding tests.
- Tenant-context and legacy-role compatibility tests.
- Data tenant-context tests.
- Staff/member linking and concurrency tests.
- Invitation creation, resend, replacement, compensation, acceptance, tenant mismatch, and reconciliation tests.
- Organization manager/staff permission-boundary tests.
- Membership-first access revocation, idempotent staff unlink verification, and partial-reconciliation tests.
- Legacy tenancy write-freeze architecture test.
- Two-Organization isolation, resolver switching, invitation, acceptance, and revocation tests.

### Two-Organization test matrix

| Scenario | Enforced result |
|---|---|
| Same AuthUser switches active Organization A → B | Member, Lab, and optional staff context all switch to B |
| Active Organization A membership is missing while B exists | Request fails; no fallback to B |
| Organization B staff/member IDs are submitted under A | Link fails closed; no write occurs |
| Organization B staff is invited through A | Invitation is rejected before Better Auth create call |
| Organization A acceptance carries Lab B staff intent | Acceptance linkage fails; intent remains unconsumed |
| Organization A membership is revoked | Organization B membership and staff link remain unchanged |

This suite validates platform service contracts without a live database. Browser-level Organization switching and cache-isolation verification remain open M2 exit items.

Additional verification:

- Changed invitation/platform files pass ESLint.
- `prisma validate` passes.
- Prisma Client and generated Zod schemas were regenerated.
- `prisma migrate status` reports the database schema is up to date.
- Searches found no new `labInvitation.create` or `labInvitation.upsert` calls in the migrated application paths.

Full `tsc --noEmit` is not yet green because of pre-existing application DTO problems unrelated to this migration:

- Prisma `Decimal` values are returned where DTOs require JavaScript numbers.
- Case work-item composer/server-helper results omit required `addons` fields.

No TypeScript errors from the new Organization, onboarding, tenant-context, staff/member, or invitation implementation remain in the latest check.

## 11. Compatibility retained intentionally

### Legacy write freeze

All application writes to `LabInvitation`, `LabUser`, and `AuthUser.labId` are now stopped.

The final writer was staff deactivation. It previously set `LabUser.isActive = false` and deleted every session belonging to the global AuthUser. It now:

1. Verifies the staff record and active workload inside the resolved Lab.
2. Applies shared self-lockout and owner-seat protections.
3. Removes the Better Auth Organization membership, or cancels pending Organization invitation intent.
4. Calls the idempotent LabStaff/Member unlink path.
5. Marks only the operational LabStaff record inactive.
6. Preserves the global AuthUser and sessions that may serve other Organizations.

Membership removal occurs before staff deactivation so a partial failure cannot leave an inactive staff record with active tenant access. The workload check is repeated before the staff update to detect concurrent assignment. If a new assignment appears after membership removal, access remains safely revoked and the action reports that operational reconciliation is required.

`tests/unit/architecture/legacy-tenancy-write-freeze.test.ts` scans application source through the TypeScript AST and fails on direct Prisma mutations of `LabUser` or `LabInvitation`, `AuthUser` mutations assigning `labId`, and raw SQL mutations targeting those legacy tenant structures.

The legacy Better Auth `AuthUser.labId` additional field is configured with `input: false`, so sign-up/update API input cannot repopulate it while the column remains readable for compatibility. The architecture test also enforces this configuration until the column is removed.

The following remain and must not be deleted yet:

- `LabUser` model and relations.
- `LabInvitation` model and historical rows.
- `AuthUser.labId` schema field.
- Deprecated `createLabAndLabUser` action alias.
- Deprecated `requireLabMiddleware` alias.
- Transitional `ctx.labUser`/legacy audit actor compatibility.
- Temporary Better Auth role-to-`LabRole` mapping and numeric role middleware.

No new code may write these legacy structures or use `AuthUser.labId`, `LabUser.labId`, or deprecated helpers to establish tenancy. Historical reads remain temporarily available for legacy audit display and reconciliation only.

## 12. Current milestone status

### M1 — Organization foundation

- [x] Better Auth Organizations schema and plugin.
- [x] Organization ↔ Lab relationship.
- [x] Idempotent onboarding service.
- [x] New onboarding flow cut over.
- [ ] Deterministic production backfill/reconciliation report.
- [x] Active-Organization login restoration and routing regression suite.

### M2 — Tenant-context cutover

- [x] Canonical resolver.
- [x] Safe-action middleware.
- [x] Protected layout guard.
- [x] Direct page/data/route consumer cutover.
- [ ] Multi-Organization switching UX and tests.
- [ ] Cache-isolation verification.
- [ ] Remove remaining compatibility actor/middleware aliases.

### M3 — Membership replacement

- [x] New onboarding avoids LabUser creation.
- [x] LabStaff ↔ Member schema and migration.
- [x] Guarded, idempotent link service.
- [x] Tenant-context operational staff identity.
- [x] Better Auth invitation implementation and tests.
- [x] LabStaff invitation-intent migration applied.
- [x] Membership removal plus idempotent staff unlink revocation.
- [x] New LabInvitation, LabUser, and AuthUser.labId writes frozen by architecture test.
- [ ] Email delivery adapter.
- [ ] Outstanding legacy invitation reconciliation.
- [x] Remove remaining legacy LabUser/LabInvitation/AuthUser.labId write paths.

## 13. Next recommended work

Before beginning Authorization V1, complete a short foundation verification sprint:

1. Test new Organization + Lab onboarding through the real UI.
2. Invite an existing LabStaff record, authenticate as the invited email, and accept the invitation.
3. Confirm `Member.organizationId`, `LabStaff.memberId`, active Organization selection, and tenant resolution.
4. Test invitation resend, changed-role replacement, expiry, cancellation, wrong-recipient access, and membership revocation.
5. Test one AuthUser switching between two Organizations and verify Lab-scoped caches/data never cross.
6. Produce reconciliation reports for legacy LabUser and LabInvitation rows.
7. Fix the pre-existing TypeScript DTO failures so the full compiler becomes a reliable merge gate.

After that checkpoint, begin Authorization V1 on a dedicated bounded branch and replace temporary role hierarchy checks with permission-based policies.

## 14. Primary implementation locations

| Area | Location |
|---|---|
| Better Auth configuration | `lib/auth.ts`, `lib/auth-client.ts` |
| Organization access roles | `platform/auth/organization-access.ts` |
| Organization/Lab onboarding | `platform/organizations/onboarding/` |
| Tenant context | `platform/organizations/tenant-context.ts` |
| Organization resolver | `platform/organizations/organization.service.ts` |
| Safe-action tenant middleware | `lib/safe-action.ts` |
| Staff/member bridge | `lib/staff-member-link/` |
| Staff access revocation | `lib/staff-access-revocation/` |
| Legacy write-freeze guard | `tests/unit/architecture/legacy-tenancy-write-freeze.test.ts` |
| Staff invitation bridge | `lib/staff-invitation/` |
| Invitation acceptance action | `actions/invitations/accept-organization-invitation.ts` |
| Invitation acceptance page | `app/(public)/invite/[invitationId]/page.tsx` |
| Database schema | `prisma/schema.prisma` |
| Platform tests | `tests/unit/platform/`, `tests/unit/lib/staff-member-link/`, `tests/unit/lib/staff-invitation/` |
| Architecture and project tracking | `notes/architecture/`, `notes/project/` |
