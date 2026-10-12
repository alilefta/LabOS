# Synthetic Vercel Preview S001 backend feasibility probe

Run: `vercel-s001-preview-20261001`. Classification: V3 provider/runtime feasibility. Status: **STOPPED — VERIFICATION_ENVIRONMENT_BLOCKER**. The isolated project and one failed build were cleaned up. Vercel recorded the failed deployment as `production` despite the explicit CLI `--target=preview`; no function executed. This is an experiment, not S001 policy approval or R001 equivalence.

## Authority and isolation

The Product Owner authorized one isolated synthetic Preview experiment for `@julusian/jpeg-turbo@3.0.1` and `sharp@0.35.4`. The [standalone harness](../../../../../../experiments/vercel-s001-preview-20261001/) contains no Case route, ID, grant, UploadThing key/credential, database client, clinical byte, evidence writer, or application integration. It contains generated 24×16 synthetic JPEGs only. Its `/api/probe` endpoint belongs solely to the standalone experiment and returns fixed, bounded identity/timing/classification fields with generic decoder failures. It never returns decoder diagnostics, input bytes, or filesystem absolute paths. The package has no LabOS `.env` file. `next.config.mjs` sets the probe directory as `outputFileTracingRoot`; the [local trace summary](local-trace-summary.json) reports 221 traced files and zero outside that directory. `.vercelignore` excludes local preflight material and raw local results.

The independently accepted [Windows x64 R001 CODE boundary](../r001-production-code-20261001/packet.md) remains `PASS | CODE`, unchanged. S001 remains proposed and unapproved. Successful evidence finalization plus atomic `PENDING → UPLOADED` is `PO HOLD / DEFERRED`; Case runtime remains inactive.

## Exact local preflight

On Windows x64 / Node v24.21.0 / Node-API 10, registry metadata confirmed Julusian 3.0.1 requires Node >=22.18 and Sharp 0.35.4 requires Node >=20.9.0. The exact npm tarballs were downloaded into a run-owned preflight directory, inspected, hashed, and removed after retaining these identities:

| Package tarball | SHA-256 | Inspected fact |
| --- | --- | --- |
| `julusian-jpeg-turbo-3.0.1.tgz` | `5dbd64fa34d0caaa651f738ff46fc1797e1b1f23a83d1fc3b6e4a066ea96c1c1` | Published Linux x64 prebuild contains `node-napi-v10.node` (101,200 B) and adjacent `libturbojpeg.so.0` (1,089,384 B). Installed source uses `tjDecompress2(..., TJFLAG_FASTDCT)` and CMake pins libjpeg-turbo 3.1.3. |
| `sharp-0.35.4.tgz` | `6ebef10290372c7309d9e22e3ecb9e32ca6a3aa6e07f3d83aa904df8ae4f6a5a` | Package declares Linux x64 Sharp 0.35.4 and libvips 1.3.3 optional packages. |

The run-owned `package.json` and `package-lock.json` pin both candidates exactly, alongside Next 16.3.3 and React 19.2.8. `npm install --no-audit --no-fund` succeeded. The lockfile contains Linux x64 Sharp and libvips optional package records. The harness uses Julusian `decompressSync` with explicit RGB or grayscale output. Sharp uses `sharp(bytes, { failOn: 'warning', limitInputPixels: 50_000_000 }).raw().toBuffer({ resolveWithObject: true })`, forcing full pixel output. Neither is represented as R001.

Exact standalone source identities before Preview: package manifest SHA-256 `2eb07a9a1815a0131a8b90c38b619d932413807adbe5ab5501c1c13552892acd`; lockfile `9cf0aed713bf6d12ff6f194bb300a6c9b0cb200fe51bab5b45d6150e9fe08068`; Next config `ec642069335e054bbec46f8f36582dbe13624b0219fc43df5b5903a7829dbec3`; probe route `58b536deac35bdd9887c6b5a9d79b76552433afbc97de5cb663c74135775481a`; fixture manifest `3c696a062845c60e8cf55a52f622ef7ce164a165b115ff812756fabfb3d149e1`. The local optimized Next build and TypeScript pass after the final generic missing-fixture response change.

## Synthetic corpus and local facts

The run generated [seven immutable fixture identities](fixture-manifest.json): baseline RGB, progressive RGB, grayscale, missing-EOI truncation, shortened entropy with EOI, mutated entropy, and trailing bytes. Both backends saw the same encoded fixture bytes. Local `next build` and TypeScript checks passed. The [raw local matrix](local-matrix.json) contains two rounds per backend/fixture with SHA-256, dimensions/channels/output size, module-load time, decode time, RSS before/after and process maxRSS. The first module load and subsequent same-instance calls are distinguishable by instance ID and `loadMs`. Local operating system results do **not** establish Vercel loadability or resource behavior.

| Fixture | Windows R001 reference | Julusian local codec | Sharp local codec |
| --- | --- | --- | --- |
| baseline RGB | PASS | decoded 24×16×3 | decoded 24×16×3 |
| progressive RGB | PASS | decoded 24×16×3 | decoded 24×16×3 |
| grayscale | PASS | decoded 24×16×1 | decoded 24×16×3 raw output |
| missing EOI | REJECT by structure | decode failed | decoded |
| shortened entropy, terminal EOI | REJECT by codec | decode failed | decode failed |
| mutated entropy | REJECT by codec | decode failed | decode failed |
| trailing bytes | REJECT by structure | decoded | decoded |

