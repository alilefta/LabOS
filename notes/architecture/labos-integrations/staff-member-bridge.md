# LabStaff ↔ Better Auth Member integration

## Purpose

Keep operational identity separate from application access while supporting an optional, tenant-aware connection between them.

```text
AuthUser
  ├─ Member (Organization A) ── optional ── LabStaff (Lab A)
  └─ Member (Organization B) ── optional ── LabStaff (Lab B)
```

Valid states are:

- `LabStaff` without `Member`: an operational worker who has no application account.
- `Member` without `LabStaff`: an owner, administrator, or other account without an operational job.
- `Member` with `LabStaff`: an account with a tenant-specific operational identity.

## Data model

`LabStaff.memberId` is nullable and unique. It references `Member.id` with `onDelete: SetNull`; removing membership never deletes staff, assignments, commissions, or history. The legacy `LabUser` and `LabInvitation` relations remain during migration and receive no new responsibility.

The direct relation is appropriate while one Organization maps to one Lab and only the current link is required. If link/unlink history becomes auditable product data, replace it with a temporal bridge table while preserving the service contract.

## Integrity boundary

The database enforces one-to-one cardinality but cannot prove the cross-model tenant equation:

```text
Member.organizationId == Lab.organizationId
LabStaff.labId == Lab.id
```

`lib/staff-member-link` therefore requires a server-resolved `{ organizationId, labId }` context, scopes both lookups to it, and only then writes the link. Client-provided tenant identifiers must never be passed directly. Cross-tenant identifiers return the same not-found errors as missing identifiers to avoid existence disclosure.

The service is idempotent for an exact existing link or unlink. Conflicting existing links fail closed. Writes use a compare-and-set predicate on the previously observed `memberId`, and the unique constraint handles competing Members; after a write failure, the service re-reads state and accepts only the exact intended link.

The service does not authorize callers. Until `AuthorizationService` exists, it must only be invoked from a trusted server path with an explicit management gate. Invitation acceptance calls the same service after Better Auth has established the Member and verified the invitation Organization.

## Organization invitation bridge

Better Auth `Invitation` is the only authority for recipient email, Organization role, pending/accepted/rejected/canceled status, and expiry. `LabStaffInvitationIntent` stores only the optional tenant-scoped intention to link a successful membership to an existing `LabStaff` row:

```text
Better Auth Invitation ── 0..1 intent ── LabStaff
         │ accepted                         │
         └──────── creates Member ──────────┘
```

The bridge uses a unique invitation ID and a composite `(labStaffId, labId)` relation. Creation verifies the staff row belongs to the already-resolved Lab and that `Lab.organizationId` is the active Organization. An exact retry asks Better Auth to resend; changing email or role cancels the old pending invitation before creating the replacement. If intent persistence fails, the service attempts to cancel the newly created invitation as narrow compensation.

Acceptance is recipient-authorized by Better Auth. The post-accept hook rechecks `Organization -> Lab`, links through the idempotent staff/member service, and only then deletes intent. Better Auth has already committed membership before its post-accept hook runs, so a bridge failure must not roll back or hide valid Organization access: intent remains for explicit acceptance-action retry and later reconciliation. Invitations without intent are normal Organization invitations.

Cancellation and rejection clean intent. The staff access revocation action now cancels a pending Better Auth invitation or delegates active access to `revokeStaffOrganizationAccess()`. That service removes the Organization Member first and then calls the existing idempotent staff unlink service as an explicit tenant-scoped verification. The database `onDelete: SetNull` relation remains the integrity backstop. It preserves the global AuthUser, sessions that may serve other tenants, LabStaff, and operational history.

If membership removal fails, staff unlinking is not attempted. If membership removal succeeds but unlink verification cannot complete, access remains revoked and the service returns `pending_reconciliation` with a structured partial-outcome event. This ordering prevents the more dangerous partial state where operational identity is detached while Organization access remains active.

The current product surface delivers invitation links by showing the authorized inviter a copyable URL. No email transport is configured yet. A later notification adapter must implement Better Auth's `sendInvitationEmail` callback, redact the opaque invitation ID from telemetry, and record delivery/retry outcomes before the project claims automatic invitation email delivery.

## Runtime context

`TenantContext.staffId` is nullable. It is populated only when the active Member links to an active LabStaff record in the resolved Lab. A cross-Lab mismatch or inactive staff record produces null, so operational policies cannot accidentally use a stale or corrupted link.

## Deferred unified People directory

The current product intentionally has two distinct read surfaces. `/team` is rooted in `LabStaff` and represents operational people, including Staff who have no account. `/settings/team` is rooted in Better Auth `Member` and represents digital workspace access, including owners/admins who have no Staff profile. Neither list is complete as a universal People directory by itself.

A future `/team` redesign may compose both sources, but it must preserve these identity states rather than converting one model into the other:

- `LabStaff` only: operational person without application access.
- `Member + AuthUser` only: digital workspace participant without an operational job.
- Linked `Member + AuthUser + LabStaff`: one person rendered once with both access and operational facts.

The join key is the optional tenant-scoped `LabStaff.memberId` bridge. Email, name, or AuthUser ID must never be used as an inferred join. Staff and membership mutations remain separate authorized operations, and the composed reader requires independent Organization/Lab predicates plus two-Organization isolation tests. This feature is documented but deliberately not implemented during the Authorization V1 milestone.

## Monitoring and tests

Structured events record operation, outcome, safe IDs, duration, and stable error code. They exclude names, email addresses, tokens, headers, raw database errors, and stack traces.

Focused tests cover staff-only, member-only, exact links, both one-to-one conflicts, cross-tenant not-found behavior, concurrent writes, unlink preservation, inactive staff, defensive cross-Lab suppression, invitation creation/resend/replacement, compensation, intent-free acceptance, acceptance linking, cross-tenant rejection, reconciliation retention, membership-first revocation ordering, foreign-key unlink idempotency, and partial revocation monitoring.

## Migration checklist

- [x] Add nullable unique `LabStaff.memberId` relation in Prisma schema.
- [x] User creates and applies the LabStaff/Member migration.
- [x] Generate the Prisma client.
- [x] Add guarded link/unlink service, monitoring, and tests.
- [x] Expose the optional active `staffId` through tenant context.
- [ ] Link the disposable test tenant's intended staff record, if applicable.
- [ ] Reconcile link cardinality and tenant consistency.
- [x] Migrate invitation creation and acceptance to Better Auth Invitation plus this service.
- [x] Replace legacy access revocation with Organization membership removal plus explicit idempotent staff unlink verification.
- [x] Stop new `LabInvitation` creation in staff onboarding and grant-access actions.
- [x] User creates and applies the `LabStaffInvitationIntent` migration.
- [ ] Configure and verify an invitation email delivery adapter.
- [ ] Reconcile outstanding legacy `LabInvitation` rows before legacy removal.
- [x] Stop all new `LabUser`, `LabInvitation`, and `AuthUser.labId` writes and enforce the freeze with an architecture test.
