# Authorization V1 migration inventory

**Status:** In progress — mechanical baseline complete; membership/access critical slice approved
**Branch:** `feat/platform-authorization-core`
**Mechanical baseline:** `authorization-v1-legacy-action-baseline.md`
**Architecture:** `../architecture/platform-modules/authorization_module/architecture.md`
**Last reconciled:** 2026-08-22

## Purpose

This is the reviewed control record for migrating every protected server boundary. The generated baseline proves what legacy metadata exists; this document records what each operation means under Authorization V1. A boundary is not ready to migrate until its permission, trusted scope, target, required policies, sensitivity, behavior difference, tests, and rollback are explicit.

## Current coverage

| Boundary set | Discovered | Classified | Enforced | Notes |
|---|---:|---:|---:|---|
| Legacy safe-action declarations | 131 | 4 approved | 0 | First membership/access slice classified below |
| Better Auth Organization mutation endpoints | 12 | 12 in review | 0 | Catch-all exposure requires an explicit product-gate strategy |
| Route handlers | 1 initial candidate | 0 | 0 | Full route audit required |
| Server pages, data readers, and services | 28 heuristic candidates | 0 | 0 | Candidate count is not yet authoritative |
| File/download/upload boundaries | Audit pending | 0 | 0 | Must include UploadThing and asset access |
| UI-only capability consumers | Audit pending | 0 | Not applicable | Migrated only after server enforcement |

Legacy declaration reconciliation:

| Legacy value | Count |
|---|---:|
| `STAFF` | 55 |
| `ADMIN` | 52 |
| `MANAGER` | 14 |
| `OWNER` | 6 |
| `null` | 4 |
| **Total** | **131** |

## Classification contract

Each baseline ID receives one reviewed record with these fields:

| Field | Required meaning |
|---|---|
| Permission | One stable business permission or explicit `session-only`/`public` classification |
| Scope | Trusted permission definition: `organization` or `resource` |
| Target | Identifier-only target type and the authoritative source of its ID |
| Target resolver | Trusted resolver that establishes the target Organization |
| Required policies | Deterministic list; every policy must allow |
| Sensitivity | `ordinary`, `sensitive`, or `critical` |
| Legacy result | Effective old hierarchy behavior, not only the declared minimum role |
| V1 result | Explicit bundle and policy behavior |
| Difference | `none`, `LEGACY_ALLOW_V1_DENY`, or `LEGACY_DENY_V1_ALLOW` |
| Approval | Reviewer and decision reference for every intentional difference |
| Wave | Membership, financials, operations, or final cutover |
| Tests | Bundle, policy, isolation, adapter, and regression evidence |
| Rollback | Exact legacy gate restored if the slice is disabled |
| Status | `Pending`, `In review`, `Approved`, `Shadowing`, `Enforced`, or `Verified` |

Caller-supplied attributes are forbidden. If classification cannot name a trusted target resolver and typed fact loader, the boundary remains `Pending`.

## Review waves

| Wave | Baseline IDs | Count | Intended branch | Status |
|---|---|---:|---|---|
| Case and Case assets | A-010–A-028, A-106 | 20 | `feat/platform-authorization-operations` | Pending |
| Catalog and pricing | A-001–A-009, A-029–A-059, A-102–A-105, A-129–A-131 | 47 | `feat/platform-authorization-operations` | Pending |
| Clinics and Dentists | A-060–A-082 | 23 | `feat/platform-authorization-operations` | Pending |
| Invitation/onboarding session paths | A-083, A-098 | 2 | Membership/core review | Pending |
| Invoices and payments | A-084–A-097 | 14 | `feat/platform-authorization-financials` | Pending |
| Patients | A-099–A-101 | 3 | `feat/platform-authorization-operations` | Pending |
| Staff and team access | A-107–A-110, A-116, A-118–A-121, A-123–A-125, A-127–A-128 | 14 | Membership/operations | Pending |
| Payroll, compensation, and payouts | A-111–A-114, A-126 | 5 | `feat/platform-authorization-financials` | Pending |
| Team Case views and reassignment | A-115, A-117, A-122 | 3 | `feat/platform-authorization-operations` | Pending |

