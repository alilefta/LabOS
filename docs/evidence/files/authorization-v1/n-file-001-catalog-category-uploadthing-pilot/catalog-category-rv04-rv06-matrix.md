# Catalog Category runtime correction — RV-04 through RV-06

Status: READY

Parent: Catalog Category UploadThing pilot / N-FILE-001

Executor: LUNA

Reviewer: TERRA

## Objective

Complete only RV-04, RV-05, and RV-06 under their exact definitions. The active
Category UI gate, real UploadThing callback, opaque client grant handoff, and a
normal grant-backed Category create were proven on 2026-09-11; do not repeat
them except as their necessary setup.

## Environment and boundary

Use the approved fresh disposable stageproof database at loopback
`127.0.0.1:55439`, database `labos_rv_stageproof_20260910`, with identical
process-local `DATABASE_URL` and `DIRECT_URL`; attest both as loopback and
non-hosted before mutations. The harness must not inject or transform any
other runtime secret: normal project `.env` / `.env.local` loading supplies
Better Auth, UploadThing, Axiom, and related configuration. Real Better Auth and isolated Playwright
contexts only. The active UI entry is the icon-only plus button adjacent to
`Clinical Categories`, opening `CategoryEditorSheet`.

Do not change app code, authentication, schema, provider configuration, or
authorization semantics. Do not use raw SQL, a test endpoint, injected session,
or direct command/API path that bypasses the real UI.

## Required runtime evidence

1. **RV-04:** submit create/edit form data containing a raw provider URL but no
   valid `imageUploadGrantId`; prove create does not persist it and update does
   not replace/remove the existing image. Capture redacted before/after Category
   projections.
2. **RV-05:** from the real edit UI for Category A, stage a new image. Prove the
   staging input uses `mode:update` and the authoritative persisted Category A
   ID; restricted evidence must show target type `catalog.category` and exact
   target binding. Complete callback and committed replacement.
3. **RV-06:** edit Category A without a new grant. Prove its existing image is
   preserved and no grant is consumed. Attempt the real UI removal control and
   prove persisted removal remains unavailable with no provider/domain deletion.

Do not infer a result from code tests. Record `PARTIAL` or `NOT RUN` if an
exact assertion cannot be obtained.

## Cleanup/report

Delete tracked provider objects, browser state, runtime, temporary harnesses,
container/volume, and ephemeral credentials. Append redacted evidence only;
restricted identifiers remain outside Git. Preserve RV-10 as NOT RUN and do
not begin RV-07–RV-11. Report exact result under each RV ID for Terra review.
