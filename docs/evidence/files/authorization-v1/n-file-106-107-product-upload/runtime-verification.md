# N-FILE-106/107 — Product runtime-verification packet

Status: `CLOSED`  
Authority: approved task evidence and runtime execution record  
Verification tier: `V3 — Sensitive`  
Classification: `NON_DESTRUCTIVE`  
Runtime acceptance: `PASS_WITH_LIMITATIONS`  
Parent gate: `ELIGIBLE`

## Checkpoint boundary

This checkpoint verifies only Product-specific behavior that the accepted V3
`CODE` review cannot establish against real infrastructure. It uses the
existing LabOS development application, Supabase database, Better Auth
configuration, UploadThing development project, and Codex built-in browser.
It does not authorize execution by itself.

Required Product runtime claims:

- both supported Product create surfaces complete a real
  `productIconAvatar` upload and create a Product from the returned opaque
  N-FILE-106 grant;
- the Catalog edit surface completes a real image replacement using an
  N-FILE-107 grant bound to the authoritative Product ID;
- the final Product mutation path accepts only same-Lab WorkTypes, including a
  successful reassignment, and rejects a foreign-Lab WorkType without mutation;
- Product update staging and commit deny a cross-tenant Product target before
  grant, provider, or Product mutation work and without existence disclosure;
- successful Product create/update consumes the matching grant once in the
  mutation transaction, and replay cannot mutate Product state;
- a Catalog edit without a new grant preserves the existing image;
- the Product route completes its verified provider callback and Product
  authorization/grant telemetry is allowlisted and secret-safe.

The genuinely Product-specific create-staging claim is that each supported
create UI invokes the dedicated Product route and produces an N-FILE-106 grant
with Product purpose, canonical Organization/Lab/Member linkage, null target,
and registered expiry, followed by the real callback and create consumption.
Those durable fields may be inspected on the consumed grant after each create;
a live `PENDING` snapshot is not required and the WorkType WTRV-01 experiment
must not be repeated.

## Reused evidence and exclusions

| Evidence | Reused conclusion | Not established for Product |
| --- | --- | --- |
| Closed Category runtime packet | Real development schema/migration compatibility and the shared persisted-grant/callback service design | Product route, Product labels, Product UI, Product resolver, or Product commands |
| Closed WorkType runtime packet, WTRV-02–06, WTRV-08, WTRV-09 | Existing-development provider/callback capability, one-time transaction machinery, replay behavior, exact-cleanup method, and telemetry inspection method | Product-specific callback, target binding, WorkType reassignment, Product mutation, or Product telemetry |
| Accepted Product V3 code evidence | Closed stage projection, raw-URL non-authority, authorization ordering, same-Lab WorkType checks, transactional consumption wiring, and no-grant image preservation | Real database/provider/browser execution |

Raw provider URL non-authority remains a code-level Product claim. Do not
repeat WorkType WTRV-07 through the same browser/action-transport capability.
Only add a runtime raw-URL scenario if a new supported authenticated action
transport becomes available before execution and the Product Owner separately
authorizes the added operation.

Also excluded: a live `PENDING`-grant snapshot, provider callback replay,
unsafe failure injection, persisted-image removal/deletion, expiry scheduling,
orphan cleanup, migration/schema operations, provider reconfiguration,
deployment, production/staging claims, N-FILE-108/109, and D-FILE-04.

## Proposed effective targets and attestation gate

| Resource | Proposed target | Required read-only attestation before mutation |
| --- | --- | --- |
| Database | Existing Supabase development database | Effective host/project fingerprint, database/schema, migration count, and required auth/Organization/Lab/Category/WorkType/Product/FileUploadGrant relations; no secrets |
| Application | Existing local Next.js application from the accepted workspace | Exact revision/worktree identity, local origin/port, health response, and effective datasource match |
| Authentication | Existing Better Auth development configuration | Development base origin and unauthenticated baseline; no cookie, token, or secret values |
| Provider | Existing UploadThing development project/credential | Development project/application identity or safe fingerprint and `/api/uploadthing` advertisement of `productIconAvatar`; no token, key, URL, or secret values |
| Browser | Codex built-in browser | Clean synthetic sessions against the attested local origin |
| Telemetry | Existing development sink | Authenticated read-only access to the smallest fresh Product event window |

After packet approval, local startup and read-only attestation are phase one.
No account, tenant, database row, provider object, synthetic authenticated
session, or temporary runtime helper may be created or changed until Primary
records that every effective identity matches the intended development target.
The mutation authority requested below is conditional on that match. Stop and
return to the Product Owner if an identity is unknown, mismatched, shared beyond
the approved development scope, or could be production/staging.

## Product Owner approval requested

Approval is requested only for this exact run, conditional on the attestation
gate passing:

1. Start the existing local Next.js application with its configuration
   unchanged, and use clean Codex browser sessions against the attested origin.
2. Through supported Better Auth/onboarding/application flows, create, use,
   mutate, and delete only the collision-resistant run-marked A/B fixtures in
   the manifest below.
3. Make only the five planned upload attempts: two onboarding logos and three
   Product images in the existing UploadThing development project. Accept
   normal verified callbacks, retain provider keys only in restricted temporary
   evidence, and delete every exactly attributable run-created object,
   including a provider-created retry/duplicate if one occurs.
4. Execute the two real Product image creates and the Catalog replacement and
   grantless edit through the supported browser surfaces.
5. Use the previously accepted bounded real command/domain runtime method for
   same-Lab reassignment, foreign-WorkType rejection, Product cross-tenant
   stage/commit denial, and consumed-grant replay. The method may use one
   run-owned temporary helper outside application source, must derive only the
   attested synthetic fixture context, must not bypass authorization or alter
   constraints, and must be removed after review.
6. Perform scoped read-only database projections before/after scenarios and
   inspect only the smallest fresh Product telemetry window. Retain redacted
   field inventories and outcomes, never values or secrets.
7. Delete only exact run-created database/provider resources, close synthetic
   sessions, stop only a process started by this run, remove temporary files,
   and attest zero remaining run markers and provider keys.

No approval is requested for Docker, replacement infrastructure, real users or
data, schema reset, migration application/reversal, database fabrication,
authentication bypass, provider project/credential/configuration changes,
public tunnels, deployment, destructive fault injection, uncertain cleanup,
or mutation of any pre-existing resource.

## Minimum fixture manifest

Use one collision-resistant marker, recorded outside Git while the run is
active.

| Fixture | Purpose and canonical relationship | Exact cleanup proof |
| --- | --- | --- |
| Identity/tenant A | User A → Organization A → owner Member A → Lab A → LabSettings A | Exact marker absent from user, organization, membership, Lab, settings, session, and account records |
| Category A; WorkTypes A1/A2 | Both WorkTypes belong to Lab A; A1 is initial parent and A2 is the reassignment target | Exact IDs absent after Organization A cleanup |
| Products A1/A2 | A1 is created through the clinical create sheet; A2 through Catalog create, then replacement/reassignment/preservation checks | Exact IDs and marker absent after cleanup |
| Identity/tenant B | User B → Organization B → owner Member B → Lab B → LabSettings B | Exact marker absent from user, organization, membership, Lab, settings, session, and account records |
| Category B; WorkType B; Product B | Foreign targets for A-side WorkType and Product denials; Product B needs no image | Exact IDs absent after Organization B cleanup |
| Synthetic provider objects | Expected minimum/normal count five: two required onboarding logos; Product A1 initial image; Product A2 initial and replacement images | Restricted actual run-key inventory reconciles exactly to the provider deletion count, then absence is attested; any variance is explained |

No unaffiliated C actor is required. Missing canonical context and the shared
route's general denial behavior are unchanged and already covered by accepted
Category evidence; the new material denial risk is Product target resolution.

## Harness preflight

After approval and before the scenario matrix:

1. Repeat and record the non-secret target attestation.
2. Confirm the accepted schema is already present without applying migrations.
3. Confirm `/api/uploadthing` advertises `productIconAvatar` and the local
   application can use normal Better Auth development sessions.
4. Confirm browser upload and response observation, exact provider-object
   inventory, scoped database projection, and telemetry read capability.
5. Confirm the bounded command/domain method can address only the exact A/B
   fixture IDs and cannot mutate unrelated data.

On the first harness failure, allow one bounded repair tied to a concrete
hypothesis. Stop at the same boundary without new application evidence.

## Claim-mapped scenario matrix

