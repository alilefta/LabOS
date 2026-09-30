# C2 exact Case file persistence proposal

Status: design complete; `READY` for separate schema-authoring authorization only
Date: 2026-09-25
Authority: read-only repository inspection and documentation. No schema file, migration, database row, provider object, or application code was changed. This proposal is not an applied or validated migration.

## Source facts and design decisions

The current `prisma/schema.prisma` defines `CaseAssetFile` with required `documentUrl` and `fileExtension`, Case and Lab foreign keys with `onDelete: Cascade`, and no platform file or version identity. `Case` has `labId` and `@@unique([labId, caseNumber])`, but no `(id, labId)` key. `Lab.organizationId` is nullable during the existing Organization-link transition. `FileUploadGrant` has authoritative Organization/Lab/Member, target, provider key, URL, and one-time status, but is staging evidence rather than durable identity. Better Auth `Member` is Organization-scoped and may be removed. Current draft/create/edit writers can delete/recreate Case assets, and `deleteCaseAssetFileAction` can explicitly delete one. The generic `caseAssetsRoute` in `app/api/uploadthing/core.ts` has no private ACL. These are compatibility and activation hazards, not permissions to alter those paths in C2.

The prior read-only development inventory found three URL-only assets, one Lab, and two Cases, with no observed Case/Lab mismatch. It is historical evidence only; future migration must preflight a fresh snapshot. The accepted policy retains every legacy row and clinical field, all superseded bytes and versions, and issuance audits, with no automatic purge. C1 Case read policy is closed. Provider private ACL remains a separate `CAPABILITY_BLOCKER`.

The exact proposal below uses a nullable `CaseAssetFile.currentVersionId` and an immutable version table. A pointer update changes which immutable version is current; it never overwrites a prior provider identity. It deliberately omits cleanup state/deletion timestamps from `StoredFile`: no provider deletion or orphan-cleanup policy is approved, and current versus superseded is derived from the pointer rather than a second mutable state flag. Provider metadata/checksum availability still needs real verification before attachment activation.

## Proposed Prisma schema

The following is a **design specimen**, not an edit to `prisma/schema.prisma`. New IDs remain `String @default(uuid())` (PostgreSQL `TEXT`, matching existing ID columns), not `@db.Uuid`; new timestamps explicitly use `TIMESTAMPTZ(6)`. Existing `CaseAssetFile` fields not shown as changed retain their current types and defaults. All new referential actions are explicit.

```prisma
enum StoredFileProvider {
  UPLOADTHING
}

enum StoredFilePurpose {
  CASE_CLINICAL_ASSET
}

enum CaseAssetStorageMode {
  LEGACY_URL_UNVERIFIED
  MANAGED_PRIVATE
}

enum CaseFileAuthorizationOutcome {
  ALLOWED
  DENIED
}

enum CaseFileIssuanceOutcome {
  NOT_ATTEMPTED
  ISSUED
  FAILED
}

enum CaseFileAccessReason {
  AUTHORIZED
  ACCESS_DENIED
  RESOURCE_UNAVAILABLE
  PROVIDER_FAILURE
}

model StoredFile {
  id                      String @id @default(uuid())
  organizationId          String
  labId                   String
  sourceUploadGrantId     String @unique
  provider                StoredFileProvider
  providerObjectKey       String @db.Text
  purpose                 StoredFilePurpose
  detectedMimeType        String @db.VarChar(255)
  sizeBytes               BigInt
  checksumAlgorithm       String? @db.VarChar(32)
  checksumValue           String? @db.VarChar(256)
  uploaderMemberId        String?
  uploaderMemberIdSnapshot String
  createdAt               DateTime @default(now()) @db.Timestamptz(6)

  organization Organization @relation("StoredFileOrganization", fields: [organizationId], references: [id], onDelete: Restrict, onUpdate: NoAction)
  lab          Lab          @relation("StoredFileLab", fields: [labId, organizationId], references: [id, organizationId], onDelete: Restrict, onUpdate: NoAction)
  sourceGrant  FileUploadGrant @relation("StoredFileSourceGrant", fields: [sourceUploadGrantId, organizationId, labId], references: [id, organizationId, labId], onDelete: Restrict, onUpdate: NoAction)
  uploaderMember Member? @relation("StoredFileUploader", fields: [uploaderMemberId], references: [id], onDelete: SetNull, onUpdate: NoAction)
  caseVersion CaseAssetFileVersion? @relation("CaseVersionStoredFile")

  @@unique([provider, providerObjectKey])
  @@unique([id, organizationId, labId])
  @@index([organizationId, labId, createdAt])
}

model CaseAssetFileVersion {
  id                         String @id @default(uuid())
  caseAssetFileId            String
  organizationId             String
  labId                      String
  storedFileId               String @unique
  versionNumber              Int
  createdByMemberId          String?
  createdByMemberIdSnapshot  String
  createdAt                  DateTime @default(now()) @db.Timestamptz(6)

  asset CaseAssetFile @relation("CaseAssetVersions", fields: [caseAssetFileId, labId], references: [id, labId], onDelete: Restrict, onUpdate: NoAction)
  storedFile StoredFile @relation("CaseVersionStoredFile", fields: [storedFileId, organizationId, labId], references: [id, organizationId, labId], onDelete: Restrict, onUpdate: NoAction)
  createdByMember Member? @relation("CaseVersionCreator", fields: [createdByMemberId], references: [id], onDelete: SetNull, onUpdate: NoAction)
  currentForAsset CaseAssetFile? @relation("CaseAssetCurrentVersion")

  @@unique([caseAssetFileId, versionNumber])
  @@unique([id, caseAssetFileId, labId])
  @@index([organizationId, labId, createdAt])
  @@index([caseAssetFileId, createdAt])
}

model CaseFileAccessAudit {
  id                    String @id @default(uuid())
  organizationId        String
  labId                 String
  actorMemberId         String
  caseId                String?
  caseAssetFileId       String?
  authorizationOutcome  CaseFileAuthorizationOutcome
  issuanceOutcome       CaseFileIssuanceOutcome
  reason                 CaseFileAccessReason
  correlationId          String @unique
  issuedAt               DateTime? @db.Timestamptz(6)
  expiresAt              DateTime? @db.Timestamptz(6)
  createdAt              DateTime @default(now()) @db.Timestamptz(6)

  @@index([organizationId, labId, createdAt])
  @@index([caseId, createdAt])
  @@index([caseAssetFileId, createdAt])
  @@index([actorMemberId, createdAt])
}
```

