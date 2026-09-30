# C2 audit SQL correction and immutable-row verification route

Status: SQL correction and disposable runtime route passed independent V3
`CODE`/SQL rereview. No disposable database/provider operation or C2 migration
application was authorized or performed; runtime verification is `NOT_RUN`.

## Exact correction

In the existing `CaseFileAccessAudit_issuance_timestamps` CHECK, the `ISSUED`
branch now requires `authorizationOutcome = 'ALLOWED'` in addition to the
existing issued/expires timestamps, positive lifetime, and 300-second maximum.
The `NOT_ATTEMPTED` and `FAILED` branches, enums, model fields, and audit
identity snapshots are unchanged. Prisma PSL cannot represent this cross-field
CHECK; the custom PostgreSQL Section B remains its source of enforcement.
The accepted C2 Prisma model is unchanged. The design and safety packet now
state the invariant explicitly.

Corrected review-only candidate:
[c2-proposed-migration.sql](c2-proposed-migration.sql), SHA-256
`b6285c48ef9194b78bf48d99296122192bd567582af7314f52eb7f48e0b3f711`.
For the separately authorized disposable verification run, the Product
Owner-directed deletion of one duplicate identical `ALLOWED` conjunct is
the only SQL delta. Independent narrow `CODE` review returned `PASS`:
the 47-byte deletion transforms the prior candidate byte-for-byte into
SHA-256
`92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
That corrected hash is authoritative for the disposable run; the earlier
hash above remains the historical review baseline.
Section A is unchanged from the prior candidate and remains structurally
equivalent to the [Prisma 7.8 generated diff](c2-prisma-generated-diff-20260926.sql).
No file was added to `prisma/migrations`, no SQL was executed, and no C2
development migration identity exists.

## Static verification

- Prisma 7.8 `validate --schema prisma/schema.prisma`: PASS; no datasource
  mutation.
- Existing C2 schema static test plus new
  `tests/unit/prisma/case-file-audit-outcome.schema.test.ts`: 4 tests PASS
  across 2 files. The new test asserts `ISSUED` requires `ALLOWED` and
  retains the 300-second bound; owned-file lint PASS.
- Direct static assertion of the `ISSUED` + `ALLOWED` conjunct and existing
  <=300-second expiry conjunct: PASS.
- Global `pnpm exec tsc --noEmit`: PASS. New owned test lint: PASS.
- PostgreSQL execution of the corrected CHECK: `NOT_RUN`; that belongs to
  separately authorized disposable runtime verification.

## Committed-fixture route

The [disposable PostgreSQL route](disposable-postgres-verification-route.md)
specifies a run-owned PostgreSQL 17.6 container/volume, the real 47-migration
chain plus corrected C2 candidate, synthetic two-tenant prerequisites with no
clinical/provider data copy, actual commits observed from another connection,
negative commit and immutability tests, and exact destruction by container and
volume removal. Committed immutable rows remain only in the disposable
database until it is destroyed. The normal development database receives no
verification fixtures; its migration application and preservation checks
remain a separate approval/evidence gate.

Docker daemon/image availability, the full-chain application, fixture
behavior, PostgreSQL runtime checks, and destruction are `NOT_RUN`. The
local Docker CLI's presence alone proves none of those capabilities. No
trigger bypass, test-only deletion, broad truncation, FK relaxation, or
rollback-only substitute for committed-row evidence is proposed.

Independent V3 Reviewer initially returned `CORRECTION_REQUIRED` for an
unpinned candidate hash, unspecified pre-C2 seeding method, missing focused
regression assertion, and stale safety-packet status. After those corrections,
one rereview found only a remaining stale item-9 TypeScript claim; it was
reconciled without SQL or route changes. Final verdict: `PASS | CODE`
(SQL and verification-design scope).
The Reviewer confirmed the audit correction, Section A equivalence, the
run-owned committed-fixture/destruction design, and that no runtime claim
has been executed.

## Authority boundary

This correction does not authorize disposable environment creation or
normal development migration application. Both require separately scoped
Product Owner authority after independent review. Provider private ACL,
UploadThing operations, signed reads, C3, and N-FILE-110/111 remain separate.
Primary recommendation: C2 is ready to **request the disposable PostgreSQL
verification gate**, not yet ready to apply C2 to the normal development
database. Actual chain/constraint/cleanup evidence and a fresh development
target/preflight/SQL review are still required before a separate migration-
application authorization can be evaluated.
