# N-FILE-110 JPEG validation and evidence design

Status: ARCHITECTURAL BASELINE APPROVED; V1 profile approved; numerical limits pending; N-FILE-110 BLOCKED_DECISION
Date: 2026-09-27
Authority: D-FILE-01/02/04; closed C1, N-FILE-110A, C2, C3 and `case.asset.add`; Product Owner JPEG/TTL decisions

Subsequent Product Owner approval adopted `JPEG_CLINICAL_V1` pass semantics,
immutable release IDs, and a bounded additive schema-authoring task. This
historical design packet's proposed-schema language is superseded only by the
[schema candidate packet](additive-evidence-schema-authoring-20260928.md);
normal-development migration, validator, provider, and attachment authority
remain unavailable.

## Approved scope and still-open policy

The initial managed clinical purpose is **clinical/reference dental
photography**, including Case-related intraoral and shade/reference photos.
The only initial physical format is JPEG; accepted suffixes are `.jpg` and
`.jpeg`. After independent verification, canonical MIME is `image/jpeg`.
Purpose is not inferred from suffix or MIME. Original bytes are retained
without recompression or transformation. PNG, STL/PLY/OBJ, video, documents,
archives, CAD files and additional purpose vocabulary are deferred.

The server-side policy shape is `clinical purpose -> allowed formats ->
validation profile -> resource ceilings`. The purpose and JPEG physical format
are approved; V1 validation-profile semantics remain proposed, and **the
production encoded-byte, width, height, and decoded-pixel
ceilings are not**. A future versioned profile must define them centrally and
project compatible early provider/UI limits; client-side/provider-declared
limits are only early rejection, never final attachment authority. Existing
16/100/256 MB prototype constants are not product policy.

The approved `case.asset.add.stage` grant targets an authoritative saved
DRAFT Case, has canonical Organization/Lab/Member, and expires exactly 15
minutes after creation. `now >= expiresAt` denies callback finalization and
attachment. Nothing extends or revives expiry. Final attachment freshly
revalidates Case/tenant/`case.asset.add` inside the transaction. C3's
300-second signed-read maximum is unrelated.

## Trust and command sequence

1. **Stage:** authorize saved DRAFT via the trusted Case resolver and
   `case.asset.add`; create one target-bound PENDING grant. For this initial
   closed route, `case.asset.add.stage` maps to the single approved clinical
   purpose; no browser-supplied purpose, URL, object key, MIME or tenant fact
   enters the grant. Later multiple purposes require an explicit additive
   binding, not overloading the operation purpose string.
2. **Verified callback and key reservation:** the framework-verified callback
   supplies the opaque grant ID and provider object key. A Case-only
   compare-and-set reserves that exact key on a live PENDING grant before
   inspection, retaining PENDING. Identical-key callback retry may continue;
   another key or terminal/expired state denies. Reservation is *not*
   UPLOADED/attachment authority. The generic completion method must not
   mark a Case grant UPLOADED from key/URL alone. Any provider URL retained
   for shared cleanup compatibility is non-authoritative and never enters
   StoredFile/Case DTO.
3. **Inspect:** using a server-owned provider capability, retrieve the exact
   private object by the reserved key, enforce encoded-byte and time limits
   during transfer, hash and count those bytes, and fully decode under the
   bounded JPEG profile. Derive canonical MIME from verified JPEG. Compare
   the callback filename's normalized suffix (`.jpg`/`.jpeg`) with that
   result; neither filename nor callback `type` can override bytes. The
   provider object must have stable content identity through attachment:
   require a provider immutability/version guarantee or an approved
   revalidation protocol. A digest recorded at inspection alone does not
   prevent a later object overwrite. This provider capability is unproven.
4. **Finalize evidence:** in one database transaction, assert same reserved
   key, PENDING, exact tenant/purpose/Case target and `now < expiresAt`;
   insert a complete one-to-one immutable evidence record, then transition
   the grant to UPLOADED. A deferred final-state database guard should make
   Case UPLOADED without complete matching evidence impossible. Concurrent
   attempts are one-winner; an identical replay compares key and immutable
   evidence while live, never changes expiry/evidence. Expired replay is not
   acknowledgment of renewed authority. Inspection failure/timeout leaves
   no UPLOADED state; mark failed through a separately specified Case failure
   transition and retain the reserved key only as a future orphan locator.
5. **Attach:** a transaction-bound, fresh Case/tenant/Member/permission check
   consumes exactly one live UPLOADED grant. Load its one immutable evidence
   row, require exact key and target equality, and copy only verified facts to
   StoredFile. In the same transaction create stable CaseAssetFile, version
   1 and currentVersionId. Any failure rolls back grant consumption and all
   new rows. Expired UPLOADED cannot attach. Provider bytes are never rolled
   back by SQL and remain future orphan/reconciliation work.

