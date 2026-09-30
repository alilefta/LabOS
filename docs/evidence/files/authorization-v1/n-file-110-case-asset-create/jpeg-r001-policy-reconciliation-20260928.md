# N-FILE-110 R001 numerical policy and validator engineering gate

Status: five Product Owner numerical limits APPROVED; executable manifest and validator NOT IMPLEMENTED.
Date: 2026-09-28. Scope: design reconciliation only.

Historical design note: the Product Owner subsequently approved 512
length-bearing structural segments, 128 progressive SOS scans, no deterministic
work score, grayscale and direct strict libjpeg-turbo full decompression. The
[current R001 validator contract](../../../../plans/authorization-v1/case-file-jpeg-r001-validator.md)
supersedes this packet's proposed Sharp adapter and undecided-control language.
The [Sharp/libvips harness evidence](jpeg-r001-harness-20260928.md) remains
historical and does not prove the new normative decoder contract.

## Immutable release contract

`JPEG_CLINICAL_V1_R001` is the release identity for one Case clinical/reference dental photograph in `.jpg` or `.jpeg` form. V1 success still means an exact bounded original-byte read and SHA-256, strict single well-formed JPEG with real EOI and no trailing bytes, full warning/error-free decode of supported 8-bit baseline sequential or progressive Huffman JPEG with one or three components, encoded-matrix dimensions, and no alteration of the stored original. EXIF/ICC/other APP and COM data remain opaque and untrusted. A pass does not establish clinical correctness, shade fidelity, malware freedom, authorization, or provider-object immutability. The one-to-one Case evidence record stores the exact release ID, not policy JSON.

| Immutable R001 parameter | Approved value | Inclusive acceptance rule |
| --- | ---: | --- |
| `maxEncodedBytes` | 33,554,432 bytes | `0 < measuredBytes <= limit` over the original sequence |
| `maxWidth` | 9,000 pixels | `0 < encodedWidth <= limit` |
| `maxHeight` | 9,000 pixels | `0 < encodedHeight <= limit` |
| `maxDecodedPixels` | 50,000,000 pixels | overflow-safe `width * height <= limit` before decode |
| `maxMetadataBytes` | 262,144 bytes | sum of APP0-APP15 and COM segment payload bytes across the entire JPEG `<= limit`, not a per-segment or JPEG-standard maximum |

The release manifest must also close suffixes, format, component/depth/coding modes, strict marker/trailing/warning rules, canonical post-verification `image/jpeg`, digest/count semantics, and decoder adapter/build plus compatibility corpus identity. It must be retained, code-reviewed and server-owned. Browser, provider and environment variables cannot override acceptance values or choose the release. Later acceptance-affecting changes require a new release ID, with old manifests retained; changes in V1 meaning require V2. These five values are approved, but R001 is **not yet a complete executable manifest**: acceptance-affecting segment, scan and decoder-work bounds need benchmarked values and review.

The local [measurement study](jpeg-r001-measurement-20260928.md) has 26 non-clinical OS JPEGs, all baseline and at most 8.29 MP. It cannot establish 50 MP decoder capacity or dental-workflow distribution. The newer Product Owner compatibility-envelope decision, not that corpus, is authority for the values. Fifty million RGB pixels can require about 150 million raw bytes before decoder/worker overhead.

## Proposed provider-independent architecture

1. Accept a controlled byte stream in an isolated worker. Bound transfer/spool to the approved encoded-byte ceiling plus minimal overflow detection; count and hash the exact same original bytes inspected. Reject incomplete reads, overflow, cancellation and uncertain provenance. This offline interface does **not** prove provider-object binding.
2. Perform a bounded strict JPEG marker/entropy walk. Require SOI, one supported SOF/frame, valid lengths and SOS/EOI sequencing, no post-EOI data, supported coding/precision/components, aggregate APP/COM payload accounting, segment/scan counts and suffix agreement. Reject cheap violations before expensive decode. This narrow structural verifier is not a second generic decoder and needs parser-edge/fuzz review.
3. Fully decode the same bytes without resize, shrink-on-load, auto-orientation, output persistence or recompression. Candidate adapter: Sharp 0.35.4/libvips, currently **transitive**, not a direct LabOS validator dependency. Set `failOn: 'warning'`, explicit pixel/channel caps and `unlimited: false`; require completion and dimensions matching the marker walk. `metadata()` alone is header-only. Assess `ignoreIcc` and color-management behavior: internal decode conversion must not alter original bytes or imply shade accuracy. A bounded discard sink/stream might avoid a 150 MB raw buffer, but must be proven to force every scanline through decode. If this composition cannot prove a V1 rule, stop rather than relax V1.
4. Contain the native decoder in a process/worker with hard memory/CPU limits, abort/kill and exact spool cleanup. A JavaScript promise timeout alone cannot reliably interrupt native work. Disable other input loaders where feasible and verify on the deployment runtime. Output only verified facts for later evidence creation; no evidence write or attachment is in this design task.

