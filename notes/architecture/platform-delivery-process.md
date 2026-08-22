# Platform migration delivery process

## Purpose

This file defines how the migration is planned, executed, reviewed, and tracked like a real software engineering program. Architecture lives in `platform-architecture-plan.md` and `platform-modules/`; delivery state lives in the project board and sprint records.

## Recommended operating model

Use a Kanban board with two-week sprints and milestone-based releases. Trello is sufficient; GitHub Projects, Linear, or Jira can use the same structure. The board is the work-status source of truth. Repository Markdown contains durable requirements, decisions, sprint goals, and retrospectives—not duplicate live status.

### Board lists

1. **Inbox** — untriaged ideas, defects, and questions.
2. **Needs specification** — outcome is known but acceptance criteria or design is incomplete.
3. **Architecture review** — cross-module decisions awaiting an ADR or review.
4. **Ready backlog** — estimated, dependency-checked, acceptance criteria complete.
5. **Sprint backlog** — committed work for the current sprint.
6. **In progress** — actively owned; enforce a small work-in-progress limit.
7. **Blocked** — cannot progress; every card states blocker, owner, next action, and review date.
8. **Code review** — implementation and automated checks complete.
9. **Verification** — QA, security, migration rehearsal, or product acceptance.
10. **Done** — definition of done satisfied.
11. **Released** — deployed and observed in the target environment.

Do not use a separate “Problems” list. Defects are cards with a `bug` label; risks and impediments are attached to the affected work and summarized in the risk register. This keeps problems connected to ownership and resolution.

### Labels

- Module: `auth`, `organizations`, `authorization`, `events`, `audit`, `workflow`, `notifications`, `files`, `jobs`, `webhooks`, `api-keys`.
- Type: `epic`, `story`, `task`, `bug`, `spike`, `migration`, `security`, `documentation`, `technical-debt`.
- Priority: `P0-critical`, `P1-high`, `P2-normal`, `P3-later`.
- Risk: `cross-tenant`, `data-migration`, `breaking-change`, `operational`.

Use one module, one type, one priority, and any applicable risk labels per card.

## Work hierarchy

```text
Program: Reusable LabOS Platform
  Milestone: production outcome / architecture phase
    Epic: module-sized capability
      Story: user or system outcome deliverable in one sprint
        Task: implementation step, normally 0.5–2 days
```

Avoid cards that represent an entire module. If a story cannot complete in one sprint, split it vertically so each slice is testable and leaves the system safe.

## Card template

```markdown
Title: [MODULE] Outcome in imperative language

Why
Business/engineering outcome and user affected.

Scope
- Included:
- Excluded:

Acceptance criteria
- [ ] Observable behavior 1
- [ ] Observable behavior 2
- [ ] Failure/security behavior

Engineering checklist
- [ ] Architecture/module contract linked
- [ ] Tenant and authorization implications reviewed
- [ ] Schema migration and rollback considered
- [ ] Tests implemented
- [ ] Observability implemented
- [ ] Documentation updated

Dependencies
- Blocks:
- Blocked by:

Risk / problem notes
- Severity:
- Evidence:
- Mitigation or decision needed:
- Owner and review date:

Verification evidence
- PR/commit:
- Test run:
- Migration rehearsal:
- Screenshot/log/metric:
```

## Sprint cadence

### Before a sprint

- Product/technical lead orders the Ready backlog by milestone outcome and risk.
- Team refines only the next one or two sprints.
- A card is Ready only when outcome, scope, acceptance criteria, dependencies, test approach, and owner are clear.
- Reserve 15–20% capacity for defects, migration findings, and operational work.

### Sprint planning

- Choose one measurable sprint goal, not a list of unrelated tickets.
- Pull only Ready cards that support the goal.
- Confirm capacity and WIP limit; do not equate estimates with promises.
- Create `notes/project/sprints/YYYY-SNN.md` from the sprint template below.

### During a sprint

- Update the board when state changes, not at the end of the day.
- Hold a short daily check: progress toward goal, blocker, next action.
- Record architecture-changing decisions as ADRs before merging.
- Raise newly discovered scope as a new card; do not silently expand acceptance criteria.

