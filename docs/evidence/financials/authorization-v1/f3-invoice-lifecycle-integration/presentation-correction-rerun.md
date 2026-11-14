# M4/F3 Invoice presentation correction: targeted rerun

Verification run: **PASS_WITH_LIMITATIONS — targeted presentation and browser rerun**, 2026-11-13. Product Owner disposition, 2026-11-14: **`CLOSED | PASS_WITH_LIMITATIONS | AUTHENTICATED_BROWSER + DISPOSABLE_POSTGRESQL`** for the combined A-089/A-097/N-FIN-PL-001 integration checkpoint. The earlier `packet.md` remains a historical **BLOCKED** result for its then-observed display defects, superseded by this correction and rerun; its passing claims are not retroactively assigned to this run. No migration installation or deployment authority is granted.

Existing A-089 `CLOSED | PASS_WITH_LIMITATIONS`, A-097 `PASS_WITH_LIMITATIONS`, and N-FIN-PL-001 `PASS_WITH_LIMITATIONS` implementation acceptances remain intact. This combined browser checkpoint is separate from those code/runtime acceptances.

## Correction and scope

The create/edit preview used JavaScript number arithmetic and a final floating-point subtraction, so subtotal 0.05 less a 10% discount displayed 0.05 even though the committed Invoice stored 0.04. Create/confirmation and public statement paths used hardcoded USD; the modal used default IQD formatting, which drops two-decimal accounting precision; the public statement labeled the monetary discount as a percentage.

The new pure `lib/invoice-presentation.ts` helper mirrors the accepted write calculation: Decimal subtotal rounded HALF_UP to two places, Decimal percentage discount rounded HALF_UP to two places, then subtraction. A shared formatter always displays two decimal places for stored Invoice money. Server-derived LabSettings currency now reaches the create and edit views; the public reader obtains only currency through the already validated Invoice → Lab → LabSettings relationship and the saved applied discount percentage for its label. The ordinary server actions' committed results remain authoritative. No write action, sharing authorization/audit, public bearer validation, migration, schema, or accounting rule changed in this correction.

Changed files for this correction (relative to `F:/labos-roadmap-next`; pre-existing A-089/A-097 work in the dirty branch is separate):

- `lib/invoice-presentation.ts`
- `components/invoices/new-invoice/new-invoice-client.tsx`
- `components/invoices/edit-invoice/edit-invoice-client.tsx`
- `components/invoices/new-invoice/sections/reconciliation-ledger.tsx`
- `components/modals/invoices/invoice-generation/invoice-generation-modal.tsx`
- `components/modals/invoices/invoice-generation/invoice-success-share-modal.tsx`
- `data/invoices/get-new-invoice-data.ts`
- `data/invoices/get-draft-invoice.ts`
- `data/invoices/get-public-invoice.ts`
- `schema/composed/invoices/new.invoice.dtos.ts`
- `schema/composed/invoices/draft-invoice.dtos.ts`
- `schema/composed/invoices/invoices.dtos.ts`
- `app/(main)/invoices/[invoiceId]/edit/page.tsx`
- `app/(public)/statement/[token]/page.tsx`
- `tests/unit/components/invoice-presentation.test.ts`
- `tests/unit/components/invoice-public-link-handoff.test.ts`

## Isolated fixture

Branch `codex/labos-roadmap-next`, worktree `F:/labos-roadmap-next`. Next.js 16.3.3 webpack app on `127.0.0.1:3108` with a synthetic Better Auth account and run-owned Organization/Lab/Member, IQD LabSettings, Clinic, Patient, and Cases. PostgreSQL 18.4 was isolated on `127.0.0.1:55492`, with `labos_f3_display` for browser execution and separate disposable `labos_a089`/`labos_f3_regress` regression databases. The current Prisma schema was pushed only to these disposable databases. Existing audit migration SQL SHA-256 remained `7C60188F28490B3C755E8AF6A7666AA72EB459ED2778A5C772A12503B39264DD`.

## Actual authenticated browser and DB evidence

