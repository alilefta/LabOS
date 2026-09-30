# C2 — Additive Case file persistence

Status: CLOSED at the development persistence level. Code acceptance PASS;
disposable PostgreSQL verification PASS; normal-development migration PASS
after independent V3 reviews. Migration
`20260927120000_c2_case_file_persistence` is installed in development with
SHA-256 `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
Managed Case-file/provider activation remains unavailable.
Tier: V3, independent `CODE` review after separate authorization

The Product Owner authorized exact read-only planning on 2026-09-25. The
[C2 exact schema and migration proposal](../../evidence/files/authorization-v1/c2-case-file-persistence/exact-schema-design.md)
is the decision packet. It specifies models, composite relations, nullable
current-version sequencing, proposed deferred database guard, fresh migration
preflight, legacy treatment, compatibility, and feature-disable rollback.
The composite cyclic relation validates with installed Prisma 7.8.0. The
[review-only SQL and safety packet](../../evidence/files/authorization-v1/c2-case-file-persistence/schema-authoring-safety-packet.md)
are authored but not applied. The [independent CODE review](../../evidence/files/authorization-v1/c2-case-file-persistence/code-review.md)
required a separately authorized, fail-closed Case read-contract adaptation:
nullable generated legacy URL fields produced TS2322 in two Case helper
projections. The [mixed-read correction](../../evidence/files/authorization-v1/c2-case-file-persistence/mixed-read-code-verification.md)
resolved the diagnostics and passed independent V3 CODE rereview. Do not
claim migration readiness from code acceptance.
The [development validation attempt](../../evidence/files/authorization-v1/c2-case-file-persistence/development-migration-validation.md)
attested the approved development target and stopped at the safety packet's
tenant-linkage invariant. Its corrected stop evidence passed independent V3
`RUNTIME_EVIDENCE` review; no migration SQL was generated or applied.
The [subsequent read-only diagnosis](../../evidence/files/authorization-v1/c2-case-file-persistence/unlinked-lab-read-only-diagnosis.md)
found that the unlinked Lab owns all three current legacy Case assets and
meaningful historical domain data. No authoritative Organization assignment
is established; the blocker is unfinished tenant reconciliation, not an
empty fixture. No database reconciliation was authorized or performed.
The Product Owner subsequently identified this as disposable pre-Organization
development/test data and authorized exact cleanup. The
[cleanup and fresh C2 restart](../../evidence/files/authorization-v1/c2-case-file-persistence/denta-fusion-cleanup-and-c2-resume.md)
passed, including the unchanged zero-unlinked-Lab preflight invariant.
Prisma-modelled SQL was generated and matched Section A structurally, but
independent pre-application review found a Section B audit-outcome constraint
gap and an unresolved committed-fixture cleanup protocol. C2 migration SQL
review was `CORRECTION_REQUIRED`. The separately authorized
[audit SQL correction and disposable route](../../evidence/files/authorization-v1/c2-case-file-persistence/audit-sql-correction-and-verification-route.md)
now pass independent V3 `CODE`/SQL rereview. Disposable PostgreSQL
verification and normal development migration are separately gated;
database acceptance remains `PENDING`. The
[disposable preflight stop](../../evidence/files/authorization-v1/c2-case-file-persistence/disposable-runtime-attempt-20260926.md)
records the initial unreachable engine, the later one-container loopback-port
stop with exact destruction, and the independently confirmed non-semantic
candidate hash update. Resume only from isolation attestation.
The [separately authorized fresh retry](../../evidence/files/authorization-v1/c2-case-file-persistence/disposable-runtime-retry-20260926.md)
applied 47 + 1 migrations in isolated PostgreSQL 17.6 and passed initial
committed/negative scenarios, but stopped at a harness fixture collision
before the complete matrix. Exact cleanup and independent review of the
partial stop record passed; disposable runtime
acceptance and normal development migration remain pending.
The separately authorized [fresh completion run](../../evidence/files/authorization-v1/c2-case-file-persistence/disposable-runtime-complete-20260926.md)
corrected the foreign-file fixture collision, passed the implemented
PostgreSQL matrix, and exactly destroyed its run-owned resources. Independent
V3 `RUNTIME_EVIDENCE` review found that issued-audit zero/negative lifetime
rejection was not executed. That mandatory scenario remains `NOT_RUN` and
the verdict is `CORRECTION_REQUIRED`; disposable acceptance is still
`PENDING`/`BLOCKED`. The one-run authority is exhausted. Normal development
migration remains `NOT_RUN` and separately gated.
The separately authorized [audit-boundary supplement](../../evidence/files/authorization-v1/c2-case-file-persistence/supplemental-audit-boundary-20260926.md)
passed zero and negative lifetime rejection in distinct transactions and
was exactly cleaned. The complete prior event record and
[combined 46-scenario matrix](../../evidence/files/authorization-v1/c2-case-file-persistence/combined-disposable-scenario-matrix.md)
passed independent V3 `RUNTIME_EVIDENCE` review. The historical block above
is resolved for disposable verification: **PASS**. The normal development
migration remains `NOT_RUN`; its application requires separate authorization.
The authorized [normal-development application attempt](../../evidence/files/authorization-v1/c2-case-file-persistence/normal-development-application-stop-20260927.md)
stopped before SQL regeneration/materialization/application when four applied
August Organization/Staff migration checksums differed from current
repository SQL. The approved target was re-attested; no database mutation
occurred. This is a separate development migration-history gate, not a
regression of disposable PostgreSQL acceptance. The later
[provenance diagnosis](../../evidence/files/authorization-v1/c2-case-file-persistence/historical-checksum-provenance-20260927.md)
established byte-only CRLF checkout drift and passed independent review.
The Product Owner authorized a canonical-LF isolated execution checkout;
all 47 historical checksums and fresh data preflight passed. The exact
reviewed candidate was applied once to normal development as migration 48.
Installed-schema, preservation, regression, artifact-retention, and cleanup
evidence passed independent V3 `RUNTIME_EVIDENCE` review. See the
[development migration packet](../../evidence/files/authorization-v1/c2-case-file-persistence/normal-development-migration-application-20260927.md).
**C2 normal development migration acceptance: PASS.** The scoped LF
checkout policy is retained in repository `.gitattributes`; no historical
migration SQL was rewritten. This does not activate managed files, signed
reads, private ACL, C3, or N-FILE-110/111.
The first attempted correction stopped at a
[mixed-asset decision blocker](../../evidence/files/authorization-v1/c2-case-file-persistence/read-contract-decision-blocker.md):
filtering managed assets would misstate clinical asset presence and, before
N-FILE-110A, fed the edit form's omission-as-deletion behavior. The Product Owner selected
deferral and approved the target mixed-asset contract: authorized Cases stay
readable, managed identity/clinical metadata remain visible with content
unavailable, and omission never authorizes deletion. That first attempt made
no read-contract edit. [N-FILE-110A asset-safe persistence](case-file-n-file-110a-draft.md)
is now code-accepted after independent V3 review; ordinary Case saves no
longer mutate clinical assets, and legacy in-form add/delete is disabled.
The mixed legacy/managed representation and fail-closed C2 read projection
were separately authorized and implemented. The previous
`CORRECTION_REQUIRED` review remains historical; the corrected code verdict
is `PASS`. SQL generation/comparison, PostgreSQL validation, fresh preflight,
and migration application were separately gated and are now complete for
the development persistence scope.

The authored schema follows the [file/asset/version/legacy-mode design](../../evidence/files/authorization-v1/d-file-04-read-access/persistence-migration-design.md). Keep `CaseAssetFile.id` stable, version rows immutable, tenant-aware ownership, and historical URL-only rows intact. Do not infer provider identity from URLs, attach provider objects, issue signed URLs, or run migrations under design/code approval alone.

Schema authoring, generated migration SQL validation, and migration application are **separate approval gates**. The task packet must specify forward SQL, preflight counts/consistency, non-destructive legacy marking, rollback/feature-disable strategy, constraint validation, and focused transaction/isolation tests before either gate. No provider capability is asserted by database tests.
