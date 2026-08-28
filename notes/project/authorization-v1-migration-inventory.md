# Authorization V1 migration inventory

**Status:** In progress — mechanical baseline complete; membership/access critical slice approved
**Branch:** `feat/platform-authorization-membership`
**Mechanical baseline:** `authorization-v1-legacy-action-baseline.md`
**Architecture:** `../architecture/platform-modules/authorization_module/architecture.md`
**Last reconciled:** 2026-08-24

## Purpose

This is the reviewed control record for migrating every protected server boundary. The generated baseline proves what legacy metadata exists; this document records what each operation means under Authorization V1. A boundary is not ready to migrate until its permission, trusted scope, target, required policies, sensitivity, behavior difference, tests, and rollback are explicit.

## Current coverage

| Boundary set | Discovered | Classified | Enforced | Notes |
|---|---:|---:|---:|---|
| Legacy safe-action declarations | 131 | 4 approved | 0 | A-123/A-124/A-125 are shadowing; legacy still enforces |
| Better Auth Organization mutation endpoints | 12 | 12 in review | 0 | Catch-all exposure requires an explicit product-gate strategy |
| Route handlers | 1 initial candidate | 0 | 0 | Full route audit required |
| Server pages, data readers, and services | 28 heuristic candidates | 1 | 1 | N-001 is connected to the deployment-selected V1/rollback enforcement mode |
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
| Invoices and payments | A-084–A-097 | 14 | `feat/platform-authorization-financials` | F0 approved 2026-08-27; see `authorization-v1-financials-inventory.md` |
| Patients | A-099–A-101 | 3 | `feat/platform-authorization-operations` | Pending |
| Staff and team access | A-107–A-110, A-116, A-118–A-121, A-123–A-125, A-127–A-128 | 14 | Membership/operations | Pending |
| Payroll, compensation, and payouts | A-111–A-114, A-126 | 5 | `feat/platform-authorization-financials` | F0 approved 2026-08-27; see `authorization-v1-financials-inventory.md` |
| Team Case views and reassignment | A-115, A-117, A-122 | 3 | `feat/platform-authorization-operations` | Pending |

The ranges overlap conceptually where one action touches multiple domains. The final per-boundary record chooses one primary permission and lists all required policies; it does not grant multiple unrelated permissions merely because an action performs too much. Over-broad actions should be split before enforcement.

## Problems discovered during extraction

