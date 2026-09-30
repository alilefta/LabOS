# Files module architecture

Status: Current
Authority: Canonical
Owner: LabOS maintainers
Last reviewed: 2026-09-29

## Approved Authorization V1 behavior

### FILE STORAGE SECURITY — V1 LIMITATION

**Provider:** UploadThing Free. **Provider ACL:** `public-read`.
**Application authorization:** enforced. **Direct provider URL
confidentiality:** not enforced. Possession of the provider URL bypasses LabOS
authorization for retrieval. The Product Owner accepts this temporary V1
limitation; private provider storage and signed-only access are deferred.
Minimize permanent URL exposure without claiming it creates privacy. Do not
send URLs to logs, telemetry, audit, notifications, email or unrelated DTOs.
LabOS must authorize upload, discovery/listing, association, normal app open,
mutation and delete by canonical tenant/resource facts. Validate before a
Case asset becomes usable; rejected objects require a separately designed,
prompt provider-cleanup path. The storage-access boundary must preserve a
future fail-closed private/signed mode, never a silent public fallback.

The approved V1 compatibility model adds `MANAGED_PUBLIC` for the current
public-backed managed Case asset and nullable immutable per-`StoredFile`
provider access (`PUBLIC_READ`, `PRIVATE`, null historical/unclassified).
Null never implies private. Installed `MANAGED_PRIVATE` and its unavailable
read contract keep their meaning. Normal Case DTOs do not carry managed URLs;
a separate freshly authorized Case-open operation is the narrow public URL
exposure boundary. See the [additive contract](../../plans/authorization-v1/case-file-public-access-contract.md).
Schema/SQL authoring is separate from migration application and activation.
Production R001 packaging/containment and provider-key-to-byte binding remain
implementation gates.

### Deferred private-storage target

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
The development provider is on UploadThing Free and cannot supply private
files for V1. Private storage, unsigned denial, signed delivery, and expiry
remain `NOT_RUN` future-version claims, not V1 activation gates.

For N-FILE-110's first managed attachment, clinical purpose and physical
format are separate. The approved initial purpose is Case clinical/reference
dental photography with JPEG only (`.jpg`/`.jpeg`), canonical `image/jpeg`
derived from bounded independent verification of the exact private object.
UploadThing callback MIME is not content proof. Original image bytes are not
silently transformed. A separate one-to-one immutable Case evidence entity
and additive nullable Case clinical purpose are installed in the development
persistence schema. V1 semantics, five numerical limits, 512 length-bearing
segments, 128 progressive SOS scans, `deterministicWorkBound=NONE`, and
one-component grayscale support are approved. The bounded marker inspector
owns structural acceptance; direct strict libjpeg-turbo scanline decompression
with fatal warnings/errors owns complete decoding. Runtime containment and
native helper packaging remain open; no executable production validator is
accepted. See the
[JPEG evidence design](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-evidence-design-20260927.md)
and [profile packet](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-profile-design-20260927.md),
plus the [R001 reconciliation](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-policy-reconciliation-20260928.md).
The [current validator contract](../../plans/authorization-v1/case-file-jpeg-r001-validator.md)
supersedes its earlier candidate Sharp-decoder and unresolved work-bound
assumptions; the offline Sharp probe remains historical evidence.

For Case signed access, the server resolves canonical membership and the
authoritative Case/asset relationships before applying the Case read policy.
Staff must have an active assignment to that Case; missing facts or policy
support deny. Clinical upload staging requires a saved DRAFT Case target.
Replacement keeps the Case asset ID stable and records prior/current file
history without silently deleting the prior provider object. URL-only legacy
rows remain preserved but outside signed-read access until verified and
reconciled. The approved minimal append-only issuance audit is Case-scoped;
the full M6 audit program is not activated.

The approved mixed-asset target keeps an authorized Case readable with both
legacy and managed clinical assets represented. Managed identity and clinical
metadata remain visible with content unavailable until a separately approved
signed-read path; no raw URL, provider key, fabricated URL, or silent omission
is allowed. Case metadata/draft/edit saves cannot infer asset deletion from a
missing form entry. Asset add, metadata edit, replace, and remove are distinct
commands and authorization decisions. The
[N-FILE-110A read-only design](../../evidence/files/authorization-v1/n-file-110a-case-persistence/design-review.md)
sets the asset-safe persistence dependency before C2 read-contract acceptance;
it does not implement either boundary or activate uploads.

## Mission

Provide tenant-scoped file metadata, authorization, storage abstraction, and lifecycle management. Case assets are the first consumer.

## Owns

- File object metadata, storage key/provider, content type/size/checksum, tenant ownership, uploader, lifecycle state, and access service.
- Upload authorization, signed upload/download operations, validation, quarantine/scanning hooks, and deletion/retention workflow.

## Does not own

- Case-specific labels or clinical semantics, public authorization decisions outside policy callbacks, or raw provider calls from domain modules.

## Design rules

Storage keys are opaque and never establish LabOS authorization. Every
application operation resolves ActorContext and resource ownership. Validate
extension and independently detected MIME, size, checksum, and allowed
purpose. V1 `public-read` provider URLs are permanent bearer access paths,
not scoped or expiring LabOS capabilities; minimize their exposure and do not
log them. Future private signed links require separate authorization and
issuance audit. Never silently fall back from future private mode to public.

Case keeps its domain association to a platform file ID plus dental metadata. File deletion is stateful and recoverable before physical purge where practical.

## Definition of done

- [ ] Case assets upload/download through the module.
- [ ] Cross-tenant and guessed-key application access is rejected; V1 direct
      public provider URL retrieval is explicitly outside that guarantee.
- [ ] Validation, failed upload cleanup, and deletion lifecycle are tested.
- [ ] Applicable application access and future signed-link issuance are
      audited under their separately accepted contracts; no V1 provider
      retrieval audit is claimed.
- [ ] Storage-provider replacement does not affect Case services.