The ranges overlap conceptually where one action touches multiple domains. The final per-boundary record chooses one primary permission and lists all required policies; it does not grant multiple unrelated permissions merely because an action performs too much. Over-broad actions should be split before enforcement.

## Problems discovered during extraction

| ID | Evidence | Problem | Required resolution | Status |
|---|---|---|---|---|
| AUTHZ-INV-001 | A-014 and A-106 | Case readers declare `requiredLabRole: null`; null does not prove they are public. | Inspect their client and tenant/resource checks; classify as `case.read` or deliberately session-only with evidence. | Open |
| AUTHZ-INV-002 | A-061 | Staff currently passes the legacy gate for complete Clinic creation, while the approved V1 matrix denies Staff creation. | Record and approve `LEGACY_ALLOW_V1_DENY`, or revise the bundle after product review. | Open |
| AUTHZ-INV-003 | A-107 versus A-123 | Two actions named `Register-New-Lab-Staff-Action` have different legacy minimum roles. | Inspect behavior, rename action identifiers, and decide whether one path is obsolete or differently scoped. | Open |
| AUTHZ-INV-004 | A-014, A-017, A-064–A-074, and other list/detail reads | One permission may cover both collections and individual resources, but trusted resource requirements cannot be optional. | Decide whether to add explicit `.list` permissions or typed collection targets before freezing definitions. | Open |
| AUTHZ-INV-005 | A-071 and financial dashboard readers | Current vocabulary does not clearly distinguish Clinic revenue/aggregate access from ordinary Clinic reads. | Add a reviewed financial aggregate permission or map to an existing financial permission with a typed query policy. | Open |
| AUTHZ-INV-006 | A-026–A-027 | Case asset upload/removal combines Case authorization with file lifecycle concerns. | Define the Case permission and future Files-module boundary without allowing either check to substitute for the other. | Open |
| AUTHZ-INV-007 | Duplicate action names in generated baseline | Telemetry keyed only by `actionName` can collide. | Use stable boundary ID plus source/correlation metadata during migration. | Open |
| AUTHZ-INV-008 | `app/api/auth/[...all]/route.ts` | Better Auth Organization mutation endpoints are reachable through the catch-all route, so callers can bypass LabOS wrappers while still passing Better Auth rules. | Before enforcement, deny direct product mutations or intercept them with a V1 gate; invitee acceptance/rejection and active-Organization switching remain deliberate exceptions. | Open — critical |
| AUTHZ-INV-009 | `platform/auth/organization-access.ts` | Better Auth Manager currently has Member create/update/delete and Invitation create/cancel, while the approved V1 Manager bundle has no access administration. | Preserve during shadow mode, then remove those Better Auth Manager grants in the same enforcement release and prove role compatibility. | Open |
| AUTHZ-INV-010 | A-123 | Staff creation optionally creates an invitation, so one primary middleware permission cannot represent the whole command before the Staff target exists. | A-123 creates operational Staff only; A-124 separately invites against the created Staff ID. Invitation failure preserves the valid Staff-without-account record. | Resolved — approved 2026-08-22 |
| AUTHZ-INV-011 | A-123 | Staff creation accepts initial commission configuration even though Admin has Staff creation but only compensation-read authority in the proposed matrix. | Create with safe compensation defaults and use the resource-scoped compensation command separately. | Resolved — approved 2026-08-22 |
| AUTHZ-INV-012 | A-125 and Better Auth Member mutations | Installed Better Auth checks the last owner, but its observed count-then-mutate flow still requires concurrency verification. | Add concurrent removal/demotion/leave tests and retain a fail-closed application strategy if the invariant is not atomic. | Open — critical |
| AUTHZ-INV-013 | A-124/A-125 | Staff-access commands need one authoritative actor-to-target-role ceiling. | Use the approved matrix: Owner targets Admin/Manager/Staff; Admin targets Staff; Manager/Staff target nobody; Owner and self are always excluded. | Resolved — approved 2026-08-22 |

