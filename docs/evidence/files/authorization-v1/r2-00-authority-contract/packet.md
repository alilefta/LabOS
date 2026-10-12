# R2-00 authority and contract — documentation checkpoint

Status: `CLOSED` after Primary reconciliation, 2026-10-06.

```yaml
acceptance:
  code: NOT_REQUIRED
  runtime: NOT_REQUIRED
  parent_gate: NOT_EVALUATED
independent_review:
  verdict: PASS
  scope: CHECKPOINT
```

## Authority and boundary

The Product Owner approved the
[UploadThing → R2 roadmap](../../../../plans/authorization-v1/uploadthing-r2-migration-repository-review.md)
on 2026-10-06 and authorized **R2-00 only**. The task records the canonical
private Case object-storage direction and the provider-decoupling contract in
current documentation. It does not authorize R2-01, application code, schema,
dependencies, configuration, provider resources, credentials, database
operations, N-FILE-110 activation, cleanup implementation, staging, commit,
push or deployment.

## Claim-mapped result

| Claim | Evidence | Result |
| --- | --- | --- |
| New N-FILE-110 Case objects target private storage while historical public UploadThing decisions remain truthful. | `docs/architecture/decisions.md`, `docs/architecture/modules/files.md`, `docs/plans/authorization-v1/files.md`, `case-file-public-access-contract.md`, `case-file-n-file-110-staging-domain.md` explicitly scope the supersession; installed migration/evidence files were untouched. | PASS |
| Files/domain depends on semantic ObjectStorage capabilities, not R2/S3 commands, SDK types or provider errors. | Architecture and active Files plan assign lifecycle, authorization, validation, evidence, key nonreuse, attachment, cleanup and private-open policy to Files; R2 vendor details to adapter/configuration. | PASS |
| Backend persistence is planned as stable `OBJECT_STORAGE` without claiming installation. | Decision and Files architecture name a future logical backend class on grant/evidence/StoredFile, retain `UPLOADTHING` historical ingestion, state the single-active-store/same-key assumptions and require a new decision for mixed stores or changed keys. | PASS |
| Current feature/checkpoint state is truthful. | `docs/reference/product-capabilities.md` no longer claims active managed Case upload. `docs/current.md` and the N-FILE-110 boundary row in `files.md` identify old UploadThing attestation as historical and R2-01 as the separately authorized successor. `.agent/current-task.md` recorded R2-00 during review. | PASS |
| R2-00 stays documentation-only. | Scoped file inspection and `git diff --check` on reviewed documentation returned no whitespace errors. No R2 runtime/provider capability, private Case open, cleanup or activation was exercised. The wider worktree already contained unrelated dirty application/schema files; they were preserved. | PASS |

## Independent read-only review

An independent Reviewer inspected the actual R2-00 documentation and
operational-state edits against the approved plan. Initial review found two
stale current-state references naming UploadThing maintainer attestation as
the next action. Primary corrected `docs/current.md` and the N-FILE-110 row in
`docs/plans/authorization-v1/files.md` while retaining the earlier capability
packet as historical truth, and recorded R2-00 as the sole active task in
`.agent/current-task.md`. The final rereview returned **`PASS | CHECKPOINT`**
with no material findings. The reviewer explicitly found no implementation,
schema, provider or R2-01 claim in scope.

## Primary reconciliation and next gate

Primary accepts and closes R2-00 as documentation/architecture only. R2
provider runtime, conditional-create capability, private Case flow and cleanup
remain `NOT_RUN`; N-FILE-110 remains inactive. The exact next roadmap gate is
**R2-01 — R2 capability and adapter**, requiring separate Product Owner
authorization. The UploadThing key-identity blocker is retained as historical
evidence and does not resume as the current next action. No run-owned provider
or database fixtures were created, so there is no runtime cleanup to perform.
