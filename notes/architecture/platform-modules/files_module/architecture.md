# Files module architecture

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
