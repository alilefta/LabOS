# C3 Case access-audit code verification

Status: CLOSED | CODE PASS
Date: 2026-09-27
Scope: provider-independent C3 only; no database or provider runtime operation

## Contract

- `recordCaseFileAccessAudit` derives Member, Organization, and Lab from the
  server tenant context. It authorizes `case.read` before tenant-scoped Case
  and managed-asset reads. Missing, foreign, or denied resources receive the
  same external unavailable error.
- The strict input accepts only Case/asset IDs and closed issuance outcomes.
  The append-only repository maps only C2 allowlisted audit columns. It cannot
  accept signed/raw URLs, tokens, provider keys/payloads, clinical content, or
  arbitrary metadata.
- Denied authorization records null Case/asset IDs; post-authorization resource
  failure records only safely resolved IDs. No candidate ID is promoted to an
  authoritative audit fact.
- `ISSUED` requires `issuedAt <= now < expiresAt` and a positive lifetime no
  greater than 300 seconds. A deliverable result is returned only after the
  required append succeeds; append failure propagates as an audit-write error.

## Verification

| Check | Result |
| --- | --- |
| Focused C3 service/repository tests | PASS, 22 tests |
| C1 read, C2 schema/mixed-read, N-FILE-110A preservation regressions | PASS, 6 files / 20 tests |
| Global TypeScript `--noEmit` | PASS |
| Owned-file ESLint | PASS |
| Prisma schema validation (read-only) | PASS |
| Migration 48 identity | Unchanged SHA-256 `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80` |

Independent V3 `CODE` review initially returned `CORRECTION_REQUIRED` because
an expired positive-length interval could return `deliveryPermitted: true`.
The bounded correction added a trusted clock and expired/exact-expiry tests;
the same independent Reviewer rereviewed the actual code and returned `PASS`.
Primary records C3 code acceptance `PASS` and task `CLOSED`.

## Limits

No real C3 audit write, provider issuance, signed URL, download endpoint, or
Case managed-file runtime behavior was exercised or accepted. The C2 database
constraints were verified in the accepted C2 checkpoint, not repeated here.
The UploadThing private-ACL capability blocker remains. N-FILE-110/111 need
separate permission, provider, application, and runtime authority. Product
PRV-08 remains a separate telemetry obligation.