## Membership and access slice — proposed classifications

The critical membership/access slice is approved. A-083 remains session-only, A-123 is split into independent Staff/access/compensation operations, and A-124/A-125 use the approved Staff-access role-target matrix while excluding self-service and every ownership mutation.

### A-083 — Accept Organization invitation

- Source: `actions/invitations/accept-organization-invitation.ts`
- Legacy declaration: `null` on `actionClientWithSession`; authentication is required, tenant membership is not.
- Effective legacy behavior: an authenticated recipient may attempt acceptance; Better Auth validates invitation existence, pending state, expiry, and recipient identity.
- V1 classification: `session-only`, not a role permission. The invitee cannot be required to have an Organization role before membership exists.
- Trusted scope: invitation lifecycle owned by Better Auth.
- Target: opaque Better Auth Invitation ID from validated input; Better Auth loads the authoritative invitation.
- Authoritative result: the concrete Member ID and Organization ID returned by Better Auth acceptance are passed directly to the LabOS integration. LabOS must not infer or reconstruct the created membership from invitation intent.
- LabOS integrity policies after acceptance: returned Member belongs to the returned Organization; Invitation Organization maps to intent Lab; intent Staff belongs to that Lab; Staff/Member one-to-one link remains idempotent.
- Authorization composition: Better Auth acceptance authorization only. The post-accept LabStaff link is trusted integration work, not a new user privilege decision.
- Sensitivity: `critical` because it creates membership.
- V1 allowed actors: authenticated invitation recipient accepted by Better Auth.
- Difference: `none` intended.
- Failure behavior: membership remains valid if optional Staff linking fails; retained intent and monitoring drive reconciliation.
- Required tests: wrong recipient, expired/canceled/already-used invitation, foreign Organization intent, foreign Staff, duplicate acceptance, no-intent invitation, link failure reconciliation, and redacted telemetry.
- Rollback: retain the existing session action and Better Auth acceptance; disable only the explicit retry if it causes regressions while leaving the global hook/reconciliation path.
- Migration status: `Approved`; remains on the session-only client.

### A-123 — Register LabStaff with optional digital access

- Source: `actions/team/register-staff-member-action.ts`
- Legacy declaration: `ADMIN`; the hierarchy effectively allows Owner, Manager, and Admin.
- Current operation: creates operational `LabStaff`, optionally configures compensation, and optionally creates a Better Auth invitation plus Staff intent.
- Approved target operation: create only the operational Staff identity with safe compensation defaults. Access invitation and compensation become subsequent resource-scoped commands against the returned Staff ID.
- Primary V1 permission: `staff.create`.
- Primary scope: `organization`; the new Staff ID does not exist before creation.
- Primary policy: verified active Organization-to-Lab context; tenant-scoped creation; operational input validation.
- Safe compensation defaults: persist `commissionValue = 0` with a non-entitling zero-value configuration; do not inherit a Lab template or create any payable entitlement. Any non-zero or otherwise financially meaningful configuration requires the later `staff.compensation.update` operation.
- Subsequent access permission: A-124 requires `staff.access.invite` with the created Staff resource.
- Subsequent compensation permission: the compensation action requires `staff.compensation.update` with the created Staff resource.
- Better Auth composition: A-123 no longer calls Better Auth; A-124 owns the LabOS-plus-Better-Auth dual check.
- Sensitivity: `sensitive` for staff identity. The separate access and compensation commands are critical/sensitive respectively.
- V1 roles: Owner/Admin/Manager may create Staff; the later commands apply their own narrower bundles.
- Difference: role access for basic Staff creation is `none`; behavioral orchestration changes because a failed later invitation no longer deletes the valid Staff identity.
- Approval: split-command flow, safe compensation defaults, and removal of all-or-nothing invitation compensation approved on 2026-08-22.
- Required tests: role matrix, tenant-scoped creation, safe compensation defaults, no Better Auth invocation, duplicate identity behavior, downstream invitation failure preserving Staff, and sanitized PII telemetry.
- Rollback: restore the legacy Admin gate and compound all-or-nothing action; never bypass Better Auth invitation authorization.
- Migration status: `Approved`; split is required before enforcement.

