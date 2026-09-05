# File upload grant evidence

Status: Completed
Authority: Historical
Owner: LabOS maintainers
Last reviewed: 2026-09-05

The D-FILE-01 persistence foundation and reusable lifecycle runtime were verified in development. The `FileUploadGrant` model/migration records canonical Organization, Lab, Member, boundary, purpose, optional target, provider key, correlation, expiry, lifecycle timestamps, and retryable cleanup state. Creation verifies canonical linkage; verified callbacks receive an opaque grant ID; expiry and exact one-row consumption are covered; consumption and domain mutation use a serializable transaction; lifecycle telemetry uses approved server-only labels.

Focused schema, lifecycle registry, service, Prisma adapter, transaction, and telemetry tests passed at the recorded checkpoint. The migration has not been applied to a database, no protected UploadThing endpoint uses grants yet, and scheduling expiry/orphan deletion remains operational follow-up. This evidence does not decide D-FILE-04 read access.
