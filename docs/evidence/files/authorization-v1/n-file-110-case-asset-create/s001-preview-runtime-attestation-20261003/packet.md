# Isolated S001 production-boundary Preview attestation — stopped preflight

Status: independent V3 `BLOCKED_DECISION | RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT` before Vercel project creation or deployment.
Authority: Product Owner's isolated Vercel Preview runtime-attestation gate, 2026-10-03.

## Accepted state preserved

The production-facing S001 validator/containment remains independent V3 `PASS | CODE/ARCHITECTURE`. Windows R001 remains `PASS | CODE`. The S001 evidence migration is installed in normal development. Clinical finalization remains `PO HOLD / DEFERRED`; N-FILE-110 runtime remains inactive. This stopped attestation makes no Vercel runtime claim.

## Exact preflight finding

The accepted `modules/labos-files/jpeg-s001/validate.ts` exports `validateReservedClinicalJpegS001(uploadGrantId, signal?, deps?)`. The production dependency set binds `resolveReservedClinicalGrant` and `retrieveReservedUploadThingBytes`; the function executes grant resolution before admission and identity/retrieval. Structural inspection, first SHA-256, Julusian complete decode, output checks, second SHA-256, and validated-result creation are inline within this grant-resolving function. The module does not export a lower internal function accepting a server-owned original Buffer after grant/retrieval. `identity.ts` separately exports the runtime identity verifier, and the accepted R001 module separately exports the structural inspector, but assembling these in a Preview harness would reproduce the validation composition instead of executing the production S001 pipeline.

The existing unit tests inject a fake grant resolver, byte retriever, and other dependencies into the exported full validator. That is a CODE test seam, not a safe isolated Preview entrypoint under this gate: invoking it in a deployed harness would require synthetic/fake grant and retrieval authority. The Product Owner explicitly prohibited modifying the full validator to add synthetic-byte, fake-grant, bypass, or test-switch authority and directed a `BLOCKED_DECISION` stop if no safe internal seam exists. The preflight therefore stopped before harness authoring, Vercel mutation, or runtime invocation.

Production source identities at this preflight (SHA-256):

| Artifact | SHA-256 |
| --- | --- |
| `modules/labos-files/jpeg-s001/validate.ts` | `2088957e61b7a69cc17f056c6a0970f7f4400b5c6e4178b417bd90baa06c3566` |
| `modules/labos-files/jpeg-s001/identity.ts` | `8f44ad94a6362d30b17360f7cef90a75df9b915006acd9e7ec207f381c273145` |
| `modules/labos-files/jpeg-s001/admission.ts` | `342e9df33af5c9d36b16483f5186f3cb8330417fcb7c5e4582486cc2213b1d55` |
| `modules/labos-files/jpeg-s001/manifest.ts` | `59a2abc0307ed184b71cf15fe172693d1a17f561538a0a0e7878bf0e5c3c66aa` |
| `next.config.ts` | `8fe8e9064af32c1e3e1e7a5778e2f2de49082f448ccb305bb11d5a1b75e714af` |
| `package.json` | `92cedd74262576820244b2c0065019fe8acee90a7c4af1ddef2e3ede5cf32e26` |
| `pnpm-lock.yaml` | `bbcd83ad045062cbe7433006e1cd0dac2c8ae7ddc32f50dbed10b286d688acb6` |

## Scenario classification

| Scenario | Status | Evidence |
| --- | --- | --- |
| Safe production-core seam preflight | `BLOCKED` | No existing lower S001 pipeline entrypoint; full entrypoint first resolves grant. |
| VR-S001-01 environment identity | `NOT_RUN` | No deployment. |
| VR-S001-02 artifact presence | `NOT_RUN` | No deployment. |
| VR-S001-03 actual loaded mapping | `NOT_RUN` | No deployment. |
| VR-S001-04 runtime fail-closed injection | `NOT_RUN` | Existing CODE tests remain separate evidence. |
| S001 synthetic validation/same-buffer proof | `NOT_RUN` | No safe production-core invocation. |
| VR-S001-05 ordinary release | `NOT_RUN` | No runtime invocation. |
| VR-S001-06 failure release | `NOT_RUN` | No runtime invocation. |
| VR-S001-07 same-instance contention | `NOT_RUN` | No runtime invocation. |
| Provider/Case flow | `NOT_RUN` | Outside this gate. |
| Persistence/finalization | `NOT_RUN` | PO-deferred. |

## Resources and next decision

No Vercel account/project/deployment/settings were contacted or changed. No run-owned local harness or temporary resource was created; there is nothing to clean. No LabOS database, UploadThing object, provider credential, Case, grant, JPEG, or application runtime was touched.

Independent V3 read-only review of the actual production source, unit-test injection seam, source identities and this packet returned `BLOCKED_DECISION` under `RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT`. It confirmed there is no already-existing safe composed production core below grant/provider retrieval. The reviewer found no basis to turn any `NOT_RUN` scenario into runtime PASS.

The next Product Owner choice is whether to authorize a bounded CODE/ARCHITECTURE extraction of the already accepted inline S001 byte-validation composition into a server-only internal function that accepts the exact original Buffer after the existing production grant/retrieval boundary. The public `validateReservedClinicalJpegS001` authority order and default dependency binding would remain unchanged; the extraction would require its own focused tests and independent review. A separately authorized Preview retry could then invoke that exact internal production core with synthetic bytes. This packet does not authorize that code change.
