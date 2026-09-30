# Authorization V1 file plan

Status: Active

Authority: Supporting

Owner: PRIMARY

Last reviewed: 2026-09-24

## Current workstream

N-FILE-001 is the active UploadThing/file-authorization workstream.

The Catalog Category create/update pilot has completed its planned code-level
implementation and focused regression-review slices through FILE-05. Its
approved local-development runtime-verification checkpoint is also closed with
PASS acceptance.

N-FILE-104 and N-FILE-105 Catalog WorkType image create/update are accepted at
code level after independent V3 review. Their real database/provider/browser
runtime packet was executed against the existing LabOS development environment
and is closed with `PASS_WITH_LIMITATIONS` runtime acceptance and an `ELIGIBLE`
parent gate after final independent review. WTRV-02–06, WTRV-08, and WTRV-09
passed. WTRV-01 and WTRV-07 remain blocked, not passed, under explicit Product
Owner residual dispositions and retained future triggers. Exact cleanup is
recorded in durable evidence.

N-FILE-106 and N-FILE-107 Catalog Product image create/update are accepted at
code level and their local-development runtime checkpoint is `CLOSED` with
`PASS_WITH_LIMITATIONS` runtime acceptance and an `ELIGIBLE` parent gate after
independent `RUNTIME_EVIDENCE` and `CHECKPOINT` reviews. PRV-01–07 passed;
PRV-08 remains blocked under an explicit Product Owner residual disposition.
The missing Product-specific Axiom field inventory remains due when separately
authorized read/query access becomes available. Exact cleanup is recorded in
the [Product runtime packet](../../evidence/files/authorization-v1/n-file-106-107-product-upload/runtime-verification.md).

N-FILE-108 and N-FILE-109 Dentist avatar create/update are accepted at code
level after independent V3 `CODE` review under D-FILE-05. The first runtime
execution passed DRV-01 and exposed a persisted SVG preview defect. The
separately authorized PNG/JPEG/WebP-only correction passed independent `CODE`
review. The approved targeted continuation passed DRV-02–06, completed exact
cleanup, and passed independent `RUNTIME_EVIDENCE` review. DRV-01–06 are
`PASS`; local-development runtime acceptance is `PASS`, parent gate
`ELIGIBLE`, and checkpoint `CLOSED`. See the
[Dentist code evidence](../../evidence/files/authorization-v1/n-file-108-109-dentist-avatar/code-verification.md),
the [raster correction](../../evidence/files/authorization-v1/n-file-108-109-dentist-avatar/raster-correction.md),
and the [runtime packet](../../evidence/files/authorization-v1/n-file-108-109-dentist-avatar/runtime-verification.md).
The recurring telemetry-test `TS2352` was corrected in a
[separate V1 task](upload-grant-telemetry-ts2352.md), not a Dentist runtime
scenario or a change to accepted Files checkpoints.

Do not advance additional file boundaries merely because the Catalog Category implementation exists.

Subsequent boundaries require their own bounded active tasks and must follow the approved Files architecture, Authorization architecture, decisions, and registered boundary definitions.

Split mixed Catalog/Dentist behavior before enforcing it.

Do not activate Case assets before the amended D-FILE-04 V1 public-storage
representation, validation and URL-exposure boundaries are implemented and
separately accepted.

## Sequence and gates

For each protected file boundary:

1. Register the narrow create/update boundary with server-owned permission, trusted target, and closed intent.

2. Create a canonical Organization/Lab/Member-linked grant only after authorization; provider callback loads only the opaque grant definition.

3. Consume the grant exactly once inside the final domain transaction; verify expiry, tenant mismatch, replay, denial ordering, safe DTOs, and telemetry allowlist as applicable.

4. Keep expiry scheduling and provider orphan deletion as isolated operational follow-up with bounded retries.

5. Complete required code-level review before treating the boundary as implementation-accepted.

6. Complete required real database/provider/browser/runtime verification separately through an approved runtime-verification packet before claiming runtime acceptance.

## Catalog Category pilot status

The Catalog Category pilot covers:

- N-FILE-102 — Catalog Category image create stage.
- N-FILE-103 — Catalog Category image update stage.

Accepted code-level slices:

- FILE-01 — Catalog Category boundary-to-command contract.
- FILE-02 — UploadThing Category middleware/callback integration.
- FILE-03 — Category UI/schema opaque upload-grant handoff.
- FILE-04 — transactional Category command consumption.
- FILE-05 — Catalog Category upload regression coverage.

