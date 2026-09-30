# N-FILE-110A asset-safe Case persistence design

Status: read-only design; implementation NOT_AUTHORIZED
Date: 2026-09-25
Authority: Product Owner mixed-asset target decision and repository inspection.
No application, Prisma, migration, database, provider, or permission change was made.

## Current mutation-flow inventory

| Surface | Current source behavior | Asset risk |
| --- | --- | --- |
| New Case form | `app/(main)/cases/new-case/page.tsx` submits `caseAssetFiles` with a client URL to `createDentalCaseAction`; `actions/cases/create-case.ts` creates new nested asset rows from that array. | Raw URL is attachment input; no saved Case prerequisite for the current generic upload. |
| Submit existing draft | `createDentalCaseAction` resolves `existingDraftId`, deletes all draft `CaseAssetFile` rows, then creates rows from the submitted array while promoting the draft. If a draft is no longer DRAFT or patient differs, it clears the draft ID and creates another Case. | Existing IDs/relationships are lost; omitted or unrepresentable assets disappear. |
| Save new draft | `saveDraftCaseAction` creates an authoritative DRAFT Case and nested URL-backed assets from the array. The explicit Save Draft button follows patient selection. | Saved Case ID exists only after the save; raw URLs still create attachments in the same request. |
| Save existing draft | `saveDraftCaseAction` verifies DRAFT/Lab, deletes all existing asset rows, and recreates them from form URLs. | IDs are unstable; omission deletes. |
| Load/resume draft | `getDraftByPatientAction` selects URL/type/extension/labels without asset ID; `loadDraftByIdAction` returns full asset rows through `optionalSelectiveDraftCaseServerToDTO`. | One resume path cannot preserve persisted identity; both hydrate a URL-bearing form. |
| Edit form | `getDentalCaseById` authorizes `case.read` before DTO loading; `composeCaseDTO` maps every asset to the string-URL legacy DTO; `mapCaseToUpdateFormValues` turns every row into an `isNew:false` keep entry carrying URL/extension. | A managed asset cannot be represented safely by that DTO/form. |
| Edit UI | `ClinicalAssetsPreview` removes a field-array entry; `EditCaseClient` submits the resulting array. `CaseFileUploadZone` uses generic `caseAssetsRoute` and copies `ufsUrl || url` into `isNew:true` entries. | UI removal becomes implicit deletion; UploadThing response URL becomes mutation input. |
| Full edit save | `updateDentalCaseAction` computes `existingFileIds - submittedKeepIds`, calls `caseAssetFile.deleteMany` for omissions, updates kept title/description, and creates `isNew` rows from client URLs. | Omission deletes, including a filtered managed asset; metadata save is also add/update/remove. |
| Explicit add/delete | `addCaseAssetFilesAction` creates rows from client URLs after legacy role/Case checks. `deleteCaseAssetFileAction` hard-deletes by file ID after Case/Lab checks; it does not inspect storage mode. | Neither is a protected managed-file command. Managed deletion/retention is not approved. |

Other quick Case actions in `actions/cases/update-case.ts` update status,
notes, deadline, or Staff assignment without directly writing asset rows.
`createDentalCaseAction` invokes supported `case.create`; Save Draft, full
edit, and explicit asset add/delete still rely on legacy action role gates,
not registered Case-asset V1 policies. Those gates are not future managed-file
authorization.

`actions/cases/create-case.ts` also uses `caseAssetFile.deleteMany` in draft
promotion and existing-draft save. `actions/cases/update-case-form.ts` has the
third `deleteMany` path. Existing new-Case, draft, and edit schemas accept raw
`documentUrl`; `app/api/uploadthing/core.ts` still defines the generic
`caseAssetsRoute` without the future private Case policy. These facts describe
current behavior, not approval to keep it for managed attachment.

## Target command contract

