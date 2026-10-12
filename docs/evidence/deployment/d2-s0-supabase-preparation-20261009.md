---
decision_id: D2-S0
title: Supabase verification-target preparation and change ledger
status: READY_FOR_PRODUCT_OWNER_REVIEW
evidence_date: 2026-10-09
authority: READ_ONLY | ACCOUNT ATTESTATION + PREPARATION
---

# D2-S0 — Supabase preparation

## Scope and source

The Product Owner requested preparation of Supabase and a durable explanation for **every future Supabase account or settings change**. This packet records the current connected-account facts and a change ledger. No Supabase change was made. [D1](../../plans/deployment-d1.md) remains the accepted paid-production baseline; [D2-R1](../../plans/deployment-d2-r1-hobby-free-feasibility-20261008.md) proposes a separate Free verification project conditionally; [D2-A1](d2-a1-authenticated-account-attestation-20261009.md) is the historical account-attestation snapshot before the Supabase connection became available.

Evidence on 2026-10-09 comes from the authenticated Supabase connector's `list_organizations`, `list_projects`, `get_organization` and `get_project` read-only calls. No SQL, table or object listing, log query, key read, credential read, database connection, project creation or configuration mutation occurred. The connector did not expose a user-login identity or organization member list, so access to this organization is attested but the exact human login and other Owner/Admin memberships are not.

## Current account and project inventory

| Claim | Current authenticated observation | Limit |
| --- | --- | --- |
| Organization | One accessible organization, display name `Ali Mohsin`; `get_organization` reports plan `free` and tier `tier_free`. | Login identity, member roles and any other account not exposed by this connector remain unverified. |
| Projects | `list_projects` returned one project, named `LabOS`, in that organization. `get_project` reports `ACTIVE_HEALTHY`, region `eu-central-1` and PostgreSQL `17.6.1.084` on major version 17. The project reference begins `mvpy` and ends `siow`; the full ref was not copied into this packet. | This is the existing development project, not a separate verification target. No data, effective database role, security policy, backup, pooler or quota setting was inspected. |
| Free project allowance | [Supabase's Billing FAQ](https://supabase.com/docs/guides/platform/billing-faq) currently says two active Free projects; paused projects do not count. It also says Owner/Admin members' quota may affect creation eligibility. | One active project plus the published limit suggests a **candidate** second slot, not an attested creation entitlement. Member/quota state and the actual creation/cost confirmation were not checked. |
| $0 objective | The organization currently reports Free. | No new project price, future usage, add-on, billing or monthly $0 guarantee was established. |

## Proposed verification target and changes

The smallest architecture-consistent candidate is **one new, isolated Supabase Free verification project**, with synthetic non-clinical data only, in a region chosen after Vercel/R2 region and residency review. The existing `LabOS` development project and its credentials remain untouched. The new project's restricted application role, separately controlled migration identity and ACK-function owner would be later, independently authorized and verified steps under D1/A1-R0. No role, grant, migration, pooler route, secret, or Vercel environment mapping is approved by this packet.

Before a project-creation decision, establish actual Free-slot eligibility, organization membership effects, project cost, region, intended owner, project name and deletion/rollback responsibility. The Supabase connector's `get_cost` operation is available but was not invoked: creating a project is not authorized, and the organization for such a creation has not been explicitly selected by the Product Owner. Supabase's project-creation workflow requires a separately authorized cost confirmation.

## Supabase change ledger

**Applied changes: none.** The read-only connector calls above did not alter account, project, database or settings state.

For each separately authorized future change, append a ledger entry **before execution** with: date/time and actor; exact target (organization/project, no secret); proposed before/after state; purpose and accepted architecture reason; Product Owner authority; cost and data/security effect; rollback or recovery plan; verification method. After execution, record the actual outcome, any deviation, verification evidence and independent review where required. Do not record passwords, tokens, keys or full connection strings. A proposed change is not an applied change.

| Candidate change | Why it may be needed | Current state |
| --- | --- | --- |
| Create one isolated Free verification project | Prevent synthetic verification from mutating the populated development database; D1 requires environment isolation. | **PROPOSED ONLY**; Free eligibility, cost and region unresolved. |
| Establish restricted runtime/migration identities | Prevent Vercel app/build from using the development owner's DDL/BYPASSRLS capabilities and preserve the A1 cleanup trust split. | **LATER GATE**; A1-I1 remains `BLOCKED_DECISION`. No role or grant authorized. |
| Configure distinct connection and secrets | Use restricted pooled runtime access while keeping migration authority outside Vercel builds/runtime. | **LATER GATE**; no credential, URL or environment change authorized. |
| Install exact approved migration chain | Bring a selected disposable verification project to the reviewed schema before application use. | **LATER GATE**; migration runner/history/network and rollback controls unresolved. |

## Cloudflare permission recommendation for the parallel inventory

For the requested Cloudflare R2 **account/bucket metadata assessment**, select the connected app's **read-only base scope first**, not Full access. If that scope cannot show R2 bucket inventory/configuration or usage, request the smallest additional *read-only* account permission. Cloudflare distinguishes R2 **Admin Read only** (list buckets and view bucket configuration) from **Object Read only** (read/list objects in selected buckets); the latter is insufficient for account-level bucket configuration and unnecessary for this inventory. [Cloudflare R2 token permissions](https://developers.cloudflare.com/r2/api/tokens/). We will not list object contents even if a granted read scope technically allows it. No write/delete credential is needed until a separately authorized provisioning or runtime step.

## Decision and retained gates

The next Product Owner decision is whether to select the attested Free organization as the candidate owner for **one separate verification project** and authorize a bounded, read-only cost/eligibility and region preflight. Project creation, roles, credentials, migrations, data movement, Vercel settings, R2 operations and deployment require separate concrete authority and ledger entries. Current Free-slot eligibility remains conditional. A1-I1 remains `BLOCKED_DECISION`; N-FILE-110 remains inactive.

## Independent review

Independent V3 `PASS | ARCHITECTURE/DECISION` (2026-10-09). The read-only reviewer found the connector-derived inventory, conditional Free-slot conclusion, zero-change ledger, Cloudflare least-privilege recommendation and retained A1-I1/N-FILE-110 boundaries sound. No material findings. The reviewer did not independently rerun authenticated provider calls; this is a documentation/architecture review, not a second account attestation.