| ID | Evidence | Problem | Required resolution | Status |
|---|---|---|---|---|
| AUTHZ-INV-001 | A-014 and A-106 | Case readers declare `requiredLabRole: null`; null does not prove they are public. | Preserve A-014 as a stable tombstone because its source is commented out. Classify A-106 as `case.create` supporting disclosure plus `case.read` when an existing draft ID is supplied; it is never public/session-only. | Resolved — 2026-08-22 |
| AUTHZ-INV-002 | A-061 | Staff currently passes the legacy gate for complete Clinic creation, while the approved V1 matrix denies Staff creation. | Record and approve `LEGACY_ALLOW_V1_DENY`, or revise the bundle after product review. | Open |
| AUTHZ-INV-003 | A-107 versus A-123 | Two actions named `Register-New-Lab-Staff-Action` have different legacy minimum roles. | A-123 is the Team-directory operational identity command and is now named `Register-Team-Lab-Staff-Action`; A-107 remains the separate case-workflow quick-create path pending its own classification. | Resolved for identifier collision — 2026-08-25 |
| AUTHZ-INV-004 | A-014, A-017, A-064–A-074, and other list/detail reads | One permission may cover both collections and individual resources, but trusted resource requirements cannot be optional. | Use explicit `.list` for Organization-scoped collections and `.read` for identifier-targeted resources. Analytics and financial disclosures use separate list/read shapes. | Resolved — 2026-08-22 |
| AUTHZ-INV-005 | A-019, A-060, A-065–A-066, A-068, A-071, and financial dashboard readers | Financial detail/aggregate data is mixed into ordinary Case/Clinic reads. | Use `case.financials.list/read` and `clinic.financials.list/read`; composite endpoints must require both permissions or split/redact their DTO. | Resolved vocabulary; endpoint remediation open |
| AUTHZ-INV-006 | A-026–A-027 | Case asset upload/removal combines Case authorization with file lifecycle concerns. | Define the Case permission and future Files-module boundary without allowing either check to substitute for the other. | Open |
| AUTHZ-INV-007 | Duplicate action names in generated baseline | Telemetry keyed only by `actionName` can collide. | Use stable boundary ID plus source/correlation metadata during migration. | Open |
| AUTHZ-INV-008 | `app/api/auth/[...all]/route.ts` | Better Auth Organization mutation endpoints were reachable through the catch-all route, so callers could bypass LabOS wrappers while still passing Better Auth rules. | A version-pinned, default-deny HTTP registry now permits only tenant selection and recipient invitation lifecycle. Product mutations/reads, unknown endpoints, and method mismatches return 403 before Better Auth. Server-side `auth.api` wrappers remain available for dual authorization. | Resolved for direct HTTP bypass — 2026-08-25; product wrappers remain pending |
| AUTHZ-INV-009 | `platform/auth/organization-access.ts` | Better Auth Manager currently has Member create/update/delete and Invitation create/cancel, while the approved V1 Manager bundle has no access administration. | Preserve during shadow mode, then remove those Better Auth Manager grants in the same enforcement release and prove role compatibility. | Open |
| AUTHZ-INV-010 | A-123 | Staff creation optionally creates an invitation, so one primary middleware permission cannot represent the whole command before the Staff target exists. | A-123 creates operational Staff only; A-124 separately invites against the created Staff ID. Invitation failure preserves the valid Staff-without-account record. | Resolved — approved 2026-08-22 |
| AUTHZ-INV-011 | A-123 | Staff creation accepts initial commission configuration even though Admin has Staff creation but only compensation-read authority in the proposed matrix. | Create with safe compensation defaults and use the resource-scoped compensation command separately. | Resolved — approved 2026-08-22 |
| AUTHZ-INV-012 | A-125 and Better Auth Member mutations | Installed Better Auth checks the last owner, but its observed count-then-mutate flow still requires concurrency verification. | Add concurrent removal/demotion/leave tests and retain a fail-closed application strategy if the invariant is not atomic. | Open — critical |
| AUTHZ-INV-013 | A-124/A-125 | Staff-access commands need one authoritative actor-to-target-role ceiling. | Use the approved matrix: Owner targets Admin/Manager/Staff; Admin targets Staff; Manager/Staff target nobody; Owner and self are always excluded. | Resolved — approved 2026-08-22 |
| AUTHZ-INV-014 | A-060, A-065, A-066, and A-068 | Staff-visible Clinic endpoints currently disclose balances, credit limits, payments, `grandTotal`, or financial-derived analytics under ordinary read gates. | Split ordinary/operational DTOs from financial DTOs or require the corresponding financial permission in addition to the read/analytics permission. | Open — sensitive |
| AUTHZ-INV-015 | A-093 | The general Invoice list returns `publicToken` to every legacy Staff caller. A public-access token is a credential-like capability, not list data. | Remove `publicToken` from the list DTO/query. Generate or disclose public links only through a separately authorized operation with expiry and audit. | Open — critical |
| AUTHZ-INV-016 | A-118 | The Staff dossier returns compensation, membership/invitation state, invitation ID, and HR analytics under ordinary `STAFF` access. | Split the dossier. Ordinary identity requires `staff.read`; analytics requires `staff.analytics.read`; compensation requires `staff.compensation.read`; access state requires `membership.read`. Never expose an invitation identifier as a reusable token. | Open — critical |
| AUTHZ-INV-017 | Generated baseline A-014 | The regex baseline generator records a commented-out metadata block as if it were active. Removing it would renumber already-reviewed stable IDs. | Retain A-014 as a documented tombstone for V1. Replace sequential extraction with a stable manifest/AST generator in a separate inventory-maintenance change; never reuse A-014. | Open — tooling, non-runtime |
| AUTHZ-INV-018 | `staff.access.role_target` and `membership.role_assignment` | These policies require validated requested-role intent, while the generic kernel deliberately accepts no arbitrary attribute bag. | Permission-keyed discriminated operation intent is implemented. Only Staff invitation and Member role update accept their exact typed intent; missing/malformed runtime intent fails closed while policies load authoritative actor/target facts. | Resolved — 2026-08-24 |
| AUTHZ-INV-019 | A-127 `Update-Staff-Identity-Action` | Setting `isActive = false` removed a Better Auth Member or canceled an Invitation under the legacy `MANAGER` gate, bypassing the trusted A-125 boundary and conflicting with the V1 Manager restriction. | A-127 is now identity-only: its validated contract, persistence projection, and UI exclude `isActive`, and it contains no Better Auth or invitation side effects. A separate `staff.deactivate` command remains deferred and must never imply access revocation; linked access must first be revoked through A-125. | Resolved — 2026-08-25; standalone deactivation deferred |

