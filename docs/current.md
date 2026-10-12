# Current LabOS work

Status: Windows x64 R001 CODE accepted; S001 V1 Vercel profile and Julusian backend PO-approved; corrected S001 evidence migration installed in normal development with independent PASS; corrected S001 byte core Preview runtime PASS_WITH_LIMITATIONS; checked-suffix migration installed in normal development with independent PASS; S001 finalization and first attachment CODE/disposable PostgreSQL checkpoints independently PASS; Case upload runtime inactive
Authority: Canonical
Owner: LabOS maintainers
Last reviewed: 2026-10-11

- **Active branch:** `feat/authorization-financial-reads` (stale context; the name does not set priority).
- **Last committed checkpoint:** `2b96327` — `feat(auth): protect unpaid invoice cancellation`.
- **Working tree:** implementation, generated-output, migration, and test changes are in progress and remain outside this documentation migration.
- **Program milestone:** M4 — Authorization V1.
- **Current workstream:** UploadThing/file authorization.

**Current Files direction (2026-10-07):** The Product Owner approved the
[UploadThing → R2 migration roadmap](plans/authorization-v1/uploadthing-r2-migration-repository-review.md),
accepted R2-00 through R2-06, with R2-05 activation disposition **NOT_ELIGIBLE** at its historical checkpoint and R2-06 **ELIGIBLE_FOR_ACTIVATION** for the reviewed technical scope. R2-00 is
now [closed with independent `PASS | CHECKPOINT`](evidence/files/authorization-v1/r2-00-authority-contract/packet.md).
New N-FILE-110 Case clinical objects target private object storage through a
provider-independent Files semantic boundary, with Cloudflare R2 as the V1
adapter. Historical UploadThing public-read decisions and installed
compatibility remain truthful for their earlier scope; non-Case UploadThing
paths continue during phased migration. R2-01 is
[closed with independent `PASS | CODE` and `PASS | RUNTIME_EVIDENCE`](evidence/files/authorization-v1/r2-01-capability-adapter/packet.md)
on the attested disposable private R2 target. Actual browser conditional PUT,
private exact-object operations, expiry-fenced deletion and independent
zero-object prefix inventory passed; the packet records bounded runtime
limitations. The [R2-02 checkpoint](evidence/files/authorization-v1/r2-02-durable-identity/packet.md)
has independent V3 `PASS | CODE/SQL` and `PASS | DISPOSABLE RUNTIME_EVIDENCE`:
stable `OBJECT_STORAGE`, permanent opaque key allocation and a durable
write-capability expiry fence passed a fresh 53-migration isolated apply,
23/23 SQL scenarios, full forced-failure rollback and exact fixture cleanup.
The Product Owner accepted the candidate; its [exact normal-development
installation](evidence/files/authorization-v1/r2-02-durable-identity/normal-development-install.md)
has independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`, with 53 completed
migrations, matching checksum, no schema drift and preserved historical rows.
R2-02 is **CLOSED | PASS CHECKPOINT**. [R2-03](evidence/files/authorization-v1/r2-03-case-upload/packet.md)
is **CLOSED | PASS CHECKPOINT** after Product Owner acceptance of the bounded
non-UTC correction and independent V3 code/runtime rereview. [R2-04](evidence/files/authorization-v1/r2-04-first-attachment-private-open/packet.md)
is **CLOSED | PASS CHECKPOINT** after Product Owner acceptance and independent
V3 code/runtime reviews. R2-05 is [CLOSED | PASS CHECKPOINT with independent V3 runtime/checkpoint review and a NOT_ELIGIBLE activation disposition](evidence/files/authorization-v1/r2-05-case-provider-runtime/packet.md) after Product Owner acceptance. A synthetic isolated database + real R2 + actual Edge browser Case composition passed, including create-only PUT, completion, attachment and private open, with exact run-owned cleanup. At R2-05, the full Case composition under production Linux S001 identity was NOT_RUN; R2-06 now supplies that isolated proof. Normal-development Case mutation remains NOT_RUN under the accepted authority boundary. The [R2-06 production S001 successor](plans/authorization-v1/r2-06-production-s001-case-runtime.md) completed its synthetic isolated Linux x64/Node 24/N-API 10 real-R2 Case composition with unmocked production S001 identity. The [runtime packet](evidence/files/authorization-v1/r2-06-production-s001-case-runtime/packet.md) records 1/1 final PASS, exact absence of three run-owned objects, full disposable Docker cleanup, and a consolidated independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT` after current-state documentation reconciliation. The Product Owner accepted R2-06 as **CLOSED | PASS CHECKPOINT** and approved **ELIGIBLE_FOR_ACTIVATION** for the reviewed technical scope. Browser signed-GET consumption, normal-development Case mutation and activated HTTP/UI remain `NOT_RUN`; the optional whole-snapshot TypeScript check is `INCONCLUSIVE` due to Node heap exhaustion. Actual browser PUT/CORS evidence is inherited from R2-05, not rerun in R2-06. The [N-FILE-110 activation-readiness plan](plans/authorization-v1/n-file-110-activation-readiness.md) is Product Owner-approved after independent V3 `PASS | CHECKPOINT`. A1 [OBJECT_STORAGE cleanup architecture and SQL design](plans/authorization-v1/n-file-110-object-storage-cleanup-design.md) is Product Owner-accepted as CLOSED | PASS after independent V3 PASS | ARCHITECTURE/DECISION + SQL DESIGN. Separately authorized A1-I1 stopped at its mandatory [read-only deployment-role preflight](evidence/files/authorization-v1/n-file-110-a1-i1/role-feasibility-stop-20261008.md): the configured application database identity owns FileUploadGrant and is also the migration identity, so a restricted cleanup ACK role cannot yet be attested. A1-I1 is BLOCKED_DECISION before schema/code work. The separately authorized [A1-R0 read-only role-feasibility packet](evidence/files/authorization-v1/n-file-110-a1-r0/packet.md) has independent V3 PASS | ARCHITECTURE/DECISION and concludes INSUFFICIENT_EVIDENCE — TARGET ATTESTATION REQUIRED: Supabase documents the required primitives, but the intended production database, Vercel role/secret mapping and migration runner are not attested. The [D1 deployment architecture decision](plans/deployment-d1.md) is Product Owner **ACCEPTED | ARCHITECTURE/DECISION** after independent V3 PASS. Dedicated isolated Supabase/Vercel targets, restricted runtime and migration identities, and a conditional GitHub Actions migration runner are the planning baseline; none is provisioned or target-attested. Restricted-role Prisma/Better Auth behavior, ACK ownership/privileges, runner controls/connections/history, backup/recovery and the in-flight R2 PUT deletion fence remain separate gates. [D2-R1](plans/deployment-d2-r1-hobby-free-feasibility-20261008.md) is Product Owner **ACCEPTED | FEASIBLE_WITH_GATES | ARCHITECTURE/DECISION** with independent V3 PASS; it does not attest a target, guarantee $0 cost or authorize deployment. [D2-T0](evidence/deployment/d2-t0-existing-target-inventory-20261009.md) is Product Owner **ACCEPTED | PASS | ARCHITECTURE/DECISION** after independent V3 PASS; its local/public and historical evidence limits remain. The separately authorized [D2-A1 account attestation](evidence/deployment/d2-a1-authenticated-account-attestation-20261009.md), with independent V3 PASS | ARCHITECTURE/DECISION, found an authenticated Vercel personal and team Hobby plan, OWNER membership, 13 listed projects and a connected but access-restricted GitHub namespace whose repository search does not return LabOS; current GitHub repository metadata is public/personal. Vercel and GitHub are PARTIAL at D2-A1. The subsequent [D2-S0 Supabase preparation](evidence/deployment/d2-s0-supabase-preparation-20261009.md), independently V3 PASS | ARCHITECTURE/DECISION, attests one accessible Free organization and one active LabOS development project through the connected account; published Free allowance suggests a conditional second slot, but member/quota eligibility and cost remain unverified. The subsequent [D2-C0 Cloudflare R2 inventory](evidence/deployment/d2-c0-cloudflare-r2-inventory-20261009.md), independently V3 PASS | ARCHITECTURE/DECISION, attests one development bucket in EEUR/Standard storage, disabled r2.dev, zero custom domains and localhost-only PUT CORS through read-only account APIs. At the D2-C0 inventory checkpoint, no verification bucket had been selected or provisioned and both provider ledgers recorded zero applied changes. The Product Owner selected the Free Supabase organization and accepted `eu-central-1` as the candidate region. [D2-S1](evidence/deployment/d2-s1-supabase-free-preflight-20261009.md), independently V3 PASS | ARCHITECTURE/DECISION, is a read-only PARTIAL preflight: one active project and the documented two-active-Free-project rule support a candidate second slot, and the Product Owner attests they are the sole Owner/Admin. A later user-supplied creation-form screenshot shows the selected Free organization and Central EU (Frankfurt) region, with Data API and automatic new-table exposure still enabled by draft defaults. A later user-supplied Free-usage screenshot shows one visible LabOS Nano project in eu-central-1, 48/500 MB database use and the current organization usage meters. Published Free pricing is $0/month with two active projects; the sole-Owner/Admin attestation and earlier one-active-project read support an apparently available second Free slot. Neither screenshot shows project-specific pricing or confirms creation eligibility. Browser automation and the connector cost tool were unavailable, and no project was submitted during D2-S1. The Product Owner clarified that 200 projects is the published Vercel Hobby limit, not Supabase; with 13 listed Vercel projects, Git access to LabOS remains the actual immediate integration gate. [D2-R2](evidence/deployment/d2-r2-verification-bucket-isolation-20261009.md) is Product Owner `CLOSED | PASS CHECKPOINT | VERIFIED_PRIVATE` after independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`. Its ledger preserves the initial connector write denial, subsequent observed creation of one private Standard `labos-r2-verification` bucket with EEUR hint/default jurisdiction, disabled `r2.dev`, zero custom domains and no CORS policy. The $0.00 billing screenshot is point-in-time evidence, not a future cost guarantee. Separately authorized [D2-R3](evidence/deployment/d2-r3-verification-credential-20261010.md) has one verification-only, bucket-scoped R2 S3 credential issued according to Product Owner attestation; both keys were retained directly in a password manager. A pre-submit screenshot and Product Owner-reported post-create dashboard summary identify Object Read & Write for `labos-r2-verification` only. The reattached Cloudflare connection confirms the exact bucket but returns `9109` for account-token metadata, so independent API policy attestation remains unavailable. D2-R3 is Product Owner-accepted `CLOSED | PASS_WITH_LIMITATIONS` after independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT` for the bounded issuance evidence; no key values entered repository evidence. Effective token policy metadata remains independently `NOT_ATTESTED` after connector `9109`, and object-operation and cross-bucket checks remain `NOT_RUN`. CORS, object, application configuration and deployment gates remain separate. The separately authorized [D2-V1 exact Vercel repository grant](evidence/deployment/d2-v1-vercel-repo-grant-20261010.md) is open: authenticated Vercel GitHub import search now returns `alilefta/LabOS` under a still access-restricted namespace, while the complete GitHub installation selection remains independently uninspected. The Product Owner subsequently created `lab-os-verification-deployment`. Its [initial Production build diagnosis](evidence/deployment/d2-v2-vercel-initial-build-20261010.md) is `OPEN | DIRECT_URL_REMOVED | CREDENTIALS_NOT_ATTESTED | BUILD_BLOCKED`: a clean Git build failed before generating the ignored Prisma client. The Product Owner removed `DIRECT_URL` after its prohibited Production/Preview placement was discovered; authenticated reinspection now shows zero entries. Local Prisma generation of the failed commit schema passed in a disposable scratch directory, and a second Product Owner-triggered Vercel Production build generated the Prisma client and compiled. That build failed TypeScript at the main-branch Case mapper's unconverted manualDiscountAmount Decimal; the project remains live: false. On 2026-10-11 the Product Owner reported migrating the isolated verification database; read-only follow-up found 53/53 finished Prisma migration records and LabOS tables, with checksum/DDL-identity parity not yet attested. The Product Owner subsequently created, dropped and recreated a labos_verification_app LOGIN with a reported password in the isolated verification project; read-only catalog inspection confirms the current role has no elevated attributes, no parent membership and zero public-table DML privileges. The password value was not accessed; pooled login, exact grants and Prisma/Better Auth compatibility remain unverified. The Product Owner confirms Vercel DATABASE_URL still uses the privileged postgres username; its hidden target and R2 binding remain unverified. Replace this application credential with the verified restricted one before any successful deployment. No agent Vercel setting or deployment mutation occurred in this diagnosis. The Product Owner separately authorized one exact [D2-S2 Supabase verification project](evidence/deployment/d2-s2-supabase-verification-project-20261009.md), conditional on a final Free/Nano no-charge/no-add-on interface. D2-S2 stopped before agent submission because the cost connector and both browser-control paths were unavailable. The Product Owner then submitted the form despite no final cost/paid label: authenticated reads now show `labos-verification` (`rvtubjrczuxdxfuazjmr`) in `eu-central-1` and `ACTIVE_HEALTHY`, while the existing LabOS project remains healthy. Post-create dashboard screenshots verify Nano at $0/hour and Data API OFF; the organization billing view shows Free Plan, spend cap and no payment method. The new project Policies page offers setup for the automatic-RLS trigger, supporting RLS OFF; a later Add-ons screenshot shows Dedicated IPv4, point-in-time recovery and custom domain all disabled; an initial read-only catalog query found `public` default grants to `anon`, `authenticated` and `service_role` for objects created by `postgres` or `supabase_admin`, exposing the correction need; Data API remains disabled and its Settings control hidden; the earlier pre-submission no-charge condition is not retrospectively passed. No agent project-creation call occurred; the later bounded default-privilege change is recorded below. R2 isolation is now represented by the separately verified private bucket; its credential, CORS and deployment gates remain open. An earlier V3 screenshot-reconciliation retry passed; a later V3 CHECKPOINT review required correction after the catalog finding, and the corrected record passed independent rereview. Under later Product Owner resumption, an independently pre-reviewed `postgres`/`public` default-table-DML revoke was applied only in the verification project. Catalog evidence shows zero future-table DML grants to Data API roles; a synthetic newly created table showed 12/12 denials. The Product Owner removed the exact empty run-owned probe after the connector DROP failed; direct SQL confirms both probe names absent and zero `public` classes/functions. Provider-owned `supabase_admin` defaults remain unchanged. The Product Owner accepted D2-S2 as CLOSED | PASS CHECKPOINT | ACCEPTED_WITH_LIMITATIONS after independent V3 PASS | RUNTIME_EVIDENCE + CHECKPOINT: the pre-submission no-charge/no-add-on confirmation remains historically unproven, while current Free/Nano and disabled-add-on evidence is post-creation; future migration-owner privileges remain a separate target-specific gate. A1-I1 remains blocked; A1-I2 and A2–A5 are pending. Case HTTP upload routes remain closed;
N-FILE-110 activation and rejected/orphan cleanup execution remain unauthorized. The prior UploadThing
provider-attestation request below is a historical next action at its
2026-10-05 checkpoint, not the current workstream instruction.

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