| ID | Product claim and approved operation | Acceptance criteria | Result |
| --- | --- | --- | --- |
| PRV-01 | Clinical Product create surface | In A's clinical create sheet under WorkType A1, upload Product image 1 and create Product A1. The real Product route completes callback; the browser receives only the opaque grant ID; Product A1 persists the callback-verified URL; exactly one N-FILE-106 grant with canonical A linkage, null target, Product purpose/expiry, and one CONSUMED transition is attributable to the create. | `PASS` |
| PRV-02 | Catalog Product create surface | In the Catalog Product editor's create mode under WorkType A1, upload Product image 2 and create Product A2. Apply the same route, callback, opaque handoff, Product persistence, canonical linkage, null target, purpose/expiry, and exactly-once consumption criteria independently of PRV-01. | `PASS` |
| PRV-03 | Catalog replacement and authoritative Product binding | Open Product A2 through the Catalog edit surface, upload replacement image 3, and submit. The N-FILE-107 grant is bound to target type `catalog.product` and Product A2's authoritative ID; callback completes; Product A2 alone receives the new verified URL; the grant is consumed once. | `PASS` |
| PRV-04 | Same-Lab WorkType validation and reassignment | Through the bounded real command/domain method, first attempt to assign Product A2 to foreign WorkType B and verify rejection, unchanged Product/image, and no grant/provider work. Then reassign Product A2 from A1 to same-Lab A2 without a grant and verify success while preserving its image. | `BLOCKED` |
| PRV-05 | Product-target cross-tenant denial | With canonical tenant A context, attempt N-FILE-107 staging and update commit against Product B. Both deny before grant/provider/Product mutation work, create no grant or provider object, leave Product B unchanged, and do not disclose whether the target exists. | `BLOCKED` |
| PRV-06 | Transactional one-time consumption and replay | Replay Product A2's consumed N-FILE-107 replacement grant through the real Product command path. The replay rejects; consumed count remains one; Product A2's name, description, WorkType, and image remain unchanged; no additional Product or provider work occurs. Successful PRV-01–03 projections must pair each persisted image mutation with its one consumed grant. | `BLOCKED` |
| PRV-07 | Grantless Catalog update preservation | In the Catalog edit surface, change Product A2 metadata without uploading a file. No new grant is created or consumed, the metadata change persists, and the replacement image URL remains byte-for-byte unchanged. Persisted removal remains unavailable and is not exercised. | `PASS` |
| PRV-08 | Product callback and sanitized telemetry | Inspect the smallest fresh Product-only development window covering allow, deny, callback, consumption, and replay outcomes. Records use Product boundary/purpose/target labels and contain only allowlisted lifecycle/envelope fields; identity, raw role/input, tenant IDs, auth/session/token/header data, provider signature/key/URL, payload, and database/provider error detail are absent. | `BLOCKED` |

Scenario results are only `PASS | FAIL | NOT_RUN | BLOCKED`; unexecuted work
never passes. Product runtime acceptance requires PRV-01–08 to pass or each
residual claim to have its missing assurance, blocker classification, future
trigger, and explicit Product Owner disposition recorded. Cleanup and an
independent `RUNTIME_EVIDENCE` review are mandatory before Primary evaluates
checkpoint eligibility or closure.

## Known capability limitations

- The current Catalog editor has no supported WorkType reassignment control.
  PRV-04 therefore needs the bounded real command/domain method; browser
  evidence alone cannot establish reassignment.
- The current Codex browser/action capability does not provide the supported
  authenticated raw-input transport missing from WorkType WTRV-07. This packet
  does not repeat that experiment.
- The upload flow has no safe supported stage-only pause for a live `PENDING`
  projection. The Product-specific durable staging fields are inspected after
  consumption; transient `PENDING` status is not an acceptance claim.
- UploadThing 7.7.4 exposes no safe provider-supported callback replay in this
  environment. Normal Product callback completion is required; callback replay
  is not rerun or claimed.
- This local-development checkpoint cannot establish deployed/production
  callback reachability or production behavior.

If the bounded command/domain method is unavailable at preflight, classify
PRV-04/05/06 as `CAPABILITY_BLOCKER`; do not fabricate requests, weaken auth,
or modify application behavior solely to satisfy the packet.

## Stop conditions

Stop and classify the exact boundary if target identity is unproven or wrong;
an unexpected hosted/shared/production resource could become authoritative;
the accepted schema or generated client is incompatible; a migration,
configuration change, public tunnel, credential change, or new provider
capability is required; the browser or helper would bypass authentication or
authorization; runtime behavior indicates an application/security defect; a
secret would be exposed; or fixture/provider cleanup targets are uncertain.

Only `APPLICATION_DEFECT` routes to application correction by default. This
packet does not authorize a correction task.

## Cleanup and retained evidence

Cleanup order:

1. Freeze the exact run manifest and reconcile the five expected provider
   keys plus any unexpected run-attributable retry/duplicate object; stop for
   disposition if provenance is uncertain.
