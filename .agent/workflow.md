# LabOS Agent Engineering Workflow

Status: Current
Authority: Engineering workflow
Owner: Product Owner / Lead Engineering Agent

## 1. Purpose

This file defines how AI engineering agents coordinate work in LabOS.

The workflow exists to:

- route work to the cheapest capable model;
- separate architecture from implementation;
- prevent executors from inventing policy;
- distinguish implementation from acceptance;
- preserve expensive reasoning in repository documentation;
- keep `docs/current.md` concise;
- allow engineering work to resume from repository state rather than chat history.

The repository is the source of truth.

Chat history is not authoritative when it conflicts with the repository.

---

## 2. Agent roles

### Product Owner

The human Product Owner is the final authority for:

- product behavior;
- policy decisions;
- scope changes;
- business rules;
- destructive or environment-sensitive operations;
- approval of architectural alternatives when required.

The Product Owner does not need to manually orchestrate normal engineering subtasks.

---

### SOL — Architect / Decision Authority

Use SOL only when implementation cannot proceed safely because architecture or policy remains undefined.

SOL owns:

- architecture decisions;
- security-policy decisions;
- authorization semantics;
- transaction semantics when not already defined;
- data-model decisions with broad consequences;
- high-risk cross-system boundaries;
- architectural conformance audits when warranted.

SOL should not be used merely because a task is difficult.

SOL output should resolve uncertainty and be persisted into the appropriate canonical documentation.

---

### TERRA — Lead Engineer / Orchestrator

TERRA owns the engineering workflow.

TERRA is responsible for:

- reconciling repository state;
- identifying current milestone/workstream/task;
- determining whether architecture is sufficient;
- decomposing work;
- deciding whether work belongs to TERRA or LUNA;
- performing integration-sensitive implementation;
- producing bounded LUNA task packets;
- reviewing LUNA's actual implementation;
- producing correction packets;
- engineering acceptance;
- closing accepted tasks;
- advancing `docs/current.md` when the parent engineering task is actually accepted.

TERRA must independently inspect code and tests after LUNA work.

LUNA's completion report is evidence, not acceptance.

---

### LUNA — Bounded Executor

LUNA performs deterministic, bounded implementation work after architecture and contracts are settled.

Typical LUNA work:

- local wiring;
- UI plumbing;
- schema plumbing;
- mechanical refactors;
- focused tests;
- regression coverage;
- narrow adapter changes;
- deterministic implementation from an approved contract.

LUNA must not:

- redesign architecture;
- invent authorization/security policy;
- widen task scope;
- resolve ambiguous product behavior;
- close parent tasks;
- advance `docs/current.md`;
- activate unrelated boundaries;
- apply migrations unless explicitly authorized;
- stage or commit unless explicitly instructed.

If specification is insufficient, LUNA stops and reports the ambiguity.

---

## 3. Authority flow

Authority flows downward.

Evidence flows upward.

```text
Product Owner
      ↓
     SOL
      ↓
    TERRA
      ↓
    LUNA

implementation evidence
      ↑
verification evidence
      ↑
review evidence
```

A lower-level agent may not redefine a higher-level decision.

---

## 4. Canonical project reading order

At session start:

```text
AGENTS.md
  ↓
docs/current.md
  ↓
.agent/workflow.md
  ↓
.agent/current-task.md        if present/current
  ↓
relevant active plan
  ↓
relevant architecture
  ↓
approved decisions
  ↓
exact boundary/reference
  ↓
source + tests
```

Do not read the complete documentation corpus.

Read `docs/evidence/**` or `docs/archive/**` only to resolve a concrete discrepancy or historical question.

---

## 5. Work hierarchy

Engineering work is organized as:

```text
PROJECT
  → MILESTONE
    → WORKSTREAM
      → TASK
        → SUBTASK
          → VERIFICATION
```

Example:

```text
LabOS
  → M4 Authorization V1
    → N-FILE-001 UploadThing authorization
      → Catalog Category pilot
        → FILE-05 UI opaque-grant handoff
```

Internal executor subtasks do not need to appear in `docs/current.md`.

---

## 6. Task lifecycle

Every engineering task follows:

```text
READY
  ↓
IN_PROGRESS
  ↓
IMPLEMENTED
  ↓
VERIFYING
  ↓
ACCEPTED
  ↓
CLOSED
```

Optional failure transition:

```text
VERIFYING
  ↓
CORRECTION_REQUIRED
  ↓
IN_PROGRESS
```

Possible escalation:

