# JPEG_CLINICAL_V1_R001 offline decoder/structure probe

Status: V3 CODE/benchmark harness implemented; R001 executable acceptance BLOCKED_DECISION.
Date: 2026-09-28. Scope: synthetic local bytes only. No Case route, provider, grant, evidence, schema or DB use.

## Identity and method

Harness: `scripts/authorization/files/jpeg-r001/inspect.mjs`, `inspect.test.mjs`, `decode-worker.mjs`, `benchmark.mjs`. Sharp 0.35.4 / libvips 8.18.6 are resolved from Next's transitive install, not added to the production dependency contract. Host: Windows x64, Node 22.15.1, Intel i7-10750H (12 logical CPUs), 17.0 GB physical memory. Runs generated short-lived synthetic bytes in a run-owned OS temporary directory and removed that directory in `finally`. No clinical/public external image was copied. Product limits are exact constants in this non-production probe and remain the Product Owner's immutable values, not benchmark-selected.

The structural inspector scans bounded bytes for SOI, length-bearing markers, baseline/progressive SOF, 8-bit precision, one/three components, encoded dimensions, SOS, entropy byte-stuffing, restart markers, aggregate APP0-APP15/COM payload, actual EOI and exact end-of-input. It checks provisional injected segment/scan probe controls. It does not decode entropy. Sharp `metadata()` is used only as a header cross-check; `stats()` is the pixel-derived decode candidate. `failOn: 'warning'`, 50-million input-pixel cap, three-channel cap, `unlimited: false`, no auto-orient and `ignoreIcc` are explicit. Original encoded bytes are not transformed or persisted by the worker. Worker RSS is sampled at 5 ms intervals; those samples may miss a shorter peak. CPU time is process user+system time and can exceed wall time with native parallelism. The parent has a hard kill timer but no OS-level memory/CPU container yet.

## Observed probe matrix

These are one-machine observations, **not** immutable acceptance-policy choices. `512` length-bearing segments and `64` scans were experimental harness controls only. A passing uniform image is not representative of a high-entropy near-50 MP camera original.

| Synthetic fixture and provenance | Measured/observed structure | Decode outcome | Worker wall / CPU | Sampled peak RSS |
| --- | --- | --- | ---: | ---: |
| Uniform baseline 640x480 | 2,068 B; 8 segments; 1 scan; 0 metadata B | PASS | 33 / 141 ms | 46.9 MB |
| Uniform progressive 640x480 | 2,310 B; 23 segments; 10 scans | PASS | 33 / 62 ms | 47.9 MB |
| Uniform landscape 9000x5555 | 294,154 B; 49,995,000 pixels; 8 segments; 1 scan | PASS | 653 / 4,703 ms | 229.3 MB |
| Uniform portrait progressive 5555x9000 | 294,704 B; 49,995,000 pixels; 23 segments; 10 scans | PASS | 949 / 4,875 ms | 230.2 MB |
| Random-pixel 2048x2048 | 4,256,209 B; 4,194,304 pixels; 8 segments; 1 scan | PASS | 181 / 687 ms | 71.1 MB |
| Synthetic APP/COM exact aggregate | 262,144 metadata payload B across five added segments | PASS | 33 / 31 ms | 48.8 MB |
| Synthetic APP/COM +1 B | 262,145 metadata B | REJECT by inspector | 3 / 0 ms | 43.9 MB |
| Truncated entropy tail | Missing real EOI | REJECT by inspector | 3 / 0 ms | 43.9 MB |
| Shortened entropy with retained EOI | Structural walk reaches EOI | REJECT by Sharp `stats()` with premature-end warning/load error | 35 / 0 ms | 47.4 MB |
| Appended bytes / concatenated JPEG | Post-EOI bytes | REJECT by inspector | 3-4 / 0 ms | 44 MB |
| Stage-aware inspection kill | Child signaled `inspect-start` on high-entropy fixture | `killReturned=true`, exit signal `SIGTERM`, null code/result | 181 ms outer | Not measured |
| Stage-aware decode kill | Child signaled `decode-start` on near-50 MP fixture | `killReturned=true`, exit signal `SIGTERM`, null code/result | 190 ms outer | Not measured |
| Two-slot concurrency probe | Two high-entropy workers admitted; third rejected by probe capacity | Both admitted workers PASS; `peakActive=2` | 372-390 ms outer | Per-child samples only |

