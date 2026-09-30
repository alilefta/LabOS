# N-FILE-110 — JPEG_CLINICAL_V1_R001 validator contract

**2026-09-29 V1 storage amendment:** The approved JPEG acceptance semantics
remain unchanged. UploadThing Free `public-read` removes the private-object
retrieval prerequisite for V1 but not exact provider-key/object binding,
bounded same-byte inspection, digest/revalidation, or production native-helper
packaging/containment. Private-provider statements below describe the deferred
storage-security target, not a V1 confidentiality claim.

Status: R001 acceptance semantics APPROVED; direct libjpeg-turbo integration/toolchain and runtime containment pending; implementation not authorized by this plan.
Authority: Product Owner R001 decisions through 2026-09-29; D-FILE-01/02/04 and N-FILE-110 Case evidence architecture.
Tier: V3 for native validation code and independent CODE/security review; later isolated runtime evidence for native containment and provider-dependent activation.

## Closed immutable release

`JPEG_CLINICAL_V1_R001` covers one clinical/reference dental photograph with a validated `.jpg`/`.jpeg` suffix. Clinical purpose and physical format remain separate. The authoritative original bytes are read completely, counted and SHA-256 hashed without recompression, metadata stripping, automatic rotation or storage transformation. A pass requires a single well-formed 8-bit Huffman-coded baseline sequential or progressive JPEG with one grayscale or three photographic components, real EOI, no trailing/concatenated bytes, and successful complete strict decompression. EXIF/ICC and other APP/COM payloads remain opaque, untrusted and preserved in the original. Encoded width/height are the matrix before orientation; pixel multiplication is overflow-safe. Canonical `image/jpeg` is derived only after both layers pass. This is not clinical correctness, shade accuracy, malware freedom, authorization or provider-object immutability.

| Acceptance control | R001 value | Counting/comparison contract |
| --- | ---: | --- |
| `maxEncodedBytes` | 33,554,432 | original bytes, positive and `<=`; no provider/client size authority |
| `maxWidth`, `maxHeight` | 9,000 each | encoded matrix dimensions, positive and `<=` |
| `maxDecodedPixels` | 50,000,000 | overflow-safe encoded width x height, `<=` |
| `maxMetadataBytes` | 262,144 | aggregate APP0-APP15 plus COM payload bytes, `<=`; not a JPEG/Exif/ICC standard claim |
| `maxSegmentCount` | 512 | count length-bearing structural marker segments only, `<=`: APP0-APP15, COM, DQT, DHT, DAC, DRI, SOFn, SOS and any other length-bearing JPEG marker segment encountered. Do not count SOI, EOI, RST0-RST7, TEM, FF00 stuffing or entropy payload. Counting a marker does **not** imply that its coding mode is supported; e.g. DAC remains incompatible with R001 Huffman-only acceptance. |
| `maxProgressiveScans` | 128 | number of SOS marker segments in a progressive JPEG, `<=`; no additional R001 numeric SOS ceiling for baseline beyond the segment cap and structural/decoder validity |
| `deterministicWorkBound` | `NONE` | no invented decoder-work score or hidden immutable CPU/RSS/time threshold |

Equality passes if all other rules pass; limit + 1 fails. A release change to any acceptance-affecting value or behavior requires an immutable successor release; historical R001 evidence is not reinterpreted. Neither browser/provider/environment configuration nor upload callback metadata may choose a release or override the limits. The approved five earlier values and the three newly resolved controls above are **PO-approved**, not merely the prior harness's experimental 512/64 controls.

## Two authoritative validation layers

1. A bounded LabOS marker inspector establishes structural acceptance over the exact original sequence: SOI, marker lengths, supported SOF/precision/components, SOS and entropy-stuffing/restart handling, aggregate metadata bytes, segment/scan counts, genuine EOI and exact exhaustion. It rejects malformed/truncated/concatenated structures and unsupported coding. It is not a general JPEG decoder. TEM and restart markers are excluded from *counting*, not automatically accepted regardless of syntax/context.
2. Direct strict **libjpeg-turbo libjpeg API** decompression establishes complete codec decoding of those same bytes. Use a non-suspending bounded source: `jpeg_start_decompress()` must succeed; repeatedly call `jpeg_read_scanlines()` until every output scanline is read, rejecting zero-progress/error; require `output_scanline == output_height`; `jpeg_finish_decompress()` must succeed. Every decoder warning and error is fatal via an explicit custom error manager; libjpeg's default print-and-continue warning behavior is insufficient. Do not scale, crop, skip scanlines, substitute header parsing, Sharp `stats()`, `raw().toBuffer()`, or a TurboJPEG shortcut for this normative sequence. Consume scanlines in bounded scratch space without persisting the raster. Cross-check decoder dimensions/components with the structural layer. Both layers must pass; neither substitutes for the other.

