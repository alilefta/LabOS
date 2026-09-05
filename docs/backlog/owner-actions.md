# Owner actions

Status: Active
Authority: Supporting
Owner: Project owner
Last reviewed: 2026-09-05

Only unresolved actions requiring owner input, runtime access, approval, or external-environment knowledge belong here.

- Provide explicit production deployment evidence before Authorization V1 may be documented as production-deployed.
- Provide a disposable two-Organization runtime fixture/session where browser and provider-telemetry verification remains pending.
- Decide D-FILE-04 separately for Catalog imagery and Case clinical assets; do not select a read policy during file-upload work.
- Approve an idempotency/concurrency design before payment recording (`A-096`), and define paid/partial Invoice void semantics (`A-087`).

## Recovered unresolved items from the former owner task record

| Former unchecked item | Disposition |
| --- | --- |
| A-001 browser/session readiness for the documented matrix | Owner/runtime access required; provide a signed-in disposable development session or run the matrix manually. |
| Staff can open Staff-creation/access controls despite server denial | Product/UI follow-up in [product backlog](product.md). |
| Admin path to A-124/A-125 Staff-access controls | Product/security UI decision in [product backlog](product.md); must not broaden compensation/schedule access. |
| Compensation/schedule editing classification | Keep operational permissions distinct; requires product/security classification before exposing Admin controls. |
| Incident rollback task | If an incident occurs, operators may use documented `legacy-rollback`, restart instances, and record restored legacy Manager access; see [cutover](../process/authorization-v1-cutover.md). |
| F2-001 Invoice bearer-token/disclosure browser matrix | Owner/runtime browser verification required; exact checks are in [financial plan](../plans/authorization-v1/financials.md). |
