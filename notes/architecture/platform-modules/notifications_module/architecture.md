# Notifications module architecture

## Mission

Convert domain events into reliable, preference-aware delivery across in-app, email, WhatsApp, and future channels.

## Owns

- Notification request/delivery state, template key/version, recipient resolution interface, channel adapters, retries, deduplication, and status.
- Tenant/user preferences and suppression evaluation at delivery time.

## Does not own

- Domain decisions, event publication, provider-specific logic in domain modules, or marketing campaigns.

## Processing model

An event consumer creates a notification request with tenant, recipient reference, template version, locale, safe data, and deduplication key. Channel workers render and send through adapters, recording provider reference, attempts, and terminal result. Provider failure never rolls back domain work.

## First consumers

Case completion and invoice delivery. Existing `LabSettings` preferences are adapted rather than copied into generic workflow definitions.

## Definition of done

- [ ] Domain code has no direct provider call on migrated paths.
- [ ] Preferences and recipient authorization are enforced.
- [ ] Retry, deduplication, suppression, and permanent failure tests pass.
- [ ] Templates are versioned and localized safely.
- [ ] Delivery health and backlog are observable.
