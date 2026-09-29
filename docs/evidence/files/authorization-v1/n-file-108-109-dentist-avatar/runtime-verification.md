# N-FILE-108/109 Dentist avatar runtime-verification packet

Status: CLOSED - TARGETED RUNTIME ACCEPTED
Tier: V3 - Sensitive
Classification: NON_DESTRUCTIVE, with exact synthetic cleanup
Runtime acceptance: PASS
Parent gate: ELIGIBLE

## Boundary and evidence reuse

Verify only Dentist-specific behavior that accepted code review cannot prove
against real database, provider, and browser paths. D-FILE-05 allows
attachment-only staging and preserves the existing application avatar display
contract. D-FILE-04 read/access policy remains pending. This packet does not
authorize execution by itself.

Reuse closed Category, WorkType, and Product evidence for unchanged grant
repository/callback machinery, development compatibility, and exact-cleanup
method, not as proof of the Dentist route, roster, resolver, command, or
telemetry. The accepted Dentist code tests cover raw-URL/provider-key
non-authority, wrong purpose/target/expiry, rollback, SOLO/inactive rules, and
removal unavailability. Do not repeat WorkType WTRV-07, provider callback
replay, or a live PENDING-grant snapshot. The Dentist-specific create claim is
a real roster upload producing a targetless N-FILE-108 grant with canonical
Organization/Lab/Member, Dentist purpose, 15-minute expiry, verified callback,
and one consumption paired with the created Dentist. Inspect durable fields
after consumption.

## Read-only effective-target gate

| Target | Proposed existing development resource | Attestation before mutation |
| --- | --- | --- |
| Application | Local Next.js app from accepted workspace | Revision/worktree, local origin/port, health, effective datasource match |
| Database | Existing Supabase development database | Safe host/project fingerprint, database/schema, migration count, required auth/Organization/Member/Lab/Clinic/Dentist/FileUploadGrant relations |
| Authentication | Existing Better Auth development configuration | Development base origin and unauthenticated baseline; no cookie/token values |
| Provider | Existing UploadThing development project | Safe identity/fingerprint and `dentistAvatar` advertisement; no credentials or object URLs |
| Browser | Codex built-in browser | Clean synthetic sessions on attested local origin |
| Telemetry | Existing development Axiom sink | Dataset identity and current read/query capability, preferably authenticated UI |

Primary must confirm the effective application, database, auth, and provider
targets match the approved development scope before any account, row, object,
authenticated session, or helper mutation. Stop for an unknown, mismatched,
shared-unapproved, staging, or production target. Unavailable Axiom query
authority may leave DRV-06 BLOCKED without stopping DRV-01-05; it cannot be
treated as a telemetry pass.

## Exact Product Owner approval requested

Conditional on that gate, authorize only:

1. Start the existing local application unchanged and use clean Codex browser
   sessions with normal Better Auth/onboarding flows.
2. Create, use, and exactly delete the run-marked A/B fixtures below. Do not
   mutate pre-existing identities, Clinics, or Dentists.
3. Make two Dentist avatar uploads plus up to two onboarding-logo uploads if
   the supported flow requires them, in the existing UploadThing development
   project. Allow normal verified callbacks. Inventory and exactly delete all
   attributable provider objects, including retries.
4. Execute roster avatar create/replacement and grantless create/edit. Use
   one temporary run-owned command/domain helper only for denial and replay
   cases. Derive tenant context from real synthetic Better Auth
   Organization/Member/Lab records, assert exact fixture identity/cardinality
   before each operation, and call existing Dentist stage/command functions
   with real authorization and grant services. If required, run the diagnosed
   `node --conditions=react-server --import tsx <run-owned-helper.ts>` outside
   the Codex sandbox. No auth, tenant, grant, or constraint bypass.
5. Capture scoped read-only before/after database projections and, only with
   existing query authority, the smallest fresh Dentist telemetry window.
   Retain redacted counts, labels, field inventories, and error classes only.
6. Reconcile and delete exact run-owned provider/database resources, close
   sessions, stop only run-owned processes, remove helper/assets, and obtain
   independent RUNTIME_EVIDENCE review.