## Current Files checkpoint

The Product Owner approved the V1 public-backed Case compatibility model.
`MANAGED_PUBLIC` describes a validated managed Case asset with a current
public-read object; nullable immutable `StoredFile.providerAccess` records
`PUBLIC_READ`, `PRIVATE`, or historical/unclassified null per physical file.
Null never implies private, and installed `MANAGED_PRIVATE` retains its C2
meaning. Ordinary managed Case DTOs contain no provider URL/key; a separate
freshly `case.read`-authorized public-open operation is the approved narrow
URL exposure boundary. Public opening cannot use C3 `ISSUED`. The
[accepted contract](plans/authorization-v1/case-file-public-access-contract.md)
has independent `PASS | CODE/SQL`, [disposable PostgreSQL verification](evidence/files/authorization-v1/case-public-provider-access/disposable-runtime-20260930.md)
has independent `PASS | RUNTIME_EVIDENCE`, and the exact migration 50 is
[installed in normal development](evidence/files/authorization-v1/case-public-provider-access/normal-development-migration-20260930.md)
at SHA-256 `a4d3cf3aa49a8ac910cb173d3c6a1050b128a2cd5aad3c51718fa04fed81b668`
with independent `PASS | RUNTIME_EVIDENCE`. This installs persistence only;
the separately authorized [DTO/public-open implementation](evidence/files/authorization-v1/case-public-provider-access/application-code-20260930.md)
has now passed independent V3 `PASS | CODE`. The normal Case DTO exposes a
safe `MANAGED_PUBLIC` discriminant; a separate GET operation freshly enforces
`case.read`, verifies the current version, public provider access, grant and
clinical evidence, then redirects through a server-only UploadThing URL lookup.
The direct public URL remains a bearer access path after redirect; LabOS
authorization controls application discovery and opening, not provider byte
retrieval. No real provider or browser runtime opening was performed in this
code gate.
The separately authorized [N-FILE-110 Case provider handoff](evidence/files/authorization-v1/n-file-110-case-asset-create/case-provider-handoff-code-20260930.md)
has independent V3 `PASS | CODE`. It defines an unregistered UploadThing JPEG
route using the accepted saved-DRAFT staging writer and a verified-callback
reservation of the exact provider key on a still-`PENDING` grant. The callback
rechecks current Case/tenant/Member/assignment facts and leaves successful
clinical evidence, StoredFile, version, and Case asset absent. Neither a
provider object nor a live callback was exercised. The earlier exact-key R001
[decision stop](evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-production-boundary-decision-20260930.md)
was followed by Product Owner approval of an isolated native-helper direction,
candidate server-side UploadThing key lookup, exact-byte/SHA binding and bounded
process mechanisms. The bounded [Windows x64 architecture and synthetic
benchmark packet](evidence/files/authorization-v1/n-file-110-case-asset-create/r001-production-integration-benchmark-20261001/decision-packet.md)
has independent V3 `PASS | CODE/ARCHITECTURE + BENCHMARK_EVIDENCE` and exact
run-owned cleanup. The Product Owner subsequently approved its Windows x64
isolated-helper architecture and local containment policy: 10-second hard
process wall, 384 MiB private-memory cap, two active helpers, and two waiting
identifiers with a five-second maximum wait. These are operational limits for
the evidenced local target, not JPEG acceptance semantics or portable
deployment constants. The separately authorized [one-object development
UploadThing probe](evidence/files/authorization-v1/n-file-110-case-asset-create/r001-uploadthing-exact-object-probe-20261001/packet.md)
has independent V3 `PASS | RUNTIME_EVIDENCE + ARCHITECTURE`: three exact-key
lookups and complete downloads observed HTTPS at the exact development app
origin with `/f/{key}`, no query or redirect, and byte/SHA equality; exact
run-owned cleanup was verified by before/after provider listing and zero-row
post-delete lookup. The packet proposes a narrow exact-origin/path, pinned-DNS,
TLS-verified, no-redirect, stream-counted retrieval policy. These observations
cover one synthetic object and do not prove permanent object immutability.
The separately authorized [production exact-key retrieval and R001 validation
CODE boundary](evidence/files/authorization-v1/n-file-110-case-asset-create/r001-production-code-20261001/packet.md)
now has independent V3 `PASS | CODE` for the evidenced Windows x64 target.
It rechecks the reserved Case grant and authorization before provider access,
retrieves a byte-bounded exact-key object over pinned-DNS/TLS HTTPS, and runs
R001 marker inspection and direct libjpeg-turbo full decode on the same
original bytes used for SHA-256. The production helper has pinned source,
library, executable and protocol identity, bounded IPC, and Windows Job Object
containment; focused/static and isolated containment tests passed. Live Case
retrieval through this implementation, successful clinical evidence/finalization,
rejected-object cleanup, first attachment, deployed-host behavior, and
N-FILE-110 runtime activation remain `NOT_RUN` and separate. After that CODE
acceptance, the Product Owner identified Vercel as the intended production
host. The accepted Windows x64 implementation remains a valid local/reference
and potential Windows/self-hosted R001 backend; its acceptance is unchanged
and Vercel execution is unproven. Successful clinical-evidence finalization
and atomic `PENDING → UPLOADED` using the retained validated result is on
**PO HOLD / DEFERRED** pending a deployable validation guarantee. The
[Vercel JPEG validation profiles architecture investigation](evidence/files/authorization-v1/n-file-110-case-asset-create/vercel-jpeg-validation-profiles-architecture-20261001.md)
is a completed prerequisite.
It proposes a separate, weaker S001 Standard profile for evaluation while
preserving R001 Strict exactly. Neither S001 nor a Vercel backend is approved.
The separately authorized [synthetic Vercel S001 backend feasibility probe](evidence/files/authorization-v1/n-file-110-case-asset-create/vercel-s001-preview-20261001/packet.md)
completed local package preflight, a two-backend synthetic matrix, the accepted
Windows R001 differential oracle, and an isolated Next trace. Its attempted
Vercel deployment was **stopped**: despite explicit `--target=preview`, Vercel
recorded the failed build as `production`. No function ran. The exact run-owned
project was removed and its absence verified. Julusian and Sharp Preview
feasibility are each **BLOCKED**; neither is S001-approved. A bounded
[read-only target-routing resolution](evidence/files/authorization-v1/n-file-110-case-asset-create/vercel-preview-target-routing-20261002.md)
verified Vercel's documented rule that a fresh project's first deployment is
Production, even when Preview was requested. This explains the stopped probe's
target result without changing its `VERIFICATION_ENVIRONMENT_BLOCKER` status.
The Product Owner authorized that retry. In a fresh isolated project, the
inert first deployment reached `production`/READY under `All Deployments`
authentication, but Vercel assigned a generated project Production alias
despite `--prod --skip-domain`. The required stop condition fired before the
second deployment or probe endpoint; the exact project/deployment and local
run root were removed. The [retry evidence](evidence/files/authorization-v1/n-file-110-case-asset-create/vercel-s001-preview-retry-20261002/packet.md)
has independent V3 `PASS | RUNTIME_EVIDENCE` for the truthfully stopped run.
Julusian and Sharp Preview feasibility were **BLOCKED** at that stopped checkpoint, with runtime
decode/loading `NOT_RUN` at that checkpoint. Its next gate was Product Owner disposition
of whether this authenticated generated placeholder alias is acceptable or
another isolated initialization route is required. Case route activation,
real provider/Case validation, evidence finalization, cleanup, and attachment
remain inactive.

