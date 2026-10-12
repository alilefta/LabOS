# UT-EVID-01 — UploadThing support guarantees

Record date: 2026-10-08 (LabOS preservation date, **not** the email date). Source: direct UploadThing support email signed “Mark,” supplied in two Product Owner chat messages: the original inquiry and the reply. Original headers, email date, ticket ID, and a provider-authenticated copy were not supplied. Product context: UploadThing 7.7.4 / UTApi. Text inside the two fences preserves the wording supplied; paragraph spacing follows the chat paste and is not attested as original email formatting. No email addresses, credentials, tokens, or other personal details are retained.

The earlier [UploadThing exact-key capability packet](../n-file-110-case-asset-create/uploadthing-capability-20261005/packet.md) records what was known on 2026-10-05. This later correspondence does not retroactively change its historical `CAPABILITY_BLOCKER` finding. The accepted [UploadThing → R2 roadmap](../../../../plans/authorization-v1/uploadthing-r2-migration-repository-review.md) remains in force.

## Original inquiry — verbatim

```text
Hi! I'm implementing safe orphan-file cleanup using UploadThing and need clarification on the lifecycle semantics of `fileKey`.

I'm using UploadThing 7.7.4 / UTApi and store the returned `fileKey` as the authoritative identity of an uploaded object.

I need to clarify a few guarantees:

1. **File-key reuse:** Once a file has been deleted, can its exact `fileKey` ever later be assigned or rebound to a different uploaded object in the same UploadThing application?
2. **Deletion semantics:** When `deleteFiles(fileKey, { keyType: "fileKey" })` returns `success: true` and `deletedCount: 1`, does that mean deletion has completed, or can deletion/visibility be eventually consistent?
3. **Authoritative absence:** What is the supported API for determining that no current UploadThing object exists for an exact `fileKey`?

`getFileUrls()` can currently be queried by `fileKey`, but it is deprecated. If it returns no entry, is that an authoritative indication that the key currently has no object?

4. **Replacement API:** What should applications use instead of `getFileUrls()` when they need an exact-key existence/absence check?
5. **Idempotency:** Is deleting an already-deleted/nonexistent `fileKey` guaranteed to be safe/idempotent?
6. **Ambiguous requests:** If `deleteFiles()` times out or the connection fails before a response is received, is it safe to retry deletion of the same `fileKey`?

I'm specifically trying to implement crash-safe orphan cleanup where the database marks an upload permanently ineligible before provider deletion, and deletion may need to be retried after process/network failure.

I'm looking for the provider guarantees I can safely rely on rather than just observed SDK behavior. Thanks!
```

## Vendor response — verbatim

```text
Hi,

Yes, your overall approach of marking the upload permanently ineligible in your database before attempting provider deletion is the right model.

A few specifics:

1. File-key reuse: `fileKey`s are generated so that the same valid key will not be issued for another upload. You can treat a `fileKey` as the stable identity of that upload and assume it will not later be rebound to a different object.

2. Deletion semantics: `deleteFiles()` is asynchronous with respect to the underlying storage provider. A response of:

{ success: true, deletedCount: 1 }

means the file was successfully marked for deletion in UploadThing and deletion was queued. It does not mean the object has necessarily already been removed from the backing storage/CDN by the time the call returns.

Once marked for deletion, the file is no longer treated as an active UploadThing file. The storage deletion happens shortly afterward.

3. Authoritative absence: `getFileUrls()` currently queries UploadThing's active file records. Files marked for deletion are excluded, so an empty result for an exact `fileKey` means there is no active UploadThing object for that key from the API's perspective.

That should be distinguished from asking whether every underlying storage/cache copy has physically disappeared at that exact instant, since the latter deletion is asynchronous.

4. Replacement for `getFileUrls()`: There currently isn't a direct replacement API intended specifically as an exact-key existence check. `getFileUrls()` was deprecated because constructing/accessing file URLs no longer requires an API lookup, rather than because it was replaced with another existence-check method.

For orphan cleanup, I would avoid making a pre-delete existence check part of the algorithm. `deleteFiles()` itself is the better primitive.

5. Idempotency: Yes. Deleting a nonexistent or already-deleted/previously-marked `fileKey` is safe. The request succeeds and `deletedCount` will be `0` when there is nothing new to mark for deletion.

6. Ambiguous requests / retries: Yes. If the request times out or the connection drops before you receive a response, it is safe to retry `deleteFiles()` with the same `fileKey`.

So a crash-safe flow can simply be:
1. Permanently mark the upload ineligible in your DB. 2. Call deleteFiles(fileKey). 3. If the result is unknown because of a timeout/network/process failure, retry. 4. Continue retrying until you receive a successful response.
You don't need to distinguish between "the previous delete never reached UploadThing" and "the previous delete succeeded but the response was lost." In the latter case, the retry will just succeed with `deletedCount: 0`.

One nuance: I would treat `success: true` as acknowledgement that UploadThing accepted the deletion state transition, rather than proof that the backing storage object has already been physically removed.

Best,

Mark
```

## LabOS interpretation — separate from vendor wording

| Topic | Narrow interpretation |
| --- | --- |
| File-key identity | A valid `fileKey` is stable for its upload and will not be issued again or rebound to a different object in the same UploadThing application. This is not a physical-deletion guarantee. |
| Delete response | `{ success: true, deletedCount: 1 }` acknowledges an UploadThing logical deletion mark and queued backing-store deletion, not physical removal completion. |
| Empty lookup | Empty exact-key `getFileUrls()` means no active UploadThing file record from that API's perspective. It does not prove every storage/CDN copy is gone. |
| Replacement check | Support confirms no dedicated replacement exact-key existence API at the time of its response and recommends `deleteFiles()` over pre-delete lookup for orphan cleanup. |
| Idempotency | Repeating exact-key deletion for an absent or previously marked key is safe and can succeed with `deletedCount: 0`. |
| Ambiguous outcome | Retry the same-key deletion after a timeout or lost response. The prior attempt may already have been accepted; a successful retry may report zero. |

## Limits and Product Owner disposition

- No original email timestamp, ticket ID, full headers or independently authenticated email artifact is available. “Mark” is retained only as the response signature.
- Support did not provide a time bound for physical storage/CDN deletion, a physical-absence certificate, a CDN purge guarantee or a dedicated replacement existence API. An empty active-record lookup and a successful delete response cannot establish physical absence.
- This is UploadThing vendor correspondence, **not R2 runtime evidence**. It does not alter the accepted ObjectStorage semantic port, R2 permanent key allocation, expiry-fenced deletion, authoritative absence requirement or A1 cleanup state machine.
- **Product Owner decision:** Cloudflare R2 remains the intended backend for new Case clinical assets. Existing UploadThing-backed workflows remain supported during migration. The accepted R2 A1 cleanup architecture is unchanged. This response is reference evidence, not authority to change cleanup semantics, resume A1-I1, implement A1-I2 or activate N-FILE-110.