Existing-model changes proposed:

```prisma
model CaseAssetFile {
  id               String @id @default(uuid())
  dentalCaseId     String
  labId            String
  title            String?
  description      String?
  documentUrl      String?                 // legacy-only; was required
  assetFileType    AssetFileType @default(IMAGE)
  fileExtension    String?                 // legacy-only; was required
  storageMode      CaseAssetStorageMode @default(LEGACY_URL_UNVERIFIED)
  currentVersionId String? @unique
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt

  dentalCase Case @relation(fields: [dentalCaseId, labId], references: [id, labId], onDelete: Restrict, onUpdate: NoAction)
  lab Lab @relation(fields: [labId], references: [id], onDelete: Restrict, onUpdate: NoAction)
  versions CaseAssetFileVersion[] @relation("CaseAssetVersions")
  currentVersion CaseAssetFileVersion? @relation("CaseAssetCurrentVersion", fields: [currentVersionId, id, labId], references: [id, caseAssetFileId, labId], onDelete: NoAction, onUpdate: NoAction)

  @@unique([id, labId])
  @@index([labId, dentalCaseId])
  @@index([labId, storageMode])
}

// Add the following back-relations/keys to existing models; retain all other fields.
model Case {
  // existing fields and caseAssetFiles relation remain
  @@unique([id, labId])
}
model Lab {
  // existing fields remain; organizationId stays nullable for this C2 design
  storedFiles StoredFile[] @relation("StoredFileLab")
  @@unique([id, organizationId])
}
model Organization {
  // existing fields remain
  storedFiles StoredFile[] @relation("StoredFileOrganization")
}
model FileUploadGrant {
  // existing fields remain
  storedFile StoredFile? @relation("StoredFileSourceGrant")
  @@unique([id, organizationId, labId])
}
model Member {
  // existing fields remain
  uploadedStoredFiles StoredFile[] @relation("StoredFileUploader")
  createdCaseFileVersions CaseAssetFileVersion[] @relation("CaseVersionCreator")
}
```

The existing `Case`, `Lab`, `Organization`, `FileUploadGrant`, and `Member` snippets show additions only; they must be merged, not duplicated. `CaseFileAccessAudit` intentionally has **no foreign keys**: actor, tenant, Case, and asset IDs are immutable identity snapshots, so later deletion of a Member or Case cannot erase or rewrite audit history. An unresolved/foreign requested Case or asset ID is not stored as an authoritative `caseId`/`caseAssetFileId`; those fields remain null when not safely resolved. Unauthenticated attempts without a canonical Member are outside this narrow issuance-audit table and require separate auth telemetry, not fabricated identity.

`StoredFile` and version keep required uploader/creator ID snapshots plus optional live `Member` references with `ON DELETE SET NULL`. The snapshot is written only from a verified Member in the final transaction. The single-column live Member FK cannot by itself prove same-Organization membership; canonical grant/tenant validation does so at write time, while the required composite Grant/Lab/StoredFile foreign keys enforce tenant linkage at rest. The source-grant `RESTRICT` FK means a consumed grant cannot be deleted while its stored file is retained; that is deliberate and must be checked against any future grant-cleanup policy.

