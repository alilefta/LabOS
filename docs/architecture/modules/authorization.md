# Authorization V1 architecture

Status: Current
Authority: Canonical
Owner: Project owner
Last reviewed: 2026-09-05

Authorization V1 uses fixed, non-hierarchical Organization role bundles and explicit permissions. `StaffRoleCategory` is operational classification, never an application-access grant. Missing definitions, resolvers, facts, policies, malformed intents, and unknown roles deny by default.

Each protected boundary owns a stable ID, validated input schema, trusted projector, fixed permission, identifier-only target, and closed operation intent. Server authorization finishes before tenant Prisma, provider calls, logging, or domain work. Policies load authoritative tenant-scoped facts; caller input never selects permissions, policy, tenant, or trusted facts. Mutable business facts are revalidated transactionally.

Client capability checks mirror server decisions only. DTOs are explicit and safe for their authorized consumer. Telemetry uses server-owned allowlisted labels and excludes identity, raw roles, input, financial values, tokens, headers, and provider/database errors. Organization mutations require both LabOS authorization and Better Auth authorization/revalidation.

Rollback can restore documented legacy authority only through approved deployment control and must never disable all enforcement. Current active migration scope is [Authorization V1](../../plans/authorization-v1/README.md); approved decisions are [canonical](../decisions.md).
