# Authorization module architecture

## Mission

Decide whether a verified actor may perform an operation. Permissions are the primitive; fixed roles are version-controlled bundles; resource policies provide tenant-aware contextual rules.

## Owns

- Permission vocabulary and fixed role bundles.
- `can` and `require` decision APIs.
- Resource-policy registry, denial reasons, and decision telemetry.
- Adapters for server actions, route handlers, workflows, and UI capability queries.

## Does not own

- Authentication, membership lifecycle, workflow state validity, subscriptions, or operational `StaffRoleCategory`.

## Decision contract

```ts
type AuthorizationRequest = {
  actor: ActorContext
  permission: Permission
  resource?: { type: string; id: string; labId: string; attributes?: unknown }
}
interface AuthorizationService {
  can(request: AuthorizationRequest): Promise<AuthorizationDecision>
  require(request: AuthorizationRequest): Promise<void>
}
```

Evaluation order is authentication context, active membership, role-to-permission bundle, resource tenant ownership, registered policy, deny/allow. Default is deny. UI decisions never substitute for server enforcement.

## Migration

Inventory every legacy role gate, define permissions from real operations, add fixed bundles, build service and adapters, then migrate high-risk paths first. The current `access-control` implementation is obsolete for target design but must remain until all consumers are replaced and tests prove parity.

## Testing and observability

- Table-driven tests cover every role/permission mapping.
- Two-tenant tests reject foreign resources.
- Policy tests cover assigned/unassigned staff and inactive links.
- Record decision reason, permission, resource type, and correlation ID; avoid sensitive attributes and excessive allow-event volume.

## Definition of done

- [ ] Permission vocabulary and bundle review are complete.
- [ ] All covered server operations call one evaluator.
- [ ] No covered path uses role hierarchy or direct role equality.
- [ ] Resource and cross-tenant policies pass tests.
- [ ] Sensitive denials and role changes are auditable.
