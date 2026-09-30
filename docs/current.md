# Current LabOS work

Status: V1 public-backed Case compatibility decision APPROVED; additive schema/SQL candidate authored for review; activation inactive
Authority: Canonical
Owner: LabOS maintainers
Last reviewed: 2026-09-29

- **Active branch:** `feat/authorization-financial-reads` (stale context; the name does not set priority).
- **Last committed checkpoint:** `2b96327` — `feat(auth): protect unpaid invoice cancellation`.
- **Working tree:** implementation, generated-output, migration, and test changes are in progress and remain outside this documentation migration.
- **Program milestone:** M4 — Authorization V1.
- **Current workstream:** UploadThing/file authorization.

Authorization V1 is approved for the reviewed scope and verified/development-active. Repository evidence does not establish production deployment. Do not resume Financial F3 as part of this documentation migration.

## Latest accepted checkpoint

The Catalog Category UploadThing pilot for N-FILE-102 and N-FILE-103 is
accepted for the approved local-development scope. FILE-01 through FILE-05
retain their code-level acceptance, and the runtime packet records real
authorization, canonical tenant/grant linkage, provider staging and callback,
transactional one-time consumption, replay rejection, raw-URL non-authority,
cross-tenant and missing-membership denial, migration compatibility, and
sanitized telemetry evidence.

RV-09 remains `NOT RUN` under an explicit Product Owner-approved limitation:
UploadThing 7.7.4 provides no safe provider-supported callback replay in the
current local-development environment. The successful real callback and
code-level replay-validation evidence support checkpoint closure but do not
establish runtime callback-replay resistance. RV-10 remains `NOT RUN` under its
approved deferred reversible-method disposition. Deployed/production callback
reachability is not established.

## Latest WorkType checkpoint

N-FILE-104 and N-FILE-105 Catalog WorkType image create/update are accepted at
code level after independent V3 review. Task and review evidence is retained at
[`docs/evidence/files/authorization-v1/n-file-104-105-worktype-upload/`](evidence/files/authorization-v1/n-file-104-105-worktype-upload/).

The WorkType real database/provider/browser runtime packet is
[`runtime-verification.md`](evidence/files/authorization-v1/n-file-104-105-worktype-upload/runtime-verification.md).
The checkpoint is `CLOSED` with runtime acceptance `PASS_WITH_LIMITATIONS` and
parent gate `ELIGIBLE` after final independent review. WTRV-02–06, WTRV-08,
and WTRV-09 are `PASS`. WTRV-01 and WTRV-07 remain `BLOCKED`, not passed, under
explicit Product Owner residual dispositions and retained future triggers.
Exact development fixtures and provider objects were cleaned. This does not
establish deployed or production acceptance.

## Active task

The Product Owner approved the V1 public-backed Case compatibility model and
authorized only exact additive schema/SQL and DTO/open-contract authoring.
`MANAGED_PUBLIC` describes a validated managed Case asset with a current
public-read object; nullable immutable `StoredFile.providerAccess` records
`PUBLIC_READ`, `PRIVATE`, or historical/unclassified null per physical file.
Null never implies private, and installed `MANAGED_PRIVATE` retains its C2
meaning. Ordinary managed Case DTOs contain no provider URL/key; a separate
freshly `case.read`-authorized public-open operation is the proposed narrow
URL exposure boundary. Public opening cannot use C3 `ISSUED`. The
[candidate contract](plans/authorization-v1/case-file-public-access-contract.md)
and review-only migration SQL are authored, not applied or activated. The
next bounded task is independent V3 CODE/SQL review and focused static
verification of this exact candidate, followed by separately authorized
disposable PostgreSQL and migration-application gates. Provider callback,
R001 implementation, rejected-object cleanup, first attachment and N-FILE-110
runtime activation remain separate. Initial independent review identified
enum ordering, evidence binding, and managed-to-legacy fallback defects;
the candidate was corrected. Final independent rereview was interrupted by
reviewer usage limits, so CODE acceptance remains pending. No PostgreSQL
runtime acceptance is claimed.

