# N-FILE-110 disposable PostgreSQL attempt

Status: BLOCKED — `VERIFICATION_ENVIRONMENT_BLOCKER`; no candidate SQL/runtime scenarios executed
Run: `labos-nfile110-v3-ebf3e76e`
Date: 2026-09-28

The [redacted event log](labos-nfile110-v3-ebf3e76e-events.jsonl) is the durable primary evidence. Candidate SHA-256 `e1892370c147a05eabdd3a8a77e0b30030e0732375e7314eca8e88d657b6a17b` and C2 SHA-256 `92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80` matched. All 47 pre-C2 migration hashes matched the retained manifest. Docker engine 29.7.2 and the established PostgreSQL 17.6 image digest were attested.

One exact run-owned volume and container were created. PostgreSQL initialized and answered `SHOW server_version` with `17.6 (Debian 17.6-2.pgdg13+1)`. The harness incorrectly required the entire string to equal `17.6`, so it stopped before recording the disposable target, invoking Prisma, applying migrations 1–48 or the N-FILE-110 candidate, creating synthetic fixtures, or starting any runtime scenario. This is a version-string comparison defect in the verification harness, not evidence of an application/schema/SQL defect. No normal development/Supabase target or provider was contacted.

| Gate | Result |
| --- | --- |
| Candidate/C2/47-migration hashes | PASS |
| Docker engine/image digest | PASS |
| Server version query | Returned PostgreSQL 17.6 with package suffix; harness comparison FAILED |
| Disposable target attestation | NOT RUN to completion |
| Migration chain/C2/candidate application | NOT RUN |
| Synthetic seed and all approved SQL scenarios | NOT RUN |
| Independent V3 `RUNTIME_EVIDENCE` review | `CORRECTION_REQUIRED` for harness version comparison; confirmed pre-SQL stop and exact cleanup |
| Exact cleanup | PASS |

The harness removed the exact `labos-nfile110-v3-ebf3e76e` container, `labos-nfile110-v3-ebf3e76e-data` volume, and `.verification-labos-nfile110-v3-ebf3e76e` migration/config copy. A separate read-only Docker inspection found both exact objects absent (nonzero inspect exit codes), no matching port mapping, and no temporary directory. The run-owned helper was removed after review. The redacted event log remains.

The independent Reviewer returned `CORRECTION_REQUIRED` and confirmed that no migration, fixture, or candidate scenario executed. The Reviewer described the faulty comparison as an `APPLICATION_DEFECT` **in the verification harness**. Primary classifies the checkpoint blocker as `VERIFICATION_ENVIRONMENT_BLOCKER` under Workflow V2: the defect is confined to a temporary harness preflight, while LabOS application/schema/SQL behavior was not exercised. This does not convert any scenario to FAIL or PASS.

The minimal future harness correction is to attest PostgreSQL using `server_version_num = 170006` or an exact parsed major/minor version rather than equality against the decorated `server_version` string. A second container is **not** authorized by this one-run instruction; a separately approved rerun must start with a fresh run ID and execute the entire migration/scenario/cleanup route. N-FILE-110 schema `CODE` remains PASS; disposable PostgreSQL verification is BLOCKED, not PASS or SQL FAIL. Normal-development migration remains unauthorized.
