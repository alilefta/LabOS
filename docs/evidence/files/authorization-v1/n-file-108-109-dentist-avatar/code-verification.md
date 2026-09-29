# N-FILE-108/109 Dentist Avatar Code Verification

Status: CODE accepted; runtime not authorized
Date: 2026-09-23
Authority: Product Owner bounded V3 implementation authorization; D-FILE-05

## Scope and claims

- N-FILE-108 targetless Dentist avatar create staging and N-FILE-109
  Dentist-targeted update staging use canonical Organization/Lab/Member grants
  with a 15-minute expiry and verified UploadThing callback.
- `dentist.create` and `dentist.update` authorize stage and commit. The
  authoritative Dentist/Clinic/Lab/Organization relationship is resolved for
  update; the final mutation revalidates Clinic/Lab and Dentist consistency.
- Only a matching uploaded grant may attach or replace `Dentist.avatarUrl`.
  Grant consumption and mutation share a transaction; raw URLs and provider
  keys are non-authoritative. Create without a grant stores no avatar; update
  without a grant preserves the stored value. Removal and provider deletion
  remain deferred.
- The practitioner editor uses the opaque grant handoff in both modes. Complete
  and quick Clinic creation and unrelated roster controls remain unchanged.
  D-FILE-04 remains pending; no stored-file read/access policy is established.

## Verification and review

- Integrator focused Dentist plus affected Category/WorkType/Product grant
  regression run: 14 test files, 157 tests passed.
- Independent Reviewer focused run: 5 test files, 38 tests passed.
- Initial `CODE` review: `CORRECTION_REQUIRED` for missing `ERRORS` import,
  incompatible Prisma transaction typing, and unintended SOLO Dentist update
  denial. The Integrator corrected all three and added an active-SOLO update
  test. Independent corrected `CODE` review verdict: **PASS**.
- Primary post-correction `pnpm exec tsc --noEmit --pretty false`: no new
  Dentist-related errors. The sole diagnostic is pre-existing `TS2352` at
  `tests/unit/modules/labos-files/upload-grant.telemetry.test.ts:85`, observed
  in the pre-edit baseline as well. Global typecheck therefore does not exit
  successfully, and this baseline is not represented as a pass.

Code acceptance: **PASS**. Runtime acceptance: **PENDING**. Parent gate:
**NOT_EVALUATED**. Real database, provider, and browser scenarios are `NOT_RUN`;
none were executed in this code-only task.
A separately authorized N-FILE-108/109 runtime packet must define the
smallest real create, replacement, denial, replay, preservation, telemetry,
and exact-cleanup claims before runtime acceptance can be evaluated. Product
PRV-08 remains a separate outstanding obligation.
