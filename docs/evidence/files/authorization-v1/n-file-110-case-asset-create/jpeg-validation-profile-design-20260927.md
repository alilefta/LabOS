# N-FILE-110 JPEG clinical validation profile checkpoint

Status: JPEG_CLINICAL_V1 semantics and immutable release model APPROVED; five R001 numerical limits APPROVED on 2026-09-28; executable validation remains inactive.
Date: 2026-09-27
Authority: approved JPEG-only purpose and one-to-one evidence architecture; D-FILE-01/02/04 and closed C1/N-FILE-110A/C2/C3/`case.asset.add`

Product Owner approval after this design packet adopted the V1 pass semantics and
release model below. A separate bounded schema-authoring authorization permits
the additive evidence candidate, not migration application or executable JPEG
validation. References below to a proposed V1 profile describe the status at
the time this packet was written.

The subsequent Product Owner decision fixed the five R001 byte/dimension/
pixel/metadata values. The [R001 reconciliation](jpeg-r001-policy-reconciliation-20260928.md)
records them and the remaining decoder/resource-control gate. Historical
proposals and BLOCKED_DECISION wording below are superseded only for those
five values and retained as this checkpoint's original reasoning.

## V1 success semantics (proposed)

`JPEG_CLINICAL_V1` applies only to Case clinical/reference dental photos with
`.jpg` or `.jpeg`, case-insensitive after a single final-suffix extraction.
Reject missing, different, ambiguous or path-like suffixes; never infer
format from name. The inspected provider object must be the one reserved on
the Case-targeted grant. No callback MIME/size or client value is trusted.

