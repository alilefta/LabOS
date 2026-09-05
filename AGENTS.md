# LabOS contributor router

Read [docs/current.md](docs/current.md) first. Preserve dirty-worktree changes and make no application, schema, migration, generated-output, provider, or configuration changes unless the task explicitly authorizes them.

## Documentation authority

1. This file.
2. [Current state](docs/current.md) and [roadmap](docs/roadmap.md).
3. [Architecture](docs/architecture/overview.md), relevant module/integration, and [decisions](docs/architecture/decisions.md).
4. Exact active plan and boundary inventory.
5. Reference and backlog material.

Evidence and archive are opt-in historical context; neither is a default reading path or authority for current behavior.

## Route by task

| Work | Read next |
| --- | --- |
| UploadThing/file authorization | [file plan](docs/plans/authorization-v1/files.md), [Files architecture](docs/architecture/modules/files.md), [Authorization architecture](docs/architecture/modules/authorization.md), exact boundary/decision |
| Protected action, page, or API | Authorization architecture and exact [boundary row](docs/plans/authorization-v1/boundaries.md) |
| Financial work | [financial plan](docs/plans/authorization-v1/financials.md) and exact financial boundary |
| Tenant/membership work | Organizations architecture, Staff-member integration, and applicable decision |
| Architecture change | Overview, relevant module, decisions, platform plan |
| Ordinary UI | Current task/backlog and relevant source; load authorization only for sensitive data or commands |

## Security and tenancy invariants

- Authorize before loaders, repositories, Prisma, prefetch, hydration, providers, logging, or domain work.
- Resolve tenancy from authenticated session, active Organization, verified Member, and Organization-linked Lab. Never trust caller-supplied tenant, role, membership, ownership, or resource facts.
- Permissions are explicit fixed bundles, not a hierarchy. Trusted server projectors produce identifier-only targets and closed operation intents. Missing or malformed authorization data fails closed.
- Client visibility is usability, never authorization. Use explicit safe DTOs and never leak internal auth, tokens, financial, or sensitive data through client boundaries.
- Cross-tenant targets deny before domain work and must not disclose existence.
- Revalidate mutable invariants transactionally; do not invent migrations, constraints, permissions, provider behavior, or pending decisions.

## Verification and discipline

Run focused tests and lint for changed boundaries, then proportionate broader checks; compare repository-wide failures with the quality baseline. Keep documentation, implementation, tests, and checkpoint records synchronized when implementation is authorized. Do not treat legacy code or archive material as new precedent.
