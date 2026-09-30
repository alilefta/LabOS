# Architecture decisions

Status: Current
Authority: Canonical
Owner: LabOS maintainers
Last reviewed: 2026-09-29

This register records decisions still governing implementation. Historical approval evidence is retained separately.

## Authorization V1

Fixed, non-hierarchical organization roles are permission bundles; permissions, not role rank, are the authorization primitive. Unknown roles, malformed intent, missing definitions, resolvers, facts, or policies deny by default. LabOS authorization and Better Auth must both allow Organization mutations. Ownership mutation and `membership.leave` remain outside the reviewed approval.

Authorization V1 is approved for its reviewed scope and is verified/development-active. Production deployment is not established by repository evidence. `LABOS_AUTHORIZATION_MODE=legacy-rollback` is an emergency, security-impacting rollback and must not be used as routine testing.

## File authorization decisions

### D-FILE-01 — persisted one-time upload grants

Decision status: Approved

Use opaque, persisted, one-time grants with canonical Organization, Lab, and Member linkage. Provider keys never establish authorization. The verified callback loads the trusted grant definition; final consumption and domain mutation occur transactionally with single-use, expiry, and orphan-cleanup handling.

### D-FILE-02 — Case asset creation authority

Decision status: Approved

`case.asset.add` is the narrow Case-asset permission, explicitly granted in
the Owner, Admin, Manager, and Staff fixed bundles. It is resource-scoped to
an existing authoritative saved Case in the active Organization/canonical Lab.
Owner, Admin, and Manager need consistent Case/tenant facts but no assignment.
Staff additionally need an active, Member-linked, same-Lab assignment to that
exact Case. A saved DRAFT is eligible; this policy does not impose a DRAFT-only
lifecycle rule. Missing or inconsistent facts deny. `case.update` does not
substitute for asset-add authority, and asset-add grants no replacement,
metadata-edit, or deletion authority. This code-level authorization does not
activate staging, attachment, or provider access.

### D-FILE-03 — Staff self-avatar endpoint

Decision status: Approved

The unused Staff self-avatar endpoint remains unavailable/deferred. It must not be inferred from broader Staff permissions.

### D-FILE-04 — stored-file read/access policy

Decision status: Amended for V1 by the Product Owner file-storage security
decision below. The original private/signed-read policy in this section is a
future storage-security target, not a V1 provider-confidentiality claim.

**FILE STORAGE SECURITY — V1 LIMITATION (approved 2026-09-29).** LabOS V1 uses
UploadThing Free with provider ACL `public-read`. Application authorization is
enforced; direct provider URL confidentiality is **not** enforced. Anyone who
obtains the direct provider URL can retrieve its bytes without LabOS
authorization. The Product Owner accepts this temporary V1 limitation under
the no-infrastructure-cost-before-10-users policy. Do not describe V1 Case
objects as provider-private or signed-only, or use an application proxy as a
claim of object privacy. Private provider storage and short-lived signed reads
are deferred to a later storage-security version.

V1 still requires authenticated, tenant/resource-authorized upload,
discovery/listing, association, normal application open, mutation and delete
operations; opaque provider identity and URL-exposure minimization; trusted
callback-to-grant binding; validation before Case-asset activation; and
prompt, separately authorized cleanup of rejected provider objects where
technically possible. Provider credentials stay server-side. A closed
storage-access capability boundary must allow a future fail-closed private
mode without a public fallback. This amendment does not change C1, C2, C3,
N-FILE-110A, the 15-minute grant TTL, or JPEG R001 validation semantics.

**Public-backed compatibility decision approved 2026-09-29:** Add
`MANAGED_PUBLIC` for a validated managed Case asset whose current provider
object is public-read. Keep installed `MANAGED_PRIVATE` semantics unchanged.
Classify each immutable physical `StoredFile` as `PUBLIC_READ`, `PRIVATE`, or
null historical/unclassified; null never implies private and remains
content-unavailable until safely reconciled. Preserve stable Case asset ID
across a future public-to-private version change. Normal managed Case DTOs
carry no provider identity or direct URL. A separate freshly `case.read`-
authorized Case asset open operation may expose the public URL narrowly;
possession of that URL still bypasses LabOS for provider byte retrieval.
Public opening never records C3 `ISSUED`, which retains genuine expiring
signed/private issuance meaning. The [additive contract candidate](../plans/authorization-v1/case-file-public-access-contract.md)
specifies schema, SQL, DTO and open-operation details; its authoring does not
approve migration application or activation. No historical migration is
rewritten. The existing evidence entity records successful validation only;
rejected-upload outcome and provider cleanup need a separate bounded design.

#### Original private/signed-access target, deferred from V1

Case clinical assets are private by default. An authenticated actor may request
access only after server-side authorization against the authoritative Case,
tenant, and applicable resource relationships. After authorization, the
application issues a short-lived signed provider URL. Signed-URL issuance is
audited with actor, Case, asset, authorization outcome, and issuance event,
without logging the URL or its credentials. A per-byte application proxy is
not required for N-FILE-110/111. Unauthenticated clinical sharing and public
clinical-file links are excluded from this milestone.

