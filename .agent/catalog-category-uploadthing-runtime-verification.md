# Proposed runtime-verification packet — Catalog Category UploadThing pilot

Status: Proposed; awaiting Product Owner environment authorization  
Authority: Operational verification packet; does not alter the accepted FILE-05 record  
Parent: Catalog Category UploadThing pilot / N-FILE-001  
Prepared: 2026-09-07

## Purpose and boundary

This packet is the proposed controlled runtime acceptance for the narrow Catalog
Category image pilot only. FILE-05 remains code-level `ACCEPTED` exactly as
recorded in `.agent/current-task.md`; this packet neither creates FILE-06 nor
transitions or closes the parent pilot. `docs/current.md` is unchanged.

The approved runtime is:

| Flow | Fixed server authority | Expected result |
| --- | --- | --- |
| Create stage | `N-FILE-102`, `catalog.create`, `catalog.category.image.create.stage`, no target | Persist a 15-minute opaque grant only after authorization. |
| Update stage | `N-FILE-103`, `catalog.update`, `catalog.category.image.update.stage`, `catalog.category:{authoritative Category ID}` | Persist a 15-minute opaque grant only after authorization. |
| Create commit | `N-FILE-102`, `catalog.create`, `catalog.category.image.create.commit` | Consume the matching uploaded grant and create Category in the same database transaction. |
| Update commit | `N-FILE-103`, `catalog.update`, `catalog.category.image.update.commit`, same authoritative Category ID | Consume the matching uploaded grant and update the tenant Category in the same database transaction. |

The browser receives and submits only `imageUploadGrantId`. A provider URL is
usable as a local visual preview but is not a command input or authority. The
verified callback alone associates the provider key/URL with the persisted
grant. No persisted-image deletion/read-access acceptance is in this packet:
removal remains unavailable, and D-FILE-04 remains pending.

## Code-level evidence already available

The following are implementation evidence, not substitutes for this runtime
exercise:

- `tests/unit/app/api/uploadthing/core.route.test.ts` — stage schema, denial
  before callback work, opaque callback input/output.
- `tests/unit/modules/labos-files/catalog-category-upload.contract.test.ts` —
  fixed server-owned boundary/intent projection and grant-after-authorization.
- `tests/unit/modules/labos-files/catalog-category-image-command.test.ts` —
  raw URL non-authority, no-grant preservation, target-bound replacement,
  rejected-grant short circuit, and propagated mutation failure.
- `tests/unit/components/modals/case-category/category-icon-upload.test.ts` —
  UI stage handoff, opaque grant capture, authoritative edit ID, and unavailable
  persisted-image removal.
- `tests/unit/modules/labos-files/upload-grant.{service,repository,registry,telemetry}.test.ts`
  and `tests/unit/architecture/file-upload-grant-schema.test.ts` — modeled grant
  lifecycle, repository transaction rules, registration, telemetry, and schema.

FILE-05 recorded 27 passing focused tests across three files, passing scoped
lint, and six confirmed unrelated TypeScript baseline errors. It must retain
that historical outcome.

## Proposed environment — Product Owner must select/approve exact resources

No environment names, credentials, provider accounts, browser identities, or
existing resources are inferred from the repository.

| Requirement | Required proposed property | Product Owner selection/approval required |
| --- | --- | --- |
| Database | A newly provisioned or otherwise disposable **non-production PostgreSQL database**, isolated from development/staging/production data and reachable by the application runtime. It must accept the repository Prisma schema and migration history. | Exact database target, custodian, connectivity method, retention window, and authorization to migrate it. |
| Migration | Apply exactly `prisma/migrations/20260904003000_add_file_upload_grants/migration.sql` through the approved Prisma migration workflow, with generated client/schema compatibility verified beforehand. | Approval to apply the migration to the selected disposable database. |
| Upload provider | An UploadThing sandbox or isolated configuration whose callback reaches this exact application runtime and whose storage/data is disposable. It must support the configured `categoryIconAvatar` image route, actual upload completion callback, and later deletion/retention handling by its owner. | Exact sandbox/isolated provider configuration and account, credentials injection path, permitted test-object creation, and cleanup owner. Do not change shared or production provider configuration. |
| Application runtime | A non-production runtime built from the reviewed workspace revision, configured to use only the selected disposable database and provider configuration. It must run the Next route `app/api/uploadthing/route.ts` and preserve real authenticated Better Auth session/active-Organization behavior. | Exact runtime host/base URL, revision/build procedure, secrets delivery, and confirmation it has no production data/service targets. |
| Browser | A clean supported browser profile (or equivalent isolated profiles), networked to the selected runtime/provider callback path. Profiles must support independent authenticated sessions and switching active Organization. | Exact browser/device setup and authorization to use the nominated test accounts. |
| Telemetry | Either an isolated observability destination controlled for this exercise, or approved console/runtime capture. If Axiom is enabled, it requires a non-production `AXIOM_TOKEN`, `AXIOM_DATASET`, and permitted `AXIOM_EDGE`; no client-side credential is allowed. | Destination, access, retention, and approval to inspect records. |

