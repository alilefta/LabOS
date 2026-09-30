# C2 closure and migration-EOL hygiene

Status: C2 `CLOSED` at the development persistence level; repository EOL
policy installed in the working tree, independent V3 `CODE` review `PASS`.
No database, provider, migration, staging, or commit operation occurred in
this checkpoint.

## Closure identity

C2 disposable PostgreSQL verification and normal-development migration are
both `PASS`. The development database has migration
`20260927120000_c2_case_file_persistence` installed. The retained primary
`prisma/migrations/20260927120000_c2_case_file_persistence/migration.sql`
was checked before and after this task; SHA-256 remained exactly
`92c6a5d2fa3bf0f22987be5461370116dc87de9a3ec5ba3ea304cc299c8b5b80`.
This is the reviewed applied candidate, not a regenerated substitute. The
[normal-development application packet](normal-development-migration-application-20260927.md)
retains migration and runtime evidence.

C2 establishes the development persistence foundation only. Managed Case-file
writes, C3, N-FILE-110/111, UploadThing private ACL, and signed reads are
inactive/unaccepted. Production and staging migration are not established.
Product PRV-08 remains separate.

## EOL diagnosis and bounded policy

The primary worktree was dirty before this checkpoint; no cleaning, stashing,
reset, checkout, or historical-file rewrite was used. Before policy addition,
`git ls-files --eol` reported 43 tracked historical `migration.sql` files as
`i/lf w/lf` and four August files as `i/lf w/crlf`; the applied migration 48
was untracked and already LF. The previous [provenance packet](historical-checksum-provenance-20260927.md)
proves the four CRLF working copies differ from their committed/applied LF
bytes only by line endings. The Windows system Git setting is
`core.autocrlf=true`; no repository `.gitattributes` existed.

The narrow root `.gitattributes` addition is:

```gitattributes
prisma/migrations/*/migration.sql text eol=lf
prisma/migrations/migration_lock.toml text eol=lf
```

The first pattern covers the one-directory Prisma migration layout and future
migration SQL; the second covers the Prisma migration lock file. It does not
set an EOL policy for application source or other files and does not change
global/system Git configuration.

Before editing `.gitattributes`, an exact-content temporary Git attributes
file was tested via process-scoped `core.attributesFile`. `git check-attr`
reported `text: set`, `eol: lf` for an August historical SQL file, migration
48, and the lock; an unrelated Case action remained unspecified. Under the
temporary rule, `git status --short -- prisma/migrations` reported only the
pre-existing untracked migration 48 directory: no historical migration
appeared modified. The temporary attributes file was then removed.

After adding `.gitattributes`, the same `git check-attr` results hold.
`git status --short -- prisma/migrations .gitattributes` reports only the
new untracked `.gitattributes` and the already untracked migration 48; no
tracked historical SQL is modified or normalized. The four August working
files remain physically CRLF, but their committed Git blobs and SQL meaning
are untouched. The scoped `eol=lf` attribute directs future materialization
of these paths to LF, including on Windows. Since staging and commit were
not authorized, this working-tree policy takes effect in future independent
checkouts only after separate repository integration. Any Prisma command
against the current four CRLF working copies still needs canonical-LF
execution discipline; this checkpoint does not claim their current bytes
have changed or that a new migration was run.

## Reconciliation

`docs/current.md`, the C2 task plan, the Files plan, and
`.agent/current-task.md` now record C2 development persistence `CLOSED`, both
verification gates `PASS`, migration 48 identity/hash, and inactive successor
boundaries. The next registered Files task is C3's provider-independent
issuance-audit foundation, `PROPOSED` and separately authorizable; this
checkpoint does not start it. No unrelated working-tree file was edited by
this task.

Independent V3 Reviewer verdict: **PASS**, scope `CODE`, no material findings.
The Reviewer independently verified migration 48's exact hash and LF bytes
against the retained archived execution artifact, zero staged/unstaged
modifications across all 47 tracked historical SQL paths, the four unchanged
physical CRLF copies and LF index blobs, and the narrow attribute selection.
It also inspected the canonical closure state. The Reviewer did not connect
to the database or rerun accepted C2 runtime scenarios; those PASS claims
remain grounded in their prior independent evidence. The `.gitattributes`
policy and migration 48 are untracked/uncommitted under this task's explicit
no-stage/no-commit boundary; future independent checkouts inherit the policy
only after separately authorized repository integration.