Values above are representative from the second complete probe run and are rounded where needed; the stage-aware cancellation and two-slot observations came from the subsequent probe run. The temporary directory was removed after every run. The initial benchmark attempt stopped on a synthetic grayscale fixture-generation error (`create.channels=1` unsupported), before reporting a matrix; after correction the encoder still produced a three-component JPEG. **A genuine one-component JPEG remains NOT_RUN**, not PASS. Stage-aware termination was confirmed by the requested `SIGTERM` disposition after each signal, but does not prove interruption within that phase rather than just before it. The capacity check is a harness admission demonstration, not a production queue/load test. Sampled RSS may miss the actual peak.

`node --test scripts/authorization/files/jpeg-r001/inspect.test.mjs`: **8/8 PASS**. Tests cover approved constants, baseline/progressive parsing, missing/false EOI, trailing/concatenated bytes, malformed length, provisional segment/scan rejection, aggregate metadata, pre-aborted signal, encoded-byte overflow, axis/pixel structural boundaries including 50,000,000 and +1, and 1,000 deterministic single-byte mutations that terminated without crash/hang. The mutation sweep is not coverage-guided fuzzing or proof of parser correctness. Approved byte-ceiling exact-equality with a valid image was not constructed; > ceiling rejects before parsing. Exact metadata equality and +1 were exercised in the worker probe. No valid segmented ICC profile, authentic EXIF+ICC camera file, valid high-scan-count progressive JPEG, supported grayscale JPEG, high-entropy near-50 MP JPEG, or 32 MiB valid compressed JPEG was exercised.

## Semantic and security findings