| Scenario | Result | Evidence |
| --- | --- | --- |
| Fractional preview and direct SENT | PASS | Owner browser showed subtotal **IQD 0.05**, discount **IQD 0.01**, total **IQD 0.04** in preview and confirmation, then `INV-2611-0001 • IQD 0.04` in success modal. Before correction the preview total was `$0.05` and modal rendered `IQD 0`. DB stored 0.05, 0.01, 0.04 and amountDue 0.04; Clinic balance increased once by 0.04; `ISSUED`,`DISCLOSED` audits persisted. |
| DRAFT → SENT | PASS | Owner saved `INV-2611-0002` DRAFT for IQD 10.00: no balance credit, token or audit. Edit preview and confirmation showed IQD 10.00 less IQD 1.00 = IQD 9.00. Sending displayed committed IQD 9.00, credited once, and produced audited sharing. |
| Public statement | PASS | Browser opened valid first link: Case/subtotal IQD 0.05, `Global Discount (10%) - IQD 0.01`, total IQD 0.04. Before correction it showed USD and `0.01 %`. The page's print content uses this same DOM; a generated PDF was not inspected. |
| Existing link reuse | PASS | Synthetic valid UUID/expiry was placed on run-owned DRAFT `INV-2611-0003` to exercise legacy compatibility. Admin browser sent and shared it; modal retained exactly that token. DB expiry and token unchanged; only `DISCLOSED` audit, no new `ISSUED`. |
| Role access | PARTIAL | Owner, Admin, and Manager used authenticated browser flows that committed and shared SENT Invoices. Staff new-Invoice navigation redirected to dashboard. Direct Staff share-action denial in browser was not exercised. |
| Ineligible public reads | PASS | Browser received generic 404 for a run-owned DRAFT token and for a temporarily expired SENT token. Original SENT expiry was restored. Cross-tenant action denial in browser was not exercised. |
| Modal/navigation and URL safety | PARTIAL | Valid public statement link opened; no `/statement/null` appeared. Copy button and toast reported success, but automation's clipboard read returned empty, so copied contents remain unconfirmed. WhatsApp was not opened to avoid sending a live bearer to a third party; encoded URL construction, phone normalization and IQD 0.04 are covered by pure tests. Raw ordinary action response capture was not performed in browser; existing response tests verify bearer exclusion. |

Final disposable DB query: `INV-2611-0001` 0.04 with `ISSUED,DISCLOSED`; `0002` 9.00 with `ISSUED,DISCLOSED`; `0003` 5.00 with `DISCLOSED` only; `0004` 7.00 with `ISSUED,DISCLOSED`. All four are SENT. Clinic currentBalance **21.04** equals the four totals; four Case links have four distinct Case IDs. A separate synthetic DRAFT with a token was used solely for public-reader denial and was excluded from these balance/link assertions.

## Automated verification and limitations

TypeScript `tsc --noEmit --incremental false` PASS; focused lint PASS; `git diff --check` PASS. Focused authorization/action/presentation tests **53/53 PASS**; public-reader/architecture/presentation tests **20/20 PASS** (overlapping focused runs). Disposable PostgreSQL final sequential runs: A-089 **7/7**, A-097 draft **8/8**, A-097 sharing/create handoff **10/10**; total **25/25 PASS**. An earlier combined run mixed the A-089 database-name fixture with other suites and parallelized A-097 transactions, producing fixture/concurrency errors; it was replaced by the clean separated, sequential runs reported here.

Browser `NOT_RUN`: direct Staff share-action denial; cross-tenant action denial; raw ordinary-action response capture; WhatsApp navigation; generated PDF inspection. Browser clipboard contents are **INCONCLUSIVE**: the UI reported copy success, but the automation clipboard read returned empty. Existing focused authorization, bearer-exclusion, and URL-construction tests are code-level evidence, not browser PASS for these rows. The [prior checkpoint](packet.md) separately executed and passed sharing failure after successful submission followed by share-only retry without a second Invoice mutation; that browser result is retained with its original fixture/run attribution and was **NOT_RUN in this targeted rerun**. Shared migration installation, target ledger/drift/privilege checks, and deployment remain pending. No commit, merge, push, shared migration, or deployment is authorized.

The Product Owner explicitly accepted closure with these residual limits. Their missing assurance and future trigger are:

| Browser claim | Disposition / missing assurance | Follow-up trigger |
| --- | --- | --- |
| Direct Staff sharing denial | `NOT_RUN`; direct browser denial unobserved (focused authorization tests remain separate). | Next bounded authenticated role-matrix run before relying on a complete browser authorization claim. |
| Cross-tenant action denial | `NOT_RUN`; direct browser denial unobserved (focused tenant tests remain separate). | Next bounded two-tenant browser run before relying on a complete browser tenancy claim. |
| Raw ordinary-action response | `NOT_RUN`; browser network payload exclusion unobserved (response tests remain separate). | Next instrumented browser run before relying on a browser bearer-exclusion claim. |
| Clipboard contents | `INCONCLUSIVE`; browser clipboard read returned empty despite success UI. | Browser with readable clipboard permission before claiming copied-content success. |
| WhatsApp navigation | `NOT_RUN`; third-party navigation intentionally avoided; pure encoded-URL test only. | Controlled non-transmitting browser interception if end-to-end navigation proof is required. |
| Generated PDF | `NOT_RUN`; print DOM was viewed, generated output uninspected. | Dedicated PDF/print rendering check if export fidelity becomes an acceptance claim. |

These are verification limitations accepted for this combined checkpoint, not new implementation defects or authorization to expand product behavior. No follow-up scenario is represented as passed by unit or PostgreSQL evidence.

Independent V3 CODE and browser RUNTIME_EVIDENCE review: **PASS**. Reviewer found no material presentation defect; independently ran presentation/handoff tests **11/11 PASS**, `git diff --check` PASS, and read-only queried the disposable database for the four SENT totals, 21.04 Clinic balance, audit sequences, and unique Case claims. Reviewer retained the explicitly unexecuted browser scenarios as limitations rather than PASS claims.

After review, the isolated Next.js process and PostgreSQL cluster were stopped and the exact run-owned Temp fixture directory was removed. Final TypeScript and `git diff --check` passed; migration checksum was unchanged. No shared environment was touched.
