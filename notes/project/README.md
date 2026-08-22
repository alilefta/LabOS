# LabOS platform project control

This folder holds durable project-control records. Live ticket status belongs on the team board; this folder holds milestone gates, risks, sprint records, and decisions that must survive a board-tool change.

## Sources of truth

| Information | Source of truth |
|---|---|
| Architecture and module contracts | `notes/architecture/platform-architecture-plan.md` and `platform-modules/` |
| Work status, owner, priority, blockers | Trello/project board |
| Milestone exit gates | `milestones.md` |
| Program risks | `risk-register.md` |
| Sprint goal/review/retrospective | `sprints/YYYY-SNN.md` |
| Architecture decisions | ADR section in the platform plan, later individual ADR files if detail grows |

Existing feature and architecture plans outside the new platform baseline are not inputs to target design. Legacy code and documents remain untouched until migration cleanup is explicitly approved.

## Start here

1. Create the board lists and labels from [the delivery process](../architecture/platform-delivery-process.md).
2. Run M0 discovery and create one board card per inventory/test/risk outcome.
3. Refine only the first two sprints.
4. Copy `sprints/TEMPLATE.md` to the numbered sprint file at planning time.
5. Review the milestone and risk registers during every sprint review.
