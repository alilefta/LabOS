# A-097 public statement capability — design candidate

Status: Accepted design and unchanged migration candidate; full-history disposable SQL rehearsal PASS; A-097/N-FIN-PL-001 implementation accepted PASS_WITH_LIMITATIONS; combined M4/F3 integration CLOSED | PASS_WITH_LIMITATIONS. Shared installation pending.  
Authority: Product Owner approved schema direction and bounded implementation; no shared installation  
Scope: M4/F3 A-097 handoff and the shared public-statement capability boundary

## Subsequent disposition — 2026-11-14

The [schema and migration verification](../../evidence/financials/authorization-v1/a097/schema-migration-verification.md) records the later faithful full-history disposable PostgreSQL rehearsal and independent V3 `PASS | RUNTIME_EVIDENCE`, resolving the earlier exact-grantor fixture gate without changing historical migrations or the candidate SQL. The [sharing implementation evidence](../../evidence/financials/authorization-v1/a097/public-link-implementation-verification.md) records independent V3 `PASS | CODE + RUNTIME_EVIDENCE`; the [Product Owner acceptance](../../evidence/financials/authorization-v1/a097/final-acceptance-gaps.md) retains its limitations. The [combined integration rerun](../../evidence/financials/authorization-v1/f3-invoice-lifecycle-integration/presentation-correction-rerun.md) is Product Owner `CLOSED | PASS_WITH_LIMITATIONS | AUTHENTICATED_BROWSER + DISPOSABLE_POSTGRESQL`. The candidate remains uninstalled on a selected shared database, with target-specific ledger, drift, privilege, and deployment checks pending.

The remainder records the original design-time state, proposal, and review chronology. Its `CORRECTION_REQUIRED` finding, then-current token behavior, and approval gate are historical findings, not claims about the accepted implementation today.

## Historical design and review record

The earlier V3 `PASS | CODE` covered the representative design before the
Product Owner's `Timestamptz(6)` correction. The new independent V3 review
confirmed the generated candidate and focused disposable evidence but returned
`CORRECTION_REQUIRED | CODE + RUNTIME_EVIDENCE`: the repository's complete
migration history has an unmet pre-existing exact-grantor fixture requirement.

## Authority and current behavior

The Product Owner approved a LabOS-owned `InvoicePublicLinkAudit` direction and
`invoice.public_link.share` permission, but gated implementation on an exact
schema/migration design and independent V3 architecture/SQL review. The accepted
financial boundary separates bearer issuance/disclosure from `invoice.create`,
`invoice.update`, `invoice.read`, and `invoice.list`.

Today `Invoice.publicToken` is nullable, unique, and has a Prisma `cuid()`
default. Both `createInvoiceAction` and `updateDraftInvoiceAction` explicitly
write `null` on DRAFT or a UUID on SENT, set expiry to the start of the current
day plus 90 days, and return the token. A raw Invoice create that omits the
field can still obtain a CUID by default. The public route accepts only a UUID
and finds active status (`SENT`, `PARTIAL`, `PAID`, `OVERDUE`) with
`publicLinkExpiresAt >= now`; it returns generic not-found otherwise. The
public statement DTO is unchanged by this design.

The direct action consumers are `EditInvoiceClient` and `NewInvoiceClient`.
Both pass the returned token to `InvoiceSuccessShareModal`, which builds,
copies, and WhatsApp-shares `/statement/[token]`. The existing
`StatementSharingBox` is a source component with no active import found in the
current application paths. No ordinary Invoice list/dossier handoff should be
used to supply the token.

## Proposed data contract

Add `InvoicePublicLinkAudit` and one static event enum. Rows are append-only
records of **committed successful** capability events. `ISSUED` means a new
UUID token and expiry were first stored; `DISCLOSED` means the authorized
sharing action committed its audit prerequisite before attempting to return
the bearer. It does not prove client receipt. A first share
inserts both rows under one server correlation ID in the same transaction.
Reusing a valid legacy or previously issued token inserts only `DISCLOSED`.
No row claims issuance/disclosure on denial or confirmed transaction rollback.
If the database commits but the response is lost, the row remains valid audit
evidence and the client may retry. Authorization denials still emit sanitized
authorization telemetry; it is not the business audit.

