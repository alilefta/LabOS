# A1-I1 role-feasibility stop — 2026-10-08

Status: **BLOCKED_DECISION before schema work**. Scope: read-only intended-role preflight only. No A1-I1 migration, Prisma/schema edit, application code, database mutation, provider operation, staging, commit or push occurred.

## Authority and target

The Product Owner accepted [A1 design](../../../../plans/authorization-v1/n-file-110-object-storage-cleanup-design.md) as CLOSED | PASS and authorized A1-I1 only with a mandatory precondition: establish feasibility of a dedicated restricted cleanup acknowledgment role and separate function owner for the intended deployment target **before irreversible schema work**. An application-only ACK guard is prohibited.

The repository uses `DATABASE_URL` for the ordinary Prisma runtime client and `DIRECT_URL` for Prisma migration. The current local environment's effective files have both variables in `.env`; `.env.local` does not override either. Sanitized URL parsing found the same database username, host and database for both; runtime uses the pooler port and migration the direct port. The host fingerprint is `SHA-256(host)[:12] = eb0d823953fe`, matching the previously attested normal-development host. No credentials, hostnames or complete URLs were printed or retained.

A single read-only transaction against that attested normal-development target inspected only PostgreSQL role/catalog metadata. Result: `transaction_read_only=true`; ordinary runtime role `rolsuper=false`, `rolcreaterole=true`, `FileUploadGrant owner=true`, member of table-owner role `true`. The transaction was rolled back. No target data or fixture was read or changed.

## Exact conflict

Under the currently configured model, the ordinary application identity is also the table owner. A table owner can alter/disable the lifecycle trigger and can control object privileges; `rolcreaterole` further prevents treating that identity as a restricted runtime principal. A dedicated `SECURITY DEFINER` ACK function and separate cleanup login cannot enforce the accepted boundary while ordinary application traffic continues to connect as this owner. The repository provides no attested, separately configured intended deployment runtime/cleanup role model. Creating a role in a candidate migration while continuing to use the owner credential for `DATABASE_URL` would be a false isolation claim.

This is a **configured-role-model blocker**, not proof that PostgreSQL cannot support the architecture. The accepted design remains valid. Do not substitute a service-only boolean, trigger session flag, or ordinary application role as ACK authority.

## Required Product Owner decision to resume

Authorize and identify an intended deployment role/credential split for this checkpoint:

1. A migration/DDL owner used only by the separately controlled migration path.
2. An ordinary application runtime role that does **not** own `FileUploadGrant`, cannot assume its owner/function-owner roles, cannot create roles, and cannot ALTER/DISABLE guards or execute the ACK function.
3. A distinct cleanup worker login with only the required normal claim operations and EXECUTE on the narrow ACK function; it cannot assume the function owner or alter guards.
4. A no-login, non-inheritable ACK function owner with a fixed `search_path` and no general runtime use.

Confirm that the intended database service and deployment configuration can provision/use these identities, and authorize the bounded configuration/credential work needed to attest them. Existing normal-development credentials must not be silently repurposed or rotated under A1-I1. Once the model is attested, A1-I1 can resume with the already authorized additive migration candidate, disposable PostgreSQL verification, and independent V3 CODE/SQL + RUNTIME_EVIDENCE review. If the intended provider cannot support separation, request a new security architecture decision; do not weaken the accepted contract.

A1-I1 code, migration checksum, disposable test matrix and independent code/runtime verdict are **NOT_RUN**. N-FILE-110 remains inactive. A1-I2 and A2–A5 remain unauthorized.



## Independent read-only V3 stop review

**PASS | BLOCKED_DECISION REVIEW.** The reviewer independently found no configured separate runtime/cleanup role model. The current app identity owns FileUploadGrant, is a member of its owner role, and has CREATEROLE; it could bypass a trigger while used for ordinary traffic. A disposable role split alone would prove PostgreSQL mechanics, not intended deployment isolation. The reviewer confirmed that no authorized safe path permits schema work now and that this is a configured/deployment-role-model blocker, not a PostgreSQL capability failure. This verdict does **not** constitute CODE/SQL or RUNTIME_EVIDENCE PASS; both remain NOT_RUN.

