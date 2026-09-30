# N-FILE-110 — Case clinical asset staging and first-attach contract

**2026-09-29 V1 amendment:** The Product Owner accepts UploadThing Free
`public-read` Case storage with no direct-URL confidentiality and has approved
the additive `MANAGED_PUBLIC`/per-`StoredFile` access classification and
separate authorized open design. The [candidate contract](case-file-public-access-contract.md)
requires independent review and separate migration approval before first V1
asset creation. Preserve target-bound grants, exact-object JPEG validation,
one-time attachment, and tenant authorization. Rejected-object cleanup and
public URL exposure controls still need bounded implementation authority.
Private/signed storage is a later version.

Status: Saved-DRAFT staging intent CLOSED | CODE PASS; provider upload, validation, and attachment remain blocked; evidence schema installed in development
Tier proposed for later implementation: V3 CODE, then separate real DB/provider/browser RUNTIME_EVIDENCE
Authority: D-FILE-01/02/04; closed C1, N-FILE-110A, C2, C3, and `case.asset.add`

The Product Owner subsequently approved `JPEG_CLINICAL_V1` semantics and
immutable release IDs and authorized additive schema/SQL authoring only. The
[candidate packet](../../evidence/files/authorization-v1/n-file-110-case-asset-create/additive-evidence-schema-authoring-20260928.md)
records the schema artifact. The evidence migration is now installed in
development and the five R001 numerical limits are approved; see the
[R001 reconciliation](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-policy-reconciliation-20260928.md).
Decoder/resource controls, executable validator
and first-attachment implementation remain separate decisions/authorities.

Historical proposal and blocker language below describes the original design
gate and is superseded by these later accepted checkpoints where stated.

## Closed boundary and identity

Use boundary `N-FILE-110`, grant purpose `case.asset.add.stage`, target
`{ type: 'case', id: savedCaseId }`, and `StoredFilePurpose.CASE_CLINICAL_ASSET`.
The initial stage request accepts only an identifier-only saved Case selector;
the closed route fixes clinical/reference dental photography as its purpose.
Future multiple purposes require an explicit additional binding. The
authenticated session supplies Organization, canonical Lab, Member, and role.
The existing `case.asset.add` resolver/policy authorizes the authoritative
Case before grant creation; Case → Lab → Organization must match the active
tenant. No targetless grant or browser-supplied tenant/assignment facts.
Staging requires a saved DRAFT under D-FILE-04; `case.asset.add` itself is not
DRAFT-only. The future attach command must re-check the Case state required by
the approved staging workflow rather than letting permission alone imply a
lifecycle transition. Explicit Save Draft remains the only prerequisite path.

The existing `FileUploadGrant` supports Organization/Lab/Member, closed
boundary/purpose, Case target, status, expiry, and unique provider key. It is
**not sufficient by itself** for durable Case attachment: callback completion
currently stores only key and URL, while `StoredFile` requires trusted detected
MIME and byte size. Neither browser-supplied metadata nor parsing a URL may
fill that gap. The Product Owner approved a separate one-to-one immutable
Case clinical upload evidence entity for measured bytes, verified format,
validated suffix, dimensions, inspected-byte SHA-256 and profile release.
The exact additive schema remains unauthorized. The installed UploadThing
7.7.4 callback name/size/type trace to
upload-initiation File properties, not proven content detection. See the
[clinical asset research packet](../../evidence/files/authorization-v1/n-file-110-case-asset-create/clinical-asset-research-20260927.md).

## Grant state machine and expiry

Approved TTL: exactly 15 minutes from grant creation. Upload progress,
callback, UPLOADED transition and replay never restart or extend it.
`now >= expiresAt` means expired; an expired grant cannot revive or attach,
including when provider bytes were uploaded. C3's 300-second signed-read
lifetime is unrelated.