Callback authenticity proves an upload event, not content verification or
resource authorization. UploadThing 7.7.4 callback `name`, `size` and `type`
originate in upload initiation according to installed types; none is a
substitute for the inspected facts. No signed/raw URL or provider key becomes
tenant or attachment authority.

## Proposed smallest persistence model

**Approved: a Case-only one-to-one immutable evidence table**, rather
than adding validation fields to shared FileUploadGrant. The grant already
owns actor/tenant/target/expiry/status and is mutated by lifecycle/cleanup;
the evidence is a distinct, append-only proof. Direct grant columns would
avoid a table but require nullable Case-only fields on a shared model,
column-specific immutability, complete-UPLOADED guards, and more regression
risk to accepted non-Case routes. No arbitrary JSON or filename is required.

Approved evidence concepts, with `CaseClinicalUploadEvidence` a proposed
model name (not authored Prisma):

| Field | Source / meaning | Rule |
| --- | --- | --- |
| `uploadGrantId` PK | Existing server-created grant | One evidence row per grant; composite FK with tenant keys; immutable. |
| `organizationId`, `labId`, `caseId` | Canonical saved Case/grant snapshot, not callback/browser | Tenant-aware grant and Case FKs; match grant target and active context; immutable. |
| `provider` = UPLOADTHING, `providerObjectKey` | Verified callback key reserved on grant | Exact equality with grant key; unique provider/key; immutable. No URL. |
| `clinicalPurpose` = CLINICAL_REFERENCE_PHOTOGRAPH | Closed route definition | Immutable; must agree with selected profile; not inferred from JPEG. |
| `verifiedFormat` = JPEG, `validatedExtension` = JPG or JPEG | Full trusted inspection plus filename-suffix check | Closed enums; immutable. Suffix is not content proof. |
| `measuredSizeBytes` | Count of inspected provider-object bytes | Positive bigint, within approved profile; immutable and required. |
| `width`, `height` | Trusted decoder result | Positive integers within approved width/height/pixel ceilings; immutable and required. Pixel count is derived, not separately stored. |
| `contentSha256` | Digest of exact inspected bytes | Fixed 64-hex value; immutable and required for evidence/object comparison. Not proof of future object immutability. |
| `validationProfile` | Closed profile/version identifier for rules and decoder contract used | Immutable and required; no free-form metadata. |
| `validatedAt` | Server clock after complete inspection | Required, before grant expiry at finalization; immutable. |

Proposed PostgreSQL/Prisma-level shapes for later validation: string UUID
`uploadGrantId` as the primary key and composite FK, string tenant/Case IDs,
`StoredFileProvider` enum, text object key, closed enums for clinical purpose,
format, suffix and profile version, bigint measured bytes, integer width and
height, fixed 64-character lowercase hex SHA-256, and `timestamptz(6)`
validation time. Add a tenant-aware Case FK and a composite grant/key FK or
equivalent final-state constraints. Require positive bytes/dimensions and
the approved profile ceilings in domain validation; database CHECKs should
enforce stable structural rules, not mutable numeric policy ceilings. Before
schema authoring, verify whether
Prisma can represent the composite key relation and deferred Case-only
UPLOADED-evidence invariant; use reviewed PostgreSQL SQL only where Prisma
cannot. No client-provided URL, filename, MIME or unrestricted metadata
column is part of the minimum evidence row.

Evidence rows exist only after successful inspection; do not insert partial
evidence and mistake it for attachability. Add a scoped grant-key reservation
rule and a deferred final-state invariant for the Case boundary so an UPLOADED
Case grant must have one complete matching evidence row. Enforce tenant/Case
and `(grantId, providerObjectKey)` equality through composite keys/FKs or
equivalent reviewed PostgreSQL constraints. The exact Prisma/SQL formulation,
including cycle/trigger ordering, belongs to a separately authorized schema
authoring gate. Immutable-row UPDATE/DELETE denial must not create a test
cleanup escape path. Proposed evidence/grant/Case FKs should restrict deletion
and use no automatic cascade; the schema gate must reconcile those actions
with existing Organization/Lab/grant lifecycle FKs rather than silently
erasing evidence. Non-Case grant completion semantics must stay unchanged.

Approved additive nullable `CaseAssetFile.clinicalPurpose` concept (exact
schema still requires separate authorization):
legacy `LEGACY_URL_UNVERIFIED` rows remain untouched/null; new managed JPEG
assets require CLINICAL_REFERENCE_PHOTOGRAPH. Keep provisional
`assetFileType=IMAGE` solely as a compatibility projection/column value for
this JPEG slice, not as purpose authority. A reviewed managed-mode constraint
should require purpose without changing C2 migration 48. Do not rename,
remove, reinterpret or backfill `IMAGE | VIDEO | SCANNERFILE` here.

