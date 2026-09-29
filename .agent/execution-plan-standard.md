# LabOS Execution-plan Standard

Status: Current  
Authority: Execution-plan requirements

This standard is reusable planning machinery, not a project plan. Load it only
when substantial multi-phase planning is required. Plans belong in `docs/plans/`;
`.agent/current-task.md` remains the single immediate authorized step.

## When to use a plan

Use an execution plan for work spanning phases/sessions, several production
boundaries, authorization or tenancy architecture, persistence/migration,
compatibility/cutover, financial or transaction guarantees, multi-step provider
work, coordinated runtime verification, dependent tasks, meaningful discovery,
or rollback/reversibility. Do not use one merely because a task has many lines;
a bounded deterministic task uses `current-task.md` directly.

## Plan metadata and status

```yaml
---
plan_id: <PLAN-ID>
title: <TITLE>
status: DRAFT | ACTIVE | BLOCKED | COMPLETED | SUPERSEDED
milestone: <MILESTONE>
workstream: <WORKSTREAM>
owner: PRIMARY
created: <YYYY-MM-DD>
updated: <YYYY-MM-DD>
supersedes: <PLAN-ID | NONE>
superseded_by: <PLAN-ID | NONE>
---
```

`owner: PRIMARY` identifies workflow ownership, not a model. `DRAFT` is not
execution authority; `BLOCKED` identifies an unresolved dependency/decision;
`COMPLETED` is reconciled into canonical state; `SUPERSEDED` remains history.

## Required structure

Use the applicable sections only:

1. Goal and verified current state (separate facts, limitations, assumptions,
   and unresolved questions).
2. Scope and explicit non-scope.
3. Governing architecture/decisions and invariants (reference, do not duplicate).
4. Ordered work breakdown, dependencies, and ownership.
5. Migration/compatibility, runtime, rollout/cutover, and reversibility where relevant.
6. Claim/risk-mapped verification strategy and material risks.
7. Stop/escalation conditions and completion criteria.

Each slice may become a task but is not automatically authorized. Keep task
detail in `current-task.md`; retain durable verification evidence in
`docs/evidence/`, not in a plan.

## Progress, updates, and completion

Use concise progress such as `P1 — ACCEPTED`, `P2 — IN_PROGRESS`, or
`P3 — BLOCKED by <decision>`; do not turn plans into journals. Update only for
approved sequencing, changed verified facts, decisions, dependencies, scope,
or material risk/blocker. Do not rewrite history to make it cleaner.

At completion, retain required evidence, reconcile canonical state, mark the
plan `COMPLETED`, and keep it in `docs/plans/` while useful. Archive only when
it is superseded or no longer useful current history.
