# D2 verification database privilege hardening — execution record

Status: CLOSED | PASS | DATABASE_HARDENED_AND_RUNTIME_VERIFIED | PRODUCT_OWNER_ACCEPTED
Date: 2026-10-12
Authority: Product Owner D2 Database Privilege Hardening and Runtime Verification; exact isolated verification project only.

Product Owner accepted this checkpoint on 2026-10-12 with independent V3 `PASS | RUNTIME_EVIDENCE + CHECKPOINT`. Actual Vercel runtime connectivity and TLS certificate verification remain `NOT_RUN` here.

## Target and prechange evidence

- Supabase project `labos-verification` (`rvtubjrczuxdxfuazjmr`), `eu-central-1`, `ACTIVE_HEALTHY`, PostgreSQL 17.11. Connector SQL executes as `postgres` in database `postgres`.
- 53 installed Prisma migrations match local names and SHA-256, all finished; 40 model tables plus `_prisma_migrations` are owned by `postgres`. No public sequence or cross-schema foreign key to LabOS tables was found. No row data was read.
- `labos_verification_app` is LOGIN, no elevated role attributes or parent membership, has public USAGE and 40/40 SELECT+INSERT, 35/40 UPDATE+DELETE. The five immutable file/evidence tables lack UPDATE/DELETE. It has no DML on `_prisma_migrations` and no TRUNCATE/TRIGGER/REFERENCES/MAINTAIN on application tables.
- `anon`, `authenticated`, and `service_role` have 0/40 SELECT/INSERT/UPDATE/DELETE but 40/40 TRUNCATE/TRIGGER/REFERENCES/MAINTAIN. All 480 structural ACL entries have direct grantor `postgres`; no PUBLIC table grant or parent-role inheritance explains them. All three are NOLOGIN. Data API OFF is prior dashboard evidence, not a replacement for ACL correction.
- `pg_default_acl` has the corresponding 12 `postgres`/`public` future-table entries, grantor `postgres`; there is no global table default entry for these roles. This correction does not touch provider-managed schemas or `_prisma_migrations`.

## Forward SQL reviewed and applied

The exact SQL below received independent V3 `PASS | CODE/SQL` after two bounded review corrections: in-transaction postconditions and a role-membership guard. It was then applied once as `postgres` against the reattested verification project. The transaction and exact table guard fail closed if the inventory or owner changes. The 40-table list excludes `_prisma_migrations`.

