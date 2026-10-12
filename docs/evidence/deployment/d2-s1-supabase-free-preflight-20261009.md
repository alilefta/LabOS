---
decision_id: D2-S1
title: Selected Free organization verification-project preflight
status: READ_ONLY_PARTIAL
evidence_date: 2026-10-09
authority: READ_ONLY | COST + ELIGIBILITY PREFLIGHT
---

# D2-S1 — Supabase verification-project preflight

## Product Owner selection and boundary

On 2026-10-09 the Product Owner selected the already attested Free organization from [D2-S0](d2-s0-supabase-preparation-20261009.md) as the candidate home for LabOS verification and accepted its existing `eu-central-1` region as the candidate region for now. This is a target-selection direction, not authority to create a project, role, credential, migration or database object. The existing populated `LabOS` development project remains untouched.

The Product Owner's “200 projects” reference was to [Vercel Hobby documentation](https://vercel.com/docs/plans/hobby), **not Supabase**. Vercel's published Hobby project limit is 200. Supabase's [current Free Plan documentation](https://supabase.com/docs/guides/platform/billing-on-supabase) separately says **two active Free projects across organizations where the user is Owner or Administrator**; paused projects do not count. Its [Billing FAQ](https://supabase.com/docs/guides/platform/billing-faq) adds that other Owner/Admin members' exhausted quotas can prevent creation in an organization.

## Read-only checks and result

| Claim | Evidence | Result |
| --- | --- | --- |
| Selected target | Authenticated D2-S0 connector reads showed one accessible Free organization (`Ali Mohsin`) and one `ACTIVE_HEALTHY` LabOS development project in `eu-central-1`. Product Owner selected this organization and accepted that region as candidate. | **ATTESTED SELECTION**, no new resource. |
| Published Free allowance | Official Supabase documentation says two active Free projects, subject to cross-organization and Owner/Admin membership rules. | **DOCUMENTED**, not an account-specific second-slot guarantee. |
| Apparent slot | Authenticated `list_projects` returned one project accessible to this connection. | **PARTIAL**: a second active Free project is plausible, but owner/admin membership and creation eligibility are not exposed by the available reads. |
| Project cost | The connector's read-only `get_cost` operation was attempted twice for this selected organization and project type; both calls returned `UNAVAILABLE` because the MCP server did not advertise the tool. No cost-confirmation or create call was made. | **NOT_ATTESTED** for account-specific creation cost or $0 guarantee. Do not use a write attempt as a probe. |
| Region | Existing development project is in `eu-central-1`; Product Owner accepts this as a candidate verification region for now. | **SELECTED CANDIDATE**, not a newly provisioned region or final residency decision. |
| Existing data and roles | No SQL, project data, role, credential, connection string or migration was accessed or changed in this preflight. | **NOT_RUN** for target-specific restricted-role compatibility. |

## Change ledger

**Applied changes: none.** Read-only documentation and failed read-only cost queries did not change Supabase state.

A later project-creation proposal must record exact organization, project name, selected region, displayed cost/plan, accepted Free-slot eligibility, owner, protection boundary, rollback/deletion responsibility and verification before execution. After execution, record actual project identity and result without secrets. Restricted application role, separate migration identity, ACK owner, Prisma/Better Auth compatibility, migration history and Vercel secret routing remain separate gates under D1 and A1-R0. A1-I1 stays `BLOCKED_DECISION`; N-FILE-110 stays inactive.

## Disposition and next gate

**PREFLIGHT_PARTIAL:** the organization and candidate region are selected, and the published Free allowance is verified. Account-specific cost and actual creation eligibility remain unverified because the read-only cost tool is unavailable and member quota is not exposed. The next safe evidence is a redacted Supabase dashboard creation/cost/eligibility view or a restored read-only cost/member endpoint. No project creation is authorized by this packet. The parallel [R2 isolation proposal](d2-r2-verification-bucket-isolation-20261009.md) can proceed at design level while this gate remains open.

