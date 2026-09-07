# Runtime Verification Packet

## Target

Environment:

Database:

Provider/project:

Disposable/shared:

## Authorized operations

Migration application:

Real provider callbacks/files:

Browser interaction:

Data creation:

Data mutation:

Data deletion:

Fixture cleanup:

## Fixtures

Tenant / Organization A:

Actor A:

Tenant / Organization B:

Actor B:

Required roles / memberships:

Seed or setup steps:

## Verification scenarios

1.

2.

3.

## Security / isolation checks

- authorization ordering;
- cross-tenant denial;
- membership validation;
- no existence leakage where applicable;
- authoritative opaque identifiers only;
- transaction / replay behavior.

## Evidence

Commands:

Screenshots/logs required:

Database observations:

Provider observations:

Evidence destination:

## Cleanup

Required cleanup:

Restoration expectations:

## Stop conditions

Stop immediately if:

- environment identity does not match the approved target;
- migration scope differs from approval;
- unexpected destructive behavior appears;
- provider behavior contradicts approved assumptions;
- tenant isolation cannot be established safely.

## Product Owner approval

Status: PENDING

Approved environment:

Approved operations:

Approval notes:
