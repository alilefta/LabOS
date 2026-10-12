# Fresh corrected S001 production-core Vercel Preview attestation

Status: **runtime `PASS_WITH_LIMITATIONS`; independent V3 `PASS | RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT`; exact cleanup verified**. Run `s001-core-preview-20261003-157cb99a8d`.

Historical checkpoints remain separate: [original stopped preflight](../s001-preview-runtime-attestation-20261003/packet.md) was `BLOCKED_DECISION` without deployment and all runtime scenarios `NOT_RUN`; the [first deployed retry](../s001-core-preview-retry-20261003/packet.md) was `FAIL / CORRECTION_REQUIRED | RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT`, with exact remote rejection stage unknown; the [codec-identity correction](../s001-codec-identity-correction-20261003/packet.md) is independent `PASS | CODE/ARCHITECTURE`. This packet is a new runtime run using the corrected source.

## Exact source and isolation

[Repository predeployment hashes](repository-source-predeploy.json) cover `package.json`, `pnpm-lock.yaml`, S001 core/identity/manifest, authoritative R001 inspector and `next.config.ts`. [Postdeployment hashes](repository-source-postdeploy.json) match each predeployment byte. The [isolated source/upload manifest](upload-source-manifest.json) hashes the harness route, Next config, package/lockfile, copied production modules, and four bounded synthetic fixtures. Copied production sources matched repository bytes before deployment, and every upload-source file still matched the manifest after deployment. The Vercel CLI [non-deploying upload inventory](vercel-dry-upload-manifest.json) reported exactly 15 files / 99,559 bytes; `.next` and `.vercel` were ignored. The actual deployment used that isolated directory and the remote build compiled Next 16.3.3 successfully. The harness imports the actual `validateClinicalJpegS001Bytes` production core. It does not import the outer grant validator or inject codec, identity, inspector, hash, grant or provider dependencies.

The authenticated account was `alilefta` in team `ali-leftas-projects`. Newly created project `labos-s001-core-20261003-157cb99a8d` (`prj_B2W292QNHmC4Lk4xeZIO4oHHksKr`) had zero prior deployments, no Git link, zero configured environment variables and no custom domain. Vercel Authentication was set to `all` and read back before deployment. Vercel link created a temporary local OIDC file in the placeholder directory; it was removed before upload, and the static placeholder contained only its 64-byte run-owned `index.html`. The first deployment `dpl_GNX2ABvCrZ4nWwtN3dmYjSBtocuj` was Production/READY only to initialize this isolated project. Its generated alias was run-owned and protected; unauthenticated HEAD redirected 302 to Vercel SSO. The second deployment `dpl_DEGWD32tgZdu4tTaAdjKRjZNMRZn` was independently inspected as **Preview/READY** before invocation, with no Production/custom alias. Unauthenticated Preview HEAD also redirected 302 to SSO. The [deployment attestation](deployment-attestation.json) records exact project/deployment IDs and effective `api/probe` Lambda `nodejs24.x`, 30-second timeout and 2,048-MiB function memory. No LabOS project, provider, database, auth, Case or clinical data was supplied.

## Observed production-core execution

The bounded [inventory response](preview-inventory-raw.json) reported `linux`, `x64`, Node `v24.21.0`, N-API `10` and process-instance marker `e12478a46356`. It did not initialize fake codec identity.

[Baseline RGB](preview-baseline-raw.json) invoked the production byte core on the 333-byte synthetic fixture. It returned `JPEG_CLINICAL_V1_S001`, `LABOS_S001_JULUSIAN_V1`, `JULUSIAN_TURBOJPEG`, package `3.0.1`, library `3.1.3`, pinned library digest `6facda09ef3e2308608f2b0214c040791e276305a48a27036362402f95fffcf5`, original SHA-256 `92424c818a78b6d385591382f695b01af83ba588b88aa50dcef8faee922ab8bb`, structural 24×16/3-component/baseline facts and complete 1,152-byte RGB output. This accepted result requires the real `getS001CodecIdentity()` to have loaded Julusian and passed its `/proc/self/maps`, unique mapping, canonical layout, adjacent package identity and pinned pre/post-load native hash checks. The harness did not supply these identity facts.

After core acceptance only, the isolated harness independently gathered **sanitized corroboration**: exactly one addon and one `libturbojpeg.so.0` mapping, reviewed layout/adjacency true, package identity true, addon hash match true and library hash match true. It returned no paths or raw maps. These bounded booleans corroborate the production gate; they are not substituted for it.

