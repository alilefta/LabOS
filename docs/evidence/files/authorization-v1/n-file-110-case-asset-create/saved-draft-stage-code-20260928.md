# N-FILE-110 saved-DRAFT staging intent — code checkpoint

Status: CLOSED | CODE PASS
Scope: Provider-independent V3 CODE only; no upload or runtime acceptance.

The inactive `stageCaseAsset` server command accepts only `{ caseId }` and
resolves the authenticated Organization, canonical Lab, and Member from the
request session. A serializable transaction locks the authoritative saved
DRAFT Case in the canonical Lab/Organization, rereads the Member role, runs
the accepted `case.asset.add` resource policy with transaction-bound Case and
Staff-assignment facts, and inserts one Case-targeted PENDING grant. Missing,
foreign, non-DRAFT, and authorization-denied targets use the same public-safe
denial. The server fixes `N-FILE-110`, `case.asset.add.stage`, target type
`case`, provider label `UPLOADTHING`, and `expiresAt = createdAt + 15 minutes`.
No provider object key, URL, evidence, StoredFile, asset, version, or grant
consumption is produced. The Case UploadThing route remains disabled.

Focused and affected authorization/non-Case grant tests: 60/60 PASS across
seven files. Global `pnpm exec tsc --noEmit --pretty false`: PASS. Owned-file
ESLint: PASS. The independent V3 `CODE` Reviewer first returned
`CORRECTION_REQUIRED` for a stale Member role and distinguishable Staff
denial. Both were corrected; the independent rereview returned `PASS`.

This checkpoint establishes staging-intent code only. No database/provider/
browser runtime claim, private ACL, callback, JPEG validator, attachment,
or signed-read claim follows. Numeric JPEG ceilings remain `BLOCKED_DECISION`;
private UploadThing capability remains `CAPABILITY_BLOCKER`.