### Review and retrospective

- Demonstrate acceptance criteria using evidence.
- Move incomplete cards back to Ready and re-plan them; do not mark partial work Done.
- Record what improved, what hurt delivery, and one or two owned process experiments.
- Review escaped defects, blocked time, and migration/tenant-safety findings.

## Milestones

Use these initial milestones, aligned to the architecture roadmap:

| Milestone | Outcome | Exit gate |
|---|---|---|
| M0 Baseline | Current behavior and risks are measurable | Isolation tests, inventory, rollback approach |
| M1 Organization foundation | Existing Labs and users map safely to Organizations/Members | Reconciled backfill, no login regression |
| M2 Tenant-context cutover | Active Organization controls Lab context | Multi-org switching and server validation |
| M3 Membership replacement | Onboarding, staff links, and invitations use the new model | No new legacy membership writes |
| M4 Authorization V1 | Permissions and policies protect migrated operations | Legacy role gates absent on covered paths |
| M5 Legacy removal | Obsolete membership schema is removable | Zero fallback usage through release window |
| M6 Events and audit | Reliable facts and generic history exist | Outbox retries and audit parity verified |
| M7 Workflow V1 | Case lifecycle uses versioned workflow | Atomic state/history/event behavior |
| M8 Notifications | Event-driven delivery is reliable | Preferences, retries, deduplication verified |
| M9 Hardening | Integrity and module boundaries are enforceable | Cross-tenant suite and operational runbooks |

Do not calendar-promise milestone dates before M0 sizing. After refinement, maintain target date, confidence (`high/medium/low`), owner, dependencies, and exit-gate status on each milestone.

## Definition of Ready

- [ ] Outcome and non-goals are explicit.
- [ ] Acceptance criteria are testable.
- [ ] Architecture document is linked.
- [ ] Dependencies and migration impact are known.
- [ ] Tenant, authorization, data, and rollback risks are assessed.
- [ ] Card is small enough for one sprint.
- [ ] An owner can start without another design meeting.

## Definition of Done

- [ ] Acceptance criteria pass.
- [ ] Unit, integration, and relevant two-tenant tests pass.
- [ ] Authorization is enforced on the server.
- [ ] Forward migration, backfill, rollback/roll-forward strategy are reviewed.
- [ ] Logs, metrics, and failure handling exist where operationally relevant.
- [ ] Security/privacy-sensitive payloads are reviewed.
- [ ] Documentation and ADRs are updated.
- [ ] Review approval is complete.
- [ ] Deployment/feature-flag plan is known.
- [ ] Verification evidence is attached to the card.

## Problem, risk, and decision tracking

Maintain three distinct records:

- **Issue/bug:** something is wrong now; track as a board card with reproduction, impact, severity, and owner.
- **Risk:** something may go wrong; record in `notes/project/risk-register.md` with probability, impact, trigger, mitigation, contingency, owner, and review date.
- **Decision:** a material architectural choice; record as an ADR with context, options, decision, consequences, and supersession link.

Blockers are not vague comments. Use: `Blocked by`, `Evidence`, `Impact`, `Decision/owner needed`, `Next action`, and `Review by`.

## Metrics that help rather than distort

Track sprint-goal success, lead/cycle time, blocked time, work-in-progress, escaped defects, migration reconciliation errors, authorization denials by reason, and cross-tenant test failures. Use story points only for team-local forecasting; never compare people by points or ticket count.

## Sprint record template

```markdown
# Sprint YYYY-SNN

Dates: YYYY-MM-DD — YYYY-MM-DD
Goal:
Milestone:
Capacity notes:

## Committed outcomes
- [ ] Card/link — owner — acceptance summary

## Risks and blockers
| Item | Impact | Owner | Next action | Review date |
|---|---|---|---|---|

## Verification
- Tests:
- Demo:
- Metrics/migration evidence:

## Review
- Goal achieved: Yes/No/Partial
- Released outcomes:
- Incomplete work and disposition:

## Retrospective
- Keep:
- Change:
- Experiment, owner, due date:
```
