# Platform migration milestone register

Status values: `Not started`, `Discovery`, `In progress`, `At risk`, `Complete`. Confidence is `Low`, `Medium`, or `High`. Dates remain unset until M0 produces evidence-based sizing.

Status: Active
Authority: Canonical
Owner: Project owner
Last reviewed: 2026-11-07

| ID | Milestone | Owner | Status | Confidence | Target | Exit-gate checklist |
|---|---|---|---|---|---|---|
| M0 | Baseline | Unassigned | Not started | Low | TBD | [ ] Inventory [ ] isolation tests [ ] migration/rollback approach [ ] discrepancies resolved |
| M1 | Organization foundation | Unassigned | In progress | Medium | TBD | [x] schema [x] idempotent service [x] new-onboarding cutover [x] active-Organization login restoration tests [ ] deterministic backfill [ ] reconciliation |
| M2 | Tenant-context cutover | Unassigned | In progress | High | TBD | [x] canonical resolver [x] safe-action middleware [x] main layout guard [x] direct page/data consumers [x] multi-org switching [x] cache isolation verification; deterministic backfill/reconciliation remain open |
| M3 | Membership replacement | Unassigned | In progress | High | TBD | [x] onboarding [x] staff schema migrated [x] guarded link service [x] tenant-context staff identity [x] invitation code/tests [x] intent migration [x] membership revocation [x] legacy writes stopped [ ] invited sign-up prefill [ ] email delivery [ ] legacy reconciliation |
| M4 | Authorization V1 | Unassigned | In progress | Medium | TBD | [x] vocabulary approved [x] bundles tested [x] service default-deny [ ] policies verified [ ] 131 action gates plus non-action boundaries migrated [ ] telemetry operational |
| M5 | Legacy removal | Unassigned | Not started | Low | TBD | [ ] zero fallback window [ ] rehearsal [ ] backup [ ] obsolete schema removal |
| M6 | Events and audit | Unassigned | Not started | Low | TBD | [ ] outbox [ ] worker [ ] audit [ ] Case Activity parity |
| M7 | Workflow V1 | Unassigned | Not started | Low | TBD | [ ] versioned engine [ ] Case adapter [ ] concurrency [ ] reconciliation |
| M8 | Notifications | Unassigned | Not started | Low | TBD | [ ] templates [ ] preferences [ ] adapters [ ] retries/deduplication |
| M9 | Hardening | Unassigned | Not started | Low | TBD | [ ] composite integrity [ ] dependency rules [ ] runbooks [ ] release verification |

## Review notes

At every sprint review, update only from evidence. A milestone becomes Complete only when every exit item links to a card, test result, migration report, or released change.

## M4 subordinate workstreams

- **F0–F5 financial sequence:** F0–F2 have recorded completed checkpoints; F3 and F4 are in progress; F5 is not started. See [financial plan](plans/authorization-v1/financials.md) and [financial boundaries](plans/authorization-v1/financial-boundaries.md). This is subordinate to M4, not a competing roadmap.
- **N-FILE sequence:** N-FILE-001 UploadThing endpoint authorization is active; N-FILE-002 completion-DTO minimization is completed; remaining N-FILE work is governed by the [files plan](plans/authorization-v1/files.md) and [boundary inventory](plans/authorization-v1/boundaries.md).
- **A1-I1 cleanup role boundary (2026-10-15):** Product Owner accepted the [final evidence packet](evidence/files/authorization-v1/n-file-110-a1-i1/final-evidence-closure-20261015.md) as **`CLOSED | PASS_WITH_LIMITATIONS | VERIFICATION_TARGET`** after independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`. Missing-allocation denial is accepted as `ACCEPTED_LIMITATION | DISPOSABLE_NEGATIVE_VERIFIED | TARGET_NOT_RUN`; canonical protection was demonstrated in the legitimate CONSUMED state, and Better Auth verification did not independently test cookie invalidation. A1-I2 provider deletion and N-FILE-110 activation remain unauthorized.
- **A1-I2 successor persistence, T5 and expiry sweeper (2026-10-20):** The accepted A1-I2 delayed-cleanup and bounded-reconciliation policy governs the successor. Reviewed migrations 56–58 were installed only on `labos-verification` (58 finished migrations at this checkpoint). The Product Owner closed [T5 limited hosted runtime](evidence/files/authorization-v1/n-file-110-a1-i2-i1-t5-f8/packet.md) as **`CLOSED | ACCEPTED`** after independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`: five rollback-only hosted groups passed, with exact absence and no surviving temporary SET membership. The [default-off expiry/enrollment sweeper checkpoint](evidence/files/authorization-v1/n-file-110-a1-i2-sweeper-manual-20261020.md) is Product Owner **`CODE + DISPOSABLE + HOSTED_ZERO_WORK ACCEPTED`**: disposable expiry/quarantine transitions, restricted verification-only identity and one successful hosted invocation with zero processed grants. Hosted transition through the Node sweeper remains `NOT_RUN`; the operator-controlled local launcher is not an independently enforceable authorization mechanism. The SQL lifecycle and worker call order are designed. Provider-facing cleanup worker, positive claim/ACK and S1–S4 runtime, automated scheduling, unattended activation, monitoring/alert configuration and later A2–A5 gates remain incomplete or unauthorized. Cleanup-worker R2 DELETE and N-FILE-110 activation need separate authority.
- **Case Image V1 hosted verification (2026-11-06):** Product Owner accepted the [hosted closeout packet](evidence/files/authorization-v1/case-image-v1-hosted-verification/closure-20261106.md) as **`CLOSED | ACCEPTED_WITH_LIMITATIONS`** after verification migration 61 and four original-byte-preserving synthetic browser uploads, canonical attachments and private views, with independent V3 `PASS | RUNTIME_EVIDENCE`. The verification database had 61 finished migrations and the final protected deployment has uploads disabled. Browser HAR capture and cross-tenant denial are `NOT_RUN`; three `pg` concurrent-query warnings are tracked separately. Customer-facing activation remains unauthorized.

## Deferred feature notes

- [ ] **Case Digital Asset Vault filename and preview:** show the verified original filename and an authorized image preview for private Case photographs, without exposing permanent R2 URLs or changing original bytes. This is UX backlog, not part of hosted verification acceptance.

- [ ] **Invited sign-up prefill:** when `/sign-up` is reached from a valid Organization invitation, prefill the invitation's intended name and email while keeping both editable; the user supplies a password. Load the invitation data through a public, expiry-aware, recipient-safe projection that does not expose membership or Staff security facts. Preserve the invitation callback through account creation.
- [ ] **Unified People directory (`/team`):** preserve the operational Staff roster and the digital Organization-member directory as separate read models, then compose them into one user-facing directory with three explicit states: Staff without access, Member without Staff, and linked Member+Staff. Deduplicate by the optional `LabStaff.memberId` bridge, retain distinct Staff/member actions and permissions, tenant-scope both sources, paginate deterministically, and test two-Organization isolation. This is deferred and does not block the current Authorization V1 membership slice.
