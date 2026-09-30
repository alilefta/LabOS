# N-FILE-110A — Saved-DRAFT and asset-safe Case persistence

Status: CLOSED; provider-independent preservation kernel code acceptance PASS
after corrected independent V3 CODE rereview. No runtime or provider
acceptance is claimed. See [code verification](../../evidence/files/authorization-v1/n-file-110a-case-persistence/code-verification.md).
Tier: V3, independent `CODE` review after separate authorization

The [read-only mutation inventory and proposed command contract](../../evidence/files/authorization-v1/n-file-110a-case-persistence/design-review.md)
govern future implementation planning. Preserve the existing explicit **Save
Draft** action after patient selection. A future Case upload may start only
with the saved authoritative `DRAFT` Case ID; no targetless grant or
browser-only Case. Case draft/create/edit saves must preserve stable
`CaseAssetFile` rows and managed/legacy relationships, without accepting a raw
URL as attachment authority or deleting/recreating omitted assets. Case
metadata edits, asset add, metadata edit, replace, and remove are distinct
operations with separate authorization. A managed asset remains represented
by identity/clinical metadata when content is unavailable, never filtered from
a mixed Case or inferred deleted from edit-form omission.

The Product Owner disabled raw-URL in-form add/upload and explicit legacy
asset deletion during this transition. The authored kernel removes asset
mutation from general Case operations and closes the generic Case route
without activating a replacement upload. Existing legacy assets remain
visible but read-only in create/edit forms. No managed deletion/provider
cleanup is approved. Focused tests must
cover saved-draft ownership, same-Lab patient/Case facts, ordinary-save ID and
version preservation, omission non-authority, raw-URL non-authority, mixed
representation, explicit delete guards, and no workflow transition or upload
activation.

Dependency order: accepted C1 read authority → N-FILE-110A asset-safe writer
and delete guard → C2 nullable read-contract compatibility and independent
CODE rereview → separately approved C2 SQL validation/preflight and migration
application → later managed attachment/provider slices. The already-authored
C2 Prisma proposal is a contract input, not applied schema. Coordinated
verification is necessary because its generated client currently causes two
Case read DTO TS2322 errors. This task does not add UploadThing routing,
grants, private ACL claims, signed access, provider objects, schema/migration
authority, or runtime verification.
