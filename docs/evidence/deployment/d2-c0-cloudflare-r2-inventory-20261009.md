---
decision_id: D2-C0
title: Cloudflare R2 read-only account and bucket inventory
status: READY_FOR_PRODUCT_OWNER_REVIEW
evidence_date: 2026-10-09
authority: READ_ONLY | ACCOUNT ATTESTATION + PREPARATION
---

# D2-C0 — Cloudflare R2 account inventory

## Scope and method

The Product Owner connected Cloudflare after [D2-S0 Supabase preparation](d2-s0-supabase-preparation-20261009.md) and requested the next decisions. This packet preserves current **read-only** account and bucket metadata. [D1](../../plans/deployment-d1.md) and [D2-R1](../../plans/deployment-d2-r1-hobby-free-feasibility-20261008.md) require environment-specific private R2 storage for protected synthetic verification, separate from local development and future production.

On 2026-10-09 the Cloudflare connector's `whoami` and read-only GET requests to account list, R2 bucket list, exact bucket metadata, managed `r2.dev` domain, custom domains and CORS succeeded. The OpenAPI spec was searched before using these endpoints. No object was listed or read. No bucket, CORS, domain, credential, account or object was created, updated or deleted. The connected profile's email/display name is deliberately omitted.

## Authenticated inventory

| Claim | Current read-only observation | Limit |
| --- | --- | --- |
| Account | One accessible Cloudflare account was returned. The account ID begins `8149` and ends `1496`; full ID and account display name are omitted here. Account API type was `standard`. | `standard` is not a verified billing plan. Current R2 usage, free-tier headroom, costs and account-level quota were not returned by these reads. |
| R2 buckets | Bucket list returned one bucket, `labos-r2-development`. Exact GET reports creation on 2026-10-06, location `EEUR`, storage class `Standard` and jurisdiction `default`. | List was not an object inventory. No separate verification bucket was observed. Location hint and jurisdiction are distinct; the `default` jurisdiction is not an EU-only residency guarantee. |
| Public exposure | Exact managed-domain GET reports `r2.dev` disabled. Custom-domain list returned zero domains. | These are current bucket settings as returned by the API, not proof of all possible access paths or a production security audit. |
| CORS | Exact bucket CORS GET returned one rule with origin `http://localhost:3000` and method `PUT`. | Header details were not retained in this packet. A future protected Vercel origin is not covered by the observed origin; browser conformance would need a separately authorized narrow CORS decision and test. |
| Connector access | Current account and bucket metadata GETs succeeded. | The connector did not report its underlying exact token permission template; success does not justify write access. No object-content access was attempted. |

The existing development bucket is a historical non-production R2 runtime target for the accepted R2 checkpoints. This current inventory establishes its metadata and private-domain posture, not that it is suitable as the isolated Vercel verification bucket. No project-level Vercel origin has been chosen.

## Cloudflare change ledger

**Applied changes: none.** Every call in this packet was read-only.

For any later approved Cloudflare change, record **before execution**: date/time and actor; exact account/bucket target; before state; proposed after state; reason and accepted architecture; Product Owner authority; cost, security and data consequences; rollback/recovery plan; and verification. Record actual result and any deviation afterward. Never record bearer tokens, S3 credentials, presigned URLs or object contents.

| Candidate change | Reason | Current disposition |
| --- | --- | --- |
| Create a dedicated private verification bucket | Enforce D1's separation of local development from protected synthetic verification and future production. | **PROPOSED ONLY**; account usage/cost, location and bucket name need decision. |
| Give a verification-only server identity the minimum R2 permissions | Keep development and verification capabilities and secrets separate. | **LATER GATE**; no credential issued. |
| Add exact Vercel origin to verification-bucket CORS | Permit the approved conditional browser PUT only from the protected deployment origin; preserve create-only semantics. | **LATER GATE**; no origin or project exists yet. Development CORS unchanged. |
| Preserve private access | Keep `r2.dev` disabled and no public custom domain. | **CURRENT OBSERVATION / REQUIRED INVARIANT**; no setting changed. |

## Decisions now required

1. **Supabase target:** Select the attested Free organization as the proposed owner of one isolated verification project, and select a candidate region. Authorize only a read-only creation-cost and actual Free-slot/member-quota preflight next. [D2-S0](d2-s0-supabase-preparation-20261009.md) records one active project and a conditional second slot, not a guaranteed $0 entitlement.
2. **R2 isolation:** Choose a dedicated private verification bucket (recommended by D1's environment isolation) and its location, subject to current usage/cost attestation. Reusing `labos-r2-development` would weaken the accepted environment split and requires a separate architecture decision. No bucket creation or CORS change is authorized by this inventory.
3. **Vercel source and protection:** Resolve the exact LabOS GitHub installation grant and remaining Hobby project capacity. Then select a new verification project, protected origin/branch/tester scope and **All Deployments** protection under separate authority. [D2-A1](d2-a1-authenticated-account-attestation-20261009.md) records an access-restricted namespace with no LabOS repository search result; it is not proof of incompatibility.
4. **Sequencing and trust:** Provisioning, restricted database roles, migration execution, per-environment secrets, full build/native checks and protected HTTP/browser tests each need their own reviewed authority and ledger entries. A1-I1 remains `BLOCKED_DECISION`; N-FILE-110 remains inactive.

The smallest next authorization is **read-only cost/eligibility and region preflight** for the selected Supabase organization, plus read-only R2 account usage/plan information if the connected scope supports it and Vercel Git grant/capacity resolution. No provider mutation follows automatically.

## Independent review

Independent V3 `PASS | ARCHITECTURE/DECISION` (2026-10-09). The read-only reviewer found no material issue with the authenticated metadata, evidence limits, zero-change ledger, environment-isolation decision or retained A1-I1/N-FILE-110 boundaries. This reviews the packet and architecture conclusions; it is not a second provider API run.

