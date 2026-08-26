# Authorization V1 shadow pilot rollout gate

**Pilot:** A-124 Grant Staff access and A-125 Revoke Staff access

**Mode:** Shadow; legacy authorization is authoritative

**Automated verification:** Pilot scope passed; repository baseline blockers remain

**Enforcement readiness:** **Blocked pending reviewed runtime evidence**

## Gate rule

Passing automated tests permits shadow observation only. It does not authorize V1 enforcement, removal of the legacy gate, Better Auth role changes, or expansion beyond A-124/A-125. Enforcement requires every runtime checklist item below to be completed and explicitly approved in this record.

## Executable evidence

| Requirement | Evidence | Status |
|---|---|---|
| TenantContext → actor conversion | `tests/unit/modules/labos-authorization/actor.test.ts` | Pass |
| Multiple and unknown roles | Actor, platform role-normalization, and authorization-service tests | Pass |
| Concrete service composition | `tests/unit/modules/labos-authorization/service.test.ts` | Pass |
| Target Organization mismatch | Authorization kernel, membership adapter, and A-124/A-125 shadow-adapter tests | Pass |
| Full Staff-access role matrix | `tests/unit/modules/labos-authorization/membership-access.policies.test.ts` | Pass |
| All four shadow categories | `tests/unit/modules/labos-authorization/shadow-evaluation.test.ts` | Pass |
| Approved Manager restriction | A-124/A-125 shadow coordinator tests | Pass |
| V1 failure cannot block legacy allow | Shadow coordinator synchronous failure-containment test | Pass |
| Legacy denial prevents handler | Shared middleware enforcement-wrapper test asserts handler is never called | Pass |
| Missing boundary is observable | Safe-action client registry test | Pass |
| Validated target/operation projection | `tests/unit/modules/labos-authorization/action-boundaries.test.ts` | Pass |
| Correlation propagation | Shadow test asserts identical generated ID reaches V1 and comparison telemetry | Pass |
| Telemetry redaction | Exact allowlist plus forbidden-value tests | Pass |
| Structured delivery and aggregation | Versioned envelope, replaceable sink, bounded series, latency/count snapshots, cardinality and delivery-failure tests | Pass locally; production provider pending |
| Better Auth calls unchanged | Pilot scope architecture test checks existing invite/cancel/revoke calls | Pass |
| A-124/A-125 two-Organization behavior | Shadow-adapter cross-Organization tests plus platform isolation suite | Pass |
| Pilot limited to two actions | `tests/unit/architecture/authorization-shadow-pilot-scope.test.ts` | Pass |
| Full regression suite | 30 files / 200 tests on 2026-08-24 | Pass |
| Pilot authorization lint | All changed action, middleware, adapter, telemetry, and gate-test files | Pass |
| Repository-wide lint | `pnpm exec eslint .` reports 17 errors and 256 warnings in pre-existing unrelated application/generated files | **Blocked** |
| Repository-wide TypeScript | Existing Decimal DTO and missing Case work-item `addons` mismatches remain; no error originates in the pilot/authorization scope | **Blocked** |

## Expected and approved divergence

| Boundary | Condition | Expected category | Explanation | Approval |
|---|---|---|---|---|
| A-124 | Manager actor | `LEGACY_ALLOW_V1_DENY` | Legacy `ADMIN` hierarchy includes Manager; V1 deliberately removes Staff-access invitation authority from Manager | Approved 2026-08-22 |
| A-125 | Manager actor | `LEGACY_ALLOW_V1_DENY` | Legacy `ADMIN` hierarchy includes Manager; V1 deliberately removes Staff-access revocation authority from Manager | Approved 2026-08-22 |
| A-124/A-125 | Target resolves to another Organization | `LEGACY_ALLOW_V1_DENY` at the authorization boundary | V1 denies before policy/mutation work; existing handlers/services retain their tenant checks during shadow | Security restriction; expected |

No `LEGACY_DENY_V1_ALLOW` result is pre-approved. Every occurrence is a possible privilege expansion, has `highest` review priority, and blocks enforcement until individually explained and approved or eliminated.

## Runtime evidence required before enforcement