```sql
BEGIN;
DO $guard$
DECLARE
  expected text[] := ARRAY[
    'AuthUser',
    'Case',
    'CaseActivityLog',
    'CaseAssetFile',
    'CaseAssetFileVersion',
    'CaseCategory',
    'CaseClinicalUploadEvidence',
    'CaseFileAccessAudit',
    'CasePricingPlan',
    'CaseStaffAssignment',
    'CaseWorkItem',
    'CaseWorkItemAddon',
    'Clinic',
    'Dentist',
    'FileUploadGrant',
    'Invoice',
    'InvoiceCase',
    'InvoicePayment',
    'Lab',
    'LabInvitation',
    'LabSettings',
    'LabStaff',
    'LabStaffInvitationIntent',
    'LabSubscriptionPlan',
    'LabUser',
    'ObjectStorageKeyAllocation',
    'Patient',
    'Product',
    'ProductAddon',
    'SelectedTooth',
    'StaffPayout',
    'StoredFile',
    'SuperUser',
    'WorkType',
    'account',
    'invitation',
    'member',
    'organization',
    'session',
    'verification'
  ];
  observed text[];
BEGIN
  IF current_user <> 'postgres' OR session_user <> 'postgres' THEN
    RAISE EXCEPTION 'Wrong execution identity';
  END IF;
  SELECT array_agg(c.relname ORDER BY c.relname COLLATE "C")
  INTO observed
  FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public' AND c.relkind = 'r'
    AND c.relname <> '_prisma_migrations';
  IF observed IS DISTINCT FROM
     ARRAY(SELECT x FROM unnest(expected) AS x ORDER BY x COLLATE "C") THEN
    RAISE EXCEPTION 'Unexpected public application table inventory';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r'
      AND c.relname = ANY(expected)
      AND pg_get_userbyid(c.relowner) <> 'postgres'
  ) THEN
    RAISE EXCEPTION 'Unexpected application table owner';
  END IF;
END
$guard$;
REVOKE TRUNCATE, TRIGGER, REFERENCES, MAINTAIN
ON TABLE
    public."AuthUser",
    public."Case",
    public."CaseActivityLog",
    public."CaseAssetFile",
    public."CaseAssetFileVersion",
    public."CaseCategory",
    public."CaseClinicalUploadEvidence",
    public."CaseFileAccessAudit",
    public."CasePricingPlan",
    public."CaseStaffAssignment",
    public."CaseWorkItem",
    public."CaseWorkItemAddon",
    public."Clinic",
    public."Dentist",
    public."FileUploadGrant",
    public."Invoice",
    public."InvoiceCase",
    public."InvoicePayment",
    public."Lab",
    public."LabInvitation",
    public."LabSettings",
    public."LabStaff",
    public."LabStaffInvitationIntent",
    public."LabSubscriptionPlan",
    public."LabUser",
    public."ObjectStorageKeyAllocation",
    public."Patient",
    public."Product",
    public."ProductAddon",
    public."SelectedTooth",
    public."StaffPayout",
    public."StoredFile",
    public."SuperUser",
    public."WorkType",
    public."account",
    public."invitation",
    public."member",
    public."organization",
    public."session",
    public."verification"
FROM anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  REVOKE TRUNCATE, TRIGGER, REFERENCES, MAINTAIN
  ON TABLES FROM anon, authenticated, service_role;
DO $verify$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_auth_members m
    JOIN pg_roles r ON r.oid = m.member
    WHERE r.rolname IN
      ('anon', 'authenticated', 'service_role', 'labos_verification_app')
  ) THEN
    RAISE EXCEPTION 'Unexpected API or application role membership';
  END IF;
  IF EXISTS (
    SELECT 1
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    CROSS JOIN (VALUES ('anon'), ('authenticated'), ('service_role')) AS r(role_name)
    CROSS JOIN (VALUES ('TRUNCATE'), ('TRIGGER'), ('REFERENCES'), ('MAINTAIN')) AS p(privilege_name)
    WHERE n.nspname = 'public' AND c.relkind = 'r'
      AND c.relname <> '_prisma_migrations'
      AND has_table_privilege(r.role_name, c.oid, p.privilege_name)
  ) THEN
    RAISE EXCEPTION 'API role retains effective structural table privilege';
  END IF;
  IF EXISTS (
    SELECT 1
    FROM pg_default_acl d
    JOIN pg_roles owner ON owner.oid = d.defaclrole
    LEFT JOIN pg_namespace n ON n.oid = d.defaclnamespace
    CROSS JOIN LATERAL aclexplode(d.defaclacl) a
    LEFT JOIN pg_roles grantee ON grantee.oid = a.grantee
    WHERE owner.rolname = 'postgres' AND (n.nspname = 'public' OR n.oid IS NULL)
      AND d.defaclobjtype = 'r'
      AND (a.grantee = 0 OR grantee.rolname IN ('anon', 'authenticated', 'service_role'))
      AND a.privilege_type IN ('TRUNCATE', 'TRIGGER', 'REFERENCES', 'MAINTAIN')
  ) THEN
    RAISE EXCEPTION 'Structural future-table default privilege remains';
  END IF;
  IF EXISTS (
    SELECT 1
    FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r'
      AND c.relname <> '_prisma_migrations'
      AND (
        NOT has_table_privilege('labos_verification_app', c.oid, 'SELECT')
        OR NOT has_table_privilege('labos_verification_app', c.oid, 'INSERT')
        OR has_table_privilege('labos_verification_app', c.oid, 'UPDATE') <>
          (c.relname NOT IN ('CaseAssetFileVersion', 'CaseClinicalUploadEvidence',
            'CaseFileAccessAudit', 'ObjectStorageKeyAllocation', 'StoredFile'))
        OR has_table_privilege('labos_verification_app', c.oid, 'DELETE') <>
          (c.relname NOT IN ('CaseAssetFileVersion', 'CaseClinicalUploadEvidence',
            'CaseFileAccessAudit', 'ObjectStorageKeyAllocation', 'StoredFile'))
      )
  ) THEN
    RAISE EXCEPTION 'Application DML privilege baseline changed';
  END IF;
END
$verify$;
COMMIT;
```