The pilot has therefore completed its approved code-level and
local-development runtime checkpoint.

RV-09 remains `NOT RUN` under an explicit Product Owner-approved provider
limitation: UploadThing 7.7.4 local development exposes no safe
provider-supported callback-replay control. This is accepted for checkpoint
closure but remains residual verification work and is not runtime proof of
callback-replay resistance. RV-10 remains `NOT RUN` under its approved deferred
reversible-method disposition. Production/deployed callback reachability is
not established.

Do not use this plan as the runtime scenario journal.

Immediate task state belongs in `.agent/current-task.md`. The closed Catalog
Category runtime packet and retained verification evidence belong in
[`docs/evidence/files/authorization-v1/n-file-001-catalog-category-uploadthing-pilot/`](../../evidence/files/authorization-v1/n-file-001-catalog-category-uploadthing-pilot/).

Completion of the Catalog Category pilot does not automatically authorize activation of WorkType, Product, Dentist, Staff, or Case file boundaries.

## Case access gate

**Active V1 decision:** UploadThing Free `public-read` is accepted for Case
clinical files with an explicit loss of provider-enforced retrieval
confidentiality. LabOS authorization remains mandatory for upload,
discovery/listing, association, normal application opening, mutation and
delete; a direct public provider URL bypasses that authorization for byte
retrieval. Minimize URL exposure and keep opaque provider keys, but never call
these objects private. Private/signed-only access below is a deferred V2
target, not a V1 activation requirement. See the amended
[D-FILE-04 decision](../../architecture/decisions.md) and
[Files architecture](../../architecture/modules/files.md).

The Product Owner approved the additive `MANAGED_PUBLIC` current-asset mode,
nullable immutable `StoredFile.providerAccess`, and separate freshly
authorized public-open contract. The [schema/SQL and read-contract candidate](case-file-public-access-contract.md)
is authored for separate review and migration gates; it does not activate a
Case asset. Rejected-upload cleanup still needs a bounded design so validation
failure cannot produce an active asset. C3 signed-issuance auditing remains
inactive for public object retrieval. Existing
Catalog/WorkType/Product/Dentist behavior remains unchanged.

**Implementation impact before activation:** (1) independently review and
verify the authored additive public-backed schema/SQL and read contract,
then separately approve migration application without altering historical C2
migration bytes; (2) keep the
saved-DRAFT `case.asset.add` grant, then implement a Case-only authenticated
provider handoff/callback with server-bound opaque key and no caller tenant
authority; (3) inspect the exact uploaded bytes under R001 before evidence,
UPLOADED, StoredFile/version or normal Case visibility; (4) define rejection
outcome retention and promptly delete rejected provider objects under a
separately approved cleanup command, without deleting immutable successful
evidence; (5) expose storage access only after LabOS `case.read`, suppress
permanent URLs from unrelated DTOs/metadata/logs, and truthfully state that
any derived public URL is a bearer access path outside LabOS authorization;
(6) verify cross-tenant denial, URL-exposure boundaries, rejected-object
cleanup, and public retrieval behavior in an authorized V3 runtime packet.
No production code, schema change or provider operation follows from this
planning reconciliation alone.

### Deferred private/signed-access target

D-FILE-04 approves private-by-default, authenticated Case clinical-asset access
through short-lived signed URLs after authoritative Case and tenant
authorization. Signed-URL issuance is audited; an application proxy for every
byte is not required. Unauthenticated sharing and public clinical-file links
are excluded from N-FILE-110/111.

This Case-only policy does not alter accepted Catalog, WorkType, Product, or
Dentist display contracts. URL possession and upload authorization do not
establish read authorization.

The original [read-only provider attestation](../../evidence/files/authorization-v1/d-file-04-read-access/read-only-attestation.md)
and [provider-independent persistence design](../../evidence/files/authorization-v1/d-file-04-read-access/persistence-migration-design.md)
remain historical inputs. The Product Owner subsequently confirmed
UploadThing Free cannot supply private Case files for V1 and accepted its
`public-read` limitation. Private ACL override, signed delivery, unsigned
denial, and expiry are deferred private-storage claims, `NOT_RUN` and not V1
capability blockers. Do not retry the ACL toggle or change global provider
settings. C2 persistence is installed; the approved public-backed
compatibility decision and its [additive candidate](case-file-public-access-contract.md)
now supply the next schema/SQL review path. N-FILE-110/111 activation remains
separately gated by migration, application, validation, cleanup and runtime
acceptance.

