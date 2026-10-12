---
decision_id: D2-A1
title: Authenticated account attestation for protected synthetic verification
status: READY_FOR_PRODUCT_OWNER_REVIEW
evidence_date: 2026-10-09
authority: READ_ONLY | ACCOUNT ATTESTATION
---

# D2-A1 — Existing provider account attestation

## Decision context and method

[D2-T0](d2-t0-existing-target-inventory-20261009.md) is Product Owner **ACCEPTED | PASS | ARCHITECTURE/DECISION** with independent V3 PASS. [D2-R1](../../plans/deployment-d2-r1-hobby-free-feasibility-20261008.md) remains **ACCEPTED | FEASIBLE_WITH_GATES**; [D1](../../plans/deployment-d1.md) remains the future paid-production baseline. This packet uses read-only authenticated access where available. No account or project was changed, and no secret, object content, database data or full connection string was read.

On 2026-10-09 the available Vercel connector answered authenticated user, team, member, project-list, deployment-context, Git-namespace and repository-search reads. Public GitHub API supplied repository metadata; `gh auth status` reported no GitHub CLI login. No Supabase or Cloudflare account connector or local authenticated CLI was available. The browser-session inspection tool failed before any usable account view. Those access failures are evidence limits, not provider capability failures.

## Account and project findings

| Provider | Outcome | Current evidence | Remaining unknowns |
| --- | --- | --- | --- |
| Vercel | **PARTIAL** | Authenticated connector returned active user `alilefta` with personal plan `hobby`. Deployment context reports team `ali-leftas-projects` plan `hobby`; team membership lists `alilefta` as `OWNER`. The complete project-list response has 13 projects and no continuation cursor; none is LabOS-named or the earlier S001 probe. Git namespace `alilefta` reports owner type `user` and `isAccessRestricted=true`. Authenticated repository search found a known linked repository but returned no `LabOS` result, including exact-name and broader searches. | No LabOS project protection, bypass/share controls, region, runtime settings or remaining project quota can be attested. Search absence means the current Git connection does not establish LabOS import access; it does not prove Vercel cannot host the public repository. The 13 listed projects are inventory, not a quota. |
| GitHub | **PARTIAL** | Fresh public repository API returned `alilefta/LabOS`, owner type `User`, visibility `public`, not archived or disabled. Vercel's authenticated Git namespace matches the personal owner name; repository search can find a known linked repository but does not return LabOS. | No authenticated GitHub session or installation-repository grant was inspected. Exact Git integration access and effective deployment-author permission remain unverified; public/personal ownership alone does not establish import eligibility. |
| Supabase | **NOT_ATTESTED** for current account | [A1-R0](../files/authorization-v1/n-file-110-a1-r0/packet.md) documents an earlier development-project audit and an overprivileged development credential. | Current account/organization, Free plan, active project count/free slot, development project status, region and restricted-role/pooler feasibility were not authenticated. The documented development fingerprint is historical evidence only. |
| Cloudflare R2 | **NOT_ATTESTED** for current account | [R2-01](../files/authorization-v1/r2-01-capability-adapter/packet.md) and R2-06 document earlier approved private non-production target use and fixture cleanup. | Current account, plan/usage, bucket inventory/metadata, privacy, current CORS, isolation options and remaining quota were not authenticated. No object listing was attempted. |

No effective project-level security setting can be claimed because no intended LabOS verification project was identified. Published provider limits in [D2-R1](../../plans/deployment-d2-r1-hobby-free-feasibility-20261008.md) remain documentary background, not this account's remaining capacity or a $0 guarantee. Vercel deployment context attests the linked team plan as Hobby; no LabOS verification project was identified to attest its effective settings.

## Supported candidate target selection

| Component | Existing current evidence | Candidate minimum | Selection/attestation gate |
| --- | --- | --- | --- |
| Vercel host | Personal and team Hobby plans, OWNER membership, 13 listed projects, no LabOS-named project; connected but access-restricted Git namespace with no LabOS search result. | A dedicated protected Hobby verification project under the eligible owner, if remaining capacity and exact repository import permissions permit. | Confirm Git installation access to exact repo, remaining capacity, candidate region and exact **All Deployments** protection control. Later verify anonymous denial, shares/bypasses and authorized browser sessions. No existing unrelated project is selected. |
| Supabase database | Existing development target only in historical evidence. | Separate synthetic verification project on Free if account inventory proves an available slot. | Authenticated organization/project/plan/slot read, region, restricted runtime and migration-role feasibility. Do not reuse the overprivileged development credential. |
| R2 storage | Earlier private disposable test target in historical evidence. | Separate private verification bucket/scoped identity if existing target isolation cannot be established. | Authenticated account/bucket privacy, usage/quota and isolation metadata; later origin-specific CORS and credential setup under distinct authority. No object inventory. |
| GitHub source | Public personal repository currently observable; Vercel namespace matches owner name but is access-restricted; current authenticated repository search does not return LabOS. | Use the existing repository only after exact integration and commit-author eligibility are confirmed. | Authenticated non-secret installation metadata or intended Vercel import-read validation; no repository setting changes. |

