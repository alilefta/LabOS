# A1-I1 verification-project cleanup role boundary — decision proposal

Date: 2026-10-13  
Status: `READ_ONLY_PROPOSAL | PRODUCT_OWNER_DECISION_PENDING`  
Target: isolated synthetic Supabase `labos-verification` (`rvtubjrczuxdxfuazjmr`), not normal development or production.  
Authority: read-only target/catalog inspection and SQL/credential design. **No SQL below was executed.** A1-I1 remains `BLOCKED_DECISION`; N-FILE-110 remains inactive.

## Decision and target evidence

Use the [accepted A1 cleanup design](../../../../plans/authorization-v1/n-file-110-object-storage-cleanup-design.md), [A1-I1 stop](role-feasibility-stop-20261008.md), [A1-R0 packet](../n-file-110-a1-r0/packet.md) and [D1 baseline](../../../../plans/deployment-d1.md). This packet resolves the proposed role topology for the **existing verification target**. It neither replaces production target attestation nor resumes schema, worker or provider implementation.

Authenticated read-only project metadata reports `ACTIVE_HEALTHY`, `eu-central-1`, PostgreSQL `17.11`. Read-only catalog SQL as `postgres` reports 53 finished Prisma migrations; 41 public tables (40 application plus `_prisma_migrations`), all owned by `postgres`; zero public sequences, zero public-table RLS and zero `SECURITY DEFINER` public functions. The `public` schema is owned by `pg_database_owner`. `labos_verification_app` is a LOGIN without `CREATEROLE`, `CREATEDB`, `BYPASSRLS`, schema CREATE or parent memberships; it cannot read `_prisma_migrations`. It has current application DML, including table-wide UPDATE on `FileUploadGrant`, while immutable allocation/StoredFile UPDATE is denied. `postgres` is a member of the app role with `ADMIN TRUE, INHERIT FALSE, SET FALSE`; **the app is not a member of `postgres`**. These are target catalog observations, not an executed cleanup-role test. The existing `postgres` public-table default ACL has no API-role grants; its function default ACL and existing public functions retain PUBLIC/API-role EXECUTE. Do not alter Supabase-managed role definitions, memberships or schemas.

### Recommended identity and operation matrix

| Operation | Identity | Exact ceiling |
| --- | --- | --- |
| LabOS DDL, Prisma migration history, installation of trusted guards/functions | Existing `postgres` only in a controlled migration/DDL channel | Retains ownership of installed LabOS tables; credential absent from Vercel runtime and worker. This privileged control-plane identity is not treated as an ordinary runtime role. |
| User request, Better Auth, authorization and accepted Case completion | Existing `labos_verification_app` in the protected Vercel application | Retain reviewed current DML. Only the trusted server S001 producer may classify definitive `PENDING → FAILED`; a new grant trigger must deny forged cleanup columns/CLEANED even though this role has table-wide UPDATE. No ACK EXECUTE or cleanup provider credential. |
| Exact candidate selection, elapsed `PENDING/UPLOADED → EXPIRED`, terminal claim/lease/retry, and exact-key provider presence/delete | New `labos_verification_cleanup` LOGIN in a **separate run-on-demand local Docker worker** for isolated verification | SELECT only the listed guard tables; UPDATE only reviewed `FileUploadGrant` expiry/claim columns; EXECUTE only the ACK function. It derives the key from grant plus permanent allocation, never caller/listing/prefix input. No table DELETE, DDL, owner membership, or ACK confirmation-column UPDATE. Provider DELETE is an A1-I2 action, disabled in A1-I1. |
| Durable `FAILED/EXPIRED → CLEANED` plus `providerCleanupConfirmedAt` | New `labos_verification_ack_owner` NOLOGIN, owner of one `SECURITY DEFINER` ACK function in a locked private schema | Narrow table SELECT and grant-column UPDATE only. The worker alone may call the function **after** direct exact ABSENT observation. PostgreSQL cannot verify R2 absence; the isolated worker is the remote-attestation trust principal. Ordinary app and API roles cannot call or impersonate it. |

