# N-FILE-104/105 — WorkType runtime-verification packet

Status: CLOSED — `PASS_WITH_LIMITATIONS`; parent gate `ELIGIBLE`  
Authority: task evidence and runtime approval record  
Verification tier: V3 — Sensitive  
Classification: NON_DESTRUCTIVE

## Runtime claims and proportional boundary

This checkpoint verifies only WorkType-specific claims that code review cannot
establish against real infrastructure. It reuses the accepted Category pilot
as evidence for the shared grant/callback service design, but does not treat
Category execution as proof that the new WorkType route, target resolver, UI,
or commands work at runtime.

Required WorkType claims:

- N-FILE-104 issues a canonical targetless grant only after `catalog.create`.
- N-FILE-105 binds staging and consumption to the authoritative WorkType ID.
- UploadThing development upload and verified callback complete for the
  dedicated `workTypeIconAvatar` route.
- Grant-backed create/update consume exactly once in the WorkType mutation
  transaction; replay cannot mutate.
- A no-grant update preserves the persisted image.
- Raw provider URLs confer no create/update authority and persisted removal is
  unavailable.
- Cross-tenant WorkType targets deny before provider/domain work.
- WorkType authorization/grant telemetry remains allowlisted and secret-safe.

This local-development checkpoint will not prove production/deployed callback
reachability. It does not repeat unsupported provider callback replay, D-FILE-04,
persisted deletion, expiry scheduling, or provider orphan-cleanup acceptance.

## Approved development target

Product Owner clarification on 2026-09-21 supersedes the earlier disposable
Docker proposal for this checkpoint. Use the existing LabOS development
environment by default; do not provision replacement infrastructure merely
because this is V3. The exact effective targets must be attested read-only
before any state-changing operation without recording secret values.

| Resource | Exact proposed identity | Use |
| --- | --- | --- |
| Database | Existing Supabase development database | Bounded run-marked synthetic fixtures only; no migrations, reset, or unrelated-data mutation |
| Application | Existing local Next.js development application | Real application/API/UI paths; attest origin and effective datasource before mutation |
| Provider | Existing Product Owner-approved UploadThing development project/credential loaded normally by `.env.local` | Development upload/callback only; no new project/token/configuration |
| Browser | Built-in Codex browser, clean synthetic sessions | Real Better Auth and WorkType UI flows |
| Telemetry | Existing development sink, queried read-only through its authenticated UI only if required | Redacted WorkType field inventory |

Before mutation, independently attest the effective Supabase development
database, local application origin, Better Auth development configuration, and
UploadThing development project/mode without printing secrets. Existing local
configuration loads normally; do not inject, rewrite, duplicate, or substitute
credentials. Stop if a production/staging target or an unexpected hosted target
could become authoritative.

## Authority requested

Product Owner disposition: APPROVED on 2026-09-21 for bounded non-destructive
verification against the existing LabOS development environment. The approval
does not expand any stated exclusion.

Approved operations:

1. Read-only attestation of the effective development database, application,
   Better Auth, and provider identities without secret disclosure.
2. Use the existing local Next.js application and normal development
   configuration as-is. Do not apply migrations or alter configuration.
3. Use the existing Product Owner-approved UploadThing development credential
   and project for real synthetic WorkType uploads, callbacks, and exact
   cleanup. Do not create/rotate credentials or change provider configuration.
4. Create, mutate, and delete only the collision-resistant, run-marked
   synthetic A/B fixtures below through supported application flows. Preserve
   unrelated development data and delete only exact run-created resources.
5. Inspect only the smallest fresh WorkType telemetry window in the existing
   development sink, retaining only redacted field inventories.
6. Retain restricted identifiers outside Git only through review, then remove
   them; retain redacted evidence in this task directory.

No approval exists for Docker or alternative infrastructure provisioning,
deployment, production/staging resources, real users/data, schema reset,
migration application or changes, destructive cleanup, provider
reconfiguration, credential rotation, public tunnels, D-FILE-04, persisted
removal, expiry scheduling, or orphan-cleanup implementation. If a claim
genuinely requires destructive isolation, stop and document the claim, why the
development environment is unsafe, and the smallest isolated target required.