## Recovery SQL

Before COMMIT, use `ROLLBACK` on any unexpected result. After COMMIT, the following exact reversal restores the observed 40-table grants and `postgres`/`public` table defaults; use only after separately checking the same project and inventory. Restoring these rights is a security regression, so prefer a forward repair where feasible.

```sql
BEGIN;
DO $guard$
DECLARE
  expected text[] := ARRAY[
    'AuthUser',
    'Case',
    'CaseActivityLog',
    'CaseAssetFile',
    'CaseAssetFileVersion',
    'CaseCategory',
    'CaseClinicalUploadEvidence',
    'CaseFileAccessAudit',
    'CasePricingPlan',
    'CaseStaffAssignment',
    'CaseWorkItem',
    'CaseWorkItemAddon',
    'Clinic',
    'Dentist',
    'FileUploadGrant',
    'Invoice',
    'InvoiceCase',
    'InvoicePayment',
    'Lab',
    'LabInvitation',
    'LabSettings',
    'LabStaff',
    'LabStaffInvitationIntent',
    'LabSubscriptionPlan',
    'LabUser',
    'ObjectStorageKeyAllocation',
    'Patient',
    'Product',
    'ProductAddon',
    'SelectedTooth',
    'StaffPayout',
    'StoredFile',
    'SuperUser',
    'WorkType',
    'account',
    'invitation',
    'member',
    'organization',
    'session',
    'verification'
  ];
  observed text[];
BEGIN
  IF current_user <> 'postgres' OR session_user <> 'postgres' THEN
    RAISE EXCEPTION 'Wrong execution identity';
  END IF;
  SELECT array_agg(c.relname ORDER BY c.relname COLLATE "C")
  INTO observed
  FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public' AND c.relkind = 'r'
    AND c.relname <> '_prisma_migrations';
  IF observed IS DISTINCT FROM
     ARRAY(SELECT x FROM unnest(expected) AS x ORDER BY x COLLATE "C") THEN
    RAISE EXCEPTION 'Unexpected public application table inventory';
  END IF;
  IF EXISTS (
    SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relkind = 'r'
      AND c.relname = ANY(expected)
      AND pg_get_userbyid(c.relowner) <> 'postgres'
  ) THEN
    RAISE EXCEPTION 'Unexpected application table owner';
  END IF;
END
$guard$;
GRANT TRUNCATE, TRIGGER, REFERENCES, MAINTAIN
ON TABLE
    public."AuthUser",
    public."Case",
    public."CaseActivityLog",
    public."CaseAssetFile",
    public."CaseAssetFileVersion",
    public."CaseCategory",
    public."CaseClinicalUploadEvidence",
    public."CaseFileAccessAudit",
    public."CasePricingPlan",
    public."CaseStaffAssignment",
    public."CaseWorkItem",
    public."CaseWorkItemAddon",
    public."Clinic",
    public."Dentist",
    public."FileUploadGrant",
    public."Invoice",
    public."InvoiceCase",
    public."InvoicePayment",
    public."Lab",
    public."LabInvitation",
    public."LabSettings",
    public."LabStaff",
    public."LabStaffInvitationIntent",
    public."LabSubscriptionPlan",
    public."LabUser",
    public."ObjectStorageKeyAllocation",
    public."Patient",
    public."Product",
    public."ProductAddon",
    public."SelectedTooth",
    public."StaffPayout",
    public."StoredFile",
    public."SuperUser",
    public."WorkType",
    public."account",
    public."invitation",
    public."member",
    public."organization",
    public."session",
    public."verification"
TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  GRANT TRUNCATE, TRIGGER, REFERENCES, MAINTAIN
  ON TABLES TO anon, authenticated, service_role;
COMMIT;
```