No Docker/replacement infrastructure, migration/reset, application change,
credential or permission change, provider reconfiguration, tunnel, deployment,
destructive injection, stored-avatar removal/deletion, expiry scheduling,
orphan cleanup, or other Files boundary is requested. Product PRV-08 is
separate.

## Minimum fixture manifest

Use one collision-resistant marker; keep exact IDs and provider keys in a
restricted run-owned manifest outside Git until cleanup review.

| Fixture | Relationship and purpose | Exact cleanup proof |
| --- | --- | --- |
| A identity | User A -> Organization A -> owner Member A -> Lab A/settings | Marker absent from user, account, session, Organization, Member, Lab, settings |
| Clinics A1/A2 | Both belong to Lab A; A1 is non-SOLO roster host, A2 is wrong-Clinic update input | Exact Clinic IDs and nested primary Dentists absent |
| Dentists A1/A2 | A1 roster-created with avatar; A2 roster-created without grant | Exact IDs/marker absent |
| B identity | User B -> Organization B -> owner Member B -> Lab B/settings | Exact B marker and linked records absent |
| Clinic B1/Dentist B1 | Foreign target; normal Clinic creation may create B1 primary Dentist | Exact IDs absent |
| Provider objects | Normal maximum four: two required onboarding logos, A1 initial avatar, A1 replacement | Actual run-key inventory equals deletion count; absence attested |

Count and clean automatic primary Dentists. No Category, WorkType, Product, or
third tenant is needed. If onboarding does not require logos, do not upload
them; record the lower actual count.

## Harness preflight

After approval, repeat non-secret attestation, confirm the accepted schema
without migration, normal Better Auth sessions, route advertisement, browser
upload response observation, exact provider inventory, scoped projections,
and helper exact-ID guards. Check Axiom access without credential change.
After one harness failure, permit one bounded repair tied to a concrete
hypothesis. Stop at the same failure boundary without new application evidence.

## Claim-mapped scenario matrix

| ID | Claim / bounded operation | Acceptance criteria | Current result |
| --- | --- | --- | --- |
| DRV-01 | Roster avatar create | In Clinic A1, upload avatar 1 through editor create mode and create Dentist A1. Verified Dentist callback completes; browser handoff is only the opaque grant ID. A1 stores callback URL. One N-FILE-108 grant has canonical A linkage, null target, Dentist purpose/15-minute expiry, and one consumption paired with creation. | PASS |
| DRV-02 | Targeted replacement | Edit A1 through roster, upload avatar 2, save. N-FILE-109 grant targets authoritative Dentist A1 ID; callback completes; only A1 receives the replacement URL; grant consumes once. | PASS - targeted continuation |
| DRV-03 | Grantless create/preservation | Create A2 in A1 roster without upload: null avatar and no grant/object. Edit A1 metadata without a new grant: metadata persists, avatar URL stays byte-for-byte unchanged, and no grant consumes. Do not attempt persisted removal. | PASS - targeted continuation |
| DRV-04 | Cross-tenant and cross-Clinic denial | With canonical A context, stage and commit against B1 Dentist: deny before grant/provider/Dentist mutation and without existence disclosure. Update A1 with Clinic A2: deny without mutation. Use bounded real helper for unsupported UI inputs. | PASS - targeted continuation |
| DRV-05 | Single use/replay | Replay A1's consumed replacement grant through the real command: reject, consumption count remains one, all A1 fields unchanged. Pair DRV-01/02 successful avatar mutations with their single consumed grants. | PASS - targeted continuation |
| DRV-06 | Dentist sanitized telemetry | Inspect smallest fresh Dentist-only window for allow, denial, verified callback, consumption, replay. N-FILE-108/109 Dentist labels and only allowlisted fields appear; identity/tenant/role/input/auth/token/header/provider key or URL/payload/error-detail values are absent. | PASS - targeted continuation |

Only PASS, FAIL, NOT_RUN, or BLOCKED are scenario results. If DRV-06 lacks
existing Axiom query authority it stays BLOCKED, not inferred from code tests
or prior telemetry. PASS_WITH_LIMITATIONS and parent eligibility require an
explicit Product Owner disposition for each residual claim, with missing
assurance, blocker class, and future trigger. Cleanup and independent review
precede Primary reconciliation.

## Known limitations and stop rules

The Product capability diagnosis found dataset discovery succeeded but the
existing Axiom API token received HTTP 403 at the query boundary. Prefer an
already authenticated UI session with dataset query rights; do not create,
rotate, or broaden a token. No supported browser raw-input transport was
established in WTRV-07, and UploadThing development has no safe provider
callback-replay control. No live PENDING snapshot is required. This checkpoint
cannot prove deployed/production behavior or decide D-FILE-04.

Stop for wrong/unproven targets, unexpected existing data, uncertain cleanup,
auth bypass, unsafe helper, secret exposure, migration/configuration change,
or genuine application/security defect. Classify as APPLICATION_DEFECT,
VERIFICATION_ENVIRONMENT_BLOCKER, CAPABILITY_BLOCKER, or AUTHORITY_BLOCKER.
Only APPLICATION_DEFECT routes to application correction by default; this
packet does not authorize that correction.

## Cleanup and retained evidence

Freeze the exact run manifest. Reconcile and delete only attributable provider
objects, including retries, then attest absence. Sign out/close A/B sessions.
Delete only exact run-marked Dentist/Clinic records and A/B fixture roots
through supported cleanup; rely only on verified cascades, never reset the
database. Query exact marker/IDs for zero remaining users, accounts, sessions,
Organizations, Members, Labs, settings, Clinics, Dentists, and grants. Stop
only the local process started by this run; remove temporary images, helper,
restricted manifest, and logs.

Retain only redacted target attestations, scenario outcomes/timestamps,
before/after counts, callback/telemetry field inventories, cleanup receipts,
independent Reviewer verdict, Product Owner residual dispositions, and
Primary reconciliation. No runtime operation has been executed by preparing
this packet.

## Authorized execution - 2026-09-23

The Product Owner approved starting this exact Dentist runtime packet and
explicitly selected it over the separate TS2352 correction task. No
application-code correction or TS2352 task work is authorized by that choice.

Primary completed read-only effective-target attestation before fixture or
provider mutation:

- Database: existing Supabase development host fingerprint `eb0d823953fe`,
  database/schema `postgres`/`public`, PostgreSQL 17.6, 47 applied migrations;
  auth user, lowercase Better Auth organization/member, Lab, Clinic, Dentist,
  and FileUploadGrant relations are present. The first relation probe assumed
  capitalized Better Auth table names; the repaired read-only inventory
  established their actual lowercase names.
- Application/auth: accepted workspace HEAD
  `9debd695f4065c65f7b5aa1cd7a118705850b5ad`, local Next.js 16.3.3 at
  `http://localhost:3000`, loading existing `.env.local` and `.env`. The
  `/api/uploadthing` GET advertises `dentistAvatar` among nine routes;
  unauthenticated Better Auth session is null. The Codex built-in browser
  reached this origin without an existing LabOS session.
- Provider: the route explicitly uses `UPLOADTHING_DEVELOPMENT_TOKEN` from the
  existing `.env.local`, whose credential fingerprint is `979e35aca2f2`
  and application-ID fingerprint is `2e77ac21b101`. Read-only `UTApi.listFiles`
  with that *explicit* token succeeded. The earlier Product packet's
  `dab13061d49b` fingerprint matches the separate default
  `UPLOADTHING_TOKEN`, not the development-route token. Inventory and exact
  cleanup must use the explicit development token; the default token's
  distinct project is outside this run.
- Telemetry: the configured existing Axiom development dataset was reachable
  through the already authenticated UI; a read-only historical query returned
  results. No token was created, rotated, or broadened. Fresh Dentist records
  remain to be inspected under DRV-06.

Two non-mutating probe errors were repaired before target confirmation:
`@next/env` was unavailable as a top-level package, so the installed
`dotenv` parser loaded the existing files; and an invalid optional UTApi log
level was removed before a successful read-only list. Neither reached a
fixture, upload, or application mutation boundary.