The exact same bounded original bytes must feed inspector, digest and decoder; no second mutable source fetch may silently replace them. The current provider-independent task may use synthetic/public local bytes but cannot prove future private provider object identity or immutability. On any parse/decode/warning/resource failure, no `CaseClinicalUploadEvidence` or UPLOADED grant may be produced. Operational cancellation and crash cleanup remain deployment gates.

## Native Node/Next integration gate

Repository observation (2026-09-29): local Node is now 24.21.0 on Windows x64; Next 16.3.3 uses transitive `sharp@0.35.4`, which is not a direct libjpeg API contract. VS 2022 x64/SDK 19041 now passes a standalone C build/run proof, and the [offline direct-libjpeg feasibility packet](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-native-helper-feasibility-20260929.md) is `FEASIBLE` after V3 `CODE` review. `next.config.ts` still has no native-helper packaging/externalization configuration, and no production deployment target/build manifest is established. The historical Sharp/libvips [offline probe](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-harness-20260928.md) remains research evidence only and does not satisfy the approved direct libjpeg-turbo mechanism.

Direct libjpeg-turbo requires a native helper boundary and reproducible build/delivery decision: exact libjpeg-turbo release/source or verified binary and hash, platform/architecture targets, compiler/CI build, static versus dynamic linking and DLL/shared-library load path, security updates, license notices, and compatibility tests on the actual Node/Next deployment. A Node-API addon would share the hosting process's native address space; a separately launched helper process is the recommended *proposed* direction for untrusted-byte crash/kill isolation and bounded IPC. It is not yet approved as the production integration contract. Next may bundle server imports unless explicitly externalized; a native binary cannot be assumed to ship with a route bundle. The route must be Node runtime/server-only, not Edge or browser. `jpeg_mem_src()` or an equivalent bounded immutable binary source can avoid file re-reads, but the exact input/IPC model is undecided. OS-native memory/CPU containment and kill behavior depend on the deployment target, which is not recorded here.

**Architecture/deployment decision required before production implementation:** approve the helper form (the isolated executable is feasible locally but not production-approved), pinned libjpeg-turbo build/binary distribution, supported runtime OS/architecture and how Next packages/launches it. Without these facts, implementation cannot claim a portable or contained validator. This decision is separate from the closed R001 acceptance semantics. The completed offline feasibility spike did not activate the Case route.

Official primary references: [libjpeg-turbo libjpeg API sequence and error handling](https://github.com/libjpeg-turbo/libjpeg-turbo/blob/main/doc/libjpeg.txt), [libjpeg-turbo APIs/build](https://github.com/libjpeg-turbo/libjpeg-turbo), [official binary platform considerations](https://libjpeg-turbo.org/Documentation/OfficialBinaries), [Node-API native-addon ABI scope](https://nodejs.org/api/n-api.html), [Next server package bundling](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages).

## Next bounded task and gates

The provider-independent native-helper feasibility slice is `CLOSED | FEASIBLE | V3 CODE PASS`; it does not approve production integration. The Product Owner's public-read V1 decision resolves private-provider entitlement as deferred, not a current validator gate. Before Case asset creation, a separately authorized compatibility decision must settle the installed `MANAGED_PRIVATE`/read contract for public-backed validated assets. Production helper packaging/launch and process-containment design then needs target-environment benchmarks and V3 review. Do not carry the local Windows build identity over to a different deployment target without new evidence.

Separately required before activation: actual deployment-native RSS/CPU/time/spool/concurrency containment and cleanup benchmarks; exact public provider-object retrieval/identity and digest revalidation if immutability is unproven; trusted callback/evidence binding; Case-targeted attachment; rejected-object cleanup; and later provider/browser end-to-end runtime acceptance. Private/signed access and N-FILE-111 remain separate.
