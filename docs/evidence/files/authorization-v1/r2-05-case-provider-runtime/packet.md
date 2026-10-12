# R2-05 Case provider runtime and activation decision

Status: **CLOSED | PASS CHECKPOINT** after Product Owner acceptance on 2026-10-07. Activation disposition: **NOT_ELIGIBLE**. Checkpoint acceptance and activation eligibility are separate decisions; N-FILE-110 remains inactive.

## Authority and targets

The Product Owner accepted R2-04 and authorized R2-05 synthetic non-clinical Case runtime on the previously approved private non-production R2 target, with an actual browser. The read-only target attestation rechecked HeadBucket, credential shape, signed localhost:3000 preflight (204 with conditional header), and 53 installed migrations. GetBucketCors remains denied (403); R2 privacy/non-production posture is Product Owner attested. No bucket CORS mutation was needed. No production or clinical data was used.

The normal development PostgreSQL target contains six organizations, two Cases and two historical grants. The existing verification authority does not classify that populated database as disposable. The target attestor therefore marked normal-development fixture mutation `AUTHORITY_BLOCKER`; no normal-development database mutation was performed. A fresh isolated PostgreSQL 18.4 cluster on 127.0.0.1:55494 with `Asia/Baghdad` session timezone received all 53 existing migrations. All run-owned Case/database records were created only there.

## New real-provider Case composition evidence

`tests/integration/r2-05-case-provider-runtime.test.ts` passed **1/1** in 181.134 seconds on 2026-10-07. It used the approved private R2 adapter, actual headless Microsoft Edge, a localhost:3000 page, and the synthetic repository baseline JPEG. The page made cross-origin browser `fetch` PUT calls to short-lived exact-key signed capabilities. The assertions established:

| Boundary | Result |
| --- | --- |
| Saved DRAFT authorization, `objects/{uuidv4}` permanent allocation, PENDING grant | PASS on isolated database |
| Two real create-only write capabilities, durable `timestamptz` fence at or beyond both authoritative expirations before browser disclosure | PASS; SQL epoch comparison |
| Actual browser CORS/preflight and conditional first PUT | PASS; first status 200/201 |
| Same signed capability replay and separately issued same-key capability | PASS; both 412, no overwrite |
| Private exact inspection and bounded retrieval | PASS; authoritative size and application SHA-256 equal synthetic source bytes |
| Untrusted completion, S001 byte validation, immutable exact provider/key/suffix/hash evidence and PENDING to UPLOADED | PASS with pinned codec identity test seam; see limitation below |
| No additional write capability after PENDING | PASS |
| Fresh second R2 retrieval, exact evidence comparison, atomic first attachment and UPLOADED to CONSUMED | PASS; OBJECT_STORAGE/PRIVATE/MANAGED_PRIVATE |
| Normal Case asset DTO | PASS; no URL/key/provider/signature field |
| Fresh private open, short-lived signed GET and exact byte download | PASS |
| Unauthorized and cross-tenant private-open denial | PASS; no capability returned |
| Issuance audit and authorization telemetry | Issued audit row and timestamps observed; full field allowlisting and telemetry sanitization NOT_RUN in this composition |
| Signed read expiry, write expiry plus 60-second skew, exact DELETE and authoritative absence | PASS |

Repository-wide `tsc --noEmit` produced only the five pre-existing historical evidence-harness missing-module diagnostics and no R2-05 harness diagnostic.

The actual browser request is newly demonstrated through the Case composition. The R2-01 adapter conformance packet separately remains the authority for its wider provider matrix (signature-bound `If-None-Match: *`, header omission/tamper, CORS details, cancellation/error normalization, consistency, and independent provider checks); those R2-01 scenarios were **not rerun** in R2-05. R2-05 asserted same-key replay/new capability both 412 and exact retrieved bytes. The positive path persisted logical `OBJECT_STORAGE` identity and the normal DTO assertion excluded URL/key/provider/signature text. An exhaustive provider-error normalization or telemetry-field inspection was NOT_RUN in this composition; R2-01 adapter and R2-04 audit tests provide inherited evidence only.

## Limitations and failure history

The first browser attempt failed because the computer-use browser kernel exited twice. A manual Edge trigger arrived after the harness report timeout. That test then hit its 360-second timeout while the cleanup harness was incorrectly reading the allocation `timestamptz` through a Prisma Date shifted under `Asia/Baghdad`; it did not establish a pass. The recovery script used SQL epoch for the absolute expiration, waited the actual fence plus skew, deleted that exact synthetic key and classified it absent. The harness was corrected to use SQL epoch and a 700-second timeout. The succeeding second run launched installed headless Edge automatically at browser handoff. No accepted application/schema/provider contract was changed. Historical failed evidence is retained here.