Signed URLs are temporary bearer capabilities: issuance auditing does not
identify the eventual downloader or guarantee immediate revocation of an
already-issued URL. Provider keys, stored URLs, and URL possession do not
authorize issuance or renewal. Upload, attachment, read, replacement, and
deletion remain distinct operations.

Read issuance requires an authenticated actor, canonical Organization/Lab
membership, the applicable Case read permission, and authorization against
the authoritative Case. Staff additionally require an active authoritative
assignment to that Case. Owner, Admin, and Manager follow the approved
Authorization V1 Case policy, not role-name inference or a new hierarchy.
Missing resource facts or policy support deny by default.

N-FILE-110 staging targets an authoritative saved DRAFT Case ID; neither a
targetless clinical grant nor an unsaved browser Case is a valid target. The
creation flow must persist the draft before upload without introducing an
unapproved workflow transition. N-FILE-111 replacement preserves the stable
Case clinical asset ID and records a durable, auditable prior/current file
history. It must not overwrite prior provider identity absent an approved
retention and cleanup rule.

The `case.asset.add.stage` grant expires exactly 15 minutes after creation.
Progress, callback, UPLOADED transition and replay never extend it;
`now >= expiresAt` is expired, cannot revive, and cannot attach even if
provider bytes exist. This upload-grant TTL is distinct from the 300-second
maximum signed-read lifetime. Clinical/business purpose and physical format
are distinct. The first managed purpose is Case clinical/reference dental
photography, including shade/reference photos, with JPEG bytes only,
`.jpg`/`.jpeg` suffixes and canonical `image/jpeg` derived only after bounded
trusted content inspection of the exact provider object. UploadThing
callback `type` is not content proof. Original bytes are preserved without
silent recompression. PNG and scan/CAD formats are deferred; existing
`IMAGE | VIDEO | SCANNERFILE` is compatibility state, not the clinical
taxonomy. The approved evidence architecture is a separate one-to-one
immutable Case validation record linked to the grant and exact provider key.
It records measured bytes, verified format/suffix, decoded dimensions,
SHA-256 of inspected bytes, profile release and validation time, without
original filename, callback MIME or URL. An additive nullable Case clinical
purpose preserves legacy assets and provisional enum compatibility.
`StoredFile.detectedMimeType` retains its name and may hold `image/jpeg` only
from verified content. SHA-256 does not prove later provider-object
immutability. The five R001 byte/dimension/pixel/metadata ceilings are
approved. R001 additionally fixes 512 length-bearing structural marker
segments (including DAC even though arithmetic coding remains unsupported),
128 SOS segments in a progressive JPEG, and no deterministic decoder-work
score. One-component 8-bit grayscale remains supported beside three-component
JPEG. Structural acceptance belongs to LabOS's bounded marker inspector;
complete codec decoding belongs to direct strict libjpeg-turbo libjpeg API:
successful start, every output scanline read, output scanline count equal to
output height, successful finish, and all warnings/errors fatal. Sharp
`stats()` and raw-buffer output are not substitutes. Runtime containment and
native Node/Next helper packaging remain separate unresolved gates; no
executable production validator is accepted. Policy limits belong to the versioned validator, not
permanent database CHECKs; stable structural/equality/immutability rules
belong in the database. Provisional Case upload-widget types/limits are not
requirements. See the [clinical asset research packet](../evidence/files/authorization-v1/n-file-110-case-asset-create/clinical-asset-research-20260927.md),
[JPEG evidence baseline](../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-evidence-design-20260927.md)
and [approved V1 validation profile](../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-validation-profile-design-20260927.md).
The [R001 policy reconciliation](../evidence/files/authorization-v1/n-file-110-case-asset-create/jpeg-r001-policy-reconciliation-20260928.md)
records the exact five approved values and remaining engineering gates.
The [current R001 validator contract](../plans/authorization-v1/case-file-jpeg-r001-validator.md)
supersedes the earlier undecided segment/scan/work and candidate decoder
assumptions. The Sharp/libvips harness is retained as historical research only.

Existing URL-only rows do not establish file identity, ownership, provider
provenance, or read authority. Preserve them without destructive migration or
silent backfill. Unverifiable assets stay outside the new signed-read path
until individually reconciled through an approved process. A minimal
append-only audit foundation for Case signed-URL issuance is approved, limited
to actor, tenant, Case, asset, authorization outcome, and issuance event; it
does not authorize the full M6 audit program or sensitive payload logging.

This Case-only decision does not alter accepted Catalog, WorkType, Product, or
Dentist display contracts. N-FILE-110/111 remain unavailable for implementation
until the read-access design and any required schema, migration, and provider
decisions receive separate approval.

The [provider-independent design](../evidence/files/authorization-v1/d-file-04-read-access/persistence-migration-design.md)
is the accepted planning basis, not schema or implementation authority. Each
signed URL has a maximum lifetime of 300 seconds and requires fresh
authorization on every issuance. Case upload follows the existing explicit
Save Draft action; no automatic draft creation is approved. After a separately
approved read cutover, unreconciled URL-only assets retain their records and
clinical metadata but display as unavailable pending verification, with no
raw-URL fallback. Superseded file bytes, immutable version records, and
issuance-audit records are retained; no automatic purge is approved. Orphan
handling, provider deletion, legacy reconciliation, and changes to audit
retention are separate future decisions.

