# N-FILE-106/107 Product runtime capability diagnosis

Status: `COMPLETE — READ-ONLY DIAGNOSIS`  
Date: 2026-09-22  
Authority: Product Owner-authorized bounded capability diagnosis  
Checkpoint impact: none; PRV-01–03 and PRV-07 remain `PASS`, PRV-04–06 and
PRV-08 remain `BLOCKED`, runtime acceptance remains `PENDING`, parent gate
remains `INELIGIBLE`, and the checkpoint remains `BLOCKED_DECISION`.

No fixture, database, provider, application, schema, migration, configuration,
credential, permission, deployment, or checkpoint mutation was performed.

## Server-module runtime

### Observed cause

The failure originates from the Codex sandbox process identity/profile, before
`tsx` or application code executes:

- plain `node:os.userInfo()` under the sandbox identity failed with
  `ERR_SYSTEM_ERROR`, syscall `uv_os_get_passwd`, and the reported `ENOMEM`;
- the process had approximately 1.7 GB free system memory, a 4 GB Node heap
  limit, and a small resident set, excluding an actual memory-pressure cause;
- `tsx` 4.22.4 initializes its temporary directory from
  `process.geteuid()` on POSIX or `os.userInfo().username` on Windows, so the
  Windows failure occurs during loader initialization;
- `pnpm exec` in the same sandbox also failed while resolving the inaccessible
  real-user profile path, independently confirming the profile mismatch;
- the same plain Node identity probe succeeded outside the sandbox; and
- outside the sandbox, direct local-loader invocation successfully imported
  both existing Product command/staging modules with their expected exports.

This is a concrete harness condition, not an application defect, Node resource
limit, database condition, or failed Product module import.

### Smallest supported remediation

Run one run-owned TypeScript helper outside the sandbox using the repository's
installed loader directly:

```text
node --conditions=react-server --import tsx <run-owned-helper.ts>
```

Do not route through the sandboxed `pnpm` shim. The helper must retain the
approved command/domain method: derive canonical TenantContext values only
from exact run-marked Better Auth Organization/Member/Lab relations, assert
fixture cardinality, and call the existing
`authorizeCatalogProductImageStage` and `executeCatalogProductUpdate`
functions with the real authorization service and transactional grant service.
It must not mock, inject, weaken, or bypass authorization, and must emit only
redacted outcomes/counts before exact removal.

Change classification: no application code, infrastructure, credential, or
permission change. A subsequent execution requires approval to run the helper
outside the sandbox and to create/use/clean the bounded synthetic fixtures.

## Axiom read access

### Observed cause

Two independent read-only SDK checks isolated the boundary:

- dataset discovery succeeded, returned one visible dataset, and confirmed
  that the configured dataset identity is visible to the current token;
- a one-row APL query through the configured EU edge reached the documented
  `POST /v1/query/_apl` endpoint and returned HTTP 403.

Therefore the token is present and valid, the configured dataset is not a
name mismatch, and the SDK selected the correct edge query endpoint. The
narrowest remaining cause is missing query authorization for the configured
dataset on the current API token (for example, a basic ingest token or an
advanced token without dataset query permission). Axiom documents that basic
API tokens are ingest-only, advanced tokens can receive dataset-limited query
permission, and an existing token's privileges cannot be changed after
creation:

- https://axiom.co/docs/reference/tokens
- https://axiom.co/docs/restapi/endpoints/queryEdge

### Smallest supported remediation

Preferred: the Product Owner restores an authenticated Axiom UI session whose
user already has read/query access to the configured development dataset, as
used by the accepted WorkType runtime checkpoint. This changes no application
code, infrastructure, application credential, or provider configuration.

API alternative: an Axiom administrator creates a separate least-privilege,
short-lived advanced API token with query access only to the existing
development dataset and supplies it for the verification query without
replacing the application's ingest credential. This is a new verification
credential and permission grant, but not an application, infrastructure, or
provider-configuration change. The current token must not be rotated or
broadened.

Until one of those authorities is available, PRV-08 remains unavailable.

## Subsequent rerun boundary

A later Product Owner authorization may cover only PRV-04, PRV-05, PRV-06,
and PRV-08. PRV-01–03 and PRV-07 remain accepted and must not be repeated.

Minimum rerun scope:

1. Re-attest the same local application, Supabase development database,
   Better Auth configuration, UploadThing development project, and restored
   Axiom read capability before mutation.
2. Create one new collision-resistant A/B synthetic fixture set: two users,
   Organizations, Members, and Labs; Categories A/B; WorkTypes A1/A2/B; and
   Products A2/B. Product A2 begins under A1; Product B belongs to B.
3. Create the minimum N-FILE-107 replay prerequisite without re-evaluating
   PRV-03: one real Product A2 replacement upload/callback and its successful
   first transactional consumption. This is unavoidable because the prior
   consumed grant was exactly cleaned and grant fabrication is prohibited.
   Expected provider objects are the two onboarding logos plus this one
   Product replacement object.
4. Run only the approved outside-sandbox helper operations: foreign WorkType B
   rejection, same-Lab reassignment A1 to A2, cross-tenant Product B stage and
   commit denial, and replay of the consumed N-FILE-107 grant. Retain only
   before/after hashes, counts, and error classes/codes.
5. Query only the smallest fresh Product telemetry window covering the setup
   allow/callback/consumption plus the PRV-04–06 allow/deny/replay outcomes;
   retain field inventories and counts, never event values or credentials.
6. Perform exact provider/database/browser/helper cleanup, verify zero run
   markers and keys, and obtain independent `RUNTIME_EVIDENCE` review before
   Primary re-evaluates runtime acceptance or the parent gate.

No Docker, migration/reset, application change, raw-URL experiment, callback
replay, PRV-01–03/PRV-07 rerun, deployment, commit, or N-FILE-108/109 work is
part of this proposed rerun boundary.
