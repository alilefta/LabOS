# Upload-grant telemetry test TS2352 correction

Status: CLOSED - CODE PASS
Scope: separate small code-quality task; not Dentist runtime evidence

Before correction, the global `tsc --noEmit` baseline reported `TS2352` at
`tests/unit/modules/labos-files/upload-grant.telemetry.test.ts:85`. The
negative telemetry test cast an object containing deliberately forbidden
`uploadGrantId`, `providerFileUrl`, and `memberId` fields directly to the
safe-event parameter type. This diagnostic persisted through multiple
completed Files boundaries. It was not attributed to or hidden by
N-FILE-108/109 runtime verification.

## Bounded correction

- Touch only this test and, if genuinely necessary, adjacent test-only typing.
  Preserve the adversarial assertion that forbidden values are absent from
  emitted telemetry. Do not weaken production allowlists or change provider
  or application behavior.
- Verify the focused telemetry test, affected grant telemetry regressions,
  and global `tsc --noEmit`. Report any other diagnostics separately rather
  than suppressing them or claiming a clean typecheck without evidence.
- Route to one Executor writer with Primary inspection under V1. Require
  independent review if the correction reaches production telemetry or a
  broader shared contract. No database, provider, or browser execution.

The Product Owner authorized this separate correction on 2026-09-24. It does
not change Dentist runtime scenario results, Dentist code acceptance, or
closed Category/WorkType/Product checkpoints.

## Completion (2026-09-24)

The test now passes its adversarial payload through a structurally assignable
local variable rather than casting the object literal to the safe-event type.
The forbidden-field non-emission assertions remain unchanged. No production
code or runtime resource was changed.

- Focused and affected grant/route regressions: 5 files, 43 tests passed.
- Global `pnpm exec tsc --noEmit`: passed with no diagnostics. Before the edit,
  this command reported only the planned TS2352 at line 85.
- Primary inspected the exact edit. V1 test-only scope did not require an
  independent CODE review.
