# V1 managed-public Case read/open application code

Date: 2026-09-30  
Scope: V3 Sensitive, application CODE only  
Acceptance: `PASS | CODE` after independent review

## Boundary implemented

- `CaseAssetSummarySchema` and `normalizeAssetFile` add a safe `MANAGED_PUBLIC` variant with stable asset ID and clinical display fields. Legacy URL behavior and `MANAGED_PRIVATE` unavailable behavior remain distinct.
- The vault renders an explicit public open link to `/api/cases/[caseId]/assets/[assetId]/open`. It does not embed the provider URL or prefetch. Detail, draft, and edit callers supply the parent Case ID; N-FILE-110A asset omission remains preservation, not deletion.
- Each open resolves canonical tenant context and applies existing C1 `case.read` to the Case target before Files/provider lookup. The existing policy supplies Owner/Admin/Manager and active-assignment Staff decisions. The service then resolves the asset under that Case and requires the public mode, current version, `PUBLIC_READ` StoredFile, same tenant, exact grant/provider object and matching clinical evidence. Null/private access and historical `MANAGED_PRIVATE` fail closed.
- The server-only Files adapter uses UploadThing 7.7.4 `UTApi.getFileUrls` for the persisted key and verifies exact key, single result, and HTTPS. The route redirects with `private, no-store` and `no-referrer`; generic denied/unavailable paths contain no key or URL. The SDK method is supported in the installed version but marked deprecated, so future SDK upgrades must recheck it.
- No C3 `ISSUED` event is written. A direct UploadThing public-read URL remains usable by anyone who possesses it; the redirect minimizes application exposure but does not make provider retrieval private.

## Verification

Writer: 56 focused tests across seven suites passed, covering fixed Case-read roles and Staff assignment, cross-tenant denial, authorization order, mixed DTOs, private/null/inconsistent denial, trusted URL translation, route headers, legacy vault behavior, and N-FILE-110A preservation. TypeScript `tsc --noEmit` passed. Prisma validation passed. Focused lint passed with zero errors; the legacy vault `<img>` produced one existing warning in the broader lint run.

Independent Reviewer: `PASS | CODE`; actual service, route, adapter, DTO/UI diff, tests, C1 and C3 boundaries, accepted contract and schema relations reviewed. No findings. The query-selector ordering was corrected before final review: valid Case selectors receive C1 authorization before unsupported query rejection, and no Files/provider lookup follows rejection.

## Limits and next gate

Provider network retrieval, browser opening, real managed public Case attachment, private/signed access, and N-FILE-110 runtime activation were `NOT_RUN`. This is code acceptance only. The next bounded gate requires separate Product Owner authority for N-FILE-110 Case-only provider upload/callback handoff; JPEG R001, rejected-object cleanup, first attachment, and runtime acceptance remain separate slices.
