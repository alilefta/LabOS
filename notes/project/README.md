# LabOS platform project control

This folder holds durable project-control records. Live ticket status belongs on the team board; this folder holds milestone gates, risks, sprint records, and decisions that must survive a board-tool change.

## Sources of truth

| Information | Source of truth |
|---|---|
| Current implementation checkpoint | `current-checkpoint.md` |
| Architecture and module contracts | `../architecture/platform-architecture-plan.md` and `platform-modules/` |
| Work status, owner, priority, blockers | Trello/project board |
| Milestone exit gates | `milestones.md` |
| Current Authorization V1 financials delivery plan | `authorization-v1-financials-plan.md` |
| Broader Authorization V1/RBAC plan | `authorization-v1-rbac-plan.md` |
| Authorization migration inventory | `authorization-v1-migration-inventory.md` and generated legacy baseline |
| Program risks | `risk-register.md` |
| Sprint goal/review/retrospective | `sprints/YYYY-SNN.md` |
| Architecture decisions | ADR section in the platform plan, later individual ADR files if detail grows |

Existing feature and architecture plans outside the new platform baseline are not inputs to target design. Legacy code and documents remain untouched until migration cleanup is explicitly approved.

## Start here

1. Read [the current checkpoint](current-checkpoint.md) for the active branch, milestone, verified work, and next task.
2. Read the relevant plan: [Authorization V1 financials](authorization-v1-financials-plan.md) for F0–F5, or [the broader RBAC plan](authorization-v1-rbac-plan.md) for the platform-wide migration.
3. Use [the milestone register](milestones.md) for M0–M9 exit gates and cross-project status.
4. Use the financial [boundary inventory](authorization-v1-financials-inventory.md) for operation-level scope, policy, and evidence.
5. Treat [progress.md](progress.md) as append-only history, not as the onboarding entry point.
6. Review [baseline-app findings](../baseline-app/info.md) when working on product-specific behavior or UX issues.