```text
READY / IN_PROGRESS / VERIFYING
  ↓
BLOCKED_DECISION
  ↓
SOL / Product Owner
```

### Definitions

#### READY

Architecture and dependencies are sufficient to execute the task.

#### IN_PROGRESS

An assigned agent is implementing the task.

#### IMPLEMENTED

The executor reports implementation complete.

This is not acceptance.

#### VERIFYING

TERRA reviews actual source, diff, tests, and integration seams.

#### CORRECTION_REQUIRED

The implementation does not satisfy the packet but the correction is bounded and does not require architecture changes.

#### ACCEPTED

TERRA has verified the task satisfies its engineering acceptance criteria.

#### CLOSED

The accepted task has been reconciled into parent work and any required canonical documentation/status has been updated.

---

## 7. Routing algorithm

Before implementation, the active Codex engineering session determines
uncertainty and risk from the current task and relevant repository state.

Use the lowest-cost capable engineering agent.

If routing is obvious from the task and approved repository state, the primary
Codex session may dispatch the appropriate configured subagent directly.

If classification itself requires meaningful repository reconciliation,
cross-boundary analysis, or engineering judgment, delegate that reconciliation
to TERRA before implementation.

### Route to SOL when:

- architecture is missing or contradictory;
- security semantics are undefined;
- authorization policy is undefined;
- transaction guarantees are undefined;
- data ownership cannot be determined;
- multiple reasonable designs materially affect system behavior;
- implementation requires changing an approved invariant;
- a policy decision belongs to the Product Owner.

Do not invoke SOL automatically. Record the unresolved decision and stop for
Product Owner approval.

### Route to TERRA when:

- multiple system boundaries meet;
- transactionality matters;
- authorization and domain mutation interact;
- integration across modules is required;
- legacy/new systems must be reconciled;
- implementation choices can materially affect an approved invariant;
- final engineering acceptance is required;
- the task cannot be safely reduced to deterministic bounded execution.

### Route to LUNA when:

- architecture is already approved;
- behavior is deterministic;
- scope can be clearly bounded;
- files/components can be identified;
- acceptance tests can be written explicitly;
- no product/security/transaction decision is required;
- implementation does not require significant cross-boundary engineering
  judgment.

Prefer LUNA when both TERRA and LUNA can safely perform the implementation.

Task size alone does not determine routing.

A small integration-sensitive change may require TERRA.
A larger mechanical but deterministic change may still belong to LUNA.

---

## 8. LUNA task packet requirements

Before a task is delegated to LUNA, its active task definition must contain:

1. Task ID and title.
2. Objective.
3. Current known state.
4. Explicit scope.
5. Explicit non-scope.
6. Required behavior.
7. Exact relevant files/components when known.
8. Acceptance criteria.
9. Verification commands/tests.
10. Dependencies.
11. Stop/escalation conditions.
12. Required completion report.

A LUNA packet must be executable without inventing architecture.

If it is not, TERRA must refine it or escalate.

---

## 9. LUNA completion contract

When LUNA finishes, it reports:

1. files changed;
2. exact behavior implemented;
3. tests added/changed;
4. verification results;
5. deviations;
6. blockers or ambiguities;
7. acceptance-criteria status;
8. anything TERRA must inspect.

LUNA must stop after its assigned task.

It must not begin the next task automatically.

---

## 10. TERRA review contract

After LUNA reports completion, TERRA must independently inspect:

- actual changed files;
- actual call paths;
- type contracts;
- security boundaries;
- tests;
- unrelated changes;
- scope compliance.

TERRA returns one of:

```text
ACCEPTED
CORRECTION_REQUIRED
ESCALATE
```

### ACCEPTED

The slice may advance.

### CORRECTION_REQUIRED

TERRA produces the smallest bounded correction task, preferably for LUNA.

### ESCALATE

TERRA creates `.agent/escalation.md` with the exact unresolved decision.

---

## 11. TERRA-owned implementation

TERRA should directly implement work when the task crosses sensitive integration seams.

Examples:

- authorization + domain mutation;
- transaction + lifecycle transition;
- tenant resolution + resource ownership;
- replacement of legacy authority;
- final command integration;
- high-risk schema/domain interaction.

After TERRA implementation, focused verification is still required.

Where useful, LUNA may then add bounded regression coverage.

---

## 12. Acceptance rules

Implementation is not acceptance.

Executor tests are not final acceptance.

A task may be accepted only when:

- required behavior exists;
- required tests pass;
- security invariants hold;
- architecture/policy was not silently changed;
- unrelated boundaries were not activated;
- attributable TypeScript/lint regressions are absent;
- integration seams have been reviewed.

