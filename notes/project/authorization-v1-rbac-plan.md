# Authorization V1 and RBAC delivery plan

**Milestone:** M4 — Authorization V1
**Status:** Discovery
**Database migration:** None planned
**Architecture:** `notes/architecture/platform-modules/authorization_module/architecture.md`
**Migration inventory:** `notes/project/authorization-v1-migration-inventory.md`
**Generated legacy baseline:** `notes/project/authorization-v1-legacy-action-baseline.md`

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

- [ ] Matrix approved and completely tested.
- [ ] Unknown roles grant nothing.
- [ ] Kernel contracts contain no `labId`, `staffId`, Prisma, or LabOS types.
- [ ] `member → staff` exists only as measured temporary compatibility.
- [ ] Role-only decisions require no database query.
- [ ] No consumer behavior changes.

### 2. `feat/platform-authorization-adapters`

Scope: typed target resolvers/fact loaders, fail-closed policy registry, safe-action/route/UI adapters, correlation IDs, shadow evaluation, and architecture guard.

Exit:

- [ ] Middleware follows verified tenant resolution.
- [ ] Tenant mismatch denies before domain policy.
- [ ] Permission definitions—not callers—require resources and policies.
- [ ] Missing required target resolver or policy denies with high-severity telemetry.
- [ ] Policy composition requires every policy to allow.
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

- [ ] Implement literal permissions and immutable role bundles.
- [ ] Normalize multiple/unknown Better Auth roles safely and isolate temporary `member` compatibility.
- [ ] Implement typed decisions, errors, `can`, `require`, and non-authoritative `roleCapabilities`.
- [ ] Implement a trusted permission-definition and required-policy registry.
- [ ] Implement identifier-only targets plus typed target resolvers and policy-owned fact loaders.
- [ ] Implement Organization boundary, assigned-Case, Staff-target, membership/owner, role-assignment ceiling, financial, and draft-state policies.
- [ ] Require transaction-time revalidation for critical mutable invariants.

### Adapters and cutover

- [ ] Add permission-aware safe-action middleware.
- [ ] Add route and UI adapters.
- [ ] Freeze the legacy baseline in an architecture test.
- [ ] Add separate `LEGACY_ALLOW_V1_DENY` and `LEGACY_DENY_V1_ALLOW` telemetry.
- [ ] Migrate membership, finance, operations, then remaining reads/settings.
- [ ] Prove zero legacy runtime consumers without deleting files.

### Verification and monitoring

- [ ] Full bundle/normalization/default-deny tests.
- [ ] Two-Organization and cross-linked-resource tests.
- [ ] Assigned/unassigned/inactive Staff tests.
- [ ] Owner/last-owner/self-target tests.
- [ ] Concurrent owner mutation tests.
- [ ] Better Auth dual-authorization compatibility tests.
- [ ] Missing permission definition/target resolver/policy registration fail-closed tests.
- [ ] Adapter short-circuit and role-change tests.
- [ ] Redaction tests for patient, invitation, credential, and financial data.
- [ ] Outcome, denial, unknown-role, tenant-mismatch, divergence, and latency metrics.
- [ ] Temporary operational dashboard before broad enforcement.

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
