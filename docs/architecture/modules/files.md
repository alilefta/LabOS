# Files module architecture

Status: Current
Authority: Canonical
Owner: LabOS maintainers
Last reviewed: 2026-09-05

## Approved Authorization V1 behavior

Provider keys never establish authorization. Protected uploads use opaque persisted one-time grants with canonical Organization, Lab, and Member linkage. A verified callback loads the trusted definition; expiry, orphan cleanup, and exact single-use consumption are required. Consumption and the final domain mutation must share a transaction.

Upload, read, delete, and replace are distinct operations. D-FILE-01 and D-FILE-02 are approved; D-FILE-03 keeps the unused Staff self-avatar endpoint unavailable. D-FILE-04 stored-file read/access policy is pending: URL possession is not authorization, Catalog and Case policy may differ, and Case activation remains blocked until it is decided.

## Mission

Provide tenant-scoped file metadata, authorization, storage abstraction, and lifecycle management. Case assets are the first consumer.

## Owns

- File object metadata, storage key/provider, content type/size/checksum, tenant ownership, uploader, lifecycle state, and access service.
- Upload authorization, signed upload/download operations, validation, quarantine/scanning hooks, and deletion/retention workflow.

## Does not own

- Case-specific labels or clinical semantics, public authorization decisions outside policy callbacks, or raw provider calls from domain modules.

## Design rules

Storage keys are opaque and never establish authorization. Every operation resolves ActorContext and resource ownership. Validate extension and detected MIME, size, checksum, and allowed purpose. Public links are scoped, expiring capabilities with audit; never expose permanent provider URLs for private assets.

Case keeps its domain association to a platform file ID plus dental metadata. File deletion is stateful and recoverable before physical purge where practical.

## Definition of done

- [ ] Case assets upload/download through the module.
- [ ] Cross-tenant and guessed-key access is rejected.
- [ ] Validation, failed upload cleanup, and deletion lifecycle are tested.
- [ ] Access and public-link issuance are audited.
- [ ] Storage-provider replacement does not affect Case services.