A parent task may be closed only after all required child work is accepted.

---

## 13. Runtime versus implementation acceptance

When environment-dependent verification is outstanding, distinguish:

### Implementation acceptance

Code, contracts, tests, static checks, and modeled security behavior pass.

### Runtime acceptance

Required real infrastructure verification has also passed.

Examples:

- migration applied to approved environment;
- provider callback exercised;
- real database transaction verified;
- browser flow verified;
- deployment checks completed.

Do not claim runtime acceptance from mocks/unit tests alone.

---

## 14. Documentation rules

### `docs/current.md`

Contains only:

- current milestone;
- current workstream;
- last accepted checkpoint;
- current/next parent task;
- significant blocker;
- resumption pointer.

Do not record every LUNA/TERRA subtask.

### Architecture

Update architecture only when durable system truth changes.

### Decisions

Update decisions only when an actual decision is approved.

### Evidence

Use evidence documents when meaningful verification needs to be retained.

### Archive

Archive completed work artifacts after extracting durable current truth.

Do not archive architecture that still describes the current system.

---

## 15. `.agent/current-task.md`

This is the immediate executable task.

It is operational state, not permanent documentation.

TERRA owns creation/replacement of this file.

The assigned executor reads it and performs only that task.

### Successor preparation after acceptance

When an internal task reaches `ACCEPTED`, TERRA may reconcile the approved parent
plan and prepare the next operational task without beginning its implementation.

Successor preparation may include:

- preserving the accepted task's durable outcome;
- identifying the next approved work from canonical plans and decisions;
- determining whether the next work is packet-ready;
- creating or replacing `.agent/current-task.md` with a complete successor
  packet when the workflow authorizes the transition;
- identifying missing decisions, dependencies, or environment approvals.

Successor preparation is not implementation and does not authorize parent
closure, runtime acceptance, or environment-sensitive operations.

If the approved sources do not define sufficient scope and acceptance criteria,
TERRA must not invent them. It must report the missing packet requirements and
request the necessary Product Owner or architecture decision.

A task-specific stop condition such as "do not begin the next task" prohibits
execution of the successor. It does not automatically prohibit authorized
preparation of the successor packet, unless the stop condition explicitly
prohibits preparation or operational edits.

Canonical `docs/current.md` advances only according to its parent-checkpoint
rules. Preparing an internal successor does not itself constitute parent
acceptance or closure.

---

## 16. `.agent/handoff.md`

The executor writes the latest implementation handoff here when instructed by the workflow.

It should contain evidence, not architectural decisions.

TERRA reviews both the handoff and actual repository state.

After acceptance, it may be replaced by the next handoff.

---

## 17. `.agent/escalation.md`

Create only when engineering cannot safely continue because a real decision is missing.

Required structure:

```text
Decision required:
Why current approved sources are insufficient:
Affected task:
Affected invariant:
Options:
Tradeoffs:
Recommended option, if any:
Can bounded work continue without this decision:
```

TERRA must not silently resolve the decision.

The Product Owner decides whether SOL should be invoked.

---

## 18. Dirty worktree rules

Assume unrelated work may exist.

Agents must:

- inspect before modifying;
- preserve unrelated changes;
- avoid broad resets;
- avoid `git add .`;
- stage only explicitly authorized files;
- distinguish task changes from pre-existing modifications.

Do not stage or commit unless explicitly instructed.

### A. Baseline and attribution discipline

When the repository or worktree contains pre-existing changes or known quality
failures, agents must distinguish task-attributable changes from existing
state.

#### Expected change paths

When the likely implementation targets are known, `.agent/current-task.md`
should record them as expected change paths.

Expected change paths:

- help isolate the intended task surface;
- improve review and attribution in a dirty worktree;
- do not prohibit legitimate task-required deviations;
- do not replace inspection of the actual repository state.

If an executor modifies files outside the expected change paths, it must report:

- the additional paths;
- why they were required;
- whether the change was necessary to satisfy already-approved behavior.

Unexpected production changes require particular reviewer attention.

#### Verification baseline

Before implementation, when relevant verification is already known to fail,
capture the smallest useful baseline needed for later attribution.

Examples include:

- TypeScript/compiler errors;
- focused test failures;
- scoped lint failures;
- known repository-wide quality failures.

Prefer a focused baseline over expensive repository-wide checks when the task
does not require broader verification.

The active task may record baseline information such as:

```yaml
baseline_verification:
  typescript:
    command: npx tsc --noEmit
    status: failing
    known_error_count: 6
```