2. Delete only confirmed run-owned UploadThing objects and attest each absence.
3. Sign out and close A/B browser sessions.
4. Delete only the exact run-marked A/B fixture roots through the supported
   cleanup path; rely only on known cascades and never reset the database.
5. Query by exact marker/IDs and attest zero remaining users, organizations,
   memberships, Labs, settings, sessions/accounts, Categories, WorkTypes,
   Products, and grants.
6. Stop only the local Next.js process started by this run and remove temporary
   images, restricted identifiers, logs, and the run-owned helper.
7. Verify no runtime helper or generated output remains in the worktree.

Retain here only redacted target attestations, scenario outcomes, timestamps,
before/after counts or presence projections, telemetry field inventories,
cleanup receipts, independent review, Product Owner residual dispositions, and
Primary reconciliation. Never retain credentials, cookies, tokens, provider
keys/URLs, raw identifiers, personal data, request payloads, or secret values.

The proposal above became executable only through the Product Owner
authorization recorded in the execution section below. Runtime acceptance,
parent eligibility, and closure remain governed by the resulting scenario
evidence and residual dispositions.

## Authorized runtime execution — 2026-09-22

The Product Owner authorized PRV-01 through PRV-08, the conditional operations,
the A/B fixture manifest, exact cleanup, and independent runtime-evidence
review. Primary completed read-only effective-target attestation before any
mutation and confirmed that every effective target matched the approved
development scope:

- Database: Supabase-hosted `postgres` / `public`, PostgreSQL 17.6, 47 applied
  migrations, and the required auth, Organization, Lab, Category, WorkType,
  Product, and FileUploadGrant relations. The retained host fingerprint is
  `eb0d823953fe`; no datasource value or credential is retained.
- Application/authentication: accepted workspace revision
  `9debd695f4065c65f7b5aa1cd7a118705850b5ad`, local origin
  `http://localhost:3000`, healthy unauthenticated baseline, and the existing
  Better Auth development configuration.
- Provider: the existing UploadThing development credential fingerprint was
  `dab13061d49b`; `/api/uploadthing` returned 200 and advertised
  `productIconAvatar` among eight routes. No provider token, key, or URL is
  retained.
- Browser/telemetry: a clean Codex built-in browser session targeted only the
  attested local origin. The configured development Axiom sink was present,
  but the approved read-only query returned HTTP 403; it was not retried after
  one bounded diagnostic confirmed the same access boundary.

### Scenario evidence

Evidence is intentionally restricted to counts, presence projections, hashes,
and outcomes. Synthetic IDs, provider keys/URLs, credentials, cookies, and raw
telemetry values are not retained.

