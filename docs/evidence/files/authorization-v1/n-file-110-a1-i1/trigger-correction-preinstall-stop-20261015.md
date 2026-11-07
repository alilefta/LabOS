# A1-I1 trigger correction — pre-installation stop

Date: 2026-10-15  
Target: isolated Supabase `labos-verification` (`rvtubjrczuxdxfuazjmr`)  
Outcome: `CORRECTION_REQUIRED | CODE/SQL + RUNTIME_EVIDENCE + CHECKPOINT`; A1-I1 remains `BLOCKED_DECISION`.

The [October 15 runtime stop](final-runtime-verification-20261015.md) remains historical evidence. This attempt did not install a migration, modify target data or privileges, invoke R2, or run a cleanup worker.

## Candidate and review

The uninstalled forward-only candidate is `prisma/migrations/20261015120000_case_cleanup_trigger_relation_qualification/migration.sql`, SHA-256 `899393e01e0f601bde0b707114459ce959058b86e24fec068d076fc77284de24`. It changes only relation qualifications in the installed `public."FileUploadGrant_case_identity_guard"()` (`public."member"`, `public."Lab"`, `public."Case"`) and `public."FileUploadGrant_case_uploaded_evidence_final_state"()` (the grant row type and three table reads). Comparison with their last applied definitions found unchanged predicates, errors and signatures. It neither broadens a search path nor changes trigger bindings, ownership, security mode or grants. It is a candidate, **not an installed migration**.

Disposable PostgreSQL 17.6 reproduced the old `relation "member" does not exist` failure when a restricted-path `SECURITY DEFINER` function updated a synthetic `PENDING` grant; the row remained unchanged. After applying the candidate in that disposable database, an application role with target-like SELECT privileges completed `PENDING → FAILED`. The disposable container was removed. This proves the specific name-resolution correction in a representative runtime, not Supabase installation or the full A1-I1 lifecycle.

The same disposable test found a second blocking composition defect at the deferred trigger boundary. A worker role with private-function EXECUTE but without `FileUploadGrant` SELECT invoked a definer update in a transaction. The function call returned, but `COMMIT` failed `permission denied for table FileUploadGrant` inside `FileUploadGrant_case_uploaded_evidence_final_state()` at its `SELECT *`; the synthetic row remained `PENDING`. This trigger executes at transaction end under the outer restricted worker. Read-only target ACL inspection confirms `labos_verification_cleanup` lacks effective `FileUploadGrant` SELECT, while `labos_verification_app` has it. The candidate's table qualifications do not resolve this worker failure.

Independent V3 pre-installation review: **`CORRECTION_REQUIRED | CODE + RUNTIME_EVIDENCE + CHECKPOINT`**. The reviewer found the textual qualification narrow and correct, but rejected target installation as a complete runtime correction because the worker's deferred-trigger read would still fail. Options needing a separate Product Owner decision and independent SQL/security review include a precisely scoped worker read with matching trigger refactor, a hardened definer context for the deferred guard, or forcing deferred evaluation inside each trusted private status writer. None is authorized implicitly by this task.

## Target preflight and preserved state

A certificate-verified, read-only migration-owner session returned database/current user/session user `postgres/postgres/postgres`, PostgreSQL 17.11. All 54 installed Prisma migrations were finished with repository-matching names and SHA-256 checksums; migration 54 retained `d3a66ee3ce9f903dbebb734074cff3a0dc8108fca1efcc512861b5c8d3510f16`. Exactly the candidate migration was pending locally. The five private functions still had the accepted NOLOGIN ACK owner, `SECURITY DEFINER` mode, fixed search paths and role-specific EXECUTE ACLs. The two older public trigger functions are owned by `postgres`, are invoker functions, and remain attached and enabled. Both application and worker still lack an ACK-owner SET path. No target migration or SQL mutation occurred.

The existing worker vault credential and LOGIN were not changed. Earlier certificate-verified transaction-pooler authentication remains the only worker login evidence; it was not rerun in this stopped attempt. The three grants and allocations with prefix `a1i1rt-20261015-cc4a1590` remain exactly as identified in the earlier runtime stop record. No fixture was added, modified or removed here. The S001 target rerun, worker lifecycle matrix, concurrency/rollback/non-UTC checks, Prisma/Better Auth post-test and final V3 runtime review are **`NOT_RUN`**.

Next decision: authorize a separately reviewed minimum correction to the worker/deferred-trigger permission boundary, then re-review the combined migration before installing anything on `labos-verification`. N-FILE-110 stays inactive; A1-I2 remains unauthorized.
