---
plan_id: N-FILE-110-A1-OBJECT-STORAGE-CLEANUP
title: Case OBJECT_STORAGE rejected and orphan cleanup architecture and SQL design
status: REVIEWED_AWAITING_PRODUCT_OWNER
milestone: M4 Authorization V1
workstream: Files / N-FILE-110
owner: PRIMARY
created: 2026-10-08
updated: 2026-10-08
---

# A1 — OBJECT_STORAGE cleanup design

This is a design candidate under the approved [activation-readiness plan](n-file-110-activation-readiness.md). It authorizes no implementation, migration, provider operation, database mutation, scheduling or activation. Scope is N-FILE-110 Case grants with `provider = OBJECT_STORAGE`. Historical UploadThing cleanup is lifecycle context, not an approved schema or implementation for this path. A2–A5 remain separate.

## Installed facts and persistence decision

Installed `FileUploadGrant` has `PENDING, UPLOADED, CONSUMED, FAILED, EXPIRED, CLEANED`, unique `providerFileKey`, and `providerDeletedAt`, `cleanupAttemptCount`, `lastCleanupAttemptAt`, `cleanupFailureCode`. Its `expiresAt` and lifecycle timestamps are `timestamp without time zone` with accepted UTC-wall semantics. The permanent `ObjectStorageKeyAllocation` ledger has exact `objectKey = objects/{uuidv4}`, unique source grant and monotone nullable `latestWriteCapabilityExpiresAt timestamptz(6)`, an absolute instant. The installed issuer locks the grant, issues only while PENDING, and commits the ledger fence before capability disclosure. S001 evidence is immutable and bound to exact grant/tenant/provider/key. First attachment creates StoredFile, Case asset/version/current pointer and CONSUMED atomically.

The minimum candidate change is two nullable provider-independent `FileUploadGrant` fields, with no default or backfill:

```prisma
cleanupLeaseExpiresAt      DateTime? @db.Timestamptz(6)
providerCleanupConfirmedAt DateTime? @db.Timestamptz(6)
```

`cleanupAttemptCount` becomes the monotone claim generation; existing last-attempt and bounded failure-code fields support deterministic capped retry. No separate job table, vendor identity, bucket, endpoint, ETag, URL or capability is needed. `providerDeletedAt` may record a confirmed direct DELETE but remains nullable for already absent or ambiguous outcomes; it is never proof of exact absence. A CLEANED grant needs `providerCleanupConfirmedAt`. Allocation and evidence persist. Scoped OBJECT_STORAGE Case grants cannot be deleted under A1, including after CLEANED; future retention/deletion is a separate decision.

## State contract

| Transition | Necessary conditions |
| --- | --- |
| PENDING → FAILED | Only the trusted server-side Case completion/S001 validation boundary may classify a definitive rejection of this exact staged object after fresh grant lock, exact authorized retrieval and a closed rejection-code mapping; record failureCode and failedAt atomically. A client completion/failure signal has no authority. Transient provider/validator/DB errors leave PENDING for retry or expiry. No synchronous delete. |
| PENDING/UPLOADED → EXPIRED | DB clock reaches `expiresAt AT TIME ZONE 'UTC'`; record expiredAt. UPLOADED evidence stays immutable. |
| UPLOADED → CONSUMED | Existing accepted attachment transaction alone; no cleanup claim/terminal marker. |
| FAILED/EXPIRED → CLEANED | Same live claim generation, elapsed deletion fence, no canonical asset, direct exact ABSENT observation, and atomic confirmation. |
| CONSUMED/CLEANED → other | Forbidden. |

FAILED is a rejected PENDING, never a post-validation UPLOADED failure. Ambiguous browser PUT remains potentially successful. A definitive rejection means the server has established a stable exact-object encoded-size or S001 byte-validation failure from authoritative direct retrieval, with a closed code such as `CASE_OBJECT_SIZE_REJECTED` or `CASE_S001_REJECTED`. The accepted R2-03 completion path currently leaves failures PENDING; A1 implementation must add this narrow trusted transition separately, without reclassifying transport errors or accepting client assertions. If the server cannot establish a definitive result, PENDING persists until expiry. A malformed or historically ambiguous row is quarantined, never guessed eligible. Existing generic `expireDue` may only affect a Case OBJECT_STORAGE row if its exact SQL guard accepts the transition.

## Claim, delete, retry, acknowledgment

