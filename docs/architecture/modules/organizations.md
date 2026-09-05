# Organizations and tenancy architecture

Status: Current
Authority: Canonical
Owner: Project owner
Last reviewed: 2026-09-05

Organizations own membership, active-Organization selection, and invitation lifecycle; a Lab is linked one-to-one to an Organization and remains the domain tenant. `Member` answers account access; optional `LabStaff` answers operational identity. A Member is Organization-scoped, so one AuthUser can link to different LabStaff records across Labs.

`requireTenantContext()` is the canonical server boundary: session, active Organization, verified Member, Organization-linked Lab, then `labId`. It must succeed before tenant Prisma or domain work. Tenant cache keys include Organization/Lab context and switching invalidates tenant-specific cached state. Client-selected tenant identifiers are never trusted.

Better Auth owns invitation lifecycle. LabOS retains only tenant-aware Staff intent/bridge behavior and verifies Organization-to-Lab and Staff-to-Lab relationships. Automatic invitation email delivery is not established; copyable invitation links and an unconfigured delivery adapter remain the documented state.

Remaining cleanup and migration sequencing are in the [platform plan](../../plans/platform-migration.md); verified history is [evidence](../../evidence/authorization-v1/tenant-context-migration.md).
