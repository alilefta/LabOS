# Workflow module architecture

## Mission

Run immutable, versioned finite-state workflows with centralized authorization, registered conditions/actions, atomic history, and events. Dental Case is the first consumer.

## Owns

- Definition, immutable published version, states, transitions, instances, and transition history.
- Transition orchestration, optimistic concurrency, guard/action registries, and event emission.

## Does not own

- Dental states or remake rules in generic code, arbitrary scripts/SQL, BPMN, visual editing, notification providers, or authorization policy implementation.

## Transition algorithm

Load and version-check instance; verify current state and transition; require transition permission; run allowlisted guards; execute transactional internal actions; update instance and Case status projection; append history; write outbox events; commit. External effects run after commit.

Definitions contain stable registered keys plus validated JSON configuration. Published versions never mutate. Existing instances stay on their starting version unless an explicit audited migration is designed.

## First Case workflow

Migrate current `DRAFT -> NEW -> ASSIGNED/PROCESSING -> COMPLETED -> DELIVERED` plus FAILED paths first. QC is a later workflow version requiring a product decision. Keep `Case.status` synchronized atomically and forbid direct writes on migrated paths.

## Definition of done

- [ ] Invalid, unauthorized, and concurrent transitions are rejected.
- [ ] History and outbox are atomic with state changes.
- [ ] Registered guard/action validation is tested.
- [ ] Existing Case lifecycle behavior is preserved in the first version.
- [ ] Reconciliation detects zero Case status/instance drift.