C3 Case signed-access issuance audit
foundation is `CLOSED` with code acceptance `PASS` after independent V3 `CODE`
rereview. Its provider-independent writer records allowlisted facts only after
server-derived tenant/member context, `case.read`, and tenant-scoped resource
resolution; failed required audit writes yield no deliverable result. Focused
and affected regressions, TypeScript, lint, and Prisma validation passed. See
the [C3 code packet](evidence/files/authorization-v1/c3-case-file-access-audit/code-verification.md).
Do not start another boundary from this checkpoint closure.

The separately authorized `case.asset.add` Authorization V1 slice is
`CLOSED | CODE PASS` after independent V3 `CODE` rereview. Owner, Admin,
Manager, and Staff have explicit fixed-bundle grants, with authoritative
Case/Lab/Organization facts and exact active Staff assignment enforced by the
resource policy. Saved DRAFT is eligible. No provider staging, grant consumption,
managed write, provider route, or runtime acceptance follows from that permission alone. See the
[asset-add code packet](evidence/files/authorization-v1/n-file-110-case-asset-create/asset-add-authz-code-verification.md).
The bounded [N-FILE-110 staging/domain design](plans/authorization-v1/case-file-n-file-110-staging-domain.md)
is proposed only. Clinical staging grant TTL is approved at 15 minutes from
creation without extension or revival. The [research packet](evidence/files/authorization-v1/n-file-110-case-asset-create/clinical-asset-research-20260927.md)
supports the approved purpose-first clinical/reference photography scope:
JPEG only, `.jpg`/`.jpeg`, canonical `image/jpeg` after independent content
verification. The [Case evidence architecture](evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-evidence-design-20260927.md)
is approved as a baseline. The
[V1 validation-profile checkpoint](evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-profile-design-20260927.md)
is approved. The additive [Case evidence schema/SQL candidate](evidence/files/authorization-v1/n-file-110-case-asset-create/additive-evidence-schema-authoring-20260928.md)
passed independent V3 `CODE` review at SHA-256
`e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b`.
It has passed combined disposable PostgreSQL 17.6 verification after
independent V3 `RUNTIME_EVIDENCE` review: 39 retained scenarios plus the
separately executed non-UTC timestamp claim, with exact cleanup. See the
[runtime packet](evidence/files/authorization-v1/n-file-110-case-asset-create/disposable-runtime-rerun-20260928.md).
The exact candidate is now [installed in normal development](evidence/files/authorization-v1/n-file-110-case-asset-create/normal-development-migration-20260928.md)
as migration 49 at that SHA-256. Fresh preflight, preservation inspection,
regressions, and independent V3 `RUNTIME_EVIDENCE` review passed. N-FILE-110
normal-development migration is `PASS`; this installs the evidence persistence
foundation only. The five `JPEG_CLINICAL_V1_R001` numerical ceilings are
approved: 33,554,432 encoded bytes, 9,000 pixels per axis, 50,000,000 decoded
pixels, and 262,144 aggregate APP/COM metadata payload bytes. The
[historical R001 reconciliation](evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-policy-reconciliation-20260928.md)
records the original five-limit decision and earlier decoder research. The
Product Owner has now closed the remaining R001 acceptance
choices: [the current validator contract](plans/authorization-v1/case-file-jpeg-r001-validator.md)
fixes 512 length-bearing structural segments, 128 progressive SOS scans,
no deterministic work score, 8-bit grayscale support and direct strict
libjpeg-turbo full-scanline decompression with fatal warnings/errors. Native
Node/Next helper packaging and deployment runtime containment remain open;
no executable production validator is accepted.
The bounded [offline R001 harness](evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-harness-20260928.md)
has independent V3 `CODE` review `PASS` after one corrected evidence finding.
It measured synthetic JPEG behavior using Sharp/libvips only and does not
satisfy the newly approved normative libjpeg-turbo full-decode mechanism.
The subsequent [direct-libjpeg native-helper feasibility](evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-native-helper-feasibility-20260929.md)
is `CLOSED | FEASIBLE | V3 CODE PASS` after independent rereview: the VS 2022 x64
toolchain gate passed, the pinned official libjpeg-turbo 3.2.0 VC x64 static
library built an isolated offline helper, and native/inspector tests passed
9/9 and 8/8. Exact run-owned binary/acquisition artifacts were removed.
Production helper architecture, packaging and containment are not approved;
no Case validator or provider capability was activated.
**FILE STORAGE SECURITY — V1 LIMITATION:** The Product Owner confirms
UploadThing Free and accepts `public-read` for current file work. LabOS
application authorization remains required, but possession of a direct
provider URL bypasses it for byte retrieval. Private ACL and signed-only
delivery are deferred until a later storage-security version; no upgrade or
ACL retry is planned. The historical [read-only provider checkpoint](evidence/files/authorization-v1/n-file-110-case-asset-create/private-provider-capability-checkpoint-20260929.md)
is superseded for V1 routing. URL exposure must be minimized without claiming
object privacy. Production helper packaging/containment, exact-object
validation, and provider callback/cleanup remain unaccepted. Most importantly,
the installed `MANAGED_PRIVATE` storage mode and managed-content-unavailable
read contract remain reserved as installed; the approved additive
`MANAGED_PUBLIC`/per-file provider-access candidate now awaits review and
separate migration approval before a V1 Case asset can be written.
The provider-independent
[saved-DRAFT staging intent](evidence/files/authorization-v1/n-file-110-case-asset-create/saved-draft-stage-code-20260928.md)
is `CLOSED | CODE PASS` after independent V3 rereview: strict Case-ID input,
transaction-fresh authorization and DRAFT check, and a 15-minute target-bound
PENDING grant. No Case provider upload, callback, attachment, private upload,
or signed read is active.

