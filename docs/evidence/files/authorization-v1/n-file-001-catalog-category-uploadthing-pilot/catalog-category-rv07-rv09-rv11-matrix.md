# Catalog Category runtime correction — RV-07 through RV-09 and RV-11

Status: READY

Parent: Catalog Category UploadThing pilot / N-FILE-001

Executor: LUNA

Reviewer: TERRA

## Objective

Complete only the remaining exact runtime observations RV-07, RV-08, RV-09,
and RV-11. RV-10 remains NOT RUN. Reuse accepted positive create/update and
no-grant evidence; do not repeat RV-04 through RV-06.

## Isolated environment

Recreate the Product Owner-approved disposable stageproof target only:
`127.0.0.1:55439`, `labos_rv_stageproof_20260910`, with exactly identical
process-local `DATABASE_URL` and `DIRECT_URL`, after a non-secret loopback and
non-hosted datasource attestation. It must not inject or transform any other
runtime secret; project `.env` / `.env.local` supplies Better Auth, UploadThing,
Axiom, and related normal local-development configuration. Use actual Better
Auth sign-in and independent Playwright A/B/C contexts.
Create Categories only through the active `CategorySidebar` icon-only plus
control and `CategoryEditorSheet`.

No production/shared resources, raw SQL, direct command/API substitutions,
session injection, test-only routes, app/config/schema/provider changes, or
forged provider signatures.

## Required observations

1. **RV-07:** after an actual successful update grant commit, replay that same
   completed update request via the real browser transport where safely
   observable. Prove no second Category update and no second consumption.
   Record whether controlled concurrency was feasible; it is not a substitute
   for the required replay result.
2. **RV-08:** using B's real Organization-B context, attempt consumption of a
   real Org-A grant against Category B and the wrong target/boundary/purpose
   combinations safely reachable through the actual UI/transport. Prove denial
   before mutation, no existence disclosure, and stable scoped grant/Category
   state. Do not relabel a denied staging request as consumption evidence.
3. **RV-09:** use only a provider-supported replay of the same verified
   callback if UploadThing 7.7.4 local-development flow makes that capability
   available. Do not forge signatures, invoke provider internals, or manually
   POST callbacks. If unsupported, record `NOT RUN — safe provider callback
   replay unavailable` and the exact provider capability boundary.
4. **RV-11:** inspect real, selected development telemetry for allowed
   positive, denied, callback, and consumption lifecycle events. Check exactly
   the packet field allowlist and forbidden fields; do not assert sanitization
   from source alone. Axiom delivery is best effort and any warning is not a
   callback failure. Redact all values.

## Cleanup/report

Append redacted findings only. Delete run-tracked provider objects, browser
contexts, runtime, container/volume, harnesses, and ephemeral credentials;
independently verify. State PASS/PARTIAL/NOT RUN under exact IDs only. Do not
run any other RV scenario or modify `docs/current.md`.