## Quotas, region and protection disposition

Vercel's authenticated user record reports `hobby` and concurrent-build resource configuration of one; deployment context reports the team plan `hobby`, and team membership reports the user as `OWNER`. The returned project list has 13 entries and no next cursor, but the account's maximum or remaining project capacity is **NOT_ATTESTED**. Current Supabase Free project count/remaining slots and Cloudflare R2 usage/remaining free allowance are **NOT_ATTESTED**. Candidate Vercel function region, Supabase project region and R2 location are unselected; any latency, residency or cross-region cost conclusion would be premature. Vercel Authentication **All Deployments** is documented as a proposed control in D2-R1, but no LabOS project's effective protection or bypass/share setting exists to inspect here.

## Next Product Owner decision

The Product Owner chose on 2026-10-09 to retain Supabase and Cloudflare R2 as `NOT_ATTESTED` for now. The next bounded decision is whether to resolve the exact LabOS GitHub installation/repository grant and remaining Vercel project capacity through read-only account metadata. Supabase account/project/Free-slot and Cloudflare account/bucket/usage attestation remain later gates before selecting or provisioning those targets. Candidate regions and whether the historical R2 test bucket is sufficiently isolated remain undecided. Do not infer capacity from unavailable access.

Only after those facts support a target should the Product Owner consider separate minimal provisioning authority for one protected Vercel project, one isolated Supabase Free verification project if a slot exists, and a private R2 verification bucket if needed. Provisioning, credentials, migrations, build/deployment and security testing are outside D2-A1. A1-I1 remains `BLOCKED_DECISION` and N-FILE-110 inactive; in-flight R2 PUT safety remains a destructive-cleanup blocker.

## Independent review

Initial independent V3 `ARCHITECTURE/DECISION`: **PASS** (2026-10-09). The read-only reviewer independently checked current authenticated Vercel and public GitHub claims, historical Supabase/R2 provenance, internal links, protected-target limits and the D2-A2 decision boundary. No material findings. Current target security, quotas and provider access gaps remain as stated.


Supplemental Vercel account/repository-search findings added 2026-10-09; independent V3 `PASS | ARCHITECTURE/DECISION`. The read-only reviewer found no material issue with the bounded Git-access, team-plan, quota and deferred-provider conclusions. The reviewer inspected the evidence record and documentation but could not independently rerun authenticated connector calls; this review is not a second provider runtime attestation.




## Subsequent project-limit clarification (2026-10-09)

The Product Owner pointed to [Vercel Hobby documentation](https://vercel.com/docs/plans/hobby), which publishes a 200-project Hobby limit. This refers to Vercel, not Supabase. The authenticated Vercel list in this packet contained 13 projects and no continuation cursor, leaving 187 theoretical slots under the published limit; actual LabOS import eligibility remains unverified because the connected Git repository search did not return LabOS. The separate Supabase Free two-active-project rule and its membership caveat are recorded in [D2-S1](d2-s1-supabase-free-preflight-20261009.md).

## Supplemental read-only Vercel check (2026-10-10)

After [D2-R3](d2-r3-verification-credential-20261010.md) acceptance, authenticated Vercel deployment context still reported the `ali-leftas-projects` Hobby team and its existing linked projects, with no LabOS project. A fresh `list_projects(search: "labos")` returned zero projects, and `search_repo(provider: "github", query: "LabOS", slug: "ali-leftas-projects")` returned zero repositories. This repeats the exact import-access gap; it does not prove the public repository is ineligible or that a project cannot be created. No Vercel setting, integration permission, project or deployment was changed. The next bounded target decision is whether to authorize exact GitHub-to-Vercel repository access verification/correction before proposing a protected project.

Independent focused V3 `PASS | CHECKPOINT` confirmed that the zero-result reads are bounded as an unresolved integration gate and imply no authority to provision or change GitHub permissions.

