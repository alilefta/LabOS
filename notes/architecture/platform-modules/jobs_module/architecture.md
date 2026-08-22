# Jobs / Scheduling module architecture

## Mission

Run durable background work and scheduled tasks with safe claiming, retries, idempotency, and operational visibility.

## Owns

- Job type registry, schedule/enqueue API, persisted job state, claim/lease/heartbeat, retries/backoff, cancellation, dead-lettering, and worker health.

## Does not own

- Domain-specific job logic, event schemas, notification rendering, or arbitrary user-supplied code.

## First jobs

Outbox dispatch, notification delivery/retry, overdue invoice synchronization, and future file cleanup. Each handler is registered TypeScript code with validated versioned input and an idempotency key.

Workers must tolerate crashes and at-least-once execution. Use bounded concurrency, lease expiry, exponential backoff with jitter, and per-job timeouts. Scheduled jobs store timezone semantics explicitly; Lab-specific schedules use the Lab timezone.

## Definition of done

- [ ] Claims prevent concurrent duplicate execution while recovering expired leases.
- [ ] Handlers are idempotent and versioned.
- [ ] Retry, cancellation, timeout, and dead-letter paths are tested.
- [ ] Queue depth, age, failures, and worker health are observable.
- [ ] Operators have documented replay and dead-letter procedures.
