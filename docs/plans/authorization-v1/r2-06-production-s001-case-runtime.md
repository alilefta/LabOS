# R2-06 — production S001 Case composition runtime proof

Status: **CLOSED | PASS CHECKPOINT | ELIGIBLE_FOR_ACTIVATION** after Product Owner acceptance on 2026-10-08 and independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`. R2-05 is CLOSED | PASS CHECKPOINT with activation NOT_ELIGIBLE. This successor is the Product Owner-requested narrow proof before another activation decision; it does not activate N-FILE-110.

## Objective and authority

Prove the complete synthetic Case/ObjectStorage/R2/database composition in a single approved Linux runtime using the production S001 codec identity implementation, with no `getS001CodecIdentity` mock or substitute. Reuse the accepted R2-03 issuance/completion, R2-04 attachment/open and R2-05 real-provider harness. Do not revise R2-01 through R2-05 architecture, installed schema, S001 semantics or authorization policy to make the proof pass. A material contract conflict stops at its exact boundary.

Only synthetic non-clinical JPEG bytes, collision-resistant LabOS-allocated `objects/{uuidv4}` keys, the previously approved private non-production R2 target, and an isolated disposable PostgreSQL database are in scope. No normal-development Case mutation, clinical data, production resource, public R2 access, route/UI activation, cleanup lifecycle implementation, non-Case migration, production deployment, staging, commit or push. External Linux runtime provisioning, deployment or provider reconfiguration is not implied by this plan; the effective target and authority must be attested before fixture mutation.

## Read-only readiness gate

1. Attest the exact execution process as Linux x64, Node 24 and N-API 10, with access to `/proc/self/maps`; verify an approved isolated runtime and exact source/dependency bytes. A Windows Node process, Windows executable invoked from WSL, identity mock, or a separately executed byte-core probe cannot satisfy this gate.
2. Attest an isolated disposable PostgreSQL target, expected migration history/schema and exclusive run-owned fixture scope. Apply existing migrations only under the target-specific verification authority; leave the populated normal-development database untouched.
3. Reattest the private non-production R2 target/configuration and signed capability/CORS assumptions without printing credentials or bearer material. No bucket/public/configuration mutation is planned.
4. Preflight the harness with a non-provider smoke path, including reliable timeout beyond write expiry plus 60-second skew and cleanup based on SQL epoch of `latestWriteCapabilityExpiresAt`, not a timezone-shifted Prisma Date readback. One bounded harness repair follows the workflow; repeated failure at the same boundary stops.

At plan preparation, the host had WSL Ubuntu 18.04 but no Linux Node executable or local Node 24 Docker image. The historical protected Vercel Preview project supplied no Case/R2/database target. The then-unattested target was a `VERIFICATION_ENVIRONMENT_BLOCKER`, not an S001 application failure. The Product Owner later authorized run-owned Docker provisioning; independent read-only target attestation passed before the first migration or fixture. The completed execution is recorded in the R2-06 runtime packet.

## Required positive chain and evidence

Run the accepted Case composition from one Linux Node 24 test process:

`authorized saved-DRAFT intent → permanent key allocation → PENDING-only real create-only R2 write capability → durable latest-write-expiry fence committed before disclosure → real exact-key R2 PUT → untrusted completion → real private HEAD/bounded GET → actual production S001 identity and exact-byte validation → immutable evidence/PENDING → UPLOADED → fresh second real R2 retrieval with exact length/SHA equality → atomic OBJECT_STORAGE/PRIVATE/MANAGED_PRIVATE attachment and UPLOADED → CONSUMED → fresh authorized private-open issuance → exact signed-read byte retrieval`.

The harness must import the production S001 identity module unchanged and contain **no** `vi.mock`, stub, injected codec, dependency override or alternate validator for `getS001CodecIdentity`. Completion must call the production outer validator in that same process. Record a non-bearer process-instance marker, Linux/Node/N-API versions, returned S001 implementation identity and pinned digest, and sanitized post-load corroboration of exactly one reviewed addon and `libturbojpeg.so.0` mapping with expected package/layout/hash checks. Do not record mapping paths, raw maps, object URLs or credentials. Read the same process identity after completion and bind immutable evidence codec fields, exact original byte length and application SHA-256 to the run-owned object. Source inspection plus same-process marker and identity/evidence observations must establish that completion loaded the approved production codec rather than a test seam.

Retain R2-05's real conditional PUT and exact-object assertions; its actual Edge browser PUT/CORS proof is inherited and is not claimed rerun unless an actual browser is used here. Treat every attempted PUT as potentially successful until private inspection resolves it. Confirm capability replay/new-capability cannot overwrite existing bytes when exercised; if not rerun, cite R2-05 precisely. Never treat ETag, client completion, HEAD alone or a browser-reported hash as clinical acceptance.

## Activation/security residual classification

| R2-05 NOT_RUN item | Accepted-contract classification | R2-06 disposition |
| --- | --- | --- |
| Complete flow with actual Linux production S001 identity | Mandatory activation blocker | Required positive chain above; failure or unavailable target keeps NOT_ELIGIBLE. |
| Normal-development Case mutation | Accepted authority limitation; disposable database is the approved verification path | Preserve NOT_RUN; do not touch populated development data. |
| Activated Case HTTP/UI flow | Separate Product Owner activation decision | Preserve NOT_RUN; do not enable routes/UI. |
| Browser consumption of private signed GET | Not an explicit security precondition in the accepted private-open contract; issuance and exact retrieval are required | Preserve bounded NOT_RUN unless an already approved browser runtime can prove it without scope expansion; do not infer it from Node fetch. Product Owner retains activation judgment. |
| Full audit/telemetry field sanitization | Required: bearer URL/key/signature must not enter persisted audit or telemetry | Add minimum composition assertion of the exact issued/denied audit rows and captured telemetry allowlist, with no bearer, provider infrastructure field or clinical byte content. Do not log bearer material to produce proof. |
| Exact sanitized denial-error shape | Required: missing/foreign/mismatched private opens must return a generic unavailable/not-found shape without capability disclosure or existence leak | Add minimum route/service-boundary proof for unauthorized, cross-tenant and current-version/evidence mismatch using synthetic fixtures; assert no signed capability returned and a generic sanitized no-store response. The wider R2-04 denial matrix remains inherited unless a new failure appears. |

No other R2-05 NOT_RUN item becomes a PASS by inheritance. The production S001 proof plus the minimum audit/denial checks are required before proposing activation eligibility; browser signed-GET and activated UI remain bounded limitations for Product Owner review.

## Cleanup, review and verdict

Every run-owned key must remain in the permanent allocation ledger until the isolated database is destroyed. After the latest authoritative write capability expiration plus the approved 60-second skew fence, delete only exact run-owned R2 keys and independently classify absence. If any PUT outcome is ambiguous, resolve exact presence first and still observe the fence. Verify no run-owned browser profile, local bearer file, database fixture directory or listener remains. Do not erase or modify unrelated objects/data. If cleanup cannot be established, report exact residual non-bearer key identifiers and stop.

Require an independent V3 `RUNTIME_EVIDENCE + CHECKPOINT` review of target attestation, no-mock/same-process production identity, positive chain, security residuals and exact cleanup. Return `ELIGIBLE_FOR_ACTIVATION` only if every mandatory claim passes or has an explicit Product Owner-accepted disposition; otherwise return `NOT_ELIGIBLE` with exact failure boundary. R2-06 checkpoint acceptance remains separate from N-FILE-110 route/UI activation and cleanup lifecycle authorization.

## Independent plan review and subsequent execution

An independent read-only V3 reviewer returned **PASS | CHECKPOINT** for this plan. The reviewer inspected the accepted R2-05 packet, current Files/security contracts and the actual completion-to-S001 and private-open/audit paths. It confirmed the same-process/no-mock proof, the `VERIFICATION_ENVIRONMENT_BLOCKER` classification, the audit/denial minimum proof, and bounded browser signed-GET/UI limitations. This is a plan review, **not** the required R2-06 runtime review or runtime PASS.

The Product Owner subsequently authorized the disposable Docker target. Independent pre-mutation target attestation passed, and the synthetic production-S001 Case/R2/database composition passed 1/1 with exact run-owned cleanup. See the [R2-06 runtime packet](../../evidence/files/authorization-v1/r2-06-production-s001-case-runtime/packet.md). The initial independent runtime/checkpoint review returned `CORRECTION_REQUIRED` solely for stale current-state text; the focused checkpoint rereview and consolidated independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT` are complete; At that review point, Product Owner acceptance remained pending. The proposed disposition was `ELIGIBLE_FOR_ACTIVATION` with bounded `NOT_RUN` items; N-FILE-110 remained inactive. The later acceptance is recorded below.

## Product Owner closure

The Product Owner accepted the completed synthetic R2-06 proof as `CLOSED | PASS CHECKPOINT` and approved `ELIGIBLE_FOR_ACTIVATION` for the reviewed technical scope. Browser private signed-GET consumption, activated HTTP/UI flow and normal-development Case mutation remain `NOT_RUN`; the optional whole-snapshot TypeScript check is `INCONCLUSIVE` due to Node heap exhaustion; actual browser PUT/CORS is inherited from R2-05, not rerun here. R2-06 acceptance does not activate N-FILE-110 or authorize production deployment. The [activation-readiness successor](n-file-110-activation-readiness.md) requires separate Product Owner review and authority.