### A-124 — Grant Staff system access

- Source: `actions/team/staff-settings/grant-staff-access.ts`
- Legacy declaration: `ADMIN`; the hierarchy effectively allows Owner, Manager, and Admin.
- V1 permission: `staff.access.invite`.
- Trusted scope: `resource`.
- Target: LabStaff ID from validated input.
- Target resolver: load LabStaff by ID, map its Lab to Organization, and expose only authoritative Staff/Member/Invitation state.
- Required policies: Organization boundary; active same-Lab Staff; Staff has no linked Member; requested role is known and allowed by the explicit role-assignment ceiling; pending intent is same-tenant and idempotent or safely replaceable.
- Approved role-target ceiling: Owner may invite Admin, Manager, or Staff; Admin may invite Staff only; Manager and Staff may invite nobody. This Staff-access flow never creates Owner.
- Idempotency: same Staff + same Organization + same normalized email + same role uses Better Auth `resend: true` and does not cancel/recreate. Changed email or role uses the separately authorized replacement path, which cancels only the superseded pending invitation before creating the new one.
- Better Auth composition: LabOS V1 **AND** Better Auth `invitation:create`; changed-intent replacement also requires Better Auth `invitation:cancel` under the authorized product operation.
- Sensitivity: `critical` because it grants tenant access.
- V1 roles: Owner and Admin.
- Difference: Manager changes from allow to deny: `LEGACY_ALLOW_V1_DENY`.
- Approval: Manager restriction, role-target ceiling, and absolute Owner prohibition approved on 2026-08-22.
- Required tests: full actor/grantable-role matrix, foreign/inactive/already-linked Staff, changed-intent replacement, identical idempotent resend without cancellation, dual-authority mismatch in both directions, direct catch-all bypass attempt, and telemetry redaction.
- Technical rollback: restore the legacy Admin hierarchy gate while preserving Better Auth checks and tenant/link validation.
- Rollback security implication: Manager invitation access returns temporarily, a known privilege expansion to legacy behavior that must be declared in the incident decision and monitored.
- Migration status: `Approved`.

### A-125 — Revoke Staff system access

- Source: `actions/team/staff-settings/revoke-staff-access.ts`
- Legacy declaration: `ADMIN`; the hierarchy effectively allows Owner, Manager, and Admin.
- V1 permission: `staff.access.revoke`.
- Trusted scope: `resource`.
- Target: LabStaff ID from validated input.
- Target resolver: load same-Lab Staff plus linked Member and/or pending Invitation intent; map all records to the active Organization.
- Required policies: Organization boundary; exact Staff/Member or Staff/Invitation linkage; explicit self-target denial; approved actor-to-target-role ceiling; pending invitation belongs to the same Organization.
- Approved self-target rule: deny every actor from using the Staff-administration command on themselves. Future self-service departure belongs to the distinct `membership.leave` flow and does not weaken this policy.
- Better Auth composition: LabOS V1 **AND** Better Auth `member:delete` for active access or `invitation:cancel` for pending access.
- Owner handling: the policy may observe that the linked Member is an Owner only to deny the operation. A-125 never removes or demotes an Owner, including when one Owner targets another.
- Mutation order: revoke Better Auth access first, then verify/unlink Staff; partial unlink failure remains reconciliation work and never restores access implicitly.
- Sensitivity: `critical` because it removes tenant access.
- V1 roles: Owner and Admin, subject to owner policies.
- Difference: Manager changes from allow to deny: `LEGACY_ALLOW_V1_DENY`.
- Product boundary: A-125 manages access associated with a LabStaff resource only. Generic `membership.remove` remains a separate Member-targeted operation for owners/admins without LabStaff records, and must also defer Owner mutation to an explicit ownership operation.
- Approval: Manager restriction, self-target denial, role-target ceiling, and Owner-target denial approved on 2026-08-22.
- Required tests: full actor/target-role matrix, self-target, every Owner target denied, foreign Staff/Member/Invitation, pending invite cancellation, partial unlink, other-Organization preservation, direct catch-all bypass attempt, and sanitized telemetry.
- Technical rollback: restore the legacy action hierarchy gate only; Better Auth authorization, ownership safeguards, and tenant validation remain mandatory.
- Rollback security implication: Manager revocation access returns temporarily, a known privilege expansion to legacy behavior that must be declared in the incident decision and monitored.
- Migration status: `Approved`; ownership mutation is explicitly out of scope.

