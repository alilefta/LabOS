# Authorization V1 file plan

Status: Active
Authority: Supporting
Owner: Project owner
Last reviewed: 2026-09-05

## Current workstream

N-FILE-001 is the active UploadThing/file-authorization workstream. Wire one Catalog-image upload pilot through its registered boundary and the approved D-FILE-01 opaque grant runtime. Split mixed Catalog/Dentist behavior before enforcing it. Do not activate Case assets where D-FILE-04 is required.

## Sequence and gates

1. Register the narrow Catalog create/update boundary with server-owned permission, trusted target, and closed intent.
2. Create a canonical Organization/Lab/Member-linked grant only after authorization; callback loads only the opaque grant definition.
3. Consume the grant exactly once inside the final Catalog transaction; test expiry, tenant mismatch, replay, denial ordering, safe DTOs, and telemetry allowlist.
4. Keep expiry scheduling and provider orphan deletion isolated operational follow-up with bounded retries.

## Blocking decision

D-FILE-04 is the pending stored-file read/access decision. Catalog imagery and Case clinical assets may differ. URL possession and upload authorization do not establish read authorization. No public, signed-private, or other read policy is selected here.

Durable resulting rules are in [Files architecture](../../architecture/modules/files.md) and [decisions](../../architecture/decisions.md); completed grant evidence is [here](../../evidence/authorization-v1/file-upload-grants.md).

## Stable protected upload boundary map

| ID | Purpose / operation | Target | Current lifecycle and dependency |
| --- | --- | --- | --- |
| N-FILE-101 | Staff self-avatar stage | Staff self target | Deferred/unavailable by D-FILE-03; not registered. |
| N-FILE-102 | Catalog Category image create stage | Collection (no target) | Registered grant definition, 15-minute TTL; endpoint wiring active work. |
| N-FILE-103 | Catalog Category image update stage | `catalog.category` | Registered grant definition, 15-minute TTL; endpoint wiring active work. |
| N-FILE-104 | Catalog WorkType image create stage | Collection (no target) | Registered grant definition, 15-minute TTL; endpoint wiring active work. |
| N-FILE-105 | Catalog WorkType image update stage | `catalog.worktype` | Registered grant definition, 15-minute TTL; endpoint wiring active work. |
| N-FILE-106 | Catalog Product image create stage | Collection (no target) | Registered grant definition, 15-minute TTL; endpoint wiring active work. |
| N-FILE-107 | Catalog Product image update stage | `catalog.product` | Registered grant definition, 15-minute TTL; endpoint wiring active work. |
| N-FILE-108 | Dentist avatar create stage | Collection (no target) | Registered grant definition, 15-minute TTL; endpoint wiring active work. |
| N-FILE-109 | Dentist avatar update stage | `dentist` | Registered grant definition, 15-minute TTL; endpoint wiring active work. |
| N-FILE-110 | Case asset create stage | Case | Deferred/unavailable pending D-FILE-04 stored-file read/access decision. |
| N-FILE-111 | Case asset update/replace stage | Case asset / Case | Deferred/unavailable pending D-FILE-04 stored-file read/access decision. |
