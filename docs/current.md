# Current LabOS work

Status: Active
Authority: Canonical
Owner: LabOS maintainers
Last reviewed: 2026-09-05

- **Active branch:** `feat/authorization-financial-reads` (stale context; the name does not set priority).
- **Last committed checkpoint:** `2b96327` — `feat(auth): protect unpaid invoice cancellation`.
- **Working tree:** implementation, generated-output, migration, and test changes are in progress and remain outside this documentation migration.
- **Program milestone:** M4 — Authorization V1.
- **Current workstream:** UploadThing/file authorization.

Authorization V1 is approved for the reviewed scope and verified/development-active. Repository evidence does not establish production deployment. Do not resume Financial F3 as part of this documentation migration.

## Active task

Task/boundary: Catalog-image upload pilot through its registered Authorization V1 boundary and D-FILE-01 grant runtime.

Outcome: authorize a narrow Catalog-image flow with opaque persisted one-time grant consumption in the final Catalog transaction.

In scope: the registered Catalog endpoint boundary, trusted grant lifecycle, and focused verification.

Out of scope: Case asset cutover, production activation, Financial F3, schema work beyond already-approved work, and selecting file-read policy.

Acceptance criteria: authorization completes before provider/domain work; grant uses canonical tenant/member linkage; final consumption is single-use and transactional; safe DTO/telemetry/tenant-isolation tests pass.

Blocking decisions: D-FILE-04 remains pending. Catalog imagery and Case clinical assets may have different read policies; URL possession and upload permission do not establish read access.

Must read: [file plan](plans/authorization-v1/files.md), [Files architecture](architecture/modules/files.md), [Authorization architecture](architecture/modules/authorization.md), [decisions](architecture/decisions.md), and exact [boundary inventory](plans/authorization-v1/boundaries.md) rows.

Immediate next actions: wire one Catalog pilot; isolate expiry/orphan cleanup as operational work; keep Case activation blocked pending D-FILE-04.

Latest verification: the prior checkpoint records focused grant lifecycle/architecture tests and unchanged repository baseline failures; the grant migration has not been applied to a database.
