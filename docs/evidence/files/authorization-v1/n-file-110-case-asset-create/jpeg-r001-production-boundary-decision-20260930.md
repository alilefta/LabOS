# N-FILE-110 R001 production boundary decision packet

Status: BLOCKED_DECISION (2026-09-30). No production validator was implemented or activated.

## Scope and observed facts

The authorized task was exact-provider-key retrieval and production `JPEG_CLINICAL_V1_R001` validation, stopping before Case attachment. The accepted [R001 contract](../../../../plans/authorization-v1/case-file-jpeg-r001-validator.md) explicitly requires a production architecture/deployment decision before implementation. Its accepted numerical and JPEG semantics are closed and are not reopened here.

The [offline native feasibility packet](jpeg-r001-native-helper-feasibility-20260929.md) proves that a standalone Windows x64 executable built against the official libjpeg-turbo 3.2.0 VC x64 static library can perform direct full-scanline libjpeg decoding with fatal warnings. Its `LJ01` binary-stdin frame and short stdout result were exercised offline. The compiled binary was deleted with the run-owned test resources. The retained `native-helper-feasibility.c` calls itself an offline probe. No production executable, build delivery, redistribution notice, supported deployment OS/architecture, deterministic executable path, Next bundling arrangement, or resource policy is accepted. `next.config.ts` has no native-helper packaging rule. Local Windows/Node success does not establish the production target.

The installed UploadThing 7.7.4 `UTApi.getFileUrls(key, { keyType: 'fileKey' })` asks `/v6/getFileUrl` for a URL and returns `{ key, url }`; its types mark this method deprecated. `UTApi.listFiles` returns file metadata, not bytes. The installed server API exposes no direct exact-key byte-stream/download method. A possible V1 public-read retrieval design is to resolve the persisted reserved key server-side, require the returned key to match, then fetch the returned URL with bounded streaming, strict destination/redirect handling, and no URL logging. This is a proposal, not an accepted or provider-runtime-verified exact-object protocol. URL lookup and a later fetch do not by themselves prove object immutability or protect against replacement between validation and attachment.

The Case callback currently reserves the UploadThing key on a target-bound `PENDING` grant and retains no authoritative URL or successful evidence. The accepted clinical-evidence design places successful evidence insertion and transition to `UPLOADED` in one finalization transaction after byte validation. This slice can return a narrow internal validation result, but must not fabricate evidence, set `UPLOADED`, or attach a Case asset. Failed validation leaves no successful evidence. Rejected-object deletion remains separate.

## Decisions required before production implementation

1. Approve the production native boundary and supported deployment target: isolated helper executable versus another direct-libjpeg integration, OS/architecture, build/CI method, exact libjpeg-turbo artifact/version/hash or reviewed successor, static/dynamic linking, license/notice distribution, immutable packaged binary location, Next Node-runtime inclusion/externalization, and update procedure. The offline Windows x64 executable is a feasible candidate, not a production approval.
2. Approve or authorize a bounded design of the server-side UploadThing public-object retrieval protocol based on the installed key-to-URL API, including trusted URL host/path or response validation, redirect policy, byte-transfer bound, one-copy buffering/spooling, and exact-key/object identity and revalidation through later evidence finalization/attachment. No client or callback URL may establish authority.
3. Establish production process containment for the chosen target, supported by target-environment benchmarks: wall/CPU time, memory/RSS, child count/concurrency/queue, IPC/output bounds, cancellation and kill-tree behavior, overload response, and crash/temporary-resource cleanup. R001 deliberately has no deterministic work score. Unit-test timeout values are not production policy.

These are deployment/security architecture choices, not changes to the closed R001 JPEG acceptance profile. They may be resolved in one bounded production integration design/review gate. Until then, implementing a callable production validator would guess the execution and failure contract.

## Gate result

CODE implementation, test corpus, TypeScript/lint/Prisma verification, independent `CODE` review, and real UploadThing retrieval are `NOT_RUN`. No provider object or database row was created or changed. Existing Case route registration and N-FILE-110 runtime remain inactive. The single next gate is Product Owner approval of the production native/retrieval/containment architecture (or authorization of a bounded design to settle it), followed by a separately scoped CODE implementation/review.
