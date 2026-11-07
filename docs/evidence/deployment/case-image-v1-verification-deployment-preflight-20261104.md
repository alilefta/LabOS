# Case Image V1 protected verification deployment preflight — 2026-11-04

Scope: isolated source preparation, Linux Node 24 validation, and read-only Vercel Production configuration inventory. No deployment, hosted environment mutation, upload activation, Supabase mutation, or R2 operation occurred.

## Reviewed source snapshot

- Base Git HEAD: `4e42c54866e2bc3d5eb1b638d37ebf5491780134`. Base `git archive` SHA-256: `ce11391d841ea10794fc0d4326d05c744133f2ef655017890ce015bf8ff07a46`.
- Exactly 57 selected overlay files, each individually SHA-256 checked against the original working tree: 6 app, 2 component, 20 module, 9 Prisma/schema/migration, 2 dependency/lockfile, and 18 relevant test files. Overlay manifest SHA-256: `a5e08a4672dff1ea2f43fdcef9ba36ce6330d899451b1a2e9b7d16f2c176d525`.
- The overlay includes accepted Case Image upload/attachment/private-open routes, Case UI, JPEG S001 handoff, PNG/WebP V1 validators/finalizer, object-storage adapters and activation policy, current Prisma schema and migrations 54–61, Sharp dependency, lockfile, and focused regressions.
- Excluded unrelated dirty `.agent`, `.gitignore`, documentation, scratch/cache/editor/experiment paths, cleanup scripts and tests not required for the application build. The baseline tracked tree remains otherwise at HEAD. No source file in the original working tree was edited.
- A clean manifest-derived deployment staging tree contains exactly 1,609 source files. Every file matches its manifest SHA-256; aggregate source-tree SHA-256: `d218bdb7359883e4683c6d1ae7f79715f928b1641c783a181c6518187f6a3f53`. It contains no `.env*`, `node_modules`, `.pnpm-store`, `.next`, or copied generated Prisma output. Its compressed archive has 1,609 file entries and no excluded path; archive size 84,629,356 bytes, SHA-256 `ee7ee558077d5af720435f342e9fd9a2306f4154d602c4700ddd69a577e5a782`.
- Run-owned paths: `.tmp/case-image-v1-source-20261104-67d04b16/deploy-source`, sibling `source-manifest.json`, `overlay-manifest.json`, and `case-image-v1-deploy-source.tar.gz`. The archive and clean staging directory are the deployable source candidates. Do not deploy the separate install/build runner directory.

## Isolated Linux validation

- Docker Linux x86_64, `node:24-bookworm-slim` image, Node 24.21.0, N-API 10, OpenSSL 3.0.22, pnpm 11.5.3. Installed 1,005 packages from the frozen lockfile. Prisma Client 7.8.0 and Zod output were regenerated from the selected schema; no generated output was copied into the clean deployable tree.
- TypeScript `tsc --noEmit` passed with `NODE_OPTIONS=--max-old-space-size=5120`. The first run hit Node's default ~2 GiB heap cap before reporting type errors; no source correction was made.
- Applicable Linux JPEG S001, PNG/WebP, activation, route and Case UI selection: 165/165 tests passed across 16 files. An initial broader command included two Windows-only R001 native-helper suites: 172 tests passed and 8 Windows-helper assertions failed on Linux. Those platform-specific suites were excluded from the applicable rerun; the R001 implementation was not changed.
- `next build` passed (Next.js 16.3.3). Optimized compilation completed in 5.5 minutes; build TypeScript completed in 2.6 minutes. Dynamic output includes `/cases/[caseId]`, upload `intent`, `complete`, `attach`, and authorized asset `open`. The completion route trace has 503 entries and includes the pinned JPEG `node-napi-v10.node`, `libturbojpeg.so.0`, Sharp and libvips shared library. This is build tracing, not deployed native invocation.
- In the isolated runtime, Sharp 0.35.4 and libvips 8.18.6 loaded. The JPEG package loaded on Linux x64/Node 24/N-API 10; actual addon SHA-256 `627fa49f801c8386e90c6844d4c75aa85dd4eaabccaeae38994af069c9e36eea`, library SHA-256 `6facda09ef3e2308608f2b0214c040791e276305a48a27036362402f95fffcf5` match the accepted S001 manifest.
- The build process had `LABOS_CASE_IMAGE_HOSTED_VERIFICATION_ENABLED` absent and no hosted credentials. Better Auth logged missing origin/default-secret warnings during static page collection; the build exited successfully. These warnings reflect deliberately omitted verification secrets and do not establish hosted runtime behavior.

## Vercel Production configuration inventory

- Read-only project control plane: `prj_wJiC2MYXpqpE9W4JIgxQnf8QfhqA`, `lab-os-verification-deployment`, verified canonical domain `lab-os-verification-deployment.vercel.app`, Node `24.x`, SSO deployment protection enabled for `all` deployments.
- Production-scoped keys exist for `DATABASE_URL`, `LABOS_DATABASE_CA_CERT`, `BETTER_AUTH_URL`, `LABOS_R2_ACCOUNT_ID`, `LABOS_R2_BUCKET`, `LABOS_R2_ACCESS_KEY_ID`, and `LABOS_R2_SECRET_ACCESS_KEY`. Their values are masked. No `LABOS_CASE_IMAGE_HOSTED_VERIFICATION_ENABLED` entry exists, and the environment listing reported zero hidden Production entries.
- Project metadata does not reveal the installed values, so verification database project `rvtubjrczuxdxfuazjmr`, restricted login `labos_verification_app`, Better Auth canonical origin, R2 verification account/bucket, and D2-R3 credential binding remain **unattested for this deployment preflight**. Prior operator statements are not a readback of the installed masked values. Current system-variable exposure awaits operator confirmation.
- Application `DATABASE_URL` must use the restricted verification application identity. `DIRECT_URL` and the migration-capable `postgres` login are for migration tooling and must not be installed as the app connection. `LABOS_DATABASE_CA_CERT` must contain the verification CA certificate only; `lib/prisma.ts` applies host-verified TLS using that CA. Do not copy the whole local `.env` or place a migration password in Vercel.

## Operator-only resolution and next deployment boundary

The Vercel dashboard masks these installed values. If the operator cannot attest them through an approved secret-store audit, a separately authorized, precise Production re-entry is needed: select only project `prj_wJiC2MYXpqpE9W4JIgxQnf8QfhqA`; set `DATABASE_URL` from the restricted verification application role and project, `LABOS_DATABASE_CA_CERT` from its approved CA, `BETTER_AUTH_URL` to the canonical verification origin, and the four `LABOS_R2_*` account/bucket/access-key/secret bindings from the accepted verification-only D2-R3 password-manager entry. Do not enable the hosted upload flag. Recheck project system-variable exposure and SSO protection. No such re-entry is authorized or performed here.

Only after those attestations and separate deployment authorization should the clean staging tree or verified archive be deployed to the exact verification project Production target with the upload flag still absent, followed by protected-domain and disabled-upload runtime checks.

The exact run-owned Linux verification container and install/build runner directory were removed after evidence capture. The clean `deploy-source` tree, source/overlay manifests, base archive, and compressed deploy-source archive remain intact for the separately authorized deployment.

## Independent review

Independent V3 initially found the install/build runner's `.pnpm-store` could enter a direct CLI upload. A clean manifest-derived staging directory and archive resolved that packaging risk. Final V3 disposition: `PASS | CODE` for source provenance and manifest; Vercel binding, deployment and hosted runtime remain outside that review.