## Fixture manifest

| Run-marked fixture | Purpose | Required canonical relationship | Cleanup proof |
| --- | --- | --- | --- |
| Synthetic A identity/tenant | Authorized positive flows | User → Organization A → owner Member A → Lab A → LabSettings A | Delete exact run-marked records through supported cleanup; attest no marker remains |
| Category A | Same-tenant WorkType parent | `CaseCategory.labId = Lab A` | Delete exact run-marked record only |
| WorkType A | Create/update target | `WorkType.labId = Lab A`; Category A linkage | Delete exact run-marked record only |
| Synthetic B identity/tenant | Cross-tenant denial | User → Organization B → owner Member B → Lab B → LabSettings B | Delete exact run-marked records through supported cleanup; attest no marker remains |
| WorkType B | Foreign target for A/B denial | `WorkType.labId = Lab B` | Delete exact run-marked record only |
| Synthetic images | Upload/replacement | Non-sensitive generated PNGs with run marker | Provider keys recorded restrictedly, deleted, deletion attested |

Use supported Better Auth/onboarding/application flows wherever practical.
No C/unaffiliated actor is required because the new material risk is the
WorkType resource resolver's Organization isolation; missing canonical context
was already established for the shared route mechanism in the accepted
Category checkpoint and has unchanged code.

## Harness preflight

Before the matrix:

1. Attest the effective development database, local application, Better Auth,
   and UploadThing development targets.
2. Confirm the existing schema exposes the required auth, grant, Category, and
   WorkType relations without applying migrations.
3. Confirm Better Auth signup/session against the attested database.
4. Create and verify canonical run-marked A/B relationships.
5. Verify `workTypeIconAvatar` is advertised by
   `/api/uploadthing`.
6. Authenticate A and B through real Better Auth browser flows.
7. Confirm browser request/response observation and provider development mode.

On the first harness failure, permit one bounded repair tied to a concrete
hypothesis. Stop at the same boundary without new application evidence.

## Risk-to-scenario map

| ID | Claim / material risk | Required operation and evidence | Initial result |
| --- | --- | --- | --- |
| WTRV-01 | Authorized targetless create staging | A stages a WorkType image; inspect still-PENDING N-FILE-104 grant for canonical Organization/Lab/Member, null target, purpose, and expiry | NOT_RUN |
| WTRV-02 | Real provider callback | Complete a synthetic upload; verify presign, metadata registration, signature-verified development callback, and UPLOADED grant | NOT_RUN |
| WTRV-03 | Transactional create consumption | Create WorkType A with opaque grant; verify provider URL persisted only from grant and grant becomes CONSUMED once | NOT_RUN |
| WTRV-04 | Authoritative update target and replacement | Stage/update using WorkType A ID; verify N-FILE-105 target binding, callback, replacement persistence, and one-time consumption | NOT_RUN |
| WTRV-05 | No-grant preservation | Edit WorkType A without a new grant; verify image URL remains unchanged | NOT_RUN |
| WTRV-06 | Replay and rollback | Replay a consumed create/update grant through the real command; verify rejection and no WorkType mutation | NOT_RUN |
| WTRV-07 | Raw URL non-authority/removal unavailable | Attempt supported-form/API input containing a raw URL without a grant and inspect UI removal behavior; verify no replacement/removal authority | NOT_RUN |
| WTRV-08 | Cross-tenant denial | A attempts N-FILE-105 against WorkType B (and B against A where useful); verify denial before grant/provider/domain work and no existence disclosure | NOT_RUN |
| WTRV-09 | Sanitized telemetry | Inspect fresh allow/deny/callback/consumption field inventories for WorkType labels; verify forbidden identity, role, token, session, provider-signature, URL, payload, and error fields are absent | NOT_RUN |

Scenario results are only `PASS | FAIL | NOT_RUN | BLOCKED`. An unexecuted
scenario never passes. Any accepted limitation must record missing assurance,
blocker class, future trigger/environment, and Product Owner disposition.

## Stop conditions

Stop and classify the exact boundary if:

- datasource/provider identity is wrong or cannot be independently attested;
- a hosted/shared/production resource could become authoritative;
- migrations or generated client contradict the accepted code baseline;
- provider execution requires configuration changes or a public tunnel;
- runtime behavior reveals an application/security defect;
- cleanup targets become uncertain;
- a secret would be printed or persisted;
- the same harness boundary fails after one hypothesis-driven repair without
  new application evidence.

Only `APPLICATION_DEFECT` routes to application correction by default.

## Cleanup and evidence

After evidence capture and review:

- delete every provider object created by this run and attest its absence;
- sign out and close synthetic browser sessions;
- stop only a Next.js process started specifically by this run;
- delete only exact run-marked development fixtures; do not reset or otherwise
  clean the shared development database;
- delete ephemeral credentials, temporary images, helpers, and restricted
  metadata after review;
- verify no runtime-only helper remains in the worktree;
- retain only redacted scenario results, field inventories, commands without
  secrets, and Reviewer/Primary dispositions in this directory.

Parent runtime acceptance and eligibility remain `PENDING` until execution,
cleanup, independent `RUNTIME_EVIDENCE` review, and Primary reconciliation.

## Execution attempt — 2026-09-21

Status: `BLOCKED` — `VERIFICATION_ENVIRONMENT_BLOCKER`

The approved execution was initiated with the required read-only repository and
target checks. Docker Desktop is installed and a desktop process is present,
but the Docker engine is not reachable from this session: the
`com.docker.service` service is stopped and cannot be opened or started under
the current Windows session. The Docker named pipe
`npipe:////./pipe/docker_engine` is unavailable.

No WorkType verification resources were created. In particular, this attempt
did not create or mutate the proposed container
`labos-rv-worktype-20260921`, volume
`labos-rv-worktype-20260921-data`, database
`labos_rv_worktype_20260921`, application runtime, browser state, fixtures,
provider objects, or telemetry records. No migrations were applied and no
provider configuration was accessed or changed.

Required smallest unblock: make the local Docker engine available to the
execution session (for example, Product Owner starts Docker Desktop with its
required service permissions). After that external environment change, repeat
the packet's preflight target attestation before creating any resource. No
application or architecture change is indicated.

## Environment supersession — 2026-09-21

The Product Owner subsequently selected the existing LabOS development
environment as the authoritative target and prohibited replacement
infrastructure for this run. The Docker preflight failure above remains
historical execution evidence but is no longer a blocker or an instruction to
start Docker. Execution must follow the approved development-target,
non-destructive fixture, exact-cleanup, and stop boundaries in this packet.

## Existing-development execution evidence — 2026-09-21

This execution used the approved existing local Next.js application, Supabase
development database, Better Auth development configuration, UploadThing
development route, and Codex browser. No Docker, migration, schema reset,
provider reconfiguration, credential rotation, or deployment was used.

### Target attestation (redacted)

- Database: the configured pooled/direct endpoints resolved to the same
  Supabase development host; a read-only query returned `postgres`, `public`,
  PostgreSQL 5432, and 47 migrations. The expected auth, organization, lab,
  category, WorkType, and FileUploadGrant relations were present.
- Application: the effective Better Auth origin was `http://localhost:3000`;
  the health endpoint returned 200 and the unauthenticated session was null
  before signup. The local Next process was started specifically for this run
  with network access required for the already-attested development database.
- Provider: `/api/uploadthing` returned 200 and advertised
  `workTypeIconAvatar`; the configured route used the existing development
  credential. No token or provider URL/key was retained in this packet.

### Per-scenario evidence

Evidence is intentionally redacted to counts/presence and operation outcomes;
provider keys, URLs, auth identifiers, session values, and credentials are
restricted and were not written here.

