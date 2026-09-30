# C2 schema-authoring and migration safety packet

Status: historical C2 schema/SQL safety packet, updated for the current gate.
The mixed Case read-contract correction subsequently passed independent V3
`CODE` review and C2 application/schema code acceptance is `PASS`. The
remaining C2 SQL/runtime gate is separately tracked in
[audit correction and disposable route](audit-sql-correction-and-verification-route.md).
This packet does not authorize a database, provider, or migration change.
The corrected candidate and route later passed independent V3 `CODE`/SQL
rereview; disposable PostgreSQL runtime execution remains `NOT_RUN`.

## Artifacts and validation boundary

- `prisma/schema.prisma` is the proposed Prisma schema. It validates with the
  installed Prisma CLI and retains the composite current-version ownership FK.
- `c2-proposed-migration.sql` is review-only PostgreSQL forward SQL. It is not
  in `prisma/migrations/`, intentionally preventing accidental migration
  application through normal Prisma migration commands.
- Section A of that SQL is Prisma-modelled relational SQL. It must be regenerated
  and compared from the approved migration baseline immediately before any
  migration-application authorization.
- Section B is custom PostgreSQL SQL. Prisma PSL cannot express the checks,
  deferred constraint trigger, or immutability triggers, so these statements
  must remain explicit and receive separate SQL review. The StoredFile and
  CaseAssetFileVersion triggers allow exactly one update shape: a non-null live
  Member FK changing to null with every other column unchanged. That narrow row
  shape is compatible with their approved `ON DELETE SET NULL` actions, but the
  trigger cannot prove a referential action caused it; a direct update with the
  same shape also passes. The independent reviewer must assess whether this
  explicit immutability exception is acceptable. Deletes and every other update
  still fail. CaseFileAccessAudit is always immutable.

The installed `prisma` and `@prisma/client` packages resolve to `7.8.0`; the
manifest's `^7.5.0` range did not pin a 7.5 release. `prisma validate` accepts
the composite current-version relation only when its defining side also declares
`@@unique([currentVersionId, id, labId])`. Equivalent composite unique keys are
also required for the one-to-one grant-to-file and stored-file-to-version
relations. These keys are redundant with their single-column unique leading
fields, but they preserve rather than weaken the approved composite ownership
constraints.

## Historical offline SQL-generation limitation

`prisma migrate diff --from-schema ... --to-schema ... --script` was attempted
without a configured database or shadow database. Prisma 7.8 rejects datasource
URLs in schema files, while `migrate diff` reports `There is no datasource in the
schema` for these config-only schema inputs. No database connection was opened.
This was a `CAPABILITY_BLOCKER` for offline generated-SQL capture, not an
application defect. The later authorized development-target read-only diff
was generated and compared with Section A; see
[cleanup and C2 restart](denta-fusion-cleanup-and-c2-resume.md). The authored
review SQL remains explicit and unapplied.

## Historical schema-authoring verification

- `node .\\node_modules\\prisma\\build\\index.js validate --schema prisma\\schema.prisma`:
  PASS with Prisma 7.8.0.
- Prisma format on a disposable copy followed by a byte-for-byte comparison to
  `prisma/schema.prisma`: PASS. The workspace schema was never auto-formatted
  wholesale.
- `node .\\node_modules\\prisma\\build\\index.js generate --schema prisma\\schema.prisma`:
  BLOCKED at the existing `prisma-zod-generator` process spawn with `ENOENT`.
  Prisma had already loaded the proposed schema. This is a
  `VERIFICATION_ENVIRONMENT_BLOCKER`, not a schema-validation failure.
- `node .\\node_modules\\prisma\\build\\index.js generate --schema prisma\\schema.prisma --generator client`:
  PASS; Prisma Client 7.8.0 generated locally.
- `pnpm exec vitest run tests/unit/prisma/case-file-persistence.schema.test.ts`:
  PASS, 3 tests.
