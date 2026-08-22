# Auth / Identity module architecture

## Mission

Answer “who is the caller, and is the identity authenticated?” Better Auth remains the identity implementation. Domain modules never manipulate credentials, sessions, OAuth accounts, verification tokens, bans, or impersonation internals.

## Owns

- Better Auth configuration and adapter integration.
- `AuthUser`, `Session`, `Account`, and `Verification` lifecycle.
- Authentication methods, session validation, account status, and identity-level administration.
- A stable platform identity contract consumed by tenancy.

## Does not own

- Organization membership, active tenant selection, Lab ownership, LabStaff, permissions, entitlements, or domain profiles.

## Public contracts

```ts
type AuthenticatedIdentity = { userId: string; sessionId: string }
interface IdentityService {
  getCurrent(): Promise<AuthenticatedIdentity | null>
  requireCurrent(): Promise<AuthenticatedIdentity>
}
```

Better Auth types must not leak beyond the module boundary. Server code obtains identity through this interface; client session data is non-authoritative.

## Security and observability

- Secure/httpOnly/same-site cookies and CSRF protections follow Better Auth guidance.
- Rate-limit credential and recovery endpoints; never log credentials, tokens, cookies, or verification values.
- Audit login, logout, recovery, ban, failed elevation, and impersonation events with safe metadata.
- Track authentication success/failure and session-validation latency without exposing personal secrets.

## Migration

1. Wrap current Better Auth session lookup behind `IdentityService`.
2. Enable Organizations only through the Organizations module integration.
3. Stop exposing `AuthUser.labId` and tenant role from identity contracts.
4. Remove `AuthUser.labId` only after tenant-context fallback reaches zero.
5. Separate platform-admin capability from the current identity role split.

## Risks

- Session type leakage recreates coupling; prevent imports of Better Auth session types in domain modules.
- Stale session/account status; revalidate sensitive operations server-side.
- Impersonation ambiguity; retain original and effective actor IDs with expiry and audit.

## Definition of done

- [ ] Domain modules use the stable identity interface.
- [ ] Identity responses contain no Lab or Organization authorization decision.
- [ ] Secrets and tokens are redacted from logs and audit.
- [ ] Account suspension and impersonation behavior are tested.
- [ ] `AuthUser.labId` has no runtime consumer before removal.
