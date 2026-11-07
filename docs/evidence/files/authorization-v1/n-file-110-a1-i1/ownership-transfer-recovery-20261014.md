# A1-I1 ownership-transfer recovery proposal

Date: 2026-10-14  
Status: `BLOCKED_DECISION` for A1-I1 target installation; disposable PostgreSQL 17.11 recovery sequence PASS, target mutation not authorized  
Target: isolated Supabase `labos-verification` (`rvtubjrczuxdxfuazjmr`), database `postgres`, PostgreSQL 17.11

## Boundary and observed state

Migration `20261013120000_case_object_storage_cleanup` is installed as migration 54 with SHA-256 `d3a66ee3ce9f903dbebb734074cff3a0dc8108fca1efcc512861b5c8d3510f16`. Its five private functions and two nullable fields are preserved. Both `labos_verification_cleanup` and `labos_verification_ack_owner` exist as NOLOGIN. The [failed role-install script](verification-role-install.sql) rolled back entirely at the temporary membership grant. No worker credential, provider operation, or cleanup activation exists. The detailed [implementation record](implementation-20261013.md) retains the failure and prior reviews.

Read-only catalog inspection authenticated as `postgres` through the verification project's session pooler with `sslmode=verify-full` and the local CA. `current_user=current_database()=postgres`; server version is 17.11. The relevant `pg_auth_members` rows are:

| Granted role | Member | Grantor | ADMIN | INHERIT | SET |
| --- | --- | --- | --- | --- | --- |
| `labos_verification_ack_owner` | `postgres` | `supabase_admin` | true | false | false |
| `labos_verification_cleanup` | `postgres` | `supabase_admin` | true | false | false |

`pg_has_role('postgres','labos_verification_ack_owner','MEMBER')` is true, while `USAGE` and `SET` are false. The ACK owner has no `CREATE` on `labos_cleanup_private`. No target membership, ACL, role or function mutation was performed in this investigation.

## Root cause and supported recovery path

