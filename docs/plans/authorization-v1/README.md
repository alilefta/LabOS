# Authorization V1 plan

Status: Active

Authority: Supporting

Owner: PRIMARY

Last reviewed: 2026-09-20

Authorization V1 is approved for reviewed boundaries and development-active.

Repository evidence does not establish production deployment.

This plan owns incomplete Authorization V1 migration sequencing.

It does not replace canonical architecture, approved decisions, boundary inventories, active task state, or completed verification evidence.

## Active work

1. The N-FILE-001 Catalog Category pilot has completed its approved code-level
   and local-development runtime checkpoint. RV-09's Product Owner-approved
   provider limitation and RV-10's deferred disposition remain explicit; no
   deployed/production callback reachability is inferred.

2. Continue subsequent N-FILE migration only through bounded tasks derived from the [file plan](files.md), Files architecture, Authorization architecture, and approved decisions. Completion of the Catalog Category pilot does not automatically activate another file boundary.

3. Continue cross-surface classification and registered adapters from [boundaries](boundaries.md). Replace manual authorization only through registered boundary-owned adapters and approved migration slices.

4. Keep financial work subordinate to M4 and derive its current state, blockers, and next authorized work from the [financial plan](financials.md) and [financial boundaries](financial-boundaries.md).

5. Complete deployment, rollback, provider, migration, browser, and other environment-sensitive verification only when an explicit approved scope authorizes it. Do not infer production deployment or environment approval from code-level acceptance.

Immediate task state belongs in `.agent/current-task.md`.

Do not use this umbrella plan as a subtask or runtime-verification journal.

## Workstream routing

Use the specialized supporting plans and inventories for detailed work:

| Work                                             | Authority / supporting source                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| UploadThing and protected file boundaries        | [files plan](files.md), Files architecture, Authorization architecture, approved decisions |
| General protected boundaries and migration state | [boundaries](boundaries.md)                                                                |
| Financial authorization migration                | [financial plan](financials.md)                                                            |
| Financial boundary classification                | [financial boundaries](financial-boundaries.md)                                            |
| Immediate authorized engineering task            | `.agent/current-task.md`                                                                   |
| Runtime/environment authorization                | task evidence directory runtime-verification packet                                        |
| Completed Catalog Category verification          | [`docs/evidence/files/authorization-v1/n-file-001-catalog-category-uploadthing-pilot/`](../../evidence/files/authorization-v1/n-file-001-catalog-category-uploadthing-pilot/) |

Canonical architecture and approved decisions remain authoritative when supporting plans or inventories conflict with them.

## Acceptance gates

Each protected boundary requires the applicable combination of:

- explicit permission and registered operation;
- trusted tenant and target resolution;
- closed operation intent;
- authorization before protected domain work;
- cross-tenant denial;
- target/intent validation;
- DTO redaction;
- telemetry allowlist compliance;
- focused role-matrix verification;
- transaction/race/replay verification where applicable;
- migration/compatibility verification where applicable.

Better Auth mutations additionally require provider-side revalidation where required by approved architecture.

Implementation completion is not acceptance.

Independent Reviewer `PASS` is not final acceptance.

The Primary Engineering Session owns final engineering acceptance.

Code-level acceptance does not establish runtime acceptance when real database, migration, provider, callback, browser, deployment, or other environment-dependent verification remains outstanding.

Current system rules are defined by [Authorization architecture](../../architecture/modules/authorization.md) and [decisions](../../architecture/decisions.md).

Completed retained verification belongs under [evidence](../../evidence/).

## Completion discipline

Authorization V1 migration advances boundary by boundary.

Do not infer that an unregistered or unreviewed boundary is authorized merely because a similar boundary has migrated.

Do not reactivate legacy authorization as authority unless an approved compatibility plan explicitly requires it.

Do not silently resolve missing architecture, product, security, financial, provider, or migration decisions.

When a real decision blocks safe progress, route it through the active engineering workflow.

The Primary Engineering Session reconciles accepted boundary work into the parent Authorization V1 workstream and determines the next bounded task.
