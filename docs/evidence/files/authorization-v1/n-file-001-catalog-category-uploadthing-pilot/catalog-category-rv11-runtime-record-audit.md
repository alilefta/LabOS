# Catalog Category RV-11 fresh runtime-record audit

Status: PASS — actual sink audit includes the valid-tenant denied-decision record

Parent: Catalog Category UploadThing pilot / N-FILE-001

Executor: LUNA

Reviewer: TERRA

## Objective

After the accepted bounded decision-telemetry sanitizer correction, obtain the
fresh actual runtime record evidence required to decide RV-11.

## Environment

The harness supplies only identical disposable loopback `DATABASE_URL` and
`DIRECT_URL`, after non-secret target attestation. Normal `.env` / `.env.local`
loading supplies Better Auth, UploadThing, Axiom, and all other application
configuration. Do not inject, parse, rewrite, duplicate, print, or persist any
non-database secret.

## Required evidence

Exercise only the minimum direct dependencies needed to emit the following
current-code records: allowed authorization, denied authorization, verified
UploadThing callback, and grant consumption. Inspect the actual selected local
runtime telemetry sink records—console when emitted there, or the existing
approved development Axiom sink when normally configured—using a run-scoped
filter/correlation reference held only in restricted evidence. Do not create
or alter Axiom configuration or credentials.

For each record class, compare the actual emitted field names against the
packet allowlist and forbidden fields. No identity fields, raw roles/input,
provider URLs/keys, grant IDs, tokens, headers, session material, or
provider/database error detail may appear. Publish redacted field inventories
only. If the existing sink cannot be safely queried, stop and report that exact
capability boundary; do not substitute unit/constructor evidence for runtime
records.

## Non-scope

Do not re-evaluate RV-01 through RV-10 or RV-12, change application telemetry,
provider configuration, schema, or authorization behavior. Cleanup all run
resources and retain RV-10 as NOT RUN. TERRA decides RV-11 acceptance.

## 2026-09-12 capability result

The fresh runtime selected a non-console sink, and the application has no
run-scoped redacted query surface. The actual sink could not be inspected under
the database-only harness policy, so callback and consumption records were not
available for audit. RV-11 remains PARTIAL despite the accepted sanitizer
correction. Do not substitute constructor/test output for runtime records.

## 2026-09-12 Product Owner read-only exception

The Product Owner approved one one-time, read-only inspection of the existing
development telemetry sink, using an existing authenticated query mechanism
only. It may inspect only the smallest controlled-run/time scope required for
the allowed authorization, denial, callback, and grant-consumption records.
It must never print, copy, transform, persist, or commit telemetry credentials
or raw sensitive payloads. The browser/runtime harness remains database-only.

The same approval permits existing provider-side read-only inspection and, if
available, disposal of the possible incomplete run-tracked UploadThing object.
Do not claim provider cleanup until its state is established. No configuration,
credential, schema, application, or authorization change is authorized.

## 2026-09-12 Axiom UI audit result

TERRA used the Product Owner-provided authenticated Axiom browser session and
a read-only, minute-scoped field-presence query. The query returned fresh
current-code records for the allowed authorization decision and the
upload-grant creation, verified provider-completion, and consumption phases.
Their redacted field inventories contained only the packet lifecycle labels and
envelope metadata. In particular, the fresh records had zero presence of
`organizationId`, raw `roles`, or legacy actor-role fields. The decision record
contained its permitted decision labels; the grant records contained their
permitted purpose/phase/outcome labels. No raw record values, identifiers,
credentials, URLs, keys, signatures, cookies, tokens, headers, or error detail
are retained here.

The query did not return a fresh denied `platform.authorization.decision`
record. Source review explains the gap: the unaffiliated-C upload attempt is
rejected by `requireTenantContext()` before the Category stage contract calls
the LabOS authorization service and its shared decision monitor. Its tenant
context rejection is a distinct monitor event, not the RV-11 required
authorization-decision class. This is not evidence that the sanitizer failed;
it is insufficient evidence for the required denied-decision record.

RV-11 therefore remains **PARTIAL**. A future bounded verification must select
a real, denied Category authorization path that reaches the shared decision
monitor, then perform the same field-only Axiom audit. No application change is
authorized or implied by this evidence gap.

## 2026-09-13 bounded evidence retry — harness lifecycle stop

The executor independently attested a new disposable loopback datasource,
applied all 47 migrations, and created a canonical Organization/Lab/LabSettings
fixture with a real Better Auth owner and staff Member. Source review confirmed
that the staff Member has canonical tenancy while lacking `catalog.create`, so
it is the correct denied-decision actor for the next attempt.

