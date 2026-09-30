# N-FILE-110A preservation kernel: code verification

Status: CLOSED. Independent V3 CODE review PASS; Primary code acceptance PASS.
Authority: Product Owner authorization for the provider-independent
N-FILE-110A preservation kernel. No migration, database, provider, or runtime
authority was exercised.

## Authored behavior

- General Case create, Save Draft, draft promotion, and full edit reject any
  nonempty submitted asset array. Empty/omitted asset state is non-destructive.
- Existing Case assets are never written or deleted by those paths. Repeated
  saves retain their row IDs and fields. An asset-bearing draft cannot be
  saved under a different patient. Draft save and promotion recheck DRAFT
  status inside the transaction and condition the final update on DRAFT and
  expected patient, preventing stale writes after concurrent promotion.
- Explicit Case asset add and delete actions deny before repository access.
  The generic Case UploadThing route denies both staging and callback.
- Create/edit forms no longer offer Case upload/removal. They submit an empty
  asset array and show authorized existing legacy assets read-only. Legacy
  URLs are not resubmitted as mutation input.
- Explicit Save Draft remains; no draft is auto-created for upload. C1 Case
  detail authorization and legacy DTO behavior are unchanged.

## Code-only verification

- Focused/affected regressions: 9 Vitest files, 50 tests PASS. Coverage spans
  Case action guards/mapping/static mutation inspection, C1 Case detail read,
  C2 schema statics, UploadThing route behavior, and Category/WorkType/Product/
  Dentist contract regressions.
- Owned-file ESLint: 0 errors, 8 unused-symbol warnings (one in
  `create-case.ts`, seven in `case-ai-auditor.tsx`).
- `pnpm exec tsc --noEmit`: FAIL only at the two previously recorded C2
  nullable Prisma-to-legacy DTO TS2322 diagnostics in
  `lib/server-only-helpers.ts:196,251`. No new N-FILE-110A diagnostic.
- `git diff --check`: no whitespace errors; Git reports only LF/CRLF
  conversion warnings in the dirty worktree.

No real database, provider, browser, or runtime acceptance is claimed. C2
mixed-read compatibility remains separate and unaccepted. The development
UploadThing private-ACL capability blocker remains unchanged.

## Independent review and reconciliation

- Initial V3 CODE verdict: CORRECTION_REQUIRED. A stale Save Draft could
  restore a concurrently promoted Case to DRAFT because only a pre-transaction
  status check existed. The reviewer also requested the same guard for draft
  promotion.
- Correction: both paths now read status/patient within the write transaction
  and condition the final update on DRAFT and expected patient. A focused
  source/guard regression was added; no database concurrency experiment was
  run under this code-only authority.
- Independent V3 CODE rereview: PASS. The reviewer confirmed the prior HIGH
  finding is resolved, child replacement work rolls back on a failed
  conditional update, and found no further material N-FILE-110A defect.
- Primary: code acceptance PASS, task CLOSED. Runtime acceptance NOT_REQUIRED
  for this provider-independent code slice. This does not activate Case
  clinical uploads, managed assets, signed reads, or C2 migration.