## Independent review

Independent V3 `PASS | ARCHITECTURE/DECISION` (2026-10-09). The read-only reviewer found no material issue with the selected candidate, two-active-Free-project distinction, unavailable cost tool, conditional eligibility or zero-change ledger. This is a documentation/evidence review; the reviewer did not rerun authenticated connector calls.


## Supplemental Product Owner attestation and browser check (2026-10-09)

The Product Owner states they are a solo developer with no other Owner/Admin members in the selected Supabase organization and opened the new-project form at the selected organization. This is **Product Owner testimony**, not an independently inspected member roster or project-creation eligibility result. The browser inspection tool failed before returning page content on two attempts and again after a reset. The read-only Supabase `get_cost` connector operation again returned `UNAVAILABLE`. No form value, displayed cost, quota message or project-creation eligibility was observed by the agent; the project was not submitted. A redacted screenshot of the organization, plan, region and cost/quota area is requested to complete the read-only form inspection. **Applied changes remain none.**

## Subsequent user-supplied creation-form evidence (2026-10-09)

The Product Owner subsequently supplied new-project-form screenshots. The later [Frankfurt form screenshot](d2-s1-supabase-create-form-frankfurt-20261009.png) is preserved at SHA-256 `EF7DD7B14EEEA92F0E145052F7D5A1888A83E622FAB0F15CA6710B2B7645072A`. It supersedes the preceding *inspection unavailable* observation only for visible fields; it does not retroactively make the browser tool or cost connector successful. The screenshot contains no entered database password or credential.