The Product Owner fixed a 300-second maximum signed-URL lifetime with fresh
authorization per issuance, retained explicit Save Draft, approved an
unavailable-pending-verification state for unreconciled legacy assets after a
separately approved read cutover, and retained superseded bytes, immutable
versions, and issuance audits with no automatic purge. Orphan handling,
provider deletion, legacy reconciliation, and audit-retention changes remain
separate decisions.

Foundation tasks are separate: [C1 Case read policy](case-file-c1-read-policy.md)
is `CLOSED` with code `PASS` after correction and independent V3 `CODE` review;
its [evidence](../../evidence/files/authorization-v1/c1-case-read-policy/code-verification.md)
does not claim runtime/provider acceptance. [C2 persistence](case-file-c2-persistence.md)
is `CLOSED` at the development persistence level: code acceptance `PASS`,
disposable PostgreSQL verification `PASS`, and normal-development migration
`PASS`. Migration `20260927120000_c2_case_file_persistence` is installed in
development at SHA-256
`92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`;
the [application packet](../../evidence/files/authorization-v1/c2-case-file-persistence/normal-development-migration-application-20260927.md)
retains independent review and cleanup evidence. The separately authorized
[mixed-read correction](../../evidence/files/authorization-v1/c2-case-file-persistence/mixed-read-code-verification.md)
resolved the prior `CORRECTION_REQUIRED` nullable DTO finding; independent V3
`CODE` rereview is `PASS` and C2 code acceptance is `PASS`. Provider and
managed-file application acceptance are not established.
The separately authorized
[development migration-validation attempt](../../evidence/files/authorization-v1/c2-case-file-persistence/development-migration-validation.md)
stopped at read-only preflight because one Lab lacks Organization linkage.
Its corrected stop evidence passed independent V3 `RUNTIME_EVIDENCE` review;
development migration acceptance was `PENDING` at that historical stop.
The [unlinked-Lab diagnosis](../../evidence/files/authorization-v1/c2-case-file-persistence/unlinked-lab-read-only-diagnosis.md)
found all three legacy Case assets on that historical Lab, no uploaded grant
there, and no authoritative Organization choice from database evidence alone.
At that point C2 remained blocked pending a Product Owner decision.
The Product Owner later confirmed the Lab was disposable development/test
data. Its [authorized cleanup and fresh C2 restart](../../evidence/files/authorization-v1/c2-case-file-persistence/denta-fusion-cleanup-and-c2-resume.md)
passed; the original zero-unlinked-Lab invariant remains. Prisma Section A
was generated and reconciled; Section B pre-application review was then
`CORRECTION_REQUIRED` and subsequently corrected/reviewed.
The [narrow SQL correction and disposable verification route](../../evidence/files/authorization-v1/c2-case-file-persistence/audit-sql-correction-and-verification-route.md)
subsequently passed independent V3 `CODE`/SQL rereview. The later disposable
and normal-development gates passed under separate authorizations. Managed
Case-file activation remains unavailable.
[C3 issuance audit](case-file-c3-issuance-audit.md) is `CLOSED` with code
acceptance `PASS` after independent V3 `CODE` rereview; it provides only the
provider-independent append-only audit foundation.
[N-FILE-110A saved-DRAFT persistence](case-file-n-file-110a-draft.md) is
`CLOSED` with code `PASS` for its authorized provider-independent preservation
kernel after independent V3 `CODE` rereview. Legacy Case add/upload and
explicit asset deletion are disabled pending future protected commands. Each
implementation slice requires focused tests and independent V3
`CODE` review. Schema authoring and migration application are separate
approval gates. No task activates provider access.

