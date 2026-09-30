# N-FILE-110 private-provider capability checkpoint

**Superseded for V1 by Product Owner decision (2026-09-29):** The account is
confirmed UploadThing Free; private files are paid-only and will not be used
before the product reaches at least 10 users. Public-read Case storage is
accepted with an explicit lack of direct-URL confidentiality. The historical
read-only observations below remain accurate, but `BLOCKED_CAPABILITY` and
the proposed ACL-override retry are no longer current V1 routing. See the
amended [D-FILE-04 decision](../../../../architecture/decisions.md).

Status: `BLOCKED_CAPABILITY`. The attested development app cannot currently override its public default ACL for a Case-only private route. Case upload activation remains blocked.
Date: 2026-09-29. Scope: read-only repository, installed SDK, official documentation, and development app-info query. No provider setting or object changed.

## Evidence classes

| Claim | Evidence class | Finding |
| --- | --- | --- |
| Platform private ACL | Documented provider capability | UploadThing documents `public-read` and `private`; private files require short-lived signed access. Private files and regions are documented as paid-plan features. [Regions and ACL](https://docs.uploadthing.com/concepts/regions-acl) |
| Case-only private route | Documented provider capability, not verified for this app | File-route config accepts `acl: 'private'` only when dashboard per-request ACL override is enabled. The default may remain public for existing non-Case routes. [File routes](https://docs.uploadthing.com/file-routes) |
| Current development app | Capability verified for actual app, read-only | `POST /v7/getAppInfo` returned app ID SHA-256 prefix `2e77ac21b101` (matching retained attestation), `defaultACL=public-read`, `allowACLOverride=false`. Only those safe fields were retained; no credential or response secret was logged. The read-only query did not change settings. |
| Prior setting failure | Retained empirical evidence | The earlier attempt to enable override returned `Failed to update access controls`; a subsequent read showed unchanged settings. The cause and paid entitlement remain unproven. [Readiness packet](readiness-20260927.md) |
| Cause of failure | Documented possibility versus unknown | Paid-plan requirement is a plausible explanation from the ACL documentation, not proof of this account's plan or the save failure. Account permissions, validation and transient service failure are unverified possibilities, not documented diagnoses. `getAppInfo` exposes no entitlement/error cause. |
| Installed integration | Repository and installed SDK observation | `uploadthing@7.7.4`; `caseAssetsRoute` rejects in middleware and callback. Other routes are unchanged. Its verified callback type includes `file.key`, URLs, `size`, `type`, and `fileHash` (documented in installed type as MD5 hex). None is independently verified JPEG content or proof of immutability. [Callback security](https://docs.uploadthing.com/concepts/auth-security) |
| Private retrieval | Documented provider capability and installed SDK observation, not verified for this app | `UTApi.generateSignedURL(key)` exists in 7.7.4 and is documented for private files. Server can use the persisted key to generate a short-lived URL and fetch bytes; this is an access mechanism, not a resource identity. Actual private-object retrieval and bounded streaming are NOT RUN. [UTApi](https://docs.uploadthing.com/api-reference/ut-api), [Working with files](https://docs.uploadthing.com/working-with-files) |
| Replacement/version identity | Unverified assumption | Reviewed provider docs and installed callback types supply no object-version ID, immutable-object guarantee, or trusted post-upload digest suitable to prove that future bytes still equal inspected bytes. `fileHash`/MD5 does not replace LabOS SHA-256 over inspected bytes. Do not infer immutability from a stable key or absence of an overwrite API in the reviewed SDK. |

## Proposed binding contract, not implementation authority

1. Authorize `case.asset.add` against the saved authoritative DRAFT Case and create the existing target-bound PENDING grant. The server must reserve/bind provider identity to that grant before callback acceptance; the precise UploadThing prepare-upload/key handoff needs a bounded live test. Browser values are selectors only.
2. A verified UploadThing callback supplies a key to compare with the server-bound grant, not tenant/Case authority. Do not use its URL, filename, MIME or size as content proof. The approved 15-minute expiry does not restart on callback.
3. After confirming private ACL, server-side code derives a short-lived access URL from the reserved key. It must never accept an arbitrary browser URL, must constrain the destination to the attested app/file host and exact key, disable unsafe redirects, and bound transfer/spool. The generated URL is not persisted as identity.
4. Feed one immutable bounded byte sequence (single spool/buffer, no second mutable fetch) to SHA-256, the LabOS marker inspector and strict direct-libjpeg decoder. Successful evidence binds grant, tenant, Case, provider/key, digest, measured size and R001 release. If a second provider read can return different bytes, attachment/delivery needs an approved version/immutability guarantee or explicit revalidation protocol; the present docs do not establish that guarantee.
5. Final attachment freshly revalidates Case/tenant/authorization and consumes exactly that verified grant/evidence into `StoredFile` and immutable `CaseAssetFileVersion` transactionally. `StoredFile.providerObjectKey` is server-bound, not inferred from a URL. Existing legacy assets and non-Case routes remain unchanged.

## Remaining runtime proof and next authority

Read-only evidence cannot establish actual account entitlement, explain the failed setting save, prove Case-only private upload, or prove private-object retrieval and key stability. Obtain provider/account-owner confirmation of entitlement and the failed-save reason first. The smallest subsequent live provider operation requiring separate Product Owner authority is one supported, targeted attempt to enable `allowACLOverride` on the same attested development app, leaving `defaultACL=public-read` and existing file ACLs unchanged, followed by a read-only setting re-attestation. Stop on failure; do not retry, change plan/project, or fall back to public clinical storage. Only after that capability is proven should a separately authorized, run-marked synthetic private upload/retrieval test verify unsigned denial, exact reserved-key/callback binding, server-signed byte retrieval, non-Case behavior, and exact object cleanup with independent V3 runtime review. No such setting attempt or object test is authorized by this packet.

No live provider operation was performed here. A later production helper packaging/containment decision is separate and cannot be inferred from this capability checkpoint.