- [ ] Record the observation window, environment, release/commit, and event volume.
- [ ] Connect the structured sink to durable centralized collection (or prove platform stdout ingestion), retention, and cross-instance querying.
- [ ] Reconcile comparison counts by boundary, actor role, category, and stable V1 reason.
- [ ] Review every `LEGACY_DENY_V1_ALLOW`; attach an explicit approval or remediation reference for each distinct cause.
- [ ] Confirm every `LEGACY_ALLOW_V1_DENY` matches an approved restriction or documented tenant-integrity improvement.
- [ ] Confirm no unexplained `AUTHZ_SHADOW_V1_EVALUATION_FAILED`, projector/configuration failure, missing definition/resolver/policy, or telemetry delivery failure remains.
- [ ] Sample emitted events and confirm the field allowlist contains no target/identity/Invitation IDs, email, input, patient/Staff details, financial values, or provider/exception details.
- [ ] Exercise A-124 and A-125 for the same AuthUser across two Organizations and attach results proving the inactive Organization is unchanged.
- [ ] Confirm Better Auth allowed/denied outcomes are understood alongside LabOS decisions for invite, cancel, and Member removal.
- [ ] Record product/security approval for the enforcement change and its rollback implications.
- [ ] Restore repository-wide lint and TypeScript gates to green, or establish and approve a version-controlled baseline that proves this pilot adds no violations.

## Enforcement decision

**Current decision: DO NOT ENFORCE V1 YET.**

Reason: pilot correctness and isolation evidence is green, but repository-wide lint/TypeScript gates are not green, and runtime divergence volume, infrastructure stability, telemetry sampling, two-Organization operational evidence, and Better Auth dual-authority outcomes have not yet been attached and approved.

When the gate is eventually approved, change only A-124/A-125 in a separate enforcement commit. Keep the legacy path available for immediate rollback; restoring legacy Manager access is a known privilege expansion and must be declared during rollback.

## Generic membership command gate — M-002/M-003/M-004

M-002, M-003, and M-004 are V1-authoritative operations rather than legacy
shadow migrations. Their controlled `/settings/team` surfaces are connected for
non-production provider evidence; server enforcement remains authoritative.

### Automated evidence

| Requirement | Evidence | Status |
|---|---|---|
| Trusted fixed boundary and strict schema | Membership boundary/schema tests | Pass |
| Concrete V1 service and policy composition | Membership integration suite | Pass |
| Complete M-002 actor/requested-role matrix | `tests/integration/authorization/membership-administration.integration.test.ts` | Pass |
| Complete M-003 Member-only actor/target-role matrix | Same integration suite | Pass |
| Complete M-004 actor/requested-role matrix | Same integration suite | Pass |
| Owner and self denial | Policy and integration suites | Pass |
| Linked LabStaff cannot bypass A-125 | Mandatory `membership.unlinked_staff_target` policy and integration test | Pass |
| Organization A/B mismatch and switching | Integration suite | Pass |
| V1 denial prevents provider invocation | Service and integration suites | Pass |
| Better Auth denial after V1 allow is surfaced | Integration suite | Pass with mocked provider |
| Better Auth enforcement-role compatibility | Organization role compatibility tests | Pass locally |
| Actions remain disconnected from UI | Membership action architecture test | Pass |
| Full configured regression suite | 55 files / 355 tests on 2026-08-25 | Pass |

Latest workspace-switcher regression run: 57 files / 362 tests passed on
2026-08-25. Focused switcher lint passed, and the repository TypeScript baseline
reported no error in the switcher or membership telemetry files.

Latest controlled-membership UI regression run: 58 files / 371 tests passed on
2026-08-25. Focused UI/action/policy lint passed, and the repository TypeScript
baseline reported no error in the new Team controls, UI policy, membership
actions, or telemetry files. A real Manager session rendered the directory with
no administration controls; no mutation was invoked during inspection.

Latest membership-ID validation regression run: 58 files / 377 tests passed on
2026-08-25. The membership-operation schemas now model Better Auth Member IDs
as opaque provider identifiers rather than LabOS UUIDs. Focused schema lint and
the authorization boundary tests passed. No database migration was required.

Manual UI protection evidence (2026-08-25): the signed-in Owner row rendered
both `Current account` and `Ownership is protected` with no mutation controls.
The linked Staff/Admin row retained role-update controls but replaced generic
membership removal with `Use Staff access revocation instead.` This confirms
the self-target, ownership, and A-125 routing presentation rules.

M-003 runtime evidence remains fixture-blocked. The tested Organization has no
disposable Member-only target: its only non-Owner Member is linked to
`LabStaff`, so the UI correctly withholds generic removal and directs access
revocation through A-125. No security rule will be relaxed and no Staff link
will be manually removed to manufacture a test case. Runtime M-003 verification
waited for a controlled Member-only invitation/provisioning path. M-004 now
provides that path under V1 + Better Auth dual authorization; real M-004 and
M-003 provider evidence remains pending Ali's disposable-fixture run.

