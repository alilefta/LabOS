# Files module architecture

Status: Current
Authority: Canonical
Owner: LabOS maintainers
Last reviewed: 2026-10-07

## Current N-FILE-110 private object-storage direction

The Product Owner approved the
[UploadThing → R2 roadmap](../../plans/authorization-v1/uploadthing-r2-migration-repository-review.md)
on 2026-10-06. R2-00 and R2-01 are accepted; the separately authorized
[R2-02 checkpoint](../../evidence/files/authorization-v1/r2-02-durable-identity/packet.md)
is `CLOSED | PASS CHECKPOINT` after Product Owner acceptance and independent
CODE/SQL, disposable runtime and exact normal-development installation PASS.
Cloudflare R2 is the selected V1 **adapter**, not a Files/domain dependency.
New N-FILE-110 Case clinical objects target a private bucket, no public
`r2.dev` or custom domain, `StoredFile.providerAccess = PRIVATE`, and
`CaseAssetFile.storageMode = MANAGED_PRIVATE` only after provider privacy is
attested. N-FILE-110 HTTP/UI activation remains inactive. R2-05 established a bounded synthetic real-R2 Case composition, including private open, but production Linux S001 identity in the complete composition remains `NOT_RUN`; R2-05 is accepted with activation `NOT_ELIGIBLE`.

Files owns grant state, canonical Organization/Lab/Member/Case authorization,
checked suffix, clinical validation and application SHA-256, immutable
evidence, `StoredFile.id`, Case asset/version, first-attachment transaction,
`CONSUMED`, cleanup terminalization and private-open authorization. It
allocates opaque keys without tenant, Case, person, filename or clinical data,
and never reuses an allocated key after deletion or a future provider move.
Its small server-only ObjectStorage port expresses LabOS-required semantics:
time-bounded exact-key create-only write capability, exact-object inspection,
bounded retrieval, time-bounded exact-key read capability, exact deletion and
authoritative exact-key absence. It does not expose generic S3 commands.
R2 endpoint/account/bucket, AWS SDK, SigV4, ETag, transport and provider errors
stay inside infrastructure; errors crossing into Files are closed and
normalized. Presigned URLs are opaque bearer capabilities, never persisted as
logical identity, evidence or telemetry. Completion is an untrusted hint;
server HEAD/GET and S001 validation establish trusted bytes. An adapter must
prove required create-only, privacy, consistency, expiry and absence behavior
before activation. No transaction is held over provider network access.

The installed `StoredFileProvider.OBJECT_STORAGE` value is a stable logical
backend class shared by new Case grants, evidence and files, not vendor
identity; its additive migration is installed in normal development.
`UPLOADTHING` remains the legacy ingestion
label. A single active private object-store bucket per environment is the V1
assumption. A future whole-backend R2 → S3 move copies and verifies the same
LabOS keys, drains outstanding write capabilities, reconciles objects, then
changes the adapter/configuration after conformance acceptance; the existing
grant/evidence/StoredFile IDs, keys and Case links stay fixed. Simultaneous
per-object stores or changed keys require a separate approved location model.
UploadThing continues on its existing higher-level ingestion path for active
non-Case boundaries until each is separately migrated; it need not implement
ObjectStorage. Rejected/orphan cleanup follows R2 provider runtime acceptance
as the exact next N-FILE-110 task, and deletion waits until every signed write
capability expires plus bounded clock skew.

## Historical UploadThing V1 behavior and retained compatibility

### FILE STORAGE SECURITY — 2026-09-29 V1 LIMITATION

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

### Original private-storage target and retained rules

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