| Transition | Guard / result |
| --- | --- |
| Authorized intent → PENDING | Saved DRAFT, `case.asset.add`, canonical tenant/Member/Case, approved clinical photo purpose, fixed expiry |
| PENDING → UPLOADED | Verified provider callback before expiry, one matching object, complete independently validated format/byte evidence bound immutably to this grant |
| PENDING or UPLOADED → EXPIRED | `now >= expiresAt`; an expired grant cannot revive or attach |
| UPLOADED → CONSUMED | Once, with exact tenant/Member/purpose/Case target, `now < expiresAt`, inside the first-attach transaction |
| PENDING/UPLOADED → FAILED/CLEANED | Only through separately authorized failure/cleanup lifecycle; not an attach path |

An identical verified callback replay may be acknowledged only while the
grant is still live and the immutable evidence matches exactly; it must not
extend expiry or change evidence. A different object/evidence or terminal
state rejects. Current shared completion code acknowledges an identical
UPLOADED replay before checking expiry; the Case adapter must not treat that
acknowledgment as renewed authority. A narrow shared lifecycle correction may
be needed to enforce the stricter Case replay rule without regressing accepted
non-Case routes. An UPLOADED callback does not pause or extend the clock:
attach after expiry rejects, even if bytes already exist. Provider bytes then
remain an unattached orphan; deletion/reconciliation is not approved here.

## File validation decision matrix

Current `AssetFileType` and all route/dropzone allowlists and size limits are
provisional prototype observations, not product requirements. The
[research packet](../../evidence/files/authorization-v1/n-file-110-case-asset-create/clinical-asset-research-20260927.md)
informed the approved purpose-first architecture. The first managed purpose
is clinical/reference dental photography and the only initial physical
format is JPEG (`.jpg`/`.jpeg`, verified `image/jpeg`). PNG and scan/CAD
formats, including STL/PLY/OBJ, are deferred. The
[JPEG evidence baseline](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-evidence-design-20260927.md)
approves evidence concepts but not schema authoring. The
[V1 validation-profile packet](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-profile-design-20260927.md)
proposes success semantics and immutable release IDs. Numeric byte,
dimension, pixel and metadata ceilings and the V1 proposal await review.
No wildcard `image/*`,
`video/*`, generic `blob`, or `application/octet-stream` catch-all is presumed
acceptable.

Zero bytes, over-limit bytes, non-JPEG content, extension/content mismatch,
and missing verified evidence reject. The provider
route may use client-declared size/type only as an early filter; final
acceptance requires independently measured bytes and content-verified format
under an approved profile. Original filename/extension and callback type may
be informational only and cannot override verified format. A trusted bounded
exact-provider-object inspection capability is needed before persisting
`StoredFile.detectedMimeType`. Unique provider key and
`StoredFile(provider, objectKey)`/source-grant constraints reject duplicate
object identity. No raw URL or provider key from the client authorizes attach.

## Three command/trust boundaries

1. **Stage intent/grant:** strict `{ caseId }`; server
   derives tenant/Member, loads saved Case, verifies DRAFT, calls
   `case.asset.add`, then creates the Case-targeted PENDING grant. Return only
   opaque grant metadata for the provider handoff. No URL/key return authority.
2. **Verified callback and inspection:** provider framework verifies the
   callback. A Case-only path reserves the exact provider key on a live PENDING
   grant, retrieves that exact provider object, and independently validates its
   JPEG bytes within an approved resource profile. Only then may a database
   transaction bind complete immutable evidence (measured size, verified
   format, canonical content type) and mark the grant UPLOADED. The callback
   cannot supply those trusted facts or choose Organization, Lab, Case,
   permission, Member, clinical labels, or attachment ownership. Provider URL
   may remain in the legacy grant column for shared compatibility but is
   neither StoredFile identity nor a Case DTO/read URL.