The failed statement asked `postgres` to grant itself ACK-owner membership with `ADMIN TRUE` while `postgres` already holds an `ADMIN TRUE` membership granted by `supabase_admin`. PostgreSQL rejects the circular administrative grant with `ADMIN option cannot be granted back to your own grantor`. The existing row does not permit `SET ROLE`, so it cannot by itself satisfy the [ownership-transfer requirement](https://www.postgresql.org/docs/17/sql-alterfunction.html) that the current owner be able to become the new owner. PostgreSQL 17's [CREATEROLE behavior](https://www.postgresql.org/docs/17/role-attributes.html) explains the creator membership with ADMIN true, SET false and INHERIT false; [membership options and grantors](https://www.postgresql.org/docs/17/sql-grant.html) are recorded per grant in [`pg_auth_members`](https://www.postgresql.org/docs/17/catalog-pg-auth-members.html).

The minimum candidate is a second, explicitly `postgres`-granted membership with `ADMIN FALSE, INHERIT FALSE, SET TRUE`, solely inside the role-install transaction. It leaves the `supabase_admin` grant intact. After transfer of the five exact functions, revoke only `GRANTED BY postgres` membership and temporary private-schema CREATE before commit. The [proposed recovery SQL](verification-role-install-recovery.sql) retains the other previously reviewed grants and function signatures, adds target/migration/membership guards, and checks final ownership and absence of effective SET permission. It is **not an executable authorization**. Its grantor-specific behavior still needs a PostgreSQL 17 disposable test or separately authorized target trial before installation.

The original script's unqualified `REVOKE labos_verification_ack_owner FROM postgres` and its expectation of no membership are wrong for this target: they would target the creator membership that this recovery must preserve. Do not alter the Supabase-managed grant or the installed migration.

Other options are less suitable: using `SET ROLE` immediately fails because the current grant has `SET FALSE`; transferring as `supabase_admin` or modifying its grant is outside the approved role boundary; making the ACK owner LOGIN or leaving permanent SET membership weakens separation. If an explicitly self-granted temporary SET row is rejected by the target, stop and seek Supabase-supported administrative assistance or a new Product Owner decision. Do not substitute a permanent membership or postgres-owned definer function.

## Disposable PostgreSQL 17.11 execution

The earlier attempt to obtain a PostgreSQL 17 runtime through Docker remained unavailable: Docker Desktop's daemon pipe was absent, and the service could not be started. An initial sandboxed PostgreSQL 18 `initdb` had failed to create its restricted token; an elevated run-owned initialization probe showed local database initialization was feasible. These failures remain historical attempts, not test passes.

The PostgreSQL 17.11 Windows x64 binary archive was then downloaded from [EDB's published binary distribution](https://www.enterprisedb.com/download-postgresql-binaries). The exact archive was `postgresql-17.11-3-windows-x64-binaries.zip`; measured SHA-256 `4b8db0930c38f6ef845db919551dedda3b6b845aeb0927b3d79a6e8e9e4537cf` matched [EDB's published checksum](https://github.com/EnterpriseDB/edb-installers/issues/682). Only `pgsql/bin`, `pgsql/lib`, and `pgsql/share` were extracted into a run-owned `.tmp/a1-pg17-owner-test` directory. `postgres --version` and `initdb --version` both reported 17.11. The disposable cluster used local trust authentication, listened only on `127.0.0.1:55437`, and had no connection to Supabase or application data.

The bootstrap superuser was named `supabase_admin`; it created `postgres LOGIN CREATEROLE NOINHERIT` and a private schema owned by `postgres`. As `postgres`, creating `labos_verification_ack_owner NOLOGIN` automatically produced exactly the relevant membership row: grantor `supabase_admin`, `ADMIN=true`, `INHERIT=false`, `SET=false`. Five structurally equivalent private `SECURITY DEFINER` functions used the **exact five installed signatures** but trivial `SELECT 1` bodies; their clinical logic was not executed. The original `GRANT ... WITH ADMIN TRUE, INHERIT FALSE, SET TRUE` failed with the same `ADMIN option cannot be granted back to your own grantor` error (exit 1).

The recovery transaction granted temporary private-schema CREATE to the ACK owner and `GRANT labos_verification_ack_owner TO postgres WITH ADMIN FALSE, INHERIT FALSE, SET TRUE GRANTED BY postgres`. It verified temporary effective SET, transferred all five function owners, revoked CREATE, and ran `REVOKE labos_verification_ack_owner FROM postgres GRANTED BY postgres` before `COMMIT`. Exit 0; five owner transfers and COMMIT succeeded. Post-commit catalogs showed exactly the original `supabase_admin`-granted row (`true/false/false`), effective `SET=false`, and ACK-owner private-schema `CREATE=false`.

Separate disposable runtime roles were then created: `labos_verification_app LOGIN NOINHERIT` by `supabase_admin`, and `labos_verification_cleanup NOLOGIN` by `postgres`. The following read-only query was saved as `verify-runtime-roles.sql` in the run-owned harness and executed with `psql -X -A -F '|' -t -v ON_ERROR_STOP=1` (exit 0):

```sql
SELECT r.rolname,
  pg_has_role(r.oid, 'labos_verification_ack_owner'::regrole, 'SET'),
  pg_has_role(r.oid, 'labos_verification_ack_owner'::regrole, 'USAGE'),
  has_schema_privilege(r.oid, 'labos_cleanup_private'::regnamespace, 'CREATE')
FROM pg_roles r
WHERE r.rolname IN ('labos_verification_app', 'labos_verification_cleanup')
ORDER BY r.rolname;
```

Results were `labos_verification_app|f|f|f` and `labos_verification_cleanup|f|f|f`. A companion catalog query returned the single ACK-owner membership `postgres|supabase_admin|t|f|f`. These outputs are part of the disposable test only; the actual target's application/worker effective privileges still require post-install verification.

For failure injection, a sixth run-owned `rollback_probe(integer)` function was created as `postgres`. A new transaction repeated temporary CREATE and SET grants and transferred that probe to ACK owner, then deliberately raised an exception before commit (`psql` exit 3). After the connection closed, the probe remained owned by `postgres`; only the original `supabase_admin` membership remained; effective SET and ACK-owner schema CREATE were both false. This demonstrates transactional rollback of the temporary grant and owner change.

**Disposition:** `PASS` for the grant/transfer/grantor-specific-revoke mechanism on meaningfully representative PostgreSQL 17.11 roles. The disposable cluster is not Supabase: managed-role restrictions, connection behavior, exact installed function bodies, and target-specific ACLs remain untested by this runtime. The complete [recovery installation SQL](verification-role-install-recovery.sql) was not executed against the disposable database because it also depends on all installed LabOS tables and migration rows; the ownership section and exact five signatures were exercised structurally. This is not target installation proof.

After evidence capture and independent review, `pg_ctl -m fast -w stop` reported `server stopped`. Port `127.0.0.1:55437` had no listener. The resolved disposable path and its cluster/harness markers were checked under the workspace before recursive deletion; `.tmp/a1-pg17-owner-test` was removed, and `Test-Path` returned false. No existing Docker resource, normal development database, Supabase target, or application fixture was touched.

For a future separately authorized installation, first rerun the strict read-only target checks. Then execute the proposed script once via the verified migration-owner session connection with `ON_ERROR_STOP`, in one transaction. A SQL error must abort and roll back the transaction. If connection outcome is ambiguous, inspect the five function owners, exact memberships, schema CREATE, function EXECUTE, and table ACLs read-only before any retry. Preserve migration 54 and its checksum. Never run the old failed script. Do not grant worker LOGIN or provision a credential until the post-install role boundary passes.

Expected committed state: five private functions owned by `labos_verification_ack_owner` (NOLOGIN); worker has only the reviewed narrow function EXECUTE and table/column privileges; ordinary app has only S001 definitive-rejection EXECUTE and no cleanup ACK/claim/renew/failure EXECUTE; neither app nor worker can SET ROLE to ACK owner or directly update ACK-only columns; ACK owner has no schema CREATE; `postgres` retains only its original `supabase_admin`-granted ADMIN/NOINHERIT/NOSET creator membership. The migration identity's standing CREATEROLE authority is a separate privileged-administrator trust boundary, not ordinary runtime authority.

## Decision

Retain A1-I1 as `BLOCKED_DECISION`. The mechanism passed PostgreSQL 17.11 disposable verification, but it is not a verified Supabase target fix. Separate Product Owner mutation authority is required before any verification-project grant or ownership change. N-FILE-110 remains inactive; no R2 object operation is part of this recovery.

Independent V3 SQL/design review history: first pass returned `CORRECTION_REQUIRED | ARCHITECTURE/DECISION + SQL DESIGN` because direct-membership checks alone would miss an indirect `SET` or inherited `USAGE` path from the application or worker to ACK owner. The recovery script now checks both effective paths for both roles before and after installation, and checks private-schema CREATE denial. Independent rereview returned **`PASS | ARCHITECTURE/DECISION + SQL DESIGN`**. Disposable runtime review first returned `CORRECTION_REQUIRED | RUNTIME_EVIDENCE + SQL DESIGN` because the app/worker denial query was not included in the saved harness; it was added, rerun, and recorded above. Independent rereview returned `PASS | RUNTIME_EVIDENCE + SQL DESIGN` pending run-owned teardown. After the teardown recorded above, the reviewer confirmed final **`PASS | RUNTIME_EVIDENCE + SQL DESIGN`**. Neither review is Supabase target runtime acceptance.
