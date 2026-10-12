# N-FILE-110 Case provider handoff CODE checkpoint

Date: 2026-09-30  
Tier: V3 Sensitive  
Acceptance: `PASS | CODE` after independent review  
Runtime activation: `NOT_RUN`

## Implemented boundary

`app/api/uploadthing/case-clinical-route.ts` defines a Case-only UploadThing 7.7.4 route candidate for one declared `image/jpeg` at a 32 MB (33,554,432 byte) transport ceiling. The middleware rejects zero/oversize, wrong declared MIME, wrong suffix, or multiple files before calling the previously accepted `stageCaseAsset` writer. That writer takes strict `{caseId}`, locks a saved DRAFT, derives canonical tenant/Member, applies transaction-fresh `case.asset.add` including active Staff assignment, and creates a 15-minute target-bound PENDING grant. The route requests a 15-minute presigned upload lifetime and does not set an ACL override; UploadThing Free's default is public-read. This candidate is **not registered** in `labOSUploadRouter`; the existing `caseAssetsRoute` remains unavailable.

The installed SDK's `generateKey` hashes route-selected file properties and app identity into an opaque provider key. This candidate supplies a fresh server UUID as its hash part, with no Case, Organization, Lab, patient, or client filename in that seed. The key is still provider-public object identity, not LabOS authority or a confidentiality guarantee. UploadThing's browser upload protocol can expose its direct public URL to the uploader.

The verified callback forwards only server middleware metadata `{uploadGrantId}` and UploadThing's `file.key` to the Case reservation service. A serializable transaction locks that grant, checks boundary/purpose, exact Case target, Organization/Lab/Member, provider, PENDING status, expiry using the database clock, current DRAFT Case, and transaction-fresh `case.asset.add` with current Member role and assignment. It reserves the exact key once. An identical same-key callback is acknowledged only while still live; a different key, expired/terminal grant, revoked assignment/membership, or inconsistent scope rejects. The existing unique key and migration-49 identity guard provide additional persistence enforcement.

| Field/state | Before callback | After accepted callback |
| --- | --- | --- |
| `FileUploadGrant.status` | `PENDING` | `PENDING` |
| `provider` | `UPLOADTHING` | `UPLOADTHING` |
| `providerFileKey` | null | exact opaque callback key |
| `providerFileUrl`, `uploadedAt` | null | null |
| expiry, Case target, tenant, creator | server-established | unchanged |
| successful clinical evidence, StoredFile, version, Case asset | absent | absent |

No callback name, declared MIME, size, provider hash, or URL is retained as clinical evidence. These values do not prove JPEG content. The subsequent validator must retrieve and inspect the exact object by the reserved key and resolve filename/suffix provenance under its own bounded design. Neither a raw public URL nor a browser callback claim can authorize attachment. C3 `ISSUED` is unused.

## Verification and limitations

Writer: 92 focused tests across eight suites passed, covering the candidate route, callback reservation, saved-DRAFT staging, shared grant lifecycle/telemetry, existing provider routes, and N-FILE-110A preservation. TypeScript `--noEmit`, Prisma validation, and candidate ESLint passed. Independently, the V3 Reviewer inspected the actual code, installed schema/SQL and UploadThing 7.7.4 behavior and returned `PASS | CODE` with no findings. The Reviewer also ran focused/static checks.

Real provider callback authenticity, public ACL observation, object bytes, key-to-byte stability, filename provenance, browser URL propagation, provider/framework logging, database concurrency/trigger behavior for this code path, and cleanup were `NOT_RUN`. No real object was created. The candidate route remains unregistered and N-FILE-110 runtime activation is not accepted. The next bounded gate requires separate authority for exact-key JPEG R001 retrieval and validation; cleanup, first attachment, and runtime activation remain later gates.
