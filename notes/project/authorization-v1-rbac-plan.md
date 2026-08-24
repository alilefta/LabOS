# Authorization V1 and RBAC delivery plan

**Milestone:** M4 — Authorization V1
**Status:** In progress — core and first adapter slice implemented
**Database migration:** None planned
**Architecture:** `notes/architecture/platform-modules/authorization_module/architecture.md`
**Migration inventory:** `notes/project/authorization-v1-migration-inventory.md`
**Generated legacy baseline:** `notes/project/authorization-v1-legacy-action-baseline.md`
**Pilot rollout gate:** `notes/project/authorization-v1-shadow-pilot-rollout-gate.md`

## Outcome and baseline

Replace hierarchical `LabRole` gates with one default-deny, tenant-aware evaluator using explicit permissions and fixed Better Auth Organization-role bundles. Preserve legacy enforcement until each path has parity or an approved behavior change.

The action baseline contains 131 role declarations:

| Legacy value | Count |
|---|---:|
| `STAFF` | 55 |
| `ADMIN` | 52 |
| `MANAGER` | 14 |
| `OWNER` | 6 |
| `null` | 4 |

Routes, pages, readers, services, file access, and UI-only checks still require inventory.

## Delivery rules

1. Begin implementation branches only after the platform foundation is merged to `main`.
2. New protected code uses permissions; it cannot add role comparisons, `requiredLabRole`, or obsolete access-control calls.
3. Every migrated boundary records legacy rule, V1 permission, policy, behavior difference, tests, and rollback.
4. Server enforcement precedes UI changes.
5. M4 deletes no legacy authorization file or schema field.
6. No migration is expected. If one becomes necessary, stop and request explicit approval.
7. The reusable kernel contains Organization identity only; `labId`, `staffId`, and domain facts stay in the LabOS adapter.
8. Better Auth-owned Organization mutations require both LabOS V1 and Better Auth authorization.

## Branch sequence

### 1. `feat/platform-authorization-core`

Scope: domain-independent kernel, trusted permission definitions, role normalization, explicit bundles, default-deny service, errors, monitoring, and unit tests. No behavior cutover.

Suggested commits:

1. `docs: add authorization migration inventory`
2. `feat: add permission vocabulary and fixed role bundles`
3. `feat: add authorization decision service and monitoring`
4. `test: cover authorization roles and default deny`

Exit:

- [x] Matrix approved and completely tested.
- [x] Unknown roles grant nothing.
- [x] Kernel contracts contain no `labId`, `staffId`, Prisma, or LabOS types.
- [ ] `member → staff` exists only as measured temporary compatibility.
- [x] Role-only decisions require no database query.
- [x] No consumer behavior changes.

### 2. `feat/platform-authorization-adapters`

Scope: typed target resolvers/fact loaders, fail-closed policy registry, safe-action/route/UI adapters, correlation IDs, shadow evaluation, and architecture guard.

Read-boundary decision: `.list` is Organization-scoped collection access with server-owned visibility predicates; `.read` is identifier-targeted resource access. Analytics and financial list/detail disclosures are distinct permissions. Composite endpoints require every applicable permission or split/redact their DTOs.

Exit:

- [ ] Middleware follows verified tenant resolution.
- [x] Tenant mismatch denies before domain policy.
- [x] Permission definitions—not callers—require resources and policies.
- [x] Missing required target resolver or policy denies with high-severity telemetry.
- [x] Policy composition requires every policy to allow.
- [ ] Denial prevents handler execution.
- [ ] Public/session-only actions remain distinct.
- [ ] New legacy gates fail an architecture test.

### 3. `feat/platform-authorization-membership`

Scope: enforce `staff.access.invite`, `staff.access.revoke`, `membership.read`, `membership.role.update`, and `membership.remove`. Owner targets are denied by Staff-access, generic removal, and generic role-update operations.

Policies: same Organization/Lab, explicit Staff-access self-target denial, valid staff-member linkage, and the approved shared role-target matrix. Identical Staff invitation intent uses idempotent resend; changed intent uses a separately authorized replacement path. `membership.leave`, Owner promotion, and Owner demotion/removal are deferred operations; their last-owner invariant requires concurrency-safe mutation handling or proven Better Auth enforcement before rollout.