### Approved shared Staff-access role-target matrix

This version-controlled policy is the single source of truth shared by A-124 and A-125. Operation-specific policies still apply in addition to this ceiling.

| Actor | Allowed target roles | Always denied |
|---|---|---|
| Owner | Admin, Manager, Staff | Owner and self |
| Admin | Staff | Owner, Admin, Manager, and self |
| Manager | None | Every target |
| Staff | None | Every target |

Do not duplicate this matrix as scattered action-level conditionals. The authorization adapter exposes one typed policy used by both commands. A-124 additionally handles invitation intent and role assignment; A-125 additionally handles existing Member/Invitation linkage and revoke-before-unlink ordering.

### Deferred ownership and self-service boundaries

These are explicit inventory records, not implicit exceptions to A-124/A-125:

| ID | Future operation | Classification | V1 status |
|---|---|---|---|
| AUTHZ-FUT-001 | `membership.leave` | Authenticated self-departure with Better Auth composition, reconciliation, and last-owner protection | Deferred; direct BA-012 remains denied until designed and concurrent behavior is proven |
| AUTHZ-FUT-002 | `membership.owner.promote` | Explicit ownership grant with separate authority, confirmation, audit, and concurrency-safe ownership invariant | Deferred; unavailable in Staff-access commands |
| AUTHZ-FUT-003 | `membership.owner.demote` | Explicit ownership removal with separate authority, confirmation, audit, and concurrency-safe last-owner invariant | Deferred; unavailable in Staff-access and generic role-update commands |

Generic `membership.remove` and `membership.role.update` deny Owner targets in Authorization V1 until these ownership operations are designed and approved. A count-then-mutate precheck is never sufficient for ownership invariants.

### Dependent boundary — A-127 Staff deactivation

`Update-Staff-Identity-Action` conditionally cancels an Invitation or removes a Member when `isActive` becomes false. Its full Staff-update classification remains in the operations wave, but its access-revocation branch must reuse the A-125 permission/policies and dual-authority adapter. `staff.update` alone cannot authorize access revocation.

## Better Auth Organization mutation surface

The catch-all route exposes the installed Organization plugin endpoints. Read-only endpoints are audited separately; the mutation surface is classified here.

| ID | Better Auth operation | Product classification | Direct catch-all policy | Required authority/status |
|---|---|---|---|---|
| BA-001 | `createOrganization` | Session onboarding/provisioning, not tenant RBAC | Deny direct product use | Trusted onboarding service plus Better Auth; linked Lab provisioning required |
| BA-002 | `updateOrganization` | Future Organization settings operation | Deny until designed | Future V1 permission **AND** Better Auth |
| BA-003 | `deleteOrganization` | Destructive operation outside Authorization V1 | Deny | Separate reviewed milestone, impact preview, backup, critical permission, and Better Auth |
| BA-004 | `setActiveOrganization` | Authenticated tenant selection | Allow through intended UI/API | Better Auth membership validation; subsequent requests use canonical TenantContext |
| BA-005 | `createInvitation` | Staff access invitation or future generic membership invitation | Deny unwrapped mutation | `staff.access.invite` with Staff target, or a future explicit membership permission, **AND** Better Auth |
| BA-006 | `cancelInvitation` | Child operation of invite replacement, revocation, or recipient lifecycle | Deny arbitrary management call | Parent V1 operation **AND** Better Auth; invitee rejection is BA-008 |
| BA-007 | `acceptInvitation` | Session-only recipient lifecycle | Allow | Better Auth recipient checks; LabOS post-accept integrity hook |
| BA-008 | `rejectInvitation` | Session-only recipient lifecycle | Allow | Better Auth recipient checks; LabOS cleanup hook |
| BA-009 | `addMember` | Bypasses current invitation and optional Staff-intent process | Deny | No V1 product flow; future explicit design required |
| BA-010 | `removeMember` | Generic membership removal or Staff access revocation | Deny unwrapped mutation | `membership.remove` or `staff.access.revoke` **AND** Better Auth, with owner invariants |
| BA-011 | `updateMemberRole` | Membership role administration | Deny until product wrapper exists | `membership.role.update` **AND** Better Auth, grantable-role and owner invariants |
| BA-012 | `leaveOrganization` | Self-service membership removal | Deny until product flow exists | Explicit self-removal policy, owner invariant, reconciliation, and Better Auth |