M-004 automated checkpoint (2026-08-25): `membership.invite` is an
Organization-scoped, critical, policy-required permission. Its trusted schema
and boundary accept only normalized recipient email plus one non-Owner fixed
role and carry no Staff target or tenant metadata. The policy matrix permits
Owner → Admin/Manager/Staff and Admin → Staff; Manager/Staff are denied. The
command revalidates V1 before Better Auth, uses an explicit Organization ID and
session headers, and emits allowlisted M-004 command telemetry. Development may
return a one-time copy link because email delivery is not configured;
production returns no invitation token. Focused verification passed with 12
files / 97 tests plus ESLint. The complete configured regression suite then
passed with 58 files / 389 tests. Repository-wide TypeScript still reports only
the previously tracked Decimal/addon mapper and Axiom test-environment baseline
errors; no M-004 implementation file reports a compiler error.

M-004/M-003 runtime checkpoint (2026-08-26): an Owner created and copied a
development Member-only Staff-role invitation, the recipient accepted it, and
the directory showed `No operational Staff profile`. The recipient had no
administration controls; the Owner received the generic `Remove access`
control. Removal succeeded and the row disappeared. Axiom received sanitized
`started`/`completed` pairs with one correlation ID per command: M-004 provider
duration was approximately 1.05 seconds and M-003 approximately 1.55 seconds.
No recipient/Member identity, role intent, invitation ID, input, or provider
error appeared in the supplied records.

Post-removal inspection exposed a stale-active-Organization redirect loop. The
main layout now routes missing/stale membership through the existing
post-authentication Organization resolver. When no memberships remain, that
resolver clears the revoked active Organization before onboarding; one
remaining membership is restored and multiple memberships require selection.
Focused routing tests passed before the following real-session confirmation.

Real-session recovery confirmed 2026-08-26 for the zero-membership case. The
removed recipient remained authenticated, the revoked active Organization was
cleared, and refresh redirected once to `/onboarding` without a dashboard loop.
The redirect-loop defect is resolved. Multi-Organization recovery was also
confirmed 2026-08-26: after removal from active Organization A, the existing
authenticated session restored its sole remaining Organization B without
onboarding, looping, or exposing Organization A data.

The invitation authentication handoff was hardened after a real-session flow
reported an unavailable invitation when the recipient moved from sign-up to
sign-in. Both forms preserve the safe relative callback, and successful
authentication plus the invitation continuation now use document-level
navigation so the newly issued session is authoritative and cached anonymous
invitation renders cannot be reused. Focused routing coverage passes. The exact
sign-up-to-sign-in scenario passed in a real session on 2026-08-26: the original
invitation was accepted without regenerating its link, the account reached the
dashboard, Organization switching worked, and `/settings/team` remained
isolated to the active Organization. Sensitive test credentials and invitation
identifiers are intentionally excluded from this record.

The M-004 dialog now runs the same shared Zod schema before submission and
renders email errors beside the field with accessible live feedback. When a
valid address is trimmed or lower-cased, the normalized recipient is shown in
the dialog before submission; the server independently parses the same schema.
Final regression verification passed with 58 files / 391 tests. Focused ESLint
reported no change-related errors.

### Runtime evidence received — 2026-08-25 development

| Boundary | Actor | Result | Assessment |
|---|---|---|---|
| N-001 | Owner | `MATCH_ALLOW` / `ROLE_PERMISSION` | Expected pass |
| A-123 | Owner | `MATCH_ALLOW` / `ROLE_PERMISSION` | Expected pass |
| A-124 | Owner | `MATCH_ALLOW` / `POLICY_ALLOWED` | Expected pass |
| N-001 | Staff | `LEGACY_ALLOW_V1_DENY` / `AUTHZ_PERMISSION_NOT_GRANTED` | Expected V1 restriction: Staff has no Team & Roles directory permission |
| M-002 | Owner | `started` → `completed` / provider phase | Expected V1-authoritative role update; shared correlation ID and sanitized payload verified |

The supplied shadow sample contained no `LEGACY_DENY_V1_ALLOW`, unknown-role,
configuration, or evaluation-failure events. It also proved real Axiom receipt
from the configured development deployment. The M-002 Owner allow path
completed against Better Auth in approximately 1.38 seconds and refreshed the
directory row. The M-004 Owner invitation and M-003 Owner removal paths also
completed with sanitized correlated events. Admin allow, Manager/Staff denial,
provider denial, and remaining two-Organization command scenarios are pending.