[Progressive RGB](preview-progressive-raw.json) accepted 562 encoded bytes with exact SHA-256 `f747c09013b7fb2bd5c50b525f0b824513f47282ac0594ad732bf749a8d0bbd8`, 24×16/3 components and `isProgressive=true`. [True grayscale](preview-grayscale-raw.json) accepted 336 bytes with exact SHA-256 `f1ad8bf61fcde5071b217e85079fe23034fe0fa13c5f99dab2afa7dd3c7dfefd`, 24×16/1 component and complete 384-byte grayscale output. Both returned the same approved implementation identity and sanitized native corroboration. The deterministic [trailing-bytes fixture](preview-trailing_bytes-raw.json) returned only generic `rejected` after reading 336 encoded bytes, with no structure/decoder diagnostics. No already-established bounded structural-pass/Julusian-fail fixture was retained for this run, so codec-specific rejection is `NOT_RUN`.

Baseline, progressive, grayscale, trailing rejection and [warm baseline repeat](preview-baseline-warm-raw.json) all reported the same `instance` and `bootMs`. The first valid core call took 27.93 ms; subsequent valid core calls took 0.30, 0.14 and 0.30 ms respectively and returned identical pinned implementation identity. This is same-instance warm reuse evidence consistent with the accepted cached identity promise, not a latency guarantee. The harness did not separately time identity initialization. RSS and maxRSS in raw responses are small-fixture observations only; the 2,048-MiB function memory setting is not a per-image cap.

The byte core's unchanged [source identity](repository-source-predeploy.json) and observed fixture digests support the same-Buffer sequence: `inspectR001(original)` → SHA-256 of `original` → Julusian decode of `original` → SHA-256 of the same retained `original`. No diagnostic hook, byte copy, re-read or provider operation was introduced into the production core.

## Scenario matrix

| Scenario | Status | Basis |
| --- | --- | --- |
| Vercel runtime environment / protected Preview / 30-second Node function | `PASS` | Independent deployment inspection and live inventory. |
| VR-S001-C01 environment | `PASS` | Linux x64, Node 24.21.0, N-API 10, instance marker. |
| VR-S001-C02 corrected identity / deployed loaded native mapping | `PASS` | Production-core success plus unique mapping, layout/package and hash corroboration after load. |
| VR-S001-C03 baseline RGB | `PASS` | Exact profile, identity, size, hash, dimensions and component facts. |
| VR-S001-C04 progressive RGB | `PASS` | Exact hash, 3 components and progressive fact. |
| VR-S001-C05 true grayscale | `PASS` | Exact hash, 1 component and full grayscale output. |
| VR-S001-C06 structural rejection | `PASS` | Trailing bytes rejected generically. |
| VR-S001-C07 codec-only rejection | `NOT_RUN` | No retained bounded known structural-pass/Julusian-fail fixture. |
| VR-S001-C08 warm identity reuse | `PASS` | Same instance/boot marker and repeated pinned result after first accepted call. |
| Outer admission/provider containment | `NOT_RUN` | Byte core invoked directly; no fake outer orchestration. |
| Case/provider flow | `NOT_RUN` | No grant resolver, LabOS database, Better Auth or UploadThing used. |
| Persistence/finalization | `NOT_RUN` | No evidence, grant status, StoredFile, version or Case asset write. |

The runtime result is `PASS_WITH_LIMITATIONS`: the specific codec-only rejection scenario is `NOT_RUN`, and provider/Case/finalization properties remain outside this gate. Finite synthetic success does not establish exhaustive malformed-input behavior, resource bounds or production deployment.

## Independent review and cleanup

The independent V3 Reviewer inspected the source pre/post hashes, [retained harness route](harness-route.ts), [harness Next config](harness-next.config.mjs), dependency manifest/lockfile, deployment/protection evidence, actual Preview responses, production identity result and post-load mapping corroboration, and [exact cleanup attestation](cleanup-attestation.md). Verdict: **`PASS | RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT`**, with overall runtime classification **`PASS_WITH_LIMITATIONS`**. The Reviewer found no material defect or scope expansion. Codec-only rejection, outer admission/provider, Case flow and persistence/finalization remain `NOT_RUN`.

Only the exact run-owned project `prj_B2W292QNHmC4Lk4xeZIO4oHHksKr` was removed. Subsequent CLI inspection returned `project_not_found`; both exact run-owned deployment IDs were absent. The resolved local run root was checked against the workspace before removal and verified absent afterward. The sanitized packet and harness source copies remain here.
