# D-FILE-04 stored-file read/access readiness review

Status: Historical proposal; D-FILE-04 Case policy approved 2026-09-24
Date: 2026-09-24
Scope: read-only architecture review before N-FILE-110/111; no runtime or implementation

The later Product Owner decision is recorded in the canonical
[D-FILE-04 decision](../../../../architecture/decisions.md). The remaining
implementation-design gates are in [design-review.md](design-review.md).

## Repository facts

- D-FILE-04 is pending. Upload authority and URL possession do not confer read
  authority; Case asset activation remains blocked. See
  [decisions](../../../../architecture/decisions.md) and
  [Files architecture](../../../../architecture/modules/files.md).
- D-FILE-02 approves `case.asset.add` for Case attachment, with authoritative
  Case assignment for Staff. It does not decide clinical-byte reads.
- The current Case model stores `CaseAssetFile.documentUrl` without a platform
  file identity or provider key (`prisma/schema.prisma`, `CaseAssetFile`). The
  legacy Case upload UI passes UploadThing's URL into forms; the add action
  accepts a client URL; Case viewers render/download that URL directly. These
  paths are not an approved private read policy.
- `caseAssetsRoute` is a generic authenticated legacy route, not a Case-targeted
  upload-grant boundary. The existing Case read vocabulary includes `case.read`;
  an asset-specific read rule has not been selected.
- D-FILE-05 is attachment-only for Dentist and explicitly leaves D-FILE-04
  pending. No accepted Category, WorkType, Product, or Dentist checkpoint is
  reopened by this review.

## Proposed decision for Product Owner

Treat Case clinical assets as private by default. Return only a stable LabOS
asset ID and safe metadata in ordinary Case DTOs. For each preview/download,
authenticate and resolve canonical Organization, Member, and Lab; authorize
`case.read` on the authoritative Case; additionally require active Case
assignment for Staff; verify asset-to-Case-to-Lab consistency; then issue a
short-lived provider signed URL (proposed maximum five minutes). Keep provider
keys and permanent URLs server-only. Audit issuance and denial using allowlisted
IDs, purpose, and correlation, never URL, key, token, or clinical content.

This is a recommendation, not approval. Product Owner must choose whether
unauthenticated clinical sharing is excluded from N-FILE-110/111 and whether
auditing URL issuance is sufficient or every byte transfer must be mediated by
an application proxy. A proxy has materially different streaming and audit
costs. Public clinical URLs are not recommended because possession would grant
access. Public share links, if needed, require a later distinct policy.

## Consequences and prerequisites

- A subsequent approved design must define platform file metadata and a
  Case-to-file-ID association. Current URL-only rows require an inventory and
  explicit compatibility/backfill disposition; no private-access claim may be
  made for legacy permanent URLs.
- New-Case upload needs an authoritative Case target before staging, or an
  independently approved targetless creation policy. Do not infer either from
  the legacy form.
- Replacement must be distinct from deletion. N-FILE-111 must not silently
  authorize omitted-row deletion, physical provider deletion, or retention
  changes; those need their own policy and boundary.
- Verify effective provider private ACL and signed-access capability before
  runtime acceptance. Repository package/API capability alone does not attest
  the development provider's effective configuration.
- Only after D-FILE-04 approval should a separate bounded architecture/schema
  and migration design precede N-FILE-110/111 implementation authorization.

No application code, schema, provider configuration, runtime data, or accepted
upload evidence was changed for this review.
