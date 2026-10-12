# S001 migration transactional-install correction

Status: **independent V3 PASS | CODE/SQL; review-only corrected candidate; corrected runtime NOT_RUN**.

The Product Owner authorized correction only of the failed-install boundary in `prisma/migrations/20261002120000_case_s001_evidence_identity/migration.sql`. The [previous disposable packet](s001-disposable-postgres-20261002/packet.md) remains unchanged: candidate SHA-256 `cf95d2e3b9beed366e493b78f3e5fa8fd2c6771e4d2f8159c090cf87306909c8`, RV-S001-01–09 PASS, RV-S001-10 FAIL, RV-S001-11 NOT_RUN, overall FAIL, independent `CORRECTION_REQUIRED | RUNTIME_EVIDENCE + SQL/CHECKPOINT`. No real development/staging/production target has this migration installed.

## Execution finding and correction basis

The actual installed CLI is Prisma 7.8.0. Under its repository `prisma migrate deploy` path, an injected statement failure after the old candidate's DDL left the new enum, seven columns and CHECK present while Prisma recorded a failed migration row rather than success. That directly proves the old migration statements were not protected by one effective transaction. It does **not** prove the Prisma bookkeeping row itself is transactional with application DDL.

This repository already uses explicit `BEGIN;` / `COMMIT;` in its C2 and public-access PostgreSQL migrations. Migration 50 deliberately placed `ALTER TYPE ... ADD VALUE` outside its transaction because that newly added value could not be used in the same transaction. The S001 migration does **not** add a value to an existing enum: it `CREATE TYPE`s a new enum, adds columns using it, and adds an ordinary table CHECK. These statements are valid together inside a PostgreSQL transaction; no concurrent-index or other transaction-prohibited operation appears. PostgreSQL's [BEGIN documentation](https://www.postgresql.org/docs/18/sql-begin.html) defines statement grouping through COMMIT/ROLLBACK; its [enum documentation](https://www.postgresql.org/docs/18/datatype-enum.html) shows a newly created enum used in subsequent table definitions. The installed Prisma CLI's acceptance of explicit transaction statements in previous repository migrations and the old runtime failure distinguish SQL rollback from Prisma's external migration-history bookkeeping. The corrected candidate still requires its own fresh Prisma/PostgreSQL runtime proof.

The in-place, unapplied review-only candidate now inserts `BEGIN;` immediately before `CREATE TYPE` and `COMMIT;` immediately after the CHECK. There is exactly one BEGIN and one COMMIT. A successful SQL execution closes the transaction; an error before COMMIT should abort/roll back the enum, seven columns and CHECK together. Prisma may still retain a failed bookkeeping row outside that rolled-back DDL, as the earlier runtime observed. Do not equate such a row with partially committed application schema.

## Exact identity and static checks

New candidate SHA-256: **`c322412de3c40f697407ce74a062afb797b2554a98fa5e8393e1c4bfe8c8bb88`**. The old failed candidate SHA remains identified above and in its historical runtime packet. Removing only the inserted `BEGIN;` and `COMMIT;` lines from the corrected file reconstructs byte-for-byte the old failed candidate SHA `cf95d2e3b9beed366e493b78f3e5fa8fd2c6771e4d2f8159c090cf87306909c8`; thus the exact SQL semantic delta is transaction grouping only. No Prisma schema, enum value, column type/nullability/default, S001 CHECK expression, or existing trigger was changed.

Direct installed `node_modules/.bin/prisma.cmd validate` passed, exit 0. `git diff --check` passed for affected tracked files. The corrected migration is untracked/review-only, so its exact byte comparison and SHA above are the authoritative focused diff check; no database was contacted by these static checks. The new candidate has **NOT_RUN** PostgreSQL runtime status; the prior runtime FAIL is not promoted to PASS.

## Review focus and successor

Independent V3 CODE/SQL review must inspect the actual SQL ordering, historical hash reconstruction, repository convention, and preservation of every identity/null/immutability/finalization semantic. If accepted, the **single successor** is a fresh isolated disposable PostgreSQL verification of the entire corrected candidate and its hash, including injected post-DDL/pre-COMMIT failure, Prisma history behavior, schema reconciliation and exact cleanup. No normal-development migration application, S001 validator implementation or clinical finalization follows from this correction.

## Independent review result

The independent V3 Reviewer inspected the exact corrected SQL, old-hash reconstruction, relevant repository transaction conventions, Prisma schema, and historical failed-runtime packet. Verdict: **PASS | CODE/SQL**. It confirmed the only candidate delta is the explicit transaction, success closes it, PostgreSQL DDL is transaction-safe, historical/S001 semantics are unchanged, and Prisma failed-migration bookkeeping remains separate. Corrected-candidate PostgreSQL runtime is **NOT_RUN**; no runtime PASS is inferred.