3. **First attach:** strict `{ caseId, uploadGrantId, approved clinical
   metadata }`; server derives tenant/Member. Freshly authorize
   `case.asset.add` and revalidate current Case/Lab/Organization/Member and
   DRAFT workflow facts inside the final serializable transaction, using
   transaction-bound facts rather than a pre-transaction authorization result
   alone. Exact UPLOADED grant, unexpired state, target/purpose, trusted
   provider evidence, and unique provider identity must match. Atomically
    change grant to CONSUMED, insert a `PUBLIC_READ` StoredFile, create a new
    stable CaseAssetFile with `MANAGED_PUBLIC` and no legacy URL/extension, insert
   immutable CaseAssetFileVersion number 1, and set the current-version
   pointer. C2's deferred final-state trigger sees the complete state at
   commit. Any failure rolls back consumption and all new rows; provider
   bytes remain unattached for a separately approved orphan process.

Reusing `consumeTransactionally` requires a narrowly extended transaction
file projection: its current callback supplies only key/URL, not the C2
required trusted MIME/size evidence. The implementation must not perform the
fresh Case authorization only outside its transaction. No idempotent second
attachment is implied: replay of the consumed grant rejects and creates no
second StoredFile/asset/version. A client retry must first query its saved
Case or receive a generic consumed-grant denial; it may not reuse the grant.

## Provider boundary and verification

Provider-independent code may define closed contracts, transaction-aware
resource checks, and grant/attachment repositories behind an inactive route,
but cannot claim successful upload or private storage. The Product Owner has
accepted UploadThing Free `public-read` for V1 with no direct-URL
confidentiality. The private-ACL gate is deferred, not a V1 blocker. Before
enabling Case upload, review and separately apply the approved
`MANAGED_PUBLIC`/per-file access candidate, then settle exact-object retrieval
and validation and rejected-object cleanup. Do not
retry ACL override or alter existing Catalog/WorkType/Product/Dentist routes.

| Claim | CODE gate | Separate RUNTIME gate |
| --- | --- | --- |
| Saved Case, tenant, assignment and DRAFT stage | Resolver/policy and strict-input tests | Real A/B Case/Staff denial, no existence leak |
| Closed grant and expiry/replay | State-machine tests, wrong target/purpose/Member, expired callback and attach | Real DB one-time status/expiry and rollback |
| Clinical validation | Exact allowlist, zero/oversize/mismatch, missing evidence, duplicate key tests | Real provider metadata provenance and rejection |
| First attach | Transaction tests for grant, StoredFile, asset/version 1, pointer and rollback | Real DB atomicity, unique constraints, replay rejection |
| V1 public-storage limitation | No private-storage claim; URL exposure and Case authorization tests | Real `public-read` retrieval truthfully observed; protected application discovery/association; exact-object callback/validation and cleanup under separate authority |
| Regressions | C1/C2/C3/N-FILE-110A and accepted non-Case grants | Non-Case provider behavior unchanged where activated |

## Decisions and next slice

`APPROVED`: fixed 15-minute `case.asset.add.stage` TTL as specified above.
`APPROVED`: purpose-first clinical model; initial clinical/reference dental
photography purpose; JPEG only with `.jpg`/`.jpeg` and `image/jpeg` derived
from independent bounded content verification of the exact provider object.
`APPROVED`: separate one-to-one immutable Case evidence entity, minimum
evidence concepts, additive nullable Case clinical purpose, and retention of
`StoredFile.detectedMimeType` for independently verified `image/jpeg`.
R001 acceptance ceilings, semantics and the additive evidence schema are
approved/installed; production native packaging and runtime containment remain
unaccepted. The installed callback `type` must not be relabeled
`detectedMimeType`. Private ACL is deferred from V1; an honest public-backed
Case persistence/read compatibility decision is the next design gate.

The [JPEG profile checkpoint](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-profile-design-20260927.md)
is historical design evidence, not current implementation authority. A V3 CODE
provider/validation/attach service remains later. Provider
callback/route activation and
real database/provider/browser verification need separate authorizations.
N-FILE-111 replacement, signed read delivery, deletion, cleanup, and full M6
audit remain outside this task.