| Visible form fact | Evidence classification and implication |
| --- | --- |
| `Ali Mohsin` organization displays a `FREE` badge. | User-supplied dashboard screenshot, consistent with the earlier authenticated organization read. It is not a per-project cost or quota confirmation. |
| Region displays `Central EU (Frankfurt)`. | The Product Owner changed the draft selection from the earlier visible `Asia-Pacific` default to the accepted candidate region. No project was submitted. The form does not print a region code; [Supabase region documentation](https://supabase.com/docs/guides/platform/regions) maps this exact label to `eu-central-1`. |
| Project name displays `test`; database password is blank. | Form draft only. The name is not an accepted final verification-project name, and no credential was entered or stored. |
| `Enable Data API` and `Automatically expose new tables` are checked; `Enable automatic RLS` is unchecked. | Visible defaults, not approved configuration. The form says automatic exposure grants Data API roles privileges on new tables and recommends disabling it to control access manually. Supabase's [API security guide](https://supabase.com/docs/guides/api/securing-your-api) distinguishes object grants from row-level security; its [2026 default-privileges change](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically) says disabling automatic exposure does not affect direct ORM/database connections. LabOS currently uses direct Prisma/pg for application and Better Auth access, so a later provisioning proposal should leave automatic table exposure off and assess whether the Data API should be disabled entirely. Automatic RLS must be decided with the restricted-role/SQL design, not toggled blindly in this preflight. |
| Standard `Postgres` is selected; beta `Postgres with OrioleDB` is not. | Visible draft choice. No database engine has been provisioned. |
| No cost, Free-slot, quota or creation-success message is visible. | Account-specific $0 cost and second-slot creation eligibility remain `NOT_ATTESTED`. The visible Create button is not proof of either. |

This screenshot does not attest organization membership, billing state, project creation, PostgreSQL role separation, connection-pool compatibility or application runtime. The Product Owner's sole-Owner/Admin statement remains testimony. The documented two-active-Free-project allowance plus one authenticated active development project supports a **candidate** second project, subject to the remaining account-specific gate. **Applied Supabase changes: none.** The new screenshot changes this packet's form-inspection evidence, not its `READ_ONLY_PARTIAL` disposition or the prior independent review's original scope. A later provisioning authorization must record the exact chosen security settings and their reasons before submission, then verify the actual project and log any applied change.

### Independent review of screenshot supplement

Independent read-only V3 `PASS | ARCHITECTURE/DECISION` (2026-10-09). The reviewer inspected the preserved screenshot and matching SHA-256, D2-S1 supplement, `docs/current.md`, `.agent/current-task.md`, D1/D2-R1, the Prisma/Better Auth/migration connection paths, and current official Supabase API-security guidance. The reviewer found the visible facts, Free-slot/cost limits, candidate region mapping, security-default interpretation, zero-change ledger and inactive/blocked workstream status consistent. This review covers the screenshot supplement; it does not attest account billing, a provisioned target or runtime role behavior.

## Subsequent Free usage and project-count evidence (2026-10-09)

The Product Owner supplied the [Supabase project/Free usage screenshot](d2-s1-supabase-free-usage-20261009.png), preserved at SHA-256 `489064CD515575BFD5F64B50FFEB4C8F3C0FE170927EAA6EBDCF4E3789E084F0`. This is a user-supplied dashboard view, not an authenticated connector query made in this supplement. It shows one visible `LabOS` project card in `eu-central-1` on `NANO` compute and an organization `Free plan usage / Current billing cycle` panel:

| Displayed meter | Current / allowance | Interpretation |
| --- | --- | --- |
| Egress | 0.00 / 5 GB | The current billing-cycle dashboard display, not a future usage forecast. |
| Database size | 48 / 500 MB | Approximately 9.6% of the displayed per-project Free database limit; approximately 452 MB headroom at the screenshot instant. |
| Monthly active users | 0 / 50,000 | Dashboard display only. |
| File storage | 0 / 1 GB | Dashboard display only. |
| Log ingestion | 0.00 / 1 GB | Dashboard display only. |
| Log query | 0.99 / 100 GB | Dashboard display only. |

The Product Owner also quoted [Supabase's official pricing page](https://supabase.com/pricing): Free is advertised at $0/month, with a limit of two active projects and a one-week inactivity pause. [Supabase billing documentation](https://supabase.com/docs/guides/platform/billing-on-supabase) says the two-Free-project allowance applies across organizations in which an account is Owner/Admin; its [billing FAQ](https://supabase.com/docs/guides/platform/billing-faq) explains the additional Owner/Admin-member quota condition. Earlier authenticated D2-S0 reads found one active accessible development project and one Free organization; the Product Owner attests they are the sole Owner/Admin. Taken together, the current evidence supports an **apparently available second Free-project slot** for this solo-owner account. The screenshot lists one project in this view; it is not itself an account-wide role/organization inventory or a successful second-project creation.

The published `$0/month` Free price and the visible Free usage badge materially strengthen the cost case for an ordinary second Free/Nano project. The dashboard screenshot still does not show a project-specific price, add-on selection, final checkout/creation confirmation or any future usage guarantee. Therefore `READ_ONLY_PARTIAL` remains the correct preflight status; separate project-creation authority and a deliberate configuration record are still required. No provider operation was performed and **applied Supabase changes remain none**. This usage supplement does not change D1, A1-I1 `BLOCKED_DECISION`, N-FILE-110 inactivity or the prior independent reviews' historical scope.

### Independent review of Free usage supplement

Independent read-only V3 `PASS | ARCHITECTURE/DECISION` (2026-10-09). The reviewer checked the preserved screenshot and SHA-256, every transcribed usage meter, current official Supabase pricing and billing documentation, the D2-S1 packet, `docs/current.md` and `.agent/current-task.md`. The reviewer accepted `apparently available` as the bounded second-slot inference and confirmed that account-wide role/organization inventory, project-specific price/add-ons and actual creation eligibility remain unverified. Zero provider changes, `READ_ONLY_PARTIAL`, A1-I1 `BLOCKED_DECISION` and N-FILE-110 inactivity are preserved. The review did not verify a provisioned target or runtime behavior.
