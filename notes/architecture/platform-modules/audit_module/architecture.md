# Audit module architecture

## Mission

Provide append-only, tenant-scoped evidence of meaningful business and security actions across resources.

## Owns

- `AuditLog` schema, write/projection service, query service, redaction rules, and retention policy.
- Actor and resource snapshots needed to understand historical activity.
- Event-to-audit projections and explicit security audit commands.

## Does not own

- Debug/application logs, event delivery, domain state, or mutable user comments.

## Data contract

Audit records include Organization, optional Lab, original/effective actor, resource type/ID, action, safe summary/payload, correlation ID, source event ID, and timestamp. Records are append-only; corrections append superseding records rather than editing history.

## Migration

Start with dual projection from Case events while preserving `CaseActivityLog`. Compare counts and user-visible history, backfill deterministic historical records where safe, switch the Case Activity UI, then retire legacy writes. Financial, membership, staff, settings, and platform-admin actions follow.

## Privacy and operations

Payload allowlists prevent credentials, tokens, unnecessary patient data, and unrestricted diffs. Index by tenant/time and resource/time. Define retention, export access, and deletion/legal policy before production growth.

## Definition of done

- [ ] Required actions are queryable by tenant, actor, resource, and time.
- [ ] Append-only enforcement and payload redaction are tested.
- [ ] Case Activity parity is verified before cutover.
- [ ] Sensitive reads and platform-admin actions are audited.
- [ ] Retention and operational query runbooks exist.