Exit:

- [ ] Invitation, role change, revocation, and staff linkage use V1.
- [ ] Two-Organization, owner-target, explicit self-target, role-ceiling, and invitation-idempotency tests pass.
- [ ] Staff-access, generic membership removal, and generic role update deny every Owner target; deferred ownership/self-service endpoints remain unavailable.
- [ ] LabOS and Better Auth role/API authorization compatibility tests pass.
- [ ] High-risk events are audit-ready.

### 4. `feat/platform-authorization-financials`

Scope: Case financials, compensation, invoices, payments, payouts, and billing.

Exit:

- [ ] Every financial mutation has permission and tenant predicates.
- [ ] Cross-link and invoice-state policies pass.
- [ ] Logs contain no amounts or free-form notes.
- [ ] Billing ownership reacts to role change on the next request.

### 5. `feat/platform-authorization-operations`

Scope: Cases, Staff, Clinics, Dentists, Patients, and Catalog.

Exit:

- [ ] Assigned/inactive Staff policy tests pass.
- [ ] Cross-tenant related IDs are rejected.
- [ ] Catalog destructive operations are owner-only and observable.
- [ ] Remaining protected actions use permission metadata.

### 6. `refactor/platform-authorization-cutover`

Scope: remaining server boundaries, UI capability replacement, zero-runtime-legacy proof, and documentation closeout.

Exit:

- [ ] All 131 baseline declarations are migrated or classified public/session-only.
- [ ] Non-action boundaries are protected.
- [ ] Both divergence directions are classified and every privilege expansion is approved.
- [ ] Role hierarchy, compatibility mapping, and obsolete access control have zero runtime consumers.
- [ ] Legacy artifacts remain for M5 removal.

## Master checklist

### Inventory and design

- [ ] Generate a machine-readable server-boundary inventory.
- [ ] Assign permission, trusted scope, target type/ID source, required policies, sensitivity, and owner.
- [ ] Record intentional behavior changes for approval.
- [ ] Review the role matrix with product/security stakeholders.

### Kernel and policies

- [x] Implement literal permissions and immutable role bundles.
- [x] Normalize multiple/unknown Better Auth roles safely; temporary `member` compatibility remains outside the kernel.
- [x] Implement typed decisions, errors, `can`, `require`, and non-authoritative `roleCapabilities`.
- [x] Implement a trusted permission-definition and required-policy registry.
- [x] Define the complete LabOS permission catalog with trusted scope, target types, required policy IDs, and sensitivity.
- [ ] Implement identifier-only targets plus typed target resolvers and policy-owned fact loaders. Staff/Member Organization-boundary resolvers and membership/Staff-access loaders are complete; remaining resource families are pending.
- [ ] Implement Organization boundary, assigned-Case, Staff-target, membership/owner, role-assignment ceiling, financial, and draft-state policies. Organization boundary plus membership/Staff-access target, self, role-ceiling, invitation, linkage, and non-Owner policies are complete; Case/financial/draft policies remain pending.
- [ ] Require transaction-time revalidation for critical mutable invariants.

### Adapters and cutover

- [x] Add a database-free `TenantContext` → `AuthorizationActor` adapter with no LabOS facts or compatibility aliases.
- [x] Compose the server-only LabOS service from the reviewed permission slice, fixed bundles, Staff/Member resolvers, policies, typed operation intent, and sanitized monitoring.
- [x] Add the trusted A-124/A-125 action-boundary registry and validated-input target/operation projectors.
- [x] Add the legacy-authoritative A-124/A-125 shadow coordinator with four-way divergence classification and contained V1 failures.
- [x] Add a separate permission-aware safe-action shadow client with boundary-owned schemas and post-validation middleware; action consumption remains pending.
- [ ] Add route and UI adapters.
- [ ] Freeze the legacy baseline in an architecture test.
- [x] Add separate `LEGACY_ALLOW_V1_DENY` and `LEGACY_DENY_V1_ALLOW` telemetry for the first Staff-access slice.
- [ ] Migrate membership, finance, operations, then remaining reads/settings.
- [ ] Prove zero legacy runtime consumers without deleting files.

### Verification and monitoring