The Product Owner subsequently accepted that generated run-owned alias for an
authenticated inert placeholder and authorized a fresh isolated retry. The
[completed Preview feasibility packet](evidence/files/authorization-v1/n-file-110-case-asset-create/vercel-s001-preview-retry-accepted-alias-20261002/packet.md)
records the new project's protected first Production-classified placeholder,
then an independently attested **Preview / READY** second deployment of the
synthetic harness. One bounded repair supplied missing build-only TypeScript
dependencies in the isolated experiment. The deployed Linux x64 Node 24
function included and loaded Julusian's addon and adjacent TurboJPEG library
and Sharp's addon and libvips; both completed baseline, progressive, and
grayscale synthetic full decodes. The 28-response matrix also records their
different handling of selected malformed inputs. Independent V3
`PASS | RUNTIME_EVIDENCE` accepted **Julusian Preview feasibility: PASS** and
**Sharp Preview feasibility: PASS**, limited to this synthetic corpus and
observed Preview instance. The exact run-owned project, its three deployments,
and local temporary root were removed and absence verified. Earlier stopped
packets retain their original `BLOCKED` findings as historical checkpoints.
S001 semantics/backend/containment/evidence identity were still unapproved
at that checkpoint; R001 equivalence was not established. Its next gate was a
Product Owner decision on the exact S001 profile, Vercel backend, resource
containment, and truthful evidence identity. Case route activation, provider/Case runtime,
evidence finalization, cleanup implementation, and attachment remain inactive.

The Product Owner subsequently selected `@julusian/jpeg-turbo` as the preferred
Vercel S001 candidate and authorized a bounded contract/conformance experiment.
The [proposed S001 contract and protected Preview packet](evidence/files/authorization-v1/n-file-110-case-asset-create/vercel-s001-julusian-conformance-20261002/packet.md)
has independent V3 `PASS | CODE/ARCHITECTURE + RUNTIME_EVIDENCE`:
**S001 CONTRACT: ACCEPTABLE** as a proposal, **JULUSIAN S001 CONFORMANCE:
PASS** for the bounded synthetic corpus, and **VERCEL S001 CONTAINMENT
EVIDENCE: PASS_WITH_LIMITATIONS**. The corrected isolated composition reuses
the accepted R001 structural inspector unchanged, hashes and fully decodes the
same original bytes with Julusian, and rejects structural/codec failures. In
the protected Linux x64 Node 24 Preview, 31 corrected matrix requests and six
repeated large-input requests had no transport failure; observed peak RSS was
379.14 MiB and maximum measured decode 687.47 ms. These observations do not
prove a hard native memory/time bound, valid full decode at exact 128 scans or
exact 33,554,432 bytes, or R001 equivalence. The installed immutable clinical
evidence schema cannot explicitly record the required backend/version/source
identity; an additive schema decision is needed before truthful S001 success
evidence. Exact run-owned project, three deployments and local resources were
removed with verified absence and independent cleanup addendum `PASS`.
At that experimental checkpoint S001 was still production-unapproved. The
Product Owner has since approved `JPEG_CLINICAL_V1_S001` for the V1 Vercel
path, pinned Julusian 3.0.1 as its sole backend, and approved one active
decode/zero waiters per function instance with a candidate 30-second function
duration and the selected 2-GB Hobby envelope. This approval preserves the
recorded resource and corpus limitations; it does not claim R001 equivalence,
a hard native memory wall, or interruptible synchronous decode. The
[review-only additive evidence identity and integration design](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-evidence-schema-integration-design-20261002.md)
had independent V3 `PASS | CODE/SQL`, but its subsequent
[disposable PostgreSQL 18.4 verification](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-disposable-postgres-20261002/packet.md)
found a blocking failed-install rollback defect: Prisma reported the injected
failure without marking migration success, yet the enum, seven columns and
CHECK remained installed. The runtime result is **FAIL** and independent V3
review is **CORRECTION_REQUIRED | RUNTIME_EVIDENCE + SQL/CHECKPOINT**. The
failed candidate remained unchanged during that runtime gate; the isolated
cluster was removed and cleanup verified. The Product Owner subsequently
authorized the [transactional-install correction](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-transactional-install-correction-20261003.md).
At that correction checkpoint, the in-place candidate was unapplied, added only `BEGIN`/`COMMIT`, and had SHA-256
`c322412de3c40f697407ce74a062afb797b2554a98fa5e8393e1c4bfe8c8bb88`;
independent V3 review is **PASS | CODE/SQL**. The old runtime FAIL remains
historical truth. Fresh [disposable PostgreSQL verification of the corrected candidate](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-corrected-disposable-postgres-20261003/packet.md)
passed the full corrected-candidate scenario matrix, including complete DDL
rollback on an injected pre-`COMMIT` failure and Prisma/schema reconciliation;
independent V3 review is **PASS | RUNTIME_EVIDENCE + SQL/CHECKPOINT**.
The exact corrected S001 evidence migration was subsequently
[installed in normal development](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-normal-development-20261003/packet.md)
through Prisma's canonical-LF execution path. Preflight, installation,
preservation, Prisma/schema reconciliation and independent V3
`PASS | RUNTIME_EVIDENCE + CHECKPOINT` review passed. The installed migration
checksum is `c322412de3c40f697407ce74a062afb797b2554a98fa5e8393e1c4bfe8c8bb88`.
The [production-facing S001 validator/containment CODE boundary](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-validator-code-20261003/packet.md)
now has independent V3 `PASS | CODE/ARCHITECTURE`. It transaction-freshly
resolves the saved Case grant, admits at most one process-local validation with
zero waiters before provider retrieval, reuses exact-key bounded retrieval and
the accepted structural inspector, hashes the same original bytes before and
after pinned Julusian full decode, and returns only a narrow internal validated
result. Local build tracing includes the pinned Linux native addon and adjacent
library; the actual Vercel runtime identity/load, live provider retrieval and
Case flow remain `NOT_RUN`. The full application build remains limited by four
missing imports in retained Vercel experiment sources; focused tests and the
affected application TypeScript check passed. The exact run-owned local
artifacts were removed. Windows x64 R001 stays `PASS | CODE`;
finalization/PENDING→UPLOADED was `PO HOLD / DEFERRED` at that checkpoint, and
N-FILE-110 runtime stays inactive. The subsequently authorized [isolated Vercel Preview runtime
attestation](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-preview-runtime-attestation-20261003/packet.md)
stopped at preflight with independent V3 `BLOCKED_DECISION`: the accepted
complete S001 byte-validation composition is inline behind grant resolution
and provider retrieval, with no safe lower production-core seam for synthetic
Preview invocation. No project or deployment was created; every runtime
scenario remains `NOT_RUN`. The subsequently authorized [server-only S001
byte-core extraction](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-byte-core-extraction-20261003/packet.md)
has independent V3 `PASS | CODE/ARCHITECTURE`. The outer validator now accepts
only the grant identifier and optional cancellation signal; it preserves
grant/admission/identity-before-provider authority, then calls the extracted
core on the exact retrieved Buffer. The core itself executes the real runtime
identity, unchanged structural inspection, same-buffer SHA/Julusian decode/
consistency/postdecode SHA and returns only the narrow frozen result. Direct
core calls create no retained grant context. Focused tests passed 51/51 and
local compile tracing retained the pinned native artifacts. The previous
Preview stop is still historical truth, with every scenario in that stopped run
`NOT_RUN`. A separate [protected Preview retry](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-core-preview-retry-20261003/packet.md)
executed the production byte core on synthetic bytes. Preview routing, Node
Linux x64 and the 30-second function configuration were attested, but the core
rejected the baseline JPEG before establishing loaded codec identity. The exact
local Next 16.3.3 server bundle transformed Julusian package path resolution
into a numeric module ID; independent V3 review returned `CORRECTION_REQUIRED |
RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT`. The isolated project and deployments
were removed. Native mapping, successful S001 execution, provider/Case flow and
finalization remain `NOT_RUN`. A separately authorized [codec-identity/Turbopack
correction](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-codec-identity-correction-20261003/packet.md)
now has independent V3 `PASS | CODE/ARCHITECTURE`. It loads Julusian before
trusting the native artifacts and derives exact addon/library paths from their
actual mapped files, preserving pinned hashes and adjacency. The emitted Next
16.3.3 bundle no longer uses a numeric module ID as a filesystem path; focused
tests passed 69/69 and the local native trace retained the reviewed bytes.
The failed Preview run remains historical runtime evidence; that CODE result
did not itself attest a corrected Vercel runtime. A new [protected, isolated
Preview run](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-core-preview-20261003-157cb99a8d/packet.md)
now has overall runtime `PASS_WITH_LIMITATIONS` and independent V3 `PASS |
RUNTIME_EVIDENCE + ARCHITECTURE/CHECKPOINT`. The corrected production byte core
passed synthetic baseline RGB, progressive RGB and true grayscale on Node
24.21.0/Linux x64/N-API 10 with pinned native identity; structural rejection
and same-instance warm reuse passed. Codec-only rejection was `NOT_RUN`;
outer admission/provider, Case flow and persistence/finalization remain
`NOT_RUN`. Exact run-owned project/deployments and local harness were removed.
The Product Owner then authorized successful S001 evidence finalization and
atomic `PENDING → UPLOADED` CODE plus disposable runtime verification. That
gate stopped at [BLOCKED_DECISION](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-finalization-handoff-blocker-20261003.md)
before implementation: installed immutable evidence requires the checked
`JPG | JPEG` filename suffix, while the accepted Case callback/grant and
retained S001 context discard that fact. The Product Owner prohibited a
fabricated `JPG` default or caller-supplied suffix and confirmed the installed
canonical `providerObjectKey` remains required in evidence. Finalization CODE,
disposable PostgreSQL verification and independent review are `NOT_RUN`;
N-FILE-110 runtime remains inactive. The separately authorized [checked-suffix
handoff architecture decision](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-checked-suffix-handoff-architecture-20261004.md)
has independent V3 `PASS | ARCHITECTURE/DECISION`. It places the normalized
`JPG | JPEG` fact on the target-bound upload grant at creation, keeps it
immutable, and requires exact equality at evidence insertion. The verified
callback continues to carry only grant ID and provider key. Validation
completion time is retained privately when the outer S001 validator succeeds;
pre-change null-suffix grants cannot finalize. Read-only development inventory
found no Case grants or clinical evidence rows on 2026-10-04. No schema, code,
migration or provider state changed in that design gate. The subsequently authorized
[checked-suffix CODE/SQL and disposable PostgreSQL packet](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-checked-suffix-code-20261004/packet.md)
now has independent V3 `PASS | CODE/ARCHITECTURE + SQL/RUNTIME_EVIDENCE`.
The nullable/no-default grant field, immutable SQL guard, evidence suffix equality,
server parser/staging/callback/resolver handoff and private S001 completion time
passed focused checks. The candidate migration `20261004120000_case_checked_suffix_handoff`
has SHA-256 `3e150d41429c58d44a902473ff4b9d4fbc4c0d9afb29955e8d124f899e6bd23d`;
its 19/19 synthetic disposable PostgreSQL scenarios, pre-COMMIT rollback and
Prisma reconciliation passed, with exact run-owned cleanup. The separately
[authorized normal-development installation](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-checked-suffix-normal-development-20261004/packet.md)
now has independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`: 51 matching
predecessors, candidate applied once as migration 52 at the exact SHA-256,
reviewed grant column/guards and evidence trigger installed, preserved data
fingerprints, and no Prisma schema drift. No grant or evidence row was created.
At that checkpoint, finalization remained `BLOCKED_DECISION` and unimplemented; N-FILE-110 runtime remained inactive. The next gate was separately authorized resumption of S001 clinical-evidence atomic finalization CODE plus disposable PostgreSQL verification using the installed checked-suffix provenance contract.

A new, separately authorized [S001 clinical-evidence finalization attempt #2](evidence/files/authorization-v1/n-file-110-case-asset-create/s001-finalization-attempt2-20261004/packet.md) now has independent V3 `PASS | CODE/ARCHITECTURE + RUNTIME_EVIDENCE/CHECKPOINT`. The server-only finalizer requires the outer validator's private retained grant/original/completion-time context, freshly locks and authorizes the exact live PENDING Case grant in a serializable transaction, inserts exact immutable S001 evidence, and conditionally transitions that grant to UPLOADED. Focused regressions passed 163/163; the fresh disposable PostgreSQL matrix passed 8/8, including rollback, deferred constraints and a genuine concurrent same-grant race. Historical null suffix, wrong suffix and wrong provider key were independently rejected by installed SQL. Both run-owned clusters and temporary harness were removed. This does not activate the Case route, exercise live provider/Case validation, create StoredFile/asset/version, or deploy. The historical first finalization attempt remains `BLOCKED_DECISION` with its CODE/runtime/review `NOT_RUN`.

The separately authorized [first-attachment architecture decision](evidence/files/authorization-v1/n-file-110-case-asset-create/first-attachment-architecture-20261004.md) has independent V3 `PASS | ARCHITECTURE/DECISION`. It defines a time-bounded retryable `UPLOADED` grant plus immutable S001 evidence state. Each attempt must freshly retrieve the exact provider key and match encoded length and SHA-256 to evidence before a transaction rechecks authority and Case state, creates `StoredFile`, `CaseAssetFile`, first version and current pointer, and consumes the grant as `CONSUMED` atomically. The existing schema suffices for the sole approved writer; public-open must require `CONSUMED` before activation. This was design only: attachment CODE/runtime, live provider/Case flow and N-FILE-110 activation remain `NOT_RUN`. The single next gate is separately authorized first-attachment CODE plus disposable PostgreSQL verification.

The separately authorized [first-attachment implementation and disposable PostgreSQL checkpoint](evidence/files/authorization-v1/n-file-110-case-asset-create/first-attachment-code-20261004/packet.md) has independent V3 `PASS | CODE/ARCHITECTURE + RUNTIME_EVIDENCE/CHECKPOINT`. The server-only writer rechecks the grant creator's current authority before provider work, reuses exact-key retrieval, matches original byte length/SHA to immutable S001 evidence, then transaction-freshly locks and rechecks the Case/grant before atomically creating `StoredFile`, the first Case asset/version/current pointer, and `UPLOADED → CONSUMED`. Public-open now requires `CONSUMED`. Relevant unit regressions passed 205/205, and the final fresh disposable PostgreSQL run passed 8/8 grouped scenarios including deferred-trigger rollback and a genuine two-waiter race with one commit. Exact container, volume, listener and temporary harness cleanup were independently attested. Live UploadThing retrieval, Case upload, route activation, provider cleanup and deployed behavior remain `NOT_RUN`. The single next gate is a separately authorized rejected/orphan provider-object cleanup architecture decision.

The separately authorized [rejected/orphan cleanup architecture decision](evidence/files/authorization-v1/n-file-110-case-asset-create/rejected-orphan-cleanup-architecture-20261005.md) has independent V3 `PASS | ARCHITECTURE/DECISION` after correction and rereview. Cleanup must terminalize an eligible grant before any exact-key provider deletion, preserve immutable S001 evidence, and never delete a canonical `CONSUMED` StoredFile. A Case-only lifecycle guard and cleanup-confirmation timestamp are required before implementation. Actual deletion remains blocked pending authoritative UploadThing key nonreuse and absence-confirmation semantics; a finite synthetic probe alone cannot prove them. No schema, code, database or provider change occurred. N-FILE-110 remains inactive and cleanup runtime remains `NOT_RUN`. The single next gate is a separately authorized UploadThing exact-key ownership/deletion/absence capability decision.

The separately authorized [UploadThing exact-key capability packet](evidence/files/authorization-v1/n-file-110-case-asset-create/uploadthing-capability-20261005/packet.md) concludes **`CAPABILITY_BLOCKER`**, with independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT` on that classification. Official docs and installed 7.7.4 SDK confirm exact-key delete request mechanics but do not establish permanent key nonreuse or authoritative zero-result absence. A bounded two-object development-app probe observed exact lookups, delete `{success:true,deletedCount:1}`, immediate/repeated empty lookups, and repeated delete `{success:true,deletedCount:0}`; these remain observations only. Both run-owned objects had zero exact-key results and zero final run-name inventory matches; the local run root was removed. No LabOS object, database, schema or application code changed. N-FILE-110 and cleanup remain inactive. At that historical checkpoint, the next action was attributable UploadThing provider/maintainer attestation of those missing guarantees. The approved R2 roadmap supersedes that request as the current workstream direction; after R2-00, R2-01 is the next separately authorized gate.

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
libjpeg-turbo full-scanline decompression with fatal warnings/errors. The
subsequent accepted Windows x64 production CODE boundary is recorded above;
this earlier feasibility checkpoint alone did not accept an executable.
The bounded [offline R001 harness](evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-harness-20260928.md)
has independent V3 `CODE` review `PASS` after one corrected evidence finding.
It measured synthetic JPEG behavior using Sharp/libvips only and does not
satisfy the newly approved normative libjpeg-turbo full-decode mechanism.
The subsequent [direct-libjpeg native-helper feasibility](evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-native-helper-feasibility-20260929.md)
is `CLOSED | FEASIBLE | V3 CODE PASS` after independent rereview: the VS 2022 x64
toolchain gate passed, the pinned official libjpeg-turbo 3.2.0 VC x64 static
library built an isolated offline helper, and native/inspector tests passed
9/9 and 8/8. Exact run-owned binary/acquisition artifacts were removed.
The later Product Owner disposition approved its production package,
containment numbers and retrieval protocol for the evidenced Windows x64
target, followed by the accepted CODE boundary above. No Case route or
provider runtime was activated.
**FILE STORAGE SECURITY — V1 LIMITATION:** The Product Owner confirms
UploadThing Free and accepts `public-read` for current file work. LabOS
application authorization remains required, but possession of a direct
provider URL bypasses it for byte retrieval. Private ACL and signed-only
delivery are deferred until a later storage-security version; no upgrade or
ACL retry is planned. The historical [read-only provider checkpoint](evidence/files/authorization-v1/n-file-110-case-asset-create/private-provider-capability-checkpoint-20260929.md)
is superseded for V1 routing. URL exposure must be minimized without claiming
object privacy. Windows x64 helper packaging, exact-object validation CODE,
and provider callback CODE are accepted as described above; live Case runtime,
successful evidence finalization, and rejected-object cleanup remain inactive.
Most importantly,
the installed `MANAGED_PRIVATE` storage mode and managed-content-unavailable
read contract remain reserved as installed. The approved additive
`MANAGED_PUBLIC`/per-file provider-access migration is now installed in normal
development; V1 Case writes still await their separate application,
validation, callback, cleanup, and runtime gates.
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
is a superseded historical private-provider checkpoint: it found the
development UploadThing project at `public-read` with per-request ACL
overrides disabled. A Case-only private route would have needed an override.
The Product Owner approved that toggle, but the first
[dashboard attempt](evidence/files/authorization-v1/d-file-04-read-access/read-only-attestation.md)
stopped at GitHub sign-in without an authenticated UI session. The later
authenticated [dashboard retry](evidence/files/authorization-v1/d-file-04-read-access/read-only-attestation.md)
reached the matching app but failed to save the override; read-only
re-attestation still reported `public-read`/`false`. At that historical point,
provider/account owner diagnosis was pending, and the Product Owner treated
private capability as an unresolved `CAPABILITY_BLOCKER`, deferred paid
upgrade, and prohibited retry, global ACL change, project switch, or a public
Case workaround. The later approved V1 public-read decision supersedes that
routing: private-provider diagnosis, ACL retry, and paid upgrade are not V1
prerequisites or blockers. The
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
Case-file writes and N-FILE-110/111 remain inactive/unaccepted pending their
separate public-backed application, validation, cleanup, and
runtime gates; C3 code is accepted without provider delivery or runtime
acceptance. No production or staging migration is claimed. Real private
storage, unsigned-access denial, signed delivery, and expiry are `NOT_RUN`
and deferred, not prerequisites for V1 `MANAGED_PUBLIC` Case activation.
No FILE-06 or additional
file boundary is created by this acceptance.