Stop before execution if any runtime points to production, uses a shared provider
configuration without explicit isolation approval, cannot prove callback
delivery, lacks clean-up authority, or cannot isolate the selected database.

## Required disposable fixtures and actors

Create fixtures only after the approvals in this packet are granted. Give all
records a run-specific, non-sensitive marker recorded in the evidence index;
do not use production identifiers or real patient/clinical data.

| Fixture | Required relationship/use |
| --- | --- |
| Organization A + Lab A | `Lab A.organizationId = Organization A.id`; owns the allowed Catalog Categories and grants for positive tests. |
| Organization B + Lab B | `Lab B.organizationId = Organization B.id`; independent tenant used for cross-tenant target/grant denial. |
| Allow actor A | Authenticated user with a valid Member in Organization A, active Organization A, and a reviewed fixed role that contains both `catalog.create` and `catalog.update` (repository bundles show owner/admin/manager). Use one selected role and record it as an opaque fixture label. |
| Denied actor | Authenticated actor with a valid canonical context but no applicable Catalog permission, or a deliberately unavailable/missing canonical membership as needed to validate fail-closed behavior. Product Owner must approve which test account is used. |
| Member B | Authenticated member of Organization B/Lab B for cross-tenant and wrong-member rejection. |
| Category A | A persisted Category owned by Lab A; its database ID is the sole update-stage/commit target. |
| Category B | A persisted Category owned by Lab B; never disclose it to an Organization-A actor. |
| Upload inputs | Small non-sensitive image files within the route limit (one image, maximum 4 MB). Use distinct files per scenario where provider object provenance matters. |

Do not create Case assets, Staff avatar fixtures, genericAvatar flows, or any
stored-file read/access fixtures. Those are out of this pilot.

## Runtime checklist and acceptance evidence

Record each scenario as pass/fail/not-run with UTC time, fixture labels,
correlation ID(s), opaque grant ID(s) in restricted evidence only, database
before/after assertions, and a redacted browser/runtime capture. Never place
provider URLs/keys, tokens, headers, emails, Member/user IDs, raw roles, or
provider/database errors in broad evidence.

