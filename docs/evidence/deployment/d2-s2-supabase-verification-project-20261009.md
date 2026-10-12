---
decision_id: D2-S2
title: Supabase verification project creation
status: CLOSED | PASS CHECKPOINT | ACCEPTED_WITH_LIMITATIONS
evidence_date: 2026-10-09
authority: PRODUCT_OWNER | ONE_PROJECT_CREATE_IF_FINAL_FREE_NANO_NO_CHARGE
---

# D2-S2 — Supabase verification project

## Authorized exact target

On 2026-10-09 the Product Owner authorized creation of one isolated synthetic verification project in the existing Free organization: name `labos-verification`, Central EU (Frankfurt)/`eu-central-1`, standard PostgreSQL, Free/Nano, Data API OFF, automatic new-table exposure OFF, automatic RLS OFF, and a securely generated database password that must not be logged or committed. Submission is conditional on the final creation interface confirming Free/Nano without paid add-ons or charges. The existing `LabOS` development project must remain untouched. No roles, migrations, secrets, data, deployment or N-FILE-110 activation are authorized.

## Read-only pre-submission checks

| Check | Observation |
| --- | --- |
| Organization identity | Authenticated Supabase `list_organizations` returned only the selected organization `Ali Mohsin` (ID `utgohlyguhmucektadda`). `get_organization` returned `plan: free` and `tier: tier_free`. |
| Existing project | Authenticated `list_projects` returned only the existing `LabOS` project (`mvpyqnxwndigrijzsiow`), `ACTIVE_HEALTHY` in `eu-central-1`. |
| Cost gate | The connected `get_cost` call for project creation returned `UNAVAILABLE: MCP tool get_cost was not returned by tools/list`. No project-specific cost or add-on confirmation was returned. |
| Browser control | The in-app browser control process exited before returning the creation form. The separate installed Windows computer-use runtime also exited on both initialization attempts. No UI input or submission occurred. |
| Connector mutation suitability | The available `create_project` contract accepts name, organization, region and cost-confirmation ID but has no parameters for database engine, Data API, automatic exposure, automatic RLS or a database password. It cannot prove or apply the exact authorized configuration, so it was not called. |

A final authenticated `list_projects` again returned only the existing `LabOS` project and `get_organization` still returned the Free organization. This supports **no project creation through these attempts**. At this pre-submission check, no password was generated, entered, printed or stored by the agent. The previously preserved [D2-S1 form and Free usage evidence](d2-s1-supabase-free-preflight-20261009.md) supports a candidate Free slot but does not satisfy the Product Owner's final-interface condition.

## Change ledger

| Item | Before | Attempted/applied action | After | Reason and rollback |
| --- | --- | --- | --- | --- |
| Supabase organization and project inventory | One selected Free organization; one existing active `LabOS` development project | Read-only list/get calls only; no create call | Same one project and Free organization observed | No provider change; no rollback required. |
| Creation form security settings | Earlier user screenshot showed Data API ON, automatic exposure ON, automatic RLS OFF in a draft form | No UI input was possible | No submitted change | Exact approved OFF/OFF/OFF settings remain unverified in a final form. |

## Stop and next action

**STOPPED_PRE_SUBMISSION.** The final Free/Nano/no-add-on/no-charge interface and exact security settings could not be verified, and the UI could not be operated. The Product Owner was asked to provide a redacted screenshot of the completed final form before submission. If the interface offers no explicit cost/plan confirmation, do not submit under this authority. Once the exact final form is visible, creation still requires a functioning authorized browser path or a user-operated handoff; a connector create call cannot substitute because it cannot set the approved security fields. Record any actual creation and resulting settings in this ledger before calling D2-S2 complete.

A1-I1 remains `BLOCKED_DECISION`. N-FILE-110 remains inactive. R2 isolation, Vercel secrets and application deployment are separate later gates.
## Product Owner form preparation and Data API warning (2026-10-09)

After the pre-submission stop, the Product Owner reported entering `labos-verification`, selecting a database password privately, selecting Frankfurt, turning Data API OFF and automatic new-table exposure OFF. The form displayed: “Client libraries need Data API to query your database. Disabling it means supabase-js and similar libraries can't query or mutate data.” The Product Owner asked whether to enable automatic RLS. This is Product Owner report of an **unsubmitted form**, not independently captured final settings or a provider configuration change. The password value was not supplied to the agent, logged or stored in this packet.

