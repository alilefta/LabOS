# VS 2022 native toolchain remediation checkpoint

Status: Earlier verification failed; subsequent VS 2022 x64 verification PASS
Date: 2026-09-29
Scope: post-install read-only attestation; no JPEG feasibility execution

The Product Owner authorized modification only of Visual Studio Enterprise
2022 instance `d0ff513c`, with `NativeDesktop`, MSVC x64/x86 tools, and
Windows 10 SDK 19041. The required final Installer proposal was not supplied
before the user reported installation complete. This packet records observed
state, not an assertion about the exact Installer actions or their cause.

| Observation | Before | After reported installation |
| --- | --- | --- |
| VS 2022 instance | `d0ff513c`, `17.14.37628.2` | Same ID/path, `17.14.37710.0`, complete, no reboot required |
| VS 2022 `Microsoft.VisualStudio.Workload.NativeDesktop` | Absent | Present |
| VS 2022 `Microsoft.VisualStudio.Component.VC.Tools.x86.x64` | Absent | Present |
| VS 2022 `Microsoft.VisualStudio.Component.Windows10SDK.19041` | Absent | **Absent** |
| VS 2022 `Microsoft.VisualStudio.Component.Windows11SDK.26100` | Absent | Present |
| VS 2026 instance | `cab0490e`, `18.10.12201.205` | Same ID/path, `18.10.12217.157`, update timestamp 2026-09-29 12:28:41 local, package count 822, no reboot required |

VS 2022 MSVC `vcruntime.h` and x64 `libcmt.lib` are now present in the
14.44.35207 toolset. The Windows Kits include tree contains 10.0.26100.0,
not 10.0.19041.0; the required 19041 UCRT `stdio.h` and UM `Windows.h`
paths are absent. The VS 2026 version/update-date change is observed drift,
not proof of what operation caused it. It prevents certifying that instance
as untouched under this gate.

Because an explicitly required component is absent and the other VS instance
changed since preflight, the mandatory VS 2022 x64 Native Tools, compiler,
linker, hello-world, execution, and PE-architecture checks were **NOT_RUN**.
No run-owned C files or executables were created. No libjpeg-turbo artifact was
reacquired and no native JPEG helper work resumed.

Next decision: inspect the Installer history/change details for the VS 2026
drift and separately authorize any correction to the VS 2022 component set,
including explicit Windows 10 SDK 19041 selection and a reviewed final
change proposal. Do not infer toolchain PASS from the installed `cl.exe` or
the presence of SDK 26100.

## Subsequent authorized verification

After the Product Owner reported installing Windows 10 SDK 19041, read-only
`vswhere` discovery returned the same VS Enterprise 2022 instance
`d0ff513c`, version `17.14.37710.0`, complete with no reboot required.
`vswhere -requires` matched all three required IDs:
`Microsoft.VisualStudio.Workload.NativeDesktop`,
`Microsoft.VisualStudio.Component.VC.Tools.x86.x64`, and
`Microsoft.VisualStudio.Component.Windows10SDK.19041`.

The VS 2022 `VsDevCmd.bat -arch=x64 -host_arch=x64 -winsdk=10.0.19041.0`
initialized without the previous missing-file error. `where cl` and
`where link` resolved exclusively to
`F:\Microsoft Visual Studio 2022\VC\Tools\MSVC\14.44.35207\bin\Hostx64\x64`.
`cl /Bv` reported compiler `19.44.35229` for x64 and linker
`14.44.35229`. `VCToolsInstallDir` pointed to the same VS 2022 toolset;
`WindowsSdkDir` pointed to `C:\Program Files (x86)\Windows Kits\10`.
`INCLUDE` contained the MSVC headers and SDK 19041 UCRT/UM headers; `LIB`
contained MSVC x64 libraries and SDK 19041 UCRT/UM x64 libraries. Direct
existence checks passed for MSVC `vcruntime.h`/`libcmt.lib`, SDK 19041
`stdio.h`/`Windows.h`, and SDK 19041 `ucrt.lib`/`kernel32.lib`.

A run-owned C program including `<stdio.h>` and `<windows.h>` compiled with
VS 2022 `cl /W4 /WX`, linked, ran successfully, and `dumpbin /headers`
reported `8664 machine (x64)` and `PE32+`. Its source/object/executable
were removed from the exact run-owned paths after verification. No machine
installation was performed by this verification. This proves
`WINDOWS_X64_NATIVE_TOOLCHAIN = PASS` for the specified VS 2022 toolchain;
it does not retroactively prove the earlier Installer change set or explain
the earlier observed VS 2026 drift.
