# Isolated production S001 byte-core Vercel Preview retry

Status: **runtime FAIL / independent V3 `CORRECTION_REQUIRED | RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT` / cleanup complete**. Run `s001-core-preview-20261003-78ef5a0514`.

The prior [stopped Preview preflight](../s001-preview-runtime-attestation-20261003/packet.md) remains independent `BLOCKED_DECISION` with all scenarios `NOT_RUN`. This run separately deployed an isolated synthetic harness against the accepted [server-only production byte core](../s001-byte-core-extraction-20261003/packet.md). Windows R001, S001 profile/backend policy, and accepted CODE checkpoints are unchanged. Clinical finalization remains `PO HOLD / DEFERRED`; N-FILE-110 runtime remains inactive.

## Source and isolation

The [source attestation](source-attestation.json) records predeployment SHA-256 for byte-for-byte copies of production `core.ts`, `identity.ts`, `manifest.ts`, and unchanged `inspect.ts`, plus the isolated [harness route](harness-route.ts), [Next config](harness-next.config.mjs), and isolated harness package/lockfile. Copied production-source hashes equal the repository sources; the run rechecked those identities after deployment. The production repository `package.json` and `pnpm-lock.yaml` hashes were omitted from the predeployment attestation; this is an evidence limitation identified by independent review. [Fixture hashes/sizes](fixture-manifest.json) identify five bounded synthetic non-clinical JPEGs. The harness imports and invokes only `validateClinicalJpegS001Bytes(original)` for validation. It does not import the grant-resolving validator or inject identity, codec, inspector, hash, grant, or provider dependencies.

The authenticated account was `alilefta`, team `ali-leftas-projects`, CLI 62.1.0. A new collision-resistant project `labos-s001-core-20261003-78ef5a0514` (`prj_s3CaBxyNhMANuY3lJuTViZWw8jtF`) had zero prior deployments, zero environment variables, no Git link and no custom domains/aliases. Vercel Authentication was set to and separately read back as `all` before upload. The inert placeholder dry run had one 108-byte `index.html` and no API/code/secrets. Its first deployment `dpl_EX5MMjDZMARZte5HRL9bDzk6hnkZ` was Production/READY, with only the authorized generated run-owned `.vercel.app` alias. Unauthenticated access redirected 302 to `vercel.com/sso-api`. The run-owned project framework was then set to Next.js for the synthetic second deployment.

The [sanitized final upload manifest](upload-manifest.json) had 16 entries/98,789 bytes: harness/config/package/lockfile, copied production source and five synthetic fixtures. It contained no LabOS application files, environment files, provider/database integration or Case route. The second deployment `dpl_tKLcm2bfuQVtAN2HDXkoJdjhGMhM` was independently inspected as **Preview / READY**, exact project ID, no Production/custom alias. Postdeployment project readback still had `ssoProtection=all`, zero environment variables, no Git link/custom aliases. Unauthenticated Preview access also redirected 302 to Vercel SSO. The [deployment attestation](deployment-attestation.json) records these facts and the effective `api/probe` runtime `nodejs24.x`, memory 2,048 MiB, timeout **30 seconds**. The raw [Preview build output](preview-build-raw.txt) and retained sanitized function inventory are review inputs.

## Runtime observations and failure

The first authenticated protected [inventory response](preview-inventory-raw.json) reported Linux x64, Node v24.21.0, N-API 10, instance marker `27d4bbb4cb0e`. Its two artifact checks returned `present:false`. This is **not proof that the files were absent**: the harness inventory used the same `createRequire(import.meta.url).resolve('@julusian/jpeg-turbo')` shape as production, and the compilation issue below can make that check fail before filesystem inspection. Local Next tracing had included the exact native hashes, but tracing is not deployed presence or actual loading proof.

The first protected [baseline response](preview-baseline-raw.json), on the same observed instance, read the 333-byte synthetic baseline fixture and returned only generic `rejected` in 2.77 ms. No validated result or runtime library digest was produced. The fixture SHA-256 is `92424c818a78b6d385591382f695b01af83ba588b88aa50dcef8faee922ab8bb`, and it passed the accepted local CODE corpus. No other fixture was invoked after this production-core rejection.

