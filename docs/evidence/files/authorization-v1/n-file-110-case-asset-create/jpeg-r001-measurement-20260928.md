# JPEG_CLINICAL_V1_R001 representative measurement study

Status: MEASUREMENT COMPLETE; numerical policy remains BLOCKED_DECISION.
Date: 2026-09-28. Scope: read-only/local measurement and source research; no validator or provider activation.

## Corpus and method

The repository's tracked files, `public`, `tests`, `docs`, dependency tree, and project temporary tree contained **zero JPEGs**. I did not inspect personal photo directories. The only non-sensitive local corpus found was 26 Windows-supplied files under `C:\Windows\Web` (9 in `4K`, 4 in `Screen`, 13 in `Wallpaper`). They are general wallpaper/screen images, **not** dental, shade, smartphone-original, or DSLR-original specimens. No image bytes, thumbnails, filenames, or EXIF values are retained here; the sample IDs are anonymous ordering labels.

A temporary local-only measurement helper read each file once. It counted encoded filesystem bytes; parsed JPEG SOI/SOF/SOS/EOI markers, APP/COM payload lengths, Exif and ICC marker presence, ICC payload bytes, length-bearing segment count, progressive SOS count, and trailing bytes; calculated width x height with `BigInt`; then compared dimensions/progressive/Exif/ICC against installed sharp 0.35.4 / libvips 8.18.6 metadata. Agreement was **26/26**. All 26 completed `sharp(..., { failOn: 'warning', limitInputPixels: 100_000_000 }).raw().toBuffer()`; all were 8-bit, three-component baseline JPEG, one scan, zero trailing bytes. This is a full raw-output decode **measurement**, not an R001 validator or a proof that arbitrary malformed files are rejected. For study safety, decoding was skipped above 64 MiB encoded or 100 million pixels; no sample met either guard. The single-run wall times below include decoder/process effects and are not production latency guarantees. No process peak-RSS/CPU, transfer, spool, or concurrency experiment was performed.

| Direct measure | n | Minimum | Median | Maximum |
| --- | ---: | ---: | ---: | ---: |
| Encoded bytes | 26 | 23,615 | 288,416 | 1,557,291 |
| Width (px) | 26 | 280 | 1,920 | 3,840 |
| Height (px) | 26 | 175 | 1,200 | 3,840 |
| Decoded pixels | 26 | 49,000 | 2,304,000 | 8,294,400 |
| APP/COM payload bytes | 26 | 12 | 12 | 3,204 |
| ICC payload bytes | 26 | 0 | 0 | 3,158 |
| Length-bearing segments | 26 | 5 | 5 | 11 |
| Progressive scans | 26 | 1 | 1 | 1 |
| Raw-output decode wall time (ms) | 26 | 11.1 | 25.7 | 76.3 |
| Raw output bytes | 26 | 147,000 | 6,912,000 | 24,883,200 |

Only one sample contained Exif and ICC; its aggregate APP/COM payload was 3,204 bytes (ICC 3,158). That sample was also the smallest image, so it is **not** a representative upper metadata bound. The largest encoded sample was 1,557,291 bytes at 3,840x2,160. No meaningful P90/P95 is reported: 26 files from one OS image pack are neither a large nor an independent clinical-photo sample.

## Anonymized direct measurements

`APP/COM` and `ICC` are aggregate payload bytes, excluding each segment's marker/length. `Segments` counts length-bearing JPEG segments, including SOS; `Scans` counts SOS markers. Every row is baseline 8-bit/three-component, decoded successfully, and had zero trailing bytes. Times are one local run in milliseconds.

