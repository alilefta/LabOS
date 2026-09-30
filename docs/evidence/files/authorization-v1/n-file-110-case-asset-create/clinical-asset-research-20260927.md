# N-FILE-110 clinical asset research and decision packet

Status: RESEARCH COMPLETE; design baseline remains BLOCKED_DECISION. No implementation authority.
Date: 2026-09-27

## Authority and method

D-FILE-01/02/04, closed C1/N-FILE-110A/C2/C3/`case.asset.add`, the N-FILE-110
staging plan, repository source, and retained provider evidence govern this
packet. External sources below describe dental workflows or file formats; they
do not approve LabOS scope. Existing `IMAGE | VIDEO | SCANNERFILE`, UploadThing
routes, extension/MIME lists, 16/100/256 MB limits, and dropzone examples are
provisional prototype observations, not product requirements.

## Dental workflow findings

| Business purpose | Actual exchange evidence | Physical formats and packaging | Initial-scope assessment |
| --- | --- | --- | --- |
| Shade, intraoral and reference photography | [3Shape Unite](https://support.3shape.com/3shape-unite-23-how-to/whats-new-in-unite-231) sends patient images and shade screenshots/comments to labs. [Dental photography study](https://pmc.ncbi.nlm.nih.gov/articles/PMC13091660/) used high-resolution JPEG; [shade-format study](https://www.sciencedirect.com/science/article/pii/S0022391323002573) shows capture/white-balance conditions matter. | Usually individual JPEG photographs; PNG, TIFF and camera RAW occur, but are not established as necessary for first release. Image dimensions/color profile/EXIF may accompany the bytes. | High-value, self-contained first candidate; do not silently recompress shade images. |
| Intraoral or model impression scan | [3Shape export guidance](https://support.3shape.com/products-dental-manager-how-to/export-lab-scans-formats) describes STL monochrome, PLY color, native DCM; upper/lower/bite can be distinct scans. [Medit](https://support.medit.com/hc/en-us/articles/4408628900109--Guide-Exporting-Scan-Data-and-Using-Third-Party-CAD-Software) exports STL/PLY/OBJ for CAD exchange. | STL geometry, PLY/OBJ color-capable meshes, vendor DCM; often several related files, not one upload. Filename, scan role, units, orientation and tooth/case context matter. | Important digital-lab workflow. Open single-file STL is a candidate; multi-file grouping and color formats need further validation design. |
| CAD/restoration and manufacturing handoff | [exocad restoration save](https://wiki.exocad.com/wiki/index.php/Saving_restorations) produces per-element `_cad.stl` plus `.constructionInfo`, can export OBJ/PDF, and saves a proprietary `.dentalCAD` scene. [3Shape Produce](https://support.3shape.com/products-3shape-produce-how-to-copy-92/2524732-3shape-produce-faq) supports manufacturing handoff/STL. | One or many meshes plus companion design/production metadata; proprietary project and toolpath formats are common. Archives may preserve a package, but ZIP contents need separate policy. | Defer package/proprietary/toolpath support; an STL is not automatically an impression rather than a design. |
| Prescription, case document and imaging | exocad can export PDF; [Carestream export](https://help.carestreamdental.com/rh/web/server/CS_3D_Imaging/projects_responsive/SMA22/Exporting_Images_to_a_Folder_or_an_Email.htm) includes raster, mesh, DICOM and ZIP options. [DICOM standard](https://dicom.nema.org/medical/dicom/current/output/html/part10.html) defines a structured clinical file, not just an extension. | PDF may be a single prescription; DICOM often comprises multiple instances; ZIP may contain mixed clinical and metadata files. | Defer until document malware/CDR, archive expansion and imaging-series policy are specified. |
| Video and other dental-specific assets | Prototype offers video, but reviewed dental vendor evidence does not establish it as necessary for first managed Case attachment. | MP4/WebM/MOV, proprietary DCM and CAD projects vary considerably. | Defer; no general blob fallback. |

For deferred categories, representative typical-byte distributions were not
established in this bounded review. [Carestream volume export](https://help.carestreamdental.com/rh/web/server/CS_3D_Imaging/projects_responsive/SMA22/Exporting_a_Volume.htm)
warns an uncompressed imaging volume can reach 350 MB; that is an example of
why DICOM/ZIP must not inherit the scan or photo ceiling, not a proposed
LabOS limit. ZIP expansion, embedded executables, DICOM patient metadata,
proprietary formats, and companion-file integrity need separate policies.

The business purpose must be selected and authorized independently of physical
format. An STL may be an impression scan, model scan or finished restoration;
a JPEG may be shade, intraoral or reference photography. The old enum is a
display/upload-widget classification, not an adequate long-term clinical
taxonomy. Proposed extensible shape: clinical purpose -> permitted formats ->
validation profile -> per-format size policy, with separate scan-role/grouping
metadata if multi-file intake is later approved.

## Smallest useful first scope (recommendation, not approval)

Recommend two independent first workflows: (1) **clinical/shade photograph**
as JPEG, and (2) **open intraoral/model scan** as a single STL file, repeated
per scan role. This covers real communication and digital-impression exchange
without pretending that STL preserves color or that separate scans form one
validated package. If the first implementation must be only one workflow,
photography is the smaller validation surface; doing only it would defer
digital impressions. Product Owner may choose either or neither.

| Purpose / format | MIME behavior | Required content validation proposal | Observed size evidence | Reasonable large case -> proposed maximum |
| --- | --- | --- | --- | --- |
| Clinical/shade photo `.jpg`/`.jpeg` | `image/jpeg` is a useful declared/transport type, not proof of JPEG bytes. | Bound actual bytes; JPEG signature **and full decode**, dimension/pixel limits, reject malformed/polyglot-risk content; preserve original bytes/color metadata unless a separately approved transform exists. Match extension to verified JPEG; no MIME-only acceptance. | Clinical studies show JPEG images at 5184x3456 and 6048x8064 pixels, but do **not** give a representative byte distribution ([study](https://pmc.ncbi.nlm.nih.gov/articles/PMC13091660/)). | A [dental photography publication](https://www.teethforlife.org.uk/Digital%20dental%20photography%20part%203.pdf) illustrates a 30.3 MB image, but not a population distribution. **32 MiB proposed upper bound**, subject to sample-file pilot and PO approval; typical range unresolved. |
| Intraoral/model scan `.stl` | IANA registers `model/stl`, but clients may send a generic type. MIME alone is not a validation key ([IANA](https://www.iana.org/assignments/media-types/model/stl)). | Parse bounded binary **and** ASCII STL, validate triangle count/byte length, finite coordinates, nonempty geometry and resource ceilings. No reliable single magic signature for both variants; compare extension to parsed format. | Published single-study STL means: 2.85-11.5 MB at three resolutions ([study](https://pmc.ncbi.nlm.nih.gov/articles/PMC8740072/)); another denture study reports 34.35 +/- 5.41 MB ([study](https://pmc.ncbi.nlm.nih.gov/articles/PMC12254745/)). These are study-specific, not a universal distribution. | Files around 40 MB occur in the latter study; **64 MiB proposed upper bound**, with bounded parser and sample-file pilot. Larger complete-arch/model cases may need a later policy. |

Both maxima are engineering proposals for operational headroom, not observed
clinical maxima or inherited prototype defaults. Per-file and per-Case counts,
pixel/triangle budgets, upload concurrency, and the provider's actual private
route entitlement still need approval/verification. Zero bytes reject. Avoid
`image/*`, generic `blob`, ZIP, DICOM, PLY, OBJ, PDF, video and proprietary
catch-alls in the initial route. For later work, PNG has a recognizable
signature and decoder; PLY has a structured header; OBJ is text/companion-file
prone; DICOM needs full structured parsing; PDF and ZIP need separate active
content/archive controls. [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html)
warns that supplied Content-Type and a signature alone are insufficient.

## Installed UploadThing 7.7.4 evidence and provenance

LabOS declares `uploadthing ^7.7.4`; installed package is 7.7.4. The installed
`UploadedFileData` type includes `name`, `size`, `type`, optional
`lastModified`, `customId`, `key`, URL variants and `fileHash`. Its base
`FileUploadData` explicitly describes name/size/type as web `File` properties
sent when upload is initiated (`node_modules/uploadthing/dist/types-Bs3w2d_3.d.ts`).
[UploadThing File Routes](https://docs.uploadthing.com/file-routes) documents
the verified server `onUploadComplete` boundary and uploaded-file info.

| Question / field | Conclusion | Evidence class / trust |
| --- | --- | --- |
| What reaches callback? | The installed callback type exposes name, size, type, key, URL variants, customId, fileHash and middleware metadata. | Installed SDK/type observation; route callback verification is framework boundary, not proof of each field's provenance. |
| Exact byte size? | `size: number` is present, but the installed type traces it to initiation `File.size`; independent stored-byte measurement is **not established**. | Installed SDK/type observation; provider guarantee unknown. |
| MIME/type? | `type: string` is present, but is inherited from initiation `File.type`; do not call it content-detected MIME. Filename inference, provider correction, or magic-byte inspection is **not established**. | Installed SDK/type observation; content-verification unknown. |
| Name/extension? | `name` is present; extension is only derivable from that name, not an independently typed callback field. Middleware can override file attributes via `UTFiles`. | Installed SDK/type observation and [provider documentation](https://docs.uploadthing.com/file-routes); untrusted/informational. |
| Stable object identity? | `key` is present and current protected routes bind it to a grant. URL is not identity/authority. `fileHash` is described by installed type as MD5 of uploaded contents, but its validation/provenance as a clinical format check is not established. | Installed SDK/type and repository observation. |
| Post-upload query? | Documented `UTApi.listFiles` can list object key/id/name/size/status; installed API does not establish a MIME/content-inspection endpoint or stronger byte-size provenance for this use. `getFileUrls`/signed URL operations are access operations, not format verification. | [Provider documentation](https://docs.uploadthing.com/api-reference/ut-api), installed SDK observation; stronger metadata unknown. |
| Repository persistence? | Current Case route is disabled; accepted grant completion persists only provider key and URL. `FileUploadGrant` lacks size/MIME/name/verified-format evidence, while C2 `StoredFile` requires size and `detectedMimeType`. | Repository observation. |
| Magic bytes? | No reviewed UploadThing 7.7.4 guarantee of content-signature/decoder verification. Do not assert it occurs or that it never occurs. | Unknown; independent validation required for attach claim. |

Distinguish (a) client-declared initiation metadata, (b) provider-observed
object/metadata, and (c) independently content-verified format/byte count.
The callback authenticates an upload event; it does not prove category, format
or tenant ownership by itself. A future protected, size-bounded server fetch
of the exact private object followed by format-aware decoding/parsing and
byte counting is the smallest defensible content-verification architecture.
The means of fetching private bytes, limits, and timing need a separate
provider-capability/security review; a mock cannot prove private ACL.

## Minimum durable evidence proposal (schema decision pending)

| Field / location | Meaning, supplier and trust | Immutable boundary / use |
| --- | --- | --- |
| Existing grant `organizationId`, `labId`, `memberId`, purpose, Case target, createdAt/expiresAt | Server-derived canonical context and authorized saved Case; no browser tenant facts. | Fixed at PENDING creation; required for callback and attach. |
| Existing grant `providerFileKey` | Verified callback's provider object identity; unique key, never URL authority. | Set once at verified UPLOADED transition; required. |
| Proposed grant-side `observedSizeBytes` | Exact count measured by trusted server/object read, not merely initiation size. | Set with validated evidence before UPLOADED/attachment; required. |
| Proposed grant-side `verifiedFormat` (closed enum/code) | Bounded parser/decoder result over exact object bytes, with validation profile/version if later replay/revalidation needs it. | Set with evidence; required. No arbitrary JSON. |
| Proposed grant-side `verifiedContentType` (or derive from verifiedFormat) | Canonical MIME inferred from verified format, not UploadThing `type`. | Fixed with validation; required only if C2 StoredFile keeps `detectedMimeType`. |
| Optional `originalFileName`, declared MIME, provider-listed size | User/upload metadata for diagnostics or display; can contain sensitive text and must be sanitized. | Informational only; not required for attachment; omit from minimum grant if not needed. |
| Existing C2 `StoredFile` sizeBytes, detectedMimeType, provider/key, sourceGrantId | Copy only approved verified evidence and grant identity in the one atomic attach transaction. | Immutable committed StoredFile identity. |

This is a *logical* minimum, not an approved column list. Choose grant columns
versus a one-to-one immutable evidence record in a separately authorized
schema task. Ensure the callback and validation sequence cannot persist a
misleading UPLOADED state before evidence is complete; exact object key must
be pinned throughout retrieval and inspection. `detectedMimeType` is a sound
name only if the value comes from independent content verification; storing
UploadThing `file.type` there would be a semantic defect. A later additive or
corrective schema task may be needed; C2 is unchanged here.

## Compatibility, lifecycle and decisions

Prisma `CaseAssetFile.assetFileType` is still `IMAGE | VIDEO | SCANNERFILE`
with default IMAGE. It is present in the mixed Case summary DTO and detail UI
label/icon logic; the disabled old upload zone derived it from extension.
Retained C2 migration evidence found zero Case assets at that development
preflight after the separately approved Denta Fusion cleanup, but that is not
a fresh inventory. Do not rename/drop enum values or infer current data state.
An additive clinical-purpose field/enum with explicit legacy mapping is safer
than redefining or destructively migrating the old enum; the exact compatibility
model is a separate schema/product decision. N-FILE-110A still prevents form
omission/raw URLs from mutating assets.

**APPROVED:** `case.asset.add.stage` TTL is exactly 15 minutes from grant
creation. Neither progress, callback, UPLOADED transition nor replay resets
it. `now >= expiresAt` is expired; an expired grant never revives or attaches,
including after successful upload. One atomic first attachment still freshly
authorizes `case.asset.add`, consumes one UPLOADED unexpired grant, inserts
StoredFile -> stable CaseAssetFile -> immutable version 1 -> current pointer,
and rolls back together on failure. Unattached bytes are future orphan work.
C3's 300-second signed-read expiry is unrelated.

**BLOCKED_DECISION:** clinical taxonomy; initial categories/formats; exact
MIME/extension and content-validation policy; size and resource ceilings;
trusted provider metadata contract; durable evidence/schema refinement.
The proposed JPEG/STL scope and 32/64 MiB ceilings require Product Owner
review and representative-file validation, not automatic approval.

**CAPABILITY_BLOCKER:** retained attested dev UploadThing project has
`defaultACL=public-read`, `allowACLOverride=false`; supported toggle save
failed, cause and private entitlement unproven. No public clinical fallback.
Existing non-Case file behavior must remain unchanged. Real private storage,
unsigned denial and signed delivery remain NOT_RUN.

Smallest next separately authorizable task after Product Owner selections:
provider-independent *clinical validation/evidence contract and additive
schema design* for the selected first formats, including an exact private-
object inspection capability requirement. No staging/attachment activation
until that design, schema gate and provider-private capability are separately
approved and verified.