### Enforcement requirement for the catch-all route

Before the membership slice moves from shadow to enforcement, direct Organization mutations must not bypass the LabOS product gate. The adapter design must satisfy all of these constraints:

- Product-managed mutation endpoints run V1 and Better Auth authorization.
- Direct calls cannot forge a Staff target or trusted policy facts.
- Session-only invitation acceptance/rejection and active-Organization switching remain usable.
- Server-side wrappers continue using supported Better Auth APIs without a second public bypass.
- Missing authorization context fails closed with high-severity telemetry.
- Tests call the catch-all endpoint directly rather than assuming UI wrappers are the only callers.

The exact interception mechanism belongs to the adapters branch and must be verified against the installed Better Auth version before implementation.

### Better Auth role-configuration compatibility

Current `managerOrganizationRole` grants Member create/update/delete and Invitation create/cancel. That matches legacy hierarchy behavior but conflicts with the proposed V1 Manager role. During shadow mode it remains unchanged so divergence is measurable. In the membership enforcement release:

- Owner and Admin retain the Better Auth capabilities required by approved V1 access operations.
- Manager loses Better Auth invitation/member mutation capabilities under the approved matrix.
- Staff retains only the minimum Better Auth membership/read capabilities required by the product.
- Tests cover every V1 role against every Better Auth Organization mutation used by LabOS.
- `AuthorizationService allow / Better Auth deny` and `AuthorizationService deny / Better Auth allow` are separately observable.

## Per-boundary review template

Use this template for every baseline ID during vertical review:

```md
### A-000 — Action name

- Source:
- Legacy declaration:
- Effective legacy roles:
- V1 permission:
- Trusted scope:
- Target type and ID source:
- Target resolver:
- Required typed policies/fact loaders:
- Sensitivity:
- V1 allowed roles:
- Difference category:
- Difference approval:
- Tests:
- Rollback:
- Migration status:
```

## Non-action boundary audit

The legacy count covers safe-action metadata only. The following audit is mandatory before M4 completion:

- [ ] Enumerate every `app/api/**/route.ts` handler and classify authentication, tenant, permission, and target enforcement.
- [ ] Enumerate server pages that query tenant data directly.
- [ ] Enumerate exported `data/` readers callable outside protected actions.
- [ ] Enumerate application services that mutate tenant data directly.
- [ ] Enumerate UploadThing/file download/delete boundaries.
- [ ] Enumerate Better Auth Organization mutation wrappers.
- [ ] Enumerate jobs, webhooks, and administrative entry points; explicitly mark out-of-scope service actors.
- [ ] Enumerate UI imports of the obsolete access-control helper for later UX cutover.

## Inventory completion gate

- [x] Generator deterministically extracts literal legacy declarations.
- [x] Extracted total and role distribution reconcile to 131.
- [x] Every legacy declaration has a stable baseline ID.
- [ ] Every baseline ID has an approved semantic classification.
- [ ] Collection-versus-resource permission semantics are resolved.
- [ ] Every non-action boundary is enumerated and classified.
- [ ] Every privilege expansion has explicit approval.
- [ ] Every intentional restriction has product impact recorded.
- [ ] Generator runs in an architecture test or CI check to prevent baseline growth.
