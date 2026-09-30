# R001 direct-libjpeg native-helper feasibility

Status: FEASIBLE; independent V3 CODE rereview PASS; production architecture not approved
Scope: provider-independent N-FILE-110 research only
Date: 2026-09-29

## Separate prerequisite

The VS Enterprise 2022 x64 C/SDK gate is documented in
[`vs2022-native-toolchain-remediation-20260929.md`](vs2022-native-toolchain-remediation-20260929.md).
Its later post-install verification passed. The prior failed checkpoint remains
historical evidence, not an executable libjpeg result.

## Provenance and build

| Item | Result |
| --- | --- |
| Host | Windows 10.0.19045 x64; Node 24.21.0 for the offline Node test harness |
| Upstream | Official `libjpeg-turbo/libjpeg-turbo` 3.2.0 release, Visual C++ x64 artifact |
| Download | `https://github.com/libjpeg-turbo/libjpeg-turbo/releases/download/3.2.0/libjpeg-turbo-3.2.0-vc-x64.exe` |
| Artifact | 2,361,008 bytes; SHA-256 `662761d8ba8dae04aec74023ebaeceb856c2b56b9b59cfd180759d26300dda42` matches the Product Owner pin |
| Additional authenticity | Windows Authenticode `Valid`, signer SignPath Foundation |
| Acquisition time | 2026-09-29T14:30:59Z |
| Extraction | 7-Zip from the verified installer into exact run-owned temp directory; installer was not executed |
| Header | `jpeglib.h` SHA-256 `ea0fbba47e9e5da192a487df4df3cf01a338b86a0a85d154ef329dd7b5439043` |
| Static library | `jpeg-static.lib` SHA-256 `b9640752d84cfbac3efcce70096c3a586ab6ad95b1163541ba9a11446a3337cc` |
| Helper | `r001-codec-probe.exe` SHA-256 `59c3ea49b89042ca431358112c9f2996f0a9a52a55443e07a662c59b9c3c0403`; offline test asserts this hash before execution |
| Linking | VS 2022 MSVC `19.44.35229`, `cl /std:c11 /TC /W4 /WX /wd4324`, official include path and `jpeg-static.lib`; `/wd4324` suppresses only the expected `jmp_buf` alignment-padding warning |
| Loaded JPEG DLL | None. `dumpbin /dependents` lists `KERNEL32.dll` only; `dumpbin /headers` reports PE x64 (`8664`) |

Build from the verified extracted artifact, in the VS 2022 x64 developer
environment with SDK 19041:

```text
cl /nologo /std:c11 /TC /W4 /WX /wd4324 /I"<run>/extracted/include" /Fo:"<run>/r001-codec-probe.obj" /Fe:"<run>/r001-codec-probe.exe" scripts/authorization/files/jpeg-r001/native-helper-feasibility.c /link "<run>/extracted/lib/jpeg-static.lib"
```

The source is [the offline helper](../../../../../scripts/authorization/files/jpeg-r001/native-helper-feasibility.c),
not part of the Next.js runtime. The official extracted license states IJG
terms for the libjpeg API library; any eventual binary distribution needs
separate license/notice and packaging review.

## Bounded interface and direct decoder sequence

The helper reads exactly one `LJ01` frame from binary stdin: four magic bytes,
little-endian 32-bit length, then that many bytes, followed by EOF. Length
must be nonzero and at most 33,554,432. No path, provider URL, object key,
clinical payload or decoded raster is returned. The response is one short
versioned line (`LJ01 OK ...` or `LJ01 ERR ...`) plus process exit status.
The child holds the same received byte sequence through `jpeg_finish_decompress()`;
the Node harness sends the already-inspected original buffer, without a file
handoff or mutable second source. This does not establish provider-object
identity or immutability.

The helper installs custom `error_exit` and `emit_message` callbacks before
decoding; every libjpeg warning and error longjmps to a failure path. It uses
bounded, non-suspending `jpeg_mem_src`, calls `jpeg_start_decompress`, reads
one reusable output scanline until `output_scanline == output_height`, and
requires `jpeg_finish_decompress` success. It discards decoded rows and
destroys the decompressor/frees input and row storage on success and failure.
The LabOS marker inspector remains the structural-policy authority; the
helper's codec result cannot override inspector rejection.

## Offline test evidence

Run-specific commands (replace the exact run root only when reproducing a new
build; recompute the expected helper SHA-256 for that build):

