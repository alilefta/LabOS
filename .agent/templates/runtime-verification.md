# Runtime-verification packet — <task>

Status: PENDING
Authority: task evidence and runtime approval record
Evidence location: `docs/evidence/<feature-or-module>/<milestone>/<task-id-or-task-name>/runtime-verification.md`

Create this packet directly in the task evidence directory. It records only
runtime claims that cannot be established at code level; it is not a harness
history journal.

## Claim, tier, and target attestation

- Verification tier: `V1 | V2 | V3`
- Runtime claims / material risks:
- Classification: `NON_DESTRUCTIVE | ISOLATION_RECOMMENDED | ISOLATION_REQUIRED`
- Independently attested effective target (redacted identity):
- Attestation evidence and reviewer:

## Authority and allowed operations

- Authority: `standing disposable-fixture authority | explicit Product Owner approval`
- Allowed operations:
- External development-provider operations (separately authorized, if any):
- Explicit exclusions:

## Fixture manifest

| Run marker / fixture | Purpose | Creation/use/deletion authority | Exact cleanup proof |
| --- | --- | --- | --- |
| | | | |

## Risk-to-scenario map

| Claim / risk | Scenario | Result: PASS / FAIL / NOT_RUN / BLOCKED | Evidence / disposition |
| --- | --- | --- | --- |
| | | | |

`NOT_RUN` is not a pass. If overall runtime acceptance is
`PASS_WITH_LIMITATIONS`, record each residual unverified claim, missing
assurance, blocker type, future trigger, and Product Owner disposition.

## Harness preflight, blocker, and stop rule

- Preflight result:
- Blocker type, if any: `APPLICATION_DEFECT | VERIFICATION_ENVIRONMENT_BLOCKER | CAPABILITY_BLOCKER | AUTHORITY_BLOCKER`
- Concrete repair hypothesis (one permitted repair after first harness failure):
- Stop/reclassification condition:

Stop at the same failure boundary if the repair produces no new application
evidence. A materially new boundary may justify a new bounded investigation.

## Cleanup and durable evidence

- Cleanup result / uncertainty check:
- Retained evidence links:
- Secrets excluded:
- Parent checkpoint runtime acceptance / eligibility / closure reconciliation:
