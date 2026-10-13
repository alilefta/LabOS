# D2 Vercel restricted database runtime preparation

Date: 2026-10-12
Status: PREPARED | PRODUCT_OWNER_ATTESTED_BINDING | VERCEL_RUNTIME_NOT_RUN
Authority: Product Owner decision to prepare only `lab-os-verification-deployment`; no `main` advance, push, migration, deployment, R2 mutation, or N-FILE-110 activation.

## Accepted prerequisite

The Product Owner accepted [D2 verification database hardening](d2-verification-db-hardening-20261012.md) as `CLOSED | PASS | DATABASE_HARDENED_AND_RUNTIME_VERIFIED`, with independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`. Its local certificate-verified pooler and restricted Prisma/Better Auth evidence does not attest Vercel runtime behavior. The isolated `labos-verification` database has 53 complete migrations.

## Current Vercel metadata, without secret values

- Exact project: `lab-os-verification-deployment` (`prj_wJiC2MYXpqpE9W4JIgxQnf8QfhqA`), Next.js, Node `24.x`. Latest inspected Production deployment was `READY` at old `main` SHA `ee3dd61d5715e0b06f1deaada8f4ea7aa26ba92e`. No new deployment was initiated.
- `DATABASE_URL` and `BETTER_AUTH_URL` each have one sensitive entry targeted to Production and Preview. Vercel's read APIs returned redacted values even with explicit decryption requested. The Product Owner subsequently confirmed that the database binding uses `labos_verification_app.rvtubjrczuxdxfuazjmr` at the Frankfurt transaction pooler on port 6543, and that `BETTER_AUTH_URL` is `https://lab-os-verification-deployment.vercel.app`. This is owner attestation of the hidden values, not independent provider-API or Vercel-runtime verification. No `DIRECT_URL` entry appears in the project environment-variable inventory.
- Project metadata reports Vercel Authentication enabled with `deploymentType: all_except_custom_domains`; the three listed project domains are generated `vercel.app` names, with no custom domain listed. This supports protection of the current generated deployment/production URLs, not protection of a future custom domain or the absence of every possible bypass/share link. [Vercel's September 2026 announcement](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan) confirms All Deployments authentication is available on free plans; actual project metadata, not the announcement, is the evidence for this project's present setting.
- Repository Better Auth uses `baseURL: process.env.BETTER_AUTH_URL` and declares no additional `trustedOrigins`; its browser client uses same-origin calls and login/signup callbacks are relative. [Better Auth's options reference](https://better-auth.com/docs/reference/options) says the base URL is trusted by default. The Product Owner attested the canonical deployed base URL; actual callback behavior remains unverified until the integrated deployment runs. A Preview deployment on a distinct generated origin needs separate origin verification; no broad wildcard was added.

## Exact TLS correction and Vercel change ledger

The existing `lib/prisma.ts` passed `DATABASE_URL` directly to `PrismaPg`. The isolated verification URL has no SSL parameters, and the prior successful smoke test had to inject the project CA explicitly. [Supabase's SSL guidance](https://supabase.com/docs/guides/platform/ssl-enforcement) identifies `verify-full` as certificate and hostname verification and directs clients to use its CA certificate.

The application adapter now accepts `LABOS_DATABASE_CA_CERT` as a PEM CA. It removes any URI SSL options before passing the remaining connection string plus `ssl: { ca, rejectUnauthorized: true, servername: exact URL hostname }` to the installed `PrismaPg`/`pg` adapter. This prevents URI options from overriding the verified TLS policy. It rejects a missing CA when running on Vercel and rejects malformed/non-PostgreSQL configuration without logging the URL. Outside Vercel, existing local behavior remains available when the CA variable is absent.

One Vercel configuration change was made to the exact verification project: created the sensitive `LABOS_DATABASE_CA_CERT` environment variable for Production and Preview, using the previously downloaded Supabase Root 2021 CA certificate from a Git-ignored local file. The public CA's SHA-256 fingerprint is `80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA`; it expires 2031-04-26. Postchange Vercel metadata shows exactly one new sensitive entry with the intended targets and no returned value. No database credential, migration-owner credential, R2 setting, or other Vercel project was changed.

## Verification

- With the exact Git-ignored `labos-verification` restricted pooler credential and CA, the updated repository `lib/prisma.ts` queried `current_user = labos_verification_app` successfully. A separate `pg` socket check using the same `PoolConfig` policy reported `encrypted=true` and `authorized=true`, including after a conflicting URI `sslmode=disable` option was stripped in memory. No password, URL or bearer material was printed.
- With `VERCEL=1` and no CA, module initialization failed closed with `LABOS_DATABASE_CA_CERT is required on Vercel`. A first fail-closed test attempt stopped before execution with a local Node-loader `ENOMEM`; the successful retry is the accepted result, and the original failure is retained as environmental history.
- Full `tsc --noEmit --incremental false`: PASS. Integrated Next.js 16.3.3 production build under Node 24 with the restricted verification URL and CA supplied only in process memory: PASS, including compilation, TypeScript, page-data collection and 29/29 static pages. This was a **local build**, not a Vercel deployment or runtime test.
- Local `main` SHA `ee3dd61d5715e0b06f1deaada8f4ea7aa26ba92e` is an ancestor of feature HEAD `aa73e598c9ca3326fde4850c11b85090d15f44d8`; a fast-forward is possible after the TLS correction is committed. `main` is checked out in the separate, clean `labos-main-fix` worktree, so the future fast-forward must run there. The existing `.gitignore` edit, generated-file change and unrelated untracked local paths were left untouched. `CASE_OBJECT_STORAGE_UPLOAD_ACTIVE` remains `false`.

## Remaining deployment gate

The Product Owner has attested the intended restricted database and Better Auth bindings. The provider API cannot reveal either sensitive value, so this does not independently establish the live binding. The CA variable is present, but a build does not establish that a Vercel function loaded it or verified the pooler certificate. After a separately authorized integrated deployment, test an authenticated protected browser session, Better Auth callbacks, and certificate-verified restricted database operations. No actual Vercel runtime claim is made here.

Independent V3 review: `PASS | CODE + CHECKPOINT`. The reviewer inspected the actual TLS diff, installed Prisma adapter and `pg` option precedence, synthetic conflicting URI options, Better Auth origin handling, TypeScript check and worktree state. The reviewer retained actual Vercel function TLS, protected session/callback and distinct Preview-origin behavior as `NOT_RUN`.

A1-I1 remains `BLOCKED_DECISION`; N-FILE-110 remains inactive.
