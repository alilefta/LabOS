# Authorization V1 enforcement cutover

## Purpose

This checkpoint adds a reversible deployment switch for the reviewed A-124
(Grant Staff access), A-125 (Revoke Staff access), and N-001 (`membership.list`)
pilot boundaries. The action handlers, Better Auth calls, and tenant-scoped
Member repository are unchanged.

## Runtime modes

Set `LABOS_AUTHORIZATION_MODE` at process startup:

| Value | Behavior |
|---|---|
| `shadow` or unset | V1 is evaluated and telemetry is emitted; the legacy role gate remains authoritative. |
| `v1` | V1 is authoritative for A-124/A-125 and N-001. A denial or V1 evaluation/configuration failure fails closed before the handler or Member repository. |
| `legacy-rollback` | Legacy authorization is authoritative while the cutover is investigated. This intentionally restores the legacy Manager privilege and must be treated as a security-impacting rollback. |

Unknown values fall back to `shadow`. The setting is deployment-owned and is
never read from request input.

## Better Auth dual authority

When mode is `v1`, the server installs the narrowed Better Auth Organization
profile: Owner/Admin retain the provider operations needed by the approved
flows, while Manager/Staff do not retain invitation or member mutation grants.
LabOS Authorization V1 and Better Auth must both permit a provider mutation.
The client-side Organization plugin remains a type/UI description; server
authorization is authoritative.

## Safety properties

- A-123 remains shadow-only and is not part of this cutover.
- A-124/A-125 use the cutover client, whose default behavior is identical to
  the prior shadow client.
- N-001 resolves canonical TenantContext before evaluation and cannot call the
  Member repository unless the deployment-selected decision allows.
- V1 mode never falls back to legacy after a V1 failure.
- Legacy rollback remains available without reverting code or changing domain
  handlers.
- Shadow telemetry records the selected enforcement source (`legacy` or `v1`)
  while retaining its existing redaction and correlation guarantees.

## Activation checklist

- [x] Attach the reviewed A-124/A-125 runtime evidence and controlled approval to
  `authorization-v1-shadow-pilot-rollout-gate.md`.
- [x] Confirm the A-124/A-125 audit has zero `LEGACY_DENY_V1_ALLOW` events and
  no unexplained evaluation outcome.
- [x] Deploy A-124/A-125 with `LABOS_AUTHORIZATION_MODE=v1` in development.
- [x] Verify the approved A-124/A-125 role and two-Organization scenarios.
- [x] Monitor Axiom for A-124/A-125 V1-enforced comparison events.
- [x] Verify N-001 Owner/Admin allow and Manager/Staff denial under V1.
- [ ] Keep `legacy-rollback` documented and available during the observation
  window.

Do not set `v1` in production until the rollout gate is explicitly approved.