| ID | Status | Attributable evidence and limitation |
| --- | --- | --- |
| WTRV-01 | `BLOCKED` | A real WorkType create flow staged an image and the resulting targetless N-FILE-104 grant was consumed by the create transaction. The required restricted snapshot while the grant was still `PENDING` was not captured before callback/commit, so the intermediate-state claim is not accepted here. Classification: `VERIFICATION_ENVIRONMENT_BLOCKER` (the harness did not pause/capture the transient state). Missing assurance: runtime proof of canonical Organization/Lab/Member linkage, null target, purpose, expiry, and `PENDING` status at issuance. Future trigger: a bounded stage-only capture with a supported pause/inspection mechanism, or Product Owner acceptance of this residual limitation. |
| WTRV-02 | `PASS` | The real `workTypeIconAvatar` route completed from browser upload through application callback and returned upload success; the post-action grant projection had provider key/URL presence and reached the consumed create state. No raw provider metadata was exposed. |
| WTRV-03 | `PASS` | WorkType A was created through the real UI with the opaque grant. Read-only projection showed image URL presence and one consumed N-FILE-104 grant; no direct URL/key command input was used. |
| WTRV-04 | `PASS` | A real edit flow uploaded a replacement and persisted it. The read-only projection showed one consumed N-FILE-105 grant bound to WorkType A and provider key/URL presence. Two additional same-target N-FILE-105 grants remained `UPLOADED` from duplicate staging attempts and were included in exact cleanup. |
| WTRV-05 | `PASS` | A real metadata-only edit with no new grant persisted the description while the WorkType image remained present. The UI removal control was disabled and labeled that persisted-image removal is unavailable. |
| WTRV-06 | `PASS` | The real application command/domain path was exercised against the attested development database: replay of the consumed update grant returned `UploadGrantError` with no WorkType mutation; the consumed update grant count remained one. |
| WTRV-07 | `BLOCKED` | Primary re-opened the authenticated real WorkType editor for the run-marked A fixture. It exposed only the file chooser/grant-upload boundary, with no raw provider URL field and no persisted-image removal control. Source/review confirms the existing action input schema still accepts `imageUrl`, while the protected WorkType command ignores it; the required authenticated raw-URL action submission was not executed at runtime. No fabricated transport or direct database mutation was used. Classification: `CAPABILITY_BLOCKER` for the completed browser run, not an application defect. Missing assurance: runtime proof that a raw URL submitted through the existing authenticated action input cannot replace/persist an image without a grant. Future trigger: a bounded supported browser/action transport capable of submitting that existing input, or Product Owner acceptance of this residual limitation. |
| WTRV-08 | `PASS` | The real application command/domain path denied a cross-tenant update before mutation with `AuthorizationError`; before/after WorkType projections were unchanged and no existence/provider work was disclosed. |
| WTRV-09 | `PASS` | Primary inspected the smallest fresh authenticated Axiom development window. It contained 10 WorkType authorization-decision records (9 allowed, 1 denied), 11 WorkType grant records (3 N-FILE-104, 8 N-FILE-105), 4 provider completions, and 2 consumptions. The retained field inventory showed zero presence for identity/raw-role/token/session/header/URL/raw-input/provider/database-error fields in decision records and zero presence for identity/role/token/session/provider-signature/URL/key/raw-input/nested-payload/error fields in grant/provider/consumption records. No telemetry values or secrets were retained. |

The WTRV-01 transient-state capture boundary is classified
`VERIFICATION_ENVIRONMENT_BLOCKER`; the WTRV-07 authenticated action-transport
boundary is classified `CAPABILITY_BLOCKER`. Neither is an application defect.
Both remain unaccepted pending a bounded rerun or an explicit Product Owner
`PASS_WITH_LIMITATIONS` disposition. WTRV-09 is accepted on the fresh
authenticated Axiom field inventory above.

### Exact cleanup execution

Before deletion, a read-only exact-marker preflight enumerated two synthetic
organizations, two synthetic users, two categories, two WorkTypes, and six
provider keys. The six keys comprised the two onboarding logo objects and the
WorkType initial/replacement/duplicate-staged objects. Cleanup used the
supported UploadThing `UTApi.deleteFiles` operation for only those six keys,
then removed only the two exact marker organizations and users; organization
cascade removed their exact lab, settings, category, WorkType, membership,
session/account, and grant records. No unrelated rows were targeted. The
UploadThing operation reported 6/6 provider keys deleted. Post-cleanup
read-only attestation reported zero exact marker organizations, users,
categories, WorkTypes, and provider keys; organization cascade removed the
associated exact grants. Primary signed out and closed the synthetic LabOS
browser tab. The existing authenticated Axiom telemetry tab remained open as
the Product Owner's pre-existing UI and was not a synthetic runtime session.
The run-owned Next PID was verified and stopped, and the three temporary SVGs
plus runtime replay/cleanup helpers were removed. No runtime-only helper
remains in the worktree.

