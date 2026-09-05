# Authorization V1 plan

Status: Active
Authority: Supporting
Owner: Project owner
Last reviewed: 2026-09-05

Authorization V1 is approved for reviewed boundaries and development-active; repository evidence does not establish production deployment. This plan owns incomplete migration sequencing, not architecture or completed checkpoints.

## Active work

1. Complete N-FILE endpoint migration in bounded slices, starting with the Catalog-image pilot in [files plan](files.md).
2. Continue cross-surface classification and registered adapters from [boundaries](boundaries.md); replace manual authorization only through registered boundary-owned adapters.
3. Keep financial work subordinate to M4: [financial plan](financials.md) and [financial boundaries](financial-boundaries.md). A-096 and A-087 remain blocked pending decisions.
4. Complete deployment/rollback evidence only when an explicit reviewed scope authorizes it; do not infer production deployment.

## Acceptance gates

Each boundary needs role matrix, tenant isolation, denial-before-domain-work, target/intent validation, DTO redaction, telemetry, and applicable transaction/race verification. Better Auth mutations additionally need provider-side revalidation. Current system rules: [Authorization architecture](../../architecture/modules/authorization.md) and [decisions](../../architecture/decisions.md). Completed verification is in [evidence](../../evidence/authorization-v1/).
