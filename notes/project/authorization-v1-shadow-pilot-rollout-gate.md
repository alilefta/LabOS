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
