# Case Image V1 verification pre-migration backup — 2026-11-03

Scope: one read-only hosted-data export, encrypted recovery artifact, and isolated PostgreSQL 17.11 restore rehearsal. Migration 61, R2, Vercel, and hosted database state were not changed. This file contains only sanitized metadata.

## Source identity and pre-export state

- Supabase project: `rvtubjrczuxdxfuazjmr`; database: `postgres`; server: PostgreSQL 17.11; migration-capable login: `postgres` through the verification session pooler.
- The client used `sslmode=verify-full` with the verification project CA. The source session was restricted to read-only queries for data transfer.
- Immediately before encrypted export: 60 finished Prisma migrations, zero incomplete migrations, and no row for `20261028120000_case_png_webp_v1`.
- One historical JPEG S001 evidence row; MD5 of ordered `row_to_json` text: `f78177055fe5fe615bb4eba33421ce33`.
- StoredFile insert guard function-definition MD5: `4df4e10f75ca326d86c00f6f2cedb4fc`.
- Migration 61 local source SHA-256 (not applied): `515b15d48a3af2a609a926a88cd085db65c14ba43068d9017eb9835c4621e91c`.

## Backup construction and scope

- PostgreSQL 17.11 `pg_dump` read the `public` schema, including functions, triggers, constraints, ownership and ACL definitions. Schema-only intermediate archives stayed inside a run-owned disposable container; they contained no table data.
- TLS-verified, read-only `COPY TO STDOUT` streamed a coherent subset into a PostgreSQL 17.11 staging database on temporary container storage. No hosted-data plaintext dump file was written.
- Selected data: all 60 Prisma migration rows; six Case file grants targeting two Cases; two related organizations, Labs, users, members, patients and Cases; one JPEG clinical evidence row; one StoredFile; one CaseAssetFile; one CaseAssetFileVersion.
- The source's LabOS role attributes (15 rows) and memberships (17 rows), without passwords, were stored in a separate `labos_backup_meta` schema. The archive retains object ownership and ACLs. Recovery requires passwordless bootstrap role stubs before restore; database-global roles are not created by `pg_dump`.
- Excluded all data from account, session, invitation, verification, LabInvitation, Invoice and other unrelated tables. Optional URL/metadata fields were set to NULL in the selected rows: organization logo/metadata, Lab avatar URL, user image, grant provider-file URL, and Case asset document URL. Provider object keys and original-file hashes were retained for evidence and object identity; no R2 object bytes were exported.
- The final `pg_dump -Fc` covered `public` plus `labos_backup_meta` and was streamed directly into age using the approved public recipient. No plaintext data archive was saved.

## Encrypted artifact

- File: `F:\Software_Engineering\LabOS\Private-Backups\case-image-v1-premigration-20261103\case-image-v1-premigration-20261103.pgcustom.age`
- Created: `2026-11-03T09:56:45Z`
- Size: 260,486 bytes
- SHA-256: `b3034543d374f2c93bb9744833afa153c5f9137f406d5a58bbc02689a8220c91`
- The file inherited the restricted ACL without broad-access principals. Decryption through the dedicated private identity produced a valid archive inventory of 532 entries. The private identity and connection credentials are not in this evidence.

## Isolated restoration

- Fresh `postgres:17.11` container, network mode `none`, no published ports, temporary database storage. Only passwordless local role stubs were created before restore.
- age decryption streamed directly into PostgreSQL 17.11 `pg_restore --exit-on-error`; restore completed without unexplained errors or plaintext dump files.
- Restored: 41 public tables, 82 validated foreign keys, 60 finished migrations, zero incomplete, migration 61 absent, six grants, two Cases, one StoredFile, one Case asset and version, one JPEG S001 evidence row.
- Restored JPEG evidence fingerprint `f78177055fe5fe615bb4eba33421ce33` matched the source pre-export fingerprint. Evidence, grant, Case, Lab and organization joins resolved; StoredFile and asset/version/Case joins each resolved.
- StoredFile guard owner `postgres`, SECURITY INVOKER, configured search path, function definition MD5 `4df4e10f75ca326d86c00f6f2cedb4fc`, ACL MD5 `791d2b1e22edbb03f97770724fbb588b`, and enabled trigger state `O` matched the hosted source.
- Credential-bearing table rows: zero. Unredacted optional URL/metadata fields: zero. Local LabOS role passwords: zero. These checks cover the selected schema fields and exclusions; they are not an exhaustive scan of arbitrary free-text content.

## Recovery limitations

- This is a coherent, selected application-data recovery set, not a full Supabase project backup or point-in-time recovery. Unrelated application records and all Supabase-managed schemas/infrastructure are excluded.
- Redacted optional fields cannot be recovered from this artifact. Object-storage bytes were not backed up, so restoring database records alone would not recreate R2 objects.
- LabOS role definitions and memberships are documented in backup metadata, but PostgreSQL global roles require controlled bootstrap before applying owner/ACL entries. No role passwords were exported.
- Source rows were read in separate read-only transactions. Post-data foreign-key validation and pre-export count/fingerprint checks established a coherent set, not a single server-wide snapshot timestamp.
