# A1-I1 verification-target ownership recovery

Date: 2026-10-15  
Target: isolated Supabase `labos-verification` (`rvtubjrczuxdxfuazjmr`) only  
Authority: Product Owner A1-I1 Supabase Ownership Recovery; no worker LOGIN, provider operation, or activation  
Status: `ROLE_INSTALL_PASS | TARGET_PRIVILEGE_VERIFIED`; A1-I1 remains `BLOCKED_DECISION`

## Reviewed artifact and prechange boundary

The exact [recovery SQL](verification-role-install-recovery.sql) has SHA-256 `c4c69f94c01b483ee460bd9baa345cd01aa76bba8c5874a2f2792407553af3ae`. It is the existing independently reviewed SQL design; the [disposable PostgreSQL 17.11 test](ownership-transfer-recovery-20261014.md) exercised its temporary-membership/five-function ownership mechanism and passed independent V3 `PASS | RUNTIME_EVIDENCE + SQL DESIGN`. The original [failed install script](verification-role-install.sql) and installed migration SQL remain unchanged.

Read-only preflight used the existing ignored migration-owner session-pooler URL and CA file with `PGSSLMODE=verify-full`. The connection URL and password were not output. The URL's non-secret identity matched `postgres.rvtubjrczuxdxfuazjmr` on the Frankfurt session pooler, port 5432. SQL returned database/current user/session user `postgres/postgres/postgres`, PostgreSQL `17.11`, server SSL enabled. All 54 Prisma migrations are finished, with no incomplete rows and exactly one installed `20261013120000_case_object_storage_cleanup` row matching accepted checksum `d3a66ee3ce9f903dbebb734074cff3a0dc8108fca1efcc512861b5c8d3510f16`.

Roles (`LOGIN / CREATEROLE / CREATEDB / SUPERUSER / BYPASSRLS`): `labos_verification_ack_owner=f/f/f/f/f`; `labos_verification_cleanup=f/f/f/f/f`; `labos_verification_app=t/f/f/f/f`; `postgres=t/t/t/f/t`; `supabase_admin=t/t/t/t/t`. No role attributes were changed.

All five installed functions are `SECURITY DEFINER`, owned by `postgres`, with fixed `search_path=pg_catalog, labos_cleanup_private, pg_temp` and ACL `postgres=X/postgres`:

| Exact private signature |
| --- |
| `ack_object_storage_cleanup(text,integer)` |
| `claim_object_storage_cleanup(text)` |
| `record_object_storage_cleanup_failure(text,integer,text)` |
| `reject_case_s001(text)` |
| `renew_object_storage_cleanup(text,integer)` |

Membership snapshot (`granted role / member / grantor / ADMIN / INHERIT / SET`): `labos_verification_ack_owner / postgres / supabase_admin / t / f / f`; `labos_verification_cleanup / postgres / supabase_admin / t / f / f`. No other direct rows for either custom role were returned. Effective ACK-owner SET/USAGE and private-schema CREATE were all false for both `labos_verification_app` and `labos_verification_cleanup`. `postgres` had ACK-owner SET=false, USAGE=false, and private-schema CREATE=true as schema owner. The ACK owner itself had private-schema CREATE=false.

`labos_cleanup_private` is owned by `postgres` with ACL `postgres=UC/postgres`. Prechange application-table ACLs are:

| Public table | Owner | Direct ACL |
| --- | --- | --- |
| `Case` | `postgres` | `postgres=arwdDxtm/postgres,labos_verification_app=arwd/postgres` |
| `CaseAssetFile` | `postgres` | same as `Case` |
| `CaseAssetFileVersion` | `postgres` | `postgres=arwdDxtm/postgres,labos_verification_app=ar/postgres` |
| `CaseClinicalUploadEvidence` | `postgres` | same as `CaseAssetFileVersion` |
| `FileUploadGrant` | `postgres` | same as `Case` |
| `Lab` | `postgres` | same as `Case` |
| `ObjectStorageKeyAllocation` | `postgres` | same as `CaseAssetFileVersion` |
| `StoredFile` | `postgres` | same as `CaseAssetFileVersion` |
| `member` | `postgres` | same as `Case` |

This is the prechange catalog snapshot. The ordinary app's existing table-level `FileUploadGrant` UPDATE grant makes column-level UPDATE privilege checks insufficient to prove direct cleanup-column denial; installed trigger guards and bounded runtime tests must be evaluated separately. The role-installation transaction does not revoke existing app DML.

## Target transaction and verification

The exact reviewed script was executed **once** with `psql -X -v ON_ERROR_STOP=1` over the certificate-verified migration-owner session connection. The hash was checked immediately before execution. Output showed `BEGIN`, target guard `DO`, reviewed grants/revokes, one temporary `GRANT ROLE`, five `ALTER FUNCTION`, `REVOKE ROLE`, postcondition `DO`, and `COMMIT`; `psql` and runner both exited 0. No alternate SQL or migration was run. There was no connection ambiguity or rollback event.

