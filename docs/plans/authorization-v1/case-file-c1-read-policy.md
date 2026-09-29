# C1 — Authoritative Case read policy

Status: CLOSED after correction and independent V3 CODE `PASS`
Owner: Primary routing; proposed Integrator writer, independent V3 `CODE` Reviewer
Acceptance: code `PASS`; runtime `NOT_REQUIRED` for this code-only slice; parent gate `NOT_EVALUATED`

Final [code verification and review](../../evidence/files/authorization-v1/c1-case-read-policy/code-verification.md) records focused/affected checks, the corrected initial finding, the final independent verdict, and unrelated global-lint baseline. This task's plan below remains its approved scope; it does not authorize another slice.

## Objective and authority

Implement the existing `case.read` permission as an enforceable, resource-scoped Authorization V1 boundary for an authenticated actor and a saved authoritative Case. This is the provider-independent read-policy foundation for D-FILE-04, not stored-file access or N-FILE-110/111 activation. The approved policy requires canonical Organization/Lab membership and authoritative Case ownership; Staff additionally require active assignment to that Case. No schema, provider, signed URL, audit writer, asset upload, or migration work is included.

## Exact permission and policy contract

- Reuse `case.read` in `LABOS_PERMISSIONS`, its existing resource definition (`targetTypes: ['case']`, sensitivity `sensitive`, required policy `case.read`), policy ID, and existing owner/admin/manager/staff fixed bundle entries. Add no role hierarchy, aliases, new permission, or bundle grant in C1. `case.asset.add` is approved by D-FILE-02 but absent from the implemented catalog/bundles; replacement has no approved mapping. Neither is activated by C1.
- Require identifier-only target `{ type: 'case', id: caseId }`; the caller cannot supply Organization, Lab, assignment, role, or policy facts. The target resolver looks up only `Case.id -> Case.labId -> Lab.organizationId` and returns the authoritative Organization or `null`. Missing Case, missing Organization-linked Lab, inconsistent linkage, and lookup failure fail closed. Cross-tenant and missing targets receive indistinguishable external responses.
- The `case.read` fact loader re-queries the Case scoped to the actor's Organization and validates Case/Lab consistency. For a Staff-only effective role, prove `Member.id = actor.memberId`, `Member.organizationId = actor.organizationId`, `LabStaff.memberId = Member.id`, `LabStaff.labId = Case.labId`, `LabStaff.isActive = true`, and a `CaseStaffAssignment` for that exact Case, Staff, and Lab. The assignment row alone is insufficient; role category and legacy `LabUser` links are not authority. Missing or inconsistent facts deny.
- Use the kernel's normalized fixed-role bundle semantics. An actor with an authorized owner/admin/manager role still needs `case.read`, the trusted resolver, and Case policy, but no Staff assignment; an actor whose effective permission derives only from Staff needs active assignment. Mixed roles follow the explicit union of fixed bundles, never an inferred rank. Unknown-only roles deny; malformed actor/target/policy facts deny.
- Add `case.read` to the V1 supported-permission subset only in the same reviewed change as the resolver, fact loader, policy, and isolation tests. Fail closed if any component is absent. Use a closed Case-detail read intent only if the policy needs to distinguish the reader; do not accept arbitrary caller attributes.

## Integration and surface boundary

- Authorization modules: `permissions.ts`, `roles.ts`, `permission-definitions.ts`, and `policy-ids.ts` are existing authority to reuse, not broad rewrite targets. Implement the Case resolver/fact repository in `adapters/prisma/operational-authorization.repository.ts`, loader in `fact-loaders/operational-facts.ts`, policy in `policies/operational.policies.ts`, register in `operational.adapters.ts`, and support in `service.ts`. Reuse `target-resolvers/organization-boundary-resolver.ts` and `createLabOSAuthorizationActor`.
- The existing `getDentalCaseById` in `data/cases/get-case.ts` serves `/cases/[caseId]` detail and edit pages, including metadata generation. C1 must place authorization before its Case DTO/repository query at this specific reader, or introduce an equivalent authorized loader and migrate all three call sites together. Keep tenant-scoped repository queries and external not-found/denial indistinguishable. Do not broaden to Case list, financial, write, or file-read endpoints. Preserve the existing DTO/display behavior until the separately approved legacy read cutover; C1 grants no provider access or raw-URL renewal.
- Do not claim that enabling `case.read` service support alone protects unconverted Case readers. Inventory and document any other Case detail callers found during implementation; stop for a materially broader boundary rather than silently claiming complete application read coverage.

## Focused V3 CODE checks

1. Resolver/repository: correct Case -> Lab -> Organization, missing/unlinked Lab, missing Case, cross-tenant Case, and minimum selected fields. No caller-supplied tenant or assignment facts accepted.
2. Fact loader/policy: owner/admin/manager allow only with fixed `case.read` bundle, trusted same-tenant Case, and complete facts; Staff allow only with active same-Lab Member-linked assignment. Deny inactive Staff, unlinked Member, assignment to another Case/Lab, mismatched assignment Lab, malformed target/intent, missing policy facts, and unknown-only roles. Test mixed-role behavior under kernel normalization.
3. Service integration: supported permission, registered resolver/policy, failure-closed missing component, sanitized authorization telemetry, and no resource repository work after denial.
4. Existing detail reader and its three page call sites: authorization precedes Case DTO/Prisma loading (including `generateMetadata`), cross-tenant and missing IDs are externally indistinguishable, and denied Staff cannot receive asset URL fields. Preserve authorized existing rendering and do not change legacy URL access policy as part of C1.
5. Run focused authorization and Case-reader tests, affected operational authorization regressions, lint/typecheck as applicable, and independent V3 `CODE` review. No real provider/database/browser runtime claim follows from mocks.

## Stop conditions and exclusions

Stop for an unresolvable Case/Member/Lab relationship, a need to change the approved read role matrix, or a discovered Case read surface requiring material expansion. Do not activate `case.asset.add` or replacement, issue URLs, add schema, mutate runtime data, or reopen accepted Files checkpoints. C2, C3, and N-FILE-110A each need separate authorization and review. Product PRV-08 remains separate.

No further Product Owner decision is required for this narrow `case.read` contract. The add/replace bundle and resource-policy mapping is a later decision before those permissions are registered or used.