| Operation | Input and authoritative effect | Authorization boundary |
| --- | --- | --- |
| Case create / Save Draft / metadata or work-item update | Case fields only. A submitted asset array, its omission, a cleared preview, or a URL never causes an asset create/update/delete. Transitioning DRAFT to a submitted status preserves every asset ID. Unexpected asset mutation fields are rejected, not silently applied. | Existing Case create/read checks remain; future resource-scoped `case.update` support needs its complete policy before relying on it. Recheck Case/Lab and status transactionally. |
| Asset add | Separate Case-targeted command, only after authoritative saved DRAFT exists for N-FILE-110. Verified callback, opaque one-time grant, and matching final Case/Lab authorization create one stable asset and first version transactionally. | D-FILE-02 `case.asset.add` is approved in principle but absent from catalog/bundles/policy; activate only after separate approval. No raw URL or generic route authority. |
| Asset metadata edit | Separate command targeting the existing Case and asset ID; may change approved clinical labels only, never storage mode, provider identity, current version, or legacy URL. | Exact permission/bundles/resource policy require a Product Owner decision; `case.update` is not presumed sufficient. |
| Asset replace | Separate command targets existing asset ID, retains it, appends immutable version and advances current pointer in one transaction. | Distinct replacement permission and asset/Case policy need approval; no inherited `case.update`/add authority. |
| Asset remove/delete | Separate explicit command only; never inferred from form state. Managed remove and provider deletion remain unavailable. | Distinct deletion/retention decision and permission required. Legacy deletion policy remains an open transition choice. |

On every asset command, derive Organization/Lab/Member and Case/asset ownership
from trusted server relationships, deny missing/cross-tenant facts before
mutation without existence disclosure, and revalidate in the final transaction.
Do not accept caller-supplied tenant, mode, provider key, grant URL, or stored
URL as authority. A saved draft prerequisite does not itself grant add access.

## Stable identity and mixed representation

- `CaseAssetFile.id` remains stable across ordinary draft saves, draft promotion,
  full edit saves, metadata changes, and replacement. No general Case save
  calls asset `deleteMany`, delete/recreate, mode change, current-version
  update, or provider mutation. Legacy rows keep their IDs and clinical fields.
- Case detail and edit eventually use an explicit, safe asset-summary union:
  legacy URL-backed metadata with URL/extension only while the approved legacy
  display contract is active; managed metadata with stable asset ID, title,
  description, type, and an unavailable/pending-signed-access state but **no**
  raw URL, provider object key, grant URL, or fabricated placeholder. This is
  not the final signed-read DTO. After the separate read cutover, unreconciled
  legacy records also show unavailable pending verification without raw URL
  fallback, per D-FILE-04.
- The edit form may show both kinds for orientation, but its displayed asset
  list is not a mutation command. A missing list, omitted ID, cleared preview,
  stale form, or malicious payload is non-destructive. The server reads the
  authoritative asset set when an explicit asset command executes; it never
  trusts the form as the inventory of assets to keep. Managed entries have no
  preview URL and no remove/replace action until separately authorized.
- A legacy row missing either required URL or extension fails closed at the
  legacy projector; no fallback from StoredFile, grants, or provider fields.
  C1 `case.read` remains before Case repository/DTO work, preserving generic
  missing/foreign/denied behavior. The later summary union must not silently
  filter managed assets or mark a mixed Case as empty.

## Explicit deletion transition

`deleteCaseAssetFileAction` currently hard-deletes without mode awareness. It
must fail closed for `MANAGED_PRIVATE` before any managed writes, with an
authoritative Case/asset/Lab check in the mutation transaction. No managed
hard delete, soft delete, provider deletion, retention clock, or automatic
purge is approved. Whether explicit hard deletion of `LEGACY_URL_UNVERIFIED`
rows may continue is a separate Product Owner choice. If allowed, it needs a
distinct approved permission/resource policy and exact legacy-only mode guard;
if not, disable the action and corresponding UI rather than silently changing
its meaning. The form's remove button must never call general-save deletion.

## Files for a later implementation

- Server actions: `actions/cases/create-case.ts`,
  `actions/cases/update-case-form.ts`, `actions/cases/update-case.ts`.
