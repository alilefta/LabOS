# S001 codec identity / Turbopack filesystem-resolution correction

Status: independent V3 **`PASS | CODE/ARCHITECTURE`**. Authority: Product Owner's bounded S001 codec-identity correction, 2026-10-03. The [failed protected Preview retry](../s001-core-preview-retry-20261003/packet.md) remains `FAIL / CORRECTION_REQUIRED | RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT`; its exact remote rejection stage and native mapping were not observed.

## Corrected boundary

The previous `requirePackage.resolve('@julusian/jpeg-turbo')` result was used as a filesystem pathname. The exact Next 16.3.3 Turbopack server bundle had compiled it to numeric module ID `1930` while retaining `dirname(packageEntry())`. The corrected [production identity](../../../../../../modules/labos-files/jpeg-s001/identity.ts) loads the approved Julusian module through the normal server module graph, then reads `/proc/self/maps` and requires exactly one mapped `node-napi-v10.node` and one mapped `libturbojpeg.so.0`. It rejects missing, ambiguous, deleted or nonabsolute mappings. It canonicalizes the mapped paths, requires the reviewed `prebuilds/jpeg-turbo-linux-x64` layout and exact addon/library adjacency, reads adjacent package metadata (`@julusian/jpeg-turbo`, `3.0.1`), and hashes the actual mapped files against unchanged manifest pins. Native load is not itself trust; no identity is returned before these checks pass. Failure remains generic `S001Unavailable` and the initialization promise remains cached, including rejection.

The [pre/post source identities](source-identity.json) attest the repository `package.json`, `pnpm-lock.yaml`, `identity.ts`, `manifest.ts`, `core.ts`, `next.config.ts`, and affected tests. Package, lockfile, manifest, core and Next config bytes are unchanged from the accepted prior packet. Only identity resolution and focused tests changed. Neither S001/R001 semantics nor native version/hash pins changed.

## Build and compiled evidence

The isolated [Next 16.3.3 Turbopack build](isolated-next-build-final.txt) passed. [Emitted bundle inspection](compiled-bundle-inspection.json) records the compiled chunk SHA and excerpt: it calls the package module load, then `readMaps()`, `realpath()` of mapped paths, and `dirname()` of the resolved mapped addon. `packageEntry` is absent; there is no numeric module ID passed into filesystem operations. The root application [build](root-next-build-final.txt) compiled successfully and stopped during broad TypeScript on known retained experiment imports; no touched identity-test type errors remain.

The root `/api/uploadthing` [native trace](native-trace.json) includes both reviewed Linux x64 artifacts through package and pnpm paths, with exact pinned SHA-256. This is local build inclusion evidence, not Vercel loaded-mapping evidence. The [bounded local emitted-server probe](compiled-local-probe.md) invoked the compiled identity verifier with test-only simulated Linux mapping facts and real installed package/native bytes; it returned the pinned library digest. The unmodified production byte core rejected on the Windows host as required by its Linux-only platform gate. This local probe does not establish Vercel runtime success.

## Focused verification

- [Final focused suite](focused-tests-final.txt): 69/69 PASS across eight S001/R001/provider tests. Identity cases cover expected platform, load failure, missing/ambiguous/deleted mapping, addon/library hashes, invalid adjacency/layout/package, and both successful and rejected production initialization caching. Byte-core and outer authorization/admission/provider regressions passed.
- Affected TypeScript project (`tsc --project experiments/s001-identity-code-20261003/tsconfig.affected.json --noEmit`): exit 0. Affected ESLint: exit 0. [Prisma validation](prisma-validate.txt): exit 0. `git diff --check`: exit 0. No schema or migration changed.
- Actual Vercel runtime artifact mapping, real provider retrieval, Case flow, clinical evidence, grant transition, StoredFile/version/asset creation, and finalization: **NOT_RUN**. No Vercel or UploadThing operation occurred in this CODE gate.

Independent V3 `CODE/ARCHITECTURE` review inspected the corrected code, final 69-test suite, source hashes, compiled bundle, native trace, bounded local probe and no-expanded-authority boundary and returned **PASS**. The reviewer noted that the prior Preview failure remains historical evidence and no new Vercel runtime claim follows from this CODE acceptance.

The exact run-owned `experiments/s001-identity-code-20261003` harness was resolved to its expected absolute workspace path before recursive removal; the root was verified absent. The local Next listener on port 38317 was stopped and verified absent. No unrelated experiment resource was removed.

**Single successor:** separately authorized fresh isolated Vercel Preview runtime retry against the corrected production S001 byte core. Clinical finalization remains `PO HOLD / DEFERRED`; N-FILE-110 runtime remains inactive.
