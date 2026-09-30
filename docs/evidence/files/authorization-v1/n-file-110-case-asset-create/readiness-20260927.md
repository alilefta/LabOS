# N-FILE-110 readiness and provider-gate reconciliation

Status: BLOCKED_DECISION for attachment implementation; read-only checkpoint
Date: 2026-09-27

## Current baseline

C1 Case read policy, N-FILE-110A asset-preservation kernel, C2 development
persistence and mixed read contract, and C3 append-only audit code are closed.
None authorizes managed Case attachment or provider delivery. D-FILE-04 requires
a saved authoritative DRAFT Case before Case-targeted clinical staging. The
current new-Case page already offers explicit Save Draft after patient
selection, retains the returned draft ID, and passes that ID on later submit.
The general create/draft/edit actions reject nonempty asset form arrays and
do not synchronize persisted assets; explicit add/delete actions and the
generic Case UploadThing route fail closed. Existing Case assets remain
read-only in the current form. Thus N-FILE-110A is valid, provider-independent,
and **already implemented/accepted**, not a new authorization candidate.

The target sequence remains: persist and authorize DRAFT under canonical
Organization/Lab, return its authoritative Case ID, then permit staging
against that Case. Neither an unsaved browser Case nor a targetless grant is
authority. The future stage and final attach must re-resolve Case/Lab/tenant,
check the approved asset-add resource policy, and keep grant consumption,
StoredFile, stable CaseAssetFile, and version 1 in one transaction. Ordinary
Case save must continue to have no asset mutation authority. Work-item
`deleteMany` in Case saves is unrelated to CaseAssetFile lifecycle; no current
general Case path retains asset delete/recreate or raw-URL attach authority.

## Slice matrix

| Slice | Purpose | Dependencies | Current readiness | Blocker/decision | Runtime gate |
| --- | --- | --- | --- | --- | --- |
| N-FILE-110A (closed) | Explicit Save Draft; preserve asset IDs; deny raw-URL add/delete | C1, transition decisions | CODE PASS; no implementation remains | None for completed scope | No provider acceptance claimed |
| 110 permission/policy | Register narrow `case.asset.add`, Case resolver/facts, bundle and Staff-assignment policy | D-FILE-02, Authorization V1 | Provider-independent but BLOCKED_DECISION | Product Owner must approve exact fixed bundles, resource policy and DRAFT applicability; `case.update` is not a substitute | Focused CODE tests/review; real denial in later runtime packet |
| 110 staging/domain contract | Closed Case-targeted intent/grant, canonical tenant/Member, expiry, verified callback handoff, transactional first attach | Approved permission/policy, C2, D-FILE-01 | Separately implementable code slice after permission decision, with route inactive | Exact grant purpose/TTL and asset metadata/type validation must be approved in its task; no URL/key authority | Real DB grant/transaction/replay claims need separate authority |
| 110 private provider route | Case-only private ACL, real staging and callback | Supported per-request private ACL on same attested development project | CAPABILITY_BLOCKER | Current `allowACLOverride=false`; no authorized retry/upgrade/project switch/public fallback | Real private object, unsigned denial, verified callback; separate provider/runtime authorization |
| 110 authorized signed read | Fresh C1 Case/assignment authorization, C3 required audit, short-lived signed URL | Private provider capability, managed asset/version | Provider-dependent, inactive | No signed-read endpoint or provider capability established | Real signed delivery, <=300s expiry, denial and sanitized audit; separate authority |
| N-FILE-111 | Stable-ID replacement/version 2 | Separate asset/Case permission, history and provider gates | Outside N-FILE-110 | Replacement policy/bundles unapproved; no inheritance from add or `case.update` | Separate runtime packet |

## Provider evidence and stop gate

The retained read-only attestation identifies the development UploadThing app
by non-secret fingerprint `2e77ac21b101` (token fingerprint
`979e35aca2f2`). Its last verified configuration was
`defaultACL=public-read`, `allowACLOverride=false`. The authorized dashboard
save to enable only the override returned **Failed to update access controls**;
subsequent read-only attestation found settings unchanged. A free-plan link
was visible, but neither the error cause nor private-file entitlement was
established. The Product Owner deferred upgrade and prohibited retry, global
default change, project switch, and public clinical upload workaround.
Existing Catalog/WorkType/Product/Dentist behavior must remain unchanged.
The provider gate becomes unavoidable at the first real Case private upload
route, before any clinical object is staged; it also blocks signed-read
delivery. Mocked provider behavior cannot satisfy runtime acceptance.

## Decision and next authorization

`case.asset.add` is approved conceptually by D-FILE-02 but absent from the
implemented vocabulary, definitions, bundles, resolver/policy registration.
The Files plan proposes owner/admin/manager and assigned Staff, but this is
not an approved grant. The Product Owner must decide the exact fixed-role
bundles and authoritative Case/DRAFT/active same-Case Staff-assignment policy,
including denial for missing facts and cross-tenant targets. No role hierarchy
or `case.update` substitution is permitted. Replacement, metadata edit, and
deletion remain separate future decisions.

Smallest next separately authorizable task: approve that precise
`case.asset.add` mapping and then authorize a provider-independent V3 CODE
slice for its resolver, policy, registration, and focused isolation tests,
without activating upload. Do not rerun N-FILE-110A. Afterward, separately
authorize a closed staging/domain contract; real provider route and activation
wait for confirmed private ACL capability plus a separately approved runtime
packet. The current N-FILE-110 attachment gate remains `INELIGIBLE`.
