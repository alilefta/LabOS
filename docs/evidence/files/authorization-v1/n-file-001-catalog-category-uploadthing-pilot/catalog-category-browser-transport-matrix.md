# Catalog Category runtime correction — browser transport matrix

Status: CORRECTION_REQUIRED

Parent: Catalog Category UploadThing pilot / N-FILE-001

Executor: LUNA

Reviewer: TERRA

## Objective

Complete only the hostile-client observations expressly permitted by the
runtime packet: RV-04 raw-provider-URL non-authority, RV-07 completed-grant
replay, RV-08 cross-tenant grant substitution, and RV-11 telemetry field audit.
RV-09 is not in this packet; it remains conditional on a provider-supported
callback replay mechanism. RV-10 remains NOT RUN.

## Mandatory approach

Use a real authenticated browser, real Better Auth sessions, and the actual
Catalog UI. Playwright may capture and replay an **already browser-generated**
authenticated request, or alter only its relevant form field/opaque grant
identifier in browser transport. This is the packet-authorized hostile-client
form alteration; it must not fabricate an arbitrary server action, call a
direct API, inject a session, use raw SQL, forge a provider callback/signature,
or modify application code. Preserve all other request headers and body fields.

The harness owns database isolation only. Set `DATABASE_URL` and `DIRECT_URL`
to the same approved stageproof connection at loopback `127.0.0.1:55439`.
Before Prisma, Next, or any mutable operation, non-secretly attest that both
effective URLs resolve to that local database and that neither contains a
hosted/Supabase host. Do not inject, parse, dequote, duplicate, rewrite, or
substitute Better Auth, UploadThing, Axiom, or any other application secret or
provider setting. Let normal project `.env` / `.env.local` loading supply those
values exactly as local development does. Use isolated A/B contexts and actual
callback-backed grants. Record all identifiers only in restricted evidence.

## Exact scenarios

1. **RV-04:** alter the real A create/edit browser form transport to add a raw
   provider URL while omitting/invalidating `imageUploadGrantId`; prove it cannot
   persist or replace/remove the image. Do not claim the UI rendered a raw URL
   field.
2. **RV-07:** capture A's real successful update-grant command and replay the
   exact browser-generated request; prove one consumption/mutation only and no
   extra Category state. If the browser transport cannot replay it without
   fabricating the framework payload, record that exact limitation.
3. **RV-08:** capture a real B Category-B command, replace only its opaque grant
   ID with an actual Org-A grant in browser transport, and prove denial before
   either tenant mutates or target existence is disclosed. Do not substitute
   server sessions or direct command endpoints.
4. **RV-11:** capture selected local runtime console telemetry for allow,
   denial, callback, and consumption produced by these real flows. Compare keys
   against the packet allowlist/forbidden list; redact values. Do not equate
   best-effort Axiom delivery with callback success/failure.

## Cleanup/report

Delete only run-tracked provider objects and all disposable resources. Append
redacted evidence. Give exact RV status and facts; do not claim a scenario from
source tests or an unmatched label. No `docs/current.md`, staging, commit,
deploy, D-FILE-04, or orphan cleanup.

## 2026-09-11 blocker

The initial execution recreated and attested the approved disposable runtime,
but its temporary Playwright sign-in/navigation flow stopped before it produced
the browser-generated request required for transport capture. No transport
alteration occurred. Resume only after the temporary harness can demonstrate a
stable real A sign-in and `/catalog` navigation; then execute this packet
without redefining the requested scenarios.

## 2026-09-11 host-secret gate — superseded

The latest preflight recreated the approved disposable database, applied all
47 migrations, and created canonical synthetic fixtures, but host safety
enforcement rejected propagation of the local-only `BETTER_AUTH_SECRET` to the
isolated Next child process. No Next runtime or browser transport request was
started. This is a host execution-policy block, not a repository defect.
Cleanup removed the named container, volume, restricted artifacts, and temporary
helpers. The Product Owner subsequently clarified that the harness must not
propagate any unrelated secret; normal local `.env` / `.env.local` loading is
authoritative for all non-database runtime configuration. This supersedes the
prior secret-delivery block without authorizing an authentication bypass or a
substitute key.

## 2026-09-11 execution result — awaiting TERRA review

The database-only harness policy was followed: only `DATABASE_URL` and
`DIRECT_URL` were process-set, both matched the attested loopback disposable
target, and normal Next local environment loading supplied all other settings.
The A preflight passed with real Better Auth sign-in, active-Organization
restoration, `/catalog` navigation, canonical tenant resolution, and browser
transport observation.

- RV-04: executor reports PASS from a real A edit request with only the raw
  provider URL field added and no grant; no Category image persisted.
- RV-07: executor reports PASS from one real callback-backed A update followed
  by one exact authenticated browser-request replay; restricted counts showed
  no extra Category state and one consumed grant at that sequence point.
- RV-08: executor reports PASS from independent A/B contexts with only B's
  opaque browser grant field replaced by an actual A grant; B did not receive
  an image and the B grant stayed unconsumed.
- RV-11: PARTIAL. Console/runtime flow observations exist, but the existing
  development Axiom sink was not queried by this database-only harness, so a
  complete emitted-record allowlist/forbidden-field audit is not claimed.
- RV-09 and RV-10 remain NOT RUN.

The run-tracked provider objects were deleted, browser contexts and runtime
stopped, and the exact disposable database container/volume and temporary
harness artifacts were removed. See the redacted runtime evidence for details.

## 2026-09-11 Terra review

TERRA independently accepted the browser preflight and redacted evidence for
RV-04, RV-07, and RV-08. The evidence does not support an RV-11 pass because
it lacks the required all-event allowlist/forbidden-field audit. RV-09 remains
NOT RUN because the installed provider's local-development flow provides no
safe supported callback replay control. Docker inventory and local listener
checks confirmed the named disposable resources and runtime were removed.

The telemetry evidence audit completed on 2026-09-11 and found a concrete
decision-monitor contract violation. `decision-telemetry.ts` emits
`organizationId` and raw `roles`, contrary to the architecture's explicit
identity/raw-role exclusion. RV-11 is FAIL / CORRECTION_REQUIRED. The smallest
next task is a bounded correction to that shared decision-telemetry sanitizer
and its focused tests, followed by fresh record-level audit evidence. TERRA
must review the shared authorization seam before accepting it. Do not advance
the parent until reviewed.