Primary confirms the effective application, database, authentication, and
development-route provider targets match the approved development scope.
Conditional mutation authority is now effective for the exact packet only.
The scenario results and stop observation are recorded below.

## Execution and stop evidence - 2026-09-23

Run marker: `DRV-20260923-5d54a693b0d1`. One transient A signup from
the preceding browser turn lost its disposable login secret when the browser
session expired. It had no Member, LabUser, Organization, Lab, or provider
object. A guarded cleanup deleted that one exact AuthUser and verified zero
remaining before a new A signup with the same marker. No B fixture was
created. The new A identity completed normal Better Auth signup and onboarding
with one required UploadThing development logo. Clinic A1 and Clinic A2 were
created through the standard non-SOLO partner form; each acquired its normal
primary Dentist. No existing identity or Clinic was used.

DRV-01: `PASS` to the packet's stated create/persistence/grant criteria. The
real A1 roster editor uploaded one SVG through `dentistAvatar`, reported upload
success, and submitted an opaque `imageUploadGrantId` to the real create
action. The scoped database projection found exactly one N-FILE-108 grant:
`dentist.avatar.create.stage`, canonical A Organization/Lab/Member linkage,
null target type/ID, `CONSUMED`, `uploadedAt` and `consumedAt` populated, and
expiry approximately 15 minutes after issue. The new A1 Dentist's stored
avatar URL matched the verified callback URL. The normal create action
reported success; the roster gained exactly one Dentist. No raw URL was
submitted as mutation authority.

The edit-surface preflight immediately exposed a separate application defect.
The UI accepts `image/svg+xml` and recommends SVG, but the persisted SVG avatar
in the edit preview was rendered through Next `Image` optimization. The browser
image completed with `naturalWidth=0` and `naturalHeight=0`; the local Next
server reported that SVG optimization was rejected because
`dangerouslyAllowSVG` is disabled. The authorized Dentist detail reader
returned HTTP 200, and the edit form eventually populated the existing name
and persisted-avatar removal-disabled control, so this was a display failure,
not missing Dentist data. Relevant accepted source:
`components/modals/dentists/dentist-avatar-upload.tsx` lines 65, 77, 82.
No replacement was staged or submitted after confirming the defect. This is
`APPLICATION_DEFECT`, not an environment or Axiom capability blocker. Primary
stopped without modifying accepted application code or provider configuration.

| Scenario | Result | Reconciliation |
| --- | --- | --- |
| DRV-01 | PASS | Exact create/grant criteria above passed; does not assert SVG display works. |
| DRV-02 | NOT_RUN | Stopped at edit preview defect before replacement. |
| DRV-03 | NOT_RUN | No grantless roster mutation attempted. |
| DRV-04 | NOT_RUN | No B fixture or denial helper created. |
| DRV-05 | NOT_RUN | No replacement grant exists to replay. |
| DRV-06 | NOT_RUN | No fresh Dentist telemetry inspection after defect stop. Existing Axiom UI read authority was attested, not used as a pass. |

Cleanup: the provider inventory contained exactly the run-marked A logo and
initial Dentist avatar, both `Uploaded`. Their keys matched the A Lab logo
and N-FILE-108 grant respectively. Exact deletion returned success with
`deletedCount=2`; a fresh listing found zero run-marked provider objects.
The A browser session signed out normally. Before database deletion, a guarded
transaction verified one each of A AuthUser, Organization, Lab, Member,
account, and grant; two exact Clinics; three exact Dentists (including both
automatic primaries); zero sessions and Cases. It deleted the one Organization
root and one AuthUser root, using verified cascades. The post-commit marker/ID
query returned zero users, Organizations, Labs, Members, Clinics, Dentists,
grants, accounts, and sessions. The run-owned local server was stopped and port
3000 had no listener. Temporary helpers/assets are removed after evidence
capture; no run-owned B object or provider object was created.