- `pnpm exec tsc --noEmit`: at this earlier checkpoint failed with `TS2322` at
  `lib/server-only-helpers.ts:196` and `:251` after Primary reverted the
  out-of-scope DTO widening. The generated model correctly exposes nullable
  legacy fields, but the existing read DTO still requires strings. This is an
  task-caused compatibility gap in the separate read-contract surface, not an
  unrelated baseline diagnostic. The separately authorized mixed-read
  correction later resolved it and passed global TypeScript and independent
  CODE rereview; see [mixed-read verification](mixed-read-code-verification.md).

No command in this task used a configured datasource, a shadow database,
`migrate dev`, `migrate deploy`, `db execute`, or a provider API.

## Migration application preflight

Run the following only under future migration-application authority and in a
read-only transaction against the confirmed target database. Record aggregates,
not clinical URLs or payloads. Stop on any nonzero integrity count.

```sql
SELECT count(*) AS case_asset_total,
       count(*) FILTER (WHERE "documentUrl" IS NULL OR btrim("documentUrl") = '') AS missing_url,
       count(*) FILTER (WHERE "fileExtension" IS NULL OR btrim("fileExtension") = '') AS missing_extension
FROM "CaseAssetFile";

SELECT "labId", "dentalCaseId", count(*) AS asset_count
FROM "CaseAssetFile"
GROUP BY "labId", "dentalCaseId"
ORDER BY "labId", "dentalCaseId";

SELECT count(*) AS missing_case_or_lab
FROM "CaseAssetFile" asset
LEFT JOIN "Case" dental_case ON dental_case."id" = asset."dentalCaseId"
LEFT JOIN "Lab" lab ON lab."id" = asset."labId"
WHERE dental_case."id" IS NULL OR lab."id" IS NULL;

SELECT count(*) AS case_lab_mismatch
FROM "CaseAssetFile" asset
JOIN "Case" dental_case ON dental_case."id" = asset."dentalCaseId"
WHERE dental_case."labId" <> asset."labId";

SELECT count(*) AS labs_without_organization
FROM "Lab"
WHERE "organizationId" IS NULL;

SELECT "id", "labId", count(*) AS duplicates
FROM "Case"
GROUP BY "id", "labId"
HAVING count(*) > 1;

SELECT "id", "organizationId", count(*) AS duplicates
FROM "Lab"
GROUP BY "id", "organizationId"
HAVING count(*) > 1;

SELECT "id", "organizationId", "labId", count(*) AS duplicates
FROM "FileUploadGrant"
GROUP BY "id", "organizationId", "labId"
HAVING count(*) > 1;

SELECT count(*) AS duplicate_url_groups
FROM (
  SELECT "documentUrl"
  FROM "CaseAssetFile"
  GROUP BY "documentUrl"
  HAVING count(*) > 1
) duplicate_urls;

SELECT "status", count(*) AS grants,
       count(*) FILTER (WHERE "organizationId" IS NULL OR "labId" IS NULL) AS missing_tenant
FROM "FileUploadGrant"
GROUP BY "status";

SELECT count(*) AS asset_rows,
       md5(coalesce(string_agg(
         jsonb_build_array("id", "dentalCaseId", "labId", "title",
                           "description", "documentUrl", "assetFileType",
                           "fileExtension", "createdAt", "updatedAt")::text,
         ',' ORDER BY "id"), '')) AS clinical_fingerprint
FROM "CaseAssetFile";
```

Compare every result with a fresh known-good snapshot, not the historical
three-row observation. Duplicate URLs are informational, not provider identity;
nonzero tenant/relationship defects or missing legacy fields are stop
conditions. Record only the aggregate fingerprint, never the source URLs.

## Post-migration read-only inspection

The application gate must remain disabled. Under separately authorized
post-migration inspection, compare the fingerprint and total above, and require
zero managed rows and zero fabricated file/version/audit rows. Inspect every
expected constraint and trigger before enabling any later writer.

