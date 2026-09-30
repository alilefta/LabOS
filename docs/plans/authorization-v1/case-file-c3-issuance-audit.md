# C3 — Case signed-access issuance audit foundation

Status: CLOSED; code acceptance PASS (2026-09-27)
Tier: V3, independent `CODE` review PASS

Implement the narrow append-only Case access-audit writer from [D-FILE-04](../../architecture/decisions.md) only after its required C2 persistence/schema gate is approved and available. Accept server-derived actor, tenant, Case/asset identifiers when safely resolvable, allowlisted authorization/issuance outcomes, correlation, time, and issued expiry. Reject URL, token, provider key, clinical payload, and arbitrary event fields. Test append-only repository behavior, denied attempts, audit write failure, and no delivery on failure.

No provider call, signed-URL issuance, read endpoint, full M6 audit program, retention change, or runtime acceptance is included. Schema authoring/application authority remains separate.

The authorized provider-independent writer is implemented. It derives tenant
and Member from the server context, authorizes `case.read` before tenant-scoped
Case/managed-asset resolution, and appends only allowlisted C2 audit fields.
Denied requests retain only safely known identifiers; missing/foreign assets
fail generically. `ISSUED` requires `issuedAt <= now < expiresAt` and a positive
lifetime at most 300 seconds. Delivery is reported permissible only after the
audit append succeeds. This is an application contract, not signed delivery or
runtime provider acceptance. See [C3 code verification](../../evidence/files/authorization-v1/c3-case-file-access-audit/code-verification.md).
