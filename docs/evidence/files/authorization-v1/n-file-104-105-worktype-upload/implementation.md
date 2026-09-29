# N-FILE-104/105 — WorkType upload implementation evidence

Status: ACCEPTED — independent Reviewer PASS and Primary code acceptance  
Scope: CODE  
Date: 2026-09-21

## Implemented boundary

- `N-FILE-104` stages a targetless, Organization-scoped WorkType-image grant
  after `catalog.create` authorization.
- `N-FILE-105` stages and commits a grant bound to the authoritative
  `catalog.worktype` identifier after `catalog.update` authorization.
- The dedicated `workTypeIconAvatar` UploadThing route carries only
  `uploadGrantId`; its verified callback uses the existing grant service.
- Final WorkType create/update commands authorize first, validate the parent
  Category against the canonical Lab, and consume a supplied completed grant
  in the same transaction as the mutation.
- A raw provider URL remains preview-only. It is absent from the command
  contract, and an update without a grant omits `imageUrl`, preserving the
  persisted image. Persisted removal remains unavailable.

## Authorization and transaction coverage

- Added `catalog.worktype` authoritative Organization ownership resolution.
- Added closed stage/commit intent labels for WorkType create and update.
- Focused tests cover malformed/caller-selected stage authority, authorization
  ordering, targetless create and authoritative update targets, wrong
  tenant/member/boundary/purpose/replay consumption rejection, parent
  Category validation, mutation failure propagation, no-grant preservation,
  opaque browser handoff, callback metadata, and resolver ownership lookup.

## Verification run

```text
pnpm exec vitest run \
  tests/unit/modules/labos-files/catalog-worktype-upload.contract.test.ts \
  tests/unit/modules/labos-files/catalog-worktype-image-command.test.ts \
  tests/unit/app/api/uploadthing/core.route.test.ts \
  tests/unit/modules/labos-authorization/operational-authorization.repository.test.ts \
  tests/unit/schema/composed/worktype.details.test.ts \
  tests/unit/components/modals/work-type/work-type-icon-upload.test.ts
```

Result: PASS — 6 files, 33 tests.

`pnpm exec tsc --noEmit`: BLOCKED by the pre-existing unrelated TS2352 at
`tests/unit/modules/labos-files/upload-grant.telemetry.test.ts:85`. That file
was already modified before this N-FILE task and was not changed here. The
task-caused WorkType contract TS2345 was corrected by explicitly narrowing the
create and update authorization requests; it no longer appears in the
repository-wide type-check output.

The first Vitest attempt exposed an existing Category route-test fixture using
`url` where UploadThing's callback supplies `ufsUrl`. The fixture was corrected
to reflect the established callback adapter; it does not alter application
behavior.

## Deliberately unverified / non-scope

No real database, UploadThing provider, callback, browser, migration, schema,
provider configuration, deployment, persisted removal, expiry scheduling, or
orphan cleanup verification was run. Those claims belong to a separately
approved WorkType runtime checkpoint.

## Independent review

- Verdict: `PASS`
- Review scope: `CODE`
- Focused verification independently confirmed: 6 files / 33 tests PASS.
- Repository-wide TypeScript verification remains blocked only by the
  pre-existing unrelated TS2352 in
  `tests/unit/modules/labos-files/upload-grant.telemetry.test.ts:85`; no
  N-FILE-104/105 TypeScript diagnostic remains.