The run-on-demand Docker host is the **proposed verification execution target**, using existing local Docker and outbound Supabase/R2 connectivity; no worker is provisioned, run or scheduled by this decision. A production cleanup host/schedule remains a separate Product Owner choice. Give the Docker process its own pooler `DATABASE_URL` using `labos_verification_cleanup.<project-ref>` on the Frankfurt transaction pooler and certificate/hostname verification; it never receives `postgres`/`DIRECT_URL` or the app credential. Keep that worker DB secret outside the repository and outside all variables of `lab-os-verification-deployment`. A later deletion phase needs a separate verification-bucket-scoped R2 credential mounted only in the worker, not the Vercel application credential; neither R2 credential nor DELETE is needed to prove A1-I1 SQL isolation. Do not put a cleanup function on a public Vercel HTTP route.

## Minimal ordered SQL and credential procedure — **proposal, not migration bytes**

Run only after separate Product Owner execution authority, exact project fingerprint recheck, a reviewed catalog/rollback snapshot and independent SQL review. Role/bootstrap SQL is target-specific; the accepted two-column migration and guard/function bodies must be separately authored and reviewed in A1-I1. Never copy this block into an unreviewed migration or execute it on the development project.

**1. Role bootstrap as isolated migration owner `postgres` (no password in SQL/history):**

```sql
BEGIN;
CREATE ROLE labos_verification_cleanup NOLOGIN NOINHERIT NOCREATEROLE NOCREATEDB NOBYPASSRLS NOREPLICATION;
CREATE ROLE labos_verification_ack_owner NOLOGIN NOINHERIT NOCREATEROLE NOCREATEDB NOBYPASSRLS NOREPLICATION;
CREATE SCHEMA labos_cleanup_private AUTHORIZATION postgres;
REVOKE ALL ON SCHEMA labos_cleanup_private FROM PUBLIC;
GRANT CONNECT ON DATABASE postgres TO labos_verification_cleanup;
GRANT USAGE ON SCHEMA public TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT USAGE ON SCHEMA labos_cleanup_private TO labos_verification_cleanup, labos_verification_ack_owner;
COMMIT;
```

Database CONNECT and TEMP may also be inherited through PUBLIC; the target app role currently has TEMP. Neither grant is a network perimeter, and changing provider-wide PUBLIC database privileges is outside this proposal. Keep the private schema unexposed through Supabase Data API, use qualified trusted objects and `pg_temp` last in the fixed function search path, and assert neither new role has schema CREATE, table ownership or membership in `postgres`, `pg_database_owner`, Supabase managed roles, or each other. PostgreSQL `NOINHERIT` alone does not prevent `SET ROLE`; inspect membership `set_option` and `inherit_option` explicitly.

