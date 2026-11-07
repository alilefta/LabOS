# A1-I1 final evidence and Product Owner closure — 2026-10-15

Target: isolated Supabase `labos-verification` (`rvtubjrczuxdxfuazjmr`), PostgreSQL 17.11. Authority: Product Owner A1-I1 Final Evidence Closure and subsequent Product Owner acceptance. This packet adds evidence to the [combined correction and runtime record](combined-trigger-correction-runtime-20261015.md); it does not change migration 55 or authorize cleanup. **Final status: `A1-I1 | CLOSED | PASS_WITH_LIMITATIONS | VERIFICATION_TARGET`.** N-FILE-110 remains inactive.

## A. Canonical attachment and cleanup exclusion

The synthetic `a1i1canon-20261015-grant` used the existing run-owned organization, Lab, member and DRAFT Case from the earlier A1-I1 matrix. Its new opaque key, `objects/85213880-ec53-4400-a0df-dc82718361c0`, was only recorded in the verification database. No R2 request, object creation, signed write capability or provider absence check occurred. The local `baseline.jpg` fixture was 333 bytes with SHA-256 `92424c818a78b6d385591382f695b01af83ba588b88aa50dcef8faee922ab8bb`; the current JPEG S001 validation test file passed 15/15. This SQL fixture used the fixture's recorded S001 metadata; it did not execute the deployed decoder or the application's attachment service.

Using the actual `labos_verification_app` transaction-pooler identity with certificate and hostname verification:

1. Inserted a PENDING Case grant; the installed trigger allocated the exact key. Recorded a short future write-expiry fence. No capability was issued.
2. Committed matching immutable `CaseClinicalUploadEvidence` and `PENDING → UPLOADED` in one transaction. An initial disposable PostgreSQL trial showed that evidence and CONSUMED cannot finalize in the same transaction; the deferred evidence trigger requires the final grant to be UPLOADED. That failed disposable transaction rolled back fully. The target used the correct two-transaction path.
3. In a separate target transaction, inserted `a1i1canon-20261015-stored`, `a1i1canon-20261015-asset`, and `a1i1canon-20261015-version`; pointed the asset's `currentVersionId` to that version; and committed `UPLOADED → CONSUMED`. All installed foreign keys and deferred clinical/storage-mode guards passed at COMMIT.
4. Under the actual restricted `labos_verification_cleanup` identity, `claim_object_storage_cleanup` and `ack_object_storage_cleanup` each rejected the grant with SQLSTATE `23514`. Postflight showed CONSUMED, attempt count zero, no lease or cleanup confirmation, one exact allocation, one StoredFile, one version and a valid current pointer. The cleanup candidate predicate was false.

The valid lifecycle never permits a canonical CONSUMED grant to become FAILED or EXPIRED. Therefore this proves rejection of the legitimate canonical state and shows the installed canonical exclusion predicate is present; it does **not** isolate the StoredFile predicate from the status predicate in a target runtime call. Producing that combined negative state would require violating installed invariants and was not attempted.

## B. Missing-allocation negative evidence

The earlier disposable result covered a missing or invalid write-expiry **fence**, not a missing allocation **row**. A new bounded PostgreSQL 17.6 container received all 55 repository migrations. Read-only `pg_get_functiondef` MD5 values matched the installed Supabase target for the claim, ACK, object cleanup guard, Case identity guard and deferred evidence trigger functions. This establishes function-body equivalence for the tested path; the disposable instance does not reproduce Supabase's managed-role administration.

In that disposable instance only, a legitimate synthetic PENDING grant and allocation were committed, its fence was recorded, and the private S001 rejection made the grant FAILED. The exact allocation guard was temporarily disabled to delete only that disposable allocation row and then reenabled. `claim_object_storage_cleanup` rejected the now missing allocation with SQLSTATE `23514`; status remained FAILED, attempt count zero, no lease and no ACK. A separate disposable setup with a synthetic live generation-one lease, established by temporarily disabling only the grant lifecycle trigger, made `ack_object_storage_cleanup` reach and reject the missing-allocation branch with SQLSTATE `23514`; the confirmation remained null. These trigger bypasses were confined to disposable PostgreSQL. The target allocation guard was never disabled and no target allocation was removed or corrupted. The exact disposable container `labos-a1i1-missing-allocation-20261015` was removed after the tests.

Product Owner accepted disposition: **`ACCEPTED_LIMITATION | DISPOSABLE_NEGATIVE_VERIFIED | TARGET_NOT_RUN`**. The inaccessible target-negative state is not a target PASS.

## C. Fresh Better Auth compatibility

