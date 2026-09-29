# LabOS contributor router

Read [docs/current.md](docs/current.md) first.

Preserve unrelated dirty-worktree changes.

Do not make application, schema, migration, generated-output, provider, configuration, deployment, or other environment-sensitive changes unless the active task and repository authority permit them.

## Documentation authority

1. This file.
2. [Current state](docs/current.md) and [roadmap](docs/roadmap.md).
3. [Architecture](docs/architecture/overview.md), relevant module/integration architecture, and [decisions](docs/architecture/decisions.md).
4. Exact active plan and boundary inventory.
5. Reference and backlog material.

Evidence and archive are opt-in historical context, not a default reading path or authority for current behavior.

When authorities appear to conflict, do not silently choose one. Reconcile through `.agent/workflow.md`.

## Engineering process

Full role definitions, coordination model, task lifecycle, acceptance discipline, verification requirements, and session-start reading order live in **`.agent/workflow.md`** — that file is the single source of truth for process. Do not restate or reinterpret it here.

Model-to-role assignment lives in `.codex/agents/`.

Operational state:

- `.agent/current-task.md` — the immediate authorized task, when one exists.
- `.agent/handoff.md` — the latest implementation handoff, when one exists.
- `.agent/escalation.md` — a temporary unresolved decision packet, when one exists.

`docs/current.md` is the canonical project/workstream checkpoint. Do not use it as a subtask journal. `.agent/` files are operational state and do not override canonical architecture, approved decisions, active plans, boundary inventories, or Product Owner decisions.

## Route by task

| Work                           | Read next                                                                                                                                                                                                      |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| UploadThing/file authorization | [file plan](docs/plans/authorization-v1/files.md), [Files architecture](docs/architecture/modules/files.md), [Authorization architecture](docs/architecture/modules/authorization.md), exact boundary/decision |
| Protected action, page, or API | Authorization architecture and exact [boundary row](docs/plans/authorization-v1/boundaries.md)                                                                                                                 |
| Financial work                 | [financial plan](docs/plans/authorization-v1/financials.md) and exact financial boundary                                                                                                                       |
| Tenant/membership work         | Organizations architecture, Staff-member integration, and applicable decision                                                                                                                                  |
| Architecture change            | Overview, relevant module, decisions, platform plan                                                                                                                                                            |
| Ordinary UI                    | Current task/backlog and relevant source; load authorization only for sensitive data or commands                                                                                                               |

## Security and tenancy invariants

- Authorize before loaders, repositories, Prisma, prefetch, hydration, providers, logging, or domain work.
- Resolve tenancy from authenticated session, active Organization, verified Member, and Organization-linked Lab. Never trust caller-supplied tenant, role, membership, ownership, or resource facts.
- Permissions are explicit fixed bundles, not a hierarchy. Trusted server projectors produce identifier-only targets and closed operation intents. Missing or malformed authorization data fails closed.
- Client visibility is usability, never authorization. Use explicit safe DTOs and never leak internal auth, tokens, financial, or sensitive data through client boundaries.
- Cross-tenant targets deny before domain work and must not disclose existence.
- Revalidate mutable invariants transactionally; do not invent migrations, constraints, permissions, provider behavior, or pending decisions.
