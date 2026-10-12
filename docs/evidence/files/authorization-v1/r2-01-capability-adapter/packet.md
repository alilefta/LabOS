# R2-01 capability and adapter — checkpoint evidence

Status: `CLOSED | PASS CHECKPOINT`, 2026-10-07. The earlier
`BLOCKED_DECISION` entries below are historical attempts before target/CORS
configuration. The Product Owner subsequently authorized and supplied the
disposable private R2 target. The direct and actual-browser synthetic matrix
passed with exact fixture cleanup, independent V3 `PASS | RUNTIME_EVIDENCE`
and Primary reconciliation.

```yaml
acceptance:
  code: PASS
  runtime: PASS_WITH_LIMITATIONS
  parent_gate: ELIGIBLE
independent_reviews:
  - verdict: PASS
    scope: CODE
  - verdict: BLOCKED_DECISION
    scope: RUNTIME_EVIDENCE
    note: historical pre-target attempt
  - verdict: PASS
    scope: CODE
    note: narrow late stream-abort correction
  - verdict: PASS
    scope: RUNTIME_EVIDENCE
    note: attested-target synthetic matrix
```

## Authority, scope, and changed files

The Product Owner accepted R2-00 and authorized only R2-01. This task adds
the provider-independent port, private R2 adapter, two direct AWS SDK v3
dependencies, local tests and a gated synthetic conformance harness. It does
not connect Case or UploadThing to the adapter, alter Prisma/schema/data,
allocate durable keys, implement cleanup lifecycle, stage, commit, push or
deploy.

R2-01 files:

- `modules/labos-files/object-storage/contract.ts`
- `modules/labos-files/object-storage/r2.ts`
- `tests/unit/object-storage-contract.test.ts`
- `tests/unit/r2-object-storage.test.ts`
- `tests/integration/r2-object-storage-runtime.test.ts`
- `tests/integration/r2-cors-preflight.test.ts`
- `tests/integration/r2-browser-conformance.test.ts`
- `package.json` and `pnpm-lock.yaml` — only the AWS SDK S3 client and
  request-presigner dependencies are attributable to R2-01. The Julusian
  dependency and its lock entries were already dirty and were preserved.
- This packet, `docs/current.md`, the R2 roadmap status line and
  `.agent/current-task.md` record the authorized/open state.

## Semantic contract and dependency direction

Files/application → `ObjectStorage` interface ← R2 infrastructure adapter.
The interface accepts a Files-owned exact key and exposes: time-bounded
create-only write capability; exact-object inspection; hard-bounded,
cancellable retrieval; time-bounded private read capability; exact delete;
and direct authoritative presence/absence classification. Results have a
closed provider-independent failure code. Capability URL, method and required
headers are opaque bearer transport material with an authoritative
`expiresAt` derived from the signed URL. The caller must not persist or log
capabilities. Files owns authorization, SHA-256, validation, lifecycle,
permanent key nonreuse and the later durable expiry fence. The adapter never
allocates keys or infers domain identity from keys.

`r2.ts` alone owns the S3 SDK, R2 endpoint, bucket, credentials, SigV4,
conditional `PutObject`, provider responses and error normalization. A scoped
search of `modules/labos-files` found `@aws-sdk` imports only in `r2.ts` and
no other Files module importing the adapter. UploadThing dependencies and
all live ingestion paths remain unchanged.

The PUT signer requests `If-None-Match: *`, checks that
`if-none-match` appears in `X-Amz-SignedHeaders`, and refuses issuance if it
does not. The expiry fact is parsed from validated `X-Amz-Date` plus
`X-Amz-Expires`; the local test checks equality. This is CODE evidence of the
SDK request shape, not proof of R2 enforcement or browser CORS. The adapter
uses private direct HEAD/GET/DELETE, checks reported size, counts every GET
chunk against the caller bound, aborts on excess, and returns no partial
bytes. ETag is never returned as identity.

## Local verification

| Claim | Check | Result |
| --- | --- | --- |
| Provider-independent Files consumer and closed result shape | Non-vendor fake contract test | PASS |
| Conditional signed-header inclusion and signer-derived expiry | Local SDK presigning unit test; no URL printed | PASS |
| Bounded stream, in-flight cancellation, absent/forbidden normalization | Injected-client adapter tests | PASS |
| Focused tests after runtime abort correction | 6 passed | PASS |
| Adapter TypeScript | Focused strict `tsc --noEmit` | PASS |
| Independent V3 CODE review | Read-only reviewer after expiry correction and retest | `PASS | CODE` |

The first live bounded-GET run exposed a late unhandled Node `ECONNRESET`
after aborting an oversized stream. The adapter now observes late stream
errors before early abort, retaining `TOO_LARGE` and closed failure behavior.
An independent narrow V3 CODE rereview returned `PASS | CODE`; the corrected
live direct matrix exits cleanly. Focused strict TypeScript and unit checks
pass. The independent CODE reviewer also reports project `tsc --noEmit` and
scoped diff whitespace checks pass.

