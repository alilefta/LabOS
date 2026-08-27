# Authorization V1 quality baseline

**Recorded:** 2026-08-27  
**Baseline commit:** `faadb35` plus the Axiom environment-contract correction in
this checkpoint  
**Scope:** Authorization V1, Better Auth Organization integration, membership
administration, tenant switching, and their observability adapters

## Decision

The Authorization V1 milestone adds no known lint or TypeScript violation in
its production scope. The repository is not globally clean, so the remaining
application errors below are accepted as a version-controlled pre-existing
baseline and must not increase in an authorization change.

This baseline is not permission to ignore the debt. It separates unrelated
case, invoice, catalog, dashboard, file-upload, and settings cleanup from the
security-sensitive authorization cutover.

## Executed gates

| Gate | Result |
|---|---|
| `pnpm test:run` | Pass — 61 files, 418 tests |
| Focused rollback/enforcement tests | Pass — 4 files, 29 tests |
| Focused Axiom configuration/telemetry tests | Pass — 2 files, 7 tests |
| Focused Authorization V1 ESLint | Pass — no errors or warnings |
| Team & Roles page ESLint | Pass — no source violations |
| `pnpm exec eslint .` | Baseline — 13 errors, 254 warnings |
| `pnpm exec eslint . --quiet` | Baseline — 13 errors in 8 unrelated files |
| `pnpm exec tsc --noEmit --pretty false` | Baseline — 7 errors in 4 unrelated case/invoice mapper files |

The initial TypeScript run also found four Axiom test errors caused by requiring
the entire `NodeJS.ProcessEnv` shape. This checkpoint corrected the production
configuration reader to accept a read-only string environment record. Focused
tests and ESLint pass, and no Axiom/authorization error remains in the final
TypeScript baseline.

## Accepted ESLint error baseline

| File | Count | Category |
|---|---:|---|
| `app/(main)/settings/billing/page.tsx` | 1 | explicit `any` |
| `app/(main)/settings/preferences/page.tsx` | 1 | synchronous state update in effect |
| `components/cases/case-details/quick-add/add-staff-popover.tsx` | 4 | explicit `any` |
| `components/catalog/catalog-browser-tree.tsx` | 1 | unescaped entity |
| `components/catalog/product-matrix-grid/product-matrix-card.tsx` | 1 | unescaped entity |
| `components/dashboard/overview/dashboard-production-chart.tsx` | 1 | explicit `any` |
| `components/shared/file-assets/catalog-image-upload.tsx` | 1 | synchronous state update in effect |
| `components/technicians/technician/technician-ai-copilot.tsx` | 2 | unescaped entities |
| `utils/schema-adapters.ts` | 1 | explicit `any` |

The 254 warnings are primarily unused declarations, generated Prisma schema
warnings, and existing raw-image optimization warnings. They are tracked as
application-quality debt and are not introduced by this cutover.

## Accepted TypeScript error baseline

| File | Count | Existing mismatch |
|---|---:|---|
| `data/cases/get-case.ts` | 1 | Prisma `Decimal` assigned to numeric DTO field |
| `lib/mappers/composers.ts` | 1 | required work-item `addons` relation missing |
| `lib/mappers/normalizers.ts` | 2 | Prisma `Decimal` assigned to case/invoice numeric DTO fields |
| `lib/server-only-helpers.ts` | 3 | missing `addons` relation and `Decimal` DTO mismatches |

## Baseline enforcement rule

Before merging an Authorization V1 follow-up:

1. Run the full test suite and focused authorization ESLint.
2. Run repository-wide ESLint and TypeScript.
3. Reject any new error, increased error count, or error in an authorization,
   tenant, membership, Better Auth, safe-action, or observability file.
4. Update this baseline only in a dedicated quality-debt change with an
   explicit explanation.

