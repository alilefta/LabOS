# N-FILE-104/105 — Catalog WorkType image create/update task

Status: ACCEPTED — CODE LEVEL  
Verification tier: V3 — Sensitive  
Implementation role: Integrator  
Independent review: mandatory, scope `CODE`

Acceptance:

- Code: `PASS`
- Task runtime: `NOT_REQUIRED`
- Parent runtime checkpoint: pending, not executed
- Parent gate: `NOT_EVALUATED`

## Objective and boundary

Migrate Catalog WorkType image create and update to the approved protected
UploadThing design:

- N-FILE-104 — `catalog.worktype.image.create.stage`, Organization-scoped
  `catalog.create`, no target, 15-minute grant.
- N-FILE-105 — `catalog.worktype.image.update.stage`, resource-scoped
  `catalog.update`, authoritative `catalog.worktype` target, 15-minute grant.

This task owns code-level implementation and focused V3 verification. A later
separately tracked WorkType runtime checkpoint owns real database, provider,
callback, and browser claims; code acceptance must not imply runtime acceptance.

## Authority and invariants

- [Files architecture](../../../../architecture/modules/files.md)
- [Authorization architecture](../../../../architecture/modules/authorization.md)
- [Architecture decisions](../../../../architecture/decisions.md), including
  D-FILE-01
- [Authorization V1 file plan](../../../../plans/authorization-v1/files.md)
- Registered grant definitions in
  `modules/labos-files/upload-grants/labos-upload-grant.registry.ts`
- Accepted Category implementation is a code pattern, not authority to broaden
  WorkType scope.

Authorization must complete before provider or domain work. Tenant authority
comes only from canonical Organization/Lab/Member context. Provider URLs and
keys never establish authority. The browser hands final commands only an
opaque grant ID. Consumption is one-time and occurs inside the final WorkType
transaction.

## Scope

- Add closed WorkType stage and commit operation intents.
- Add the authoritative WorkType target resolver and tenant ownership lookup.
- Add a WorkType upload-stage contract for N-FILE-104/105.
- Wire a dedicated WorkType UploadThing route and verified callback through the
  existing upload-grant service.
- Replace raw WorkType image URL handoff with `imageUploadGrantId` across both
  supported create surfaces and the edit surface.
- Add transactional WorkType create/update commands.
- Verify create's parent Category belongs to the canonical Lab.
- Use the authoritative WorkType ID for update staging and consumption.
- Preserve the existing persisted image on an update with no grant.
- Add focused contract, resolver, route, schema, client-handoff, transaction,
  replay, denial-order, and tenant-isolation tests.

## Non-scope

- Persisted image removal or provider deletion.
- Expiry scheduling or provider orphan cleanup.
- Stored-file read/access policy or D-FILE-04.
- Product, Dentist, Staff, Case, or other file boundaries.
- Schema/migration changes, provider configuration, deployment, or a real
  provider/browser runtime claim.
- Refactoring the generic uploader used by unauthorized adjacent boundaries.

## Acceptance claims and verification

| Claim / material risk | Required code-level evidence |
| --- | --- |
| Authorization precedes provider and domain work | Contract/route/command ordering and short-circuit tests |
| N-FILE-104 is Organization-scoped and targetless | Projection and grant-issuance tests |
| N-FILE-105 uses the authoritative WorkType ID | Strict schema, projector, resolver, UI stage, and consumption tests |
| Cross-tenant WorkTypes and parent Categories deny | Resolver and command tenant-isolation tests |
| Browser handoff is opaque | Schema/UI tests; raw URL absent from command authority |
| Verified callback binds provider metadata to the grant | Route/callback adapter tests using the existing service boundary |
| Create/update consume exactly once transactionally | Success, replay, rollback, wrong-boundary/purpose/target/member tests |
| No-grant update preserves the image | Focused update command regression test |
| Persisted removal remains unavailable | UI/schema/command regression evidence |
| Telemetry remains allowlisted | Existing grant telemetry coverage plus WorkType-specific labels as needed |

## Baseline and stop conditions

The current WorkType path uses `genericAvatar`, accepts raw `imageUrl`, does
not couple WorkType mutation to grant consumption, and clears a persisted image
on a no-image edit. The update resolver and WorkType operation intents are not
yet wired. These are the migration baseline, not newly discovered defects.

Stop and return to Primary if implementation requires a new permission,
target type, provider contract, removal behavior, schema migration, or other
policy/architecture decision. Preserve unrelated dirty-worktree changes,
including accepted Category work already present in overlapping files.

## Independent review and disposition

Reviewer verdict: `PASS`  
Review scope: `CODE`

Primary accepted the bounded N-FILE-104/105 implementation at code level on
2026-09-21. This does not establish real database, UploadThing provider,
callback, browser, deployed, or production acceptance. Those claims belong to
the separately authorized parent runtime checkpoint.
