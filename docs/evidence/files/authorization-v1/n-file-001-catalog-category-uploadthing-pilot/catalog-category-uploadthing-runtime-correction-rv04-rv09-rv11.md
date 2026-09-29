# Runtime verification correction packet — Catalog Category UploadThing pilot

Status: BLOCKED_EXTERNAL

Parent: Catalog Category UploadThing pilot / N-FILE-001

Executor: LUNA

Reviewer: TERRA

## Objective

Complete only the runtime evidence that remains unproven after Terra corrected
the scenario-ID mismatch in the prior remaining-matrix report. This is a
verification correction, not FILE-06. Preserve FILE-05 as ACCEPTED and do not
replace `.agent/current-task.md`.

## Approved environment and invariants

Use a newly recreated, loopback-only disposable PostgreSQL environment and the
dedicated local-development UploadThing credential. Before Prisma or Next,
assign identical disposable connection strings to both `DATABASE_URL` and
`DIRECT_URL`; do not let repository Supabase values win. Strip matching outer
dotenv quotes from the development UploadThing token only in the temporary
child-process harness. Use the real Better Auth sign-in flow and independent
Playwright contexts for synthetic A, B, and C. Do not use raw SQL, session
injection, test-only routes, shared resources, production/staging resources,
or provider configuration changes.

The UploadThing stage/callback proof has already passed twice with that harness.
Reuse prior valid evidence where this packet says it is sufficient.

## Required observations

### Harness gate before every Category mutation

The previous execution proved the stage and verified callback, but submitted a
form before the browser-side callback had delivered `imageUploadGrantId` to the
Category flow. Repair only the temporary Playwright harness: after each upload,
wait for the real client callback/UI state to expose the opaque grant handoff
and assert the outgoing command contains that grant before submitting. Do not
manufacture a grant, inject a session, invoke a test-only endpoint, or modify
application code. Capture a redacted assertion that the persisted Category
image comes only from the callback-backed opaque grant.

Do not begin the remaining observations if this gate cannot be demonstrated;
record the exact client-visible state and stop for Terra review.

### Catalog render gate

The active Catalog route renders `CategorySidebar`, which owns the active
`CategoryEditorSheet`. Its create control is the icon-only plus button beside
the rendered `Clinical Categories` heading; it has no accessible name. The
prior `New Category` text gate targeted an inactive header path and is not a
scenario result. In the temporary harness, first assert final `/catalog` URL,
the `Clinical Categories` heading, then locate that header's adjacent plus
button structurally and click it. Assert the visible Category editor sheet
before upload. If that control or sheet does not render, retain a redacted
restricted DOM/screenshot plus URL/status and stop before upload. Do not alter
the UI or use a non-UI command path to bypass this gate.

1. **RV-04 completion:** submit create/edit command data with raw provider URL
   and no valid `imageUploadGrantId`; prove create cannot persist it and update
   cannot replace or remove the existing image.
2. **RV-05 completion:** stage an A update using the authoritative persisted
   Category A ID; verify `mode:update`, target type `catalog.category`, exact
   target binding in restricted evidence, callback, and committed replacement.
3. **RV-06:** update A without a new grant; prove existing image persists,
   no grant is consumed, and the UI removal control remains unavailable without
   provider/domain deletion.
4. **RV-07 completion:** replay a completed update grant after its successful
   commit; prove no additional update occurs and no second consumption succeeds.
5. **RV-08 completion:** from authenticated B / Organization B, attempt to
   consume a real Org-A grant against the safe required target/purpose
   combinations. Prove rejection before B or A Category mutation, no existence
   disclosure, and correct grant stability.
6. **RV-09:** only use a provider-supported replay of the same verified
   callback, if the installed local development flow exposes one safely. Do not
   forge a signature or call provider internals. If unavailable, record
   `NOT RUN — provider-supported callback replay unavailable` with the exact
   capability boundary.
7. **RV-11 completion:** collect the actual authorization/grant lifecycle
   telemetry for allow, denial, callback, and consumption. Verify the packet's
   field allowlist/forbidden-field requirement against the actual selected
   console/development sink. Do not treat a best-effort Axiom delivery warning
   as a callback failure; do not expose values or secrets.

## Evidence and cleanup

Append only redacted results to the designated evidence report. Keep IDs,
URLs, keys, signatures, emails, cookies, and credentials in approved restricted
evidence only. Delete all run-created provider objects, browser profiles,
temporary harnesses, runtime processes, disposable database/container/volume,
and ephemeral credentials. Verify cleanup independently.

## Stop conditions

Stop and report if a required scenario requires an undefined authorization,
security, transaction, architecture, or provider-policy decision. Do not
redefine a scenario ID to fit another observation. RV-10 remains NOT RUN.

## Completion report

Report each observation under its exact RV ID, files changed, tests/commands,
evidence location, cleanup result, deviations, and any reason a scenario is
PARTIAL or NOT RUN. TERRA alone performs acceptance.

## 2026-09-11 execution-capacity block

The last bounded executor turn ended before it could begin because the available
agent execution quota was exhausted. It made no claim about application,
authorization, UploadThing, or provider behavior. The unstarted final harness
must be retried only after execution capacity is available; then it must begin
at the active `CategorySidebar` plus-button render gate above.