| ID | Runtime scenario and concrete check | Required evidence |
| --- | --- | --- |
| RV-01 | With Allow actor A and active Organization A, start create upload through `categoryIconAvatar`. Confirm canonical tenant resolution precedes authorization and database/provider work; a new `N-FILE-102` PENDING grant has Org A/Lab A/Member A linkage, create purpose, null target, correlation ID, and expiry approximately 15 minutes later. | Redacted ordered request/runtime trace; restricted grant-row projection; sanitized decision/lifecycle telemetry. |
| RV-02 | Attempt create stage as Denied actor and with missing/invalid canonical context. Confirm denial before grant creation and before provider upload/callback work; no new grant/Category/provider object attributable to the attempt. | Redacted response and trace; scoped DB/provider reconciliation; sanitized denial telemetry. |
| RV-03 | Create a Category with an actual permitted image upload. Confirm callback accepts only opaque grant metadata plus provider file details, marks the matching grant UPLOADED, returns only `uploadGrantId`, then final create consumes it and persists the callback-verified URL on a Lab-A Category. | Browser capture; restricted grant status timeline PENDING → UPLOADED → CONSUMED; Category projection; callback trace; telemetry. |
| RV-04 | Submit create/edit data containing a raw provider URL (or alter browser form data) without a valid `imageUploadGrantId`. Confirm the URL does not become persisted authority: create stores no image; update does not replace/remove the existing image. | Redacted request reproduction and before/after Category projections. |
| RV-05 | Open Category A for edit and stage an upload. Confirm the browser submits `mode:update` with Category A's authoritative persisted ID, and that the N-FILE-103 grant target has exactly `catalog.category` and Category A ID. Commit replacement and confirm only that grant's verified callback URL is persisted. | Browser capture/redacted request metadata; restricted grant projection; before/after Category A projection. |
| RV-06 | Edit Category A without staging a new image. Confirm no grant is consumed and its existing image value is preserved. Attempt the UI removal control against a persisted image; confirm it remains unavailable and no provider/domain deletion occurs. | Browser capture; before/after Category projection; scoped grant/provider check. |
| RV-07 | Replay the same completed create and update grant after successful commit, including concurrent attempts if the controlled runtime can issue them safely. Confirm exactly one commit succeeds; later/losing consumption rejects and creates/updates no additional Category state. | Restricted transaction/grant records showing one CONSUMED transition; one/two redacted response captures; Category counts/projections. |
| RV-08 | Attempt to consume an Org-A grant while active in Organization B, as Member B, against Category B, and against the wrong target/boundary/purpose where the application can safely induce it. Confirm rejection before Category mutation and no target-existence disclosure. | Redacted denials; before/after projections in both tenants; scoped grant status remains unconsumed where appropriate. |
| RV-09 | Exercise callback validation with a safe provider-supported replay of the same matching callback if available. Confirm idempotent same-file completion is accepted only as replay; changed/malformed/unknown/expired callback metadata is rejected without changing another grant. Do not forge provider signatures or call provider internals outside approved sandbox capabilities. | Provider callback event/capture; restricted grant status/metadata projection; sanitized telemetry. |
| RV-10 | Safely induce Category mutation failure after an UPLOADED grant only if the Product Owner approves a reversible, fixture-local method that exercises the real transaction. Confirm both the Category mutation and consumed transition roll back; do not use a production-like fault injection or alter application/configuration. | Approved method reference; before/after restricted DB projection proving no Category mutation and grant not consumed; redacted error classification. |
| RV-11 | Inspect emitted authorization and upload-grant telemetry for positive/denied/callback/consumption cases. Confirm only the allowlisted lifecycle fields appear: boundary ID, purpose, optional target type, correlation ID, phase, outcome, reason, duration, severity, plus envelope metadata. Confirm forbidden identifiers, raw roles/input, URLs/keys, tokens/headers, and provider/database error detail do not appear. | Redacted telemetry excerpts and field allowlist/forbidden-field checklist. |
| RV-12 | Verify runtime migration state and schema: `FileUploadGrant` table/enum/indexes/foreign keys from the named migration exist in the selected database; canonical Org/Lab/Member linkage is enforced by fixtures and repository behavior. | Migration ledger/status and schema inspection captured without credentials; restricted row projections. |

For RV-10, failure injection is optional pending Product Owner selection. It is
not permission to alter constraints, database availability, provider setup, or
application code. If no approved fixture-local method exists, mark it
`NOT RUN — approval/method unavailable`; retain code-level rollback evidence and
do not infer runtime transaction rollback acceptance.

## Environment-sensitive operation register

Every operation below is proposed only. The executor must obtain the indicated
approval before each group and stop on its stated condition.

