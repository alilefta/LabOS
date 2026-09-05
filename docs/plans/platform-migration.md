# Platform migration plan

Status: Active
Authority: Supporting
Owner: LabOS maintainers
Last reviewed: 2026-09-05

This plan holds remaining platform migration work under the canonical [M0–M9 roadmap](../roadmap.md). It does not replace module architecture or decisions.

## Remaining platform work

- Complete Organization-to-Lab migration with `requireTenantContext()` as the canonical server boundary: session, active Organization, verified Member, Organization-linked Lab, then `labId`.
- Preserve the write-freeze invariant: do not open tenant Prisma or perform domain work until tenant and authorization context succeeds.
- Remove compatibility dual-read/write only through a dated, observed exit gate.
- Continue modular extraction only where a real LabOS requirement warrants it; platform modules do not absorb dental-domain concepts.

Milestone exit status not proven by repository evidence is `Unclear — review required`; do not infer completion from partial implementation.
