# Catalog Category RV-11 telemetry correction

Status: READY

Parent: Catalog Category UploadThing pilot / N-FILE-001

Executor: LUNA

Reviewer: TERRA

## Objective

Repair the concrete authorization decision-telemetry contract violation found
by the RV-11 audit, then produce fresh redacted record-level evidence.

## Authoritative contract

The Authorization architecture is authoritative: decision telemetry uses
server-owned allowlisted labels and excludes identity and raw roles. The shared
monitor in `modules/labos-authorization/decision-telemetry.ts` must not emit
`organizationId` or `roles`. Preserve approved non-sensitive decision fields
and leave the already-compliant upload-grant telemetry unchanged unless a direct
type/test dependency requires otherwise.

## Scope

1. Remove identity and raw-role fields from emitted structured authorization
   decision telemetry.
2. Update/add focused tests to assert the allowed/forbidden record-field
   contract, including rejection of unsafe input extras.
3. Run focused telemetry tests.
4. Using the approved database-only runtime harness policy, produce fresh
   redacted runtime/record evidence for positive authorization, denial,
   callback, and grant consumption. The audit must inspect actual emitted
   records available through the selected console/runtime capture; it must not
   print secrets, identifiers, credentials, tokens, headers, or URLs.

## Non-scope

Do not refactor unrelated telemetry, alter Axiom/provider configuration, change
authorization behavior, schema, database migrations, browser scenarios,
UploadThing callbacks, RV-01, or RV-09. Do not deploy, stage, commit, update
`docs/current.md`, or start successor work.

## Acceptance

The corrected monitor emits only approved non-sensitive fields; focused tests
pass; the fresh record-level RV-11 audit demonstrates no forbidden fields for
positive, denial, callback, and consumption event classes; and cleanup is
complete. TERRA alone accepts the result.