Historically, the first [disposable PostgreSQL attempt](evidence/files/authorization-v1/n-file-110-case-asset-create/disposable-runtime-stop-20260928.md)
stopped at a harness server-version string comparison before migrations or
scenarios. Exact run-owned Docker/temp cleanup passed; independent V3
`RUNTIME_EVIDENCE` review returned `CORRECTION_REQUIRED`. The separately
authorized [fresh rerun](evidence/files/authorization-v1/n-file-110-case-asset-create/disposable-runtime-rerun-20260928.md)
installed all 49 migrations and passed its executed Case-evidence scenarios
and exact cleanup, but omitted the mandatory non-UTC session scenario.
Its independent V3 review returned `CORRECTION_REQUIRED` at that point. The
subsequent authorized narrow supplemental run executed that claim. Combined
independent V3 review returned `PASS`; neither earlier aggregate marker was
used as substitute for scenario evidence.

The bounded N-FILE-106/107 Product runtime-verification checkpoint and its
authorized targeted rerun have been executed and exactly cleaned. The
checkpoint is `CLOSED`; no application implementation task is active.

N-FILE-106 and N-FILE-107 Catalog Product image create/update are accepted at
code level after independent V3 `CODE` review. The implementation uses the
approved opaque one-time grant flow, canonical Product ownership resolution,
same-Lab WorkType revalidation, verified callback handoff, transactional
single-use consumption, and no-grant image preservation across both create
surfaces and the Catalog edit surface. Durable evidence is retained at
[`docs/evidence/files/authorization-v1/n-file-106-107-product-upload/`](evidence/files/authorization-v1/n-file-106-107-product-upload/).

The Product runtime packet is
[`runtime-verification.md`](evidence/files/authorization-v1/n-file-106-107-product-upload/runtime-verification.md).
PRV-01–07 are `PASS`; PRV-08 remains `BLOCKED` under an explicit Product Owner
residual disposition. Product-specific Axiom telemetry was not inspected at
runtime because the existing API query returned HTTP 403 and no authenticated
UI query session was available during the checkpoint. Runtime acceptance is
`PASS_WITH_LIMITATIONS`, the parent gate is `ELIGIBLE`, and the local-development
checkpoint is `CLOSED` after independent `RUNTIME_EVIDENCE` and `CHECKPOINT`
reviews, both `PASS`. Exact development database/provider fixtures, browser
sessions, temporary files/helpers, and the run-owned local server were cleaned.
The Product-specific telemetry field inventory remains a retained obligation
for a separately authorized PRV-08-only verification when read/query access is
available. No deployed or production acceptance is claimed.

## Dentist avatar code checkpoint

N-FILE-108/N-FILE-109 Dentist avatar create/update are accepted at code level
after independent V3 `CODE` review. D-FILE-05 approves attachment-only
staging while leaving D-FILE-04 read/access policy pending. The practitioner
editor now hands off an opaque grant; the verified callback and transactional
single-use consumption authorize attachment. Grantless edits preserve the
persisted avatar, and removal/deletion remain deferred. Complete and quick
Clinic creation remain unchanged. Focused and affected Category, WorkType, and
Product grant regressions passed. The typecheck has no new Dentist diagnostics;
the pre-existing `TS2352` in the upload-grant telemetry test remains.

