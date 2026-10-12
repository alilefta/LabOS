---
decision_id: D2-T0
title: Existing LabOS hosting target inventory
status: ACCEPTED_PASS_ARCHITECTURE_DECISION
evidence_date: 2026-10-09
authority: READ_ONLY | INVENTORY + ARCHITECTURE
---

# D2-T0 — Existing target inventory

**Product Owner decision (2026-10-09): ACCEPTED | PASS | ARCHITECTURE/DECISION.** Independent V3 PASS. Acceptance preserves the local/public and historical evidence limits; D2-A1 separately examines current authenticated accounts.

## Decision and method

[D2-R1](../../plans/deployment-d2-r1-hobby-free-feasibility-20261008.md) is Product Owner **ACCEPTED | FEASIBLE_WITH_GATES | ARCHITECTURE/DECISION**, independent V3 PASS. [D1](../../plans/deployment-d1.md) remains the accepted future paid-production baseline with Vercel as application host. A1-R0 is `INSUFFICIENT_EVIDENCE — TARGET ATTESTATION REQUIRED`; A1-I1 is `BLOCKED_DECISION`; N-FILE-110 is inactive. This is a read-only inventory, not target selection or infrastructure readiness.

On 2026-10-09, inspection covered non-secret local link/repository metadata, public GitHub API metadata, and existing LabOS evidence. No secret value, database, R2 object inventory, provider account dashboard, or deployed LabOS project was read. GitHub CLI was unauthenticated; provider account UI did not yield usable authenticated access. Historical packets are marked as such below.

## Target inventory

| Target | Existing evidence | Unverified target facts |
| --- | --- | --- |
| GitHub repository | Local `origin` points to `github.com/alilefta/LabOS`. Public GitHub API returned `owner.type=User` and `visibility=public` on 2026-10-09. | Vercel association, actual owner/commit-author eligibility, effective integration settings and future visibility. Personal/public ownership removes the documented private-organization Hobby restriction, but does not prove deployment eligibility. [Vercel Git rules](https://vercel.com/docs/git). |
| Vercel | Root `.vercel/` and `.vercel/project.json` absent; `vercel` CLI unavailable; `.gitignore` ignores `.vercel` and `.env*`; no `.github/workflows` directory. A [historical isolated S001 Preview probe](../files/authorization-v1/n-file-110-case-asset-create/s001-core-preview-20261003-157cb99a8d/packet.md) used a run-owned project in `ali-leftas-projects` and verified its deletion. | Current account plan, existing remote LabOS projects, project count/quota, regions, All Deployments protection, bypasses/shareable links, runtime settings. Local absence and a deleted historical probe are not remote account inventory. |
| Supabase | [A1-R0 read-only evidence](../files/authorization-v1/n-file-110-a1-r0/packet.md) documents populated development fingerprint `eb0d823953fe`, transaction pooler port 6543 and migration session/direct-style port 5432. At that audit the development credential owned observed public objects and had `CREATEROLE`, `CREATEDB`, `BYPASSRLS`; it is not a restricted application identity. No D2-T0 database query was run. | Current account plan and project inventory, Free-project slot, separate verification database, region, custom role/pooler behavior, role ownership and restricted Prisma/Better Auth compatibility. Do not copy or rotate existing development credentials. |
| Cloudflare R2 | [R2-01 runtime evidence](../files/authorization-v1/r2-01-capability-adapter/packet.md) records Product Owner-attested private disposable non-production target, narrow localhost CORS correction, actual browser PUT and exact run-owned cleanup. R2-06 reused the approved private target with exact fixture cleanup. | Current account/bucket settings, privacy, quota, CORS for a Vercel origin, and whether an isolated verification bucket/credential already exists. No bucket or object listing was performed. |
| Provider accounts | No authenticated Vercel, Supabase, Cloudflare or GitHub account-level read succeeded in D2-T0; public GitHub API established repository owner type/visibility only. | Actual quotas, billing, owner permissions, projects and protection settings are `NOT_ATTESTED`. |

## Existing, proposed and unverified targets

| Component | Existing | Proposed minimum for protected synthetic verification | Gate |
| --- | --- | --- | --- |
| Application | Public personal GitHub repo; no local Vercel link; deleted historical probe. | One Vercel Hobby project under an eligible owner, Production-classified and Preview URLs covered by Vercel Authentication **All Deployments**. | Read-only account/project inventory, Hobby owner/commit eligibility, effective protection and bypass checks. No project selected or created. |
| Database | Populated Supabase development project and overprivileged development identity. | Separate isolated Supabase Free verification project if a slot and intended role model are confirmed. | Account/project inventory, pooler and restricted-role attestation; migration authority separated. |
| Object storage | Historical private non-production R2 test target. | Private environment-specific verification bucket/scoped credentials, or an existing target proven isolated and suitable. | Account/bucket ownership, privacy, origin-specific CORS, quota and isolation attestation. |
| Migration runner | D1 conditionally prefers GitHub Actions; no workflow in this checkout. | Separate migration/DDL execution with no `DIRECT_URL` or owner credential in Vercel build/runtime. | Approval, network, secret, migration-history and rollback gates remain unresolved. |

## Smallest next step and decision

At D2-T0 acceptance, the next Product Owner decision was **D2 target selection and read-only account-attestation authority**: name the intended Vercel account/candidate project, Supabase account/candidate isolated verification project or Free slot, and R2 account/candidate private bucket. Authorize authenticated read-only inspection of non-secret account/project configuration first. If a necessary target is absent, request separate narrow provisioning authority for the specific missing project or bucket. This inventory authorizes none.

Protected deployment additionally needs verified protection/secret routing, restricted database role compatibility, successful affected TypeScript/build and native-bundle checks, and separate provisioning/deployment authority. N-FILE-110 activation has additional actual HTTP/browser, private signed-GET and expiry-fenced cleanup requirements under the [activation-readiness plan](../../plans/authorization-v1/n-file-110-activation-readiness.md). The unresolved in-flight R2 PUT blocker for destructive cleanup remains unchanged.

## Independent review

Independent V3 `ARCHITECTURE/DECISION`: **PASS** (2026-10-09). The read-only reviewer independently checked local Vercel/workflow/CLI observations, public GitHub owner type and visibility, cited A1-R0 and R2-01 evidence, D1/D2-R1 status, A1-I1 and N-FILE-110 boundaries, and the next-decision scope. No findings or corrections. Historical provider tests are not current account attestation.