- [x] Full bundle/normalization/default-deny tests.
- [ ] Two-Organization and cross-linked-resource tests.
- [ ] Assigned/unassigned/inactive Staff tests.
- [ ] Owner/last-owner/self-target tests.
- [ ] Concurrent owner mutation tests.
- [ ] Better Auth dual-authorization compatibility tests.
- [x] Missing permission definition/target resolver/policy registration fail-closed tests.
- [ ] Adapter short-circuit and role-change tests.
- [ ] Redaction tests for patient, invitation, credential, and financial data.
- [ ] Outcome, denial, unknown-role, tenant-mismatch, divergence, and latency metrics. Sanitized per-request shadow comparison events are complete for A-124/A-125; aggregation/dashboard work remains pending.
- [ ] Temporary operational dashboard before broad enforcement.

Current validation note: the authorization test/lint scope is green. Repository-wide `tsc --noEmit` remains blocked by the previously documented Decimal DTO and missing Case work-item `addons` mismatches outside Authorization V1; no current compiler error originates under `platform/authorization`, `modules/labos-authorization`, or their tests.

Adapter checkpoint (2026-08-23): the kernel now creates a fresh fact cache per authorization evaluation. The first Prisma adapter slice implements identifier-only `staff`/`member` Organization-boundary resolution plus tenant-scoped Staff-access and membership-administration fact loaders. Queries use explicit minimal projections, facts are reused only inside one evaluation, cross-Organization targets deny before policies, and no action behavior is integrated yet.

Policy checkpoint (2026-08-24): permission-keyed operation intent, all eight required membership/Staff-access policies, the immutable Owner/Admin target ceiling, Owner/self protections, invitation/linkage integrity, and policy registration are implemented. Focused tests cover the complete invite matrix, active and pending revocation targets, malformed facts, exact resend versus replacement intent, generic Member safeguards, and one-query request-local composition. Enforcement and application-action integration remain deliberately pending.

Actor-adapter checkpoint (2026-08-24): a server-only, database-free adapter now converts canonical `TenantContext` into the generic `AuthorizationActor`. It copies only user, Member, Organization, and raw split role tokens; it never copies Lab/Staff facts or applies the temporary `member → staff` compatibility mapping. Immutable and malformed-role tests pass.

Service-composition checkpoint (2026-08-24): the concrete server-only service now derives a five-permission activation manifest from the full trusted catalog: `staff.access.invite`, `staff.access.revoke`, `membership.read`, `membership.role.update`, and `membership.remove`. It composes fixed bundles, Staff/Member resolvers, all membership/Staff-access policies, typed operation intent, request-local facts, and sanitized monitoring. Unfinished permissions, missing resolvers/policies, incorrect target types, and role denials fail closed and are tested. No action imports the runtime service yet.

Action-boundary checkpoint (2026-08-24): a private server registry now binds stable IDs A-124/A-125 to fixed permissions and schema-validated input projectors. A-124 emits only the Staff target plus typed invite role/email intent; A-125 emits only the Staff target. Client fields cannot select permissions, target types, Organizations, policies, or facts. Registry/input wiring failures use sanitized stable errors, and every registered boundary is startup-checked against the concrete service activation manifest. Safe-action metadata integration remains next.

Shadow-coordinator checkpoint (2026-08-24): validated A-124/A-125 projections can now run the unchanged legacy role decision and the concrete V1 evaluator together. Results are classified as `MATCH_ALLOW`, `MATCH_DENY`, `LEGACY_ALLOW_V1_DENY`, or `LEGACY_DENY_V1_ALLOW`, while the returned enforcement source is structurally fixed to legacy. V1 exceptions become an observable high-severity failed/deny comparison and never block legacy-allowed work; legacy evaluator failure remains sanitized and fail-closed. The approved Manager legacy-allow/V1-deny restriction is tested for both boundaries. No action middleware consumes the coordinator yet.

Shadow-telemetry checkpoint (2026-08-24): the comparison event now uses only server-owned labels and an explicit field allowlist. The boundary registry supplies action name and legacy required role; the coordinator supplies a cryptographically generated correlation ID, normalized recognized actor roles, and unknown-role count without recording raw unknown values. Target/identity/invitation IDs, emails, input, domain details, financial values, and provider/exception errors are absent by construction and redaction-tested. `LEGACY_DENY_V1_ALLOW` is high severity and carries the unique `highest` review priority; Manager's approved restriction is a lower-priority `LEGACY_ALLOW_V1_DENY` review event.