The [local compiled-bundle evidence](bundle-defect-evidence.json) identifies a concrete production identity incompatibility with the Next 16.3.3 Turbopack server build. The accepted `identity.ts` sets `packageEntry: () => requirePackage.resolve('@julusian/jpeg-turbo')` and later passes `dirname(deps.packageEntry())`. In the exact local harness build, Turbopack compiled the former to `packageEntry:()=>1930` while retaining the `dirname(packageEntry())` call. A numeric module ID is not a filesystem path, so that path-resolution step fails closed. The compiled chunk SHA-256 is retained. The Preview build used Next 16.3.3 and its generic rejection is consistent with this defect, but the run did not extract or inspect remote compiled server bytes, so the exact remote rejection stage is an inference rather than direct function-internal telemetry. Fixing this requires a production identity/build-boundary correction; this runtime gate expressly forbids it. No harness repair could establish production identity without altering the production boundary, so execution stopped.

## Scenario classification

| Scenario | Status | Basis |
| --- | --- | --- |
| Vercel runtime environment / Preview target / 30-second function | `PASS` | Independent deployment inspection and live function response. |
| VR-S001-R01 deployed native artifacts | `BLOCKED` | Inventory returned `present:false`, but its package resolver is subject to the compiled defect; local trace alone is insufficient. |
| VR-S001-R02 actual loaded codec identity | `FAIL` | Production core rejected; no mapped identity or runtime digest established. Exact remote rejection stage remains unobserved. |
| VR-S001-R03 baseline RGB | `FAIL` | Valid synthetic fixture read, production core returned generic rejection. |
| VR-S001-R04 progressive RGB | `NOT_RUN` | Stopped after baseline failure. |
| VR-S001-R05 true grayscale | `NOT_RUN` | Stopped after baseline failure. |
| VR-S001-R06 structural rejection | `NOT_RUN` | Stopped after identity-path defect. |
| VR-S001-R07 codec rejection | `NOT_RUN` | Stopped after identity-path defect. |
| Same-Buffer successful integrity | `NOT_RUN` | No successful production-core result. CODE/source evidence remains separate. |
| Cold/warm cache identity and resource bounds | `NOT_RUN` | One baseline attempt; inventory did not initialize identity. 2.77 ms is an observation only. |
| Process-local outer admission/provider containment | `NOT_RUN` | Intentionally excluded by direct-core gate. |
| Case/provider flow | `NOT_RUN` | No grant resolver, LabOS database, UploadThing or provider object contacted. |
| Persistence/finalization | `NOT_RUN` | No evidence, grant transition, StoredFile, version or Case asset. |

Overall runtime result: **FAIL** for the production S001 identity/byte-core path on this Preview build. This does not downgrade the accepted CODE review or the approved S001 profile. It establishes no provider/Case/finalization runtime behavior. The single successor requiring separate Product Owner authority is a bounded production codec-identity/Turbopack path-resolution correction with CODE/ARCHITECTURE review, followed by a fresh isolated Preview runtime retry; no production identity pin or security check may be weakened.

## Review and cleanup

Independent V3 review returned `CORRECTION_REQUIRED | RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT`. It confirmed the production identity path-resolution incompatibility from the exact compiled bundle and identified the missing production package/lockfile hash correlation. The Preview's precise internal rejection stage remains an inference because the protected response intentionally exposes only generic `rejected`. The reviewed defect requires a separately authorized production CODE correction; this runtime gate did not edit production source.

Cleanup: immediately before deletion, `vercel project inspect` identified exactly `prj_s3CaBxyNhMANuY3lJuTViZWw8jtF` / `labos-s001-core-20261003-78ef5a0514`. `vercel project rm` confirmed removal. Subsequent inspection returned `project_not_found`; inspection of Preview deployment `dpl_tKLcm2bfuQVtAN2HDXkoJdjhGMhM` and inert placeholder `dpl_EX5MMjDZMARZte5HRL9bDzk6hnkZ` each returned not found. The exact local run root was resolved and checked under the workspace before recursive removal; both run root and temporary pointer were verified absent. See [cleanup attestation](cleanup-attestation.md). Independent reviewer cleanup addendum: `PASS`; it did not alter the `CORRECTION_REQUIRED` runtime verdict. No unrelated resource was touched.