- Schemas/projections: `schema/composed/case.details.ts`,
  `schema/composed/case-asset-file.details.ts`,
  `schema/base/case-asset-file.base.ts`, `lib/server-only-helpers.ts`,
  `lib/mappers/composers.ts`, `lib/case-helpers.ts`, `data/cases/get-case.ts`.
- UI: `app/(main)/cases/new-case/page.tsx`,
  `app/(main)/cases/[caseId]/page.tsx`,
  `app/(main)/cases/[caseId]/edit/page.tsx`,
  `components/cases/edit-case/edit-case-client.tsx`,
  `components/cases/case/clinical-assets-preview.tsx`,
  `components/cases/case/case-inputs/case-file-upload-zone.tsx`, and
  `components/cases/case-details/sections/digital-asset-vault.tsx`.
- The generic `app/api/uploadthing/core.ts` route is a later provider/activation
  decision; N-FILE-110A may gate or remove its Case UI entry, but cannot turn it
  into an approved private upload route.

## Focused test matrix for separate code authorization

| Claim | Positive and negative checks |
| --- | --- |
| Saved DRAFT | Explicit save after valid same-Lab patient returns authoritative DRAFT ID; no upload or implicit workflow transition; wrong-Lab/stale/non-DRAFT draft ID denied. |
| Stable IDs | Repeated Save Draft, draft promotion, full edit, scalar/work-item edit, and stale form submission preserve exact legacy and managed IDs, mode, URL fields, version links, and counts. |
| Omission safety | Missing/empty/partial asset array and UI field removal do not delete, detach, replace, or downgrade any persisted row; no asset `deleteMany` in general saves. |
| Raw URL non-authority | Forged URL/provider key/new asset payload in general Case actions is rejected and creates no row; no generic upload response is treated as an attach grant. |
| Explicit operations | Only a separately authorized asset command can add or edit metadata; replacement/removal stay denied pending decisions. Wrong Case/Lab/asset target and replay/stale facts deny without existence disclosure or partial write. |
| Mixed read/edit | Legacy asset with both fields renders unchanged; missing either field fails closed; managed metadata remains visible without URL/key; mixed Case count and edit presentation are complete; form omission cannot mutate either kind. |
| Legacy delete gate | Managed target denied and retained; legacy target behavior matches the separately approved transition policy; concurrent mode change/target mismatch fails closed. |
| C1 regression | Case authorization precedes DTO loading; Staff assignment, mixed roles, cross-tenant, missing, and denied cases retain generic not-found semantics. |
| Regression | Existing authorized Case scalar/work-item/status behavior, legacy display, and accepted Category/WorkType/Product/Dentist file boundaries remain unaffected. |

## Dependency and approval gates

Recommended order: C1 `PASS` → this N-FILE-110A design and transition decisions
→ separately authorized asset-safe Case writer/delete guard (provider-independent)
→ separately authorized C2 mixed read-contract compatibility and independent
CODE rereview → C2 migration SQL generation/comparison and isolated PostgreSQL
constraint/trigger validation → fresh read-only target/data preflight → separate
migration-application approval → later `case.asset.add`/replace policy and
provider-dependent attachment/read slices. N-FILE-110A code and C2
compatibility may need coordinated verification because the already-authored
nullable Prisma Client currently causes two TS2322 errors; neither task may
claim a clean global typecheck until the compatibility correction lands.
The authored Prisma schema is not applied to a database; generated-client and
database compatibility must be validated at the later migration gate, not
exercised against the unmigrated development database here.

N-FILE-110A is **not yet READY as a full implementation task**. Its preservation
kernel is technically bounded, but Product Owner authorization must first set
the transition for current raw-URL in-form add/upload and explicit legacy
deletion: disable them pending protected Case attachment, or approve a narrower
legacy-only continuation with exact authorization. The default for managed
add/replace/delete remains deny. Asset metadata-edit permission and the final
mixed DTO/UI design may be decided in later separate slices; neither is
implicitly approved here. C2 remains `BLOCKED_DECISION`, code acceptance
`PENDING`, and the previous independent `CORRECTION_REQUIRED` CODE verdict
remains authoritative. No real private provider claim follows from this plan.