The exact structure is operational metadata and may vary by task.

#### Attribution

After implementation, compare verification results against the relevant
baseline.

Classify failures as:

- attributable to the current task;
- confirmed pre-existing;
- unresolved attribution.

Do not reject a task solely because an unrelated baseline failure still exists.

Do not accept a new regression merely because the repository was already
failing.

If attribution cannot be established safely, TERRA must investigate before
acceptance.

#### Review requirement

For work performed in a dirty worktree, TERRA's review must distinguish:

- pre-existing modified files;
- files changed by the current task;
- expected task changes;
- unexpected task changes;
- new attributable verification failures;
- unchanged baseline failures.

Preserve unrelated dirty worktree changes throughout implementation and review.

### B. Durable verification evidence

When verification is used to establish acceptance or distinguish a task from
pre-existing failures, record enough information to reproduce and identify the
result.

For relevant failing baselines, prefer:

- exact command;
- execution context when material;
- diagnostic file paths and locations;
- diagnostic codes or stable message fingerprints;
- known attribution status.

An aggregate error count alone is insufficient when diagnostic identity is
needed to establish that failures are unchanged.

For acceptance evidence, record the exact verification command and the
observed result, including test files and test count when reported by the tool.

Historical verification results must remain labeled as historical. A later
re-run with a different count must not silently overwrite or be represented as
the original result. Investigate material discrepancies when they affect
acceptance or attribution.

Store concise operational summaries in the active task. Retain detailed output
under `docs/evidence/` only when it is necessary for reproducibility, audit, or
resolving a concrete discrepancy. Do not create large evidence dumps by
default.

---

## 19. Migration and environment rules

Writing a migration is not applying a migration.

Do not apply:

- database migrations;
- provider configuration changes;
- destructive operations;
- deployment changes;

unless explicitly authorized for the target environment.

If runtime verification depends on such work, report it separately.

### Runtime verification approval packet

Any task requiring real database, provider, browser, deployment, migration, or
other environment-sensitive verification must have an explicit approved runtime
verification packet before execution begins.

The packet must define:

- target environment;
- whether it is disposable or shared;
- authorized database;
- authorized provider/project/account;
- migrations permitted to apply;
- fixtures or actors required;
- tenant/organization setup when relevant;
- allowed create/update/delete operations;
- cleanup or restoration expectations;
- exact runtime scenarios to exercise;
- evidence to retain;
- evidence destination;
- stop conditions;
- prohibited environments or operations.

Agents must not infer environment approval from implementation acceptance.

If any required environment authority is missing, the task is not runtime-ready.

TERRA may prepare a proposed runtime verification packet from approved
architecture and plans, but Product Owner approval is required before real
environment operations begin.

Runtime verification must distinguish:

- code-level acceptance;
- migration application;
- provider behavior;
- browser/runtime behavior;
- data-integrity verification;
- security/tenant-isolation verification;
- cleanup completion.

Passing code-level tests does not imply runtime acceptance.

---

## 20. Session commands

### SESSION START

The primary Codex engineering session:

1. reads the canonical entry points;
2. reconciles the repository checkpoint and active task;
3. determines whether routing is obvious from approved repository state;
4. dispatches LUNA for bounded deterministic implementation;
5. dispatches TERRA for integration-sensitive implementation or targeted
   reconciliation when classification is not obvious;
6. ensures TERRA independently reviews LUNA implementation before acceptance;
7. stops at the workflow boundary defined by the active task.

Do not implement before reconciliation.

Do not invoke SOL automatically.

Runtime subagent coordination is performed by Codex; engineering acceptance
remains owned by TERRA.

### CONTINUE

The assigned agent:

1. reads workflow/current task;
2. verifies task is still current;
3. performs the next permitted transition;
4. stops at its role boundary.

### REVIEW

TERRA independently reviews the latest implemented task and returns:

```text
ACCEPTED
CORRECTION_REQUIRED
ESCALATE
```

### CLOSE

TERRA performs parent-task final acceptance, updates required canonical status, and prepares the next parent task.

---

## 21. Default autonomy

TERRA may autonomously:

- inspect;
- reconcile;
- decompose;
- implement TERRA-owned tasks;
- create LUNA task packets;
- review LUNA work;
- create correction packets;
- run non-destructive tests and static checks;
- accept bounded engineering slices.

TERRA must stop for Product Owner/SOL when:

- architecture or policy is undefined;
- destructive/environment-sensitive work requires authorization;
- product behavior must be chosen;
- approved architecture must materially change.

The goal is exception-based human involvement, not manual orchestration.
