# Tenant-context migration inventory

**Status:** Direct-reader cutover complete
**Authoritative replacement:** `requireTenantContext()`
**Rule:** No new code may read `session.user.labId`, `user.labId`, `LabUser.labId`, `getLabIdSession`, or `CheckLabIsolation` to establish tenancy.

The canonical resolver, safe-action middleware, server pages, data functions, route handlers, and uploads now resolve through active Organization membership. The proxy uses `activeOrganizationId` only as a routing hint; protected layouts and handlers perform authoritative tenant validation.

## Batch A — Main application pages

- [x] `app/(main)/cases/page.tsx`
- [x] `app/(main)/clinics/page.tsx`
- [x] `app/(main)/team/page.tsx`
- [x] `app/(main)/catalog/page.tsx`
- [x] `app/(main)/catalog/_page.tsx`
- [x] `app/(main)/invoices/page.tsx`
- [x] `app/(main)/invoices/new-invoice/page.tsx`
- [x] `app/(main)/invoices/[invoiceId]/page.tsx`
- [x] `app/(main)/invoices/[invoiceId]/edit/page.tsx`

## Batch B — Server data functions

- [x] `data/cases/get-case.ts`
- [x] `data/clinics/get-clinic.ts`
- [x] `data/dentists/get-dentist.ts`
- [x] `data/invoices/get-invoices.ts`
- [x] `data/invoices/get-invoice-dossier.ts`
- [x] `data/invoices/get-new-invoice-data.ts`
- [x] `data/staff/get-staff.ts`
- [x] `data/team/get-staff-dossier.ts`
- [x] `data/team/get-staff-cases-header-data.ts`
- [x] `data/lab.ts`

## Batch C — Route and upload handlers

- [x] `app/api/dentists/[dentistId]/route.ts`
- [x] `app/api/uploadthing/core.ts`

## Batch D — Retire compatibility helpers

- [x] Replace and remove `getLabIdSession` from `lib/get-session.ts`.
- [x] Replace and remove `CheckLabIsolation` from `lib/get-session.ts`.
- [x] Remove the `AuthUser.labId` routing fallback from `proxy.ts`.
- [ ] Remove deprecated `requireLabMiddleware` alias.
- [ ] Replace `ctx.labUser` with `ctx.actor` in remaining actions.
- [ ] Remove legacy actor compatibility after generic AuditLog migration.

## Legacy tenancy write freeze

- [x] No application path creates or mutates `LabInvitation`.
- [x] No application path creates, updates, or deletes `LabUser`.
- [x] No application path writes `AuthUser.labId`.
- [x] Better Auth exposes legacy `AuthUser.labId` as `input: false` while the column remains.
- [x] Staff deactivation revokes Better Auth Organization access instead of mutating `LabUser` or deleting global sessions.
- [x] `tests/unit/architecture/legacy-tenancy-write-freeze.test.ts` blocks direct Prisma and raw-SQL regressions.

Historical reads remain permitted only for audit display and transitional actor compatibility. The schema and historical rows remain untouched until reconciliation and the legacy-removal milestone.

## Verification checklist for every batch

- [x] Tenant comes only from `requireTenantContext()` in migrated readers.
- [x] Client-supplied resource IDs are queried inside resolved tenant scope.
- [x] Query/cache keys use resolved `labId` or `organizationId`.
- [x] Two-Organization tests cover active switching plus foreign staff, Member, invitation intent, and revocation boundaries.
- [ ] Rejection reason and latency remain observable without sensitive data.
- [ ] No migration or data backfill is executed without explicit approval.
