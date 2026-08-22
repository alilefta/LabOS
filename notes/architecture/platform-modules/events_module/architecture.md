# Events module architecture

## Mission

Publish meaningful, versioned facts from committed domain work so independent consumers can react without direct domain coupling.

## Owns

- Typed event envelope and event-name/version registry.
- In-process dispatcher contract.
- Transactional `OutboxEvent`, handler registration, retry/dead-letter state, and idempotency records.

## Does not own

- Domain transactions themselves, audit retention, notification templates, or arbitrary message-broker infrastructure.

## Event contract

Each event includes ID, type, schema version, occurred time, Organization/Lab IDs, actor, resource reference, correlation/causation IDs, and a minimal safe payload. Events use past-tense facts such as `case.completed.v1`.

Domain mutation and outbox insert occur in the same Prisma transaction. A job claims events safely, invokes idempotent consumers, records attempts, retries transient failures with backoff, and dead-letters exhausted work. Ordering is only promised per aggregate where required.

## First slice

Case created, assigned, status changed, completed, and delivered. Initial consumers are audit and notification; commission/analytics remain later consumers.

## Definition of done

- [ ] Mutation and outbox write are atomic.
- [ ] Envelope schemas are validated and versioned.
- [ ] Duplicate delivery and worker crash tests pass.
- [ ] Retry/dead-letter state is observable and operable.
- [ ] At least one Case event has two decoupled consumers.
