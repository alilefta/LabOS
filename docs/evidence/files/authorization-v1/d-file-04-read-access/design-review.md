# D-FILE-04 Case clinical-asset design review

Status: historical initial review; provider-independent design completed in
[persistence-migration-design.md](persistence-migration-design.md), with provider
activation still blocked
Date: 2026-09-24
Scope: read-only design and target attestation after approval of the Case-only
private signed-access policy; no implementation, migration, provider change,
or runtime-verification scenario

The Product Owner approved the read rule, saved-DRAFT target, stable clinical
asset identity and version history, preservation of unverifiable URL-only
rows outside signed read, and a minimal append-only issuance-audit foundation.
These target decisions are now in the canonical decision. The subsequent
[read-only attestation](read-only-attestation.md) found that the existing
development provider project disallows per-request ACL overrides. Under the
Product Owner stop condition, items below remain preliminary design, not an
implementation-ready plan. The subsequent Product Owner direction authorized
completion of the provider-independent design while leaving the provider gate
unresolved. The linked design is the current proposal; this document records
the earlier findings and must not be read as current approval for implementation.

## Approved policy boundary

The [canonical decision](../../../../architecture/decisions.md) requires
private Case assets, authenticated Case/tenant authorization before short-lived
signed-URL issuance, and issuance audit. No per-byte proxy or public sharing is
in scope. Signed URLs are bearer capabilities: audit identifies the issuer,
not the eventual downloader, and authorization revocation cannot immediately
invalidate an already-issued URL. Accepted Catalog, WorkType, Product, and
Dentist display contracts are unchanged.

## Design findings and proposed contracts

1. **Platform identity.** Add an immutable platform file ID and durable file
   metadata: Organization, Lab, uploader Member, provider, opaque provider key,
   purpose, detected MIME, size, checksum, lifecycle state, and timestamps.
   Keep provider key server-only and never persist signed URLs. `CaseAssetFile`
   retains its clinical title/type and links to the platform file ID. Current
   `FileUploadGrant` is staging proof, not durable file identity
   (`prisma/schema.prisma`, `FileUploadGrant` and `CaseAssetFile`).
2. **Legacy URLs.** Current `CaseAssetFile.documentUrl` and Case DTO/UI paths
   expose provider URLs. The new read boundary must not use URL possession as
   authority or fall back to that URL. Inventory rows first; backfill a provider
   key only from independently verified provider identity, not URL parsing.
   Unverified rows remain legacy/unmanaged pending explicit disposition.
3. **Ownership.** Resolve authenticated Organization/Member/Lab, then the
   identifier-only Case and asset. Verify asset -> Case -> Lab and file ->
   Lab/Organization consistency before provider access; revalidate in the
   final attachment/replacement transaction. Caller IDs select candidates,
   not tenant or ownership facts.
4. **Read policy.** `case.read` is resource-scoped in the permission catalog,
   but a Case target resolver and policy are not registered in
   `modules/labos-authorization/operational.adapters.ts`. Approved rule:
   apply Authorization V1 Case policy to Owner/Admin/Manager, not role-name
   inference; Staff additionally need active authoritative assignment to the
   Case. Missing facts or policy support deny. No file key or URL substitutes.
5. **Issuance and audit.** Propose a server-owned maximum five-minute URL TTL,
   reauthorization on every issuance, and no URL/key in ordinary DTOs, logs,
   or persistence. Audit allowed and denied issuance with actor Member,
   Organization/Lab, Case, asset, outcome, purpose, correlation, and time.
   The canonical Audit module is proposed but not implemented; telemetry and
   `CaseActivityLog` are not silently equivalent to append-only audit.
6. **Provider.** UploadThing documents private ACLs and `generateSignedURL`.
   The existing `caseAssetsRoute` declares no private ACL. Read-only project
   attestation confirmed `defaultACL=public-read` and
   `allowACLOverride=false`. This is a material blocker to Case-only private
   upload in the existing project. A global default change could disturb
   accepted Catalog/Dentist display behavior; a Case-only override requires
   separate configuration approval. Verify unsigned denial and signed expiry in
   a separately authorized runtime packet. See
   [ACL documentation](https://docs.uploadthing.com/concepts/regions-acl) and
   [UTApi documentation](https://docs.uploadthing.com/api-reference/ut-api).
7. **N-FILE-110 target.** D-FILE-02 authorizes Case-targeted attachment. The
   current new-Case UI can upload before a Case exists and hands a provider URL
   to the form. The approved route targets an already-persisted DRAFT Case;
   new-Case UX must sequence draft persistence before staging, without a new
   workflow transition. Targetless or unsaved-Case grants are excluded.
8. **N-FILE-111 identity.** Stable `CaseAssetFile.id` across replacement is
   approved. The proposed implementation creates a new immutable platform
   file and atomically switches the current association while durably linking
   prior/current versions. Existing
   edit logic deletes omitted asset rows; it cannot be reused as replacement.
   Metadata edit, replacement, logical removal, retention, and provider purge
   require distinct commands and authority.
9. **Migration and rollback.** Propose additive file metadata plus nullable
   Case file reference, legacy inventory, verified backfill, then explicit
   read cutover and later contract. Do not claim old public URLs have become
   private. Rollback should disable new Case boundaries while retaining
   additive metadata and audit; it must not re-expose clinical URLs. Schema,
   migration, backfill, provider changes, and rollback each require approval.
10. **Reviewable slices.** Recommended sequence: Case resolver/assignment
    policy; minimal append-only issuance audit; platform file schema/repository
    and migration; Case-only private provider adapter and attestation; legacy
    inventory/backfill; N-FILE-110 staging/transactional attachment; separate
    signed-access boundary; N-FILE-111 replacement. Deletion and public links
    are excluded. Each sensitive implementation slice needs independent V3
    `CODE` review, with runtime claims in a separately approved packet.

## Remaining gates

- Product Owner must separately authorize a Case-only provider ACL override
  setting (or choose another design if unavailable). No global default change
  is authorized. Re-attest the effective setting after any approved change.
- The exact draft-persistence UX sequence, platform file/version/audit schemas,
  migration/backfill/rollback plan, and narrow implementation slices still
  need completion and separate approval. Three existing URL-only rows require
  individual provenance reconciliation; no silent backfill or deletion.
- The proposed five-minute maximum TTL remains a design parameter, not a
  separately approved fixed value. Any material policy change returns to the
  Product Owner before implementation.

N-FILE-110/111 remain unavailable for implementation. This review did not
alter application code, accepted upload evidence, Product PRV-08, schema,
provider state, or runtime data.
