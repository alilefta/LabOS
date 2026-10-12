---
decision_id: D2-R2
title: Protected verification R2 isolation design and execution
status: CLOSED | PASS CHECKPOINT | VERIFIED_PRIVATE
evidence_date: 2026-10-09
authority: PRODUCT_OWNER_AUTHORIZED | EXACT VERIFICATION BUCKET PROVISIONING
---

# D2-R2 — Private R2 verification isolation

**Current state:** D2-R2 is Product Owner `CLOSED | PASS CHECKPOINT | VERIFIED_PRIVATE` after independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`. The original design proposal and temporary access blocker below are retained as historical decisions and attempts; see [the execution ledger](#execution-continuation-and-verified-bucket-state-2026-10-09) for the verified provider state. D2-R3 credential issuance is a separate open checkpoint.

## Purpose and existing target

At the original read-only design stage, the Product Owner asked to move to R2 isolation after the bounded Supabase checks. [D2-S1](d2-s1-supabase-free-preflight-20261009.md) was **PREFLIGHT_PARTIAL**: the Free organization and candidate region were selected, but account-specific creation eligibility and cost were unverified. That design stage created or modified no Cloudflare resource; the later authorized bucket result is recorded below.

The [D2-C0 authenticated inventory](d2-c0-cloudflare-r2-inventory-20261009.md) found one existing bucket, `labos-r2-development`, with Standard storage, `EEUR` location hint, `default` jurisdiction, `r2.dev` disabled, no custom domain, and localhost-only PUT CORS. The accepted [D1 topology](../../plans/deployment-d1.md) and [D2-R1 protected verification plan](../../plans/deployment-d2-r1-hobby-free-feasibility-20261008.md) require isolated local-development and protected-verification data and secrets. The development bucket therefore remains the development target.

## Recommended candidate

| Decision dimension | Recommendation | Reason and remaining gate |
| --- | --- | --- |
| Bucket identity | A new private bucket, candidate name `labos-r2-verification`; exact name subject to availability and Product Owner choice. | Separate bucket gives a clear physical boundary for synthetic verification and independent credentials/CORS. Do not reuse the development bucket under the accepted D1 topology. |
| Storage class | `Standard`. | Cloudflare's [R2 pricing](https://developers.cloudflare.com/r2/pricing/) says its monthly free tier applies to Standard, not Infrequent Access. This does not prove the account will stay within free usage. |
| Location | Candidate `EEUR` hint, alongside the chosen Supabase `eu-central-1` region. | Cloudflare [describes location hints](https://developers.cloudflare.com/r2/reference/data-location/) as best effort, not residency guarantees. Do not equate `EEUR` with an EU jurisdiction. A jurisdictional restriction is a separate Product Owner/legal decision before clinical production exposure. |
| Public access | Disable `r2.dev`; register no public custom domain. | Preserve private exact-object access through the accepted ObjectStorage port and short-lived capabilities. Verify both settings after any bucket creation. |
| CORS | No rule until the exact protected Vercel origin is selected. Then add only the minimum origin, conditional PUT and signed-GET methods/headers needed by the approved browser contract. | Current development CORS is localhost-only and must remain untouched. New CORS must be proven with an actual browser; do not broaden it to wildcard origins. |
| Credentials | Later create a verification-only, bucket-scoped server credential for the R2 adapter. Keep local-development and future-production credentials separate; never put R2 secrets in client or generic PR Preview environments. | Credential issuance and Vercel installation are separate security-sensitive steps. No token, key or URL is produced or recorded here. |
| Object lifecycle | Maintain LabOS-owned `objects/{uuidv4}` allocation, create-only conditional writes, private reads and the durable latest-write-capability fence. | Accepted R2-01 through R2-06 semantics stay unchanged. Destructive rejected/orphan cleanup remains blocked by the in-flight PUT safety gate and A1-I1. |

Cloudflare's [R2 pricing](https://developers.cloudflare.com/r2/pricing/) currently includes 10 GB-month Standard storage, 1 million Class A operations and 10 million Class B operations monthly at no charge, with free egress, across applicable usage. The current account's actual usage/headroom was not available in D2-C0; a second bucket is **not** a $0 guarantee. No object listing is needed to decide the bucket boundary.

## Proposed execution gates and change ledger

**At the original design stage, applied changes: none.** This section was the proposal. Before each later mutation, append a record of target, before/after settings, purpose, Product Owner authority, cost/security effect, rollback and verification; afterward record the actual result. The actual bucket creation sequence appears in the execution ledger below. Never record credentials, signatures, bearer URLs or object contents.

1. **Read-only readiness:** confirm account usage/free-tier headroom, candidate bucket-name availability, intended location/jurisdiction, and the Vercel protected origin plan. Preserve the D2-C0 bucket metadata as the development baseline.
2. **Separate provisioning authority:** approve creating exactly one new private verification bucket with the reviewed name, Standard class and chosen location/jurisdiction. Verify exact bucket identity, privacy and absence of public domains. No clinical or customer data.
3. **Separate credential authority:** approve a scoped verification credential and secure secret routing. Prove it cannot operate on the development bucket where the provider supports that restriction. Record only permission boundaries, not secret material.
4. **Separate browser/CORS authority:** after the Vercel origin exists, add a narrow rule to the verification bucket and run the accepted conditional browser PUT/read conformance. No changes to development CORS.
5. **Separate activation/deployment authority:** restricted Supabase roles, approved migration chain, full build/native profile, protected HTTP workflow and cleanup readiness must pass before N-FILE-110 activation. A1-I1 remains `BLOCKED_DECISION`.

## Historical Product Owner decision request

The original request was to approve or revise the **candidate isolation model**: one new `labos-r2-verification` private Standard bucket, `EEUR` location hint with `default` jurisdiction for synthetic verification, no public domain, distinct credentials and future exact-origin CORS. It also asked whether a hard EU jurisdiction was required even for synthetic verification. The Product Owner later selected the default jurisdiction and authorized the exact bucket; token issuance and other setting changes remain separate decisions.

## Independent review

Independent V3 `PASS | ARCHITECTURE/DECISION` (2026-10-09). The read-only reviewer found no material issue with private-bucket isolation, Standard/free-tier caveats, EEUR hint versus jurisdiction, CORS/credential sequencing, account-usage uncertainty or separate mutation authority. This is a documentation/evidence review, not provider runtime attestation.



## Product Owner selection and execution authority (2026-10-09)

After D2-S2 closure, the Product Owner authorized **R2 verification** and explicitly selected the reviewed D2-R2 candidate: create exactly one new private Standard bucket named `labos-r2-verification`, with `EEUR` location hint and `default` jurisdiction, for synthetic protected verification. This accepts the best-effort location hint without claiming hard EU residency. The authorization does not extend to a credential, CORS rule, public `r2.dev` domain, custom domain, object upload, application configuration, deployment or changes to `labos-r2-development`. The existing D2-R2 separate gates for credentials, exact protected origin/CORS and activation remain in force.

Before any bucket mutation, the agent re-read D2-R2/D2-C0 and checked [Cloudflare's current R2 data-location guidance](https://developers.cloudflare.com/r2/reference/data-location/), [bucket-create API contract](https://developers.cloudflare.com/api/resources/r2/subresources/buckets/methods/create/), [private-bucket creation guidance](https://developers.cloudflare.com/r2/buckets/create-buckets/) and [pricing](https://developers.cloudflare.com/r2/pricing/). Cloudflare documents `EEUR` as a best-effort hint and `default` as distinct from an EU jurisdiction; Standard is the class with a free-tier allowance, but account-specific headroom and future $0 usage remain unverified. The proposed exact creation parameters are name `labos-r2-verification`, `locationHint: eeur`, `storageClass: Standard`, jurisdiction `default`. After creation, read back exact bucket metadata, `r2.dev` disabled, and zero public custom domains. No CORS or credential is to be added now.

**Readiness blocker:** the authenticated Cloudflare connector used for D2-C0 is not exposed among the currently available account tools. Plugin search found no Cloudflare connector to invoke, in-app browser control failed at startup, no installed Wrangler executable or Cloudflare environment-variable name was found, and the existing development S3 credentials are not a substitute for account-level management access. Thus current account usage/free-tier headroom, bucket-name availability and target privacy cannot be attested, and no bucket-creation call was made. The Product Owner said they will reattach Cloudflare. Do not infer a free-cost guarantee or create with unverified account identity. **Applied Cloudflare changes: none.**

## Execution continuation and verified bucket state (2026-10-09)

The earlier access-blocker and proposal sections above are preserved as historical preflight state. The Product Owner reattached Cloudflare access and supplied an R2 dashboard usage screenshot. Authenticated API reads identified the same account as D2-C0 (ID prefix `8149`, suffix `1496`), listed only `labos-r2-development`, and found `labos-r2-verification` absent before creation. The development bucket read back as `Standard` / `EEUR` / `default`, with `r2.dev` disabled and zero custom domains. Account storage metrics showed zero uploaded/published objects and zero bytes, subject to metric delay.

The Product Owner screenshot showed the October 5–November 5 billing period at 85 Class A operations, 100 Class B operations, 0 B total storage, and $0.00 billable usage when captured. This established substantial headroom against the published Standard R2 monthly free allowances at that instant; it is not a guarantee of future $0 charges. No payment details or credentials were recorded.

### Change ledger

| Time/order | Actor and exact action | Reason and authority | Result and verification | Rollback / limits |
| --- | --- | --- | --- | --- |
| 1 | Agent attempted `POST /accounts/{account_id}/r2/buckets` for `labos-r2-verification`, `locationHint: eeur`, `storageClass: Standard`, implicit `default` jurisdiction. | Product Owner selected this exact D2-R2 isolation target for synthetic verification. | Cloudflare API returned `10000: Authentication error`; the agent did not claim creation. A fresh bucket list and exact GET still showed the target absent (`10006`). | No Cloudflare change to roll back from this attempt. The connector allowed R2 reads but did not provide bucket-write authority. |
| 2 | Product Owner responded `done` to the request to grant bucket-write access or create the selected bucket. | Same approved target. The reply did not identify which action the Product Owner took. | Fresh authenticated R2 list showed `labos-r2-verification`. Exact GET confirmed creation at `2026-10-09T18:44:39.749Z`, name `labos-r2-verification`, `Standard`, `EEUR`, `default`. The observable result is bucket creation; the agent did not repeat the POST. | If later abandoned, deletion needs a separate exact-resource decision and proof of no objects/dependencies; no deletion is authorized here. |

Post-creation authenticated checks: `r2.dev` managed-domain `enabled: false`; custom domains `[]`; bucket CORS GET returned `10059: The CORS configuration does not exist.` Account-level R2 metrics again showed zero stored objects/bytes, but these metrics are eventually reflected and are not exact per-bucket object absence. No R2 credentials, CORS, public domain, object, application setting, or development-bucket configuration was created or changed by the agent. The authenticated domain configuration confirms that both public endpoint mechanisms are disabled; provider credentials remain a separate gate.

**Result:** the single selected verification bucket is provisioned with the exact reviewed Standard/EEUR/default configuration and verified no public R2 endpoint or CORS policy. The actor that submitted creation is not independently identifiable from the read-only API; the Product Owner's `done` reply and creation timestamp establish the sequence, but not the exact UI action. Account usage was screenshot-attested, not obtained from a billing API; billing/subscription reads through the connected scope returned `10000`. A later verification-specific credential, exact Vercel origin/CORS, and deployment remain separately unauthorized. A1-I1 remains `BLOCKED_DECISION`; N-FILE-110 remains inactive.

## Independent execution review

Independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT` (2026-10-10) after a bounded documentation correction. The initial reviewer verdict was `CORRECTION_REQUIRED` because current authority metadata and the original design-only statements were not clearly marked historical after bucket creation. The correction updated those labels while preserving the failed agent request and observed creation sequence. Rereview found the authenticated bucket, public-endpoint and CORS evidence consistent, the billing observation properly bounded, local links present, and no checkpoint defect. This reviewer PASS supports Product Owner disposition; it is not Product Owner acceptance.

## Product Owner acceptance and successor authority (2026-10-10)

The Product Owner accepted D2-R2 as `CLOSED | PASS CHECKPOINT | VERIFIED_PRIVATE` on the independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`. This acceptance does not turn the point-in-time billing screenshot into a future cost guarantee or attest per-bucket object absence. The separately authorized D2-R3 successor permits exactly one verification-only R2 S3 API credential scoped exclusively to `labos-r2-verification`, contingent on checking enforceable scope and secure one-time key retention. Credential issuance and verification are recorded in a separate D2-R3 packet. CORS, Vercel secrets, object mutations and deployment remain unauthorized.
