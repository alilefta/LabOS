# M4/F3 combined Invoice lifecycle integration checkpoint

Status: **BLOCKED — browser integration claims incomplete and currency/preview discrepancies observed**  
Scope: A-089, A-097, N-FIN-PL-001; isolated local application and disposable PostgreSQL only.  
Date: 2026-11-13. Verification evidence, not Product Owner acceptance or deployment authority.

## Fixture

- Branch `codex/labos-roadmap-next`, worktree `F:/labos-roadmap-next`; existing uncommitted implementation preserved.
- Next.js 16.3.3 on `127.0.0.1:3107`, using webpack because Turbopack rejected the worktree's external `node_modules` symlink. Better Auth and Prisma pointed only to fresh PostgreSQL 18.4 on `127.0.0.1:55491`.
- Current Prisma schema was pushed to the disposable database. One synthetic Better Auth signup supplied an actual browser session. Synthetic Organization, Member, Lab, IQD LabSettings, Clinic, Patient and four completed Cases were seeded. Role changes affected only the run-owned Member row. A temporary audit INSERT trigger was used for fault injection and dropped before retry.
- Audit migration SQL SHA-256 remained `7C60188F28490B3C755E8AF6A7666AA72EB459ED2778A5C772A12503B39264DD`. This run did not rehearse migration history or install a shared migration.

## Browser and database results

| Claim | Result | Evidence |
| --- | --- | --- |
| Direct SENT creation and audited share | PASS | Authenticated Owner browser issued `INV-2611-0001` from Case `F3-001` at 0.05 with 10% discount. DB: subtotal 0.05, discount 0.01, total/amountDue 0.04, Clinic balance 0.04, one Case link, `ISSUED` and `DISCLOSED` audits. Sharing modal had a non-null statement URL; public page opened. |
| DRAFT then SENT | PASS | Browser saved `INV-2611-0002` DRAFT. DB before transition: total 10.00, no token/audit, Clinic balance still 0.04. Authenticated edit browser issued SENT; balance became 10.04 exactly once. |
| Sharing failure and share-only retry | PASS | Disposable trigger rejected audit INSERT after successful DRAFT-to-SENT mutation. Browser said Invoice sent and sharing unavailable with `Retry sharing`; DB showed SENT, balance 10.04, no token/audit, Lab sequence 2. After removing trigger, browser retry displayed a link; DB showed `ISSUED`,`DISCLOSED`, unchanged balance and sequence. |
| Owner/Admin/Manager and Staff | PARTIAL | Owner SENT/DRAFT, Admin initially created `INV-2611-0003` as DRAFT, and Manager created `INV-2611-0004` as DRAFT through authenticated browser after changing the same synthetic Member role in disposable DB. `INV-2611-0003` was later issued as Owner during modal-navigation verification. Staff navigation to new Invoice redirected to dashboard. Browser share permission matrix and direct action denial were not exercised for each role. |
| Financial identity and authoritative currency | FAIL (display) | DB persisted HALF_UP identity `0.04 = 0.05 - 0.01`; LabSettings currency was IQD. Creation preview/confirmation showed `$0.05` as total while showing `$0.01` discount. Sharing modal used IQD but rendered 0.04 as `IQD 0`. Public statement displayed `$0.04` and showed the 10% discount as `0.01 %`. No source changed. |
| Public statement access | PARTIAL | Browser opened valid token's public statement. A synthetic unknown UUID returned the generic 404 page. Expired, cross-tenant and ineligible-state browser denials were not exercised. |
| Clipboard, WhatsApp, modal navigation | PARTIAL | Copy click changed button to `Copied` and showed success toast, but browser automation clipboard read returned empty, so clipboard content is unconfirmed. WhatsApp was not clicked to avoid sending a bearer URL to a third party; construction was source-inspected only. A later issued-Invoice modal ledger button navigated to the correct Invoice dossier. |
| Existing-link reuse | NOT_RUN in browser | No second authenticated share invocation of an existing valid link was available in the exercised UI flow. Prior disposable integration tests are separate evidence. |
| Cross-tenant/ineligible-state action denial | NOT_RUN in browser | No browser action attempt with a foreign tenant Invoice or ineligible state was executed. Prior focused tests are separate evidence. |
| Ordinary action bearer exclusion | PARTIAL | DRAFT browser flow and DB had no token/audit; SENT link appeared only after separate sharing. Raw server-action response payload was not captured in browser execution. Existing response tests are separate evidence. |

Final DB assertions: four unique InvoiceCase claims for four Cases; four Invoices (three SENT, one DRAFT). After the modal-navigation check issued `INV-2611-0003`, Clinic balance 22.38 equals the three SENT totals (0.04 + 10.00 + 12.34); each shared SENT Invoice had `ISSUED` and `DISCLOSED`; the remaining DRAFT Invoice had no token and no audit. No shared resource was modified.

## Disposition

**BLOCKED** for combined browser integration acceptance. Financial writes and fault recovery passed, but the explicit consistent-total/currency claim failed in the create preview, sharing modal precision, and public statement rendering. Existing-link browser reuse, full role/share matrix, cross-tenant/ineligible action denials, clipboard content, WhatsApp browser URL, and ordinary-response capture remain `NOT_RUN` or inconclusive as stated. These findings do not reopen accepted A-089/A-097 transaction designs. A separately authorized display correction and repeat browser checkpoint would be needed for full integration acceptance. Shared migration installation and deployment gates remain pending.

Independent V3 review: `CORRECTION_REQUIRED | RUNTIME_EVIDENCE`. The reviewer confirmed the database transaction/audit results and BLOCKED checkpoint status. The review identified three presentation defects: unrounded JavaScript preview arithmetic, USD hardcoding in create/confirmation/public-statement surfaces, and default IQD formatter precision that renders stored 0.04 as 0. The public reader needs a minimal trusted currency projection for a future correction. No architecture decision is needed; transaction and authorization designs remain accepted. The reviewer also requested the role-row clarification above.
