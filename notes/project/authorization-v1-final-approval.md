# Authorization V1 final approval

**Decision date:** 2026-08-27  
**Decision:** Approved for the reviewed V1 enforcement scope  
**Reviewed boundaries:** A-124, A-125, N-001, M-002, M-003, and M-004

## Product and security decision

Authorization V1 is approved as authoritative for the reviewed boundaries.
The approved business rules are:

- Owner may invite, update, or revoke Admin, Manager, and Staff access, but
  Staff-access commands cannot grant or target Owner and cannot target self.
- Admin may invite, update, or revoke Staff access only.
- Manager and Staff have no membership-administration or Team & Roles directory
  authority.
- Generic Member removal remains distinct from linked Staff access revocation.
- Tenant mismatch, unknown role, missing permission definition, missing target
  resolver, missing required policy, policy failure, and evaluation failure all
  deny by default.
- Better Auth and LabOS Authorization V1 must both allow Organization mutations.
- Ownership mutation and `membership.leave` remain outside this approval.

## Evidence reviewed

- 61 test files / 418 tests passed.
- Focused authorization and Team & Roles lint passed.
- Owner/Admin allows and Manager/Staff restrictions were verified with real
  sessions under `enforcementSource: "v1"`.
- A-124/A-125 same-tenant positive controls and cross-Organization mismatch
  denials were verified.
- N-001 directory isolation and role matrix were verified.
- M-002 role updates, M-003 removal, and M-004 invitations produced sanitized,
  correlated provider telemetry.
- M-002 changed only the intended Organization and the disposable fixture was
  restored afterward.
- The reviewed two-day Axiom window contained zero
  `LEGACY_DENY_V1_ALLOW` records and zero V1/configuration/missing-policy or
  membership-provider failure records.
- Provider telemetry was balanced: M-002 had 29 started/29 completed, M-003 had
  6/6, and M-004 had 9/9 in the reviewed window.

## Rollback decision

`LABOS_AUTHORIZATION_MODE=legacy-rollback` remains the emergency rollback.
Changing the value requires restarting every application instance. The mode
selection, legacy provider profile, action client, and non-action adapter are
covered by 29 passing focused tests.

Rollback is security-impacting: it deliberately restores the legacy Manager
privilege for Staff-access operations. Operators must record the incident,
activation time, affected instances, Axiom observation window, and the decision
to return to `v1`. The rollback path must not be activated merely as a routine
test in a shared environment.

## Deployment boundary

This approval authorizes a deployment to enable V1 for the reviewed boundaries;
it does not claim that a production deployment has occurred. Before production
traffic is enabled, operators must confirm:

- `LABOS_AUTHORIZATION_MODE=v1` on every instance;
- all instances were restarted with the same configuration;
- Axiom ingestion and the existing high-priority monitors are active;
- the version-controlled quality baseline has not regressed; and
- `legacy-rollback` remains immediately configurable.

The fixed RBAC bundles, ownership exclusions, and legacy rollback must remain
in place until a later reviewed migration explicitly replaces them.

