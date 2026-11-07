# Case Image V1 pre-migration backup tooling — 2026-11-03

Scope: local tooling setup and synthetic verification only. No hosted database export, migration, R2 operation, or deployment was performed.

## Encryption

- Installed official `FiloSottile.age` v1.3.2 through WinGet; installer hash verification passed.
- Dedicated age identity resides in a restricted operator-local directory outside the repository and backup export directory. The private identity is omitted from this evidence.
- Public recipient: `age1t8lkqjms04kh2nlxzr2m9jjvs4w0q6g926vjvden32mma9zf34ms0gflf9`
- SHA-256 of the UTF-8 public recipient string: `76ce391844a5debe9b70e80be5a4bcc07c4982925576ae3e46985851d3d179b1`
- Synthetic in-memory plaintext encrypted and decrypted successfully. The synthetic ciphertext was removed; no plaintext file was created.

## Restricted destination

- Dedicated subdirectory: `F:\Software_Engineering\LabOS\Private-Backups\case-image-v1-premigration-20261103`.
- Inheritance disabled on this subdirectory and the separate key directory. ACLs permit only the operator, SYSTEM, and Administrators; each has one allow rule. No broad-access principal remains.
- Parent-folder permissions were not modified.

## Disposable PostgreSQL

- Docker Engine 29.8.2, Linux x86_64.
- Official `postgres:17.11` image; server, `pg_dump`, and `pg_restore` all reported PostgreSQL 17.11.
- Run-owned container had network mode `none`, no published ports, and temporary database storage.
- Synthetic parent/child tables were dumped in custom format and restored into a second synthetic database. One parent row, one child row, and the foreign-key constraint were verified.
- Container was stopped and removed after the test.

## Boundary

No hosted-data backup artifact exists yet. Restore results above cover synthetic objects only; the authorized pre-migration backup and restore rehearsal remain separate work.
