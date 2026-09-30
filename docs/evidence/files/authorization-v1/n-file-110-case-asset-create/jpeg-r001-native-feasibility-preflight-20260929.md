# R001 native-helper feasibility preflight

Status: BLOCKED_DECISION before native execution and CODE review
Scope: offline, provider-independent N-FILE-110 feasibility only
Date: 2026-09-29

## Authority and stop

The first attempt stopped before external acquisition. A subsequent Product
Owner authorization pinned one official 3.2.0 Windows VC x64 artifact and
permitted its run-local acquisition. That integrity gate passed, but the local
MSVC installation lacks required development components. No helper was built
or run, and no
direct libjpeg-turbo behavior is claimed by this packet. The existing
Sharp/libvips research harness remains historical evidence, not proof of the
approved decoder contract.

## Local observations

| Item | Read-only result |
| --- | --- |
| Host | Windows 10.0.19045, x64 OS and x64 PowerShell process (PowerShell 7.6.5) |
| Compiler | Visual Studio Enterprise 2022 at `F:\Microsoft Visual Studio 2022`; MSVC x64 `cl.exe` file version 19.44.35228.0, toolset directory 14.44.35207. Executable present, but headers/link libraries are not installed |
| Other IDE | Visual Studio Community 2026 at `F:\Microsoft Visual Studio 2026` |
| Compiler on PATH | None; MSVC is installed outside PATH |
| libjpeg-turbo before acquisition | No independent installation found in checked standard Windows install paths, Visual Studio tool roots, NuGet package root, or top-level local download locations |
| Docker | CLI present; daemon unavailable (`docker_engine` pipe absent). No container fallback used |
| Repository | Existing `scripts/authorization/files/jpeg-r001/` is the Sharp/libvips offline probe, not a direct libjpeg-turbo distribution |

The negative search is bounded to the paths above; it is not a claim that no
copy exists anywhere on the host. No Sharp-bundled or transitive library was
accepted as provenance for this task.

## Authorized acquisition result

| Field | Evidence |
| --- | --- |
| Upstream | `libjpeg-turbo/libjpeg-turbo` official 3.2.0 GitHub release |
| Resolved source | `https://github.com/libjpeg-turbo/libjpeg-turbo/releases/download/3.2.0/libjpeg-turbo-3.2.0-vc-x64.exe` |
| Artifact | `libjpeg-turbo-3.2.0-vc-x64.exe`, 2,361,008 bytes |
| Acquisition | Run-owned Windows temp directory `nfile110-native-20260929-131826-abb27a7f`; file creation 2026-09-29T10:19:08.4334389Z |
| Expected and computed SHA-256 | `662761d8ba8dae04aec74023ebaeceb856c2b56b9b59cfd180759d26300dda42` (exact match) |
| Additional authenticity | Windows Authenticode `Valid`, signer `SignPath Foundation`, certificate thumbprint `1C539760AE21976C7ACFF383930DCA4221BC0460`; digest equality is the primary gate |
| Extraction | 7-Zip extraction of the verified installer into that run-owned directory; no installer execution or machine-wide installation |

The extracted release identifies `jpeg62.dll` as product version 3.2.0.
Run-local extracted SHA-256 values: `jpeg62.dll`
`6db16a1e3909aa2ddf25854a2e20c896d2703570d24bc83a52eb25940c0654a5`,
`jpeg.lib` `0afce1ff974cf88c0b74cdd3b55934837cf97fc3f102824d3a4d5cb8566944b1`,
`jpeg-static.lib`
`b9640752d84cfbac3efcce70096c3a586ab6ad95b1163541ba9a11446a3337cc`,
and `jpeglib.h`
`ea0fbba47e9e5da192a487df4df3cf01a338b86a0a85d154ef329dd7b5439043`.
These are extracted-artifact identities, **not** evidence of a linked or
loaded helper library; no helper binary exists.

## Build stop

Read-only inspection found no `stdio.h` in the installed VS 2022 or VS 2026
MSVC toolset and no Windows SDK `Include` directory. The MSVC x64 library
directory is absent or empty. `VsDevCmd.bat` printed `The system cannot find
the file specified` and did not make `cl` available on PATH. The attempted
compile command consequently stopped at `'cl' is not recognized`; no object
or executable was produced. An unbuilt local helper draft was removed rather
than retained as executable evidence. Installing C++/Windows SDK components
would mutate the machine-wide Visual Studio toolchain and exceeds this task.

No dynamic DLL was loaded by a helper, no static library was linked into one,
and no baseline/progressive/error/IPC scenario was executed. All native
verification claims and independent CODE/security review remain NOT_RUN.
After retaining this evidence, the exact run-owned directory
`nfile110-native-20260929-131826-abb27a7f` was recursively removed only
after verifying its resolved path under the Windows temp root and that it was
not a reparse point. An independent existence check found the directory,
installer, and extracted DLL absent. No repository migration, application,
provider, or system installation was changed by the cleanup.

## Source and license considerations

The exact official release and extracted library hashes are recorded above,
but a static/dynamic link target, binary dependency list, successful build
command, and resulting helper hash cannot yet be recorded. The official license describes
the libjpeg API library as covered by the IJG license and requires an IJG
attribution statement when distributing a binary or statically linked
application. Any eventual distribution must retain applicable source notices
and review the complete terms for the specific artifact. See the official
[license](https://github.com/libjpeg-turbo/libjpeg-turbo/blob/main/LICENSE.md)
and [binary documentation](https://libjpeg-turbo.org/Documentation/OfficialBinaries).

## Proposed bounded interface for a later authorized spike

This is a design proposal, not implemented behavior. A separate local helper
would receive one length-framed byte sequence from the offline harness, with
the enclosing process checking the approved 33,554,432-byte input ceiling
before launch/transfer. The same immutable input buffer would feed the LabOS
inspector and digest; the helper would decode only that sequence through the
direct libjpeg API. Standard output would carry one small versioned result
(success, encoded dimensions/components, scanline completion) and never a
raster, URL, provider key, or arbitrary metadata. Framing, maximum output
length, child exit status, timeout/termination, and stderr bounds would be
verified by the harness; no child result could override a structural-inspector
rejection. The exact IPC framing and binary-discovery model remain unapproved
production architecture.

Dynamic linking would require an explicit DLL discovery path and a pinned DLL
identity at launch; static linking would simplify discovery but bundle the
library and change patch/distribution obligations. Neither route can be
selected or verified without an actual pinned artifact.

## Required decision

Authorize a reproducible C/Windows SDK build toolchain for the isolated
Windows x64 feasibility run (for example an approved Visual Studio C++
workload/SDK installation, or a separately approved run-local toolchain).
The existing authorization expressly forbids machine-wide toolchain mutation,
so no installer or workload repair was attempted. The pinned libjpeg-turbo
artifact needs no reconsideration. Native helper implementation, focused
native tests, and independent CODE review are NOT_RUN. Provider-private ACL
and all Case upload activation gates remain separate and unchanged.