Sharp documents warning-fatal handling and pixel limits, but not the strict EOI/trailing, single-image, aggregate metadata, scan-count or full-stream-consumption assertions required here; these remain separate proof obligations. Sharp recommends resource isolation for untrusted images. Sources: [constructor](https://sharp.pixelplumbing.com/api-constructor/), [input metadata](https://sharp.pixelplumbing.com/api-input/), [output behavior](https://sharp.pixelplumbing.com/api-output/), [security](https://sharp.pixelplumbing.com/security/). Production use requires a reviewed direct dependency and pinned build/version handling.

## Remaining controls and experiments

| Control | Evidence needed | Release treatment |
| --- | --- | --- |
| `maxSegmentCount`, `maxProgressiveScans`, decoder input/work budget | Legitimate progressive/camera files versus marker/scan amplification; worst accepted CPU/pixel-scan work and parser bounds | Acceptance-affecting; freeze in R001 before executable acceptance |
| Transfer idle/total timeout and bounded spool | Slow/stalled/aborted streams, exact cap and cleanup; later private-provider behavior separately | Operational if complete-success meaning is unchanged |
| Decode wall/CPU and process memory | Near-50 MP baseline/progressive, high-entropy/pathological scans; peak RSS, CPU and tail latency; kill on timeout | Operational containment plus any acceptance-affecting work bound in release |
| Concurrency/queue | 1/2/4-worker trials, overload/backpressure and aggregate memory | Operational load gate |
| Cancellation/crash cleanup | Kill during transfer, marker walk and native decode; no spool/evidence/status remnants | Runtime safety gate |

Use non-sensitive synthetic/public controls: exact-limit and +1 for each approved ceiling; portrait dimension swaps; 50 MP baseline and progressive; grayscale/three-component; segmented ICC plus EXIF/APP/COM aggregate boundary; zero/truncated data, false/missing EOI, appended bytes/concatenated JPEG, malformed lengths, unsupported precision/components/coding, warning-only cases, dimension bombs, many markers and many scans. Record provenance, measurements, peak RSS/CPU/wall time, results and decoder build without clinical content. Benchmark representative legitimate high-resolution camera files if lawfully available. Test native containment and parser fuzz/property cases. Experimental values do not become policy merely because one machine passes.

## Next authorization and gates

The smallest next V3 CODE/benchmark slice is an **offline provider-independent decoder-capability and resource-control harness** for controlled synthetic/public JPEG bytes. It may implement a candidate marker inspector and Sharp adapter only in a test/harness boundary, benchmark remaining controls, and return proposed immutable manifest values plus semantic pass/fail findings. It must not create grants/evidence, activate provider routes, or attach files. Independent V3 CODE/security review inspects parser coverage, warning handling, complete decode, release immutability, containment and adversarial results. If a V1 semantic is unprovable, return the exact blocker; do not label R001 executable.

After engineering values are fixed and reviewed, a separately authorized production validator/manifest CODE slice needs boundary/adversarial tests, pinned decoder dependency/build, worker containment, TypeScript/lint and independent V3 CODE review. Real private-provider retrieval, exact-object immutability or approved revalidation, callback/evidence binding, attachment and end-to-end clinical upload need separate capability/implementation/runtime gates. Retained UploadThing development evidence remains `defaultACL=public-read`, `allowACLOverride=false`, with a failed supported save of unknown cause; private entitlement is unproven. No public clinical fallback or provider-dependent acceptance follows from offline tests.