The [raw Windows R001 reference](local-r001-oracle.json) verifies the helper executable against its accepted manifest hash, applies the accepted structural inspector first, then calls the same accepted direct-libjpeg executable through its versioned frame with the required parent-PID containment argument. A first local oracle attempt without that argument returned helper rejections for all valid files; the harness invocation was corrected before retaining the raw oracle packet. The present result is a finite synthetic differential reference, not equivalence proof. The truncated and trailing codec differences do not imply the proposed S001 pipeline would accept them, because the accepted structural inspector would reject them first. The Sharp grayscale RGB output shows that codec output channels must not be conflated with original JPEG component count.

Local Next tracing includes both Linux x64 Julusian files by name and includes no file outside the isolated probe root. It does not include Sharp Linux native files on this Windows build; Linux Preview installation/tracing must determine their deployed presence. No production resource limit is inferred from these small local fixtures.

## Preview target, failed build, and stop

The repository has no `.vercel/project.json` link. Initially, Vercel CLI 62.1.0 was logged out. An automatic approval review rejected the generic Vercel connector deploy because the target was unspecified and could expose the current LabOS project; that attempt uploaded nothing. The CLI's `deploy --temporary --dry --json` attempt reported temporary deployments unavailable and requested device login; the flow was stopped. The Product Owner then authenticated CLI as `alilefta`. Read-only CLI scope inspection identified `ali-leftas-projects` as the sole available team and confirmed the exact run-owned name was unused.

The run created **only** project `labos-s001-synthetic-probe-20261001`, ID `prj_vKP7Zp5IxKDyZXSDCXy1ZGj4dwk4`, in that team. Its framework was explicitly set to Next.js, Node 24.x. The retained [Vercel dry-run manifest](upload-dry-run.json) reported Next.js, 17 entries / 86,904 bytes: only the isolated route, seven fixtures and manifest, package/lock/config/types, and empty run-owned directories. It excluded `node_modules`, local matrices, scripts, and all parent LabOS files. No `.env` file was present in the probe.

The subsequent command was issued **from the isolated probe folder** with exact `--scope ali-leftas-projects --project labos-s001-synthetic-probe-20261001 --target=preview --yes --json`, without `--prod`. It uploaded 83.9 KB and created deployment `dpl_3E1TFf8Unf8FVDup55JihWapYshE`. The CLI console displayed a remote TypeScript dependency failure and a Julusian install-script warning, but the full remote build log was **not exported before project cleanup**. Those build details are executor-observed context, not independently retained raw build evidence. No native load test occurred. No repair or redeployment followed, because the [read-only deployment inspection](failed-deployment-inspect.txt) independently proves `target production`, `status Error`. The `production` target designation is an unexpected environment result even though the build failed. The cause of this CLI/target mismatch is **unresolved**; it must not be silently treated as Preview.

Executor-observed deploy-console excerpt transcribed from the command result; it is **not** a retained raw remote build log and does not support independent acceptance of the precise build cause:

```text
Deploying ali-leftas-projects/labos-s001-synthetic-probe-20261001
Uploading [====================] (83.9KB/83.9KB)
Installing dependencies...
added 66 packages in 8s
npm warn install-scripts   @julusian/jpeg-turbo@3.0.1 (install: pkg-prebuilds-verify ./binding-options.js || cmake-js compile --target jpeg-turbo)
Detected Next.js version: 16.3.3
Running "npm run build"
Compiled successfully
Running TypeScript ...
Please install typescript, @types/react, and @types/node
Error: Command "npm run build" exited with 1
```

The failed project had no functioning endpoint or runtime invocation. The exact run-owned project was then removed through the CLI's named-project confirmation, which stated its deployments would also be deleted. A fresh [sanitized team-list absence attestation](cleanup-summary.json) confirmed the exact run-owned name absent with CLI exit 0; unrelated project names/URLs were discarded from durable evidence. No other Vercel project was changed. This cleanup does not turn the attempted production-target deployment into an authorized Preview observation.

| Required Preview claim | Julusian | Sharp |
| --- | --- | --- |
| Native artifacts included and loadable | `NOT_RUN` | `NOT_RUN` |
| Actual Vercel function OS/arch/Node/N-API/libc | `NOT_RUN` | `NOT_RUN` |
| Cold/warm complete decode and failures | `NOT_RUN` | `NOT_RUN` |
| Preview time/RSS and generic errors | `NOT_RUN` | `NOT_RUN` |
| Backend Preview feasibility verdict | **BLOCKED by target mismatch** | **BLOCKED by target mismatch** |

No external provider object, Case or database state was touched. The local Next server was stopped. The downloaded source tarballs were removed by exact path; `node_modules` remains an ignored local build dependency and was excluded from deployment input. One run-owned Vercel project and failed deployment were created and then removed as detailed above.

## Review and next gate

Independent V3 Reviewer inspected the actual local harness, lockfile, fixture hashes, raw matrix/oracle/trace, sanitized route, dry-run manifest, failed-deployment inspection, and cleanup under `RUNTIME_EVIDENCE`. Initial rereview required clearer build-log provenance and removal of unrelated team metadata; both corrections were authored and independently rereviewed. Final verdict: **PASS | RUNTIME_EVIDENCE** for the truthfully bounded packet. Reviewer replay of `npx tsc --noEmit --incremental false` passed. The Reviewer independently confirmed `target production`, `status Error`, exact run-owned cleanup, and the absence of Preview function execution. **Julusian Preview feasibility: BLOCKED** and **Sharp Preview feasibility: BLOCKED**; local success is not Preview feasibility or S001 suitability. The single next gate is a bounded, read-only Vercel Preview target-routing resolution that can attest a nonproduction target before any new upload. S001 production implementation and clinical finalization do not follow.