## Postchange verification plan

1. Re-attest project ref/version and `current_user`; verify exact 40-table inventory and 53 migration records unchanged.
2. For each API role, `has_table_privilege` for TRUNCATE, TRIGGER, REFERENCES, MAINTAIN must be false on every identified table. Recheck parent memberships, PUBLIC ACL and explicit ACL. App role DML counts must remain 40/40 SELECT+INSERT and 35/40 UPDATE+DELETE; five immutable tables and `_prisma_migrations` remain denied.
3. Verify `pg_default_acl` no longer has those 12 `postgres`/`public` structural grants. Do not add an application default DML grant. Any later migration owner needs a separately reviewed creator-specific policy.
4. If the connector supports an atomic create/check/rollback call, test a run-owned synthetic future table without leaving it installed. If atomicity/cleanup cannot be guaranteed, record synthetic default-ACL test NOT_RUN and rely on catalog proof pending separate safe execution.
5. Then use the restricted transaction-pooler credential through an isolated synthetic harness for Prisma, Better Auth and denial checks. Do not print bearer material or real user data; delete exact run-owned fixtures and verify absence.

## Boundaries

No application, migration, development-project, Vercel or R2 changes; A1-I1 blocked and N-FILE-110 inactive. Final runtime results and independent reviews will be appended after execution.

## Applied change and direct verification

- The independently reviewed transaction committed on `labos-verification` as database role `postgres`. It revoked only `TRUNCATE`, `TRIGGER`, `REFERENCES`, and `MAINTAIN` on the exact 40 LabOS application tables from `anon`, `authenticated`, and `service_role`, and removed those grants from `postgres`'s `public` future-table defaults. The 40 table owners, `_prisma_migrations`, provider-managed schemas, app-role grants, and immutable-table restrictions were not altered.
- Direct postchange catalog queries show each API role has 0/40 effective SELECT, INSERT, UPDATE, DELETE, TRUNCATE, TRIGGER, REFERENCES, and MAINTAIN. The application role retains 40/40 SELECT and INSERT, 35/40 UPDATE and DELETE, and 0/40 of the four structural privileges. Its five immutable tables remain SELECT/INSERT only. It still has no DML on `_prisma_migrations`, no elevated role attributes, no parent membership, public USAGE, and no public CREATE.
- `pg_default_acl` now has zero of the 12 former `postgres`/`public` API-role structural entries. No future-table application DML default grant was added. All 53 installed migration records remain complete, and the 41 existing public tables (40 application tables plus migration history) remain `postgres`-owned.
- A run-owned synthetic future table `public.d2_acl_probe_493bbf9626ce4ef38b8e9b434af6bdd3` was created, inspected, and rolled back within one SQL transaction. The probe confirmed owner `postgres` and no effective API-role or app-role DML/structural grants inherited from defaults. A separate direct check found no relation by that exact name and zero `d2_acl_probe_%` relations in `public`.

## Restricted runtime connection status

- The Product Owner supplied a new Git-ignored `.env.verification.local` containing only `DATABASE_URL`; its value was not printed or recorded. Sanitized parsing confirmed the `labos_verification_app` username with the exact verification project ref, Frankfurt Supabase transaction-pooler host, port `6543`, database `postgres`, `pgbouncer=true`, and a password. It did not specify an SSL mode.
- The first read-only `pg` connection attempt with certificate and hostname verification enabled reached the pooler but stopped at `SELF_SIGNED_CERT_IN_CHAIN`, before PostgreSQL authentication. Loading Node's system CA store did not resolve the chain. The Product Owner then placed the verification project's CA certificate in Git-ignored `.env.verification-ca.crt`; the file is one PEM certificate and contains no private key. Retried with `sslmode=verify-full` and `sslrootcert` pointing to that file, without saving an augmented URL. The `pg` client reported `labos_verification_app`, database `postgres`, PostgreSQL 17.11, and a TLS socket with `encrypted=true`, `authorized=true`, `authorizationError=null`. `pg_stat_ssl` reported the pooler-to-database leg as `ssl=false`; it does not describe the separately verified client-to-pooler TLS socket. No insecure TLS bypass was used.
- The user's unrelated `.gitignore` edit and the pre-existing 21 untracked local paths are preserved. This evidence packet is the only file authored for this task so far.

