# C2 schema-authoring CODE review

Date: 2026-09-25
Scope: independent V3 `CODE` review of the authored Prisma schema, review-only SQL, and safety packet.
Verdict after correction: `CORRECTION_REQUIRED`.
Primary disposition: `BLOCKED_DECISION`; code acceptance `PENDING`; migration application `NOT_AUTHORIZED`.

The first review found that unconditional `BEFORE UPDATE OR DELETE` history
triggers would reject PostgreSQL's `ON DELETE SET NULL` updates of optional
StoredFile uploader and CaseAssetFileVersion creator references. The C2 writer
corrected the SQL to allow only a non-null-to-null live Member reference change
with every other column unchanged. Independent rereview found that correction
sound on inspection. The trigger cannot distinguish a referential action from
an equivalent direct detach; neither changes the retained identity snapshot.
PostgreSQL execution, constraint syntax, and commit-time trigger behavior remain
`NOT_RUN` under this no-database scope.

One blocking compatibility finding remains. Generated Prisma Client types
`CaseAssetFile.documentUrl` and `fileExtension` as nullable, while the current
Case read DTO requires strings. `pnpm exec tsc --noEmit` fails with TS2322 at
`lib/server-only-helpers.ts:196` and `:251`. The writer's broad DTO-nullability
edit was removed because application read behavior was not authorized in C2.
The smallest next gate is separate Product Owner authorization for a fail-closed
legacy-only Case read-contract adaptation. It must preserve authorized legacy
rendering and prevent managed rows from reaching raw-URL consumers, without
activating managed writes or N-FILE-110A. After that change, rerun typecheck and
independent CODE review before C2 acceptance.

The composite asset/version/current pointer relation and tenant-aware foreign
keys validated with installed Prisma 7.8.0. Client-only generation passed;
full generation stopped at the existing `prisma-zod-generator` spawn `ENOENT`.
The focused static C2 tests passed 3/3. The review-only Section A SQL is
hand-authored, not Prisma-generated: offline `migrate diff` could not obtain
schema-to-schema SQL with this Prisma 7 config-only datasource. Regeneration,
comparison, isolated PostgreSQL validation, fresh read-only preflight, and
explicit migration-application approval are future gates. No SQL was applied.