`case.read` is in the existing fixed role bundles; C1 implemented its
authoritative Case resolver and read policy and is code-level accepted.
D-FILE-02's `case.asset.add` remains approved
in principle, not activated in the permission catalog or bundles. The exact
add/replace bundle and resource-policy mapping requires separate Product
Owner approval before activation; no role hierarchy is inferred.

The attested development provider has `defaultACL=public-read` and
`allowACLOverride=false`. The Product Owner confirms the account is on the
free plan; private files are paid-only and unavailable for V1. The failed
dashboard save is no longer treated as an application defect to investigate.
Real private Case storage and signed access remain `NOT_RUN` and deferred.

The Product Owner approved the mixed-asset target contract: a Case with managed
clinical assets remains valid and readable. Case representation must retain
each managed asset's stable identity and clinically relevant metadata with a
content-unavailable state until authorized signed access exists, while
distinguishing legacy URL-backed assets under their current display contract.
It must not silently omit managed assets, expose provider identity, invent a
URL, or make omission from a legacy edit payload a deletion command. This is
architecture direction, not DTO/UI or writer implementation authority.
N-FILE-110A asset-safe persistence design precedes C2 read-contract
compatibility acceptance; both remain unaccepted pending separate approval.
The [read-only mutation inventory and dependency design](../evidence/files/authorization-v1/n-file-110a-case-persistence/design-review.md)
records the open transition for legacy in-form URL addition and explicit
legacy deletion. No managed deletion or provider cleanup is approved.

### D-FILE-05 — Dentist avatar attachment-only staging

Decision status: Approved

N-FILE-108 and N-FILE-109 may stage and attach a Dentist avatar through the
persisted, opaque one-time grant flow. The final authorized create or update
command may store the verified callback's provider URL in the existing
`Dentist.avatarUrl` display field. A browser-supplied URL, provider key, or
callback payload is never attachment authority; a grantless update preserves
the existing value. This decision neither selects nor implies any public,
private, or signed stored-file read model for Dentist. D-FILE-04 applies only
to Case clinical assets, and avatar removal/provider deletion is deferred.

## Financial decisions awaiting work

`A-096` payment idempotency/concurrency requires an approved persistence and concurrency design before payment recording. `A-087` paid/partial Invoice void behavior remains pending refund, credit, audit, and permission semantics; it is not unpaid cancellation. Database migrations and constraints require explicit approval.

## Platform ADR register

All entries below are current approved architectural decisions unless a row says deferred. Their rationale is to preserve modular boundaries, tenant isolation, and incremental delivery; consequences are the stated binding constraints on current implementation.

| ID | Status / current applicability | Decision and consequence |
| --- | --- | --- |
| ADR-001 | Approved / current | Organization is the SaaS membership and active-tenant boundary. |
| ADR-002 | Approved / current | Lab remains the LabOS dental-business tenant entity. |
| ADR-003 | Approved / current | Tenant-owned domain tables retain `labId`. |
| ADR-004 | Approved / current | Better Auth owns identity, Organization membership, active Organization, and invitation lifecycle. |
| ADR-005 | Approved target / migration active | `LabUser` and `AuthUser.labId` are transitional and are removed only after parity. |
| ADR-006 | Approved / current | `LabStaff` is separate from membership and links tenant-aware to Member. |
| ADR-007 | Approved / current | Permissions, not role names or hierarchy, are the authorization primitive. |
| ADR-008 | Approved / current | Fixed role bundles precede dynamic/custom roles. |
| ADR-009 | Approved / current | `StaffRoleCategory` is operational, not an authorization role. |
| ADR-010 | Approved / current | Resource authorization uses typed policies after tenant and permission checks. |
| ADR-011 | Approved target / current direction | Events use an in-process interface backed by transactional outbox for reliable effects. |
| ADR-012 | Approved / current direction | Audit is append-only infrastructure distinct from events and debug logs. |
| ADR-013 | Approved target | Workflow V1 is versioned with allowlisted conditions/actions. |
| ADR-014 | Approved target | Case is the first workflow consumer; migrate its lifecycle before QC. |
| ADR-015 | Approved target | `Case.status` is initially an atomically synchronized projection. |
| ADR-016 | Approved / current | Subscription/entitlements remain separate from membership and authorization. |
| ADR-017 | Approved / current | Platform administration is separate from Organization roles and needs audited elevation. |
| ADR-018 | Approved / current | Platform remains inside the LabOS modular monolith initially. |
| ADR-019 | Approved / current | Extract only after a second application proves reuse. |
| ADR-020 | Approved target | Introduce composite tenant-aware constraints incrementally by risk. |
| ADR-021 | Deferred / current | Database-managed RBAC v2 remains deferred until fixed roles prove insufficient. |
