# Integrated feature-branch build readiness — 2026-10-12

Status: local build readiness verified; independent V3 `PASS | CODE + RUNTIME_EVIDENCE + CHECKPOINT`; Product Owner deployment decision pending. This packet does not authorize merging, migration, deployment, or N-FILE-110 activation.

## Target and authority

- Branch/HEAD: `feat/authorization-financial-reads` / `a1b4fd556522333ff0b54d1bcd48c7209d3337d5`.
- Local build host: Windows x64, Node 24.21.0, pnpm 11.5.3, Next.js 16.3.3. The isolated Linux check used the pre-existing `node:24-bookworm-slim` image at `node@sha256:d6aa754f16b3197301076f047b5def2f02ea1dbbc2ca920407d46d7ec7f87b20` (Linux amd64, Node 24.21.0, N-API 10, Debian glibc 2.36).
- The pre-existing 21 untracked excluded paths were preserved. No Supabase, R2, Vercel, credential, migration, `main`, or remote mutation occurred.
- `CASE_OBJECT_STORAGE_UPLOAD_ACTIVE` remains `false`; A1-I1 remains `BLOCKED_DECISION`.

## Commands and results

| Claim | Result | Evidence and limit |
| --- | --- | --- |
| Frozen dependencies | PASS | `pnpm install --frozen-lockfile`; lockfile unchanged. |
| Prisma client/schema | PASS | `pnpm exec prisma generate` and `pnpm exec prisma validate`. The initial `pnpm exec` invocation hit a local Windows PATH parsing problem; a process-only minimal PATH allowed both commands to complete. The generated manifest timestamp was restored after checking that no generated source diff remained. No database was contacted. |
| Full application TypeScript | PASS | `pnpm exec tsc --noEmit --incremental false` with 6144 MB Node heap. Initial run reported five missing-module errors only in archived `docs/evidence` harnesses. `tsconfig.json` now excludes that historical directory while retaining application and active `tests` typechecking; rerun passed. Next production build's TypeScript phase also passed. |
| Sensitive URL logging | PASS | Removed `logging.fetches.fullUrl: true`; retained `hmrRefreshes` development diagnostics. Installed Next documentation confirms `fullUrl` logs complete fetch URLs in development. |
| Unfiltered tests | FAIL / ENVIRONMENTAL plus corrected tests | Initial `pnpm test:run`: 1113 passed, 5 skipped, two disposable-PostgreSQL integration suites rejected this environment's target, and two unit tests failed (Prisma schema whitespace assertion and full-suite route-import timeout). The two unit tests were corrected without changing product behavior. The database suites require their exact isolated fixtures and were not pointed at the normal development database. |
| Runnable local test suite | PASS | `pnpm exec vitest run` excluding only `r2-03-case-composition.test.ts` and `r2-04-case-attachment-open.test.ts`: 143 files passed, 5 skipped; 1115 tests passed, 5 skipped. Corrected tests also passed 9/9 in a focused run. Disposable database integration remains NOT_RUN in this task. |
| Integrated Next production build | PASS on Windows | `pnpm build` completed compilation, TypeScript, page-data collection and all 29 static pages. Process-only placeholder database URLs prevented access to the populated database; a synthetic build-only Better Auth secret was used. An initial sandbox build stopped at Google Font fetches; retry with network access passed. |
| Linux x64/Node 24 production build and S001 native packaging | PASS in isolated local Docker | After Docker became available, a fresh `node:24-bookworm-slim` container copied current source from a read-only mount, excluding local `.env` files, and installed the frozen lockfile with pnpm 11.5.3. Prisma validation and the complete Next production build passed, including TypeScript, page-data collection and all 29 static pages. In the same Linux process, the actual Julusian addon loaded, `/proc/self/maps` contained the addon and adjacent library, and their SHA-256 values matched the pinned S001 manifest. The completion route's Linux `.nft.json` listed both native files. This proves the local Linux artifact, not a deployed Vercel runtime. |

The first disposable container stopped before installation because the image supplies `corepack pnpm` without a `pnpm` shim. The next fresh install exposed a missing pnpm script-policy entry for the accepted Julusian package and stopped before validation/build. Adding only `@julusian/jpeg-turbo: true` to `allowBuilds` in `pnpm-workspace.yaml` allowed the package's `pkg-prebuilds-verify` install script; the following fresh install/build passed. All three run-owned containers used `--rm`; a final Docker inventory found no `labos-build` containers, volumes or networks. No pre-existing Docker resource was removed.

## Remaining gates

The code builds on Windows and isolated Linux, and the runnable suite passes. Before deployment, verify the exact integrated commit against the isolated Supabase verification database, migration history, restricted runtime role, and actual Vercel native bundle/runtime. The two fixture-bound integration suites were not run here. The synthetic Linux build emitted Better Auth base-URL warnings because it intentionally had no deployment URL; deployed URL/callback configuration remains an environment gate. N-FILE-110 remains inactive and A1-I1 remains blocked.

## Independent review

Independent read-only V3 verdict: `PASS | CODE + RUNTIME_EVIDENCE + CHECKPOINT`. The reviewer inspected the exact diff, independently reran the focused tests (9/9) and full TypeScript check, confirmed the inactive Case routes and native trace, and found no material correction. The reviewer accepted the Linux build and cleanup claims as bounded packet evidence; its own Docker inventory call was denied, so it did not independently rerun that cleanup check. Actual Vercel runtime and the fixture-bound database suites remain separate gates.