Runtime acceptance remains `PENDING`, parent gate `INELIGIBLE`, and the
checkpoint is `CORRECTION_REQUIRED`. A narrow correction proposal is needed
for the advertised SVG upload versus persisted-preview rendering mismatch.
Do not infer DRV-02-06 passes, Product PRV-08 closure, deployed acceptance, or
D-FILE-04 read-policy resolution from this partial run.

## Independent review and next authority

Independent Reviewer verdict: `CORRECTION_REQUIRED | RUNTIME_EVIDENCE`.
The Reviewer confirmed DRV-01's exact claim mapping, DRV-02-06 `NOT_RUN`, the
`APPLICATION_DEFECT` stop, and sufficient exact cleanup evidence. The
Reviewer independently matched the SVG accept/recommendation and unconditional
Next `Image` rendering in the Dentist upload component. There is no basis for
runtime or parent acceptance.

Proposed separate correction: align the Dentist-specific trusted upload
boundary and editor with supported persisted rendering. The smallest
security-conservative route is raster-only PNG/JPEG/WebP acceptance in the
Dentist route and UI, removal of SVG recommendation, and focused persisted-
preview/regression tests. Do not enable global SVG optimization or change
provider configuration as an incidental fix. Product Owner authorization is
required for that input-format change and code correction; existing stored
SVG compatibility, if required, needs an explicit reviewed display strategy.
The distinct telemetry-test `TS2352` task remains separate.

After an accepted correction, prepare a targeted DRV-02-06 continuation with
fresh run-marked fixtures and only the minimum DRV-01-equivalent avatar-create
setup needed to give DRV-02/05 a real target and consumed grant. The accepted
DRV-01 result is not re-evaluated by that setup. Axiom inspection remains
DRV-06, not inferred from code tests. Product Owner approval is required for
the correction and any subsequent runtime continuation.

## Code correction disposition - 2026-09-23

The Product Owner separately authorized PNG/JPEG/WebP-only Dentist avatars.
The [bounded raster correction](raster-correction.md) is code-accepted after
independent `PASS | CODE` review. The trusted Dentist route, editor dropzone,
visible format text, one-file-total guard, and focused tests are aligned.
No new runtime operation occurred under that code authorization. This does not
change DRV-01 `PASS`, DRV-02-06 `NOT_RUN`, runtime acceptance `PENDING`, parent
gate `INELIGIBLE`, or checkpoint `CORRECTION_REQUIRED`. A targeted runtime
continuation requires separate Product Owner approval.

## Authorized targeted continuation - 2026-09-23

The Product Owner directed the Dentist runtime verification to begin after
accepting the PNG/JPEG/WebP-only correction. This authorizes one bounded
continuation of DRV-02-06 under the original packet's development-target,
fixture, stop, evidence, and exact-cleanup controls. DRV-01 remains `PASS`
from the earlier execution and is not re-evaluated.

Before fixture or provider mutation, Primary must re-attest the effective
local application revision/origin, existing Supabase development database,
Better Auth configuration, UploadThing *development-route* project (using the
explicit development token, not the distinct default token), Codex browser,
and existing Axiom read/query capability. Stop for unknown or mismatched
targets. Start only the local app process needed for verification.

Use a new collision-resistant marker and exact A/B manifest. Maximum normal
uploads: two onboarding logos required by the existing flow, one PNG/JPEG/WebP
Dentist A1 avatar solely as DRV-02/05 setup, and one raster replacement.
Create non-SOLO Clinic A1/A2 and foreign Clinic B1 through normal flows;
include automatically created primary Dentists in cleanup. A1's setup grant
must be consumed and the persisted raster preview must visibly render before
replacement. That setup does not change DRV-01's result.

Execute DRV-02 replacement and targeted grant consumption, DRV-03 grantless
create/edit preservation, DRV-04 cross-tenant stage/commit and same-Lab
wrong-Clinic denial, DRV-05 consumed replacement-grant replay denial, and
DRV-06 smallest fresh Dentist-specific Axiom field inventory if the existing
authenticated query authority works. The bounded real command/domain helper
may run outside the Codex sandbox with
`node --conditions=react-server --import tsx <run-owned-helper.ts>`; derive
tenant context from real synthetic Better Auth Organization/Member/Lab rows,
assert exact fixture identity/cardinality before every operation, and do not
mock or bypass authentication, authorization, grant validation, or transaction
constraints. Retain redacted results, counts, and field inventories only.