1. Select only persisted Case N-FILE-110 terminal grants with exact non-null provider key and matching permanent allocation (`objectKey = providerFileKey`, `sourceUploadGrantId = id`). Never use listing, prefix, client metadata or a caller key. The worker has server authority, not a user upload capability. A missing Case does not excuse a canonical-file check.
2. In a short transaction lock the grant first (`FOR UPDATE SKIP LOCKED` for batches); check state, tenant/Case identity, exact allocation, latest fence and no StoredFile by source grant **or** provider/key, no version/current pointer through a file. Claim a free or expired lease by incrementing cleanupAttemptCount once, setting lastCleanupAttemptAt to DB UTC-wall time, setting an absolute lease expiration (candidate five minutes), and clearing cleanupFailureCode. The count is the generation. Retry only after a deterministic capped delay from attempt time/count (candidate 5 minutes to 24 hours). Lease renewal requires the same generation and guards. Counter exhaustion/inconsistency is quarantined and alerted.
3. Immediately before external deletion, transaction-freshly recheck generation, live lease, terminal state, allocation, elapsed fence and no canonical references. Release transaction before provider I/O. Only semantic `ObjectStorage.classifyPresence(exactKey)` and `deleteExact(exactKey)` are used. If initially ABSENT, prepare ACK without recording DELETE. If PRESENT, DELETE then classify again. A DELETE response alone is insufficient. Any transient/ambiguous provider result, cancellation or PRESENT after DELETE leaves FAILED/EXPIRED retryable with a bounded normalized failure code, never raw provider error.
4. ACK in a new transaction locks grant and rechecks the **same** generation, unexpired lease, terminal state, allocation, fence and absence of canonical assets. It requires a successful direct exact ABSENT observation from this attempt after the fence; expired lease requires a new claim and new observation. Set providerCleanupConfirmedAt and CLEANED atomically; clear lease/failure, retain key, allocation, terminal reason, suffix and immutable evidence. Crash after DELETE but before ACK remains terminal and retryable; successor re-inspects exact key. A stale generation cannot ACK.

Provider/network work is outside transactions. At-least-once exact deletion is safe only under terminalization, fencing, permanent key nonreuse and authoritative absence. No fixed attempt limit drops metadata; repeated failures alert operations.

## Expiry-plus-skew fence

The deletion and ACK SQL precondition is DB absolute clock at or after `latestWriteCapabilityExpiresAt + 60 seconds` where non-null. For EXPIRED also require `grant.expiresAt AT TIME ZONE 'UTC'` elapsed; compare `timestamptz` instants, never raw timestamp to clock_timestamp under a non-UTC session. For FAILED, grant expiry itself is not needed, but the latest escaped write capability must expire plus skew. A null ledger fence is safe only if the installed issuer invariant establishes that **no capability could have escaped**; uncertain rows are quarantined. Re-read the monotone ledger at claim, pre-delete and ACK; terminalization stops all PENDING-only issuance. Every attempted PUT is potentially successful until direct presence/absence resolves it.

