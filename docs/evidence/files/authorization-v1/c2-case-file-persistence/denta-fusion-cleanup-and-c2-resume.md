# Denta Fusion development cleanup and C2 restart

Status: Denta Fusion cleanup `PASS`; fresh C2 preflight `PASS`; migration
application `NOT_RUN`. C2 migration SQL review `CORRECTION_REQUIRED` and
checkpoint `BLOCKED_DECISION`. This is development-only evidence.

## Target and pre-delete safety

The effective direct datasource again matched development host SHA-256 prefix
`eb0d823953fe`, port 5432, database/schema `postgres`/`public`, PostgreSQL
17.6, and 47 applied migrations. Exactly one unlinked Lab matched title
`Denta Fusion` and ID hash `3aa0cb43cb24`; it remained unlinked and had the
previously recorded update timestamp. All 27 direct `labId`-table counts
matched the [read-only diagnosis](unlinked-lab-read-only-diagnosis.md),
including 6 Cases, 3 CaseAssetFiles, 2 Patients, 3 Clinics, 4 Dentists,
2 LabStaff, 1 LabUser, 2 Categories, 3 WorkTypes, 2 Products, 1 Invoice,
3 InvoiceCase, and 1 StaffPayout. The three asset ID hashes matched the
diagnosis. No new Lab-specific relationships appeared.

Live PostgreSQL FK inspection found `ON DELETE CASCADE` for all direct
Lab-owned tables. Secondary FKs have CASCADE or SET NULL behavior. A
catalog-driven cross-Lab FK join found zero linked-Lab rows pointing to
target-owned records. Six Organization-linked Labs, including the two
Organization candidates from the diagnosis, and all six Organizations were
baselined by hashed identity and Case/asset/grant counts. The two `UPLOADED`
FileUploadGrants belonged to a linked Lab, not Denta Fusion. The shared
Better Auth user, Organizations, Members, sessions, and accounts were
explicitly excluded from deletion; only the user's obsolete transitional
`AuthUser.labId` pointer required clearing.

## Recovery and exact cleanup

Before deletion, a full custom-format development `pg_dump` archive was
created and its table-of-contents validated with `pg_restore --list`.
SHA-256 is `b2df33fc297314a59bc2d8ad72d72bb2fdb38940745151be729111b1c4084714`.
The archive is retained at
`C:\Users\alnaseem\AppData\Local\Temp\labos-c2-denta-fusion-20260926.dump.dpapi`,
encrypted with Windows DPAPI `CurrentUser`; decryption round-trip matched
the archive hash, and the plaintext copy was removed. Its NTFS access is
restricted to the local user, SYSTEM, and Administrators. The first DPAPI
attempt in the sandbox failed because its user profile was not loaded; it
removed that first plaintext copy. A fresh archive was then created and
successfully protected under the actual user profile. No dump contents,
clinical URLs, credentials, or payloads are in this evidence. Restoration
would require separately authorized extraction/restoration, not an automatic
whole-database overwrite.

A serializable dry-run transaction cleared exactly one obsolete
`AuthUser.labId`, deleted exactly the target Lab with FK cascades, asserted
zero target rows in all 27 direct tables, and verified six linked Labs,
two uploaded grants, and the shared user's Member/session/account counts
unchanged. It then rolled back. The same guarded transaction was rerun and
committed. No FK enforcement or immutability guard was disabled. No broad
truncation or provider operation occurred.

Independent read-only post-check: matching Lab 0; unlinked Labs 0; Cases,
CaseAssetFiles, Patients, Clinics, Dentists, LabStaff, LabUsers, catalog,
pricing, work items, invoices/InvoiceCase/StaffPayout, and every other
direct Lab table have zero dangling non-null `labId` references. All six
linked Labs and their Organizations retained their hashed identities and
record counts. `UPLOADED` grants remain 2. No non-null transitional
`AuthUser.labId` dangles; the shared user and its Member/session/account
counts were preserved. An initial post-check counted null `AuthUser.labId`
values as orphans and failed; the read-only check was corrected to exclude
null, then passed. Three URL-only database asset rows were deleted as
authorized. Provider objects were neither identified from URLs nor deleted;
possible historical provider orphans remain an accepted development cleanup
limitation for separate handling.

## Fresh C2 preflight

After committed cleanup, the same development target was re-attested in a
new read-only transaction. The fresh C2 preflight found zero unlinked Labs,
zero CaseAssetFiles, zero missing URL/extension rows, zero missing or
mismatched Case/Lab relationships, zero duplicate Case/Lab/grant composite
keys, zero duplicate URL groups, and zero invalid grant tenant relationships.
The two grants remain `UPLOADED`. The new asset count is 0 and aggregate
clinical fingerprint is `d41d8cd98f00b204e9800998ecf8427e` (empty set).
The old three-row fingerprint was not reused. The required C2 preflight
invariant remains unchanged and now passes.

## SQL generation and stop

Prisma 7.8 `migrate diff --from-config-datasource --to-schema
prisma/schema.prisma --script` initially failed `P1001`. One supported,
process-local `sslmode=require` URL retry succeeded without changing saved
configuration or database state. Its exact read-only output is
[c2-prisma-generated-diff-20260926.sql](c2-prisma-generated-diff-20260926.sql),
SHA-256 `74beb924b36ed3e9ff7ef4ef6c763611a580e6ec05ea9327adb51039174005c1`.
The authored review-only SQL SHA-256 remained
`74ed7de23d10f6b04abded66182a3f1ad2f2b51b6267512cb0dded86632dd987`.
Section A and the generated diff have the same six enum names/values,
three tables/columns, 24 named indexes, and ten named FKs with matching
relationships and referential actions. Differences are formatting,
statement grouping, and ordering. Dropping/replacing the two legacy
CaseAssetFile FKs and superseded indexes is expected; no table/column/data
deletion, legacy URL rewrite, fabricated file/version, or unrelated object
appears. The nullable cyclic pointer ordering is representable.

Independent pre-application V3 SQL/CODE Reviewer verdict:
`CORRECTION_REQUIRED`. Section B permits contradictory immutable audit state:
`authorizationOutcome=DENIED` with `issuanceOutcome=ISSUED`. The Reviewer
requires an outcome-consistency check. Separately, committed positive
synthetic file/version/audit rows cannot be exactly cleaned under the
proposed `BEFORE DELETE` immutability triggers and restrictive FKs. The
authorized runtime matrix requires both actual commit and exact fixture
cleanup; rollback-only checks can exercise deferred constraints but cannot
be called a successful committed-row scenario. Do not disable triggers,
truncate, or claim the blocked scenario passed. The Reviewer confirmed the
deferred storage-mode trigger rereads final transaction state and Section A
has no material semantic mismatch.

**Stop point:** no candidate SQL was applied, no C2 migration was registered,
no C2 tables/columns/triggers exist in development, and no managed fixture or
audit row was created. Post-migration inspection, PostgreSQL scenario matrix,
fixture cleanup, application regressions, `prisma-zod-generator`
reassessment, and independent `RUNTIME_EVIDENCE` review are `NOT_RUN`.
Application/schema code acceptance remains `PASS`, but migration SQL review
is `CORRECTION_REQUIRED`, development migration acceptance `PENDING`, and
managed Case-file activation `INELIGIBLE`.

Next authority must resolve the immutable-fixture verification route and
authorize the narrow audit-check SQL correction/rereview. Migration
application must not resume from this stopped packet without those gates and
a fresh target/preflight check.