## Read boundary classification decision

Authorization V1 uses operation-shaped read permissions. `.list` is an Organization-scoped collection/search capability; `.read` is a resource-scoped detail capability requiring an identifier-only target. Operational analytics and financial disclosure are separate because they expose materially different information.

| Boundary group | IDs | V1 classification |
|---|---|---|
| Catalog collections/lookups | A-002–A-003, A-006–A-008, A-034–A-037, A-043, A-103–A-105, A-130–A-131 | `catalog.list`; tenant-owned filters and bounded projections |
| Catalog detail/analytics | A-005, A-032, A-044, A-048–A-049, A-057 | `catalog.read` for detail; A-048 additionally `catalog.analytics.read`; trusted Catalog target type required |
| Case collections/details | A-010, A-013, A-015–A-017 | A-017 uses `case.list`; A-010 uses `case.read`; A-013/A-015 are supporting `case.create` reads; A-016 targets an existing draft under `case.update`; A-014 is a non-runtime tombstone |
| Case aggregate disclosure | A-018–A-019 | A-018 `case.analytics.read`; A-019 `case.financials.list` |
| Clinic detail/composites | A-060, A-065–A-068, A-074 | A-060 uses `clinic.analytics.read`; ordinary detail uses `clinic.read`; nested Case collections additionally require `case.list`; financial fields additionally require the applicable financial permission |
| Clinic collections/aggregates | A-069–A-073 | A-069/A-072/A-073 `clinic.list`; A-070 `clinic.analytics.list`; A-071 `clinic.financials.list` |
| Dentist collections/details | A-063–A-064, A-079 | Collections use `dentist.list` plus parent `clinic.read` when filtered by Clinic; detail uses `dentist.read` |
| Invoice collections/details | A-075, A-090–A-095 | A-075/A-093 `invoice.list`; A-092 `invoice.read`; A-090/A-094 `invoice.analytics.read`; A-091/A-095 are supporting `invoice.create` queries with trusted Clinic filters |
| Patient collections | A-100–A-101 | `patient.list` |
| Staff collections/details | A-108–A-110, A-116, A-118, A-120 | Collections use `staff.list`; A-118 ordinary identity uses `staff.read`, with sensitive sections independently gated |
| Staff analytics | A-119, A-121 | A-119 `staff.analytics.read` with Staff target; A-121 `staff.analytics.list` |
| Staff-filtered Cases | A-115, A-117 | `case.list` plus `staff.read` for the filter target; Staff actors receive only assignment-authorized rows |
| Compensation/payout reads | A-111–A-113 | `payout.list` and/or `staff.compensation.read`, plus `staff.read` for the filter target; never ordinary Staff read |
| Case creation preview | A-106 | `case.create`; if `draftCaseId` is present, also `case.read` for that draft target; minimum supporting projections only |

Rules for implementation:

- Collection filters referencing a Clinic, Staff, Patient, or other resource require that filter target to resolve inside the active Organization; a collection permission alone cannot validate an arbitrary foreign filter ID.
- Staff-scoped Case collections must obtain their assignment predicate from verified authorization context. Client-supplied staff IDs never expand visibility.
- List counts, totals, aggregates, pagination cursors, and result rows use the same authorization predicate.
- Composite endpoints call every required authorization decision before loading sensitive data, or are split so an ordinary response cannot accidentally contain protected sections.
- Public tokens, invitation identifiers, and similar bearer-like values are excluded from ordinary read/list DTOs regardless of role.

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
- Identity behavior: `LabStaff.id` remains the authoritative identity. Names and phone numbers are not deduplication keys because separate operational records for one physical person can be valid; any future person-level deduplication requires an explicit domain identity model.
- Implementation evidence: `tests/unit/actions/team/register-staff-member-action.test.ts` guards the strict input contract, tenant-scoped persistence projection, zero-value compensation, absence of Better Auth/compensating deletion, distinct telemetry name, duplicate-identity semantics, and payload-free shared logging. Boundary/service/adapter tests additionally cover targetless projection and the complete role matrix. The full suite passed with 277 tests on 2026-08-25.
- Rollback: restore the legacy Admin gate and compound all-or-nothing action; never bypass Better Auth invitation authorization.
- Migration status: `Shadow observation — 2026-08-25`; the validated A-123 contract now contains operational identity fields only, persists explicit zero-value compensation defaults, never calls Better Auth, and never deletes Staff because a later access command fails. Its trusted organization-scoped `staff.create` boundary now evaluates V1 alongside the unchanged authoritative legacy ADMIN gate.

### A-124 — Grant Staff system access

- Source: `actions/team/staff-settings/grant-staff-access.ts`
- Legacy declaration: `ADMIN`; the hierarchy effectively allows Owner, Manager, and Admin.
- V1 permission: `staff.access.invite`.
- Trusted scope: `resource`.
- Target: LabStaff ID from validated input.
- Target resolver: identifier-only LabStaff boundary lookup selects `Lab.organizationId`; the kernel compares it with the actor before policies. The separate tenant-scoped Staff-access fact loader selects only authoritative active/link/Member/Invitation state.
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
- Adapter status (2026-08-24): `staff` Organization-boundary resolver, tenant-scoped Staff facts, target/self/role-ceiling/invitation policies, exact-resend/changed-intent tests, trusted A-124 projection, legacy-authoritative comparison, and boundary-owned validated safe-action shadow client are implemented and consumed by the pilot action. Existing `createStaffOrganizationInvitation`/Better Auth handler behavior is unchanged.
- Migration status: `Shadowing`; legacy enforcement remains authoritative.

### A-125 — Revoke Staff system access

- Source: `actions/team/staff-settings/revoke-staff-access.ts`
- Legacy declaration: `ADMIN`; the hierarchy effectively allows Owner, Manager, and Admin.
- V1 permission: `staff.access.revoke`.
- Trusted scope: `resource`.
- Target: LabStaff ID from validated input.
- Target resolver: identifier-only LabStaff boundary lookup selects `Lab.organizationId`; after the kernel passes the boundary, the tenant-scoped Staff-access fact loader loads the exact Member and/or pending Invitation linkage.
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
- Adapter status (2026-08-24): `staff` Organization-boundary resolver, tenant-scoped Member/Invitation linkage facts, target/self/role-ceiling/linkage policies, Owner-target denial, trusted A-125 projection, legacy-authoritative comparison, and boundary-owned validated safe-action shadow client are implemented and consumed by the pilot action. Existing Member removal/Invitation cancellation and unlinking handler behavior is unchanged.
- Migration status: `Shadowing`; legacy enforcement remains authoritative and ownership mutation is explicitly out of scope.

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

Implementation status (2026-08-24): generic Member non-Owner and explicit self-target policies are implemented. `membership.role.update` additionally requires permission-specific requested-role intent and applies the fixed role-assignment ceiling; every requested Owner role is denied. No ownership or self-departure mutation has been enabled.

Trusted-boundary checkpoint (updated 2026-08-25): new membership operations use a separate non-legacy `M-xxx` family: M-001 `membership.read`, M-002 `membership.role.update`, M-003 `membership.remove`, and M-004 `membership.invite`. M-001/M-002/M-003 project identifier-only Member targets; M-002 additionally projects schema-validated fixed-role intent. M-004 is Organization-scoped and projects only normalized recipient email plus one non-Owner fixed role, never a Staff target, Staff linkage intent, or caller-owned tenant metadata. The authoritative adapter builds its actor only from canonical TenantContext and calls Authorization V1 `require()` with no legacy fallback. M-001 has a tenant-scoped Member-detail loader using the same bounded DTO as N-001. M-002/M-003/M-004 use a server-only dual-authority command service and dedicated V1-enforcing safe-action clients: V1 must allow before the handler, the command service revalidates V1 immediately before Better Auth, and Better Auth independently authorizes and mutates using the same request session plus an explicit Organization ID. Provider identity/Organization output is verified, and telemetry excludes Member/user IDs, emails, requested roles, invitation IDs, headers, payloads, and provider errors. M-004's role ceiling is Owner → Admin/Manager/Staff and Admin → Staff; Manager/Staff are denied and Owner can never be granted. Development alone may return a copyable invitation token while email delivery is unavailable; production returns no token.