The real Better Auth Organization selector was also verified with two identity
states: a single-membership account saw exactly one Organization, while an
account that owns one Organization and is Staff in another saw exactly those
two. Selecting both Organizations changed `/settings/team` to only the selected
Organization's members, and switching back restored the first tenant's rows.
No cross-tenant Team row was observed. The application shell now reuses this
same provider gateway on desktop and mobile; it performs a full navigation to
`/dashboard` after switching so tenant context and client caches are rebuilt.

Additional Staff-session evidence received 2026-08-26: a disposable Staff
actor switched between two Organizations and saw distinct tenant-scoped Team
directories. Neither directory rendered membership invitation, role-update,
or removal controls. This confirms the Staff UI-denial policy and active-tenant
presentation boundary in both Organizations; it does not replace the remaining
Admin/Manager and provider-denial command evidence.

Admin-session presentation evidence received 2026-08-26: the Admin actor could
switch between both Organizations and saw only each active tenant's directory.
The UI exposed generic invitation and the Member-only Staff target, protected
self and Owner rows, and offered only Staff as the invitation/assignment role.
This matches the approved Admin ceiling. The Admin then exercised M-004 in
Organization B: Better Auth created the development Staff invitation and Axiom
received a sanitized `started`/`completed` pair with one correlation ID and an
approximately 1.09-second provider duration. No recipient, token, requested
role, Member/user ID, input, or provider error was present. Admin M-003 removal
then passed after explicit confirmation: the disposable Member-only Staff row
disappeared, Better Auth preserved the AuthUser and its other Organization
membership, and Axiom received a sanitized correlated pair with an
approximately 1.49-second provider duration. A meaningful Admin M-002 role
transition remains pending.

The meaningful Admin M-002 fixture is now defined: a disposable Member-only
Manager in the active Organization must be changed to Staff by an Admin. A
Staff-to-Staff submission is not accepted as evidence because it does not prove
a provider role transition. The target must be non-Owner, non-self, and
unlinked to LabStaff; the Admin may assign Staff only.

Meaningful Admin M-002 evidence received 2026-08-26: an Owner invited a
disposable Member-only Manager to Organization B, the recipient accepted, and
the Admin changed that Member to Staff. The directory refreshed successfully.
Axiom received a sanitized correlated `started`/`completed` provider pair with
an approximately 1.34-second duration and no identity, role-intent, input, or
provider error fields. The Admin M-002 allow path is now verified.

Manager-session denial evidence received 2026-08-26: a real Manager session in
DentaFusion rendered no invitation, role-update, or removal controls; a Staff
target displayed `No administration permission`. No mutation was attempted.

### Required before UI connection

- [x] Approve the generic Member-only removal matrix explicitly. Owner/Admin may remove any non-Owner, non-self Member who has no LabStaff link; Manager/Staff cannot remove Members. Approved 2026-08-25.
- [ ] Exercise M-002 and M-003 against real Better Auth sessions in a non-production environment for Owner allow, Admin allow, Manager deny, Staff deny, provider deny, and two Organizations.
- [x] Route `labos.membership_administration` through the structured Axiom sink. The versioned adapter reconstructs an explicit allowlist and tests prove runtime extras containing Member IDs, roles, headers/input-equivalent data, emails, and provider errors are discarded. Runtime dataset receipt remains part of the real-session fixture task in `tasks_for_ali.md`.
- [x] Add destructive confirmation UX, clear messaging that linked Staff access must be managed through A-125, pending/error states, and N-001 cache revalidation after success.
- [x] Initially expose one fixed role in the UI while retaining the multi-role server contract. Approved 2026-08-25.
- [ ] Record product/security approval and rollback behavior.

### UI decision

**Current decision: CONNECTED FOR CONTROLLED NON-PRODUCTION EVIDENCE; PRODUCTION ROLLOUT REMAINS BLOCKED.**

The approved controls are connected to collect real-provider evidence. The
server remains authoritative and fail closed; UI visibility is convenience
only. Production rollout remains blocked on the remaining Admin/Manager/Staff
runtime matrix, provider-denial evidence, two-Organization command scenarios,
and final review. The real Owner M-002, M-003, and M-004 allow paths, sanitized
Axiom receipt, invitation authentication handoff, active-Organization data
isolation, and both zero-membership and remaining-membership post-revocation
recovery are verified.
