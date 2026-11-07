# Case PNG/WebP V1 Package 2 — local checkpoint

Status: `PASS | CASE_PNG_WEBP_V1_CASE_INTEGRATION_READY | CODE + DISPOSABLE`
Date: 2026-10-28
Authority: Product Owner's bounded local implementation, additive migration authoring and disposable verification request. No hosted migration, live R2, activation, deployment, commit or push.

## Implemented locally

- Additive Prisma enum values and authored migration `20261028120000_case_png_webp_v1`. Historical JPEG rows are not rewritten. The migration extends format-specific evidence identity checks and derives object-storage StoredFile MIME from immutable evidence format in the existing insert guard.
- Existing object-storage grant staging accepts checked PNG/WebP suffixes; the legacy UploadThing callback remains JPEG only.
- Completion dispatches JPEG to unchanged S001 validation/finalization, and PNG/WebP to the accepted Sharp byte validator and a new grant-bound transactional evidence finalizer. PNG/WebP definitive rejection is distinct from uncertain provider/runtime failure; this package does not add a PNG/WebP terminalization transition.
- First attachment accepts format-specific immutable evidence, rechecks allocation and authorization, retrieves the exact object again, checks original byte length and SHA-256, and maps verified JPEG/PNG/WebP format to MIME before the existing atomic attachment transaction.

## Verification performed

- Prisma schema validation and client/Zod generation: PASS.
- Focused Case/JPEG unit suite: 229/229 PASS across 18 files, including final negative cases.
- Unchanged JPEG R001/S001 regression selection: 113/113 PASS across 11 files.
- TypeScript: PASS. ESLint on affected files: PASS.
- Cleanup/authorization regression selection: 77/78 passed across four files. The one failure is the pre-existing Windows Credential Manager `CredWriteW` synthetic test in `case-object-storage-cleanup-binding.test.ts`; it failed before exercising Case image code in the sandbox identity. The other cleanup worker, object-storage and stage authorization tests passed. No cleanup code was changed for this package.
- Independent V3 `PASS | CODE` for code and authored SQL. The review explicitly did not accept database execution or runtime evidence.
- Local tests use mocked object storage and transaction seams. They do not prove database rollback or trigger execution.

## Disposable PostgreSQL 17.11 continuation

After Docker became available, an exact run-owned `postgres:17.11` container was bound to loopback port 55495. A synthetic `supabase_admin` bootstrap was applied, followed by the 55 historical SQL migrations, the accepted disposable A1-I1 role setup, five later cleanup migrations, and the authored `20261028120000_case_png_webp_v1` migration. The role setup's migration-count guard used a synthetic 55-row migration ledger because the SQL files were applied directly with `psql`; this is not a Prisma migration-runner claim. The cleanup worker role was set LOGIN in the isolated container to satisfy the installed predecessor guard. No hosted database or R2 was contacted.

The real Prisma/transaction integration suite `tests/integration/case-png-webp-v1-disposable.test.ts` passed **11/11** with mocked object storage. It covered PNG, lossy WebP and lossless WebP intent → completion → evidence → first attachment; checked suffix/content mismatch; wrong tenant, Lab, Member and Case; decoder failure with no evidence; replaced bytes before attachment; one canonical attachment under concurrent attempts; format/suffix/decoder CHECKs; wrong StoredFile MIME denial; and rollback of evidence when a disposable trigger forced the grant transition to fail. The test trigger was dropped in `finally`.

A second isolated `postgres:17.11` container on loopback port 55492 received the 60-migration predecessor schema and accepted roles. The existing R2-03 JPEG completion test passed and created one S001 evidence row before the new migration. Applying the new migration succeeded with that row present; its `row_to_json` MD5 was unchanged before and after (`34be355082f4f6120e9b56953c8be8c1`). This is a preservation check on an actual historical-format row, not a claim about hosted data.

The disposable tests do not attest the production migration runner, deployed memory/request limits, hosted privileges, routes or live R2 behavior. Independent V3 returned `PASS | RUNTIME_EVIDENCE` after read-only inspection of both live disposable databases, the installed constraints/guard, the retained JPEG row and the absence of the forced-failure trigger. Both exact run-owned `--rm` containers were then stopped and verified absent; no disposable PostgreSQL data remains.

## Historical stopped attempt

The initial Docker daemon pipe `//./pipe/docker_engine` was absent. Starting the Docker service was denied. A separate isolated local PostgreSQL 18 cluster initialized, but `pg_ctl` could not start it because restricted-token creation failed (`error code 87`); its exact run-owned directory was removed. This environment blocker was resolved when the Product Owner opened Docker. The later PostgreSQL 17.11 continuation above supersedes the earlier `NOT_RUN` state.

## Activation gates

The Case upload route remains inactive. Before production activation: Product Owner acceptance of this local package; separately authorized hosted migration; R2 runtime configuration; upload intent and completion route registration; UI wiring; tenant-authorized private reads; deployed memory and request-size checks; operational cleanup and monitoring.