Prisma candidate (all shown schema additions are **unapplied**):

```prisma
enum InvoicePublicLinkAuditEvent {
  ISSUED
  DISCLOSED
}

model InvoicePublicLinkAudit {
  id            String                      @id @default(uuid())
  organizationId String
  labId          String
  invoiceId      String
  actorMemberId  String
  correlationId  String
  event          InvoicePublicLinkAuditEvent
  expiresAt      DateTime                    @db.Timestamptz(6)
  createdAt      DateTime                    @default(now()) @db.Timestamptz(6)

  organization Organization @relation(fields: [organizationId], references: [id], onDelete: Restrict, onUpdate: NoAction)
  lab          Lab          @relation(fields: [labId, organizationId], references: [id, organizationId], onDelete: Restrict, onUpdate: NoAction)
  invoice      Invoice      @relation(fields: [invoiceId, labId], references: [id, labId], onDelete: Restrict, onUpdate: NoAction)

  @@unique([correlationId, event])
  @@index([organizationId, labId, createdAt])
  @@index([invoiceId, createdAt])
  @@index([actorMemberId, createdAt])
}
```

The migration also adds `Invoice @@unique([id, labId])` for the composite
audit foreign key, reciprocal relation arrays on `Invoice`, `Lab`, and
`Organization`, and removes `@default(cuid())` from nullable
`Invoice.publicToken`. The historical migration shows no database default on
that column; CUID generation is a Prisma client default. Removing it is a
Prisma schema/client change, with no expected `DROP DEFAULT` SQL. A target
with a non-null database default has drift and must stop. The migration does
**not** rewrite any existing Invoice or token.

The existing `Lab @@unique([id, organizationId])` supports the audit's
tenant link. `actorMemberId` is an immutable verified-Member ID snapshot,
intentionally without a Member FK so later membership removal cannot erase or
block historical audit retention. The action verifies canonical membership
before insert. There are no tokens, URLs, patient fields, amounts, or notes.

`Restrict` prevents deletion of an Invoice/Lab/Organization with audit history.
This is a deliberate retention rule to review before migration application;
no current A-097 path deletes an issued Invoice.

The exact generated migration is
`prisma/migrations/20261107230000_invoice_public_link_audit/migration.sql`.
Prisma generated the enum, table, indexes, composite Invoice unique index,
and three foreign keys. A `BEGIN`/`COMMIT` wrapper was added for atomic
failure rollback. It contains no data rewrite, DROP, or privilege statement.
The [schema verification packet](../../evidence/financials/authorization-v1/a097/schema-migration-verification.md)
records the checksum, disposable tests, and the pre-existing full-history
migration-role prerequisite that remains unresolved on plain PostgreSQL.
The earlier representative SQL below is superseded by that exact file; its
foreign-key names and ordering differed from Prisma output.

```sql
CREATE TYPE "InvoicePublicLinkAuditEvent" AS ENUM ('ISSUED', 'DISCLOSED');
CREATE UNIQUE INDEX "Invoice_id_labId_key" ON "Invoice"("id", "labId");
CREATE TABLE "InvoicePublicLinkAudit" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "labId" TEXT NOT NULL,
  "invoiceId" TEXT NOT NULL,
  "actorMemberId" TEXT NOT NULL,
  "correlationId" TEXT NOT NULL,
  "event" "InvoicePublicLinkAuditEvent" NOT NULL,
  "expiresAt" TIMESTAMPTZ(6) NOT NULL,
  "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "InvoicePublicLinkAudit_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "InvoicePublicLinkAudit_invoice_fkey" FOREIGN KEY ("invoiceId", "labId") REFERENCES "Invoice"("id", "labId") ON DELETE RESTRICT ON UPDATE NO ACTION,
  CONSTRAINT "InvoicePublicLinkAudit_lab_fkey" FOREIGN KEY ("labId", "organizationId") REFERENCES "Lab"("id", "organizationId") ON DELETE RESTRICT ON UPDATE NO ACTION,
  CONSTRAINT "InvoicePublicLinkAudit_organization_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE RESTRICT ON UPDATE NO ACTION
);
CREATE UNIQUE INDEX "InvoicePublicLinkAudit_correlationId_event_key" ON "InvoicePublicLinkAudit"("correlationId", "event");
CREATE INDEX "InvoicePublicLinkAudit_organizationId_labId_createdAt_idx" ON "InvoicePublicLinkAudit"("organizationId", "labId", "createdAt");
CREATE INDEX "InvoicePublicLinkAudit_invoiceId_createdAt_idx" ON "InvoicePublicLinkAudit"("invoiceId", "createdAt");
CREATE INDEX "InvoicePublicLinkAudit_actorMemberId_createdAt_idx" ON "InvoicePublicLinkAudit"("actorMemberId", "createdAt");
```