**2. Provision the worker secret outside repository SQL:** use an attended, TLS-verified migration-owner `psql` session on the exact verification target, with `\password labos_verification_cleanup` so the generated password is not pasted into SQL Editor, a migration file, command arguments or logs; store it directly in a separate worker-only password-manager/secret entry. Then execute `ALTER ROLE labos_verification_cleanup LOGIN;` in the same controlled provisioning window, test the custom-role pooler login and current role, and retain `NOLOGIN`/revoke the secret if verification fails. If an attended secure credential path to the target is unavailable, **stop before LOGIN**. Never place this credential in Vercel. [PostgreSQL documents `\password`](https://www.postgresql.org/docs/17/app-psql.html) as the interactive password-setting command; the exact Supabase pooler route still needs a real login test.

**3. In the separately reviewed additive A1-I1 install transaction, after the two nullable columns and lifecycle/StoredFile guards exist, grant only these worker and function-owner privileges:**

```sql
BEGIN;
GRANT SELECT ("id", "organizationId", "labId", "boundaryId", "targetType", "targetId",
  "status", "provider", "providerFileKey", "expiresAt", "failedAt", "expiredAt",
  "cleanupAttemptCount", "lastCleanupAttemptAt", "cleanupLeaseExpiresAt",
  "cleanupFailureCode", "providerCleanupConfirmedAt")
  ON TABLE public."FileUploadGrant" TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT SELECT ("objectKey", "sourceUploadGrantId", "latestWriteCapabilityExpiresAt")
  ON TABLE public."ObjectStorageKeyAllocation" TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT SELECT ("id", "sourceUploadGrantId", "provider", "providerObjectKey", "organizationId", "labId")
  ON TABLE public."StoredFile" TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT SELECT ("id", "storedFileId", "caseAssetFileId", "organizationId", "labId")
  ON TABLE public."CaseAssetFileVersion" TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT SELECT ("id", "currentVersionId", "dentalCaseId", "labId")
  ON TABLE public."CaseAssetFile" TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT SELECT ("id", "labId") ON TABLE public."Case"
  TO labos_verification_cleanup, labos_verification_ack_owner;
GRANT UPDATE ("status", "expiredAt", "cleanupAttemptCount", "lastCleanupAttemptAt",
  "cleanupLeaseExpiresAt", "cleanupFailureCode", "updatedAt")
  ON TABLE public."FileUploadGrant" TO labos_verification_cleanup;
GRANT UPDATE ("status", "providerCleanupConfirmedAt", "cleanupLeaseExpiresAt",
  "cleanupFailureCode", "updatedAt")
  ON TABLE public."FileUploadGrant" TO labos_verification_ack_owner;
-- Install reviewed scoped lifecycle and StoredFile insertion guards here, before enabling a claim.
-- Install the reviewed ACK body with signature
-- labos_cleanup_private.ack_object_storage_cleanup(text, integer) RETURNS void,
-- LANGUAGE plpgsql SECURITY DEFINER
-- SET search_path = pg_catalog, labos_cleanup_private, pg_temp.
-- Its body accepts grant ID and claim generation only, locks grant first, rechecks
-- terminal state, exact allocation, live lease/generation, latest expiry + 60s,
-- UTC-wall grant expiry where required, and no canonical file/version/current pointer.
REVOKE ALL ON FUNCTION labos_cleanup_private.ack_object_storage_cleanup(text, integer)
  FROM PUBLIC, anon, authenticated, service_role, labos_verification_app;
GRANT EXECUTE ON FUNCTION labos_cleanup_private.ack_object_storage_cleanup(text, integer)
  TO labos_verification_cleanup;
GRANT CREATE ON SCHEMA labos_cleanup_private TO labos_verification_ack_owner;
GRANT labos_verification_ack_owner TO postgres WITH ADMIN TRUE, INHERIT FALSE, SET TRUE;
ALTER FUNCTION labos_cleanup_private.ack_object_storage_cleanup(text, integer)
  OWNER TO labos_verification_ack_owner;
REVOKE CREATE ON SCHEMA labos_cleanup_private FROM labos_verification_ack_owner;
REVOKE labos_verification_ack_owner FROM postgres;
COMMIT;
```

The function-create comment is an intentional **unfilled reviewed-code slot**, not executable SQL or an assertion that A1-I1 exists. The function body, triggers, exact closed rejection codes and two-column migration cannot be finalized merely by granting roles. `FileUploadGrant.id` is `text` and claim generation is `integer` on this target. The function must update `providerCleanupConfirmedAt` as a `timestamptz` absolute instant, while installed grant lifecycle timestamps use UTC-wall `timestamp without time zone`. The trigger permits only the function owner context to set CLEANED/confirmation; an app/worker direct UPDATE, session flag, or spoofed provider result cannot bypass it. A worker with ACK EXECUTE remains able to falsely attest absence if compromised; isolate and audit that credential. Provider DELETE still waits for terminalization, the durable latest-write-expiry + 60-second fence, a fresh canonical check and separately accepted in-flight R2 PUT behavior. ACK requires fresh exact ABSENT after the fence; `DELETE` success alone is insufficient.

The temporary owner membership and schema CREATE exist only inside the controlled transaction and must be absent at commit. PostgreSQL 17 requires the transferring role to be able to `SET ROLE` to the new function owner and that owner to have schema CREATE at transfer; it grants PUBLIC EXECUTE on new functions by default. Revoke and grant in the same transaction. See [PostgreSQL function ownership](https://www.postgresql.org/docs/17/sql-alterfunction.html), [role/column grants](https://www.postgresql.org/docs/17/sql-grant.html) and [safe SECURITY DEFINER functions](https://www.postgresql.org/docs/17/sql-createfunction.html). No `ALTER DEFAULT PRIVILEGES` is required for these two identities: future object access is granted per reviewed migration, preserving immutable-table restrictions. Do not blanket-grant worker rights on future tables or change Supabase-owned defaults.

## Minimum positive/negative target proof before unblocking A1-I1

| Test identity and operation | Required result |
| --- | --- |
| `postgres`: controlled migration/schema/history access; owns grant table and private schema, not the ACK function after install | PASS; runtime/build lacks its credential |
| `labos_verification_app`: existing Prisma/Better Auth signup/session and Case reads/writes; no owner, schema CREATE, CREATEROLE/BYPASSRLS, ACK EXECUTE, owner `SET ROLE` or direct CLEANED/confirmation update | Positive app paths PASS; every cleanup-only path DENIED with unchanged rows |
| `labos_verification_cleanup`: custom-role transaction-pooler TLS login, exact candidate SELECT, elapsed expiry/claim/retry; no table-wide UPDATE, confirmation-column UPDATE, DELETE, DDL, trigger alteration or owner assumption | Allowed operations PASS; prohibitions DENIED |
| `labos_verification_ack_owner`: NOLOGIN, narrow function ownership/guard-table grants, no schema CREATE after commit; no membership path from app/worker | Catalog checks PASS; direct login DENIED |
| Worker ACK on live generation after direct exact ABSENT; stale/expired lease, unelapsed fence, missing allocation, ambiguous presence, CONSUMED/StoredFile/version/current pointer, concurrent attachment/claim and spoofed app ACK | One legitimate terminal `CLEANED` PASS only after absence; every other case DENIED/RETRYABLE with evidence intact |
| API roles and PUBLIC: ACK schema/function; effective grants through memberships/default ACLs | No ACK EXECUTE/USAGE or cleanup-table mutation path; installed provider-managed roles unchanged |

Use `has_table_privilege`, `has_column_privilege`, `has_function_privilege`, `has_schema_privilege`, `pg_auth_members` (`admin_option`, `inherit_option`, `set_option`), object owner/ACL catalogs and actual non-owner connections. Test under non-UTC PostgreSQL session and through the actual transaction pooler. The verification project has no RLS on application tables; this role boundary **does not replace** application tenant authorization. A future RLS change requires its own compatibility decision.

## Recovery, unresolved gates and disposition

Keep the prechange catalog/grant snapshot and app's proven DML. Before worker enablement, rollback is disabling the new cleanup login and removing only newly created unused role/schema/privileges under a separately reviewed operation; never drop evidence, allocation or grants. After A1-I1 migration installation, preserve migration history and correct forward or restore from an authorized backup; app rollback alone does not undo SQL. If a worker crashes after DELETE but before ACK, keep FAILED/EXPIRED and retry with a new claim and exact presence/absence inspection. Disable worker issuance/DELETE/ACK first if any denial or fence test fails. No cleanup schedule or R2 DELETE is authorized now.

**Proposed decision:** target catalogs make the four-identity split plausible with **two new roles** and the existing migration/app roles. Target-specific role creation, ownership transfer, custom-role pooler login, guard enforcement and privilege denial remain `NOT_RUN`; Supabase's protected managed roles and available administrative power must be tested without altering managed definitions/memberships. The exact secure worker credential channel and function ownership transfer are execution gates. A1-I1 may proceed to a bounded implementation attempt **only after** Product Owner approval of this proposal and separate target-specific mutation authority, with independent SQL review first. It remains `BLOCKED_DECISION` until the actual role/guard boundary passes; A1-I2/provider deletion and N-FILE-110 activation remain unauthorized. Production role isolation is not established by this verification target.

Independent V3 security/SQL decision review: **`PASS | CHECKPOINT`**. The read-only reviewer independently checked the four-identity boundary, PG17 ownership-transfer prerequisites, column-scoped grants, private schema and fixed definer search path, ACK denial model and preservation of the accepted lifecycle fences. The reviewer confirmed the function/trigger body is intentionally an unfilled A1-I1 implementation slot and that role creation, custom-role pooler login, ownership transfer, guard enforcement and R2 absence/deletion remain `NOT_RUN`. This review does not authorize SQL execution or clear A1-I1's `BLOCKED_DECISION` status.
