# N-FILE-106/107 — Catalog Product image create/update

Status: `ACCEPTED — CODE LEVEL`  
Verification tier: `V3 — Sensitive`  
Implementation role: `INTEGRATOR`  
Review scope: `CODE`

Acceptance:

- Code: `PASS`
- Task runtime: `NOT_REQUIRED`
- Parent runtime checkpoint: not created or authorized
- Parent gate: `NOT_EVALUATED`

## Authorized boundary

Implement `N-FILE-106` (`catalog.product.image.create.stage`) and
`N-FILE-107` (`catalog.product.image.update.stage`) using the approved
D-FILE-01 opaque, persisted, one-time grant design. Create staging is
Organization-scoped with a null target; update staging is bound to the
authoritative `catalog.product` ID. Both definitions have the registered
15-minute TTL.

## Required invariants

- Canonical Organization/Lab/Member context is the only tenant authority.
- Authorization completes before grant, provider, or mutation work.
- Product create/update validates the selected WorkType against the canonical
  Lab in the final mutation path.
- The browser submits only `imageUploadGrantId` as image mutation authority.
- Verified grant consumption and Product mutation share one transaction.
- A no-grant update preserves the existing image; persisted removal remains
  unavailable.

## Non-scope

No schema/migration, provider configuration, deployment, stored-file read
policy, persisted-image deletion, expiry scheduling, orphan cleanup, or
runtime checkpoint is part of this code task.

## Verification claims

Focused tests must cover closed stage projection, authorization ordering,
canonical Product target ownership, WorkType tenant validation, callback
handoff, raw URL non-authority, transaction/replay failure propagation,
no-grant preservation, both create surfaces, the edit surface, and telemetry
through existing grant/authorization contracts. Category and WorkType shared
regressions are required where the UploadThing router or authorization adapter
is changed.

## Independent review and disposition

Reviewer verdict: `PASS`  
Review scope: `CODE`

The Primary accepted and closed this bounded code task on 2026-09-22. The
review independently validated the Product authorization, tenancy, opaque
grant handoff, callback adapter, transaction, replay, preservation, and UI
claims. No runtime/provider checkpoint was executed or implied.