| ID | Result | Runtime evidence and limitation |
| --- | --- | --- |
| PRV-01 | `PASS` | Through the clinical Product create sheet, Product A1 uploaded through `productIconAvatar`, completed the verified callback, and was selected in the clinical work item after successful creation. The final scoped projection showed one canonical, targetless N-FILE-106 grant with Product create purpose, expiry, provider key/URL presence, and exactly one `CONSUMED` transition; the persisted Product image matched a consumed callback URL. |
| PRV-02 | `PASS` | Through the Catalog Product editor in create mode, Product A2 independently uploaded, completed the verified callback, and appeared in the Catalog after successful creation. The final projection showed the second canonical, targetless N-FILE-106 grant with the same required Product create fields and exactly one `CONSUMED` transition; its initial persisted image matched the consumed callback URL. |
| PRV-03 | `PASS` | The Catalog edit surface staged and committed the replacement. Before commit, the single N-FILE-107 grant was `UPLOADED`, provider metadata was present, and its target type/authoritative target matched Product A2. After commit it was `CONSUMED` once, the sheet reported success, and the persisted image hash changed from the initial image. The final Product image matched the N-FILE-107 callback URL. |
| PRV-04 | `BLOCKED` | The approved real command/domain helper could not launch: both the initial `tsx` invocation and the one bounded `node --import tsx` repair failed before importing application code with `uv_os_get_passwd` / `ENOMEM`. No foreign-WorkType attempt or same-Lab reassignment executed and no application evidence was produced. Classification: `CAPABILITY_BLOCKER`. Missing assurance: real-command rejection of WorkType B and successful image-preserving reassignment from A1 to A2. Future trigger: a supported runtime capable of loading the accepted server-only command modules, or a separately authorized supported action transport. |
| PRV-05 | `BLOCKED` | The same pre-import helper capability failure prevented both canonical tenant-A stage and commit attempts against Product B. No cross-tenant Product operation executed and no grant/provider/Product mutation was attributed to this scenario. Classification: `CAPABILITY_BLOCKER`. Missing assurance: real runtime proof that Product B is denied before staging/commit work without existence disclosure. Future trigger: the same supported command runtime or separately authorized action transport. |
| PRV-06 | `BLOCKED` | The same pre-import helper capability failure prevented replay of Product A2's consumed N-FILE-107 grant. The successful PRV-01–03 projections establish three consumed Product grants paired with the three persisted image mutations, but do not establish Product-specific runtime replay rejection. Classification: `CAPABILITY_BLOCKER`. Missing assurance: consumed-grant replay rejection with unchanged Product state and consumed count. Future trigger: the same supported command runtime or separately authorized action transport. |
| PRV-07 | `PASS` | In the real Catalog edit surface, Primary changed only Product A2's description. The UI exposed the persisted image and disabled removal control, reported success, and rendered the new description. Before/after projections retained exactly three Product grants, and Product A2's image remained byte-for-byte equal to the consumed N-FILE-107 callback URL; no new grant was created or consumed. |
| PRV-08 | `BLOCKED` | PRV-01–03 establish real Product-specific UploadThing callback completion and durable grant lifecycle fields. The configured Axiom development sink rejected the smallest fresh Product query with HTTP 403, and one bounded diagnostic confirmed the same boundary. No telemetry field inventory was obtained, so sanitized Product telemetry is not accepted. Classification: `CAPABILITY_BLOCKER`. Missing assurance: fresh Product authorization/grant telemetry field inventory covering allow, deny, callback, consumption, and replay. Future trigger: restored read-only Axiom query authority; replay/deny records also depend on a supported PRV-04–06 command runtime. |

Raw provider URL non-authority remains accepted code-level evidence only. No
WorkType WTRV-01/WTRV-07, callback replay, fabricated grant state,
authentication bypass, schema change, migration, deployment, or
N-FILE-108/109 work was performed.

### Exact cleanup evidence

The frozen pre-cleanup manifest contained exactly two organizations, two
users, two members, two Labs, two Categories, three WorkTypes, three Products,
three Product grants, and five unique run-owned provider objects. The five
objects were the two onboarding logos and the Product A1 initial, Product A2
initial, and Product A2 replacement uploads.

The first exact five-key `UTApi.deleteFiles` call returned an anomalous
non-success receipt. Database cleanup was withheld. Immediate provider-list
reconciliation showed all five planned keys absent; a second reconciliation
therefore targeted zero remaining keys and again established zero presence.
Only then were the two exact organization roots and two exact users removed.
Post-cleanup projections reported zero remaining organizations, users,
memberships, Labs, settings, sessions/accounts, Categories, WorkTypes,
Products, and grants for the frozen IDs. Primary signed out and closed the
synthetic browser session, reset the temporary viewport, stopped only the
run-owned local Next process, removed all five SVG fixtures and both temporary
helpers, confirmed `.tmp` empty, and confirmed port 3000 no longer listening.

### Primary reconciliation

- Scenario results: PRV-01–03 and PRV-07 `PASS`; PRV-04–06 and PRV-08
  `BLOCKED` under the explicit capability limitations above.
- Runtime acceptance: `PENDING`; blocked scenarios are not treated as passed.
- Parent gate: `INELIGIBLE` until every blocked claim receives runtime evidence
  or an explicit Product Owner residual disposition with the retained missing
  assurance and future trigger.
- Checkpoint: `BLOCKED_DECISION — RESIDUAL DISPOSITION REQUIRED`; not closed.

Independent `RUNTIME_EVIDENCE` review follows this execution record. Product
Owner disposition and Primary checkpoint reconciliation remain separate.

### Independent runtime-evidence review

Reviewer verdict: `CORRECTION_REQUIRED`  
Review scope: `RUNTIME_EVIDENCE`

The Reviewer accepted the attributable evidence and status discipline for
PRV-01–03 and PRV-07, confirmed that PRV-04–06 and PRV-08 were correctly kept
`BLOCKED`, and accepted the exact cleanup evidence. The anomalous UploadThing
receipt does not invalidate cleanup: database deletion was withheld until the
frozen five-key inventory had been reconciled to zero provider presence, and
the final database/browser/process/helper checks were all zero or absent.

