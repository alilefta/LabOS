# LabOS contributor router

Read [docs/current.md](docs/current.md) first. Preserve dirty-worktree changes and make no application, schema, migration, generated-output, provider, or configuration changes unless the task explicitly authorizes them.

## Documentation authority

1. This file.
2. [Current state](docs/current.md) and [roadmap](docs/roadmap.md).
3. [Architecture](docs/architecture/overview.md), relevant module/integration, and [decisions](docs/architecture/decisions.md).
4. Exact active plan and boundary inventory.
5. Reference and backlog material.

Evidence and archive are opt-in historical context; neither is a default reading path or authority for current behavior.

## Active engineering workflow

For active multi-agent engineering work, follow:

- `.agent/workflow.md` — agent roles, routing, task lifecycle, acceptance, and escalation rules.
- `.agent/current-task.md` — the immediate executable task, when one exists.
- `.agent/handoff.md` — the latest executor-to-reviewer handoff, when one exists.
- `.agent/escalation.md` — an unresolved architecture/policy decision requiring higher authority, when one exists.

`docs/current.md` remains the canonical project/workstream checkpoint. Do not use it as a subtask journal.

Agent coordination files under `.agent/` are operational working state. They do not override canonical architecture, approved decisions, active plans, or boundary inventories. Durable architecture, decisions, plans, evidence, and project status belong under `docs/` according to the repository documentation rules.

### Agent responsibilities

- **SOL — Architect / decision authority:** Resolve undefined architecture, policy, security semantics, or other high-risk design decisions. Do not invoke merely because implementation is difficult.
  **TERRA — Lead engineer / integration authority:** Reconcile repository state,
  decompose ambiguous/integration-sensitive work, own integration-sensitive
  implementation, prepare bounded task packets when needed, independently review
  executor results, and perform engineering acceptance.
- **LUNA — Bounded executor:** Implement approved, deterministic task packets, run scoped verification, and report evidence. Stop when the assigned task is complete or its specification is insufficient.
- **Product Owner:** Retains authority over product/policy choices, scope changes, and operations requiring explicit human approval.

Authority flows downward; implementation and verification evidence flow upward. An executor's completion report is not engineering acceptance.
The primary Codex session coordinates configured subagents according to `.agent/workflow.md`. Runtime orchestration does not change engineering
authority: TERRA remains responsible for integration-sensitive engineering judgment and acceptance.

### Task lifecycle and routing

The active task lifecycle is:

`READY → IN_PROGRESS → IMPLEMENTED → VERIFYING → ACCEPTED → CLOSED`

Verification may return a task to `CORRECTION_REQUIRED`. Undefined decisions move work to `BLOCKED_DECISION` until resolved by the appropriate authority.

TERRA owns task decomposition, review, acceptance, and closure. LUNA may report implementation complete but may not accept or close its parent task. Route deterministic bounded work to LUNA, cross-boundary integration and acceptance to TERRA, and genuinely undefined architecture/policy to SOL.

At session start, reconcile the current repository state before acting. Use the active task and handoff files when present, and verify their task identity, owner, and state. Do not continue an obsolete task from chat history.

The workflow commands `SESSION START`, `CONTINUE`, `REVIEW`, and `CLOSE` are defined in `.agent/workflow.md`. They do not grant permission to bypass task scope, approval gates, or repository invariants.

### Acceptance and checkpoint discipline

Implementation is not acceptance. Accept a task only after the required source review, tests, integration checks, and security invariants pass. Distinguish code-level acceptance from runtime acceptance when real database, provider, migration, browser, or deployment verification remains outstanding.

Advance `docs/current.md` only at an accepted parent-task checkpoint or when a material blocker changes the project state. Keep internal agent subtasks in `.agent/` or the relevant active plan.

Do not silently invoke SOL or resolve missing product/policy decisions. Produce a bounded escalation with the exact unresolved question, affected invariant, options, and whether other work can continue.

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

## Verification and discipline

Run focused tests and lint for changed boundaries, then proportionate broader checks; compare repository-wide failures with the quality baseline. Keep documentation, implementation, tests, and checkpoint records synchronized when implementation is authorized. Do not treat legacy code or archive material as new precedent.

Preserve unrelated dirty changes. Do not stage or commit unless explicitly authorized. Writing a migration is not permission to apply it. Environment-sensitive or destructive operations require explicit authorization for the target environment.