| ID | Group | Encoded B | Encoded WxH | Pixels | APP/COM B | Exif | ICC B | Segments | Scans | Decode ms |
| --- | --- | ---: | --- | ---: | ---: | :---: | ---: | ---: | ---: | ---: |
| SYS-01 | 4K | 119,827 | 1024x768 | 786,432 | 12 | N | 0 | 5 | 1 | 12.1 |
| SYS-02 | 4K | 235,444 | 1200x1920 | 2,304,000 | 12 | N | 0 | 5 | 1 | 22.1 |
| SYS-03 | 4K | 176,249 | 1366x768 | 1,049,088 | 12 | N | 0 | 5 | 1 | 14.0 |
| SYS-04 | 4K | 723,259 | 1600x2560 | 4,096,000 | 12 | N | 0 | 5 | 1 | 40.9 |
| SYS-05 | 4K | 712,226 | 2160x3840 | 8,294,400 | 12 | N | 0 | 5 | 1 | 63.2 |
| SYS-06 | 4K | 341,387 | 2560x1600 | 4,096,000 | 12 | N | 0 | 5 | 1 | 35.7 |
| SYS-07 | 4K | 827,705 | 3840x2160 | 8,294,400 | 12 | N | 0 | 5 | 1 | 66.6 |
| SYS-08 | 4K | 173,159 | 768x1024 | 786,432 | 12 | N | 0 | 5 | 1 | 12.4 |
| SYS-09 | 4K | 222,822 | 768x1366 | 1,049,088 | 12 | N | 0 | 5 | 1 | 14.5 |
| SYS-10 | Screen | 1,557,291 | 3840x2160 | 8,294,400 | 12 | N | 0 | 6 | 1 | 76.3 |
| SYS-11 | Screen | 1,004,054 | 1920x1200 | 2,304,000 | 12 | N | 0 | 6 | 1 | 35.1 |
| SYS-12 | Screen | 364,030 | 1920x1200 | 2,304,000 | 12 | N | 0 | 6 | 1 | 24.2 |
| SYS-13 | Screen | 36,632 | 1920x1200 | 2,304,000 | 14 | N | 0 | 9 | 1 | 15.0 |
| SYS-14 | Wallpaper | 23,615 | 280x175 | 49,000 | 3,204 | Y | 3,158 | 11 | 1 | 11.1 |
| SYS-15 | Wallpaper | 626,435 | 1920x1200 | 2,304,000 | 12 | N | 0 | 6 | 1 | 30.2 |
| SYS-16 | Wallpaper | 1,277,444 | 3840x1200 | 4,608,000 | 12 | N | 0 | 6 | 1 | 54.8 |
| SYS-17 | Wallpaper | 429,951 | 1920x1200 | 2,304,000 | 12 | N | 0 | 6 | 1 | 27.3 |
| SYS-18 | Wallpaper | 1,194,532 | 1920x1200 | 2,304,000 | 12 | N | 0 | 6 | 1 | 37.4 |
| SYS-19 | Wallpaper | 595,514 | 1920x1200 | 2,304,000 | 12 | N | 0 | 6 | 1 | 28.7 |
| SYS-20 | Wallpaper | 107,574 | 1920x1200 | 2,304,000 | 12 | N | 0 | 5 | 1 | 21.5 |
| SYS-21 | Wallpaper | 77,768 | 1920x1200 | 2,304,000 | 12 | N | 0 | 5 | 1 | 19.8 |
| SYS-22 | Wallpaper | 124,505 | 1920x1200 | 2,304,000 | 12 | N | 0 | 5 | 1 | 21.8 |
| SYS-23 | Wallpaper | 158,112 | 1920x1200 | 2,304,000 | 12 | N | 0 | 5 | 1 | 22.1 |
| SYS-24 | Wallpaper | 88,189 | 1920x1200 | 2,304,000 | 12 | N | 0 | 5 | 1 | 19.9 |
| SYS-25 | Wallpaper | 137,608 | 3840x1200 | 4,608,000 | 12 | N | 0 | 5 | 1 | 33.6 |
| SYS-26 | Wallpaper | 393,630 | 1920x1200 | 2,304,000 | 12 | N | 0 | 5 | 1 | 27.1 |

## External context, not measured corpus