The blocking finding is that PRV-04–06 and PRV-08 remain mandatory claims with
no explicit Product Owner residual dispositions. Their retained runtime
limitations are `CAPABILITY_BLOCKER`s; the decision now preventing acceptance
is an `AUTHORITY_BLOCKER`, not an application defect. The Reviewer recommends:

- runtime acceptance: `PENDING`;
- parent gate: `INELIGIBLE`;
- checkpoint remains open pending explicit residual dispositions.

### Final Primary reconciliation for this execution

Primary accepts the Reviewer verdict. The Workflow V2 lifecycle state is
`BLOCKED_DECISION` because the next permitted transition requires Product
Owner authority. PRV-01–03 and PRV-07 remain `PASS`; PRV-04–06 and PRV-08
remain `BLOCKED` and are not represented as passed. Runtime acceptance remains
`PENDING`, the parent gate remains `INELIGIBLE`, and the checkpoint is not
closed.

To resolve this checkpoint, the Product Owner must either:

1. authorize a bounded rerun after a supported server-module runtime and
   read-only Axiom query capability are available; or
2. explicitly accept `PASS_WITH_LIMITATIONS` for PRV-04, PRV-05, PRV-06, and
   PRV-08, acknowledging each retained missing assurance and future trigger.

## Authorized targeted rerun — 2026-09-22

The Product Owner subsequently authorized one bounded rerun of PRV-04,
PRV-05, PRV-06, and PRV-08 after the capability diagnosis in
[`capability-diagnosis.md`](capability-diagnosis.md). PRV-01–03 and PRV-07 were
preserved as `PASS` and were not repeated or reopened.

Primary re-attested the same approved development targets before mutation:

- local application revision `9debd695f4065c65f7b5aa1cd7a118705850b5ad`
  at `http://localhost:3000`, with the existing Better Auth development
  configuration;
- Supabase-hosted `postgres` / `public`, PostgreSQL 17, 47 applied migrations,
  and host fingerprint `eb0d823953fe`;
- the existing UploadThing development route/credential, fingerprint
  `dab13061d49b`, with `productIconAvatar` advertised; and
- the existing Axiom development dataset. Dataset discovery remained
  available, but the current API query boundary still returned HTTP 403 and
  the Codex browser inventory contained no authenticated Axiom UI session.

Mutation authority became effective only after those application, database,
authentication, and provider targets matched the approved development scope.
PRV-08 remained isolated from PRV-04–06 and no token, provider, application,
schema, migration, or infrastructure setting was changed.

### Targeted scenario evidence

One fresh collision-resistant A/B fixture set used a restricted run marker:
two users, Organizations, Members, and Labs; Categories A/B; WorkTypes
A1/A2/B; and Products A/B. Product A began under WorkType A1 without an image.
The real Catalog edit surface then performed the single authorized replacement
upload and first N-FILE-107 consumption needed solely as PRV-06's replay
prerequisite. This setup did not reopen or re-evaluate PRV-03.

The run-owned helper executed outside the Codex sandbox with the authorized
invocation, using the repository's real Product staging and mutation exports,
shared authorization service, Product target resolver, Prisma transaction
path, and upload-grant service. It re-resolved and re-counted the canonical
Better Auth Organization/Member/Lab fixture before every operation and
retained only error classes/codes, counts, and hashes. Its initial transform
attempt stopped before importing application code because CommonJS output does
not support top-level `await`; the one bounded harness repair wrapped the same
helper in async `main()` and changed no application behavior.

| ID | Final result | Targeted runtime evidence |
| --- | --- | --- |
| PRV-01 | `PASS` | Preserved from the accepted first execution; not repeated. |
| PRV-02 | `PASS` | Preserved from the accepted first execution; not repeated. |
| PRV-03 | `PASS` | Preserved from the accepted first execution; not repeated. The rerun's one replacement/consumption was prerequisite setup only. |
| PRV-04 | `PASS` | The foreign-Lab WorkType call returned `CatalogProductWorkTypeNotFoundError`; the complete Product projection hash was unchanged and the grant count remained one. A separate grantless call reassigned Product A from same-Lab WorkType A1 to A2; the reassignment persisted and the image hash remained byte-for-byte equal. |
| PRV-05 | `PASS` | Canonical tenant A staging and commit attempts against Product B both returned public `AuthorizationError` / `AUTHORIZATION_DENIED`; the trusted reason was `AUTHZ_TENANT_MISMATCH`. Product B remained unchanged, stage created no grant, and the grant count remained one. No existence value, identifier, provider metadata, or database detail was retained. |
| PRV-06 | `PASS` | Replaying Product A's already-consumed N-FILE-107 grant returned `UploadGrantError` / `UPLOAD_GRANT_CONSUMPTION_REJECTED`. The before/after Product hashes matched, total grant count remained one, and consumed-grant count remained one. |
| PRV-07 | `PASS` | Preserved from the accepted first execution; not repeated. |
| PRV-08 | `BLOCKED` | No authenticated Axiom UI query session was available, and the existing token remained unauthorized at the read-only APL query boundary. No fresh Product field inventory was obtained; code tests and WorkType telemetry evidence are not substituted. Classification: `CAPABILITY_BLOCKER`. |