## Historical pre-target runtime attempt

At the prior 2026-10-06 attempt, the runtime suite required explicit
`LABOS_R2_CONFORMANCE_RUN=1` and `LABOS_R2_NON_PRODUCTION=1`, plus private
account, bucket and scoped credential variables. None was configured then;
the test skipped and no R2 call or fixture was made. The historical matrix
below remains truthful for that earlier attempt.

| Required claim | Result |
| --- | --- |
| Attested non-production private bucket, server-only least-privilege credentials, no public domain | NOT_RUN |
| CORS preflight and actual browser-origin conditional PUT | NOT_RUN |
| First absent-key PUT; replay denial; new same-key capability overwrite denial | NOT_RUN |
| Required header cannot disappear during browser use | NOT_RUN |
| Exact bytes unchanged after denied overwrites | NOT_RUN |
| Private HEAD and authoritative size | NOT_RUN |
| Direct bounded GET, exact bytes, cancellation/error normalization | NOT_RUN |
| Time-bounded private exact-key read capability | NOT_RUN |
| Exact DELETE and strongly consistent authoritative absence | NOT_RUN |
| Expired write capability rejection | NOT_RUN |
| Run-owned object cleanup | NOT_RUN — no object created |

The harness uses collision-resistant `r2-01-conformance/{uuid}` keys. It now
treats any attempted write as potentially created, waits for the latest
signed write expiry plus a 60-second test skew allowance before DELETE, and
checks absence in `finally`. It also checks expired PUT/GET rejection and an
expired PUT after deletion before final absence. Its Node `fetch`/OPTIONS checks can inspect CORS
headers; **actual browser enforcement requires a separate browser run** on
the attested target. Its real-R2 cancellation/error-normalization scenario
also remains to be added or explicitly dispositioned before checkpoint
acceptance. No provider URLs or credentials were printed.

## Independent review and blocker

The independent CODE reviewer found that the initial `expiresAt` calculation
could precede the signed URL's real expiry. Primary corrected it to parse
the signer timestamp and duration and added a deterministic test. Rereview
returned **`PASS | CODE`** with 5/5 focused tests. That review made no real
provider claim.

The independent runtime reviewer returned **`BLOCKED_DECISION |
RUNTIME_EVIDENCE`**. All real-R2 claims above are `NOT_RUN`; SDK inspection,
provider documentation and mocks cannot substitute for R2 behavior. The
blocker is `VERIFICATION_ENVIRONMENT_BLOCKER`: no attested private
non-production target or scoped credentials. If creating/configuring a bucket
or CORS is required, exact external-resource authority is also needed.
After the harness cleanup correction, the reviewer confirmed that a possibly
successful write attempt is now covered by expiry waiting, exact deletion and
absence verification; the runtime verdict remains `BLOCKED_DECISION` because
no provider scenario ran. Browser enforcement and real-R2 cancellation/error
normalization remain outstanding.

At that historical attempt R2-01 remained open and was **not a pass checkpoint**. The next action was an
approved non-production private R2 target, safe credentials/configuration
delivery, and authority to create/delete run-owned synthetic objects and
inspect/configure CORS as needed. Then execute the conformance matrix,
separate actual-browser PUT proof, sanitized evidence capture, exact fixture
cleanup and independent runtime rereview. No R2-02 or Case integration may
start from this partial CODE result.

## First resumed runtime attempt, before local configuration

The Product Owner authorized exact run-owned synthetic provider operations
and narrowly scoped CORS correction on an attested disposable target. Local
process and `.env`/`.env.local` variable-name inspection found no R2 target
configuration; the authorization message supplied no configuration path,
bucket identifier or development origin. The gated runtime test again
reported one skipped test and zero executed. No R2 fixture or CORS change was
made. The accepted `PASS | CODE` was not reopened. The requested safe target
reference remains necessary before independently attesting identity and
making the first provider request.
Independent read-only resumed-attempt V3 review returned `BLOCKED_DECISION |
RUNTIME_EVIDENCE`; all real-provider claims remain `NOT_RUN`, with a
`VERIFICATION_ENVIRONMENT_BLOCKER` and no new application defect established.

## 2026-10-07 attested-target conformance run

The Product Owner attested the target as private, disposable and
non-production. `.env.local` supplies the R2 account, bucket and scoped
credential values; they were loaded only into local test processes. Both
explicit non-production/conformance gates were enabled. The endpoint had
the expected private R2 API shape, and an independent read-only reviewer
obtained a successful `HeadBucket` with the configured credentials. Neither
the key identifiers nor endpoint/account/bucket values are copied into this
packet. No production resource was addressed. The test origin was exactly
`http://localhost:3000`.