## Current-version cycle and database invariants

PostgreSQL can represent the nullable cycle. The asset's composite FK `(currentVersionId, id, labId) -> CaseAssetFileVersion(id, caseAssetFileId, labId)` guarantees that a non-null pointer names a version of **that asset and Lab**, not another asset's version. The version's `(caseAssetFileId, labId) -> CaseAssetFile(id, labId)` FK and `(storedFileId, organizationId, labId) -> StoredFile(id, organizationId, labId)` FK close the ownership chain. PostgreSQL's default `MATCH SIMPLE` skips the composite pointer check when `currentVersionId` is null; `MATCH FULL` must not be used because `id` and `labId` remain non-null. The unique nullable pointer prevents a version from being current for two assets; PostgreSQL permits multiple null pointers. Relation names disambiguate the two Prisma relations between asset and version. [Prisma relations](https://www.prisma.io/docs/orm/v7/prisma-schema/data-model/relations), [PostgreSQL composite-FK null behavior](https://www.postgresql.org/docs/current/ddl-constraints.html).

No deferrable FK is needed for the proposed write order: in one transaction insert `CaseAssetFile` as `MANAGED_PRIVATE` with null pointer, insert version 1 referencing that asset and a verified `StoredFile`, then update only the asset's pointer. Replacement inserts a new stored file/version, then compare-and-swaps the pointer while locking the asset and checking the expected prior version/next number. Concurrent replacement must retry or reject rather than branch the monotonic sequence. Use `NO ACTION`/`RESTRICT` on retention-sensitive relations; do not cascade-delete versions or files.

An immediate PostgreSQL `CHECK (storageMode = MANAGED_PRIVATE => currentVersionId IS NOT NULL)` would make the required insert order impossible. Prisma schema alone cannot express the full cross-row/final-transaction invariant. Proposed custom SQL for a future **separately authorized** migration: a `DEFERRABLE INITIALLY DEFERRED` constraint trigger on `CaseAssetFile` insert/update that re-reads the row's **final** state by ID at commit and rejects (a) managed mode without a current version or with a legacy URL, (b) legacy mode with a current pointer or null legacy URL/extension. Do not check only the captured `NEW` value from the initial insert. The composite FK handles pointer ownership; a separate `CHECK (versionNumber > 0)`, `CHECK (sizeBytes > 0)`, and paired-nullability check for checksum algorithm/value are immediate. Proposed audit checks require timestamps only for `ISSUED`, require `expiresAt > issuedAt`, and bound the interval to 300 seconds; denied/non-attempted events have no issued timestamps. A StoredFile without a Version is possible at the DDL level, so the final grant-consumption transaction must create both or neither; a future deferrable final-state guard is a candidate if database-only enforcement is required. Whether Prisma 7.5 accepts the exact composite cyclic relation syntax and whether its generated SQL orders the constraints correctly **has not been validated**; schema authoring must validate PSL and inspect generated SQL, then add custom SQL in a reviewed migration. PostgreSQL supports staged `ADD CONSTRAINT ... NOT VALID`/`VALIDATE CONSTRAINT` for applicable foreign-key/check constraints; Prisma does not model constraint triggers or deferrability in PSL. [Prisma referential actions](https://www.prisma.io/docs/orm/v7/prisma-schema/data-model/relations/referential-actions), [PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html).

Immutability/append-only are not guaranteed by `@relation` or `@unique`: version and audit tables need proposed database `BEFORE UPDATE OR DELETE` reject triggers (and insert-only repository APIs). `StoredFile` provider identity, source grant, tenant, and technical metadata likewise need immutable-column protection. No automatic purge or privileged bypass is approved. A future migration must validate trigger ordering with foreign keys and ordinary Prisma write behavior; an administrative override/retention change would require a separate decision.

The C2 audit CHECK additionally requires `authorizationOutcome = ALLOWED`
whenever `issuanceOutcome = ISSUED`; `DENIED` with `ISSUED` is contradictory
and must fail at the database boundary. This is custom PostgreSQL SQL, not a
Prisma model relation or a new enum value.

## Future migration plan, not execution

1. **Read-only preflight immediately before any migration approval/application.** In a read-only transaction record counts and aggregates, not URLs/payloads: `CaseAssetFile` total; per-Lab/Case counts; null/empty/duplicate URL counts; missing Case/Lab and Case/Lab mismatch; Labs without Organization links; duplicate `(Case.id,labId)` or `(Lab.id,organizationId)` candidates; rows currently modified by draft/edit/delete paths; `FileUploadGrant` status/tenant linkage relevant to future `StoredFile`. Compare with the prior three-row observation, but stop and reconcile any drift rather than assuming three. Confirm effective database target and migration role separately before mutation.
2. **Expand keys and tables.** Add composite unique keys on `Case`, `Lab`, and `FileUploadGrant`; create enums, `StoredFile`, `CaseAssetFileVersion`, and `CaseFileAccessAudit` with named constraints/indexes. Add nullable `CaseAssetFile.currentVersionId` and `storageMode` defaulting to `LEGACY_URL_UNVERIFIED`. Create Version-to-Asset/File FKs, then add the Asset-to-Version composite pointer FK after the Version unique key exists. Inspect actual generated SQL; use staged constraint addition/validation where appropriate. Do not drop old fields or IDs.
3. **Legacy compatibility.** In the same controlled migration, drop `NOT NULL` on `CaseAssetFile.documentUrl` and `fileExtension` only after `storageMode` exists. Existing rows receive `LEGACY_URL_UNVERIFIED` by explicit verified update or approved PostgreSQL default/backfill; all IDs, URLs, extension/type, title/description, and timestamps remain unchanged. Create no `StoredFile` or version for them. Confirm fresh before/after counts and metadata checksums. The old application continues supplying non-null URLs for its legacy writes; no managed writer is enabled yet.
4. **Add final-state and immutability guards.** Validate the deferred asset-mode trigger, positive numeric checks, and version/audit immutability triggers against insert/version/pointer transaction order and rollback. Validate all composite FKs against actual data before enabling managed writes. Schema tests must prove same-tenant/current-version constraints, unique provider identity/source grant, one StoredFile per version, failed transaction rollback, and no accidental cascade.
5. **Compatibility release gate.** C2 schema expansion alone does not make current Case writers asset-safe. Existing `create-case.ts` and `update-case-form.ts` delete/recreate assets; `update-case.ts` contains an explicit delete action, and the existing `caseAssetsRoute` has no private ACL. The separately authorized N-FILE-110A/write-guard work must preserve legacy and managed asset IDs through ordinary saves and prevent managed deletion; the explicit deletion action needs a separate approved behavior or a guard before managed writes. Until then, use no new managed rows and do not claim legacy rows are protected from ordinary existing user operations. Do not use the public route for new clinical assets as a workaround. Read cutover is also separate and must not fall back to raw URLs.
6. **Post-migration inspection.** Assert every preflight legacy row still exists with identical clinical fields and URL, `LEGACY_URL_UNVERIFIED`, null current pointer, and zero fabricated StoredFile/version rows; no new provider/private-access claim. Inspect constraints/indexes/triggers and generated-client compatibility. Only a separately approved, later code/runtime sequence may create managed rows.

New unique indexes and validated FKs can lock or scan tables; choose a bounded maintenance/lock-timeout plan at migration authorization. Do not assume `CREATE INDEX CONCURRENTLY` is valid inside Prisma's migration transaction; if concurrency is needed, its execution mechanism is a separate reviewed choice. Adding a defaulted enum/column and dropping `NOT NULL` should preserve old inserts, but the old Prisma-generated client must be checked during the compatibility window. No schema or migration file was generated for this design.

## Rollback and decisions

Before managed writes, a failed expansion can be rolled back only through a separately reviewed migration/DDL procedure after inspecting partial constraint state. After **any** managed writes or audit rows, destructive down-migration is unsafe: it would lose private file identity/history and audit, and a required legacy `documentUrl` could not represent URL-less managed assets. The approved operational rollback is to disable Case staging, attachment, replacement, and signed issuance while retaining all additive data, constraints, and audit. Never restore raw-URL fallback as a rollback.

`READY` here means the Product Owner can authorize a **schema-authoring and SQL-validation task**, not application of that SQL. That task must validate the proposed Prisma cyclic composite relation, nullable-current write sequence, custom deferred trigger, referential actions, and exact SQL on an isolated non-mutating design/validation path before any database migration approval. If Prisma 7.5 cannot represent the composite pointer as shown, stop and return a revised model; do not silently weaken ownership to a plain `currentVersionId` FK.

Remaining approval gates: (1) explicit schema-authoring/SQL-validation authority; (2) separate migration-application authority after fresh preflight and reviewed SQL; (3) separate N-FILE-110A asset-safe writer/delete-action behavior; (4) add/replace permission bundles and resource policies; (5) provider capability and real runtime verification. A hard-delete policy for Cases/Labs/Organizations with retained clinical records and a controlled administrative override for immutable history remain future Product Owner decisions; this proposal defaults to `RESTRICT`/`NO ACTION` and no deletion. C3 audit writing and N-FILE-110/111 are not started.