## Registered operation and authorization

Reserve a new named boundary such as `N-FIN-PL-001`; do not take A-098, which
already belongs to onboarding. Its schema accepts only an Invoice UUID. The
registry owns the schema, fixed `invoice.public_link.share` permission,
identifier-only `{ type: 'invoice', id }` target, and closed
`{ kind: 'invoice.public_link.share' }` intent. Add the permission to the
catalog, reviewed V1 supported set, resource-critical definition with an
`invoice.public_link.share` policy, and the fixed Owner/Admin/Manager bundles.
Staff and unknown roles have no grant. Reuse the Invoice Organization resolver;
the policy loads only active status, ownership, and minimal eligibility facts.
The action may access tenant Prisma only after V1 authorization. No token,
expiry, financial value, or free-form input enters the policy request or
authorization telemetry. No legacy role fallback or enforcement-mode change.

## State and transaction contract

The action is an explicit user-initiated share request. In a Serializable
transaction, lock the exact Invoice row using a parameterized Prisma raw
query, `SELECT "id" FROM "Invoice" WHERE "id" = ${invoiceId} AND
"labId" = ${labId} FOR UPDATE`, where both interpolation values come from
validated input and trusted tenant context. An empty result denies. Then
reload the Invoice through tenant-scoped Prisma. Recheck the
Organization-linked Lab, `isActive`, and status in
`SENT|PARTIAL|PAID|OVERDUE`. Use the server's current time. Revalidate the
canonical actor Member before writing the audit. Never use client-supplied
tenant, token, state, or expiry facts.

| Current token/expiry | Result |
| --- | --- |
| Both null | Generate one UUID; set expiry with the established `startOfDay(now) + 90 days` rule; insert `ISSUED` and `DISCLOSED`; commit; return the token and expiry. |
| UUID and unexpired (`expiresAt >= now`) | Keep both values unchanged; insert `DISCLOSED`; commit; return the same token and expiry. This includes pre-migration links. |
| Expired, malformed/non-UUID, or token/expiry mismatch | Deny with a safe error. Do not rotate, extend, clear, or disclose. Renewal/remediation is outside this contract. |
| Inactive, DRAFT, or CANCELLED | Deny before any token or audit mutation. |

The Invoice expiry remains `TIMESTAMP(3)`. Disposable PostgreSQL tests showed
Prisma writes and reads it as a UTC wall value and the existing `>=` eligibility
predicate agrees in UTC and Asia/Baghdad sessions. A direct Prisma Date
parameter inserted into `TIMESTAMPTZ(6)` under Asia/Baghdad shifted the epoch
by three hours. The faithful snapshot must therefore be written from the
authoritative Invoice column in SQL as
`"publicLinkExpiresAt" AT TIME ZONE 'UTC'`, within the same transaction and
without a client Date parameter. That expression produced the same epoch in
both tested sessions. Both sharing and the unchanged public reader use
`publicLinkExpiresAt >= now`. The public reader retains its current DTO. A link
can become unusable after sharing if another authorized
operation later cancels the Invoice; sharing does not promise future status.

