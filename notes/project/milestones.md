# Platform migration milestone register

Status values: `Not started`, `Discovery`, `In progress`, `At risk`, `Complete`. Confidence is `Low`, `Medium`, or `High`. Dates remain unset until M0 produces evidence-based sizing.

| ID | Milestone | Owner | Status | Confidence | Target | Exit-gate checklist |
|---|---|---|---|---|---|---|
| M0 | Baseline | Unassigned | Not started | Low | TBD | [ ] Inventory [ ] isolation tests [ ] migration/rollback approach [ ] discrepancies resolved |
| M1 | Organization foundation | Unassigned | In progress | Medium | TBD | [x] schema [x] idempotent service [x] new-onboarding cutover [ ] deterministic backfill [ ] reconciliation [ ] login regression tests |
| M2 | Tenant-context cutover | Unassigned | In progress | High | TBD | [x] canonical resolver [x] safe-action middleware [x] main layout guard [x] direct page/data consumers [ ] multi-org switching [ ] cache isolation verification |
| M3 | Membership replacement | Unassigned | In progress | High | TBD | [x] onboarding [x] staff schema migrated [x] guarded link service [x] tenant-context staff identity [x] invitation code/tests [x] intent migration [x] membership revocation [x] legacy writes stopped [ ] email delivery [ ] legacy reconciliation |
| M4 | Authorization V1 | Unassigned | In progress | Medium | TBD | [x] vocabulary approved [x] bundles tested [x] service default-deny [ ] policies verified [ ] 131 action gates plus non-action boundaries migrated [ ] telemetry operational |
| M5 | Legacy removal | Unassigned | Not started | Low | TBD | [ ] zero fallback window [ ] rehearsal [ ] backup [ ] obsolete schema removal |
| M6 | Events and audit | Unassigned | Not started | Low | TBD | [ ] outbox [ ] worker [ ] audit [ ] Case Activity parity |
| M7 | Workflow V1 | Unassigned | Not started | Low | TBD | [ ] versioned engine [ ] Case adapter [ ] concurrency [ ] reconciliation |
| M8 | Notifications | Unassigned | Not started | Low | TBD | [ ] templates [ ] preferences [ ] adapters [ ] retries/deduplication |
| M9 | Hardening | Unassigned | Not started | Low | TBD | [ ] composite integrity [ ] dependency rules [ ] runbooks [ ] release verification |

## Review notes

At every sprint review, update only from evidence. A milestone becomes Complete only when every exit item links to a card, test result, migration report, or released change.
