# C2 mixed Case asset read-contract correction

Status: CLOSED for C2 code work. Independent V3 CODE rereview PASS; Primary
code acceptance PASS. No database, migration, provider, or runtime authority
was exercised.

## Contract

- `CaseAssetSummary` is discriminated by `storageMode`.
  `LEGACY_URL_UNVERIFIED` preserves the existing ID, Case/Lab linkage,
  title, description, type, timestamps, URL, and extension only when both
  legacy URL fields are nonempty. Incomplete legacy rows throw a generic
  projection error; no other persistence field supplies a fallback.
- `MANAGED_PRIVATE` projects only stable asset ID, title, description,
  asset type, and an explicit storage-mode discriminator. It never projects
  URL, extension, provider/grant identity, or Case/Lab linkage.
- Detail and draft composers retain the full asset array. The detail vault
  counts and shows every entry; managed content is unavailable and cannot
  open the existing legacy URL lightbox. Legacy previews remain available.
- Create/edit forms still submit no asset command under N-FILE-110A.
  Draft discovery selects no asset data, draft promotion returns only Case
  navigation identity, and resumed draft asset DTO loading invokes C1 read
  authorization before the repository. Case detail/edit/metadata still use
  the accepted C1-gated `getDentalCaseById` reader.

## Verification

- Focused C2 mapper/schema/vault/action-boundary tests plus N-FILE-110A,
  C1, C2 schema static, UploadThing route, and accepted non-Case file-route
  regressions: 13 Vitest files, 62 tests PASS.
- `pnpm exec tsc --noEmit`: PASS. The prior C2 nullable URL/extension TS2322
  diagnostics at `lib/server-only-helpers.ts:196,251` are resolved.
- Owned-file ESLint: 0 errors, 11 warnings (pre-existing unused symbols in
  `create-case.ts` and `server-only-helpers.ts`, plus the legacy raw-image
  rendering warning in the vault).
- `git diff --check`: no whitespace errors in tracked C2 application paths;
  Git emitted only LF/CRLF conversion warnings.

## Independent review and gates

Independent V3 `PASS | CODE` rereview found no material issue. It confirmed
that the previous nullable-field TS2322 incompatibility is resolved, managed
file authority does not cross the client DTO, mixed asset identity/count is
retained, corrupt legacy rows fail closed, C1 detail authorization remains
before repository loading, and N-FILE-110A form omission remains
non-destructive. The earlier `CORRECTION_REQUIRED` review is retained as
historical evidence, superseded for code acceptance by this rereview.

Primary sets C2 code acceptance to PASS for authored schema, review-only SQL,
and mixed-read application contract. This is **not migration readiness**.
Full `prisma-zod-generator` execution still has the recorded spawn `ENOENT`;
Prisma-modelled Section A SQL could not be regenerated/compared offline with
the current config-only datasource. PostgreSQL constraint and deferred-trigger
behavior, fresh read-only preflight, migration application, managed asset
creation, private provider storage, signed delivery, and browser/provider
runtime security remain `NOT_RUN` or blocked under separate gates. The
UploadThing Case-only private ACL capability remains a `CAPABILITY_BLOCKER`.
