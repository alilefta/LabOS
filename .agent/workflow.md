# LabOS Agent Engineering Workflow

Status: Current
Authority: Engineering workflow
Owner: Product Owner / Primary Engineering Session

## 1. Purpose and authority

This is the authoritative source for LabOS document routing and engineering
execution conventions. The repository is the source of truth; chat history
does not override approved repository state. Use progressive disclosure: load
only the current task, relevant plan, authority, source, tests, and evidence
needed to act safely.

The workflow preserves separate architecture, implementation, independent
review, acceptance, and closure responsibilities. It is role-based, not
model-based; model assignments live in `.codex/agents/`.

## 2. Roles

- **Product Owner** approves product/business behavior, scope changes,
  approval-sensitive architecture, destructive operations, and environment
  operations outside standing authority.
- **Primary** reconciles state, routes work, owns lifecycle, aggregate
  integration, final engineering acceptance, parent reconciliation, and
  canonical-state updates. A child completion is never acceptance.
- **Explorer** performs bounded read-heavy fact finding only.
- **Architect** is read-only and resolves genuinely unresolved material
  authorization, tenancy, transaction, persistence, financial, migration, or
  provider decisions. Do not invoke it merely because work is difficult.
- **Integrator** implements approved work requiring substantial judgment
  across sensitive/interconnected boundaries. It does not accept its work.
- **Executor** implements bounded deterministic approved work. It does not
  invent policy, architecture, or broaden scope.
- **Reviewer** is read-only, independently inspects meaningful work, and does
  not fix findings or accept work.

## 3. Reading order and operational documents

At session start, Primary reads:

```text
AGENTS.md → docs/current.md → .agent/workflow.md → .agent/current-task.md
→ relevant active plan/authority → affected source and tests
```

Read evidence or archive only for a concrete discrepancy, verification
question, or historical dependency. Preserve unrelated dirty-worktree changes.

`.agent/current-task.md` contains at most one concise immediate authorized
task and links to its plan and durable evidence. `.agent/handoff.md` and
`.agent/escalation.md`, when present, are temporary operational aids; neither
overrides architecture, decisions, plans, or Product Owner decisions.

## 4. Document ownership and artifact lifecycle

| Location | Owns |
| --- | --- |
| `.agent/` | reusable workflow machinery, templates, the planning standard, and minimal current operational state |
| `docs/plans/` | engineering and implementation plans |
| `docs/evidence/` | durable task-specific verification, audit, review, and execution evidence |
| `docs/archive/` | superseded material; not automatically completed evidence |

Create task-specific evidence directly at
`docs/evidence/<feature-or-module>/<milestone>/<task-id-or-task-name>/`.
An active runtime-verification packet belongs there from creation; it is not a
`.agent/` file to move at closure. Do not create task packets, runtime audits,
harness journals, or review reports at `.agent/` root. Keep minor observations
coherently in an existing task evidence document rather than fragmenting them.

On closure, keep only a concise no-active-task entry in `.agent/current-task.md`.
Durable narratives, decisions, results, and provenance belong in task evidence.

## 5. Lifecycle and acceptance matrix

Work hierarchy is `PROJECT → MILESTONE → WORKSTREAM → TASK → SUBTASK →
VERIFICATION`. A task lifecycle is independent from its acceptance gates:

```text
READY → IN_PROGRESS → IMPLEMENTED → VERIFYING → ACCEPTED → CLOSED
VERIFYING → CORRECTION_REQUIRED → IN_PROGRESS
READY / IN_PROGRESS / VERIFYING → BLOCKED_DECISION
```

Record applicable task acceptance separately:

```yaml
acceptance:
  code: PENDING | PASS | NOT_REQUIRED
  runtime: PENDING | PASS | PASS_WITH_LIMITATIONS | NOT_REQUIRED
  parent_gate: NOT_EVALUATED | ELIGIBLE | INELIGIBLE
```

- **Task-level code acceptance** covers required source behavior, focused
  checks, and independent code review. A task may be `ACCEPTED` with
  `acceptance.code: PASS` while a separately tracked parent runtime checkpoint
  remains open; the distinction must be explicit.
- **Task-level runtime obligations** exist only for claims that require real
  infrastructure. The parent runtime checkpoint owns its own runtime
  acceptance obligations; no child code task implicitly owns or closes them.
- **Parent runtime-checkpoint acceptance** is the checkpoint's own `PASS` or
  `PASS_WITH_LIMITATIONS` result after its claim-mapped scenarios and residual
  dispositions are evaluated. It is distinct from task-level code acceptance
  and from parent checkpoint eligibility.
- **Parent checkpoint eligibility** is `ELIGIBLE` only when every mandatory
  claim has passed or has an explicit approved disposition, cleanup is
  resolved, and no blocker remains. It is not itself a scenario result.
- **Closure** follows acceptance/eligibility only after Primary reconciles
  canonical state and clears obsolete operational state.

Runtime scenarios use only `PASS | FAIL | NOT_RUN | BLOCKED`. `NOT_RUN` never
means passed. `PASS_WITH_LIMITATIONS` requires a durable disposition for every
residual unverified claim: missing assurance, blocker type, future trigger,
and whether Product Owner acceptance was required.