The R2-01 test proves expired replay denial and direct absence, but did not prove a slow PUT begun before expiry cannot finish after the fence. [Cloudflare R2 presigned URL documentation](https://developers.cloudflare.com/r2/api/s3/presigned-urls/) does not settle this case. [AWS S3 documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html) says expiry is checked when a request starts; this is a risk analogy, **not R2 proof**. Before actual cleanup DELETE is enabled, test a pre-expiry-started delayed/aborted/ambiguous R2 PUT and post-fence presence/recreation. If no finite safe bound or provider guarantee can be established, stop with BLOCKED_DECISION; do not weaken the accepted fence.

Files/application → semantic ObjectStorage port ← R2 infrastructure adapter remains the dependency direction. Keys are exact LabOS-owned identities, not parsed authorization. No R2/AWS command, provider error, URL, bucket or credential enters Files domain or persistence.

## Additive SQL design requirements, not migration bytes

A separately authorized additive migration would add only the two nullable columns above and optional narrow partial claim index after query-plan verification. It must not rewrite installed migrations or backfill/change historical UploadThing rows. The new guards are scoped to Case N-FILE-110 OBJECT_STORAGE:

- Grant lifecycle guard: reject deletion of every scoped grant under A1, including CLEANED; reject reversal/CONSUMED cleanup; restrict PENDING→FAILED to the dedicated server completion/S001 rejection writer with closed codes and direct retrieval/validation evidence, and PENDING/UPLOADED→EXPIRED to elapsed grant expiry; require no canonical reference for terminalization, claim and ACK; freeze provider/key/tenant/target/suffix and immutable evidence identity; require monotone count increment for a fenced claim; prevent arbitrary lease/confirmation assignment or confirmation regression. Cooperate with installed `FileUploadGrant_case_identity_guard`, allocation guard and deferred evidence trigger.
- StoredFile BEFORE INSERT guard: for Case OBJECT_STORAGE source grant, lock exact grant `FOR UPDATE` first, require UPLOADED, exact tenant/provider/key/evidence and no terminal/cleanup marker. This permits accepted attachment inserting StoredFile before updating CONSUMED within the same transaction, while preventing direct SQL canonicalization after terminalization. Existing file immutability and FKs remain. Verify lock ordering/deadlock retry with the accepted attachment code.
- Claim/ACK SQL: grant is serialization lock; both check exact allocation and `NOT EXISTS` StoredFile by source grant and by provider/key, including version/current references. ACK requires current generation, live lease, fence and trusted direct ABSENT observation. Choose one trusted ACK writer: a dedicated server-only cleanup worker identity with a distinct restricted PostgreSQL role invokes a narrowly scoped `SECURITY DEFINER` acknowledgment function **only after** `ObjectStorage.classifyPresence(exactKey)` returned ABSENT in the same live attempt. The function accepts grant ID and claim generation, not key, URL, provider result text or a caller-supplied tenant. It owns the atomic FAILED/EXPIRED→CLEANED and confirmation update. It locks the grant and checks same generation, live lease, exact allocation/key, elapsed fence and no canonical references. The grant trigger rejects every direct CLEANED/confirmation update unless executing under a dedicated no-login function owner; ordinary application/worker table DML cannot bypass it. Revoke PUBLIC function EXECUTE; grant EXECUTE only to the cleanup role, never to the normal application role. Keep the function owner separate from runtime roles, fix search_path, and verify runtime roles cannot ALTER/DISABLE triggers, assume owner role, or obtain generic table-owner privileges. The worker is the remote-absence attestation authority; PostgreSQL cannot inspect R2. Runtime proof must show direct absent inspection precedes its function call and direct SQL/normal app role cannot forge ACK. If this role separation is unavailable in the deployment target, stop at BLOCKED_DECISION before migration.

| Race | Required result |
| --- | --- |
| Issuer vs terminalizer | Both lock grant first. Issuer commits fence before disclosure or terminalizer wins and issuance fails. Cleanup re-reads latest fence. |
| Completion vs expiry/rejection | Only one grant transition wins. S001 evidence commits with PENDING→UPLOADED; later expiry preserves it. |
| Attachment vs expiry/claim | Grant serialization plus StoredFile insert guard makes canonical CONSUMED and cleanup terminal mutually exclusive. |
| Concurrent workers/stale lease | One generation owns live claim. Expired/stale owner may finish I/O but cannot ACK; successor re-inspects. |
| Crash/ambiguous PUT or DELETE | Grant remains terminal retryable. Exact presence and absence are re-established; no guessed CLEANED. |

## Later proof and operations gates

Under separate authority, disposable PostgreSQL must verify exact migration over installed history, historical UploadThing compatibility, direct SQL bypass guards, non-UTC timezone, null/non-null fences, grant-vs-capability expiration, S001 evidence retention, consumed/file/version/current exclusion, races above, lease recovery, retry, counter exhaustion, crash boundaries, rollback and exact fixture cleanup. Synthetic run-owned private R2 proof must cover exact delete/absence, expired replay, delayed/in-flight PUT risk and cleanup after latest expiry plus skew. Independent V3 CODE/SQL and RUNTIME_EVIDENCE reviews are required then.

Monitor sanitized aggregate count/age for terminal backlog, fence waiting, lease expiry, retries, confirmed absence and quarantined rows. Alert on lag and repeated normalized failures. No keys, capabilities, credentials, raw provider errors, clinical bytes or filenames in routine telemetry. Scheduling, thresholds, alert owner, target-specific provider/DB work and deployment belong to later Product Owner authority. A1 design acceptance alone cannot activate N-FILE-110.

## Remaining decision and review

Product Owner approval is requested for this additive persistence/lifecycle design before any implementation authority. The selected restricted cleanup-role/SECURITY DEFINER ACK enforcement, trusted S001 rejection producer and in-flight PUT bound are mandatory implementation gates; inability to resolve any of these without altering an accepted contract is BLOCKED_DECISION, not a silent PASS.

Independent V3 ARCHITECTURE/DECISION + SQL DESIGN review: initial CORRECTION_REQUIRED identified the missing trusted ACK writer/DB privilege boundary and trusted FAILED producer. The design selected a restricted cleanup role with narrow SECURITY DEFINER ACK, named the server Case completion/S001 rejection producer, and made scoped grant retention consistent. Independent read-only rereview returned **PASS | ARCHITECTURE/DECISION + SQL DESIGN** with no remaining material design finding. This is design review only; SQL migration, code and runtime are NOT_RUN.




