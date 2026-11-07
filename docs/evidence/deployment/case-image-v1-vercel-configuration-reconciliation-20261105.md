# Case Image V1 Vercel configuration reconciliation — 2026-11-05

Scope: verification Vercel project configuration only. No deployment, upload activation, Supabase operation, R2 operation, or application-source change.

## Read-only metadata and scoped update

- Exact project: `prj_wJiC2MYXpqpE9W4JIgxQnf8QfhqA` (`lab-os-verification-deployment`). Canonical `lab-os-verification-deployment.vercel.app` domain verified against this project.
- Node `24.x`; SSO Deployment Protection enabled for all deployments. Latest deployment remained `dpl_6DNV7Kgye2ahSMaA5APNdpVzXFeg` after the check.
- Seven required Secret variable names exist and each currently targets both Production and Preview. The hosted Case image enablement flag is absent; the listing reports zero hidden Production entries.
- Operator reported re-entering `DATABASE_URL` and `BETTER_AUTH_URL` from verification records. Connector metadata has a recent update timestamp for `DATABASE_URL`; `BETTER_AUTH_URL` retains its older timestamp, so its saved value remains operator-reported rather than independently confirmed. Secret values were never retrieved or recorded.
- The remaining five bindings (`LABOS_DATABASE_CA_CERT` and four `LABOS_R2_*` entries) are masked and were not re-entered or attested in this task. Their exact values remain `NOT_ATTESTED`.
- Operator initially reported system-variable exposure disabled. A scoped Vercel project update requesting `autoExposeSystemEnvs: true` returned successfully and changed project `updatedAt`. The update and subsequent project-read responses omit that field. The operator could not locate the checkbox after refresh. Therefore the effective setting is **not independently attested**.
- System-variable exposure is a project-wide setting; the seven Secret variables also target Preview. The operator selected a later Production-only correction rather than accepting the broader Preview scope now. No variable targeting was changed in this check.

## Preserved source and deployment boundary

The reviewed source manifest remains exact: 1,609 of 1,609 staging files match their per-file hashes and aggregate identity `d218bdb7359883e4683c6d1ae7f79715f928b1641c783a181c6518187f6a3f53`; reviewed archive SHA-256 remains `ee7ee558077d5af720435f342e9fd9a2306f4154d602c4700ddd69a577e5a782`. No new source was mixed in. Existing deployment did not change. Environment-variable changes apply to a future deployment only.

## Independent V3 and disposition

Focused independent V3: `CORRECTION_REQUIRED | CHECKPOINT`. No application defect found. The reviewer identified three readiness gaps: effective system-variable exposure has no independent readback; five required Secret bindings remain unattested; and the verification credentials' Preview scope needs a correction or explicit Product Owner acceptance. The activation flag remains absent and the gate fails closed.

Configuration readiness is **not yet established**. No redeployment is authorized by this task.