### Independent review and checkpoint disposition

Reviewer verdict: `CORRECTION_REQUIRED`  
Review scope: `RUNTIME_EVIDENCE | CHECKPOINT`

The Reviewer accepted the target/cleanup evidence and the recorded PASS results
for WTRV-02–06, WTRV-08, and WTRV-09, but rejected runtime acceptance and
parent eligibility while WTRV-01 and WTRV-07 lack runtime proof or explicit
residual dispositions. Runtime acceptance therefore remains `PENDING`; parent
gate is `INELIGIBLE`.

Required Product Owner decision for each blocked claim:

1. authorize one bounded rerun that captures WTRV-01 before callback/commit and
   submits WTRV-07 through the existing authenticated action input; or
2. accept `PASS_WITH_LIMITATIONS`, acknowledging the missing assurances above,
   retaining the stated future triggers, and confirming that neither blocked
   scenario is treated as passed.

### Product Owner rerun authorization — 2026-09-21

The Product Owner authorized one bounded rerun of WTRV-01 and WTRV-07. Reuse
the approved existing-development target rules, independently re-attest targets
before mutation, recreate only the minimum collision-resistant run-marked
fixture, and preserve all prior PASS evidence without rerunning unrelated
scenarios. WTRV-01 must capture the authoritative grant while still `PENDING`
before callback/commit. WTRV-07 must use the existing authenticated WorkType
action input boundary to submit a raw `imageUrl` without a grant and prove no
image authority or mutation. No database fabrication, authentication bypass,
provider/configuration change, schema/migration operation, or unrelated matrix
work is authorized. Exact fixture/provider/runtime cleanup remains mandatory.

### Bounded WTRV-01/WTRV-07 rerun — 2026-09-21

The Product Owner-authorized rerun used the existing development targets after
fresh non-secret attestation. The read-only database attestation returned
`postgres` / `public` / PostgreSQL 17.6 with 47 migrations and the expected
authorization, organization, Lab, Category, WorkType, and FileUploadGrant
relations. The local application health endpoint returned 200 and
`/api/uploadthing` advertised `workTypeIconAvatar`. Better Auth and UploadThing
development configuration was present without recording secret values. No
Docker, migration, schema, configuration, deployment, credential, or provider
project change was made.

The minimum synthetic fixture was created through supported application flows:
one run-marked signup, onboarding workspace (including one synthetic logo),
Category, and WorkType. No WorkType image upload was started and no WorkType
grant/provider object was created during this rerun.

| ID | Latest rerun status | Redacted evidence and disposition |
| --- | --- | --- |
| WTRV-01 | `BLOCKED` | Capability preflight found no supported browser request interception, pause, or stage-only transport. The application upload path proceeds from the UploadThing middleware grant-creation request to provider upload and callback; no safe controlled pause could be established. The required authoritative `PENDING` N-FILE-104 projection was therefore not captured. Classification remains `VERIFICATION_ENVIRONMENT_BLOCKER`; no callback, provider upload, database fabrication, or weakened constraint was used. |
| WTRV-07 | `BLOCKED` | The authenticated WorkType editor exposed only the supported file/grant boundary; it provided no raw `imageUrl` control. The browser session exposed no supported authenticated action transport or WebMCP tool for submitting the existing schema field, and page evaluation is read-only. The required raw-URL submission was therefore not executed and no image mutation was claimed. Classification remains `CAPABILITY_BLOCKER`. Persisted-image removal was not re-established with a persisted image in this minimum fixture; the prior retained UI/code evidence that removal is unavailable remains unchanged. |

The synthetic browser session was signed out through the application account
menu and its tab was closed. Exact cleanup then deleted the one onboarding
UploadThing object created by this rerun (`1/1` reported deleted) and removed
the exact run-marked organization and user through the supported cleanup path;
their cascaded Lab, settings, membership, Category, WorkType, sessions,
accounts, and grants were removed. Post-cleanup read-only attestation returned
zero exact-marker organizations, users, Categories, WorkTypes, and grants.
The run-owned local Next process was stopped, and the temporary synthetic SVG
and cleanup helper were removed. No runtime-only helper remains in the
worktree. Prior PASS evidence for WTRV-02–06, WTRV-08, and WTRV-09 was not
rerun or changed.

