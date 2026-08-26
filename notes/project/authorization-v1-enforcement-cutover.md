# Authorization V1 enforcement cutover

## Purpose

This checkpoint adds a reversible deployment switch for the reviewed A-124
(Grant Staff access) and A-125 (Revoke Staff access) pilot boundaries. The
action handlers and Better Auth calls are unchanged.

## Runtime modes

Set `LABOS_AUTHORIZATION_MODE` at process startup:

| Value | Behavior |
|---|---|
| `shadow` or unset | V1 is evaluated and telemetry is emitted; the legacy role gate remains authoritative. |
| `v1` | V1 is authoritative for A-124/A-125. A denied decision, missing boundary, projection failure, or V1 evaluation failure denies before the handler. |
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
- V1 mode never falls back to legacy after a V1 failure.
- Legacy rollback remains available without reverting code or changing domain
  handlers.
- Shadow telemetry records the selected enforcement source (`legacy` or `v1`)
  while retaining its existing redaction and correlation guarantees.

## Activation checklist

- [ ] Attach the reviewed runtime evidence and product/security approval to
  `authorization-v1-shadow-pilot-rollout-gate.md`.
- [ ] Confirm no `LEGACY_DENY_V1_ALLOW`, configuration, evaluation, or delivery
  failures remain unexplained.
- [ ] Deploy with `LABOS_AUTHORIZATION_MODE=v1` in a controlled environment.
- [ ] Verify Owner/Admin/Manager/Staff and two-Organization scenarios.
- [ ] Monitor Axiom for V1-enforced comparison events and provider denials.
- [ ] Keep `legacy-rollback` documented and available during the observation
  window.

Do not set `v1` in production until the rollout gate is explicitly approved.