Do not repeat Category/WorkType/Product scenarios, DRV-01 acceptance,
WorkType WTRV-01/WTRV-07, raw-URL transport, provider callback replay, or
other unsupported experiments. No application/schema/configuration change,
new infrastructure, credential change, deployment, staging, commit, TS2352
correction, or next Files boundary. Stop on a genuine application/security
defect, uncertain target, or uncertain cleanup provenance. Reconcile and
delete exact run-created provider/database objects, sign out A/B sessions,
stop only run-owned processes, remove temporary assets/helpers, attest zero
run markers, and obtain independent `RUNTIME_EVIDENCE` review before Primary
reconciles runtime acceptance, parent gate, and checkpoint status.

Continuation effective-target gate (Primary, 2026-09-23): CONFIRMED before
mutation. The read-only Supabase connection matched the approved development
fingerprint `eb0d823953fe` on port 6543, PostgreSQL 17.6, 47 applied
migrations, and required AuthUser/Organization/Member/Lab/Clinic/Dentist/grant
tables. The prior runtime marker projected zero remaining tenant fixtures.
Better Auth's effective origin is `http://localhost:3000`; the run-owned
Next 16.3.3 server served unauthenticated sign-in and session routes. The
UploadThing development credential fingerprint `979e35aca2f2` permitted
read-only inventory; the live `dentistAvatar` route advertised only PNG,
JPEG, and WebP. The Codex built-in browser reached the local sign-in page.
The existing authenticated Axiom UI successfully queried
`labos-authorization-shadow` read-only. These checks establish matching
targets and effective mutation authority for the packet, not scenario PASS.

## Targeted continuation execution - 2026-09-23 UTC

Run marker: `DRV-20260923-fee712c5d4c3`. The ordinary A onboarding
activation failed once after Organization/Lab creation; an exact read-only
projection showed one user, Organization, Lab, and Member, and the service's
documented idempotent retry completed without duplication. This was a bounded
harness/environment recovery, not a Dentist scenario result. A/B normal
Better Auth sessions and onboarding created exactly two identities/Labs,
non-SOLO A1/A2/B1 Clinics, three automatic primary Dentists, one A1 raster
avatar Dentist, and one A1 grantless Dentist. Four normal uploads occurred:
A/B logos, initial PNG avatar, replacement PNG avatar. No extra provider
object or grant was created.

DRV-02: The A1 persisted initial-avatar edit preview completed as a 128x128
Next image. The roster edit uploaded the run-marked replacement PNG through
`dentistAvatar`, received a normal callback, and saved. The initial URL
fingerprint `06fea695230c` changed to `fc42b8e0be64` on A1 only. The
N-FILE-109 grant had Dentist target A1, Dentist update purpose, callback URL
fingerprint `fc42b8e0be64`, and `CONSUMED`/non-null consumed timestamp.
Reopening the editor rendered the persisted replacement preview at 128x128.

DRV-03: A roster Dentist created without upload had null avatar. Exactly two
Dentist grants existed, for the initial and replacement uploads; no grant or
provider object was added by grantless create/edit. A1's grantless metadata
edit persisted `Runtime synthetic specialist`, kept avatar fingerprint
`fc42b8e0be64`, and did not consume a further grant. The persisted-avatar
removal button was disabled with its unavailable title; no removal was
attempted.

DRV-04/05: The temporary server-module helper used the real active A Better
Auth session row and `resolveTenantContext`, asserting exact A/B user,
Organization, owner Member, Lab, A1/A2/B1 Clinic, five-Dentist, and two-grant
cardinality before each operation. It called the real stage/command paths
with default authorization, target resolver, grant consumer, and Prisma
transaction dependencies. Foreign B1 stage and commit each returned
`AuthorizationError`; A1 update with A2 Clinic returned
`DentistNotFoundError`; consumed N-FILE-109 replay returned
`UploadGrantError`. Before/after projections for A1/B1 names, specialties,
avatar fingerprints, update timestamps, and both grant statuses/consumed
flags were identical for every denied operation. The helper's first `.ts`
invocation failed at `tsx` CommonJS top-level-await transform before imports
or mutation; changing only its temporary extension to `.mts` resolved it.

