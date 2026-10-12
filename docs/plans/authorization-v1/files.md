# Authorization V1 file plan

Status: Active

Authority: Supporting

Owner: PRIMARY

Last reviewed: 2026-10-07

## Current Case storage checkpoint

The Product Owner approved the
[UploadThing → R2 migration roadmap](uploadthing-r2-migration-repository-review.md)
on 2026-10-06. R2-00 through R2-05 are `CLOSED | PASS CHECKPOINT`.
[R2-05](../../evidence/files/authorization-v1/r2-05-case-provider-runtime/packet.md)
established bounded isolated real-R2 Case composition with independent V3 PASS,
but activation is `NOT_ELIGIBLE` because complete Case composition under actual
production Linux S001 identity remains `NOT_RUN`. The narrow
[R2-06 successor](r2-06-production-s001-case-runtime.md) is prepared.
New N-FILE-110
clinical objects target private Cloudflare R2 through a provider-independent
ObjectStorage semantic boundary. The installed persisted backend identity is
`OBJECT_STORAGE` on grant, evidence and StoredFile, not `R2`; no Case application
flow has been activated for that value. LabOS owns permanent opaque
key nonreuse, authorization, grant/evidence/attachment/cleanup semantics and
private-open policy. The R2 adapter owns physical bucket, endpoint, SDK,
presigning and provider-error mapping. Direct browser completion is a hint;
bounded server inspection/retrieval and unchanged S001 determine acceptance.
Presigned capabilities remain opaque, short-lived secrets. Cleanup deletion
waits for all write capabilities to expire plus bounded clock skew.

The 2026-09-29 public-read UploadThing Case decision and installed
`MANAGED_PUBLIC` contract below remain historically true and compatible with
actual public records, but are superseded as the **new N-FILE-110 activation
target**. Existing non-Case UploadThing boundaries remain active and will move
one at a time in later authorized work. Normal-development Case fixture mutation
remains outside standing authority. N-FILE-110 activation and cleanup
implementation remain unauthorized. Production S001 Case composition is the
next runtime proof; rejected/orphan provider-object cleanup remains a later
separate successor.

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

## Historical UploadThing Case access gate

**Historical 2026-09-29 V1 decision:** UploadThing Free `public-read` was accepted for Case
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
authorized public-open contract. The [schema/SQL and read contract](case-file-public-access-contract.md)
passed independent review and disposable verification; the exact persistence
migration is installed in normal development. It does not activate a Case
asset. Rejected-upload cleanup still needs a bounded design so validation
failure cannot produce an active asset. C3 signed-issuance auditing remains
inactive for public object retrieval. Existing
Catalog/WorkType/Product/Dentist behavior remains unchanged.