The exact D2-S2 authorization sets automatic RLS **OFF**, so the advised final draft is OFF/OFF/OFF for Data API, automatic exposure and automatic RLS. Repository search on 2026-10-09 found `lib/prisma.ts` uses `DATABASE_URL`, `prisma.config.ts` uses `DIRECT_URL`, and no `supabase-js` or `@supabase/ssr` dependency in the inspected package/runtime paths. [Supabase API-security documentation](https://supabase.com/docs/guides/api/securing-your-api) says disabling the Data API prevents its generated REST endpoints from responding; this warning is consistent with LabOS's direct Prisma/pg connection model. Automatic RLS is a separate future database-role/SQL design decision and is not being enabled here.

The final Free/Nano/no-paid-add-on/no-charge interface is still not attested. The project remains unsubmitted as far as the agent can verify, and no browser or connector creation action has been taken. The Product Owner has been asked to provide a redacted final-form screenshot before submission. **Applied provider changes by this agent: none.**

## Independent checkpoint review

Independent read-only V3 `PASS | CHECKPOINT` (2026-10-09). The reviewer inspected the exact Product Owner authorization, D2-S2 packet, current-state records, repository Prisma/pg paths and Supabase Data API guidance. The reviewer confirmed the prepared form is Product Owner testimony about an unsubmitted draft; the final Free/Nano/no-charge gate remains unmet; the cost and browser-control paths failed; the connector cannot apply all approved settings; no create call occurred; and a later authenticated read showed only the existing project. Provider creation/runtime remains `NOT_RUN`, not passed. The review found no material issue with the `STOPPED_PRE_SUBMISSION`/zero-change classification.

## Product Owner dashboard submission and observed creation (2026-10-09)

The Product Owner reported that the final dashboard showed **no cost, pricing or paid label** and that they submitted the form. This is a Product Owner-performed submission after the earlier agent stop; the agent did not click Create, call the connector create operation or handle the database password. Because the required final interface did **not** affirmatively confirm Free/Nano with no paid add-ons or charges, the original D2-S2 pre-submission condition was not demonstrated. The submitted project is real, but the creation must not be retrospectively described as passing that condition.

An authenticated read after the Product Owner's submission returned two projects in the selected organization:

| Project | ID | Region | Status at first post-create read | Provenance |
| --- | --- | --- | --- | --- |
| Historical development `LabOS` | `mvpyqnxwndigrijzsiow` | `eu-central-1` | `ACTIVE_HEALTHY` | Existing project; not mutated by this task. |
| New `labos-verification` | `rvtubjrczuxdxfuazjmr` | `eu-central-1` | `COMING_UP` | `list_projects` and exact `get_project`; creation timestamp `2026-10-09T14:34:20.422176Z`. |

The new project reports PostgreSQL engine 17 and release channel `ga`. This does not by itself verify the dashboard's Standard PostgreSQL choice, Nano compute, final cost, security toggles or eventual health. A separate `get_organization` read still reports `plan: free` / `tier: tier_free` for the selected organization. Organization Free status supports, but does not prove, the new project's final compute/add-on/billing state. The Product Owner previously reported selecting Data API OFF and automatic new-table exposure OFF in the draft form; automatic RLS selection at submission was not explicitly reported. Those settings require readback. Browser control again exited before showing the new project's settings.

### Applied-change ledger update

| Item | Before | Who acted and why | After / verification | Remaining uncertainty and rollback |
| --- | --- | --- | --- | --- |
| New project | Only the populated development `LabOS` project in the Free organization | Product Owner submitted `labos-verification` as the isolated synthetic verification target | Authenticated project list/get now show new ID `rvtubjrczuxdxfuazjmr` in `eu-central-1`, initially `COMING_UP`; existing `LabOS` remains `ACTIVE_HEALTHY` | Health, Nano/add-ons, Data API, automatic exposure and RLS remain to be attested. Project deletion is **not authorized** as a rollback under this task. |
| Creation cost condition | Published Free $0 plan, but no project-specific final confirmation | Product Owner reports the UI displayed no cost, pricing or paid label and submitted | No final no-charge confirmation was observed | Do not claim the pre-submit gate passed or a $0 guarantee. Read-only billing/compute evidence is needed; do not purchase or alter the project to probe. |
| Database password | No agent-known password | Product Owner selected it privately in the dashboard | Agent has not received or stored the value | Credential handling and restricted role setup remain separate later authorities. |
| Security selections | Approved OFF/OFF/OFF; draft Data API and auto-exposure OFF reported by Product Owner | Product Owner submitted the form | Actual settings not yet read back | Ask for redacted settings evidence; do not change settings without separately recorded authority. |

Current D2-S2 disposition: **CREATED_BY_PRODUCT_OWNER | VERIFICATION_PENDING**. No roles, migrations, data, Vercel secrets, R2 bucket changes or deployment have been made by this task. A1-I1 remains `BLOCKED_DECISION`; N-FILE-110 remains inactive.

### Health follow-up

A subsequent exact `get_project` read returned `ACTIVE_HEALTHY` for `rvtubjrczuxdxfuazjmr`. Name, selected organization and `eu-central-1` remained unchanged. This verifies project initialization/health at the provider metadata level. It does not verify Nano compute, add-ons/billing, Data API, automatic table exposure or automatic RLS.

## Continued read-only verification (2026-10-09)

A fresh authenticated `list_projects` and `get_organization` read again showed exactly two projects in the selected Free organization: historical `LabOS` (`mvpyqnxwndigrijzsiow`) and new `labos-verification` (`rvtubjrczuxdxfuazjmr`), both `ACTIVE_HEALTHY` in `eu-central-1`. This verifies the new project remains healthy and the existing development project remains listed and healthy. The provider metadata available through this connector still does not expose compute class, add-ons, Data API, automatic table exposure or automatic RLS settings.

One unauthenticated read-only GET to the new project's REST root returned HTTP 401 with a missing-API-key classification. The gateway rejects before this can establish whether the Data API is enabled, so the result is **INCONCLUSIVE**, not a disabled-API proof. No table/data query or authenticated API request was made; response headers and cookies are not retained in evidence.

The in-app browser control process again exited before returning dashboard state. Readback screenshots of the new project's Infrastructure/compute and Data API settings were requested from the Product Owner, with credentials, keys and connection strings hidden. Exact Nano/add-on/billing, Data API, auto-exposure and RLS verification remain `NOT_RUN` pending that evidence. No settings were changed by the agent.

An independent V3 review of the post-create runtime/checkpoint reconciliation was dispatched but the reviewer hit its account usage limit before producing a verdict. Therefore post-create independent review is **NOT_RUN**, not PASS; the earlier independent PASS applies only to the pre-submission stop. D2-S2 remains `CREATED_BY_PRODUCT_OWNER | VERIFICATION_PENDING`.

## Product Owner screenshot readback (2026-10-09)

The Product Owner supplied four post-create dashboard screenshots. Three project-specific screenshots are preserved here: [Infrastructure](d2-s2-infrastructure-20261009.png), SHA-256 `4D7E812301D7A79F0DD5DFF43E44CD4F87DF8E55437388F865794B73EDC622B0`; [compute/disk](d2-s2-compute-disk-20261009.png), SHA-256 `4DC6A614B1974D098F534CCC396253E05336FA7B029FD28CD3F63731177B7EBC`; and [Data API overview](d2-s2-data-api-20261009.png), SHA-256 `20535CFF945B44BBF7BE603AB63A8C11FF10E198BA724F25C0B8387A3172923F`. The fourth, organization billing screenshot (source SHA-256 `D72A36431EB8E15AC20DF2C09C655CDD207EAA33664C7C91570BBF130679FF9F`), is summarized below without copying its unrelated historical invoice identifiers into the repository.

| Claim | New evidence | Disposition |
| --- | --- | --- |
| New project compute and region | The Infrastructure card names `labos-verification`'s primary database, Central EU (Frankfurt), `eu-central-1` and `t3a.nano`. The compute selection shows `NANO` at `$0 / hour`; paid sizes are shown as alternatives. | **PASS — dashboard readback of Nano and region**, consistent with authenticated `get_project`. |
| Organization plan and current cost control | The billing screenshot displays `Free Plan`, `Spend cap is enabled` with text saying no extra usage charges, and `No payment methods`. Previous invoice rows shown are $0 but predate the new project. [Supabase cost-control documentation](https://supabase.com/docs/guides/platform/cost-control) says customers are not charged while on Free. | **PASS — current Free organization and Nano $0/hour readback**. This does not retroactively establish that the pre-submission confirmation condition was met, nor is it a future invoice guarantee. |
| Data API | The new project's Data API integration overview shows `Enable Data API` switched OFF and a `No schemas can be queried` warning. An `Installed` integration label also appears; the OFF switch is the operative observed state. | **PASS — Data API disabled in project dashboard**. The earlier unauthenticated HTTP 401 remains nondiagnostic and is not used for this claim. |
| Automatic new-table exposure | The Data API Overview screenshot does not display the separate Settings-tab/default-privileges control. | **NOT_VERIFIED** by these screenshots. Product Owner had reported disabling it before submission; post-create readback remains required. |
| Automatic RLS | No screenshot displays the creation selection or database-level RLS default trigger setting. | **NOT_VERIFIED** by these screenshots; Product Owner confirmation/readback remains required. |
| Paid add-ons | The Infrastructure screenshot shows no read replica and Nano compute, but the project Add-ons page is not shown. | **PARTIAL**: no paid compute or replica is evidenced; exact add-on inventory remains unverified. |

The compute/disk screenshot displays `0.25 GB used of 2 GB` and also says the plan includes `up to 1 GB of gp3 storage`. Do not equate the displayed physical disk allocation with chargeable Free-plan database size. [Supabase disk-usage documentation](https://supabase.com/docs/guides/platform/manage-your-usage/disk-size) says disk-size billing is not relevant on Free; Free projects are limited by database size. [Supabase database-size guidance](https://supabase.com/docs/guides/platform/database-size) states the Free database-size threshold is 500 MB and distinguishes database content from disk/WAL/system usage. The UI's 2 GB versus 1 GB display is recorded as an observation, not treated as proof of a paid add-on or an extra free database quota.

The `main / PRODUCTION` label in the Supabase header identifies that project's primary branch in the dashboard. It is not evidence that LabOS has activated clinical uploads, deployed to Vercel or selected this target as its future paid production environment. No new setting was changed during this readback. D2-S2 remains `CREATED_BY_PRODUCT_OWNER | VERIFICATION_PENDING` for the remaining automatic-exposure, automatic-RLS and add-on inventory checks; A1-I1 remains `BLOCKED_DECISION` and N-FILE-110 remains inactive.

## Product Owner RLS Policies screenshot readback (2026-10-09)

The Product Owner supplied the new project's [Database → Policies screenshot](d2-s2-rls-policies-20261009.png), SHA-256 `76BAFFED3C1F451090DC2769488AFF8093E97F6CD915F5A279BBCC522788DE36`. The header identifies `labos-verification`; the page offers **“Set up trigger”** for **“Automatically enable Row Level Security (RLS) on new tables”**. This is dashboard evidence that the optional automatic-RLS trigger is not presently configured, consistent with the approved OFF selection. The page also shows no tables in the selected `public` schema; this is a UI observation, not a database-wide table inventory or an SQL privilege attestation. No trigger or other setting was changed during this readback.

Automatic RLS is now **PASS — current dashboard readback of no automatic-RLS trigger**. The exact submitted form state remains historical Product Owner testimony rather than a captured final-form record. Automatic new-table exposure and the project's exact add-on inventory remain **NOT_VERIFIED**. D2-S2 remains `CREATED_BY_PRODUCT_OWNER | VERIFICATION_PENDING`; its pre-submission cost condition is not retrospectively passed.

A fresh independent V3 `CHECKPOINT` review was requested after the screenshot reconciliation, but the reviewer could not access the repository or screenshots because its terminal and computer-use tools failed during setup. No evidence-based post-create review verdict was produced; this review remains **NOT_RUN**. The earlier V3 `PASS | CHECKPOINT` still applies only to the historical pre-submission stop.

## Independent V3 screenshot-reconciliation retry (2026-10-09)

Independent read-only V3 `PASS | CHECKPOINT`. The reviewer inspected the preserved screenshots and current packet/state. It confirmed the dashboard supports Frankfurt/Nano, Data API OFF and no configured automatic-RLS trigger; automatic new-table exposure and exact add-on inventory remain `NOT_VERIFIED`; the pre-submission no-charge/no-add-on confirmation is not retrospectively passed; and the project creation is correctly attributed to the Product Owner. No material finding. The earlier reviewer tool failure remains historical `NOT_RUN`; this successful retry does not close D2-S2. Status remains `CREATED_BY_PRODUCT_OWNER | VERIFICATION_PENDING` until remaining readbacks and Product Owner reconciliation.

## Product Owner Data API/Add-ons screenshot follow-up (2026-10-09)

The Product Owner supplied a repeat [Data API Overview screenshot](d2-s2-data-api-overview-followup-20261009.png), SHA-256 `2410C2F6334103B7F60CED3EF36CC9165FF5F68BC9DDCA041389946C018D4778`, and the project's [Settings → Add-ons screenshot](d2-s2-add-ons-20261009.png), SHA-256 `1DA437152F14B404C1C5162B13593962335896B1E75223D2A174DAF0B9354562`. Both headers identify `labos-verification` in the Free organization. No provider setting was changed during this readback.

| Claim | Screenshot observation | Disposition |
| --- | --- | --- |
| Data API | The Overview tab again shows `Enable Data API` OFF and the warning that no schemas can be queried. The `Installed` label refers to the integration's presence, not an enabled REST API. | **PASS — current dashboard readback, consistent with prior screenshot.** |
| Automatically expose new tables | The first screenshot is still on **Overview**. The adjacent **Settings** tab is visible but not selected; the control/default privileges are not shown. | **NOT_VERIFIED.** Data API OFF blocks current REST querying, but does not prove the separate automatic-exposure/default-grants setting is OFF. The Product Owner reports selecting OFF before submission; a Settings-tab or authoritative default-privilege readback is still needed. |
| Project add-ons | Settings → Add-ons lists Dedicated IPv4 address, Point in time recovery and Custom domain, each marked **DISABLED**. | **PASS — no enabled add-on shown on the project's Add-ons page.** These add-ons exist as available options; none is enabled in this screenshot. |
| Integrations/Vault | The integration sidebar lists Data API and Vault. The Product Owner reports that Vault has no secrets; this screenshot does not open Vault or inspect its inventory. | Integration list **observed**; Vault-empty claim remains **Product Owner attestation**, not independent inventory. Vault contents are not needed for the D2-S2 creation-settings claim. |

D2-S2 remains `CREATED_BY_PRODUCT_OWNER | VERIFICATION_PENDING` because automatic new-table exposure is not yet independently read back and the original pre-submission cost-confirmation condition cannot be retroactively proven. The post-creation Free/Nano, no-payment-method and disabled-add-on observations constrain current cost risk but do not rewrite the original stop record. A1-I1 remains `BLOCKED_DECISION`; N-FILE-110 remains inactive.

## Data API Settings tab and read-only default-privilege inspection (2026-10-09)

The Product Owner supplied the [Data API Settings tab screenshot](d2-s2-data-api-settings-20261009.png), SHA-256 `BF0A20157BD8D481E5B56749C8F915FA8EE63D3BE5ADC65B7ED61A761A222B6C`. It identifies `labos-verification` and displays **“Data API is disabled. Enable the Data API in the Overview tab to configure settings.”** The automatic-exposure/default-privileges control is therefore hidden while Data API is OFF. No one enabled the Data API to inspect it.

To assess the underlying state without changing a setting, the agent ran a read-only `SELECT` through the connected Supabase SQL tool against project `rvtubjrczuxdxfuazjmr`. It queried only `pg_catalog.pg_default_acl` joined to `pg_catalog.pg_namespace`, filtered to `public` or global defaults; it did not access user tables, credentials or data. Six `public` default-ACL rows were returned: for grant owners `postgres` and `supabase_admin`, each has table (`r`), sequence (`S`) and function (`f`) defaults granting privileges to `anon`, `authenticated` and `service_role`. In particular, both owners' future `public` tables have `anon=arwdDxtm`, `authenticated=arwdDxtm` and `service_role=arwdDxtm` in the catalog. This is current catalog state, not proof that a table was created or that the disabled Data API can serve a request now.

[Supabase's API-route documentation](https://supabase.com/docs/guides/api/creating-routes) says default privileges for new `public` entities govern automatic grants to API roles. Its [April 2026 change notice](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically) says unchecking “Automatically expose new tables” opts out of implicit grants to `anon`/`authenticated`/`service_role`. **The observed default ACLs therefore conflict with treating the approved OFF selection as verified effective state for objects created by these owners.** They may reflect Supabase bootstrap/default behavior despite the Product Owner's reported creation-form choice; the cause has not been established. A future migration owner may have different defaults, which also remains unverified. Data API OFF currently blocks its REST surface, but it is a separate setting and must not be used as proof that default grants are absent.

**Disposition: `NOT_CONFORMING | BLOCKED_DECISION` for the approved automatic-exposure-OFF configuration.** The earlier `NOT_VERIFIED` classification is superseded by this catalog readback. D2-S2 is not ready for closure on the exact approved security configuration. No SQL grant/revoke, role, Data API, project or other provider setting was changed. The minimum next decision is whether to authorize a narrowly scoped read-only Supabase support/settings investigation and, if needed, a separately reviewed default-privilege correction for this isolated verification project. Do not enable Data API merely to reveal the hidden control; do not apply unreviewed grants or revocations. The historical pre-submission cost condition remains unproven. A1-I1 remains `BLOCKED_DECISION`; N-FILE-110 remains inactive.

## Independent V3 correction rereview (2026-10-09)

The first independent V3 `CHECKPOINT` review returned `CORRECTION_REQUIRED` because the newly observed default ACLs were more than an unverified setting. After the packet and current-state records were corrected, the same independent reviewer returned **`PASS | CHECKPOINT`**. It confirmed six `public` default-ACL rows, Supabase source support for the conflict with automatic-exposure OFF, the hidden Settings control while Data API is disabled, no provider mutation, and the active status `CREATED_BY_PRODUCT_OWNER | NOT_CONFORMING | BLOCKED_DECISION`. Historical `VERIFICATION_PENDING` wording above is dated chronology superseded by this finding. No remediation or closure was reviewed or authorized.

## Product Owner resumption and bounded correction design (2026-10-09)

The Product Owner said, “let's do the required steps to close D2-S2,” after receiving the `NOT_CONFORMING | BLOCKED_DECISION` report and the proposal for a reviewed correction. This authorizes a bounded correction of the verification project's automatic-new-table-exposure default, with a change ledger. It does not authorize changes to the populated development project, Data API activation, migrations, new roles, application deployment, or unrelated Supabase settings. D2-S2 remains open pending verified correction and Product Owner checkpoint acceptance.

Read-only target preflight against exact project `rvtubjrczuxdxfuazjmr` established `current_user=session_user=postgres`; `postgres` is not a member of provider-owned `supabase_admin`; `public` has zero relations, sequences and functions. All three `postgres` and three `supabase_admin` public default-ACL rows remain present. Deterministic MD5 of the ordered three-row `defaclobjtype:defaclacl` text is `45c0b60529769fc82a1b4a51acc771e8` for `postgres` and `d001d897595b76732a32037463326458` for `supabase_admin`. One first attempt at that read-only hash query failed due an ambiguous PostgreSQL `"char" || text` operator; adding `::text` made the read succeed. Neither query changed state.

[Supabase's current Data API security guide](https://supabase.com/docs/guides/api/securing-your-api) and [April 2026 platform change notice](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically) identify default table DML grants as the mechanism behind automatic new-table exposure and prescribe revoking them for the `postgres` creator role. [PostgreSQL's ALTER DEFAULT PRIVILEGES reference](https://www.postgresql.org/docs/current/sql-alterdefaultprivileges.html) establishes that defaults are creator-specific and do not flow from role membership. The independent read-only architecture review recommends the smallest correction for the **literal approved table setting**:

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLES
  FROM anon, authenticated, service_role;
```

This changes **future `public` tables created by `postgres` only**. It does not alter existing objects, `supabase_admin` provider defaults, sequences, functions, global defaults, Data API state or any other project. The future D1 migration/DDL owner is not yet created or selected; its default privileges require a separate target-specific provisioning gate before migration installation. Sequence/function hardening is also a separate decision, and the presence of `supabase_admin` defaults must not be described as corrected by this statement. The rollback is the exact inverse `ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated, service_role;`, followed by comparison with the captured pre-change snapshot. No rollback is planned unless verification finds a defect; rollback would restore automatic table grants.

Before executing, require independent read-only V3 review of this exact target, SQL, scope, before/after queries and rollback. After execution, verify through `pg_default_acl`/`aclexplode` that `postgres` future `public` tables grant none of the four Data API DML privileges to `anon`, `authenticated` or `service_role`; the `supabase_admin` three-row hash must remain `d001d897595b76732a32037463326458`. A single atomic server-side `DO` statement may create, inspect and drop a collision-resistant run-owned `public` table, followed by an exact absence query; do not rely on unverified connector multi-statement transaction affinity. Keep Data API OFF. Record the actual mutation, verification, and any rollback in this ledger.

### Independent pre-mutation review and immediate preflight

Independent read-only V3 `PASS | CHECKPOINT` reviewed the exact one-statement `postgres`/`public` table-DML default-privilege correction, role/target boundary, inverse rollback and required dynamic fixture. It required immediate target/hash preflight, post-change `aclexplode` validation, a collision-resistant create/inspect/drop test and exact absence. It confirmed the latest Product Owner resumption authorizes this single project-only correction; no broader provider or schema change follows from that authority.

Immediately before the planned change, authenticated `get_project` returned `labos-verification`, exact ID `rvtubjrczuxdxfuazjmr`, Free-organization ID `utgohlyguhmucektadda`, `eu-central-1`, `ACTIVE_HEALTHY`. A read-only SQL preflight returned `current_user=session_user=postgres`, zero `public` catalog classes, zero `public` functions, `postgres` default-ACL MD5 `45c0b60529769fc82a1b4a51acc771e8`, and `supabase_admin` MD5 `d001d897595b76732a32037463326458`, matching the captured baseline. No project/database mutation occurred during preflight.

## Applied default-privilege correction and fixture status (2026-10-09)

After the independent V3 pre-mutation `PASS | CHECKPOINT` and exact target/hash recheck, the agent used the authenticated Supabase SQL tool on **only** project `rvtubjrczuxdxfuazjmr` (`labos-verification`) to execute the one reviewed statement:

```sql
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE SELECT, INSERT, UPDATE, DELETE ON TABLES
  FROM anon, authenticated, service_role;
```

**Why:** the approved “Automatically expose new tables: OFF” configuration was not effective for future `public` tables created by `postgres`. **Effect:** future `postgres`-created `public` tables no longer receive those four DML privileges for the three Data API roles. This is a default-privilege configuration change, not a Prisma migration, existing-table change, Data API activation, role creation or change to the development project. **Rollback if separately required:** the exact inverse `GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO anon, authenticated, service_role` for `ROLE postgres IN SCHEMA public`, with before/after ACL comparison. No rollback was executed because the intended correction verified successfully.

The connector returned success. A fresh read-only `pg_default_acl`/`aclexplode` check found **zero** `SELECT`, `INSERT`, `UPDATE` or `DELETE` default grants to `anon`, `authenticated` or `service_role` on future `postgres`-created `public` tables. The table default ACL now reads `{postgres=arwdDxtm/postgres,anon=Dxtm/postgres,authenticated=Dxtm/postgres,service_role=Dxtm/postgres}`; the ordered three-row `postgres` hash changed from `45c0b60529769fc82a1b4a51acc771e8` to `117a51c6ab50fd81219012d3f0ca6b0f`. The provider-owned `supabase_admin` hash remained exactly `d001d897595b76732a32037463326458`. Residual non-DML table privileges, sequence/function defaults and the future D1 migration owner's defaults were not changed or claimed solved.

A first single-statement server-side `DO` probe for exact run-owned name `public.d2_s2_probe_4a020eb6c7134f079873de26ce756922` lost its connector response with `Invalid or expired requestState`. Direct follow-up found that exact name absent, zero `public` classes and no active matching session. The outcome of that attempted probe is **AMBIGUOUS**, not a PASS; exact absence is established.

A second collision-resistant run-owned probe, `public.d2_s2_probe_cd76c657492e491f99ea6cd24f93f064`, was then created successfully as `postgres`. Direct `has_table_privilege` reads confirmed **false** for SELECT, INSERT, UPDATE and DELETE for each of `anon`, `authenticated` and `service_role` (12/12 denials). This proves the corrected default's behavior for an actual newly created table. The probe was empty: direct row count `0`.

The connector's exact `DROP TABLE public.d2_s2_probe_cd76c657492e491f99ea6cd24f93f064` request lost its response with `Invalid or expired requestState`. Direct resolution found that the table **still exists**, has zero rows, and is the sole `public` catalog class. No active session holds a lock on it. A later direct read confirmed it still exists, has zero rows, the target project remains `ACTIVE_HEALTHY`, the corrected default-DML grant count remains zero, and the `supabase_admin` hash is unchanged. The agent did **not** mark cleanup successful or retry by disguising the DROP through dynamic SQL; the in-app browser control also failed to start. The Product Owner has been asked to execute only that exact DROP in the `labos-verification` SQL Editor. Until authoritative exact absence is established, D2-S2 remains **OPEN | FIXTURE_CLEANUP_BLOCKED** and cannot close, despite the successful privilege correction and probe. No other database object, account setting, credential, role, or project was changed.

## Product Owner fixture cleanup and independent absence (2026-10-09)

The Product Owner replied **“done”** to the request to run the exact `DROP TABLE public.d2_s2_probe_cd76c657492e491f99ea6cd24f93f064;` in the `labos-verification` SQL Editor. This is Product Owner-reported execution; the agent did not use a different SQL path or touch the development project. The reason was removal of the empty run-owned privilege-test fixture left after the connector's ambiguous DROP result. The change is irreversible only for that empty synthetic table; no application or clinical data was present.

An independent read-only SQL query against exact project `rvtubjrczuxdxfuazjmr` then established both run-owned probe names absent, **zero** `public` catalog classes, **zero** `public` functions, and continued zero `postgres` default table DML grants to `anon`/`authenticated`/`service_role`. The provider-owned `supabase_admin` default-ACL hash remained `d001d897595b76732a32037463326458`. Thus exact run-owned database fixture cleanup is **PASS**. The previous `OPEN | FIXTURE_CLEANUP_BLOCKED` state above is resolved, not erased from history.

D2-S2 is now **IMPLEMENTED | VERIFYING**, pending independent V3 post-change runtime/checkpoint review and Product Owner acceptance. The original pre-submission no-charge/no-add-on confirmation remains unproven; current Free/Nano, disabled add-ons and no-payment-method observations are post-creation evidence only. Future migration-owner defaults, sequences/functions and `supabase_admin` provider defaults remain separate provisioning boundaries. Data API remains OFF in the latest dashboard screenshot; it was never enabled in this task.

A fresh post-cleanup authenticated `get_project` read returned `labos-verification` (`rvtubjrczuxdxfuazjmr`) in `eu-central-1` as `ACTIVE_HEALTHY`. The first independent post-change V3 `RUNTIME_EVIDENCE + CHECKPOINT` review had returned `CORRECTION_REQUIRED` while the second probe still existed and current-state docs were stale. Both conditions were resolved later: Product Owner exact DROP plus direct absence/zero-public-object checks, and current-state reconciliation to `IMPLEMENTED | VERIFYING`. A new independent rereview was requested; the first review remains historical failure evidence.

## Independent V3 post-change rereview and Product Owner gate (2026-10-09)

Independent read-only V3 rereview returned **`PASS | RUNTIME_EVIDENCE + CHECKPOINT`** after the Product Owner's exact probe cleanup and current-state reconciliation. The reviewer confirmed the corrected `postgres`/`public` default table-DML grant count is zero for all three Data API roles, `supabase_admin` defaults are unchanged, the actual probe showed 12/12 DML denials, both probe names and every `public` class/function are absent, and the project is `ACTIVE_HEALTHY`. No material defect or unauthorized scope widening remained. The earlier `CORRECTION_REQUIRED` review is preserved above as the accurate result before fixture cleanup and documentation correction.

D2-S2 is **`VERIFYING | V3 PASS | PRODUCT_OWNER_REVIEW_PENDING`**. The runtime correction and exact cleanup have passed, but only the Product Owner can accept the checkpoint and explicitly disposition the unproven historical pre-submission no-charge/no-add-on confirmation. Future migration-owner default privileges, provider-managed `supabase_admin`, sequence/function defaults, Data API enablement, roles/migrations/deployment and R2 isolation remain separate gates. No further provider change is authorized or needed for the reviewed D2-S2 table-exposure correction.

## Product Owner acceptance and closure (2026-10-09)

The Product Owner explicitly answered **“Accept D2-S2 with limitations”** after reviewing the proposed `CLOSED | PASS CHECKPOINT` disposition, independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`, exact fixture cleanup, current Free/Nano/no-enabled-add-on evidence, and the historical limitation that final no-charge/no-add-on confirmation was not shown before the Product Owner's submission. The Product Owner also accepted that future migration-owner privileges are a separate gate.

Primary reconciliation: **D2-S2 `CLOSED | PASS CHECKPOINT | ACCEPTED_WITH_LIMITATIONS`**. The accepted result is the isolated healthy `labos-verification` project with Data API OFF, no automatic-RLS trigger, disabled listed add-ons, and the verified `postgres`/`public` future-table DML default-grant correction. No run-owned `public` object remains. This does not attest future billing, a future distinct migration owner, provider-owned `supabase_admin` defaults, sequences/functions, restricted application role compatibility, migration installation, Vercel integration, R2 isolation, or deployment. The earlier STOP, ambiguous connector results and failed/corrected reviews remain historical evidence, not rewritten as an uninterrupted PASS. No further provider mutation accompanied closure.
