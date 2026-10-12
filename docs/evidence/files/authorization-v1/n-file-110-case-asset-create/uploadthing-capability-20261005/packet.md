# UploadThing exact-key ownership/deletion/absence capability decision

Date: 2026-10-05. Scope: provider capability/architecture decision and a bounded run-owned synthetic observation. **Decision: `CAPABILITY_BLOCKER`.** N-FILE-110 remains inactive. No LabOS grant, Case, evidence, StoredFile, route, schema, migration or existing provider object was touched.

## Source and environment identity

- Installed `node_modules/uploadthing/package.json` and `pnpm-lock.yaml`: **7.7.4**. Repository `package.json` declares `^7.7.4`; the resolved installed version, not the semver range, was exercised. The accepted Case retrieval adapter already uses `getFileUrls(key, { keyType: 'fileKey' })` to locate the reserved object; no cleanup adapter exists.
- [Official UTApi documentation](https://docs.uploadthing.com/api-reference/ut-api), read 2026-10-05, documents `deleteFiles` with file keys, `keyType: 'fileKey'`, deprecated `getFileUrls`, and paginated `listFiles`. It recommends storing needed metadata in the application's own database rather than relying on provider API calls for core flow.
- [Official uploading guide](https://docs.uploadthing.com/uploading-files), read 2026-10-05, describes generating a key from app ID and a caller-selected file seed and says the seed **should** be unique for each file. That is guidance for key generation, not an explicit provider promise of permanent nonreuse after deletion. The guide also describes provider-generated presigning through `/v7/prepareUpload` but gives no post-delete nonrebinding guarantee.
- [Official file access guide](https://docs.uploadthing.com/working-with-files), read 2026-10-05, documents public URL construction and private signed access. It does not define an authoritative existence/absence query. The current [REST/OpenAPI page](https://docs.uploadthing.com/api-reference/openapi-spec), read 2026-10-05, lists `/v6/deleteFiles` and `/v6/listFiles` but exposes no explicit permanent key-nonreuse, deletion visibility, or authoritative-zero semantics in the reviewed page.
- Installed 7.7.4 `server/index.js` sends exactly `{fileKeys:[key]}` to `/v6/deleteFiles` for `keyType: 'fileKey'` and decodes `{success:boolean, deletedCount:number}`. Its `getFileUrls` sends `{fileKeys:[key]}` to `/v6/getFileUrl` and decodes `{data:[{key,url}]}`. This is **SDK mechanics**, not an infrastructure consistency promise. No supported exact-key authoritative-absence replacement for deprecated `getFileUrls` was identified in current official documentation. `listFiles` is paginated, administrative, and explicitly discouraged as a primary data source; direct URL construction/generation is not an existence query.

## Ten independent capability answers

Each answer carries one evidence class. `AUTHORITATIVE` means an explicit current provider contract for the stated narrow fact; `OBSERVED` describes this run only; `INFERRED` is analysis; `UNKNOWN` means the required guarantee was not established.

| # | Question | Class | Answer |
| --- | --- | --- | --- |
| 1 | Is a fileKey permanently bound to one object within the app? | **UNKNOWN** | Docs describe a per-file key and unique-seed guidance, but no permanent binding contract. |
| 2 | Can a deleted key be rebound/reused? | **UNKNOWN** | No reviewed official statement forbids it. Distinct keys from two uploads do not answer this. |
| 3 | What does successful `deleteFiles` guarantee? | **UNKNOWN** | Official docs say the method requests deletion for specified keys; they do not define whether a success response proves completed physical deletion or durable absence. The `{success, deletedCount}` fields are exact pinned-SDK mechanics; this run observed `{true,1}`. |
| 4 | Is there an authoritative exact-key existence/absence operation? | **UNKNOWN** | `getFileUrls` returns keyed URL entries but is deprecated; docs do not call its zero result an authoritative absence certificate. |
| 5 | Does zero exact-key lookup authoritatively mean no current object? | **UNKNOWN** | Zero was observed, but no reviewed provider guarantee makes it definitive. |
| 6 | What post-delete consistency model applies? | **UNKNOWN** | No documented read-after-delete/consistency bound was found. |
| 7 | Can delete return before exact reads show absence? | **UNKNOWN** | This run saw immediate zero, which cannot rule out lag on other runs or regions. |
| 8 | Is deleting an already-absent key idempotent? | **OBSERVED** | One repeated delete returned `{success:true, deletedCount:0}` with zero lookup afterward. No durable API guarantee was found. |
| 9 | What does timeout/network ambiguity imply? | **INFERRED** | A lost response cannot establish whether the provider applied deletion; treat outcome as unknown and do not acknowledge cleanup. No authoritative stronger semantic was found. |
| 10 | Supported replacement for deprecated `getFileUrls`? | **UNKNOWN** | Docs point to direct URL access for serving files, not a durable exact-key existence/absence API. Paginated `listFiles` is not an authoritative exact-key replacement. |

## Required capability matrix

| Required capability | Authoritative evidence | Probe observation | Decision |
| --- | --- | --- | --- |
| Exact file-key identifies target | Official UTApi accepts `fileKey` for delete; SDK sends one exact `fileKeys` entry | Both run-owned keys returned one matching lookup before deletion | **AUTHORITATIVE** for request targeting only |
| Deleted key cannot be rebound/reused | None found; unique-seed guidance is not a nonreuse promise | Two independent upload keys differed | **UNKNOWN — blocker** |
| Delete success semantics | Docs describe key deletion request; installed SDK returns success/count | First delete `{true,1}` | **UNKNOWN** for completed/durable physical deletion |
| Exact-key authoritative absence query | None found; `getFileUrls` deprecated | Exact-key lookup returned zero after delete | **UNKNOWN — blocker** |
| Post-delete consistency semantics | None found | Immediate and later bounded zeros | **UNKNOWN** |
| Already-absent deletion semantics | None found | Repeat `{true,0}`, followed by zero | **OBSERVED** only |
| Timeout/ambiguous outcome semantics | None found | Delete timeout was not injected; the initial upload was network-restricted and returned `UPLOAD_FAILED` without a key | **UNKNOWN** provider outcome; fail closed |
| Supported replacement for deprecated lookup | Docs recommend URL construction/access, not existence proof; `listFiles` paginated/admin | Run-name inventory worked after network access | **UNKNOWN** for authoritative exact-key absence |

The **`CAPABILITY_PASS` threshold is not met**: neither permanent/nonrebinding key identity nor authoritative absence confirmation has explicit provider support in the reviewed material. A successful synthetic delete and repeated empty lookups cannot upgrade those claims. No cleanup schema/CODE or activation follows from this packet.

## Bounded synthetic runtime observation and exact cleanup

Run ID `7947b03b84e14fb8ad4d18219760a535`; UploadThing development application ID `fyylnhrlmu`, attested from the development token claims without exposing its credential. Node 24.21.0, installed UploadThing SDK 7.7.4. The two payloads were distinct 71-byte run-marked plain text, not JPEG or clinical data. Keys/URLs were not retained in this packet; the temporary exact-key manifest was removed after both keys returned zero. The retained [probe source](probe.mjs), [recovery source](recover.mjs), [sanitized event log](sanitized-result.json), and [final run-name inventory](recovery-result.json) contain no token, provider URL or raw key.

Initial sandboxed upload returned `UPLOAD_FAILED` without a key. After a bounded reporting fix, the same boundary repeated. A read-only run-name inventory outside the network sandbox found zero exact synthetic names. The authorized network-access retry then uploaded two run-owned files and persisted each returned exact key only in the temporary run root for cleanup. Their SHA-256 key fingerprints were `92776e8c1969ebd0` and `45672f44eb70400b`; the two keys differed. Each present lookup returned cardinality 1 and exact-key equality.

For the first key, `deleteFiles(key,{keyType:'fileKey'})` returned `success=true, deletedCount=1` at 13:58:33.945 UTC. Exact-key lookup returned zero immediately at 13:58:34.604 UTC and after bounded waits of 250 ms, 1000 ms, and 3000 ms, then still zero after repeat deletion. Repeated deletion returned `success=true, deletedCount=0`. In `finally`, both run-owned keys had zero exact-key lookup results; the second key's cleanup delete returned `success=true, deletedCount=1`. A separate full one-page, run-name-filtered provider inventory at 13:59:24.023 UTC reported zero exact run-owned names. These are **OBSERVED**, not provider guarantees. No key collision or reuse was attempted.

Sanitized artifact SHA-256: `probe.mjs` `bb422d5ce2b53c645fb2e325a532871ff58ce684713e4015e6166ddb0c155356`; `sanitized-result.json` `0e2cfe5b4d7e54ff7be965548d65e470ed3e17687b65972bd6208eaab7a620d7`; `recover.mjs` `6d26fdbf0c507ebde98d0bd90ecf11341aba5df1f2b305b180d191e800bcff37`; `recovery-result.json` `2c57be9c17ac6e58225abfacc0291a8cf8a090cfa32d2f985b65e3c6bdabb186`. Exact local run-root removal and absence are attested below.

## Decision, review, and successor

**`CAPABILITY_BLOCKER`** for key-based orphan deletion. The accepted cleanup architecture's database terminalization/race design remains valid, but actual deletion is not authorized without a provider contract for permanent key nonreuse and authoritative exact-key absence. The seed guidance is caller advice; randomness and this finite probe cannot fill either gap. UploadThing provider/maintainer attestation must also specify delete-response, post-delete consistency, already-absent and timeout semantics, and the supported exact-key absence API. If those guarantees are unavailable, the cleanup architecture must return for a stronger immutable provider-object/version identity mechanism rather than activating key-only deletion.

Independent V3 verdict: **PASS | RUNTIME_EVIDENCE + CHECKPOINT** on the correctness of this `CAPABILITY_BLOCKER` classification. The read-only reviewer independently checked current official UploadThing docs, installed 7.7.4 SDK mechanics, retained artifact hashes, synthetic events and exact cleanup. It found no `OBSERVED → AUTHORITATIVE` promotion. This is review acceptance of the decision packet, **not** provider capability acceptance; the missing provider guarantees remain unresolved.

**Exactly one recommended next action:** obtain a written, attributable UploadThing provider/maintainer attestation that answers permanent fileKey nonrebinding, authoritative exact-key absence and supported lookup, plus deletion/consistency/idempotency/timeout semantics for the pinned application/API. Do not begin cleanup schema/CODE on the basis of this probe.

Local run-root cleanup: **PASS**. The exact resolved `F:\Software_Engineering\Phase 1 Web Development\Project 7 Freelancer Command Center\next-projects\lab-os-project-4\.tmp\ut-capability-7947b03b84e14fb8ad4d18219760a535` was verified inside the workspace's `.tmp` directory, contained no remaining exact-key manifest, was removed, and was verified absent. Provider run-owned inventory: zero exact synthetic names as above; no unrelated objects were deleted. Sanitized source and logs remain only in this durable evidence directory.