The Product Owner created a fresh synthetic `a3@g.com` email/password account through the protected LabOS browser, then reported completing sign-out and fresh sign-in there. Read-only target inspection found the new AuthUser (ID `XtEfFsTdWulMCrYnObvBsTpGZZCnUIDX`, created 2026-10-15 15:31:24 UTC), one credential account with a non-null password field, and one unexpired session created 2026-10-15 15:34:01 UTC. A certificate-verified transaction-pooler query as `labos_verification_app` returned `current_user=session_user=labos_verification_app` and the same 1/1/1 user/credential/live-session counts. The browser sign-out/sign-in sequence is user attested; the agent did not inspect cookies, tokens or the contents of the session response, and its separate in-app browser tab is not proof of the Product Owner's exact account session. Normal restricted-role persistence and live session retrieval by SQL passed; this task does not independently prove logout invalidated a prior cookie.

No password, hash, token, cookie or full connection string was read or recorded in evidence. The account is retained for verification; exact cleanup has not been authorized or established as safe. Its synthetic password was shared in chat and must be treated as exposed: rotate or disable that credential before further use under separate authority. The password is not reproduced here.

The Vercel project `lab-os-verification-deployment` currently reports All Deployments SSO protection and a READY `main` deployment at SHA `6b29b85d22c9ae6afded25b2f1b01e3ea0d8a628`; required Production/Preview environment variable names are present. Vercel hides their values, so the live database binding is inferred from the newly created account appearing in this isolated target, combined with the previously attested restricted username. Browser access is through an existing authenticated Vercel session; a new anonymous protection challenge was not run in this task.

## Fixture inventory and boundary

The exact retained verification-target fixtures are:

| Grant ID | Allocation key | Final state | Other retained rows |
| --- | --- | --- | --- |
| `a1i1rt-20261015-cc4a1590-valid` | `objects/c5cbdbad-c629-4926-a04a-3d4780d539c7` | FAILED | None |
| `a1i1rt-20261015-cc4a1590-fence` | `objects/98496c3a-dfa4-4167-b4e8-45e9ff753fbd` | CLEANED by synthetic database-only ACK | None |
| `a1i1rt-20261015-cc4a1590-expired` | `objects/f488de28-aa72-4d00-9ec0-0e6d8fea0573` | EXPIRED | None |
| `a1i1rt-20261015-combined-fence` | `objects/05f7db0e-3459-4e5a-87d0-4af51c7d04b2` | FAILED | None |
| `a1i1canon-20261015-grant` | `objects/85213880-ec53-4400-a0df-dc82718361c0` | CONSUMED | Evidence keyed by grant ID; StoredFile `a1i1canon-20261015-stored`; CaseAssetFile `a1i1canon-20261015-asset`; CaseAssetFileVersion `a1i1canon-20261015-version` is current |

All five pairs share the run-owned Organization `a1i1rt-20261015-cc4a1590-org`, Lab `a1i1rt-20261015-cc4a1590-lab`, member `a1i1rt-20261015-cc4a1590-member`, and Case `a1i1rt-20261015-cc4a1590-case`. The fresh synthetic Better Auth account is `a3@g.com`, AuthUser ID `XtEfFsTdWulMCrYnObvBsTpGZZCnUIDX`. Clinical evidence and object-key allocation are immutable, so the new canonical rows remain retained. No previous fixture, D2 account or provider object was deleted.

The cleanup-worker credential remains only in the local Windows Credential Manager generic credential `LabOS/labos-verification/cleanup-worker` for `labos_verification_cleanup`; no secret value or verifier is recorded here. This is verification-target custody, not deployment of a cleanup worker or schedule.

No R2 HEAD/DELETE or other provider request, migration, role/ACL change, cleanup execution, worker schedule, Vercel mutation, deployment, push, A1-I2 work or N-FILE-110 activation occurred.

Independent final V3: **`PASS | RUNTIME_EVIDENCE + CHECKPOINT`**. The reviewer accepted the target canonical attachment and denial within its legitimate CONSUMED state; it did not treat the StoredFile predicate as isolated from the status predicate. It accepted claim and ACK rejection of a missing allocation row on a migration/function-equivalent disposable PostgreSQL 17.6 instance, with target execution explicitly `NOT_RUN`. It accepted user-attested protected-browser signup/logout/fresh login plus the fresh target AuthUser, credential account, live session and restricted-role query as the bounded Better Auth check. A prior snapshot review was `CORRECTION_REQUIRED` while the browser confirmation was pending; the final PASS followed that completion.

The Product Owner accepted the 2026-10-15 packet, the V3 PASS and the missing-allocation target-test limitation, and closed **`A1-I1 | CLOSED | PASS_WITH_LIMITATIONS | VERIFICATION_TARGET`**. Canonical rejection is accepted for the legitimate CONSUMED state, without claiming an isolated StoredFile-predicate target test. The Better Auth result is accepted for the bounded protected-browser and restricted-database scope, without claiming independent old-cookie invalidation. Migrations 54 and 55, the installed role/ownership/privilege boundary, the retained fixtures and all historical failure records remain preserved. A1-I2, destructive cleanup, scheduling and N-FILE-110 activation remain separate decisions.