### Bounded rerun independent review

Reviewer verdict: `BLOCKED_DECISION`  
Review scope: `RUNTIME_EVIDENCE | CHECKPOINT`

The Reviewer confirmed the rerun classifications, preservation of prior PASS
evidence, exact cleanup, absent port-3000 listener, and absence of runtime
helpers/assets. WTRV-01 and WTRV-07 remain blocked and are not passed. Runtime
acceptance remains `PENDING`; parent eligibility remains `INELIGIBLE`.

The remaining Product Owner decision is to explicitly accept
`PASS_WITH_LIMITATIONS` for both claims—acknowledging the missing live
`PENDING`-grant projection and missing authenticated raw-`imageUrl` runtime
submission, retaining their documented future triggers, and confirming neither
scenario passed—or defer acceptance until a future environment supplies the
required safe pause and authenticated action-transport capabilities.

### Product Owner residual disposition — 2026-09-21

The Product Owner approved `PASS_WITH_LIMITATIONS` for the WorkType runtime
checkpoint, subject to final independent Reviewer confirmation that Workflow
V2 permits disposition of the two residual claims.

- WTRV-01 remains `BLOCKED`, not `PASS`. The Product Owner accepts the missing
  runtime observation of the authoritative N-FILE-104 grant while `PENDING`,
  including canonical Organization/Lab/Member linkage, null target, purpose,
  and expiry. The real create/upload/callback/consumption evidence and focused
  code coverage remain valid but do not substitute for that snapshot. Future
  trigger: an environment or supported stage-only inspection capability.
- WTRV-07 remains `BLOCKED`, not `PASS`. The Product Owner accepts the missing
  authenticated runtime submission of raw `imageUrl` through the existing
  WorkType action input. UI absence, command-level non-authority, and no-grant
  preservation remain valid but do not prove that submission occurred. Future
  trigger: an environment with supported authenticated action transport.

Do not rerun either claim with the same capabilities, manufacture grant state,
forge an authenticated request, bypass authentication, or modify application
behavior solely to satisfy the packet. Preserve WTRV-02–06, WTRV-08, and
WTRV-09 as `PASS` and preserve the exact cleanup evidence.

### Final independent checkpoint review and reconciliation

Reviewer verdict: `PASS`  
Review scope: `CHECKPOINT | RUNTIME_EVIDENCE`

The Reviewer confirmed that Workflow V2 permits `PASS_WITH_LIMITATIONS` because
both residual scenarios retain their actual `BLOCKED` results and each has a
documented missing assurance, blocker classification, future trigger, and
explicit Product Owner disposition. Cleanup is complete, accepted code history
remains separate, and reconciliation introduces no application, schema,
migration, provider, configuration, or deployment change.

| Scenario | Final result |
| --- | --- |
| WTRV-01 | `BLOCKED` — `VERIFICATION_ENVIRONMENT_BLOCKER`; Product Owner-approved residual limitation |
| WTRV-02 | `PASS` |
| WTRV-03 | `PASS` |
| WTRV-04 | `PASS` |
| WTRV-05 | `PASS` |
| WTRV-06 | `PASS` |
| WTRV-07 | `BLOCKED` — `CAPABILITY_BLOCKER`; Product Owner-approved residual limitation |
| WTRV-08 | `PASS` |
| WTRV-09 | `PASS` |

Final reconciliation:

- Runtime acceptance: `PASS_WITH_LIMITATIONS`
- Parent gate: `ELIGIBLE`
- Checkpoint status: `CLOSED`

Residual verification obligations remain durable but do not reopen this
checkpoint: capture the WTRV-01 authoritative still-`PENDING` projection only
when safe stage-only inspection exists, and execute the WTRV-07 authenticated
raw-`imageUrl` submission only when supported action transport exists. Neither
blocked scenario is represented as passed.