DRV-06: Existing authenticated Axiom UI queried the development
`labos-authorization-shadow` dataset for 2026-09-23 15:45-16:05 UTC,
restricted to N-FILE-108/109 and authorization/file-upload-grant sources.
Seventeen fresh records were present: 10 authorization decisions and seven
grant lifecycle records. Groups included `ROLE_PERMISSION`,
`POLICY_ALLOWED`, `AUTHZ_TENANT_MISMATCH`, grant creation, verified provider
completion, one consumption per avatar, and the failed replay consumption.
The 10 decision payloads had only `boundaryId`, `correlationId`,
`durationMs`, `event`, `outcome`, `permission`, `reason`, `sensitivity`,
`severity`, `targetType`, and `unknownRoleCount`. The seven grant payloads
had only `boundaryId`, `correlationId`, `durationMs`, `event`, `outcome`,
`phase`, `purpose`, `reason`, `severity`, and `targetType`. Top-level keys were
`boundary`, `emittedAt`, `environment`, `payload`, `schemaVersion`,
`service`, and `source`. DOM-backed inventory found zero occurrences of the
run marker, email delimiter, HTTP URL, or prohibited identity, role,
provider-key/URL, token, header, input, or error-detail payload keys. No raw
telemetry values are retained in this packet.

Cleanup: Both synthetic browser sessions signed out. Read-only provider
inventory reconciled exactly four uploaded names/keys with the A/B Lab logo
references and two Dentist grant keys; exact `deleteFiles` returned
`success=true`, `deletedCount=4`. A fresh provider listing returned zero
run-marked objects (the first verification attempt failed at transient
Supabase DNS before reading; its single bounded retry succeeded). A guarded
database transaction first asserted two users, Organizations, Labs, owner
Members, accounts, settings, and grants; three Clinics; five Dentists; zero
sessions, Cases, Patients, LabUsers, and LabStaff. It deleted only two exact
Organization roots and two exact AuthUser roots with verified cascades. Its
in-transaction and fresh post-commit projections both returned zero for all
those run-owned relations and markers. The restarted run-owned server was
stopped, port 3000 had no listener, and all run-owned helpers/assets were
removed. No application, schema, migration, provider configuration, or
credential was changed.

Continuation status: DRV-01 previously accepted PASS; DRV-02-06 targeted
PASS, subject to independent `RUNTIME_EVIDENCE` review. Runtime acceptance
remains `PENDING`, parent gate `INELIGIBLE`, and checkpoint closure is not
claimed until that review and Primary reconciliation.

## Independent review and Primary reconciliation - 2026-09-24

Independent Reviewer verdict: `PASS | RUNTIME_EVIDENCE`. The read-only
Reviewer checked the complete packet, Workflow V2, Files plan, and relevant
Dentist source. It confirmed DRV-02-06 claim mapping, real tenant and
authorization paths, denial/replay ordering, grantless preservation, Axiom
field inventory, and exact provider/database/session/process/helper cleanup.
It found no overclaimed runtime PASS or remaining corrective issue. The
previously accepted DRV-01 PASS and its first-run evidence remain unchanged.

Primary reconciliation: DRV-01-06 `PASS`; code acceptance `PASS`; runtime
acceptance `PASS`; parent gate `ELIGIBLE`; N-FILE-108/109 Dentist avatar
local-development runtime checkpoint `CLOSED`. This acceptance covers only
the approved local development targets and attachment-only Dentist boundary.
It does not establish deployed/production acceptance, decide D-FILE-04
stored-file read/access policy, authorize persisted-avatar removal/deletion,
close Product PRV-08, or start the separate telemetry-test TS2352 correction
or another Files boundary.