Dental practice can use dedicated high-resolution cameras: Nikon documents a dentist using a D850 for dental photography ([Nikon dental photography](https://www.nikonusa.com/learn-and-explore/c/tips-and-techniques/can-a-dentist-help-you-take-better-photographs-this-one-can)). Canon's EOS R5 manual lists a **44.8 MP / 8,192x5,464** large JPEG and approximate file sizes of **13.5 MB fine** or **6.8 MB normal**; Canon explicitly notes size varies with shooting conditions ([Canon EOS R5 specifications](https://cam.start.canon/en/C003/manual/html/UG-09_Reference_0100.html)). These are published camera specifications, not LabOS sample measurements, and do not establish how often those files appear in clinical/reference workflows. Apple's 48 MP modes are further evidence that high-resolution phone capture exists, but its documented 48 MP HEIF/RAW examples are **not** a JPEG-size distribution ([Apple ProRAW support](https://support.apple.com/en-nz/119916)).

Sharp documents that `metadata()` does not decode compressed pixels, while `failOn`, pixel/channel limits and the `unlimited` switch affect handling of untrusted images ([sharp input metadata](https://sharp.pixelplumbing.com/api-input/), [sharp constructor](https://sharp.pixelplumbing.com/api-constructor/)). Sharp's security guidance recommends runtime resource isolation, and libjpeg-turbo documents how excessive progressive scans can amplify decode work ([sharp security](https://sharp.pixelplumbing.com/security/), [libjpeg-turbo analysis](https://www.libjpeg-turbo.org/pmwiki/uploads/About/TwoIssueswiththeJPEGStandard.pdf)). These support engineering controls, not particular LabOS ceilings.

## Decision table: Product Owner numerical policy remains open

All rejection counts below refer only to the 26 non-clinical local files. Values are **illustrative candidates**, not selected limits. `>` means rejected; equality would pass. MiB = 1,048,576 bytes.

| Parameter | Direct local evidence | Candidate values and observed/external tradeoffs | Decision |
| --- | --- | --- | --- |
| `maxEncodedBytes` | 23,615–1,557,291 B; median 288,416; n=26 | **1 MiB:** rejects 3/26 local, likely too small. **8 MiB:** rejects 0/26 local but would reject Canon's approximate 13.5 MB large/fine example. **16 MiB:** rejects 0/26 and would admit that example. **32 MiB:** more headroom/storage abuse exposure, not justified by this corpus. | BLOCKED_DECISION |
| `maxWidth` | 280–3,840 px; median 1,920; n=26 | **4,096:** rejects 0/26 but rejects 8,192-wide R5 large JPEG. **8,192:** admits that published example at equality. **10,000:** future headroom with larger pixel/resource exposure. | BLOCKED_DECISION |
| `maxHeight` | 175–3,840 px; median 1,200; n=26 | **4,096:** rejects 0/26 but rejects 5,464-high R5 example. **5,500:** admits it. **8,192:** more orientation/crop headroom at greater resource cost. | BLOCKED_DECISION |
| `maxDecodedPixels` | 49,000–8,294,400; median 2,304,000; n=26 | **12 MP:** rejects 0/26 but rejects 44.8 MP R5. **24 MP:** still rejects that camera's large JPEG. **48 MP:** admits it. **64 MP:** additional headroom with raw RGB memory near 192 MiB before decoder overhead. | BLOCKED_DECISION |
| `maxMetadataBytes` | APP/COM 12–3,204 B; median 12; n=26; only one Exif+ICC | **4 KiB:** rejects 0/26, but one sample is close and real exports may exceed it. **64 KiB** or **256 KiB:** reject 0/26; legitimate Exif/ICC/XMP distributions and parsing costs remain unmeasured. | BLOCKED_DECISION |

The maxima must be assessed **together**: width x height via overflow-safe arithmetic, encoded bytes, APP/COM, segments, scans, decode time, and memory. A high-resolution file can satisfy one ceiling yet exhaust another budget. No production value is selected by this packet.

## Security fixture inventory for later validator work

Design/inventory only; none were executed as R001 tests. Construct or acquire non-clinical, run-owned fixtures for: zero bytes; truncation in marker/entropy data; malformed segment lengths; missing/false EOI; appended bytes after EOI; concatenated JPEGs; exaggerated SOF dimensions and pixel product; many/large APP and COM segments; many total segments; progressive images with ordinary and adversarial scan counts; unsupported precision/components/coding SOF modes; decoder warning vs error; and verified-content/extension disagreement. Include clean baseline, ordinary progressive, camera-original Exif, ICC, and combined Exif+ICC controls. Avoid using client MIME or filename as proof of validity.

## Engineering experiments to review separately

These are **experimental candidate ranges**, not approved R001 controls or observations. The local corpus cannot calibrate them; run adversarial and representative-file benchmarks in an isolated validator process before selection.

| Control | Experimental range / procedure | Evidence gap |
| --- | --- | --- |
| `maxSegmentCount` | Compare 128, 512, and 2,048 while counting before decode. | Local max 11; no camera-original or adversarial distribution. |
| `maxProgressiveScans` | Compare 16, 64, and 128; measure worst-case CPU per encoded byte and pixel-scan. | Zero progressive local specimens; use ordinary progressive plus adversarial many-scan fixtures. |
| Decoder input/work | Keep `failOn: 'warning'`, no `unlimited`; bind pixel/channel/input caps to chosen R001 ceilings; explore a pixel x scan work budget. | Sharp defaults are not LabOS approval; header metadata is untrusted until complete decode. |
| Transfer time | Experiment with 10–30 s idle and 1–5 min total budgets via abortable streams. | No private provider transfer capability or network measurements. [Node stream abort support](https://nodejs.org/api/stream.html). |
| Decode time | Compare 2, 5, and 15 s wall budgets plus CPU accounting in an isolated worker. | Local single-run 11–76 ms is not a stress/CPU bound. |
| Bounded spool | Test 16, 32, and 64 MiB hard caps, no unbounded in-memory buffering; exact bound must match final encoded-byte policy. | No provider private-object streaming test. |
| Process memory | Test 256, 512, and 1,024 MiB isolated worker limits, recording peak RSS and concurrent workload. | Raw RGB output reached 24.9 MB locally; total decoder memory not measured. |
| Concurrency/queue | Start with experiments at 1, 2, and 4 concurrent validators and a small bounded queue; reject/shed excess. | No throughput or tail-latency measurements. [Sharp concurrency/cache controls](https://sharp.pixelplumbing.com/api-utility/). |

## Required next evidence and decision

Before numerical approval, obtain a consented, non-content measurement set of genuine `.jpg`/`.jpeg` clinic/dental-reference photos: ordinary and high-resolution smartphone originals, DSLR/mirrorless dental photos, intraoral and shade/reference photos, baseline and progressive, and realistic Exif/ICC combinations. Retain only aggregate/non-content statistics and provenance class, not filenames, thumbnails, EXIF values, or patient content. Establish at least independent source/device/workflow strata; a larger stratified corpus is needed before useful percentile claims. Then test the candidate ceilings against actual rejection counts and measure isolated decode CPU/RSS/transfer behavior. The Product Owner must choose all five final ceilings separately. Private UploadThing access and provider-object trust remain a distinct capability gate.
