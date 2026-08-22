# Webhooks module architecture

## Mission

Deliver selected platform/domain events to tenant-configured external endpoints securely and reliably. This module is deferred until a real integration requires it.

## Owns

- Tenant endpoint registrations, subscribed event types, encrypted signing-secret material, delivery attempts, signature generation, retry policy, disablement, and replay.

## Does not own

- Domain event creation, arbitrary URL polling, inbound integration APIs, or provider-specific business workflows.

## Security model

Authorize endpoint management with explicit permissions. Require HTTPS outside local development; block private/link-local/metadata destinations to reduce SSRF risk; resolve and recheck addresses; cap body/response/time; rotate secrets; sign timestamp plus raw versioned payload; redact secrets from all logs.

Webhook payloads derive from versioned events and use stable public schemas. Delivery is at least once; consumers receive event IDs for deduplication. Repeated terminal failures disable or pause endpoints with operator/tenant visibility.

## Definition of done

- [ ] A concrete LabOS integration justifies activation.
- [ ] Signatures, replay resistance, secret rotation, and SSRF defenses are tested.
- [ ] Retry, deduplication guidance, disablement, and replay are documented.
- [ ] Endpoint and event access are tenant-scoped and audited.
- [ ] Delivery health is visible without leaking payload secrets.