The two-stage composition has **partial** evidence: marker walk rejects several structural evasions that Sharp does not promise to reject; `stats()` rejected one late entropy-damaged file that header/marker parsing did not. [Sharp metadata](https://sharp.pixelplumbing.com/api-input/) explicitly does not decode pixels. [Sharp constructor](https://sharp.pixelplumbing.com/api-constructor/) documents `failOn: 'warning'`, pixel/channel caps and no-unlimited safety behavior; [Sharp security](https://sharp.pixelplumbing.com/security/) recommends hard process resource limits for untrusted input. These docs do not prove that `stats()` always forces every scanline for all accepted JPEG modes, that warnings are always surfaced as fatal in this composition, or that native work can be killed with a JavaScript timeout. The `stats()` path needs differential late-corruption and instrumentation tests before it can be chosen as the V1 complete-decode proof. A pixel-output-to-bounded-discard sink or a smaller dedicated libjpeg-turbo adapter remains a candidate if that proof fails.

The inspector is security-critical and currently only a prototype. It does not yet comprehensively validate scan component selectors, Huffman/quantization table dependencies, restart interval semantics, or all legal inter-scan marker permutations; the decoder may reject many such cases, but parser boundedness and support-language agreement still need independent review and more fixtures. The sampled near-50 MP RSS (~230 MB) demonstrates that the approved pixel envelope needs native-process containment. A JavaScript heap cap alone is not an adequate native RSS bound. Sharp's official security guidance recommends OS control-group containment in deployment; the Windows probe did not establish the deployable containment mechanism.

## Proposed remaining R001 controls

| Control | What it bounds; legitimate exclusions | Evidence and decision |
| --- | --- | --- |
| `maxSegmentCount` | Many tiny length-bearing markers amplify parser/decoder work; unusual metadata/table-heavy JPEGs may be excluded. | Probe saw 8-23 ordinary segments and 13 at metadata equality, not representative camera originals. `512` was a probe stop value, **not a defensible R001 proposal yet**. Obtain segmented ICC/Exif camera originals and high-segment but valid controls, then profile decoder CPU. BLOCKED_DECISION. |
| `maxProgressiveScans` | Excessive successive scans can amplify CPU over pixel count; valid unusual progressive encodings may be excluded. | Probe saw 10 scans in Sharp output and none from independent camera originals. `64` was a probe stop value, **not approved**. Obtain valid many-scan encodings with known scan script and benchmark CPU versus scan count; [libjpeg-turbo analysis](https://www.libjpeg-turbo.org/pmwiki/uploads/About/TwoIssueswiththeJPEGStandard.pdf) warns of pathological scan amplification. BLOCKED_DECISION. |
| Deterministic input/work bound | Encoded bytes and pixels alone do not bound scan/table work tightly enough for a fixed semantic pass envelope. | Need adversarial valid JPEGs at near-50 MP, varying entropy and scans, to decide whether segment+scan+pixel caps suffice or a stable work metric is needed. A wall-clock timeout alone is machine-dependent and cannot serve as immutable acceptance semantics. BLOCKED_DECISION. |

The limits above are acceptance-affecting because they reject particular otherwise-decodable byte sequences. They belong in the immutable R001 release once decided, not an environment override. Their exact values are not established by one Windows machine. Operational experiments remain open: transfer idle/total timeouts, bounded spooling with exact cleanup, process CPU/wall/memory kill, native decode cancellation, worker queue/concurrency/backpressure, crash cleanup and deployment-specific containment. A timeout or overload rejection changes whether an attempt completes but not the meaning of a successful completed pass; if configured to systematically exclude otherwise-valid files, that distinction needs Product Owner review.

For the next contained-worker experiment, carry forward only **trial ranges**, not defaults: transfer idle 10-30 seconds and total 1-5 minutes; decode wall 2/5/15 seconds with separately measured CPU; memory containment 512 MiB to 1 GiB (the observed ~230 MB is sampled, not a guaranteed peak); 1/2/4 concurrent workers with a bounded queue and explicit overload rejection. Spool capacity must hold at most the approved 33,554,432 original bytes plus the minimum overflow-detection read-ahead, with no unbounded in-memory duplication. These ranges come from the prior [measurement study](jpeg-r001-measurement-20260928.md) as experimental candidates, not from a representative production workload. Test each against near-50 MP high-entropy/progressive files and the actual deployable OS containment before choosing a default. If a timeout or memory cap becomes an acceptance-determining byte-sequence filter in practice, escalate it as an R001 release decision.

## Manifest and gates

| Manifest element | Status |
| --- | --- |
| ID `JPEG_CLINICAL_V1_R001`, initial clinical/reference-photo JPEG purpose, `.jpg`/`.jpeg`, 8-bit baseline/progressive Huffman, one/three components, strict V1 structural/full-decode semantics | PO-approved baseline |
| Encoded 33,554,432 B; axis 9,000 px; pixels 50,000,000; APP/COM aggregate 262,144 B | PO-approved immutable values |
| `maxSegmentCount`, `maxProgressiveScans`, deterministic decoder/work bound | BLOCKED_DECISION pending valid high-complexity corpus and review |
| Decoder adapter/build identity and full-decode/warning proof | Candidate Sharp 0.35.4/libvips 8.18.6; NOT ACCEPTED |
| Transfer, spool, CPU/wall, RSS, concurrency/queue, cancellation/cleanup | Operational/deployment controls, NOT_ACCEPTED and not silently part of R001 manifest |

**Independent V3 `CODE` review:** initial `CORRECTION_REQUIRED` because the stage-aware kill evidence did not record an exit signal. The harness was corrected to record and require `killReturned=true`, matching stage, `SIGTERM`, null result and no timeout. A fresh probe observed both corrected kill cases; 8/8 focused tests and owned ESLint passed. Independent rereview returned **PASS** for this non-production harness, including the parser marker whitelist, two-slot admission probe and exact temporary-directory cleanup.

**Verdict:** harness CODE `PASS` for the authorized offline slice, but executable R001 semantic assurance and immutable work controls remain `BLOCKED_DECISION`. The next engineering continuation needs authentic non-sensitive/high-complexity compatible JPEGs and a deployable contained-worker benchmark. Native containment runtime verification is `NOT_RUN`/`CAPABILITY_BLOCKER`. Provider-private ACL, exact-object retrieval/identity, callback/evidence/attachment and signed reads remain separate capability and runtime gates. No provider or Case upload claim follows from this offline probe.
