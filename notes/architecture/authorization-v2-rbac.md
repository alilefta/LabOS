# V2 architecture: database-managed roles and permissions

## Purpose

V2 replaces V1's fixed two-category boolean matrix with configurable, lab-scoped roles and permissions. It must preserve the same server-side authorization boundary while allowing a lab manager to assign reusable access profiles such as Case Coordinator or Finance Officer.

This is a future architecture document. Do not add these tables, screens, or migrations during P0.

## Design principles

1. **Job category and authorization are separate.** `StaffRoleCategory` describes work (Technician, Receptionist, Accountant); it does not grant product permissions.
2. **Permissions are stable application-owned keys.** Labs assign known permissions; they never invent arbitrary permission keys.
3. **Roles are reusable.** Assign a role to many users instead of managing checkboxes per person.
4. **Roles are lab-scoped.** A custom role in Lab A cannot affect Lab B.
5. **The server calculates effective permissions.** The browser receives only a safe permission snapshot for navigation/UI.
6. **No deny rules or user-level overrides in the first RBAC release.** Effective permissions are the union of assigned role permissions. This is explainable, testable, and avoids conflicting policies.
7. **Owner safety is invariant.** Every lab has at least one Owner; Owner access cannot be removed by a role edit.

## Domain model

```text
LabUser (existing membership)
  └─ LabUserRoleAssignment
       └─ LabRole
            └─ LabRolePermission
                 └─ PermissionDefinition
```

### PermissionDefinition

Global, seeded records representing product capabilities. They are defined in code/migrations and should be immutable in the UI.

```text
PermissionDefinition
  id
  key                // e.g. "cases.create"
  module             // e.g. "cases"
  description
  isSensitive        // finance, payroll, access management
```

Initial keys should build on V1 booleans:

```text
dashboard.view_management
cases.read_all
cases.read_assigned
cases.create
cases.edit_order
cases.update_assigned_status
cases.assign
cases.archive
cases.restore
clinics.manage
catalog.manage
financials.read
financials.manage
team.manage
settings.manage
billing.manage
```

### LabRole

A reusable access profile. System templates can be copied into a lab or treated as immutable platform roles; custom roles always belong to one lab.

```text
LabRole
  id
  labId?             // null only for platform-owned templates
  key?               // stable key for a system template
  name
  description
  isSystem
  isAssignable
  createdAt
  updatedAt
```

Examples: Owner, Lab Manager, Case Coordinator, Finance Officer, Production Technician.

### LabRolePermission

The many-to-many table between a role and the seeded permission catalog.

```text
LabRolePermission
  roleId
  permissionId
  primary key (roleId, permissionId)
```

### LabUserRoleAssignment

Allows a LabUser to receive one or more reusable roles. A first implementation may allow only one assignment in the UI while retaining the flexible table shape.

```text
LabUserRoleAssignment
  labUserId
  roleId
  assignedByLabUserId
  assignedAt
  primary key (labUserId, roleId)
```

## Permission evaluation

1. Authenticate the user and resolve their LabUser membership.
2. Load active role assignments for that LabUser and lab.
3. Union the permissions granted by those roles.
4. Apply non-negotiable invariants, such as Owner access and active membership.
5. Apply record predicates separately: `cases.read_assigned` also requires an assignment to the requested case.
6. Use the same evaluator in server actions, route guards, API handlers, and UI permission snapshots.

The evaluator should expose an API such as `can(user, 'cases.create')`, rather than scattering checks for role names across the application.

## Management UX

`/settings/team` becomes the V2 home for access administration:

1. View a staff member.
2. Assign a job category independently from an app-access role.
3. Select one or more named roles from templates/custom lab roles.
4. Preview the resulting effective permissions in read-only language.
5. Record who changed access, when, and what changed.

The role editor should show grouped checkboxes for a custom role only—not a per-user permission checklist. Owner, finance, payout, archive/restore, and access-management permissions require confirmation and audit logging.

## Migration from V1

1. Keep the V1 boolean helpers as an adapter.
2. Seed system roles that exactly reproduce V1 behavior:
   - Management: all current Category 1 permissions.
   - Staff: assigned-work permissions only.
   - Owner: Management plus billing ownership and Owner invariants.
3. Migrate each LabUser based on their current app role.
4. Run both evaluators in audit/log-only mode and compare results before switching enforcement.
5. Replace boolean implementation internals with the RBAC evaluator while keeping existing capability call sites stable.
6. Only then release custom-role creation to approved managers/owners.

## Required V2 tests

- Role permission union and duplicate-assignment behavior.
- Lab isolation for roles, assignments, and custom-role edits.
- Owner invariant and prevention of losing the final Owner.
- Sensitive-permission confirmation/auditing.
- Route, action, API, and UI agreement for each permission.
- Record-level checks for assigned cases and other scoped records.
- Migration parity between V1 booleans and seeded V2 roles.