Integration checkpoint (2026-08-25): concrete M-002/M-003/M-004 tests exercise the trusted projectors, TenantContext actor adapter, fixed bundles, Organization resolver, tenant-scoped facts, all mandatory policies, command service, and mocked provider boundary together. They cover the complete role-update and Member-only invitation actor/requested-role matrices, the complete Member-only removal actor/target-role matrix, self and Owner denial, Organization A/B isolation and switching, provider denial after V1 allow, and provider short-circuiting after V1 denial. Generic M-003 also requires `membership.unlinked_staff_target`: a Member linked to LabStaff is denied and must use A-125, preventing generic removal from bypassing the stricter Staff-access role ceiling and reconciliation path.

Runtime checkpoint (2026-08-26): the Owner M-004 allow path created a real
Member-only invitation, acceptance produced no LabStaff link, and the Owner
M-003 allow path removed that disposable Member. Both commands produced
sanitized Axiom `started`/`completed` pairs. Removing the active membership
exposed a stale session Organization loop; tenant failures now enter the
authoritative post-auth Organization resolver, which clears a stale active ID
when no memberships remain or restores/selects another valid membership.

Post-revocation runtime confirmation (2026-08-26): a removed recipient with no
remaining memberships stayed signed in and reached `/onboarding` once after
refresh. The stale active Organization was cleared and the previous
dashboard/onboarding redirect loop did not recur.

### Dependent boundary — A-127 Staff deactivation

`Update-Staff-Identity-Action` is now an identity-only operation. Its schema and UI no longer accept employment status, its mutation never writes `LabStaff.isActive`, and it has no Better Auth or invitation calls. This closes the internal A-125 bypass.

Operational deactivation remains a separate operations-wave command. It must use `staff.deactivate`, revalidate active workload at mutation time, and refuse to proceed while a Member or pending Staff invitation remains linked. Digital access must be revoked first through A-125; deactivation must not silently compose or impersonate access revocation. Reactivation also requires its own explicitly classified operation rather than overloading A-127.

## Better Auth Organization mutation surface

Audit source: installed `better-auth` **1.6.16** package code and the active LabOS plugin options on 2026-08-25. The plugin registers 21 fixed HTTP endpoints. Team endpoints are not registered because Teams are disabled; dynamic-role endpoints are not registered because dynamic access control is disabled. `addMember` exists only as a server API without a fixed HTTP path and is classified as internal-only.

| ID | Better Auth operation | Product classification | Direct catch-all policy | Required authority/status |
|---|---|---|---|---|
| BA-001 | `createOrganization` | Session onboarding/provisioning, not tenant RBAC | Deny direct product use | Trusted onboarding service plus Better Auth; linked Lab provisioning required |
| BA-002 | `updateOrganization` | Future Organization settings operation | Deny until designed | Future V1 permission **AND** Better Auth |
| BA-003 | `deleteOrganization` | Destructive operation outside Authorization V1 | Deny | Separate reviewed milestone, impact preview, backup, critical permission, and Better Auth |
| BA-004 | `setActiveOrganization` | Authenticated tenant selection | Allow through intended UI/API | Better Auth membership validation; subsequent requests use canonical TenantContext |
| BA-005 | `createInvitation` | Staff access invitation or generic Member-only invitation | Deny unwrapped mutation | `staff.access.invite` with Staff target, or `membership.invite` with no Staff intent, **AND** Better Auth |
| BA-006 | `cancelInvitation` | Child operation of invite replacement, revocation, or recipient lifecycle | Deny arbitrary management call | Parent V1 operation **AND** Better Auth; invitee rejection is BA-008 |
| BA-007 | `acceptInvitation` | Session-only recipient lifecycle | Allow | Better Auth recipient checks; LabOS post-accept integrity hook |
| BA-008 | `rejectInvitation` | Session-only recipient lifecycle | Allow | Better Auth recipient checks; LabOS cleanup hook |
| BA-009 | `addMember` | Server-only operation that bypasses the invitation and optional Staff-intent process | No fixed HTTP path; prohibit application use | No V1 product flow; future explicit design required |
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