```sql
SELECT "storageMode", count(*) AS assets,
       count(*) FILTER (WHERE "currentVersionId" IS NOT NULL) AS current_pointers
FROM "CaseAssetFile"
GROUP BY "storageMode";

SELECT count(*) AS asset_rows,
       md5(coalesce(string_agg(
         jsonb_build_array("id", "dentalCaseId", "labId", "title",
                           "description", "documentUrl", "assetFileType",
                           "fileExtension", "createdAt", "updatedAt")::text,
         ',' ORDER BY "id"), '')) AS clinical_fingerprint
FROM "CaseAssetFile";

SELECT (SELECT count(*) FROM "StoredFile") AS stored_files,
       (SELECT count(*) FROM "CaseAssetFileVersion") AS versions,
       (SELECT count(*) FROM "CaseFileAccessAudit") AS issuance_audits;

SELECT conrelid::regclass::text AS relation_name, conname, contype, convalidated
FROM pg_constraint
WHERE conrelid IN ('"CaseAssetFile"'::regclass,
                   '"CaseAssetFileVersion"'::regclass,
                   '"StoredFile"'::regclass,
                   '"CaseFileAccessAudit"'::regclass)
ORDER BY relation_name, conname;

SELECT tgrelid::regclass::text AS relation_name, tgname, tgenabled
FROM pg_trigger
WHERE NOT tgisinternal
  AND tgrelid IN ('"CaseAssetFile"'::regclass,
                  '"CaseAssetFileVersion"'::regclass,
                  '"StoredFile"'::regclass,
                  '"CaseFileAccessAudit"'::regclass)
ORDER BY relation_name, tgname;
```

The future migration reviewer must compare Section A to supported generated
Prisma SQL, confirm every expected unique index and FK by name, and run the
isolated transaction cases below. This packet's SQL is unexecuted.

## Required isolated verification before application

The [disposable PostgreSQL route](disposable-postgres-verification-route.md)
supersedes any interpretation that committed immutable verification rows may
be created in the normal development database and then deleted. Actual
committed-row scenarios run only in a separately authorized, run-owned
disposable PostgreSQL environment; exact cleanup is destruction of that
environment. Rollback-only checks are not proof of committed behavior.

1. The `asset -> version -> pointer` transaction commits when the asset is first
   inserted as managed with a null pointer, then a version is inserted, then the
   pointer is updated before commit.
2. A managed asset without a final pointer, or with either legacy field present,
   is rejected at commit.
3. A legacy asset with a pointer or either missing legacy field is rejected at
   commit.
4. The composite pointer rejects a version belonging to another asset or Lab;
   source grants, stored files, and versions reject cross-tenant combinations.
5. Unique provider identity, source grant, current pointer, one-version-per-file,
   and positive/checksum/audit timestamp constraints reject invalid rows.
   `DENIED` authorization with `ISSUED` issuance must also be rejected; an
   `ISSUED` row requires `ALLOWED` authorization.
6. The only permitted StoredFile/CaseAssetFileVersion update shape is a
   non-null live Member FK becoming null with every other column unchanged. It
   is compatible with `ON DELETE SET NULL`, but does not prove that a Member
   deletion caused the update; the independent reviewer must assess this narrow
   exception. Deletes and every other update fail; audit rows always fail
   update/delete attempts. Failed transactions leave no partial
   asset/version/pointer state.
7. Existing legacy rows remain URL-backed with `LEGACY_URL_UNVERIFIED`, a null
   current pointer, unchanged clinical fields, and no fabricated stored files or
   versions.
8. Exercise the accepted N-FILE-110A Case draft/edit preservation paths in
   affected regressions; C2 alone did not make legacy writers asset-safe.
9. Preserve the accepted mixed-read DTO boundary: managed assets remain
   represented without raw/provider URLs, and incomplete legacy rows fail
   closed. Do not silently widen client-facing DTOs or reopen the resolved
   TS2322 gate.

## Rollback and operating constraints

Before any managed writes, a failed expansion requires a separately reviewed
DDL rollback after inspection of partial state. Once a managed file, version, or
audit exists, destructive rollback is unsafe. The approved operational rollback
is to disable Case staging, attachment, replacement, and signed issuance while
retaining additive records, constraints, and audit history. Raw URL fallback is
not an approved rollback path.

At this packet's original schema-authoring checkpoint, no migration, shadow
database, provider configuration, C3 audit writer, permissions, or Case
action was changed. N-FILE-110A and the mixed-read correction were later
accepted separately; they do not establish C2 migration/runtime acceptance.