A V1 pass means the **entire bounded original byte sequence** was read,
counted and SHA-256 hashed; begins with JPEG SOI, contains exactly one
well-formed 8-bit JPEG image, reaches a real EOI, has no bytes after EOI,
and fully decodes all scanlines without decoder error or warning. Header-only
metadata parsing or thumbnail decoding is insufficient. Accept ordinary
Huffman-coded baseline sequential and progressive JPEG with grayscale or
three-component photographic pixels. Reject unsupported coding modes,
component depths/counts, concatenated images, truncated scans, synthetic
decoder EOF padding, malformed marker lengths, and all decoder warnings.
Baseline/progressive are well-established JPEG 1 modes; selecting both is a
V1 proposal, not a claim that every JPEG 1 variant is supported
([JPEG Committee](https://jpeg.org/jpeg/),
[reference-software priorities](https://jpeg.org/downloads/jpeg/wg1n76028-CfP-JPEG-reference-software.pdf)).
The future decoder must expose full-decode completion and warnings; a library
that silently repairs damage is unsuitable. For example, libjpeg-style APIs
distinguish header reading from scanline completion and have warning paths
([libjpeg-turbo guide](https://github.com/libjpeg-turbo/libjpeg-turbo/blob/main/doc/libjpeg.txt));
this packet does not select or install that library.

Well-formed APP/COM segments, including Exif and ICC, may be preserved as
opaque original bytes within resource limits. V1 checks their framing/length
and total budget but does not certify the truth, safety or color accuracy of
their internal claims. It never executes or uses them for authorization.
Exif orientation may influence a future viewer, not V1 format/ownership;
persisted width and height are the encoded pixel matrix before rotation.
ICC is retained, not converted or used to establish clinical shade fidelity.
The [ICC specification](https://www.color.org/profile_embedding/) permits
profiles in JPEG application segments, and image-library metadata APIs treat
EXIF orientation separately from raw dimensions
([Sharp documentation](https://sharp.pixelplumbing.com/api-input/)).
Reject any trailing bytes after EOI, including a second image or appended
payload. Opaque bytes *inside* valid APP/COM segments can still carry
untrusted content, so V1 is a structural/content-format validation claim,
not proof that a file is malware-free or clinically correct. No silent
recompression, metadata stripping, auto-rotation or color conversion occurs.

V1 reads width/height from the decoded image, requires both positive and
within the approved limits, and computes pixel count using overflow-safe
integer arithmetic (for example, bigint multiplication) before large pixel
allocation. The same capped stream/temporary object supplies the decoder,
byte count and hash. The service rejects at the first violated ceiling and
does not emit evidence or mark the grant UPLOADED. Timeouts, decoder crashes,
resource exhaustion, incomplete private-object reads and uncertain object
identity fail closed. Reserved provider bytes remain unattached for a later
orphan process. This profile does not grant permission to attach; expiry and
fresh Case/tenant/`case.asset.add` checks remain separate.

## Parameters and approval boundary

All parameters must have concrete, test-bound values before an executable
validator is enabled. None is chosen in this checkpoint. The V1 *semantics*
above are separate from the numerical policy release that supplies values.

| Parameter | Risk controlled / nature | Who must fix it before implementation; later change and tests |
| --- | --- | --- |
| `maxEncodedBytes` | Transfer/storage abuse and large legitimate photos; security + product UX. | **Product Owner numerical approval** after representative samples. Versioned acceptance-policy revision for every change; tests at limit, +1, zero, premature stream end. Provider/UI early limits must not exceed server acceptance. |
| `maxWidth`, `maxHeight`, `maxDecodedPixels` | Decompression/memory work and genuine high-resolution photography; security + product UX. | **Product Owner numerical approval** after sample dimensions and decoder capacity. Versioned policy revision for changes; each axis and product checked with overflow-safe arithmetic at boundaries. |
| `maxMetadataBytes` | Oversized Exif/ICC/APP/COM payloads; security, but can reject legitimate color profiles. | **Product Owner numerical approval** or explicit delegation based on representative metadata samples. Versioned policy revision; tests with segmented ICC, exact limit and excess. |
| `maxSegmentCount`, `maxProgressiveScans` and decoder input-work budget | Pathological marker/scan structure and CPU abuse; security-engineering controls. | Fixed in the reviewed validation implementation before enablement. Escalate to Product Owner if real samples are excluded. Acceptance-affecting changes get a policy revision; adversarial count/scan tests. |
| Transfer idle/total timeout, decode wall/CPU budget, process memory, bounded spool and concurrent-validator/queue limits | Slow reads, hung/crashing decoders and aggregate resource exhaustion; security/operations. | Fixed and load-tested for the deployment by engineering/security review before enablement. May change as operational configuration under V1 without changing the positive pass meaning, provided the full-decode/fail-closed contract stays identical; timeout, cancellation, crash, overload and cleanup tests. Escalate material workflow rejection. |

The provider's private-route cap is a separate capability and must be
compatible with the approved server ceiling; it does not set LabOS policy.
Do not reuse prototype 16/100/256 MB values or an image library's defaults.
Representative samples should include original DSLR/smartphone/intraoral and
shade photos, progressive and baseline JPEG, high-resolution and large
ICC/Exif examples, with only aggregate bytes/dimensions/decode-resource
measurements retained. Adversarial malformed, truncated, trailing, metadata
and pixel-bomb samples are necessary for security limits. No clinical
payloads or EXIF need be retained in the decision evidence.

## Version and historical interpretation

Treat V1 as the stable **meaning of a pass** above. The evidence field
previously called `validationProfile` should store an exact immutable
*profile release ID*, conceptually `JPEG_CLINICAL_V1_R001`, not bare V1.
Each release ID maps to a retained, immutable, code-reviewed manifest of
all acceptance-affecting numerical values, supported decoder adapter/build,
and test corpus version. New byte/dimension/pixel/metadata/scan ceilings or
an equivalent decoder build create `R002` under V1 without schema migration.
The release registry is closed at the application boundary; no caller may
supply an arbitrary value and no arbitrary config JSON is persisted. Old
manifests are retained so historical evidence remains interpretable. A
runtime can tune concurrency or timeouts under the same release when it only
changes whether validation completes, not what a successful complete decode
proves; operational settings and deployment revision are recorded separately.

Use V2, not another V1 release, if the accepted language or evidence meaning
changes: allowing another coding mode/component layout, tolerating warnings
or trailing data, changing metadata trust/normalization, accepting partial
decode, changing hash/byte provenance, or replacing the decoder with one
whose acceptance behavior differs. A security patch or decoder replacement
shown equivalent by compatibility/adversarial tests can stay V1 but gets a
new release ID. Later lower or higher policy limits never retroactively
reclassify a row that passed its recorded release.

## Evidence sufficiency after profile definition

The approved one-to-one Case evidence concepts remain sufficient **if**
`validationProfile` is the exact immutable release ID above. No additional
config-snapshot/digest column or generic metadata table is needed. Keep:
grant and canonical Organization/Lab/Case IDs; provider and reserved object
key; clinical purpose; verified JPEG format and validated `.jpg`/`.jpeg`
suffix; measured bytes; decoded width/height; SHA-256 of those exact bytes;
profile release ID; and validation time. Width x height safely derives pixel
count, so do not persist a redundant `pixelCount`. Do not add original
filename, callback MIME, URL or arbitrary metadata. `StoredFile` receives
canonical `image/jpeg` from verified JPEG, not a new evidence MIME field.
These fields also support later closed format-specific profiles through
additive enum/profile releases without making evidence a generic blob store.

Database checks enforce **stable structural** invariants only: positive
bytes/width/height, valid digest/closed format, tenant/Case/grant/provider-key
equality, one-to-one cardinality, complete evidence before Case UPLOADED and
immutability. Mutable numerical policy ceilings belong to the retained
profile release and validator, not PostgreSQL CHECKs. The later schema gate
must validate relation/trigger ordering and preservation of non-Case grants.
Existing nullable `CaseAssetFile.clinicalPurpose` proposal and legacy enum
compatibility remain approved. `StoredFile.detectedMimeType` stays correctly
named when populated only from verified JPEG. No C2 schema rewrite is needed.

## Gate conclusion

The **architectural evidence model is sufficient for separate additive
schema-authoring consideration**; it does not require another evidence field
for historical meaning. Readiness verdict: **READY for a separately
authorized schema-authoring/SQL-validation task only after Product Owner
review of this proposed V1/release contract**. Numeric policy values need not
be embedded in that schema and therefore do not block its authoring; they do
block executable validation. Schema authoring is **not authorized by this
packet**.
Before executable JPEG validation/staging, Product Owner must approve the
numeric encoded-byte, dimension/pixel and metadata ceilings (or delegate
the metadata ceiling), and review this V1 semantic/release contract. Security
engineering must fix and test the remaining operational/decoder work limits.
Private ACL, exact private-object retrieval, bounded streaming and object
immutability/version or approved revalidation remain `CAPABILITY_BLOCKER`.
N-FILE-110 remains `BLOCKED_DECISION`; no provider or managed-file claim is
established here.