PRV-08's exact access requirement is an authenticated Axiom UI session whose
existing user has read/query access to the configured development dataset. No
application token rotation, replacement, or privilege expansion is authorized
or required by this record. A future PRV-08-only run must inspect only the
smallest Product event window retained by the development dataset and must not
repeat PRV-01–07.

### Targeted cleanup evidence

The frozen cleanup manifest contained exactly two users, two organizations,
two members, two Labs, two Categories, three WorkTypes, two Products, one
consumed Product grant, and three provider objects. The provider objects were
the two onboarding logos plus the Product replacement.

Cleanup preflight initially stopped without mutation because the temporary
UTApi client defaulted to `UPLOADTHING_TOKEN` while the existing application
route explicitly uses `UPLOADTHING_DEVELOPMENT_TOKEN`. Read-only diagnosis
showed zero of three run keys in that unrelated 98-object inventory. The
bounded cleanup-harness repair selected the route's already-configured
development token; it did not create, rotate, replace, or broaden a credential
or alter provider configuration.

Against the effective development project, all three frozen keys were present.
`UTApi.deleteFiles` reported success with three deletions, and immediate list
reconciliation reported zero remaining keys. Only then were the two exact
organization roots and two exact users deleted. Final projections reported
zero users, organizations, members, Labs, settings, sessions, accounts,
Categories, WorkTypes, Products, and grants for the frozen fixture IDs.

Primary signed out and closed the synthetic browser session, removed both
run-owned helpers and all three SVG assets, stopped only the run-owned Next
process, confirmed `.tmp` empty and port 3000 not listening, and found zero run
markers across 180 candidate Next development log/trace files.

### Targeted Primary reconciliation

- Final scenario results: PRV-01–07 `PASS`; PRV-08 `BLOCKED`.
- Runtime acceptance: `PENDING`; PRV-08 is not inferred from code-level or
  WorkType evidence.
- Parent gate: `INELIGIBLE` pending Product Owner disposition of the single
  residual PRV-08 claim.
- Checkpoint: `BLOCKED_DECISION`; no application defect was observed and the
  checkpoint is not closed.

Independent `RUNTIME_EVIDENCE` review of this targeted execution and cleanup
follows. The Product Owner's residual decision and Primary's final checkpoint
transition remain separate.

### Independent targeted runtime-evidence review

Initial Reviewer verdict: `CORRECTION_REQUIRED`  
Review scope: `RUNTIME_EVIDENCE`

The Reviewer found the targeted evidence sufficient for PRV-04, PRV-05, and
PRV-06 `PASS`, confirmed PRV-08 is correctly `BLOCKED` as a
`CAPABILITY_BLOCKER`, and accepted the exact provider, database, browser,
helper, process, and marker cleanup. The sole finding was a medium-severity
state-reconciliation lag: `docs/current.md` and `.agent/current-task.md` still
described PRV-04–06 as blocked from the first execution.

Primary corrected only those two canonical/operational status records to
PRV-01–07 `PASS`, PRV-08 `BLOCKED`, runtime acceptance `PENDING`, parent gate
`INELIGIBLE`, and checkpoint `BLOCKED_DECISION`. Independent verification of
that correction follows; no scenario evidence or accepted prior evidence was
changed.

Correction verification: no remaining findings.  
Final Reviewer verdict: `PASS`  
Review scope: `RUNTIME_EVIDENCE`

The Reviewer confirmed that the corrected state matches the durable targeted
rerun record and Workflow V2 status model. PRV-01–07 are `PASS`; PRV-08 remains
correctly `BLOCKED` as a `CAPABILITY_BLOCKER` pending Product Owner disposition
or a separately authorized PRV-08-only rerun with restored Axiom read/query
access.

### Final targeted Primary reconciliation

