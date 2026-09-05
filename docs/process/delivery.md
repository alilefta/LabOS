# Platform migration delivery process

Status: Active
Authority: Supporting
Owner: Project owner
Last reviewed: 2026-09-05

Repository-visible status is owned by [current work](../current.md), [roadmap](../roadmap.md), and [backlog](../backlog/). A Kanban board, Trello, GitHub Projects, Linear, or Jira may support coordination, but none is authoritative for repository-visible status.

Plan work in small, reviewable vertical slices. Before implementation, identify the milestone, boundary, acceptance criteria, tenant/security impact, data disclosures, rollback, and verification. Record architecture decisions in the [decision register](../architecture/decisions.md), follow the relevant [architecture module](../architecture/overview.md), and update repository documentation from evidence.

Use optional board states such as Inbox, Needs specification, Ready, In progress, Blocked, Review, Verification, Done, and Released. Keep risks in [risks](../risks.md), unresolved product work in [backlog](../backlog/product.md), and active plans under `docs/plans/`. Sprint records are optional supporting artifacts, not a competing status source.

Verification includes focused tests/lint, tenant-isolation and authorization evidence where applicable, `git diff --check`, and an explicit comparison to the recorded quality baseline. Completed work is extracted into current architecture/decisions, evidence, roadmap, or backlog before archival.