## Synthetic Prisma and Better Auth runtime matrix

The temporary local harness set the verified transaction-pooler URL and an in-memory random Better Auth test secret before dynamically importing the repository's `lib/prisma.ts` and `lib/auth.ts`. It ran under Node 24 with the `react-server` condition required by the application's `server-only` imports. No credential, token, cookie, session value, full URL, password, or synthetic email was printed. The temporary harness was removed after execution.

| Check | Result |
| --- | --- |
| Pooler authenticated as `labos_verification_app`; client TLS encrypted and CA/hostname authorized | PASS |
| Repository Prisma 7 adapter read `current_user` as restricted role | PASS |
| Prisma synthetic `verification` create/read and interactive transaction update/create | PASS |
| Better Auth API synthetic email/password signup; one persisted account with the expected user ID | PASS |
| Better Auth API login; persisted session associated with the same user | PASS |
| `CREATE TABLE` in `public`, `TRUNCATE` on `AuthUser`, UPDATE and DELETE on immutable `StoredFile` | All denied with SQLSTATE `42501`; each attempted statement was enclosed in a rollback transaction |
| Exact cleanup of synthetic AuthUser, cascaded account/session, and two `verification` rows | PASS |

One disposable harness attempt stopped at a CommonJS/top-level-await transform error before database mutation. Subsequent attempts established Prisma connectivity and then stopped when `server-only` rejected a plain `tsx` import of `lib/auth.ts`; those attempts still removed their synthetic Prisma rows. The final run used the Node `react-server` condition and passed all checks. These harness corrections did not alter application code or the database privilege policy.

An independent connector query after the final run found zero `d2-smoke-%@example.invalid` AuthUser rows, zero `d2-%` verification rows, zero `d2_denied_%` public relations, and zero related synthetic account/session rows. This check also covers the earlier failed harness attempts. No normal-development or provider fixture was created.

This establishes restricted-runtime compatibility for the exercised Prisma and Better Auth signup/login/session operations on the isolated verification target. It does not establish every application workflow, Vercel runtime behavior, or future migration-owner defaults for a different creating role. Those remain separate gates.

## Independent V3 and next gate

Independent V3 returned `PASS | RUNTIME_EVIDENCE + CHECKPOINT` after its earlier `PASS | CODE/SQL` review. The reviewer independently reattested the exact healthy project and PostgreSQL 17.11; 40 postgres-owned application tables and 53 complete migrations; zero effective API-role DML/structural grants; preserved app-role 40/40 SELECT/INSERT, 35/40 UPDATE/DELETE and zero structural grants; preserved immutable-table restrictions; no app-role parent membership, elevated attributes, public CREATE or migration-history DML; zero relevant structural default ACLs; and zero synthetic fixtures or probe relations.

The reviewer could not independently connect to the transaction pooler because its separate sandbox returned `EACCES` before authentication. That is an independent connection `VERIFICATION_ENVIRONMENT_BLOCKER`, not a contradiction of the directly recorded certificate-validated pooler and Prisma/Better Auth run. `.env.verification.local` itself has no SSL parameters; the passing harness added `sslmode=verify-full` and the ignored project CA in memory. Vercel runtime TLS configuration and actual deployed behavior remain `NOT_RUN` in this checkpoint.

No rollback was required. The exact compensating SQL above is retained for a separately reviewed recovery if a provider dependency is later identified. The current target is ready for a separately authorized integration/deployment step, provided the Vercel runtime is bound only to this verification project through the restricted role with an approved TLS trust configuration; the `main` branch, Vercel settings, and deployed application were not changed here. Future migration-created tables must receive individually reviewed runtime DML and creator-specific default-ACL handling without a blanket grant that would defeat the five immutable-table restrictions. A1-I1 remains `BLOCKED_DECISION`; N-FILE-110 remains inactive.