The Product Owner separately authorized C2 schema authoring and SQL validation after exact planning. Its
[schema/migration decision packet](../../evidence/files/authorization-v1/c2-case-file-persistence/exact-schema-design.md)
has an authored [schema/SQL safety packet](../../evidence/files/authorization-v1/c2-case-file-persistence/schema-authoring-safety-packet.md),
not migration-application authority. The cyclic current-version relation
passes Prisma validation. The custom deferred guard requires isolated
PostgreSQL validation. The nullable URL fields now have a separately
authorized fail-closed mixed Case read contract.
The Product Owner resolved the [mixed-asset target decision](../../evidence/files/authorization-v1/c2-case-file-persistence/read-contract-decision-blocker.md):
authorized Cases stay readable, managed asset identity/clinical metadata stay
visible without raw URLs, and omission never authorizes deletion. The
[N-FILE-110A asset-safe persistence design](../../evidence/files/authorization-v1/n-file-110a-case-persistence/design-review.md)
was implemented as the provider-independent preservation kernel before C2
read-contract compatibility acceptance; see its
[code evidence](../../evidence/files/authorization-v1/n-file-110a-case-persistence/code-verification.md).
The mixed legacy/managed DTO and read-only UI are code-accepted: managed
identity and clinical metadata remain visible with unavailable content, while
legacy URLs require both URL and extension. Fresh legacy preflight, offline
SQL generation/comparison, and PostgreSQL constraint/trigger execution were
separate migration gates and are complete for C2 development persistence.
C3 code is accepted; its signed-issuance writer remains inactive for V1
public-read access. No signed
delivery, managed attachment, or Case asset stage is active.
The [N-FILE-110 readiness reconciliation](../../evidence/files/authorization-v1/n-file-110-case-asset-create/readiness-20260927.md)
confirms N-FILE-110A is already closed, not a pending implementation slice.
The Product Owner approved the exact `case.asset.add` bundle/resource policy.
Its provider-independent Authorization V1 slice is now `CLOSED | CODE PASS`
after independent V3 review; see the [code packet](../../evidence/files/authorization-v1/n-file-110-case-asset-create/asset-add-authz-code-verification.md).
The provider-independent saved-DRAFT staging intent is `CLOSED | CODE PASS`;
it creates only a Case-targeted PENDING grant behind an inactive provider
route. See the [code packet](../../evidence/files/authorization-v1/n-file-110-case-asset-create/saved-draft-stage-code-20260928.md).
Real Case provider staging no longer depends on private ACL under the approved
V1 public-storage limitation. It still needs a separately authorized
provider-bound route/callback, exact-object validation, an honest
public-backed persistence/read contract, rejected-object cleanup, and runtime
acceptance before activation.
The [N-FILE-110 staging/domain contract proposal](case-file-n-file-110-staging-domain.md)
records a Case-targeted grant and transactional first-attach design without
activation. The 15-minute clinical grant TTL is approved. The
[clinical asset research packet](../../evidence/files/authorization-v1/n-file-110-case-asset-create/clinical-asset-research-20260927.md)
supports the approved purpose-first JPEG clinical/reference photo scope.
The [one-to-one evidence architecture](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-evidence-design-20260927.md)
is approved as a baseline. The
[V1 validation-profile checkpoint](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-profile-design-20260927.md)
is approved. N-FILE-110 evidence schema `CODE: PASS` and combined
[disposable PostgreSQL verification](../../evidence/files/authorization-v1/n-file-110-case-asset-create/disposable-runtime-rerun-20260928.md)
`PASS`; [normal-development migration](../../evidence/files/authorization-v1/n-file-110-case-asset-create/normal-development-migration-20260928.md)
is also `PASS` at the exact reviewed SHA-256. This installs persistence only.
The five R001 numerical acceptance limits are approved in the
[R001 reconciliation](../../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-policy-reconciliation-20260928.md).
The [current R001 validator contract](case-file-jpeg-r001-validator.md)
also approves 512 length-bearing marker segments, 128 progressive SOS scans,
no deterministic work score, grayscale support, and direct strict
libjpeg-turbo full decompression. Offline direct-libjpeg native-helper
feasibility is `CLOSED | FEASIBLE | V3 CODE PASS` after independent rereview;
the local VS 2022 x64 toolchain is proven. Production helper packaging and
runtime containment remain unresolved; executable validator acceptance is
not established. Private-provider entitlement is resolved as unavailable on
UploadThing Free and is deferred, not a V1 blocker. Exact provider-key/object
binding, bounded retrieval and digest/revalidation remain required even for
public-backed V1 validation. Production packaging/containment is separate.
No Case upload is authorized by this plan.