Reviewer verdicts remain exactly `PASS`, `CORRECTION_REQUIRED`, or
`BLOCKED_DECISION`. Each review additionally declares one scope:
`CODE`, `RUNTIME_EVIDENCE`, or `CHECKPOINT`. Reviewer `PASS` is not Primary
acceptance.

## 6. Readiness, planning, routing, and review

A ready task states objective/boundary, authority/invariants, scope/non-scope,
verification tier and acceptance claims, role routing, claim-mapped checks,
and stop conditions. It must be executable without inventing policy.

Use `.agent/execution-plan-standard.md` only when substantial multi-phase
planning is required. Actual plans live in `docs/plans/`; a plan never replaces
the immediate task.

Use the lowest-cost capable role: Explorer for facts, Architect for unresolved
material decisions, Integrator for approved sensitive integration, Executor
for deterministic bounded work, Reviewer for independent inspection, and
Primary for coordination/acceptance. Prefer one writer and conservative
concurrent writing.

The normal pattern is:

```text
Primary reconciliation → Explorer/Architect if needed → one writer
→ Reviewer when required → Primary acceptance and reconciliation
```

Implementers inspect before editing, make the smallest defensible change,
preserve unrelated work, run assigned proportionate checks, report deviations,
and stop at unresolved decisions. Reviewer inspects the actual diff and active
paths rather than trusting a handoff.

## 7. Risk-based verification

Every verification scenario maps to an explicit acceptance claim and material
risk. Do not require a maximal runtime matrix by default.

| Tier | Use | Minimum verification |
| --- | --- | --- |
| **V1 — Focused** | documentation, mechanical, bounded UI/test work | focused checks and Primary inspection; independent review only when materially justified |
| **V2 — Integrated** | production behavior across modules, persistence, or reversible provider interaction | focused and affected integration/static checks; independent review for meaningful production changes |
| **V3 — Sensitive** | authorization, tenancy, finance, transaction integrity, migrations, provider trust | mandatory independent review plus targeted positive/negative checks; real runtime evidence only for claims requiring it |

Independent review is mandatory for V3 and meaningful V2 production changes.
Runtime evidence is required only where the claim cannot be established by
code-level verification.

## 8. Runtime authority, fixtures, and safety

Classify runtime work proportionately as `NON_DESTRUCTIVE`,
`ISOLATION_RECOMMENDED`, or `ISOLATION_REQUIRED`. Environment and operation
authority remain distinct. Do not infer an effective target from `.env` files:
attest the effective database/provider/runtime identity without exposing
secrets before state-changing work.

After independent read-only target attestation, standing authority permits
supported prerequisite creation, use, mutation, and deletion of bounded,
collision-resistant, run-marked synthetic fixtures in an approved disposable
local environment. This includes ordinary authentication, synthetic onboarding
logos, organization onboarding, invitations, memberships, and bounded test
data needed to establish canonical fixtures, even where the prerequisite is
not the verification target. Fixtures must have certain cleanup targets and
must not touch unrelated data.

Standing authority does **not** extend to shared or production resources,
environment provisioning unless already approved, schema resets, migration
application/reversal, destructive work outside the approved disposable scope,
external development-provider resources or reconfiguration unless separately
approved, credential rotation, deployment, unsafe fault injection, uncertain
cleanup, or secret exposure. Disposable local fixtures and external
development-provider resources are different authority boundaries.

Stop if target identity is wrong/unproven, scope becomes destructive, cleanup
is uncertain, unexpected existing data would be touched, an unapproved
provider/infrastructure change is required, tenant isolation cannot be
established, or a secret would be recorded. Return facts to Primary for
reclassification or Product Owner approval.

## 9. Blockers and harness discipline

Classify blockers as exactly:

```text
APPLICATION_DEFECT
VERIFICATION_ENVIRONMENT_BLOCKER
CAPABILITY_BLOCKER
AUTHORITY_BLOCKER
```

Only `APPLICATION_DEFECT` routes to application correction by default. Other
blockers require the appropriate environment, capability, or authority
resolution and do not imply an application defect.

Preflight a runtime harness before executing a scenario matrix. After the
first harness failure, one bounded repair tied to a concrete hypothesis is
allowed. Stop if the repair reaches the same failure boundary without new
application evidence. A materially new boundary is progress and may justify a
new bounded investigation. Changing headless/visible/browser mode alone is
not new evidence.

## 10. Evidence, feedback, and discipline

Evidence must be proportional, attributable, secret-safe, and durable where
acceptance/audit/reproducibility needs it. Record baseline failures separately
from task-caused failures. Do not stage, commit, deploy, apply migrations, or
alter provider configuration without explicit task authority.

At checkpoint closure, Primary may record at most three workflow observations
in retained evidence when process behavior materially affected assurance,
effort, or Product Owner involvement. Propose workflow policy only after the
same issue recurs across two checkpoints or one occurrence creates material
safety/assurance risk. Do not create a tracker, standing meeting, automatic
policy update, or continuously expanding policy.

## 11. Core rule

Do not invent product, security, authorization, tenancy, transaction,
financial, migration, provider, or environment policy. Stop at material
ambiguity, preserve safe completed work, and route the smallest unresolved
decision to the appropriate authority.
