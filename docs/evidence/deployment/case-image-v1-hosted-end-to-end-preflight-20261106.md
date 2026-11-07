# Case Image V1 hosted end-to-end preflight — 2026-11-06

Authorization: temporary verification-only upload activation, synthetic hosted JPEG/PNG/WebP testing, exact cleanup, and final deactivation. This packet records a **pre-activation stop**; no flag, deployment, Supabase data, R2 object, credential, or source was changed.

## Identity and unchanged final state

- Verification Vercel project `prj_wJiC2MYXpqpE9W4JIgxQnf8QfhqA` remains Node `24.x`, SSO protected for all deployments. Current canonical Production deployment remains `dpl_BwJz69tPsuvyaRp9zHfavDEN9sFX`, `READY`.
- Vercel Production environment inventory still has no `LABOS_CASE_IMAGE_HOSTED_VERIFICATION_ENABLED` entry and reports zero hidden Production entries. Uploads remain disabled. No activation or deactivation deployment ID exists because activation did not begin.
- Supabase verification project `rvtubjrczuxdxfuazjmr` is healthy on PostgreSQL `17.11.0.003`. Accepted R2 bucket and CORS evidence was not rerun; no R2 request was made.

## Cleanup feasibility stop

The requested successful per-format path would end in canonical `CONSUMED` grants with `CaseClinicalUploadEvidence`, `StoredFile`, `CaseAssetFileVersion`, `CaseAssetFile`, and private R2 objects. The accepted A1-I2 orphan cleanup path deliberately excludes canonical attachments. On the installed verification database, enabled triggers include `CaseClinicalUploadEvidence_immutable` (BEFORE DELETE/UPDATE), `CaseAssetFileVersion_allow_live_member_null_transition_only` (BEFORE DELETE/UPDATE), `StoredFile_allow_live_member_null_transition_only` (BEFORE DELETE/UPDATE), `FileUploadGrant_object_cleanup_lifecycle` (BEFORE DELETE/UPDATE/INSERT), and `ObjectStorageKeyAllocation_immutable_and_fenced` (BEFORE DELETE/UPDATE/INSERT). Read-only function inspection showed unconditional rejection for clinical-evidence deletion, rejection of version/file mutation except the single permitted live-member unlink update, explicit retention of scoped object-storage grants on DELETE, and permanent key-allocation retention. The relevant relations also use restrictive foreign keys.

No accepted canonical-attachment deletion or exact hosted synthetic-record removal procedure was identified in the preflight. Deleting only the R2 objects would leave canonical database records pointing to absent bytes. Temporarily disabling triggers, bypassing the grant/evidence guards, or reconstructing the shared verification database would cross the accepted contracts and this task's no-schema-change boundary. A disposable-local run can drop its entire database; the shared verification project cannot use that cleanup method.

Because the requested test requires first attachment **and** exact cleanup, proceeding would knowingly create run-owned canonical records that cannot be removed through the accepted lifecycle. The safe stop occurred before any activation or synthetic upload. JPEG, PNG, lossy WebP, lossless WebP, browser PUT, completion, attachment, private view and native invocation are all `NOT_RUN` in this hosted task. No original-byte or per-format success claim is made.

## Decision needed

The smallest Product Owner decision is either to accept exact run-owned synthetic canonical attachments and R2 objects as retained verification evidence with a bounded retention/operational disposition, or to authorize a separately reviewed canonical deletion/retirement procedure before restarting the hosted test. Neither option is inferred from the current cleanup authorization. A retained-object decision would change the explicit cleanup requirement; a deletion procedure would need its own design, SQL/provider safety and independent review. Until then the verification deployment remains protected and uploads disabled.

## Independent V3

`BLOCKED_DECISION | CHECKPOINT`, classification `AUTHORITY_BLOCKER`. Independent read-only review confirmed that installed immutable evidence, StoredFile, version, scoped grant and allocation guards prevent removal of a successful canonical attachment through the accepted lifecycle, and that the orphan worker excludes `CONSUMED` files. The reviewer found no accepted exact hosted cleanup path and agreed with stopping before activation. No hosted mutation or provider operation occurred.