The Windows runtime cannot satisfy the production S001 codec identity requirement (Linux x64, Node 24, N-API 10 and native mapping evidence). This harness mocks only `getS001CodecIdentity` to the pinned Julusian codec/manifest; it executes the real S001 byte validation core and real completion/finalization. Earlier protected Linux Preview evidence established production S001 byte-core identity in isolation, but did **not** run this complete Case/R2/DB composition. A full Case flow with production S001 identity on an approved Linux runtime is **NOT_RUN**. Normal-development database Case composition is **NOT_RUN** under the standing fixture authority. Actual activated HTTP route/UI flow is **NOT_RUN** because N-FILE-110 remains closed by design. Browser access to the private signed GET was exercised with Node fetch after browser PUT; browser signed GET is **NOT_RUN**. The two private-open calls were observed to reject without returning a capability; exact sanitized response shape and the wider denial matrix were **NOT_RUN** here and retain inherited R2-04 evidence.

These limitations support **NOT_ELIGIBLE** for activation at R2-05; the proven flow is a substantial isolated runtime composition, not the complete production-profile Case E2E claim requested for eligibility. No route/UI activation occurred.

## Cleanup and preservation

The successful harness waited the latest write-capability expiration plus 60 seconds, deleted the exact second run-owned key, and classified it absent. An independent recovery pass rechecked both run-owned keys and returned exact absence: `objects/8ea62308-8859-40bd-9ea0-24f2827eab45` and `objects/284bd023-bd94-4ca1-b614-5ac48c24dffc`. These are non-bearer object identifiers. No presigned URL, signature, access-key identifier or credential is recorded in this packet. Independent review found that the failed manual Edge attempt left `experiments/r205-edge-profile`, which could have retained browser history and bearer URLs. The exact workspace path and non-reparse type were checked, the profile was removed, and absence was verified. A temporary-profile inventory found no `labos-r205-edge-*` directory from the successful run. Independent read-only database corroboration found two run grants (one PENDING from the failed browser attempt and one CONSUMED), two allocations, one immutable evidence, one OBJECT_STORAGE/PRIVATE StoredFile, one MANAGED_PRIVATE asset, and one ALLOWED/ISSUED audit under `Asia/Baghdad`. The exact disposable PostgreSQL cluster was stopped with `pg_ctl -m fast`, its verified workspace/non-reparse run directory was removed, and both directory and port 55494 listener were confirmed absent. No normal-development database fixture was changed.

No Case route/UI activation, accepted application code, schema, migration, provider configuration, cleanup lifecycle, non-Case UploadThing path, production deployment, staging, commit or push was changed in R2-05. The run added only a synthetic integration harness, a run-owned cleanup recovery script and checkpoint documentation.

## Independent V3 review

The first read-only review returned `CORRECTION_REQUIRED | RUNTIME_EVIDENCE` because the disposable PostgreSQL cluster still existed. After exact shutdown, directory removal and listener-absence verification, the independent rereview returned **PASS | RUNTIME_EVIDENCE + CHECKPOINT** and affirmed **NOT_ELIGIBLE**. It also verified that the failed-attempt Edge profile is absent. The reviewer accepted the isolated real-provider claims only with the explicit production S001, normal-development, audit/telemetry and denial-shape NOT_RUN limits above. R2-05 was subsequently accepted by the Product Owner as CLOSED | PASS CHECKPOINT with NOT_ELIGIBLE activation disposition; N-FILE-110 remains inactive.

## Product Owner acceptance and successor

The Product Owner accepted the bounded real-provider composition and independent V3 PASS without extending it to a production-profile Case E2E. The production Linux S001 identity, normal-development Case mutation, activated HTTP/UI flow, browser signed-GET consumption, full audit/telemetry field sanitization, exact sanitized denial response and wider denial matrix retain their explicit `NOT_RUN` dispositions. The normal-development `AUTHORITY_BLOCKER` is accepted; no fixture mutation there is needed to close this checkpoint.

The next narrowly scoped [production S001 Case composition successor](../../../../plans/authorization-v1/r2-06-production-s001-case-runtime.md) must use an approved Linux x64/Node 24/N-API 10 runtime, real unmocked Julusian/native identity, synthetic private R2 objects and an isolated disposable database. It is separate from N-FILE-110 activation and cleanup implementation.
