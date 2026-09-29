# Files module architecture

Status: Current
Authority: Canonical
Owner: LabOS maintainers
Last reviewed: 2026-09-24

## Approved Authorization V1 behavior

Provider keys never establish authorization. Protected uploads use opaque persisted one-time grants with canonical Organization, Lab, and Member linkage. A verified callback loads the trusted definition; expiry, orphan cleanup, and exact single-use consumption are required. Consumption and the final domain mutation must share a transaction.

Upload, attachment, read, delete, and replace are distinct operations.
D-FILE-01 and D-FILE-02 are approved; D-FILE-03 keeps the unused Staff
self-avatar endpoint unavailable. D-FILE-04 approves private-by-default Case
clinical assets with authenticated, Case- and tenant-authorized issuance of
short-lived signed provider URLs. Audit issuance and denial without logging
URLs or credentials. No per-byte application proxy or unauthenticated/public
clinical sharing is required or authorized for N-FILE-110/111. Signed URLs are
bearer capabilities; issuance auditing does not identify the eventual
downloader or immediately revoke an issued URL. URL possession, stored URLs,
and provider keys never authorize issuance or renewal. This policy does not
change accepted Catalog, WorkType, Product, or Dentist display contracts.
N-FILE-110/111 remain unavailable until required schema, implementation,
migration, and provider decisions receive separate approval.

The [Case persistence/migration design](../../evidence/files/authorization-v1/d-file-04-read-access/persistence-migration-design.md)
separates provider-independent file, version, audit, and draft design from
provider-dependent activation. It is accepted as a planning basis, not
implementation authority. Signed-URL lifetime is at most 300 seconds with
fresh authorization per issuance. Upload follows explicit Save Draft. After
a separately approved read cutover, unreconciled legacy assets show an
unavailable-pending-verification state without raw-URL fallback. Superseded
bytes, immutable versions, and issuance-audit records are retained; no
automatic purge is approved. Orphan/provider deletion, legacy reconciliation,
and audit-retention changes need separate decisions.

For Case signed access, the server resolves canonical membership and the
authoritative Case/asset relationships before applying the Case read policy.
Staff must have an active assignment to that Case; missing facts or policy
support deny. Clinical upload staging requires a saved DRAFT Case target.
Replacement keeps the Case asset ID stable and records prior/current file
history without silently deleting the prior provider object. URL-only legacy
rows remain preserved but outside signed-read access until verified and
reconciled. The approved minimal append-only issuance audit is Case-scoped;
the full M6 audit program is not activated.

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
