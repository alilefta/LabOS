# N-FILE-110 production R001 retrieval/validation CODE packet

Date: 2026-10-01. Scope: the approved Windows x64 production CODE boundary from a server-reserved Case grant to exact-key UploadThing retrieval and JPEG_CLINICAL_V1_R001 validation. Independent V3 review: **PASS | CODE**. No Case route registration, live Case upload, clinical evidence, grant transition, StoredFile, version, or asset was performed.

## Candidate identity and implementation

- `modules/labos-files/jpeg-r001/grant.ts`: read-only transaction-fresh Case/tenant/member/assignment and PENDING grant check before provider access.
- `modules/labos-files/jpeg-r001/retrieve.ts`: UploadThing 7.7.4 key lookup, exact returned-key equality, approved development-app URL check, public DNS answer classification, pinned HTTPS socket resolution with hostname TLS verification, and bounded complete-response streaming. The deprecated lookup method is confined to this Files adapter; SDK replacement needs review.
- `modules/labos-files/jpeg-r001/inspect.ts`: R001 structural inspection of the original encoded JPEG bytes.
- `modules/labos-files/jpeg-r001/native.ts`: deterministic helper identity check, bounded LJ01 IPC, two active/two queued slots, five-second queue expiry, ten-second spawn-through-close deadline, cancellation and generic failure handling.
- `modules/labos-files/jpeg-r001/validate.ts`: one original Buffer for SHA-256, structural inspection, and direct codec decode; returns a narrow internal immutable result with profile, encoded size, dimensions, components, progressive flag, digest, and internal grant correlation. It retains the original buffer privately for the separately authorized finalization boundary and provides an integrity assertion. This module has no persistence writes.
- `native/r001/codec.c`: production helper source, separate from the feasibility executable. Direct libjpeg memory source, fatal warning/error manager, full scanline drain and finish, and self-established Windows Job Object before reading clinical bytes. It has a parent-death watcher and no provider identity input.
- `native/r001/build-win32-x64.ps1`, `native/bin/win32-x64/r001-codec.exe`, and `r001-codec.manifest.json`: deterministic reviewed build and fixed executable location. `native/r001/NOTICE.md`, `LICENSE.libjpeg-turbo.md`, and `README.ijg` retain redistribution notices. Downloaded installer and libraries remain outside the repository.

Pinned official libjpeg-turbo 3.2.0 VC x64 installer SHA-256: `662761d8ba8dae04aec74023ebaeceb856c2b56b9b59cfd180759d26300dda42`. Authenticode: Valid. Extracted `jpeglib.h`: `ea0fbba47e9e5da192a487df4df3cf01a338b86a0a85d154ef329dd7b5439043`; `jpeg-static.lib`: `b9640752d84cfbac3efcce70096c3a586ab6ad95b1163541ba9a11446a3337cc`. Source SHA-256: `00bbb812bf8ad9099e8021b3b224b8cfb9db6e25ff726def8fa14d48a27c17b3`. Built executable SHA-256: `24cdebf1552770d1e6edf7307d47f6124184e918839a928bc4b1ebfbd77a05d5` (633,856 bytes); repeated build yielded the same hash. MSVC compiler 19.44.35229.0, linker 14.44.35229.0, VS 2022 x64. PE imports only `KERNEL32.dll`; libjpeg-turbo is statically linked. Manifest records these identities and LJ01/win32/x64. Runtime checks executable hash/manifest/platform/protocol before use and has no decoder fallback.

## Focused CODE verification

| Check | Result |
| --- | --- |
| JPEG R001, provider retrieval, native IPC/identity, grant, validation boundary, and affected Case callback tests | PASS: 8 files, 65 tests |
| TypeScript `tsc --noEmit` | PASS |
| ESLint on R001 implementation/tests | PASS |
| Prisma schema validation | PASS; no schema change in this task |
| Native containment harness from pinned installer | PASS: 384 MiB Job allocation ceiling, enclosing Job, parent-death kill within 3 seconds in harness, invalid parent fail closed |

The focused tests cover exact key cardinality/equality, URL origin/path/query/fragment/userinfo/port, DNS public/nonpublic classes and pinned connection, HTTP status/redirect/content encoding/declared and actual byte limits, truncation/network failure, R001 baseline/progressive/grayscale and structural limits, direct native decode/warning/error behavior, helper identity/IPC/malformed output/crash, timeout/cancellation, queue saturation and expiry, grant authorization/state, same-byte SHA/inspect/decode, and absence of evidence/attachment writes. The Job test compiles run-owned test binaries from production containment logic. Test source and fixtures are retained under `tests/unit/modules/labos-files/jpeg-r001/` and `native/r001/`.

The independent Reviewer reran the broader focused set: **9 files, 70 tests**, plus TypeScript, focused ESLint, Prisma validation, and a fresh containment harness; all passed. The Reviewer inspected the actual CODE candidate and returned **PASS | CODE**, specifically covering grant/tenant authority before provider access, exact key and URL/SSRF/TLS checks, streamed byte enforcement, same-byte R001, direct libjpeg completion, containment/queue/IPC, binary identity/notices, and absence of premature persistence. Reviewer PASS is code acceptance only.

## Boundaries and limitations

The exact development UploadThing origin is `https://fyylnhrlmu.ufs.sh`, and only `/f/{exact-safe-key}` is accepted. The returned URL is a public bearer path; LabOS authorization controls this application's discovery/retrieval initiation, not third-party byte retrieval after the URL is known. Keys/URLs/native diagnostics are suppressed from intentional logs and client errors. The code does not assert provider object immutability; later attachment must refetch and compare SHA-256 to immutable evidence under separate authority.

Real provider retrieval through this implementation, live Case grant/callback, successful evidence finalization, grant PENDING→UPLOADED, attachment, Case route activation, deployed behavior, and production host Job/orphan behavior are **NOT_RUN** in this CODE task. The synthetic one-object provider probe and earlier isolated benchmark remain separate evidence. No numerical R001 acceptance or approved containment policy changed. This packet does not claim production runtime acceptance.

The exact run-owned build Temp directory `labos-r001-production-build-fa4c2f27b1c14819a6ca0d98f806c276` and repository marker `native/r001/.build-run-path` were removed after evidence retention. Their resolved paths were checked against the Temp root and expected run prefix before deletion; both were absent on read-back. The production source, executable, manifest, notices, and tests remain in the candidate.

## Review and next gate

Independent V3 review of the actual candidate returned **PASS | CODE**. The single next gate is separately authorized successful clinical-evidence finalization and atomic PENDING→UPLOADED transition while retaining this exact validated byte/result. Case attachment, rejected-object cleanup, and runtime activation remain separate.
