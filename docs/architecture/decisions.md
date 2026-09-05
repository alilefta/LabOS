# Architecture decisions

Status: Current
Authority: Canonical
Owner: LabOS maintainers
Last reviewed: 2026-09-05

This register records decisions still governing implementation. Historical approval evidence is retained separately.

## Authorization V1

Fixed, non-hierarchical organization roles are permission bundles; permissions, not role rank, are the authorization primitive. Unknown roles, malformed intent, missing definitions, resolvers, facts, or policies deny by default. LabOS authorization and Better Auth must both allow Organization mutations. Ownership mutation and `membership.leave` remain outside the reviewed approval.

Authorization V1 is approved for its reviewed scope and is verified/development-active. Production deployment is not established by repository evidence. `LABOS_AUTHORIZATION_MODE=legacy-rollback` is an emergency, security-impacting rollback and must not be used as routine testing.

## File authorization decisions

### D-FILE-01 — persisted one-time upload grants

Decision status: Approved

Use opaque, persisted, one-time grants with canonical Organization, Lab, and Member linkage. Provider keys never establish authorization. The verified callback loads the trusted grant definition; final consumption and domain mutation occur transactionally with single-use, expiry, and orphan-cleanup handling.

### D-FILE-02 — Case asset creation authority

Decision status: Approved

`case.asset.add` is the narrow Case-asset permission. Staff access requires assignment to the authoritative Case; related facts are loaded server-side.

### D-FILE-03 — Staff self-avatar endpoint

Decision status: Approved

The unused Staff self-avatar endpoint remains unavailable/deferred. It must not be inferred from broader Staff permissions.

### D-FILE-04 — stored-file read/access policy

Decision status: Pending

Catalog imagery and Case clinical assets may require different policies. URL possession is not authorization, and upload authorization does not decide read authorization. Case asset activation remains blocked where this policy is needed. Do not infer public CDN, private signed access, or another read model.

## Financial decisions awaiting work

`A-096` payment idempotency/concurrency requires an approved persistence and concurrency design before payment recording. `A-087` paid/partial Invoice void behavior remains pending refund, credit, audit, and permission semantics; it is not unpaid cancellation. Database migrations and constraints require explicit approval.

## Platform ADR register

All entries below are current approved architectural decisions unless a row says deferred. Their rationale is to preserve modular boundaries, tenant isolation, and incremental delivery; consequences are the stated binding constraints on current implementation.

| ID | Status / current applicability | Decision and consequence |
| --- | --- | --- |
| ADR-001 | Approved / current | Organization is the SaaS membership and active-tenant boundary. |
| ADR-002 | Approved / current | Lab remains the LabOS dental-business tenant entity. |
| ADR-003 | Approved / current | Tenant-owned domain tables retain `labId`. |
| ADR-004 | Approved / current | Better Auth owns identity, Organization membership, active Organization, and invitation lifecycle. |
| ADR-005 | Approved target / migration active | `LabUser` and `AuthUser.labId` are transitional and are removed only after parity. |
| ADR-006 | Approved / current | `LabStaff` is separate from membership and links tenant-aware to Member. |
| ADR-007 | Approved / current | Permissions, not role names or hierarchy, are the authorization primitive. |
| ADR-008 | Approved / current | Fixed role bundles precede dynamic/custom roles. |
| ADR-009 | Approved / current | `StaffRoleCategory` is operational, not an authorization role. |
| ADR-010 | Approved / current | Resource authorization uses typed policies after tenant and permission checks. |
| ADR-011 | Approved target / current direction | Events use an in-process interface backed by transactional outbox for reliable effects. |
| ADR-012 | Approved / current direction | Audit is append-only infrastructure distinct from events and debug logs. |
| ADR-013 | Approved target | Workflow V1 is versioned with allowlisted conditions/actions. |
| ADR-014 | Approved target | Case is the first workflow consumer; migrate its lifecycle before QC. |
| ADR-015 | Approved target | `Case.status` is initially an atomically synchronized projection. |
| ADR-016 | Approved / current | Subscription/entitlements remain separate from membership and authorization. |
| ADR-017 | Approved / current | Platform administration is separate from Organization roles and needs audited elevation. |
| ADR-018 | Approved / current | Platform remains inside the LabOS modular monolith initially. |
| ADR-019 | Approved / current | Extract only after a second application proves reuse. |
| ADR-020 | Approved target | Introduce composite tenant-aware constraints incrementally by risk. |
| ADR-021 | Deferred / current | Database-managed RBAC v2 remains deferred until fixed roles prove insufficient. |
