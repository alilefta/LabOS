# Product backlog

Status: Active
Authority: Supporting
Owner: Product owner
Last reviewed: 2026-09-05

## Observed defect

- **Manager case-creation review:** retain the unresolved UX/product findings from the F2 manager browser review; browser observations remain in [evidence](../evidence/browser/authorization-f2/manager.md).
- **Mobile dashboard vertical scroll:** see the bounded [mobile dashboard item](mobile-dashboard-scroll.md).

## Product candidates

- Consolidate unique future-feature candidates and rationale from the pre-migration feature notes before prioritization.

## Unapproved schema ideas

- `workingDays` is a proposed schema change only. It is not approved and this migration authorizes no schema or migration change.
- Invoice data-model proposals are historical reasoning, not approved schema: [archive](../archive/proposals/invoice-data-model.md).

## Blocked pending decision

- Case clinical asset activation is blocked by pending D-FILE-04 stored-file read/access policy; upload authorization does not select a read policy.

## Imported product candidates

- **Cases table:** multi-select checkboxes to advance cases and a Quick Assign flow for assigning multiple staff.
- **Clinic detail:** permit a preselected-Clinic case-creation entry point.
- **Analytics command center:** evaluate global aging, capacity, and workload visibility as a product candidate, not an approved implementation.
- **Clinic self-service portal:** evaluate bounded clinic ordering, status visibility, and billing access only after separate authorization design.
- **HR and commission ledger:** evaluate operational capacity and payroll improvements under their own financial/security boundaries.

## Manager browser findings — 2026-09-02

Source: [Manager F2 evidence](../evidence/browser/authorization-f2/manager.md). These are unresolved application/product findings, not Authorization V1 completion claims.

- **P1:** bind Case dossier Neural Auditor narrative to actual prescription/product data, or display an explicit demo/unavailable state.
- **P1 (verify):** verify Clinic/Dentist relation selection and display Clinic name first with Dentist separately.
- **P2:** fix concatenated review labels and duplicated `Dr.` prefix.
- **P2:** show one arch label and one anatomical description in work-item summary.
- **P2:** investigate recurring Decimal transition rendering and add a production-build end-to-end check.
- **P3:** make the Cases landing-page New Case button navigate or clearly trigger a modal.
- **P3:** replace repetitive case-builder copy.
- **P3:** make required physical-impression workflow explicit while retaining the no-digital-files warning.

## Recovered UI classification work

- Hide or disable Staff-only Staff-creation/access controls before submit; server denial remains authoritative.
- Define an Admin path for A-124/A-125 Staff-access controls without granting compensation or schedule editing.
- Keep compensation and schedule editing as separately classified operational permissions.