Fresh read-only postflight on the same target returned PostgreSQL 17.11, 54 finished migrations, and the single accepted migration-54 checksum row unchanged. All five exact private functions are now owned by `labos_verification_ack_owner`, remain `SECURITY DEFINER`, and retain `search_path=pg_catalog, labos_cleanup_private, pg_temp`.

Postflight function ACLs and effective `EXECUTE` checks agree:

| Private function | Ordinary app | Cleanup role |
| --- | --- | --- |
| `reject_case_s001(text)` | yes | no |
| `claim_object_storage_cleanup(text)` | no | yes |
| `renew_object_storage_cleanup(text,integer)` | no | yes |
| `record_object_storage_cleanup_failure(text,integer,text)` | no | yes |
| `ack_object_storage_cleanup(text,integer)` | no | yes |

Each function's ACL lists only the NOLOGIN owner and the single approved executor; no `PUBLIC`, `anon`, `authenticated`, or `service_role` execute entry remains. `labos_cleanup_private` remains owned by `postgres`; its ACL grants `USAGE` only to the app, worker, and NOLOGIN owner in addition to `postgres` ownership. None of those three has schema `CREATE`.

The only ACK-owner membership row remains `labos_verification_ack_owner / postgres / supabase_admin / ADMIN=t / INHERIT=f / SET=f`. The existing `labos_verification_cleanup / postgres / supabase_admin / t / f / f` creator row also remains. There is no retained `postgres`-granted ACK-owner membership. Effective ACK-owner `SET` and inherited `USAGE` are false for both app and cleanup roles; effective SET is false for `postgres`. The app remains LOGIN and the worker and ACK owner remain NOLOGIN.

The worker has no table-level DML on the nine reviewed Case/Files tables. Its `pg_attribute.attacl` entries are limited to reviewed SELECT columns and `FileUploadGrant` UPDATE of `status`, `expiredAt`, and `updatedAt`; it has no effective UPDATE on `providerCleanupConfirmedAt` or `cleanupLeaseExpiresAt`. The ACK owner has the reviewed column-specific SELECT/UPDATE needed by its private functions. The app retains its prechange table-level DML on the nine reviewed tables, including the five immutable-table restrictions; none of the application role's prechange direct table ACLs was revoked or expanded by this installation. Both app and worker lack table-level TRUNCATE and TRIGGER.

**Direct-write boundary:** `has_column_privilege` reports `UPDATE=true` for the app on `providerCleanupConfirmedAt` and `cleanupLeaseExpiresAt` because of its pre-existing whole-table `FileUploadGrant` UPDATE grant. This is an existing accepted D2 runtime grant, not a new cleanup grant. The enabled `FileUploadGrant_object_cleanup_lifecycle` trigger (`tgenabled=O`) is the database enforcement for scoped OBJECT_STORAGE Case rows: its installed body rejects direct confirmation changes outside the ACK-owner function context and rejects direct lease/claim changes outside the cleanup function context. Catalog and installed-definition inspection establish that boundary structurally; an actual app-role attempt against a synthetic scoped row remains `NOT_RUN` and belongs to the next lifecycle-denial runtime matrix. Do not interpret the table-level grant as an ACK execution permission or claim a direct-SQL denial was executed here.

To confirm existing application access, the pre-existing `labos_verification_app` credential authenticated through the actual transaction pooler on port 6543 with `PGSSLMODE=verify-full` and the local CA. SQL returned `current_user=session_user=labos_verification_app`, database `postgres`, PostgreSQL 17.11. A `SELECT 1 FROM public."AuthUser" LIMIT 0` succeeded without reading or outputting user data. No worker credential or LOGIN was provisioned.

## Remaining A1-I1 work

Worker LOGIN/password provisioning, certificate-verified worker transaction-pooler authentication, synthetic scoped direct-write/claim/ACK denial tests, concurrency and recovery tests, and final A1-I1 runtime acceptance remain `NOT_RUN`. No R2 HEAD/DELETE/object mutation, cleanup scheduling, worker execution, Vercel deployment, or N-FILE-110 activation occurred. This role-install result does not close A1-I1.

Independent V3 target-installation review: **`PASS | RUNTIME_EVIDENCE + CHECKPOINT`**. The reviewer independently queried the certificate-verified target and confirmed migration/checksum, five NOLOGIN-owned functions, exact function ACLs, original-only Supabase creator membership, no retained SET/inherited ACK-owner path, worker ACK-column/TRIGGER/TRUNCATE denials, and the enabled guard body. The reviewer accepted `ROLE_INSTALL_PASS | TARGET_PRIVILEGE_VERIFIED` for the catalog boundary while retaining direct app SQL denial and all worker lifecycle tests as `NOT_RUN`. This is not A1-I1 closure.