Primary accepts the final Reviewer verdict and keeps scenario acceptance,
runtime acceptance, parent eligibility, and checkpoint state separate:

- scenario matrix: PRV-01–07 `PASS`; PRV-08 `BLOCKED`;
- Reviewer verdict: `PASS` for `RUNTIME_EVIDENCE`;
- runtime acceptance: `PENDING`;
- parent gate: `INELIGIBLE`;
- checkpoint: `BLOCKED_DECISION`.

The sole remaining obligation is Product Owner disposition of PRV-08 or a
separately authorized PRV-08-only rerun after an authenticated Axiom UI session
with existing development-dataset read/query access is available. PRV-01–07
must not be repeated. No application defect, correction task, deployment,
commit, staging operation, or N-FILE-108/109 work was started.

## Product Owner residual disposition — 2026-09-22

The Product Owner explicitly approved `PASS_WITH_LIMITATIONS` for this
local-development Product runtime checkpoint, subject to final independent
`CHECKPOINT | RUNTIME_EVIDENCE` review. This disposition applies only to
PRV-08. PRV-01–07 and their accepted evidence from both runtime executions
remain `PASS`; the completed exact-cleanup evidence and earlier independent
runtime-evidence review remain accepted.

PRV-08 remains `BLOCKED`, classified as `CAPABILITY_BLOCKER`. The Product Owner
accepts the missing assurance that fresh Product-specific Axiom telemetry was
not inspected: the existing API token received HTTP 403 at the query boundary,
and no authenticated Axiom UI session with dataset query access was available
during the checkpoint. This checkpoint therefore does not establish runtime
evidence that Product authorization, denial, callback, consumption, and replay
telemetry contains only allowlisted fields and excludes sensitive values.
Accepted Product code-level telemetry tests and earlier WorkType telemetry
evidence remain valid, but do not satisfy this Product-specific runtime claim.

Future verification trigger: an authenticated Axiom UI session with existing
read/query access to the development dataset, or a separately authorized
least-privilege verification query credential. This is a retained obligation,
not an automatic credential or permission change, and does not authorize
repeating PRV-01–07. The disposition makes no deployed or production claim.

Primary proposes the following Workflow V2 reconciliation, contingent on the
independent review below:

- PRV-01–07: `PASS`;
- PRV-08: `BLOCKED` under the explicit Product Owner residual disposition;
- runtime acceptance: `PASS_WITH_LIMITATIONS`;
- parent gate: `ELIGIBLE`;
- checkpoint: `CLOSED`.

### Independent final review

The independent Reviewer reported no material findings and returned two
separately scoped Workflow V2 verdicts:

| Review scope | Verdict | Conclusion |
| --- | --- | --- |
| `RUNTIME_EVIDENCE` | `PASS` | PRV-01–07 remain supported by the accepted final matrix; PRV-08 remains `BLOCKED`; exact cleanup and prior evidence remain intact. |
| `CHECKPOINT` | `PASS` | The PRV-08-only disposition records missing assurance, `CAPABILITY_BLOCKER`, explicit Product Owner acceptance, and a future trigger. Workflow V2 permits `PASS_WITH_LIMITATIONS`, an `ELIGIBLE` parent gate, and closure for this local-development checkpoint. |

The Reviewer performed no runtime or browser operation. Reviewer `PASS` is
independent advice; Primary owns the final acceptance and state update.

### Final Primary acceptance and closure

Primary accepts both final Reviewer verdicts and reconciles the Product
runtime checkpoint as follows:

| Scenario | Final result |
| --- | --- |
| PRV-01 | `PASS` |
| PRV-02 | `PASS` |
| PRV-03 | `PASS` |
| PRV-04 | `PASS` |
| PRV-05 | `PASS` |
| PRV-06 | `PASS` |
| PRV-07 | `PASS` |
| PRV-08 | `BLOCKED` — Product Owner-approved residual limitation |

Runtime acceptance: `PASS_WITH_LIMITATIONS`. Parent gate: `ELIGIBLE`.
Checkpoint: `CLOSED` for the approved local-development scope. The historical
first-execution and targeted-rerun results above remain unchanged as
chronological evidence. This closure does not establish deployed or production
behavior.

Retained obligation: obtain a fresh Product-specific Axiom field inventory
for authorization, denial, callback, consumption, and replay events when the
Product Owner separately authorizes a PRV-08-only verification with an
authenticated read/query UI session or a least-privilege verification query
credential. PRV-01–07 do not need another run.