**Implementation impact before activation:** (1) retain the accepted
public-backed persistence/read contract and exact installed migration without
altering historical C2 migration bytes; (2) keep the
saved-DRAFT `case.asset.add` grant, then implement a Case-only authenticated
provider handoff/callback with server-bound opaque key and no caller tenant
authority; (3) inspect the exact uploaded bytes under a separately approved
deployable validation profile before evidence,
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
settings. C2 and the approved public-backed `MANAGED_PUBLIC` persistence
contract are installed in normal development; the latter's
[decision and accepted migration](case-file-public-access-contract.md) remain
the current Case storage authority. The separate S001 immutable evidence
identity/schema and production validator/containment integration design had
independent `PASS | CODE/SQL`; disposable runtime then exposed a failed-install
rollback defect. The [corrected transaction boundary](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-transactional-install-correction-20261003.md)
has new independent `PASS | CODE/SQL`; the exact corrected candidate also has
[disposable PostgreSQL runtime `PASS` and independent V3 evidence review `PASS`](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-corrected-disposable-postgres-20261003/packet.md).
The [normal-development installation](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-normal-development-20261003/packet.md)
then passed preflight, Prisma application, preservation and independent V3
`RUNTIME_EVIDENCE + CHECKPOINT` review. Production-facing S001
validator/containment now has independent V3 `PASS | CODE/ARCHITECTURE`.
The [isolated Vercel Preview attestation](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-preview-runtime-attestation-20261003/packet.md)
stopped before deployment at independent V3 `BLOCKED_DECISION`: no lower
production S001 byte-validation seam existed below grant/provider retrieval at
that checkpoint. The subsequently authorized [server-only S001 byte-core
extraction](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-byte-core-extraction-20261003/packet.md)
has independent V3 `PASS | CODE/ARCHITECTURE`. It preserves outer grant and
provider authority, runs real codec identity inside the core and creates no
retained grant context from direct core calls. A separate [protected Preview
retry](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-core-preview-retry-20261003/packet.md)
reached the production byte core but failed to establish runtime codec identity.
The exact local Next server bundle converted package path resolution into a
numeric module ID; independent V3 review returned `CORRECTION_REQUIRED |
RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT`. Exact run-owned cleanup completed.
A separately authorized [codec-identity/Turbopack
correction](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-codec-identity-correction-20261003/packet.md)
has independent V3 `PASS | CODE/ARCHITECTURE`. The compiled server now derives
native filesystem identity from actual post-load mappings and preserves exact
hash/adjacency checks. The failed Preview remains historical runtime evidence.
The separate [fresh corrected-core Preview run](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-core-preview-20261003-157cb99a8d/packet.md)
has overall runtime `PASS_WITH_LIMITATIONS` and independent V3 `PASS |
RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT`: synthetic production-core
baseline/progressive/grayscale validation, pinned mapped native identity,
structural rejection and same-instance warm reuse passed. Codec-only rejection,
outer provider/admission, Case flow and finalization remain `NOT_RUN`. Exact
run-owned cleanup passed. The Product Owner authorized successful S001 evidence
finalization and atomic `PENDING → UPLOADED` CODE/runtime verification, but it
stopped before implementation at a [checked-suffix handoff
BLOCKED_DECISION](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-finalization-handoff-blocker-20261003.md):
the required `validatedSuffix` is not retained by the Case callback/grant or
S001 context. The Product Owner prohibited a fabricated suffix; the installed
canonical evidence `providerObjectKey` remains required. Finalization CODE and
disposable runtime are `NOT_RUN`. The separately authorized [checked-suffix
handoff architecture decision](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-checked-suffix-handoff-architecture-20261004.md)
has independent V3 `PASS | ARCHITECTURE/DECISION`: normalized `JPG | JPEG` is
grant-owned, immutable, and later copied to evidence after a fresh grant
recheck; callback/provider metadata cannot redefine it. The separately authorized
[checked-suffix CODE/SQL and disposable runtime gate](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-checked-suffix-code-20261004/packet.md)
has independent V3 PASS. Candidate `20261004120000_case_checked_suffix_handoff` at SHA-256
`3e150d41429c58d44a902473ff4b9d4fbc4c0d9afb29955e8d124f899e6bd23d`
is [installed in normal development](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-checked-suffix-normal-development-20261004/packet.md)
with independent V3 PASS, unchanged data fingerprints and no Prisma drift.
At that checkpoint, the next gate was separately authorized S001 clinical-evidence atomic finalization. A new [attempt #2](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-finalization-attempt2-20261004/packet.md) now has independent V3 `PASS | CODE/ARCHITECTURE + RUNTIME_EVIDENCE/CHECKPOINT`; the historical first attempt stays `BLOCKED_DECISION` with no implementation. N-FILE-110 remains inactive. First attachment with fresh exact-key retrieval and SHA-256 evidence equality is the next bounded architecture gate.
N-FILE-110/111 activation remains separately gated by application
finalization, validation runtime, cleanup, attachment and activation review.

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
V1 public-storage limitation. The public-backed persistence contract is
installed; the Case-only provider route/callback handoff is CODE-accepted but
unregistered. Windows x64 exact-object R001 validation is CODE-accepted.
The Product Owner approved S001 with Julusian 3.0.1 for the V1 Vercel path;
its evidence identity/schema and production integration remain separate
gates, as do rejected-object cleanup and runtime acceptance.
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
the local VS 2022 x64 toolchain is proven. The separate [production Windows x64
R001 retrieval/validation CODE boundary](../../evidence/files/authorization-v1/n-file-110-case-asset-create/r001-production-code-20261001/packet.md)
has independent V3 `PASS | CODE` with packaging and local containment accepted
for that evidenced target. Vercel is the intended production host, so the
successful clinical-evidence finalization gate was PO-deferred at that checkpoint pending the
[Vercel JPEG validation profiles architecture investigation](../../evidence/files/authorization-v1/n-file-110-case-asset-create/vercel-jpeg-validation-profiles-architecture-20261001.md)
and a verified deployable backend. The [synthetic Preview probe](../../evidence/files/authorization-v1/n-file-110-case-asset-create/vercel-s001-preview-20261001/packet.md)
stopped after an explicit Preview command yielded a failed deployment recorded
as `production`; the exact run-owned project was removed. Both backend Preview
verdicts were `BLOCKED` at that superseded stopped checkpoint. A later protected
Preview retry established Julusian and Sharp feasibility `PASS`; the Product
Owner subsequently approved S001 with Julusian as the sole V1 Vercel backend.
The [review-only evidence identity/integration design](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-evidence-schema-integration-design-20261002.md)
had independent `PASS | CODE/SQL`, but
[disposable PostgreSQL verification](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-disposable-postgres-20261002/packet.md)
returned **FAIL** on transactional failed-install rollback, with independent
`CORRECTION_REQUIRED | RUNTIME_EVIDENCE + SQL/CHECKPOINT`. At that checkpoint,
the corrected candidate was unapplied and had new independent `PASS | CODE/SQL`; corrected
[disposable runtime and independent V3 evidence review are `PASS`](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-corrected-disposable-postgres-20261003/packet.md).
It is [installed in normal development](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-normal-development-20261003/packet.md)
with independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`. This does not change R001. Private-provider
entitlement is resolved as unavailable on UploadThing Free and is deferred,
not a V1 blocker. Exact provider-key/object
binding, bounded retrieval and digest/revalidation remain required even for
public-backed V1 validation. The [production-facing S001 validator/containment
CODE boundary](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-validator-code-20261003/packet.md)
has independent V3 `PASS | CODE/ARCHITECTURE`; its local native build trace is
verified. A synthetic Vercel Preview runtime attestation stopped pre-deployment
at `BLOCKED_DECISION` because no safe lower production core can be invoked
without fake grant/provider authority. Actual Vercel runtime identity/load,
provider retrieval and Case behavior remain `NOT_RUN`. The later S001 byte-core
extraction is independent V3 `PASS | CODE/ARCHITECTURE`; the stopped Preview
packet remains historical truth. The separate protected Preview retry failed
the production codec identity/byte-core path and was cleaned up. The subsequent
codec-identity/Turbopack correction has independent V3 `PASS | CODE/ARCHITECTURE`;
corrected Vercel runtime, provider and Case behavior remain `NOT_RUN`. Successful clinical-evidence finalization
stays PO-deferred. No Case upload is authorized by this plan.

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
| N-FILE-110 | Case asset create stage             | Case                   | Historical UploadThing/public-backed checkpoints: amended D-FILE-04 V1 decision, C1, N-FILE-110A, C2/C3, asset-add policy, evidence persistence, saved-DRAFT staging-intent CODE, public-backed persistence in normal development, DTO/public-open CODE, unregistered Case provider handoff CODE, and Windows x64 R001 retrieval/validation CODE accepted. S001 and Julusian 3.0.1 are PO-approved for Vercel; evidence identity/schema is installed in normal development after corrected-candidate disposable runtime and independent review PASS. Production-facing S001 validator/containment, server-only byte-core extraction and codec-identity/Turbopack correction each have independent `PASS | CODE/ARCHITECTURE`. The earlier isolated Preview attestation stopped pre-deployment at independent `BLOCKED_DECISION` and remains historical truth. A separate protected Preview retry attested Node/Linux runtime but failed the production codec identity/byte-core path; its run-owned project was cleaned up. The subsequent CODE correction does not convert that runtime FAIL into PASS. The fresh corrected-core isolated Preview has overall runtime PASS_WITH_LIMITATIONS and independent V3 PASS | RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT; synthetic production-core and pinned native identity passed, while codec-only rejection and outer provider/Case/finalization remain NOT_RUN. The first authorized S001 finalization gate stopped at BLOCKED_DECISION before implementation because required validatedSuffix is absent from the callback/grant/retained S001 handoff; finalization CODE and disposable runtime remain NOT_RUN. Checked-suffix handoff architecture has independent V3 PASS | ARCHITECTURE/DECISION: grant-owned bounded immutable JPG/JPEG, callback unchanged, historical null fail-closed, validation completion time privately retained. Checked-suffix handoff schema/SQL, application CODE and disposable PostgreSQL have independent V3 PASS; the exact candidate is installed in normal development with independent V3 PASS. At that checkpoint, the next gate was S001 clinical-evidence atomic finalization. A new [attempt #2](../../evidence/files/authorization-v1/n-file-110-case-asset-create/s001-finalization-attempt2-20261004/packet.md) has independent V3 `PASS | CODE/ARCHITECTURE + RUNTIME_EVIDENCE/CHECKPOINT`; the historical first attempt stays `BLOCKED_DECISION` with no implementation. [First-attachment architecture](../../evidence/files/authorization-v1/n-file-110-case-asset-create/first-attachment-architecture-20261004.md) has independent V3 `PASS | ARCHITECTURE/DECISION`: fresh exact-key byte length/SHA equality to evidence, transaction-fresh authorization and Case rechecks, atomic first StoredFile/asset/version plus UPLOADED-to-CONSUMED transition; no schema addition. N-FILE-110 remains inactive. The [first-attachment CODE and disposable PostgreSQL checkpoint](../../evidence/files/authorization-v1/n-file-110-case-asset-create/first-attachment-code-20261004/packet.md) has independent V3 `PASS | CODE/ARCHITECTURE + RUNTIME_EVIDENCE/CHECKPOINT`: exact evidence byte equality precedes atomic StoredFile/asset/version creation and UPLOADED-to-CONSUMED; public-open requires CONSUMED. Live UploadThing/Case runtime and activation remain NOT_RUN. [Rejected/orphan cleanup architecture](../../evidence/files/authorization-v1/n-file-110-case-asset-create/rejected-orphan-cleanup-architecture-20261005.md) has independent V3 `PASS | ARCHITECTURE/DECISION`: terminalize before exact-key deletion, preserve evidence, exclude canonical CONSUMED files, and require additive lifecycle guard/confirmation state. UploadThing key nonreuse and authoritative absence remain a capability blocker for deletion; cleanup runtime is NOT_RUN. The [UploadThing exact-key capability packet](../../evidence/files/authorization-v1/n-file-110-case-asset-create/uploadthing-capability-20261005/packet.md) is `CAPABILITY_BLOCKER`, with independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT` on that classification: a two-object synthetic probe observed deletion/absence, but official sources do not establish permanent fileKey nonreuse or authoritative zero-result absence. Both run-owned objects and the local run root were cleaned up. N-FILE-110 and cleanup remain inactive. At that historical checkpoint the next action was UploadThing provider/maintainer attestation. The Product Owner-approved R2 roadmap supersedes it as the current direction; after R2-00, R2-01 is the next separately authorized gate. |
| N-FILE-111 | Case asset update/replace stage     | Case asset / Case      | Amended D-FILE-04, C1, N-FILE-110A, public-backed development persistence, and DTO/public-open CODE accepted; implementation/activation unavailable pending separate replacement permission and runtime gates. |

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
