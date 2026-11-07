# A1-I1 final runtime verification — stopped

Date: 2026-10-15  
Target: isolated Supabase `labos-verification` (`rvtubjrczuxdxfuazjmr`)  
Authority: Product Owner A1-I1 Final Runtime Verification  
Outcome: `BLOCKED_DECISION`; A1-I1 is not closed and N-FILE-110 remains inactive.

## Fresh preflight and worker identity

- The certificate-verified migration-owner session reached database `postgres` as `postgres` on PostgreSQL 17.11. All 54 Prisma migrations were finished; migration 54 retained checksum `d3a66ee3ce9f903dbebb734074cff3a0dc8108fca1efcc512861b5c8d3510f16`.
- The five private functions remained `SECURITY DEFINER` and owned by `labos_verification_ack_owner`. The approved S001 function was executable by the application role only; the four cleanup functions were executable by the cleanup role only. The pre-existing Supabase creator membership was unchanged. Before provisioning, the cleanup and ACK-owner roles were both `NOLOGIN`.
- A disposable Windows Credential Manager entry round-trip passed; a later vault listing confirmed the probe absent. A fresh, independently generated 64-character password was stored only as generic credential `LabOS/labos-verification/cleanup-worker` for `labos_verification_cleanup`. No password, full URL, token, or credential verifier was written to repository files or evidence. A client-generated SCRAM-SHA-256 verifier was supplied to PostgreSQL over the certificate-verified migration connection; only `labos_verification_cleanup` was changed to `LOGIN`.
- The worker authenticated through the Frankfurt transaction pooler on port 6543 with `PGSSLMODE=verify-full` and the local Supabase CA. SQL returned `current_user=session_user=labos_verification_cleanup`, database `postgres`, version 17.11. Client-side `psql \\conninfo` reported an SSL connection using TLS 1.3. The backend `pg_stat_ssl` row reported `false`; behind the pooler that row describes the pooler-to-database leg and is not evidence against the separately observed client-to-pooler TLS session.
- Read-only postflight showed LOGIN true and CREATEROLE, CREATEDB, SUPERUSER, BYPASSRLS false. The worker could neither SET nor inherit the ACK owner, had no CREATE on `public` or `labos_cleanup_private`, no UPDATE privilege on `providerCleanupConfirmedAt` or `cleanupLeaseExpiresAt`, and no SELECT on `AuthUser`. The ordinary application role still had its existing broad table UPDATE, so scoped direct-write denial depends on the installed trigger.

The credential remains in the worker-specific local Windows vault and is not installed in Vercel. No cleanup worker process or schedule exists. Credential rotation/revocation is the operator's recovery responsibility if this local secret store is no longer trusted.

## Executed synthetic tests

| Check | Actual result |
| --- | --- |
| Wrong-tenant Case grant insertion | `PASS`: an attempted grant targeting a Case in a different Organization/Lab raised `Invalid Case clinical grant target`; the attempted grant and second tenant parents were rolled back/removed within the fixture transaction. |
| Application direct `PENDING → CLEANED` | `PASS` for this attempted transition: `FileUploadGrant_object_cleanup_guard` raised `Invalid Case cleanup state transition`; postflight confirmed the row remained `PENDING` with no confirmation. The test wrapper expected a different denial text and stopped, so the other direct-write cases were not executed. |
| Application S001 definitive rejection | `FAIL`: the actual restricted application role invoked its approved `reject_case_s001(text)` function. Its UPDATE called the older `FileUploadGrant_case_identity_guard` trigger, which failed with `relation "member" does not exist`. The grant remained `PENDING`; no S001 rejection committed. |

The S001 private function fixes `search_path=pg_catalog, labos_cleanup_private, pg_temp`. The installed older identity trigger has no function-specific search path and refers to unqualified `"member"`, `"Lab"`, and `"Case"`. That trigger inherits the private function's path when its UPDATE runs, so it cannot resolve `public.member`. The fixture insert had succeeded under the migration-owner session's ordinary path, which does not establish S001 compatibility. This is an installed SQL composition defect, not a missing worker grant. No accepted migration SQL was edited or reapplied.

The remaining direct-write denials, worker terminalization/claim/renewal/failure/ACK, stale and expired claims, retry delay, canonical-file exclusion, 60-second fence, concurrent claims, rollback, non-UTC sessions, and post-test Prisma/Better Auth checks are `NOT_RUN` after this blocker. An SQL ACK was not executed; no R2 operation occurred. The worker was not used to run cleanup.

## Fixture and recovery state

Two setup attempts failed inside transactions and left zero rows: the first used an invalid object-key shape; the second redundantly inserted allocations already created by the installed grant trigger. The corrected transaction committed one run-owned synthetic tenant and three `PENDING` grants. No clinical evidence or StoredFile was inserted. Exact retained identities:

- Run prefix: `a1i1rt-20261015-cc4a1590`
- Organization `a1i1rt-20261015-cc4a1590-org`; Lab `a1i1rt-20261015-cc4a1590-lab`; AuthUser `a1i1rt-20261015-cc4a1590-user`; member `a1i1rt-20261015-cc4a1590-member`; Patient `a1i1rt-20261015-cc4a1590-patient`; Case `a1i1rt-20261015-cc4a1590-case`.
- Grants `a1i1rt-20261015-cc4a1590-valid`, `a1i1rt-20261015-cc4a1590-fence`, `a1i1rt-20261015-cc4a1590-expired`; exact allocated keys `objects/c5cbdbad-c629-4926-a04a-3d4780d539c7`, `objects/98496c3a-dfa4-4167-b4e8-45e9ff753fbd`, and `objects/f488de28-aa72-4d00-9ec0-0e6d8fea0573`, respectively. These are database-only keys with no R2 object or issued write capability.

Postflight counted one run-owned Organization, three `PENDING` grants and three allocations, with zero Case clinical evidence and zero StoredFile rows. The installed scoped-grant and allocation triggers prohibit deletion, so these exact synthetic rows were left intact rather than bypassing accepted immutability. The attempted wrong-tenant grant and its second tenant have no committed rows. Pre-existing D2 accounts and evidence were untouched.

## Required correction and next authority

Stop the runtime matrix. A separately reviewed additive SQL correction must make the older Case identity trigger's relation lookup deterministic when called under the private functions' fixed search path, while retaining the accepted identity and authorization checks. Fully qualifying the trigger's `public` table references is the narrow candidate; a new migration, independent SQL/security review, installation authority, and repeat S001 plus full lifecycle matrix are required. Do not rewrite migration 54 or older applied migrations. No R2 deletion, worker implementation, schedule, Vercel change, or clinical activation is authorized by this stop record.

Independent V3: **`CORRECTION_REQUIRED | RUNTIME_EVIDENCE + CHECKPOINT`**. The reviewer independently confirmed that the unqualified older trigger references inherit the private S001 function's search path and that the failed S001 update rolled back. The review found no observed lifecycle bypass or forged ACK. It also found the test wrapper's exact-error-text assertion too brittle: rerun direct denials by checking SQLSTATE and unchanged row state. The reviewer requires a separately reviewed additive migration that preserves the trigger's accepted logic and invoker semantics while fully qualifying `public."member"`, `public."Lab"`, and `public."Case"`. A1-I1 remains `BLOCKED_DECISION`.
