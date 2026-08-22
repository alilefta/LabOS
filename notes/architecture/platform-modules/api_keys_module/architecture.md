# API Keys module architecture

## Mission

Authenticate non-interactive Organization-scoped callers with explicit permissions, rotation, and revocation. This module is deferred until a real API consumer exists.

## Owns

- Key issuance, prefix/identifier, one-time secret display, strong secret hashing, Organization scope, permission grants, expiry, status, rotation/revocation, and last-used metadata.

## Does not own

- Human sessions, platform-admin elevation, webhook signing secrets, or unrestricted access based on Organization membership roles.

## Request actor

Validated keys create a service actor containing key ID, Organization, resolved Lab, permissions, and optional environment/name. It uses the same AuthorizationService and resource policies as human actors. Never store or log plaintext secrets after creation.

Apply per-key and per-Organization rate limits. Audit creation, permission change, rotation, revocation, and sensitive usage. Support overlapping rotation windows with independently revocable keys rather than mutating a secret in place.

## Definition of done

- [ ] A concrete external/API use case defines the first permission set.
- [ ] Plaintext is shown once and only a strong hash is stored.
- [ ] Expiry, revocation, rotation, rate limiting, and tenant resolution are tested.
- [ ] Service actors use central authorization and cross-tenant policies.
- [ ] Key-management and sensitive usage events are audited.