Safe-action shadow-client checkpoint (2026-08-24): `actionClientWithAuthorizationShadow(boundaryId)` is a separate selector over fully configured A-124/A-125 clients. Each boundary owns its Zod schema, trusted action metadata, actor/correlation middleware, and mandatory `useValidated()` authorization adapter, preventing schema swaps or omitted projection. The installed next-safe-action lifecycle guarantees projection occurs after validation and before the handler. Unknown boundaries fail closed with sanitized high-severity configuration telemetry; missing/throwing projectors and malformed projected intent are recorded as V1 configuration failures while the unchanged legacy role decision remains authoritative. `actionClientWithLab` itself has not been replaced.

Pilot checkpoint (2026-08-24): only A-124 Grant Staff access and A-125 Revoke Staff access now select their dedicated shadow clients. Their handler bodies and existing Better Auth invitation/member mutation calls remain unchanged. A source-level architecture guard enumerates all action consumers and fails unless the set is exactly these two; it also proves A-083 invitation acceptance and A-123 Staff creation remain outside the pilot. The pilot changes observation only—legacy allow/deny still controls handler execution.

Rollout-gate checkpoint (2026-08-24): all requested evidence is mapped in `authorization-v1-shadow-pilot-rollout-gate.md`. Additional tests prove the middleware's shared enforcement wrapper never invokes the handler after legacy denial, propagate one server correlation ID through V1 and comparison telemetry, and exercise Organization B Staff targets through both A-124/A-125 while Organization A is active. The full regression suite passes 29 files/195 tests and the complete changed authorization scope passes lint. Repository-wide lint still reports 17 errors/256 warnings and repository-wide TypeScript retains the documented unrelated DTO/mapping errors, so those baseline gates and the required runtime evidence keep enforcement blocked.

## Rollout and rollback

| Checkpoint | Evidence | Rollback |
|---|---|---|
| Core | Unit tests; no consumers | Remove unused integration |
| Shadow | Both divergence directions by action/role; privilege expansions reviewed | Disable shadow evaluation |
| Membership | Isolation, role-ceiling, invitation-idempotency, self-target, and concurrent owner-invariant tests | Restore legacy membership slice; record any restored Manager access as a known temporary privilege expansion |
| Financial | Policy/redaction tests | Restore legacy financial slice |
| Operations | Assignment/tenant tests | Restore legacy operation group |
| Full cutover | Zero runtime legacy use | Re-enable documented legacy slice |

Rollback must never disable both V1 and legacy enforcement. A rollback that restores an intentionally removed legacy capability requires explicit incident approval and enhanced monitoring because it expands privilege relative to the approved V1 policy.

## Risks

| Risk | Mitigation |
|---|---|
| Hierarchy reintroduced | Explicit sets and full matrix tests |
| Malformed roles | Known-role normalization; empty set denies |
| Default `member` silently grants Staff | Isolated measured compatibility mapping with removal gate |
| UI treated as security | Mandatory server enforcement |
| IDOR/cross-tenant IDs | Tenant policy plus tenant-scoped mutations |
| Missing policy registration | Fail closed plus high-severity telemetry |
| Authorization/mutation race | Mandatory atomic revalidation for critical invariants |
| Better Auth/product policy mismatch | Dual-allow rule and configuration compatibility tests |
| Policy query overhead | Minimal projections, request reuse, latency metrics |
| Sensitive logging | Allowlisted event schema and redaction tests |
| Big-bang regression | Vertical branches, shadow mode, per-slice rollback |
| Stale permissions | No cross-request decision cache |

## M4 completion gate

- [ ] Architecture and role matrix approved.
- [ ] Every protected server boundary inventoried.
- [ ] All covered operations use the central evaluator.
- [ ] Policy, isolation, and redaction suites pass.
- [ ] Both divergence directions are measured; privilege expansions and intentional differences are approved.
- [ ] Monitoring is operational.
- [ ] No runtime code depends on hierarchy or UI-only authorization.
- [ ] Legacy artifacts are preserved for M5.