Implementation checkpoint (2026-08-25): `platform/auth/organization-http-route-policy.ts` contains the complete version-pinned HTTP manifest, and `app/api/auth/[...all]/route.ts` evaluates both GET and POST requests before delegating to Better Auth. Unknown Organization endpoints and method mismatches deny by default. Denials emit only a stable boundary ID/reason and never log request bodies, query values, identity IDs, or provider errors. Public Organization creation is additionally disabled while the trusted server onboarding gateway remains usable; Organization deletion is disabled at the provider configuration layer.

Internal-call checkpoint (updated 2026-08-25): the repository contains approved in-process calls for onboarding, tenant selection, invitation acceptance, A-124 invitation create/replacement, and A-125 Member/invitation revocation. A-127 no longer calls Better Auth or mutates employment status, closing its former composite bypass. Standalone Staff deactivation remains unavailable until its separate `staff.deactivate` boundary and mutation-time workload/linkage invariants are implemented.

The approved internal mutation allowlist is guarded by `better-auth-organization-internal-callers.test.ts`. It pins the exact file/method pairs for onboarding (`createOrganization`, `setActiveOrganization`), recipient acceptance, Staff invitation create/cancel, A-125 Member/invitation revocation, and the M-002/M-003 dual-authority gateway. Any new direct call—including `addMember`, `leaveOrganization`, Organization update/delete, an unwrapped role/removal call, or computed `auth.api[...]` access—fails the architecture test until it is classified and routed through an approved product boundary.

### Better Auth Organization read and lifecycle HTTP surface

| Direct HTTP disposition | Endpoints | Reason |
|---|---|---|
| Allow | `GET /organization/list`, `POST /organization/set-active` | Authenticated tenant discovery/selection; Better Auth verifies membership and canonical TenantContext revalidates subsequent requests |
| Allow | `GET /organization/get-invitation`, `GET /organization/list-user-invitations`, `POST /organization/accept-invitation`, `POST /organization/reject-invitation` | Recipient-scoped invitation lifecycle; Better Auth verifies the invitation recipient and LabOS hooks perform integration cleanup/linking |
| Deny | `GET /organization/get-full-organization`, `GET /organization/list-members`, `GET /organization/list-invitations`, `GET /organization/get-active-member`, `GET /organization/get-active-member-role` | Product data reads require trusted LabOS read boundaries and bounded DTOs |
| Deny | `POST /organization/has-permission` | Better Auth capability checks cannot substitute for authoritative LabOS product authorization |
| Deny | `POST /organization/check-slug` | Organization creation is available only through the idempotent onboarding service |
| Deny | Every product mutation in BA-001–BA-006 and BA-010–BA-012 | Must execute through an approved LabOS wrapper or remain deferred |
| Deny | Unknown `/organization/*` endpoint or wrong HTTP method | Dependency upgrades and route drift fail closed until the manifest is reviewed |

### Better Auth role-configuration compatibility

Current `managerOrganizationRole` grants Member create/update/delete and Invitation create/cancel. That matches legacy hierarchy behavior but conflicts with the proposed V1 Manager role. During shadow mode it remains unchanged so divergence is measurable. In the membership enforcement release:

- Owner and Admin retain the Better Auth capabilities required by approved V1 access operations.
- Manager loses Better Auth invitation/member mutation capabilities under the approved matrix.
- Staff retains only the minimum Better Auth membership/read capabilities required by the product.
- Tests cover every V1 role against every Better Auth Organization mutation used by LabOS.
- `AuthorizationService allow / Better Auth deny` and `AuthorizationService deny / Better Auth allow` are separately observable.