The supplied key could not read bucket CORS configuration (`GetBucketCors`
returned 403). An initial read-only preflight for that origin, PUT and
`If-None-Match` returned 403. The Product Owner then reported a narrow CORS
update; the same read-only preflight passed with an allowed origin and header.
No agent changed CORS, made the bucket public, enabled `r2.dev`, or configured
a public domain. The private-bucket/no-public-domain property rests on the
Product Owner's target attestation; dashboard configuration was not
independently inspectable with this key.

| Required runtime claim | Evidence and result |
| --- | --- |
| First create-only PUT against absent exact key | Direct synthetic PUT succeeded; separate actual-browser `fetch` PUT returned 200. **PASS** |
| Same signed-capability replay and newly signed same-key PUT cannot overwrite | Direct R2 returned 412 for both; actual browser returned 412, 412. **PASS** |
| `If-None-Match: *` signature-bound in actual request | With the key still absent, missing and altered conditional headers each returned 403 and direct private inspection remained `ABSENT`; the correct header then succeeded. **PASS** |
| Browser-origin CORS and conditional create | Read-only preflight allowed `http://localhost:3000`, PUT and `if-none-match`; the actual browser DOM reported `origin=http://localhost:3000 statuses=200,412,412 failed=false`. Browser test returned PASS after cleanup. **PASS** |
| Original bytes unchanged after failed overwrites | Private HEAD reported four bytes; bounded direct GET returned the original four bytes after both direct and browser overwrite attempts. **PASS** |
| Private exact HEAD/size and authoritative absence | Direct private inspection was `ABSENT` before PUT, `PRESENT` with exact size after PUT, and `ABSENT` after DELETE in both runs. **PASS** |
| Bounded GET and provider error normalization | A bound below declared length returned `TOO_LARGE` and aborted the real R2 stream; exact bound returned original bytes. A private GET for another absent random key normalized to closed `UNAVAILABLE`. **PASS** |
| Cancellation | The real oversized GET exercised an abort. Caller-signal in-flight cancellation is covered by focused unit tests; a four-byte remote object cannot deterministically expose an in-flight caller abort, so that narrower real-provider timing claim is **NOT_RUN, explicitly dispositioned**. |
| Private signed GET and expiry | Exact signed GET returned original bytes; the same read capability was rejected after expiry. **PASS** |
| Expired write capability and no recreation | PUT after expiry was rejected both before and after DELETE; direct presence remained `ABSENT` after the post-delete attempt. **PASS** |
| Exact DELETE, skew fence and fixture cleanup | Each test waited until every issued write capability expired plus 60 seconds before deleting its random `r2-01-conformance/{uuid}` key, then directly confirmed `ABSENT`. Both tests exited 0. **PASS** |

The final direct matrix passed cleanly in 93.78 seconds. The actual-browser
matrix passed in 181.54 seconds. The read-only CORS preflight, six focused
unit tests and strict adapter TypeScript check passed. The first direct run's
assertions passed but the process failed on the late abort socket error; that
run is retained as failure evidence and superseded by the corrected CODE
review and clean rerun. No credential, access-key identifier, signature or
presigned URL was printed or stored in evidence. The browser page used
`Cache-Control: no-store`, displayed only sanitized status codes and was
closed after observation.

The two test processes independently verified exact absence after cleanup.
The independent Reviewer additionally ran read-only `ListObjectsV2` on exactly
`r2-01-conformance/`: **zero objects across one page**, with no residual
fixture identifiers. The Reviewer inspected the actual adapter, harnesses,
sanitized results and plan and returned **`PASS | RUNTIME_EVIDENCE`**.

## Primary reconciliation and limits

Primary accepts R2-01 as `CLOSED | PASS CHECKPOINT` for the attested disposable
development R2 target. The runtime acceptance is `PASS_WITH_LIMITATIONS`:

- Real in-flight **caller-signal** abort timing was `NOT_RUN`. The real R2
  oversized GET exercised provider-stream abort and its late-error correction;
  focused tests cover caller-signal cancellation. A four-byte object cannot
  deterministically expose a midstream caller abort. The Product Owner's
  R2-01 authorization expressly allowed a disposition where the condition
  cannot be deterministically exposed. A future provider adapter or material
  streaming change triggers this scenario again; this bounded limitation
  does not weaken the port's cancellation contract.
- `GetBucketCors` returned 403, so the exact CORS rule and absence of public
  domains were not independently inspected through configuration APIs. The
  Product Owner attested the target's private non-production posture and
  supplied the CORS update; actual preflight and browser PUT behavior passed.
  Any material bucket CORS/privacy configuration change requires renewed
  attestation and browser conformance before Case depends on it.

These are bounded assurance limits, not residual synthetic objects or an
adapter semantic failure. No schema, Case integration, S001, UploadThing,
cleanup lifecycle, N-FILE-110 activation, production resource, staging,
commit, push or deployment was changed. R2-02 requires a separate Product
Owner authorization.