| Operation | Existing catalog and bundle fact | Proposed mapping and decision gate |
| --- | --- | --- |
| Case detail/read | `case.read` is resource-scoped with required `case.read` policy and present in owner/admin/manager/staff bundles; C1 registered the Case resolver/policy and protected the detail reader. | C1 is code-level `PASS`. Tenant/Case policy always applies; Staff additionally need active same-Case assignment. No new permission decision is required for this read contract. |
| Case asset add | `case.asset.add` is explicitly registered in Owner/Admin/Manager/Staff bundles and supported with the authoritative Case resolver/facts/policy. | Provider-independent authorization code `PASS`; saved DRAFT is eligible. Staging, attachment, provider security, and runtime verification remain separate gates. |
| Case asset replace | No distinct approved/implemented replacement permission or bundle. `case.update` is not a substitute. | Recommend distinct asset-and-Case-targeted `case.asset.replace`, with the same candidate role set but separate existing-asset ownership policy. Exact bundles and resource policy require Product Owner approval before registration or use. |
| Case asset metadata edit | General Case forms are asset-preserving under N-FILE-110A; no distinct approved asset-metadata permission/policy. | Separate asset-targeted command and policy decision; do not infer from `case.update` or an edit-form payload. |
| Case asset remove/delete | Explicit legacy/managed delete action is disabled under N-FILE-110A; no managed deletion policy is approved. | Remains unavailable pending separate permission, retention, history, and provider-cleanup decisions. |

Durable resulting rules are in [Files architecture](../../architecture/modules/files.md) and [decisions](../../architecture/decisions.md).

Completed grant evidence is [here](../../evidence/authorization-v1/file-upload-grants.md).

## Stable protected upload boundary map

| ID         | Purpose / operation                 | Target                 | Current lifecycle and dependency                                                                                                               |
| ---------- | ----------------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| N-FILE-101 | Staff self-avatar stage             | Staff self target      | Deferred/unavailable by D-FILE-03; not registered.                                                                                             |
| N-FILE-102 | Catalog Category image create stage | Collection (no target) | Registered grant definition, 15-minute TTL; Catalog Category code-level and approved local-development runtime pilot accepted. |
| N-FILE-103 | Catalog Category image update stage | `catalog.category`     | Registered grant definition, 15-minute TTL; Catalog Category code-level and approved local-development runtime pilot accepted. |
| N-FILE-104 | Catalog WorkType image create stage | Collection (no target) | Registered grant definition, 15-minute TTL; code-level accepted; runtime checkpoint closed `PASS_WITH_LIMITATIONS` with WTRV-01 residual.       |
| N-FILE-105 | Catalog WorkType image update stage | `catalog.worktype`     | Registered grant definition, 15-minute TTL; code-level accepted; runtime checkpoint closed `PASS_WITH_LIMITATIONS` with WTRV-07 residual.       |
| N-FILE-106 | Catalog Product image create stage  | Collection (no target) | Registered grant definition, 15-minute TTL; code-level accepted; local-development runtime checkpoint closed `PASS_WITH_LIMITATIONS` with PRV-08 residual. |
| N-FILE-107 | Catalog Product image update stage  | `catalog.product`      | Registered grant definition, 15-minute TTL; code-level accepted; local-development runtime checkpoint closed `PASS_WITH_LIMITATIONS` with PRV-08 residual. |
| N-FILE-108 | Dentist avatar create stage         | Collection (no target) | Registered grant definition, 15-minute TTL; code-level accepted under D-FILE-05; raster correction code accepted; DRV-01 PASS; local-development runtime checkpoint CLOSED. |
| N-FILE-109 | Dentist avatar update stage         | `dentist`              | Registered grant definition, 15-minute TTL; code-level accepted under D-FILE-05; raster correction code accepted; DRV-02-06 PASS; local-development runtime checkpoint CLOSED. |
| N-FILE-110 | Case asset create stage             | Case                   | Amended D-FILE-04 public-storage V1 decision, C1, N-FILE-110A, C2/C3, asset-add policy, evidence persistence, and saved-DRAFT staging-intent CODE accepted; honest public-backed persistence/read representation, provider upload/callback, JPEG validation, cleanup, attachment, and runtime acceptance remain separate gates. |
| N-FILE-111 | Case asset update/replace stage     | Case asset / Case      | Amended D-FILE-04, C1, N-FILE-110A, and C2 development persistence accepted; implementation/activation unavailable pending separate replacement permission, public-backed storage/read contract, application, and runtime gates. |

## Workstream completion

N-FILE-001 is not complete merely because one boundary pilot reaches code-level acceptance.

Advance the workstream only through bounded tasks derived from approved architecture, decisions, and this plan.

Do not infer:

- runtime acceptance from code-level acceptance;
- authorization of another boundary from Catalog Category acceptance;
- stored-file read authorization from upload authorization;
- provider configuration approval from implementation work;
- migration application approval from migration code;
- production deployment from repository evidence.

The Primary Engineering Session owns workstream reconciliation and selection of the next bounded task.
