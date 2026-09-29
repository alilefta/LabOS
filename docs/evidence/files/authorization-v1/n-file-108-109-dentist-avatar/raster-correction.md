# N-FILE-108/109 Dentist Raster-Only Correction

Status: CODE accepted; no runtime continuation authorized
Date: 2026-09-23
Authority: Product Owner approval of PNG/JPEG/WebP-only Dentist avatars after
the DRV-01 runtime SVG-preview defect. The accepted N-FILE-108/109 attachment
architecture and D-FILE-04 pending status are unchanged.

## Bounded change

- `dentistAvatar` UploadThing route now advertises only exact `image/png`,
  `image/jpeg`, and `image/webp` MIME types, each at the existing 4 MB and
  one-file limits. A Dentist-only middleware guard retains one file total
  across mixed MIME types. The generic/shared and other Files routes are
  unchanged.
- The roster editor dropzone accepts the same three MIME types and no SVG;
  its visible format guidance now matches. Existing persisted-avatar display,
  grant handoff, grantless preservation, and removal-disabled behavior remain
  unchanged. No provider configuration or global Next SVG setting changed.
- New tests assert the real route config's exact MIME set, reject zero/mixed-
  type multiple files before grant staging, and render the
  persisted raster preview through the installed Next `Image` component,
  including its disabled removal control.

## Code-level checks

- Focused route/editor suite: 3 files, 20 tests passed.
- Persisted-preview test after using the installed Next `Image`: 1 test passed.
- Targeted ESLint on the four affected source/test files: passed.
- `pnpm exec tsc --noEmit --pretty false`: exit 1 only for the separately
  tracked pre-existing `TS2352` in
  `tests/unit/modules/labos-files/upload-grant.telemetry.test.ts:85`; no new
  Dentist diagnostic. The global typecheck is not represented as passing.

This code-level preview check verifies generated raster-image markup, not
real provider fetch/rendering. DRV-01 remains `PASS` to its defined claims;
DRV-02-06 remain `NOT_RUN` in the runtime packet. A later separately approved
runtime continuation must confirm real persisted-preview rendering and the
unexecuted replacement, grantless, denial, replay, and telemetry claims.

Independent V3 Reviewer verdict: `PASS | CODE`, no material findings.
Primary correction code acceptance: `PASS`. Dentist runtime acceptance remains
`PENDING`, parent gate `INELIGIBLE`, and checkpoint `CORRECTION_REQUIRED`
until the separately authorized continuation evaluates DRV-02-06.