| Target | Proposed operation / necessity | Expected effects | Cleanup/restoration | Stop condition | Evidence retained |
| --- | --- | --- | --- | --- | --- |
| Selected disposable database | Verify identity/isolation; apply the single named migration; seed only the two-Organization fixture set; inspect scoped rows. Necessary to prove actual persistence, transactionality, and tenant linkage. | New migration objects and disposable fixture rows, grants, and Categories only. | Delete only run-marked fixture roots and dependent rows according to approved ordering; then verify no run marker remains. Retain migration state only if the database is dedicated and PO directs it; otherwise restore through the approved disposable-environment reset procedure. | Database identity or cleanup scope cannot be proven; any non-fixture data is visible; migration differs from the named file. | Redacted migration status, fixture manifest, before/after scoped row counts, cleanup confirmation. |
| Selected UploadThing sandbox/isolated configuration | Perform real Category image uploads and accept its normal verified callbacks. Necessary to test provider callback handoff and object/grant lifecycle. | Disposable provider objects and callbacks associated with the run. | Delete only run-tracked provider objects using approved sandbox controls; if provider deletion is not available to this pilot, record object IDs in restricted evidence and obtain PO retention disposition. Do not configure provider cleanup behavior. | Configuration is shared/production, callback cannot be tied to selected runtime, or object deletion/retention authority is unclear. | Provider event/callback IDs and object inventory in restricted evidence; cleanup/retention receipt. |
| Selected non-production runtime | Start/restart the application against only approved database/provider configuration; execute browser scenarios. Necessary to exercise real route/session/action/callback integration. | Temporary runtime logs, sessions, requests, and telemetry. | Stop the temporary runtime; revoke/expire test sessions through approved fixture cleanup; remove temporary log exports according to retention selection. | Runtime target/configuration cannot be attested, points to production/shared state, or exposes secrets in captures. | Revision/build identity, redacted runtime configuration attestation, logs/traces. |
| Selected browser profiles/test accounts | Sign in, set active Organizations, create/update Categories, and perform negative tests. Necessary to validate actual browser handoff and session/tenant behavior. | Temporary sessions and browser-local state. | Sign out; clear dedicated test profile/site data or destroy the profile; revoke sessions if PO requires. | Account is real user/production account, active Organization cannot be confirmed, or browser capture includes sensitive data. | Redacted screenshots/HAR-equivalent only if approved; session cleanup confirmation. |
| Selected telemetry destination | Inspect this pilot's allowed fields and save redacted evidence. Necessary to verify telemetry sanitization. | Low-volume security/lifecycle records in the selected destination. | Follow PO-selected retention; delete only run-filtered records if the destination supports safe scoped deletion and PO authorizes it. | Destination mixes production telemetry, filtering cannot scope the run, or credentials would be exposed. | Redacted excerpts, query/filter description, retention/deletion confirmation. |

## Approval request to the Product Owner

Approve or select all of the following before an executor begins:

1. The exact disposable non-production PostgreSQL database and authority to
   apply `20260904003000_add_file_upload_grants` and create/delete run-marked
   fixtures there.
2. The exact UploadThing sandbox or isolated provider configuration, callback
   connectivity, temporary credentials handling, permitted object creation, and
   object cleanup/retention owner.
3. The exact non-production application runtime/base URL and clean browser
   profiles/test accounts, including the roles/memberships to use for Allow,
   Denied, and Organization-B actors.
4. Whether an isolated telemetry destination is available, its access and
   evidence retention policy; otherwise approve redacted runtime-console
   capture for the telemetry check.
5. Whether RV-10's real mutation-failure proof is authorized, and the exact
   reversible fixture-local method. If not approved, accept the explicit
   `NOT RUN` outcome rather than a simulated runtime claim.
6. Evidence custodian, restricted-evidence location, retention duration, and
   authorization to delete the run-marked database/provider/browser artifacts.

## Evidence handling and retention

Store the final evidence index and redacted report in the Product Owner's
selected approved destination; the repository contains no approved destination
for runtime secrets or provider artifacts. Restricted evidence may link
correlation IDs, opaque grant IDs, provider object/callback IDs, and scoped DB
projections, but must not include secrets or broad tenant/identity data. The
published report may use only run labels and redacted excerpts. Retain the
accepted FILE-05 record unchanged.

## Out of scope / unresolved decisions

- D-FILE-04 stored-file read/access policy is pending. This packet does not
  accept URL possession, public/private read behavior, download/access checks,
  or Case activation.
- Orphan expiry scheduling and provider orphan deletion remain operational
  follow-up; this packet may clean its own known sandbox objects but does not
  configure or accept a scheduler.
- No environment/provider/database/browser/telemetry resource has been named
  by repository evidence. These remain Product Owner selections.
- Real transactional rollback under an induced mutation failure needs the
  Product Owner-approved reversible method described in RV-10.

## Recommended execution and completion boundary

Recommended executor: **TERRA**, with Product Owner present for the approved
environment-sensitive operations. This crosses authorization, tenant context,
database transaction, provider callback, telemetry, and browser seams; TERRA
must independently review each result. A bounded LUNA helper may collect
redacted evidence only after TERRA turns this approved packet into a precise
execution assignment.

The packet is ready for Product Owner review and conditional approval. It is
not authorized for execution until the six approval selections above are made.
After runtime work, TERRA must report runtime evidence separately; this packet
does not authorize parent-pilot closure or a `docs/current.md` update.
