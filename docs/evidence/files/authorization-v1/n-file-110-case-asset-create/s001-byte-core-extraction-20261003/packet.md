# S001 production byte-core extraction — CODE/ARCHITECTURE

Status: independent V3 `PASS | CODE/ARCHITECTURE`.
Authority: Product Owner's bounded S001 production byte-core extraction, 2026-10-03.

## Preserved state and scope

The preceding [isolated Preview attestation preflight](../s001-preview-runtime-attestation-20261003/packet.md) remains independent `BLOCKED_DECISION | RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT`. It created no deployment; all Vercel scenarios remain `NOT_RUN`. This extraction changes no S001/R001 acceptance rule, manifest identity, provider adapter, grant authorization, evidence schema, migration, finalization or Case route.

## Exact extraction

`modules/labos-files/jpeg-s001/core.ts` is a new server-only production module. Its only executable export, `validateClinicalJpegS001Bytes(original, signal?)`, accepts an exact original Buffer and no codec, identity, structural facts, grant or provider selectors. It requires Buffer/nonzero/encoded ceiling, invokes the real `getS001CodecIdentity()` itself and compares the runtime library digest to the manifest, runs unchanged `inspectR001`, computes SHA-256 of the same Buffer, performs sole Julusian GRAY/RGB full decode, cross-checks dimensions/format/reported size/actual output Buffer length, hashes the same original Buffer again and returns the same narrow frozen result. It catches all failures as `S001Unavailable`. Direct byte-core calls never populate retained grant context.

`validateReservedClinicalJpegS001(uploadGrantId, signal?)` retains transaction-fresh grant resolution, process-local one-active/zero-waiter admission, identity-before-provider preflight, exact-key provider retrieval, private successful-result `{ grant, original }` WeakMap retention, generic error mapping and `finally` release. It now passes the exact retrieved Buffer to the production byte core. Identity executes twice logically: once before provider retrieval and once inside the core; the accepted `getS001CodecIdentity()` caches initialization per process, so the second call reuses the same verified identity. The core owns no second admission token. The exported orchestration and byte-core functions have no dependency-injection argument. Focused tests mock imported server modules rather than passing fake grant/provider dependencies to a production entrypoint. No Preview harness or route was added.

## Verification

- [Focused test output](focused-tests.txt): six S001/R001/grant/retrieval/inspector test files, **51/51 PASS**. New core tests cover baseline/progressive/true grayscale, real inspector and Julusian decode with a test-module-mocked codec identity, invalid input, structure and codec rejection, runtime digest mismatch, output mismatches, original-byte postdecode mutation, frozen/narrow result and absence of retained grant context. Outer tests use module mocks to cover grant/admission/identity/retrieval/core order, exact provider key and Buffer, occupied admission, release after failure, generic errors and successful retained context.
- [Affected TypeScript](affected-typescript.txt): PASS excluding unrelated retained experiment sources. [ESLint](eslint.txt): PASS. [Prisma validation](prisma.txt): PASS. [Diff check](diff-check.txt): exit 0. No Prisma schema or migration changed.
- [Next compile-only build](next-compile.txt): exit 0 with disabled database/provider environment values. [Native trace](native-trace.json) contains the exact Linux x64 Julusian addon and adjacent `libturbojpeg.so.0` through package and pnpm-store paths, each present and matching accepted SHA-256. [Source identities](source-identity.json) bind the review to exact production/config/test bytes.

Actual Vercel runtime identity, mapped native library, live provider retrieval, Case flow, clinical evidence and finalization remain `NOT_RUN`. No Vercel project/deployment, provider operation, database contact, evidence row, grant transition or Case attachment occurred.

## Review and successor

The first independent reviewer identified a blocking authority defect in the initial extraction: the exported outer validator still accepted injectable fake grant/provider/core dependencies. The bounded correction removed that argument entirely and moved test control to module mocks. An independent V3 rereview inspected the corrected code, final source hashes, raw build trace and 51/51 focused tests and returned **PASS | CODE/ARCHITECTURE**. It confirmed real grant authority, admission and identity before retrieval, actual identity inside the byte core, one exact Buffer through structure/hash/decode/hash, no direct-core retained context, and no new route or persistence.

The exact run-owned `experiments/s001-core-code-20261003` temporary TypeScript-check directory was resolved inside the workspace, removed after evidence retention and verified absent. The single successor is a separately authorized isolated Vercel Preview runtime-attestation retry using synthetic bytes through this exact production core. The prior stopped packet remains historically accurate.