Compatibility checkpoint (2026-08-25): the active shadow profile is now tested separately from an exported enforcement profile. The enforcement profile proves Owner/Admin retain invitation-create and Member update/delete, while Manager/Staff have none of those provider mutations. The runtime profile intentionally retains Manager capabilities until A-124/A-125 leave legacy-authoritative shadow mode; switching profiles earlier would break legitimate shadow requests before V1 becomes the enforcing authority.

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

### N-001 — Team & Roles Organization-member directory

- Source: `app/(main)/settings/team/page.tsx`.
- Boundary kind: server page with a tenant-scoped data reader.
- Permission: `membership.list`.
- Trusted scope: Organization collection; no resource ID or caller-supplied target.
- Permission metadata: Organization-scoped, sensitive, with no domain policy. Tenant resolution and the fixed role bundle remain mandatory.
- Legacy behavior: any authenticated user with a verified active tenant can open the real directory because legacy tenant membership remains authoritative during shadow mode.
- V1 behavior: Owner and Admin may list Organization Members; Manager and Staff receive no `membership.list` grant.
- Shadow status: dedicated server-page adapter implemented; legacy verified membership remains authoritative. Owner/Admin match allow, while Manager/Staff are expected `LEGACY_ALLOW_V1_DENY` observations.
- Data status: tenant-scoped `Member + AuthUser + optional LabStaff` repository is invoked only through the tested N-001 loader.
- Page status: `/settings/team` is a server route rendering the real immutable directory DTO; static mock users and legacy role labels were removed.
- Loader status: connected with the enforced sequence `TenantContext -> N-001 shadow -> Member repository`.
- Difference: Manager/Staff are an intentional `LEGACY_ALLOW_V1_DENY`, consistent with the approved membership authority matrix. Runtime divergence must still be observed before enforcement.
- Data contract: the reader returns an immutable, JSON-safe `Member -> AuthUser` plus optional same-Lab `LabStaff` DTO. It exposes Member ID as the only mutation target, recognized roles plus an unknown-role count, account name/email/verification/image, join time, and minimal Staff display identity. It never selects `LabUser`, `AuthUser.id`, `AuthUser.role`, `AuthUser.labId`, credentials, Staff contact/address, or compensation fields.
- Repository: `modules/labos-membership/member-directory.repository.ts` applies `Member.organizationId` and nested `LabStaff.labId` predicates from canonical TenantContext, uses bounded limit+1 pagination, and maps provider roles without returning raw unknown values.
- Status: **Connected in shadow; legacy tenant membership enforces**. The concrete service evaluates the fixed Owner/Admin bundle without a resource resolver or domain policy, while the page remains accessible under the existing tenant-member rule until rollout approval.
- Tests: registry/catalog integrity, actor roles, all comparison categories, telemetry redaction, loader ordering and short-circuit behavior, two-Organization isolation, identity states, and a source boundary test forbidding Prisma/LabUser/mock-data access from the route.
- Rollback: restore the prior tenant-only mocked page while retaining tenant validation; this removes real directory reads and shadow evidence but does not change membership data.

- [ ] Enumerate every `app/api/**/route.ts` handler and classify authentication, tenant, permission, and target enforcement.
- [ ] Enumerate server pages that query tenant data directly.
- [ ] Enumerate exported `data/` readers callable outside protected actions.
- [ ] Enumerate application services that mutate tenant data directly.
- [ ] Enumerate UploadThing/file download/delete boundaries.
- [x] Enumerate Better Auth Organization mutation wrappers and guard the exact internal caller allowlist in an architecture test.
- [ ] Enumerate jobs, webhooks, and administrative entry points; explicitly mark out-of-scope service actors.
- [ ] Enumerate UI imports of the obsolete access-control helper for later UX cutover.

## Inventory completion gate

- [x] Generator deterministically extracts literal legacy declarations.
- [x] Extracted total and role distribution reconcile to 131.
- [x] Every legacy declaration has a stable baseline ID.
- [ ] Every baseline ID has an approved semantic classification.
- [x] Collection-versus-resource permission semantics are resolved.
- [ ] Every non-action boundary is enumerated and classified.
- [ ] Every privilege expansion has explicit approval.
- [ ] Every intentional restriction has product impact recorded.
- [ ] Generator runs in an architecture test or CI check to prevent baseline growth.
