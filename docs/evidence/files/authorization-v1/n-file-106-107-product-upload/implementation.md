# N-FILE-106/107 implementation record

Status: `ACCEPTED — independent Reviewer PASS and Primary code acceptance`

## Implementation

- Added Product create/update stage operation intents and an authoritative
  Product-to-Organization target resolver.
- Added the closed Product stage contract, the dedicated `productIconAvatar`
  UploadThing route, and verified-callback handoff.
- Added Product create/update commands that authorize first, revalidate the
  destination WorkType in the final mutation path, and consume a supplied
  grant in the same transaction as Product mutation.
- Migrated both Product create surfaces and the Catalog edit surface to the
  dedicated grant-aware uploader. Existing image URLs remain preview-only;
  actions pass only `imageUploadGrantId` to Product commands.
- No-grant create stores no image, while no-grant update omits image mutation
  and preserves the existing persisted image. Persisted removal remains
  unavailable.

## Focused verification

| Check | Result |
| --- | --- |
| Product contract, Product command, Product uploader, shared UploadThing route, Product target resolver tests | `PASS` — 35 tests |
| Expanded Product plus affected WorkType/shared-route regression slice | `PASS` — 54 tests across 8 files |
| Shared authorization-decision and upload-grant telemetry allowlist contracts | `PASS` — 9 tests across 2 files |
| `pnpm exec tsc --noEmit` | `BLOCKED` — pre-existing unrelated TS2352 at `tests/unit/modules/labos-files/upload-grant.telemetry.test.ts:85`; no N-FILE-106/107 diagnostic was observed |
| `git diff --check` | `PASS` |

No runtime/provider checkpoint was run or claimed. No schema, migration,
provider configuration, deployment, read policy, expiry, orphan cleanup, or
persisted-image deletion behavior changed.

The repository-wide typecheck baseline remains blocked by the unrelated
TS2352 above. The focused Product and affected shared test suites compile and
pass, and the independent review observed no Product-task TypeScript
diagnostic. This baseline is not counted as a Product implementation failure.

## Independent review focus

Verify Product transaction boundaries, raw URL non-authority, the
Product-to-Organization resolver registration, both create surfaces, the edit
surface's authoritative Product ID, and that shared Category/WorkType behavior
remains unchanged.

## Independent review

- Verdict: `PASS`
- Scope: `CODE`
- Validation: 78 focused tests across 11 files passed; `git diff --check`
  passed.
- Repository-wide typechecking remains blocked only by the separately recorded
  pre-existing TS2352 baseline; no Product-task diagnostic was observed.
- Runtime/provider acceptance was not required, executed, or claimed.