The first [Dentist runtime execution](evidence/files/authorization-v1/n-file-108-109-dentist-avatar/runtime-verification.md)
passed DRV-01 but stopped at a persisted SVG preview defect. The separately
authorized [raster-only correction](evidence/files/authorization-v1/n-file-108-109-dentist-avatar/raster-correction.md)
passed independent `CODE` review. The approved targeted continuation then
passed DRV-02–06 against the existing development database, provider, browser,
and Axiom UI, with exact fixture/provider cleanup and independent
`PASS | RUNTIME_EVIDENCE` review. DRV-01–06 are `PASS`; runtime acceptance is
`PASS`, parent gate `ELIGIBLE`, and the local-development checkpoint is
`CLOSED`. That checkpoint claims no Dentist deployed/production acceptance
and did not decide Case clinical-asset access.

The recurring upload-grant telemetry-test `TS2352` was corrected in a
[separate V1 code-only task](plans/authorization-v1/upload-grant-telemetry-ts2352.md).
Its focused regressions and global typecheck pass. This does not change
Dentist runtime evidence or the retained Product telemetry obligation.

The accepted FILE-05 record and closed Category runtime packet remain retained
in
[`docs/evidence/files/authorization-v1/n-file-001-catalog-category-uploadthing-pilot/`](evidence/files/authorization-v1/n-file-001-catalog-category-uploadthing-pilot/).
Expiry scheduling and provider orphan deletion remain isolated operational
follow-up. D-FILE-04's original private/signed Case target is deferred by the
accepted public-read V1 amendment above. It does not alter accepted Catalog,
WorkType, Product, or Dentist display contracts. Case asset activation still
requires separate implementation and runtime gates. The
[read-only attestation](evidence/files/authorization-v1/d-file-04-read-access/read-only-attestation.md)
found the existing development UploadThing project defaults to `public-read`
with per-request ACL overrides disabled. A Case-only private route needs a
Case-only override. The Product Owner approved that exact toggle, but the
[dashboard attempt](evidence/files/authorization-v1/d-file-04-read-access/read-only-attestation.md)
stopped at GitHub sign-in without an authenticated UI session. Settings remain
unchanged. A later authenticated
[dashboard retry](evidence/files/authorization-v1/d-file-04-read-access/read-only-attestation.md)
reached the matching app but failed to save the approved override toggle;
read-only re-attestation still reports `public-read`/`false`. Provider/account
owner diagnosis remains pending. The Product Owner classified this as an
unresolved `CAPABILITY_BLOCKER`, deferred paid upgrade, and prohibited a
retry, global ACL change, project switch, or public Case workaround. The
[provider-independent persistence/migration design](evidence/files/authorization-v1/d-file-04-read-access/persistence-migration-design.md)
is accepted as planning basis: it proposes durable file/asset/version/audit
identity, explicit saved-DRAFT sequencing, preservation of all three URL-only
rows, additive migration/rollback, and independently reviewable slices. No
schema or implementation approval follows from this design. The Product Owner
fixed a 300-second signed-URL maximum with fresh authorization, retained
explicit Save Draft, approved a post-cutover unavailable state for legacy
assets without URL fallback, and retained superseded bytes, versions, and
issuance audits without automatic purge. [C1 Case read policy](plans/authorization-v1/case-file-c1-read-policy.md)
is `CLOSED` with code `PASS` after corrected V3 `CODE` review and focused
[verification](evidence/files/authorization-v1/c1-case-read-policy/code-verification.md).
C2's [exact schema/migration proposal](evidence/files/authorization-v1/c2-case-file-persistence/exact-schema-design.md)
has been authored as a Prisma schema and review-only SQL under separate
schema-authoring authority. The composite relation validates with installed
Prisma 7.8.0; no migration was applied. The first independent V3
[CODE review](evidence/files/authorization-v1/c2-case-file-persistence/code-review.md)
found a nullable-field Case DTO TS2322 incompatibility. The first attempted
read-contract correction stopped at a
[mixed-asset decision blocker](evidence/files/authorization-v1/c2-case-file-persistence/read-contract-decision-blocker.md):
silent filtering would hide clinical assets and could feed deletion through
the existing edit form. The Product Owner selected deferral and approved the
target mixed-asset representation: a Case stays readable, managed identity and
clinical metadata remain visible without raw URLs, and edit-form omission is
never deletion authority. The Product Owner disabled legacy in-form Case
asset upload/add and explicit asset deletion during this transition. The
[N-FILE-110A preservation kernel](evidence/files/authorization-v1/n-file-110a-case-persistence/code-verification.md)
is `CLOSED` with code `PASS` after corrected independent V3 `CODE` review:
ordinary Case create/draft/promotion/edit operations preserve asset rows and
reject raw-URL attachment input; the generic Case upload route and explicit
add/delete actions deny. Legacy assets remain visible but read-only. The
separately authorized [C2 mixed-read correction](evidence/files/authorization-v1/c2-case-file-persistence/mixed-read-code-verification.md)
now retains complete legacy/managed asset identity in Case detail and draft
DTOs, exposes legacy URLs only when complete, and marks managed content
unavailable without provider or grant identity. The two C2 TS2322 errors are
resolved; global TypeScript and independent V3 `CODE` rereview pass. C2 code
acceptance is `PASS` and its code task is `CLOSED`. The separately authorized
[development migration-validation attempt](evidence/files/authorization-v1/c2-case-file-persistence/development-migration-validation.md)
attested the existing Supabase development target but stopped at fresh
read-only preflight: one Lab lacks Organization linkage. The stop packet has
independent `PASS | RUNTIME_EVIDENCE` review; C2 development migration
acceptance remains `PENDING` and the activation parent gate `INELIGIBLE`.
No SQL generation/comparison, exact-SQL review, PostgreSQL constraint test,
or migration application occurred at that earlier stop; later C2 gates below
supersede that state.
The [bounded read-only diagnosis](evidence/files/authorization-v1/c2-case-file-persistence/unlinked-lab-read-only-diagnosis.md)
found that the unlinked historical Lab owns all three current legacy Case
assets and other meaningful domain records. No authoritative Organization
assignment was established from database evidence alone. At that point C2
remained blocked; the diagnosis made no data change.
The Product Owner subsequently confirmed that Lab was disposable
pre-Organization development/test data and authorized its bounded removal.
The [cleanup and fresh C2 restart](evidence/files/authorization-v1/c2-case-file-persistence/denta-fusion-cleanup-and-c2-resume.md)
passed: zero unlinked Labs, zero remaining legacy Case assets, both unrelated
uploaded grants and all Organization-linked Labs preserved. Prisma generated
Section A SQL, but independent pre-application review returned
`CORRECTION_REQUIRED` for a Section B audit-outcome check and the conflict
between committed immutable test fixtures and exact cleanup. No C2 migration
was applied; development migration acceptance remains `PENDING` and the
activation parent gate `INELIGIBLE`.
The [narrow C2 audit SQL correction and disposable PostgreSQL route](evidence/files/authorization-v1/c2-case-file-persistence/audit-sql-correction-and-verification-route.md)
subsequently passed independent V3 `CODE`/SQL rereview. The corrected
candidate requires `ALLOWED` authorization for `ISSUED` audit events.
Committed immutable-row verification is proposed for a separately authorized
run-owned PostgreSQL 17.6 environment, not the normal development database.
The separately authorized [disposable verification attempt](evidence/files/authorization-v1/c2-case-file-persistence/disposable-runtime-attempt-20260926.md)
first stopped when the Docker engine was unreachable. After it became
available, one exact run-owned PostgreSQL container/volume was created, but
loopback port publication could not be attested. That container/volume and
temporary artifacts were destroyed. The duplicate audit conjunct was
removed with an independently confirmed single-line delta and newly pinned
candidate hash. No SQL, fixture, or migration ran. Disposable runtime is
`BLOCKED` before SQL; C2 development migration remains `NOT_RUN`,
unauthorized, and acceptance `PENDING`.
A separately authorized [fresh disposable retry](evidence/files/authorization-v1/c2-case-file-persistence/disposable-runtime-retry-20260926.md)
then attested isolated PostgreSQL 17.6 and applied all 47 pre-C2 migrations
plus the pinned C2 candidate as temporary migration 48. The synthetic seed,
sampled installed-schema checks, and initial committed and negative scenarios
passed. A later foreign-file negative scenario was blocked by a run-owned
fixture collision (`23505` before the intended FK test), leaving the rest
`NOT_RUN`. Exact container, volume, port mapping, and temporary-artifact
cleanup passed after a run-owned Jiti cache correction. Independent V3
`RUNTIME_EVIDENCE` review passed the partial stop record, not full runtime
acceptance. Disposable runtime acceptance remains `PENDING`/`BLOCKED`;
the normal development database was not contacted or migrated.
The separately authorized [fresh completion run](evidence/files/authorization-v1/c2-case-file-persistence/disposable-runtime-complete-20260926.md)
passed isolated PostgreSQL 17.6 target attestation, 47 + 1 migrations,
synthetic legacy preservation, committed managed versions, and all scenarios
implemented in its matrix, including the corrected foreign-file composite
FK test. Exact run-resource destruction passed. Independent V3
`RUNTIME_EVIDENCE` review found one mandatory audit scenario omitted from the
harness: zero/negative issued-URL lifetime rejection. It remains `NOT_RUN`;
the review verdict is `CORRECTION_REQUIRED` and full disposable acceptance
remains `PENDING`/`BLOCKED`. The run authorization is exhausted; a separate
Product Owner decision is needed before another disposable run. The normal
development database was not contacted or migrated.
The separately authorized [audit-boundary supplement](evidence/files/authorization-v1/c2-case-file-persistence/supplemental-audit-boundary-20260926.md)
then passed distinct zero- and negative-lifetime CHECK rejections in a new
isolated PostgreSQL 17.6 database. Its exact cleanup passed. The earlier
completion run's complete 59-event record was recovered, and the
[combined 46-scenario matrix](evidence/files/authorization-v1/c2-case-file-persistence/combined-disposable-scenario-matrix.md)
passed independent V3 `RUNTIME_EVIDENCE` review. **C2 disposable PostgreSQL
runtime verification is PASS** across the two attributed runs. This makes
C2 eligible only to request the separate normal-development migration-
application gate; at that checkpoint the migration was `NOT_RUN`, with
development acceptance `PENDING` and the activation parent gate `INELIGIBLE`.
The subsequently authorized [normal-development application attempt](evidence/files/authorization-v1/c2-case-file-persistence/normal-development-application-stop-20260927.md)
re-attested the approved development target but stopped at fresh read-only
migration-history preflight: four applied August Organization/Staff migration
checksums differ from their current repository SQL. No C2 migration artifact
was materialized, no database mutation occurred, and the remaining data
preflight/application checks were `NOT_RUN`. Development migration acceptance
was `PENDING`/`BLOCKED` at that stop; disposable verification remained `PASS`.
The subsequent [checksum provenance diagnosis](evidence/files/authorization-v1/c2-case-file-persistence/historical-checksum-provenance-20260927.md)
proved the four differences were CRLF-only checkout bytes. The Product Owner
authorized an isolated canonical-LF execution checkout. Its 47 historical
migrations matched development checksums, fresh data preflight passed, the
exact candidate `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`
was applied once as migration 48, and post-application schema, preservation,
and regressions passed. The exact migration artifact is retained in the
primary repository without staging or commit; the temporary checkout was
removed. Independent V3 `CODE`/SQL and `RUNTIME_EVIDENCE` reviews both passed.
The [development migration packet](evidence/files/authorization-v1/c2-case-file-persistence/normal-development-migration-application-20260927.md)
records **C2 normal development migration: PASS**. Migration
`20260927120000_c2_case_file_persistence` is installed in development with
SHA-256 `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
Together with disposable PostgreSQL verification `PASS`, C2 is `CLOSED` at
the development persistence level. The scoped repository LF checkout policy
is retained in `.gitattributes` without historical SQL rewrite. Managed
Case-file writes, N-FILE-110/111, provider-private ACL, and signed reads
remain inactive/unaccepted; C3 code is accepted without provider delivery or
runtime acceptance. No production or staging migration is claimed.
Real private
storage, unsigned-access denial, signed delivery, and expiry are `NOT_RUN`;
N-FILE-110/111 remain unavailable for implementation and activation.
No FILE-06 or additional
file boundary is created by this acceptance.
