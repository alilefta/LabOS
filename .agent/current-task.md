---

task_id: FILE-05
status: ACCEPTED
owner: LUNA
reviewer: TERRA
milestone: M4
workstream: N-FILE-001
parent: Catalog Category UploadThing pilot
experimental_agent_routing: true

expected_change_paths:

* tests/unit/modules/labos-files/catalog-category-image-command.test.ts

baseline_verification:
typescript:
command: npx tsc --noEmit
status: failing
known_error_count: 6
attributable_to_task: false
focused_tests:
status: passing
test_files: 3
test_count: 27
scoped_lint:
status: passing
---

---

# FILE-05 — Catalog Category upload regression coverage

## Objective

Add regression coverage for the completed Catalog Category upload-grant flow.

This task must not change the approved architecture or broaden file
authorization beyond Catalog Category.

## Accepted predecessor state

The following work has code-level acceptance:

- FILE-01 — Catalog Category boundary-to-command contract.
- FILE-02 — UploadThing Category middleware/callback integration.
- FILE-03 — Category UI/schema opaque upload-grant handoff.
- FILE-04 — transactional Category command consumption.

Runtime acceptance for the overall pilot remains pending controlled environment
verification and migration application.

## Required behavior to cover

Regression coverage must verify:

1. Category create obtains authoritative persisted image input only through
   `imageUploadGrantId`.

2. Category edit stages the upload using the authoritative Category ID.

3. Raw UploadThing/provider URLs remain preview information and are not
   authoritative command input.

4. An edit without a new grant preserves the existing persisted image.

5. An edit with a valid new grant propagates `imageUploadGrantId` through the
   active command path.

6. Persisted image removal remains unavailable.

## Expected scope

Prefer changes only to focused Category tests.

Production changes are not expected.

A small deterministic production correction may be made only when clearly
required to make already-approved behavior match its existing contract.

Anything requiring a new architecture, authorization, transaction, provider,
or product decision must escalate instead.

## Expected change paths

The expected FILE-05 implementation target is:

- `tests/unit/modules/labos-files/catalog-category-image-command.test.ts`

This is an attribution aid, not permission to ignore actual repository state.

If implementation requires modifying production files or additional test files,
the executor must report the deviation and explain why it is required by the
approved task.

## Active paths

The implementation/review must target the actual active Category paths rather
than obsolete duplicate actions.

Known active paths include:

- `actions/case-category.ts`
- `actions/catalog/categories/update-category.ts`
- `components/modals/case-category/create-case-category-sheet.tsx`
- `components/modals/catalog/categories/category-editor-sheet.tsx`
- `components/uploads/category-icon-upload.tsx`
- `modules/labos-files/catalog-category-image-command.ts`

Read actual repository state before relying on this list.

## Non-scope

Do not:

- alter upload-grant architecture;
- modify UploadThing provider configuration;
- apply migrations;
- activate other upload boundaries;
- modify `genericAvatar`;
- implement persisted-image deletion;
- decide stored-file read policy;
- modify unrelated legacy actions;
- stage or commit.

Preserve unrelated dirty worktree changes.

## Verification

Run focused affected tests.

Run:

`npx tsc --noEmit`

Run scoped lint if affected files require it.

When the worktree or repository quality baseline is already failing, compare
results against the recorded baseline and distinguish new attributable failures
from pre-existing failures.

## Acceptance criteria

FILE-05 is acceptable when:

- tests exercise the active create/edit paths;
- tests never treat raw provider URLs as authoritative persisted image input;
- no-grant edit preservation is covered;
- grant-backed create/update behavior is covered;
- persisted removal remains unavailable;
- focused tests pass;
- TypeScript passes or only confirmed unrelated baseline failures remain;
- no attributable lint regression exists;
- no prohibited production scope was introduced.

Executor completion is not acceptance.

If LUNA performs implementation, TERRA must independently review it.

## Engineering outcome

Executor selected: LUNA.

Routing rationale:

- approved architecture and contracts were already settled;
- work was bounded regression coverage;
- no production integration or new architectural judgment was required;
- acceptance criteria and verification were explicit.

Implementation result:

- focused regression coverage strengthened in
  `tests/unit/modules/labos-files/catalog-category-image-command.test.ts`;
- no production files changed;
- no migration, provider/configuration, staging, commit, or
  `docs/current.md` changes were made.

Verification result:

- focused Vitest: 3 files, 27 tests passed;
- scoped ESLint passed;
- `npx tsc --noEmit` reported 6 pre-existing/unrelated errors;
- no FILE-05-attributable TypeScript failure was identified.

TERRA review result:

`ACCEPTED`

TERRA independently verified the active UI → staging →
`imageUploadGrantId` → action → command paths and confirmed:

- raw provider URLs remain non-authoritative;
- no-grant edits preserve the existing image;
- grant-backed mutations use the opaque grant handoff;
- persisted removal remains unavailable.

Runtime acceptance for the overall Catalog Category pilot remains separate and
pending the required approved environment verification.

## Pilot stop condition

FILE-05 is accepted.

Do not begin FILE-06 from this task record.

Do not close the parent Category pilot from this task record.

Do not update `docs/current.md` solely because this internal engineering slice
was accepted.