The `SELECT ... FOR UPDATE` row lock serializes first-share requests and
lifecycle updates on the Invoice; a Prisma `findUnique` alone does not lock.
The disposable concurrency test must exercise this exact lock statement with
real overlapping transactions. A competing request that began on an older
Serializable snapshot may
receive a serialization conflict; retry at most twice with a fresh transaction
and full state revalidation only for a recognized serialization abort. Retain
the request correlation ID across attempts. It then sees the winning token and
records only
`DISCLOSED`. Never retry after an explicit ineligible/expired decision. Token
uniqueness remains enforced by the existing unique column. The server creates
a fresh correlation ID for each network request; the client cannot supply it.
A client retry after a lost response therefore reuses the token and adds a
new `DISCLOSED` row. If an internal retry encounters an already committed
`DISCLOSED` row with the **same** correlation ID, it first verifies the audit
row's actor, Invoice, and tenant, then rechecks current eligibility, token,
and expiry; it returns that token without inserting a duplicate row. The
unique `(correlationId, event)` key is the final idempotency guard.

Audit inserts are inside the same transaction as initial token creation; no
bearer leaves before commit. An audit write failure rolls back issuance and
returns no bearer. On existing-token disclosure, audit failure returns no
bearer even though the old token remains valid for prior holders. Logging and
telemetry include boundary, outcome, reason code, and correlation only, never
bearer material. The action returns a narrow DTO: Invoice ID, token, expiry;
ordinary Invoice actions/DTOs return no bearer.

## UI handoff and rollout

- A-097 DRAFT save: show committed amount and draft confirmation; do not call
  sharing. SENT update: after the Invoice commit, call the separate share
  action. Show the modal's share controls only after that action succeeds.
- If sharing fails after SENT succeeds, show "Invoice sent; sharing unavailable"
  with a retry of sharing only. Never resubmit A-097, which could duplicate
  value; preserve committed Invoice ID and amount in the UI.
- `createInvoiceAction` and `NewInvoiceClient` have the same direct token
  handoff. The eventual rollout must remove that ordinary-action token result
  and call the same share operation after successful SENT creation. A DRAFT
  creation does not share. The common modal should accept token only from the
  share result and must not construct `/statement/null`.
- Keep the public statement page and data DTO unchanged; no public-data scope
  expansion is part of this plan. `StatementSharingBox` remains inactive until
  separately integrated behind the same share action.

Deploy as a coordinated application change only after the additive migration
is separately authorized and applied. During rollout, old code still works
with the dropped default because both creation actions explicitly set token
values. Do not remove old tokens or expire them during migration.

## Verification and rollback plan

Before application, generate Prisma migration SQL from the reviewed schema in
an isolated checkout; compare it to this candidate. Apply all existing
migrations plus the candidate to a fresh disposable PostgreSQL target. Verify
foreign keys, unique/index identity, default removal, and zero existing-row
changes. Read-only preflight on the chosen target counts active non-draft
Invoices with valid/unexpired UUID tokens, expired tokens, malformed tokens,
token-without-expiry, expiry-without-token, and draft tokens; report counts
without tokens or identifying data.

Focused tests cover Owner/Admin/Manager allow; Staff/unknown/missing Member and
foreign Invoice deny before domain work; lifecycle/active status; first
issuance writes two rows; legacy valid disclosure writes one; expired/malformed
denial; audit failure rollback/withholding; concurrent first shares keep one
token; retry after serialization and uncertain response; no token in ordinary
actions, DTOs, logs, or telemetry; DRAFT and SENT UI states; sharing failure
after successful submission; and unchanged public statement DTO/404 behavior.
Run TypeScript, lint/architecture checks, A-097 concurrency/rounding tests,
and independent V3 code plus disposable PostgreSQL review.

Application rollback may restore the previous application only if its token
disclosure is explicitly authorized for that rollback window. Prefer a forward
application correction; leave the additive audit table and existing tokens in
place. A database rollback that drops the audit table would destroy business
evidence and is prohibited after the first audited event; before any event,
only a separately approved disposable or target-specific rollback may drop it.

## Approval gate

Product Owner approval is still required for the exact migration and its
`Restrict` retention effect, including the `Invoice` composite unique key and
removal of the CUID default. This document is not migration-application
authority. Expired/malformed legacy links require a later explicit renewal or
manual remediation contract; none is silently created here. F-P-001 public
statement data-minimization review remains a separate gate before broadening
public disclosure; this plan does not change that endpoint.