At attachment, C2 StoredFile receives provider/key and source grant; its
`sizeBytes` comes from `measuredSizeBytes`, `checksumAlgorithm=SHA256` and
`checksumValue` from the inspected digest, and `detectedMimeType=image/jpeg`
from the verified JPEG enum mapping. Under that exact provenance,
`detectedMimeType` remains semantically correct; copying callback `type`
would make it incorrect. C2 StoredFile/version immutability and composite
tenant constraints remain intact. `CaseAssetFile.fileExtension` and
`documentUrl` stay null for managed assets; validated suffix is evidence, not
a raw-read link.

## Bounded JPEG validation profile

Use a trusted decoder/parser that validates JPEG markers and fully decodes the
image, not only header sniffing or metadata extraction. Count/hash the same
bounded bytes passed to the decoder. Reject empty, truncated, malformed,
unsupported or resource-exhausting inputs and non-JPEG content even if its
declared MIME or suffix says JPEG. Define explicit handling for excess trailing
bytes/polyglots, embedded metadata and decoder warnings in the versioned
profile before implementation. Preserve original bytes; do not silently
recompress, strip metadata, or convert color space.

Required configurable ceilings: `maxEncodedBytes`, `maxWidth`, `maxHeight`,
`maxDecodedPixels`, metadata/segment budget, validation time, memory/CPU and
concurrency. Bound transfer while streaming; do not buffer an unbounded
private object. Full structural validation requires reading the entire
bounded object, whether streamed to a bounded temporary file or decoded
incrementally by a proven library. Reject when a limit is reached; no partial
evidence, UPLOADED grant or attachable result. Do not choose numeric values
from prototype defaults. Production byte/pixel/resource ceilings remain
Product Owner decisions and must be fixed before executable validation.

Representative-file evidence for that decision should include consented or
non-patient sample JPEGs from relevant DSLR/smartphone/intraoral/shade
workflows, original quality/resolution and color-profile variants, byte-size
and pixel-dimension distributions (including legitimate large examples),
decode time/memory on the intended runtime, and upload/network/provider
limits. Retain aggregate measurements and sanitized test artifacts, not
clinical payloads or EXIF. Include malformed/oversized adversarial samples
to set resource ceilings; a dental-photo sample alone is not a security test.

## Provider gate and verification

Exact private-object retrieval by reserved key, object immutability/version
or safe revalidation, bounded streaming and byte provenance are **required
capabilities, not established capabilities**. The existing development
UploadThing project still has `defaultACL=public-read` and
`allowACLOverride=false` after the failed supported save; cause/entitlement
remain unproven. No public clinical fallback, provider retry or configuration
change is implied by this design. If provider access uses an internal
short-lived bearer URL rather than an authenticated byte-stream API, its
issuance, exposure and audit handling require separate security review; do
not assume C3's user-facing signed-read contract automatically covers it.

| Gate | Required evidence |
| --- | --- |
| CODE/schema | Closed purpose/format mapping; strict stage/callback/attach inputs; JPEG full-decode/byte/dimension/timeout failure cases; mismatch/zero/oversize/replay/concurrent-key/expiry cases; evidence completeness and immutability; exact tenant/Case/Member checks; transaction rollback; C1/C2/C3/N-FILE-110A and non-Case grant regressions. |
| Disposable DB/schema | Composite FKs, unique key/grant, deferred UPLOADED-evidence final state, immutable evidence and construction/rollback with committed rows, without weakening C2. Requires separate authority. |
| Real provider/runtime | Private Case-only object and exact-key retrieval, unsigned denial, actual observed byte count/content verification, object-stability or revalidation, callback race/replay, 15-minute expiry, one-time DB attach, no non-Case regression; exact object/fixture cleanup. Requires separate provider capability and authority. Mocked provider behavior is not proof. |

The one-to-one evidence architecture, its minimum concepts, `detectedMimeType`
semantics, SHA-256 meaning, and additive nullable Case clinical purpose are
approved. The [V1 validation-profile packet](jpeg-validation-profile-design-20260927.md)
proposes the still-unapproved behavior/release semantics and finds no new
evidence field necessary if `validationProfile` identifies an immutable
profile release. Remaining `BLOCKED_DECISION`: numeric JPEG byte/dimension/
pixel and validator resource ceilings; V1 profile review; additive schema
authoring/application approval and any internal private-object inspection
access policy. Private ACL and exact-object retrieval remain
`CAPABILITY_BLOCKER` until proved. N-FILE-110 stays inactive. The smallest
next separately authorizable task is **additive schema authoring and SQL
validation for the Case evidence/purpose model**, only after Product Owner
review of the V1 profile packet; migration application and staging implementation
remain separate gates.