The isolated Next process became ready, but the temporary runner exited before
launching the Playwright browser phase. Consequently no real staff denial,
Category stage, pending grant, callback, consumption, provider object, or Axiom
record was produced. This is a harness lifecycle failure, not application,
authorization, provider, or telemetry evidence. The named disposable
container/volume, local listener, and all temporary helpers were independently
removed. RV-01 and RV-11 remain PARTIAL.

## 2026-09-13 runner lifecycle repair — controlled proof result

The temporary runner repair was limited to process supervision. A single
marker-bearing proof reached `MAIN_STARTED`, disposable database attestation,
and successful migration completion, but the parent process was lost while
waiting for the Next readiness condition. It did not reach the Next-ready or
browser-child markers, so no real browser request, pending grant, provider
object, callback, telemetry record, or RV evidence was produced.

This is a temporary harness/process-lifecycle defect. It is not evidence of an
application, authorization, provider, telemetry, schema, or architecture
defect. TERRA independently confirmed that no disposable container or volume
matching the run remained and no listener existed on the temporary runtime
port. RV-01 and RV-11 remain PARTIAL; RV-09 and RV-10 remain NOT RUN.

## 2026-09-13 two-phase runtime supervision result

The monolithic runner was replaced with a setup-only Phase A and a separate
Phase B preflight. Phase A recreated the approved loopback-only disposable
PostgreSQL target, applied the checked-in migrations, and launched Next through
its direct Node entrypoint as a detached process. It persisted only run ID,
loopback URL, runtime PID, disposable database identity, and container/volume
names. Phase B independently confirmed that the runtime PID existed, the
loopback runtime listener was reachable, and the live database identity still
matched the named disposable target. No hosted datasource was introduced.

No browser scenario followed. Recreating the required fresh canonical owner
and staff fixtures would require either the already-reviewed trusted fixture
helper or an approved in-process invocation of it. The helper was no longer
present, while the normal browser onboarding flow requires the unrelated Lab
logo upload that this pilot must not exercise. The database-only harness policy
also prohibits a standalone helper from loading or parsing local secret files.
No direct Prisma membership/tenant creation, onboarding-logo workaround,
application endpoint, or secret-loading workaround was attempted.

The detached runtime tree, browser (none launched), disposable container,
volume, metadata, and all temporary helpers were explicitly removed and
independently verified absent. RV-01 and RV-11 remain PARTIAL; RV-09 and RV-10
remain NOT RUN.

## 2026-09-20 existing-development denied-decision audit

The Product Owner-authorized normal LabOS UI created the minimum canonical
synthetic tenant fixture. A restricted staff Member accepted a real Better Auth
Organization invitation, resolved the same Organization/Lab workspace, and
submitted the normal Category-create form. The application denied the request
with its standard unauthorized response; no Category was created. This path
reached the shared authorization decision monitor rather than failing earlier
in tenant resolution.

Using the Product Owner-provided authenticated Axiom browser session, TERRA ran
a read-only query limited to the fresh development record class and
`catalog.create` denial. Exactly one matching denied decision was present. The
field-only projection found the required boundary, permission, correlation,
severity, reason, and duration labels. It found zero presence for Organization,
User, Member, or Lab identifiers; raw roles or legacy actor-role fields; raw
input; URLs or keys; tokens or headers; session material; and provider or
database error detail. No raw payload values, credentials, identifiers, or
provider material are retained here.

Together with the previously audited positive authorization, callback, and
grant-consumption records, this completes the packet's actual-sink record
inventory. RV-11 is **PASS**, as confirmed by the independent Reviewer below.

Scoped cleanup identified exactly two development-provider objects belonging
to the synthetic fixture/run (the required onboarding logo and the RV-01
Category image) and deleted both through UploadThing's supported server API.
The exact run-marked Organization/Lab fixture and its two synthetic users were
then removed; follow-up counts confirmed the Lab and users absent. The local
Next process, runtime logs, and temporary read/cleanup helpers were removed.

## Independent Reviewer verdict

The configured Reviewer independently inspected the packet, source, focused
telemetry tests, aggregate diff, redacted runtime evidence, and cleanup state.
It confirmed RV-11 **PASS**: the fresh valid-tenant denial is distinct from the
earlier pre-authorization tenant-context denial, and its actual Axiom field
inventory satisfies the allowed/forbidden contract. The focused telemetry test
set passed 9/9. No authorization, tenancy, grant-lifecycle, or telemetry
regression was identified.
