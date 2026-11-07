# Case Image V1 protected verification deployment — 2026-11-05

Scope: deploy the reviewed Case Image V1 source to the separate protected Vercel verification project with hosted uploads disabled. No credential, environment-variable, R2, Supabase schema, or customer-facing production changes were made in this deployment task.

## Source and target preflight

- Reviewed source manifest: 1,609 files; all 1,609 staging files matched per-file SHA-256 before and after deployment. Aggregate source identity `d218bdb7359883e4683c6d1ae7f79715f928b1641c783a181c6518187f6a3f53`.
- Preserved source archive SHA-256 `ee7ee558077d5af720435f342e9fd9a2306f4154d602c4700ddd69a577e5a782`. No `.env*` file or additional source file remained in the staging tree. Vercel's generated `.vercel/project.json` and README are the only additional local link metadata.
- Target project `prj_wJiC2MYXpqpE9W4JIgxQnf8QfhqA`, team `team_56S5heJty9HvI1lYropHsab6`, canonical domain `lab-os-verification-deployment.vercel.app`, Node `24.x`, SSO protection for all deployments. Required seven Production Secret variable names existed. `LABOS_CASE_IMAGE_HOSTED_VERIFICATION_ENABLED` was absent, with zero hidden Production entries.
- The Product Owner accepted the unchanged Better Auth, R2 and database CA bindings as verification configuration and the temporarily shared Production+Preview variable scope. `DATABASE_URL` was operator-updated to the restricted verification application connection. Production-only narrowing remains follow-up work.
- Pinned Vercel CLI `65.11.0` linked only the clean staging directory to the exact project ID. Link automatically created a local `.env.local` containing a short-lived OIDC token; it was removed without opening or copying it before deployment. The link ID was independently checked via CLI project inspection.

## Deployment and build

- Command: Vercel CLI `deploy --prod --yes --archive=tgz` from the linked clean staging directory. A source-hash metadata argument was supplied, but the deployment API response exposes only Git metadata; provenance relies on the local manifest/hash verification and the CLI source deployment record, not on a server-read custom hash.
- Deployment `dpl_BwJz69tPsuvyaRp9zHfavDEN9sFX`, source `cli`, target `production`, ready state `READY`, alias `https://lab-os-verification-deployment.vercel.app`. Vercel CLI reported protection `vercel_authentication`.
- Hosted Next.js 16.3.3 build compiled successfully, completed TypeScript and finished in `/vercel/output`. Build events showed no reported build warning or error. Dynamic build output included `/cases/[caseId]`, the Case image `intent`, `complete`, `attach` routes, and authorized asset `open` route.
- No new diagnostic endpoint, application code change, commit, push, or additional deployment was made. Native JPEG/Sharp invocation remains untested on this hosted deployment because uploads were disabled; the accepted Linux Node 24 build and local native identity evidence remain separate.

## Protected runtime

- An unauthenticated GET to the canonical domain returned HTTP 302 to Vercel SSO. The authenticated Vercel CLI request to `/` returned HTTP 200. The CLI explicitly identified its request as bypassing Deployment Protection; the unauthenticated 302 and Vercel deployment/project protection metadata establish that SSO remained active.
- Protected `GET /api/auth/get-session` returned HTTP 200. One synthetic nonexistent-user `POST /api/auth/sign-in/email` with the canonical Origin returned HTTP 401. Sanitized Function log recorded the expected `User not found` event rather than a database connection or origin error. The synthetic request body was removed from a run-owned temporary file after the call; it contained no real account credential.
- Read-only query against Supabase verification project `rvtubjrczuxdxfuazjmr` (PostgreSQL `17.11.0.003`, database `postgres`) found one `labos_verification_app` Supavisor session with state-change time `2026-11-05 15:29:52 UTC`, the same second as the invalid-sign-in Function log. This supports the restricted application connection identity without exposing the database URL. It is correlation, not a direct inspection of the Function's secret value.
- Protected `GET /cases/88888888-8888-4888-8888-888888888881` returned HTTP 307 to the canonical `/sign-in`, confirming the dynamic Case route's unauthenticated guard. No authenticated Case detail was opened in this check.
- Protected `POST /api/cases/88888888-8888-4888-8888-888888888881/clinical-upload/intent` returned HTTP 404 while the enablement flag was absent. The accepted route exits before grant creation or provider use when disabled. No R2 object operation or clinical attachment was requested.
- Raw read-only Vercel project API reported `autoExposeSystemEnvs: true` for the exact project. Runtime Function log metadata identified deployment `dpl_BwJz69tPsuvyaRp9zHfavDEN9sFX`, canonical domain, `production`, and `nodejs24.x`. The app does not expose the individual `process.env.VERCEL_*` values while the upload flag is disabled; their exact in-Function values were not directly observed. The setting readback plus platform runtime metadata support the intended identity, with that limit stated.
- Sanitized runtime logs showed the expected synthetic `User not found` error and ordinary proxy calls; no database connection, missing-module, native-load, or unexpected Function error was observed. No absence-of-all-errors claim is made outside these requests and the queried log window.

## Remaining boundary

Hosted Case image upload routes remain intentionally disabled. A separately authorized controlled hosted JPEG/PNG/WebP test will require flag enablement, native invocation, browser-to-R2 PUT and private-read checks. The Product Owner accepted the current Production+Preview Secret scope temporarily; narrowing it to Production-only remains follow-up. No R2 operation occurred in this deployment task.

## Independent V3

`PASS | RUNTIME_EVIDENCE + CHECKPOINT`. The reviewer independently confirmed the exact protected Production deployment, build and route evidence, disabled upload response, restricted-connection correlation, and sanitized runtime logs. The review retained the explicit limits: individual `process.env.VERCEL_*` values were not directly observed in-Function; hosted JPEG/Sharp invocation and enabled upload/R2/private-read behavior remain `NOT_RUN`. The reviewed local source manifest establishes the submitted source; server deployment metadata does not repeat the custom source hash.
