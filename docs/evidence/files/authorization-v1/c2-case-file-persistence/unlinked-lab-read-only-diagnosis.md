# C2 unlinked Lab read-only diagnosis

Status: completed read-only diagnosis; no reconciliation authorized or performed.
The C2 development migration attempt remains blocked at preflight, and C2
development database acceptance remains pending. C2 code acceptance remains
PASS. No migration generation or application was resumed.

## Target and method

The effective `DIRECT_URL` again resolved to the previously attested development
host SHA-256 prefix `eb0d823953fe`, direct port 5432, database `postgres`,
schema `public`. A connected `BEGIN READ ONLY` transaction reported PostgreSQL
17.6, 47 applied migrations, and one unlinked Lab. The connection used
encrypted TLS without certificate-chain validation, as in the stopped C2
preflight; host/database checks rather than TLS identity established this
bounded attestation. Queries used a local statement timeout. No credentials,
clinical URLs, payloads, token values, or complete rows were retained.

The first relationship run rolled back after using `caseId` instead of the
live pre-C2 `dentalCaseId` column. A corrected run completed read-only. A
temporary query helper was removed after diagnosis. No DDL/DML or fixture
operation occurred.

## Lab and dependent records

The sole unlinked Lab is SHA-256 ID prefix `3aa0cb43cb24`, title `Denta
Fusion`, slug `denta-fusion`, created 2026-04-23, last updated 2026-06-01.
It has no `LabSettings` row. Counts below are direct `labId` relationships in
the live schema; zeroes are included where relevant.

| Relationship | Count | Relationship | Count |
| --- | ---: | --- | ---: |
| Case | 6 | CaseAssetFile | 3 |
| Patient | 2 | Clinic | 3 |
| Dentist | 4 | LabStaff | 2 |
| LabUser | 1 | AuthUser transitional `labId` | 1 |
| FileUploadGrant | 0 | LabInvitation / Staff intent | 0 / 0 |
| CaseCategory / WorkType / Product | 2 / 3 / 2 | ProductAddon | 3 |
| CasePricingPlan | 5 | CaseWorkItem / SelectedTooth | 7 / 53 |
| CaseStaffAssignment / CaseActivityLog | 4 / 22 | Invoice / InvoiceCase | 1 / 3 |
| InvoicePayment / StaffPayout | 0 / 1 | LabSettings / LabSubscriptionPlan | 0 / 0 |
| CaseWorkItemAddon | 0 | | |

All **three** current Case assets belong to this Lab, on two of its Cases
(two assets on one Case, one on another). All six Cases are non-DRAFT. The
latest Case was created 2026-04-27 and last updated 2026-08-21; the latest
asset was created 2026-04-28. The invoice was created 2026-05-27. This is
meaningful historical domain state, not an empty or demonstrably disposable
fixture. Neither of the two current `UPLOADED` grants belongs to this Lab.

## Ownership provenance

**Direct authoritative evidence:** `Lab.organizationId` is null. No
`LabStaff.memberId` is populated (both Staff rows are operationally active),
and there is no Organization invitation intent for this Lab. No existing
trusted row directly selects an Organization for it.

**Corroborating but ambiguous evidence:** its one active `LabUser` points to
an `AuthUser` whose transitional `AuthUser.labId` matches this Lab. That user
has one Member row in each of two Organizations (hashes `fac5fa900aef` and
`2a24ed4ce9cd`) and active-Organization sessions for both. Both Organizations
already own different linked Labs (hashes `5b39f17ca1a2` and
`02c373552b12`). Session selection and shared-user membership are not Lab
ownership authority; the unique one-Organization-per-Lab relation also
precludes attaching this Lab to either Organization as-is. Similar display
names/slugs among linked Labs do not prove duplication or common ownership.

## Repository origin and classification

The unlinked Lab predates the Organization-link migration. Migration
`20260821185304_link_lab_to_organization` only added nullable
`Lab.organizationId`, a unique index, and an FK; it contains no backfill.
The Prisma schema explicitly keeps the field nullable during expand/backfill.
Current Organization onboarding creates an Organization-linked Lab plus
settings. The platform roadmap leaves deterministic backfill and legacy
reconciliation unchecked; the tenant-context migration freezes legacy writes
and treats `LabUser`/`AuthUser.labId` as transitional, not canonical tenancy.
No supported automatic reconciliation path for this row was found.

Thus the evidence supports **expected unfinished tenant migration state with
meaningful historical development data**, rather than an application defect,
empty obsolete fixture, or a proved C2 schema incompatibility. The exact
historical reason this particular Lab was not reconciled is not determinable
from the available records. The immediate C2 blocker is an unresolved
tenant-reconciliation/data-integrity precondition, not merely an execution
environment failure. This refines the earlier
`VERIFICATION_ENVIRONMENT_BLOCKER` classification without changing the stop.
Under Workflow V2, the remaining action gate is an `AUTHORITY_BLOCKER`:
Product Owner adjudication is required before any reconciliation mutation or
revision of C2's mandatory preflight invariant.

## Reconciliation alternatives requiring separate decisions

1. **Adjudicated Organization reconciliation.** Establish the Lab's rightful
   Organization and membership from independent owner/product evidence,
   then design a one-to-one-safe reconciliation. Neither current candidate
   Organization is available for a direct FK update because each already
   has a Lab. Creating a new Organization or moving/merging an existing Lab
   would affect identity and access; no such mutation is authorized. Require
   ownership proof, dependency/authorization review, backup, dry-run, and
   rollback plan before any write.
2. **Preserve the legacy Lab and revise C2's preflight/activation distinction.**
   The proposed C2 schema permits nullable `Lab.organizationId` and preserves
   legacy URL-only assets; managed `StoredFile` would require a linked Lab.
   A separate C2 safety-packet decision could permit schema migration while
   explicitly forbidding managed attachment/read activation for this Lab.
   This needs SQL/constraint and application-compatibility review and a fresh
   preflight; it must not silently waive ownership for managed files. No
   database mutation is inherent in the decision, but migration application
   remains a distinct gate.
3. **Archive/delete as abandoned development data.** There is no evidence the
   Lab is disposable. Deletion would cascade or otherwise affect Cases,
   clinical assets, people, catalog, financial, and history records; it is
   destructive and not recommended without explicit ownership adjudication,
   retention decision, full impact/backup analysis, and separate authority.

No specific Organization-link mutation is justified by current evidence.
The least-risk current course is to retain the Lab unchanged and request a
Product Owner decision on adjudicated tenant reconciliation versus a narrow
legacy-only C2 preflight revision. Until then C2 migration validation stays
blocked; provider activation and N-FILE-110/111 remain unavailable.