```powershell
$root = Join-Path $env:TEMP 'nfile110-native-resume-20260929-2d6f9c81'
$env:R001_HELPER = Join-Path $root 'r001-codec-probe.exe'
$env:R001_CJPEG = Join-Path $root 'extracted/bin/cjpeg.exe'
$env:R001_HELPER_SHA256 = '59c3ea49b89042ca431358112c9f2996f0a9a52a55443e07a662c59b9c3c0403'
node --test scripts/authorization/files/jpeg-r001/native-helper-feasibility.test.mjs
node --test scripts/authorization/files/jpeg-r001/inspect.test.mjs
```

With `R001_HELPER` set to the exact run-owned helper and `R001_CJPEG` to the
official extracted `cjpeg.exe`, the corrected native suite passed **9/9** and the
existing inspector suite passed **8/8**. Fixtures are synthetic: Sharp/libvips
generated baseline/progressive RGB, and the official cjpeg generated a true
one-component grayscale JPEG from a generated PGM. No clinical/public image
file was copied or retained.

| Scenario | Observation |
| --- | --- |
| Baseline, progressive, one-component grayscale | Inspector accepted and helper returned full-height scanline completion with matching dimensions/components |
| Missing EOI | Helper rejected, custom warning path (`LJ01 ERR DECODE 2 120`) |
| Entropy shortened but EOI retained | Inspector passed structural walk; helper rejected, custom warning path (`LJ01 ERR DECODE 2 117`) |
| Malformed progressive DC scan header | Inspector passed structural walk; helper rejected, custom fatal-error path (`LJ01 ERR DECODE 1 16`) |
| Trailing byte and concatenated JPEG | Direct codec could decode trailing data; composed inspection rejected both before child success could count |
| Empty/oversized/incomplete/extra framed input | Helper rejected with bounded `LJ01 ERR FRAME` response |
| Child-result integrity | Composed path required exact `LJ01 OK` dimensions, components and completed scanlines; nonzero/signal exit, extra output, mismatched dimensions and stderr all rejected |
| Structural equality and plus one | Five Product Owner limits plus 512 segments/128 scans exercised at inspector boundary; native framing rejects encoded-byte overage |
| Child blocked on incomplete stdin | Caller terminated child; no success record |
| Abnormal child exit | Harness classification probe rejected a child exit 7 with no success record |

The initial Windows run failed because CRT text-mode stdin altered JPEG bytes
and stdout line endings. The helper was corrected to use `_O_BINARY`; the
same tests then passed. No production timeout, memory, concurrency, queue, or
deployment policy was selected. The abnormal-exit probe exercises caller
interpretation, not a deliberate crash of the native helper. The prior
Sharp/libvips packet remains historical research and is not direct-libjpeg
proof.

## Open gates

The first independent V3 `CODE` reviewer returned `CORRECTION_REQUIRED`:
composition was not explicit, build/test identity evidence was not linked to
the test invocation, and boundary/child-failure tests were incomplete. The
bounded follow-up added exact composition and child-result checks, an
asserted run-specific executable hash, the commands above, and equality/
plus-one structural controls. Independent V3 `CODE` rereview returned `PASS`:
the Reviewer checked the exact helper SHA-256 and static-link evidence,
reran the native suite (9/9) and inspector suite (8/8), and found no remaining
CODE defect in the bounded offline feasibility scope. The combined local
regression run passed 17/17. The result is **FEASIBLE**, not production
acceptance.

## Proposed production integration contract, not approved

1. Package one reviewed helper build for each explicitly supported target,
   with source/library/build identities, binary digest and IJG notices. Launch
   by an absolute server-owned path, not PATH or a transitive Sharp binary.
2. Obtain one exact private provider object through a separately approved
   retrieval/binding protocol. Bound and hash the original bytes once; feed
   those same bytes to the LabOS inspector and the length-framed child stdin.
   No provider URL, callback MIME, filename or browser value grants authority.
3. Accept only when the inspector passes, the helper exits zero without a
   signal/stderr, and its sole bounded versioned result exactly matches the
   inspector's dimensions/components and full output-scanline count. Missing,
   malformed, extra, crashed or timed-out child output fails closed.
4. Approve and verify deployment-specific child CPU, wall, memory, queue,
   concurrency, cancellation and crash cleanup controls before activation.
   This feasibility run chooses none of those values.

This executable is not automatically a
production architecture: packaging, launch/discovery, library patching,
process containment, cancellation/overload cleanup, and provider-private
exact-object retrieval require separate decisions and evidence. No Case
upload, callback, attachment, signed read, or provider operation ran.

## Exact run cleanup

After Reviewer `PASS`, the resolved exact run directory
`%TEMP%\nfile110-native-resume-20260929-2d6f9c81` was verified under the
Windows temp root and checked not to be a reparse point. PowerShell removed
only that run directory. Independent existence checks found the directory,
official installer and compiled helper absent. The repository retains the
offline C source, tests and this evidence packet, not a third-party binary.
